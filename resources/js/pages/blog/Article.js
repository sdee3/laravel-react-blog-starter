import React, { lazy } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { isAuthenticated, validateCookie } from '../../Helpers';

const Breadcrumbs = lazy(() => import('../../components/Breadcrumbs'));

export default function Article({ match }) {
	const [article, setArticle] = React.useState({});

	React.useEffect(() => {
		axios
			.get(`/api/article/${match.params.slug}`)
			.then(res => setArticle(res.data))
			.catch(err => console.error(err.response.data));
	}, []);

	const deleteArticle = () => {
		if (confirm('Are you sure you want to delete this article?')) {
			validateCookie()
				.then(() =>
					axios
						.delete(`/api/article/${match.params.slug}`)
						.then(() => (window.location.href = '/blog'))
				)
				.catch(() => {
					alert(
						'Error validating the cookie. Click OK to be redirected to the login page'
					);
					window.location.href = '/blog/admin';
				});
		}
	};

	return article ? (
		<>
			<Breadcrumbs
				page={
					<>
						<Link to="/blog">Blog</Link>
						<i className="material-icons">keyboard_arrow_right</i>
						<Link to={`/blog/${match.params.slug}`}>{article.title}</Link>
					</>
				}
			/>
			<section className="blog-page container">
				<section className="blog-post">
					{isAuthenticated() ? (
						<div className="blog-post__top-buttons">
							<Link to={`/blog/${match.params.slug}/edit`}>
								<button className="button">Edit</button>
							</Link>
							<button className="button" onClick={deleteArticle}>
								Delete Article
							</button>
						</div>
					) : null}
					<section className="blog-post__image">
						<img
							alt={`${article.title} - Cover image`}
							className="blog-post__cover-img"
							src={article.cover_url}
						/>
					</section>
					<h1 className="blog-post__title">{article.title}</h1>
					<section
						className="blog-post__text"
						dangerouslySetInnerHTML={{ __html: article.content }}
					/>
				</section>
			</section>
		</>
	) : null;
}
