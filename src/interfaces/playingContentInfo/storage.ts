import { PlayingContentInfo } from ".";

export interface IPlayingContentInfoStorage {
	albumName: string;
	artist: string;
	audioInfo: [
		{
			channel: string;
			codec: string;
			frequency: string;
		},
	];
	contentKind: string;
	durationMsec: number;
	fileNo: string;
	genre: string[];
	index: number;
	output: string;
	parentUri: string;
	playlistName: string;
	podcastName: string;
	positionMsec: number;
	source: string;
	sourceLabel: string;
	stateInfo: {
		state: string;
		supplement: string;
	};
	title: string;
	totalCount: number;
	uri: string;
	videoInfo: {
		codec: string;
	};
}
export function isContentInfoStorage(content: PlayingContentInfo): content is IPlayingContentInfoStorage {
	return content.source.match(/^storage:/) ? true : false;
}