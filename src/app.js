import express from 'express'
import routerCart from './carts/carts.js'
import routerProducts from './products/products.js'


const app = express();
const PORT = 8080;
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/api/products',routerProducts)
app.use('/api/cart',routerCart)


app.listen(PORT, () => {
     console.log(`Servidor arriba del puerto ${PORT}`);
 })