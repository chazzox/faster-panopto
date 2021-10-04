import ReactDOM from 'react-dom';
import browser from 'webextension-polyfill';
import styled, { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
	html,body {
		margin:0;
		padding:0;
	}
`;

const Row = styled.div``;

const Title = styled.h1``;

const Footer = styled.div``;

const Button = styled.button``;

const Input = styled.input``;

function setSpeed() {
	console.log('test');

	var fieldVal = playerSpeedField.value;

	browser.storage.local.set({ speed: fieldVal }, function () {});

	// Gets the tab context to execute scripts in.
	browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		browser.tabs.executeScript(tabs[0].id, { code: 'document.getElementById("playButton").click()' });
		browser.tabs.executeScript(tabs[0].id, {
			code: 'document.getElementsByTagName("video")[0].playbackRate = ' + fieldVal
		});
		browser.tabs.executeScript(tabs[0].id, {
			code: 'document.getElementsByTagName("video")[1].playbackRate = ' + fieldVal
		});
		browser.tabs.executeScript(tabs[0].id, { code: 'document.getElementById("playButton").click()' });
	});
}

function App() {
	return (
		<>
			<Global />
			<Title>faster-panopto</Title>
			<Row>
				<Input type="number" />
				<Button>Set Speed</Button>
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
