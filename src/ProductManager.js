import fs from 'fs'
export default class ProductManager {
  constructor(path) {
    this.path = path
    this.id = 0;
    this.products = []
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    let cod = this.products.map(i => i.code)
    const productoNuevo = {
      id: ++this.id,
      title: (() => { if (!title) { throw "Error: El producto no tiene titulo" } return title })(),
      description: (() => { if (!description) { throw "Error: El producto no tiene descripcion" } return description })(),
      price: (() => { if (!price) { throw "Error: El procuto no tiene precio" } return price })(),
      thumbnail: (() => { if (!thumbnail) { throw "Error: El procuto no tiene imagen" } return thumbnail })(),
      code: (() => { if (!code || cod.includes(code)) { throw "Error al agregar codigo al producto" } return code })(),
      stock: (() => { if (!stock || stock <= 0) { throw "Error: Se debe agreegar el stock del procuto, el stock no puede ser menor que uno" } return stock })()

    }
    this.products.push(productoNuevo)
    fs.writeFileSync(this.path, JSON.stringify(this.products, null,), error => {
      console.log(error);
    })
  }
async getProducts() {    
          try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            const products = JSON.parse(data);
            this.products = products;
            console.log(products);
    
            return products;
          } catch (err) {
            console.error('Error al leer el archivo de productos:', err);
            return [];
    }}
    
 async getProductById(id) {
    try{ 
        const data = await fs.promises.readFile(this.path, 'utf8');
        const archivoDeProductos = JSON.parse(data);
        let checkId = archivoDeProductos.map(product => product.id)
        if (!checkId.includes(id)) {
          throw new Error('Not found')
        }
        else {
          return archivoDeProductos.find(product => product.id === id)
          
        }}
    catch(e){
        console.log(`error,${e}`);
    }
   
  }
  async updateProduct(id, actualizacion, valor) {
    try {
        const data = await fs.promises.readFile(this.path, {encoding: "utf8"});
        const products = JSON.parse(data);
        const productToUpdate = products.find((product) => product.id === id);
        if (productToUpdate) {
            productToUpdate[actualizacion] = valor;
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            console.log("Producto actualizado");
        } else {
            console.error("Producto no encontrado");
        }
    } catch (error) {
        console.error(`Ocurrió un problema al intentar actualizar el producto ${id}`, error);
    }
}
 async deleteProduct(id) {
    const data = await fs.promises.readFile(this.path, 'utf8');
    const products = JSON.parse(data);
    if (this.getProductById(id)) {
      let newProducts = products.filter((products) => products.id !== id);
     await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
      return newProducts
    } else {
      console.error('Producto no encontrado');
    }
  }
};


