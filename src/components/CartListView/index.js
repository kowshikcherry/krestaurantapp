import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'
import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      return (
        <ul className="cart-list">
          {cartList.map(item => (
            <CartItem key={item.dish_id} item={item} />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
