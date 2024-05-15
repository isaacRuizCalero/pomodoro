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

let alarmSound = document.getElementById('alarmSound');

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
        playButton.style.display = 'flex';

        alarmSound.play();

        if (pomodoroMode) {
            pomodoroMode = false;
            shortBreakMode = true;

            pauseButton.style.display = 'flex';
            shortBreakButton.style.background = '#f2caca';
            shortBreakButton.style.boxShadow = '0px 0px 8px #f2caca';
            shortBreakButtonImg.style.color = '#bd4e4e';

            pomodoroButton.style.background = '#91b98e';
            pomodoroButton.style.boxShadow = 'none';
            pomodoroButtonImg.style.color = '#445b42';

            updateTimerDisplay();
            timerCountdownStart(shortBreakTimer);

            alarmSound.play();
        }
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
        pomodoroTime.innerHTML = "25:00";
        pomodoroTimer.minutes = 24;
        pomodoroTimer.seconds = 60;
        timerCountdownStart(pomodoroTimer);
    } else if (shortBreakMode) {
        pomodoroTime.innerHTML = "05:00";
        shortBreakTimer.minutes = 4;
        shortBreakTimer.seconds = 60;
        timerCountdownStart(shortBreakTimer);
    } else if (longBreakMode) {
        pomodoroTime.innerHTML = "15:00";
        longBreakTimer.minutes = 14;
        longBreakTimer.seconds = 60;
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


// FUNCTIONS FOR KANBAN BOARD
let pendingTasksBody = document.getElementById('pending-tasks-body');
let inProgressTasksBody = document.getElementById('in-progress-tasks-body');
let completedTasksBody = document.getElementById('completed-tasks-body');
let addTaskButton = document.getElementById('add-task-button');

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    const parentElement = ev.target.parentElement;
    if (parentElement.id === 'completed-tasks-body') {
        return false; 
    }

    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    const draggedTask = document.getElementById(data);
    const targetContainer = ev.target.parentElement;
  
    ev.target.appendChild(draggedTask);


    const newTaskStatus = targetContainer.id.split('-')[0]; 

    if (newTaskStatus === 'completed') {
        draggedTask.querySelector('.task-card-status').textContent = newTaskStatus;
    } else {
        draggedTask.querySelector('.task-card-status').textContent = '';
    }
    

    // if (newTaskStatus === 'pending') {
    //     localStorage.setItem('pendingTask', draggedTask.outerHTML);

    //     localStorage.removeItem('task');
    //     localStorage.removeItem('inProgressTask');
    //     localStorage.removeItem('completedTask');
    //     draggedTask.style.backgroundColor = '#f2caca';
    // }
    // else if (newTaskStatus === 'in') {
    //     localStorage.setItem('inProgressTask', draggedTask.outerHTML);

    //     localStorage.removeItem('task');
    //     localStorage.removeItem('pendingTask');
    //     localStorage.removeItem('completedTask');
    //     taskCardDeleteButton.addEventListener('click', function() {
    //         taskCard.remove();
    //     });
    //     draggedTask.style.backgroundColor = '#f2e6f2';
    // }
    // else if (newTaskStatus === 'completed') {
    //     localStorage.setItem('completedTask', draggedTask.outerHTML);

    //     localStorage.removeItem('task');
    //     localStorage.removeItem('pendingTask');
    //     localStorage.removeItem('inProgressTask');
    //     taskCardDeleteButton.addEventListener('click', function() {
    //         taskCard.remove();
    //     });
    //     draggedTask.style.backgroundColor = '#c9f2c9';
    // }
  }

    let taskNameInput = document.getElementById('task-card-title');
    let taskDescriptionInput = document.getElementById('task-card-description');
    let taskCategoryInput = document.getElementById('task-card-category');
    let taskDateTimeInput = document.getElementById('task-card-datetime');

    addTaskButton.addEventListener('click', function() {
        let addTaskForm = document.getElementById('add-task-form');
        addTaskForm.style.display = 'flex';
    });

    function hideForm() {
        let addTaskForm = document.getElementById('add-task-form');
        addTaskForm.style.display = 'none';
    }


    function addNewTask() {
        let taskName = document.getElementById('task-title').value;
        let taskDescription = document.getElementById('task-description').value;
        let taskCategory = document.getElementById('task-category').value;

        let time = new Date();
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let day = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();

        let taskDateTime = `${day}/${month}/${year} · ${hours}:${minutes}`;

        let newTask = new Task(taskName, taskDescription, taskCategory, taskDateTime, taskStatus = '');

        let taskCard = document.createElement('div');
        taskCard.classList.add('task-card');
        taskCard.draggable = true;
        taskCard.id = 'drag' + (pendingTasksBody.children.length + 1);
        taskCard.setAttribute('ondragstart', 'drag(event)');

        let taskCardHeading = document.createElement('div');
        taskCardHeading.classList.add('task-card-heading');

        let taskCardTitleAndCategory = document.createElement('div');
        taskCardTitleAndCategory.classList.add('task-card-title-and-category');

        let taskCardTitle = document.createElement('div');
        taskCardTitle.classList.add('task-card-title');
        taskCardTitle.textContent = newTask.getTaskName();

        let taskCardDeleteButton = document.createElement('button');
        taskCardDeleteButton.classList.add('task-card-delete-button');
        taskCardDeleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"/></svg>';
        taskCardDeleteButton.addEventListener('click', function() {
            let deleteConfirmation = document.getElementById('delete-confirmation-modal');
            let deleteConfirmationCloseButton = document.getElementById('delete-confirmation-modal-no');
            let deleteConfirmationConfirmButton = document.getElementById('delete-confirmation-modal-yes');
            deleteConfirmation.style.display = 'flex';
    
            deleteConfirmationConfirmButton.addEventListener('click', function() {
                deleteConfirmation.style.display = 'none';
                taskCard.remove();
            }
            );
    
            deleteConfirmationCloseButton.addEventListener('click', function() {
                deleteConfirmation.style.display = 'none';
            });
        });

        let taskCardBody = document.createElement('div');
        taskCardBody.classList.add('task-card-body');

        let taskCardDescription = document.createElement('div');
        taskCardDescription.classList.add('task-card-description');
        taskCardDescription.textContent = newTask.getTaskDescription();

        let taskCardFooter = document.createElement('div');
        taskCardFooter.classList.add('task-card-footer');

        taskDateTime = document.createElement('div');
        taskDateTime.classList.add('task-date-time');
        taskDateTime.textContent = newTask.getTaskDateTime();

        let taskCardCategory = document.createElement('div');
        taskCardCategory.classList.add('task-card-category');
        taskCardCategory.innerHTML = `<p>${newTask.getTaskCategory()}</p>`;
        
        if (taskCardCategory.textContent === 'none') {
            taskCardCategory.style.display = 'none';    
        } else if (taskCardCategory.textContent === 'front-end') {
            taskCardCategory.style.backgroundColor = 'rgb(115 125 200)';
        } else if (taskCardCategory.textContent === 'back-end') {
            taskCardCategory.style.backgroundColor = 'rgb(50 197 132)';
        } else if (taskCardCategory.textContent === 'design') {
            taskCardCategory.style.backgroundColor = 'rgb(162 69 142)';
        } 

        let taskCardStatus = document.createElement('div');
        taskCardStatus.classList.add('task-card-status');
        taskCardStatus.textContent = newTask.getTaskStatus();

        taskCardTitleAndCategory.appendChild(taskCardTitle);
        taskCardTitleAndCategory.appendChild(taskCardCategory);

        taskCardHeading.appendChild(taskCardTitleAndCategory);
        taskCardHeading.appendChild(taskCardDeleteButton);

        taskCardBody.appendChild(taskCardDescription);

        taskCardFooter.appendChild(taskDateTime);
        taskCardFooter.appendChild(taskCardStatus);

        taskCard.appendChild(taskCardHeading);
        taskCard.appendChild(taskCardBody);
        taskCard.appendChild(taskCardFooter);
        

        pendingTasksBody.appendChild(taskCard);

        console.log('Task added');
        console.log(newTask.getTaskName());
        console.log(newTask.getTaskDescription());
        console.log(newTask.getTaskCategory());
        console.log(newTask.getTaskDateTime());
        console.log(newTask.getTaskStatus());

        document.getElementById('add-task-form-body').reset();
        hideForm();
    }

    function openDeleteConfirmation() {
        let deleteConfirmation = document.getElementById('delete-confirmation-modal');
        let deleteConfirmationCloseButton = document.getElementById('delete-confirmation-modal-no');
        let deleteConfirmationConfirmButton = document.getElementById('delete-confirmation-modal-yes');
        deleteConfirmation.style.display = 'flex';

        deleteConfirmationConfirmButton.addEventListener('click', function() {
            deleteConfirmation.style.display = 'none';
            taskCard.remove();
        }
        );

        deleteConfirmationCloseButton.addEventListener('click', function() {
            deleteConfirmation.style.display = 'none';
        });
    }

    class Task {
        constructor(taskName, taskDescription, taskCategory, taskDateTime, taskStatus) {
            this.taskName = taskName;
            this.taskDescription = taskDescription;
            this.taskCategory = taskCategory;
            this.taskDateTime = taskDateTime;
            this.taskStatus = taskStatus;
        }

        getTaskName() {
            return this.taskName;
        }

        getTaskDescription() {
            return this.taskDescription;
        }

        getTaskCategory() {
            return this.taskCategory;
        }

        getTaskDateTime() {
            return this.taskDateTime;
        }

        getTaskStatus() {
            return this.taskStatus;
        }

        setTaskName(taskName) {
            this.taskName = taskName;
        }

        setTaskDescription(taskDescription) {
            this.taskDescription = taskDescription;
        }

        setTaskCategory(taskCategory) {
            this.taskCategory = taskCategory;
        }

        setTaskDateTime(taskDateTime) {
            this.taskDateTime = taskDateTime;
        }

        setTaskStatus(taskStatus) {
            this.taskStatus = taskStatus;
        }
    }
    