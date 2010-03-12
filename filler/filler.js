steal.plugins('jquery/controller','jquery/dom/dimensions').then(function($){
	$.Controller.extend("Phui.Filler",
	{
		listensTo : ["show"]
	},
	{
		init : function(el, options){
			this.parent = this.options.parent || this.element.parent()
			if(this.parent[0] === document.body || this.parent[0] === document.documentElement)
				this.parent = $(window)
			//listen on parent's resize
			
			//console.log("listening on ", this.parent[0])
			this.bind(this.parent, 'resize', 'parentResize');
			var parent = this.parent;
			setTimeout(function(){
				parent.triggerHandler("resize");
			},13)
			
		},
		parentResize : function(el, ev){
			//only if target was me
			//console.log(ev.target)
			if(ev.target == this.parent[0] && this.element.is(":visible")){
				var height, width;
				
				if(this.options.all){
					this.element.css({width: 0, height: 0})
					height =  $(document).height() 
					width = $(document).width()
					this.element.css({
						width: width+"px", 
						height: height+"px"
					}).triggerHandler('resize');
					return;
				}
				
				var p = this.parent,
				    height = this.parent.height(),
					width = this.parent.width(),
					el = this.element[0],
					children = this.element.parent().children();
				
				//get the bigger of the parents
				
				children.each(function(){
					var $jq = $(this)
					if(this != el && this.nodeName.toLowerCase() != 'script' && $jq.is(":visible") && $jq.css("position") != "absolute"){
						height = height - $jq.outerHeight(true)
					}
					
				})

				this.element.outerHeight(height)
				if(this.options.width)
					this.element.outerWidth(width)
				
				this.element.triggerHandler('resize');

			}
			
		},
		show : function(el, ev){
			//resize after show ... needs a shown
			var element = this.parent;
			setTimeout(function(){
				element.trigger("resize");
			},13)
			//this.element.trigger("resize");
		},
		destroy : function(){
			this.parent.unbind('resize', this.parent_resize)
			this.parent = null;
		}
	})
})