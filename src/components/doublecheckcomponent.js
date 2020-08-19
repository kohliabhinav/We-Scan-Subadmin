import React from 'react';
import './style.css';


class Doublecheck extends React.Component {
    



    render() {
        return (
            <center><div id="main-registration-container" style={{
                padding: "50px"
            }}>
                <div id="register" style={{
                    boxShadow: "3px 3px 20px 0 rgba(1, 5, 38, 0.1)", width: "310px", height: "555px", borderRadius: "10px",paddingDown:"30px"
                }}>

                    <br /><br /><br /><br /><center><h1 style={{ fontFamily: "Roboto" }}><b>Double Check!</b></h1></center>
                    <p style={{
                        fontFamily: "Roboto", width: "186px", height: "21px", color:"#b8bbc6" }}>OTP sent to 1234567891</p><br/>
                    <center><img src=".\assets\images\Double Check Man.png" alt="welcome" style={{ width: "120px", height: "161px", marginLeft: '3px', leftMargin: '100px' }} /></center>
                    <br/><center><form>
                        <br /><button style={{ borderRadius: '50px', width: "280px", height: "56px" }} type="submit" className="button" value="SEND OTP" ><span style={{ color: "black", width: "82px", height: "21px", fontFamily: "Roboto" }}><b>CHECKED</b></span></button>
                        <br /><br /><br /><center>  <p style={{ width: "250px" }}>You must <b>check customer's phone</b> before you press this button</p>
                        </center>
                    </form></center><br /><br />
                  
                </div>
                
            </div></center>

        );
    }


}


export default Doublecheck;