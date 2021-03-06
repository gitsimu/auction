import React from 'react'
import User from '../components/User'
import * as script from '../js/script'

function History({...props}) {
  const history = Object.values(props.history || {})
  console.log('history', history)
  
  const compare = (a, b) => {
    if ( parseInt(a.price) < parseInt(b.price) ){
      return 1
    }
    if ( parseInt(a.price) > parseInt(b.price) ){
      return -1
    }
    return 0
  }

  return (
    <div className="history">
      <div className="sub-title">{`입찰 내역(${history.length})`}</div>
      {history.length > 0 && history.sort(compare).map((m, i) => {
        console.log('m', m);
        return (          
          <div className={i == 0 ? 'history-item first' : 'history-item'}>
            <div>
              <User userinfo={m.userinfo} expired={false}/>
              {/* <div className="bidder">
                {m.userinfo && m.userinfo.id && m.userinfo.avatar && (
                  <img src={`https://cdn.discordapp.com/avatars/${m.userinfo.id}/${m.userinfo.avatar}.png`}></img>
                )}
                <span>{m.userinfo.userid}</span>
              </div> */}
            </div>
            <div>[입찰] {script.numberWithCommas(m.price)} VIP</div>
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