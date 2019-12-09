(function ($) {
  $(function () {
    var algoliaSettings = algolia_config.algolia;
    var isAlgoliaSettingsValid = algoliaSettings.applicationID
      && algoliaSettings.apiKey && algoliaSettings.indexName;

    if (!isAlgoliaSettingsValid) {
      window.console.error('Algolia Settings are invalid.');
      return;
    }

    var search = instantsearch({
      appId: algoliaSettings.applicationID,
      apiKey: algoliaSettings.apiKey,
      indexName: algoliaSettings.indexName,
      searchFunction: function (helper) {
        var searchInput = $('#algolia-search-input').find('input');

        if (searchInput.val()) {
          helper.search();
        }
      }
    });

    // Registering Widgets
    [
      instantsearch.widgets.searchBox({
        container: '#algolia-search-input',
        placeholder: algoliaSettings.labels.input_placeholder
      }),

      instantsearch.widgets.hits({
        container: '#algolia-hits',
        hitsPerPage: algoliaSettings.hits.per_page || 10,
        templates: {
          item: function (data) {
            return (
              '<a href="' + data.permalink + '" class="algolia-hit-item-link">' +
              data._highlightResult.title.value +
              '</a>'
            );
          },
          empty: function (data) {
            return (
              '<div id="algolia-hits-empty">' +
              algoliaSettings.labels.hits_empty.replace(/\$\{query}/, data.query) +
              '</div>'
            );
          }
        },
        cssClasses: {
          item: 'algolia-hit-item'
        }
      }),

      instantsearch.widgets.stats({
        container: '#algolia-stats',
        templates: {
          body: function (data) {
            var stats = algoliaSettings.labels.hits_stats
              .replace(/\$\{hits}/, data.nbHits)
              .replace(/\$\{time}/, data.processingTimeMS);
            return stats;
          }
        }
      }),

      instantsearch.widgets.pagination({
        container: '#algolia-pagination',
        scrollTo: false,
        showFirstLast: false,
        labels: {
          first: '<i class="fa fa-angle-double-left"></i>',
          last: '<i class="fa fa-angle-double-right"></i>',
          previous: '<i class="fa fa-angle-left"></i>',
          next: '<i class="fa fa-angle-right"></i>'
        },
        cssClasses: {
          root: 'pagination',
          item: 'pagination-item',
          link: 'page-number',
          active: 'current',
          disabled: 'disabled-item'
        }
      })
    ].forEach(search.addWidget, search);

    search.start();


    var searchOverlay = new Overlay($('#algoliaSearch'), {
      closeOnClickOut: false
    });
    searchOverlay._overlayWrap.removeClass('not-cover-header');
    if (window.innerWidth <= 767) {
      searchOverlay._overlayWrap.addClass('not-cover-header');
    }
    $(window).resize(() => {
      searchOverlay._overlayWrap.removeClass('not-cover-header');
      if (window.innerWidth <= 767) {
        searchOverlay._overlayWrap.addClass('not-cover-header');
      }
    })
    $('.popup-trigger').on('click', () => {
      if($('.sidebar-wrap').hasClass('show')) {
        $('#mobileMenu').click();
      }
      searchOverlay.show();
      setTimeout(() => {
        $('#algolia-search-input').find('input').focus();
      }, 300);
    });
    $('.popup-btn-close').on('click', () => {
      searchOverlay.hide();
    });

    window.searchOverlay = searchOverlay;
  });
})(jQuery);