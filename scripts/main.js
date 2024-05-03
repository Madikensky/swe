let token = localStorage.getItem('token')
let userInfo = JSON.parse(localStorage.getItem('userInfo'))
let count = +localStorage.getItem('count')

console.log(token)
console.log(userInfo)
console.log(count)

const role = userInfo.userRole

const permBtn = document.querySelector('.btn-permission')
if (role === 'admin') {
  permBtn.setAttribute('disabled', '')
  permBtn.style.pointerEvents = 'none'
}

const overlay = document.querySelector('.overlay')
const loading = document.querySelector('.loading')

const notificationTotal = document.querySelector('.btn-message div')
const btnMessage = document.querySelector('.btn-message')
let visited = false

console.log(notificationTotal)
console.log(visited)
if (count > 0 && !visited) {
  notificationTotal.style.display = 'flex'
  notificationTotal.textContent = count
} else {
  notificationTotal.style.display = 'none'
}

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
