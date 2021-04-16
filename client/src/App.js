import logo from './logo.svg';
import './App.css';
import SignIn from './components/signin/SignIn'
import {BrowserRouter as Router,Route,Switch,Redirect} from  'react-router-dom'
import Student from './components/student/Student'
import ChefDept from './components/chefdept/ChefDept'
import { connect } from "react-redux";
import CommentStage from "./components/enseignant/Commentaire/CommentStage";
import Stagedetails from './components/enseignant/stages/StageDetails';

function App(props) {
  return (
    <div className="App">
          

          <Router>
    
          <Switch>

                <Route path='/' component={SignIn} exact ></Route>


                  <Route exact path="/student">
                  {props.isLoged ?  <Student/> : <Redirect to="/" /> }
                </Route>
                <Route path = '/enseignant/details'>
                  <Stagedetails/>
                </Route>
                <Route path = '/enseignant/commenterstage'>
                  <CommentStage/>
                </Route>
                <Route path='/chefdept'>
                  <ChefDept/> 
                </Route>
          </Switch>
  

      </Router>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    isLoged: state.isLoged
  };
};


export default connect(mapStateToProps, null)(App);

