import React, { lazy } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../Helpers';
import { CategoriesContext } from '../../app';

const ArticleCard = lazy(() => import('./ArticleCard'));
const Breadcrumbs = lazy(() => import('../../components/Breadcrumbs'));

export default function Blog() {
	const [blogPosts, setBlogPosts] = React.useState([]);

	const categoriesContext = React.useContext(CategoriesContext);

	React.useEffect(() => {
		axios
			.get('/api/articles')
			.then(res => {
				setBlogPosts(res.data);
			})
			.catch(err => console.error(err.response.data));
	}, []);

	return (
		<>
			<Breadcrumbs page={<Link to="/blog">Blog</Link>} />
			<section className="blog-page container">
				<div className="blog-page__top-heading">
					<h1>Blog</h1>
					{isAuthenticated() ? (
						<Link to="/blog/new">
							<button className="button">New Article</button>
						</Link>
					) : null}
				</div>
				<section className="blog-page__blog-posts">
					{blogPosts.map((blogPost, index) => (
						<ArticleCard
							article={blogPost}
							key={index}
							category={
								categoriesContext.categories.filter(
									c => c.id === blogPost.category_id
								)[0].name
							}
						/>
					))}
				</section>
			</section>
		</>
	);
}
