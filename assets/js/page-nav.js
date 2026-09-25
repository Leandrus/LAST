/**
 * @file page-nav.js
 * @author Leandrus (Automovilismo Virtual - https://av.leandrus.net)
 * @description Manages single-page navigation and scroll behavior for index.html:
 * - Smooth animated scrolling between landing page sections.
 * - Dynamic scrollspy functionality highlighting the current active navigation item.
 * - Header logo visibility toggling using IntersectionObserver based on hero logo position.
 */

// Mark the first navigation item as active on initial load
$('.nav li:first').addClass('active');

/**
 * Scrolls the viewport to the target section identified by section hash or data-section attribute.
 * @param {string} section - Selector or hash identifying the target section (e.g., '#section2').
 * @param {boolean} isAnimate - Whether to perform animated smooth scrolling (true) or instant jump (false).
 */
var showSection = function showSection(section, isAnimate) {
  var
    direction = section.replace(/#/, ''),
    reqSection = $('.section').filter('[data-section="' + direction + '"]'),
    reqSectionPos = reqSection.offset().top - 0;

  if (isAnimate) {
    $('body, html').animate({
      scrollTop: reqSectionPos
    }, 800);
  } else {
    $('body, html').scrollTop(reqSectionPos);
  }
};

/**
 * Checks the current scroll position against all sections on the page
 * and updates the active CSS class on the corresponding navigation link.
 */
var checkSection = function checkSection() {
  $('.section').each(function () {
    var
      $this = $(this),
      topEdge = $this.offset().top - 80,
      bottomEdge = topEdge + $this.height(),
      wScroll = $(window).scrollTop();
    if (topEdge < wScroll && bottomEdge > wScroll) {
      var
        currentId = $this.data('section'),
        reqLink = $('a').filter('[href*=\\#' + currentId + ']');
      reqLink.closest('li').addClass('active').
        siblings().removeClass('active');
    }
  });
};

// Handle in-page smooth scroll clicks on navigation links
$('.main-menu, .scroll-to-section').on('click', 'a', function (e) {
  if ($(e.target).hasClass('external')) {
    return;
  }
  e.preventDefault();
  $('#menu').removeClass('active');
  showSection($(this).attr('href'), true);
});

// Update active navigation item on window scroll
$(window).scroll(function () {
  checkSection();
});

/**
 * Header logo visibility controller:
 * Uses IntersectionObserver to reveal the fixed navbar logo only when the
 * main hero banner logo has scrolled out of the viewport.
 */
$(document).ready(function () {
  var headerLogo = $('.header-logo');
  var mainLogo = $('.main-logo')[0];

  if (mainLogo && headerLogo.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        headerLogo.removeClass('show-logo');
      } else {
        headerLogo.addClass('show-logo');
      }
    }, { threshold: [0] });

    observer.observe(mainLogo);
  }
});

