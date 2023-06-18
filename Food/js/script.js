window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide')
            item.classList.remove('show')
        })

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide', 'fade');
        tabs[i].classList.add('tabheader__item_active')
    }

    hideTabContent();
    showTabContent()

    tabsParent.addEventListener('click', event => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })

    //Timer
    const deadLine = '2023-04-22';

    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / 1000 * 60 * 60) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return `${num}`
        }
    }

    function setClock(selector, endTime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setClock('.timer', deadLine);

    //nodal window
    const modalTriger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';

        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show')
        document.body.style.overflow = '';
    }

    modalTriger.forEach(item => {
        item.addEventListener('click', openModal)
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    })

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    })

    const modalTimerId = setTimeout(openModal, 50000)

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll)
        }
    }

    window.addEventListener('scroll', showModalByScroll)

    // Menu Cards

    const menuCardsArr = [
        {
            src: "img/tabs/vegy.jpg",
            alt: "vegy",
            title: 'Меню "Фитнес"',
            description: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
            price: 10,
            parentSelector: '.menu .container',

        }, {
            src: "img/tabs/elite.jpg",
            alt: "elite",
            title: 'Меню “Премиум”',
            description: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            price: 15,
            parentSelector: '.menu .container',

        }, {
            src: "img/tabs/post.jpg",
            alt: "post",
            title: 'Меню "Постное"',
            description: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            price: 20,
            parentSelector: '.menu .container',
        }
    ]

    // class MenuCard {
    //     constructor(src, alt, title, description, price, parentSelector, ...classes) {
    //         this.parent = document.querySelector(parentSelector);
    //         this.src = src;
    //         this.alt = alt;
    //         this.title = title;
    //         this.desription = description;
    //         this.price = price;
    //         this.transfer = 27;
    //         this.classes = classes.length > 0 ? classes : ['menu__item'];
    //         this.changeToUAH();
    //     }
    //
    //     changeToUAH() {
    //         this.price = this.price * this.transfer
    //     }
    //
    //     render() {
    //         const element = document.createElement('div');
    //
    //         this.classes.forEach((className) => element.classList.add(className));
    //
    //         element.innerHTML = `
    //             <img src=${this.src} alt=${this.alt}>
    //             <h3 class="menu__item-subtitle">${this.title}</h3>
    //             <div class="menu__item-descr">${this.desription}</div>
    //             <div class="menu__item-divider"></div>
    //             <div class="menu__item-price">
    //                 <div class="menu__item-cost">Цена:</div>
    //                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    //             </div>
    //         `
    //
    //         this.parent.append(element)
    //     }
    // }


    const forms = document.querySelectorAll('form');

    const message = {
        loading: '../img/form/spinner.svg',
        success: 'Loading Complete',
        failure: 'Loading Failure...'
    }

    forms.forEach(item => bindPostDate(item))

    const getResources = async (url) => {
        const res = await fetch(url);

        if(!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    }

// Menu Cards
//     getResources('http://localhost:3000/menu')
//         .then(data => {
//             data.forEach(({img, altimg, title, descr, price}) => {
//                 new MenuCard(img, altimg, title, descr, price, '.menu .container').render()
//             })
//         })

    // getResources('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    axios.get('http://localhost:3000/menu')
        .then(data => createCard(data.data))

    function createCard(cards) {
        cards.forEach(({img, altimg, title, descr, price}) => {
            console.log(img)
            price = price * 27;
            const element = document.createElement('div');
            element.classList.add('menu__item');

            element.innerHTML = `
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            `

            document.querySelector('.menu .container').append(element)
        })
    }

// Forms
    function bindPostDate(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()))

            postData('http://localhost:3000/requests', json)
            .then(data => {
                showThanksModal(message.success);
                setTimeout(() => statusMessage.remove(), 2000)
            }).catch(err => {
                showThanksModal(message.failure);
            }).finally(() => form.reset())
        })
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">x</div>
                <div class="modal__title">${message}</div>
            </div>
        `

        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();

            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();

        }, 4000)
    }

    // Slider
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        current = document.querySelector('#current'),
        total = document.querySelector('#total'),
        slideWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slideWrapper).width;

    let slideIndex = 1;
    let offset = 0;

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0,5s all';
    slideWrapper.style.overflow = 'hidden';


    slides.forEach(slide => {
        slide.style.width = width;
    })

    next.addEventListener('click', () => {
        if(offset == +width.slice(0, width.length -2) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length -2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == slides.length) {
            slideIndex = 1;
        }else {
            slideIndex++
        }

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    })

    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = +width.slice(0, width.length -2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length -2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if(slideIndex == 1) {
            slideIndex = slides.length;
        }else {
            slideIndex--
        }

        if (slideIndex < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    })

    // showSlide(slideIndex);
    //
    // if (slides.length < 10) {
    //     sliderCounterTotal.textContent = `0${slides.length}`
    // } else {
    //     sliderCounterTotal.textContent = slides.length
    // }
    //
    // function showSlide(n) {
    //     if(n > slides.length) {
    //         slideIndex = 1
    //     }else if (n < 1) {
    //         slideIndex = slides.length
    //     }
    //
    //     slides.forEach(slide => {
    //         slide.classList.add('hide');
    //         slide.classList.remove('show');
    //     })
    //
    //     slides[slideIndex-1].classList.add('show');
    //
    //     if (slideIndex < 10) {
    //         sliderCounterCurrent.textContent = `0${slideIndex}`
    //     } else {
    //         sliderCounterCurrent.textContent = slideIndex
    //     }
    // }
    //
    // function plusSlides(n) {
    //     showSlide(slideIndex += n);
    // }
    //
    // sliderBtnPrev.addEventListener('click', () => plusSlides(-1));
    // sliderBtnNext.addEventListener('click', () => plusSlides(1));
})
