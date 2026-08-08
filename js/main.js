/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    //When the scroll is greater than 50 viewport height, add
    if(this.scrollY >=50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader);
/*=============== SERVICES MODAL ===============*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalClose = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
    modalViews[modalClick].classList.remove('modal-out')
}

modalBtns.forEach((mb, i) => {
    mb.addEventListener('click', () => {
        modal(i)
    })
})

modalClose.forEach((mc) => {
    mc.addEventListener('click', ()=>{
        modalViews.forEach((mv)=>{
            mv.classList.remove('active-modal')
            mv.classList.add('modal-out')
        })
    })
})
/*=============== MIXITUP FILTER PORTFOLIO ===============*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});
/* Link active work */ 
const lineWork = document.querySelectorAll('.work__item')

function activeWork(){
    lineWork.forEach(l=> l.classList.remove('active-work'))
    this.classList.add('active-work')
}

lineWork.forEach(l=> l.addEventListener('click', activeWork))

// /*=============== SWIPER TESTIMONIAL ===============*/

let testimonialSwiper = new Swiper(".testimonial__container", {
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },

    breakpoints: {
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 48
        },
    },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current. offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)
/*=============== LIGHT DARK THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const lightTheme = 'light-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(lightTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx bx-moon' : 'bx bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](lightTheme)
  themeButton.classList[selectedIcon === 'bx bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the light / icon theme
    document.body.classList.toggle(lightTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    // reset: true,
})

const sr2 = ScrollReveal({
    origin: 'bottom',
    distance: '40px',
    duration: 1500,
})

sr.reveal(`.home__container`, {origin: 'top'})
sr.reveal(`.home__social, .home__scroll`, {delay: 900, origin: 'bottom'})
sr2.reveal(`#about__me, #about__me-sub, #skills__sub, #skills__title, #services__sub, #services__title, #work__sub, #work__title, #testimonial__sub, #testimonial__title, #contact__sub, #contact__title`, { origin: 'bottom'})
sr2.reveal(`.about__container, .skills__container, .services__container, .work__container, .work__filters, .testimonial__container, .contact__container`, {delay: 500,origin: 'bottom'})


/*=============== RATING SITE ===============*/
const allStars = document.querySelector('.stars')
const star1 = document.querySelector('.star1')
const star2 = document.querySelector('.star2')
const star3 = document.querySelector('.star3')
const star4 = document.querySelector('.star4')
const star5 = document.querySelector('.star5')

star1.addEventListener('click', ()=> {
    star1.classList.add('checked')
})

star2.addEventListener('click', ()=> {
    star1.classList.add('checked')
    star2.classList.add('checked')
})
star3.addEventListener('click', ()=> {
    star1.classList.add('checked')
    star2.classList.add('checked')
    star3.classList.add('checked')
})
star4.addEventListener('click', ()=> {
    star1.classList.add('checked')
    star2.classList.add('checked')
    star3.classList.add('checked')
    star4.classList.add('checked')
})
star5.addEventListener('click', ()=> {
   allStars.classList.add('checked')
})