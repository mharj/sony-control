import { PlayingContentInfo } from ".";

export interface IPlayingContentInfoRadio {
	broadcastFreq: number;
	broadcastFreqBand: string;
	channelName: string;
	contentKind: string;
	dabInfo: {
		componentLabel: string;
		dynamicLabel: string;
		ensembleLabel: string;
		serviceLabel: string;
	};
	fileNo: string;
	output: string;
	parentUri: string;
	source: string;
	stateInfo: {
		state: string;
		supplement: string;
	};
	title: string;
	totalCount: number;
	uri: string;
}
export function isContentInfoRadio(content: PlayingContentInfo): content is IPlayingContentInfoRadio {
	return content.source.match(/^radio:/) ? true : false;
}