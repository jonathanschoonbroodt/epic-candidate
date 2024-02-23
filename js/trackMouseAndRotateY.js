/*
à fond à gauche 
perspective(2560px) rotateY(-30deg)

à fond à droite 
perspective(2560px) rotateY(30deg)

position du curseur à droite axe x => coefficientX = 1
position du curseur au centre axe x => coefficientX = 0
position du curseur à gauche axe x => coefficientX = -1

cursorPosition - centerOfContainer (containerWidth / 2) = resultToCalculateCoeffient
coefficientX = resultToCalculateCoeffient / containerWidth
rectifiedcoefficientX = coefficientX * 2
rotateY = 30 * rectifiedcoefficientX

attach event listener on mouse over to get coefficientX and apply style for small and span inside our container
*/

const trackedContainer = document.getElementById('track-mouse-and-rotate-y')
const trackAndRotate = document.getElementById('track-and-rotate')
const containerWidth = trackedContainer.clientWidth
const containerHeight = trackedContainer.clientHeight
const centralPositionWidth = containerWidth / 2
const centralPositionHeight = containerHeight / 2
const test = document.getElementById('test')
let rotationValueY
let rotationValueX

trackedContainer.addEventListener('mousemove', (event) => {
  const containerRect = trackedContainer.getBoundingClientRect()
  const cursorPositionX = event.clientX - containerRect.left
  const cursorPositionY = event.clientY - containerRect.top
  const coefficientX = ((cursorPositionX - centralPositionWidth) / containerWidth) * 2
  const coefficientY = ((cursorPositionY - centralPositionHeight) / containerHeight) * 2
  
  rotationValueY = (100 * coefficientY)
  
  test.innerText =  `${coefficientX} + ${coefficientY} + ${rotationValueY}`
  
  if (coefficientX >= 0) {
    trackAndRotate.style.transformOrigin = `right center`
    rotationValueX = 0 + (30 * coefficientX)
    // rotationValueX = 0 + (60 * coefficientX)
  }
  
  if (coefficientX <= 0) {
    trackAndRotate.style.transformOrigin = `left center`
    rotationValueX = 0 - (30 * coefficientX)
    // rotationValueX = 0 - (60 * coefficientX)
  }
  
  trackAndRotate.style.transform = `rotateY(${rotationValueX}deg) rotateX(${rotationValueX}deg)`
  // trackAndRotate.style.transform = `rotateY(${rotationValueY}deg) rotateX(${rotationValueX}deg)`
})
