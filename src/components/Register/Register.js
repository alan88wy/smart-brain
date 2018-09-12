import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }

    onNameChange = (event) => {
        this.setState({ registerName: event.target.value })
    };

    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value })
    };

    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value })
    };

    onRegister = (event) => {

        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user === 'failed') {
                    this.props.displayAlert('Unable to register. User Exist!');
                } else if (user === 'Invalid Data') {
                    this.props.displayAlert('Invalid Name, Email or Password entered!');
                } else {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })


        // .then(response => console.log(JSON.stringify(response)))

    }

    render() {

        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange} className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='name' name='ename' id='name' />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange} className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='email' name='email-address' id='email-address' />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                            <div className='alert-box'>
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer">
                                <input type="checkbox" /> Remember me</label>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;