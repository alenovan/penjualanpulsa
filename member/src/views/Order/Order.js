import React, { Component } from 'react';
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
import firebase from "firebase";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import app from '../API/firebase';
const MySwal = withReactContent(Swal)
class Order extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('jenis');
    this.refOrder = firebase.firestore().collection('order');
    this.unsubscribe = null;
    this.state = {
      listdata: [],
      listRiwayat: [],
      saldo:0,
      nama: '',
      harga: '',
      email: '',
      status: '',
      order : ''
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const listdata = [];
    querySnapshot.forEach((doc) => {
      const { nama, harga } = doc.data();
      listdata.push({
        key: doc.id,
        doc, 
        nama,
        harga
      });
    });
    this.setState({
      listdata
   });
  }

  handleChange = (e) => {
    this.setState({
        [e.target.name]: e.target.value
    })
  }
  
  beli (e) {
    e.preventDefault();
    var user = app.auth().currentUser;
    if (this.state.order != "") {
      const harga = this.state.order.substring(this.state.order.indexOf("|") + 1)
      const nama = this.state.order.substr(0, this.state.order.indexOf('|')); 
      const status = "Pemesanan Pending"; 
      const email= user.email; 
      this.refOrder.add({
        harga,
        nama,
        status,
        email
      }).then((docRef) => {    
        this.onUpdateSaldo(harga)      
      })
      .catch(function(error) {
        MySwal.fire(error)
      });
    } else {
      
    }
   
  }

  onUpdateSaldo = (nominal) => {
    var user = app.auth().currentUser;
    firebase.firestore().collection("member").where("email", "==", user.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data())
            const saldo = parseInt(documentSnapshot.data().saldo) - parseInt(nominal)
            const email = documentSnapshot.data().email
            const password = documentSnapshot.data().password
            const updateRef = firebase.firestore().collection('member').doc(documentSnapshot.id);
            updateRef.set({
              email,
              password,
              saldo
            }).then((docRef) => {
              MySwal.fire(<p>Pembelian Berhasil</p>)
              this.props.history.push("/order")
            })
          console.log(documentSnapshot.data())
          });
        })
          .catch(function (error) {
            alert(error)
          });
      }

  onCollectionUpdateRiwayat = (querySnapshot) => {
    const listRiwayat = [];
    querySnapshot.forEach((doc) => {
      const { nama, harga, status } = doc.data();
      listRiwayat.push({
        key: doc.id,
        doc, 
        nama,
        harga,
        status
      });
    });
    this.setState({
      listRiwayat
   });
  }
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    var user = app.auth().currentUser;
    let query = firebase.firestore().collection('order').where('email', '==', user.email)
    this.unsubscribe = query.onSnapshot(this.onCollectionUpdateRiwayat);
  }



  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Beli Produk</strong>
                <small> Form</small>
              </CardHeader>
              <Form>
              <CardBody>
                <Row>
                  <Col xs="12">
                  <FormGroup>
                      <Label htmlFor="ccmonth">Pilih produk Yang Akan di beli</Label>
                        <Input type="select" name="order" id="ccmonth" onChange={e => this.handleChange(e)} value={this.value}>
                          <option value="null">Silahkan pilih produk di sini</option>
                      {this.state.listdata.map(datas => 
                        <option value={datas.nama + "|"+datas.harga}>{datas.nama} - harga -> Rp.{datas.harga}</option>
                      )} 
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="12">
                  <div style={{textAlign:"right"}}>
                    <button className="btn btn-info" onClick={(e) => this.beli(e)}>Beli</button>
                    </div>
                    </Col>
                </Row>
                </CardBody>
                </Form>
            </Card>
          </Col>

          <Col xs="12" sm="6">
          {this.state.listRiwayat.map(riwayat => 
            <Card>
              <CardHeader>
                <strong>History Pemesanan</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <table className="table table-bordered">
                      <tr>
                        <td>Nominal</td>
                        <td>Rp.{riwayat.harga}</td>
                      </tr>
                      <tr>
                        <td>Nama</td>
                        <td>{riwayat.nama}</td>
                      </tr>
                      <tr>
                        <td>Status Pembayaran</td>
                        <td>{riwayat.status}</td>
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

export default Order;
