import React from 'react'
import * as script from '../js/script'

function History({...props}) {
  const history = Object.values(props.history || {})
  console.log('history', history)
  
  return (
    <div className="history">
      {history.length > 0 && history.map((m) => {
        return (
          <div className="history-item">
            <div>{m.userid}</div>
            <div>{m.price}</div>
            <div>{script.getNiceTime(m.timestamp, new Date(), 1, true)}</div>
          </div>
        )
      })}
      {history.length == 0 && (
        <div className="history-empty">입찰 내역이 없습니다.</div>
      )}
    </div>
  )
}

export default History