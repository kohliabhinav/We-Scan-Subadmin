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
            fields["mobileno"] = "";
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
                    <h1 style={{ fontFamily: "Roboto" , fontSize:"28px" }}><b>Please Enter</b></h1><br /><br />
                    <form method="post" name="userRegistrationForm" onSubmit={this.submituserRegistrationForm} >

                        <input type="text" className="hi" name="username" fontSize="16px" placeholder="&#xF007;&nbsp;&nbsp;Full Name" style={{ width: "290px", height: "56px", fontSize: "16px", borderRadius: "6px", fontFamily: '"FontAwesome","Roboto"' }} value={this.state.fields.username} onChange={this.handleChange} />
                        <p className="errorMsg">{this.state.errors.username}</p><br/>

                        <input type="text" className="hi" fontSize="16px" name="mobileno" placeholder="&#xF007;&nbsp;&nbsp;Phone Number" style={{ width: "290px", height: "56px", fontFamily: '"FontAwesome","Roboto"', fontSize: "16px", borderRadius: "6px" }} value={this.state.fields.mobileno} onChange={this.handleChange} />
                        <div className="errorMsg">{this.state.errors.mobileno}</div><br/><br/>

                        <button style={{ borderRadius: '50px', width: "290px", height: "56px" , borderWidth:"1px"}} type="submit" className="button" value="SEND OTP" ><span style={{ color: "black", textAlign:"center", fontFamily:"Roboto" }}><b>SEND OTP</b></span></button>
                    </form>
                </div></center>
            </div>

        );
    }


}


export default RegisterForm;