
import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>人資系統（完整版）</h1>
      <ul>
        <li>✅ 員工資料管理</li>
        <li>✅ 上下班打卡</li>
        <li>✅ 請假申請（事假 / 病假 / 特休）</li>
        <li>✅ 薪資自動計算</li>
        <li>✅ 匯出出勤 / 請假 / 薪資報表</li>
      </ul>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
