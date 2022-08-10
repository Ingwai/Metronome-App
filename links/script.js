// import Timer from './timer.js';

const circle = document.querySelectorAll('.circle');
const tempoDisplay = document.querySelector('.tempo');
const tempoText = document.querySelector('.tempo-text');
const decreaseTempoBtn = document.querySelector('.decrease-tempo');
const increaseTempoBtn = document.querySelector('.increase-tempo');
const tempoSlider = document.querySelector('.slider');
const startStopBtn = document.querySelector('.start-stop');
const subtractBeats = document.querySelector('.subtract-beats');
const addBeats = document.querySelector('.add-beats');
const measureCount = document.querySelector('.measure-count');

const click1 = new Audio('./links/click1.mp3');
const click2 = new Audio('./links/click2.mp3');

for (let i = 0; i < 4; i++) {
	circle[i].style.display = 'block';
}

let bpm = 120;
tempoDisplay.textContent = bpm;
let beatsPerMeasure = 4;
let circleAdd = 0;
let count = 0;
let isRunning = false;
let tempoTextString = 'ALLEGRO';
tempoText.textContent = tempoTextString;

decreaseTempoBtn.addEventListener('click', () => {
	if (bpm <= 1) {
		return;
	}
	bpm--;
	updateMetronome();
});

increaseTempoBtn.addEventListener('click', () => {
	if (bpm >= 240) {
		return;
	}
	bpm++;
	updateMetronome();
});

tempoSlider.addEventListener('input', () => {
	bpm = tempoSlider.value;
	updateMetronome();
});

subtractBeats.addEventListener('click', () => {
	if (beatsPerMeasure <= 2) {
		return;
	}
	beatsPerMeasure--;
	measureCount.textContent = beatsPerMeasure;
	count = 0;
	minusCircle();
});

addBeats.addEventListener('click', () => {
	if (beatsPerMeasure >= 12) {
		return;
	}
	beatsPerMeasure++;
	measureCount.textContent = beatsPerMeasure;
	count = 0;
	plusCircle();
});

startStopBtn.addEventListener('click', () => {
	count = 0;
	if (!isRunning) {
		metronome.start();
		isRunning = true;
		startStopBtn.classList.add('active');
		startStopBtn.textContent = 'STOP';
	} else {
		metronome.stop();
		isRunning = false;
		startStopBtn.classList.remove('active');
		startStopBtn.textContent = 'START';
	}
});

function updateMetronome() {
	tempoDisplay.textContent = bpm;
	tempoSlider.value = bpm;
	metronome.timeInterval = 60000 / bpm;

	if (bpm <= 24) tempoTextString = 'Larghissimo';
	if (bpm > 24 && bpm < 35) tempoTextString = 'Adagissimo';
	if (bpm > 35 && bpm < 39) tempoTextString = 'Grave';
	if (bpm > 39 && bpm < 49) tempoTextString = 'Largo';
	if (bpm > 49 && bpm < 59) tempoTextString = 'Lento';
	if (bpm > 59 && bpm < 67) tempoTextString = 'Larghetto';
	if (bpm > 67 && bpm < 76) tempoTextString = 'Adagio';
	if (bpm > 76 && bpm < 99) tempoTextString = 'Andante';
	if (bpm > 99 && bpm < 107) tempoTextString = 'Andantino';
	if (bpm > 107 && bpm < 112) tempoTextString = 'Moderato';
	if (bpm > 112 && bpm < 119) tempoTextString = 'Allegretto';
	if (bpm > 119 && bpm < 129) tempoTextString = 'Allegro';
	if (bpm > 129 && bpm < 156) tempoTextString = 'Molto Allegro';
	if (bpm > 156 && bpm < 169) tempoTextString = 'Vivace';
	if (bpm > 169 && bpm < 176) tempoTextString = 'Vivacissimo';
	if (bpm > 176 && bpm < 200) tempoTextString = 'Presto';
	if (bpm > 200 && bpm < 219) tempoTextString = 'Prestissimo';

	tempoText.textContent = tempoTextString;
}

function plusCircle() {
	for (let i = 0; i < beatsPerMeasure; i++) {
		circle[i].style.display = 'block';
	}
}

function minusCircle() {
	for (let i = beatsPerMeasure; i >= 1; i++) {
		circle[i].style.display = 'none';
	}
}

function playClick() {
	if (count === beatsPerMeasure) {
		//jeśli wybierzemy takt na 4 to resetujemy licznik do 0;
		count = 0;
	}
	if (count === 0) {
		circle[0].classList.add('green');
		circle[0].style.transform = 'scale(1.2, 1.2)';
		circle[count + beatsPerMeasure - 1].classList.remove('red'); // gdy grana jest kropla zielona to zdejmujemy kolor czerwony z kropki ostatniej (czwartej) count = 0, beatsPerMeasure = 4 i odejmujemy 1 żeby było 3 bo talica idzie od 0 do 3.
		circle[count + beatsPerMeasure - 1].style.transform = '';
		//gdy na liczniku jest 0 to przypisujemy clik1.play
		click1.play();
		click1.currentTime = 0;
	} else {
		// dalej idzie odliczanie na 1, 2 i 3 przypisujemy click2.play
		circle[0].classList.remove('green');
		circle[0].style.transform = '';
		circle[count].style.transform = 'scale(1.2, 1.2)';
		circle[count].classList.add('red'); //dodajemy do aktualnej kropki kolor czerwony
		circle[count - 1].classList.remove('red'); //a zdejmujemy z kropki poprzedniej kolor czerwony
		circle[count - 1].style.transform = '';
		click2.play();
		click2.currentTime = 0;
	}
	count++; //licznik zwiększa się o 1
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true });
