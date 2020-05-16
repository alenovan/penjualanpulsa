import React, { Component,useCallback } from 'react';
import NumberFormat from 'react-number-format';
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import { AuthContext } from "../API/Auth";
import app from '../API/firebase';
import Swal from 'sweetalert2';
import firebase from "firebase";
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
class Pembayaran extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('topup');
    this.unsubscribe = null;
    this.state = {
      listTopup: [],
      nominal: '',
      metode: 'BCA / 20111232131 / Alenovan',
      email: "",
      status:"Silahkan lakukan pembayaran"
    };
  }

  
  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
}
  topup (e) {
    e.preventDefault();
    var user = app.auth().currentUser;
    const nominal =  this.state.nominal
    const metode =  this.state.metode
    const email = user.email
    const status = "Silahkan lakukan pembayaran"
    this.ref.add({
      nominal,
      metode,
      email,
      status
    }).then((docRef)=>{    
      MySwal.fire(<p>Topup Berhasil , silahkan lakukan pembayaran</p>)
    })
    .catch(function(error) {
      MySwal.fire(error)
    });
  }

  onCollectionUpdate = (querySnapshot) => {
    const listTopup = [];
    querySnapshot.forEach((doc) => {
      const { nominal, metode, email,status } = doc.data();
      listTopup.push({
        key: doc.id,
        nominal, 
        metode,
        email,
        status,
      });
    });
    this.setState({
      listTopup
   });
  }
  componentDidMount() {
    var user = app.auth().currentUser;
    let query = firebase.firestore().collection('topup').where('email', '==', user.email)
    this.unsubscribe = query.onSnapshot(this.onCollectionUpdate);
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Topup</strong>
                <small> Form</small>
              </CardHeader>
              <CardBody>
              <Form>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Nominal</Label>
                      <Input type="number" name="nominal" placeholder="Masukkan Nominal topup" required onChange={e => this.handleChange(e)}/>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                      <Label htmlFor="ccmonth">Pilih Metode Pembayaran</Label>
                      <Input type="select" name="metode" id="ccmonth" onChange={e => this.handleChange(e)}>
                        <option value="BCA / 20111232131 / Alenovan">BCA / 20111232131 / Alenovan</option>
                        <option value="BRI / 20111232131 / Alenovan">BRI / 20111232131 / Alenovan</option>
                        <option value="MANDIRI / 20111232131 / Alenovan">MANDIRI / 20111232131 / Alenovan</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                  <div style={{textAlign:"right"}}>
                    <button className="btn btn-info" type="submit" onClick={(e) => this.topup(e)}>Topup</button>
                    </div>
                    </Col>
                  </Row>
                  </Form>
              </CardBody>
              
            </Card>
          </Col>

          <Col xs="12" sm="6">
            {this.state.listTopup.map(topup => 
            <Card>
              <CardHeader>
                <strong>History Topup</strong>
              </CardHeader>
              <CardBody>
                <Row>
               
                          <Col xs="12">
                          <table className="table table-bordered">
                            <tr>
                              <td>Nominal</td>
                              <td>Rp.{topup.nominal}</td>
                            </tr>
                            <tr>
                              <td>Metode Pembayaran</td>
                              <td>{topup.metode}</td>
                            </tr>
                            <tr>
                              <td>Status Pembayaran</td>
                              <td>{topup.status}</td>
                            </tr>
                          </table>
                        </Col>
                </Row>
              </CardBody>
            </Card>
    )} 
            
          </Col>
          
        </Row>
      </div>
    );
  }
}

export default Pembayaran;
