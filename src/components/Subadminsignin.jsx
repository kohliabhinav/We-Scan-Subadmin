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
                    padding: "20px"
                }}>
                    <center><img src="./assets/images/Welcome.svg" alt="welcome" style={{ width: "200px", height: "148px", marginLeft: '3px', leftMargin: '100px' }} /></center>
                    <div id="register">

                        <br /><br /><center><h3 style={{ fontFamily: "Roboto", fontSize: "28", width: "328", height: "491", letterSpacing: "38" }}>Sign In</h3></center><br />
                        <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >


                            <input type="text" name="mobileno" placeholder="&#xF007; Phone Number" style={{ width: "260px", height: "56px", fontFamily: "FontAwesome", fontSize: "16", borderRadius: "6px" }} value={this.state.fields.mobileno} onChange={this.handleChange} />
                            <div className="errorMsg">{this.state.errors.mobileno}</div>

                            <input type="password" name="password" style={{ width: "260px", height: "56px", fontFamily: "Roboto", fontSize: "16", borderRadius: "6px" }} placeholder="Password" value={this.state.fields.password} onChange={this.handleChange} />
                            <div className="errorMsg">{this.state.errors.password}</div><br />
                            <button style={{ borderRadius: '100px', backgroundColor: 'yellow', width: "280px", height: "56px", }} type="submit" className="button" value="SEND OTP" ><span style={{ color: "black" }}>SIGN IN</span></button><br />

                            <br /><p><u> Forgot Password</u></p>

                        </form>

                    </div>
                    <center><footer>
                        <p>Don't have an account? Sign Up </p>
                    </footer></center>
                </div></center>

            );
        }


    }


export default RegisterForm;