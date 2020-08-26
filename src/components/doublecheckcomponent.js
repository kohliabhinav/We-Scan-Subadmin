import React from 'react';
import './style.css';
import {Redirect} from 'react-router-dom'


class Doublecheck extends React.Component {

    constructor() {
        super();
        this.state = {
            redirect: null
        };


        this.userChecked = this.userChecked.bind(this);
    }


    userChecked() {
        this.setState({ redirect: '/userSignin' })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: this.state.redirect
            }} />
        }
        else {

            return (
                <center><div id="main-registration-container" style={{
                    padding: "50px"
                }}>
                    <div id="register" style={{
                        boxShadow: "3px 3px 20px 0 rgba(1, 5, 38, 0.1)", width: "310px", height: "555px", borderRadius: "10px", paddingDown: "30px"
                    }}>

                        <br /><br /><br /><br /><center><h1 style={{ fontFamily: "Roboto" }}><b>Double Check!</b></h1></center><br />

                        <center><img src=".\assets\images\Double Check Man.png" alt="welcome" style={{ width: "120px", height: "161px", marginLeft: '3px', leftMargin: '100px' }} /></center>
                        <br /><center><form>
                            <br /><button type="submit" className="button-primary" onClick={this.userChecked}>
                                <span className="buttonText" style={{color : "rgba(1,5,38,1.0)"}}><b>CHECKED</b></span></button>
                            <br /><br /><br /><center>  <p style={{ width: "250px" }}>You must <b>check customer's phone</b> before you press this button</p>
                            </center>
                        </form></center><br /><br />

                    </div>

                </div></center>

            );
        }
    }


}


export default Doublecheck;