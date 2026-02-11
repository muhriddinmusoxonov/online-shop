import api from './axios'

const ProductService = {
  getproducts() {
    return api.get('/product')
  },

  getProductDetail(slug) {
    return api.get(`/product/slug/${slug}`)
  }
}

export default ProductService;