import React from 'react'
import { connect } from 'react-redux'

const CATEGORY = [
  {key: 0, name: 'category 0'},
  {key: 1, name: 'category 1'},
  {key: 2, name: 'category 2'},
  {key: 3, name: 'category 3'},
  {key: 4, name: 'category 4'},
  {key: 5, name: 'category 5'},
]

function AddItems({...props}) {
  const [exhibitCategory, setExhibitCategory] = useState(false)
  const [exhibitItem, setExhibitItem] = useState(false)
  const database = props.database

  const addItems = React.useCallback((category, exhibitItem, description, price1, price2, database) => {

  }, [])

  const handleAddItems = (category, exhibitItem, description, price1, price2, database) => {
    
  }

  return (
    <div className="add-items">
      <div>
        <div></div>
        <div>
          <div>종류</div>
          <select onChange={(v) => setExhibitCategory(v)}>
            {CATEGORY.map((m) => {
              <option value={m.key}>{m.name}</option>
            })}
          </select>
        </div>
        {exhibitCategory && (
          <div>
            <div>항목</div>
            <select></select>
          </div>
        )}

        <div classNamee="add-items-confirm">
          <div>등록하기</div>
        </div>
      </div>

      <div className="my-items"></div>
    </div>
  )
}

export default AddItems