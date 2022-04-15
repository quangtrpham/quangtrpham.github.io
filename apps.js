const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let i = 0;

let lightToggle,
    mainBody,
    navbarToggle,
    menu,
    blurBackground,
    menuLinks,
    themeSwitch,
    about,
    text,
    contact,
    aboutHeading,
    basicNeeds,
    longTermSavings,
    entertainment,
    privateReserves,
    education,
    charityGifts,
    sendBtn,
    incomeValue,
    error,
    currencySelect,
    textIncome,
    textChange;

const main = $('.main');

let dark = false;
let navbarMenu = false;


function refresh() {
    lightToggle = $('.light-dark-toggle');
    mainBody = $('.main__body');
    navbarToggle = $('.navbar__toggle');
    menu = $('.menu');
    blurBackground = $('.blur-background');
    menuLinks = $$('.menu__links');
    themeSwitch = $('.theme_switch input');
    about = $('.about');
    text = $('.text');
    contact = $('.contact');
    aboutHeading = $('.about__heading')
    basicNeeds = $('.basic-needs')
    longTermSavings = $('.long-term_savings')
    entertainment = $('.entertainment')
    privateReserves = $('.private-reserves')
    education = $('.education')
    charityGifts = $('.charity-and-gifts')
    sendBtn = $('.send_btn');
    incomeValue = $('.income__value');
    error = $('.error');
    currencySelect = $('.currency__select');
    textIncome = $('.text__income h1')
    textChange = $('.text__income h1 span')

};
refresh();

function changeTheme () {
    dark = !dark;
    let clone = mainBody.cloneNode(true);

    if (dark) {
        clone.classList.add('dark')
        clone.classList.remove('light')
    } else {
        clone.classList.remove('dark')
        clone.classList.add('light')
    }
    clone.classList.add('copy')
    main.appendChild(clone)

    scrollRevealPage();

    clone.onanimationend = function () {
        mainBody.remove()
        clone.classList.remove('copy')
        refresh();
        events();
        checkThemeToggle();
        revealElements(text, contact, aboutHeading, basicNeeds, longTermSavings, entertainment, privateReserves, education, charityGifts)
    }
}

// Reveal remain elements after clicking change theme toggle
function revealElements (...params) {
    Array.from(params).forEach((element) => {
        observer.observe(element);
    })
}

let observer = new IntersectionObserver(function(entries) {
    if(entries[0].isIntersecting === true) {
        if(entries[0].target.style.opacity == 0) {
            entries[0].target.style.opacity = 1;
            entries[0].target.style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)';
            entries[0].target.style.visibility = 'visible';
            entries[0].target.style.transition = 'opacity 2.5s cubic-bezier(0.5, 0, 0, 1) 0.1s, transform 2.5s cubic-bezier(0.5, 0, 0, 1) 0.1s';
        }
    }
}, { threshold: [0] });
// 

function scrollRevealPage () {
    ScrollReveal({
        reset: false,
        distance:'60px',
        duration: 2500,
        delay:100,
    
    });

    ScrollReveal().reveal('.text, .contact', { origin: 'bottom' });
    ScrollReveal().reveal('.about__heading', { origin: 'left' });
    ScrollReveal().reveal('.basic-needs, .long-term_savings, .entertainment', { origin: 'left' });
    ScrollReveal().reveal('.private-reserves, .education, .charity-and-gifts', { origin: 'right' });
    

    // Responsive for tablet and mobile phone
    const x = window.matchMedia('(max-width: 1023px)');
    function tabletMobileResponsive (x) {
        if (x.matches) {
            ScrollReveal().reveal('.text', { origin: 'top' });
            ScrollReveal().reveal('.basic-needs, .long-term_savings, .entertainment, .private-reserves, .education, .charity-and-gifts', { origin: 'bottom' });
        }
    };
    tabletMobileResponsive(x);
}

function removeToggle () {
    menu.classList.remove('active')
    blurBackground.classList.remove('toggle-blur')
}

function checkThemeToggle () {
    if (mainBody.classList.contains('dark')) {
        if (themeSwitch.checked === false) {
            themeSwitch.checked = true;
        }
    }

    if (mainBody.classList.contains('light')) {
        if (themeSwitch.checked === true) {
            themeSwitch.checked = false;
        }
    }
}

function type () {
    let text = `HOW DO YOU MANAGE YOUR MONEY? TRY THIS METHOD`
    if (i < text.length) {
        textIncome.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 100);
    }
}

function log () {
    // let x = textIncome.textContent
    // let a = ''
    // for (let i = 30; i < x.length; i++) {
    //     a += x.charAt(i)
    // }

    let text = `HOW DO YOU MANAGE YOUR MONEY? <span>TRY THIS METHOD</span>`
    textIncome.innerHTML = text
    refresh()
    // textChange.style.color = 'red'
    console.log(textChange.textContent)
}

function events () {
    // LIGHT-DARK TOGGLE
    lightToggle.onclick = function () {
        changeTheme();
    }

    // NAVBAR TOGGLE
    navbarToggle.onclick = function () {
        navbarMenu = !navbarMenu
        if (navbarMenu) {
            menu.classList.add('active')
            blurBackground.classList.add('toggle-blur')

            // Close menu when click to links
            Array.from(menuLinks).forEach((menuLink) => {
                menuLink.onclick = function () {
                    if (navbarMenu) {
                        removeToggle();
                    }
                }
            })

            // Close when click to overlay
            blurBackground.onclick = function () {
                removeToggle();
            }

            // Theme will change when click theme-switch toggle
            themeSwitch.onclick = () => {
                changeTheme();
            }

        } else {
            menu.classList.remove('active')
            blurBackground.classList.remove('toggle-blur')
        }
    }

    sendBtn.onclick = function () {
        if (incomeValue.value.trim()) {
            
            if (!isNaN(incomeValue.value)) {
                sessionStorage.setItem('valueOfIncome', incomeValue.value)
                location.href = './pages/calculator.html'
            }else{
                error.textContent = 'This field needs to be a number'
                error.classList.add('show-error')
                console.log(typeof incomeValue.value)
            }
        } else {
            error.textContent = 'This field needs to be filled'
            error.classList.add('show-error')
        }

        sessionStorage.setItem('currency', currencySelect.value)

    }

    incomeValue.oninput = function () {
        if (error.classList.contains('show-error')) {
            error.classList.remove('show-error')
        }
    }

    // Typing text effect
    type();

    setTimeout(log,6000)

    // Scroll reveal whole page
    scrollRevealPage();
    
}
events();


