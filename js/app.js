$('[bnw-animate]').each(function () {
            var sec = this;
            $(window).scroll(function (e) {
                var scrollTop = $(window).scrollTop();
                var viewportHeight = $(window).height();
                var top = $(sec).offset().top;
                if (top <= scrollTop+viewportHeight) {
                    $(sec).addClass($(sec).attr("bnw-animate"));
                }
            });
        });
        $("[bnw-toggle]").each(function(){
            var hit = $(this).attr("bnw-toggle");
            var flag = false;
            $(this).click(function(){
                if(!flag){
                    $("#"+hit).fadeIn();
                    flag = true;
                }
                else {
                    $("#"+hit).fadeOut();
                    flag = false;
                }
            });
        });
        $("[bnw-cart]").each(function(){
            var h = $(this).height();
            var header = $(this).find("h4")[0];
            var top = this;
            $(this).css("bottom", 0-(h-53));
            var flag = false;
            $(header).click(function(){
                if(!flag){
                    $(top).css("bottom", 0);    
                    flag = true;
                }
                else {
                    $(top).css("bottom", 0-(h-53));
                    flag = false;        
				}

            });
        
        });
        $("[bnw-dropdown]").each(function(){
            var clickOn = $(this).find("[bnw-hit]")[0];
            var eleOn = $(this).find("[bnw-run]")[0];
            if(clickOn!=null){
                $(clickOn).click(function(e){
                    e.preventDefault();
                    var state = $(eleOn).attr("bnw-state");
                    if(state=='true')
                    {
                        $(eleOn).hide();
                        $(eleOn).attr("bnw-state", 'false')
					}
                    else {
                        $(eleOn).show();
                        $(eleOn).attr("bnw-state", 'true')
                        var ele = document.createElement("div");
                        ele.className = 'bnw-backddrop';
                        $('body').append(ele);
                        $(".bnw-backddrop").each(function()
                        {
                            $(this).click(function(){
                                $(eleOn).hide();
                                $(eleOn).attr("bnw-state", 'false')
                                $(ele).remove();
                            });
                        });
					}
                });
            }
            
        });
        $("[bnw-product-slider]").each(function(){
            var slider = $(this);
            $("[bnw-item]").each(function(){
                $(this).click(function(){
                    var item = $(this);
                    $("[bnw-item]").each(function(){
                        $(this).removeClass("active");
                    });    
                    slider.find(".selected-slide").each(function(){
                       $(this).html(item.html());
                    });
                    $(this).addClass("active");
                });
            });
        });
        var sys = 1000;
        $("[bnw-gallery-items]").each(function(){
            var item = 1;
            $("[bnw-gallery]").each(function(){
                $(this).attr("item-id", sys+item);
                item++;
                $(this).click(function(){
                    var data = $(this).html();
                    createModal('Gallery',"<a id='prev' class='btn prev'><i class='icofont-circled-left'></i></a>"+ data + "<a id='next' class='btn next'><i class='icofont-circled-right'></i></a>");
                    $(".modal").each(function(){
                        $(this).find("img").each(function(){
                            $(this).attr("src", $(this).attr("bnw-gallery"));
                        });
                    });
                    leftRightLeft($(this).attr("item-id"));
                });
            });
            sys++;
        });
        function leftRightLeft(id)
        {
            $(".modal").each(function(){
                var left = $("#prev");
                var right = $("#next");

                left.click(function(e){
                    e.preventDefault();
                    var idx = parseInt(id)-1;
                    var getleft = $("[item-id="+idx+"]");
                    if(getleft==null || getleft.length ==0 || getleft=='undefined'){
                        return;           
					}
                    var data = $(getleft).html();
                    createModal('Gallery',"<a id='prev' class='btn prev'><i class='icofont-circled-left'></i></a>"+ data + "<a id='next' class='btn next'><i class='icofont-circled-right'></i></a>");
                    $(".modal").each(function(){
                        $(this).find("img").each(function(){
                            $(this).attr("src", $(getleft).attr("bnw-gallery"));
                        });
                    });
                    leftRightLeft($(getleft).attr("item-id"));
                });
                right.click(function(e){
                    e.preventDefault();
                    var idx = parseInt(id)+1;
                    var getleft = $("[item-id="+idx+"]");
                    if(getleft==null || getleft.length ==0 || getleft=='undefined'){
                        return;           
					}
                    var data = $(getleft).html();
                    createModal('Gallery',"<a id='prev' class='btn prev'><i class='icofont-circled-left'></i></a>"+ data + "<a id='next' class='btn next'><i class='icofont-circled-right'></i></a>");
                    $(".modal").each(function(){
                        $(this).find("img").each(function(){
                            $(this).attr("src", $(getleft).attr("bnw-gallery"));
                        });
                    });
                    leftRightLeft($(getleft).attr("item-id"));
                });
            });
		}
        function createModal(title,data){
            $(".modal").remove();    
            $("#cssAdded").remove();
            var template = '<div class="modal">'+
                                '<div class="modal-dialog">'+
                                    '<div class="modal-header">'+
                                    title+  '<a href="#" class="btn btn-imagine" id="close">X</a>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                    data+
                                    '</div>'+
                                '</div>'+
                            '</div><style id="cssAdded"> body { overflow :hidden;} </style>';
            $('body').append(template);
            $(".modal").show();
            $("#close").click(function(e){
                e.preventDefault();
                $(".modal").remove();    
                $("#cssAdded").remove();
            });
		}