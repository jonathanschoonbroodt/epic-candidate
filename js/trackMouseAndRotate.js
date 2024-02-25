const trackedContainer = document.getElementById('track-mouse-and-rotate-y')
const trackAndRotateSpan = document.getElementById('track-and-rotate-span')
const trackAndRotateSmall = document.getElementById('track-and-rotate-small')
const containerWidth = trackedContainer.clientWidth
const containerHeight = trackedContainer.clientHeight
const centralPositionWidth = containerWidth / 2
const centralPositionHeight = containerHeight / 2

let rotationValueY
let rotationValueX

trackedContainer.addEventListener('mousemove', (event) => {
  const containerRect = trackedContainer.getBoundingClientRect()
  const cursorPositionX = event.clientX - containerRect.left
  const cursorPositionY = event.clientY - containerRect.top
  const coefficientX = (cursorPositionX - centralPositionWidth) / centralPositionWidth
  const coefficientY = (cursorPositionY - centralPositionHeight) / centralPositionHeight

  rotationValueX = 30 * coefficientX
  rotationValueY = 30 * -coefficientY

  if (coefficientX >= 0) {
    trackAndRotateSpan.style.transformOrigin = 'right center'
    trackAndRotateSmall.style.transformOrigin = 'right center'
  } else {
    trackAndRotateSpan.style.transformOrigin = 'left center'
    trackAndRotateSmall.style.transformOrigin = 'left center'
  }

  trackAndRotateSpan.style.transform = `rotateY(${rotationValueX}deg) rotateX(${rotationValueY}deg)`
  trackAndRotateSmall.style.transform = `rotateY(${rotationValueX}deg) rotateX(${rotationValueY}deg)`
})
