import React from 'react';
import MyTimer from './utils/timer';

function Event({
	title,
	date,
	eventTime,
	giphySrc = 'https://giphy.com/embed/ZO9b1ntYVJmjZlsWlm',
	cancelled = false,
}) {
	return (
		<div className="timer timer-m">
			<iframe
				title="pic"
				src={giphySrc}
				width="400"
				height="200"
				frameBorder="0"
				className="giphy-embed"
				allowFullScreen
			></iframe>

			<div className="timer-box timer-box-m">
				<h2>{title}</h2>
				<span>{date}</span>
				<MyTimer expiryTimestamp={eventTime} cancelled={cancelled} />
			</div>
		</div>
	);
}

export default Event;
