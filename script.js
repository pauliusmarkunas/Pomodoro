     'use strict';
    //function which uploads saved state of body from local strorage
    if (localStorage.getItem('data'))document.body.innerHTML = localStorage.getItem('data');


    //  Audio
        const audio = {
        startTimer() {return new Audio('audio raw/go.mp3');}, //start timer
        timeEnd() {return new Audio('audio raw/stop it.mp3');}, //time === 00:00
        startBreak() {return new Audio('audio raw/take a break.mp3');}, //Any break start
        stopBreak() {return new Audio('audio raw/time to stop.mp3');}, //Any break stop
        click() {return new Audio('audio raw/click.mp3');}, 
        cancel() {return new Audio('audio raw/cancel.mp3');},
        completedTask() {return new Audio('audio raw/completed task.mp3');},
        error() {return new Audio('audio raw/error add task name.mp3');},
        saveTask() {return new Audio('audio raw/save task.mp3');},
        addTask() {return new Audio('audio raw/add task.mp3');}, 
        addNote() {return new Audio('audio raw/add note.mp3');}, 
        pause() {return new Audio('audio raw/pause.mp3');}
        };

        // TIMER
        const pomodoro = document.querySelector('.pomodoro');
        const shortBreak = document.querySelector('.short-break');
        const longBreak = document.querySelector('.long-break');
        const action = document.querySelector('.action');
        let timer = document.querySelector('.timer');
        let type = 'pomodoro';
        
        let time = "25:00";
        let start = false;
        let intervalID=1;
        action.textContent ='START';
        
    
        pomodoro.addEventListener('click', function(){
          audio.click().play();
          time = "25:00";
          timer.textContent = "25:00";
          clearInterval(intervalID);
          action.textContent ='START';
          start = false;
          document.querySelector('body').style.background = '#ba4949';
          pomodoro.style.background = '#ffffff55';
          shortBreak.style.background = '#ffffffcc';
          longBreak.style.background = '#ffffffcc';
          type = 'pomodoro';
          
        });
    
        shortBreak.addEventListener('click', function(){
          audio.click().play();
          time = "05:00";
          timer.textContent = "05:00";
          clearInterval(intervalID);
          action.textContent ='START';
          start = false;
          document.querySelector('body').style.background = '#38858A';
          pomodoro.style.background = '#ffffffcc';
          shortBreak.style.background = '#ffffff55';
          longBreak.style.background = '#ffffffcc';
          type = 'short break';
          
        });
    
        longBreak.addEventListener('click', function(){
          audio.click().play();
          time = "15:00";
          timer.textContent = "15:00";
          clearInterval(intervalID);
          action.textContent ='START';
          start = false;
          document.querySelector('body').style.background = '#397097';
          pomodoro.style.background = '#ffffffcc';
          shortBreak.style.background = '#ffffffcc';
          longBreak.style.background = '#ffffff55';
          type = 'long break';
          
        });
        
    
        const timerF = function (a) {
          let sAll = parseInt(a[0]+a[1])*60+parseInt(a[3]+a[4]);
          let m, s;
          intervalID = setInterval(() => {
            if (sAll>0){
            sAll--;
            m=(sAll / 60) < 10 ? '0'+Math.floor(sAll/60) : Math.floor(sAll/60);
            s=(sAll % 60) < 10 ? '0'+sAll%60 : sAll%60;   
            timer.textContent = m+':'+s;
            }
            else{
              clearInterval(intervalID);
              action.textContent ='START';
              if (type === 'pomodoro') audio.timeEnd().play();
              else audio.stopBreak().play();
            }
          }, 1000);}
    
          const timerStop=function(){
            time = document.querySelector('.timer').textContent;
            clearInterval(intervalID);
            action.textContent ='START';
          };
    
        action.addEventListener('click', function(){
          if (start === false)
          {
            start = true;
            timerF(time);
            action.textContent ='PAUSE';
            if (type === 'pomodoro') audio.startTimer().play();
            else if (type === 'short break' || type ==='long break') audio.startBreak().play();
          }
          else
          {
            start = false;
            timerStop();
            action.textContent ='START';
            if (type === 'pomodoro') audio.pause().play();
            else if (type === 'short break' || type ==='long break') audio.pause().play();
          } 
        });
    
        // ADD TASK-------------------------------------------
        const addTask = document.querySelector('.add-task');
        const form = document.querySelector('.task-form');
        const addPom = document.querySelector('.add-pom');
        const removePom = document.querySelector('.remove-pom');
        const addNote = document.querySelector('.add-note');
        const cancelForm = document.querySelector('.form-cancel');
        const saveForm = document.querySelector('.form-save');
        const noteInput = document.querySelector('.note-input');
        const estPom = document.querySelector('.est-pom-count');
        const TS = document.querySelector('.TS');
        const formInput = document.querySelector('.task-name');
        const mainBox = document.querySelector('.main-box');
        const body = document.querySelector('body');
        let tempTS;
        let sum;

        function setDefaultForm(){
          formInput.value = '';
            estPom.textContent = '1';
            noteInput.value = '';
        }

        addTask.addEventListener('click', function(){
          audio.addTask().play();
          addTask.classList.add('remove-global');
          form.classList.remove('remove-global');
          cancelForm.textContent = 'cancel';
        });
    
        addNote.addEventListener('click', function(){
          audio.addNote().play();
          addNote.classList.add('remove-global');
          noteInput.classList.remove('remove-global');
        });
    
        addPom.addEventListener('click', function(){
          audio.click().play();
          sum = parseInt(estPom.textContent);
          if(sum<999) estPom.textContent = sum+1;
        });
    
        removePom.addEventListener('click', function(){
          audio.click().play();
          sum = parseInt(estPom.textContent);
          if(sum>1) estPom.textContent = sum-1;
        });
    
        cancelForm.addEventListener('click', function(){
          audio.cancel().play();
          addTask.classList.remove('remove-global');
          form.classList.add('remove-global');
          addNote.classList.remove('remove-global');
          noteInput.classList.add('remove-global');
          setDefaultForm();
        });
    
        saveForm.addEventListener('click', function(){
          if(formInput.value.trim()!=='')
          {
            audio.saveTask().play();
            let pomName, pomNote, pomCount;
            pomName = document.querySelector('.task-name').value;
            pomNote = document.querySelector('.note-input').value;
            pomCount = document.querySelector('.est-pom-count').textContent;
            addNote.classList.remove('remove-global');
            noteInput.classList.add('remove-global');
            setDefaultForm();
            form.classList.add('remove-global');
            addTask.classList.remove('remove-global');
            tempTS = TS.cloneNode(true);
            //clone with remove global class
            tempTS.classList.remove('remove-global');
            body.insertBefore(tempTS, addTask);
            tempTS.querySelector('.TS-task').textContent = pomName;
            if (pomNote !== '') tempTS.querySelector('.TS-note').textContent = pomNote;
            else tempTS.querySelector('.TS-note').remove();
            tempTS.querySelector('.TS-pom').textContent = pomCount;
          }
          else {
            audio.error().play();
            setTimeout(function(){
              alert('Enter task name');
            }, 100);
          }
        });

        // EDIT TASK ------------------------------------
        body.addEventListener('click', function(event){
          const targetComponent = event.target.parentNode.parentNode;
          if (event.target && event.target.classList.contains('TS-edit')){
            audio.click().play();
            addTask.classList.add('remove-global');
            form.classList.remove('remove-global');
            cancelForm.textContent = 'delete';
            formInput.value = targetComponent.querySelector('.TS-task').textContent;
            estPom.textContent = targetComponent.querySelector('.TS-pom').textContent;
            if (targetComponent.querySelector('.TS-note')) noteInput.value = targetComponent.querySelector('.TS-note').textContent;
            targetComponent.remove();
          }
          else if (event.target && event.target.classList.contains('TS-icon')){
            if (!targetComponent.classList.contains('completed-task'))audio.completedTask().play();
            else audio.click().play();
            targetComponent.classList.toggle('completed-task');
            let childElements = targetComponent.children[0].children;
            console.log(childElements.length);
            Array.from(childElements).forEach(element => {
                element.classList.toggle('completed-task');
            });
            Array.from(targetComponent.children).forEach(element => {
                element.classList.toggle('completed-task');
            });
          }
        });

        //saves body stase into local storage everytime click event happens
        document.addEventListener('click', function(){
          localStorage.setItem('data', document.body.innerHTML);
        });
        