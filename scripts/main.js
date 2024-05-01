let token = localStorage.getItem('token')
let userInfo = JSON.parse(localStorage.getItem('userInfo'))
console.log(token)
console.log(userInfo)

const username = document.querySelector('.header-username span')
username.textContent = userInfo.fullName

function replaceListener(page) {
  location.replace(page)
}

const buttons = document.querySelectorAll('button')

buttons[0].addEventListener('click', () => {
  replaceListener('../pages/homepage.html')
})

buttons[3].addEventListener('click', () => {
  replaceListener('../pages/attendance.html')
})

buttons[4].addEventListener('click', () => {
  replaceListener('../pages/profile.html')
})

buttons[7].addEventListener('click', () => {
  replaceListener('../index.html')
})
