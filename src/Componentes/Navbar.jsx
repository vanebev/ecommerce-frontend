import { NavLink } from "react-router";

export const Navbar = () =>
    <nav>
        <ul>
            <li>
                <NavLink
                    to="/inicio"
                    className={({ isActive }) => (isActive ? 'activo' : '')}
                >
                    Inicio
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/alta"
                    className={({ isActive }) => (isActive ? 'activo' : '')}
                >
                    Alta
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/contacto"
                    className={({ isActive }) => (isActive ? 'activo' : '')}
                >
                    Contacto
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/nosotros"
                    className={({ isActive }) => (isActive ? 'activo' : '')}
                >
                    Nosotros
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/otra"
                    className={({ isActive }) => (isActive ? 'activo' : '')}
                >
                    Otra
                </NavLink>
            </li>
        </ul>
    </nav>

