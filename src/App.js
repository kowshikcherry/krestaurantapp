import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from './components/Header'
import Menubar from './components/Menubar'
import DishItem from './components/DishItem'

import './App.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class App extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    cartList: 0,
    menuId: 11,
    data: null,
    incordec: [],
  }

  componentDidMount() {
    this.menudata()
  }

  menudata = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const menudatalist = await response.json()
    const promiseObject = menudatalist[0]

    this.setState({
      data: promiseObject,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoadingView = () => (
    <div className="loader1 products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onchangedish = item => {
    this.setState({menuId: Number(item.menu_category_id)})
  }

  menuSection = () => {
    const {data, menuId} = this.state
    return (
      <ul className="menuUnorderList">
        {data.table_menu_list.map(item => (
          <Menubar
            onchangedish={this.onchangedish}
            key={item.menu_category_id}
            item={item}
            green={Number(item.menu_category_id) === menuId}
          />
        ))}
      </ul>
    )
  }

  onIncrementorder = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList + 1,
      incordec: [...prevState.incordec, id],
    }))
  }

  ondecrementorder = id => {
    const {incordec} = this.state
    const indexof = incordec.indexOf(id)
    incordec.splice(indexof, 1)
    this.setState(prevState => ({
      cartList: prevState.cartList - 1,
      incordec: [...incordec],
    }))
  }

  dishesSection = () => {
    const {data, menuId, incordec} = this.state

    const tableMenuList = data.table_menu_list
    const menuList = tableMenuList.filter(
      item => Number(item.menu_category_id) === menuId,
    )

    return (
      <ul>
        {menuList[0].category_dishes.map(item => (
          <DishItem
            onIncrementorder={this.onIncrementorder}
            ondecrementorder={this.ondecrementorder}
            key={item.dish_id}
            item={item}
            incordec={incordec}
          />
        ))}
      </ul>
    )
  }

  renderProductsListView = () => {
    const {cartList, data} = this.state

    return (
      <>
        <div>
          <Header name={data.restaurant_name} cartList={cartList} />
          <hr />
        </div>
        <div>{this.menuSection()}</div>
        {this.dishesSection()}
      </>
    )
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderAllProducts()}</>
  }
}
export default App
