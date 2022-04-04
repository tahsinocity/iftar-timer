export function getTodaysDate(time) {
	return new Date(time).toUTCString().slice(0, 16);
}
