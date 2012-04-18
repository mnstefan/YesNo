/**
 * @author Stefan Manastirliu
 */
(function( $ ){

  var methods = {
     init : function (options) {
	  	var defaults = {
	  		"checkedText": "Yes",
	  		"uncheckedText": "No",
	  	}
	  	var options = $.extend(defaults, options);
	  	 
	    return this.each(function () {
	    	var $this = $(this), data = $this.data('yesno');
	    	$this.data('yesno', {
            	status : null,
            	target: $("input", $this.parent())
           	});
          
	    	function initialize(yesno){
	    		var input = $this.data('yesno')["target"];
	    		if ($("input:checked", $this.parent()).val() == "on"){
	    			$("li.yes", yesno).addClass("active");
	    			$this.data('yesno')["status"] = 1;
	    			input.attr("checked", true);
	    		}	
	    		else{
	    			$("li.no", yesno).addClass("active");
	    			$this.data('yesno')["status"] = 0;
	    			input.attr("checked", false);
	    		}
	    		
	    		$(yesno).click(function(){
	    			if ($this.data('yesno')["status"] == 1){
	    				input.attr("checked", false);
	    				$this.data('yesno')["status"] = 0;
	    			}
	    			else{
	    				input.attr("checked", true);
	    				$this.data('yesno')["status"] = 1;
	    			}
	    			$("li", $(this)).toggleClass("active");
	    		})	
	    		
	    	}
	    	
	    	$this.hide();
	    	$this.after('<div class="yesno"><ul><li class="yes"><div class="dot">&nbsp;</div>'+options["checkedText"]+'</li><li class="no"><div class="dot">&nbsp;</div>'+options["uncheckedText"]+'</li></ul></div>')
	    	
	    	var yesno = $($this).next(".yesno");
	    	
	    	initialize(yesno);
	    })
	  }, 
    check : function(){
     	return this.each(function(){
	        var $this = $(this), data = $this.data('yesno'), yesno = $this.next(".yesno");
	        
	        $("li", yesno).removeClass("active");
	        $("li.yes", yesno).addClass("active");
			$this.data('yesno')["target"].attr("checked", true);
			$this.data('yesno')["status"] = 1;
       	})
     },
     
    uncheck: function() {
    	return this.each(function(){
       		var $this = $(this), data = $this.data('yesno'), yesno = $this.next(".yesno");
	        
	        $("li", yesno).removeClass("active");
	        $("li.no", yesno).addClass("active");
			$this.data('yesno')["target"].attr("checked", false);
			$this.data('yesno')["status"] = 0;
       })
     }
  };

  $.fn.yesno = function( method ) {
    
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.yesno' );
    }    
  
  };

})( jQuery );

