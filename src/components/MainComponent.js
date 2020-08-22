import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Signin from './SigninComponent';
import Subadminsignin from './Subadminsignin';
import Doublecheck from './doublecheckcomponent';
import Active from './ActivevisitorsComponent';
import Reset from './ResetComponent';

class Main extends Component {

  render() {
    return (
    <div>
        <Switch>
          <Route exact path='/signin' component={() => <Signin resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route exact path='/Subadminsignin' component={() => <Subadminsignin resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route exact path='/Doublecheck' component={() => <Doublecheck resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route exact path='/Active' component={() => <Active resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                <Route exact path='/Reset' component={() => <Reset resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          
                        <Redirect to="/Subadminsignin" />
        </Switch>
    </div>
    );
  }
}
 
export default withRouter(Main);