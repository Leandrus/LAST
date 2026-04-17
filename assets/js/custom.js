/**
 * custom.js
 * 
 * Contiene scripts personalizados generales del proyecto, incluyendo:
 * - Menú responsive móvil (alternar visibilidad del menú).
 * - Animaciones hover en tarjetas (Sección Simuladores).
 * - Inicialización dinámica de carrusel de socios (Owl Carousel).
 * - Actualización y control del panel de información dinámico de patrocinadores según el elemento iterado por el carrusel.
 */
(function ($) {

	$(document).ready(function () {
		$('body').addClass('js');
		var $menu = $('#menu'),
			$menulink = $('.menu-link');

		$menulink.click(function () {
			$menulink.toggleClass('active');
			$menu.toggleClass('active');
			return false;
		});
	});



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

	$partnersCarousel.on('initialized.owl.carousel changed.owl.carousel translated.owl.carousel', updateSponsorInfo);

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

	// Permitir hacer clic en los patrocinadores para centrarlos
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

	// Mostrar un cursor de puntero para indicar interactividad
	$partnersCarousel.on('mouseenter', '.owl-item', function() {
		$(this).css('cursor', 'pointer');
	});


	$("div.features-post").hover(
		function () {
			$(this).find("div.content-hide").slideToggle("medium");
		},
		function () {
			$(this).find("div.content-hide").slideToggle("medium");
		}
	);



})(jQuery);