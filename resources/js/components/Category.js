import React from 'react';
import axios from 'axios';
import { AlertContext, CategoriesContext } from '../app';

export default function Category({
	categories,
	category_id,
	handleRadioChange
}) {
	const [isEditable, setIsEditable] = React.useState(false);
	const [values, setValues] = React.useState([]);
	const [newValues, setNewValues] = React.useState([]);
	const [inputVisible, setInputVisible] = React.useState(false);
	const [newCategory, setNewCategory] = React.useState({ name: '' });

	const setAlert = React.useContext(AlertContext);
	const categoriesContext = React.useContext(CategoriesContext);

	React.useEffect(() => {
		if (categories.length) {
			setValues(categories.map(c => c.name));
		}
	}, []);

	const syncValues = () => {
		categories.forEach((category, index) => {
			const element = document.getElementById(index);
			let newValuesArray = newValues;
			newValuesArray[index] = element.innerText;

			setNewValues(newValuesArray);
		});
	};

	const handleClick = e => {
		e.preventDefault();
		setInputVisible(!inputVisible);
	};

	const handleKeyPress = e => {
		const { id } = e.currentTarget;

		if (e.key === 'Enter') {
			e.preventDefault();
			syncValues();

			axios.put('/api/categories', newValues).then(() => {
				setIsEditable(false);
			});
		} else {
			let newValuesArray = values;
			newValuesArray[id] = e.currentTarget.innerText;

			setNewValues(newValuesArray);
		}
	};

	const submitCategory = e => {
		e.preventDefault();
		if (newCategory.name.length) {
			axios
				.post('/api/categories', { newCategory })
				.then(res => {
					setAlert('Category created successfully!', 'success');
					categoriesContext.updateCategories([...categories, res.data]);
					setInputVisible(false);
				})
				.catch(err => setAlert(err, 'danger'));
		} else {
			setAlert('Category name is required!', 'danger');
		}
	};

	const deleteCategory = name => {
		if (confirm('Are you sure you want to delete this category?')) {
			axios
				.delete(`/api/categories/${name}`)
				.then(res => {
					setAlert('Category deleted successfully!', 'success');
					categoriesContext.updateCategories(
						categories.filter(c => c.name !== res.data.name)
					);
				})
				.catch(err => setAlert(err, 'danger'));
		}
	};

	const toggleEditable = e => {
		e.preventDefault();
		setIsEditable(!isEditable);
	};

	return (
		<>
			{categories.map((category, index) => (
				<label className="category__container" key={category.id}>
					<span
						className={
							isEditable
								? 'category__value category__value--active'
								: 'category__value'
						}
						contentEditable={isEditable}
						id={index}
						onClick={e => e.preventDefault()}
						onKeyPress={handleKeyPress}
					>
						{category.name}
					</span>
					{category_id ? (
						<input
							defaultChecked={category_id === category.id}
							name="radio"
							onChange={handleRadioChange}
							type="radio"
							value={category.name}
						/>
					) : (
						<input
							name="radio"
							onChange={handleRadioChange}
							type="radio"
							value={category.name}
						/>
					)}
					<span className="category__checkmark" />
					{isEditable ? null : (
						<button className="editButton" onClick={toggleEditable}>
							Edit
						</button>
					)}
					<button
						className="editButton"
						onClick={e => {
							e.preventDefault();
							deleteCategory(category.name);
						}}
					>
						delete
					</button>
				</label>
			))}
			{inputVisible ? (
				<div>
					<input
						className="input"
						onChange={e =>
							setNewCategory({ ...newCategory, name: e.target.value })
						}
						onKeyPress={e => (e.key === 'Enter' ? submitCategory(e) : null)}
						placeholder="Add New Category"
						value={newCategory.name}
					/>
					<button onClick={submitCategory} className="button button--save">
						Save
					</button>
				</div>
			) : (
				<button onClick={handleClick} className="button button--small">
					Add New
				</button>
			)}
		</>
	);
}
