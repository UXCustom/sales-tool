$(document).ready(function() {

    var updatedCSS = $('#sheet1').attr('href');
    localStorage.setItem('css', updatedCSS);

    colorsObj = new Object();


	$("input[type=color]").change(function() {
	  colorKey = $(this).attr('class');
	  colorValue = $(this).val().replace("#", "");
	  createParams(colorKey, colorValue);

		var updatedCSS = $('#sheet1').attr('href');
		localStorage.setItem('css', updatedCSS);

		var colorValue1 = $(".c1").spectrum("get");
		var colorValue2 = $(".c2").spectrum("get");

		$('.colorText1').text(colorValue1);
		$('.colorText2').text(colorValue2);
	});

    function createParams (colorKey, colorValue) {
	  colorsObj[colorKey] = colorValue;
	  tempTxt = "php/css.php?" + $.param(colorsObj);
	  $("#sheet1").attr("href", tempTxt);
	};

	$('#changeTitle').on('input',function() {
		$('.siteTitle').text($(this).val());
		if ($(this).val() == '') {
			$('.siteTitle').text('Productivity and Collaboration');
		}

		localStorage.setItem('title', $(this).val());
	});

	$('#layoutChoice').on('change', function() {
		if ($('#layoutChoice option:selected').val() == 'A') {
			$('#homepage #additionalResources').css('display','none');
			$('#homepage #additionalDownloads, #resources').css('display','block');

			localStorage.setItem('layout', 'A');
		} else {
			$('#homepage #additionalDownloads, #resources').css('display','none');
			$('#homepage #additionalResources').css('display','block');

			localStorage.setItem('layout', 'B');
		}
	});

	$('#clientChoice').on('change', function() {
		if ($('#clientChoice option:selected').val() == 'A') {
			$('#articleHeader #articleSponsorContainer ul.twoClients').css('display','none');
			$('#articleHeader #articleSponsorContainer ul.oneClient').css('display','block');
			$('footer .footerLeft .sponsorLogos li:nth-child(2)').css('display','none');

			localStorage.setItem('client', 'A');
		} else {
			$('#articleHeader #articleSponsorContainer ul.twoClients').css('display','block');
			$('#articleHeader #articleSponsorContainer ul.oneClient').css('display','none');
			$('footer .footerLeft .sponsorLogos li:nth-child(2)').css('display','block');

			localStorage.setItem('client', 'B');
		}
	});

	// Local Storage for client choice
	if (localStorage.getItem("client") != null) {
		if (localStorage.getItem("client") == 'A') {
			$('#articleHeader #articleSponsorContainer ul.twoClients').css('display','none');
			$('#articleHeader #articleSponsorContainer ul.oneClient').css('display','block');
			$('footer .footerLeft .sponsorLogos li').eq(1).css('display','none');
			$('#clientChoice option').eq(0).prop('selected', true);
		} else {
			$('#articleHeader #articleSponsorContainer ul.twoClients').css('display','block');
			$('#articleHeader #articleSponsorContainer ul.oneClient').css('display','none');
			$('footer .footerLeft .sponsorLogos li').eq(1).css('display','block');
			$('#clientChoice option').eq(1).prop('selected', true);
		}
	}

	// Local Storage for Layout Config
	if (localStorage.getItem("layout") != null) {
		if (localStorage.getItem("layout") == 'A') {
			$('#homepage #additionalResources').css('display','none');
			$('#homepage #additionalDownloads, #resources').css('display','block');
			$('#layoutChoice option').eq(0).prop('selected', true);
		} else {
			$('#homepage #additionalDownloads, #resources').css('display','none');
			$('#homepage #additionalResources').css('display','block');
			$('#layoutChoice option').eq(1).prop('selected', true);
		}
	}

	// Local Storage to set css color values
	if (localStorage.getItem("css") != null) {
		$("#sheet1").attr("href", localStorage.getItem('css'));
	}

	// Local Storage to set the title
	if (localStorage.getItem("title") != null) {
		var text = localStorage.getItem('title');
		$('.siteTitle').text(text);
		$('#changeTitle').val(text);
	} else {
		$('#changeTitle').val('Productivity and Collaboration');
	}

	$('.reset').on('click', function() {
		localStorage.clear();
		window.location.reload();
	});

    // Sales Tool UI updates
    function adjustEditWindowSize() {
        var windowHeight = $(window).outerHeight(),
            headerHeight = $('.demo-header').outerHeight(),
            footerHeight = $('.demo-footer').outerHeight(),
            demoSettingsHeight = windowHeight - headerHeight - footerHeight;
        $('#editWindow').css('height', windowHeight);
        $('.demo-settings').css('height', (demoSettingsHeight));
    }
    adjustEditWindowSize();

    $( ".pull" ).on( "click", function() {
        openEditWindow();
    });
    // clear input on click of close icon
    $(".icon-close").on( "click", function() {
        if (("#changeTitle").length > 0) {
            $("#changeTitle").attr('value','');
        }
    });

    function openEditWindow() {
        var editWindow = $("#editWindow"),
						micrositeWrapper = $('#micrositeWrapper');
        if(editWindow.hasClass('open')) {
            micrositeWrapper.addClass('editWindowOpen');
        } else {
            micrositeWrapper.removeClass('editWindowOpen');
        }
    }

    // start Site Type Nav functionality
    var switchSiteType = function(oldSelection) {
        var siteTypes = [
            {
                "id": "1",
                "name": "article",
                "url": "http://productdevelopment.techtarget.com/projects/custom/prototypes/sales-tools/article"
            },
            {
                "id": "2",
                "name": "embeddedCenter",
                "url": "http://productdevelopment.techtarget.com/projects/custom/prototypes/sales-tools/embedded/Center"
            },
            {
                "id": "3",
                "name": "embeddedDark",
                "url": "http://productdevelopment.techtarget.com/projects/custom/prototypes/sales-tools/embedded/Dark"
            },
            {
                "id": "4",
                "name": "embeddedLight",
                "url": "http://productdevelopment.techtarget.com/projects/custom/prototypes/sales-tools/embedded/Light"
            },
            {
                "id": "5",
                "name": "nativeAd",
                "url": "http://productdevelopment.techtarget.com/projects/custom/prototypes/sales-tools/native/"
            }
        ];
        var totalSiteTypes = $(siteTypes).length;
        var newSelection = $(".demo-site-nav-list-item.selected").attr("data-id");
        for (i = 0; i < totalSiteTypes; i++) {
            var option = siteTypes[i];
            if ((option.id === newSelection) && (option.id != oldSelection)) {
                window.open (siteTypes[i].url,'_self',false);
            }
        }
    }
    var hideSiteTypeNotSelected = function() {
        if($(".demo-site-nav-list li").hasClass('selected')){
            $(".demo-site-nav-list-item").hide();
            $(".demo-site-nav-list-item.selected").show();
        }
    }
    var showSiteTypeNav = function() {
        $(".demo-site-nav-list-item").show();
        $(".demo-site-nav").removeClass("hideNav").addClass("show");
        $('.demo-site-nav .icon').removeClass("icon-arrow-down").addClass("icon-arrow-up");
    }
    var hideSiteTypeNav = function() {
        hideSiteTypeNotSelected();
        $(".demo-site-nav").removeClass("show").addClass("hideNav");
        $('.demo-site-nav .icon').removeClass("icon-arrow-up").addClass("icon-arrow-down");
    }
    var toggleMenuOnArrowClick = function() {
        $(".demo-site-nav-list-item.selected, .demo-site-nav .icon").on("mousedown", function(){
            if ($('.demo-site-nav').hasClass("hideNav")) {
                showSiteTypeNav();
            }
            else {
                hideSiteTypeNav();
            }
        })

    }
    var userSelectsSiteType = function() {
        $('.demo-site-nav-list-item:not(.selected)').on('mousedown',function() {
            var oldSelection = $(".demo-site-nav-list-item.selected").attr("data-id");
            $(".demo-site-nav-list-item").removeClass("selected");
            $(this).addClass("selected");
            switchSiteType(oldSelection);
            //hideSiteTypeNav();
            $(".demo-site-nav").removeClass("show").addClass("hideNav");
            $('.demo-site-nav .icon').removeClass("icon-arrow-up").addClass("icon-arrow-down");
            hideSiteTypeNotSelected();
        });
    }

    hideSiteTypeNotSelected();
    userSelectsSiteType();
    toggleMenuOnArrowClick();
    // end Site Type Nav functionality

    // Change Hero Image on Sales Tool Drop-down selection
    var onClickChangeHero = function() {
        var heroImageOptions = [
            {
                'id': '1',
                'src': 'images/hero/hero_images_01.jpg'
            },
            {
                'id': '2',
                'src': 'images/hero/hero_images_02.jpg'
            },
            {
                'id': '3',
                'src': 'images/hero/hero_images_03.jpg'
            },
            {
                'id': '4',
                'src': 'images/hero/hero_images_04.jpg'
            },
            {
                'id': '5',
                'src': 'images/hero/hero_images_05.jpg'
            },
            {
                'id': '6',
                'src': 'images/hero/hero_images_06.jpg'
            },
            {
                'id': '7',
                'src': 'images/hero/hero_images_07.jpg'
            },
            {
                'id': '8',
                'src': 'images/hero/hero_images_08.jpg'
            },
            {
                'id': '9',
                'src': 'images/hero/hero_images_09.jpg'
            },
            {
                'id': '10',
                'src': 'images/hero/hero_images_10.jpg'
            },
            {
                'id': '11',
                'src': 'images/hero/hero_images_11.jpg'
            },
            {
                'id': '12',
                'src': 'images/hero/hero_images_12.jpg'
            }
        ];
        $('#heroImageChoice').change(function() {
            var clickedOption = $('#heroImageChoice option:selected').val(),
                totalOptions = heroImageOptions.length;

            for (i=0;i<totalOptions;i++) {
                if (heroImageOptions[i].id === clickedOption) {
                    $('.heroPrimary').css('background-image','url('+heroImageOptions[i].src+')');
                }
            }
        });
        var setDefaultHeroImage = function() {
            $('.heroPrimary').css('background-image','url('+heroImageOptions[11].src+')');
        };
        setDefaultHeroImage();
    }
    onClickChangeHero();

    // Get Sales Tool Selected Settings and open Email via Footer "Email" Link
    var getSettings = function() {
        var siteType = $('.demo-site-nav-list-item.selected').text(),
            clientChoice = $('#clientChoice option:selected').text(),
            layoutChoice = $('#layoutChoice option:selected').text(),
            colorText1 = $('.colorText1').text(),
            colorText2 = $('.colorText2').text();
        var mailto = 'mailto:?body=Site Type: '+ siteType+'%0D%0A' +'Number of Clients: '+clientChoice+'%0D%0A'+'Layout: '+layoutChoice+'%0D%0A'+'Color Text 1: '+colorText1+'%0D%0A'+'Color Text 2: '+colorText2;
        $('.demo-footer-button.demo-button-email').attr('href',mailto);
    }
    getSettings();
    // END Sales Tool Selected Settings

	// bit.ly API configuration
      var bitlyApi = {
        requestUrl: 'http://api.bit.ly/v3/shorten',
        login: 'uxtechtarget',
        key: 'R_3711c9f9013670f25d70b047c8deb6f2'
      };

  var shortenUrl = function (urlToShorten, callback) {
    this.shortenUrlPromise(urlToShorten).done(function (url) {
      if (typeof callback == "function") {
        callback.call(this, url);
      } else {
        return url;
      };
    });
  }

  var shortenUrlPromise = function (urlToShorten) {
    // ajax request to bit.ly service wrapped in an outer deferred
    // so that the request always resolves to a value
    return $.Deferred(function (defer) {
      $.ajax({
        url: bitlyApi.requestUrl,
        contentType: "application/x-www-form-urlencoded",
        dataType: "jsonp",
        data: ({
          login: bitlyApi.login,
          apiKey: bitlyApi.key,
          longUrl: urlToShorten
        })
      }).done(function (resp) {
        if (resp.status_txt === "OK") {
          var url = resp.data.url;
          // logger.log("bit.ly API shortened: %s", url);
          defer.resolve(url);
        } else {
          // logger.log("bit.ly API status: %s", resp.status_txt);
          defer.resolve('');
        }
      }).fail(function (jqXHR, textStatus) {
        // logger.log("Error getting shortened url from bit.ly: %s", textStatus, jqXHR);
        defer.resolve('');
      });
    }).promise();
  }

  // social share
  var $fb = $('.socialMedia-facebook'),
			$tw = $('.socialMedia-twitter'),
			$li = $('.socialMedia-linkedin');

	if ($fb.length + $tw.length + $li.length == 0) {
		// exit - this page doesn't have social buttons
		return;
	}
  var pageUrl = $('link[rel="canonical"]').attr('href') || window.location.href;

  var $a_fb = $('a', $fb),
		$a_tw = $('a', $tw),
		$a_li = $('a', $li);

  var $any = $a_fb.add($a_tw).add($a_li);

  $any.one('click', function (e) {
		e.preventDefault();

		// cancel for all after any one
		$any.off('click');
		// logger.log('clicked and removed');

		var $curr = $(this);
		var w = popup();

		// logger.log("Fetching bit.ly url for shares...");
		shortenUrlPromise(pageUrl).done(function (shortenedUrl) {

			var articleUrl = encodeURIComponent(shortenedUrl || pageUrl);
			var articleTitle = encodeURIComponent($('.main-article-title').text() || document.title);

			// Facebook
			$a_fb.attr('href', 'http://www.facebook.com/share.php?u=' + articleUrl + '&t=' + articleTitle);

			// Twitter
			$a_tw.attr('href', 'https://twitter.com/intent/tweet?text=' + articleTitle + '&url=' + articleUrl
				+ ($tw.attr('data-account') ? ('&via=' + encodeURIComponent($tw.attr('data-account'))) : '')
				+ ($tw.attr('data-related') ? ('&related=' + encodeURIComponent($tw.attr('data-related'))) : ''));

      // LinkedIn
			$a_li.attr('href', 'http://www.linkedin.com/shareArticle?mini=true&url=' + articleUrl + '&title=' + articleTitle);

			$any.on('click', popupEvt);

		}).then (function () {
			var href = $curr.attr('href');
			w.location = href;
		});

	});

  var $a = $('li.contentTools-email a');
  if (!$a.length) return;

  // set the link for emailing
  var endpointUrl = 'http://api.addthis.com/oexchange/0.8/forward/email/offer?';
  var emailTemplates = {
    'en': 'TechTargetSearchSites',
    'es': 'TechTargetSearchSitesSpanish'
  };
  var pageTitle = $('.main-article-title').text() || document.title;
  var endpointConfig = {
    pubid: 'uxtechtarget',
    url: window.location.href,
    title: pageTitle
  };
  var emailUrl = endpointUrl + $.param(endpointConfig)
  $a.attr('href', emailUrl).on('click', popupEvt);

  function popup(url) {
		return window.open(url || '', 'popupWindow', 'width=600,height=600');
	}

	function popupEvt(e) {
		e.preventDefault();
		popup($(this).attr('href'));
	}

  // add specific animation to the main menu hamburger icon
  $('.hamburger').addClass('hamburger--elastic');

  // determine if viewing on a mobile device with touch enabled
  if (!("ontouchstart" in document.documentElement)) {
    document.documentElement.className += "no-touch";
  }

  // hero overlay blendmode IE
  if(typeof window.getComputedStyle(document.body).backgroundBlendMode == 'undefined') {
    $('.heroPrimary').addClass('no-background-blend-mode');
  }

	// Re-Config Video Modal HTML
	$('#videoModal p.closeButton').remove();
	$('#videoModalPlayerContainer').append('<a class="closeButton">&times;</a>');

  // close video modal
  function closeModal(evt) {
    if(evt.target.id == "video-1") {
      return;
    }
    if($(evt.target).closest('#video-1').length || $(evt.target).closest('#videoModalPlaylistContainer').length || $(evt.target).closest('#videoModalPlaylistInfoContainer').length) {
      return;
    }

    videojs('#video-1').pause();
    $('#videoModal').removeClass('showModal');
    $('body').removeClass('noScroll');
    videojs('#video-1').dispose();
    $('#video-1').remove();
    $('ol.vjs-playlist').unwrap().unwrap().children().remove();
    $('.bx-controls').remove();
    $('#videoModalPlaylistInfoContainer p span').text('');

    posterArray = [];
  }

  $('#videoModal').on('click', closeModal);

  // mobile menu interactions
  var menuButton = $('.hamburger'),
      body = $('body'),
      topicButton = $('.topicsButton'),
      socialButton = $('.socialButton'),
      resourcesButton = $('#articleNavigation ul#articleResourcesNav > li:first-child');

  function openMobileMenu() {
    if(body.hasClass('socialMenuOpen')) {
      setTimeout(function(){
        body.toggleClass('topicsMenuOpen');
        $('.hamburger').addClass('is-active');
      }, 500);
    } else {
      body.toggleClass('topicsMenuOpen');
      $('.hamburger').toggleClass('is-active');
    }
    body.removeClass('socialMenuOpen');
  }
  function openSocialMenu() {
    if(body.hasClass('topicsMenuOpen')) {
      setTimeout(function(){
        body.toggleClass('socialMenuOpen');
      }, 500);
    } else {
      body.toggleClass('socialMenuOpen');
      $('.hamburger').removeClass('is-active');
    }
    $('.hamburger').removeClass('is-active');
    body.removeClass('topicsMenuOpen');
  }
  function openTopicsMenu() {
    $('#articleNavigation').toggleClass('showMainNav');
  }
  function openResourcesMenu() {
    $('#articleResourcesNav').toggleClass('showReourcesNav');
  }

  // navigation item length detection
  var navMath = function() {
    var containerWidth = $('#articleNavigationCompress').width();
    var subtractWidth = $('#articleResourcesNav').outerWidth(true);
    var availableWidth = containerWidth - subtractWidth;
    var totalItemWidth = 0;

    $('#articleMainNav > li').each(function(){
      totalItemWidth += $(this).outerWidth(true);
    });

    if(totalItemWidth > availableWidth){
      $('#articleNavigation').addClass('collapseMain').css('visibility','');
    } else {
      $('#articleNavigation').css('visibility','visible');
    }

  }

  // close the mobile menus if they are already open and the window is resized
  function removeClasses() {
    if ($(window).width() > 640 && $('body').hasClass('menuOpen')) {
      $('body').removeClass('menuOpen');
      $('#articleMenusCompress').removeClass('show');
    }
  }

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var brandbarHeight = $('#articleSponsorContainer').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll && $(window).width() < 960) {
        hasScrolled();
        didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
      return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > brandbarHeight){
      // Scroll Down
      $('#articleSponsorContainer').removeClass('nav-down').addClass('nav-up');
    } else {
      // Scroll Up
      if(st + $(window).height() < $(document).height()) {
          $('#articleSponsorContainer').removeClass('nav-up').addClass('nav-down');
      }
    }
    lastScrollTop = st;
  }

  // Amazon menu plugin function
  function menuPlugin() {
    var $menu = $('.collapseMain #articleMainNav');
    if($(window).width() >= 960) {
      $menu.menuAim({
          activate: activateSubmenu,
          deactivate: deactivateSubmenu
      });
    } else {
      $menu.menuAim({
        activate: deactivateSubmenu,
      });
    }
    function activateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("#" + submenuId)

        // Show the submenu
        $submenu.css({
            display: "block"
        });

        // Keep the currently activated row's highlighted look
        $row.find("> a").addClass("maintainHover");
    }

    function deactivateSubmenu(row) {
        var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("#" + submenuId);

        // Hide the submenu and remove the row's highlighted look
        $submenu.css("display", "none");
        $row.find("> a").removeClass("maintainHover");
    }
  }

  $(document).click(function(evt){
    if(evt.target.id == "topicsButton" || $(evt.target).is('.icon-menu')) {
     return;
    }
    $('#articleNavigation').removeClass('showMainNav');
    $("#articleMainNav > li > ul").css("display","");
    $("a.maintainHover").removeClass("maintainHover");
  });

  // View More functionality
  function viewAllArticles () {
    $('.articleListing ul').addClass('viewAll').css('margin-bottom','40px');
    $(this).remove();
  }
  function loadArticlesResources () {
    $(this).siblings('ul').addClass('viewAll').css('margin-bottom','40px');
    $(this).remove();
  }
  function loadDownloadResources () {
    $(this).siblings('ul').addClass('viewAll').css('margin-bottom','40px');
    $(this).remove();
  }
  function downloadResourcesConditional() {
    $('#downloadResources .listContainer').each(function() {
			if ($(window).width() < 640) {
				if ($('.additionalDownloads li',this).length < 3) {
					$(this).find('.loadMore').hide();
				} else {
					$(this).find('.loadMore').css('display','block');
				}
      } else if ($(window).width() < 960) {
				if ($('.additionalDownloads li',this).length < 7) {
					$(this).find('.loadMore').hide();
				} else {
					$(this).find('.loadMore').css('display','block');
				}
      } else if ($(window).width() >= 960) {
				if ($('.additionalDownloads li',this).length < 12) {
					$(this).find('.loadMore').hide();
				} else {
					$(this).find('.loadMore').css('display','block');
				}
      }
    });
  }
  function articleResourcesConditional() {
    $('#articleResources .listContainer').each(function() {
			if ($(window).width() < 640) {
				if ($('ul li',this).length < 3) {
					$(this).find('.loadMore').hide();
				} else {
					$(this).find('.loadMore').css('display','block');
				}
      } else if ($(window).width() < 960) {
				if ($('ul li',this).length < 5) {
					$(this).find('.loadMore').hide();
				} else {
					$(this).find('.loadMore').css('display','block');
				}
      } else if ($(window).width() >= 960) {
				if ($('ul li',this).length < 6) {
					$(this).find('.loadMore').hide();
				} else {
					$(this).find('.loadMore').css('display','block');
				}
      }
    });
  }
  function topicAdditionalArticlesConditional() {
    if ($(window).width() < 640) {
      if ($('#topicBodyContent .articleListing ul li').length <= 3) {
        $('#topicBodyContent .articleListing').find('.loadMore').hide();
      } else {
        $('#topicBodyContent .articleListing').find('.loadMore').css('display','block');
      }
    } else if ($(window).width() < 960) {
      if ($('#topicBodyContent .articleListing ul li').length <= 6) {
        $('#topicBodyContent .articleListing').find('.loadMore').hide();
      } else {
        $('#topicBodyContent .articleListing').find('.loadMore').css('display','block');
      }
    } else if ($(window).width() >= 960) {
      if ($('#topicBodyContent .articleListing ul li').length <= 6) {
        $('#topicBodyContent .articleListing').find('.loadMore').hide();
      } else {
        $('#topicBodyContent .articleListing').find('.loadMore').css('display','block');
      }
    }
  }

  // Article Nudge/Overlay
  var $footer = $('.latest-wrapper'),
      $window = $(window),
      $micrositeWrapper = $('#micrositeWrapper'),
      triggerPoint = $('#article').height() * .8;
      $overlay = $('#overlay'),
      overlayCloseBtn = $('#overlay a');

  var showOverlay = function(){
    $overlay.animate({
      bottom:0
    },1500);
  }
  overlayCloseBtn.on('click', function(e){
    $overlay.remove();
  });
  $(window).on('scroll', function(){
    if(($window.scrollTop() + $window.height()) >= triggerPoint || $window.scrollTop() >= 850){
      showOverlay();
    }
  });

  var moveArticleRight = function() {
    $('#articleRight').appendTo('#articleContainer').fadeIn('slow');
  }

	// remove word "Copyright" from footer links
	$('footer .footerRight .footerLinks li:last-child p').text('© 2016 TechTarget');

  // on doc ready
  navMath();
  menuPlugin();
  moveArticleRight();
  downloadResourcesConditional();
	articleResourcesConditional();
  topicAdditionalArticlesConditional();

  // on click
  menuButton.on('tapone', openMobileMenu);
  socialButton.on('tapone', openSocialMenu);
  topicButton.on('click', openTopicsMenu);
  resourcesButton.on('click', openResourcesMenu);

  $('#topicBodyContainer .loadMore').on('click', viewAllArticles);

  $('#articleListContainer .loadMore').each(function() {
    $(this).on('click', loadArticlesResources);
  });

  $('#downloadListContainer .loadMore').each(function() {
    $(this).on('click', loadDownloadResources);
  });

	// Remove the navigation from one reg download pages
	if (window.location.href.indexOf('document') > -1) {
		$('#articleNavigationContainer').remove();
	}

	// Open links to one reg pages in new windows
	$("a[href*='/document/']").attr('target', '_blank');

  // on window resize
  $(window).on('resize', function(){
    adjustEditWindowSize();
    navMath();
    menuPlugin();
    removeClasses();
    downloadResourcesConditional();
	articleResourcesConditional();
    topicAdditionalArticlesConditional();
  });

});
