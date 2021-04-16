import { PlayingContentInfo } from ".";

export interface IPlayingContentInfoNetService {
	albumName: string;
	artist: string;
	contentKind: string;
	output: string;
	service: string;
	source: string;
	stateInfo: {
		state: string;
	};
	title: string;
	uri: string;
}
export function isContentInfoNetService(content: PlayingContentInfo): content is IPlayingContentInfoNetService {
	return content.source === 'netService:audio';
}