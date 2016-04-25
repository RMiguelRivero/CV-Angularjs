/**
 *  $.mrModal() plugin written by Miguel Rivero
 ***********************************
 *        $('.modal').mrModal({
 *            buttons: [{
 *                        text: 'Add',
 *                        class: 'button',
 *                        disabledOnLoad: true,                              // Default to false
 *                        click: function(){...}
 *                  },
 *                  {
 *                        text: 'Cancel',
 *                        class: 'link',
 *                        click: function(){...}
 *                  }],
 *           autoOpen: true,
 *           top: 100px,                                                     // Default is 120px. Its not centered anymore
 *           width: 300px,
 *           height: 90%,
 *           loadingIndicator: false,                                     // loader true will show the spinner icon
 *           open: function(){
 *               setTimeout(function () {
 *                   self.$dialog.mrModal('loading', false);
 *               }, 3000);
 *           }
 *       });
 *
 *       $('.model').mrModal('destroy');                                 // Removes event listeners set up in 'init'
 *
 *      If loadingIndicator option is set to true we need to trigger loading false when it is loaded and add class loaded to the wrapper div
 */
(function ($){
	$.mrModal = function($self){
		var self = this,
			$parent = $self.parent(),
			$wrapper,
			$dialog,
			$container,
			$overlay,
			$modal,
			$header,
			$title,
			$body,
			$spinner,
			$content,
			$footer,
			$button,
			$close,
			sTitle = $self.attr('data-title'),
			fnOpen = null,
			fnClose = null,
			bAutoOpen = true,
			bLoading = false,
			aDisabledButtons = [];

		this.screenOrientation = null;

		// Methods
		this.init = function(oOptions){
			$('#viewport').css('height', '100%');

			if (Validator.jQuery($wrapper) && $wrapper.is(':visible'))
				return;

			if (Validator.jQuery($wrapper)){
				$wrapper.show();
				$('body').addClass('mr-modal-visible');
				open();
				this.center();
				return;
			}

			$(this).off(".mr-modal")
					//bind modal events here within mr-modal namespace
				   .on("domUpdate.mr-modal",this.center.bind(self));
			oOptions = oOptions || {};

			// Set up options
			$.each(oOptions,function(key, val){
				switch(key){
					case 'title':
						sTitle = val;
						break;
					case 'autoOpen':
						bAutoOpen = val;
						break;
					case 'open':
						if (Validator.fn(val))
							fnOpen = val;
						break;
					case 'close':
						if (Validator.fn(val))
							fnClose = val;
						break;
					case 'loadingIndicator':
						bLoading = val;
						break;
				}
			});
			

			// Set up the main wrapper
			$wrapper = $('<div>', {
				'class': 'mr-modal-wrapper'
			});

			// Set up overlay
			$overlay = $('<div>',{
				'class': 'mr-modal-overlay',
			});

			// Set modal
			$modal = $('<div>',{
				'class': 'mr-modal',
			});

			// Set dialog
			$dialog = $('<div>',{
				'class': 'mr-modal-dialog ',
			});
			if (Validator.defined(oOptions.top) ){
				$dialog.css('margin-top', oOptions.top)
			}

			$modal.append($dialog);

			// Set up container
			$container = $($('<div>',{
				'class': 'mr-modal-container ',
			}));
			$dialog.append($container);

			if(Validator.defined(oOptions.width)){
				$container.css('width', oOptions.width)
			}

			// Create close button (top right)
			$close = $('<span>', {
				'class': 'mr-modal-container-header-close'
			});

			$close.append($('<i class="fa fa-times"></i>'));

			$close.on('click', function(){
				self.close()
			});

			$header = $('<div>',{
				'class': 'mr-modal-container-header'
			});
			$header.append($close);

			// Create header title
			$title = $('<h3>',{
				'class': 'mr-modal-container-header-title',
				'text': sTitle
			});

			$header.append($title);
			$container.append($header);

			$spinner = $('<div>', {
				'class': 'mr-modal-container-body-loader'
			}).append($('<i class="fa fa-spinner fa-pulse fa-4x"></i>'));

			$content = $('<div>',{
				'class': 'mr-modal-container-body-content',
			}).append($self);

			// Create Body
			$body = $('<div>',{
				'class': 'mr-modal-container-body',
			}).append($spinner).append($content);

			$container.append($body);

			// Create footer
			if (Validator.defined(oOptions.buttons) && Validator.nonEmptyArray(oOptions.buttons)){
				// Set up base select
				$footer = $('<div>',{
					'class': 'mr-modal-container-footer'
				});

				$.each(oOptions.buttons, function(index, button){
					if(!Validator.fn(button.click))
						return;

					var disabledOnLoad = Validator.defined(button.disabledOnLoad) ? button.disabledOnLoad : false ;

					$button = $('<a>',{
						'class': 'mr-modal-footer-button ' + (button.type || '') + ' ' + (button.class || '') + ' ' + (disabledOnLoad ? 'disabled' : ''  ),
						'tabindex': '0',
						'html': button.text
					});

					if(disabledOnLoad)
						aDisabledButtons.push($button);

					$button.on('click', function (e) {
						if ($(e.currentTarget).hasClass('disabled') || $(e.currentTarget).hasClass('loading'))
							return;

						button.click.apply($self, arguments);
					});
					$footer.append($button);
				});
				$container.append($footer);

			}

			$wrapper
				.append($overlay)
				.append($modal);

			$wrapper.hide();

			$('body')
				.append($wrapper);

			if (bLoading){
				$spinner.show();
				$content.hide();
			}

			if (!bAutoOpen)
				return
			$wrapper.show()

			$('body').addClass('mr-modal-visible');

			open();
			$(this).trigger("domUpdate.mr-modal");

			if(oOptions.buttons == undefined)
				$dialog.find('.mr-modal-container-body').addClass('noFooter');

			$(window).bind("orientationchange", function(){
				if (this.screenOrientation == window.orientation)
					return;

				this.screenOrientation = window.orientation;

				$modal.css('overflow','hidden');

				setTimeout(function(){
					$modal.css('overflow','');
				}, 150)

			});
			var resizing;
			$(window).on('resize', function(){
				if (resizing != null){
					clearTimeout(resizing);
				}
				resizing = setTimeout(function () {					
					self.center();
				}, 20);
			});
		};
		this.center =function(){
			var marginTop = window.innerHeight/2 -$container.height()/2;
			var marginLeft = window.innerWidth/2 -$container.width()/2;
			$dialog.css({ 'margin-top':marginTop+"px",  'margin-Left':marginLeft+"px"});
		}
		this.destroy     = function(){
			$('#viewport').css('height', 'auto');

			if (!Validator.jQuery($wrapper))
				return;

			// Unbind event listeners from buttons
			if($footer != undefined)
				$footer.find('a').off('click')

			$close.off('click');

			$wrapper.remove();

			$self.removeData('mr-modal');
			$(this).off(".mr-modal");
			$('body').removeClass('mr-modal-visible');

			$parent.append($self);
		}

		this.close = function(){
			$('#viewport').css('height', 'auto');
			$('body').removeClass('mr-modal-visible');
			$wrapper.hide();
			bLoading = false;

			// Call custom callback
			if (Validator.fn(fnClose))
				fnClose.apply($self,[]);
		}

		this.open = function(){
			$wrapper.show();
			$('#viewport').css('height', '100%');
			open();
		}
		this.append = function(html){
			$content.append(html);
			$(self).trigger("domUpdate.mr-modal");
		}
		this.update = function(html){
			$content.append(html);
			$(self).trigger("domUpdate.mr-modal");
		}
		this.loading = function (newVal) {
			if (Validator.defined(newVal)){
				if (!Validator.bool(newVal))
					throw Exception.InvalidValue('loadingIndicator', newVal, "Boolean" );

				bLoading = newVal;
				if (bLoading){
					$spinner.show();
					$content.hide();
					$(self).trigger("domUpdate.mr-modal");
				}else{
					$spinner.hide();
					$content.show();
					$.each(aDisabledButtons, function(){
					   $(this).removeClass('disabled');
					});
					$(self).trigger("domUpdate.mr-modal");
				}

				return bLoading;
			}

			return bLoading;

		}

		// Setters/Getters
		this.autoOpen = function(newVal){
			// Setter
			if (Validator.defined(newVal)){
				if (!Validator.bool(newVal))
					throw Exception.InvalidValue('autoOpen', newVal, "Boolean" );

				bAutoOpen = newVal;

				return bAutoOpen;
			}

			// Getter
			return bAutoOpen;
		}

		this.title = function(newVal){
			// Setter
			if (Validator.defined(newVal)){
				if (!Validator.string(newVal))
					throw Exception.InvalidValue('title', newVal, "String" );

				sTitle = newVal;

				$title.text(sTitle)

				return sTitle;
			}

			// Getter
			return sTitle;
		}

		// Add classes to the modal div
		this.addClass = function (sClass){
			if(!Validator.nonEmptyString(sClass))
				return;

			$modal.addClass(sClass);
		}

		// Remove classes to the modal div
		this.removeClass = function (sClass){
			if(!Validator.nonEmptyString(sClass))
				return;

			$modal.removeClass(sClass);
		}

		// Restore classes for the modal div
		this.resetClass = function (){
			$modal.attr("class",'mr-modal');
		}

		function open(){
			// Put any default actions on open here
			$('#viewport').css('height', '100%');

			// Call custom callback
			if (Validator.fn(fnOpen))
				fnOpen.apply($self,[]);
		}

		return this;
	};

	$.fn.mrModal = function(sMethod,oOptions) {
		var args = [],
			aReturn = [];

		$.each(arguments, function(i, arg){
			args.push(arg);
		});

		$.each($(this),function(){
			var plugin;
			if (undefined == $(this).data('mr-modal')) {
				if (args.length && Validator.string(args[0])){
					// throw Exception.NotReady('mr-modal');
					throw Error('mr-modal NotReady');
				}

				plugin = new $.mrModal($(this));
				$(this).data('mr-modal', plugin);
			} else {
				plugin = $(this).data('mr-modal');
			}

			if (!args.length || Validator.nonEmptyHash(args[0])){
				if (args.length)
					plugin['init'](args[0]);
				else
					plugin['init']();

				return;
			}

			aReturn.push(plugin[args[0]].apply(this, args.slice(1)));
		});

		if (!aReturn.length){
			return $(this);
		} else {
			return aReturn.length == 1 ? aReturn[0] : aReturn;
		}
	}

	return $.fn.mrModal;
}( jQuery, Validator ));