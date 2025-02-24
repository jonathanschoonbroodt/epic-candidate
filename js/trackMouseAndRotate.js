const trackedContainer = document.getElementById('track-mouse-and-rotate-y')
const trackAndRotateSpan = document.getElementById('track-and-rotate-span')
const trackAndRotateSmall = document.getElementById('track-and-rotate-small')

const containerWidth = trackedContainer.clientWidth
const containerHeight = trackedContainer.clientHeight
const centralPositionWidth = containerWidth / 2
const centralPositionHeight = containerHeight / 2

let rotationValueX = 0
let rotationValueY = 0

// Restoration control
let isRestoring = false
let restoreFrameId = null

/**
 * Apply the current rotation values to both elements.
 */
function applyRotation() {
  trackAndRotateSpan.style.transform = `rotateY(${rotationValueX}deg) rotateX(${rotationValueY}deg)`
  trackAndRotateSmall.style.transform = `rotateY(${rotationValueX}deg) rotateX(${rotationValueY}deg)`
}

/**
 * Smoothly step rotation values back toward 0.
 */
function restoreRotation() {
  // If we've canceled the restore (e.g., user re-entered), stop now.
  if (!isRestoring) return

  // Gradually nudge X toward 0
  if (rotationValueX > 0) {
    rotationValueX = Math.max(0, rotationValueX - 0.1)
  } else if (rotationValueX < 0) {
    rotationValueX = Math.min(0, rotationValueX + 0.1)
  }

  // Gradually nudge Y toward 0
  if (rotationValueY > 0) {
    rotationValueY = Math.max(0, rotationValueY - 0.1)
  } else if (rotationValueY < 0) {
    rotationValueY = Math.min(0, rotationValueY + 0.1)
  }

  applyRotation()

  // Continue if we're not at zero yet
  if (Math.abs(rotationValueX) > 0.01 || Math.abs(rotationValueY) > 0.01) {
    restoreFrameId = requestAnimationFrame(restoreRotation)
  } else {
    // Snap precisely to 0
    rotationValueX = 0
    rotationValueY = 0
    applyRotation()
    isRestoring = false
    restoreFrameId = null
    console.log('[restoreRotation] Done: rotation fully restored to 0')
  }
}

// Move with the mouse
trackedContainer.addEventListener('mousemove', (event) => {
  const containerRect = trackedContainer.getBoundingClientRect()

  const cursorPositionX = event.clientX - containerRect.left
  const cursorPositionY = event.clientY - containerRect.top

  const coefficientX = (cursorPositionX - centralPositionWidth) / centralPositionWidth
  const coefficientY = (cursorPositionY - centralPositionHeight) / centralPositionHeight

  // Up to ±30 degrees
  rotationValueX = 30 * coefficientX    // rotateY
  rotationValueY = 30 * -coefficientY   // rotateX

  // Adjust transform origin
  if (coefficientX >= 0) {
    trackAndRotateSpan.style.transformOrigin = 'right center'
    trackAndRotateSmall.style.transformOrigin = 'right center'
  } else {
    trackAndRotateSpan.style.transformOrigin = 'left center'
    trackAndRotateSmall.style.transformOrigin = 'left center'
  }

  applyRotation()
})

/**
 * On mouseleave, start restoring if not already in progress.
 */
trackedContainer.addEventListener('mouseleave', () => {
  if (!isRestoring) {
    console.log('[mouseleave] Starting restore...')
    isRestoring = true
    restoreFrameId = requestAnimationFrame(restoreRotation)
  }
})

/**
 * On mouseenter, cancel any ongoing restore so we can move immediately.
 */
trackedContainer.addEventListener('mouseenter', () => {
  if (isRestoring) {
    console.log('[mouseenter] Canceling restore due to re-entry...')
    isRestoring = false

    // Stop the requestAnimationFrame loop if needed
    if (restoreFrameId) {
      cancelAnimationFrame(restoreFrameId)
      restoreFrameId = null
    }
  }
})
