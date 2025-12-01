import { useState, useMemo } from 'react'
import './Index.css'

export function Index() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: '',
  })
  const [touched, setTouched] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [ok, setOk] = useState(false)

  const errors = useMemo(() => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'El nombre es obligatorio'
    else if (form.nombre.trim().length < 2) e.nombre = 'Ingresá al menos 2 caracteres'

    if (!form.email.trim()) e.email = 'El email es obligatorio'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Email inválido'

    if (!form.asunto.trim()) e.asunto = 'El asunto es obligatorio'
    else if (form.asunto.trim().length < 3) e.asunto = 'Muy corto'

    if (!form.mensaje.trim()) e.mensaje = 'El mensaje es obligatorio'
    else if (form.mensaje.trim().length < 10) e.mensaje = 'Ingresá al menos 10 caracteres'

    return e
  }, [form])

  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    setOk(false) 
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched(prev => ({ ...prev, [name]: true }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ nombre: true, email: true, asunto: true, mensaje: true })

    if (!isValid) return

    try {
      setEnviando(true)
      console.log('Contacto enviado:', form)
      setOk(true)
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' })
    } catch (err) {
      console.error('Error al enviar contacto', err)
      setOk(false)
      alert('No se pudo enviar. Probá más tarde.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <section className="contacto">

      <div className="contacto-header lateral">
        <h2>
          Contactate con <span className="marca-tienda">Tienda Libre</span>
        </h2>

        <div className="contacto-logo">
          <img src="/img/images.jpeg" alt="Logo Tienda Libre" />
        </div>
      </div>

      <form className="contacto-form" onSubmit={handleSubmit} noValidate>
        <div className="campo">
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            placeholder="Tu nombre"
            required
            value={form.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.nombre && errors.nombre && <p className="error">{errors.nombre}</p>}
        </div>

        <div className="campo">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tu@email.com"
            required
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="campo">
          <label htmlFor="asunto">Asunto</label>
          <input
            id="asunto"
            name="asunto"
            type="text"
            placeholder="Consulta sobre…"
            required
            value={form.asunto}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.asunto && errors.asunto && <p className="error">{errors.asunto}</p>}
        </div>

        <div className="campo">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Contanos en detalle…"
            rows={5}
            required
            value={form.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.mensaje && errors.mensaje && <p className="error">{errors.mensaje}</p>}
        </div>

        <div className="acciones">
          <button type="submit" disabled={!isValid || enviando}>
            {enviando ? 'Enviando…' : 'Enviar'}
          </button>

          {ok && <span className="ok">¡Mensaje enviado!</span>}
        </div>
      </form>

      <div className="contacto-info">
        <h2>Información de contacto</h2>

        <div className="info-item">
          <img src="/img/inst.png" alt="Instagram" />
          <p><strong>Instagram:</strong> <a href="tienda.libre">tienda.libre</a> </p>
        </div>

        <div className="info-item">
          <img src="/img/tel.png" alt="Teléfono" />
          <p><strong>Teléfono:</strong> <a href="tel:+541100000000">+54 11 0000-0000</a></p>
        </div>

        <div className="info-item">
          <img src="/img/correo.png" alt="Email" />
          <p><strong>Email:</strong> <a href="mailto:info@ecommerce.com">info@ecommerce.com</a></p>
        </div>
      </div>
    </section>
  )
}
