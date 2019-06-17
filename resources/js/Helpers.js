import axios from 'axios';

const quillModules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[
			{ list: 'ordered' },
			{ list: 'bullet' },
			{ indent: '-1' },
			{ indent: '+1' }
		],
		['link', 'image'],
		['clean']
	]
};

const quillFormats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image'
];

const createCookie = (cookieName, cookieValue, daysToExpire) => {
	const date = new Date();
	date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
	document.cookie =
		cookieName + '=' + cookieValue + '; expires=' + date.toGMTString();
};

const fetchCookie = cookieName => {
	let name = cookieName + '=';
	let allCookieArray = document.cookie.split(';');

	for (let i = 0; i < allCookieArray.length; i++) {
		let temp = allCookieArray[i].trim();

		if (temp.indexOf(name) === 0) {
			return temp.substring(name.length, temp.length);
		}
	}

	return '';
};

const isAuthenticated = () => {
	return fetchCookie('x-auth').length > 0;
};

const validateCookie = () => {
	return new Promise((resolve, reject) => {
		axios
			.post('/api/validate-cookie', { cookie: fetchCookie('x-auth') })
			.then(res => resolve(res.data))
			.catch(err => reject(err.response));
	});
};

const validateArticle = article => {
	return new Promise((resolve, reject) => {
		if (article.title.length) {
			if (article.caption.length) {
				if (article.slug.length) {
					if (article.content.length) {
						if (article.cover_url.length) {
							return resolve();
						} else {
							reject('Missing Cover Image Url in the form!');
						}
					} else {
						reject('Missing Content in the form!');
					}
				} else {
					reject('Missing Slug in the form!');
				}
			} else {
				reject('Missing Caption in the form!');
			}
		} else {
			reject('Missing Title in the form!');
		}
	});
};

const areInputsValid = (name, email, message) => {
	if (name.length) {
		if (email.length) {
			let re = /\S+@\S+\.\S+/;
			if (re.test(email)) {
				if (message.length) {
					return true;
				} else {
					return 'Nedostaje poruka u kontakt formi! Pokušajte ponovo.';
				}
			} else {
				return 'Email adresa nije validna! Pokušajte ponovo.';
			}
		} else {
			return 'Nedostaje email adresa u kontakt formi! Pokušajte ponovo.';
		}
	} else {
		return 'Nedostaje ime u kontakt formi! Pokušajte ponovo.';
	}
};

export {
	fetchCookie,
	createCookie,
	isAuthenticated,
	quillFormats,
	quillModules,
	validateCookie,
	areInputsValid,
	validateArticle
};
