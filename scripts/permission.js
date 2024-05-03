const btnProfile = document.querySelector('.btn-permission')
btnProfile.style.color = '#fff'
btnProfile.style.backgroundColor = '#775732'

const currBody = document.querySelector('.current-body')

const inputs = document.querySelectorAll('input[type="text"]')
inputs[0].value = userInfo.fullName
inputs[1].value = userInfo.email

const validityIcons = document.querySelectorAll('.date-wrapper img')
console.log(validityIcons)

console.log(inputs)

const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/

inputs[2].addEventListener('input', (e) => {
  const value = e.currentTarget.value

  if (!regex.test(value)) {
    validityIcons[1].style.display = 'inline'
    validityIcons[0].style.display = 'none'
  } else {
    validityIcons[1].style.display = 'none'
    validityIcons[0].style.display = 'inline'
  }
})

inputs[3].addEventListener('input', (e) => {
  const value = e.currentTarget.value

  if (!regex.test(value)) {
    validityIcons[3].style.display = 'inline'
    validityIcons[2].style.display = 'none'
  } else {
    validityIcons[3].style.display = 'none'
    validityIcons[2].style.display = 'inline'
  }
})

const submitForm = document.querySelector('.form-permission')
const modalPerm = document.querySelector('.modal-perm')
const exit = document.querySelector('.exit')
exit.style.cursor = 'pointer'

submitForm.addEventListener('submit', (e) => {
  e.preventDefault()
  overlay.style.display = 'block'
  loading.style.display = 'flex'

  setTimeout(() => {
    modalPerm.style.display = 'flex'
  }, 3000)
})

exit.addEventListener('click', () => {
  modalPerm.style.display = 'none'
  overlay.style.display = 'none'
  loading.style.display = 'none'
  location.reload()
})
