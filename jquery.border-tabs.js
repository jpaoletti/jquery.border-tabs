jQuery.fn.borderTab = function(params){
    jQuery.each($(this), function(){
        var self = $(this);
        var duration = (params.duration)?params.duration:500;
        var leftOffset = (params.left)?params.left:0;
        var zIndex = (params.zIndex)?params.zIndex:100;
        var height = self.innerHeight();
        var excecuting = false;
    
        self.hide();
        self.addClass('border-tab');
        var border = $("#"+params.border);
        var tab = self.find("h1:first");
        var tabContent = "<b>TAB</b>";
        if(tab) tabContent = tab.html();
        tab.remove();

        self.html("<div class='border-tab-content' style='display:none;'>"+self.html()+"</div>");
        self.prepend("<div class='border-tab-tab'>"+tabContent+"</div>");
        tab = self.find(".border-tab-tab:last");
        var content = self.find(".border-tab-content:last");
        content.height(height - tab.innerHeight() + "px");
        var pos = border.position();
        self.css({
            "position": 'absolute', 
            "left": (pos.left + leftOffset) + "px", 
            "top":pos.top - tab.innerHeight()  + "px"
        }).show();
        tab.click(function(){
            if(!excecuting){
                excecuting = true;
                if(content.is(":visible")){
                    self.css('z-index',zIndex-1);
                    self.animate({
                        top: '+='+content.innerHeight()
                    }, duration);
                }else{
                    self.css('z-index',zIndex);
                    self.animate({
                        top: '-='+content.innerHeight()
                    }, duration);            
                }
                content.slideToggle(duration, function(){
                    excecuting = false;
                });
            }
        });
        self.show();
    });
}

