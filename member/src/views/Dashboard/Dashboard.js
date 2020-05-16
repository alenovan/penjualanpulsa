import React, { Component, lazy, Suspense } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Badge,
  Button,
  ButtonDropdown,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Progress,
  Row,
  Table,
} from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'

import firebase from "firebase";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import app from '../API/firebase';
// Card Chart 1

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      listdata: [],
      listRiwayat: []
    };
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

  onCollectionUpdate = (querySnapshot) => {
    const listdata = [];
    querySnapshot.forEach((doc) => {
      const { nominal, metode, email,status } = doc.data();
      listdata.push({
        key: doc.id,
        nominal, 
        metode,
        email,
        status,
      });
    });
    this.setState({
      listdata
   });
  }

  componentDidMount() {
    var user = app.auth().currentUser;
    let query1 = firebase.firestore().collection('topup').where('email', '==', user.email)
    let query = firebase.firestore().collection('order').where('email', '==', user.email)
    this.unsubscribe = query1.onSnapshot(this.onCollectionUpdate);
    this.unsubscribe = query.onSnapshot(this.onCollectionUpdateRiwayat);
  }


  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

  render() {

    return (
      <div className="animated fadeIn">
         <Row>
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
          <Col xs="12" sm="6">
            {this.state.listdata.map(topup => 
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

export default Dashboard;
