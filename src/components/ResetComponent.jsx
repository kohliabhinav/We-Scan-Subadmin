import React from 'react';
import './style.css';
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import { Redirect } from "react-router-dom"

class Reset extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {},
            errors: {},
            isFormValidated: false,
            isPasswordValidated: false,
            isConfirmPasswordValidated: false,
            loading: false,
            responseError : null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }




    handleChange(event) {
        let input = this.state.input;
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });

        event.target.name === "password" ? this.validatePassword() : this.validateConfirmPassword()

    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            this.resetPassword()

        }
    }


    validatePassword() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        this.setState({isPasswordValidated : isValid });
        this.setState({ isFormValidated: this.isConfirmPasswordValidated && isValid });


        this.setState({
            errors: errors
        });
        return isValid

    }


    validateConfirmPassword() {

        let input = this.state.input;
        let errors = {};
        let isValid = true;


        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

            if (input["password"] !== input["confirm_password"]) {
                isValid = false;
                errors["confirm_password"] = "Passwords don't match.";
            }
        }

        this.setState({isConfirmPasswordValidated : isValid});

        this.setState({ isFormValidated: this.state.isPasswordValidated && isValid });


        this.setState({
            errors: errors
        });
        return isValid
    }

    validate() {

        let isValid = this.validatePassword() && this.validateConfirmPassword()
        return isValid;
    }



    resetPassword() {

        this.setState({ loading: true });
        var self = this;

        console.log(localStorage.getItem('phoneNNumber'))
        var postData = {
            "username": localStorage.getItem('phoneNNumber'),
            "password": this.state.input.password,
            "userType": "SubAdmin"
        }


        fetch(baseUrl + '/subadmin/resetPassword',
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
                        self.setState({ loading: false })
                        self.setState({ redirect: '/userSignin' })
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
                self.setError('Unable to Sigin. Please try again!')
            });
    }

    setError(message) {
        this.setState({responseError : message})
    }

    render() {

        if (this.state.redirect) {

            let fields = {};
            fields["confirm_password"] = "";
            fields["password"] = "";
            this.setState({ fields: fields });
            return <Redirect to={{
                pathname: this.state.redirect
            }} />

        }
        else {
            return (

                <section>
                    <div class="alert alert-danger alert-dismissible fade show" role="alert" style={{visibility : this.state.responseError === null ? "hidden" : "visible"}}>{this.state.responseError}</div>
                    {this.state.loading && Loading('Reseting the Password...')}
                    <center>

                        <div id="register" style={{
                            marginTop: "150px",
                            padding: "0px",
                            visibility: this.state.loading ? 'hidden' : 'visible'
                        }}>

                            <h1 style={{ fontFamily: "Roboto", fontSize: "28px" }}><b>Reset Password</b></h1><br /><br />

                            <form onSubmit={this.handleSubmit} style={{
                                boxShadow: "5px 5px 40px 0 rgba(1, 5, 38, 0.1)", width: "328px", height: "444px", borderRadius: "20px",
                                paddingTop: "2em"
                            }}>
                                <div class="form-group">

                                    <input className="hi"
                                        fontSize="16px" placeholder="&#xF007;&nbsp;&nbsp;New Password" style={{ width: "290px", height: "56px", fontSize: "16px", borderRadius: "6px", fontFamily: '"FontAwesome","Roboto"' }}
                                        type="password"
                                        name="password"
                                        value={this.state.input.password}
                                        onChange={this.handleChange}
                                        className="hi"
                                        id="password" />

                                    <div className="errorMsg" style={{ textAlign: "left", marginLeft: "2em", marginTop: "0.5em" }}>{this.state.errors.password}</div>
                                </div><br />

                                <div class="form-group">
                                    <input className="h1"
                                        fontSize="16px" placeholder="&#xF007;&nbsp;&nbsp;Confirm Password" style={{ width: "290px", height: "56px", fontSize: "16px", borderRadius: "6px", fontFamily: '"FontAwesome","Roboto"' }}
                                        type="password"
                                        name="confirm_password"
                                        value={this.state.input.confirm_password}
                                        onChange={this.handleChange}
                                        className="hi"
                                        id="confirm_password" />

                                    <div className="errorMsg" style={{ textAlign: "left", marginLeft: "2em", marginTop: "0.5em" }}>{this.state.errors.confirm_password}</div>
                                </div><br /><br />

                                <button style={{ disabled: this.state.isFormValidated ? "false" : "true", background: this.state.isFormValidated ? 
                                "rgb(255,248,0)" : "rgba(1, 5, 38, 0.05)" }} type="submit" className="button" disabled={!this.state.isFormValidated}>
                                    <span class="buttonText" style={{ color: "black", width: "82px", height: "21px", fontFamily: "Roboto" }}><b>SUBMIT</b></span></button>
                            </form>
                        </div></center>
                </section>
            );
        }
    }
}

export default Reset;