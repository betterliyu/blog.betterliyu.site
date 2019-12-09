;(function($){
  $(function () {
    $('#mobileMenu').on('click', () => {
      if($('#mobileMenu').hasClass('show-menu')) {
        ModalHelper.beforeClose();
        $('.sidebar-wrap').removeClass('show');
        $('#mobileMenu').removeClass('show-menu');
      } else {
        if($('.overlay.show .algolia-popup').length > 0) {
           window.searchOverlay.hide(); 
        }
        $('#mobileMenu').addClass('show-menu');
        $('.sidebar-wrap').addClass('show');
        ModalHelper.afterOpen();
      }
    });
  });
})(jQuery);