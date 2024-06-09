import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="NotFoundViewContainer">
    <br />
    <h1 className="Heading">Page Not Found</h1>
    <p className="Text">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button className="GoBackButton" type="button">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
