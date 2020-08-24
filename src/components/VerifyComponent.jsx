import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import { Button, Row } from 'reactstrap'
import { baseUrl } from '../shared/baseUrl'
import { Redirect } from "react-router-dom"
import '../App.css'
import './style.css';
import 'font-awesome/css/font-awesome.min.css';
import { Loading } from './LoadingComponent';


class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            otp: '',
            redirect: null,
            otpEntered: false

        };

      
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }


    handleSubmit(event) {
        event.preventDefault();

        this.verifyOtp();

    }

    verifyOtp() {
        const code = this.state.otp
        var self = this;
        
        this.setState({loading : true})
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
       
        if(this.state.otp.length === 5) {
            this.setState({otpEntered :true})
        } else {
            this.setState({otpEntered : false})
        }

    }

    setError(message) {
        this.setState({responseError : message})
    }


    render() {
        if (this.state.redirect) {

            this.setState({ otp: '', phone: '', name: '' });
            return <Redirect to={{
                pathname: this.state.redirect

            }} />

        } else {
            return (

                <div className="container" style={{
                    padding: "60px"
                }}><br /><br />
                    {this.state.loading && Loading('Signing in...')}
                    <section style={{ visibility: this.state.loading ? 'hidden' : 'visible' }}>
                        <div className="row">
                            <div className="col-12">
                                <center><b><h1 style={{ fontFamily: "Roboto", fontSize: "28px", width: "234px", height: "33px", letterSpacing: "0.56px", textDecorationColor: 'black', fontWeight: "100px" }}> Verify your Phone</h1></b></center>
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
                                /></center>
                            </div><br /><br />


                            <center><a href="#" style={{
                                fontFamily: "Roboto", fontSize: "16px", width: "88px", height: "21px", color: "#010526"
                            }}>Resend OTP</a><br /><br /></center>
                            <div>



                                <button style={{ background: this.state.otpEntered ? "rgb(255,248,0)" : "rgba(1, 5, 38, 0.05)" }} 
                                type="submit" className="button" value="SEND OTP" onClick={this.handleSubmit} disabled={!this.state.otpEntered}><span className="buttonText"><b>VERIFY</b></span></button>


                            </div>

                        </div>
                    </section>
                </div>




            );

        }
    }

}

export default Verify;
