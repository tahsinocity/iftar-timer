import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';

function MyTimer({ expiryTimestamp, cancelled }) {
	const [expired, updateExpired] = useState(false);
	const { seconds, minutes, hours, days } = useTimer({
		expiryTimestamp,
		onExpire: () => {
			updateExpired(!expired);
		},
	});

	const response = [
		'chilled so hard!',
		'10/10 expirience!',
		'it was the best of times!',
		'cant wait to do it again!',
	];

	return (
		<div>
			{expired ? (
				<div
					style={{
						fontSize: '2rem',
						color: 'white',
						borderTop: '1px solid #a4508b',
						paddingTop: '0.3rem',
					}}
				>
					{cancelled ? (
						<span>dubbed</span>
					) : (
						<span>{response[Math.floor(Math.random() * response.length)]}</span>
					)}
				</div>
			) : (
				<div
					style={{
						borderTop: '2px solid #a4508b',
						paddingTop: '0.3rem',
					}}
				>
					<table>
						<tr
							style={{
								fontSize: '2rem',
								color: 'white',
							}}
						>
							<th>{days}</th>
							&nbsp;
							<th>{hours}</th>
							&nbsp;
							<th>{minutes}</th>
							&nbsp;
							<th>{seconds}</th>
						</tr>
						<tr
							style={{
								fontSize: '1.3rem',
								color: 'white',
								paddingTop: '0.3rem',
							}}
						>
							<td>Days</td>
							&nbsp;
							<td>Hours</td>
							&nbsp;
							<td>Minutes</td>
							&nbsp;
							<td>Seconds</td>
						</tr>
					</table>
				</div>
			)}
		</div>
	);
}

export default MyTimer;
