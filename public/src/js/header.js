var menuSVG = document.querySelectorAll('.menuSVG')[0]
var dropdownMenu = document.querySelectorAll('.dropdownMenu')[0]

menuSVG.addEventListener('click', function () {
  dropdownMenu.display = 'inherit'
  dropdownMenu.focus()
})

dropdownMenu.on('blur', function () {
  dropdownMenu.display = 'none'
})
