/**
 * @file custom.js
 * @author Leandrus (Automovilismo Virtual - https://av.leandrus.net)
 * @description General custom scripts for the Team LAST website, including:
 * - Mobile responsive navigation menu toggling.
 * - Dynamic sponsor spotlight panel synchronized with Owl Carousel.
 * - Interactive click-to-center functionality for carousel items.
 * - Simulator feature card hover animations.
 */
(function ($) {

	$(document).ready(function () {
		// Enable JS styling flag on the body
		$('body').addClass('js');

		var $menu = $('#menu'),
			$menulink = $('.menu-link');

		// Toggle mobile navigation menu visibility
		$menulink.click(function () {
			$menulink.toggleClass('active');
			$menu.toggleClass('active');
			return false;
		});
	});

	/**
	 * Synchronizes the sponsor spotlight section with the active center item of the Owl Carousel.
	 * Reads metadata attributes (data-sponsor-id, data-title, data-img) and the description HTML
	 * from the hidden sponsor repository, then smoothly transitions the display container.
	 */
	function updateSponsorInfo() {
		setTimeout(function () {
			var $center = $('.partners-carousel').find('.owl-item.active.center .item');
			if ($center.length > 0) {
				var sponsorId = $center.data('sponsor-id');
				var $sponsorData = $('#' + sponsorId);
				if ($sponsorData.length > 0) {
					var title = $sponsorData.data('title');
					var img = $sponsorData.data('img');
					var htmlText = $sponsorData.html();

					var outputHTML = '\
						<div class="row align-items-center">\
							<div class="col-md-5 mb-4 mb-md-0">\
								<img src="' + img + '" alt="' + title + '" class="img-fluid" >\
							</div>\
							<div class="col-md-7 text-left">\
								<h3 class="sponsor-title-text">' + title + '</h3>\
								<div class="sponsor-desc sponsor-desc-text">' + htmlText + '</div>\
							</div>\
						</div>';

					var $infoContainer = $('#sponsor-info');
					// Only update and animate if the active sponsor has changed
					if ($infoContainer.html().indexOf(title) === -1) {
						$infoContainer.fadeOut(200, function () {
							$(this).html(outputHTML).fadeIn(200);
						});
					}
				}
			}
		}, 50);
	}

	var $partnersCarousel = $('.partners-carousel');

	// Bind carousel lifecycle events to keep the spotlight details updated
	$partnersCarousel.on('initialized.owl.carousel changed.owl.carousel translated.owl.carousel', updateSponsorInfo);

	// Initialize Owl Carousel for sponsor logos with continuous loop and center mode
	$partnersCarousel.owlCarousel({
		center: true,
		loop: true,
		margin: 30,
		nav: false,
		dots: false,
		autoplay: true,
		autoplayTimeout: 10000,
		autoplayHoverPause: true,
		responsive: {
			0: { items: 3 },
			768: { items: 3 },
			992: { items: 5 }
		}
	});

	// Allow clicking on any sponsor item to navigate and center it in the carousel
	$partnersCarousel.on('click', '.owl-item', function () {
		var $item = $(this).find('.item');
		var targetSponsorId = $item.data('sponsor-id');
		var originalItems = $partnersCarousel.find('.owl-item').not('.cloned').find('.item');
		var targetIndex = -1;

		originalItems.each(function (i) {
			if ($(this).data('sponsor-id') === targetSponsorId) {
				targetIndex = i;
				return false;
			}
		});

		if (targetIndex !== -1) {
			$partnersCarousel.trigger('to.owl.carousel', [targetIndex, 300, true]);
		}
	});

	// Change mouse cursor to pointer on carousel items to indicate clickability
	$partnersCarousel.on('mouseenter', '.owl-item', function () {
		$(this).css('cursor', 'pointer');
	});

	// Toggle hidden content visibility on hover for simulator feature cards
	$("div.features-post").hover(
		function () {
			$(this).find("div.content-hide").slideToggle("medium");
		},
		function () {
			$(this).find("div.content-hide").slideToggle("medium");
		}
	);

})(jQuery);