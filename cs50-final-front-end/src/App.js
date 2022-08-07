import React, { Component } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Footer from './components/Footer/Footer';
import Rank from './components/Rank/Rank';
import Quiz from './components/Quiz/Quiz';
import './App.css';
import WeekSelect from './components/WeekDisplay/WeekSelect';
import WeekTemplate from './components/WeekDisplay/WeekTemplate';

// The options to display all the fancy particles 
const particlesOptions = {
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 3,
            straight: true,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 50,
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 5 },
          },
        },
        detectRetina: true,
      }

// The initial state of the application
const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'home',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    attempts: 0
  },
  src: null,
  name: '',
  binary: '',
  english: '',
  comment: ''
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.handleData = this.handleData.bind(this);
  }

  // Makes calls to the back end API to retrieve week images
  handleImage(id){
    if (id !== "Welcome") {
      id = `Week ${id}`;
    }
    fetch(`http://localhost:3001/images/${id}.png`)
      .then(response => response.blob())
      .then(blob => {
          this.setState({ src: URL.createObjectURL(blob) })
    });
  }

// Makes calls to the back end API to retrieve week data
  handleData(id){
    fetch(`http://localhost:3001/weekData/${id}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        this.setState({
          name: data["name"],
          binary: data["binary"],
          english: data["english"],
          comment: data["comment"]
        })
    });
  }

// Loads a default image when page first loads
  componentDidMount(){
    this.handleImage("Welcome");
  }  

// Handles changes in the week selection drop down menu
// The idea for the fetch call was found from stack overflow
// https://stackoverflow.com/questions/46002113/javascript-reactjs-display-image-with-readablestream-as-source
  handleChange(event){
    console.log(event.target.value);
    this.handleImage(event.target.value);
    this.handleData(event.target.value);
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      attempts: data.attempts
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

// http://localhost:3001
// https://cryptic-beyond-55129.herokuapp.com/
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3001/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  // Controls the routing function for navigation, signin and signout
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'quiz') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, route, src, name, binary, english, comment, user } = this.state;
    const particlesInit = async (main) => {
    // console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
    };

  const particlesLoaded = (container) => {
    // console.log(container);
  };

    return (
      <div className="App">
         <Particles 
          className='particles'
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOptions}
        />
        <div className="cf ph2-ns">
          <Logo />
          <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        </div>
        { route === 'home'
          ? <div className='tc'  style={{overflow: 'hidden'}}>
              <h1 className='f1'>THIS IS CS50 Lights</h1>
              <WeekSelect searchChange={this.handleChange}/>
              <WeekTemplate 
                src={src} 
                name={name} 
                binary={binary} 
                english={english} 
                comment={comment}   
              />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : (
                route === 'quiz'
                ? <Quiz onRouteChange={this.onRouteChange} user={user}/>
                : (
                    route === 'rank'
                    ? <Rank user={user} />
                    : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                  )
               )
            )
        }
        <Footer />
      </div>
    );
  }
}

export default App;

//<div>
//  <Rank
//    name={this.state.user.name}
//  />
//  <ImageLinkForm
//    onButtonSubmit={this.onButtonSubmit}
//  />
//  <FaceRecognition box={box} imageUrl={imageUrl} />
//</div>
