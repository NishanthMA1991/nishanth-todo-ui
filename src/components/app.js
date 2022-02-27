import React, { Component } from "react";

// Bootstrap for react
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    // Setting up state
    this.state = {
      userInput: "",
      list: [],
    };
  }

  async componentDidMount() {
    var data = await this.getTask();
    // reset state
    this.setState({
      list: data.data,
      userInput: "",
    });
  }

  async getTask() {
    try {
      return await axios({
        method: "get",
        url: "http://localhost:8000/api/todos",
      });
    } catch (error) {
      alert("Error while getting data");
    }
  }

  // Set a user input value
  updateInput(value) {
    this.setState({
      userInput: value,
    });
  }

  async postData(task) {
    try {
      return await axios({
        method: "post",
        url: "http://localhost:8000/api/todo/create",
        data: {
          task: task,
        },
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      alert("Task not added");
    }
  }

  // Add item if user input in not empty
  async addItem() {
    if (this.state.userInput !== "") {
      await this.postData(this.state.userInput);

      var data = await this.getTask();
      // reset state
      this.setState({
        list: data.data,
        userInput: "",
      });
    }
  }

  render() {
    return (
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
          }}
        >
          TODO LIST
        </Row>

        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="add item . . . "
                size="lg"
                value={this.state.userInput}
                onChange={(item) => this.updateInput(item.target.value)}
                aria-label="add something"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
            {/* <InputGroup.Append> */}
            <Button variant="dark" size="lg" onClick={() => this.addItem()}>
              ADD
            </Button>
            {/* </InputGroup.Append> */}
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {/* map over and print items */}
              {this.state.list.map((item) => {
                return (
                  <ListGroup.Item variant="dark">{item.task}</ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
