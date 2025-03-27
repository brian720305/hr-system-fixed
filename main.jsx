
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  const [employees, setEmployees] = useState([])
  const [name, setName] = useState("")
  const [selectedId, setSelectedId] = useState("")
  const [log, setLog] = useState([])

  useEffect(() => {
    const emp = localStorage.getItem("employees")
    const logData = localStorage.getItem("log")
    if (emp) setEmployees(JSON.parse(emp))
    if (logData) setLog(JSON.parse(logData))
  }, [])

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees))
    localStorage.setItem("log", JSON.stringify(log))
  }, [employees, log])

  const addEmployee = () => {
    if (!name) return
    const newEmp = { id: Date.now().toString(), name }
    setEmployees([...employees, newEmp])
    setName("")
  }

  const punch = (type) => {
    if (!selectedId) return
    const now = new Date().toLocaleString()
    const emp = employees.find(e => e.id === selectedId)
    setLog([...log, { name: emp.name, type, time: now }])
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>HR 系統（互動功能）</h1>

      <h2>新增員工</h2>
      <input placeholder="姓名" value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addEmployee}>新增</button>

      <h2>選擇員工並打卡</h2>
      <select value={selectedId} onChange={e => setSelectedId(e.target.value)}>
        <option value="">請選擇員工</option>
        {employees.map(emp => <option key={emp.id} value={emp.id}>{emp.name}</option>)}
      </select>
      <button onClick={() => punch('上班')}>上班打卡</button>
      <button onClick={() => punch('下班')}>下班打卡</button>

      <h2>打卡記錄</h2>
      <ul>
        {log.map((item, i) => <li key={i}>{item.time} - {item.name} - {item.type}</li>)}
      </ul>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
