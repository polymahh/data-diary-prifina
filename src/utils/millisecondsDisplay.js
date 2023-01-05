const millisecondsDisplay = (total) => {
    var totalSeconds = Math.floor(total / 1000);
    var milliseconds = total % 1000;
    var hours = Math.floor(Math.floor(totalSeconds / 60) / 60);
    var mintues = Math.floor(totalSeconds / 60) % 60;
    var seconds = totalSeconds % 60;
    seconds.toFixed(3);
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    if (mintues < 10) {
      mintues = `0${mintues}`;
    }
    if (hours < 10) {
      hours = `0${hours}`;
    }
    return `${hours}:${mintues}:${seconds}.${milliseconds}`;
  };

  export default millisecondsDisplay;