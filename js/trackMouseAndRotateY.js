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
let rotationValue

trackedContainer.addEventListener('mousemove', (event) => {
  const containerRect = trackedContainer.getBoundingClientRect()
  const cursorPosition = event.clientX - containerRect.left
  const coefficient = ((cursorPosition - centralPosition) / containerWidth) * 2

  // Apply the rotation to the element
  // trackAndRotate.style.transform = `rotateY(${rotationValue}deg)`
})
