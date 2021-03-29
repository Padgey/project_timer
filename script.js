const timeToString = time => {
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
    document.title = timeToString(sElapsedTime + sTotalTime)
};

const showCountdownButton = document.getElementById("showCountdownButton");
const showDebugButton = document.getElementById("showDebugButton");
const showToDoButton = document.getElementById("showToDoButton");
const breakPromptDiv = document.getElementById("breakPrompt");
const countdownDiv = document.getElementById("countdownDiv");
const countdownErrorDiv = document.getElementById("countdownErrorDiv");
const toDoDiv = document.getElementById("toDo");

countdownDiv.style.display = "none";
toDoDiv.style.display = "none"; //To-Do list not displayed by default

//Display Controls
function showCountdown() {
    if (countdownDiv.style.display === "none") {
        countdownDiv.style.display = "block"
    } else {
        countdownDiv.style.display = "none"
    }
};

function showDebug() {
    if (countdownErrorDiv.style.display === "none") {
        countdownErrorDiv.style.display = "block"
    } else {
        countdownErrorDiv.style.display = "none"
    }
}

function showToDo() {
    if (toDoDiv.style.display === "none") {
        toDoDiv.style.display = "block"
    } else {
        toDoDiv.style.display = "none"
    }
}

showCountdownButton.addEventListener("click", showCountdown);
showDebugButton.addEventListener("click", showDebug);
showToDoButton.addEventListener("click", showToDo);



//Break prompt


let initialTimeToPrompt = 1200000; //20 minutes - 1000*60*20
let totalTimeToPrompt = initialTimeToPrompt;
let countdownStatus = "Stopped";
let countdownStartTime;
let countdownElapsed = 0;
let countdownInterval;
let timeToPrompt;

breakPromptDiv.innerText = timeToString(initialTimeToPrompt);
countdownErrorDiv.innerText = countdownStatus;


function countdownPrint(txt) {
    if (timeToPrompt > 0) {
        breakPromptDiv.innerText = txt;
    } else {
        breakPromptDiv.innerText = "Time to stretch and rest your eyes!"
    }
}

function countdownTimer() {
    if (countdownStatus === "Stopped") {
        countdownStartTime = Date.now();
        countdownStatus = "Running";
        countdownErrorDiv.innerText = countdownStatus;
        countdownInterval = setInterval(function countdownTimer() {
            countdownElapsed = Date.now() - countdownStartTime;
            timeToPrompt = totalTimeToPrompt - countdownElapsed;
            countdownPrint(timeToString(timeToPrompt));
        }, 100);
    } else if (countdownStatus === "Running") {
        countdownErrorDiv.innerText = "Cannot start timer which is already running";
        setTimeout(() => {
            countdownErrorDiv.innerText = countdownStatus;
        }, 1500);
    } else {
        countdownErrorDiv.innerText = "This error should not appear!";
    }
   
};

function countdownPause() {
    clearInterval(countdownInterval);
    countdownStatus = "Stopped";
    countdownErrorDiv.innerText = countdownStatus;
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
    countdownErrorDiv.innerText = countdownStatus;
    totalTimeToPrompt = initialTimeToPrompt;
    timeToPrompt = initialTimeToPrompt;
    countdownElapsed = 0;
    countdownPrint(timeToString(totalTimeToPrompt));
}

const breakPromptStart = document.getElementById("breakPromptStart");
const breakPromptPause = document.getElementById("breakPromptPause");
const breakPromptReset = document.getElementById("breakPromptReset");

breakPromptStart.addEventListener("click", countdownTimer);
breakPromptPause.addEventListener("click", countdownPause);
breakPromptReset.addEventListener("click", countdownReset);

///////////////////////////////////////////////////////////////////////////////////////////////
//Study stopwatch
const sTotalTimer = document.getElementById("study_total_text");
const sCurrentTimer = document.getElementById("study_current_text");

let sStartTime;
let sElapsedTime = 0;
let sTimerInterval;
let sTotalTime = 0;


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


const sPlayButton = document.getElementById("study_play");
const sPauseButton = document.getElementById("study_pause");
const sResetButton = document.getElementById("study_reset");


sPlayButton.addEventListener("click", sStart);
sPauseButton.addEventListener("click", sPause);
sResetButton.addEventListener("click", sReset);

//Add minute
const sAddMinuteButton = document.getElementById("splus_one_study");

function sAddMinute() {
    sTotalTime = sTotalTime + 60000;
    sTotalPrint(timeToString(sTotalTime));
};

sAddMinuteButton.addEventListener("click", sAddMinute);

//Subtract minute
const sSubtractMinuteButton = document.getElementById("sminus_one_study");

function sSubtractMinute() {
    if (sTotalTime >= 60000) {
    sTotalTime = sTotalTime - 60000;
    } else {
        sTotalTime = 0
    };
    sTotalPrint(timeToString(sTotalTime));
};

sSubtractMinuteButton.addEventListener("click", sSubtractMinute);




///////////////////////////////////////////////////////////////////////////////////////
//Procrastination stopwatch
const pTotalTimer = document.getElementById("procrastination_total_text");
const pCurrentTimer = document.getElementById("procrastination_current_text");

let pStartTime;
let pElapsedTime = 0;
let pTimerInterval;
let pTotalTime = 0;


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


const pPlayButton = document.getElementById("procrastination_play");
const pPauseButton = document.getElementById("procrastination_pause");
const pResetButton = document.getElementById("procrastination_reset");


pPlayButton.addEventListener("click", pStart);
pPauseButton.addEventListener("click", pPause);
pResetButton.addEventListener("click", pReset);


//Add minute
const pAddMinuteButton = document.getElementById("pplus_one_study");

function pAddMinute() {
    pTotalTime = pTotalTime + 60000;
    pTotalPrint(timeToString(pTotalTime));
};

pAddMinuteButton.addEventListener("click", pAddMinute);

//Subtract minute
const pSubtractMinuteButton = document.getElementById("pminus_one_study");

function pSubtractMinute() {
    if (pTotalTime >= 60000) {
    pTotalTime = pTotalTime - 60000;
    } else {
        pTotalTime = 0
    };
    pTotalPrint(timeToString(pTotalTime));
};

pSubtractMinuteButton.addEventListener("click", pSubtractMinute);


//////////////////////////////////////////////////////////////////////////////////////////////////
//Break stopwatch
const bTotalTimer = document.getElementById("break_total_text");
const bCurrentTimer = document.getElementById("break_current_text");

let bStartTime;
let bElapsedTime = 0;
let bTimerInterval;
let bTotalTime = 0;


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


const bPlayButton = document.getElementById("break_play");
const bPauseButton = document.getElementById("break_pause");
const bResetButton = document.getElementById("break_reset");


bPlayButton.addEventListener("click", bStart);
bPauseButton.addEventListener("click", bPause);
bResetButton.addEventListener("click", bReset);

//Add minute
const bAddMinuteButton = document.getElementById("bplus_one_study");

function bAddMinute() {
    bTotalTime = bTotalTime + 60000;
    bTotalPrint(timeToString(bTotalTime));
};

bAddMinuteButton.addEventListener("click", bAddMinute);

//Subtract minute
const bSubtractMinuteButton = document.getElementById("bminus_one_study");

function bSubtractMinute() {
    if (bTotalTime >= 60000) {
    bTotalTime = bTotalTime - 60000;
    } else {
        bTotalTime = 0
    };
    bTotalPrint(timeToString(bTotalTime));
};

bSubtractMinuteButton.addEventListener("click", bSubtractMinute);

///////////////////////////////////////////////////////////////////////////////////////////
//Bottom button functions
const startStudyButton = document.getElementById('start_study');
const startProcrastinationButton = document.getElementById('start_procrastination');
const startBreakButton = document.getElementById('start_break');

const startStudy = () => {
    pReset();
    bReset();
    sReset();
    sStart();
}

startStudyButton.onclick = function() {
    startStudy()
}

const startProcrastination = () => {
    sReset();
    bReset();
    pReset();
    pStart();
}


startProcrastinationButton.onclick = function() {
    startProcrastination()
}

const startBreak = () => {
    pReset();
    sReset();
    bReset();
    bStart();
}


startBreakButton.onclick = function() {
    startBreak()
}


///////////////////////////////////////////////////////////////////////////
const toDoLi = document.getElementById('toDoLi');

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
    }
}

document.querySelector('#inputToDo').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      addNewElement()
    }
});


//////////////////////////////////////////////////////////////////////////////////////////
//JS testing - Making sure JS file is working correctly

/*
startStudyButton.onclick = function() {
    startStudy.style.backgroundColor = 'red';
}
*/

























/*
const pTotalTimer = getElementById("procrastination_total");
const pCurrentTimer = getElementId("procrastination_current");

const pPlay = getElementById("procrastination_play");
const pPause = getElementById("procrastination_pause");
const pReset = getElementById("procrastination_reset");

const bTotalTimer = getElementById("break_total");
const bCurrentTimer = getElementId("break_current");

const bPlay = getElementById("break_play");
const bPause = getElementById("break_pause");
const bReset = getElementById("break_reset");
*/