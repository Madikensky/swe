const userId = document.getElementById('user-id')
const userFullName = document.getElementById('user-fullName')
const userRole = document.getElementById('user-role')
const userEmail = document.getElementById('user-email')
const userPhone = document.getElementById('user-phone')

const btnEdit = document.querySelector('.btn-edit')
const btnCancel = document.querySelector('.btn-cancel')
const btnSubmit = document.querySelector('.btn-submit')

const formEdit = document.querySelector('.form-edit')

const modal = document.querySelector('.modal')
const modalBtn = document.querySelector('.message-btn')

const hierarchy = document.querySelector('.current-page')

const spanPhone = document.querySelector('.form-phone span')

const btnProfile = document.querySelector('.btn-profile')
btnProfile.style.color = '#fff'
btnProfile.style.backgroundColor = '#775732'

modalBtn.addEventListener('click', () => {
  modal.style.display = 'none'
  location.reload()
})

console.log(userInfo)

userId.value = userInfo.id
userFullName.value = userInfo.fullName
userRole.value = userInfo.userRole
userEmail.value = userInfo.email
userPhone.value = userInfo.phoneNumber

function setMode(forEdit, forOther) {
  btnEdit.style.display = forEdit
  btnCancel.style.display = forOther
  btnSubmit.style.display = forOther
}

function removeAttributes() {
  userEmail.removeAttribute('disabled')
  userEmail.removeAttribute('readonly')
  userEmail.style.backgroundColor = '#fff'

  userPhone.removeAttribute('disabled')
  userPhone.removeAttribute('readonly')
  userPhone.style.backgroundColor = '#fff'
}

function addAttributes() {
  userEmail.setAttribute('disabled', '')
  userEmail.setAttribute('readonly', '')
  userEmail.style.backgroundColor = '#d9d9d9'

  userPhone.setAttribute('disabled', '')
  userPhone.setAttribute('readonly', '')
  userPhone.style.backgroundColor = '#d9d9d9'
}

function checkNumber(phoneNumber) {
  const regex = /^\d{1}\-\d{3}\-\d{3}\-\d{4}$/
  return regex.test(phoneNumber)
}

userPhone.addEventListener('input', (e) => {
  if (!checkNumber(userPhone.value)) {
    btnSubmit.setAttribute('disabled', '')
    btnSubmit.style.pointerEvents = 'none'
    spanPhone.style.visibility = 'unset'
  } else {
    btnSubmit.style.pointerEvents = 'all'
    btnSubmit.removeAttribute('disabled')
    spanPhone.style.visibility = 'hidden'
  }
})

btnEdit.addEventListener('click', () => {
  btnSubmit.removeAttribute('disabled')
  btnSubmit.style.pointerEvents = 'all'

  setMode('none', 'block')
  hierarchy.textContent = `User Profile -> Edit`
  removeAttributes()
})

btnCancel.addEventListener('click', () => {
  setMode('block', 'none')
  hierarchy.textContent = 'User Profile'
  addAttributes()
})

formEdit.addEventListener('submit', (e) => {
  e.preventDefault()
  overlay.style.display = 'block'
  loading.style.display = 'flex'
  fetch('https://2nw1506q-8080.euw.devtunnels.ms/api/profile/update', {
    method: 'POST',
    body: JSON.stringify({
      email: userEmail.value,
      phoneNumber: userPhone.value,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Some error')
      }
      return response.json()
    })
    .then((data) => {
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      console.log(userInfo)
      hierarchy.textContent = 'User Profile'
      overlay.style.display = 'none'
      loading.style.display = 'none'
      modal.style.display = 'flex'
    })
  setMode('block', 'none')
  addAttributes()
})
