import $ from 'jquery';


const suiscrollbarbody = {

	open({
		// style,
		theme,
		axis = 'y',
	}) {

		let content = 'body'
		const bordername = `.sui-scrollborder-body `;

		if (axis == 'y') {
			$(content).css({
				'overflow-y': 'scroll',
			});
		} else if (axis == 'x') {
			$(content).css({
				'overflow-x': 'scroll',
			});
		} else if (axis == 'xy' || axis == 'yx') {
			$(content).css({
				overflow: 'scroll',
			});
		}
		$(content).addClass('sui-scrollborder-body').addClass('sui-scrollborder')
		$(content).append(`<div class="sui-scrollbar sui-scrollbar-body">
            <div class="sui-scrollline"><div class="sui-scrollline-line"></div></div>
            <div class="sui-scrollup fa fa-chevron-up"></div>
            <div class="sui-scrollbox">
            <div class="sui-scrollbox-box"></div>
            </div>
            <div class="sui-scrolldown fa fa-chevron-down"></div></div>`);

		// $(bordername).height('100%');
		// $(bordername).width('100%');

		$(content + ' .sui-scrollbar').css({
			position: 'fixed'
		})
		// #region 主题
		if (theme == 'dark') {
			$(bordername).css({
				'background-color': ' #ddd',
				color: '#333',
			});
			$(content).css({
				'background-color': ' #ddd',
			});
		} else if (theme == 'none') {
			$(bordername).css({
				'background-color': $(content).css('background-color'),
			});
		}
		// #endregion

		let height = $(content).prop("offsetHeight")
		if ($('html').height() <= height) {
			height = $('html').height()
		}
		let h = $(content).prop("scrollHeight") - height

		// $(bordername).on('mouseenter', () => {
		//     $(`${bordername}.sui-scrollbar-body`).stop().fadeIn(300);
		// });
		// $(bordername).on('mouseleave', () => {
		//     $(`${bordername}.sui-scrollbar-body`).stop().fadeOut(300);
		// });
		let outtt = null
		$(bordername).on('mousemove', function (event) {
			// event.preventDefault

			clearTimeout(outtt)
			$(`${bordername}.sui-scrollbar-body`).fadeIn(300);
			outtt = setTimeout(function () {
				$(`${bordername}.sui-scrollbar-body`).fadeOut(300);
			}, 3000)

		})

		$('body').on('mousedown', '.sui-scrollbar-body .sui-scrollbox', function (event) {
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
					if ($("html").height() <= height) {
						height = $("html").height()
					}
					h = $(content).prop("scrollHeight") - height
					let nowh = h * (top / (box2.height() - box.height()))
					$("html").prop({
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

		$(window).on('scroll', function () {
			clearTimeout(outtt)
			$(`${bordername}.sui-scrollbar-body`).fadeIn(300);
			outtt = setTimeout(function () {
				$(`${bordername}.sui-scrollbar-body`).fadeOut(300);
			}, 3000)
			let height = $(content).prop("offsetHeight")
			if ($('html').height() <= height) {
				height = $('html').height()
			}
			let h = $(content).prop("scrollHeight") - height
			let top = ($('html').scrollTop() / h) * ($(`${bordername}.sui-scrollbar-body .sui-scrollline`).height() - $(`${bordername}.sui-scrollbar-body .sui-scrollbox`).height())
			$(`${bordername}.sui-scrollbar-body .sui-scrollbox`).css({
				top: top
			});
		});

		$(`${bordername}.sui-scrollbar-body .sui-scrollup`).on('mousedown', () => {
			const a = setInterval(() => {

				$("html").scrollTop($("html").scrollTop() - h * 0.002);

			}, 1);
			$(`${bordername}.sui-scrollbar-body .sui-scrollup`).on('mouseup', () => {
				clearInterval(a);
			});
		});

		$(`${bordername}.sui-scrollbar-body .sui-scrollup`).on('dblclick', () => {
			// const h = $(content).prop('scrollHeight') - $(content).prop('offsetHeight');
			let height = $(content).prop("offsetHeight")
			if ($('html').height() <= height) {
				height = $('html').height()
			}
			let h = $(content).prop("scrollHeight") - height
			const xx = $("html").scrollTop() / h;
			$("html").animate({
				scrollTop: 0,
			}, xx * 500);
		});

		$(`${bordername}.sui-scrollbar-body .sui-scrolldown`).on('mousedown', () => {
			const qqq = setInterval(() => {
				$('html').scrollTop($('html').scrollTop() + 1);
			}, 1);
			$(`${bordername}.sui-scrollbar-body .sui-scrolldown`).on('mouseup', () => {
				clearInterval(qqq);
			});
		});

		$(`${bordername}.sui-scrollbar-body .sui-scrolldown`).on('dblclick', () => {
			let height = $(content).prop("offsetHeight")
			if ($('html').height() <= height) {
				height = $('html').height()
			}
			let h = $(content).prop("scrollHeight") - height
			const xx = 1 - $('html').scrollTop() / h;
			$('html').animate({
				scrollTop: h,
			}, xx * 500);
		});

		$(`${bordername}.sui-scrollbar-body .sui-scrollline`).on('click', function (event) {
			// console.log($(`${bordername}.sui-scrollbar-body .sui-scrollbox`).height());

			let height = $(content).prop("offsetHeight")
			if ($('html').height() <= height) {
				height = $('html').height()
			}
			let h = $(content).prop("scrollHeight") - height
			const b = event.clientY;
			const top = $(this).offset().top - $('html').scrollTop();
			const x = (b - top) / ($(`${bordername}.sui-scrollbar-body`).height() - $(`${bordername}.sui-scrollbar-body .sui-scrollbox`).height())
			let xx = Math.abs(x - $('html').scrollTop() / h);
			if (xx >= 1) {
				xx = 1;
			}
			$('html').animate({
				scrollTop: x * h,
			}, xx * 1000);
			console.log(x * h);
		});

		// $(bordername).off('mousewheel', function(event, delta) {return false;});
		$(`${bordername}.sui-scrollbar-body`).on('wheel', (event) => {
			clearTimeout(outtt)
			$(`${bordername}.sui-scrollbar-body`).fadeIn(300);
			outtt = setTimeout(function () {
				$(`${bordername}.sui-scrollbar-body`).fadeOut(300);
			}, 3000)
		});
	},
};

export default suiscrollbarbody;