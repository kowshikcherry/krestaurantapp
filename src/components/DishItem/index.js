import './index.css'

const DishItem = props => {
  const {item, onIncrementorder, ondecrementorder, incordec} = props
  const filtercount = incordec.filter(i => i === item.dish_id)
  const count = filtercount.length
  const onDecrement = () => {
    if (count > 0) {
      ondecrementorder(item.dish_id)
    }
  }

  const onIncrement = () => {
    onIncrementorder(item.dish_id)
  }

  return (
    <li className="lists">
      <hr />
      <div className="disheslists">
        <div className="div1">
          <h3>{item.dish_name}</h3>
          <p>
            {item.dish_currency} {item.dish_price}
          </p>

          <p>{item.dish_description}</p>
          {item.dish_Availability ? (
            <div className="green1">
              <button type="button" className="green" onClick={onDecrement}>
                -
              </button>
              <span className="green">{count}</span>
              <button type="button" className="green" onClick={onIncrement}>
                +
              </button>
            </div>
          ) : (
            <p className="red">Not avaliabile</p>
          )}
          {item.addonCat.length > 0 ? (
            <p className="blue">Customizations available</p>
          ) : null}
        </div>
        <div className="div2">
          <p className="orange">{item.dish_calories} calories</p>
        </div>
        <div className="div2">
          <img alt={item.dish_name} className="img" src={item.dish_image} />
        </div>
      </div>
    </li>
  )
}

export default DishItem
