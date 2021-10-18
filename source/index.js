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
		min-height: 120px;
		min-width: 180px;
		margin: 0;
		background: linear-gradient(45deg, rgb(13, 25, 51) 40%, rgb(10, 16, 21));
		padding: 5px;
	}
	span,
	button,
	a {
		font-weight: 500;
	}

	/* Hide + and - buttons on input */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
	}
	input[type=number] {
	-moz-appearance: textfield;
	}

	#errorContainer {
		background: #282c2f;
		border: none;
		padding-right: 12px;
		padding-left: 2px;
		padding-top: 2px;
		padding-bottom: 2px;
		margin-left: 8px;
		margin-right: 8px;
		border-radius: 9px;

		h1 {
			font-weight: 600;
			width: 100%;
			box-sizing: border-box;
			margin: 0;
			margin-top: 12px;
			margin-bottom: 12px;
			padding: 8px;
			border-left-style: solid;
			border-width: 4px;
			border-color: #de105c;
		}
	}
	#wrapper {
		width: 100%;
		border-style: solid;
		border-width: 2px;
		border-color: rgb(65, 67, 78);
		background-color: rgb(0, 4, 8);
		padding: 6px;
		border-radius: 18px;

		#speedContainer {
			background: rgb(0, 4, 8);
			border-radius: 9px;
			height: 80px;
			max-height: 80px;
			overflow: hidden;
			position: relative;
			padding-right: 30px;

			button {
				position: absolute;
				right: 0;
				margin: 0;
				display: inline-block;
				background-color: rgb(70, 74, 77);
				outline: none;
				border: none;
				height: 25px;
				width: 30px;
				background-repeat: no-repeat;
				background-size: 9px;
				background-position: center;

				&#applySpeed {
					bottom: 0;
					left: 0;
					width: 100%;
					height: 30px;
					max-height: 30px;
					line-height: 30px;
					padding: 0;
					border-radius: 0;
					background-color: rgba(70, 74, 77, 0.85);
				}

				&#upArrow {
					top: 0;
					background-image: url("/images/up.png")
				}
				&#downArrow {
					bottom: 30px;
					background-image: url("/images/down.png")
				}

				&:hover {
					background-color: rgb(100, 104, 107) !important;
				}
			}
		}
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
	text-transform: capitalize;
	font-size: 13px;
	white-space: nowrap;
	margin: 0px 5px;
	padding-top: 6px;
	padding-bottom: 6px;
	padding-left: 12px;
	padding-right: 12px;
	color: rgba(255, 255, 255, 0.9);
	background: rgba(98, 103, 111, 0.5);
	border: none;
	border-radius: 100px;
	cursor: pointer;
	transition: background-color 0.25s ease;
	&:hover {
		background: rgba(98, 103, 111, 1);
		color: white;
	}
`;

const Input = styled.input`
	background: #282c2f;
	border: none;
	display: inline-block;
	width: 100%;
	color: white;
	padding-top: 8px;
	padding-bottom: 8px;
	padding-left: 24px;
	padding-right: 12px;
	height: 50px;
	max-height: 50px;
	box-sizing: border-box;
	&:focus {
		outline: none;
	}
`;

const Footer = styled.div`
	display: flex;
	justify-content: space-evenly;
	margin-top: 8px;
	margin-bottom: 2px;
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
			<Row>
				<div id="wrapper">
					{enabled ? (
						<>
							<div id="speedContainer">
								<Input
									step="0.1"
									type="number"
									onChange={(e) => {
										browser.storage.local.set({
											speed: e.target.value
										});
										setSpeed(parseInt(e.target.value));
									}}
									value={speed}
								/>
								<button
									id="upArrow"
									onClick={() => setSpeed(speed + 0.1)}
								></button>
								<button
									id="downArrow"
									onClick={() => setSpeed(speed - 0.1)}
								></button>
								<Button id="applySpeed" onClick={setVideoSpeed}>
									Apply Speed
								</Button>
							</div>
						</>
					) : (
						<div id="errorContainer">
							<Title>Not available on this page!</Title>
						</div>
					)}
					<Footer>
						<Github />
						<Twitter />
					</Footer>
				</div>
			</Row>
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
