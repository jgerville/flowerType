class Music {
  constructor(songFile) {
    this.song = new Audio(songFile)
  }

  start() {
    this.song.play();
    this.song.loop = true;
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