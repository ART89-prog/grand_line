jQuery(function($) {
    $('input[type=tel]').inputmask('+7 (999) 999-99-99')
    // Ленивая загрузка
    setTimeout(() => {
        observer = lozad('.lozad', {
            rootMargin: '200px 0px',
            threshold: 0,
            loaded: (el) => el.classList.add('loaded')
        })
        observer.observe()
    }, 200)
    $('body').on('click', '.modal_link', function(e) {
        e.preventDefault()
        $.fancybox.close(true)
        $.fancybox.open({
            src: $(this).data('content'),
            type: 'inline',
            touch: false
        })
    })
    $('.reviews_items').slick({
        infinite: true,
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
            }
        }, {
            breakpoint: 875,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
    $("form").submit(function() {
        // Получение ID формы
        var formID = $(this).attr('id');
        // Добавление решётки к имени ID
        var formNm = document.getElementById(formID);
        $.ajax({
            type: "POST",
            url: 'send.php',
            data: new FormData(formNm),
            processData: false,
            contentType: false,
            beforeSend: function() {
                // Вывод текста в процессе отправки
                //$(formNm).html('<p style="text-align:center">Отправка...</p>');
            },
            success: function(data) {
                // Вывод текста результата отправки
                //$(formNm).html('<p style="text-align:center">' + data + '</p>');
                $.fancybox.open({
                    src: "#callback__modal2",
                    type: 'inline',
                    touch: false
                })
                $(formNm).trigger('reset');
            },
            error: function(jqXHR, text, error) {
                // Вывод текста ошибки отправки
                //$(formNm).html(error);
            }
        });
        return false;
    });
    // Табы
    var locationHash = window.location.hash
    $('body').on('click', '.tabs button', function(e) {
        e.preventDefault()
        if (!$(this).hasClass('active')) {
            const $parent = $(this).closest('.tabs_container'),
                activeTab = $(this).data('content'),
                $activeTabContent = $(activeTab),
                level = $(this).data('level')
            $parent.find('.tabs:first button').removeClass('active')
            $parent.find('.tab_content.' + level).removeClass('active')
            $(this).addClass('active')
            $activeTabContent.addClass('active')
            if (level == "level1") {
                let temp_id = $(".tab_content.level1.active button.active").data("content")
                let temp_element = $(temp_id);
                let temp_id_lement = $(temp_id).prop("id");
                temp_element.prop("id", "");
                window.location.hash = $(".tab_content.level1.active button.active").data("content");
                temp_element.prop("id", temp_id_lement);
            }
            if (level == "level2") {
                let temp_id = $(this).data("content")
                let temp_element = $(temp_id);
                let temp_id_lement = $(temp_id).prop("id");
                temp_element.prop("id", "");
                window.location.hash = $(this).data("content");
                temp_element.prop("id", temp_id_lement);
            }
        }
    })
    if (locationHash && $('.tabs_container').length) {
        const $activeTab = $('.tabs button[data-content="' + locationHash + '"]'),
            $activeTabContent = $(locationHash),
            $parent = $activeTab.closest('.tabs_container'),
            level = $activeTab.data('level')
        $(".tabs_container").removeClass("active")
        let id = $parent.attr("id");
        $('button[data-level="level1"]').removeClass("active");
        $('button[data-content="#' + id + '"]').addClass("active");
        $parent.addClass("active");
        $parent.find('.tabs:first button').removeClass('active')
        $parent.find('.tab_content.' + level).removeClass('active')
        $activeTab.addClass('active')
        $activeTabContent.addClass('active')
        $('html, body').stop().animate({
            //scrollTop: $activeTabContent.offset().top
            scrollTop: $(".catalog .container").offset().top
        }, 0)
    }
})
array_month = ['января!', 'февраля!', 'марта!', 'апреля!', 'мая!', 'июня!', 'июля!', 'августа!', 'сентября!', 'октября!', 'ноября!', 'декабря!'];
date = new Date();
tuesday = new Date();
frieday = new Date();
tuesday.setDate(date.getDate() + 2 - date.getDay())
frieday.setDate(date.getDate() + 5 - date.getDay())
if (date.getDay() == 3 || date.getDay() == 4 || date.getDay() == 5) {
    $("#data").html("до " + frieday.getDate() + " " + array_month[frieday.getMonth()]);
} else {
    if (tuesday >= date) {
        $("#data").html("до " + tuesday.getDate() + " " + array_month[tuesday.getMonth()]);
    } else {
        tuesday.setDate(date.getDate() + 3);
        $("#data").html("до " + tuesday.getDate() + " " + array_month[tuesday.getMonth()]);
    }
}

function handleFiles(file) {
    const fileList = file;
    $(".upload-file__text").text(fileList[0]["name"]);
}