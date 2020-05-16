import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { modalTambah,validasi,cancel, modalhapus } from "./jenisModal";
import firebase from "firebase";
import api from '../API/firebase';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

class Jenis extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('jenis');
    this.unsubscribe = null;
    this.state = {
      listdata: [],
      nama: '',
      harga: '',
      kode: ''
    };
  }

  modalValidasi = () => {
    const vali = async () => {
      const swalval = await MySwal.fire(validasi);
      let v = swalval && swalval.value || swalval.dismiss;
      if (v === 'cancel') {
      } else {
        this.tambah()
      }
      
    }
    vali();
  }

  modalCancel = () => {
    const vali = async () => {
      const swalval = await MySwal.fire(cancel);
      let v = swalval && swalval.value || swalval.dismiss;
      if (v === 'cancel') {
      } else {
        this.tambah()
      }
      
    }
    vali();
  }

  tambah = () => {
    const tambah = async () => {
      const swalval = await MySwal.fire(modalTambah);
      let v = swalval && swalval.value || swalval.dismiss;
      if (v === 'cancel') {
        this.modalCancel()
      } else {
        if (v && v.nama&& v.harga&& v.kode) {
          const nama = v.nama;
          const harga = v.harga;
          const kode = v.kode;
          this.ref.add({
            nama,
            harga,
            kode
          }).then((docRef) => {
            this.setState({
              nama: "",
              harga: "",
              kode: "",
            });
            this.props.history.push("/jenis")
            MySwal.fire(<p>jenis berhasil di tambah</p>)
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        } else {
          this.modalValidasi()
        }
     
        
      }
    }
    tambah();
  }


  
hapus=(id)=> {
  const hapus = async () => {
    const swalval = await MySwal.fire(modalhapus);
    let v = swalval && swalval.value || swalval.dismiss;
    if (v === 'cancel') {
      
    } else {
      firebase.firestore().collection('jenis').doc(id).delete().then(() => {
        MySwal.fire(<p>jenis berhasil di hapus</p>)
        this.props.history.push("/jenis")
      }).catch((error) => {
        alert("gagal hapus")
        console.error("Error removing document: ", error);
      });
    }
    
  }
  hapus()
  }
  
  update = (id,name,harga,kode) => {
    let modalUpdate = {
        title: "Update jenis",
        focusConfirm: false,
        html: `
          <input class="swal2-input" id="nama" type="text" value="${name}"/>
          <input class="swal2-input" id="harga" type="text" value="${harga}" />
          <input class="swal2-input" id="kode" type="text" value="${kode}" />
          `,
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: 'grey',
        confirmButtonText: 'Update !',
        allowOutsideClick: false,
        preConfirm: () => ({
          nama: document.getElementById('nama').value,
          harga: document.getElementById('harga').value,
          kode: document.getElementById('kode').value,
        })
    };
    const update = async () => {
      const swalval = await MySwal.fire(modalUpdate);
      let v = swalval && swalval.value || swalval.dismiss;
      if (v === 'cancel') {
      } else {
        const updateRef = firebase.firestore().collection('jenis').doc(id);
        const nama = v.nama;   
        const harga = v.harga;   
        const kode = v.kode;   
        updateRef.set({
          nama,
          harga,
          kode
        }).then((docRef) => {
          MySwal.fire(<p>Berhasil Update Data</p>)
          this.props.history.push("/jenis")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
    }
    update()
}


  onCollectionUpdate = (querySnapshot) => {
    const listdata = [];
    querySnapshot.forEach((doc) => {
      const { nama, harga, kode } = doc.data();
      listdata.push({
        key: doc.id,
        doc, 
        nama,
        harga,
        kode
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
                <i className="fa fa-align-justify"></i> Data Produk
              </CardHeader>
              <CardBody>
              <div>
                <div style={{ textAlign: "right",marginBottom:20}}>
                    <button className="btn btn-success" onClick={this.tambah}>Tambah Produk</button>
                </div>
              </div>
                <Table className="table table-bordered" responsive>
                  <thead>
                    <tr>
                      <td>No</td>
                      <td>Nama</td>
                      <td>Harga</td>
                      <td>Kode</td>
                      <td>Aksi</td>
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.listdata.map(data => 
                          <tr>
                            <td>{data.key}</td>
                            <td>{data.nama}</td>
                            <td>{data.harga}</td>
                            <td>{data.kode}</td>
                            <td>
                             <button className="btn btn-info" onClick={() =>this.update(data.key,data.nama,data.harga,data.kode)}> Update</button>
                            <button className="btn btn-danger" onClick={() => this.hapus(data.key)} style={{marginLeft:20}}>Hapus</button>
                            </td>
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

export default Jenis;
