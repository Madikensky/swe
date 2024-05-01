const token = localStorage.getItem('token')
const userInfo = JSON.parse(localStorage.getItem('userInfo'))
console.log(token)
console.log(userInfo)

const username = document.querySelector('.header-username span')
username.textContent = userInfo.fullName

const buttons = document.querySelectorAll('button')
buttons[0].addEventListener('click', () => {
  location.replace('../pages/homepage.html')
})

buttons[7].addEventListener('click', () => {
  location.replace('../index.html')
})
