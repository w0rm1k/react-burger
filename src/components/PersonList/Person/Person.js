import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import { AuthContext } from '../../../containers/App';

class Person extends Component {
	constructor(props) {
        super(props);
        console.log('[Person.js] Inside Constructor', props);
        this.inputElement = React.createRef();
    }

    componentWillMount() {
        console.log('[Person.js] Inside componentWillMount()');
    }

    componentDidMount() {
        console.log('[Person.js] Inside componentDidMount()');
        if (this.props.position === 0) {
        	this.inputElement.current.focus();
        }
    }  	

    focus() {
    	this.inputElement.current.focus();
    }

	//lecture 75 ErrorBoundary
	/*const rnd = Math.random();
	console.log(rnd);
	if (rnd > 0.7) {
		throw new Error('Something went wrong');
	}*/

	render() {
		console.log('[Person.js] Inside render()');
		return (
			<Aux>
				<AuthContext.Consumer>
					{auth => auth ? <p>I'm authenticated!</p> : null}
				</AuthContext.Consumer>
				<p onClick={this.props.click}>I'm {this.props.name} and I'm {this.props.age} years old!</p>
				<p>{this.props.children}</p>
				<input 
					ref={this.inputElement}
					type="text" 
					onChange={this.props.change} 
					value={this.props.name}/>
			</Aux>
		)
	}
}

Person.propTypes = {
	click: PropTypes.func,
	name: PropTypes.string,
	age: PropTypes.number,
	change: PropTypes.func
};

export default withClass(Person, classes.Person);