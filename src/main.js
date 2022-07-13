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

function makeClipPath(position, h, w, r) {
  // h: card height
  // w: card width
  // r: hole radius
  let path
  if (position == 'top') {
    path = `path("M 0 ${h/2-r} Q ${r} ${h/2-r}, ${r} ${h/2} H ${w-r} \
                  Q ${w-r} ${h/2-r}, ${w} ${h/2-r} V 0 H 0 Z")`
  } else if (position == 'bottom') {
    path = `path("M 0 ${h/2+r} Q ${r} ${h/2+r}, ${r} ${h/2} H ${w-r} \
                  Q ${w-r} ${h/2+r}, ${w} ${h/2+r} V ${h} H 0 Z")`
  }
  return path
}

function changeClipPath(flipCard) {
  let height = flipCard.clientHeight
  let width = flipCard.clientWidth
  radius = height / 15
  let topSegments = flipCard.querySelectorAll('.flip-card__segment--top')
  let bottomSegments = flipCard.querySelectorAll('.flip-card__segment--bottom')
  let topSegmentsPath = makeClipPath('top', height, width, radius)
  let bottomSegmentsPath = makeClipPath('bottom', height, width, radius)
    
  for (let i = 0; i < topSegments.length; i++) {
    topSegments[i].style.clipPath = topSegmentsPath
  }
  for (let i = 0; i < bottomSegments.length; i++) {
    bottomSegments[i].style.clipPath = bottomSegmentsPath
  }
}

let flipCardsArray = document.querySelectorAll('.flip-card')
for (let i = 0; i < flipCardsArray.length; i++) {
  changeClipPath(flipCardsArray[i])
}
addEventListener('resize', () => {
  for (let i = 0; i < flipCardsArray.length; i++) {
    changeClipPath(flipCardsArray[i])
  }
})

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
