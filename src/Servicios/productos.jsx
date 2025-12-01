import axios from 'axios'

console.log('MODO:', import.meta.env.MODE)

const produccion = import.meta.env.MODE === 'production'

const url = produccion
  ? '/api/productos/'
  : 'http://localhost:8080/api/productos/'

export const proxyProducto = (producto) => {
  const handler = {
    get(target, prop) {
      if (prop === 'id') prop = '_id'
      return target[prop]
    }
  }
  return new Proxy(producto, handler)
}

const eliminarPropiedad = (obj, prop) => {
  const objClon = { ...obj }
  delete objClon[prop]
  return objClon
}

/* ---------- CRUD ---------- */

const getAll = async () => {
  const { data } = await axios.get(url)
  return data.map(producto => proxyProducto(producto))
}

const guardar = async (prod) => {
  const payload = { ...prod }

  const { data } = await axios.post(url, payload, {
    headers: { 'Content-Type': 'application/json' }
  })

  return proxyProducto(data)
}

const actualizar = async (id, prod) => {
  const prodSinId = eliminarPropiedad(prod, '_id')

  const { data } = await axios.put(url + id, prodSinId, {
    headers: { 'Content-Type': 'application/json' }
  })

  return proxyProducto(data)
}

const eliminar = async (id) => {
  const { data } = await axios.delete(url + id)
  return proxyProducto(data)
}

export default {
  getAll,
  guardar,
  actualizar,
  eliminar
}
