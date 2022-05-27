const wrapper = document.getElementsByClassName('wrapper')[0];
const dropContent = document.getElementsByClassName("dropContent")[0]; 
const arrow = document.getElementsByClassName("arrow")[0];
const eachCountry = document.getElementsByClassName("eachCountry")[0];
const innerThree = document.getElementsByClassName("innerThree")[0];
const partThree = document.getElementsByClassName('partThree')[0];
const partFour = document.getElementsByClassName('partFour')[0];
const partTwo = document.getElementsByClassName('partTwo')[0];

wrapper.addEventListener("click",()=> {
    dropContent.classList.toggle("show");
    arrow.classList.toggle("invert");
})


window.onload = function() {

    async function fetchData() {
        let dumpData = await fetch("https://restcountries.com/v3.1/all")
        let jsonData = await dumpData.json();
        return jsonData
    }

    let holderArray = []
    async function putData() {
        let data = await fetchData();
        for(let eachElem of data) {
            if(eachElem["ccn3"] == "334") {continue}
            if(holderArray.indexOf(eachElem["ccn3"]) >= 0) { continue}
            holderArray.push(eachElem["ccn3"]);
            let clonedNode = eachCountry.cloneNode(true);
            clonedNode.classList.add("elem");
            addElements(clonedNode,eachElem);
            innerThree.appendChild(clonedNode);
        }
    }
    putData();

    async function addElements(node,cData) {
        let cImg = node.getElementsByClassName("cImg")[0];
        let cName = node.getElementsByClassName("cName")[0];
        let cPop = node.getElementsByClassName("cPop")[0];
        let cReg = node.getElementsByClassName("cReg")[0];
        let cCap = node.getElementsByClassName("cCap")[0];
        cImg.src = cData["flags"]["svg"];
        cName.innerText = cData["name"]["common"]
        let populationNum = cData["population"].toLocaleString('en-us');
        cPop.innerText = populationNum;
        cReg.innerText = cData["region"];
        cCap.innerText = cData["capital"]
        node.dataset.region = cData["region"].toLowerCase();
        node.dataset.country = cData["name"]["common"].toLowerCase();
        node.dataset.code = cData["ccn3"]
        return "done";
    }

    async function filter() {
        let load = await putData();
        let regions = [...dropContent.getElementsByTagName('p')]


        for(let i of regions) {
            i.addEventListener('click',()=> {
                document.getElementById('appliedFilter').innerText = i.innerText;
                dropContent.classList.toggle("show");
                filterOutRegions(i.innerText.toLowerCase());
            })
        }

        const inp = document.getElementById('inp');
        inp.addEventListener('input',()=> {
            let allElems = [...document.getElementsByClassName("elem")];
            let val = inp.value.toLowerCase();
            for(let each of allElems) {
                if(each.dataset.country.indexOf(val) >= 0) {
                    each.style.display = "flex";
                } else {
                    each.style.display = "none";
                }
            }
        })


        const elems = [...document.getElementsByClassName('elem')];
        for(let eachElem of elems) {
            eachElem.addEventListener('click', ()=> {
                partTwo.style.display = "none";
                partThree.style.display = "none";
                partFour.style.display = "block"
                proceedPartTwo(eachElem);
            })
        }


        async function proceedPartTwo(selectedeElem) {
            let ccn3 = selectedeElem.dataset.code;
            let link1 = "https://restcountries.com/alpha/"
            let link2 = ccn3;
            let link = link1 + link2;
            let dumpData = await fetch(`'${link}'`)
            console.log(dumpData)
        }

        const backBtn = document.getElementById('backBtn');
        backBtn.addEventListener('click',()=> {
            partTwo.style.display = "block";
            partThree.style.display = "block";
            partFour.style.display = "non"
        })
    }
    filter();

    // helper function
    function filterOutRegions(filterText) {
        let allElems = [...document.getElementsByClassName("elem")];
        for(let each of allElems) {
            each.style.display = "flex";
            if(!(each.dataset.region == filterText)) {
                each.style.display = "none";
            } 
        }
    }
}





