import React from 'react';
import axios from 'axios';
import { createCookie } from '../../../Helpers';

export default function AdminLogin() {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const login = () => {
		axios
			.post('/api/admin-login', { username, password })
			.then(res => {
				createCookie('x-auth', res.headers['x-auth']);
				alert('Uspešna autorizacija!');
				window.location.href = '/blog';
			})
			.catch(err => {
				alert(err.response.data);
				setUsername('');
				setPassword('');
			});
	};

	return (
		<section className="blog-page__login-form container">
			<h1>You are not authorized to modify this section.</h1>
			<h2>Please login:</h2>
			<form
				onSubmit={e => {
					e.preventDefault();
					login(username, password);
				}}
			>
				<input
					onChange={e => setUsername(e.target.value)}
					placeholder="Korisničko ime"
					type="text"
					value={username}
				/>
				<input
					onChange={e => setPassword(e.target.value)}
					placeholder="Lozinka"
					type="password"
					value={password}
				/>
				<input className="button" type="submit" value="Pošalji" />
			</form>
		</section>
	);
}
