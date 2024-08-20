import {TiShoppingCart} from 'react-icons/ti'

import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const ongotoCart = () => {
    const {history} = props
    history.replace('/cart')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <nav className="nav-header">
      <div className="nav-bar-large-container">
        <Link className="headingnav" to="/">
          <h2 className="headingnav">UNI Resto Cafe</h2>
        </Link>
        <div className="nav-bar-large-container">
          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <p>My Orders</p>
            <li className="nav-menu-item">
              <button
                type="button"
                data-testid="cart"
                onClick={ongotoCart}
                className="cartButton"
              >
                <TiShoppingCart />
              </button>
              {renderCartItemsCount()}
            </li>
          </ul>

          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
