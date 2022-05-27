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
    setTimeout(function(){
        proceedStepFour(sObj,randomElement);
    },1000)
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
    setTimeout(function(){
        proceedStepFive(result);
    },1000)
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
    console.log("Entered Step 5")
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
        hElem.innerText = "YOU WIN";
        mobhElem.innerText = "YOU WIN";
    } else {
        hElem.innerText = "YOU LOSE";
        mobhElem.innerText = "YOU LOSE";
    }
    decision.classList.add("done");
    mob.classList.add("done");
}