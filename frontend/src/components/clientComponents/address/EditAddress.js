import React from 'react';
import {Redirect} from 'react-router';
import { Button , Col, Container, Form } from 'react-bootstrap';
import Header from "../../header/header";

class EditAddress extends React.Component {

    constructor(){
        super();
        this.state = {
            fullName: '',
            streetAddressLine1: '',
            streetAddressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            phoneNumber: '',
            redirect: ''
        }
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.id] : e.target.value
        });
    };
    
    onSubmitHandler = e =>{

    }

    onCancelClick = e => {
        e.preventDefault();
        this.setState({ redirect: <Redirect to='/user/address/manageAddresses/' /> });
    }

    render(){
        return(
          <div>
            <Header />
            <Container>
                {this.state.redirect}
                <br/>
                <h2>Edit address:</h2>
                <br/>
                <Form onSubmit={this.onSubmitHandler}>                    
                    <Form.Group>
                        <Form.Label>Full Name:</Form.Label>
                        <Form.Control id="fullName" 
                                      value={this.state.fullName} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Full Name"
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Street Address Line 1:</Form.Label>
                        <Form.Control id="streetAddressLine1" 
                                      value={this.state.streetAddressLine1} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Street Address Line 1"
                                      required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Street Address Line 2:</Form.Label>
                        <Form.Control id="streetAddressLine2" 
                                      value={this.state.streetAddressLine2} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Street Address Line 2" 
                                      required/>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>City:</Form.Label>
                            <Form.Control id="city" 
                                          value={this.state.city} 
                                          onChange={this.onChangeHandler} 
                                          placeholder="City"
                                          required/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>State:</Form.Label>
                            <Form.Control id="state" 
                                          value={this.state.state} 
                                          onChange={this.onChangeHandler} 
                                          placeholder="State"
                                          required/>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Zip Code:</Form.Label>
                            <Form.Control id="zipCode" 
                                          type="number" value={this.state.zipCode} 
                                          onChange={this.onChangeHandler} 
                                          placeholder="Zip Code"
                                          required/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <Form.Label>Phone Number:</Form.Label>
                        <Form.Control id="phoneNumber" 
                                      type="number" 
                                      value={this.state.phoneNumber} 
                                      onChange={this.onChangeHandler} 
                                      placeholder="Phone Number" 
                                      required/>
                    </Form.Group>
                    <br/>
                    <Button variant="warning" type="submit">
                        Save Changes
                    </Button>
                    &nbsp; &nbsp;
                    <Button variant="light" onClick={this.onCancelClick}>
                        Cancel
                    </Button>
                </Form>
            </Container>                
          </div>
        );
    }
}

export default EditAddress;