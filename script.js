// ==UserScript==
// @name         Alura do toddynnn
// @namespace    https://cursos.alura.com.br/
// @version      2024-19-11
// @description  Oh no cringe, odeio alura slk
// @author       Toddyn
// @match        https://cursos.alura.com.br/course/*/task/*
// @icon         https://i.imgur.com/gP1LZq9.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    
    const getElement = (selector) => document.querySelector(selector);
    
    try {
        const formattedTextElement = getElement(".formattedText");
        if (formattedTextElement) {
            formattedTextElement.innerHTML = atob("RW5nb2xlIG8gY2hvcm8gZSBmYXogbyBMLCBUb2RkeW5uIHBhc3NvIHBvciBhcQ==")
            // String foi encoded, pois no console do alura estava (execute 'atob' on 'Window': The string to be decoded is not correctly encoded.)
            // Texto sem encoded: Engole o choro e faz o L, Toddyn passou por aq
        }

      
        const currentUrl = window.location.href;
        const urlParts = currentUrl.split('/');
        const course = urlParts[4]; 
        const task = urlParts[6];    
        const nextButton = getElement(".bootcamp-next-button");

        if (nextButton) {
            fetch(`https://cursos.alura.com.br/course/${course}/task/${task}/mark-video`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': "application/json"
                }
            }).catch(err => console.error("Error marking video:", err));


            const alternativeList = getElement(".alternativeList");
            if (alternativeList) {
                const correctAlternatives = alternativeList.querySelectorAll("li[data-correct='true']");
                correctAlternatives.forEach(alternative => {
                    const radioButton = alternative.querySelector("input[type='radio']");
                    if (radioButton) {
                        radioButton.click();
                    }
                });

                console.log(`  Toddyn fez ${course} (curso) ${task} -- ${correctAlternatives.length} acertos`);
            }


            const taskActionsButton = getElement(".task-actions-button");
            taskActionsButton?.click(); 

    
            const sortBlocksOrigin = getElement("#sortBlocksOrigin");
            if (sortBlocksOrigin) {
                const blocks = sortBlocksOrigin.querySelectorAll(".block");
                blocks.forEach(block => block.click());
            }

        
            const submitBlocks = getElement('#submitBlocks');
            submitBlocks?.click(); 

            
            const taskActionsButtonNext = getElement("a.task-actions-button-next");
            if (taskActionsButtonNext) {
                setTimeout(() => {
                    nextButton.click();
                }, 5000);
            }
        }
    } catch (error) {
        console.error("Oh no, Algum caralhos deu errado!", error);
    }
})();

// Se eu ver mlk vendedo esse codigo eu vou fazer igual os outros, usar um bom e velho obsfucator
// obrigado marcos10pc pelo codigo original alias, so melhorei msm
