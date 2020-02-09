import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../../actions/itemActions";
import PropTypes from "prop-types";

import Header from "./Header";
import About from "./About";
import PredictionHooks from "../Predictions/PredictionHooks";

class Login extends Component {
  render() {
    return (
      <div className="login">
        {this.props.isAuthenticated ? (
          <div>
            <h1>welcome to virtualchef! </h1>
            <h3>you have logged in successfully :)</h3>
          </div>
        ) : (
          <div>
            <Header />
            <PredictionHooks />
            <About />
          </div>
        )}

        {/* <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Shopping List</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add shopping item"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(Login);
