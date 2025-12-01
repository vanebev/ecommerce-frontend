import { useEffect, useState } from 'react'
import "./App.css"

import { Routes, Route, HashRouter, Link } from "react-router-dom"

/* barra de navegacion */
import { Navbar } from "./Componentes/NavBar.jsx"

/* componentes router */
import { Index as Inicio } from "./Componentes/INICIO/Index.jsx"
import { Index as Alta }   from "./Componentes/ALTA/Index.jsx"
import { Index as Carrito }  from "./Componentes/CARRITO/Index.jsx"
import { Index as Contacto }  from "./Componentes/CONTACTO/Index.jsx"
import { Index as Nosotros}  from "./Componentes/NOSOTROS/Index.jsx"
import { Index as Otra }  from "./Componentes/OTRA/Index.jsx"
import Footer from "./Componentes/Footer.jsx"

export default function App() {
  const handleBuscar = (e) => {
    e.preventDefault()
  }

  const [hayCarrito, setHayCarrito] = useState(false)
  const [cantidad, setCantidad] = useState(0)   //  numerito del carrito

  // Escucha los cambios del carrito (evento carrito:update)
  useEffect(() => {
    const actualizar = () => {
      const arr = JSON.parse(localStorage.getItem('carrito') || '[]')

      // había carrito o no
      setHayCarrito(arr.length > 0)

      // total de unidades (suma de cantidades)
      const total = arr.reduce(
        (acc, prod) => acc + (prod.cantidad || 1),
        0
      )
      setCantidad(total)
    }

    actualizar()
    window.addEventListener('carrito:update', actualizar)

    return () => window.removeEventListener('carrito:update', actualizar)
  }, [])

  //  Inicializa el numerito apenas carga la app
  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('carrito') || '[]')
    const total = arr.reduce(
      (acc, prod) => acc + (prod.cantidad || 1),
      0
    )
    setCantidad(total)
  }, [])

  return (
    <>
      <HashRouter>
        <header>
          <Navbar/>
          <div>
            <div id="logo">
              <img src="/img/images.jpeg" alt="Logo" />
            </div>

            <div id="barra-busqueda">
              <form onSubmit={handleBuscar} aria-label="Buscar">
                <label htmlFor="buscar">Buscar</label>
                <input id="buscar" type="text" />
                <input type="submit" value="Buscar" />
              </form>
            </div>

            <div id="boton-carrito" className="icono-carrito">
            <Link to="/carrito" style={{ position: "relative", display: "inline-block" }}>
              <img src="/img/carrito.png" alt="Carrito" />

              {cantidad > 0 && (
                <span className="badge-carrito">{cantidad}</span>
              )}
            </Link>
            </div>
          </div>
        </header>

        <main>
          <Routes>
            <Route index element={<Inicio />} />
            <Route path="inicio" element={<Inicio />} />
            <Route path="alta" element={<Alta />} />
            <Route path="carrito" element={<Carrito />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="nosotros" element={<Nosotros />} />
            <Route path="otra" element={<Otra />} />
            <Route path="#" element={<Inicio />} />
          </Routes>
        </main>
      </HashRouter>

      <Footer year={2025} autor="Vanesa Bevacqua" />
    </>
  )
}

