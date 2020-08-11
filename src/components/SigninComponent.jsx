import React from 'react';
import './style.css';
import 'font-awesome/css/font-awesome.min.css';

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
            fields["username"] = "";
            fields["emailid"] = "";
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

        if (!fields["username"]) {
            formIsValid = false;
            errors["username"] = "*Please enter your username.";
        }

        if (typeof fields["username"] !== "undefined") {
            if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
                formIsValid = false;
                errors["username"] = "*Please enter alphabet characters only.";
            }
        }
        

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


        this.setState({
            errors: errors
        });
        return formIsValid;


    }



    render() {
        return (
            <div id="main-registration-container" style={{
                paddingTop: "150px"
            }}>
                <center><div id="register">
                    <h1 style={{ fontFamily: "Roboto" }}>Please Enter</h1><br/><br/>
                    <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >
                        
                        <input type="text" name="username" placeholder="&#xF007; Full Name" style={{ width: "260px", height: "56px", fontSize: "16", borderRadius: "6px", fontFamily: "FontAwesome"  }} value={this.state.fields.username} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.username}</div><br/>

                        
                        <input type="text" name="mobileno" placeholder="&#xF007;Phone Number" style={{ width: "260px", height: "56px", fontFamily:"FontAwesome", fontSize: "16", borderRadius: "6px" }} value={this.state.fields.mobileno} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.mobileno}</div><br/>
                        
                        <button style={{ borderRadius: '100px', backgroundColor: 'yellow', width: "280px", height: "56px" }} type="submit" className="button" value="SEND OTP" ><span style={{ color: "black" }}>SEND OTP</span></button>
                    </form>
                </div></center>
            </div>

        );
    }


}


export default RegisterForm;