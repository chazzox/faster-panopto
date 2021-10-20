import React from 'react';
import ReactDOM from 'react-dom';
import browser from 'webextension-polyfill';
import styled, { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle``;
const Button = styled.button``;
const Input = styled.input``;
const Footer = styled.div``;
const Link = styled(Button)``;
const Up = styled.button``;
const Down = styled.button``;
const Apply = styled.button``;

function App() {
	const [speed, setSpeed] = React.useState(1.0);
	const [enabled, setEnabled] = React.useState(true);
	const inputEl = React.useRef(null);

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
			<h1>Faster-Panopto</h1>

			{enabled ? (
				<div>
					<div>
						<Input
							type="number"
							ref={inputEl}
							min="0"
							step="0.1"
							onChange={(e) => {
								browser.storage.local.set({
									speed: parseInt(e.target.value)
								});
								setSpeed(parseInt(e.target.value));
							}}
							value={speed}
						/>
						<div>
							<Up onClick={() => inputEl.current.stepUp()} />
							<Down onClick={() => inputEl.current.stepDown()} />
						</div>
					</div>
					<Apply onClick={setVideoSpeed}>Apply Speed</Apply>
				</div>
			) : (
				<div>
					<h1>Not available on this page!</h1>
				</div>
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

ReactDOM.render(<App />, document.getElementById('app'));
