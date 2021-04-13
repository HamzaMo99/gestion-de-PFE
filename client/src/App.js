import logo from './logo.svg';
import './App.css';
import SignIn from './components/signin/SignIn'
import {BrowserRouter as Router,Route,Switch} from  'react-router-dom'
import Student from './components/student/Student'
import InfoStage from './components/detailStage/infoStage/InfoStage.js'

function App() {
  return (
    <div className="App">
          

          <Router>
    
          <Switch>

                <Route path='/' component={SignIn} exact ></Route>
                <Route path='/student'>
                  <Student/>
                </Route>
                <Route path='/infoStage'>
                  <InfoStage/>
                </Route>
          </Switch>
  

      </Router>
    </div>
  );
}

export default App;
