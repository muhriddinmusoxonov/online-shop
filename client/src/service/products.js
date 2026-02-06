import api from './axios'

const ProductService = {
  getproducts() {
    return api.get('/product')
  }
}

export default ProductService;