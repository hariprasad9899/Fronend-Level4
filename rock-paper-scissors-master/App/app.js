const rules = document.getElementsByClassName("rules")[0];
const ruleBtn = document.getElementById("ruleBtn");
const close = document.getElementById("closeBtn");

ruleBtn.onclick = function() {
    rules.classList.toggle("active");
}
close.onclick = function() {
    rules.classList.toggle("active");
}



// const elems = [...document.getElementsByClassName("elems")]
// for(let i of elems) {
//     i.addEventListener("click",()=> {
//         for(let j of elems) {
//             j.classList.remove("active")
//         }
//         i.classList.add("active")
//     })
// }