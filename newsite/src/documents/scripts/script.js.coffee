$ ->
    $('.navigation').affix({
        offset: $('.navigation').position()
    })

    $('.navigation-wrapper').height($(".navigation").height());

    $('body').scrollspy()

    $('.navigation').css(
            width: $('.container').width()
        )

    $(window).resize ->
        $('.navigation.affix').css(
            width: $('.container').width()
        )

