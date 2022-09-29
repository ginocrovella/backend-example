const fs = require('fs');

module.exports = class Contenedor {
    constructor (rutaArchivo, id){
        this.rutaArchivo = rutaArchivo
        this.id = id
        
    }

    async #leerUnArchivo(){ // metodo privado lo declaro con '#'
        try {
            const contenido = await fs.promises.readFile(this.rutaArchivo, 'utf-8');
            const contenidoParseado = JSON.parse(contenido);
            return contenidoParseado;
        } catch (error) {
            console.log(error);
        }
    }

    async save(nuevoProducto){
        const contenidoArchivo = await this.#leerUnArchivo();
        if (contenidoArchivo.length !== 0) {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(
                [...contenidoArchivo, {...nuevoProducto, id: contenidoArchivo[contenidoArchivo.length - 1].id + 1}
                ], null, 2), 'utf-8')
            // En este paso, queremos llamar al ultimo objeto con su id, por lo tanto vamos a la ultima posicion del array y con el '.id + 1' logramos ingresar. El dato NULL, y 2 son del JSON y es para acomodar el array.
        } else {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify(
                [ {...nuevoProducto, id: 1} ]), 'utf-8') // Con esto me aseguro que guardo lo que ya tenía, más uno nuevo
            // En este paso, comparamos el contenidoArchivo con 0 para que el primer id sea 1, por lo tanto voy a guardarlo en un array nuevo, al objeto mas su id.
        }
    }

    async getById(id){
        try {
            const contenidoArchivo = await this.#leerUnArchivo();
            const contenidoFiltrado = contenidoArchivo.find(e => e.id == id);
            console.log(contenidoFiltrado);
            return contenidoFiltrado;
        } catch (error) {
            console.log('null');
        } 
    }

    async getAll(){
        const contenidoArchivo = await this.#leerUnArchivo();
        console.log(contenidoArchivo);
    } 

    async deleteById(idAEliminar){
        try {
            const contenidoArchivo = await this.#leerUnArchivo();
            
            let contenidoDeleteById = contenidoArchivo.map(e=>e.id !== idAEliminar);
            let contenidoJSON = JSON.stringify(contenidoDeleteById, null, 2);
            let nuevoContenido = await fs.promises.writeFile('./productos.txt', contenidoJSON, 'utf-8');
            return nuevoContenido;
            
        } catch (error) {
            console.log(error);
        }

        }

    async deleteAll(){
        try {
            let allClean = [ ];
            await fs.promises.writeFile('./productos.txt', allClean, 'utf-8');
        } catch (error) {
            console.log(error);
        }
    }

};




