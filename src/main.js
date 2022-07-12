function flipTo(flipCard, newValue) {
  let backTop = flipCard.querySelector(
    '.flip-card__card--back > .flip-card__segment--top')
  let backBottom = flipCard.querySelector(
    '.flip-card__card--back > .flip-card__segment--bottom')
  let frontTop = flipCard.querySelector(
    '.flip-card__card--front > .flip-card__segment--top')
  let frontBottom = flipCard.querySelector(
    '.flip-card__card--front > .flip-card__segment--bottom')
  
  let oldValue = backTop.textContent
  backTop.textContent = newValue.toString()
  frontBottom.textContent = newValue.toString()
  frontTop.textContent = oldValue.toString()
  backBottom.textContent = oldValue.toString()
  
  flipCard.classList.add('flip')
  setTimeout( () => {
    flipCard.classList.remove('flip')
  }, 400)
}

function timeSplitter(time, timesArray) {
  timesArray[0] = Math.floor( time / (60*60*24) )
  time = time % (60*60*24)
  timesArray[1] = Math.floor( time / (60*60) )
  time = time % (60*60)
  timesArray[2] = Math.floor( time / 60 )
  timesArray[3] = time % 60  
}

// newTime is in seconds
function updateTime(flipCardsArray, newTime, timesArray) {
  let newTimesArray = []
  timeSplitter(newTime, newTimesArray)
  
  for (let i = 0; i < 4; i++) {
    if (timesArray[i] == newTimesArray[i]) continue
    newTimesArray[i] = (newTimesArray[i] >= 10)
                       ? newTimesArray[i]
                       : '0' + newTimesArray[i]
    timesArray[i] = newTimesArray[i]
    flipTo(flipCardsArray[i], newTimesArray[i])
  }
}

let flipCardsArray = document.querySelectorAll('.flip-card')
let time = 777341
let timesArray = []
updateTime(flipCardsArray, time, timesArray)
let id = setInterval( () => {
  time--
  if (time <= 0) {
    time = 0
    clearInterval(id)
  }
  updateTime(flipCardsArray, time, timesArray)
  
}, 1000)