const body = document.querySelector('body')
const navbar = document.querySelector('.navbar-container')
const burgerContainer = document.getElementById('burger-container')
const modalNavbar = document.getElementById('modal-navbar')

document.addEventListener('scroll', (event) => {
  if (window.scrollY >= 0) {
    navbar.classList.add('expanded')
    
    if (navbar.classList.contains('reduced')) {
      navbar.classList.remove('reduced')
    }
  }
  
  if (window.scrollY === 0 && !navbar.classList.contains('burgeropen')) {
    navbar.classList.remove('expanded')
    navbar.classList.add('reduced')
  }
})

burgerContainer.addEventListener('click', (event) => {
  if (!navbar.classList.contains('burgeropen')) {
    navbar.classList.add('burgeropen')
    body.style.overflowY = 'hidden'
  } else {
    navbar.classList.remove('burgeropen')
    body.style.overflowY = 'scroll'
  }

  if (!modalNavbar.classList.contains('active')) {
    modalNavbar.classList.add('active')
  } else {
    modalNavbar.classList.remove('active')
  }
})