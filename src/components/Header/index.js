import './index.css'

const Header = props => {
  const {cartList, name} = props

  return (
    <nav className="headernav">
      <h1>{name}</h1>
      <p>
        My Orders{' '}
        <span className={cartList === 0 ? 'ordernumbercolor' : 'ordergreen'}>
          {cartList}
        </span>
      </p>
    </nav>
  )
}

export default Header
