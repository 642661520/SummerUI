import $ from 'jquery';

const suibox = {
	// #region 变量
	// 记录zidex最大值
	zindex: 100,
	// 限制边界距离
	boxmargin: 1,
	// 默认可移动区域
	titleclassname: '.title',
	index: 1,
	titleheight: 30,
	//#endregion

	//#region 新窗口
	open({
		type = 1,
		content,
		title,
		move = '.sui-suibox-title',
		moveOut = false,
		resize = true,
		minHeight = 200,
		minWidth = 200,
		offset = 'auto',
		anim = 0,
		fixed = true,
		closeBtn = 1,
		maxmin = true,
		shrink = false,
		btn = '确认',
		btncallback = [],
		theme,
		area = 'auto',
		cancel,
		success = function () {},
		end = function () {},
		moveEnd = function () {},
		resizeEnd = function () {},
		full = function () {},
		min = function () {},
		restore = function () {}
	}) {
		let boxmargin = suibox.boxmargin
		let boxindex = suibox.index
		let titleheight = suibox.titleheight
		let stretchminwidth = minWidth
		let stretchminheight = minHeight
		let contentwidth
		let contentheight
		let width
		let height
		//#region 记录窗口
		let boxmarginleft
		let boxmargintop
		let boxleft
		let boxtop
		let boxwidth
		let boxheight
		let transitions = false
		let adswidth = 10
		//#endregion

		//#region  未指定content,报错并跳出
		if (content == null) {
			console.log('%c stretcherror:%c‘' + content + '’不存在', 'color:#f00;font-size:20px;', 'color:#00f;font-size:20px;');
			return
		}
		//#endregion

		//#region title处理 content处理
		if (content instanceof $) {
			content = $(content)[0]
		}
		if ($(content).parents().length == 0) {
			for (let i = 0; i < $('.sui-suibox-text').length; i++) {
				console.log($('.sui-suibox-text').eq(i).html() == content);
				if ($('.sui-suibox-text').eq(i).html() == content) {
					$('.sui-suibox-text').eq(i).parent().parent().remove()
					break
				}
			}
			contentwidth = 0
			contentheight = 0
			$('body').append(`<div class="sui-suibox sui-suibox` +
				boxindex + `" id="sui-suibox` + (boxindex) + `"
        style="z-index:` + (++suibox.zindex) + `;">
        <div class="sui-suibox-content"><div class='sui-suibox-text'>` + content + `</div></div>
        </div>`)
		} else {
			//content大小保存
			contentwidth = $(content).width()
			contentheight = $(content).height()
			//#region 销毁旧窗口
			if ($(content).parents().hasClass('sui-suibox-content')) {
				$(content).parents().children('.sui-suibox-titlebar').remove()
				$(content).parents().children('.sui-btns').remove()
				$(content).parents().children('.stretch').remove()
				$(content).unwrap()
				$(content).unwrap()
			}
			//#endregion
			$(content).wrap(`<div class="sui-suibox-content"></div>`)
			$(content).parent().wrap(`<div class="sui-suibox sui-suibox` +
				boxindex + `" id="sui-suibox` + (boxindex) + `"
        style="z-index:` + (++suibox.zindex) + `;"></div>`)
		}

		//#region title处理

		if (title == false) {
			titleheight = 0
			if (closeBtn == 0) {
				$('.sui-suibox' + boxindex).prepend(`<div class="sui-suibox-titlebar">
            </div>`)
			} else {
				$('.sui-suibox' + boxindex).prepend(`
                <div class="sui-suibox-titlebar">
            <div class="sui-suibox-close2">
            <div class="close1">x</div>
            </div>
            </div>
        `)
			}
		} else {
			if (typeof title == 'string') {
				$('.sui-suibox' + boxindex).prepend(`<div class="sui-suibox-titlebar">
            <div class="sui-suibox-title">` + title + `</div>
        </div>`)
			}
			if (title == undefined) {
				$('.sui-suibox' + boxindex).prepend(`<div class="sui-suibox-titlebar">
            <div class="sui-suibox-title">窗口` + boxindex + `</div>
        </div>`)
			}
			if (maxmin == true) {
				if (shrink == true) {
					$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
                    <div class="sui-suibox-min">
                    <span></span>
                </div>
                <div class="sui-suibox-shrink">
                    <span class="shrink1"></span>
                    <span class="shrink2"></span>
                    <span class="shrink3"></span>
                    <span class="shrink4"></span>
                </div>
                <div class="sui-suibox-max">
                    <span class="max1"></span>
                    <span class="max2"></span>
                </div>
                    `)
					if (closeBtn == 0) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-max').css({
							right: '0px'
						})
						$('.sui-suibox' + boxindex + ' .sui-suibox-shrink').css({
							right: '30px'
						})
						$('.sui-suibox' + boxindex + ' .sui-suibox-min').css({
							right: '60px'
						})
					}
					if (closeBtn == 1) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
                <div class="sui-suibox-close">
                    <span class="close1"></span>
                    <span class="close2"></span>
                </div>
                    `)
					}
					if (closeBtn == 2) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
                    <div class="sui-suibox-close2">
                    <div class="close1">x</div>
                    </div>
                        `)
						$('.sui-suibox' + boxindex + ' .sui-suibox-max').css({
							right: '0px'
						})
						$('.sui-suibox' + boxindex + ' .sui-suibox-shrink').css({
							right: '30px'
						})
						$('.sui-suibox' + boxindex + ' .sui-suibox-min').css({
							right: '60px'
						})
					}
				} else if (shrink == false) {
					$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
                        <div class="sui-suibox-min">
                        <span></span>
                    </div>
                    <div class="sui-suibox-max">
                        <span class="max1"></span>
                        <span class="max2"></span>
                    </div>
                        `)
					if (closeBtn == 0) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-max').css({
							right: '0px'
						})
						$('.sui-suibox' + boxindex + ' .sui-suibox-min').css({
							right: '30px'
						})
					}
					if (closeBtn == 1) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
                    <div class="sui-suibox-close">
                        <span class="close1"></span>
                        <span class="close2"></span>
                    </div>
                        `)
						$('.sui-suibox' + boxindex + ' .sui-suibox-max').css({
							right: '30px'
						})
						$('.sui-suibox' + boxindex + ' .sui-suibox-min').css({
							right: '60px'
						})
					}
					if (closeBtn == 2) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
                        <div class="sui-suibox-close2">
                        <div class="close1">x</div>
                        </div>
                            `)
						$('.sui-suibox' + boxindex + ' .sui-suibox-max').css({
							right: '0px'
						})
						$('.sui-suibox' + boxindex + ' .sui-suibox-min').css({
							right: '30px'
						})
					}

				}
			} else if (maxmin == false) {
				if (shrink == true) {
					$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
                <div class="sui-suibox-shrink">
                    <span class="shrink1"></span>
                    <span class="shrink2"></span>
                    <span class="shrink3"></span>
                    <span class="shrink4"></span>
                </div>
                    `)
					if (closeBtn == 0) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-shrink').css({
							right: '0px'
						})
					}
					if (closeBtn == 1) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
            <div class="sui-suibox-close">
                <span class="close1"></span>
                <span class="close2"></span>
            </div>
                `)
						$('.sui-suibox' + boxindex + ' .sui-suibox-shrink').css({
							right: '30px'
						})
					}
					if (closeBtn == 2) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
            <div class="sui-suibox-close2">
            <div class="close1">x</div>
            </div>
                `)
						$('.sui-suibox' + boxindex + ' .sui-suibox-shrink').css({
							right: '0px'
						})
					}
				} else if (shrink == false) {
					if (closeBtn == 0) {}
					if (closeBtn == 1) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
            <div class="sui-suibox-close">
                <span class="close1"></span>
                <span class="close2"></span>
            </div>
                `)
					}
					if (closeBtn == 2) {
						$('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').append(`
            <div class="sui-suibox-close2">
            <div class="close1">x</div>
            </div>
                `)
					}
				}
			}
		}

		//#region title长度调整
		let titlebox = 0
		if ($('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').children('.sui-suibox-shrink').length) {
			titlebox++
		}
		if ($('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').children('.sui-suibox-close').length) {
			titlebox++
		}
		if ($('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').children('.sui-suibox-min').length) {
			titlebox++
		}
		if ($('.sui-suibox' + boxindex + ' .sui-suibox-titlebar').children('.sui-suibox-max').length) {
			titlebox++
		}
		switch (titlebox) {
			case 0:
				$('.sui-suibox' + boxindex + ' .sui-suibox-title')
					.addClass('sui-suibox-title0');
				break;
			case 1:
				$('.sui-suibox' + boxindex + ' .sui-suibox-title')
					.addClass('sui-suibox-title1');
				break;
			case 2:
				$('.sui-suibox' + boxindex + ' .sui-suibox-title')
					.addClass('sui-suibox-title2');
				break;
			case 3:
				$('.sui-suibox' + boxindex + ' .sui-suibox-title')
					.addClass('sui-suibox-title3');
				break;
			default:
				break;
		}
		//#endregion

		//#endregion


		//#endregion

		//#region btn
		if (type == 0) {
			if (typeof btn == 'string') {
				$('#sui-suibox' + boxindex + ' .sui-suibox-content').append(`
                <div class='sui-btns'>
                <button class='sui-btn btn1'>` + btn + `</button>
                </div>`)
			}
			if (btn instanceof Array) {
				$('#sui-suibox' + boxindex + ' .sui-suibox-content').append(`
                <div class='sui-btns'>
                </div>`)
				for (let i = 0; i < btn.length; i++) {
					$('#sui-suibox' + boxindex + ' .sui-btns').append(`
                <button class='sui-btn btn` + (i + 1) + `'>` + btn[i] + `</button>`)
					$('body').on('mousedown', '#sui-suibox' + boxindex + ' .btn' + (i + 1), function () {
						if (btncallback[i] instanceof Function) {
							btncallback[i]()
						}
					})
				}
			}
			//#region 关闭窗口
			$('body').on('mousedown', '#sui-suibox' + boxindex + ' .btn1', function () {

				let left = null
				let top = null
				if (cancel != undefined) {
					if (!confirm('是否关闭窗口？')) {
						return
					} else if (cancel instanceof Function) {
						cancel()
					}
				}
				if (fixed) {
					left = $('#sui-suibox' + boxindex).offset().left - $(window).scrollLeft()
					top = $('#sui-suibox' + boxindex).offset().top - $(window).scrollTop()
				} else {
					left = $('#sui-suibox' + boxindex).offset().left
					top = $('#sui-suibox' + boxindex).offset().top
				}

				let width = $('#sui-suibox' + boxindex).width()
				let height = $('#sui-suibox' + boxindex).height()
				$('#sui-suibox' + boxindex).css({
					transition: 'none'
				})
				let show = new Promise(function (r) {
					$('#sui-suibox' + boxindex).animate({
						left: left + width * 0.5,
						top: top + height * 0.5,
						width: 0,
						height: 0,
					}, 300, function () {
						if ($(content).parents().length == 0) {
							$('#sui-suibox' + boxindex).remove()
						} else {
							$('#sui-suibox' + boxindex + " .sui-suibox-titlebar").remove()
							$('#sui-suibox' + boxindex + " .stretch").remove()
							$('#sui-suibox' + boxindex + " .sui-btns").remove()
							$(content).unwrap()
							$(content).unwrap()
							$(content).css({
								display: ''
							})
						}
						r(end)
					})
				})
				show.then(function (data) {
					console.log('#sui-suibox' + boxindex + '销毁成功');
					data()
				})

			})
			//#endregion

		}

		//#endregion

		// #region 高宽处理
		if (typeof area == 'string') {
			if (area == 'auto') {
				width = contentwidth
				height = contentheight + titleheight
				$('#sui-suibox' + boxindex).width(width)
				$('#sui-suibox' + boxindex).height(height)
			} else {
				height = contentheight
				$('#sui-suibox' + boxindex).css({
					width: area,
					height: height
				})
				width = $('#sui-suibox' + boxindex).width()
			}
		} else {
			$('#sui-suibox' + boxindex).width(area[0])
			$('#sui-suibox' + boxindex).height(area[1])
			height = $('#sui-suibox' + boxindex).height()
			width = $('#sui-suibox' + boxindex).width()
		}
		$('#sui-suibox' + boxindex).css({
			transition: 'none'
		})
		$(content).css({
			display: 'block'
		})
		//#endregion

		//#region offset处理
		if (offset == 'auto') {
			$('#sui-suibox' + boxindex).css({
				top: ($(window).height() - height) * 0.5,
				left: ($(window).width() - width) * 0.5
			})
		} else if (offset == 'lb') {
			$('#sui-suibox' + boxindex).css({
				top: ($(window).height() - height),
				left: 0
			})
		} else if (offset == 'rb') {
			$('#sui-suibox' + boxindex).css({
				top: ($(window).height() - height),
				left: ($(window).width() - width - 20)
			})
		} else if (offset == 'rt') {
			$('#sui-suibox' + boxindex).css({
				top: 10,
				left: ($(window).width() - width - 20)
			})
		}
		//#endregion

		//#region fixed处理
		if (fixed == false) {
			$('#sui-suibox' + boxindex).css({
				position: 'absolute'

			})
		}
		//#endregion

		//#region anim处理 (open+close)
		let left = null
		let top = null
		if (fixed) {
			left = $('#sui-suibox' + boxindex).offset().left - $(window).scrollLeft()
			top = $('#sui-suibox' + boxindex).offset().top - $(window).scrollTop()
		} else {
			left = $('#sui-suibox' + boxindex).offset().left
			top = $('#sui-suibox' + boxindex).offset().top
		}

		//#region anim == 0 平滑放大。默认
		if (anim == 0) {
			$('#sui-suibox' + boxindex).css({
				left: left + width * 0.5,
				top: top + height * 0.5,
				width: 0,
				height: 0
			})
			let open = new Promise(function (r) {
				$('#sui-suibox' + boxindex).animate({
					width: width,
					height: height,
					left: left,
					top: top,
				}, 300, function () {
					r(success)
				})
			})
			open.then(function (data) {
				//#region 记录窗口
				boxmarginleft = parseInt($('#sui-suibox' + boxindex).css('margin-left'))
				boxmargintop = parseInt($('#sui-suibox' + boxindex).css('margin-top'))
				boxleft = parseInt($('#sui-suibox' + boxindex).css('left'))
				boxtop = parseInt($('#sui-suibox' + boxindex).css('top'))
				boxwidth = $('#sui-suibox' + boxindex).width()
				boxheight = $('#sui-suibox' + boxindex).height()
				//#endregion
				console.log('#sui-suibox' + boxindex + '创建成功');
				data()
			})
			//#region 关闭窗口
			let close = ' .sui-suibox-close'
			if (title == false || closeBtn == 2) {
				close = ' .sui-suibox-close2'
			}
			$('body').on('mousedown', '#sui-suibox' + boxindex + close, function () {
				let left = null
				let top = null
				if (cancel != undefined) {
					if (!confirm('是否关闭窗口？')) {
						return
					} else if (cancel instanceof Function) {
						cancel()
					}
				}
				if (fixed) {
					left = $('#sui-suibox' + boxindex).offset().left - $(window).scrollLeft()
					top = $('#sui-suibox' + boxindex).offset().top - $(window).scrollTop()
				} else {
					left = $('#sui-suibox' + boxindex).offset().left
					top = $('#sui-suibox' + boxindex).offset().top
				}

				let width = $('#sui-suibox' + boxindex).width()
				let height = $('#sui-suibox' + boxindex).height()
				$('#sui-suibox' + boxindex).css({
					transition: 'none'
				})
				let show = new Promise(function (r) {
					$('#sui-suibox' + boxindex).animate({
						left: left + width * 0.5,
						top: top + height * 0.5,
						width: 0,
						height: 0,
					}, 300, function () {
						if ($(content).parents().length == 0) {
							$('#sui-suibox' + boxindex).remove()
						} else {
							$('#sui-suibox' + boxindex + " .sui-suibox-titlebar").remove()
							$('#sui-suibox' + boxindex + " .stretch").remove()
							$('#sui-suibox' + boxindex + " .sui-btns").remove()
							$(content).unwrap()
							$(content).unwrap()
							$(content).css({
								display: ''
							})
						}

						r(end)
					})
				})
				show.then(function (data) {
					console.log('#sui-suibox' + boxindex + '销毁成功');
					data()
				})

			})
			//#endregion
		}
		//#endregion

		//#region anim == 1 从上掉落
		if (anim == 1) {
			$('#sui-suibox' + boxindex).css({
				// left: left + width * 0.5 ,
				top: -height,
				// width: 0,
				// height: 0
			})
			let open = new Promise(function (r) {
				$('#sui-suibox' + boxindex).animate({
					// width: width,
					// height: height,
					// left: left,
					top: top,
				}, 300, function () {
					r(success)
				})
			})
			open.then(function (data) {
				//#region 记录窗口
				boxmarginleft = parseInt($('#sui-suibox' + boxindex).css('margin-left'))
				boxmargintop = parseInt($('#sui-suibox' + boxindex).css('margin-top'))
				boxleft = parseInt($('#sui-suibox' + boxindex).css('left'))
				boxtop = parseInt($('#sui-suibox' + boxindex).css('top'))
				boxwidth = $('#sui-suibox' + boxindex).width()
				boxheight = $('#sui-suibox' + boxindex).height()
				//#endregion
				console.log('#sui-suibox' + boxindex + '创建成功');
				data()
			})
			//#region 关闭窗口
			let close = ' .sui-suibox-close'
			if (title == false || closeBtn == 2) {
				close = ' .sui-suibox-close2'
			}
			$('body').on('mousedown', '#sui-suibox' + boxindex + close, function () {
				let left = null
				let top = null
				if (cancel != undefined) {
					if (!confirm('是否关闭窗口？')) {
						return
					} else if (cancel instanceof Function) {
						cancel()
					}
				}
				if (fixed) {
					left = $('#sui-suibox' + boxindex).offset().left - $(window).scrollLeft()
					top = $('#sui-suibox' + boxindex).offset().top - $(window).scrollTop()
				} else {
					left = $('#sui-suibox' + boxindex).offset().left
					top = $('#sui-suibox' + boxindex).offset().top
				}

				let width = $('#sui-suibox' + boxindex).width()
				let height = $('#sui-suibox' + boxindex).height()
				$('#sui-suibox' + boxindex).css({
					transition: 'none'
				})
				let show = new Promise(function (r) {
					$('#sui-suibox' + boxindex).animate({
						top: -width,
					}, 300, function () {
						if ($(content).parents().length == 0) {
							$('#sui-suibox' + boxindex).remove()
						} else {
							$('#sui-suibox' + boxindex + " .sui-suibox-titlebar").remove()
							$('#sui-suibox' + boxindex + " .stretch").remove()
							$('#sui-suibox' + boxindex + " .sui-btns").remove()
							$(content).unwrap()
							$(content).unwrap()
							$(content).css({
								display: ''
							})
						}
						r(end)
					})
				})
				show.then(function (data) {
					console.log('#sui-suibox' + boxindex + '销毁成功');
					data()
				})

			})
			//#endregion

		}
		//#endregion

		//#region anim == 2 从最底部往上滑入
		if (anim == 2) {
			$('#sui-suibox' + boxindex).css({
				// left: left + width * 0.5 ,
				top: $(window).height() + height,
				// width: 0,
				// height: 0
			})
			let open = new Promise(function (r) {
				$('#sui-suibox' + boxindex).animate({
					// width: width,
					// height: height,
					// left: left,
					top: top,
				}, 300, function () {
					r(success)
				})
			})
			open.then(function (data) {
				//#region 记录窗口
				boxmarginleft = parseInt($('#sui-suibox' + boxindex).css('margin-left'))
				boxmargintop = parseInt($('#sui-suibox' + boxindex).css('margin-top'))
				boxleft = parseInt($('#sui-suibox' + boxindex).css('left'))
				boxtop = parseInt($('#sui-suibox' + boxindex).css('top'))
				boxwidth = $('#sui-suibox' + boxindex).width()
				boxheight = $('#sui-suibox' + boxindex).height()
				//#endregion
				console.log('#sui-suibox' + boxindex + '创建成功');
				data()
			})
			//#region 关闭窗口
			let close = ' .sui-suibox-close'
			if (title == false || closeBtn == 2) {
				close = ' .sui-suibox-close2'
			}
			$('body').on('mousedown', '#sui-suibox' + boxindex + close, function () {
				let left = null
				let top = null
				if (cancel != undefined) {
					if (!confirm('是否关闭窗口？')) {
						return
					} else if (cancel instanceof Function) {
						cancel()
					}
				}
				if (fixed) {
					left = $('#sui-suibox' + boxindex).offset().left - $(window).scrollLeft()
					top = $('#sui-suibox' + boxindex).offset().top - $(window).scrollTop()
				} else {
					left = $('#sui-suibox' + boxindex).offset().left
					top = $('#sui-suibox' + boxindex).offset().top
				}

				let width = $('#sui-suibox' + boxindex).width()
				let height = $('#sui-suibox' + boxindex).height()
				$('#sui-suibox' + boxindex).css({
					transition: 'none'
				})
				let show = new Promise(function (r) {
					$('#sui-suibox' + boxindex).animate({
						top: $(window).height() + height,
					}, 300, function () {
						if ($(content).parents().length == 0) {
							$('#sui-suibox' + boxindex).remove()
						} else {
							$('#sui-suibox' + boxindex + " .sui-suibox-titlebar").remove()
							$('#sui-suibox' + boxindex + " .stretch").remove()
							$('#sui-suibox' + boxindex + " .sui-btns").remove()
							$(content).unwrap()
							$(content).unwrap()
							$(content).css({
								display: ''
							})
						}
						r(end)
					})
				})
				show.then(function (data) {
					console.log('#sui-suibox' + boxindex + '销毁成功');
					data()
				})

			})
			//#endregion

		}
		//#endregion

		//#region anim == 3 从左滑入
		if (anim == 3) {
			$('#sui-suibox' + boxindex).css({
				left: -width,
			})
			let open = new Promise(function (r) {
				$('#sui-suibox' + boxindex).animate({
					// width: width,
					// height: height,
					left: left,
					// top: top,
				}, 300, function () {
					r(success)
				})
			})
			open.then(function (data) {
				//#region 记录窗口
				boxmarginleft = parseInt($('#sui-suibox' + boxindex).css('margin-left'))
				boxmargintop = parseInt($('#sui-suibox' + boxindex).css('margin-top'))
				boxleft = parseInt($('#sui-suibox' + boxindex).css('left'))
				boxtop = parseInt($('#sui-suibox' + boxindex).css('top'))
				boxwidth = $('#sui-suibox' + boxindex).width()
				boxheight = $('#sui-suibox' + boxindex).height()
				//#endregion
				console.log('#sui-suibox' + boxindex + '创建成功');
				data()
			})
			//#region 关闭窗口
			let close = ' .sui-suibox-close'
			if (title == false || closeBtn == 2) {
				close = ' .sui-suibox-close2'
			}
			$('body').on('mousedown', '#sui-suibox' + boxindex + close, function () {
				let left = null
				let top = null
				if (cancel != undefined) {
					if (!confirm('是否关闭窗口？')) {
						return
					} else if (cancel instanceof Function) {
						cancel()
					}
				}
				if (fixed) {
					left = $('#sui-suibox' + boxindex).offset().left - $(window).scrollLeft()
					top = $('#sui-suibox' + boxindex).offset().top - $(window).scrollTop()
				} else {
					left = $('#sui-suibox' + boxindex).offset().left
					top = $('#sui-suibox' + boxindex).offset().top
				}

				let width = $('#sui-suibox' + boxindex).width()
				let height = $('#sui-suibox' + boxindex).height()
				$('#sui-suibox' + boxindex).css({
					transition: 'none'
				})
				let show = new Promise(function (r) {
					$('#sui-suibox' + boxindex).animate({
						left: -width,
					}, 300, function () {
						if ($(content).parents().length == 0) {
							$('#sui-suibox' + boxindex).remove()
						} else {
							$('#sui-suibox' + boxindex + " .sui-suibox-titlebar").remove()
							$('#sui-suibox' + boxindex + " .stretch").remove()
							$('#sui-suibox' + boxindex + " .sui-btns").remove()
							$(content).unwrap()
							$(content).unwrap()
							$(content).css({
								display: ''
							})
						}
						r(end)
					})
				})
				show.then(function (data) {
					console.log('#sui-suibox' + boxindex + '销毁成功');
					data()
				})

			})
			//#endregion

		}
		//#endregion

		//#region anim == 4 从左翻滚
		if (anim == 4) {
			$('#sui-suibox' + boxindex).addClass('sui-anim4')
			$('#sui-suibox' + boxindex).css({
				width: 0,
				height: 0,
				left: -width,
				top: top + height * 0.5,
			})
			let open = new Promise(function (r) {

				$('#sui-suibox' + boxindex).animate({
					width: width,
					height: height,
					left: left,
					top: top,
				}, 300, function () {
					r(success)
				})
			})
			open.then(function (data) {
				//#region 记录窗口
				boxmarginleft = parseInt($('#sui-suibox' + boxindex).css('margin-left'))
				boxmargintop = parseInt($('#sui-suibox' + boxindex).css('margin-top'))
				boxleft = parseInt($('#sui-suibox' + boxindex).css('left'))
				boxtop = parseInt($('#sui-suibox' + boxindex).css('top'))
				boxwidth = $('#sui-suibox' + boxindex).width()
				boxheight = $('#sui-suibox' + boxindex).height()
				$('#sui-suibox' + boxindex).removeClass('sui-anim4')
				//#endregion
				console.log('#sui-suibox' + boxindex + '创建成功');
				data()
			})
			//#region 关闭窗口
			let close = ' .sui-suibox-close'
			if (title == false || closeBtn == 2) {
				close = ' .sui-suibox-close2'
			}
			$('body').on('mousedown', '#sui-suibox' + boxindex + close, function () {
				let left = null
				let top = null
				if (cancel != undefined) {
					if (!confirm('是否关闭窗口？')) {
						return
					} else if (cancel instanceof Function) {
						cancel()
					}
				}
				if (fixed) {
					left = $('#sui-suibox' + boxindex).offset().left - $(window).scrollLeft()
					top = $('#sui-suibox' + boxindex).offset().top - $(window).scrollTop()
				} else {
					left = $('#sui-suibox' + boxindex).offset().left
					top = $('#sui-suibox' + boxindex).offset().top
				}

				let width = $('#sui-suibox' + boxindex).width()
				let height = $('#sui-suibox' + boxindex).height()
				$('#sui-suibox' + boxindex).css({
					transition: 'none'
				})
				$('#sui-suibox' + boxindex).addClass('sui-anim4-2')
				let show = new Promise(function (r) {
					$('#sui-suibox' + boxindex).animate({
						width: 0,
						height: 0,
						top: top + height * 0.5,
						left: -width,
					}, 300, function () {
						if ($(content).parents().length == 0) {
							$('#sui-suibox' + boxindex).remove()
						} else {
							$('#sui-suibox' + boxindex + " .sui-suibox-titlebar").remove()
							$('#sui-suibox' + boxindex + " .stretch").remove()
							$('#sui-suibox' + boxindex + " .sui-btns").remove()
							$(content).unwrap()
							$(content).unwrap()
							$(content).css({
								display: ''
							})
						}
						r(end)
					})
				})
				show.then(function (data) {
					console.log('#sui-suibox' + boxindex + '销毁成功');
					data()
				})

			})
			//#endregion

		}
		//#endregion

		//#region anim == 5 渐显
		if (anim == 5) {
			// $('#sui-suibox' + boxindex).addClass('sui-anim4')
			$('#sui-suibox' + boxindex).css({
				opacity: 0
			})
			let open = new Promise(function (r) {
				$('#sui-suibox' + boxindex).animate({
					opacity: 1
				}, 300, function () {
					r(success)
				})
			})
			open.then(function (data) {
				//#region 记录窗口
				boxmarginleft = parseInt($('#sui-suibox' + boxindex).css('margin-left'))
				boxmargintop = parseInt($('#sui-suibox' + boxindex).css('margin-top'))
				boxleft = parseInt($('#sui-suibox' + boxindex).css('left'))
				boxtop = parseInt($('#sui-suibox' + boxindex).css('top'))
				boxwidth = $('#sui-suibox' + boxindex).width()
				boxheight = $('#sui-suibox' + boxindex).height()
				//#endregion
				console.log('#sui-suibox' + boxindex + '创建成功');
				data()
			})
			//#region 关闭窗口
			let close = ' .sui-suibox-close'
			if (title == false || closeBtn == 2) {
				close = ' .sui-suibox-close2'
			}
			$('body').on('mousedown', '#sui-suibox' + boxindex + close, function () {
				let left = null
				let top = null
				if (cancel != undefined) {
					if (!confirm('是否关闭窗口？')) {
						return
					} else if (cancel instanceof Function) {
						cancel()
					}
				}
				if (fixed) {
					left = $('#sui-suibox' + boxindex).offset().left - $(window).scrollLeft()
					top = $('#sui-suibox' + boxindex).offset().top - $(window).scrollTop()
				} else {
					left = $('#sui-suibox' + boxindex).offset().left
					top = $('#sui-suibox' + boxindex).offset().top
				}

				let width = $('#sui-suibox' + boxindex).width()
				let height = $('#sui-suibox' + boxindex).height()
				$('#sui-suibox' + boxindex).css({
					transition: 'none'
				})
				let show = new Promise(function (r) {
					$('#sui-suibox' + boxindex).animate({
						opacity: 0
					}, 300, function () {
						if ($(content).parents().length == 0) {
							$('#sui-suibox' + boxindex).remove()
						} else {
							$('#sui-suibox' + boxindex + " .sui-suibox-titlebar").remove()
							$('#sui-suibox' + boxindex + " .stretch").remove()
							$('#sui-suibox' + boxindex + " .sui-btns").remove()
							$(content).unwrap()
							$(content).unwrap()
							$(content).css({
								display: ''
							})
						}
						r(end)
					})
				})
				show.then(function (data) {
					console.log('#sui-suibox' + boxindex + '销毁成功');
					data()
				})

			})
			//#endregion

		}
		//#endregion

		//#region anim == 6 抖动
		if (anim == 6) {
			$('#sui-suibox' + boxindex).addClass('sui-anim6')
			$('#sui-suibox' + boxindex).css({
				opacity: 0
			})
			let open = new Promise(function (r) {
				$('#sui-suibox' + boxindex).animate({
					opacity: 1
				}, 300, function () {
					r(success)
				})
			})
			open.then(function (data) {
				//#region 记录窗口
				boxmarginleft = parseInt($('#sui-suibox' + boxindex).css('margin-left'))
				boxmargintop = parseInt($('#sui-suibox' + boxindex).css('margin-top'))
				boxleft = parseInt($('#sui-suibox' + boxindex).css('left'))
				boxtop = parseInt($('#sui-suibox' + boxindex).css('top'))
				boxwidth = $('#sui-suibox' + boxindex).width()
				boxheight = $('#sui-suibox' + boxindex).height()
				$('#sui-suibox' + boxindex).removeClass('sui-anim6')
				//#endregion
				console.log('#sui-suibox' + boxindex + '创建成功');
				data()
			})
			//#region 关闭窗口
			let close = ' .sui-suibox-close'
			if (title == false || closeBtn == 2) {
				close = ' .sui-suibox-close2'
			}
			$('body').on('mousedown', '#sui-suibox' + boxindex + close, function () {
				let left = null
				let top = null
				if (cancel != undefined) {
					if (!confirm('是否关闭窗口？')) {
						return
					} else if (cancel instanceof Function) {
						cancel()
					}
				}
				if (fixed) {
					left = $('#sui-suibox' + boxindex).offset().left - $(window).scrollLeft()
					top = $('#sui-suibox' + boxindex).offset().top - $(window).scrollTop()
				} else {
					left = $('#sui-suibox' + boxindex).offset().left
					top = $('#sui-suibox' + boxindex).offset().top
				}

				let width = $('#sui-suibox' + boxindex).width()
				let height = $('#sui-suibox' + boxindex).height()
				$('#sui-suibox' + boxindex).css({
					transition: 'none'
				})
				$('#sui-suibox' + boxindex).addClass('sui-anim6')
				let show = new Promise(function (r) {
					$('#sui-suibox' + boxindex).animate({
						opacity: 0
					}, 300, function () {
						if ($(content).parents().length == 0) {
							$('#sui-suibox' + boxindex).remove()
						} else {
							$('#sui-suibox' + boxindex + " .sui-suibox-titlebar").remove()
							$('#sui-suibox' + boxindex + " .stretch").remove()
							$('#sui-suibox' + boxindex + " .sui-btns").remove()
							$(content).unwrap()
							$(content).unwrap()
							$(content).css({
								display: ''
							})
						}
						r(end)
					})
				})
				show.then(function (data) {
					console.log('#sui-suibox' + boxindex + '销毁成功');
					data()
				})

			})
			//#endregion

		}
		//#endregion


		//#endregion

		//#region resize判断
		if (resize == true) {
			$('#sui-suibox' + boxindex).append(`
        <div class="stretch stretch-lt"></div>
        <div class="stretch stretch-lb"></div>
        <div class="stretch stretch-rt"></div>
        <div class="stretch stretch-rb"></div>`)
		} else if ((resize instanceof Array)) {
			if (resize[2] == 1) {
				$('#sui-suibox' + boxindex).append(`
        <div class="stretch stretch-lt"></div>`)
			}
			if (resize[1] == 1) {
				$('#sui-suibox' + boxindex).append(`
        <div class="stretch stretch-lb"></div>`)
			}
			if (resize[3] == 1) {
				$('#sui-suibox' + boxindex).append(`
                <div class="stretch stretch-rt"></div>`)
			}
			if (resize[0] == 1) {
				$('#sui-suibox' + boxindex).append(`
                <div class="stretch stretch-rb"></div>`)
			}
		}
		//#endregion

		//#region 点击置顶
		$('body').on('mousedown', '#sui-suibox' + boxindex, function () {
			$(this).css('z-index', ++suibox.zindex)
		})
		$('body').on('mousedown', '.stretch', function () {
			$(this).parent().css('z-index', ++suibox.zindex)
		})
		//#endregion

		//#region 窗口移动

		let box = null
		if (move == '.sui-suibox-title') {
			box = $('#sui-suibox' + boxindex + ' ' + move).parent().parent()
		} else {
			$('#sui-suibox' + boxindex + ' .sui-suibox-title').addClass('sui-title-nohover')
			$('#sui-suibox' + boxindex + ' .sui-suibox-title').css({
				cursor: 'no-drop',
			})
			for (let i = 0; i < $('#sui-suibox' + boxindex + ' ' + move).parents().length; i++) {
				if ($('#sui-suibox' + boxindex + ' ' + move).parents().eq(i).hasClass('sui-suibox' + boxindex)) {
					box = $('#sui-suibox' + boxindex + ' ' + move).parents().eq(i)

				}
			}
		}
		$(move).css({
			cursor: 'move'
		})

		$('body').on('mousedown', '#sui-suibox' + boxindex + ' ' + move, function (event) {
			transitions = false
			if ($('#sui-suibox' + boxindex).hasClass('sui-max')) {
				return
			}
			let top = $(document).scrollTop();
			let left = $(document).scrollLeft();
			$(document).on('scroll.unable', function () {
				$(document).scrollTop(top);
				$(document).scrollLeft(left);
			})
			if (box.width() > $(window).width()) {
				box.width($(window).width() - boxmargin)
			}
			if (box.css('transition') != ('none 0s ease 0s' || 'all 0s ease 0s')) {
				box.css({
					'transition': 'none'
				})
			}
			// box.css('z-index', ++suibox.zindex)
			if (event.button == 0) {
				let a = event.clientX
				let b = event.clientY
				let offsetX = event.offsetX
				let offsetY = event.offsetY
				if(title!==false&& typeof title=='string'){
					offsetY=offsetY+titleheight
				}
				console.log(offsetY);
				
				//针对marginleft,margintop进行了位置修正
				let marginleft = parseInt(box.css('margin-left'))
				let margintop = parseInt(box.css('margin-top'))
				let left = null
				let top = null
				if (fixed) {
					left = box.offset().left - $(window).scrollLeft()
					top = box.offset().top - $(window).scrollTop()
				} else {
					left = box.offset().left
					top = box.offset().top
				}
				a = a - left
				b = b - top
				document.onmousemove = function (event) {
					let x = event.clientX
					let y = event.clientY

					left = x - a - marginleft
					top = y - b - margintop

					//#region  吸附
					for (let i = 0; i < $('div[id^=sui-suibox]').length; i++) {
						if ($('div[id^=sui-suibox]')[i] == box[0]) {
							i++
							if (i === $('div[id^=sui-suibox]').length) {
								break
							}
						}
						let box2 = $('div[id^=sui-suibox]').eq(i)
						if ((box.offset().left + box.width()) + adswidth >= box2.offset().left &&
							box.offset().left + adswidth <= (box2.offset().left + box2.width())) {
							// if (Math.abs(box.offset().top - box2.offset().top) <= adswidth) {
							// 	top = box2.offset().top
							// } else
							if (Math.abs(box.offset().top - (box2.offset().top + box2.height())) <= adswidth) {
								top = box2.offset().top + box2.height()
							} else if (Math.abs(box.offset().top + box.height() - box2.offset().top) <= adswidth) {
								top = box2.offset().top - box.height()
							}
							// else if (Math.abs(box.offset().top + box.height() - (box2.offset().top + box2.height())) <= adswidth) {
							// 	top = box2.offset().top + box2.height() - box.height()
							// }
							if (Math.abs(top + offsetY - event.clientY) >= adswidth * 1.5) {
								// top = top - (top - event.clientY)
								let fx = 1
								if ((top + offsetY - event.clientY) > 0) {
									fx = -1
								}
								top = top + adswidth * 1.5 * fx
							}
						}
						if ((box.offset().top + box.height()) + adswidth >= box2.offset().top &&
							box.offset().top + adswidth <= (box2.offset().top + box2.height())) {
							// if (Math.abs(box.offset().left - box2.offset().left) <= adswidth) {
							// 	left = box2.offset().left
							// } else
							if (Math.abs(box.offset().left - (box2.offset().left + box2.width())) <= adswidth) {
								left = box2.offset().left + box2.width()
							} else if (Math.abs(box.offset().left + box.width() - box2.offset().left) <= adswidth) {
								left = box2.offset().left - box.width()
							}
							// else if (Math.abs(box.offset().left + box.width() - (box2.offset().left + box2.width())) <= adswidth) {
							// 	left = box2.offset().left + box2.width() - box.width()
							// }
							if (Math.abs(left + offsetX - event.clientX) >= adswidth * 1.5) {
								// left = left - (left - event.clientX)
								let fx = 1
								if ((left + offsetX - event.clientX) > 0) {
									fx = -1
								}

								left = left + adswidth * 1.5 * fx
								console.log(left, left + offsetX - event.clientX);
							}
						}
					}
					//#endregion

					if (fixed) {
						if (!moveOut) {
							// 判断是否到达区域边界
							if (left <= -marginleft) {
								left = -marginleft
							} else if (left > ($(window).width() - box.width() - marginleft -
									boxmargin)) {
								left = $(window).width() - box.width() - marginleft - boxmargin
							}
							if (top <= -margintop) {
								top = -margintop
							} else if (top > ($(window).height() - box.height() - margintop -
									boxmargin)) {
								top = $(window).height() - box.height() - margintop - boxmargin
							}
						}
					} else {
						if (!moveOut) {
							if (left <= -marginleft + $(window).scrollLeft()) {
								left = -marginleft + $(window).scrollLeft()
							} else if (left > ($(window).width() - box.width() - marginleft -
									boxmargin + $(window).scrollLeft())) {
								left = $(window).width() - box.width() - marginleft - boxmargin + $(window).scrollLeft()
							}
							if (top <= -margintop + $(window).scrollTop()) {
								top = -margintop + $(window).scrollTop()
							} else if (top > ($(window).height() - box.height() - margintop -
									boxmargin + $(window).scrollTop())) {
								top = $(window).height() - box.height() - margintop - boxmargin + $(window).scrollTop()
							}
						}
					}

					// console.log(left,offsetX,x,a);
					box.css({
						left: left + "px",
						top: top + "px"
					});
				};
				document.onmouseup = function () {
					// box.removeClass('transition')
					$(document).off("scroll.unable");
					box.css({
						'transition': ''
					})
					document.onmousemove = null;
					document.onmouseup = null;
					moveEnd()
				};
				// return false;
			}
		})
		//#endregion

		//#region 窗口伸缩
		//#region 右下
		$('body').on('mousedown', '#sui-suibox' + boxindex + ' .stretch-rb', function (event) {
			transitions = false
			let top = $(document).scrollTop();
			let left = $(document).scrollLeft();
			$(document).on('scroll.unable', function () {
				$(document).scrollTop(top);
				$(document).scrollLeft(left);
			})
			let box = $(this).parent()
			if (box.css('transition') != ('none 0s ease 0s' || 'all 0s ease 0s')) {
				box.css({
					'transition': 'none'
				})
			}

			if (event.button == 0) {

				if (!$('#sui-suibox' + boxindex).hasClass('sui-max')) {
					let a = event.clientX
					let b = event.clientY
					let left = parseInt(box.css('left'))
					let top = parseInt(box.css('top'))
					top = box.height() - (b - top)
					left = box.width() - (a - left)
					a = a - box.width()
					b = b - box.height()
					document.onmousemove = function (event) {
						let x = event.clientX
						let y = event.clientY
						// 判断是否到达区域边界
						if (fixed) {
							if (x + left >= $(window).width() - boxmargin) {
								x = $(window).width() - boxmargin - left
							}
							if (y + top >= $(window).height() - boxmargin) {
								y = $(window).height() - boxmargin - top
							}
						} else {
							if (x + left >= $(window).width() - boxmargin + $(window).scrollLeft()) {
								x = $(window).width() - boxmargin - left + $(window).scrollLeft()
							}
							if (y + top >= $(window).height() - boxmargin + $(window).scrollTop()) {
								y = $(window).height() - boxmargin - top + $(window).scrollTop()
							}
						}

						let width = x - a
						let height = y - b
						// 判断是否到达小于设定窗口大小
						if (width < stretchminwidth) {
							width = stretchminwidth
						}
						if (height < stretchminheight) {
							height = stretchminheight
						}
						box.css({
							width: width + "px",
							height: height + "px"
						});
					};
				}
				document.onmouseup = function () {
					$(document).off("scroll.unable");
					box.css({
						'transition': ''
					})
					document.onmousemove = null;
					document.onmouseup = null;
					resizeEnd()
				};
				return false;
			}
		});
		//#endregion
		//#region 左上
		$('body').on('mousedown', '#sui-suibox' + boxindex + ' .stretch-lt', function (event) {
			transitions = false
			let top = $(document).scrollTop();
			let left = $(document).scrollLeft();
			$(document).on('scroll.unable', function () {
				$(document).scrollTop(top);
				$(document).scrollLeft(left);
			})
			let box = $(this).parent()
			if (box.css('transition') != ('none 0s ease 0s' || 'all 0s ease 0s')) {
				box.css({
					'transition': 'none'
				})
			}
			if (event.button == 0) {
				if (!$('#sui-suibox' + boxindex).hasClass('sui-max')) {
					let a = event.clientX
					let b = event.clientY
					let width = box.width()
					let height = box.height()
					let left = parseInt(box.css('left'))
					let top = parseInt(box.css('top'))
					document.onmousemove = function (event) {
						let x = event.clientX
						let y = event.clientY
						// 判断是否到达小于设定窗口大小
						if (x >= a + width - stretchminwidth) {
							x = a + width - stretchminwidth
						}
						if (y >= b + height - stretchminheight) {
							y = b + height - stretchminheight
						}
						let addwidth = a - x
						let addheight = b - y
						box.css({
							left: left - addwidth,
							top: top - addheight,
							// left: x ,
							// top: y ,
							width: width + a - x + "px",
							height: height + b - y + "px"
						});
						if (parseInt(box.css('left')) <= 0) {
							box.css({
								'left': 0,
								width: width + left
							})
						}
						if (parseInt(box.css('top')) <= 0) {
							box.css({
								'top': 0,
								height: top + height
							})
						}
					};
				}
				document.onmouseup = function () {
					box.css({
						'transition': ''
					})
					$(document).off("scroll.unable");
					document.onmousemove = null;
					document.onmouseup = null;
					resizeEnd()
				};
				return false;
			}
		});
		//#endregion
		//#region 左下
		$('body').on('mousedown', '#sui-suibox' + boxindex + ' .stretch-lb', function (event) {
			transitions = false
			let top = $(document).scrollTop();
			let left = $(document).scrollLeft();
			$(document).on('scroll.unable', function () {
				$(document).scrollTop(top);
				$(document).scrollLeft(left);
			})
			let box = $(this).parent()
			if (box.css('transition') != ('none 0s ease 0s' || 'all 0s ease 0s')) {
				box.css({
					'transition': 'none'
				})
			}
			if (event.button == 0) {
				if (!$('#sui-suibox' + boxindex).hasClass('sui-max')) {
					let a = event.clientX
					let b = event.clientY
					let left = parseInt(box.css('left'))
					let top = parseInt(box.css('top'))
					top = box.height() - (b - top)
					b = b - box.height()
					let width = box.width()
					document.onmousemove = function (event) {
						let x = event.clientX
						let y = event.clientY
						// 判断是否到达区域边界
						if (y >= $(window).height() - boxmargin - top) {
							y = $(window).height() - boxmargin - top
						}
						let height = y - b
						// 判断是否到达小于设定窗口大小
						if (x >= a + width - stretchminwidth) {
							x = a + width - stretchminwidth
						}
						if (height < stretchminheight) {
							height = stretchminheight
						}
						let addwidth = a - x
						box.css({
							left: left - addwidth,
							width: width + a - x + "px",
							height: height + "px"
						});
						if (parseInt(box.css('left')) <= 0) {
							box.css({
								'left': 0,
								width: width + left
							})
						}
					};
				}
				document.onmouseup = function () {
					box.css({
						'transition': ''
					})
					$(document).off("scroll.unable");
					document.onmousemove = null;
					document.onmouseup = null;
					resizeEnd()
				};
				return false;
			}
		});
		//#endregion
		//#region 右上
		$('body').on('mousedown', '#sui-suibox' + boxindex + ' .stretch-rt', function (event) {
			transitions = false
			let top = $(document).scrollTop();
			let left = $(document).scrollLeft();
			$(document).on('scroll.unable', function () {
				$(document).scrollTop(top);
				$(document).scrollLeft(left);
			})
			let box = $(this).parent()
			if (box.css('transition') != ('none 0s ease 0s' || 'all 0s ease 0s')) {
				box.css({
					'transition': 'none'
				})
			}
			if (event.button == 0) {
				if (!$('#sui-suibox' + boxindex).hasClass('sui-max')) {
					let a = event.clientX
					let b = event.clientY

					let left = parseInt(box.css('left'))
					let top = parseInt(box.css('top'))
					left = box.width() - (a - left)
					let height = box.height()
					a = a - box.width()
					document.onmousemove = function (event) {
						let x = event.clientX
						let y = event.clientY

						// 判断是否到达区域边界
						if (x >= $(window).width() - boxmargin - left) {
							x = $(window).width() - boxmargin - left
						}
						let width = x - a
						if (width < stretchminwidth) {
							width = stretchminwidth
						}
						if (y >= b + height - stretchminheight) {
							y = b + height - stretchminheight
						}
						let addheight = b - y
						box.css({
							width: width + "px",
							top: top - addheight,
							height: height + addheight + "px"
						});
						if (parseInt(box.css('top')) <= 0) {
							box.css({
								'top': 0,
								height: top + height
							})
						}
					};
				}
				document.onmouseup = function () {
					box.css({
						'transition': ''
					})
					$(document).off("scroll.unable");
					document.onmousemove = null;
					document.onmouseup = null;
					resizeEnd()
				};
				return false;
			}
		});
		//#endregion
		//#endregion

		//#region 最大化按钮
		$('#sui-suibox' + boxindex).on('transitionend', function (event) {
			if (event.target === this && event.originalEvent.propertyName === "width") {
				transitions = false
			}
		});
		document.getElementById('sui-suibox' + boxindex).addEventListener("transitionstart", function (event) {
			if (event.target === this && event.propertyName === "width") {
				transitions = true
			}
		})
		$('body').on('click', '#sui-suibox' + boxindex + ' .sui-suibox-max', function () {
			if (transitions) {
				return
			}
			
			$('#sui-suibox' + boxindex).css({
				transition: ''
			})
			if ($('#sui-suibox' + boxindex).hasClass('sui-max')) {
				$('#sui-suibox' + boxindex + ' ' + move).css({
					cursor: 'move'
				})
				$('#sui-suibox' + boxindex + ' .stretch-rt').css({
					cursor: ''
				})
				$('#sui-suibox' + boxindex + ' .stretch-lb').css({
					cursor: ''
				})
				$('#sui-suibox' + boxindex + ' .stretch-lt').css({
					cursor: ''
				})
				$('#sui-suibox' + boxindex + ' .stretch-rb').css({
					cursor: ''
				})
				$('#sui-suibox' + boxindex + ' .max1').removeClass('max11')
				$('#sui-suibox' + boxindex + ' .max2').removeClass('max12')
				$('#sui-suibox' + boxindex + ' .sui-suibox-close2').css({
					display: ''
				})
				$('#sui-suibox' + boxindex).css({
					width: boxwidth,
					height: boxheight,
					top: boxtop,
					left: boxleft,
					'margin-left': boxmarginleft,
					'margin-top': boxmargintop,
				})

				removeUnScroll()
				restore()
			} else {
				$('#sui-suibox' + boxindex + ' ' + move).css({
					cursor: 'no-drop'
				})
				$('#sui-suibox' + boxindex + ' .stretch-rt').css({
					cursor: 'no-drop'
				})
				$('#sui-suibox' + boxindex + ' .stretch-lb').css({
					cursor: 'no-drop'
				})
				$('#sui-suibox' + boxindex + ' .stretch-lt').css({
					cursor: 'no-drop'
				})
				$('#sui-suibox' + boxindex + ' .stretch-rb').css({
					cursor: 'no-drop'
				})
				let scrollTop = 0;
				let scrollLeft = 0;
				if (fixed == false) {
					scrollTop = $(window).scrollTop()
					scrollLeft = $(window).scrollLeft()
				}
				if (!$('#sui-suibox' + boxindex).hasClass('sui-min')) {
					boxmarginleft = parseInt($('#sui-suibox' + boxindex).css('margin-left'))
					boxmargintop = parseInt($('#sui-suibox' + boxindex).css('margin-top'))
					boxleft = parseInt($('#sui-suibox' + boxindex).css('left'))
					boxtop = parseInt($('#sui-suibox' + boxindex).css('top'))
					boxwidth = $('#sui-suibox' + boxindex).width()
					boxheight = $('#sui-suibox' + boxindex).height()
				} else {
					$('#sui-suibox' + boxindex).removeClass('sui-min')
				}
				$('#sui-suibox' + boxindex + ' .sui-suibox-close2').css({
					display: 'none'
				})
				$('#sui-suibox' + boxindex).css({
					width: window.innerWidth,
					height: window.innerHeight,
					top: scrollTop,
					left: scrollLeft,
					'margin-left': 0,
					'margin-top': 0,
				})
				$('#sui-suibox' + boxindex + ' .max1').addClass('max11')
				$('#sui-suibox' + boxindex + ' .max2').addClass('max12')

				//#region  最大化下，禁止浏览器滚动
				unScroll()
				//#endregion
				full()
			}
			$('#sui-suibox' + boxindex).toggleClass('sui-max')
		});
		//#endregion

		//#region 最小化按钮
		$('body').on('click', '#sui-suibox' + boxindex + ' .sui-suibox-min', function () {
			transitions = false
			$('#sui-suibox' + boxindex).css({
				transition: ''
			})
			if ($('#sui-suibox' + boxindex).hasClass('sui-max') || !$('#sui-suibox' + boxindex).hasClass('sui-min')) {
				removeUnScroll()
				if (!$('#sui-suibox' + boxindex).hasClass('sui-max')) {
					boxmarginleft = parseInt($('#sui-suibox' + boxindex).css('margin-left'))
					boxmargintop = parseInt($('#sui-suibox' + boxindex).css('margin-top'))
					boxleft = parseInt($('#sui-suibox' + boxindex).css('left'))
					boxtop = parseInt($('#sui-suibox' + boxindex).css('top'))
					boxwidth = $('#sui-suibox' + boxindex).width()
					boxheight = $('#sui-suibox' + boxindex).height()
				}
				$('#sui-suibox' + boxindex).removeClass('sui-max')
				$('#sui-suibox' + boxindex + ' .max1').removeClass('max11')
				$('#sui-suibox' + boxindex + ' .max2').removeClass('max12')
				$('#sui-suibox' + boxindex + ' .sui-suibox-close2').css({
					display: ''
				})
				let top = $(window).height() - titleheight - boxmargintop
				$('#sui-suibox' + boxindex).css({
					width: minWidth,
					height: titleheight,
					top: top,
					left: boxleft,
					'margin-left': boxmarginleft,
					'margin-top': boxmargintop,
				})
				min()
			}
			if ($('#sui-suibox' + boxindex).hasClass('sui-min')) {
				$('#sui-suibox' + boxindex).css({
					width: boxwidth,
					height: boxheight,
					top: boxtop,
					left: boxleft,
					'margin-left': boxmarginleft,
					'margin-top': boxmargintop,
				})
				restore()
			}

			$('#sui-suibox' + boxindex).toggleClass('sui-min')
		})


		//#endregion

		//禁止滚动条滚动
		function unScroll() {
			document.body.parentNode.style.overflow ="hidden"//隐藏且禁用横向纵向两个滚动条
		}
		//移除禁止滚动条滚动
		function removeUnScroll() {
			document.body.parentNode.style.overflow = "auto";//开启横向纵向两个滚动条
		}



		return suibox.index++
	}
	//#endregion
}
export default suibox