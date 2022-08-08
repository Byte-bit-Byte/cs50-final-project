// All the imports for the libraries and components used in creating the website front end
import React, { Component } from 'react';
import './App.css';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Footer from './components/Footer/Footer';
import Rank from './components/Rank/Rank';
import Quiz from './components/Quiz/Quiz';
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

// The creation of the class object for the App
class App extends Component {
  // Defines initial state and binds functions to this
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

  // Loads users data after sign in, given to relevant components
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      attempts: data.attempts
    }})
  }

  // Controls the routing function for App to display specific components
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'quiz') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  // Render function containing actual App Components
  render() {
    // De-reference all needed state variables
    const { isSignedIn, route, src, name, binary, english, comment, user } = this.state;

    // ts-particles initialize function
    const particlesInit = async (main) => {
    await loadFull(main);
    };

    // ts-particles container
    // more info
    // https://www.npmjs.com/package/react-tsparticles
    const particlesLoaded = (container) => {
    };

    // Return function for App
    return (
      <div className="App">
        {/*Loads the particles in the background*/}
        <Particles 
          className='particles'
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={particlesOptions}
        />

        {/*Loads the Logo and Navigation component always*/}
        <div className="cf ph2-ns">
          <Logo />
          <Navigation 
            isSignedIn={isSignedIn} 
            onRouteChange={this.onRouteChange} 
          />
        </div>

        {/*Logic for displaying components based on route*/}
        {/*First check for home, then signin, then quiz,*/}
        {/*then rank and if none of the above load register*/}
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
             ? <Signin 
                  loadUser={this.loadUser} 
                  onRouteChange={this.onRouteChange}
                />
             : (
                route === 'quiz'
                ? <Quiz 
                    onRouteChange={this.onRouteChange} 
                    user={user}
                  />
                : (
                    route === 'rank'
                    ? <Rank user={user} />
                    : <Register l
                        oadUser={this.loadUser} 
                        onRouteChange={this.onRouteChange}
                      />
                  )
               )
            )
        }

        {/*Loads the Footer component always*/}
        <Footer />
      </div>
    );
  }
}

export default App; //Export statement for App Class