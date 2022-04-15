const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


let valueOfIncome ,
    currencyValue,
    fiftyFivePercent,
    tenPercent,
    fivePercent,
    lightToggle,
    mainBody,
    navbarToggle,
    menu,
    menuLinks,
    themeSwitch,
    blurBackground;

    const main = $('.main');

    let dark = false;
    let navbarMenu = false;
    
function refresh() {
    lightToggle = $('.light-dark-toggle');
    mainBody = $('.main__body');
    navbarToggle = $('.navbar__toggle');
    menu = $('.menu');
    menuLinks = $$('.menu__links');
    themeSwitch = $('.theme_switch input');
    valueOfIncome = sessionStorage.getItem('valueOfIncome');
    currencyValue = sessionStorage.getItem('currency');
    fiftyFivePercent = $('.fifty-five-percent');
    tenPercent = $$('.ten-percent');
    fivePercent = $('.five-percent');
    blurBackground = $('.blur-background');
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

    clone.onanimationend = function () {
        mainBody.remove()
        clone.classList.remove('copy')
        refresh();
        events();
        checkThemeToggle();
    }
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

    // Calculating the income
    if (typeof valueOfIncome == 'string') {
        if (currencyValue == 'VND') {
            fiftyFivePercent.textContent = Math.round(parseInt(valueOfIncome) * 0.55) + ` ${currencyValue}`;
            fivePercent.textContent = Math.round(parseInt(valueOfIncome) * 0.05) + ` ${currencyValue}`;
        
            Array.from(tenPercent).forEach((ten) => {
                ten.textContent = Math.round(parseInt(valueOfIncome) * 0.1) + ` ${currencyValue}`;
            })
        }
    
        if (currencyValue == 'USD') {
            fiftyFivePercent.textContent = '$' + Math.round(parseInt(valueOfIncome) * 0.55);
            fivePercent.textContent = '$' + Math.round(parseInt(valueOfIncome) * 0.05);
        
            Array.from(tenPercent).forEach((ten) => {
                ten.textContent ='$' + Math.round(parseInt(valueOfIncome) * 0.1);
            })
        }
    }

}
events();

