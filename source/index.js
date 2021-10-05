import ReactDOM from 'react-dom';
import React from 'react';
import browser, { storage } from 'webextension-polyfill';
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
	const [enabled, setEnabled] = React.useState(true);

	React.useEffect(() => {
		browser.storage.local
			.get(['active', 'speed'])
			.then((extensionStorage) => {
				setSpeed(extensionStorage.speed);
				setEnabled(extensionStorage.active);
			});
	}, []);

	const setVideoSpeed = () => {
		browser.tabs
			.query({ active: true, currentWindow: true })
			.then((tabs) => {
				browser.tabs.executeScript(tabs[0].id, {
					code: `document.getElementsByTagName("video")[0].playbackRate = ${speed}`
				});
				browser.tabs.executeScript(tabs[0].id, {
					code: `document.getElementsByTagName("video")[1].playbackRate = ${speed}`
				});
				browser.tabs.executeScript(tabs[0].id, {
					code: `document.getElementById('playSpeedMultiplier').innerText = ${speed}+'x'`
				});
			});
	};

	return (
		<>
			<Global />
			<Title>faster-panopto</Title>
			{enabled ? (
				<>
					<Row>
						<Input
							step="0.1"
							type="number"
							onChange={(e) => {
								browser.storage.local.set({
									speed: e.target.value
								});
								setSpeed(e.target.value);
							}}
							value={speed}
						/>
						<Button onClick={setVideoSpeed}>Set Speed</Button>
					</Row>
					<Row>
						download <Button>save as</Button>
					</Row>
				</>
			) : (
				<>disabled</>
			)}
			<Footer>links</Footer>
		</>
	);
}

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
