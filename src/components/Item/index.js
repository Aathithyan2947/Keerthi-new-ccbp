import {FaStar, FaCodeBranch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const Item = ({details}) => {
  // const username = localStorage.getItem('user')
  const {name, languages, stars, forks, description} = details
  const repoName = name
  return (
    <li data-testid="repoItem" className="repo-item">
      <Link to={`/repositories/${repoName}`}>
        <h1 className="repo-name">{name}</h1>
        <p className="repo-description">{description}</p>
        <div className="repo-languages">
          {languages.map(lang => (
            <p key={name} className="language-tag">
              {lang}
            </p>
          ))}
        </div>
        <div className="repo-stats">
          <div className="stat">
            <FaStar />
            <p>{stars}</p>
          </div>
          <div className="stat">
            <FaCodeBranch />
            <p>{forks}</p>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default Item
