import * as $ from 'jquery';

$(function () {
    // Move Modals
    let modals = document.querySelectorAll('.modal');
    let modalRoot = document.getElementById('modal-root');
    for (var index = 0, length = modals.length; index < length; index++) {
        let modal = modals[index];
        modalRoot.appendChild(modal);
    }
    modals = document.querySelectorAll('.drawer');
    for (var index = 0, length = modals.length; index < length; index++) {
        let modal = modals[index];
        modalRoot.appendChild(modal);
    }

    // Create Hash Change listener
    window.addEventListener('hashchange', function (event) {
        $('.menu-link').removeClass('menu-active');
        $('a[href="' + window.location.hash + '"]').parent().addClass('menu-active');
    });
    $('a[href="' + window.location.hash + '"]').parent().addClass('menu-active');

    $('#clickMenuBarExpander > a').click(function (event) {
        event.preventDefault();
        $('.menu-bar-top').toggleClass('menu-bar-open');
    });

    $('#clickLockableEdit, #clickLockableSave, #clickLockableDelete').click(function (event) {
        var button = $(event.currentTarget);
        (function () {
            button.addClass('button-locked');
            button.attr({
                disabled: true
            });
            var timeout = window.setTimeout(function () {
                button.removeClass('button-locked');
                button.attr({
                    disabled: false
                });
            }, 1000);
        })();
    });

    $('#clickShowPopoverMenu > .popover').click(function (event) {
        event.preventDefault();
        event.stopPropagation();
    });
    var popoverMenuOpen = false;
    $('#clickShowPopoverMenu').click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (popoverMenuOpen) {
            $('#clickShowPopoverMenu').removeClass('button-down').addClass('popover-closed').removeClass('popover-open');
            popoverMenuOpen = false;
        } else {
            $('#clickShowPopoverMenu').addClass('button-down').addClass('popover-open').removeClass('popover-closed');
            popoverMenuOpen = true;
        }
    });

    $('#clickShowNotifications').click(function (event) {
        $('.notification-container').toggleClass('hidden');
    });

    function lockBodyScroll(lock: boolean) {
        let body = document.body;
        let root = document.querySelector('.root');
        if (lock) {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || body.scrollTop || root.scrollTop;
            body.classList.add('body-scroll-lock');
            root.scrollTop = scrollTop;
        } else {
            let scrollTop = root.scrollTop || window.pageYOffset || document.documentElement.scrollTop || body.scrollTop;
            body.classList.remove('body-scroll-lock');
            body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
        }
    }

    var modalHidden = false;
    $('#clickOpenModal, #clickCloseModal, #modal').click(function (event) {
        event.stopPropagation();
        modalHidden = !modalHidden;
        //$('body').toggleClass('scroll-lock', modalHidden);
        $('#modal.modal').toggleClass('modal-open', modalHidden);
        lockBodyScroll(modalHidden);
    });
    $('.modal-content').click(function (event) {
        event.stopPropagation();
    });

    var drawerHidden = false;
    $('#clickOpenDrawer, #clickCloseDrawer, #drawer').click(function (event) {
        event.stopPropagation();
        drawerHidden = !drawerHidden;
        $('#drawer').toggleClass('drawer-open', drawerHidden);
        lockBodyScroll(drawerHidden);
    });
    $('.drawer-content').click(function (event) {
        event.stopPropagation();
    });

    $('.tab-container#tab-regular').each(function (index, element) {
        var ul = $($(element).children()[0]);
        var div = $($(element).children()[1]);
        ul.children().each(function (index, element) {
            $(element).find('a').click(function (event) {
                ul.children().removeClass('tab-active');
                div.children().removeClass('tab-active');
                $(element).addClass('tab-active');
                $(div.children()[index]).addClass('tab-active');
            });
        });
    });

    var timeoutCarousel0;
    var timeoutCarousel1;
    function runCarousel(carouselId, index) {
        // Clear any timeouts
        window.clearTimeout(timeoutCarousel0);
        window.clearTimeout(timeoutCarousel1);

        // Get carousel
        var carousel = $(carouselId);

        // Get old child
        var oldChild = carousel.find('.carousel-selected');
        // Get new child
        var child = $(carousel.children()[index]);

        // Pin carousel height
        carousel.height(carousel.outerHeight());

        // Add carousel-run class
        carousel.addClass('carousel-run');

        // Wait for class to be used
        timeoutCarousel0 = window.setTimeout(function () {

            // Clear any timeouts
            window.clearTimeout(timeoutCarousel0);
            window.clearTimeout(timeoutCarousel1);

            // Remove carousel-selected from all children
            oldChild.removeClass('carousel-selected');

            // Add carousel-selected to new child
            child.addClass('carousel-selected');

            // Change carousel height to match new child
            carousel.height(child.outerHeight());

            // Wait for animation
            timeoutCarousel1 = window.setTimeout(function () {

                // Remove carousel-run class
                carousel.removeClass('carousel-run');

                // Un-pin carousel height
                carousel.height('auto');
            }, 500);
        }, 10);
    }

    let tabIndex = 0;
    $('.tab-container#tab-carousel').each(function (index, element) {
        var ul = $($(element).children()[0]);
        var div = $($(element).children()[1]);
        ul.children().each(function (index, element) {
            $(element).find('a').click(function (event) {
                if (index !== tabIndex) {
                    ul.children().removeClass('tab-active');
                    $(element).addClass('tab-active');
                    runCarousel('#carousel-tab', index);
                    tabIndex = index;
                }
            });
        });
    });

    var carouselIndex = 0;
    var carouselCount = 3;
    $('#clickCarouselNext').click(function (event) {
        carouselIndex++;
        carouselIndex = (carouselIndex + carouselCount) % carouselCount;
        runCarousel('#carousel', carouselIndex);
    });
    $('#clickCarouselBack').click(function (event) {
        carouselIndex--;
        carouselIndex = (carouselIndex + carouselCount) % carouselCount;
        runCarousel('#carousel', carouselIndex);
    });

    var flipIndex = 0;
    var flipCount = 3;
    $('#clickFlipNext').click(function (event) {
        flipIndex++;
        flipIndex = (flipIndex + flipCount) % flipCount;
        runCarousel('#flip', flipIndex);
    });
    $('#clickFlipBack').click(function (event) {
        flipIndex--;
        flipIndex = (flipIndex + flipCount) % flipCount;
        runCarousel('#flip', flipIndex);
    });

    var closed = false;
    var toggleTimeout;
    $('#clickToggleSection').click(function (event) {
        window.clearTimeout(toggleTimeout);
        closed = !closed;
        var section = $('#closedSection')[0];
        var sectionHeader = $('#sectionHeader')[0];
        var sectionContent = $('#sectionContent')[0];
        var button = $(this);
        section.classList.add("section-run");
        if (closed) {
            section.style.height = section.offsetHeight + 'px';
            section.style.height = sectionHeader.offsetHeight + 'px';
            section.classList.add("section-closed");
            toggleTimeout = window.setTimeout(function () {
                section.style.height = 'auto';
                section.classList.remove("section-run");
            }, 220)
        } else {
            var sectionBorder = section.offsetHeight - section.clientHeight;
            section.style.height = sectionBorder / 2 + sectionHeader.offsetHeight + 'px';
            section.classList.remove("section-closed");
            section.style.height = sectionBorder / 2 + sectionHeader.offsetHeight + sectionContent.offsetHeight + 'px';
            toggleTimeout = window.setTimeout(function () {
                section.style.height = 'auto';
                section.classList.remove("section-run");
            }, 220)
        }
    });
    $('#clickLockSection').click(function (event) {
        $('#sectionContent').addClass('locked');
        window.setTimeout(function () {
            $('#sectionContent').removeClass('locked');
        }, 1000);
    });

    $('#clickAnimate').click(function (event) {
        $('.animatable').each(function () {
            if (this.getAttribute('data-direction') === "out") {
                this.setAttribute('data-direction', "in");
            } else {
                this.setAttribute('data-direction', "out");
            }
        });
    });

    var closeableClosed = false;
    var closeableTimeout;
    $('#clickCloseableToggle').click(function (event) {
        window.clearTimeout(closeableTimeout);
        closeableClosed = !closeableClosed;
        var section = $('#closeable')[0];
        var button = $(this);
        section.setAttribute('data-running', 'true');
        if (closeableClosed) {
            section.style.height = section.offsetHeight + 'px';
            section.setAttribute('data-closed', 'true');
            var sectionBorder = section.offsetHeight - section.clientHeight;
            section.style.height = sectionBorder / 2 + 'px';
            closeableTimeout = window.setTimeout(function () {
                section.setAttribute('data-running', 'false');
            }, 220)
        } else {
            var sectionBorder = section.offsetHeight - section.clientHeight;
            section.style.height = sectionBorder / 2 + 'px';
            section.setAttribute('data-closed', 'false');
            section.style.height = sectionBorder / 2 + section.scrollHeight + 'px';
            closeableTimeout = window.setTimeout(function () {
                section.style.height = 'auto';
                section.setAttribute('data-running', 'false');
            }, 220)
        }
    });
});
