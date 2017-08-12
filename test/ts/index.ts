import * as $ from 'jquery';

$(function () {

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
        event.stopPropagation();
    });
    var popoverMenuOpen = false;
    $('#clickShowPopoverMenu').click(function (event) {
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
            let scrollTop = body.scrollTop;
            body.classList.add('body-scroll-lock');
            root.scrollTop = scrollTop;
        } else {
            let scrollTop = root.scrollTop;
            body.classList.remove('body-scroll-lock');
            body.scrollTop = scrollTop;
        }
    }

    var modalHidden = false;
    $('#clickOpenModal, #clickCloseModal, .modal').click(function (event) {
        event.stopPropagation();
        modalHidden = !modalHidden;
        //$('body').toggleClass('scroll-lock', modalHidden);
        $('.modal').toggleClass('modal-open', modalHidden);
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

    var timeout;
    function runCarousel(carouselId, index) {
        var carousel = $(carouselId);
        var child = $(carousel.children()[index]);
        carousel.height(carousel.outerHeight());
        carousel.addClass('carousel-run');
        carousel.children().removeClass('carousel-selected');
        child.addClass('carousel-selected');
        carousel.height(child.outerHeight());
        window.clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            carousel.removeClass('carousel-run');
            carousel.height('auto');
        }, 500);
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

    var closed = false;
    var toggleTimeout;
    $('#clickToggleSection').click(function (event) {
        window.clearTimeout(toggleTimeout);
        closed = !closed;
        var section = $('#closedSection')[0];
        var sectionHeader = $('#sectionHeader')[0];
        var sectionContent = $('#sectionContent')[0];
        var button = $(this);
        if (closed) {
            section.style.height = section.offsetHeight + 'px';
            section.style.height = sectionHeader.offsetHeight + 'px';
        } else {
            var sectionBorder = section.offsetHeight - section.clientHeight;
            section.style.height = sectionBorder / 2 + sectionHeader.offsetHeight + sectionContent.offsetHeight + 'px';
            toggleTimeout = window.setTimeout(function () {
                section.style.height = 'auto';
            }, 220)
        }
    });
    $('#clickLockSection').click(function (event) {
        $('#sectionContent').addClass('locked');
        window.setTimeout(function () {
            $('#sectionContent').removeClass('locked');
        }, 1000);
    });
});
