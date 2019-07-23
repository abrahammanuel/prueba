const express = require('express')
const router = express.Router()
const productsMocks = require('../../utils/mocks/products')
const ProductsService = require('../../services/products')

const productService = new ProductsService()

router.get('/', async (req, res, next) => {
  const { tags } = req.query
  console.log("req", req.query);
  
  try {
    const products = await productService.getProducts({ tags })

    res.status(200).json({
      data: products,
      message: 'products listed'
    })
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  const { productId } = req.params
  console.log("req", req.params);

  try {
    const product = await productService.getProduct({ productId })

    res.status(200).json({
      data: product,
      message: 'products retrieved'
  })
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { body: product } = req
  console.log("req", req.body);

  try {
    const createdProduct = await productService.createProduct({ product  })

    res.status(201).json({
      data: createdProduct,
      message: 'products created'
    })
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  const { productId } = req.params
  const { body: product } = req
  console.log("req", req.params, req.body);

  try {
    const updateProduct = await productService.updateProduct({ productId, product  })


    res.status(201).json({
      data: updateProduct,
      message: 'products updated'
    })

  } catch (err) {
    next(err)
  }
})

router.delete('/:productID', async (req, res,next) => {
  const { productID } = req.params
  
  try {
    const deletedProduct =  await productService.deleteProduct({ productID  })
  
    res.status(201).json({
      data: deletedProduct,
      message: 'products deleted'
    })
    
  } catch (err) {
    next(err)
  }
})

module.exports = router