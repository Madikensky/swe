const tableBody = document.querySelector('tbody')
const table = document.querySelector('.table-att')
const tableStatus = document.querySelector('.table-status')
const btnBack = document.querySelector('.btn-back')

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
    const retakeAbsences = []
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

      const retakeAbsence = {}

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
            retakeAbsence['from'] = courseCode
            retakeAbsence['send-date'] = lastAbs
            retakeAbsence['subject'] = 'Attendance'
            retakeAbsence['content'] =
              'Your attendance has exceeded 30%, indicate the reason for absence and submit supporting documents.'
            retakeAbsences.push(retakeAbsence)
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
    localStorage.setItem('retakeAbsences', JSON.stringify(retakeAbsences))
  })
  .then(() => {
    const courses = document.querySelectorAll('.course-code')
    courses.forEach((course) => {
      course.addEventListener('click', () => {
        const classId = course.getAttribute('data-classid')
        overlay.style.display = 'block'
        loading.style.display = 'flex'
        fetch('https://2nw1506q-8080.euw.devtunnels.ms/api/attendance/class', {
          method: 'POST',
          body: JSON.stringify({
            classId: classId,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
          .then((e) => {
            if (!e.ok) {
              overlay.style.display = 'none'
              loading.style.display = 'none'
              throw new Error('Some problems')
            }
            overlay.style.display = 'none'
            loading.style.display = 'none'
            return e.json()
          })
          .then((data) => {
            console.log(data)
            tableStatus.style.display = 'table'
            table.style.display = 'none'
            btnBack.style.display = 'block'

            const basicRow = tableStatus.insertRow()

            const date = document.createElement('th')
            const status = document.createElement('th')

            date.innerHTML = 'Date'
            status.innerHTML = 'Status'
            basicRow.append(date, status)

            data.forEach((course) => {
              console.log(course)

              const newRow = tableStatus.insertRow()
              const cellDate = newRow.insertCell()
              const cellStatus = newRow.insertCell()

              cellDate.innerHTML = course.date
              cellStatus.innerHTML = course.status

              if (course.status === 'present') {
                cellStatus.style.color = 'green'
              } else if (course.status === 'absent') {
                cellStatus.style.color = 'red'
              } else if (course.status === 'manual') {
                cellStatus.style.color = 'orange'
              } else if (course.status === 'permitted') {
                cellStatus.style.color = 'blue'
              }
            })

            btnBack.addEventListener('click', () => {
              tableStatus.style.display = 'none'
              table.style.display = 'table'
              btnBack.style.display = 'none'
              tableStatus.removeChild(tableStatus.children[0])
            })
          })
      })
    })
  })
