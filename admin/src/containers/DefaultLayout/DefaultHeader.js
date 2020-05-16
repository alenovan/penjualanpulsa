import React, { Component } from 'react';
import { Link, NavLink ,Redirect ,withRouter  } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import app from "../../views/API/firebase";
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
}
onLogout(){
    app.auth().signOut().then(function () {
      window.location.href = '/#/login';
    }).catch(function(error) {
      alert(error)
    });
  }
  render() {  
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <h3>Jual Pulsa</h3>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="d-md-down-none" navbar>
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
