/*
à fond à gauche 
perspective(2560px) rotateY(-30deg)

à fond à droite 
perspective(2560px) rotateY(30deg)

position du curseur à droite axe x => coefficient = 1
position du curseur au centre axe x => coefficient = 0
position du curseur à gauche axe x => coefficient = -1

cursorPosition - centerOfContainer (containerWidth / 2) = resultToCalculateCoeffient
coefficient = resultToCalculateCoeffient / containerWidth
rectifiedCoefficient = coefficient * 2
rotateY = 30 * rectifiedCoefficient

attach event listener on mouse over to get coefficient and apply style for small and span inside our container
*/

const trackedContainer = document.getElementById('track-mouse-and-rotate-y')
const trackAndRotate = document.getElementById('track-and-rotate')
const containerWidth = trackedContainer.clientWidth
const centralPosition = containerWidth / 2
const test = document.getElementById('test')
let rotationValueY
let rotationValueX

trackedContainer.addEventListener('mousemove', (event) => {
  const containerRect = trackedContainer.getBoundingClientRect()
  const cursorPosition = event.clientX - containerRect.left
  const coefficient = ((cursorPosition - centralPosition) / containerWidth) * 2
  
  test.innerText = coefficient
  
  if (coefficient >= 0) {
    trackAndRotate.style.transformOrigin = `right center`
    rotationValueY = 0 + (60 * coefficient)
    // rotationValueX = 0 + (60 * coefficient)
  }
  
  if (coefficient <= 0) {
    trackAndRotate.style.transformOrigin = `left center`
    rotationValueY = 0 - (60 * coefficient)
    // rotationValueX = 0 - (60 * coefficient)
  }
  
  trackAndRotate.style.transform = `rotateY(${rotationValueY}deg)`
  // trackAndRotate.style.transform = `rotateY(${rotationValueY}deg) rotateX(${rotationValueX}deg)`
})
