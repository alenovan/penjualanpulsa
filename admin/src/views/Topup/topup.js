import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table ,  Input} from 'reactstrap';
import firebase from "firebase";
import api from '../API/firebase';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class topup extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('topup');
    this.unsubscribe = null;
    this.state = {
      listdata: [],
      nominal: '',
      metode: '',
      email: "",
      status:""
    };
  }

  onUpdateSaldo = (email,nominal) =>{
    // alert("aaa")
    firebase.firestore().collection("member").where("email", "==", email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data())
            const saldo = parseInt(documentSnapshot.data().saldo) + parseInt(nominal)
            const email = documentSnapshot.data().email
            const password = documentSnapshot.data().password
            const updateRef = firebase.firestore().collection('member').doc(documentSnapshot.id);
            updateRef.set({
              email,
              password,
              saldo
            }).then((docRef) => {
              MySwal.fire(<p>Berhasil Update Data</p>)
              this.props.history.push("/topup")
            })
          console.log(documentSnapshot.data())
          });
        })
          .catch(function (error) {
            alert(error)
          });
      }

  
  handleChange = (e, keys, emails, metodes, nominals) => {
    const status = e.target.value
    const email = emails
    const metode = metodes
    const nominal = nominals
    const updateRef = firebase.firestore().collection('topup').doc(keys);
    updateRef.set({
      email,
      metode,
      status,
      nominal
    }).then((docRef) => {
      this.onUpdateSaldo(emails,nominal)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  
  onCollectionUpdate = (querySnapshot) => {
    const listdata = [];
    querySnapshot.forEach((doc) => {
      const { nominal, metode, email,status } = doc.data();
      listdata.push({
        key: doc.id,
        doc, 
        nominal,
        metode,
        email,
        status
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
    // this.onUpdateSaldo()
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Data Topup
              </CardHeader>
              <CardBody>
              <div>
              </div>
                <Table className="table table-bordered" responsive>
                  <thead>
                    <tr>
                      <td>No</td>
                      <td>Email</td>
                      <td>Metode</td>
                      <td>Nominal</td>
                      <td>Aksi</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.listdata.map(data => {
                      if (data.status == "Pembayaran Di Terima") {
                        return (
                          <tr>
                            <td>{data.key}</td>
                            <td>{data.email}</td>
                            <td>{data.metode}</td>
                            <td>Rp.{data.nominal}</td>                          
                            <td>
                              <Input type="select" name="metode" id="ccmonth">
                                <option value="Pembayaran Di Terima">Pembayaran Di Terima</option>
                              </Input>
                            </td>
                          </tr>
                        )
                          
                      } else {
                        return (
                          <tr>
                            <td>{data.key}</td>
                            <td>{data.email}</td>
                            <td>{data.metode}</td>
                            <td>Rp.{data.nominal}</td>                          
                            <td>
                              <Input type="select" name="metode" id="ccmonth" onChange={e => this.handleChange(e,data.key,data.email,data.metode,data.nominal)}>
                                <option value="Silahkan lakukan pembayaran">Silahkan lakukan pembayaran</option>
                                <option value="Pembayaran Di Terima">Pembayaran Di Terima</option>
                                <option value="Pembayaran di tolak">Pembayaran di tolak</option>
                              </Input>
                            </td>
                          </tr>
                        )
                      }
                    }
                       
                          
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

export default topup;
