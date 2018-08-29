import React from 'react';
import './UserInput.css';

const userInput = (props) => {
	return (
		<div>
			<input className="UserInput" type="text" onChange={props.change} value={props.name}/>
		</div>
	)
}

export default userInput;