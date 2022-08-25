'use strict'

const button = document.querySelector('.button');
const audioElement = document.querySelector('.audio');
const jokeText = document.querySelector('.jokeText');
// VoiceRSS Javascript SDK


function tellMe(joke) {
	VoiceRSS.speech({
		key: '9690c2936ffd4b12900184ad6b2de748',
		src: joke,
		hl: 'en-us',
		v: 'Linda',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false
	});
	jokeText.hidden = false;
	jokeText.textContent = joke;
};

async function getJokes() {
	let joke = '';
	const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,racist';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		toggleButton();
		tellMe(joke);
	} catch (error) {
		console.log(error);
	}
};

function toggleButton() {
	button.disabled = !button.disabled;
};

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);