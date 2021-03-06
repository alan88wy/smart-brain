import React from 'react';
import './SignIn.css';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail: event.target.value })
    };

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value })
    };

    onSubmitSignIn = (event) => {

        fetch('https://vast-shore-64670.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if ((user === 'User Not Found') ||
                    (user === 'Invalid Password') ||
                    (user === 'No email or password entered') ||
                    (user === 'Wrong Password Format Entered') ||
                    (user === 'Invalid Email Entered')) {
                    this.props.displayAlert(user + '!');
                } else {
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                    this.props.displayAlert("");
                    // this.setState({ mes: "" });
                }
            })

    }

    render() {

        const { onRouteChange } = this.props;

        return (
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input
                                    onChange={this.onEmailChange}
                                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' type='email' name='email-address' id='email-address' />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input
                                    onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer">
                                <input type="checkbox" /> Remember me</label>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitSignIn} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default SignIn;