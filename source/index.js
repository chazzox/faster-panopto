import React from 'react';
import ReactDOM from 'react-dom';
import browser from 'webextension-polyfill';

const App = () => {
	const [speed, setSpeed] = React.useState('1');
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

	const updateInput = (value) => {
		browser.storage.local.set({
			speed: value
		});
		setSpeed(value);
	};

	return (
		<>
			<h1>Faster-Panopto</h1>
			<div>
				{enabled ? (
					<div class="container">
						<div class="speed">
							<div id="input">
								<input
									type="number"
									min="0"
									step="0.1"
									onChange={(e) =>
										updateInput(e.target.value)
									}
									value={speed}
								/>
								<div id="buttons">
									<button
										onClick={() =>
											updateInput(
												(
													parseFloat(speed) + 0.1
												).toFixed(1)
											)
										}
									/>
									<button
										onClick={() =>
											updateInput(
												(
													parseFloat(speed) - 0.1
												).toFixed(1)
											)
										}
									/>
								</div>
							</div>
							<button id="apply" onClick={setVideoSpeed}>
								Apply Speed
							</button>
						</div>
					</div>
				) : (
					<div class="container">
						<h2>Not available on this page!</h2>
					</div>
				)}
			</div>

			<div id="links">
				<a
					class="socials"
					target="_blank"
					href="https://github.com/chazzox/"
				>
					Github
				</a>
				<a
					class="socials"
					target="_blank"
					href="https://twitter.com/_chazzox_"
				>
					Twitter
				</a>
			</div>
		</>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
