import './Index.css'

import { useEffect, useState } from 'react'

import servicioProductos from '../../Servicios/productos'
import { useStateLocalStorage } from '../../Hooks/useStateLocalStorage'

export function Index() { 
    // recurso productos local
    const [productos, setProductos] = useState([])
    const [ carrito, setCarrito ] = useStateLocalStorage('carrito', [])

    // Efecto de montado / desmontado del componente
    useEffect(() => {
        console.warn('Componente inicio (montado)')

        ;(async () => {
            // obtiendo los productos del recurso remoto
            const productos = await servicioProductos.getAll()

            // Guardo los productos obtenidos en el recurso local
            setProductos(productos)
        })()

        return () => {
            console.warn('Componente inicio (desmontado)')
        }
    }, [])


    function agregar(producto) {

        const carritoClon = [...carrito]
        const id = producto.id
        const productoExistente = carritoClon.find(p => p.id == id)
        
        if(!productoExistente) {
            producto.cantidad = 1
            carritoClon.push(producto)
        }
        else {
            productoExistente.cantidad++
            const index = carritoClon.findIndex(p => p.id == id)
            carritoClon.splice(index, 1, productoExistente)
        }
        setCarrito(carritoClon)
         window.dispatchEvent(new Event('carrito:update'))  
    }
    return (
        <div className="inicio">
            <div className="section-cards">
                <div className="section-cards-header">
                    <div className="bienvenida lateral">
                    <h2>
                        Bienvenido a <span className="marca-tienda">Tienda Libre</span>
                    </h2>

                    <div id="logo-bienvenida">
                        <img src="/img/images.jpeg" alt="Logo Tienda Libre" />
                    </div>
                    </div>


                    <h1>Listado de Productos</h1>
                </div>    
                <div className="section-cards-body">
                    { productos.length
                        ? productos.map( (producto, i) =>
                            <section key={i}>
                                <h3>{producto.nombre}</h3>
                                <img src={producto.foto} alt={'foto de '+ producto.nombre} />
                                <p><b>Precio:</b> ${producto.precio}</p>
                                <p><b>Stock:</b> {producto.stock}</p>
                                <p><b>Marca:</b> {producto.marca}</p>
                                <p><b>Categoría:</b> {producto.categoria}</p>
                                <p><b>Detalles:</b> {producto.detalles}</p>
                                <br />
                                <p><b style={{color:'gold'}}>Envío:</b> {producto.envio? 'Si':'No'}</p>
                                <button id={"btnComprar-" + producto.id} onClick={
                                    () => agregar(producto)
                                }>Agregar al carrito</button>
                            </section>                 
                        )   
                        : <h2>No se encontraron productos para mostrar</h2>
                    }
                </div>
            </div>
        </div>
    )
}