
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  const [attendance, setAttendance] = useState([])

  const handleImport = async (e) => {
    const file = e.target.files[0]
    const text = await file.text()
    const rows = text.split('\n').slice(1).map(r => r.split(','))
    const data = rows.map(([name, date, inTime, outTime]) => ({ name, date, inTime, outTime }))
    setAttendance(data)
    localStorage.setItem('attendance', JSON.stringify(data))
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>HR 系統（正式版）</h1>
      <p>請使用 Excel (.csv) 匯入出勤資料：</p>
      <input type="file" accept=".csv" onChange={handleImport} />
      <h2>已匯入出勤紀錄</h2>
      <ul>
        {attendance.map((a, i) => (
          <li key={i}>{a.date} - {a.name}：{a.inTime} ~ {a.outTime}</li>
        ))}
      </ul>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
