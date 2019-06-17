import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<section className="navbar">
			<div className="container">
				<div className="navbar__brand">
					<Link to="/">
						<img alt="MySite navbar logo" src="" />
					</Link>
				</div>
				<input type="checkbox" id="nav-check" />
				<section className="navbar__mobile-buttons">
					<label htmlFor="nav-check">
						<span />
						<span />
						<span />
					</label>
				</section>
				<section className="navbar__links">
					<Link to="/">Home</Link>
					<Link to="/services">Services</Link>
					<Link to="/packages">Packages</Link>
					<Link to="/blog">Blog</Link>
					<Link to="/contact">Contact</Link>
				</section>
			</div>
		</section>
	);
}
