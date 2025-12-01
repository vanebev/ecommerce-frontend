import { useEffect, useState } from 'react'
import './Index.css'
import { useStateLocalStorage } from '../../Hooks/useStateLocalStorage'
import servicioPedidos from '../../Servicios/pedidos'
import './pago'

import { Wallet } from '@mercadopago/sdk-react'
import { useNavigate } from 'react-router'


export function Index(){

    const [carrito, setCarrito] = useStateLocalStorage('carrito', [])
    const [pagar, setPagar] = useState(false)
    
    const [compraStatus, setCompraStatus] = useState({
        payment_id: 'null',
        status: 'null',
        merchant_order_id: 'null'
    })

    const navigate = useNavigate()


    // -----------------------------------------------------------
    // PRIMER useEffect → CAPTURA DATOS DE MERCADOPAGO
    // -----------------------------------------------------------

    useEffect(() => {
        console.warn('useEffect carrito')

        const parameters = new URL(window.location.href.replace(/#\//g,''))

        const compra = {}
        compra.payment_id = parameters.searchParams.get('payment_id') || 'null'
        compra.status = parameters.searchParams.get('status') || 'null'
        compra.merchant_order_id = parameters.searchParams.get('merchant_order_id') || 'null'

        console.log("COMPRA:", compra)

        // Si MP devolvió datos válidos
        if(compra.status !== 'null'){
            
            // esto hace que aparezca el cartel en pantalla
            setCompraStatus(compra)

            // si está aprobado → generar pedido
            if(compra.status === 'approved'){
                generarPedido(compra)
            }
        }

    }, [])
    


    // -----------------------------------------------------------
    // SEGUNDO useEffect → REDIRECCIÓN AUTOMÁTICA
    // -----------------------------------------------------------

    useEffect(() => {

        // Si el pago no fue aprobado → no hacemos nada
        if (compraStatus.status !== 'approved') return
    
        // Espera 3 segundos y luego va al inicio
        const timer = setTimeout(() => {
            navigate('/')
        }, 3000)
    
        return () => clearTimeout(timer)
    
    }, [compraStatus, navigate])


    // -----------------------------------------------------------
    //   FUNCIONES DEL CARRITO
    // -----------------------------------------------------------

    function borrarCarrito(){
        if(confirm('Esta seguro de borrar todo el carrito?')){
            setCarrito([])
            setPagar(false)
             window.dispatchEvent(new Event('carrito:update'))
        }
    }


    async function generarPedido(compra){
        console.error('Generar pedido')
        const pedido = {
            fyh: new Date().toLocaleString(),
            compra,
            pedido : carrito
        }

        console.warn('Enviar pedido...')
        await servicioPedidos.enviar(pedido)
        console.error('Pedido recibido')

        setCarrito([])
         window.dispatchEvent(new Event('carrito:update')) 
    }



    function decrementarItem(id){
        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id == id)
        
        if(producto.cantidad > 1){
            producto.cantidad--
            setCarrito(carritoClon)
            setPagar(false)
            window.dispatchEvent(new Event('carrito:update'))
        }
    }


    function incrementarItem(id){
        const carritoClon = [...carrito]
        const producto = carritoClon.find(p => p.id == id)

        if(producto.cantidad < producto.stock){
            producto.cantidad++
            setCarrito(carritoClon)
            setPagar(false)
            window.dispatchEvent(new Event('carrito:update'))
        }
    }


    function borrarItem(id){
        if(confirm(`¿Esta seguro de borrar el producto de id ${id} ?`)){
            
            const carritoClon = [...carrito]
            const index = carritoClon.findIndex(p => p.id == id)
            carritoClon.splice(index, 1)
            setCarrito(carritoClon)
            setPagar(false)
            window.dispatchEvent(new Event('carrito:update')) 
        }
    }


    // -----------------------------------------------------------
    // CONFIGURACIÓN DEL BOTÓN DE MERCADOPAGO
    // -----------------------------------------------------------

    const customization = {
        theme:'default',
        valueProp: 'security_safety',
        customStyle: {
            valuePropColor: 'black',
            buttonHeight: '48px',
            borderRadius: '10px',
            verticalPadding: '10px',
            horizontalPadding: '10px',
        }
    }

    const onReady = () => console.log('onReady')
    const onError = () => console.log('onError')

    const onSubmit = () => {
        console.log('onSubmit')

        return new Promise((resolve, reject) => {
            servicioPedidos.getPreferenceId(carrito)
            .then(preferenceId => resolve(preferenceId))
            .catch(error => reject(error))
        })
    }


    // -----------------------------------------------------------
    //                  RENDER DEL COMPONENTE
    // -----------------------------------------------------------

    return (   

        <div className="carrito">
            <h1>Carrito de Compras</h1>
            <br/> <br/>


            {/* ------------------------------------------------ */}
            {/* CARTEL DE ESTADO DE PAGO */}
            {/* ------------------------------------------------ */}

            {compraStatus.status !== 'null' &&
                <div style={{
                    backgroundColor: compraStatus.status === 'approved' ? 'lightgreen' : 'lightpink',
                    width: '50%',
                    margin: 'auto',
                    padding: '10px',
                    borderRadius: '20px',
                    fontSize:'20px'
                }}> 
                    <h2>Pago {compraStatus.status === 'approved' ? 'exitoso' : 'rechazado'}</h2>
                    <hr />
                    <h3><i><u>Estado de compra:</u></i></h3>
                    <ul>
                        <li><h4>payment_id: {compraStatus.payment_id }</h4></li>
                        <li><h4>status: {compraStatus.status }</h4></li>
                        <li><h4>merchant_order_id: {compraStatus.merchant_order_id }</h4></li>
                    </ul>
                </div>
            }



            {/* ------------------------------------------------ */}
            {/* TABLA DEL CARRITO */}
            {/* ------------------------------------------------ */}

            {carrito.length > 0 &&
            <>
            <button className="carrito_borrar_pedir carrito_borrar" onClick={borrarCarrito}>Borrar</button>

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>nombre</th>
                        <th>precio</th>
                        <th>marca</th>
                        <th>foto</th>
                        <th>cantidad</th>
                        <th>subTotal</th>
                        <th>Acciones</th>
                    </tr> 
                </thead>

                <tbody>
                {carrito.map((producto, i)=>
                    <tr key={i}>
                        <td className="centrar">{i+1}</td>
                        <td>{producto.nombre}</td>
                        <td className="centrar">${producto.precio}</td>
                        <td>{producto.marca}</td>
                        <td className="centrar"><img width="75" src={producto.foto} alt={"foto de " + producto.nombre}/></td>

                        <td className="centrar">
                            {producto.cantidad}
                            <button className="btnIncDec btnDec" onClick={()=> decrementarItem(producto.id)} >-</button>
                            <button className="btnIncDec btnInc" onClick={()=> incrementarItem(producto.id)}>+</button>
                        </td>

                        <td className="centrar">${producto.precio * producto.cantidad}</td>

                        <td>
                            <button className="btnBorrar" onClick={()=> borrarItem(producto.id)}>Borrar</button>
                        </td>
                    </tr> 
                )}

                <tr>
                    <th colSpan="5"></th>
                    <th><h3>TOTAL</h3></th>
                    <th><h3>${carrito.reduce((acc, p)  => acc + (p.precio * p.cantidad), 0 )}</h3></th>
                    <th></th>
                </tr>
              </tbody>      
            </table>


            {!pagar
            ? <button className="carrito_borrar_pedir carrito_pedir" onClick={() => setPagar(true)}>Pagar</button>
            : <div id="wallet-container">
                <Wallet 
                    customization={customization}
                    onReady={onReady}
                    onError={onError}
                    onSubmit={onSubmit}
                />
              </div>
            }


            </>
            }


            {!carrito.length && <h2>No se encontraron pedidos para mostrar</h2>}
        </div>

    )
}
