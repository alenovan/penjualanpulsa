import React, { Component,useCallback } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { modalTambah,validasi,cancel, modalhapus } from "./adminModal";
import firebase from "firebase";
import api from '../API/firebase';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

class Admin extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('admin');
    this.unsubscribe = null;
    this.state = {
      listAdmin: [],
      name: '',
      password: ''
    };
  }


  SignUp = (email,password) => {
      try {
           api
          .auth()
          .createUserWithEmailAndPassword(email, password);
          this.props.history.push("/admin")
      } catch (error) {
        alert(error);
      }
  }
  modalValidasi = () => {
    const vali = async () => {
      const swalval = await MySwal.fire(validasi);
      let v = swalval && swalval.value || swalval.dismiss;
      if (v === 'cancel') {
      } else {
        this.tambahAdmin()
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
        this.tambahAdmin()
      }
      
    }
    vali();
  }

  tambahAdmin = () => {
    const tambah = async () => {
      const swalval = await MySwal.fire(modalTambah);
      let v = swalval && swalval.value || swalval.dismiss;
      if (v === 'cancel') {
        this.modalCancel()
      } else {
        if (v && v.nama && v.password) {
          this.setState({
            email: v.nama,
            password: v.password
          }); 
          const { email,  password } = this.state;
          this.ref.add({
            email,
            password
          }).then((docRef) => {
            this.setState({
              email: "",
              password: ""
            });
            this.props.history.push("/admin")
            MySwal.fire(<p>Admin berhasil di tambah</p>)
            this.SignUp(v.nama,v.password)
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


  
hapusAdmin=(id)=> {
  const hapus = async () => {
    const swalval = await MySwal.fire(modalhapus);
    let v = swalval && swalval.value || swalval.dismiss;
    if (v === 'cancel') {
      
    } else {
      firebase.firestore().collection('admin').doc(id).delete().then(() => {
        MySwal.fire(<p>Admin berhasil di hapus</p>)
        this.props.history.push("/admin")
      }).catch((error) => {
        alert("gagal hapus")
        console.error("Error removing document: ", error);
      });
    }
    
  }
  hapus()
  }
  
  updateAdmin = (id,name,passwords) => {
    let modalUpdate = {
        title: "Update Admin",
        focusConfirm: false,
        html: `
          <input class="swal2-input" id="nama" type="text" value="${name}"/>
          <input class="swal2-input" id="password" type="password" value="${passwords}"/>
          `,
        type: 'warning',
        showCancelButton: true,
        cancelButtonColor: 'grey',
        confirmButtonText: 'Update !',
        allowOutsideClick: false,
        preConfirm: () => ({
          nama: document.getElementById('nama').value,
          password: document.getElementById('password').value,
        })
    };
    const update = async () => {
      const swalval = await MySwal.fire(modalUpdate);
      let v = swalval && swalval.value || swalval.dismiss;
      if (v === 'cancel') {
      } else {
        const updateRef = firebase.firestore().collection('admin').doc(id);
        const email = v.nama;
        const password = v.password;   
        updateRef.set({
          email,
          password
        }).then((docRef) => {
          MySwal.fire(<p>Berhasil Update Data</p>)
          this.props.history.push("/admin")
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      }
    }
    update()
}


  onCollectionUpdate = (querySnapshot) => {
    const listAdmin = [];
    querySnapshot.forEach((doc) => {
      const { email, no, password } = doc.data();
      listAdmin.push({
        key: doc.id,
        doc, 
        email,
        password,
      });
    });
    this.setState({
      listAdmin
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
                <i className="fa fa-align-justify"></i> Data Admin
              </CardHeader>
              <CardBody>
              <div>
                <div style={{ textAlign: "right",marginBottom:20}}>
                    <button className="btn btn-success" onClick={this.tambahAdmin}>Tambah Admin</button>
                </div>
              </div>
                <Table className="table table-bordered" responsive>
                  <thead>
                    <tr>
                      <td>No</td>
                      <td>Nama</td>
                      <td>Password</td>
                      <td>Aksi</td>
                    </tr>
                  </thead>
                  <tbody>
                      {this.state.listAdmin.map(admin => 
                          <tr>
                            <td>{admin.key}</td>
                            <td>{admin.email}</td>
                            <td>{admin.password}</td>
                            <td>
                             {/* <button className="btn btn-info" onClick={() =>this.updateAdmin(admin.key,admin.name,admin.password)}> Update</button> */}
                            <button className="btn btn-danger" onClick={() => this.hapusAdmin(admin.key)} style={{marginLeft:20}}>Hapus</button>
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

export default Admin;
