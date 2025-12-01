import './Index.css'

export function Index() {
  const onImgError = (e) => { e.currentTarget.style.display = 'none' }

  return (
    <section className="nosotros">
      <div className="nosotros-info">
        <h1>Quiénes somos</h1>
        <p>
          Somos <strong>Tienda Libre</strong>, un equipo comprometido en ofrecer productos de calidad, precios justos
          y un servicio excepcional. Buscamos que cada cliente disfrute de una experiencia de compra fácil, rápida y segura.
        </p>
        <p>
          Contamos con una amplia variedad de productos y trabajamos día a día para seguir creciendo y mejorando.
          Nuestro compromiso es con vos, para que siempre tengas lo que buscás.
        </p>
      </div>

      <div className="nosotros-img">
        <img src="/img/equipo-trab.jpeg" alt="Nuestro equipo" onError={onImgError} />
      </div>

      <div className="valores-container">
        <h2>Propósito y valores</h2>
        <div className="valores-items">
          <div className="valor">
            <h3>Compromiso</h3>
            <p>Nos esforzamos por cumplir nuestras promesas y ofrecer siempre el mejor servicio.</p>
          </div>

          <div className="valor">
            <h3>Calidad</h3>
            <p>Seleccionamos cuidadosamente cada producto para garantizar la satisfacción de nuestros clientes.</p>
          </div>

          <div className="valor">
            <h3>Innovación</h3>
            <p>Buscamos mejorar continuamente nuestros procesos y ofrecer nuevas soluciones.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

