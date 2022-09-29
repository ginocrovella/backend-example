module.exports = class ProductosApi {
    constructor() {
        this.productos = [];
        this.id = 0;
    };

    listar(id) {
        const prod = this.productos.find((prod) => prod.id == id);
        return prod || {error: 'producto no encontrado'};
    };

    listarAll() {
        return [...this.productos];
    };

    save(prod) {
        const newProd = {...prod, id: ++this.id};
        this.productos.push(newProd);
        return newProd;
    };

    refresh(prod, id) {
        const newProd = {id: Number(id)};
        const index = this.productos.findIndex((p) => p.id == id);
        if (index !== -1) {
            this.productos(index) = newProd;
            return newProd;
        }
    };

    // delete()
};
