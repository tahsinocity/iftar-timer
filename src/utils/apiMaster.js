require('dotenv').config();
const axios = require('axios');
const { parseString } = require('xml2js');

export async function getTimings() {
	let { data } = await getUserIP();
	let url = 'https://api.pray.zone/v2/times/today.json';
	if (!data) {
		let location = await getCurrentLocation();
		return new Promise(async (resolve, reject) => {
			axios
				.get(
					url,
					{
						params: {
							city: location.suburb,
							timeformat: 1,
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
				.then(async (response) => {
					resolve({
						date: response.data.results.datetime[0],
						location: await location,
					});
				});
		});
	} else {
		return new Promise(async (resolve, reject) => {
			axios
				.get(
					url,
					{
						params: {
							ip: data.ip,
							timeformat: 1,
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
				.then(async (response) => {
					resolve({
						date: response.data.results.datetime[0],
						location: response.data.results.location,
					});
				});
		});
	}
}

const getUserIP = () => {
	return new Promise((resolve, reject) => {
		axios
			.get('https://api.ipify.org/?format=json')
			.then((response) => {
				resolve(response);
			})
			.catch((err) => resolve(err));
	});
};

const getLocation = (coordinates) => {
	let { lat, lng } = coordinates;
	let url = 'https://us1.locationiq.com/v1/reverse.php';

	return new Promise((resolve, reject) => {
		axios
			.get(
				url,
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
			.then((response) => {
				parseString(response.data, (err, data) => {
					let result = data.reversegeocode.addressparts[0];
					let res = {
						city: result.city[0],
						city_district: result.city_district[0],
						country_code: result.country_code[0],
						house_number: result.house_number[0],
						neighbourhood: result.neighbourhood[0],
						postcode: result.postcode[0],
						road: result.road[0],
						state: result.state[0],
						suburb: result.suburb[0],
					};
					resolve(res);
				});
			})
			.catch((err) => resolve(err));
	});
};

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
