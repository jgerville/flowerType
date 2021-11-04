class Music {
  constructor(songFile, egg) {
    this.song = new Audio(songFile)
    this.started = false;
    this.easter = egg
  }

  start() {
    if (!this.started){
      this.song.play();
      this.started = true;
      this.song.loop = true;
      this.song.playbackRate = 0.7;
    }
  }

  mute() {
    this.song.pause();
  }

  unmute() {
    this.song.play();
  }

  faster() {
    if (this.song.playbackRate < 1.5) {
      this.song.playbackRate += 0.1;
    }
  }

  slower() {
    if (this.started) {
      if (this.song.playbackRate > 0.5) {
        this.song.playbackRate -= 0.1;
      }
    }
  }
}

export default Music;