---
name: sony-json-rpc
description: Add or modify Sony Audio Control JSON-RPC API functions in this repo (src/api/<service>/v<ver>/<method>.ts), wire them into the device maps, and add tests/fixtures. Use when the user wants to add, version, or test a Sony API method.
---

# Sony Audio Control JSON-RPC: adding API functions

Reference docs: https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2

## Architecture (3 layers)

| Layer | Location | Role |
|---|---|---|
| Raw API function | `src/api/<service>/v<major>_<minor>/<method>.ts` | Pure function: builds a `JsonRpcArgs` and passes it to a `callback`. No state, no fetch. |
| Device map | `src/map/AbstractGenericAudio.ts`, `src/map/SonyStrDn1080.ts` | Abstract classes extending `AbstractApi`. Bind each API function to the right version and inject `this.jsonFirstResultCall` / `this.jsonResultsCall`. |
| User-facing device | `src/devices/GenericAudio.ts`, `src/devices/SonyStrDn1080.ts` | Concrete classes exported from `src/index.ts`. Only add helpers here (e.g. `setNightModeOn`), not raw API calls. |

Transport lives in `src/lib/AbstractApi.ts`. POSTs `{id, method, params, version}` to `${endpoint}/${path}`.
- `jsonFirstResultCall` returns `response.result[0]` (most methods).
- `jsonResultsCall` returns `response.results` (guide `getServiceProtocols`, `getMethodTypes`, etc. that reply with `results`).
- JSON-RPC errors (`{error: [code, msg]}`) throw `AudioApiError` (`src/lib/error.ts`).

Services are the `ApiService` union in `AbstractApi.ts`: `system | avContent | audio | guide`.

## Directory conventions

```
src/api/<service>/index.ts            -> export const PATH = '<service>';
src/api/<service>/v1_1/index.ts       -> export {PATH} from '..';
                                         export const VER = '1.1';
src/api/<service>/v1_1/<method>.ts    -> one method per file
```

- Version folder: `v<major>_<minor>` (e.g. `v1_2`). Each has its own `index.ts` exporting `PATH` and `VER`.
- A method file lives in the folder of the version that **introduced or last changed** it. A device map imports the version that device supports.
- Create the version `index.ts` if the folder is new; create `src/api/<service>/index.ts` if the service is new (and add it to `apiServices` in `AbstractApi.ts`).
- Files use tabs, single quotes, and `import type` for type-only imports (Biome enforced).

## Template: raw API function

```ts
import type {JsonCallback} from '../../../lib/AbstractApi';
import {PATH, VER} from '.';

export interface IVolumeInformation {
	maxVolume: number;
	minVolume: number;
	mute: string;
	output: string;
	step: number;
	volume: number;
}

/**
 * https://developer.sony.com/develop/audio-control-api/api-references/api-overview-2#_getvolumeinformation_v1_1
 */
export function getVolumeInformation(output: string | undefined, callback: JsonCallback<IVolumeInformation[]>) {
	return callback({path: PATH, method: 'getVolumeInformation', params: [{output: output ?? ''}], version: VER});
}
```

Rules:
1. **`callback` is always the last parameter**, typed `JsonCallback<ReturnType>`. Never call `fetch` in API files.
2. `method` is the exact Sony method name; `path: PATH`, `version: VER` come from the version folder's `index.ts`.
3. `params` is always an array: `[]` (no args), `[{...}]` (one object, the common case), or `[string]` (e.g. `getMethodTypes` takes `[apiVersion]`).
4. Optional string params are sent as empty string (`output ?? ''`), which the device treats as "all/default". Existing files use `||` or `??`; prefer `??`.
5. Numeric values sent to the device are often strings (see `setAudioVolume`, which sends the volume as a template string). Check the Sony docs and a real fixture before choosing types.
6. Setters return `JsonCallback<void>`; getters return an exported `I...` interface or `type` (array when the device returns a list, e.g. `IVolumeInformation[]`).
7. Mark optional response fields with `?:` (some firmware, e.g. DN1080, returns fewer fields than documented. Leave a `TODO` comment if unverified).
8. Add a JSDoc link to the Sony docs anchor `#_<methodname>_v<major>_<minor>`; write "No documentation found" with `@example` if undocumented (see `setPowerSettings.ts`).
9. **Naming when several versions of the same method exist**: suffix the function with the version (`getSystemInformation_v1_3`, `getStorageList_v1_2`, `getPowerSettings_v1_0`). Single-version methods keep the plain name (`getVolumeInformation`). Prefix versions the same way for related types (`SetPowerSettingParams_v1_0`, `GetStorageListParams_v1_2`).
10. Methods that come with `getMethodTypes` per service use separate files: `getAudioMethodTypes`, `getGuideMethodTypes`, `getSystemMethodTypes` (all take `apiVersion = ''`).

## Wiring into device maps

Add a thin wrapper method to **each** map that supports the call, using the correct version import:

```ts
// src/map/SonyStrDn1080.ts  (and/or AbstractGenericAudio.ts)
import {getVolumeInformation} from '../api/audio/v1_1/getVolumeInformation';

public getVolumeInformation(output?: string) {
	return getVolumeInformation(output, this.jsonFirstResultCall);
}
```

- Use `this.jsonFirstResultCall` for `result` responses, `this.jsonResultsCall` for `results` responses (guide/method-type calls).
- Public wrapper takes the same args minus `callback`; make optional args `?` (or give a default like `param = {uri: ''}`).
- `AbstractGenericAudio` pins the newest generic versions (e.g. `getSystemInformation` from `v1_5`); `AbstractSonyStrDn1080` pins what the DN1080 actually supports (`v1_4`). Device-only methods (`getSpeakerSettings`, `getServiceProtocols`, `getMethodTypes`, `getStorageList`) only appear in the DN1080 map.
- Keep import order consistent with surrounding code; run `pnpm lint:fix` to normalise it.
- Convenience helpers (named sources, sound fields) belong in `src/devices/SonyStrDn1080.ts`, built on `setPlayContent` / `setSoundSettings`.

## Tests

Two styles exist; pick the one that fits:

### 1. Fixture-backed device test (`test/sonyStrDn1080.test.ts`, `test/genericAudio.test.ts`)

```ts
amp = new SonyStrDn1080(dn1080Env, {fetchClient: new MockFetch(mockOptions).fetch});
apiTest = new ApiTester(dn1080Env, mockOptions);   // for calling raw API functions
```

- `mockOptions = {storeDirectory: './test/dn1080', clone: true}`.
- Locally (no `CI` env), `MockFetch` **proxies to the real device** (`DN1080_URL`, default `http://generic_audio:10000/sony`) and records the response to `test/dn1080/<method>_<version>[#<params>].json`. Under `CI` it replays the fixture; a missing file returns 404. **Commit the recorded fixture** so CI passes.
- Fixture name: `<method>_<version>` + `#key=value` per params object (nested values are JSON-stringified without quotes; empty param = `#target=`). Example: `getStorageList_1.2#uri=_isRegistered=random.json`.
- Call via the device (`amp.getX()`) or via a raw function: `apiTest.runCall((cb) => getSystemInformation_v1_4(cb))` (`runResultsCall` for `jsonResultsCall` methods).
- Call `amp.resetIdCounter()` / `apiTest.resetIdCounter()` in `beforeEach`; request ids must stay deterministic.

### 2. Live-device raw API test (`test/api.test.ts`)

Defines a local `jsonResultsCall` using `fetch` against `AUDIO_URL` and validates results with a zod schema via `zodParse`. Use this for new `guide` / `audio` v1_0 methods that are not yet in a fixture set. Needs a reachable device.

### Response schemas (`test/typeValidate/`)

Add `test/typeValidate/<method>_<ver>.ts` exporting a zod schema typed against the API interface, so a type/shape drift fails typecheck:

```ts
import {z} from 'zod';
import type {StorageListEntry} from '../../src/api/system/v1_2/getStorageList';

export const getStorageList_1_2_schema: z.ZodType<StorageListEntry> = z
	.object({ deviceName: z.string(), /* ... */ })
	.strict();   // strict() surfaces undocumented extra fields
```

Use `.array()` at the call site when the method returns a list. Optional interface fields must be `.optional()` in the schema.

## Checklist: adding a new method

1. Look up the method in the Sony docs and, ideally, `getMethodTypes` on the device (`amp.getMethodTypes()`) to confirm the version and the input/output signature.
2. Find or create `src/api/<service>/v<maj>_<min>/index.ts` (and service `index.ts`).
3. Create `<method>.ts` from the template (callback last, exported response type, docs link).
4. Add a wrapper to `src/map/SonyStrDn1080.ts` and/or `src/map/AbstractGenericAudio.ts` (correct callback, correct version).
5. Add the zod schema in `test/typeValidate/` and a test case; run it once locally against the device to record the fixture in `test/dn1080/`.
6. Optionally add a helper to `src/devices/SonyStrDn1080.ts`.
7. Validate:
   ```
   pnpm lint        # biome check (use lint:fix to autofix)
   pnpm validate    # tsc --noEmit
   pnpm test        # vitest run --typecheck --coverage --no-file-parallelism
   ```

## Gotchas

- `jsonFirstResultCall` returns only `result[0]`; if a method returns multiple values, check the Sony docs and use `jsonResultsCall`.
- The request id counter wraps at 90; do not rely on ids.
- `console.error` is logged on invalid responses; do not log request parameters containing secrets.
- `AbstractApi` binds both call methods in its constructor, so they can be passed as callbacks without `.bind`.
- `getStorageList_v1_2` types its callback as `JsonCallback<StorageListEntry>` even though the device returns a list; check the real shape from the fixture before copying that pattern.
- Add new public methods to the maps only. `src/index.ts` exports the device classes, not raw API functions.
