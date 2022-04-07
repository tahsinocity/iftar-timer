import React from 'react';
import getUnixTime from '../utils/getUnixTime';

const { useEffect, useState } = React;

function Timer({ eventTime }) {
	const [currentTime, setCurrentTime] = useState(new Date().getTime());
	const iftarTime = getUnixTime(eventTime.date, eventTime.time);

	const timeBetween = new Date(iftarTime).getTime() - currentTime;
	const seconds = Math.floor((timeBetween / 1000) % 60);
	const minutes = Math.floor((timeBetween / 1000 / 60) % 60);
	const hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentTime(new Date().getTime());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="timer">
			{timeBetween < 0 ? (
				<>
					<h3>✨ Timer will start on the next fasting day ✨</h3>
				</>
			) : (
				<>
					<h2>Time remaining till Iftar:</h2>
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
