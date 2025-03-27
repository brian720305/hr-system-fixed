
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  const [employees, setEmployees] = useState([])
  const [name, setName] = useState('')
  const [salary, setSalary] = useState('')
  const [attendance, setAttendance] = useState([])

  useEffect(() => {
    const empData = localStorage.getItem('employees')
    const attData = localStorage.getItem('attendance')
    if (empData) setEmployees(JSON.parse(empData))
    if (attData) setAttendance(JSON.parse(attData))
  }, [])

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees))
    localStorage.setItem('attendance', JSON.stringify(attendance))
  }, [employees, attendance])

  const addEmployee = () => {
    if (!name || !salary) return
    setEmployees([...employees, {
      id: Date.now().toString(),
      name, salary: parseFloat(salary)
    }])
    setName('')
    setSalary('')
  }

  const importCSV = async (e) => {
    const file = e.target.files[0]
    const text = await file.text()
    const rows = text.trim().split('\n').slice(1)
    const data = rows.map(r => {
      const [name, date, checkIn, checkOut] = r.split(',')
      return { name, date, checkIn, checkOut }
    })
    setAttendance([...attendance, ...data])
  }

  const exportPayroll = () => {
    const workingDays = 22
    const month = new Date().toISOString().slice(0, 7)
    const header = ['姓名', '月份', '月薪', '出勤天數', '實領薪資']
    const rows = employees.map(emp => {
      const attDays = attendance.filter(a => a.name === emp.name && a.date.startsWith(month)).length
      const daily = emp.salary / workingDays
      const earned = (attDays * daily).toFixed(2)
      return [emp.name, month, emp.salary, attDays, earned]
    })
    const csv = [header, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = '薪資報表.csv'
    link.click()
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
      <h1>人資系統（正式企業版）</h1>

      <h2>員工管理</h2>
      <input placeholder='姓名' value={name} onChange={e => setName(e.target.value)} />
      <input placeholder='月薪' value={salary} onChange={e => setSalary(e.target.value)} type='number' />
      <button onClick={addEmployee}>新增員工</button>
      <ul>
        {employees.map(e => <li key={e.id}>{e.name}（月薪：{e.salary}）</li>)}
      </ul>

      <h2>出勤資料匯入（CSV）</h2>
      <input type='file' accept='.csv' onChange={importCSV} />
      <ul>
        {attendance.map((a, i) => (
          <li key={i}>{a.date} - {a.name}：{a.checkIn} ~ {a.checkOut}</li>
        ))}
      </ul>

      <h2>薪資報表</h2>
      <button onClick={exportPayroll}>匯出薪資報表 CSV</button>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
