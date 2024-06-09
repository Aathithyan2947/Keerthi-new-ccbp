import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import LinearChart from '../LinearChart'

// import Piechart from '../PieChart'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noview: 'noview',
}

class Analysis extends Component {
  state = {apiStatus: apiStatusConstants.noview}

  componentDidMount = () => {
    this.getData()
  }

  onSuccessDataCollected = async analysisInfoData => {
    console.log(analysisInfoData)
    this.setState({
      apiStatus: apiStatusConstants.success,
    })
  }

  getData = async () => {
    const username = localStorage.getItem('user')
    if (!username) {
      this.setState({apiStatus: apiStatusConstants.noview})
    }
  }

  onFailureDataCollected = () => {
    this.setState({
      apiStatus: apiStatusConstants.failure,
    })
  }

  getAnalysisInfo = async () => {
    const {match} = this.props
    const {params} = match
    const {user} = params
    console.log(user)

    const analysisUrl = `https://apis2.ccbp.in/gpv/profile-summary/${user}`
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const response = await fetch(analysisUrl, {
      mode: 'no-cors',
    })
    console.log(response)
    if (response.ok) {
      console.log(response)
      const analysisInfoData = await response.json()
      this.onSuccessDataCollected(analysisInfoData)
    } else {
      this.onFailureDataCollected(true)
    }
  }

  noview = () => (
    <div className="DataNotFoundViewContainer">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="empty analysis"
          className="DataNotFoundViewLogo"
        />
      </div>
      <h1 className="NoDataHeading">No Data Found</h1>
      <p>GitHub username is empty</p>
      <Link to="/">
        <button className="GoBackButton" type="button">
          Go to Home
        </button>
      </Link>
    </div>
  )

  loadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderAnalysisView = () => (
    <>
      <h1>Analysis</h1>
      <LinearChart />
    </>
  )

  renderStatusView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAnalysisView()
      case apiStatusConstants.noview:
        return this.noview()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      // case apiStatusConstants.inProgress:
      //   return <LoadingView />
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="AnalysisPageContainer">{this.renderStatusView()}</div>
      </>
    )
  }
}

export default Analysis
