import React from 'react';
import { Col , Row, Container, Form, Card, Button, Media, Modal, Image } from 'react-bootstrap';
import Header from "../../header/header";
import DefaultProfilePic from '../../../images/default-profile.png'
import axios from 'axios';
import exportData from '../../../config/config';

class ViewProfile extends React.Component {

    constructor() {
        super();
        this.state = {
            name:"Sumeet Deshpande",
            profilePic: '',
            productReviews: [{productName: "Adidas Shoes", votes: "3.5/5", comments:"Good Product"},
            {productName: "Apple iPhone", votes: "4.5/5", comments:"Best Product"},
            {productName: "Nike Bag", votes: "2.5/5", comments:"Bad Product"},
            {productName: "Samsung Tab", votes: "4/5", comments:"Good Product"}]
        }
    }

    componentDidMount(){
        // const id = localStorage.getItem("user_id")
        const id = 1
        axios.get(exportData.backenedURL + 'read/customer/profile/' + id).then(res => {
          console.log(res)  
          if (res.status === 200) {
              this.setState({
                name : res.data.name,
                profilePic: res.data.profilePicUrl
              })
            }    
        })    
    }

    render() {
        return (
          <div>
            <Header />
            {/* Profile Component  */}
            <div style={{float:"left", width:"20%", marginLeft:"15%"}}>
                <h2>Your Profile:</h2>
                <br/>
                <Card>
                    <Card.Img variant="top" src={this.state.profilePic} height={200}/>
                    <Card.Body>
                        <Card.Title>{this.state.name}</Card.Title>
                        <br/>
                    </Card.Body>
                </Card>
            </div>
            {/* Comments And Ratings Component  */}
            <div style={{float:"left", marginLeft:"5%"}}>
                <h2>Product Reviews and Comments:</h2>
                <br/>
                <h3>Product Ratings: </h3>
                <br/>
                {this.state.productReviews.map((productReview)=>{
                    return (
                        <Media>
                            <img width={64} height={64} className="mr-3"
                                src={this.state.profilePic}
                                alt="Generic placeholder"/>
                            <Media.Body>
                                <a href="#">
                                    <h5>{productReview.productName}</h5>
                                </a>
                                Rating: {productReview.votes} 
                                <hr/>
                            </Media.Body>
                        </Media>
                    )
                })}
                <hr/>
                <h3>Product Comments:</h3>
                <br/>                
                {this.state.productReviews.map((productReview)=>{
                    return (
                        <Media>
                            <img width={64} height={64} className="mr-3"
                                src={this.state.profilePic}
                                alt="Generic placeholder"/>
                            <Media.Body>
                                <a href="#">
                                    <h5>{productReview.productName}</h5>
                                </a>
                                Comments: {productReview.comments} 
                                <hr/>
                            </Media.Body>
                        </Media>
                    )
                })}
            </div>
          </div>
        );
    }
}

export default ViewProfile;
