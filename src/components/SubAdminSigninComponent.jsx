import React from 'react';
import { baseUrl } from '../shared/baseUrl'
import { Redirect } from "react-router-dom"
import { Loading } from './LoadingComponent'
import './style.css';
import firebase from "../firebase"




class SubAdminSignIn extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {},
            isFormValidated: false,
            isUserNameValidated: false,
            isPasswordValidated: false,
            loading: false,
            responseError: null
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

        e.target.name === "username" ? this.validateUserName() : this.validatePassword()

        

    }

    submituserRegistrationForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.loginSubAdmin()
        }


    }


    validateUserName() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;


        if (!fields["phoneNumber"]) {
            formIsValid = false;
            errors["phoneNumber"] = "*Please enter your mobile no.";
        }

        if (typeof fields["phoneNumber"] !== "undefined") {
            if (!fields["phoneNumber"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["phoneNumber"] = "*Please enter valid mobile no.";
            }
        }


        this.setState({
            isUserNameValidated : formIsValid,
            errors: errors,
            isFormValidated: this.state.isPasswordValidated && formIsValid
        });

       
        return formIsValid;


    }


    validatePassword() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (fields["password"].length < 6) {
                formIsValid = false;
                errors["password"] = "*Password is short";
            }
        }

        this.setState({
            isPasswordValidated : formIsValid,
            errors: errors,
            isFormValidated: formIsValid && this.state.isUserNameValidated
        });

      
        return formIsValid;

    }

    setError(message) {
        this.setState({responseError : message})
    }

    validateForm() {
        return this.validatePassword() && this.validateUserName()

    }


    loginSubAdmin() {
        this.setState({ loading: true });
        var self = this;
        let fields = this.state.fields;

        var postData = {
            "username": fields["phoneNumber"],
            "password": fields["password"],
            "userType": "SubAdmin"
        }


        fetch(baseUrl + '/subadmin/login',
            {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json'
                },

            }).then(response => {

                response.json().then((data) => {
                    console.log(data);
                    if (response.ok) {
                        localStorage.setItem('authToken', data.token)
                        self.generateAndStoreIdToken(data.token, data.data.isPasswordReset)
                    }
                    else {
                        self.setState({ loading: false })
                        self.setError(data.message)
                       
                    }
                })

            }, error => {
                self.setState({ loading: false })
                self.setError(error.message)
            })

            .catch(error => {
                this.state.loading = false
                console.log('Post comments ', error.message);
                self.setError('Unable to Login. Please try again!')
            });
    }



    generateAndStoreIdToken(token, isPasswordReset) {

        var self = this;

        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {

            firebase.auth().signInWithCustomToken(token).then(result => {

                firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
                    localStorage.setItem('tokenTime', new Date().getTime())
                    localStorage.setItem('token', idToken)
                    localStorage.setItem('phoneNNumber', self.state.fields.phoneNumber)
                    self.setState({ loading: false })
                    !isPasswordReset ? self.setState({ redirect: '/reset' }) :
                        self.setState({ redirect: '/userSignIn' })
                }).catch(function (error) {
                    self.setState({ loading: false })
                    console.log("firebase id error " + error)
                    alert('Unable to Login. Please try again!')
                });
            }).catch(error => {
                self.setState({ loading: false })
                console.log("firebase id erorr " + error)
                alert('Unable to Login. Please try again!')
            })
        })


    }


    render() {

        if (this.state.redirect) {

            let fields = {};
            fields["phoneNumber"] = "";
            fields["password"] = "";
            this.setState({ fields: fields });
            return <Redirect to={{
                pathname: this.state.redirect
            }} />

        }

        else {
            return (

                <section>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert" style={{ visibility: this.state.responseError === null ? "hidden" : "visible" }}>{this.state.responseError}</div>
                    <center><div id="main-registration-container" style={{
                        padding: "0px"
                    }}>

                        <center><img src="./assets/images/Welcome.svg" alt="welcome" style={{ width: "200px", height: "148px", marginLeft: '3px', leftMargin: '100px' }} /></center>

                        {this.state.loading && Loading('Signing in...')}
                        <div id="register" style={{
                            boxShadow: "5px 5px 40px 0 rgba(1, 5, 38, 0.1)", width: "328px", height: "444px", borderRadius: "20px",
                            visibility: this.state.loading ? 'hidden' : 'visible'
                        }}>

                            <br /><br /><center><h3 style={{ fontFamily: "Roboto", fontSize: "28px", width: "90", height: "33px", letterSpacing: "0.56px" }}><b>Sign In</b></h3></center><br />
                            <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >


                                <input className="hi" type="text" name="phoneNumber" placeholder="&#xF007;&nbsp;&nbsp; Phone Number" value={this.state.fields.phoneNumber} onChange={this.handleChange} />


                                <div className="errorMsg" style={{ textAlign: "left", marginLeft: "10px" }}>{this.state.errors.phoneNumber}</div><br />


                                <input className="hi" type="password" name="password" placeholder="&#xF007;&nbsp;&nbsp; Password" value={this.state.fields.password} onChange={this.handleChange} />

                                <div className="errorMsg" style={{ textAlign: "left", marginLeft: "10px" }}>{this.state.errors.password}</div><br /><br />
                                <button type="submit" className="button" value="Login" 
                                style={{ background: this.state.isFormValidated ? "rgb(255,248,0)" : "rgba(1, 5, 38, 0.05)" }} 
                                disabled={!this.state.isFormValidated} ><span class="buttonText">SIGN IN</span></button><br />


                                <br /><br />  <a href="/Reset" style={{
                                    fontFamily: "Roboto", fontSize: "11px", width: "114px", height: "15px", letterSpacing: "38"
                                }}>Forgot Password?</a><br /><br />

                            </form>

                            <br />
                        </div>

                    </div></center>
                </section>
            );
        }
    }


}


export default SubAdminSignIn;