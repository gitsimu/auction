import React from 'react'
// import * as script from '../js/script'

function Timer({...props}) {
  const [time, setTime] = React.useState('-')
  const [timeState, setTimeState] = React.useState(0)
  const timestamp = props.timestamp

  React.useEffect(() => {
    const interval = setInterval(() => {      
      const time = (timestamp + 84600000 - new Date().getTime()) / 1000
      const hours = Math.floor(time / 3600)
      const minites = Math.floor(time % 3600 / 60)
      const seconds = Math.floor(time % 3600 % 60)      
          
      setTime(time > 0 ? `${hours > 9 ? hours : '0' + hours}:${minites > 9 ? minites : '0' + minites}:${seconds > 9 ? seconds : '0' + seconds}` : '만료')

      if (hours < 3) {
        setTimeState(1)
      } else if (hours < 1) {
        setTimeState(2)
      } else {
        setTimeState(0)
      }
    }, 1000)

    return () => { clearInterval(interval) }
  }, [])

  return (
    <div className={`time timestate-${timeState}`}>{time}</div>
  )
}

export default Timer