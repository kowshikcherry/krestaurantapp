import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = itemWithQuantity => {
    // console.log(itemWithQuantity)
    const {cartList} = this.state
    const productObject = cartList.some(
      eachCartItem => eachCartItem.dish_id === itemWithQuantity.dish_id,
    )
    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.dish_id === itemWithQuantity.dish_id) {
            const updatedQuantity = itemWithQuantity.count + each.count
            return {...each, count: updatedQuantity}
          }
          return {...each}
        }),
      }))
    } else {
      this.setState({cartList: [...cartList, itemWithQuantity]})
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filterItemsAre = cartList.filter(each => each.dish_id !== id)
    this.setState({cartList: [...filterItemsAre]})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const mapingFilterItems = cartList.map(each => {
      if (each.dish_id === id) {
        const updatedQuantityforCart = each.count + 1
        return {...each, count: updatedQuantityforCart}
      }
      return {...each}
    })
    this.setState({cartList: [...mapingFilterItems]})
  }

  decrementCartItemQuantity = item => {
    // console.log(item)
    if (item.count <= 1) {
      this.removeCartItem(item.dish_id)
    } else {
      const {cartList} = this.state
      const mapingFilterItems = cartList.map(each => {
        if (each.dish_id === item.dish_id) {
          const updatedQuantityforCart = each.count - 1
          return {...each, count: updatedQuantityforCart}
        }
        return {...each}
      })
      this.setState({cartList: [...mapingFilterItems]})
    }
  }

  render() {
    const {cartList} = this.state
    // console.log(cartList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/cart" component={Cart} />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
