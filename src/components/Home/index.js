import {Component} from 'react'
import {HiOutlineSearch} from 'react-icons/hi'
import {RiBuildingLine} from 'react-icons/ri'
import {IoLocationOutline} from 'react-icons/io5'
import {IoMdLink} from 'react-icons/io'
import Loader from 'react-loader-spinner'
import './index.css'
import UserContext from '../../context'

const apStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
  noview: 'noview',
}

class Home extends Component {
  state = {
    userProfile: null,
    error: null,
    ap: apStatus.initial,
  }

  handleSearch = async username => {
    if (!username) return

    this.setState({ap: apStatus.loading})
    try {
      const url = `https://apis2.ccbp.in/gpv/profile-details/${username}?api_key=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`
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        const userProfile = await response.json()
        this.setState({userProfile, error: null, ap: apStatus.success})
      } else {
        const errorData = await response.json()
        this.setState({
          error: errorData.error_msg,
          userProfile: null,
          ap: apStatus.fail,
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      this.setState({
        error: 'Something went wrong. Please try again',
        userProfile: null,
        ap: apStatus.fail,
      })
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  initialView = (username, changeusername) => (
    <div>
      <div className="input-container">
        <input
          type="search"
          alt="search"
          value={username}
          onChange={e => changeusername(e.target.value)}
          placeholder="Enter GitHub username"
          aria-label="Enter GitHub username"
        />
        <button
          type="button"
          data-testid="searchButton"
          onClick={() => this.handleSearch(username)}
          aria-label="Search"
        >
          <HiOutlineSearch />
        </button>
      </div>
      <h1>GitHub Profile Visualizer</h1>
      <div>
        <img
          src="https://res.cloudinary.com/duhm9z7os/image/upload/v1717169347/Frame_8830_gnfkg4.png"
          alt="gitHub profile visualizer home page"
        />
      </div>
    </div>
  )

  successView = (username, changeusername) => {
    const {userProfile} = this.state
    return (
      <div>
        <div className="input-container">
          <input
            type="search"
            alt="search"
            value={username}
            onChange={e => changeusername(e.target.value)}
            placeholder="Enter GitHub username"
            aria-label="Enter GitHub username"
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={() => this.handleSearch(username)}
            aria-label="Search"
          >
            <HiOutlineSearch />
          </button>
        </div>
        <h1>GitHub Profile Visualizer</h1>
        <div className="profile-container">
          <img src={userProfile.avatar_url} alt="login" />
          <h1>{userProfile.name}</h1>
          <p>{userProfile.login}</p>
          <p>{userProfile.bio}</p>
          <div className="profile-stats">
            <div>
              <p>{userProfile.followers}</p>
              <p>FOLLOWERS</p>
            </div>
            <div>
              <p>{userProfile.following}</p>
              <p>FOLLOWING</p>
            </div>
            <div>
              <p>{userProfile.public_repos}</p>
              <p>PUBLIC REPOS</p>
            </div>
          </div>
          <div className="profile-icons">
            <div>
              <p>Company</p>
              <RiBuildingLine />
              <p>{userProfile.company}</p>
            </div>
            <div>
              <p>Blog</p>
              <p>{userProfile.blog}</p>
            </div>
            <div>
              <p>Company Url</p>
              <IoMdLink />
              <a
                href={userProfile.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {userProfile.html_url}
              </a>
            </div>
            <div>
              <IoLocationOutline />
              <p>Location</p>
              <p>{userProfile.location}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  failView = (username, changeusername) => {
    const {error} = this.state
    return (
      <div className="error-message">
        <div className="input-container">
          <input
            type="search"
            alt="search"
            value={username}
            onChange={e => changeusername(e.target.value)}
            placeholder="Enter GitHub username"
            aria-label="Enter GitHub username"
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={() => this.handleSearch(username)}
            aria-label="Search"
          >
            <HiOutlineSearch />
          </button>
        </div>
        <p>{error}</p>
        <button
          className="try-again-button"
          type="button"
          onClick={() => this.handleSearch(username)}
        >
          Try Again
        </button>
        <img
          src="https://res.cloudinary.com/duhm9z7os/image/upload/v1717169375/Frame_8830_1_serwfl.png"
          alt="error"
        />
      </div>
    )
  }

  finalRender = (username, changeusername) => {
    const {ap} = this.state
    switch (ap) {
      case apStatus.loading:
        return this.loadingView()
      case apStatus.success:
        return this.successView(username, changeusername)
      case apStatus.fail:
        return this.failView(username, changeusername)
      case apStatus.initial:
      default:
        return this.initialView(username, changeusername)
    }
  }

  render() {
    return (
      <UserContext.Consumer>
        {({username, changeusername}) => (
          <div className="home-container">
            <div className="main-div">
              {this.finalRender(username, changeusername)}
            </div>
          </div>
        )}
      </UserContext.Consumer>
    )
  }
}

export default Home
