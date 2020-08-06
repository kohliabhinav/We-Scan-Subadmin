import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Confirm from './ConfirmationComponent';
import Scan from './ScanComponent';
import Seeyou from './Seeyou';
import Signin from './SigninComponent';
import Subadminsignin from './Subadminsignin';
import Verify from './VerifyComponent';
class Main extends Component {

  render() {
    return (
    <div>
        <Switch>
          <Route exact path='/confirm' component={()=><Confirm resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
          <Route exact path='/signin' component={() => <Signin resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route exact path='/Subadminsignin' component={() => <Subadminsignin resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
          <Route exact path='/verify' component={() => <Verify resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} /> />
          <Route exact path='/scan' component={() => <Scan resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} /> />
          <Route exact path='/seeyou' component={() => <Seeyou resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                        <Redirect to="/Subadminsignin" />
        </Switch>
    </div>
    );
  }
}
 
export default withRouter(Main);