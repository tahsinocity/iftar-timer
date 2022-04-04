import React from 'react';

const { useEffect, useState } = React;

function Timer({ eventTime }) {
	const [currentTime, setCurrentTime] = useState(
		Date.parse(new Date().toUTCString())
	);

	const timeBetween = eventTime - currentTime;
	const seconds = Math.floor((timeBetween / 1000) % 60);
	const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
	const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(Date.parse(new Date().toUTCString()));
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="timer">
			{timeBetween < 0 ? null : (
				<>
					<h2>Time remaining till Iftaar:</h2>
					<h1>
						{hours} hrs {minutes < 10 ? `0${minutes}` : minutes} mins{' '}
						{seconds < 10 ? `0${seconds}` : seconds} secs
					</h1>
				</>
			)}
		</div>
	);
}

export default Timer;
