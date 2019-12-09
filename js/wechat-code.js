(function ($) {


  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  var Overlay = function () {
    function Overlay($dom, options) {
      _classCallCheck(this, Overlay);

      if ($dom.length != 1) {
        throw 'Only one zepto dom is allowed.';
      }
      this._originWrap = $dom;
      this._overlayWrap = $('<div class="overlay overlay-wrap"></div>');
      this._content = $dom.children();

      this.options = options;

      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
    }

    _createClass(Overlay, [{
      key: 'show',
      value: function show() {
        var _this = this;

        this._overlayWrap.addClass('show');
        this._overlayWrap.append(this._content);
        $('body').append(this._overlayWrap);
        ModalHelper.afterOpen();
        if (this.options.closeOnClickOut) {
          this._overlayWrap.on('click', function (event) {
            if (event.target === _this._overlayWrap[0]) {
              _this.hide();
            }
          });
        }
      }
    }, {
      key: 'hide',
      value: function hide() {
        ModalHelper.beforeClose();
        this._overlayWrap.removeClass('show');
        this._originWrap.append(this._content);
        this._overlayWrap.remove();
      }
    }]);

    return Overlay;
  }();

  window.Overlay = Overlay;

  var ModalHelper = (function(bodyCls) {
    var scrollTop;
    return {
      afterOpen: function() {
        scrollTop = document.scrollingElement.scrollTop;
        document.body.classList.add(bodyCls);
        document.body.style.top = -scrollTop + 'px';
      },
      beforeClose: function() {
        document.body.classList.remove(bodyCls);
        // scrollTop lost after set position:fixed, restore it back.
        document.scrollingElement.scrollTop = scrollTop;
      }
    };
  })('modal-open');

  window.ModalHelper = ModalHelper;

  $(function () {

    var weChatOverlay = new Overlay($('#wechatQRCcode'), {
      closeOnClickOut: true
    });

    $('#showWeChat').on('click', () => {
      weChatOverlay.show();
    });
    $('#hideWeChat').on('click', () => {
      weChatOverlay.hide();
    });
  });

})(jQuery);