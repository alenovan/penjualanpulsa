import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table ,Input} from 'reactstrap';
import firebase from "firebase";
import api from '../API/firebase';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
class Transaksi extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('order');
    this.unsubscribe = null;
    this.state = {
      listdata: [],
      nama: '',
      status: '',
      harga: "",
      email:""
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const listdata = [];
    querySnapshot.forEach((doc) => {
      const { nama, status, harga,email } = doc.data();
      listdata.push({
        key: doc.id,
        doc, 
        nama,
      status,
      harga,
      email
      });
    });
    this.setState({
      listdata
   });
  }

  handleChange = (e,keys,emails,namas,hargas) => {
    const status = e.target.value
    const email = emails
    const nama = namas
    const harga = hargas
    const updateRef = firebase.firestore().collection('order').doc(keys);
    updateRef.set({
      email,
      nama,
      harga,
      status
    }).then((docRef) => {
      MySwal.fire(<p>Berhasil Update Data</p>)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
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
                <i className="fa fa-align-justify"></i> Data Transaksi
              </CardHeader>
              <CardBody>
              <div>
              </div>
              <Table className="table table-bordered" responsive>
                  <thead>
                    <tr>
                      <td>No</td>
                      <td>Email</td>
                      <td>Produk</td>
                      <td>Nominal</td>
                      <td>Aksi</td>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.listdata.map(data => {
                      return (
                        <tr>
                          <td>{data.key}</td>
                          <td>{data.email}</td>
                          <td>{data.nama}</td>
                          <td>Rp.{data.harga}</td>                          
                          <td>
                            <Input type="select" name="status" id="ccmonth" onChange={e => this.handleChange(e,data.key,data.email,data.nama,data.harga)}>
                              <option value={data.status}>{data.status}</option>
                              <option value="proses pesanan">Proses pesanan</option>
                            </Input>
                          </td>
                        </tr>
                      )
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

export default Transaksi;
