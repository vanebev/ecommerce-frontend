import { useEffect, useState } from 'react'

import './Index.css'

import servicioProductos from '../../Servicios/productos' 
import { ObtenerFoto } from './ObtenerFoto'

export function Index() {
    const prodClear ={
        nombre: '',
        precio: '',
        stock: '',
        marca: '',
        categoria: '',
        detalles: '',
        descripcionCorta: '',
        descripcionLarga: '',
        edadDesde: '',
        edadHasta: '',
        foto: '',
        envio: false,
    }

    // recurso productos local
    const [productos, setProductos] = useState([])
    const [producto, setProducto] = useState(prodClear)
    const [productodirty, setproductodirty] = useState(prodClear)
    const [editarID, setEditarID] = useState(null)

    // Efecto de montado / desmontado del componente
    useEffect(() => {
        console.warn('Componente alta (montado)')

        ;(async () => {
            const productos = await servicioProductos.getAll()
            console.log(productos)
            setProductos(productos)
        })()

        return () => {
            console.warn('Componente alta (desmontado)')
        }
    }, [])

    async function agregar(e) {
        e.preventDefault()
        console.log(producto)

        if (editarID) {
            const productoActualizado = await servicioProductos.actualizar(editarID, producto)
            productoActualizado.id = (productoActualizado.id ?? productoActualizado._id)?.toString()
            
            const productosClon = [...productos]
            const index = productosClon.findIndex(p => p.id == productoActualizado.id)
            productosClon.splice(index, 1, productoActualizado)
            setProductos(productosClon) 
            
            setEditarID(null)
        }
        else {
            const productoGuardado = await servicioProductos.guardar(producto)

            const productosClon = [...productos]
            productosClon.push(productoGuardado)
            setProductos(productosClon)                  
        }

        // limpiar formulario
        setProducto(prodClear)
        setproductodirty(prodClear)
    }

    async function borrar(id){
        console.log('borrar', id)
        if (confirm(`¿Esta seguro de borrar el producto de id ${id} ?`)) {
            const productoEliminado = await servicioProductos.eliminar(id)
            
            const productosClon = [...productos]
            const index = productosClon.findIndex(p => p.id == productoEliminado.id)
            productosClon.splice(index,1)
            setProductos(productosClon)
        }
    }

    function cancelar(id){
        console.log('cancelar', id)
        setEditarID(null)
        setProducto(prodClear)
        setproductodirty(prodClear)
    }

    function editar(id){
        console.log('editar', id)
        setEditarID(id)
        
        const producto = productos.find(p => p.id == id)
        setProducto(producto)         
        setproductodirty(prodClear)
    }

    const nombreNoValido = () => {
        const nombre = producto.nombre.trim()
        return nombre.length < 3 || nombre.length > 40
    }

    function formularioNoValido(){
        return (
            nombreNoValido()
            || producto.precio === ''
            || producto.stock === ''
            || producto.marca === ''
            || producto.categoria === ''
            || producto.detalles === ''
            || producto.descripcionCorta === '' 
            || producto.descripcionLarga === ''
            || producto.edadDesde === ''
            || producto.edadHasta === ''
            || producto.foto === ''
        )
    }  
    
    const escribirCampoFoto = urlFoto => {
        console.log('urlFoto', urlFoto)
        const productoClon = { ...producto }
        productoClon.foto = urlFoto
        setProducto(productoClon)
    }

    return (
        <div className="alta">
            <h1>Alta de Productos</h1>

            <form className="alta-form" onSubmit={agregar}>
                {/* <!-- campo nombre --> */}
                <div className="input-group">
                    <label htmlFor="nombre">nombre</label>
                    <input
                        id="nombre"
                        type="text"
                        name="nombre"
                        value={producto.nombre}
                        onChange={e => {
                            setproductodirty({ ...productodirty, nombre: true })
                            setProducto({ ...producto, nombre: e.target.value })
                        }}
                    />
                    <div className="error-detail">
                        {(nombreNoValido() && productodirty.nombre) && (
                            <span>Este campo no es valido</span>
                        )}
                    </div>
                </div>

                {/* <!-- campo precio --> */}
                <div className="input-group">
                    <label htmlFor="precio">precio</label>
                    <input
                        id="precio"
                        type="number"
                        name="precio"
                        value={producto.precio}
                        onChange={e => setProducto({ ...producto, precio: +e.target.value })}
                    />
                    <div className="error-detail"></div>
                </div>

                {/* <!-- campo stock --> */}
                <div className="input-group">
                    <label htmlFor="stock">stock</label>
                    <input
                        id="stock"
                        type="number"
                        name="stock"
                        value={producto.stock}
                        onChange={e => setProducto({ ...producto, stock: parseInt(e.target.value) })}
                    />
                    <div className="error-detail"></div>
                </div>

                {/* <!-- campo marca --> */}
                <div className="input-group">
                    <label htmlFor="marca">marca</label>
                    <input
                        id="marca"
                        type="text"
                        name="marca"
                        value={producto.marca}
                        onChange={e => setProducto({ ...producto, marca: e.target.value })}
                    />
                    <div className="error-detail"></div>
                </div>

                {/* <!-- campo categoria --> */}
                <div className="input-group">
                    <label htmlFor="categoria">categoría</label>
                    <input
                        id="categoria"
                        type="text"
                        name="categoria"
                        value={producto.categoria}
                        onChange={e => setProducto({ ...producto, categoria: e.target.value })}
                    />
                    <div className="error-detail"></div>
                </div>

                {/* <!-- campo detalles --> */}
                <div className="input-group">
                    <label htmlFor="detalles">detalles</label>
                    <input
                        id="detalles"
                        type="text"
                        name="detalles"
                        value={producto.detalles}
                        onChange={e => setProducto({ ...producto, detalles: e.target.value })}
                    />
                    <div className="error-detail"></div>
                </div>
                                
                {/* <!-- campo descripción corta --> */}
                <div className="input-group">
                    <label htmlFor="descripcionCorta">descripción corta</label>
                    <input
                        id="descripcionCorta"
                        type="text"
                        name="descripcionCorta"
                        value={producto.descripcionCorta}
                        onChange={e => setProducto({ ...producto, descripcionCorta: e.target.value })}
                    />
                    <div className="error-detail"></div>
                </div>

                {/* <!-- campo descripción larga --> */}
                <div className="input-group">
                    <label htmlFor="descripcionLarga">descripción larga</label>
                    <input
                        id="descripcionLarga"
                        type="text"
                        name="descripcionLarga"
                        value={producto.descripcionLarga}
                        onChange={e => setProducto({ ...producto, descripcionLarga: e.target.value })}
                    />
                    <div className="error-detail"></div>
                </div>

                {/* <!-- campo edad desde --> */}
                <div className="input-group">
                    <label htmlFor="edadDesde">edad desde</label>
                    <input
                        id="edadDesde"
                        type="number"
                        name="edadDesde"
                        min="0"
                        value={producto.edadDesde}
                        onChange={e => setProducto({ ...producto, edadDesde: parseInt(e.target.value) })}
                    />
                    <div className="error-detail"></div>
                </div>

                {/* <!-- campo edad hasta --> */}
                <div className="input-group">
                    <label htmlFor="edadHasta">edad hasta</label>
                    <input
                        id="edadHasta"
                        type="number"
                        name="edadHasta"
                        max="99"
                        value={producto.edadHasta}
                        onChange={e => setProducto({ ...producto, edadHasta: parseInt(e.target.value) })}
                    />
                    <div className="error-detail"></div>
                </div>

                {/* <!-- campo foto --> */}
                <div className="input-group">
                    <label htmlFor="foto">foto</label>
                    <input
                        id="foto"
                        type="text"
                        name="foto"
                        value={producto.foto}
                        onChange={e => setProducto({ ...producto, foto: e.target.value })}
                    />

                    {/* Zona de obtencion de la foto del productos */}
                    <ObtenerFoto
                        escribirCampoFoto={escribirCampoFoto}
                        url={producto.foto}
                    />

                    <div className="error-detail"></div>
                </div>

                {/* <!-- campo envio --> */}
                <div className="input-group">
                    <input
                        id="envio"
                        type="checkbox"
                        name="envio"
                        checked={producto.envio}
                        onChange={e => setProducto({ ...producto, envio: e.target.checked })}
                    />
                    <label htmlFor="envio">envío</label>
                </div>

                <button
                    className={editarID ? 'btnActualizar' : 'btnAgregar'}
                    disabled={formularioNoValido()}
                >
                    {editarID ? 'Actualizar' : 'Agregar'}
                </button>
            </form>

            <hr/>

            <h2>Lista de productos disponibles</h2>

            <div className="table-responsive">
                { productos.length
                    ? <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>nombre</th>
                                <th>precio</th>
                                <th>stock</th>
                                <th>marca</th>
                                <th>categoría</th>
                                <th>detalles</th>
                                <th>descripcionCorta</th>
                                <th>descripcionLarga</th>
                                <th>edadDesde</th>
                                <th>edadHasta</th>
                                <th>foto</th>
                                <th>envío</th>
                                <th>acciones</th>
                            </tr>
                        </thead>

                        <tbody>
                            { 
                                productos.map( (producto, i) => 
                                    <tr key={i}>
                                        <td className="centrar">{i+1}</td>
                                        <td>{producto.nombre}</td>
                                        <td className="centrar">${producto.precio}</td>
                                        <td className="centrar">{producto.stock}</td>
                                        <td>{producto.marca}</td>
                                        <td>{producto.categoria}</td>
                                        <td>{producto.detalles}</td>
                                        <td>{producto.descripcionCorta}</td>
                                        <td>{producto.descripcionLarga}</td>
                                        <td>{producto.edadDesde}</td>
                                        <td>{producto.edadHasta}</td>
                                        <td className="centrar">
                                            <img
                                                width="75"
                                                src={producto.foto}
                                                alt={'foto de ' + producto.nombre }
                                            />
                                        </td>
                                        <td className="centrar">{producto.envio ? 'Si' : 'No'}</td>
                                        <td>
                                            <button
                                                disabled={!!editarID}
                                                className="borrar-editar btnBorrar-"
                                                onClick={() => borrar(producto.id)}
                                            >
                                                Borrar
                                            </button>
                                            { editarID && (editarID == producto.id)
                                                ? <button
                                                    className="borrar-editar btnCancelar-"
                                                    onClick={() => cancelar(producto.id)}
                                                >
                                                    Cancelar
                                                </button>
                                                : <button
                                                    className="borrar-editar btnEditar-"
                                                    onClick={() => editar(producto.id)}
                                                >
                                                    Editar
                                                </button>
                                            }
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    : <h2>No se encontraron productos para mostrar</h2>
                }
            </div>
        </div>
    )
}
