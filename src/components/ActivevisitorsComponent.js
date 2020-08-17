import React from 'react';
import './style.css';


class Active extends React.Component {




    render() {
        return (
            <center><div style={{
                padding: "50px"
            }}>
                
                <center><h1 style={{
                    fontFamily: "Roboto", weight: "190px", height: "33px", fontSize: "28px", color:"#010526"  }}><b>Active Visitors</b></h1></center><br/><br/>
                    <center><img src=".\assets\images\Group 4028.png" alt="welcome" style={{ width: "122px", height: "152px", marginLeft: '3px', leftMargin: '100px' }} /></center>
                    <br /><br /><center><h1 style={{ fontFamily: "Roboto", weight: "106px", height: "72px", fontSize: "60px" }}><b>832</b></h1></center>
                

            </div></center>

        );
    }


}


export default Active;