//DOM Structure ///////////////////////////////////////////////
const showCountdownButton = document.getElementById("showCountdownButton");
const countdownDiv = document.getElementById("countdownDiv");
const breakPromptDiv = document.getElementById("breakPrompt");
const breakPromptStart = document.getElementById("breakPromptStart");
const breakPromptPause = document.getElementById("breakPromptPause");
const breakPromptReset = document.getElementById("breakPromptReset");

const showToDoButton = document.getElementById("showToDoButton");
const toDoDiv = document.getElementById("toDo");
const toDoLi = document.getElementById('toDoLi');

const showStudyCountdownButton = document.getElementById("showStudyCountdown");
const studyCountdownDiv = document.getElementById("studyCountdownDiv");

const sTotalTimer = document.getElementById("study_total_text");
const sCurrentTimer = document.getElementById("study_current_text");
const sPlayButton = document.getElementById("study_play");
const sPauseButton = document.getElementById("study_pause");
const sResetButton = document.getElementById("study_reset");
const sAddMinuteButton = document.getElementById("s_plus_one");
const sSubtractMinuteButton = document.getElementById("s_minus_one");

const pTotalTimer = document.getElementById("procrastination_total_text");
const pCurrentTimer = document.getElementById("procrastination_current_text");
const pPlayButton = document.getElementById("procrastination_play");
const pPauseButton = document.getElementById("procrastination_pause");
const pResetButton = document.getElementById("procrastination_reset");
const pAddMinuteButton = document.getElementById("p_plus_one");
const pSubtractMinuteButton = document.getElementById("p_minus_one");

const bTotalTimer = document.getElementById("break_total_text");
const bCurrentTimer = document.getElementById("break_current_text");
const bPlayButton = document.getElementById("break_play");
const bPauseButton = document.getElementById("break_pause");
const bResetButton = document.getElementById("break_reset");
const bAddMinuteButton = document.getElementById("b_plus_one");
const bSubtractMinuteButton = document.getElementById("b_minus_one");

const startStudyButton = document.getElementById('start_study');
const startProcrastinationButton = document.getElementById('start_procrastination');
const startBreakButton = document.getElementById('start_break');


//Global Variables ////////////////////////////////////////////
//CountdownBreakPromptVariables
let initialTimeToPrompt = 1200000; //20 minutes - 1000*60*20
let totalTimeToPrompt = initialTimeToPrompt;
let countdownStatus = "Stopped";
let countdownStartTime;
let countdownElapsed = 0;
let countdownInterval;
let timeToPrompt;

//Study Stopwatch
let sStartTime;
let sElapsedTime = 0;
let sTimerInterval;
let sTimeLeft;
let sTotalTime = 0;

//Procrastination Stopwatch
let pStartTime;
let pElapsedTime = 0;
let pTimerInterval;
let pTotalTime = 0;

//Break Stopwatch
let bStartTime;
let bElapsedTime = 0;
let bTimerInterval;
let bTotalTime = 0;


//Helper Functions ////////////////////////////////////////////
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let formattedHH = hh.toString().padStart(2, "0");
    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");

    return `${formattedHH}:${formattedMM}:${formattedSS}`;
};
function setTitle() {
    document.title = timeToString(sTotalTime + sElapsedTime);
};


//Display Controls ////////////////////////////////////////////
function showCountdown() {
    if (countdownDiv.style.display === "block") {
        countdownDiv.style.display = "none"
    } else {
        countdownDiv.style.display = "block"
    }
};
function showToDo() {
    if (toDoDiv.style.display === "block") {
        toDoDiv.style.display = "none"
    } else {
        toDoDiv.style.display = "block"
    }
};
function showStudyCountdown() {
    if (studyCountdownDiv.style.display === "block") {
        studyCountdownDiv.style.display = "none"
    } else {
        studyCountdownDiv.style.display = "block"
    }
};


//CountdownBreakPrompt ////////////////////////////////////////
breakPromptDiv.innerText = timeToString(initialTimeToPrompt);

function countdownPrint(txt) {
    if (timeToPrompt > 0) {
        breakPromptDiv.innerText = txt;
    } else {
        breakPromptDiv.innerText = "Time to stretch and rest your eyes!"
    }
};
function countdownTimer() {
    if (countdownStatus === "Stopped") {
        countdownStartTime = Date.now();
        countdownStatus = "Running";
        countdownInterval = setInterval(function countdownTimer() {
            countdownElapsed = Date.now() - countdownStartTime;
            timeToPrompt = totalTimeToPrompt - countdownElapsed;
            countdownPrint(timeToString(timeToPrompt));
        }, 100);
    }
};
function countdownPause() {
    clearInterval(countdownInterval);
    countdownStatus = "Stopped";
    totalTimeToPrompt = totalTimeToPrompt - countdownElapsed;
    countdownElapsed = 0;
};
function countdownStop() {
    clearInterval(countdownInterval);
    countdownStatus = "Stopped";
    countdownErrorDiv.innerText = countdownStatus;
    totalTimeToPrompt = totalTimeToPrompt - countdownElapsed;
    countdownElapsed = 0;
};
function countdownReset() {
    clearInterval(countdownInterval);
    countdownStatus = "Stopped";
    totalTimeToPrompt = initialTimeToPrompt;
    timeToPrompt = initialTimeToPrompt;
    countdownElapsed = 0;
    countdownPrint(timeToString(totalTimeToPrompt));
};


//Study Stopwatch /////////////////////////////////////////////
function sPrint(txt) {
    sCurrentTimer.innerHTML = txt;
};
function sTotalPrint(txt) {
    sTotalTimer.innerHTML = txt;
};
function sStart() {
    sStartTime = Date.now() - sElapsedTime;
    
    sTimerInterval = setInterval(function printTime() {
        sElapsedTime = Date.now() - sStartTime;
        sPrint(timeToString(sElapsedTime));
        sTotalPrint(timeToString(sTotalTime + sElapsedTime));
        setTitle();
    }, 100);
};
function sPause() {
    clearInterval(sTimerInterval)
};
function sReset() {
    clearInterval(sTimerInterval);
    sPrint("00:00:00");
    sTotalTime = sTotalTime + sElapsedTime;
    sTotalPrint(timeToString(sTotalTime));
    sElapsedTime = 0;
};
function sAddMinute() {
    sTimeLeft = sTimeLeft - 60000;
    sTotalPrint(timeToString(sTimeLeft));
};
function sSubtractMinute() {
    sTimeLeft = sTimeLeft + 60000;
    sTotalPrint(timeToString(sTimeLeft));
};


//Procrastination Stopwatch ///////////////////////////////////
function pPrint(txt) {
    pCurrentTimer.innerHTML = txt;
};
function pTotalPrint(txt) {
    pTotalTimer.innerHTML = txt;
};
function pStart() {
    pStartTime = Date.now() - pElapsedTime;
    pTimerInterval = setInterval(function printTime() {
        pElapsedTime = Date.now() - pStartTime;
        pPrint(timeToString(pElapsedTime));
        pTotalPrint(timeToString(pTotalTime + pElapsedTime));
        setTitle();
    }, 100);
};
function pPause() {
    clearInterval(pTimerInterval)
};
function pReset() {
    clearInterval(pTimerInterval);
    pPrint("00:00:00");
    pTotalTime = pTotalTime + pElapsedTime;
    pTotalPrint(timeToString(pTotalTime));
    pElapsedTime = 0;
};
function pAddMinute() {
    pTotalTime = pTotalTime + 60000;
    pTotalPrint(timeToString(pTotalTime));
};
function pSubtractMinute() {
    if (pTotalTime >= 60000) {
    pTotalTime = pTotalTime - 60000;
    } else {
        pTotalTime = 0
    };
    pTotalPrint(timeToString(pTotalTime));
};


//Break Stopwatch /////////////////////////////////////////////
function bPrint(txt) {
    bCurrentTimer.innerHTML = txt;
};
function bTotalPrint(txt) {
    bTotalTimer.innerHTML = txt;
};
function bStart() {
    bStartTime = Date.now() - bElapsedTime;
    bTimerInterval = setInterval(function printTime() {
        bElapsedTime = Date.now() - bStartTime;
        bPrint(timeToString(bElapsedTime));
        bTotalPrint(timeToString(bTotalTime + bElapsedTime));
        setTitle();
    }, 100);
};
function bPause() {
    clearInterval(bTimerInterval)
};
function bReset() {
    clearInterval(bTimerInterval);
    bPrint("00:00:00");
    bTotalTime = bTotalTime + bElapsedTime;
    bTotalPrint(timeToString(bTotalTime));
    bElapsedTime = 0;
};
function bAddMinute() {
    bTotalTime = bTotalTime + 60000;
    bTotalPrint(timeToString(bTotalTime));
};
function bSubtractMinute() {
    if (bTotalTime >= 60000) {
    bTotalTime = bTotalTime - 60000;
    } else {
        bTotalTime = 0
    };
    bTotalPrint(timeToString(bTotalTime));
};


//Start Buttons ///////////////////////////////////////////////
function startStudy() {
    pReset();
    bReset();
    sReset();
    sStart();
};
function startProcrastination() {
    sReset();
    bReset();
    pReset();
    pStart();
};
function startBreak() {
    pReset();
    sReset();
    bReset();
    bStart();
};


//To-Do List //////////////////////////////////////////////////
function addNewElement() {
    let li = document.createElement("li");
    let inputValue = document.getElementById("inputToDo").value;
    let textNode = document.createTextNode(inputValue);
    
    li.appendChild(textNode);
    if (inputValue === '') {
        alert('Write something!');
    } else {
        document.getElementById('displayToDo').appendChild(li)
    };
    document.getElementById("inputToDo").value = '';

    let span = document.createElement("SPAN");
    let x = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(x);
    li.appendChild(span);

    const close = document.getElementsByClassName("close");
    let i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            let div = this.parentElement;
            div.style.display = "none";
        }
    };
};


//Event Listeners /////////////////////////////////////////////
showCountdownButton.addEventListener("click", showCountdown);

showToDoButton.addEventListener("click", showToDo);
document.querySelector('#inputToDo').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addNewElement()
    }
});

showStudyCountdownButton.addEventListener("click", showStudyCountdown);

breakPromptStart.addEventListener("click", countdownTimer);
breakPromptPause.addEventListener("click", countdownPause);
breakPromptReset.addEventListener("click", countdownReset);

sPlayButton.addEventListener("click", sStart);
sPauseButton.addEventListener("click", sPause);
sResetButton.addEventListener("click", sReset);
sAddMinuteButton.addEventListener("click", sAddMinute);
sSubtractMinuteButton.addEventListener("click", sSubtractMinute);

pPlayButton.addEventListener("click", pStart);
pPauseButton.addEventListener("click", pPause);
pResetButton.addEventListener("click", pReset);
pAddMinuteButton.addEventListener("click", pAddMinute);
pSubtractMinuteButton.addEventListener("click", pSubtractMinute);

bPlayButton.addEventListener("click", bStart);
bPauseButton.addEventListener("click", bPause);
bResetButton.addEventListener("click", bReset);
bAddMinuteButton.addEventListener("click", bAddMinute);
bSubtractMinuteButton.addEventListener("click", bSubtractMinute);

startStudyButton.addEventListener("click", startStudy);
startProcrastinationButton.addEventListener("click", startProcrastination);
startBreakButton.addEventListener("click", startBreak);



