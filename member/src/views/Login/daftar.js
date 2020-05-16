import React, { useCallback, useContext } from "react";
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import firebase from "firebase";
import Swal from 'sweetalert2'
import { withRouter, Redirect } from "react-router";
import app from "../API/firebase";
import { AuthContext } from "../API/Auth";
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)


const Daftar = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { emails, passwords } = event.target.elements;
      const saldo = 0
        try {
          await app
            .auth()
            .createUserWithEmailAndPassword(emails.value, passwords.value);
          const email = emails.value
          const password = passwords.value
          firebase.firestore().collection('member').add({ email, password ,saldo})
          MySwal.fire("<p>Selamat pendaftar berhasil</p>")
          history.push("/login");
        } catch (error) {
          MySwal.fire(`<p>${error}</p>`)
        }
    },
    [history]
  );

 
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={handleLogin}>
                      <h1>DAFTAR</h1>
                      <p className="text-muted">Daftar untuk membeli pulsa anda</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="emails" type="email" placeholder="Email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="passwords" type="password" placeholder="Password" />
                      </InputGroup>
                      <Row>
                        <Col xs="12" style={{textAlign:"right"}}>
                        <button  color="primary" className="px-4 btn btn-info" type="submit">Daftar</button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  export default withRouter(Daftar);