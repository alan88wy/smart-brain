import React, { Component } from 'react';
import Logo from './components/Logo/Logo';
import './App.css';
import Navigation from './components/Navigtion/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Ranks from './components/Ranks/Ranks';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/Signin/SignIn';
import Register from './components/Register/Register';
import AlertBox from './components/AlertBox/AlertBox';

const particleOptions = {
    particles: {
        // number: {
        //   value: 30,
        //   density: {
        //     enable: true,
        //     value_area: 800
        //   }
        // }
        number: {
            value: 40,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 7
            },
            type: 'cicle',
        },
        size: {
            anim: {
                enable: true,
                speed: 40,
                size_min: 0.1,
            },
            value: 3,
            random: true,
        },
        move: {
            enable: true,
            direction: 'none',
            speed: 6,
            out_mode: 'out',
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        },
        interactivity: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            modes: {
                repulse: {
                    distance: 200
                },
            },
            detect_on: 'canvas'
        },
    }
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    mes: '',
    route: 'signin',
    isSignedIn: false,
    user:
    {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
    }
}

class App extends Component {

    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            mes: '',
            route: 'signin',
            isSignedIn: false,
            user:
            {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    loadUser = (data) => {

        this.setState({ mes: "" });

        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputImage');
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
        // console.log(box);
        this.setState({ box: box })
    }

    displayAlert = (mes) => {
        // console.log(box);
        this.setState({ mes: mes })
    }

    onInputChange = (event) => {
        this.setState({ input: event.target.value });
    }

    onButtonSubmit = () => {

        // if (this.state.input.match(/\.(jpeg|jpg|gif|png)$/) === null) {
        //     return this.displayAlert("Invalid URL entered!")
        // };

        this.setState({ mes: "" });

        this.setState({ imageUrl: this.state.input });

        fetch('http://localhost:3000/imageUrl', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                input: this.state.input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response === "Invalid URL entered!") {
                    return this.displayAlert("Invalid URL entered!");
                };

                if (response) {
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            id: this.state.user.id
                        })
                    })
                        .then(response => response.json())
                        .then(count => {
                            if (count === 'Unable to update entries') {
                                alert('Unable to update entries')
                            } else {
                                this.setState(Object.assign(this.state.user, { entries: count }))
                            }
                        })
                        .catch(err => console.log(err))
                }
                this.displayFaceBox(this.calculateFaceLocation(response))
            })
            .catch(err => { return this.displayAlert(err) })

    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState);
        } else {
            if (route === 'home') {
                this.setState({ isSignedIn: true });
            } else {
                this.setState({ isSignedIn: false });
            };
            this.setState({ route: route });
        };

        this.setState();
    };

    render() {

        const { isSignedIn, imageUrl, route, box, mes, user } = this.state;

        return (
            <div className="App">
                <Particles className='particle'
                    params={particleOptions}
                />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                {route === 'home'
                    ? <div>
                        <Logo />
                        <AlertBox mes={mes} />
                        <Ranks name={user.name} entries={user.entries} />
                        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                        <FaceRecognition box={box} imageUrl={imageUrl} />
                    </div>
                    : (
                        route === 'signin'
                            ? (
                                <div>
                                    <SignIn displayAlert={this.displayAlert} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                                    <AlertBox mes={mes} />
                                </div>
                            )
                            : (
                                <div>
                                    <Register displayAlert={this.displayAlert} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
                                    <AlertBox mes={mes} />
                                </div>
                            )
                    )
                }


            </div>
        );
    }
}

export default App;
