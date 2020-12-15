import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import Item from '../components/Item'
import { CATEGORY, ITEMS } from '../js/global'

const ITEM_CONNECTION = []

function Buy({info, ...props}) {
  const [loading, isLoading] = React.useState(false)
  const [myItems, setMyItems] = React.useState([])
  const [totalCount, setTotalCount] = React.useState(0)
  const database = props.database

  React.useEffect(() => {
    const user = database.ref(`/Users/${info.id}/buy`)
    
    Promise.resolve()
      .then(() => {
        isLoading(true)
        return user.orderByChild('timestamp').once('value')
      })
      .then(snapshots => {
        if (snapshots.val() === null) return []
        else {
          const arr = []
          snapshots.forEach(snapshot => {
            arr.push({key: snapshot.key, value: snapshot.val()})
          })
          return arr
        }
      })
      .then(arr => {
        setTotalCount(arr.length)
        arr.forEach((item) => {          
          const connection = database.ref(`/Items`)
          connection.orderByChild('id').equalTo(`${item.key}`).on('value', (snapshots) => {            
            snapshots.forEach(snapshot => {              
              setMyItems(oldItems => [...oldItems, snapshot.val()])
            })            
          })
          ITEM_CONNECTION.push(connection)          
        })   
      })
      .finally(() => {
        isLoading(false)
      })
    
    return () => {       
      setMyItems([])
      ITEM_CONNECTION.forEach((c) => { c.off() })
      ITEM_CONNECTION.length = 0
      user.off()
    }
  }, [])

  // React.useEffect(() => {    
  //   isLoading(true)
  //   const user = database.ref(`/Users/${info.userid}`)
  //   user.orderByChild('timestamp').on('value', (snapshots) => {
  //     const arr = []
  //     snapshots.forEach(snapshot => {
  //       arr.push(snapshot.val())
  //     })
  //     arr.sort(compare)
          
  //     setMyItems(arr)
  //     isLoading(false)
  //   })   
    
  //   return () => { items.off() }
  // }, [])

  // React.useEffect(() => {
  //   const user = database.ref(`/Users/${info.id}/buy`)
    
  //   Promise.resolve()
  //     .then(() => {
  //       return user.orderByChild('timestamp').once('value')
  //     })
  //     .then(snapshots => {
  //       if (snapshots.val() === null) return []
  //       else {
  //         const arr = []
  //         snapshots.forEach(snapshot => {
  //           arr.push(snapshot.val())
  //         })
  //         return arr
  //       }
  //     })
  //     .then(arr => {
  //       setMyItems(arr)        
  //     })
    
  //   return () => { user.off() }
  // }, [])

  return (
    <>
    <div className="buy-total">Total <span>{totalCount}</span></div>
    <div className="buy-items">      
      {myItems.map((m) => {
        console.log('myItems', myItems)
        return (<Item item={m} database={database} key={m.id} mine={false}/>)
      })}
      {myItems.length === 0 && (
        <div className="buy-items-empty">입찰내역이 없습니다.</div>
      )}
      {loading && (<div id="loading"><div></div></div>)}
    </div>
    </>
  )
}

const mapStateToProps = state => ({
  info: state.info,
})

export default connect(mapStateToProps)(Buy)