window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;

        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Timer
    // Задали дату окончания
    let deadline = '2019-05-10';

    // Определяем сколько осталось часов, минут и секнд до даты
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date());

        if (t > 0) {
            let seconds = Math.floor((t/1000) % 60),
                minutes = Math.floor((t/1000/60) % 60),
                hours = Math.floor((t/1000/60/60) % 24),
                days = Math.floor(t/1000/60/60/24);

            return {
                'total' : t + '',
                'days' : days + '',
                'hours' : hours + '',
                'minutes' : minutes + '',
                'seconds' : seconds + ''
            };
        } else {
            return {
                'total' : '0',
                'days' : '0',
                'hours' : '0',
                'minutes' : '0',
                'seconds' : '0'
            }
        }   
    }

    // Задаем часы
    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            for (let key in t) {
                if (t[key].length < 2 && key != 'days') {
                    t[key] = '0' + t[key];
                }
            }
            switch (t.days) {
                case '0':
                    t.days = '';
                    break;
                case '1':
                    t.days += ' day';
                    break;
                default:
                    t.days += ' days';
                    break;
            }

            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('timer', deadline);

    // Плавная прокрутка пунктов меню
    let menuPanel = document.querySelector('ul'),
        menuItems = document.querySelectorAll('li > a'),
        refs = [
            document.querySelector('.info-header'),
            document.querySelector('.slider-title'),
            document.querySelector('.counter-title'),
            document.querySelector('.contact-form')
        ];
        menuItems.forEach(function(item) {
        item.classList.add('menu-item');
    });
    menuPanel.addEventListener('click', function(event) {
        event.preventDefault();

        let target = event.target;

        if (target && target.classList.contains('menu-item')) {
            
            // давно придуманный велосипед
            for (let i = 0; i < menuItems.length; i++) {
                if (target == menuItems[i]) {
                    document.querySelector(menuItems[i].getAttribute('href')).scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }

            // мой велосипед (есть баги)
            // for (let i = 0; i < menuItems.length; i++) {
            //     if (target == menuItems[i]) {
            //         let margin = 20,
            //             startDistance = refs[i].getBoundingClientRect().top - menuPanel.clientHeight - margin,
            //             step = 0,
            //             distance = 0,
            //             velocity = 0,
            //             interval = 0.6,
            //             acceleration = startDistance/Math.pow(interval/2, 2),
            //             int = 10,
            //             timeInt = setInterval(goTo, int);
                    
            //         if (i == 0) {
            //             margin = 60;
            //         }

            //         //функция движения с постоянным ускорением
            //         function goTo() {
            //             distance = refs[i].getBoundingClientRect().top - menuPanel.clientHeight - margin;
            //             //сравниваем с максимальной скоростью на середине пути
            //             if (velocity == acceleration*(interval/2)) {
            //                 acceleration = -startDistance/Math.pow(interval/2, 2);
            //             }
            //             velocity += acceleration * int/1000;
            //             step = velocity * int/1000;
            //             //сравниваем с 0, на случай плохой сетки
            //             if (velocity == 0) {
            //                 step = distance;
            //             }
            //             //сравниваем с 1, на случай близкого расстояния
            //             if (step < 1 && step > 0) {
            //                 step = 1;
            //             }
            //             if (step > -1 && step < 0) {
            //                 step = -1;
            //             }
            //             //сравниваем с текущим расстоянием
            //             if ((step < distance && startDistance >= 0) || (step > distance && startDistance < 0)) {
            //                 scrollBy(0, step);
            //             } else {
            //                 scrollBy(0, distance);
            //             }

            //             distance = refs[i].getBoundingClientRect().top - menuPanel.clientHeight - margin;
            //             // console.log(distance, step, velocity, acceleration);

            //             if (distance == 0) {
            //                 clearInterval(timeInt);
            //             }
            //         }
            //     }
            // }
        }
    });

    // Модальное окна
    // проверяем на браузер
    if (navigator.userAgent.search(/MSIE/) == -1 && navigator.userAgent.search(/EDGE/) == -1) {
        let more = document.querySelector('.more > a'),
            overlay = document.querySelector('.overlay'),
            close = document.querySelector('.popup-close'),
            popup = document.querySelector('.overlay *'),
            tabBtns = document.querySelectorAll('.description-btn > a'),
            fade = document.querySelectorAll('.fade')[8];

        console.log('+');

        document.body.addEventListener('click', function (event) {
            event.preventDefault();
            for (let i = 0; i < tabBtns.length; i++) {
                if (event.target && (event.target == more || event.target == tabBtns[i])) {
                    //удаляем анимацию изначально
                    fade.classList.remove('fade');
                    //если не мобильное устройство, то добавляем анимацию
                    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
                        more.classList.add('more-splash');
                        tabBtns[i].classList.add('more-splash');
                        fade.classList.add('fade');
                    }
                    //показываем модальное окно
                    overlay.style.display = 'block';
                    //запрещаем прокрутку страницы
                    document.body.style.overflow = 'hidden';
                }
            }
        });

        // скрываем при нажатии на крестик
        close.addEventListener('click', function (event) {
            event.preventDefault();
            overlay.style.display = 'none';
            more.classList.remove('more-splash');
            for (let i = 0; i < tabBtns.length; i++) {
                tabBtns[i].classList.remove('more-splash');
            }
            document.body.style.overflow = '';
        });
        // скрываем при нажатии в область вне модального окна
        overlay.addEventListener('click', function(event) {
            event.preventDefault();
            if (event.target && !popup.contains(event.target)) {
                overlay.style.display = 'none';
                more.classList.remove('more-splash');
                for (let i = 0; i < tabBtns.length; i++) {
                    tabBtns[i].classList.remove('more-splash');
                }
                document.body.style.overflow = '';
            }
        });
    }

});