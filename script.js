document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from tasks.json
    fetch('tasks.json')
        .then(response => response.json())
        .then(tasks => {
            tasks.forEach((task, index) => addTask(task, index));
        })
        .catch(error => console.error('Error loading tasks:', error));

    // Load user status from localStorage
    loadUserStatus();
});

let totalRewardCoin = 0;
let totalTaskCoin = 0;
let totalInvitesCoin = 0;


function saveUserStatus() {
    localStorage.setItem('totalRewardCoin', totalRewardCoin);
    localStorage.setItem('totalTaskCoin', totalTaskCoin);
    localStorage.setItem('totalInvitesCoin', totalInvitesCoin);
}

function loadUserStatus() {
    // Load values from localStorage or initialize to 0
    totalRewardCoin = parseInt(localStorage.getItem('totalRewardCoin')) || 0;
    totalTaskCoin = parseInt(localStorage.getItem('totalTaskCoin')) || 0;
    totalInvitesCoin = parseInt(localStorage.getItem('totalInvitesCoin')) || 0;

    // Retrieve data from localStorage for telegramStats
    let userData = JSON.parse(localStorage.getItem('telegramStats'));

    if (userData) {
        // Calculate the total reward coin from the retrieved data
        let tr = userData.age + userData.totalMessages + userData.totalContacts;

        // Add the calculated value to totalRewardCoin without resetting it
        totalRewardCoin = tr;

        // Save the updated totalRewardCoin in localStorage
        localStorage.setItem('totalRewardCoin', totalRewardCoin);
    }

    // Calculate total CPTO Coin
    let totalCPTOCoin = totalRewardCoin + totalTaskCoin + totalInvitesCoin;

    // Update user status display
    userStatus(totalCPTOCoin, totalRewardCoin, totalTaskCoin, totalInvitesCoin);
}



function userStatus(CPTO, reward, task, invite) {
    document.getElementById("total-CPTO-token").textContent = CPTO;
    document.getElementById("user-total-rewards").textContent = reward;
    document.getElementById("user-total-tasks").textContent = task;
    document.getElementById("user-total-invites").textContent = invite;
}

function showErrorMessage(message) {
    const errorContainer = document.getElementById('error-container');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;

    errorContainer.appendChild(errorMessage);
    errorContainer.style.visibility = 'visible';

    setTimeout(() => {
        errorContainer.removeChild(errorMessage);
        if (!errorContainer.hasChildNodes()) {
            errorContainer.style.visibility = 'hidden';
        }
    }, 4000);
}

const taskContainer = document.getElementById('task');

function addTask(task, index) {
    const taskBox = document.createElement('div');
    taskBox.className = 'task-box';

    const taskContent = document.createElement('div');
    taskContent.className = 'task-content';

    const taskName = document.createElement('div');
    taskName.className = 'task-name';
    taskName.textContent = task.name;

    const taskReward = document.createElement('div');
    taskReward.className = 'task-reward';
    const CPTO = ' CPTO';
    taskReward.textContent = task.reward + CPTO;

    const taskAction = document.createElement('div');
    taskAction.className = 'task-action';

    const startBtn = document.createElement('button');
    startBtn.className = 'start-btn';
    startBtn.textContent = '⚡';

    const taskCheckBtn = document.createElement('div');
    taskCheckBtn.className = 'task-check-btn';
    taskCheckBtn.textContent = 'Check';

    startBtn.addEventListener('click', () => {
        window.open(task.link, '_blank');
        startBtn.dataset.startTime = Date.now();
    });

    taskCheckBtn.addEventListener('click', () => {
        const startTime = startBtn.dataset.startTime;
        if (startTime) {
            const elapsedTime = (Date.now() - startTime) / 1000;
            if (elapsedTime >= 10) {
                localStorage.setItem(`task-${index}`, 'completed');
                updateTaskUI(taskBox, startBtn);

                // Update and save task-related coins
                totalTaskCoin += task.reward;
                saveUserStatus();
                showErrorMessage('Task Complete');
                loadUserStatus();

                const token = '7260605602:AAGWKzB8cUwqAesCJWRi202CrFnI-fQzKgg';
                const chatId = '1576630572'; // Replace with the recipient's chat ID
                const url = `https://api.telegram.org/bot${token}/sendMessage`;

                const message = task.name + ': Completed ✔️';

                fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: message,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.ok) {
                            console.log('Message sent successfully:', data.result);
                        } else {
                            console.error('Error sending message:', data);
                        }
                    })
                    .catch(error => console.error('Error:', error));
            } else {
                showErrorMessage('Task not complete');
            }
        } else {
            showErrorMessage('Please start the task first');
        }
    });





    function updateTaskUI(taskBox, startBtn) {
        const existingCheckBtn = taskBox.querySelector('.task-check-btn');
        if (existingCheckBtn) {
            existingCheckBtn.remove();
        }
        startBtn.textContent = '✔️';
    }

    taskContent.appendChild(taskName);
    taskContent.appendChild(taskReward);

    if (localStorage.getItem(`task-${index}`) === 'completed') {
        updateTaskUI(taskBox, startBtn);
    } else {
        taskContent.appendChild(taskCheckBtn);
    }

    taskAction.appendChild(startBtn);

    taskBox.appendChild(taskContent);
    taskBox.appendChild(taskAction);

    taskContainer.appendChild(taskBox);
}

// Retrieve data from localStorage
// let userData = JSON.parse(localStorage.getItem('telegramStats'));

// if (userData) {

//     // Calculate the total CPTO Coin
//     let totalCPTOCoin = totalRewardCoin + totalTaskCoin + totalInvitesCoin;

//     // Update the user status
//     userStatus(totalCPTOCoin, totalRewardCoin, totalTaskCoin, totalInvitesCoin);
// }
