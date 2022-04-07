export default function getUnixTime(date, time) {
	let ddmmyyyydate = date.split('/');
	let mmddyyyydate =
		ddmmyyyydate[1] +
		'/' +
		ddmmyyyydate[0] +
		'/' +
		ddmmyyyydate[2] +
		' ' +
		time;
	return new Date(mmddyyyydate).toUTCString();
}
