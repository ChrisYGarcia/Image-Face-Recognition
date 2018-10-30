import React, { Component } from "react";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/Logo/logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import app from "./config/keys";
import "./App.css";

//You must add your own API key here from Clarifai.

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box1: {},
      box2: {},
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    };
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  calculateSecondFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[1].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox1 = box => {
    this.setState({ box1: box });
  };

  displayFaceBox2 = box => {
    this.setState({ box2: box });
  };

  onInputChange = event => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        this.displayFaceBox1(this.calculateFaceLocation(response));
        this.displayFaceBox2(this.calculateSecondFaceLocation(response));
        console.log(response);
      })
      .catch(err => console.log(err));
  };

  resetButton = () => {
    this.setState({ imageUrl: "", box1: {}, box2: {}, input: "" });
  };

  render() {
    const { imageUrl, box1, box2 } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Logo />

        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
          resetButton={this.resetButton}
        />
        <FaceRecognition box1={box1} box2={box2} imageUrl={imageUrl} />
      </div>
    );
  }
}

export default App;
