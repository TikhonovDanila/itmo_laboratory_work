"use strict";
const task_1 = document.querySelector('#task1');
const task_2 = document.querySelector('#task2');
const back = document.querySelector('#back');
task_1.addEventListener('click',()=>{
    window.location.href='math.xml';
})
task_2.addEventListener('click',()=>{
    window.location.href='svg.xml';
})
back.addEventListener('click', ()=>{
    window.location.href = 'https://tikhonovdanila.github.io/itmo_laboratory_work/';
})