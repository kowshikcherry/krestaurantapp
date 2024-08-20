import CartContext from '../../context/CartContext'
import Header from '../Header'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }

      const showEmptyView = cartList.length === 0

      const rendercartListItems = () => (
        <div className="cart-content-container">
          <div className="divformycartandRemovebutton">
            <h1 className="cart-heading">My Cart</h1>
            <button
              type="button"
              className="remove-all-btn"
              onClick={onClickRemoveAllBtn}
            >
              Remove All
            </button>
          </div>
          <CartListView />
          <CartSummary />
        </div>
      )

      return (
        <>
          <Header />
          {showEmptyView ? <EmptyCartView /> : rendercartListItems()}
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
