import React from 'react';
import './style.css';
import { baseUrl } from '../shared/baseUrl'
import { Redirect } from "react-router-dom"
import 'font-awesome/css/font-awesome.min.css';
import { Loading } from './LoadingComponent';
import firebase from "../firebase"

class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {},
            isFormValidated: false,
            isMobileNumberValidated: false,
            isNameValidated: false,
            responseError : null,
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);
        this.skipOtpAndVerify = this.skipOtpAndVerify.bind(this);

    };


    handleChange(e) {
        let fields = this.state.fields;
        fields[e.target.name] = e.target.value;
        this.setState({
            fields
        });

        e.target.name === "name" ? this.validateUserName() : this.validateMobileNumber()

    }

    submituserRegistrationForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.setState({ loading: true });
            this.checkIfTokenExpired() ? this.refreshToken(false) : this.login(false)
        }

    }


    validateUserName() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "*Please enter your name.";
        }

        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["name"] = "*Please enter alphabet characters only.";
            }
        }

        this.setState({ isNameValidated: formIsValid });

        this.setState({ isFormValidated: this.state.isMobileNumberValidated && formIsValid });

        this.setState({
            errors: errors
        });
        return formIsValid;
    }


    validateMobileNumber() {
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

        this.setState({ isMobileNumberValidated: formIsValid })


        this.setState({
            errors: errors,
            isFormValidated: this.state.isNameValidated && formIsValid
        });

        return formIsValid;
    }

    validateForm() {

        let isValid = this.validateUserName() && this.validateMobileNumber()
        return isValid;
    }


    checkIfTokenExpired() {
        var tokenTime = parseInt(localStorage.getItem('tokenTime'))
      
        return ((new Date().getTime() - tokenTime) > 60 * 60 * 1000)
    }


    refreshToken(toSkipOtp) {
        this.generateAndStoreIdToken(toSkipOtp)
    }



    generateAndStoreIdToken(toSkipOtp) {

        var self = this;

        console.log(localStorage.getItem('authToken'))
        firebase.auth().signInWithCustomToken(localStorage.getItem('authToken')).then(result => {

        firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
            localStorage.setItem('tokenTime', new Date().getTime())
            localStorage.setToken('token', idToken)
            self.login(toSkipOtp)
        }).catch(function (error) {
            this.setState({responseError: 'Unable to Login. Please try again!'})
        });
    }).catch(error => {
        self.setState({loading : false})
        
        this.setError('Unable to Login. Please try again!')
    }) 


    }


    doReCaptchaVerify() {
        window.appVerifier = new firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible"
            }
        );


        window.appVerifier.render().then(function (widgetId) {
            window.recaptchaWidgetId = widgetId;
        });

    }


    login(toSkipOtp) {

        var self = this;

        this.doReCaptchaVerify()
        const appVerifier = window.appVerifier

        var value = this.state.fields.phoneNumber


        var postData = {
            "phoneNumber": this.state.fields.phoneNumber,
            "name": this.state.fields.name,
            "userType": "Normal",
            "skipOtp": toSkipOtp
        }
        fetch(baseUrl + '/subadmin/loginUser',
            {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }

            }).then(response => {
                response.json().then((data) => {
                    this.setState({ loading: false });

                    response.ok ? (toSkipOtp ? self.setState({ redirect: '/doubleCheck' }) : self.sendOtp(appVerifier, value)) :

                        (response.status === 422 ? (!toSkipOtp ? this.sendOtp(appVerifier, value) : this.setError(data.message)) : this.setError(data.message))


                });
            }, error => {
                this.setState({ loading: false, responseError: error.message });
                
            })

            .catch(error => {
                this.setState({ loading: false ,responseError : 'Unable to Login. Please try again!'});
                console.log('Post comments ', error.message);
                
            });


    }


    setError(message) {
        this.setState({responseError : message})
    }


    skipOtpAndVerify(event) {
        event.preventDefault();

        if (this.validateForm()) {
            this.setState({ loading: true });
            this.checkIfTokenExpired() ? this.refreshToken(true) : this.login(true)
        }
    }


    sendOtp(appVerifier, number) {
        const phoneNumber = "+91" + number;
        var self = this;
      
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then(function (confirmationResult) {
                

                window.confirmationResult = confirmationResult
                self.setState({ redirect: '/verify' });



            }).catch(function (error) {
                console.log('error' + error)
                window.appVerifier.reset(window.recaptchaWidgetId );
                self.setError('Unable to Send OTP!')
            });
    }




    render() {

        if (this.state.redirect) {
            var name = this.state.fields.name;
            var phone = this.state.fields.phoneNumber;
            let fields = {};
            fields["name"] = "";
            fields["phoneNumber"] = "";
            this.setState({ fields: fields });
            return <Redirect to={{
                pathname: this.state.redirect,
                state: { name: name, phone: phone }
            }} />

        } else {
            return (
                <section>
                   <div class="alert alert-danger alert-dismissible fade show" role="alert" style={{visibility : this.state.responseError === null ? "hidden" : "visible"}}>{this.state.responseError}</div>
                <div id="main-registration-container" style={{
                    paddingTop: "150px"
                }}>
                    
                    {this.state.loading && Loading('Signing in...')}
                    <center><div id="register" style={{ visibility: this.state.loading ? 'hidden' : 'visible' }}>

                        <h1 style={{ fontFamily: "Roboto", fontSize: "28px" }}><b>Please Enter</b></h1><br /><br />
                        <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >

                            <input type="text" className="hi" name="name" fontSize="16px" placeholder="&#xF007;&nbsp;&nbsp;Full Name"  value={this.state.fields.name} onChange={this.handleChange} />
                            <p className="errorMsg" style={{ textAlign: "left", marginLeft: "0.5em", marginTop: "0.5em" }}>{this.state.errors.name}</p><br />
                            
                            <input type="text" class="hi" id="inputError"  name="phoneNumber" placeholder="&#xF007;&nbsp;&nbsp;Phone Number"  value={this.state.fields.phoneNumber} onChange={this.handleChange} />
                              
                            <div className="errorMsg" style={{ textAlign: "left", marginLeft: "0.5em", marginTop: "0.5em" }}>{this.state.errors.phoneNumber}</div><br /><br />

                           
                            <div id="recaptcha-container"></div>
                            <button style={{ background: this.state.isFormValidated ? "rgb(255,248,0)" : "rgba(1, 5, 38, 0.05)" }} type="submit" 
                            className="button" value="SEND OTP" disabled={!this.state.isFormValidated}><span class="buttonText"><b>SEND OTP</b></span></button>
                        </form>

                        <br /><br />  <span id="skipOtpText" style={{ background: this.state.isFormValidated ? "yellow" : "white" }} disabled={!this.state.otpEntered} onClick={this.skipOtpAndVerify}>Skip OTP &amp;<b>Submit</b> </span><br /><br />
                    </div></center>
                </div>
                </section>
            );
        }
    }


}


export default RegisterForm;