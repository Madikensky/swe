const retakeAbsences = JSON.parse(localStorage.getItem('retakeAbsences'))
console.log(retakeAbsences)

const currPage = document.querySelector('.current-page')
const currBody = document.querySelector('.current-body')
const certificateTable = document.querySelector('.message-certificates')

const btnProfile = document.querySelector('.btn-message')
btnProfile.style.color = '#fff'
btnProfile.style.backgroundColor = '#775732'

if (count > 0) {
  btnMessage.removeChild(notificationTotal)
  localStorage.setItem('count', 0)
}

const btnBack = document.querySelector('.btnBack')

const table = document.querySelector('.table-msg')

overlay.style.display = 'block'
loading.style.display = 'flex'

if (role === 'admin') {
  table.style.display = 'none'
  fetch('https://2nw1506q-8080.euw.devtunnels.ms/api/permission/download', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((data) => {
      if (!data.ok) {
        throw new Error('Some mistakes!')
      }
      overlay.style.display = 'none'
      loading.style.display = 'none'
      return data.json()
    })
    .then((response) => {
      console.log(response)
      const permissionTable = document.createElement('table')
      permissionTable.className = 'permission-table'

      const head = document.createElement('thead')
      const headRow = head.insertRow()

      const num = document.createElement('th')
      const sendDate = document.createElement('th')
      const info = document.createElement('th')
      const sender = document.createElement('th')

      num.textContent = '№'
      sendDate.textContent = 'Send Date'
      info.textContent = 'Information'
      sender.textContent = 'Sender'

      headRow.append(num, sendDate, info, sender)
      permissionTable.append(head)

      currBody.appendChild(permissionTable)

      response.forEach((data, i) => {
        const row = permissionTable.insertRow()

        const id = row.insertCell()
        const sendDate = row.insertCell()
        const info = row.insertCell()
        const sender = row.insertCell()

        id.textContent = i + 1
        sendDate.textContent = data.endDate
        info.textContent = 'Permission'

        sender.textContent = data.fullName
        sender.style.color = 'orange'
        sender.style.cursor = 'pointer'
        sender.className = 'sender'

        sender.setAttribute('data-from', data.fullName)
        sender.setAttribute('data-sendDate', data.endDate)
        sender.setAttribute('data-subject', 'Permission')
        sender.setAttribute('data-content', data.reason)
        sender.setAttribute('data-link', data.fileKey)
      })
    })
    .then(() => {
      const allSenders = document.querySelectorAll('.sender')

      allSenders.forEach((sender) => {
        sender.addEventListener('click', () => {
          currPage.textContent = 'Notification > Message'
          const permissionTable = document.querySelector('.permission-table')
          permissionTable.style.display = 'none'
          certificateTable.style.display = 'flex'
          console.log(permissionTable.children[0])

          const tRows = certificateTable.querySelectorAll('td')
          const crtfLink = document.querySelector('.crtf-link')
          const attributes = sender.attributes
          console.log(attributes)
          tRows.forEach((tRow, i) => {
            tRow.innerHTML = attributes[i + 1].value
          })
          crtfLink.href = attributes[5].value
          console.log(certificateTable.querySelectorAll('td'))
        })
      })
      btnBack.addEventListener('click', () => {
        const permissionTable = document.querySelector('.permission-table')
        currPage.textContent = 'Notification'

        permissionTable.style.display = 'table'
        certificateTable.style.display = 'none'
      })
    })
} else {
  const tableReceived = document.querySelector('.table-received')

  overlay.style.display = 'none'
  loading.style.display = 'none'

  const receivedMessage = document.querySelector('.received-message')
  const btnBack = document.querySelector('.btn-back')

  btnBack.addEventListener('click', () => {
    receivedMessage.style.display = 'none'
    btnBack.style.display = 'none'
    table.style.display = 'table'
    currPage.textContent = 'Notification'
  })

  retakeAbsences.forEach((abs, i) => {
    const row = table.insertRow()

    const rowId = row.insertCell()
    const rowDate = row.insertCell()
    const rowInfo = row.insertCell()
    const rowSender = row.insertCell()
    rowSender.style.color = '#4760e4'

    rowId.innerHTML = i + 1
    rowDate.innerHTML = abs['send-date']
    rowInfo.innerHTML = abs.subject
    rowSender.innerHTML = abs.from

    rowSender.className = 'row-sender'
    rowSender.style.cursor = 'pointer'

    rowSender.setAttribute('data-sender', abs.from)
    rowSender.setAttribute('data-senderName', abs['course-name'])
    rowSender.setAttribute('data-sendData', abs['send-date'])
    rowSender.setAttribute('data-subject', abs.subject)
    rowSender.setAttribute('data-content', abs.content)
    console.log(abs)
    row.className = 'data-row'
  })

  const allRows = document.querySelectorAll('.row-sender')
  allRows.forEach((row) => {
    row.addEventListener('click', () => {
      currPage.textContent = `Notification > Message`
      receivedMessage.style.display = 'flex'
      btnBack.style.display = 'block'
      table.style.display = 'none'
      const values = [
        row.getAttribute('data-sender'),
        row.getAttribute('data-senderName'),
        row.getAttribute('data-sendData'),
        row.getAttribute('data-subject'),
        row.getAttribute('data-content'),
      ]
      let idx = 0
      tableReceived.querySelectorAll('tr td').forEach((cell, i) => {
        if (idx === 0) {
          cell.innerHTML = `${values[1]} (${values[0]})`
          idx = 1
        } else {
          cell.innerHTML = values[idx]
        }
        idx++
      })
    })
  })
}
