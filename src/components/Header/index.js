import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="header-container">
    <div className="logo-and-title-container">
      <Link className="route-link" to="/">
        <h1 className="title">GitHub Profile Visualizer</h1>
      </Link>
    </div>
    <ul className="nav-items">
      <Link className="route-link" to="/">
        <li> Home </li>
      </Link>
      <Link className="route-link" to="/repositories">
        <li> Repositories </li>
      </Link>
      <Link className="route-link" to="/analysis">
        <li> Analysis </li>
      </Link>
    </ul>
  </nav>
)
export default Header
