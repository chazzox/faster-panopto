import React from 'react';
import ReactDOM from 'react-dom';
import browser from 'webextension-polyfill';
import styled, { createGlobalStyle, css } from 'styled-components';

const Global = createGlobalStyle`
	* {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
		color: white;
	}

	body {
		margin: 0;
		background: linear-gradient(
			45deg,
			rgb(13, 25, 51) 40%,
			rgb(10, 16, 21)
		);
		min-height: 120px;
		min-width: 180px;
		border: 3px solid white;
		border-radius: 5px;
	}
`;

const Wrapper = styled.div`
	border-radius: 18px;
	padding: 5px;
`;

const ContentWrapper = styled.div`
	background: black;
	padding: 6px;
	border-radius: 18px;
	border: 2px solid rgb(65, 67, 78);
`;

const Footer = styled.div`
	margin: 5px 0;
	display: flex;
	justify-content: space-evenly;
`;

const Title = styled.h1`
	margin: 5px 25px;
	white-space: nowrap;
	text-align: center;
	font-size: 20px;
	font-weight: 700;
`;

const SpeedContainer = styled.div`
	background: rgb(0, 4, 8);
	border-radius: 9px;
	height: 80px;
	max-height: 80px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

const InputWrapper = styled.div`
	display: flex;
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Button = styled.button`
	font-size: 13px;
	border: none;
	border-radius: 100px;
	color: rgba(255, 255, 255, 0.9);
	background: rgba(98, 103, 111, 0.5);
	margin: 0px 5px;
	padding: 5px 8px;
	transition: background-color 0.25s ease;
	&:hover {
		background: rgba(98, 103, 111, 1);
		color: white;
	}
`;

const Input = styled.input`
	/* hide standard toggles */
	-moz-appearance: textfield;
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	background: #282c2f;
	border: none;
	display: inline-block;
	width: 100%;
	color: white;
	padding: 8px 12px;
	height: 50px;
	max-height: 50px;
	box-sizing: border-box;
	text-align: center;
	font-size: 15px;
	&:focus {
		outline: none;
	}
`;

const Link = styled(Button)`
	text-decoration: none;
`;

const InputButton = css`
	flex: 1;
	outline: none;
	background: none;
	border: none;
	width: 25px;
	height: 25px;
	background: rgb(70, 74, 77, 0.85);
	background-repeat: no-repeat;
	background-size: 9px;
	background-position: center;
	cursor: pointer;
	&:hover {
		background-color: rgb(100, 104, 107) !important;
	}
`;

const Up = styled.button`
	${InputButton};
	transform: rotate(180deg);
	background-image: url('/images/arrow.png');
`;

const Down = styled.button`
	${InputButton};
	background-image: url('/images/arrow.png');
`;

const Apply = styled.button`
	width: 100%;
	border: none;
	height: 100%;
	background: rgb(70, 74, 77);
	text-align: center;
	cursor: pointer;
	&:hover {
		background-color: rgb(100, 104, 107) !important;
	}
`;

const App = () => {
	const [speed, setSpeed] = React.useState('1');
	const [enabled, setEnabled] = React.useState(true);
	const inputRef = React.useRef(null);

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

	const updateInput = (value) => {
		browser.storage.local.set({
			speed: value
		});
		setSpeed(value);
	};

	return (
		<Wrapper>
			<Global />
			<Title>Faster-Panopto</Title>
			<ContentWrapper>
				{enabled ? (
					<SpeedContainer>
						<InputWrapper>
							<Input
								type="number"
								min="0"
								step="0.1"
								ref={inputRef}
								onChange={(e) => updateInput(e.target.value)}
								value={speed}
							/>
							<ButtonWrapper>
								<Up
									onClick={() =>
										updateInput(
											(parseFloat(speed) + 0.1).toFixed(1)
										)
									}
								/>
								<Down
									onClick={() =>
										updateInput(
											(parseFloat(speed) - 0.1).toFixed(1)
										)
									}
								/>
							</ButtonWrapper>
						</InputWrapper>

						<Apply onClick={setVideoSpeed}>Apply Speed</Apply>
					</SpeedContainer>
				) : (
					<Title>Not available on this page!</Title>
				)}
			</ContentWrapper>

			<Footer>
				<Github />
				<Twitter />
			</Footer>
		</Wrapper>
	);
};

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

ReactDOM.render(<App />, document.getElementById('app'));
