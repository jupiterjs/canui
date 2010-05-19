$.Model.extend("Lookup",
{
},
{
	build : function(items) {
        this._lookup = {};
		this.items = items;
		this._buildLookup(items);
	},
    _buildLookup : function(items) {
        for(var i=0;i<items.length;i++) {
            var item = items[i];
            var depth = item.text.length;
            for(var j=1;j<=depth;j++) {
                var text = item.text.substr(0,j);
                if(!this._lookup[text]) this._lookup[text] = [];
                this._lookup[text].push(item);
            }   
			// also keeps item indexed by value for use in combobox.controller().val()
			this._lookup["item_"+item.value] = item;
            if(item.children.length) this._buildLookup(item.children);
        }
    },	
	query : function(text) {
		if(text == "*") return this.items;
		var results = this._lookup[text] ? this._lookup[text] : []; 
		return results;		
	},
	getByValue : function(value) {
		return this._lookup["item_"+value] ? this._lookup["item_"+value] : null;  
	}
})