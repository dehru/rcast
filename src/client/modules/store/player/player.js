import { store, ended } from 'store/store';

import EventEmitter from './event-emitter';

function getUrlProxy(url) {
    return `/proxy/${encodeURI(url)}`;
}

class Player extends EventEmitter {
    currentSrc;
    isPlaying = false;

    _audioContext;
    _audioEl;

    play(src) {
        if (!this._audioContext) {
            this._init();
        }

        if (src) {
            this.currentSrc = src;
            this._audioEl.src = getUrlProxy(src);
        }

        this.isPlaying = true;
        this._audioEl.play();
    }

    pause() {
        this.isPlaying = false;
        this._audioEl.pause();
    }

    _init() {
        this._audioContext = new AudioContext();

        this._audioEl = new Audio();
        this._audioEl.crossOrigin = 'anonymous';

        this._audioEl.addEventListener('error', () => {
            const { code, message } = this._audioEl.error;

            const error = new Error(`Error ${code}: ${message}`);
            this.emit('error', error);
        });

        this._audioEl.addEventListener('load', () => {
            this.emit('load');
        });

        this._audioEl.addEventListener('timeupdate', () => {
            this.emit('timeupdate');
        });

        this._audioEl.addEventListener('ended', () => {
            this.isPlaying = false;
            store.dispatch(ended());
        });

        const track = this._audioContext.createMediaElementSource(
            this._audioEl,
        );
        track.connect(this._audioContext.destination);
    }

    get duration() {
        return this._audioEl.duration;
    }

    get currentTime() {
        return this._audioEl.currentTime;
    }
    set currentTime(value) {
        return (this._audioEl.currentTime = value);
    }
}

const player = new Player();

store.subscribe(() => {
    const {
        player: { episode, isPlaying },
        episodes,
    } = store.getState();

    const currentEpisode = episode && episodes[episode].data;
    if (currentEpisode && currentEpisode.audio.url !== player.currentSrc) {
        player.play(currentEpisode.audio.url);
    }

    if (player.isPlaying !== isPlaying) {
        if (isPlaying) {
            player.play();
        } else {
            player.pause();
        }
    }
});

export default player;
