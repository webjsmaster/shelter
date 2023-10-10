const BTN_RIGHT = document.querySelector('#btn-right')
const BTN_LEFT = document.querySelector('#btn-left')

const BODY = document.querySelector('#body')

const ITEM_RIGHT = document.querySelector('#item-right')
const ITEM_ACTIVE = document.querySelector('#item-active')
const ITEM_LEFT = document.querySelector('#item-left')

let PETS_JSON;
let PETS_ARR_FIRST;
let PETS_ARR_SECOND;
let PETS_ARR_THIRD;

let COUNT_RIGHT = 0;
let COUNT_LEFT = 0;

const moveRight = () => {
    BODY.classList.add('tr-right')
    BTN_LEFT.removeEventListener('click', moveLeft)
    BTN_RIGHT.removeEventListener('click', moveRight)
}

const moveLeft = () => {
    BODY.classList.add('tr-left')
    BTN_LEFT.removeEventListener('click', moveLeft)
    BTN_RIGHT.removeEventListener('click', moveRight)
}

BTN_RIGHT.addEventListener('click', moveRight)
BTN_LEFT.addEventListener('click', moveLeft)

BODY.addEventListener('animationend', async (event) => {
    if (event.animationName === 'move-left' || event.animationName === 'move-left-tablet' || event.animationName === 'move-left-mobil') {
        BODY.classList.remove('tr-left')
        BTN_LEFT.addEventListener('click', moveLeft)
        BTN_RIGHT.addEventListener('click', moveRight)
    
        ITEM_LEFT.replaceChildren()
        ITEM_RIGHT.replaceChildren()
        ITEM_ACTIVE.replaceChildren()

        if ( COUNT_LEFT > 0) {
            PETS_ARR_FIRST = PETS_ARR_SECOND
            PETS_ARR_SECOND = PETS_ARR_THIRD
        } else if ( COUNT_LEFT === 0 && COUNT_RIGHT === 0){       
            PETS_ARR_SECOND = PETS_ARR_THIRD
        } else if ( COUNT_RIGHT !== 0 ){
            const REPLASE = PETS_ARR_SECOND
            PETS_ARR_SECOND = PETS_ARR_FIRST
            PETS_ARR_FIRST = REPLASE
            PETS_ARR_THIRD = REPLASE
        }
     
        await randomNextGroup(PETS_JSON, PETS_ARR_SECOND).then( res => {
            PETS_ARR_THIRD = res
        })

        renderPetsRightBlock(PETS_ARR_THIRD)
        renderPetsActiveBlock(PETS_ARR_SECOND)
        renderPetsLeftBlock(PETS_ARR_FIRST)

        addEventClickCard()

        COUNT_RIGHT = 0
        COUNT_LEFT ++
    } else {
        BODY.classList.remove('tr-right')
        BTN_LEFT.addEventListener('click', moveLeft)
        BTN_RIGHT.addEventListener('click', moveRight)

        ITEM_LEFT.replaceChildren()
        ITEM_RIGHT.replaceChildren()
        ITEM_ACTIVE.replaceChildren()

        if ( COUNT_RIGHT > 0) {
            PETS_ARR_FIRST = PETS_ARR_SECOND
            PETS_ARR_SECOND = PETS_ARR_THIRD
        } else if (COUNT_LEFT !== 0) {
            const REPLASE = PETS_ARR_SECOND
            PETS_ARR_SECOND = PETS_ARR_FIRST
            PETS_ARR_THIRD = REPLASE
            PETS_ARR_FIRST = REPLASE
        }
     
        await randomNextGroup(PETS_JSON, PETS_ARR_SECOND).then( res => {
            PETS_ARR_THIRD = res
        })

        renderPetsRightBlock(PETS_ARR_FIRST)
        renderPetsActiveBlock(PETS_ARR_SECOND)
        renderPetsLeftBlock(PETS_ARR_THIRD)

        addEventClickCard()
  
        COUNT_LEFT = 0
        COUNT_RIGHT ++
    }
})


getPets().then( petsArray => {
    PETS_ARR_FIRST = petsArray.firstGroupElement
    PETS_ARR_SECOND = petsArray.secondGroupElement
    PETS_ARR_THIRD = petsArray.thirdGroupElement
    renderPetsActiveBlock(petsArray.firstGroupElement)
    renderPetsLeftBlock(petsArray.secondGroupElement)
    renderPetsRightBlock(petsArray.thirdGroupElement)
    addEventClickCard()
})


window.addEventListener('resize', async (e) => {
    if (e.target.innerWidth > 1270 && ITEM_LEFT.children.length !== 3) {
        rerender()
    } else if (e.target.innerWidth > 768 && e.target.innerWidth <= 1270 && ITEM_LEFT.children.length === 3 ) {
        rerender()
    } else if (e.target.innerWidth > 768 && e.target.innerWidth <= 1270 && ITEM_LEFT.children.length === 1 ) {
        rerender()
    } else if (e.target.innerWidth <= 768 && ITEM_LEFT.children.length === 2 ) {
        rerender()
    }
}, true)



async function getPets() {
    const response = await fetch('./js/pets.json');
    PETS_JSON = await response.json()
    const petsArray = random(PETS_JSON)
    return petsArray
}



function renderPetsLeftBlock(pets) {
    pets.forEach(function (pet) {
        const petsCardHtml = `<div class="slider__card">
        <div class="card__image">
            <img src="${pet.img}" alt="katrine" />
        </div>
        <h3 class="card__name">${pet.name}</h3>
        <div class="card__button">
            <button>Learn more</button>
        </div>
        </div>`;
        ITEM_LEFT.insertAdjacentHTML('beforeend', petsCardHtml);
    });
};

function renderPetsActiveBlock(pets) {
    pets.forEach(function (pet) {
        const petsCardHtml = `<div class="slider__card">
        <div class="card__image">
            <img src="${pet.img}" alt="katrine" />
        </div>
        <h3 class="card__name">${pet.name}</h3>
        <div class="card__button">
            <button>Learn more</button>
        </div>
        </div>`;
        ITEM_ACTIVE.insertAdjacentHTML('beforeend', petsCardHtml);
    });
};

function renderPetsRightBlock(pets) {
    pets.forEach(function (pet) {
        const petsCardHtml = `<div class="slider__card">
        <div class="card__image">
            <img src="${pet.img}" alt="katrine" />
        </div>
        <h3 class="card__name">${pet.name}</h3>
        <div class="card__button">
            <button>Learn more</button>
        </div>
        </div>`;
        ITEM_RIGHT.insertAdjacentHTML('beforeend', petsCardHtml);
    });
};

let randomNextGroup = async (petsArray, exist) => {
    let randomArr = [];
    let existArr = [];
    let length = 0
    await petsArray.forEach((el,i) => {   
        if(exist.indexOf(el) != -1){
            existArr.push(i+1)
        } 
    });

    const screenWidth = window.innerWidth

 
    if (screenWidth > 1270) {
        length = 3
    } else if (screenWidth > 767 && screenWidth <= 1270) {
        length = 2
    } else {
        length = 1
    }

    while (randomArr.length < length) {
        let r = Math.floor(Math.random() * 8) + 1;
        if(randomArr.indexOf(r) === -1 && !existArr.includes(r)) randomArr.push(r);
    }

    let element = []

    await petsArray.forEach((el,i) => {   
        if(randomArr.indexOf(i+1) != -1){
            element.push(el)
        } 
    });

    return element
}


let random = (petsArray) => {
    let randomArr = [];

    let firstGroupIndex = randomArr.slice(0,3)
    let secondGroupIndex = randomArr.slice(3,6)
    let thirdGroupIndex = randomArr.slice(5,8)

    while (randomArr.length < 8) {
        let r = Math.floor(Math.random() * 8) + 1;
        if(randomArr.indexOf(r) === -1) randomArr.push(r);
    }

    const screenWidth = window.innerWidth


    if (screenWidth > 1270) {
        firstGroupIndex = randomArr.slice(0,3)
        secondGroupIndex = randomArr.slice(3,6)
        thirdGroupIndex = randomArr.slice(5,8)
    } else if (screenWidth > 767 && screenWidth <= 1270) {
        firstGroupIndex = randomArr.slice(0,2)
        secondGroupIndex = randomArr.slice(2,4)
        thirdGroupIndex = randomArr.slice(4,6)
    } else {
        firstGroupIndex = randomArr.slice(0,1)
        secondGroupIndex = randomArr.slice(1,2)
        thirdGroupIndex = randomArr.slice(2,3)
    }


    let firstGroupElement = []
    let secondGroupElement = []
    let thirdGroupElement = []

    petsArray.forEach((el,i) => {   
        if(firstGroupIndex.indexOf(i+1) != -1){
            firstGroupElement.push(el)
        } 
        
        if (secondGroupIndex.indexOf(i+1) != -1){
            secondGroupElement.push(el)
        }

        if (thirdGroupIndex.indexOf(i+1) != -1){
            thirdGroupElement.push(el)
        }
    });
    return {firstGroupElement, secondGroupElement, thirdGroupElement}
}


function rerender () {
    getPets().then( petsArray => {
        ITEM_LEFT.replaceChildren()
        ITEM_RIGHT.replaceChildren()
        ITEM_ACTIVE.replaceChildren()
        PETS_ARR_FIRST = petsArray.firstGroupElement
        PETS_ARR_SECOND = petsArray.secondGroupElement
        PETS_ARR_THIRD = petsArray.thirdGroupElement
        renderPetsActiveBlock(petsArray.firstGroupElement)
        renderPetsLeftBlock(petsArray.secondGroupElement)
        renderPetsRightBlock(petsArray.thirdGroupElement)
        addEventClickCard()
    })
    COUNT_LEFT = 0
    COUNT_RIGHT = 0 
}


@@include('./popup.js')