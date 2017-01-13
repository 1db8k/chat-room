var menuSVG = document.querySelectorAll('.menuSVG')[0]
var dropdownMenu = document.querySelectorAll('.dropdownMenu')[0]
var wrapper = document.createElement('div')
wrapper.class = 'wrapper'
wrapper.style.position = 'absolute'
wrapper.style.width = '100vw'
wrapper.style.top = '0'
wrapper.style.left = '0'
wrapper.style.height = '100vh'

if (menuSVG) {
  menuSVG.addEventListener('click', function (event) {
    var parent = dropdownMenu.parentNode

    parent.replaceChild(wrapper, dropdownMenu)
    wrapper.appendChild(dropdownMenu)
    dropdownMenu.style.display = 'flex'
    wrapper.style.display = 'initial'
  })

  wrapper.addEventListener('click', function (event) {
    var grandParent = dropdownMenu.parentNode.parentNode

    grandParent.replaceChild(dropdownMenu, wrapper)
    dropdownMenu.style.display = 'none'
    wrapper.style.display = 'none'
  })
}
