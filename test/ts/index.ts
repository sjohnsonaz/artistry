import * as $ from 'jquery';
import BodyScroll from '../../src/scripts/BodyScroll';

$(function () {
    // Move Modals
    let modals = document.querySelectorAll('.modal');
    let overlayLayer = document.getElementById('layer-overlay');
    for (var index = 0, length = modals.length; index < length; index++) {
        let modal = modals[index];
        overlayLayer.appendChild(modal);
    }
    modals = document.querySelectorAll('.drawer');
    for (var index = 0, length = modals.length; index < length; index++) {
        let modal = modals[index];
        overlayLayer.appendChild(modal);
    }

    let notificationContainers = document.querySelectorAll('.notification-container');
    let flyoutLayer = document.getElementById('layer-flyout');
    for (var index = 0, length = notificationContainers.length; index < length; index++) {
        let notificationContainer = notificationContainers[index];
        flyoutLayer.appendChild(notificationContainer);
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

    $('#clickFlipDirection').click(function (event) {
        event.preventDefault();
        var html = $('html');
        if (html.attr('dir') === 'rtl') {
            html.removeAttr('dir');
        } else {
            html.attr('dir', 'rtl');
        }
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

    $('#clickOpenSearch').click(function (event) {
        var search = $('#search');
        if (search.attr('data-open') === 'true') {
            search.removeAttr('data-open');
        } else {
            search.attr('data-open', 'true');
        }
    })

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

    let scrollBarWidth

    (() => {
        BodyScroll.init();
    })();

    let lockStack: {
        scrollTop: number;
        hideScroll: boolean;
    }[] = [];

    function lockBodyScroll(lock: boolean, hideScroll: boolean) {
        if (lock) {
            BodyScroll.lock(hideScroll);
        } else {
            BodyScroll.unlock();
        }
    }

    var modalHidden = false;
    $('#clickOpenModal, #clickCloseModal, #modal > .modal-background').click(function (event) {
        event.stopPropagation();
        modalHidden = !modalHidden;
        //$('body').toggleClass('scroll-lock', modalHidden);
        $('#modal.modal').toggleClass('modal-open', modalHidden);
        lockBodyScroll(modalHidden, true);
    });

    $('.modal').click(function (event) {
        event.stopPropagation();
    });

    $('.modal-content').click(function (event) {
        event.stopPropagation();
    });

    var drawerHidden = false;
    $('#clickOpenDrawer, #clickCloseDrawer, #drawer').click(function (event) {
        event.stopPropagation();
        drawerHidden = !drawerHidden;
        $('#drawer').toggleClass('drawer-open', drawerHidden);
        lockBodyScroll(drawerHidden, true);
    });

    var largeDrawerHidden = false;
    $('#clickOpenLargeDrawer, #clickCloseLargeDrawer, #largeDrawer').click(function (event) {
        event.stopPropagation();
        largeDrawerHidden = !largeDrawerHidden;
        $('#largeDrawer').toggleClass('drawer-open', largeDrawerHidden);
        lockBodyScroll(largeDrawerHidden, true);
    });

    var menuDrawerHidden = false;
    $('#clickOpenMenuDrawer, #clickCloseMenuDrawer, #menuDrawer').click(function (event) {
        event.preventDefault();
        event.stopPropagation();
        menuDrawerHidden = !menuDrawerHidden;
        $('#menuDrawer').toggleClass('drawer-open', menuDrawerHidden);
        lockBodyScroll(menuDrawerHidden, true);
    });

    $('.drawer').click(function (event) {
        event.stopPropagation();
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

            var borderHeight = 2 * (sectionHeader.offsetHeight - sectionHeader.clientHeight);
            var headerHeight = sectionHeader.clientHeight + borderHeight;
            section.style.height = headerHeight + 'px';
            toggleTimeout = window.setTimeout(function () {
                section.style.height = 'auto';
                section.classList.add("section-closed");
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

    var filled = false;
    var fillableTimeout;
    $('#clickFillableToggle').click(function (event) {
        window.clearTimeout(fillableTimeout);
        filled = !filled;
        var fillable = $('#fillable')[0] as HTMLDivElement;
        var fillableContent = fillable.children[0] as HTMLDivElement;
        var card = fillableContent.children[0] as HTMLDivElement;
        var button = $(this);
        //fillable.setAttribute('data-running', 'true');
        if (!filled) {
            let rect = fillable.getBoundingClientRect();
            fillableContent.style.top = rect.top + 'px';
            fillableContent.style.bottom = window.innerHeight - rect.top - rect.height + 'px';
            fillableContent.style.left = rect.left + 'px';
            fillableContent.style.right = document.body.scrollWidth - rect.left - rect.width + 'px';
            window.setTimeout(function () {
                fillableContent.style.top = null;
                fillableContent.style.bottom = null;
                fillableContent.style.left = null;
                fillableContent.style.right = null;
                fillable.style.height = null;
                fillable.style.width = null;
                fillable.setAttribute('data-filled', 'false');
                card.classList.remove('card-square');
            }, 220);
        } else {
            let rect = fillable.getBoundingClientRect();
            fillable.style.height = rect.height + 'px';
            fillable.style.width = rect.width + 'px';
            fillableContent.style.top = rect.top + 'px';
            fillableContent.style.bottom = window.innerHeight - rect.top - rect.height + 'px';
            fillableContent.style.left = rect.left + 'px';
            fillableContent.style.right = document.body.scrollWidth - rect.left - rect.width + 'px';
            fillable.setAttribute('data-filled', 'true');
            card.classList.add('card-square');
            window.setTimeout(function () {
                fillableContent.style.top = 0 + 'px';
                fillableContent.style.bottom = 0 + 'px';
                fillableContent.style.left = 0 + 'px';
                fillableContent.style.right = 0 + 'px';
            }, 20);
        }
    });

    let breadcrumbHeader = document.querySelector('.action-bar-breadcrumb');
    let breadcrumbDropdown = document.querySelector('.action-bar-dropdown');
    let breadcrumbChildren = document.querySelectorAll('.action-bar-breadcrumb > *:not(.action-bar-dropdown');
    let hiddenCount = 0;
    let breadcrumbChildrenObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                if (entry.target.classList.contains('action-bar-breadcrumb-item-hidden')) {
                    entry.target.classList.remove('action-bar-breadcrumb-item-hidden');
                    hiddenCount--;
                }
            } else {
                if (!entry.target.classList.contains('action-bar-breadcrumb-item-hidden')) {
                    entry.target.classList.add('action-bar-breadcrumb-item-hidden');
                    hiddenCount++;
                }
            }
        });
        if (hiddenCount > 0) {
            breadcrumbHeader.setAttribute('data-align','end');
            breadcrumbDropdown.classList.remove('action-bar-breadcrumb-item-hidden');
        } else {
            breadcrumbHeader.removeAttribute('data-align');
            breadcrumbDropdown.classList.add('action-bar-breadcrumb-item-hidden');
        }
    }, {
        root: breadcrumbHeader,
        rootMargin: '0px',
        threshold: 1
    });
    breadcrumbChildren.forEach(child => breadcrumbChildrenObserver.observe(child));
});
