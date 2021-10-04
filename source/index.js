import ReactDOM from 'react-dom';
import React from 'react';
import browser from 'webextension-polyfill';
import styled, { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
	* {
		font-family: 'Fira Code', monospace;
	}
	body {
		margin: 0;
	}
`;

const Row = styled.div``;

const Title = styled.h1`
	margin: 0px 25px;
	white-space: nowrap;
`;

const Footer = styled.div``;

const Button = styled.button`
	display: inline-block;
`;

const Input = styled.input`
	display: inline-block;
`;

function App() {
	const [speed, setSpeed] = React.useState(1);

	const setVideoSpeed = () => {
		browser.tabs
			.query({ active: true, currentWindow: true })
			.then((tabs) => {
				console.log(tabs);
				// browser.tabs.executeScript(tabs[0].id, { code: 'document.getElementById("playButton").click()' });
				browser.tabs.executeScript(tabs[0].id, {
					code: `document.getElementsByTagName("video")[0].playbackRate = ${speed}`
				});
				browser.tabs.executeScript(tabs[0].id, {
					code: `document.getElementsByTagName("video")[1].playbackRate = ${speed}`
				});
				browser.tabs.executeScript(tabs[0].id, {
					code: `document.getElementById('playSpeedMultiplier').innerText = ${speed}+'x'`
				});
				// browser.tabs.executeScript(tabs[0].id, { code: 'document.getElementById("playButton").click()' });
			});
	};

	return (
		<>
			<Global />
			<Title>faster-panopto</Title>
			<Row>
				<Input
					step="0.1"
					type="number"
					onChange={(e) => setSpeed(e.target.value)}
					value={speed}
				/>
				<Button onClick={setVideoSpeed}>Set Speed</Button>
			</Row>
			<Row>
				download <Button>save as</Button>
			</Row>
			<Footer>links</Footer>
		</>
	);
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
