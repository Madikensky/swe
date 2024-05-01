const tableBody = document.querySelector('tbody')
const table = document.querySelector('table')

overlay.style.display = 'block'
loading.style.display = 'flex'

fetch('https://2nw1506q-8080.euw.devtunnels.ms/api/attendance', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Some errors')
    }
    overlay.style.display = 'none'
    loading.style.display = 'none'
    table.style.display = 'table'
    return response.json()
  })
  .then((response) => {
    for (let k in response) {
      const classId = response[k].class_id
      const courseCode = response[k].attendance.course_id
      const courseName = response[k].attendance.course_name

      const lastAbs = response[k].attendance.last_absent_date

      const absences = response[k].attendance.counts.absent
      const manuals = response[k].attendance.counts.manual
      const presents = response[k].attendance.counts.present
      const permitted = response[k].attendance.counts.permute
      const absToPresents = response[k].attendance.counts['absent->present']

      const percent = Math.floor((absences * 100) / 8)

      console.log(response[k])

      const newRow = tableBody.insertRow()

      const values = [
        courseCode,
        courseName,
        presents,
        absences,
        manuals,
        permitted,
        absToPresents,
        percent,
      ]

      values.forEach((value, i) => {
        const cell = newRow.insertCell()
        if (i === 0) {
          cell.className = 'course-code'
          cell.setAttribute('data-classId', classId)
        }
        if (i === 7) {
          const absencePercent = document.createElement('div')
          absencePercent.className = 'absence-percent'

          const inputRange = document.createElement('input')
          const percent = document.createElement('span')
          const limit = document.createElement('span')

          inputRange.type = 'range'
          inputRange.min = 0
          inputRange.max = 100
          if (value >= 0 && value < 10) {
            inputRange.style.background = `linear-gradient(to right, #8BBF36 ${value}%, #ddd ${value}%)`
          } else if (value >= 10 && value < 20) {
            inputRange.style.background = `linear-gradient(to right, #D7BD38 ${value}%, #ddd ${value}%)`
          } else if (value >= 20 && value < 30) {
            inputRange.style.background = `linear-gradient(to right, #C75E5E ${value}%, #ddd ${value}%)`
          } else {
            inputRange.style.background = `linear-gradient(to right, red ${value}%, #ddd ${value}%)`
          }

          percent.textContent = `${value}%`

          limit.className = 'limit'

          absencePercent.append(inputRange, percent, limit)
          cell.appendChild(absencePercent)
        } else {
          cell.innerHTML = value
        }
      })
    }
  })
