import React from 'react';
import ReactDOM from 'react-dom';
import browser from 'webextension-polyfill';
import copy from 'copy-to-clipboard';

const App = () => {
	const [speed, setSpeed] = React.useState('1');
	const [enabled, setEnabled] = React.useState(true);
	const [urls, setUrl] = React.useState([]);

	const storageChanged = (e) => {
		if (e?.urls)
			setUrl((prevState) => [
				...new Set([...e.urls.newValue, ...prevState])
			]);
	};

	React.useEffect(() => {
		browser.storage.local
			.get(['active', 'speed', 'urls'])
			.then((extensionStorage) => {
				setSpeed(extensionStorage.speed);
				setEnabled(extensionStorage.active);
				setUrl(extensionStorage.urls);
			});

		browser.storage.onChanged.addListener(storageChanged);

		return () => {
			browser.storage.onChanged.removeListener(storageChanged);
		};
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

	const cleanFileName = (url) => {
		return url.split('/').splice(-1);
	};

	return (
		<>
			<h1>Faster-Panopto</h1>
			<div>
				{enabled ? (
					<div className="container">
						<div className="speed">
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
					<div className="container">
						<h2>Not available on this page!</h2>
					</div>
				)}
			</div>
			<h3>Recent files</h3>
			<div class="files">
				{urls.map((url, index) => (
					<button
						className="file"
						key={index}
						onClick={() =>
							copy(
								`ffmpeg -i "${url}" -bsf:a aac_adtstoasc -vcodec copy -c copy -crf 50 faster-panopto-${new Date().getTime()}.mp4`
							)
						}
					>
						{cleanFileName(url)}
					</button>
				))}
				{urls.length == 0 && <h3>None</h3>}
			</div>
			<div id="links">
				<a
					className="socials"
					target="_blank"
					href="https://github.com/chazzox/"
				>
					Github
				</a>
				<a
					className="socials"
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
