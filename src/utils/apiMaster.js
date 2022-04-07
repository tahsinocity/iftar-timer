require('dotenv').config();

const axios = require('axios');
const { parseString } = require('xml2js');

export async function getTimings() {
	if (navigator.geolocation) {
		console.log('hello peepeepoopoo!');
		let location = await getCurrentLocation();
		let city =
			location.currentLocation?.city?.[0] ??
			location.currentLocation?.state?.[0];
		let country = location.currentLocation?.country[0];
		let latitude = location.lat;
		let longitude = location.lng;
		let prayerTimes = city
			? await getPrayerTimes({ city, country })
			: await getPrayerTimes({ latitude, longitude });
		return new Promise((resolve, reject) => {
			resolve({ location, prayerTimes });
		});
	}
}

export function getSunsetTime(lat, long) {
	let url = 'https://api.ipgeolocation.io/astronomy';

	return new Promise((resolve, reject) => {
		axios
			.get(
				url,
				{
					params: {
						apiKey: process.env.REACT_APP_IPGEOLOCATION,
						lat,
						long,
					},
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': 'true',
						'Access-Control-Allow-Methods': ' GET, POST, OPTIONS',
						'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
					},
				}
			)
			.then((response) => {
				let x = new Date();
				x.setDate(x.getDate() + 1);
				resolve(response.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function getPrayerTimes({ latitude, longitude, city, country }) {
	let url;
	let params = {};
	if (latitude) {
		url = `http://api.aladhan.com/v1/timings/${Math.floor(
			new Date().getTime() / 1000
		)}`;
		params.latitude = encodeURIComponent(latitude);
		params.longitude = encodeURIComponent(longitude);
	} else {
		url = `http://api.aladhan.com/v1/timingsByCity/${Math.floor(
			new Date().getTime() / 1000
		)}`;
		params.city = city;
		params.country = country;
	}

	return new Promise((resolve, reject) => {
		axios
			.get(
				url,
				{
					params: params,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': 'true',
						'Access-Control-Allow-Methods': ' GET, POST, OPTIONS',
						'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
					},
				}
			)
			.then((response) => {
				resolve(response.data.data);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function getLocation(coordinates) {
	let { lat, lng } = coordinates;
	let url1 = 'https://us1.locationiq.com/v1/reverse.php';
	//let url2 = "https://us1.locationiq.com/v1/timezone.php";

	return new Promise((resolve, reject) => {
		axios
			.get(
				url1,
				{
					params: {
						key: process.env.REACT_APP_LOCATIONIQ_API,
						lat: lat,
						lon: lng,
					},
				},
				{
					headers: {
						'Access-Control-Allow-Origin': '*',
						Accept: 'application/xml',
					},
				}
			)
			.then((res1) => {
				let result = { lat, lng };
				parseString(res1.data, (err, data) => {
					result.currentLocation = data.reversegeocode.addressparts[0];
				});
				resolve(result);
			})
			.catch((err) => {
				reject(err);
			});
	});
}

export function getUserIP() {
	return new Promise((resolve, reject) => {
		axios
			.get('https://api.ipify.org/?format=json')
			.then((response) => {
				resolve(response);
			})
			.catch((err) => reject(err));
	});
}

const getCurrentLocation = () => {
	let currentLocation = new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			return null;
		} else {
			navigator.geolocation.getCurrentPosition(async (pos) => {
				let crd = pos.coords;
				let lat = crd.latitude.toString();
				let lng = crd.longitude.toString();
				let coordinates = { lat, lng };
				let currentLocation = await getLocation(coordinates);
				return resolve(currentLocation);
			});
		}
	});

	return currentLocation;
};
