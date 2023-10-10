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