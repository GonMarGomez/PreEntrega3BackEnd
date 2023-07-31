import ProductManager from './ProductManager.js'
import express from 'express'
const productMg = new ProductManager('./Products.json')
productMg.addProduct('Cuphead', 'Cuphead es un juego de acción clásico estilo "dispara y corre".Inspirado en los dibujos animados de los años 30.', 1400, '[thumbnail]', 'iFgru67', 1)
productMg.addProduct('Call of Duty: Black Ops III', 'Call of Duty es un juego de disparos en primera persona', 3400, '[thumbnail]', 'iJhnru81', 1)
productMg.addProduct('Call of Duty: Modern Warfare ', 'Call of Duty es un juego de disparos en primera persona', 5400, '[thumbnail]', 'asJFLGie94', 1)
productMg.addProduct('Far Cry', 'Far Cry es una serie de videojuegos de acción en primera persona creada por Crytek y distribuido por Ubisoft.', 6400, '[thumbnail]', 'Fjh5hg', 1)
productMg.addProduct('Resident Evil 4', 'es un videojuego de acción-aventura y disparos en tercera persona de estilo terror y supervivencia desarrollado por Capcom Production Studios', 9000, '[thumbnail]', 'jhguIf5K4', 1)

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));


app.get('/products', async (req, res) => {
    const products = await productMg.getProducts();
    const limit = parseInt(req.query.limit);
    let productsToSend = products;

    if (!isNaN(limit)) {
        productsToSend = products.slice(0, limit);
    }

    res.send(productsToSend)
})
app.get('/products/:pid', async (req, res) => {
    let productoEncontrado = await productMg.getProductById(parseInt(req.params.pid))
    if (productoEncontrado) {
        res.send(productoEncontrado)
    }
    else{
        res.send(['El producto no existe'])
    }
 
})

app.listen(PORT, () => {
    console.log(`Servidor arriba del puerto ${PORT}`);
})