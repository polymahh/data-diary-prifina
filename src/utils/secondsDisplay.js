const secondsDisplay = (total) => {
    var hours = Math.floor(Math.floor(total / 60)/60)
    var mintues = Math.floor(total / 60)%60
    var seconds = total % 60
    seconds.toFixed(3)
    if (seconds < 10){
      seconds =  `0${seconds}`
    }
    if (mintues < 10){
      mintues =  `0${mintues}`
    }
    if (hours < 10){
      hours =  `0${hours}`
    }
    return `${hours}:${mintues}:${seconds}`
  }

  export default secondsDisplay