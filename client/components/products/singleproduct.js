import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  fetchProduct,
  updateProduct,
  writeProductUpdate
} from '../../store/singleProduct'
import AddDelete from './add-delete'
import EditProducts from '../admin_routes/edit-products'
import './singleproduct.css'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeFile = this.handleChangeFile.bind(this)
  }

  handleChange(event) {
    this.props.writeProduct({[event.target.name]: event.target.value})
  }
  handleChangeFile(event) {
    this.props.writeProduct({file: event.target.files[0]})
  }

  handleSubmit(event) {
    //prevent refreshing
    event.preventDefault()
    //update the student
    this.props.updateSingleProduct(
      this.props.product.id,
      this.props.updatedProduct
    )
  }

  async componentDidMount() {
    try {
      await this.props.loadingProduct(this.props.match.params.id) //getting productId from our Routes
      this.props.writeProduct(this.props.product)
    } catch (error) {
      console.error('There was an error getting this product')
    }
  }
  render() {
    const {name, imageUrl, price, description, quantity} =
      this.props.product || []

    const role = this.props.role

    return (
      <div className="singleProductPage">
        <div className="singleProduct">
          <h1>{name}</h1>
          <img src={imageUrl} />
          <p>${price / 100}</p>
          <p>{description}</p>
          <AddDelete product={this.props.product} />
        </div>
        {role === 'Admin' ? (
          <EditProducts
            handleChange={this.handleChange}
            handleChangeFile={this.handleChangeFile}
            handleSubmit={this.handleSubmit}
            updatedProduct={this.props.updatedProduct}
            price={price}
            quantity={quantity}
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
