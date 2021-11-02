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
    const interval = setInterval(() => {
      this.secondsLeft -= 1;

      if (this.secondsLeft === 0) {
        this.render();
        this.over = true;
      } else if (this.secondsLeft < 0) {
        this.renderStatsButton();
        clearInterval(interval);
      } else {
        this.render();
      }
    }, 1000);
  }

  renderInstructions() {
    const p = document.createElement('p')
    p.append('Start Typing When Ready!');
    this.container.appendChild(p)
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
    this._addTimerColor(this.secondsLeft);
  }

  renderStatsButton() {
    const button = document.createElement('button');
    button.append('View Stats');
    button.classList.add('stats-button')

    // clear the container first
    if (this.container.children.length > 0) {
      for (const child of this.container.children) {
        this.container.removeChild(child)
      }
    }

    this.container.appendChild(button);
  }

  renderRestartButton() {
    const button = document.createElement('button');
    button.append('Restart');
    button.classList.add('restart-button')

    // clear the container first
    if (this.container.children.length > 0) {
      for (const child of this.container.children) {
        this.container.removeChild(child)
      }
    }

    this.container.appendChild(button);
  }

  _addTimerColor(secondsLeft) {
    if (secondsLeft === 20) {
      this.container.classList.add('last-twenty-seconds')
    } else if (secondsLeft === 10) {
      this.container.classList.add('last-ten-seconds')
    } else if (secondsLeft === 3) {
      this.container.classList.add('last-three-seconds')
    }
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