import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
	quillFormats,
	quillModules,
	isAuthenticated,
	validateCookie
} from '../../Helpers';
import { AlertContext, CategoriesContext } from '../../app';
import Page404 from '../404';

const Category = lazy(() => import('../../components/Category'));
const ReactQuill = lazy(() => import('react-quill'));

export default function Edit({ match }) {
	const [article, setArticle] = React.useState({});
	const [originalTitle, setOriginalTitle] = React.useState('');
	const [originalSlug, setOriginalSlug] = React.useState('');

	const categoriesContext = React.useContext(CategoriesContext);
	const setAlert = React.useContext(AlertContext);

	React.useEffect(() => {
		const { slug } = match.params;

		axios
			.get(`/api/article/${slug}`)
			.then(res => {
				setArticle(res.data);
				setOriginalTitle(res.data.title);
				setOriginalSlug(slug);
			})
			.catch(err => console.error(err.response));
	}, []);

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

	const handleRadioChange = e => {
		const newCategory = categoriesContext.categories.filter(
			c => c.name === e.target.value
		)[0];

		setArticle({ ...article, category_id: newCategory.id });
	};

	const updateArticle = () => {
		validateCookie().then(() =>
			axios.put(`/api/article/${originalSlug}`, article).then(() => {
				setAlert(
					'Article updated successfully! You will soon be redirected back to the article...',
					'success'
				);

				setTimeout(() => {
					window.location.href = `/blog/${article.slug}`;
				}, 2500);
			})
		);
	};

	return Object.keys(article).length && isAuthenticated() ? (
		<section className="blog-page container">
			<Link to={`/blog/${article.slug}`}>
				<button className="button">Go Back</button>
			</Link>
			<h1>You are editing {originalTitle}:</h1>
			<section className="edit-article__inputs">
				<div className="edit-article__inputs--category-select">
					<span>Category:</span>
					<section className="edit-article__category-checkboxes">
						<Category
							categories={categoriesContext.categories}
							category_id={article.category_id}
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
					onChange={e => setArticle({ ...article, cover_url: e.target.value })}
					placeholder="Cover Image URL"
					value={article.cover_url}
				/>
				<ReactQuill
					formats={quillFormats}
					modules={quillModules}
					onChange={handleChange}
					value={article.content}
				/>
				<section className="text-center">
					<button className="button" onClick={updateArticle}>
						Save Changes
					</button>
				</section>
			</section>
		</section>
	) : (
		<Page404 />
	);
}
