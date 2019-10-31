//------------- Content Area Min Heihgt -----------
var calculateAndApplyMinHeight = function () {
    var headerHeight = $('.header-area').length > 0 ? $('.header-area').outerHeight() : 0;
    var footerHeight = $('.footer-area').length > 0 ? $('.footer-area').outerHeight() : 0;
    var windowHeight = $(window).outerHeight();
    var contentAreaHeight = windowHeight - (footerHeight + headerHeight);

    $('.content-area').css('min-height', contentAreaHeight > 0 ? contentAreaHeight : 0);
};

$(document).ready(function () {
    calculateAndApplyMinHeight();
});
