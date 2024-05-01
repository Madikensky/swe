const userId = document.getElementById('user-id')
const userFullName = document.getElementById('user-fullName')
const userRole = document.getElementById('user-role')
const userEmail = document.getElementById('user-email')
const userPhone = document.getElementById('user-phone')

const btnEdit = document.querySelector('.btn-edit')
const btnCancel = document.querySelector('.btn-cancel')
const btnSubmit = document.querySelector('.btn-submit')

const formEdit = document.querySelector('.form-edit')

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

btnEdit.addEventListener('click', () => {
  setMode('none', 'block')
  removeAttributes()
})

btnCancel.addEventListener('click', () => {
  setMode('block', 'none')
  addAttributes()
})

formEdit.addEventListener('submit', (e) => {
  e.preventDefault()
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
      location.reload()
    })
  setMode('block', 'none')
  addAttributes()
})
