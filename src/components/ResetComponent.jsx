import React from 'react';
import './style.css';

class Reset extends React.Component {
    constructor() {
        super();
        this.state = {
            input: {},
            errors: {}
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
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            console.log(this.state);

            let input = {};
            input["name"] = "";
            input["email"] = "";
            input["password"] = "";
            input["confirm_password"] = "";
            this.setState({ input: input });

            alert('Demo Form is submited');
        }
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;


        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

            if (input["password"] !== input["confirm_password"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    render() {
        return (
            <center><div id="register"  style={{
                paddingTop: "150px"
            }}>
                <h1 style={{ fontFamily: "Roboto", fontSize: "28px" }}><b>Reset Password</b></h1><br /><br />
                <form onSubmit={this.handleSubmit} >

                   


                    <div class="form-group" >
                       
                        <input className="hi"
                            fontSize="16px" placeholder="&#xF007;&nbsp;&nbsp;New Password" style={{ width: "290px", height: "56px", fontSize: "16px", borderRadius: "6px", fontFamily: '"FontAwesome","Roboto"' }}
                            type="password"
                            name="password"
                            value={this.state.input.password}
                            onChange={this.handleChange}
                            class="form-control"
                            id="password" />

                        <div className="text-danger">{this.state.errors.password}</div>
                    </div><br/>

                    <div class="form-group">
                        <input className="h1"
                            fontSize="16px" placeholder="&#xF007;&nbsp;&nbsp;Confirm Password" style={{ width: "290px", height: "56px", fontSize: "16px", borderRadius: "6px", fontFamily: '"FontAwesome","Roboto"' }}
                            type="password"
                            name="confirm_password"
                            value={this.state.input.confirm_password}
                            onChange={this.handleChange}
                            class="form-control"
                            id="confirm_password" />

                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                    </div><br/><br/>

                    <button style={{ borderRadius: '50px', width: "290px", height: "56px" }} type="submit" className="button"><span style={{ color: "black", width: "82px", height: "21px", fontFamily: "Roboto" }}><b>SUBMIT</b></span></button>
                </form>
            </div></center>
        );
    }
}

export default Reset;