import React from 'react';
import { Link } from 'react-router-dom';

export default function ArticleCard({ article, category }) {
	const { caption, cover_url, title, slug } = article;

	return (
		<Link className="blog-post__link" to={`/blog/${slug}`}>
			<section className="blog-post__card">
				<img
					alt={`${title} - Cover image`}
					className="blog-post__cover-img"
					src={cover_url}
				/>
				<h3 className="blog-post__title">{title}</h3>
				<p className="blog-post__caption">{caption}</p>
				<span className="blog-post__category">{category}</span>
				<div className="blog-post__clear" />
			</section>
		</Link>
	);
}
