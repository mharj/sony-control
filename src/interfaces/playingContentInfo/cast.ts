import {PlayingContentInfo} from '.';

export interface IPlayingContentInfoCast {
	applicationName: string;
	source: string;
	title: string;
	uri: string;
}
export function isContentInfoCast(content: PlayingContentInfo): content is IPlayingContentInfoCast {
	return content.source === 'cast:audio';
}
