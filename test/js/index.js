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

    $('#clickShowNotifications').click(function (event) {
        $('.notification-container').toggleClass('hidden');
    });

    $('.tab-container').each(function (index, element) {
        var ul = $($(element).children()[0]);
        var div = $($(element).children()[1]);
        ul.children().each(function (index, element) {
            $(element).first('a').click(function (event) {
                ul.children().removeClass('tab-active');
                div.children().removeClass('tab-active');
                $(element).addClass('tab-active');
                $(div.children()[index]).addClass('tab-active');
            });
        });
    });

    var hidden = false;
    $('#clickOpenModal, #clickCloseModal, .modal').click(function (event) {
        event.stopPropagation();
        hidden = !hidden;
        //$('body').toggleClass('scroll-lock', hidden);
        $('.modal').toggleClass('modal-open', hidden);
    });
    $('.modal-content').click(function (event) {
        event.stopPropagation();
    });

    var carouselIndex = 0;
    var carouselCount = 3;
    var timeout;

    function runCarousel(index) {
        var carousel = $('.carousel');
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

    $('#clickCarouselNext').click(function (event) {
        carouselIndex++;
        carouselIndex = (carouselIndex + carouselCount) % carouselCount;
        runCarousel(carouselIndex);
    });
    $('#clickCarouselBack').click(function (event) {
        carouselIndex--;
        carouselIndex = (carouselIndex + carouselCount) % carouselCount;
        runCarousel(carouselIndex);
    });

    var closed = false;
    var toggleTimeout;
    $('#clickToggleSection').click(function (event) {
        window.clearTimeout(toggleTimeout);
        closed = !closed;
        var section = $('#closedSection')[0];
        var sectionHeader = $('#sectionHeader')[0];
        var sectionContent = $('#sectionContent')[0]
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
