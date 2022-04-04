import './App.css';
import React from 'react';
import Event from './Event';

function App() {
	const hangTime = new Date(2021, 11, 14, 20, 30, 0);
	const dikaTime = new Date(2021, 11, 17, 20, 0, 0);
	const spideyTime = new Date(2021, 11, 21, 19, 30, 0);
	const dawatTime = new Date(2021, 11, 23, 19, 0, 0);
	const halabeeTime = new Date(2021, 11, 24, 19, 0, 0);
	const harryPotterTime = new Date(2021, 11, 31, 19, 0, 0);
	return (
		<div className="container container-m">
			<div class="dark fire">
				<h1 class="Blazing" contenteditable="true">
					Welcome to Crackheadist Calendar!
				</h1>
			</div>
			{/* <h1>Welcome to Crackheadist Calendar!</h1> */}
			<span
				style={{
					fontSize: '1rem',
				}}
			>
				Dedicated to my crackys ❤️
			</span>
			<div className="second-container second-container-m">
				<h2 className="neonText">Upcoming dickenings: </h2>
				<Event
					title="Harry Potter Night!"
					date="Dec 31st at 7:00 PM"
					eventTime={harryPotterTime}
					giphySrc="https://giphy.com/embed/26BRzozg4TCBXv6QU"
				/>
				<h3>More fuck shits to come!</h3>

				<h2 className="glow">Completed dickenings: </h2>
				<Event
					title="Mango Habenoro Nuggies at Sim's"
					date="Dec 24th at 7:00 PM"
					eventTime={halabeeTime}
					giphySrc="https://giphy.com/embed/3ohs85O9hbMkZVabKg"
				/>
				<Event
					title="Dawat at Tahsin's"
					date="Dec 23rd at 7:00 PM"
					eventTime={dawatTime}
					giphySrc="https://giphy.com/embed/3oz8xB06mHyoGE7ZoQ"
				/>
				<Event
					title="Dusty SpiderCuz No Way Home"
					date="Dec 21st at 7:30 PM"
					eventTime={spideyTime}
					giphySrc="https://giphy.com/embed/lsV0mhvpsN0FEJAxLQ"
				/>
				<Event
					title="Dikaaaaa Heights PT2"
					date="Dec 17th at 8:00 PM"
					eventTime={dikaTime}
					giphySrc="https://giphy.com/embed/l1J9xs1aypJXKZxcY"
					cancelled={true}
				/>

				<Event
					title="Sugah Sugah Hookah Time"
					date="Dec 14th at 8:30 PM"
					eventTime={hangTime}
					giphySrc="https://giphy.com/embed/MbnJqxxg3ljU8KvCF5"
				/>
			</div>
		</div>
	);
}

export default App;
