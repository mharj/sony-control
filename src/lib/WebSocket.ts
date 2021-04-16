import {w3cwebsocket} from 'websocket';

export default typeof WebSocket === 'undefined' ? ((w3cwebsocket as unknown) as typeof WebSocket) : WebSocket;
