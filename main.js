document.addEventListener('DOMContentLoaded',function(){

    if (document.getElementById('popup')) { 
        var myPopup = document.querySelector('.popup'),
            checkbox = document.querySelector('#popup'),
            popupClose = document.querySelector('.popup .close_btn');

        //쿠키 생성
        function setCookie(name, value, day){
            var date = new Date(); //현재 날짜 지정.
            date.setDate(date.getDate() + day);
            var mycookie = '';
            mycookie += name + '=' + value+';';
            mycookie +='Expires=' + date.toUTCString();
            document.cookie = mycookie; //쿠키 설정, 생성
        }//setCookie

        //쿠키 삭제
        function delCookie(name){
            var date = new Date();
            date.setDate(date.getDate() - 1);
            var setCookie = '';
            setCookie += name+'=Main;';
            setCookie +='Expires=' + date.toUTCString();
            document.cookie = setCookie; //쿠키 설정, 생성           
        }//delCookie

        //쿠키 확인
        function checkCookie(name){
            var cookies = document.cookie.split(';');
            // console.log(cookies);
            var visited = false; // 방문 거짓

            for(var i in cookies){
                if(cookies[i].indexOf(name) > -1){
                    visited = true;
                    // console.log(visited);
                }                
            }
            // console.log(visited);
            if(visited){
                //재방문
                myPopup.style.display = 'none';
            }else{
                //신규방문
                myPopup.style.display = 'block';
            }
        }//checkCookie
        checkCookie('portfolio');

        popupClose.addEventListener('click', function(){
            //a.checked true false
            if(checkbox.checked){
                //팝업을 다시 안보겠다. 팝업 닫고, 쿠키 생성.
                setCookie('portfolio','Main',1);
                myPopup.style.display = 'none';
            } else{
                //팝업을 계속 본다. 팝업 닫고, 쿠키 제거.
                myPopup.style.display = 'none';
                delCookie('portfolio');
            }
        });  

        var heroSlideWrapper = document.querySelector('.hero_slides_wrapper'),
            heroSlideUl = heroSlideWrapper.querySelector('.hero_slides'),
            heroSlides = document.querySelectorAll('.hero_slides >li'),
            heroSlideCount = heroSlides.length,
            hscurrentIdx = 0,
            hstimer = undefined;
            
        // 슬라이드 가로로 배열하기
        for(var x = 0; x < heroSlideCount; x++){
            heroSlides[x].style.left = x *100 +'%';
        }
        // 슬라이드 이동 함수 
        /*
        var 변수명 = 값;
        함수명 goToSlide(idx){할일} idx => parameter 매개변수
        function 함수명(매개변수){할일}

        goToSlide(0) --> slideContainer left 0%  //0 -> argument 인수(인자)
        goToSlide(1) --> slideContainer left -100%
        goToSlide(2) --> slideContainer left -200%
        */
        bsMoveSlide(0);
        function bsMoveSlide(idx){
            heroSlideUl.style.left = idx * -100 + '%';
            hscurrentIdx = idx;
        }
        function bsAutoSlide(){
            hstimer = setInterval(function(){
                var nxSlide = (hscurrentIdx + 1) % heroSlideCount;
                bsMoveSlide(nxSlide);
            }, 3000);
        }
        bsAutoSlide();

        heroSlideWrapper.addEventListener('mouseover',function(){
            clearInterval(hstimer);
            hstimer = undefined;
        });
        heroSlideWrapper.addEventListener('mouseout',function(){
            bsAutoSlide();
        });

        //slide
        let sliderWrapper = document.querySelector('.movie_slides_wrapper'),
            sliderUl = sliderWrapper.querySelector('.movie_slider');
        const slides = document.querySelectorAll('.movie_slider > li');
        let currentIdx = 0,
            slideCount,
            slideWidth = 250,
            slideMargin = 20,
            prevBtn = document.querySelector('#prev'),
            nextBtn = document.querySelector('#next');

        //슬라이드 탭
        let tabsMenu = document.querySelectorAll('.new_upcomming_mune li');

        tabsMenu.forEach(function(item){
            item.addEventListener('click',function(e){
                e.preventDefault();

                for(tm of tabsMenu){
                    tm.classList.remove('active');
                }
                item.classList.add('active');
                target = this.getAttribute('data-filter');

                slides.forEach(item =>{
    
                    item.remove();
                    if(item.className == target){
                        sliderUl.append(item);
                    }
                });
                slideCount = sliderUl.children.length;
                sliderUl.style.width = (slideWidth * slideCount) + slideMargin * (slideCount-1) + 'px';
                sliderUl.style.left = 0;
            }); //item click            
        });
        tabsMenu[0].click();

        function moveSlide(idx){
            sliderUl.style.left = -idx* (slideWidth + slideMargin) + 'px';
            currentIdx = idx;
        }
        //버튼으로 이동하기
        nextBtn.addEventListener('click', function(e){  
            e.preventDefault(); 
            if(currentIdx == slideCount - 5){
                moveSlide(0);   
            }else{
                moveSlide(currentIdx + 1);   
            }
        });
        prevBtn.addEventListener('click', function(e){  
            e.preventDefault();   
            if(currentIdx == 0){
                moveSlide(slideCount - 5);   
            }else{
                moveSlide(currentIdx - 1);   
            }
        });

        let schedule = document.querySelector('#schedule');
        let scheduleOST = schedule.offsetTop;
        let quickMenu = document.querySelector('.quick_menu');
        let quickOST = quickMenu.offsetTop;
        let boxWrap = document.querySelector('#box_wrap');
        let boxWrapOST = boxWrap.offsetTop;
        let banner = document.querySelector('.public_banners');
        let bannerOST = banner.offsetTop;
        window.addEventListener('scroll', function() {
            fadeAnimation(scheduleOST,schedule);
            fadeAnimation(quickOST,quickMenu);
            fadeAnimation(boxWrapOST,boxWrap);
            fadeAnimation(bannerOST,banner);
        });
        function fadeAnimation(targetOST,target) {
          if(this.pageYOffset > targetOST-900){
            if(!target.classList.contains('active')){ 
              target.classList.add('active'); 
            }
          }
        }//fadeanimation
    }

    // FAQ
    if (document.getElementById('faq')) {
        var accHeader = document.getElementsByClassName("acc_header");
        var i;

        for (i = 0; i < accHeader.length; i++) {
            accHeader[i].onclick = function(){
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("show");
            }
        }
    }

    // go to the top
    var btt = document.getElementById('back_to_top');
    // scrollAmt;
    window.addEventListener('scroll',function(){
        scrollAmt = window.pageYOffset;
        // console.log(scrollAmt);
        if(scrollAmt > 500){
            btt.classList.add('visible');
        }else{
            btt.classList.remove('visible');
        }
    });
    btt.addEventListener('click',function(e){
        e.preventDefault();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'  //IE에서 작동 안함
        });
    });
}); //onload


