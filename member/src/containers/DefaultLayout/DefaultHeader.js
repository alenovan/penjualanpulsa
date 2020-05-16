import React, { Component } from 'react';
import { Link, NavLink ,Redirect ,withRouter  } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import app from "../../views/API/firebase";
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import firebase from "firebase";
import NumberFormat from 'react-number-format';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.state = {saldo: 0};
 }
  
  onUpdateSaldo(){
    var user = app.auth().currentUser;
    firebase.firestore().collection("member").where("email", "==", user.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data())
          const saldo = parseInt(documentSnapshot.data().saldo)
          this.setState(
            { saldo: saldo }
          );
          });
        })
          .catch(function (error) {
            alert(error)
          });
      }
onLogout(){
    app.auth().signOut().then(function () {
      window.location.href = '/#/login';
    }).catch(function(error) {
      alert(error)
    });
  }
  render() {  
    this.onUpdateSaldo()
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <h3>Jual Pulsa</h3>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
          <h4 style={{ marginLeft: 20 }}><NumberFormat value={this.state.saldo} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></h4>
        </Nav>
        <Nav className="ml-auto" navbar> 
        
        <button className="btn btn-danger btn-sm" style={{marginTop:-10}} onClick={this.onLogout} >Logout</button>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withRouter (DefaultHeader);
