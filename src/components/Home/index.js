import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Menubar from '../Menubar'
import DishItem from '../DishItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    startId: '11',
  }

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      this.setState({
        apiStatus: apiStatusConstants.success,
        productsList: fetchedData[0],
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="all-products-error"
        className="products-failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  onchangedish = id => this.setState({startId: id})

  renderMenubar = () => {
    const {productsList, startId} = this.state
    // console.log(productsList)
    return (
      <div className="menuUnorderList">
        {productsList.table_menu_list.map(item => (
          <Menubar
            key={item.menu_category_id}
            item={item}
            startId={startId === item.menu_category_id}
            onchangedish={this.onchangedish}
          />
        ))}
      </div>
    )
  }

  renderDishItem = () => {
    const {productsList, startId} = this.state
    // console.log(productsList)
    const filterdsplaydishitems = productsList.table_menu_list.filter(
      each => each.menu_category_id === startId,
    )
    // console.log(filterdsplaydishitems[0])

    return (
      <ul>
        {filterdsplaydishitems[0].category_dishes.map(item => (
          <DishItem key={item.dish_id} item={item} />
        ))}
      </ul>
    )
  }

  renderProductsListView = () => (
    <>
      {this.renderMenubar()}
      {this.renderDishItem()}
    </>
  )

  renderAllProducts = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderAllProducts()}
      </div>
    )
  }
}

export default AllProductsSection
