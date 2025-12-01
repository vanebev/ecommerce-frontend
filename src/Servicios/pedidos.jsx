/* .............................. */
/*     Importacion */
/* ............................ */
import axios from "axios"

const produccion = import.meta.env.MODE == 'production'
const url= produccion?'/api/pedidos/' : 'http://localhost:8080/api/pedidos/'


const enviar = async pedido =>( await axios.post(url, pedido)).data


const getPreferenceId =async carrito=>{
    console.log(carrito.map(p => ({...p})))
    const prefItems ={
  body: {
    items: carrito.map(p => ({
        title: p.nombre,
        quantity: p.cantidad,
        unit_price: p.precio
    })) ,

    back_urls: {
        success: "https://localhost:5173/#/carrito",
        failure: "https://localhost:5173/#/carrito",
        pending: "https://localhost:5173/#/carrito"
      },
    auto_return: "approved",
    
    }}
    const datos = {prefItems}
    console.log(datos)
    try{
    const{data:preferenceId} = await axios.post(url + 'mp/create_preference', datos)
    console.log(preferenceId)
    return preferenceId
    }
    catch(error){
         console.error(error.message)
         throw error
    }

}
/* .............................. */
/*     Exportacion */
/* ............................ */
export default{
    enviar,
    getPreferenceId
    
}
