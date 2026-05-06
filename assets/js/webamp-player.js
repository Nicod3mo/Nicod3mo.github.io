const toggleButton = document.getElementById('webamp-toggle');
const dock = document.getElementById('webamp-dock');

const tracks = [
	'As',
	'Gregor',
	'Samsa',
	'awoke',
	'one',
	'morning',
	'from',
	'uneasy',
	'dreams'
].map(function(title, index) {
	const trackNumber = String(index + 1).padStart(2, '0');
	return {
		url: encodeURI('incoming-assets/' + trackNumber + '. ' + title + '.mp3'),
		metaData: {
			title: title
		},
		defaultName: title
	};
});

let webamp;
let isOpen = false;
let isLoading = false;

function setButtonState(open, label) {
	toggleButton.setAttribute('aria-expanded', String(open));
	toggleButton.classList.toggle('is-active', open);

	if (label) {
		toggleButton.querySelector('.audio-launcher__text').textContent = label;
	}
}

function setDockState(open) {
	dock.classList.toggle('is-open', open);
	dock.setAttribute('aria-hidden', String(!open));
}

async function createWebamp() {
	const Webamp = (await import('https://unpkg.com/webamp@^2/butterchurn')).default;

	if (!Webamp.browserIsSupported()) {
		throw new Error('Webamp is not supported in this browser.');
	}

	webamp = new Webamp({
		initialTracks: tracks,
		initialSkin: {
			url: 'incoming-assets/Winamp3_Classified_v5.5.wsz'
		},
		enableMediaSession: true,
		windowLayout: {
			main: {
				position: { top: 0, left: 0 }
			},
			equalizer: {
				position: { top: 116, left: 0 },
				closed: true
			},
			playlist: {
				position: { top: 116, left: 0 },
				size: { extraHeight: 4, extraWidth: 4 }
			}
		},
		zIndex: 10010
	});

	webamp.onClose(function() {
		isOpen = false;
		setDockState(false);
		setButtonState(false, "Don't click me");
	});

	await webamp.renderWhenReady(dock);
}

async function openWebamp() {
	isLoading = true;
	setDockState(true);
	setButtonState(true, 'Loading');

	try {
		if (!webamp) {
			await createWebamp();
		} else {
			webamp.reopen();
		}

		isOpen = true;
		setButtonState(true, 'Close');
	} catch (error) {
		console.error(error);
		isOpen = false;
		setDockState(false);
		setButtonState(false, 'Unavailable');
	} finally {
		isLoading = false;
	}
}

function closeWebamp() {
	if (webamp) {
		webamp.close();
	} else {
		isOpen = false;
		setDockState(false);
		setButtonState(false, "Don't click me");
	}
}

toggleButton.addEventListener('click', function() {
	if (isLoading) {
		return;
	}

	if (isOpen) {
		closeWebamp();
	} else {
		openWebamp();
	}
});

setDockState(false);
