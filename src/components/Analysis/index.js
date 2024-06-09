import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import LinearChart from '../LinearChart'
import Piechart from '../PieChart'
import UserContext from '../../context'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  noview: 'NOVIEW',
}

class Analysis extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    quarterCommitData: [],
    languageData: [],
  }

  componentDidMount() {
    const {username} = this.context
    if (username) {
      this.getAnalysisInfo(username)
    } else {
      this.setState({apiStatus: apiStatusConstants.noview})
    }
  }

  getAnalysisInfo = async username => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const analysisUrl = `https://apis2.ccbp.in/gpv/profile-summary/${username}`

    try {
      const response = await fetch(analysisUrl)
      if (response.ok) {
        const analysisData = await response.json()
        const formattedQuarterData = this.formatQuarterData(
          analysisData.quarterCommitCount,
        )
        const formattedLanguageData = this.formatLanguageData(
          analysisData.langRepoCount,
        )
        this.setState({
          quarterCommitData: formattedQuarterData,
          languageData: formattedLanguageData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  formatQuarterData = quarterCommitCount => {
    const formattedData = Object.keys(quarterCommitCount).map(quarter => ({
      name: quarter,
      commits: quarterCommitCount[quarter],
    }))
    return formattedData
  }

  formatLanguageData = langRepoCount => {
    const formattedData = Object.keys(langRepoCount).map(language => ({
      name: language,
      value: langRepoCount[language],
    }))
    return formattedData
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderNoView = () => (
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

  renderSuccessView = () => {
    const {quarterCommitData, languageData} = this.state

    if (!quarterCommitData.length && !languageData.length) {
      return this.renderNoView()
    }

    return (
      <div className="maindiv">
        <LinearChart data={quarterCommitData} />
        <Piechart data={languageData} />
      </div>
    )
  }

  renderFailureView = () => (
    <div className="FailCon">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="FailIm"
      />
      <h1 className="Fh">Oops! Something Went Wrong</h1>
      <p className="Fp">We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getAnalysisInfo} className="Fb">
        Try Again
      </button>
    </div>
  )

  renderStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.noview:
        return this.renderNoView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="AnalysisPageContainer">{this.renderStatusView()}</div>
    )
  }
}

Analysis.contextType = UserContext

export default Analysis
