import {Route, Switch, BrowserRouter} from 'react-router-dom'
import {Component} from 'react'
import Home from './components/Home'
import UserContext from './context/index'
import Repository from './components/repositories'
import Header from './components/Header'
import Analysis from './components/Analysis'
import NotFound from './components/NotFound'
import RepositoryItemDetail from './components/RepositoryItemDetail'
import './App.css'

class App extends Component {
  state = {
    username: '',
  }

  changeusername = username => {
    this.setState({username})
  }

  render() {
    const {username} = this.state
    return (
      <UserContext.Provider
        value={{username, changeusername: this.changeusername}}
      >
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/repositories/:repoName"
              component={RepositoryItemDetail}
            />
            <Route exact path="/repositories" component={Repository} />
            <Route exact path="/analysis" component={Analysis} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </UserContext.Provider>
    )
  }
}

export default App
