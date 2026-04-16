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


	videoPopup();


	// Old carousels have been removed

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
								<h3 style="color:var(--brand-orange); font-size:24px; font-weight:700; margin-bottom:15px;text-align:left;">' + title + '</h3>\
								<div class="sponsor-desc" style="color:#ddd; font-size:15px; line-height:1.6; text-align:left;">' + htmlText + '</div>\
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

	$(".Modern-Slider").slick({
		autoplay: true,
		autoplaySpeed: 10000,
		speed: 600,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		dots: true,
		pauseOnDotsHover: true,
		cssEase: 'fade',
		// fade:true,
		draggable: false,
		prevArrow: '<button class="PrevArrow">Atrasss</button>',
		nextArrow: '<button class="NextArrow">Siiigui</button>',
	});


	$("div.features-post").hover(
		function () {
			$(this).find("div.content-hide").slideToggle("medium");
		},
		function () {
			$(this).find("div.content-hide").slideToggle("medium");
		}
	);


	$("#tabs").tabs();


	(function init() {
		function getTimeRemaining(endtime) {
			var t = Date.parse(endtime) - Date.parse(new Date());
			var seconds = Math.floor((t / 1000) % 60);
			var minutes = Math.floor((t / 1000 / 60) % 60);
			var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			var days = Math.floor(t / (1000 * 60 * 60 * 24));
			return {
				'total': t,
				'days': days,
				'hours': hours,
				'minutes': minutes,
				'seconds': seconds
			};
		}

		function initializeClock(endtime) {
			var timeinterval = setInterval(function () {
				var t = getTimeRemaining(endtime);
				document.querySelector(".days > .value").innerText = t.days;
				document.querySelector(".hours > .value").innerText = t.hours;
				document.querySelector(".minutes > .value").innerText = t.minutes;
				document.querySelector(".seconds > .value").innerText = t.seconds;
				if (t.total <= 0) {
					clearInterval(timeinterval);
				}
			}, 1000);
		}
		initializeClock(((new Date()).getFullYear() + 1) + "/1/1")
	})()

})(jQuery);