const btnProfile = document.querySelector('.btn-attendance')
btnProfile.style.color = '#fff'
btnProfile.style.backgroundColor = '#775732'

const currPage = document.querySelector('.current-page')
const currBody = document.querySelector('.current-body')
const backWrapper = document.querySelector('.back-wrapper')
const adminWrapper = document.querySelector('.admin-wrapper')

overlay.style.display = 'block'
loading.style.display = 'flex'

if (role === 'admin') {
  backWrapper.style.display = 'none'
  currBody.style.justifyContent = 'center'
  const table = document.querySelector('.table-admin')
  fetch('https://sweproject.onrender.com/api/admin/attendance', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((data) => {
      if (!data.ok) {
        throw new Error('new problems')
      }
      adminWrapper.style.display = 'flex'
      overlay.style.display = 'none'
      loading.style.display = 'none'
      return data.json()
    })
    .then((response) => {
      const students = response
      console.log(students)
      students.forEach((student, i) => {
        const row = table.insertRow()

        const rowNumber = row.insertCell()
        const rowStudent = row.insertCell()
        const rowId = row.insertCell()

        rowStudent.style.cursor = 'pointer'
        rowStudent.style.color = 'orange'
        rowStudent.className = 'row'
        rowStudent.setAttribute('data-studentName', student.studentFullName)

        rowStudent.setAttribute('classes', JSON.stringify(student.classes))

        rowNumber.innerHTML = i + 1
        rowStudent.innerHTML = student.studentFullName
        rowId.innerHTML = student.studentId
      })
    })
    .then(() => {
      const allRows = document.querySelectorAll('.row')
      allRows.forEach((row) => {
        row.addEventListener('click', () => {
          currPage.textContent = `Electronic Attendance > ${row.getAttribute(
            'data-studentName'
          )}`
          adminWrapper.style.display = 'none'
          const classes = JSON.parse(row.getAttribute('classes'))
          const classTable = document.createElement('table')
          classTable.className = 'student-statistics'
          const mainRow = classTable.insertRow()

          const id = document.createElement('th')
          const course = document.createElement('th')
          const code = document.createElement('th')
          const att = document.createElement('th')

          id.innerHTML = '№'
          course.innerHTML = 'Course'
          code.innerHTML = 'Code'
          att.innerHTML = 'Attendance'

          mainRow.append(id, course, code, att)
          console.log(classes)
          classes.forEach((cls, i) => {
            const classRow = classTable.insertRow()

            const classNum = classRow.insertCell()
            const classId = classRow.insertCell()
            const className = classRow.insertCell()
            const classPercent = classRow.insertCell()

            const percent = Math.floor((cls.absentCount * 100) / 8)

            classNum.innerHTML = i + 1
            classId.innerHTML = cls.courseId
            className.innerHTML = cls.courseName
            classPercent.innerHTML = `${percent}%`

            if (percent > 30) {
              classRow.style.backgroundColor = 'red'
            }
          })
          const btn = document.createElement('button')
          btn.className = 'btn-toStudentsList'
          btn.textContent = 'Go Back'
          currBody.appendChild(classTable)
          currBody.appendChild(btn)

          btn.addEventListener('click', () => {
            currPage.textContent = 'electronic attendance'
            currBody.removeChild(classTable)
            currBody.removeChild(btn)
            adminWrapper.style.display = 'flex'
          })
        })
      })
    })
} else {
  const tableBody = document.querySelector('tbody')
  const table = document.querySelector('.table-att')
  const tableStatus = document.querySelector('.table-status')
  const btnBack = document.querySelector('.btn-back')

  fetch('https://sweproject.onrender.com/api/attendance', {
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
            cell.setAttribute('data-classCode', courseCode)
            cell.setAttribute('data-className', courseName)
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
              retakeAbsence['course-name'] = courseName
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
          const classCode = course.getAttribute('data-classCode')
          const className = course.getAttribute('data-className')
          overlay.style.display = 'block'
          loading.style.display = 'flex'
          fetch('https://sweproject.onrender.com/api/attendance/class', {
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
              currPage.textContent = `Electronic attendance > ${classCode} - ${className}`
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
                currPage.textContent = 'electronic attendance'
              })
            })
        })
      })
    })
}
