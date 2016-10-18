$(document).ready(function() {

	colorsObj = new Object();

	$("input[type=color]").change(function() {
	  colorKey = $(this).attr('class');
	  colorValue = $(this).val().replace("#", "");
	  createParams(colorKey, colorValue);

		var updatedCSS = $('#sheet1').attr('href');
		localStorage.setItem('css', updatedCSS);
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
		} else {
			$('#homepage #additionalDownloads, #resources').css('display','none');
			$('#homepage #additionalResources').css('display','block');
		}


	});

	if (localStorage.getItem("css") != null) {
		$("#sheet1").attr("href", localStorage.getItem('css'));
	}

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
            micrositeWrapper = $("#micrositeWrapper"),
            articleHeader = $("#articleHeader"),
            articleNav =  $("#articleNavigationContainer");
        if(editWindow.hasClass('open')) {
            micrositeWrapper.addClass('editWindowOpen');
            //setTimeout(function(){
                articleHeader.addClass('editWindowOpened');
                articleNav.addClass('editWindowOpened');
            //}, 0.3);
        } else {
            micrositeWrapper.removeClass('editWindowOpen');
            articleHeader.removeClass('editWindowOpened');
            articleNav.removeClass('editWindowOpened');
        }
    }

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
