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
        let dumpData = await fetch("https://restcountries.com/v3.1/all/")
        let jsonData = await dumpData.json();
        return jsonData
    }

    let holderArray = []
    async function putData() {
        let data = await fetchData();
        // // testing function
        // console.log(data)
        // // test end

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
        node.dataset.code = cData["cca2"]
        return "done";
    }

    async function filter() {
        let load = await putData();
        let regions = [...dropContent.getElementsByTagName('p')]


        for(let i of regions) {
            i.addEventListener('click',()=> {
                document.getElementById('appliedFilter').innerText = i.innerText;
                dropContent.classList.toggle("show");
                arrow.classList.toggle("invert");
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
            let cca2 = selectedeElem.dataset.code;
            let link1 = `https://restcountries.com/v3.1/alpha/${cca2}`
            let data = await fetch(link1);
            let selectedCountryInfo = await data.json();
            fillCountryInfo(selectedCountryInfo)
        }

        const backBtn = document.getElementById('backBtn');
        backBtn.addEventListener('click',()=> {
            partTwo.style.display = "block";
            partThree.style.display = "block";
            partFour.style.display = "none"
        })

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

        async function fillCountryInfo(info) {
            let imgInfo = document.getElementsByClassName("cImgInfo")[0];
            let infoCName = document.getElementsByClassName("infoCName")[0];
            let cInfoPop = document.getElementsByClassName("cInfoPop")[0];
            let cInfoReg = document.getElementsByClassName("cInfoReg")[0];
            let cInfoCap = document.getElementsByClassName("cInfoCap")[0];
            let cInfoSReg = document.getElementsByClassName("cInfoSReg")[0];
            let cInfoNatName = document.getElementsByClassName("cInfoNatName")[0];
            let cInfoTld = document.getElementsByClassName("cInfoTld")[0];
            let cInfoCurr = document.getElementsByClassName("cInfoCurr")[0];
            let cInfoLan = document.getElementsByClassName("cInfoLan")[0];
            let btnSet = document.getElementsByClassName("btnSet")[0];
            imgInfo.src = info[0]["flags"]["svg"];
            infoCName.innerText = info[0]["name"]["common"];
            cInfoNatName.innerText = info[0]["name"]["common"];
            let populationNum = info[0]["population"].toLocaleString('en-us');
            cInfoPop.innerText = populationNum;
            cInfoReg.innerText = info[0]["region"];
            cInfoCap.innerText = info[0]["capital"]
            cInfoSReg.innerText = info[0]["subregion"]
            fillCurrency(cInfoCurr,info[0]["currencies"])
            fillLanguages(cInfoLan,info[0]["languages"])
            await fillBorders(btnSet,info[0])
            // cInfoCurr.innerText = info[0]["currencies"][0]["name"]
            // console.log(info[0])
        }
        
        function fillCurrency(elem,data) {
            let currency = []
            for(let key in data) {
                currency.push(data[key]["name"])
            }
            let cur = currency.toString()
            elem.innerText = cur;
        }

        function fillLanguages(elem,data) {
            let lang = [];
            for(let key in data) {
                lang.push(data[key])
            }
            let languages = lang.toString()
            elem.innerText = languages;
        }

        async function fillBorders(elem,data) {
            let borders = []
            let counter = 0;
            if(data.hasOwnProperty("borders")) {
                for(let i of data["borders"]) {
                    counter++;
                    if(counter > 3) { break}
                    borders.push(i)
                }
            } else {
                return "undefined";
            }
            let countryNames = await findCountryNames(borders)
            let btns = [...elem.getElementsByTagName('button')];
            for(let k of btns) {
                k.remove();
            }
            for(let i of countryNames) {
                let btnElem = document.createElement('button');
                btnElem.innerText = i;
                elem.appendChild(btnElem)
            }
        }

        async function findCountryNames(borders) {
            let cNames = [];
            for(let cCode of borders) {
                let link1 = `https://restcountries.com/v3.1/alpha/${cCode}`
                let data = await fetch(link1);
                let countryInfo = await data.json();
                cNames.push(countryInfo[0]["name"]["common"])
            }
            return cNames;
        }   

    }
    filter();

    
}





