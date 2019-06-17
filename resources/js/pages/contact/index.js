import React, { lazy } from 'react';

const Form = lazy(() => import('./Form'));

export default function Contact() {
	return (
		<section className="contact-page container">
			<h1>Contact Form</h1>
			<Form />
		</section>
	);
}
