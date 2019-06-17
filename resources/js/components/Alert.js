import React from 'react';

export default function Alert({ alertMessage, alertState }) {
	return alertMessage.length ? (
		<div
			className={
				alertState === 'success'
					? 'alert alert--visible alert--success'
					: 'alert alert--visible alert--danger'
			}
		>
			{alertMessage}
		</div>
	) : (
		<div
			className={
				alertState === 'success'
					? 'alert alert--success'
					: 'alert alert--danger'
			}
		>
			{alertMessage}
		</div>
	);
}
