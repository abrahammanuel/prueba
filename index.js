
const express = require('express')
const path = require('path')
const productsRouter = require('./routes/views/products')
const productsApiRouter = require('./routes/api/products')

//* application
const app = express()

//* --Static Files 
app.use("/static", express.static(path.join(__dirname, 'public')))

//* middlewares
app.use(express.json())

//* view engine set up
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//* rutas 
app.use('/products', productsRouter)
app.use('/api/products', productsApiRouter)

//* redirect
app.get('/',(req, res)=>{
  res.redirect('/products')
})

//* initialize y setup server
const server = app.listen(8000, () => {
  console.log(`Listening http://localhost:${server.address().port}`);
  
})