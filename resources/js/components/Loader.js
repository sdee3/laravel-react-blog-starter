import React from 'react';

export default function Load() {
	return (
		<div className="pace-on pace-dot pace-running">
			<div className="pace">
				<div
					className="pace-progress"
					data-progress-text="100%"
					data-progress="99"
				>
					<div className="pace-progress-inner" />
				</div>
				<div className="pace-activity" />
			</div>
			<div className="pace-overlay" />
		</div>
	);
}
