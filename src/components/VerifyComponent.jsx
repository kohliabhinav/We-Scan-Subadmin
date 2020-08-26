import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import { Button, Row } from 'reactstrap'
import { baseUrl } from '../shared/baseUrl'
import { Redirect } from "react-router-dom"
import '../App.css'
import './style.css';
import 'font-awesome/css/font-awesome.min.css';
import { Loading } from './LoadingComponent';
import firebase from "../firebase"


class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            otp: '',
            redirect: null,
            otpEntered: false,
            time: {},
            seconds: 30,
            otpResendCount: 1,
            loading: false,
            loadingMessage: "",
            successMessage : null,
            responseError : null

        };

        this.timer = 0;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.countDown = this.countDown.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.resendOtp = this.resendOtp.bind(this);


    }

    componentDidMount() {
        this.startTimer()
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
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



    resendOtp(event) {

        event.preventDefault();

        if (this.state.otpResendCount === 3) {
            this.setError("You can't send more than 3 times!!")
            return;
        }

        this.setState({ loading: true, loadingMessage: "Sending...", responseError : null, successMessage :null})

        this.doReCaptchaVerify();
        var self = this;


       
        const phoneNumber = "+91" + this.props.location.state.phone;


        try {
            firebase.auth().signInWithPhoneNumber(phoneNumber, window.appVerifier)
                .then(function (confirmationResult) {

                    window.confirmationResult = confirmationResult
                   
                    self.setState({otpResendCount: (self.state.otpResendCount + 1), seconds: 30 });
                    self.setSuccessMessage('Otp Sent Successfully!')
                    self.timer = 0
                    window.appVerifier.reset(window.recaptchaWidgetId);
                    self.startTimer()

                }).catch(function (error) {
                    console.log('error' + error)
                    window.appVerifier.reset(window.recaptchaWidgetId);
                    self.setError('Unable to Send OTP!')

                });
        } catch (error) {
            console.log('error in sending otp ' + error)
            self.setError('Unable to Send OTP!')
        }
    }


    handleSubmit(event) {
        event.preventDefault();

        this.verifyOtp();

    }

    verifyOtp() {
        const code = this.state.otp
        var self = this;
        
        this.setState({loading : true,loadingMessage: "Verifying Otp",responseError: null, successMessage : null})
        window.confirmationResult.confirm(code).then(function (result) {
            self.signupUser();
        }).catch(function (error) {
            this.setState({loading : false})
            self.setError('Unable to veriy Otp!')
        });
    }


    signupUser() {
        var self = this;
        var postData = {
            "name": this.props.location.state.name,
            "phoneNumber": this.props.location.state.phone,
            "userType": "General"
        }
        fetch(baseUrl + '/subadmin/registerUser',
            {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },

            }).then(response => {
                this.setState({loading : false})
                response.json().then((data) => {
                    response.ok ?  self.setState({ redirect: '/doubleCheck' }) : self.setError(data.message)
                   
                });
            }, error => {
                this.setState({loading : false})
                self.setError(error.message)
            })

            .catch(error => {
                this.setState({loading : false})
                console.log('Post comments ', error.message);
                self.setError('Unable to Signup. Please try again!')
            });
    }



    handleChange = otp =>  {
        
        this.setState({ otp });
        console.log(this.state.otp.length)
        if(this.state.otp.length === 5) {
            this.setState({otpEntered :true})
        } else {
            this.setState({otpEntered : false})
        }

    }

    setError(message) {
        this.setState({responseError : message})
    }


    setSuccessMessage(message) {
        this.setState({loading : false, successMessage : message})
    }


    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "hours": hours,
            "minutes": minutes < 10 ? "0" + minutes : minutes,
            "seconds": seconds < 10 ? "0" + seconds : seconds
        };
        return obj;
    }


    startTimer() {


        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
            console.log('countdown started')
        }
    }

    countDown() {

        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });


        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
        }
    }


    render() {
        if (this.state.redirect) {

            this.setState({ otp: '', phone: '', name: '' });
            return <Redirect to={{
                pathname: this.state.redirect

            }} />

        } else {
            return (

                <section>
                      <div class="alert alert-danger alert-dismissible fade show" role="alert" style={{ visibility: this.state.responseError === null ? "hidden" : "visible" }}>{this.state.responseError}</div>
                    <div class="alert alert-success alert-dismissible fade show" role="alert"
                        style={{visibility: this.state.successMessage === null ? "hidden" : "visible",marginTop: "0px"}} >{this.state.successMessage}</div>
                   
                <div className="container" style={{
                    paddingLeft: "60px", paddingRight : "60px"
                }}><br /><br />
                   
                    <section style={{ visibility: this.state.loading ? 'hidden' : 'visible' }}>
                        <div className="row">
                            <div className="col-12">
                                <center><b><h1> Verify your Phone</h1></b></center>
                                <center><p style={{
                                    fontFamily: "Roboto", width: "192px", height: "21px", color: "#b8bbc6", fontSize: "16px"
                                }}>OTP sent to {this.props.location.state.phone}</p></center>
                            </div>
                        </div>
                        <div><br /><br />

                        <div style={{ width: "296", height: "1000", fontSize: '40px', borderRadius: "5px", color: "#010526" }}>
                                    <center><OtpInput id="VerificationCode" style={{ width: "296", height: "56", color: "#010526" }}
                                        onChange={this.handleChange}
                                        numInputs={6}
                                        value={this.state.otp}
                                        separator={<span>&nbsp;</span>}
                                        isInputNum="true"
                                        type="number"
                                    /></center>
                                    <div class="col-sm-2" style={{ visibility: this.state.seconds === 0 || this.state.loading ? 'hidden' : 'visible' }}>
                                        <span id="tokenExpire">You can resend token in </span>
                                        <span id="countdownTime">{this.state.time.minutes} : {this.state.time.seconds}</span>
                                    </div>
                                </div>
                                <center><span id="resendOtp" style={{
                                    background: this.state.seconds === 0 ? "rgb(255,248,0)" : "rgb(255, 255, 255)",
                                    color: this.state.seconds > 0 ? "rgb(184,187,198)" : "rgb(1,5,38)"
                                }} disabled={this.state.seconds > 0} onClick={this.resendOtp}>Resend OTP</span><br /><br /></center>
                                <div><br />



                                    <button style={{ background: this.state.otpEntered ? "rgb(255,248,0)" : "rgba(1, 5, 38, 0.05)" }}

                                        type="submit" className="button" value="SEND OTP" onClick={this.handleSubmit} disabled={!this.state.otpEntered}>
                                            <span className="buttonText" style={{color : this.state.otpEntered ? "rgba(1,5,38,1.0)" : "rgba(1, 5, 38, 0.5)"}}><b>VERIFY</b></span></button>

                            </div>

                        </div>
                    </section>
                    {this.state.loading && Loading(this.state.loadingMessage)}
                </div>
                <div id="recaptcha-container"></div>
                </section>



            );

        }
    }

}

export default Verify;
