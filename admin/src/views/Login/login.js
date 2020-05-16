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


const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      Swal.showLoading()
        const { email, password } = event.target.elements;
        try {
          await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
          firebase.firestore().collection("admin").where("email", "==", email.value)
          .get()
            .then((response) => {
              console.log(response.docs.length)
              if (response.docs.length >= 1) {
                history.push("/");
                
                MySwal.fire("<p>Selamat datang di jualpulsa.com</p>")
              } else {
                MySwal.fire("<p>Mohon maaf akun anda tidak dapat di temukan</p>")
              }
          })
            .catch(function (error) {
              MySwal.fire(`<p>${error}</p>`)
          });
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
                      <h1>Login</h1>
                      <p className="text-muted">Login Dengan akun anda</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="email" type="email" placeholder="Email" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input name="password" type="password" placeholder="Password" />
                      </InputGroup>
                      <Row>
                        <Col xs="12" style={{textAlign:"right"}}>
                        <button  color="primary" className="px-4 btn btn-info" type="submit">Login</button>
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

  export default withRouter(Login);