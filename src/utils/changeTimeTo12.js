export function changeTimeTo12(time) {
	let times = time.split(':');
	let hour = ((parseInt(times[0]) + 11) % 12) + 1;
	let min = times[1];
	return `0${hour}:${min}`;
}
