const btnProfile = document.querySelector('.btn-permission')
btnProfile.style.color = '#fff'
btnProfile.style.backgroundColor = '#775732'

const currBody = document.querySelector('.current-body')
const sendBtn = document.querySelector('.btn-send')

const inputs = document.querySelectorAll('input[type="text"]')
inputs[0].value = userInfo.fullName
inputs[1].value = userInfo.email

console.log(inputs)

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
    if (compareDates(inputs[2].value, inputs[3].value)) {
      validityIcons[3].style.display = 'none'
      validityIcons[2].style.display = 'inline'
      sendBtn.style.pointerEvents = 'all'
      sendBtn.removeAttribute('disabled')
    }
  }
})

function compareDates(startDate, endDate) {
  const startDateParts = startDate.split('/')
  const endDateParts = endDate.split('/')

  const startDateObj = new Date(
    startDateParts[2],
    startDateParts[1] - 1,
    startDateParts[0]
  )
  const endDateObj = new Date(
    endDateParts[2],
    endDateParts[1] - 1,
    endDateParts[0]
  )

  if (startDateObj < endDateObj) {
    return true
  } else {
    return false
  }
}

const inputFile = document.getElementById('student-img')
const submitForm = document.querySelector('.form-permission')
const modalPerm = document.querySelector('.modal-perm')
const inputStudent = document.querySelector(
  '.permission-img label:nth-child(2)'
)
const exit = document.querySelector('.exit')
exit.style.cursor = 'pointer'

inputFile.addEventListener('input', (e) => {
  const file = inputFile.files[0]
  console.log(file)
  const minSize = 10
  const maxSize = 5000
  const fileSize = Math.floor(file.size / 1000) //in kb
  console.log(fileSize)

  if (fileSize < minSize) {
    alert('Small file size')
    inputStudent.textContent = 'Choose file'
    inputFile.value = ''
  } else if (fileSize > maxSize) {
    alert('Big file size')
    inputFile.value = ''
    inputStudent.textContent = 'Choose file'
  } else {
    const fileInfo = document.querySelector('.file-info')
    fileInfo.style.display = 'flex'
    inputStudent.textContent = file.name
    const spans = fileInfo.querySelectorAll('p span')
    spans[0].textContent = file.name.split('.')[file.name.split('.').length - 1]
    spans[1].textContent = `${fileSize}kb`
  }
})

submitForm.addEventListener('submit', (e) => {
  e.preventDefault()
  overlay.style.display = 'block'
  loading.style.display = 'flex'

  // setTimeout(() => {
  //   modalPerm.style.display = 'flex'
  // }, 3000)

  const tArea = document.querySelector('textarea').value

  const formData = new FormData()
  formData.append('file', inputFile.files[0])
  formData.append('fullName', inputs[0].value)
  formData.append('email', inputs[1].value)
  formData.append('startDate', inputs[2].value)
  formData.append('endDate', inputs[3].value)
  formData.append('reason', tArea)

  console.log(formData)

  fetch('https://2nw1506q-8080.euw.devtunnels.ms/api/permission/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then((e) => {
      if (!e.ok) {
        throw new Error('Mistake!')
      }
      return e
    })
    .then((data) => {
      modalPerm.style.display = 'flex'
    })
})

exit.addEventListener('click', () => {
  modalPerm.style.display = 'none'
  overlay.style.display = 'none'
  loading.style.display = 'none'
  location.reload()
})
