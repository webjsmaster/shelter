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


const MODAL_WRAPPER = document.querySelector('.modal__wrapper')
const MODAL_CONTENT = document.querySelector('.modal__content')
const MODAL_BODY = document.querySelector('.modal__body')
const CLOSE_BTN = document.querySelector('#close-btn')
const BODY_HTML = document.querySelector('body')



function addEventClickCard () {
    ITEM_ACTIVE.childNodes.forEach(el => {
        el.addEventListener('click', () => {
            MODAL_WRAPPER.classList.add('active')
            BODY_HTML.classList.add('active')
            const petsName = el.querySelector('.card__name').textContent
            const PET_JSON_ACTIVE = PETS_JSON.find( pet => pet.name === petsName )
            const modalBodyHtml = `<div class="modal__poster">
                <div class="modal__poster-content">
                    <img src=${PET_JSON_ACTIVE.img} alt="">
                </div>
                </div>
                <div class="modal__description">
                <div class="description__title">${PET_JSON_ACTIVE.name}</div>
                <div class="description__subtitle">${PET_JSON_ACTIVE.type} - ${PET_JSON_ACTIVE.breed}</div>
                <div class="description__content">${PET_JSON_ACTIVE.description}</div>
                <ul class="description__list">
                    <li class="list__item">
                        <div class="list__value">
                            <span>Age:&ensp;</span>${PET_JSON_ACTIVE.age}
                        </div>
                    </li>
                    <li class="list__item">
                        <div class="list__value">
                            <span>Inoculations:&ensp;</span>${PET_JSON_ACTIVE.inoculations}
                        </div>
                    </li>
                    <li class="list__item">
                        <div class="list__value">
                            <span>Diseases:&ensp;</span>${PET_JSON_ACTIVE.diseases}
                        </div>
                    </li>
                    <li class="list__item">
                        <div class="list__value">
                            <span>Parasites:&ensp;</span>${PET_JSON_ACTIVE.parasites}
                        </div>
                    </li>
                </ul>             
                </div>`
            MODAL_BODY.insertAdjacentHTML('beforeend', modalBodyHtml)
        })
    })
}

document.addEventListener('click', (e) => {
    if(((e.target === MODAL_WRAPPER || e.target === MODAL_CONTENT) && e.target !== MODAL_BODY) || e.target === CLOSE_BTN) {
        MODAL_WRAPPER.classList.remove('active');
        BODY_HTML.classList.remove('active')
        MODAL_BODY.replaceChildren()
        
    }

    if(e.target === HEADER_WRAPPER){
        toggleBurgerActive()
    }
});
const BTN = document.querySelector('.header__burger')
const HEADER_WRAPPER = document.querySelector('.header__wrapper')
const MENU = document.querySelector('.header__menu')

const A = MENU.querySelectorAll('a')

if (window.innerWidth < 768) {
    console.log('📢 [burger.js:8]');
    A.forEach ( a => a.addEventListener('click', (e) => {
        e.preventDefault()
        setTimeout(() => window.location.replace(e.target.href), 300)
    })) 
}

BTN.addEventListener('click', () => {
    toggleBurgerActive()
})

MENU.querySelectorAll('a').forEach( a => {
    a.addEventListener('click', () => {
        toggleBurgerActive()
    })
} ) 

function toggleBurgerActive () {
    BTN.classList.toggle('active');
    MENU.classList.toggle('active');
    BODY_HTML.classList.toggle('active');
    HEADER_WRAPPER.classList.toggle('active');
}


console.log(`📢
1️⃣. Реализация burger menu на обеих страницах: +26 \n
    👉 при ширине страницы меньше 768рх панель навигации скрывается, появляется бургер-иконка: +2 \n
    👉 при нажатии на бургер-иконку, справа плавно появляется адаптивное меню шириной 320px, бургер-иконка плавно поворачивается на 90 градусов: +4 \n
    👉 высота адаптивного меню занимает всю высоту экрана: +2 \n
    👉 при повторном нажатии на бургер-иконку или на свободное от бургер-меню пространство адаптивное меню плавно скрывается уезжая за правую часть экрана, бургер-иконка плавно поворачивается на 90 градусов обратно: +4 \n
    👉 бургер-иконка создана при помощи html+css, без использования изображений: +2 \n
    👉 ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям, сохраняются заданные на первом этапе выполнения задания требования интерактивности элементов меню: +2 \n
    👉 при клике по любой ссылке (интерактивной или неинтерактивной) в меню адаптивное меню плавно скрывается вправо, бургер-иконка поворачивается на 90 градусов обратно: +2 \n
    👉 расположение и размеры элементов в бургер-меню соответствует макету (центрирование по вертикали и горизонтали элементов меню, расположение иконки). При этом на странице Pets цветовая схема может быть как темная, так и светлая: +2 \n
    👉 область, свободная от бургер-меню, затемняется: +2 \n
    👉 страница под бургер-меню не прокручивается: +4 \n
2️⃣. Реализация слайдера-карусели на странице Main: +36 \n
    👉 при нажатии на стрелки происходит переход к новому блоку элементов: +4 \n
    👉 смена блоков происходит с соответствующей анимацией карусели (способ выполнения анимации не проверяется): +4 \n
    👉 слайдер бесконечен, т.е. можно бесконечно много нажимать влево или вправо, и каждый раз будет прокрутка в эту сторону с новым набором карточек: +4 \n
    👉 при переключении влево или вправо прокручивается ровно столько карточек, сколько показывается при текущей ширине экрана (3 для 1280px, 2 для 768px, 1 для 320px): +4 \n
    👉 каждый новый слайд содержит псевдослучайный набор карточек животных, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
        => в текущем блоке слайда карточки с питомцами не повторяются: +4 \n
        => в следующем блоке нет дублирования карточек с текущим блоком. Например в слайдере из 3 элементов, следующий выезжающий слайд будет содержать 3 (из 8 доступных) новых карточки питомца, таких, каких не было среди 3х карточек на предыдущем уехавшем слайде: +4 \n
        => сохраняется только одно предыдущее состояние. Т.е. при последовательном переходе два раза влево, а потом два раза вправо, мы получим набор карточек, отличный от исходного: +4 \n
        => при каждой перезагрузке страницы формируется новая последовательность карточек: +2 \n
        => генерация наборов карточек происходит на основе 8 объектов с данными о животных: +2 \n
    👉 при изменении ширины экрана (от 1280px до 320px и обратно), слайдер перестраивается и работает без перезагрузки страницы (набор карточек при этом может как изменяться, так и оставаться тем же, скрывая лишнюю или добавляя недостающую, и сохраняя при этом описанные для слайдера требования): +4 \n
3️⃣. Реализация пагинации на странице Pets: +36 \n
    👉 при перезагрузке страницы всегда открывается первая страница пагинации: +2 \n
    👉 при нажатии кнопок > или < открывается следующая или предыдущая страница пагинации соответственно: +2 \n
    👉 при нажатии кнопок >> или << открывается последняя или первая страница пагинации соответственно: +2 \n
    👉 при открытии первой страницы кнопки << и < неактивны: +2 \n
    👉 при открытии последней страницы кнопки > и >> неактивны: +2 \n
    👉 в кружке по центру указан номер текущей страницы. При переключении страниц номер меняется на актуальный: +2 \n
    👉 каждая страница пагинации содержит псевдослучайный набор питомцев, т.е. формируется из исходных объектов в случайном порядке со следующими условиями:
        => при загрузке страницы формируется массив из 48 объектов питомцев. Каждый из 8 питомцев должен встречаться ровно 6 раз: +4 \n
        => при каждой перезагрузке страницы формируется новый массив со случайной последовательностью: +4 \n
        => карточки питомцев не должны повторяться на одной странице: +4 \n
        => при переключении страницы данные меняются (для >1280px меняется порядок карточек, для остальных - меняется набор и порядок карточек): +4 \n
        => при неизменных размерах области пагинации, в том числе размерах окна браузера, и без перезагрузки страницы, возвращаясь на страницу под определенным номером, контент на ней всегда будет одинаков. Т.е. карточки питомцев будут в том же расположении, что и были до перехода на другие страницы: +2 \n
        => общее количество страниц при ширине экрана 1280px - 6, при 768px - 8, при 320px - 16 страниц: +2 \n
    👉 при изменении ширины экрана (от 1280px до 320px и обратно), пагинация перестраивается и работает без перезагрузки страницы (страница может оставаться той же или переключаться, при этом сформированный массив - общая последовательность карточек - не обновляется, сохраняются все остальные требования к пагинации): +4 \n
4️⃣. Реализация попап на обеих страницах: +12 \n
    👉 попап появляется при нажатии на любое место карточки с описанием конкретного животного: +2 \n
    👉 часть страницы вне попапа затемняется: +2 \n
    👉 при открытии попапа вертикальный скролл страницы становится неактивным, при закрытии - снова активным: +2 \n
    👉 при нажатии на область вокруг попапа или на кнопку с крестиком попап закрывается, при этом при нажатии на сам попап ничего не происходит: +2 \n
    👉 кнопка с крестиком интерактивная: +2 \n
    👉окно попапа (не считая кнопку с крестиком) центрировано по всем осям, размеры элементов попапа и их расположение совпадают с макетом: +2 \n
    📢
    `);
