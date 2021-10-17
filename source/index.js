import ReactDOM from 'react-dom';
import React from 'react';
import browser from 'webextension-polyfill';
import styled, { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
	* {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;

		color: white;
	}
	body {
		margin: 0;
		background-color: #2c2c2c;
		padding: 5px;
	}
	span,
	button,
	a {
		font-weight: 500;
	}
`;

const Title = styled.h1`
	margin: 0px 25px;
	white-space: nowrap;
	text-align: center;
	font-size: 15px;
`;

const Row = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 10px 0px;
`;

const Button = styled.button`
	font-size: 13px;
	white-space: nowrap;
	margin: 0px 5px;
	padding: 4px;
	color: black;
	background: white;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color ease 0.2s;
	transition: color ease 0.2s;
	&:hover {
		background-color: #2f884a;
		color: white;
	}
`;

const Input = styled.input`
	display: inline-block;
	width: 100px;
	margin: 0px 10px;
	color: black;
	&:focus {
		outline: none;
	}
`;

const Footer = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

const Link = styled(Button)`
	text-decoration: none;
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
				</>
			) : (
				<Title>Disabled</Title>
			)}
			<Footer>
				<Github />
				<Twitter />
			</Footer>
		</>
	);
}

const Github = () => (
	<Link as="a" target="_blank" href="https://github.com/chazzox/">
		github
	</Link>
);

const Twitter = () => (
	<Link as="a" target="_blank" href="https://twitter.com/_chazzox_">
		twitter
	</Link>
);

const app = document.getElementById('app');

ReactDOM.render(<App />, app);
