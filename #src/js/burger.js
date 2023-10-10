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
