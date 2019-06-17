import React from 'react';
import { areInputsValid } from '../../Helpers';
import axios from 'axios';
import { AlertContext } from '../../app';

export default function Form() {
	const [name, setName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [message, setMessage] = React.useState('');

	const setAlert = React.useContext(AlertContext);

	const handleSubmit = e => {
		e.preventDefault();

		const validInputs = areInputsValid(name, email, message);

		if (validInputs === true) {
			axios
				.post('/api/contact', {
					name,
					email,
					message
				})
				.then(res => {
					if (res.status === 200) {
						setName('');
						setEmail('');
						setMessage('');

						setAlert(res.data, 'success');
					}
				})
				.catch(() => {
					setAlert('Greska prilikom slanja poruke!', 'danger');
				});
		} else {
			setAlert(validInputs, 'danger');
		}
	};

	return (
		<form method="POST" onSubmit={handleSubmit}>
			<input
				id="name"
				onChange={e => {
					setName(e.target.value);
				}}
				type="text"
				placeholder="Name"
				value={name}
			/>

			<input
				id="email"
				onChange={e => {
					setEmail(e.target.value);
				}}
				type="email"
				placeholder="Email"
				value={email}
			/>

			<textarea
				id="message"
				onChange={e => {
					setMessage(e.target.value);
				}}
				className="textMargin input"
				placeholder="Message"
				rows="10"
				value={message}
			/>

			<input className="button" type="submit" value="Send" />
		</form>
	);
}
