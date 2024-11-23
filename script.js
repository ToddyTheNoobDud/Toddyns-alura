// ==UserScript==
// @name         Alura do toddynn
// @namespace    https://cursos.alura.com.br/
// @version      2024-19-11
// @description  Apenas um alura q fiz, sim
// @author       Toddyn
// @match        https://cursos.alura.com.br/course/*/task/*
// @icon         https://i.imgur.com/gP1LZq9.png
// @grant        none
// ==/UserScript==
(function () {
    'use strict';
    let autoSkipEnabled = false;
    let autoSkipDelay = 5000;
    let uiDiv, statusDiv;

    function caralhos() {
        uiDiv = document.createElement('div');
        uiDiv.id = 'script-ui';
        uiDiv.innerHTML = `
            <h3 style="margin: 0;">Toddyns Alura</h3>
            <label>
                <input id="auto-skip" type="checkbox"/> Skip auto
            </label>
            <label>
                Auto-skip Delay: <input id="auto-skip-delay" type="number" value="${autoSkipDelay / 1000}" style="width: 60px; padding: 4px;"/> seconds
            </label>
            <div style="margin-top: 10px;">
                <button id="start-task">Task (patched)</button>
                <button id="skip-lesson">Pula a lição</button>
                <button id="reset-task">Reset (test)</button>
            </div>
            <p>
                Made by <a href="https://github.com/mushroom0162" target="_blank">mushroom0162 (toddyn)</a>
            </p>
            <div id="status"></div>
        `;
        cascadebala();
        document.body.appendChild(uiDiv);
        const startTaskButton = document.getElementById('start-task');
        const skipLessonButton = document.getElementById('skip-lesson');
        const resetTaskButton = document.getElementById('reset-task');
        const autoSkipCheckbox = document.getElementById('auto-skip');
        const autoSkipDelayInput = document.getElementById('auto-skip-delay');
        statusDiv = document.getElementById('status');
        startTaskButton.onclick = tadalafila;
        skipLessonButton.onclick = borabill;
        resetTaskButton.onclick = CLT6X1;
        amostradinho();
        autoSkipCheckbox.addEventListener('change', function() {
            autoSkipEnabled = this.checked;
            saveConfig();
            if (autoSkipEnabled) {
                autoSkipLessons();
            } else {
                clearInterval(window.autoSkipInterval);
            }
        });
        autoSkipDelayInput.addEventListener('change', function() {
            autoSkipDelay = this.value * 1000;
            saveConfig();
        });
    }

    function autoSkipLessons() {
        const nextButton = document.querySelector(".bootcamp-next-button");
        if (window.autoSkipInterval) {
            clearInterval(window.autoSkipInterval);
        }
        window.autoSkipInterval = setInterval(() => {
            const taskTasksButton = document.querySelector(".bootcamp-next-button");
            const currentUrl = window.location.href;
            const urlParts = currentUrl.split('/');
            const course = urlParts[4];
            const task = urlParts[6];
            const alternativeList = document.querySelector(".alternativeList");
            if (taskTasksButton) {
                markVideo(course, task);
                if (alternativeList) {
                    selectCorrectAlternatives(alternativeList);
                    submitTask();
                }
                taskTasksButton.click();
                statusDiv.textContent = 'Lesson skipped automatically.';
                clearInterval(window.autoSkipInterval);
            }
        }, autoSkipDelay);
    }

    function tadalafila() {
        statusDiv.textContent = 'Starting task...';
        const getElement = (selector) => document.querySelector(selector);
        try {
            const currentUrl = window.location.href;
            const urlParts = currentUrl.split('/');
            const course = urlParts[4];
            const task = urlParts[6];
            const nextButton = getElement(".bootcamp-next-button");
            const videoMarked = markVideo(course, task);
            const alternativeList = getElement(".alternativeList");
            if (videoMarked && alternativeList) {
                selectCorrectAlternatives(alternativeList);
                submitTask();
                if (nextButton && !autoSkipEnabled) {
                    setTimeout(() => {
                        nextButton.click();
                    }, autoSkipDelay);
                }
                statusDiv.textContent = 'Task completed.';
            }
        } catch (error) {
            console.error("An error occurred: ", error);
            statusDiv.textContent = 'Error: ' + error.message;
        }
    }

    function markVideo(course, task) {
        fetch(`https://cursos.alura.com.br/course/${course}/task/${task}/mark-video`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': "application/json"
            }
        }).catch(err => console.error("Error marking video:", err));
        return true;
    }

    function selectCorrectAlternatives(alternativeList) {
        const correctAlternatives = alternativeList.querySelectorAll("li[data-correct='true']");
        correctAlternatives.forEach(alternative => {
            const radioButton = alternative.querySelector("input[type='radio']");
            if (radioButton) {
                radioButton.click();
            }
        });
    }

    function submitTask() {
        const taskActionsButton = document.querySelector(".task-actions-button");
        const submitBlocks = document.querySelector('#submitBlocks');
        taskActionsButton?.click();
        const sortBlocksOrigin = document.querySelector("#sortBlocksOrigin");
        if (sortBlocksOrigin) {
            const blocks = sortBlocksOrigin.querySelectorAll(".block");
            blocks.forEach(block => block.click());
        }
        submitBlocks?.click();
    }

    function borabill() {
        const nextButton = document.querySelector(".bootcamp-next-button");
        if (nextButton) {
            nextButton.click();
            statusDiv.textContent = 'Lesson skipped!';
        } else {
            statusDiv.textContent = 'No next lesson button found.';
        }
    }

    function CLT6X1() {
        statusDiv.textContent = 'Task progress reset.';
    }

    function saveConfig() {
        localStorage.setItem('aluraAutoSkipEnabled', autoSkipEnabled);
        localStorage.setItem('aluraAutoSkipDelay', autoSkipDelay);
    }

    function amostradinho() {
        autoSkipEnabled = localStorage.getItem('aluraAutoSkipEnabled') === 'true';
        autoSkipDelay = parseInt(localStorage.getItem('aluraAutoSkipDelay')) || 5000;
        const autoSkipCheckbox = document.getElementById('auto-skip');
        const autoSkipDelayInput = document.getElementById('auto-skip-delay');
        if (autoSkipCheckbox) {
            autoSkipCheckbox.checked = autoSkipEnabled;
        }
        if (autoSkipDelayInput) {
            autoSkipDelayInput.value = autoSkipDelay / 1000;
        }
        if (autoSkipEnabled) {
            autoSkipLessons();
        }
    }

    function cascadebala() {
        uiDiv.style.position = 'fixed';
        uiDiv.style.top = '20px';
        uiDiv.style.right = '20px';
        uiDiv.style.backgroundColor = '#1a1a1a'; // Dark background
        uiDiv.style.color = '#00BFFF'; // Blue text
        uiDiv.style.padding = '15px';
        uiDiv.style.borderRadius = '10px';
        uiDiv.style.zIndex = '9999';
        uiDiv.style.fontFamily = 'Arial, sans-serif';
        uiDiv.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        uiDiv.style.transition = 'all 0.3s ease-in-out';

        // Add CSS styles
        const style = document.createElement('style');
        style.textContent = `
            #script-ui {
                transition: all 0.3s ease;
            }
            #script-ui button {
                background-color: #007BFF; /* Blue button background */
                color: white;
                border: none;
                padding: 8px 12px;
                margin: 5px 0;
                cursor: pointer;
                border-radius: 5px;
                transition: background-color 0.3s ease;
                display: inline-block;
            }
            #script-ui button:hover {
                background-color: #0056b3; 
            }
            #script-ui label {
                display: block;
                margin-bottom: 5px;
                color: #00BFFF;
            }
            #script-ui input[type="number"] {
                width: 70px;
                padding: 4px;
                border-radius: 4px;
                border: 1px solid #00BFFF; 
                background-color: #333; 
                color: #00BFFF; 
            }
            #script-ui a {
                color: #00BFFF;
                text-decoration: none;
            }
            #script-ui a:hover {
                text-decoration: underline;
            }
        `;
        document.head.appendChild(style);
    }

    caralhos();
})();
