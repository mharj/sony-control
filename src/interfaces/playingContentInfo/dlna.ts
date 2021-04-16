import {PlayingContentInfo} from '.';

export interface IPlayingContentInfoDlna {
	contentKind: string;
	durationMsec: number;
	durationSec: number;
	mediaType: string;
	output: string;
	playSpeed: string;
	playSpeedStep: number;
	positionMsec: number;
	positionSec: number;
	repeatType: string;
	source: string;
	title: string;
	uri: string;
}

export function isContentInfoDlna(content: PlayingContentInfo): content is IPlayingContentInfoDlna {
	return content.source.match(/^storage:/) ? true : false;
}
