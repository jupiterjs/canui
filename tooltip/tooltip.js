steal.plugins('jquery/controller',
			  'jquery/view/ejs',
			  'phui/positionable')
	 .then( function($){
	 	
		$.Controller.extend("Phui.Tooltip",
		{
			init : function(){
				this._super()
				//make tooltip element for everyone
				this.tooltipEl = $("<div class='tooltip'></div>")
					.hide()
					.appendTo( $(document.body) )
					.phui_positionable( {
						my: 'left top',
						at: 'left bottom',
						offset: '10 10',
						collision: 'none none'
					});
				
			},
			
			defaults: {
				html: "<h1>Hello World</h1>",
				width: 120,
				height: 60,
				backgroundColor: "#AFEEEE",
				border: "1px solid #555555",
				opacity: 0.5
			}
		},
		{
			init: function() {
				
				/*this.tooltipEl.css({border: this.options.border,
									backgroundColor: this.options.backgroundColor,
									width: this.options.width,
									height: this.options.height,
									opacity: this.options.opacity});
				this.tooltipEl.html(this.options.html);
				this.tooltipEl );
				this.tooltipEl.hide();*/
			},
			mouseenter: function(el, ev) {
				this.Class.tooltipEl
					.html(this.options.html)
					.css({border: this.options.border,
									backgroundColor: this.options.backgroundColor,
									width: this.options.width,
									height: this.options.height,
									opacity: this.options.opacity})
					.trigger("move", ev)
					.fadeIn("fast");
			},
			mouseleave: function(el, ev) {
				this.Class.tooltipEl.fadeOut("fast");
			}
		});
		
	 });
