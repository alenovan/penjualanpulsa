import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import firebase from "firebase";
import api from '../API/firebase';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class Member extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('member');
    this.unsubscribe = null;
    this.state = {
      listdata: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const listdata = [];
    querySnapshot.forEach((doc) => {
      const { email, password} = doc.data();
      listdata.push({
        key: doc.id,
        doc, 
        email,
        password
      });
    });
    this.setState({
      listdata
   });
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }
  
  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Member
              </CardHeader>
              <CardBody>
                <Table className="table table-bordered" responsive>
                  <thead>
                    <tr>
                      <td>No</td>
                      <td>email</td>
                      <td>Password</td>
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.listdata.map(data => 
                          <tr>
                            <td>{data.key}</td>
                            <td>{data.email}</td>
                            <td>{data.password}</td>
                          </tr>
                      )} 
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Member;
