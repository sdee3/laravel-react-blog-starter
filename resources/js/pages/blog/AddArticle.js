import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import {
	quillFormats,
	quillModules,
	isAuthenticated,
	validateCookie,
	validateArticle
} from '../../Helpers';
import axios from 'axios';
import { AlertContext, CategoriesContext } from '../../app';
import Page404 from '../404';

const Breadcrumbs = lazy(() => import('../../components/Breadcrumbs'));
const Category = lazy(() => import('../../components/Category'));
const ReactQuill = lazy(() => import('react-quill'));

export default function AddArticle() {
	const [article, setArticle] = React.useState({
		title: '',
		caption: '',
		category_id: 0,
		slug: '',
		content: '',
		cover_url: ''
	});

	const categoriesContext = React.useContext(CategoriesContext);
	const setAlert = React.useContext(AlertContext);

	const handleChange = value => {
		if (value.indexOf('data:image') > 0) {
			let valuesArray = value.split('</p>');

			for (let i = 0; i < valuesArray.length; i++) {
				if (valuesArray[i].indexOf('data:image') > 0) {
					let imgStringArray =
						valuesArray[i].split(`<p><img src="data:`) ||
						valuesArray[i].split(`<img src="data:`);

					if (imgStringArray[1]) {
						const sanitizedImgData = imgStringArray[1].split(`">`)[0];

						axios
							.post('/api/upload', { data: sanitizedImgData })
							.then(response => {
								valuesArray[i] = `<img src="/${response.data}" />`;
								var output = valuesArray.join('</p>');

								setArticle({ ...article, content: output });
							})
							.catch(err => setAlert(err, 'danger'));
					}
				}
			}
		} else {
			setArticle({ ...article, content: value });
		}
	};

	const submitArticle = () => {
		validateCookie()
			.then(() =>
				validateArticle(article)
					.then(() => {
						axios
							.post('/api/article', article)
							.then(() => (window.location.href = '/blog'))
							.catch(err => setAlert(err.response.data.message, 'danger'));
					})
					.catch(() =>
						setAlert('All fields are required! Please try again.', 'danger')
					)
			)
			.catch(() => {
				alert(
					'Error validating the cookie. Click OK to be redirected to the login page'
				);
				window.location.href = '/blog/admin';
			});
	};

	const handleRadioChange = e => {
		const newCategory = categoriesContext.categories.filter(
			c => c.name === e.target.value
		)[0];

		setArticle({ ...article, category_id: newCategory.id });
	};

	return isAuthenticated() ? (
		<>
			<Breadcrumbs
				page={
					<>
						<Link to="/blog">Blog</Link>
						<i className="material-icons">keyboard_arrow_right</i>
						<Link to="/blog/new">Add Article</Link>
					</>
				}
			/>
			<section className="blog-page blog-page__add-article container">
				<h1>Add Article</h1>
				<form
					className="add-article__form"
					onSubmit={e => {
						e.preventDefault();
						submitArticle();
					}}
				>
					<div className="edit-article__inputs--category-select">
						<span>Category:</span>
						<section className="edit-article__category-checkboxes">
							<Category
								categories={categoriesContext.categories}
								handleRadioChange={handleRadioChange}
							/>
						</section>
					</div>
					<input
						onChange={e => setArticle({ ...article, title: e.target.value })}
						placeholder="Title"
						value={article.title}
					/>
					<input
						onChange={e => setArticle({ ...article, caption: e.target.value })}
						placeholder="Caption"
						value={article.caption}
					/>
					<div className="input-group-prepend">
						<div className="input-group-prepend__pre-input-text">{`/blog/`}</div>
						<input
							onChange={e => setArticle({ ...article, slug: e.target.value })}
							placeholder="Article URL (automatically starts with /blog/)"
							value={article.slug}
						/>
					</div>
					<input
						onChange={e =>
							setArticle({ ...article, cover_url: e.target.value })
						}
						placeholder="Cover Image URL"
						value={article.cover_url}
					/>
					<ReactQuill
						formats={quillFormats}
						modules={quillModules}
						onChange={handleChange}
						value={article.content}
					/>
					<input className="button" type="submit" value="Submit New Article" />
				</form>
			</section>
		</>
	) : (
		<Page404 />
	);
}
