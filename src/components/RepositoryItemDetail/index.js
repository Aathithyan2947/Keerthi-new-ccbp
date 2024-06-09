import {Component} from 'react'
import {FaStar, FaCodeBranch} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Piechart from '../PieChart'
import './index.css'
import UserContext from '../../context'

const apStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
  noview: 'noview',
}

class RepositoryItemDetail extends Component {
  state = {ap: apStatus.initial, repoDetails: null}

  componentDidMount() {
    const {username} = this.context
    if (username) {
      this.fetchRepoDetails(username)
    } else {
      this.setState({ap: apStatus.noview})
    }
  }

  fetchRepoDetails = async username => {
    // const username = localStorage.getItem('user')
    this.setState({ap: apStatus.loading})
    const accessToken = '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'
    const {match} = this.props
    const user = username
    const {repoName} = match.params
    const repo = repoName

    // const url = `https://apis2.ccbp.in/gpv/specific-repo/keerthana2710/Portfolio?api_key=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`
    const url = `https://apis2.ccbp.in/gpv/specific-repo/${user}/${repo}?api_key=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`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      this.setState({repoDetails: data, ap: apStatus.success})
    } else {
      this.setState({ap: apStatus.fail})
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  failView = () => (
    <div>
      <div className="FailCon">
        <Link to="/repositories" className="link-el">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
            alt="failure view"
            className="FailIm"
          />
        </Link>
        <h1 className="Fh">Oops! Something Went Wrong</h1>
        <p className="Fp">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" onClick={this.fetchRepoDetails} className="Fb">
          Try Again
        </button>
      </div>
    </div>
  )

  noview = () => (
    <div className="DataNotFoundViewContainer">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="DataNotFoundViewLogo"
        />
      </div>
      <h1 className="NoDataHeading">No Data Found</h1>
      <p>
        GitHub Username is empty, please provide the vaild username for
        Repositories
      </p>
      <Link to="/">
        <button className="GoBackButton" type="button">
          Go to Home
        </button>
      </Link>
    </div>
  )

  successView = () => {
    const {repoDetails} = this.state

    const languageData = repoDetails.lanuages.map(lang => ({
      name: lang.name,
      value: lang.value,
    }))

    return (
      <div className="repo-detail">
        <h1>Repositories</h1>
        <h1>{repoDetails.name}</h1>
        <p>{repoDetails.name}</p>
        <p>{repoDetails.description}</p>
        <div className="repo-stats">
          <div className="stat">
            <FaStar />
            <p>{repoDetails.stargazers_count}</p>
          </div>
          <div className="stat">
            <FaCodeBranch />
            <p>{repoDetails.forks_count}</p>
          </div>
          <div className="stat">
            <p>Issues Counts</p>
            <p>{repoDetails.open_issues_count}</p>
          </div>
          <div className="stat">
            <p>Watchers Counts</p>
            <p>{repoDetails.watchers_count}</p>
          </div>
        </div>
        <div className="contributors-section">
          <h1>Contributors</h1>
          <div className="contributors">
            {repoDetails.contributors.slice(0, 5).map(contributor => (
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                key={contributor.id}
                className="contributor-avatar"
              />
            ))}
            {repoDetails.contributors.length > 5 && (
              <span>+{repoDetails.contributors.length - 5}</span>
            )}
          </div>
        </div>
        <div className="languages-section">
          <h1>Languages</h1>
          <Piechart data={languageData} />
        </div>
      </div>
    )
  }

  finalRender = () => {
    const {ap} = this.state
    switch (ap) {
      case apStatus.loading:
        return this.loadingView()
      case apStatus.success:
        return this.successView()
      case apStatus.fail:
        return this.failView()
      case apStatus.noview:
        return this.noview()
      default:
        return null
    }
  }

  render() {
    return <div>{this.finalRender()}</div>
  }
}
RepositoryItemDetail.contextType = UserContext
export default RepositoryItemDetail
