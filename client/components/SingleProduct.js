import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchProduct,
  updateProduct,
  writeProductUpdate
} from '../store/singleProduct'
import EditProducts from './admin_routes/edit-products'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.props.writeProduct({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    //prevent refreshing
    event.preventDefault()
    //update the student
    this.props.updateSingleProduct(
      this.props.product.id,
      this.props.updatedProduct
    )
    //resets the form
    this.props.writeProduct({
      name: '',
      type: '',
      imageUrl: '',
      size: '',
      description: '',
      quantity: 0,
      price: 0
    })
  }

  componentDidMount() {
    try {
      this.props.loadingProduct(this.props.match.params.id) //productId set in our routes
    } catch (error) {
      console.error('Could not load product', error)
    }
  }

  render() {
    const {name, imageUrl, price, description} = this.props.product || []

    const role = this.props.role

    return (
      <div>
        <div className="singleProduct">
          <h1>{name}</h1>
          <img src={imageUrl} />
          <p>{price}</p>
          <p>{description}</p>
        </div>

        {role === 'Admin' ? (
          <EditProducts
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            updatedProduct={this.props.updatedProduct}
            price={price}
          />
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct.singleProduct,
  role: state.user.role,
  updatedProduct: state.singleProduct.updatedProduct
})

const mapDispatch = dispatch => ({
  loadingProduct: id => dispatch(fetchProduct(id)),
  writeProduct: update => dispatch(writeProductUpdate(update)),
  updateSingleProduct: (id, updates) => dispatch(updateProduct(id, updates))
})

export default connect(mapState, mapDispatch)(SingleProduct)
