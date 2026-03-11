import type {IPlayingContentInfoCast} from './cast';
import type {IPlayingContentInfoDlna} from './dlna';
import type {IPlayingContentInfoExtInput} from './extInput';
import type {IPlayingContentInfoNetService} from './netService';
import type {IPlayingContentInfoRadio} from './radio';
import type {IPlayingContentInfoStorage} from './storage';

export type PlayingContentInfo =
	| IPlayingContentInfoCast
	| IPlayingContentInfoNetService
	| IPlayingContentInfoExtInput
	| IPlayingContentInfoRadio
	| IPlayingContentInfoStorage
	| IPlayingContentInfoDlna;
