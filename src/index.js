import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GA4React from 'ga-4-react';

ReactDOM.render(<App />, document.getElementById('root'));

try {
	setTimeout(() => {
		const ga4react = new GA4React('G-326FP34G9D');
		ga4react.initialize().catch((err) => console.error(err));
	}, 4000);
} catch (err) {
	console.error(err);
}
