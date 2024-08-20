import CartContext from '../../context/CartContext'

const CartItem = props => {
  const {item} = props
  // console.log(item)
  return (
    <CartContext.Consumer>
      {value => {
        const {
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
        } = value

        return (
          <li className="lists">
            <hr />
            <h1>{item.dish_name}</h1>
            <p>{item.dish_description}</p>
            <img alt={item.dish_name} className="img" src={item.dish_image} />
            {item.dish_Availability ? (
              <div className="green1">
                <button
                  onClick={() => decrementCartItemQuantity(item)}
                  type="button"
                  className="green"
                >
                  -
                </button>
                <p>{item.count}</p>
                <button
                  onClick={() => incrementCartItemQuantity(item.dish_id)}
                  type="button"
                  className="green"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => removeCartItem(item.dish_id)}
                  className="logout-desktop-btn"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="red">Not avaliabile</p>
            )}
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}
export default CartItem
/*

<div className="disheslists">
              <div className="div1">
                <h1>{item.dish_name}</h1>
                <p>{item.dish_currency}</p>
                <p>{item.dish_price}</p>

                <p>{item.dish_description}</p>
                {item.dish_Availability ? (
                  <div className="green1">
                    <button
                      onClick={() => decrementCartItemQuantity(item)}
                      type="button"
                      className="green"
                    >
                      -
                    </button>
                    <span>{item.count}</span>
                    <button
                      onClick={() => incrementCartItemQuantity(item.dish_id)}
                      type="button"
                      className="green"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCartItem(item.dish_id)}
                      className="logout-desktop-btn"
                    >
                      Remove
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
                <img
                  alt={item.dish_name}
                  className="img"
                  src={item.dish_image}
                />
              </div>
            </div>
 */
