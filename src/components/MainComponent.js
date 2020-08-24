import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Signin from './SigninComponent';
import Subadminsignin from './SubAdminSigninComponent';
import Doublecheck from './DoubleCheckComponent';
import Active from './ActivevisitorsComponent';
import Reset from './ResetComponent';
import Verify from './VerifyComponent';

class Main extends Component {

  render() {
    return (
    <div>
        <Switch>
          <Route exact path='/verify' component={Verify} render={props=> <Verify {...props}  />} />
          <Route exact path='/userSignIn' component={() => <Signin resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route exact path='/login' component={() => <Subadminsignin resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route exact path='/doubleCheck' component={() => <Doublecheck resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route exact path='/active' component={() => <Active resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                <Route exact path='/reset' component={() => <Reset resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          
                  <Redirect to="/login" />
        </Switch>
    </div>
    );
  }
}
 
export default withRouter(Main);