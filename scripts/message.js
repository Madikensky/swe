const retakeAbsences = JSON.parse(localStorage.getItem('retakeAbsences'))
console.log(retakeAbsences)

const table = document.querySelector('.table-msg')
const tableReceived = document.querySelector('.table-received')

const receivedMessage = document.querySelector('.received-message')
const btnBack = document.querySelector('.btn-back')

btnBack.addEventListener('click', () => {
  receivedMessage.style.display = 'none'
  btnBack.style.display = 'none'
  table.style.display = 'table'
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

  row.setAttribute('data-sender', abs.from)
  row.setAttribute('data-sendData', abs['send-date'])
  row.setAttribute('data-subject', abs.subject)
  row.setAttribute('data-content', abs.content)
  row.style.cursor = 'pointer'
  row.className = 'data-row'
})

const allRows = document.querySelectorAll('.data-row')
allRows.forEach((row) => {
  row.addEventListener('click', () => {
    receivedMessage.style.display = 'flex'
    btnBack.style.display = 'block'
    table.style.display = 'none'
    const values = [
      row.getAttribute('data-sender'),
      row.getAttribute('data-sendData'),
      row.getAttribute('data-subject'),
      row.getAttribute('data-content'),
    ]
    tableReceived.querySelectorAll('tr td').forEach((cell, i) => {
      cell.innerHTML = values[i]
    })
  })
})
