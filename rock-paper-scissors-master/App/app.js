const rules = document.getElementsByClassName("rules")[0];
const ruleBtn = document.getElementById("ruleBtn");
const close = document.getElementById("closeBtn");
const partOne = document.getElementsByClassName("partOne")[0];

ruleBtn.onclick = function() {
    rules.classList.toggle("active");
}
close.onclick = function() {
    rules.classList.toggle("active");
}

// cloning stone paper scissor

const stepOne = document.getElementsByClassName("stepOne")[0];
const stepTwo = document.getElementsByClassName("stepTwo")[0];
const stepThree = document.getElementsByClassName("stepThree")[0];
const objs = [...document.getElementsByClassName("objs")]
let objsArray = []


for(let eachObj of objs) {
    let cloneElem = eachObj.cloneNode(true)
    cloneElem.classList.remove("objs");
    objsArray.push(cloneElem)
}



for(let i in objs) {
    objs[i].addEventListener("click",()=> {
        proceedStepTwo(i,objsArray[i])
    })
}

function proceedStepTwo(selectedIndex,selectedObj) {
    let userPick= stepTwo.getElementsByClassName("userPick")[0];
    let pick = userPick.getElementsByClassName("pick")[0];
    pick.after(selectedObj);
    stepOne.style.display = "none";
    stepTwo.style.display = "flex";
    setTimeout(function(){
        proceedStepThree(selectedIndex,selectedObj);
    },1000)
}   

function proceedStepThree(sIndex,sObj) {
    stepTwo.style.display = "none";
    stepThree.style.display = "flex";
    let userPick= stepThree.getElementsByClassName("userPick")[0];
    let pick = userPick.getElementsByClassName("pick")[0];
    pick.after(sObj);
    let housePick= stepThree.getElementsByClassName("housePick")[0];
    let hPick = housePick.getElementsByClassName("pick")[0];
    let randomElement = choosePick(sIndex);
    hPick.after(randomElement);
    proceedStepFour(sObj,randomElement);
}

let newArr = []
function choosePick(choosenIndex) {
    for(let i in objsArray) {
        if(i == choosenIndex) { continue }
        newArr.push(objsArray[i])
    }
    let randomElem = newArr[Math.floor(Math.random() * newArr.length)];
    return randomElem;
}


function proceedStepFour(userChoosen,houseChoosen) {
    let result = chooseWinner(userChoosen,houseChoosen);
    result.classList.add("winner");
    proceedStepFive(result);
}

function chooseWinner(u,h) {
    if(u.classList.contains('scissor') && h.classList.contains('paper')) {
        return u;
    } else if (u.classList.contains('paper') && h.classList.contains('rock')) {
        return u;
    } else if(u.classList.contains('rock') && h.classList.contains('scissor')) {
        return u;
    } else {
        return h;
    }
}




function proceedStepFive(result) {
    stepThree.classList.add("done");
    let userPick= stepThree.getElementsByClassName("userPick")[0];
    let housePick= stepThree.getElementsByClassName("housePick")[0];
    let mob = document.getElementsByClassName("mob")[0];
    userPick.classList.add("done");
    housePick.classList.add("done");
    let decision = stepThree.getElementsByClassName("decision")[0];
    let hElem = decision.getElementsByTagName('h1')[0];
    let mobhElem = mob.getElementsByTagName('h1')[0];
    if(result.parentElement.classList.contains("userPick")) {
        hElem.textContent = "YOU WIN";
        mobhElem.textContent = "YOU WIN";
        addScore()

    } else {
        hElem.textContent = "YOU LOSE";
        mobhElem.textContent = "YOU LOSE";
        subScore()
    }
    decision.classList.add("done");
    mob.classList.add("done");
}

var counter = 0;
const scoreVal = document.getElementById("scoreVal");

function addScore() {
    counter = counter + 1;
    scoreVal.innerText = counter;
}
function subScore() {
    if(counter !== 0) {
        counter = counter - 1;
        scoreVal.innerText = counter;
    }
}



function playAgain() {
    newArr = [];
    stepOne.style.display = "block";
    stepTwo.style.display = "none";
    stepThree.style.display = "none";
    let prevElems = [...stepThree.getElementsByClassName("elems")]
    for(let k of prevElems) {
        k.classList.remove("winner");
        k.remove();
    }
}