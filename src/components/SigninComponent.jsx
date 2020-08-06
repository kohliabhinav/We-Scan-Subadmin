import React,{Component} from 'react';
import {Breadcrumb, BreadcrumbItem,Button,Label,Row,Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Control,Form,Errors} from 'react-redux-form'

const required =(val) =>val&&val.length;
const maxLength = (len)=>(val)=>!(val)||(val.length<=len)
const minLength = (len)=>(val)=>(val)&&(val.length>=len)
const isNumber = (val)=>!isNaN(Number(val))
const validEmail = (val)=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)


class Signin extends Component {
    handleSubmit=(values)=>
    {
        this.props.postFeedback(values)
        this.props.resetFeedbackForm()
    }

    render() { 
        return ( 
            <div className="container">
             <div className="row">
            
                    <div className="col-12">
                        <h1 style={{ fontFamily: "Roboto", marginLeft: '40px', fontSize: "28", width: "174", height: "37", letterSpacing:"38" }}> Please Enter</h1>
                    </div>
            </div>

            
            <div className="row row-content">
                <div className="col-12 col-md-9">
                       <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
        <Row className="form-group">
                                
                                <Col md={10}>
                                    <Control.text model=".fullname" id="fullname" name="fullname" style={{ width: "290px", marginLeft: '10px', height: "56px", fontFamily: "Roboto", fontSize: "16", borderRadius:"6px" }}
                                        placeholder="Full Name" 
                                    className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }} 
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".fullname"
                                        show="touched"
                                        messages={{
                                            required: 'Required  ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                          
                            <Row className="form-group" onSubmit={this.onSignInSubmit}>
                                <div id="recaptcha-container"></div>
                                                      <Col md={10}>
                            <Control.text  
                            id="telnum"
                                        name="telnum" style={{ width: "290px", marginLeft: '10px', height: "56px", borderRadius: "6px",fontFamily: "Roboto", fontSize: "16" }}
                            model=".telnum"
                            className="form-control" 
                            validators={{
                                required,minLength:minLength(7),maxLength:maxLength(10),isNumber
                            }}
                                        placeholder="Mobile Number" 
                                       
                            />
                            <Errors
                            className="text-danger"
                            model=".telnum"
                            show="touched"
                            messages={{
                                required:'Required ',
                                minLength:'Mush be greater than 7 numberss',
                                maxLength:'Must be 10 numberss or less',
                                isNumber:'Must be a number'
                            }}
                            />
                        </Col>
                    </Row>
            
                        <Row className="form-group">
                            <div id="recaptcha-container"></div>

                                <Button type="submit" href="./Verify" onClick="phoneAuth();" color="secondary" style={{ borderRadius: '100px', height: '56px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'center', alignSelf: 'center', width: '350px' }}>
                            Done
                            </Button>
                        
                        
                    
                    </Row>

                </Form>
                
                </div>
            </div>
        </div>

         );
    }
}
 
export default Signin;
