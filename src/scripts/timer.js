class Timer {
  constructor(numSeconds, container) {
    this.initialTime = numSeconds;
    this.secondsLeft = numSeconds;
    this.container = container;
    this.running = false;
    this.over = false;
  }

  start() {
    this.running = true;
    this.render();
    const interval = setInterval(() => {
      this.secondsLeft -= 1;
      this.render();
      if (this.secondsLeft === 0) {
        clearInterval(interval);
        this.over = true;
      }
    }, 1000);
  }

  render() {
    let timeArray = [0, this.secondsLeft];
    timeArray = this._convertSecsToMins(timeArray);

    const mins = this._addZeroToMins(timeArray[0]);
    const secs = this._addZeroToSecs(timeArray[1]);

    const formattedTime = `${mins}:${secs}`;
    
    // makes sure the old times get deleted
    if (this.container.children.length > 0) {
      for (const child of this.container.children) {
        this.container.removeChild(child)
      }
    }

    // create a p element, add it to the timer container
    const p = document.createElement('p')
    p.append(formattedTime);
    this.container.appendChild(p)

  }

  _convertSecsToMins(timeArray) {
    if (timeArray[1] >= 60) {
      while (timeArray[1] >= 60) {
        timeArray[1] -= 60;
        timeArray[0] ++;
      }
    }
    return timeArray;
  }

  _addZeroToMins(mins) {
    if (mins < 10) {
      mins = `0${mins}`;
    }
    return mins;
  }

  _addZeroToSecs(secs) {
    if (secs < 10) {
      secs = `0${secs}`
    }
    return secs;
  }
}

export default Timer;