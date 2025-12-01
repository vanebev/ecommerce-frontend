import './Footer.css'

export default function Footer({ year = new Date().getFullYear(), autor ='Vanesa Bevacqua' }) {
  return (
    <footer className="site-footer">
      
      <div className="footer-col">
        <h4>Tienda Libre</h4>
        <p>© {year} — Autor: {autor}</p>
      </div>    

      <div className="footer-col">
        <p><strong>Dirección:</strong> Av. Siempre Viva 123, CABA</p>
        <p><strong>CUIT:</strong> 30-12345678-9</p>
      </div>

      <div className="footer-col">
        <p><strong>Horarios:</strong></p>
        <p>Lunes a Viernes: 9:00 a 18:00</p>
        <p>Sábados: 9:00 a 13:00</p>
      </div>
      
    </footer>
  )
}
