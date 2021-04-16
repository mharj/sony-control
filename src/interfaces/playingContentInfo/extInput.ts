import {PlayingContentInfo} from '.';

export interface IPlayingContentInfoExtInput {
	contentKind: string;
	output: string;
	source: string;
	title: string;
	uri: string;
}

export function isContentInfoExtInput(content: PlayingContentInfo): content is IPlayingContentInfoExtInput {
	return content.source.match(/^extInput:/) ? true : false;
}
