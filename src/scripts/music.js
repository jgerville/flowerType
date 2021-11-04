class Music {
  constructor(songFile) {
    this.song = new Audio(songFile)
    this.started = false;
  }

  start() {
    if (!this.started){
      this.song.play();
      this.started = true;
      this.song.loop = true;
      this.song.playbackRate = 0.4;
    }
  }

  mute() {
    this.song.pause();
  }

  faster() {
    if (this.song.playbackRate < 1.5) {
      this.song.playbackRate += 0.1;
    }
  }

  slower() {
    if (this.song.playbackRate > 0.5) {
      this.song.playbackRate -= 0.1;
    }
  }
}

export default Music;