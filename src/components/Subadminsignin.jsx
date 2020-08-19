import React from 'react';
import './style.css';




class RegisterForm extends React.Component {
    constructor() {
        super();
        this.state = {
            fields: {},
            errors: {}
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

    }

    submituserRegistrationForm(e) {
        e.preventDefault();
        if (this.validateForm()) {
            let fields = {};
            fields["mobileno"] = "";
            fields["password"] = "";
            this.setState({ fields: fields });
            alert("Form submitted");
        }

    }

    validateForm() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;


        if (!fields["mobileno"]) {
            formIsValid = false;
            errors["mobileno"] = "*Please enter your mobile no.";
        }

        if (typeof fields["mobileno"] !== "undefined") {
            if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
                formIsValid = false;
                errors["mobileno"] = "*Please enter valid mobile no.";
            }
        }

        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                errors["password"] = "*Please enter secure and strong password.";
            }
        }

        this.setState({
            errors: errors
        });
        return formIsValid;


    }


    
        render() {
            return (
                <center><div id="main-registration-container" style={{
                    padding: "0px"
                }}>
                    <center><img src="./assets/images/Welcome.svg" alt="welcome" style={{ width: "200px", height: "148px", marginLeft: '3px', leftMargin: '100px' }} /></center>
                    <div id="register" style={{
                        boxShadow: "5px 5px 40px 0 rgba(1, 5, 38, 0.1)", width: "328px", height: "444px", borderRadius:"20px"
                    }}>

                        <br /><br /><center><h3 style={{ fontFamily: "Roboto", fontSize: "28px", width: "90", height: "33px", letterSpacing: "0.56px" }}><b>Sign In</b></h3></center><br />
                        <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >


                            <input className="hi" type="text" name="mobileno" placeholder="&#xF007;&nbsp;&nbsp; Phone Number" style={{ width: "290px", height: "56px", fontFamily: '"FontAwesome","Roboto"', fontSize: "16px", borderRadius: "6px" }} value={this.state.fields.mobileno} onChange={this.handleChange} />
                            <div className="errorMsg">{this.state.errors.mobileno}</div><br/>

                            <input className="hi" type="password" name="password" placeholder="&#xF007;&nbsp;&nbsp; Password" style={{
                                width: "290px", height: "56px", fontFamily: '"FontAwesome","Roboto"', fontSize: "16px", borderRadius: "6px" }} value={this.state.fields.password} onChange={this.handleChange} />
                            <div className="errorMsg">{this.state.errors.password}</div><br /><br/>
                            <button style={{ borderRadius: '50px', width: "280px", height: "56px", }} type="submit" className="button" value="SEND OTP" ><span style={{ color: "black", width: "82px", height: "21px", fontFamily: "Roboto" }}><b>SIGN IN</b></span></button><br />

                            <br/><br />  <a href="#" style={{
                                fontFamily: "Roboto", fontSize: "11px", width: "114px", height: "15px", letterSpacing: "38"
                            }}>Forgot Password?</a><br /><br />

                        </form>

                   <br/> </div>
                    <center><footer>
                        <br/><p style={{
                            fontFamily: "Roboto", fontSize: "16px", width: "226px", height: "21px", letterSpacing: "38"
                        }}>Don't have an account?  <a href="#" style={{
                            fontFamily: "Roboto", fontSize: "11px", width: "226px", height: "21px", letterSpacing: "38"
                        }}>Sign Up</a></p>
                    </footer></center>
                </div></center>

            );
        }


    }


export default RegisterForm;