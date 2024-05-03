let token = localStorage.getItem('token')
let userInfo = JSON.parse(localStorage.getItem('userInfo'))
console.log(token)
console.log(userInfo)

const role = userInfo.userRole

const permBtn = document.querySelector('.btn-permission')
if (role === 'admin') {
  permBtn.setAttribute('disabled', '')
  permBtn.style.pointerEvents = 'none'
}

const overlay = document.querySelector('.overlay')
const loading = document.querySelector('.loading')

const username = document.querySelector('.header-username span')
username.textContent = userInfo.fullName

function replaceListener(page) {
  location.replace(page)
}

const buttons = document.querySelectorAll('.btn')

buttons[0].addEventListener('click', () => {
  console.log('df')
  replaceListener('../pages/homepage.html')
  console.log(buttons[0])
})

buttons[3].addEventListener('click', () => {
  replaceListener('../pages/attendance.html')
})

buttons[4].addEventListener('click', () => {
  replaceListener('../pages/profile.html')
})

buttons[5].addEventListener('click', () => {
  replaceListener('../pages/message.html')
})

buttons[6].addEventListener('click', () => {
  replaceListener('../pages/permission.html')
})

buttons[7].addEventListener('click', () => {
  replaceListener('../index.html')
})
