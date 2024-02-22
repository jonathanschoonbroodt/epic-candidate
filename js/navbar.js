const navbar = document.querySelector('nav')

console.log(navbar)


document.addEventListener('scroll', (event) => {
  if (window.scrollY >= 0) {
    navbar.classList.add('expanded')
    
    if (navbar.classList.contains('reduced')) {
      navbar.classList.remove('reduced')
    }
  }
  
  if (window.scrollY === 0) {
    navbar.classList.remove('expanded')
    navbar.classList.add('reduced')
  }
})