
$(document).ready(function(){

    // Initialize Swiper
    // 메인 슬라이드 (클래스 이름이 swiper인 객체)
    const swiper = new Swiper('.main', {
        // Optional parameters
        autoplay: {                             
            delay:3000,                         // 3초마다 자동 실행
            disableOnInteraction: false,
        },
        loop: true,                             // 1 2 3 1 2 3 ... 무한루프
    
        // If we need pagination
        pagination: {                           // 페이지네이션 (동그란 버튼)
            el: '.main .swiper-pagination',
        },
    
    });

    const swiper2 = new Swiper('.popbook10', {
        sliderPerView:1.5,
        spaceBetween: 20,

        // Optional parameters
        autoplay: {                             
            delay:3000,                         // 3초마다 자동 실행
            disableOnInteraction: false,
        },
        loop: true,                             // 1 2 3 1 2 3 ... 무한루프
    
        // If we need pagination
        pagination: {                           // 페이지네이션 (동그란 버튼)
            el: '.popbook10 .swiper-pagination',
            type: 'progressbar'
        },

        // prev, next 버튼
        navigation : {
            nextEl : '.sec3 .swiper-button-next',
            prevEl : '.sec3 .swiper-button-prev',
        },

        // 반응형 breakpoints       -- 아니 근데 이거 왜 안 되냐아
        breakpoints: {
            360: {
                slidesPerView:1.5,
                spaceBetween:20
            },
            1024: {
                slidesPerView:2,
                spaceBetween:20
            },
            1280: {
                slidesPerView:2,
                spaceBetween:20
            },
        },
    
    });

    const swiper3 = new Swiper('.notice', {
        sliderPerView:1.5,
        spaceBetween: 20,

        // Optional parameters
        autoplay: {                             
            delay:3000,                         // 3초마다 자동 실행
            disableOnInteraction: false,
        },
        loop: true,                             // 1 2 3 1 2 3 ... 무한루프
    
        // If we need pagination
        pagination: {                           // 페이지네이션 (동그란 버튼)
            el: '.notice .swiper-pagination',
            type: 'progressbar'
        },

        // prev, next 버튼
        navigation : {
            nextEl : '.sec4 .swiper-button-next',
            prevEl : '.sec4 .swiper-button-prev',
        },
        
        // 반응형 breakpoints
        breakpoints: {
            360: {
                slidesPerView:1.5,
                spaceBetween:20
            },
            1024: {
                slidesPerView:2,
                spaceBetween:20
            },
            1280: {
                slidesPerView:2,
                spaceBetween:20
            },
        }

    });


    // 스크롤 내릴 때마다 section 안의 자식 콘텐츠들이 서서히 나타나는 애니메이션
    $(window).scroll(function() {
        let winTop=$(this).scrollTop();             // 윈도우의 scrollTop 값을 winTop 변수에 저장
        $('.scrollSet').each(function() {           // .scrollSet 영역 개수만큼 반복하는 메서드 each()
            let secTop=$(this).offset().top-500;        // $(this) : .scrollSet(인덱스 0~4) | offset().top : section의 top값
            // let sec2=$('sec2').offset().top;
            // let sec3=$('sec3').offset().top;
            // let sec4=$('sec4').offset().top;
            // let sec5=$('sec5').offset().top;
            // let sec6=$('sec6').offset().top;     를 한큐에 작성
            
            let secBottom=secTop + $(this).height();
            
            // 만약 secTop이 winTop보다 작고, secBottom이 winTop보다 크면, section의 자식객체에 active 추가
            if(secTop < winTop && secBottom > winTop) {
                $(this).find('.ani').addClass('active');
            } else {
                $(this).find('.ani').removeClass('active');     // 해당 범위를 벗어났다 다시 돌아와도 이펙트가 수행됨 (싫으면 삭제해도 됨)
            }



        })

    });





    // 내비게이션 (GNB)
    // 만약 윈도우의 가로길이가 1280 이상이면 PC버전 메뉴가 나타나고, 윈도우의 가로길이가 1280 미만이면 모바일 버전 메뉴가 나타남
    if($(window).width() >= 1280) {
        // PC버전

        $('nav > ul > li').hover(function() {
            $('.sub').stop().slideDown(300);                           // 마우스 올렸을 때

            $('.sub_bg').addClass('active');
            $('header').addClass('minimize');
        });

        $('header').mouseleave(function(){
            $('.sub').stop().slideUp(300);
            $('.sub_bg').removeClass('active');
        });


    } else {
        // 모바일 버전

        $('nav > ul > li > a').click(function() {
            
            $(this).next().slideToggle();                           // a 태그의 다음 객체인 ul .sub 가 slideToggle 됨
            $('nav > ul > li > a').not(this).next().slideUp();      // 클릭하지 않은 a 객체의 ul .sub 는 slideUp 됨

            $(this).toggleClass('active');                          // 클릭한 주메뉴에 active 클래스를 추가
            $('nav > ul > li > a').not(this).removeClass('active'); // 클릭하지 않은 주메뉴에 active 클래스를 제거
            return false;
        });
    }
    // header의 메뉴 버튼을 클릭하면 내비게이션이 나타나고, 다시 클릭하면 내비게이션이 들어감
    let menu_sw=0;
    $('.menu_btn').click(function(e) {
        e.preventDefault();
        if(menu_sw==0) {
            menu_sw=1;
            $('nav').animate({'right':0});
            $('header').addClass('minimize');
            $('html, body').css('overflow', 'hidden');      // 화면 고정
        } else {
            menu_sw=0;
            $('nav').animate({'right':'-100%'});

            // 화면 고정 해제
            //$('html, body').css('overflow-x', 'hidden');
            $('html, body').css('overflow-y', 'scroll');
        }
    });
    



    // header 애니메이션
        //스크롤 내리면 header사라지고, 스크롤 올리면 header 나타남
    function minimize_header() {
        //윈도우 객체를 $window변수에 저장
        let $window = $(window);
        //header 객체를 $header변수에 저장
        let $header = $("header");
        //dis_scroll변수를 선언하고 null(값 없음)으로 초기화
        let did_scroll = null;
        //현재 스크롤 이동값을 저장하는 변수를 선언하고 0으로 초기화
        let current_scroll = 0;
        //마지막 스크롤 이동값을 저장하는 변수를 선언하고 0으로 초기화
        let last_scroll = 0;
        //스크롤 이동값을 저장하는 변수를 선언하고 10으로 초기화
        let move_scroll = 10;
        //윈도우 객체에 스크롤 이벤트 설정
        $window.on("scroll", function () {
            //스크롤이벤트가 발생했으므로 did_scroll변수의 값을 true로 변경
            did_scroll = true;
            //만약 윈도우의 스크롤탑값이 header의 높이보다 크면
            if ($window.scrollTop() > $header.height()) {
                //header에 minimize클래스 추가
                $header.addClass("minimize");
                //그렇지 않으면
            } else {
                //header에서 minimize클래스 제거
                $header.removeClass("minimize");
            }
        });
        //만약 스크롤 이벤트가 발생했고(did_scroll=true)
        //body객체가 open-menu클래스를 가지고 있지 않다면
        //has_scrolled함수 호출하고, did_scroll값을 false로 변경
        setInterval(function () {
            if (did_scroll && !$("body").hasClass("open-menu")) {
                has_scrolled();
                did_scroll = false;
            }
        }, 50);

        //has_scrolled함수 선언
        function has_scrolled() {
            //윈도우의 스크롤탑 값을 current_scroll변수에 저장
            current_scroll = $(this).scrollTop();               // scrollTop() : 모니터에 비치는 웹페이지의 최상단 위치 (높이값)
            console.log(current_scroll);
            //만약 마지막 스크롤이동값에서 현재 스크롤이동값을 뺀 양수값이 move_scroll값보다 작으면 함수 빠져나감(return)
            if (Math.abs(last_scroll - current_scroll) <= move_scroll) return;
            //만약 현재 스크롤이동값이 마지막 스크롤이동값보다 크면(스크롤을 아래로 이동하면)
            if (current_scroll > last_scroll) {
                //현재 스크롤이동값이 10 보다 크면 header 사라짐
                if (current_scroll > 10) {
                //$header.addClass("active");
                gsap.to($header, 0.4, {
                    autoAlpha: 0,
                    y: -$header.outerHeight(),
                    ease: Power3.easeOut,
                });
                }
                //스크롤을 위로 이동하면 header 나타남
            } else {
                //$header.removeClass("active");
                gsap.to($header, 0.4, { autoAlpha: 1, y: 0, ease: Power3.easeOut });
            }
            //현재 스크롤 이동값을 last_scroll변수에 저장
            last_scroll = current_scroll;
        }
    }
    //함수 호출
    minimize_header();




    // family site
    let sw=0;           // 스위치 변수
    $('.family_site > a').click(function(e) {
        
        e.preventDefault();                     // a 태그의 링크 기능(#으로 돌아감)을 막는 기능

        if (sw==0) {                            // 만약 sw 변수의 값이 0이면 .family_list가 나타나고, sw 변수의 값을 1로 변경
            $('.family_list').slideDown();
            $('.family_site > a').addClass('active');
            sw = 1;
        } else {                                // 만약 sw 변수의 값이 0이 아니면 .family_list가 들어가고, sw 변수의 값을 0으로 변경
            $('.family_list').slideUp();
            $('.family_site > a').removeClass('active');
            sw=0;
        }

    });

    // top 버튼
    $('.top').click(function() {
        $('html, body').animate({scrollTop:0});
    });


    
    

});



window.onload=function() {}

function changefn() {
    const filter = document.getElementById('list');               // body에서 아이디가 list인 요소/객체를 가져와서 lang 변수에 저장
    const result = document.getElementById('result');           // body에서 아이디가 result인 요소/객체를 가져와서 result 변수에 저장
    const str = filter.options[filter.selectedIndex].value;         // lang 변수만의 요소 특성 중 option의 value값을 읽어서 str 변수에 저장
    result.value = str;                                         // str 변수에 저장된 문자열을 result 입력란에 표시함
}







