let PETS_JSON;
let PETS_ARR_RANDOM
const ITEM_ACTIVE = document.querySelector('#item-active');
const BTN_ACTIVE = document.querySelector("#btn-active")
const BTN_PREV = document.querySelector("#btn-prev")
const BTN_START = document.querySelector("#btn-start")
const BTN_NEXT = document.querySelector("#btn-next")
const BTN_END = document.querySelector("#btn-end")

BTN_PREV.disabled = true;
BTN_START.disabled = true;


let PAGE = null
let CURRENT_PAGE = 1
BTN_ACTIVE.innerHTML = CURRENT_PAGE


async function getPets() {
    const response = await fetch('./js/pets.json');
    PETS_JSON = await response.json();
    let arr = []
    for (let i = 0; i < 6; i++) {
        arr = [ ...arr , ...random(PETS_JSON)]
    }
    PETS_ARR_RANDOM = arr
    return arr
}


function random(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
}


function renderPets(pets) {
    ITEM_ACTIVE.replaceChildren()
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

function generatedCard () {
    
}

function generatedNumberOfPages (arr) {
    const screenWidth = window.innerWidth
    if (screenWidth > 1280) {
        PAGE = arr.length / 8
    } else if (screenWidth > 659 && screenWidth <= 1280) {
        PAGE = arr.length / 6
    } else {
        PAGE = arr.length / 3
    }
}

document.querySelector('.friends__button').childNodes.forEach(btn => {
    btn.addEventListener("click", (e) => {
        if (e.target === BTN_NEXT) {
            CURRENT_PAGE++
            BTN_ACTIVE.innerHTML = CURRENT_PAGE
            BTN_PREV.disabled = false;
            BTN_START.disabled = false;
            renderPetsForChangePage(CURRENT_PAGE)
            if (CURRENT_PAGE === PAGE) {
                BTN_NEXT.disabled = true;
                BTN_END.disabled = true;
            }
        }
        if (e.target === BTN_PREV) {
            CURRENT_PAGE--
            BTN_ACTIVE.innerHTML = CURRENT_PAGE
            BTN_NEXT.disabled = false;
            BTN_END.disabled = false;
            renderPetsForChangePage(CURRENT_PAGE)
            if (CURRENT_PAGE === 1) {
                BTN_PREV.disabled = true;
                BTN_START.disabled = true;
            }
        }
        if (e.target === BTN_END) {
            CURRENT_PAGE = PAGE
            BTN_ACTIVE.innerHTML = CURRENT_PAGE
            BTN_PREV.disabled = false;
            BTN_START.disabled = false;
            renderPetsForChangePage(CURRENT_PAGE)
            if (CURRENT_PAGE === PAGE) {
                BTN_NEXT.disabled = true;
                BTN_END.disabled = true;
            }
        }
        if (e.target === BTN_START) {
            CURRENT_PAGE = 1
            BTN_ACTIVE.innerHTML = CURRENT_PAGE
            BTN_NEXT.disabled = false;
            BTN_END.disabled = false;
            renderPetsForChangePage(CURRENT_PAGE)
            if (CURRENT_PAGE === 1) {
                BTN_PREV.disabled = true;
                BTN_START.disabled = true;
            }
        }
    })
})

async function getStarted () {
    const ALL_ARR = await getPets();
    generatedNumberOfPages(ALL_ARR)
    generatedCard();
    renderPetsForChangePage(1);
    // addEventClickCard();
}

window.addEventListener('resize', async (e) => {
    if (e.target.innerWidth > 1280 && PAGE !== 6) {
        PAGE = 6
        unDisabledBtn()
        if (CURRENT_PAGE > 6 ) {
            CURRENT_PAGE = 6
            BTN_ACTIVE.innerHTML = CURRENT_PAGE
            BTN_NEXT.disabled = true;
            BTN_END.disabled = true;
        }
        renderPetsForChangePage (CURRENT_PAGE)
    } else if (e.target.innerWidth > 659 && e.target.innerWidth <= 1280 && PAGE === 6 ) {
        PAGE = 8
        renderPetsForChangePage (CURRENT_PAGE)
        unDisabledBtn()
    } else if (e.target.innerWidth > 659 && e.target.innerWidth <= 1280 && PAGE === 16 ) {
        PAGE = 8
        unDisabledBtn()
        if (CURRENT_PAGE > 8 ) {
            CURRENT_PAGE = 8
            BTN_ACTIVE.innerHTML = CURRENT_PAGE
            BTN_NEXT.disabled = true;
            BTN_END.disabled = true;
        }
        renderPetsForChangePage (CURRENT_PAGE)
    } else if (e.target.innerWidth <= 659 && PAGE === 8 ) {
        PAGE = 16
        renderPetsForChangePage (CURRENT_PAGE)
        unDisabledBtn()
    }
}, true)

function unDisabledBtn () {
    if(CURRENT_PAGE === 1) {
        BTN_NEXT.disabled = false;
        BTN_END.disabled = false;
    } else {
        BTN_PREV.disabled = false;
        BTN_START.disabled = false;
        BTN_NEXT.disabled = false;
        BTN_END.disabled = false;
    }
}


getStarted()


function renderPetsForChangePage (page) {
    const screenWidth = window.innerWidth
    if (screenWidth > 1280) {
        switch (page) {
            case 1:
                renderPets(PETS_ARR_RANDOM.slice(0,8));
                break;
            case 2:
                renderPets(PETS_ARR_RANDOM.slice(8,16));
                break;
            case 3:
                renderPets(PETS_ARR_RANDOM.slice(16,24));
                break;
            case 4:
                renderPets(PETS_ARR_RANDOM.slice(24,32));
                break;
            case 5:
                renderPets(PETS_ARR_RANDOM.slice(32,40));
                break;
            case 6:
                renderPets(PETS_ARR_RANDOM.slice(40,48));
                break;
            default:
                break;
        }
    } else if (screenWidth > 659 && screenWidth <= 1280) {
        switch (page) {
            case 1:
                renderPets(PETS_ARR_RANDOM.slice(0,6));
                break;
            case 2:
                renderPets(PETS_ARR_RANDOM.slice(6,12));
                break;
            case 3:
                renderPets(PETS_ARR_RANDOM.slice(12,18));
                break;
            case 4:
                renderPets(PETS_ARR_RANDOM.slice(18,24));
                break;
            case 5:
                renderPets(PETS_ARR_RANDOM.slice(24,30));
                break;
            case 6:
                renderPets(PETS_ARR_RANDOM.slice(30,36));
                break;
            case 7:
                renderPets(PETS_ARR_RANDOM.slice(36,42));
                break;
            case 8:
                renderPets(PETS_ARR_RANDOM.slice(42,48));
                break;
            default:
                break;
        }
    } else {
        switch (page) {
            case 1:
                renderPets(PETS_ARR_RANDOM.slice(0,3));
                break;
            case 2:
                renderPets(PETS_ARR_RANDOM.slice(3,6));
                break;
            case 3:
                renderPets(PETS_ARR_RANDOM.slice(6,9));
                break;
            case 4:
                renderPets(PETS_ARR_RANDOM.slice(9,12));
                break;
            case 5:
                renderPets(PETS_ARR_RANDOM.slice(12,15));
                break;
            case 6:
                renderPets(PETS_ARR_RANDOM.slice(15,18));
                break;
            case 7:
                renderPets(PETS_ARR_RANDOM.slice(18,21));
                break;
            case 8:
                renderPets(PETS_ARR_RANDOM.slice(21,24));
                break;
            case 9:
                renderPets(PETS_ARR_RANDOM.slice(24,27));
                break;
            case 10:
                renderPets(PETS_ARR_RANDOM.slice(27,30));
                break;
            case 11:
                renderPets(PETS_ARR_RANDOM.slice(30,33));
                break;
            case 12:
                renderPets(PETS_ARR_RANDOM.slice(33,36));
                break;
            case 13:
                renderPets(PETS_ARR_RANDOM.slice(36,39));
                break;
            case 14:
                renderPets(PETS_ARR_RANDOM.slice(39,42));
                break;
            case 15:
                renderPets(PETS_ARR_RANDOM.slice(42,45));
                break;
            case 16:
                renderPets(PETS_ARR_RANDOM.slice(45,48));
                break;
            default:
                break;
        }
    }

    addEventClickCard();

} 


@@include('./popup.js')