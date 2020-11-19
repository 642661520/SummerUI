import $ from 'jquery';

const suiscrollbarbody = {
    open({
        background=undefined
    }) {

        let content='body'
        
        //#region 添加滑动条

        // $(content).wrap(`<div class="sui-border">
        //     </div>`)
        $(content).width('100%').height(2000)
        $(content).addClass('sui-borderbody').addClass('sui-scrollborder')
        // $(".sui-borderbody").addClass('sui-scroll')
        $(".sui-borderbody").append(`<div class="sui-scrollbar">
        <div class="sui-scrollline"><div class="sui-scrollline-line"></div></div>
        <div class="sui-scrollup fa fa-chevron-up"></div>
        <div class="sui-scrollbox">
        <div class="sui-scrollbox-box"></div>
        </div>
        <div class="sui-scrolldown fa fa-chevron-down"></div></div>`);


        // $(".sui-borderbody").append(`<div class="sui-scrollbar">
        // <div class="sui-scrollline">
        //         <div class="sui-scrollline-line"></div>
        //         <div class="sui-scrollbox"></div>
        //         <div class="sui-scrollup fa fa-chevron-up"></div>
        //     <div class="sui-scrolldown fa fa-chevron-down"></div>
        //     </div>
        // </div>`)
        // $(".sui-borderbody").addClass('sui-scroll-x')
        // $(".sui-borderbody").append(`<div class="sui-scrollbar-x">
        // <div class="sui-scrollline-x">
        //         <div class="sui-scrollline-line-x"></div>
        //         <div class="sui-scrollbox-x"></div>
        //         <div class="sui-scrollup-x fa fa-chevron-up"></div>
        //     <div class="sui-scrolldown-x fa fa-chevron-down"></div>
        //     </div>
        // </div>`)

        // $(".sui-borderbody").width($(content).width())

        // if (document.body.scrollHeight <= window.innerHeight) {
        //     $(content+' .sui-scrollbar').css({
        //         display:'none'
        //     })
        //     }else{
        //         $(content+' .sui-scrollbar').css({
        //             display:''
        //         })
        //     }
        //     if (document.body.scrollWidth <= window.innerWidth) {
        //         $(content+' .sui-scrollbar-x').css({
        //             display:'none'
        //         })
        //     }else{
        //         $(content+' .sui-scrollbar-x').css({
        //             display:''
        //         })
        //     }

        // if (!($(content).hasClass('sui-scroll') || $(content).hasClass('sui-scroll-x'))) {
        //     return
        // }
        //#endregion

        //#region content 处理
        let   content2 = 'html'
        let   content3 = window
            $(content + ' .sui-scrollbar').css({
                position: 'fixed'
            })
            $(content + ' .sui-scrollbar-x').css({
                position: 'fixed'
            })

        //#endregion


        // if ($(content).css("position") == 'static') {
        //     $(content).css({
        //         position: 'relative'
        //     })
        // }

        if (background == undefined) {
            background = $(content).css('background-color')
        }
        if (background == "rgba(0, 0, 0, 0)") {
            background = "#fff"
        }
        let height = $(content).prop("offsetHeight")
        if ($(content2).height() <= height) {
            height = $(content2).height()
        }
        let h = $(content).prop("scrollHeight") - height
        let width = $(content).parent().prop("offsetWidth")
        if ($(content2).width() <= width) {
            width = $(content2).width()
        }
        let w = $(content).prop("scrollWidth") - width
        
        // $(window).on('resize', function () {
        //     if (document.body.scrollHeight <= window.innerHeight) {
        //     $(content+' .sui-scrollbar').css({
        //         display:'none'
        //     })
        //     }else{
        //         $(content+' .sui-scrollbar').css({
        //             display:''
        //         })
        //     }
        //     if (document.body.scrollWidth <= window.innerWidth) {
        //         $(content+' .sui-scrollbar-x').css({
        //             display:'none'
        //         })
        //     }else{
        //         $(content+' .sui-scrollbar-x').css({
        //             display:''
        //         })
        //     }
        //     height = $(content).prop("offsetHeight")
        //     if ($(content2).height() <= height) {
        //         height = $(content2).height()
        //     }
        //     h = $(content).prop("scrollHeight") - height
        //     width = $(content).prop("offsetWidth")
        //     if ($(content2).width() <= width) {
        //         width = $(content2).width()
        //     }
        //     w = $(content).prop("scrollWidth") - width
        // })

        if (true) {
            $(content + ' .sui-scrollbar').css({
                'background-color': background
            })

            $('body').on('mousedown', '.sui-borderbody .sui-scrollbox', function (event) {
                let box2 = $(this).parent()
                let box = $(this)
                if (event.button == 0) {
                    let b = event.clientY
                    let top1 = parseInt(box.css("top"))
                    let top
                    document.onmousemove = function (event) {
                        let y = event.clientY
                        top = y - b + top1
                        if (top <= 0) {
                            top = 0
                        } else if (top >= box2.height() - box.height()) {
                            top = box2.height() - box.height()
                        }
                        box.css({
                            top: top
                        });
                        height = $(content).prop("offsetHeight")
                        if ($(content2).height() <= height) {
                            height = $(content2).height()
                        }
                        h = $(content).prop("scrollHeight") - height
                        let nowh = h * (top / (box2.height() - box.height()))
                        $(content2).prop({
                            "scrollTop": nowh
                        });
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                    return false;
                }
            });

            $(content3).on('scroll', function () {
                height = $(content).prop("offsetHeight")
                if ($(content2).height() <= height) {
                    height = $(content2).height()
                }
                h = $(content).prop("scrollHeight") - height
                let top = ($(content2).scrollTop() / h) * ($('.sui-scrollline').height() - $('.sui-scrollbox').height())
                $('.sui-scrollbox').css({
                    top: top
                });
            });

            $('.sui-borderbody .scrollup').on('mousedown', function () {
                let a = setInterval(function () {
                    $(".content").scrollTop($(".content").scrollTop() - h * 0.002)
                }, 1)
                $('.sui-borderbody .scrollup').mouseup(function () {
                    clearInterval(a)
                });
            })

            $('.sui-borderbody .scrolldown').on('mousedown', function () {
                let a = setInterval(function () {
                    $(".content").scrollTop($(".content").scrollTop() + h * 0.002)
                }, 1)
                $('.sui-borderbody .scrolldown').mouseup(function () {
                    clearInterval(a)
                });
            })

            $('body').on('click', '.sui-borderbody .scrollline', function (event) {
                let b = event.clientY
                let top = $(this).offset().top

                $('.content').animate({
                    scrollTop: (b - top) / ($('.sui-borderbody .scrollbar').height() - $('.sui-borderbody .scrollbox').height()) * h
                }, 300)
            })

            $('.border').hover(function () {
                // over
                $('.scrollbar').fadeIn(300)
            }, function () {
                // out
                $('.scrollbar').fadeOut(300)
            });

            $('.sui-borderbody .scrollbar').on('wheel', function (event) {
                let a = event.originalEvent.wheelDelta
                let top = parseInt($('.scrollbox').css('top'))
                // $(".content").animate({
                //     scrollTop:$(".content").scrollTop() -  a/1.2
                // },20)
                $(".content").scrollTop($(".content").scrollTop() - a / 1.2)
                console.log(a, top, event.originalEvent.wheelDelta);

            });




        }

        if (true) {
            $(content + '.sui-borderbody .sui-scrollbar-x').css({
                'background-color': background
            })

            if ($(content2).height() <= height) {
                height = $(content2).height()
            }

            $('body').on('mousedown', '.sui-borderbody .sui-scrollbox-x', function (event) {
                let box2 = $(this).parent()
                let box = $(this)
                console.log(box2.width(), box.width());
                if (event.button == 0) {
                    let a = event.clientX
                    let left1 = parseInt(box.css("left"))
                    let left
                    document.onmousemove = function (event) {
                        let x = event.clientX
                        left = x - a + left1
                        if (left <= 0) {
                            left = 0
                        } else if (left >= box2.width() - box.width()) {
                            left = box2.width() - box.width()
                        }
                        box.css({
                            left: left
                        });
                        width = $(content).prop("offsetWidth")
                        if ($(content2).width() <= width) {
                            height = $(content2).width()
                        }
                        h = $(content).prop("scrollWidth") - width
                        const noww = w * (left / (box2.width() - box.width()))
                        console.log(noww, w);
                        $(content2).prop({
                            "scrollLeft": noww
                        });
                    };
                    document.onmouseup = function () {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                    return false;
                }
            });

            $(content3).on('scroll', function () {
                width = $(content).prop("offsetWidth")
                if ($(content2).width() <= width) {
                    width = $(content2).width()
                }
                w = $(content).prop("scrollWidth") - width
                const left = ($(content2).scrollLeft() / w) * ($('.sui-borderbody .sui-scrollline-x').width() - $('.sui-borderbody .sui-scrollbox-x').width())
                $('.sui-borderbody .sui-scrollbox-x').css({
                    left: left
                });
            });
        }



        // console.log(width, $('html').width());





    }


}


export default suiscrollbarbody