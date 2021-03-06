/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */

// export {default as Home} from './home'
export {default as NavBar} from './navbar'
export {default as UserHome} from './users/user-home'
export {Login, Signup} from './auth-form'
export {AllProducts} from './products/all-products'
export {default as SingleProduct} from './products/singleproduct'
export {default as AllUsers} from './users/allusers'
export {default as AdminHome} from './admin_routes/admin-home'
export {default as Home} from './home'
export {default as OrderHistory} from './users/orderHistory'
export {default as SingleUser} from './users/singleUser'
export {default as Cart} from './cart'
export {default as ConfirmationPage} from './confirmationPage'
export {ErrorPage} from './error-page'
export {default as Checkout} from './checkout'
export {default as AddProducts} from './admin_routes/add-products'
export {default as Footer} from './footer'
