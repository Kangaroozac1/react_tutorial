import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/*
notes:

In rare cases you might want a component to hide itself even though it was rendered by another component. To do this return null instead of its render output.


 */



function App() {
    return (
        //good practice to extract everything into functions
        <div>
            <div>
                <Greetings userId={2} />
            </div>
            <div>
                <Clock />
            </div>
            <div>
                <Toggle />
            </div>
            <div>
                <LoginControl />
            </div>
            <div>
                <Mailbox unreadMessages={messages} />
            </div>
        </div>
    );
}

function formatName(user2) {
    return user2.firstName + ' ' + user2.lastName;
}

function Greetings(props) {
    switch (props.userId) {
        case 0:
            return <Welcome firstName="phil" lastName="collins"/>
        case 1:
            return <Welcome firstName="taylor" lastName="miller"/>
        case 2:
            return <Welcome firstName="dick" lastName="dick"/>
        default:
            return <h1>Who are you</h1>
    }
}

//never modify inputs of function
function Welcome(props) {
    const user = {
        firstName: props.firstName,
        lastName: props.lastName
    }
    return <h1> Hello, {formatName(user)}! </h1>
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        //can only assign to this.state in constructor use this.setState instead ex. tick()
        //state updates are async so dont rely on state to calculate next state
        this.state = {date: new Date()}
    }

    //starts updates on render
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    //stops updates on render
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h2>
                    it is {this.state.date.toLocaleTimeString()}
                </h2>
            </div>
        );
    }
}

class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};

        //This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                {this.state.isToggleOn ? "On" : "Off"}
            </button>
        )
    }
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false};
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true});
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false});
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        let button;
        let greeting;
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.handleLogoutClick} />;
            greeting = <Greetings userId={2} />
        } else {
            button = <LoginButton onClick={this.handleLoginClick} />;
            greeting = <Greetings />
        }

        return (
            <div>
                {greeting}
                {button}
            </div>
        );
    }
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        //if the condition is true, the element right after && will appear in the output. If it is false, React will ignore and skip it.
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
            <h2>
                You have {unreadMessages.length} unread messages.
            </h2>
            }
        </div>
    );
}



ReactDOM.render(
    <App />,
    document.getElementById('root')
);




























