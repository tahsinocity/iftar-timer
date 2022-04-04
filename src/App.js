import './App.css';
import React, { useState, useEffect } from 'react';

import { getTimings } from './utils/apiMaster';
import { getTodaysDate } from './utils/getTodaysTimes';

import Timer from './components/Timer';
import PrayerTimesTable from './components/PrayerTimesTable';

function App() {
	const [allPrayerData, setAllPrayerData] = useState(null);
	const [currentLocation, setCurrentLocation] = useState(null);
	const [iftarTime, setIftarTime] = useState(null);

	useEffect(() => {
		const fetchTimings = async () => {
			const timings = await getTimings();
			await setAllPrayerData(timings.date);
			await setCurrentLocation(timings.location);
			await setIftarTime(
				new Date(
					timings.date.date.gregorian.replace(/-/g, '/') +
						' ' +
						timings.date.times.Sunset
				).toUTCString()
			);
		};

		fetchTimings();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				{allPrayerData && currentLocation && iftarTime ? (
					<>
						<div>
							<iframe
								title="ramadan"
								src="https://giphy.com/embed/nKA4aQgYPQKHbRA10y"
								width="500"
								height="500"
								frameBorder="0"
								className="giphy-embed"
								allowFullScreen
							></iframe>
						</div>
						<div className="prayerTime">
							<h2>{currentLocation.city}</h2>
							<h1>{getTodaysDate(allPrayerData.date.gregorian)}</h1>
						</div>
						<div>
							<Timer eventTime={Date.parse(iftarTime)} />
						</div>
						{allPrayerData ? (
							<div>
								<PrayerTimesTable prayerTimes={allPrayerData.times} />
							</div>
						) : (
							<div>
								<iframe
									title="loading times"
									src="https://giphy.com/embed/559nyYPxdHpJDlex5V"
									width="480"
									height="480"
									frameBorder="0"
									class="giphy-embed"
									allowFullScreen
								></iframe>
							</div>
						)}
					</>
				) : (
					<div className="loading">
						<div>
							<iframe
								title="loading"
								src="https://giphy.com/embed/PkMDFz6Lq7Bg1lXOGJ"
								width="800"
								height="800"
								frameBorder="0"
								className="giphy-embed"
								allowFullScreen
							></iframe>
						</div>
						<div className="prayerTime">
							<h2>Loading...</h2>
						</div>
					</div>
				)}
			</header>
		</div>
	);
}
export default App;
