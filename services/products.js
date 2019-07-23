const productsMocks = require('../utils/mocks/products')
const MongoLib = require('../lib/mongo');

class productsService {
  constructor() {
    this.colecction = 'products',
    this.mongoDB = new MongoLib()
  }

  async getProducts({ tags }){
    const query = tags && { tags: {$in: tags} }
    const products = await this.mongoDB.getAll(this.colecction, query)
    return products || ["vacio"]
  }

  getProduct({ productID }){
    return Promise.resolve(productsMocks[0])
  }

  createProduct({ productID }){
    return Promise.resolve(productsMocks[0])
  }

  updateProduct({ productID, product }){
    return Promise.resolve(productsMocks[0])
  }

  deleteProduct({ productID }){
    return Promise.resolve(productsMocks[0])
  }

}

module.exports = productsService