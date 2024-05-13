let pomodoroTime = document.getElementById('pomodoro-timer-display');
let shortBreakTime = document.getElementById('short-break-display');
let longBreakTime = document.getElementById('long-break-display');
let playButton = document.getElementById('pomodoro-timer-start');
let pauseButton = document.getElementById('pomodoro-timer-pause');
let restartButton = document.getElementById('pomodoro-timer-reset');
let pomodoroButton = document.getElementById('pomodoro-timer-mode');
let pomodoroButtonImg = document.getElementById('pomodoro-timer-mode-img');
let shortBreakButton = document.getElementById('short-break-mode');
let shortBreakButtonImg = document.getElementById('short-break-mode-img');
let longBreakButton = document.getElementById('long-break-mode');
let longBreakButtonImg = document.getElementById('long-break-mode-img');

let pomodoroMode = false;
let shortBreakMode = false;
let longBreakMode = false;

window.addEventListener('load', function() {
    pomodoroMode = true;
    shortBreakMode = false;
    longBreakMode = false;

    clearInterval(timer);
    updateTimerDisplay();
    
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';

    pomodoroButton.style.background = '#f2caca';
    pomodoroButton.style.boxShadow = '0px 0px 8px #f2caca';
    pomodoroButtonImg.style.color = '#bd4e4e';
    
    console.log('pomodoro mode activated');
});

pomodoroButton.addEventListener('click', function() {
    pomodoroMode = true;
    shortBreakMode = false;
    longBreakMode = false;

    clearInterval(timer);
    updateTimerDisplay();
    
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';

    pomodoroButton.style.background = '#f2caca';
    pomodoroButton.style.boxShadow = '0px 0px 8px #f2caca';
    pomodoroButtonImg.style.color = '#bd4e4e';

    shortBreakButton.style.background = '#91b98e';
    shortBreakButton.style.boxShadow = 'none';
    shortBreakButtonImg.style.color = '#445b42';

    longBreakButton.style.background = '#91b98e';
    longBreakButton.style.boxShadow = 'none';
    longBreakButtonImg.style.color = '#445b42';

    console.log('pomodoro mode activated');
});

shortBreakButton.addEventListener('click', function() {
    shortBreakMode = true;
    pomodoroMode = false;
    longBreakMode = false;

    clearInterval(timer);
    updateTimerDisplay();
    
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';

    shortBreakButton.style.background = '#f2caca';
    shortBreakButton.style.boxShadow = '0px 0px 8px #f2caca';
    shortBreakButtonImg.style.color = '#bd4e4e';

    pomodoroButton.style.background = '#91b98e';
    pomodoroButton.style.boxShadow = 'none';
    pomodoroButtonImg.style.color = '#445b42';

    longBreakButton.style.background = '#91b98e';
    longBreakButton.style.boxShadow = 'none';
    longBreakButtonImg.style.color = '#445b42';

    console.log('short break mode activated');
});

longBreakButton.addEventListener('click', function() {
    longBreakMode = true;
    pomodoroMode = false;
    shortBreakMode = false;

    clearInterval(timer);
    updateTimerDisplay();
    
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';

    longBreakButton.style.background = '#f2caca';
    longBreakButton.style.boxShadow = '0px 0px 8px #f2caca';
    longBreakButtonImg.style.color = '#bd4e4e';

    pomodoroButton.style.background = '#91b98e';
    pomodoroButton.style.boxShadow = 'none';
    pomodoroButtonImg.style.color = '#445b42';

    shortBreakButton.style.background = '#91b98e';
    shortBreakButton.style.boxShadow = 'none';
    shortBreakButtonImg.style.color = '#445b42';

    console.log('long break mode activated');
});

function updateTimerDisplay() {
    if (pomodoroMode) {
        pomodoroTime.innerHTML = "25:00";
        minutes = pomodoroTimer.getMinutes();
        seconds = pomodoroTimer.getSeconds();
    } else if (shortBreakMode) {
        pomodoroTime.innerHTML = "05:00";
        minutes = shortBreakTimer.getMinutes();
        seconds = shortBreakTimer.getSeconds();
    } else if (longBreakMode) {
        pomodoroTime.innerHTML = "15:00";
        minutes = longBreakTimer.getMinutes();
        seconds = longBreakTimer.getSeconds();
    }
}

class Timer {
    constructor(minutes, seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
    }

    getMinutes() {
        return this.minutes;
    }

    getSeconds() {
        return this.seconds;
    }

    setMinutes(minutes) {
        this.minutes = minutes;
    }

    setSeconds(seconds) {
        this.seconds = seconds;
    }
}

let pomodoroTimer = new Timer(24, 60);
let shortBreakTimer = new Timer(4, 60);
let longBreakTimer = new Timer(14, 60);

playButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
restartButton.addEventListener('click', resetTimer);

let timer = null;

function timerCountdown() {
    this.seconds--;

    let m = this.minutes < 10 ? "0" + this.minutes : this.minutes;
    let s = this.seconds < 10 ? "0" + this.seconds : this.seconds;

    pomodoroTime.innerHTML = `${m}:${s}`;

    if (this.minutes === 0 && this.seconds === 0) {
        clearInterval(timer);
        pomodoroTime.innerHTML = "00:00";
        pauseButton.style.display = 'none';
    } else if (this.seconds === 0) {
        this.seconds = 60;
        this.minutes--;
    }
}

function timerCountdownStart(timerObj) {
    if (timer !== null) {
        clearInterval(timer);
    } 
    timer = setInterval(timerCountdown.bind(timerObj), 1000);
}

function timerCountdownPause() {
    clearInterval(timer);
}

function timerCountdownReset() {
    // pomodoroTime.innerHTML = "25:00";
    // pomodoroTimer.minutes = 24;
    // pomodoroTimer.seconds = 60;
    // clearInterval(timer);

    if (pomodoroMode) {
        pomodoroTime.innerHTML = "25:00";
        pomodoroTimer.minutes = 24;
        pomodoroTimer.seconds = 60;
        clearInterval(timer);
    } else if (shortBreakMode) {
        pomodoroTime.innerHTML = "05:00";
        shortBreakTimer.minutes = 4;
        shortBreakTimer.seconds = 60;
        clearInterval(timer);
    } else if (longBreakMode) {
        pomodoroTime.innerHTML = "15:00";
        longBreakTimer.minutes = 14;
        longBreakTimer.seconds = 60;
        clearInterval(timer);
    }
}

function startTimer() {
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';

    if (pomodoroMode) {
        timerCountdownStart(pomodoroTimer);
    } else if (shortBreakMode) {
        timerCountdownStart(shortBreakTimer);
    } else if (longBreakMode) {
        timerCountdownStart(longBreakTimer);
    }
}

function pauseTimer() {
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';

    timerCountdownPause();
}

function resetTimer() {
    playButton.style.display = 'flex';
    pauseButton.style.display = 'none';

    timerCountdownReset();
}

