import React,{Component} from 'react';
import {Breadcrumb, BreadcrumbItem,Button,Label,Row,Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Control,Form,Errors} from 'react-redux-form'

const required =(val) =>val&&val.length;
const maxLength = (len)=>(val)=>!(val)||(val.length<=len)
const minLength = (len)=>(val)=>(val)&&(val.length>=len)
const isNumber = (val)=>!isNaN(Number(val))
const validEmail = (val)=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)


class Subadminsignin extends Component {
    handleSubmit=(values)=>
    {
        this.props.postFeedback(values)
        this.props.resetFeedbackForm()
    }

    render() { 
        return ( 
            <div className="container">
             <div className="row">
                    <img src="./assets/images/Welcome.svg" style={{ width: "320px", height: "246px",marginLeft:'3px',leftMargin:'100px' }} /><br /><br />

                    <div className="col-12">
                        <h1 style={{ fontFamily: "Roboto", fontSize: "28", width: "174", height: "37", letterSpacing:"38" }}> Please Enter</h1>
                    </div>
            </div>

            {/*<div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info" href="/"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>*/}
            <div className="row row-content">
                <div className="col-12 col-md-9">
                       <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
        <Row className="form-group">
                                
                                <Col md={10}>
                                    <Control.text model=".fullname" id="fullname" name="fullname" style={{ width: "260px", height: "56px", fontFamily: "Roboto", fontSize: "16", borderRadius:"6px" }}
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
                            {/*<Row className="form-group">
                        <Label htmlFor="lastname" md={2}>Last Name</Label>
                        <Col md={10}>
                            <Control.text 
                            id="lastname"
                            name="lastname"
                            model=".lastname"
                            className="form-control" 
                            validators={{
                                required,minLength:minLength(3),maxLength:maxLength(15)
                            }}
                            placeholder="Last Name" 
                            />

                            <Errors
                                        className="text-danger"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            required: '*Required ',
                                            minLength: '*Must be greater than 2 characters ',
                                            maxLength: '*Must be 15 characters or less '
                                        }}
                                     />
                        </Col>
                    </Row>*/}
            <Row className="form-group">
                                                      <Col md={10}>
                            <Control.text  
                            id="telnum"
                                        name="telnum" style={{ width: "260px", height: "56px", borderRadius: "6px",fontFamily: "Roboto", fontSize: "16" }}
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
                    </Row><br/>
            {/*<Row className="form-group">
                        <Label htmlFor="email" md={2}>Email</Label>
                        <Col md={10}>
                            <Control.text 
                            id="email"
                            name="email"
                            model=".email"
                            className="form-control" 
                            validators={{
                                required,validEmail
                            }}
                            placeholder="Email" 
                            />

                            <Errors
                            className="text-danger"
                            model=".email"
                            show="touched"
                            messages={{
                                required:'Required ',
                                validEmail:'Invalid email address'
                            }}
                            />
                        </Col>
                            </Row>
            <Row className="form-group">
                        <Col md={{size:6, offset:2}}>
                            <div className="form-check">
                                <Label check>
                                    <Control.checkbox 
                                    id="agree"
                                    name="agree"
                                    model=".agree"
                                    
                                    className="form-check-input"/>
                                    <strong>May we contact you?</strong>
                                </Label>
                            </div>
                        </Col>
                        <Col md={{size:3, offset:1}}>
                            <Control.select
                            id="contactType"
                            name="contactType" 
                            model=".contactType"
                            className="form-control"
                             
                            >
                                <option>Tel.</option>
                                <option>Email</option>
                            </Control.select>
                            </Col>
                    </Row>
            <Row className="form-group">
                        <Label htmlFor="message" md={2}>Your Feedback</Label>
                        <Col md={10}>
                            <Control.textarea 
                            model=".message"
                            className="form-control"
                            id="message" name="message"
                            rows="12"
                            />
                        </Col>
                    </Row>*/}
            <Row className="form-group">
  
                                <Button type="submit" color="secondary" style={{ borderRadius: '100px', height: '56px', width: '290px' }}>
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
 
export default Subadminsignin;
