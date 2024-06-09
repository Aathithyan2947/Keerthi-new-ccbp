import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import './index.css'
import Item from '../Item'
import UserContext from '../../context'

const apStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
  noview: 'noview',
}

class Repository extends Component {
  state = {ap: apStatus.initial, courseList: []}

  componentDidMount() {
    const {username} = this.context
    if (username) {
      this.getData(username)
    } else {
      this.setState({ap: apStatus.noview})
    }
  }

  clearLocalStorage = () => {
    // localStorage.removeItem('user')
  }

  getData = async username => {
    this.setState({ap: apStatus.loading})
    const accessToken = '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'
    const url = `https://apis2.ccbp.in/gpv/repos/${username}?api_key=${accessToken}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const formatData = data.map(repo => ({
        id: repo.id,
        login: repo.login,
        name: repo.name,
        description: repo.description,
        languages: repo.language ? [repo.language] : [],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
      }))
      this.setState(
        {courseList: formatData, ap: apStatus.success},
        this.clearLocalStorage,
      )
    } else {
      this.setState({ap: apStatus.fail})
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-con">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  noView = () => (
    <div className="DataNotFoundViewContainer">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="empty repositories"
          className="DataNotFoundViewLogo"
        />
      </div>
      <h1 className="NoDataHeading">No Data Found</h1>
      <p>
        GitHub Username is empty, please provide the valid username for
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
    const {courseList} = this.state
    if (courseList.length === 0) {
      return this.noView()
    }

    return (
      <div className="s-con">
        <Link to="/">Home</Link>
        <h1 className="header">Repositories</h1>
        <ul className="ListCon">
          {courseList.map(item => (
            <Item details={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

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
        <button type="button" onClick={this.getData} className="Fb">
          Try Again
        </button>
      </div>
    </div>
  )

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
        return this.noView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.finalRender()}</div>
  }
}

Repository.contextType = UserContext

export default Repository
