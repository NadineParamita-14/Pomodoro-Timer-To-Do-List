let timer;
let isBreak = false;

function startTimer() {
    const studyTime = parseInt(document.getElementById('study-time').value) * 60;
    const breakTime = parseInt(document.getElementById('break-time').value) * 60;
    let timeRemaining = isBreak ? breakTime : studyTime;

    // Update the label and play the appropriate sound
    const timerLabel = document.getElementById('timer-label');
    const audio = new Audio(isBreak ? 'break-time.mp3' : 'study-time.mp3');
    timerLabel.textContent = isBreak ? 'Break Time' : 'Study Time';
    audio.play();

    clearInterval(timer);
    timer = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById('timer-display').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeRemaining === 0) {
            isBreak = !isBreak;
            clearInterval(timer);
            startTimer(); // Restart timer for the next phase
        }
        timeRemaining--;
    }, 1000);
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = taskInput.value;

        const markDoneButton = document.createElement('button');
        markDoneButton.textContent = 'Done';
        markDoneButton.className = 'done-button';
        markDoneButton.onclick = () => {
            li.remove();
            saveTasks();
        };

        li.appendChild(markDoneButton);
        taskList.appendChild(li);
        taskInput.value = ''; // Clear input field

        saveTasks(); // Save task list to localStorage
    }
}

function saveTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push(li.firstChild.textContent.trim());
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('task-list');
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    taskList.innerHTML = ''; // Clear current tasks
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;

        const markDoneButton = document.createElement('button');
        markDoneButton.textContent = 'Done';
        markDoneButton.className = 'done-button';
        markDoneButton.onclick = () => {
            li.remove();
            saveTasks();
        };

        li.appendChild(markDoneButton);
        taskList.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks on page load

    // Add a label element for Pomodoro
    const timerSection = document.getElementById('pomodoro');
    const timerLabel = document.createElement('div');
    timerLabel.id = 'timer-label';
    timerLabel.style.fontSize = '1.5rem';
    timerLabel.style.marginBottom = '10px';
    timerLabel.textContent = 'Pomodoro Timer';
    timerSection.insertBefore(timerLabel, timerSection.firstChild);
});

checkbox.addEventListener('change', () => {
    const taskTextElem = li.querySelector('.task-content span');
    taskTextElem.classList.toggle('done');
    saveTasks();
});
