import React from 'react';

const PrayerTimesTable = (prayerTimes) => {
	const { Fajr, Dhuhr, Asr, Sunset, Isha } = prayerTimes.prayerTimes;
	return (
		<div>
			<table>
				<tbody>
					<tr>
						<th>Prayer</th>
						<th>Times</th>
					</tr>
					<tr>
						<td>Fajr</td>
						<td>{Fajr}</td>
					</tr>
					<tr>
						<td>Dhuhr</td>
						<td>{Dhuhr}</td>
					</tr>
					<tr>
						<td>Asr</td>
						<td>{Asr}</td>
					</tr>
					<tr>
						<td>Maghrib</td>
						<td>{Sunset}</td>
					</tr>
					<tr>
						<td>Isha</td>
						<td>{Isha}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default PrayerTimesTable;
