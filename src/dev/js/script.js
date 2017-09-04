    var $menubuton = $('.menubuton');
    var $menuwrapper = $('.mainmenuoverlay');
    var $menu = $('.mainmenu');
    var $pozicija = 0;

    $menubuton.click(function(e) {
        // $(this).removeClass('menuopenbuton').addClass('menuclosebuton');
        if ($('body').hasClass('menuout')) {
            $(window).scrollTop($pozicija);

        } else {
            $pozicija = $(window).scrollTop();
            $menuwrapper.scrollTop(0);
            // $menu.scrollTop(0);
        }
        // console.log("Y visina=" + $pozicija);
        $(this).toggleClass('menuclose')
        $menuwrapper.toggleClass("visible");
        $('body').toggleClass("menuout");




        // window.scrollTo(0, 0);
        // $menubuton.removeClass("menuclosed").addClass("menuopened");
        // $menuwrapper.css('top', $(window).scrollTop()).hasClass('menuout');
    });

    // $menuclosebuton.click(function(e) {
    //     $(this).removeClass('menuclosebuton').addClass('menuopenbuton');
    //     $menuwrapper.removeClass("visible");
    //     $('body').removeClass("menuout");
    //     $('.content').scrollTop($pozicija);
    //     console.log("Y visina=" + $pozicija);
    //     // window.scrollTo(0, 0);
    //     // $menubuton.removeClass("menuclosed").addClass("menuopened");
    //     // $menuwrapper.css('top', $(window).scrollTop()).hasClass('menuout');
    // });

    var previousScroll = 0;

    $(window).scroll(function() {
        var currentScroll = $(this).scrollTop();
        // console.log(">>>>" + $(window).scrollTop());
        if (currentScroll > previousScroll) {
            // alert('down');
            $menubuton.removeClass("gore");
        } else {
            //  alert('up');
            $menubuton.addClass("gore");
        }
        previousScroll = currentScroll;
    });




    $('.searchcall').click(function(e) {
        $('.searchizlet').toggleClass("visiblesearch");
    });


    $(window).resize(function() {

        // if ($(window).width() < 769) {

        //     // $('#izleti-carousel').trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
        //     // $('#izleti-carousel').find('.owl-stage-outer').children().unwrap();
        // }



    });



    //             (function ($) {
    //  $(window).load(function(){
    // 	$(".harmo + *").hide();


    $('.harmo').click(function(e) {
        $(this).toggleClass("isOpen");
        $(this).next('.nika').toggleClass("isDown");
    });


    $(".harmo2").click(function(event) {
        event.preventDefault();

        if ($(this).next('.nika').hasClass("isDown")) {
            $(this).next('.nika').stop().animate({ height: "hide" }, 500);
            $(this).next('.nika').removeClass("isDown");
            // $(this).removeClass('pogledano-otvoreno').addClass('pogledano');

        } else {
            $('.isDown').stop().animate({ height: "hide" }, 250).removeClass('isDown');
            // $('.pogledano-otvoreno').removeClass('pogledano-otvoreno').addClass('pogledano');
            $(this).next('.nika').stop().animate({ height: "show" }, 500);
            $(this).next('.nika').addClass("isDown");

            // dodaj klasu pogledano-otvoreno kod otvaranja pitanja
            //   if (!$(this).hasClass("pogledano") ) { $(this).addClass("pogledano-otvoreno"); } else {  $(this).removeClass('pogledano').addClass('pogledano-otvoreno'); }

        }
        return false;
    });

    // });


    function getAllUrlParams(url) {
        var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
        var obj = {};
        if (queryString) {
            queryString = queryString.split('#')[0];
            var arr = queryString.split('&');
            for (var i = 0; i < arr.length; i++) {
                var a = arr[i].split('=');
                // in case params look like: list[]=thing1&list[]=thing2
                var paramNum = undefined;
                var paramName = a[0].replace(/\[\d*\]/, function(v) {
                    paramNum = v.slice(1, -1);
                    return '';
                });
                // set parameter value (use 'true' if empty)
                var paramValue = typeof(a[1]) === 'undefined' ? true : a[1];
                // if parameter name already exists
                if (obj[paramName]) {
                    // convert value to array (if still string)
                    if (typeof obj[paramName] === 'string') {
                        obj[paramName] = [obj[paramName]];
                    }
                    // if no array index number specified...
                    if (typeof paramNum === 'undefined') {
                        // put the value on the end of the array
                        obj[paramName].push(paramValue);
                    }
                    // if array index number specified...
                    else {
                        // put the value at that index number
                        obj[paramName][paramNum] = paramValue;
                    }
                }
                // if param name doesn't exist yet, set it
                else {
                    obj[paramName] = paramValue;
                }
            }
        }
        // console.log(obj);
        return obj;
    }


    $(document).ready(function() {
        // getAllUrlParams().printpage; // true
        // console.log(getAllUrlParams().printpage);
        if (getAllUrlParams().print) {
            window.print();
        }
        $(".print").parents().addClass("printwrap");
    })