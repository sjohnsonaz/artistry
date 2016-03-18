$(function () {

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

    var hidden = true;
    $('#clickOpenModal, #clickCloseModal, .modal-scroll').click(function (event) {
        event.stopPropagation();
        if (hidden) {
            $('.modal').show();
        } else {
            $('.modal').hide();
        }
        hidden = !hidden;
    });

    var carouselIndex = 0;
    var timeout;

    function runCarousel(index) {
        var carousel = $('.carousel');
        var child = $(carousel.children()[index]);
        carousel.height(carousel.height());
        carousel.children().removeClass('carousel-selected');
        carousel.children().removeClass('carousel-selecting');
        child.addClass('carousel-selecting');
        carousel.height(child.height());
        window.clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            child.removeClass('carousel-selecting');
            child.addClass('carousel-selected');
            carousel.height('auto');
        }, 500);
    }

    $('#clickCarouselNext').click(function (event) {
        carouselIndex++;
        runCarousel(carouselIndex);
    });
    $('#clickCarouselBack').click(function (event) {
        carouselIndex--;
        runCarousel(carouselIndex);
    });
});
