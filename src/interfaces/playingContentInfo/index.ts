import {IPlayingContentInfoCast} from './cast';
import {IPlayingContentInfoDlna} from './dlna';
import {IPlayingContentInfoExtInput} from './extInput';
import {IPlayingContentInfoNetService} from './netService';
import {IPlayingContentInfoRadio} from './radio';
import {IPlayingContentInfoStorage} from './storage';

export type PlayingContentInfo = IPlayingContentInfoCast | IPlayingContentInfoNetService | IPlayingContentInfoExtInput | IPlayingContentInfoRadio | IPlayingContentInfoStorage | IPlayingContentInfoDlna;
