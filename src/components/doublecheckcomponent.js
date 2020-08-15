import React from 'react';
import './style.css';


class Doublecheck extends React.Component {
    



    render() {
        return (
            <center><div id="main-registration-container" style={{
                padding: "50px"
            }}>
                <div id="register">
                    <center><h1 style={{ fontFamily: "Roboto" }}><b>Double Check</b></h1></center>
                    <p style={{
                        fontFamily: "Roboto", width: "186px", height: "21px", color:"#b8bbc6" }}>OTP sent to 1234567891</p>
                    <center><img src="./assets/images/Welcome.svg" alt="welcome" style={{ width: "270px", height: "246px", marginLeft: '3px', leftMargin: '100px' }} /></center>
                    <center><form>
                        <button style={{ borderRadius: '50px', backgroundColor: 'yellow', width: "280px", height: "56px" }} type="submit" className="button" value="SEND OTP" ><span style={{ color: "black", width: "82px", height: "21px", fontFamily: "Roboto" }}><b>CHECKED</b></span></button>
                    </form></center><br/><br/>
                    <center><footer>
                        <p>You must <b>check customer's phone</b> before you press this button</p>
                    </footer></center>
                </div>
                
            </div></center>

        );
    }


}


export default Doublecheck;