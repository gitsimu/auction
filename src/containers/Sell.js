import React from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase/app'
import Item from '../components/Item'
import { CATEGORY, ITEMS } from '../js/global'

// const CATEGORY = [
//   {key: 0, name: 'weapon'},
//   {key: 1, name: 'armor'},
//   {key: 2, name: 'accessary'},
//   {key: 3, name: 'consumable'},
//   {key: 4, name: 'etc'},
//   {key: 5, name: 'minions'},
// ]

// const ITEMS = [
//   {key: 0, category: 0, name: 'item 0', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
//   {key: 1, category: 1, name: 'item 1', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
//   {key: 2, category: 2, name: 'item 2', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
//   {key: 3, category: 3, name: 'item 3', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
//   {key: 4, category: 4, name: 'item 4', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
//   {key: 5, category: 5, name: 'item 5', thumbnail: 'https://chat.smlog.co.kr/resources/icon_bubble_256.png'},
// ]

function Sell({info, ...props}) {
  const [loading, isLoading] = React.useState(false)
  const [exhibitCategory, setExhibitCategory] = React.useState(0)
  const [exhibitItem, setExhibitItem] = React.useState(false)
  const [description, setDescription] = React.useState('')
  const [price1, setPrice1] = React.useState({value: 0, valid: true})
  const [price2, setPrice2] = React.useState({value: 0, valid: true})
  const [myItems, setMyItems] = React.useState([])
  const database = props.database

  // React.useEffect(() => {
  //   // const items = database.ref(`/Users/${info.id}/Items`).orderByChild('timestamp')
  //   const items = database.ref(`/Items`)

  //   Promise.resolve()
  //     .then(() => {
  //       return items.orderByChild('userid').equalTo(`${info.id}`).once('value')
  //     })
  //     .then((snapshots) => {
  //       const arr = []
  //       snapshots.forEach(snapshot => {
  //         arr.push(snapshot.val())
  //       })
  //       setMyItems(arr)

  //       const lastItem = arr.length > 0 ? arr[arr.length - 1] : {timestamp: 0}
  //       return lastItem.timestamp
  //     })
  //     .then((lastTimestamp) => {
  //       console.log('child_added')
  //       const ref = items.startAt(lastTimestamp + 1)
  //       ref.on('child_added', (snapshot) => {
  //         const value = snapshot.val()
  //         setItems(value)
  //       })

  //       return ref
  //     })
    
  //   return () => { items.off() }
  // }, [])

  // React.useEffect(() => {
  //   isLoading(true)

  //   const items = database.ref(`/Items`)
  //   items.orderByChild('timestamp').equalTo(`${info.id}`).on('value', snapshots => {
  //     const arr = []
  //     snapshots.forEach(snapshot => {
  //       arr.push(snapshot.val())   
  //     })
      
  //     setItems(arr)
  //     isLoading(false)
  //   })

  //   return () => { items.off() }
  // }, [])

  React.useEffect(() => {    
    isLoading(true)
    const items = database.ref(`/Items`)
    items.orderByChild('userid').equalTo(`${info.id}`).on('value', (snapshots) => {
      const arr = []
      snapshots.forEach(snapshot => {
        arr.push(snapshot.val())
      })
      arr.sort(compare)
          
      setMyItems(arr)
      isLoading(false)
    })   
    
    return () => { items.off() }
  }, [])

  const compare = (a, b) => {
    if ( a.timestamp < b.timestamp ){
      return 1
    }
    if ( a.timestamp > b.timestamp ){
      return -1
    }
    return 0
  }

  const setItems = (newItems) => {
    if (newItems) {
      // console.log('myItems', myItems)
      // console.log('newItems', newItems)
      setMyItems(oldItems => [...oldItems, newItems])
    }    
  }

  const addItems = React.useCallback(() => {
    handleAddItems(
      exhibitCategory,
      exhibitItem,
      description,
      price1.value,
      price2.value,
    )

    alert('등록되었습니다.')
  }, [exhibitCategory, exhibitItem, description, price1, price2])

  const handleAddItems = (category, key, description, price1, price2) => {
    const itemId = Math.random().toString(36).substr(2, 9)
    const timestamp = firebase.database.ServerValue.TIMESTAMP

    database.ref(`/Items/${itemId}`).update({
      id: itemId,
      category: category,
      key: key,
      description: description,
      price1: price1,
      price2: price2,
      state: 1,
      history: [],
      userid: info.id,
      discord: info,
      timestamp: timestamp
    })
  }

  const onChangePrice = (e, set) => {
    const re = /^[0-9\b]+$/
    const value = e.target.value
    const valid = (value !== '' && re.test(value))

    set({value: value, valid: valid})
  }

  const isReadyToAddItems = () => {
    const p1 = parseInt(price1.value)
    const p2 = parseInt(price2.value)
    // console.log(exhibitCategory, exhibitItem, p1, p2, p2 >= p1)
    return (exhibitCategory && exhibitItem && p1 > 0 && p2 > 0 && p2 >= p1 && price1.valid && price2.valid)
  }

  return (
    <div className="add-items">
      <div className="add-items-info">        
        <div>
          <div className="sub-title">유형</div>
          <select onChange={(v) => setExhibitCategory(v.target.value)}>
            <option>유형을 선택해주세요</option>
            {CATEGORY.map((m) => {
              return <option value={m.key}>{m.name}</option>
            })}
          </select>
        </div>
        {exhibitCategory !== null && (
          <div>
            <div className="sub-title">항목</div>
            <select onChange={(v) => setExhibitItem(v.target.value)}>
              <option>항목을 선택해주세요</option>
              {ITEMS.map((item) => {                 
                if (parseInt(exhibitCategory) === item.category) {
                  return <option value={item.key}>{item.name}</option>
                }
              })}
            </select>
          </div>
        )}

        <div className="add-items-description">
          <div className="sub-title">설명</div>
          <textarea onChange={(e) => {setDescription(e.target.value)}}></textarea>
        </div>

        <div className="add-items-price">
          <div>
            <div className="sub-title">시작가</div>
            <input type="text" onChange={(e) => onChangePrice(e, setPrice1)} className={price1.valid ? '' : 'invalid'} placeholder="시작가 (단위 vip)"></input>
          </div>
          <div>
            <div className="sub-title">즉구가</div>
            <input type="text" onChange={(e) => onChangePrice(e, setPrice2)} className={price2.valid ? '' : 'invalid'} placeholder="즉구가 (단위 vip)"></input>
          </div>
        </div>

        <div className={isReadyToAddItems() ? "add-items-confirm active" : "add-items-confirm"}>
          <div onClick={() => {addItems()}}>등록하기</div>
        </div>
      </div>

      <div className="my-items">
        <div className="my-items-title sub-title">내가 등록한 물건</div>
        <div className="my-items-list">
          {myItems.map((m) => {
            return (<Item item={m} database={database} key={m.id} mine={true}/>)
          })}
        </div>
      </div>
    </div>
  )
}


const mapStateToProps = state => ({
  info: state.info,
})

export default connect(mapStateToProps)(Sell)