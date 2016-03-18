$(function () {
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

    window.runCarousel = function (index) {
        var carousel = $('.carousel');
        var child = $(carousel.children()[index]);
        carousel.height(carousel.height());
        carousel.children().removeClass('carousel-selected');
        child.addClass('carousel-selecting');
        carousel.height(child.height());
        window.setTimeout(function () {
            child.removeClass('carousel-selecting');
            child.addClass('carousel-selected');
            carousel.height('auto');
        }, 500);
    }
});
