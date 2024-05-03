const formLogin = document.querySelector('.form-login')
const emailError = document.querySelector('.email-error')
const pswError = document.querySelector('.psw-error')

const overlay = document.querySelector('.overlay')
const loading = document.querySelector('.loading')

function validateValues(value) {
  pswError.style.display = value
  emailError.style.display = value
}

formLogin.addEventListener('submit', (e) => {
  e.preventDefault()
  loading.style.display = 'flex'
  overlay.style.display = 'block'

  const email = document.getElementById('input-id')
  const psw = document.getElementById('input-psw')

  const bodyToSend = {
    email: email.value,
    password: psw.value,
  }

  fetch('https://2nw1506q-8080.euw.devtunnels.ms/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyToSend),
  })
    .then((response) => {
      if (!response.ok) {
        validateValues('block')
        loading.style.display = 'none'
        overlay.style.display = 'none'
        throw new Error('Some mistakes')
      }
      loading.style.display = 'none'
      overlay.style.display = 'none'
      validateValues('none')
      return response.json()
    })
    .then((data) => {
      console.log(data)
      const token = data.token
      localStorage.setItem('token', token)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('count', data.count)
      location.replace('../pages/homepage.html')
    })
})
