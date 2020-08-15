import React from 'react';
import './style.css';


class Active extends React.Component {




    render() {
        return (
            <center><div style={{
                padding: "50px"
            }}>
                <div id="register">
                    <center><h1 style={{ fontFamily: "Roboto" }}><b>Active Visitors</b></h1></center>
                    <center><img src="./assets/images/Welcome.svg" alt="welcome" style={{ width: "270px", height: "246px", marginLeft: '3px', leftMargin: '100px' }} /></center>
                    <center><h1 style={{ fontFamily: "Roboto" }}><b>832</b></h1></center>
                </div>

            </div></center>

        );
    }


}


export default Active;