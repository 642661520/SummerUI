import $ from 'jquery';

const suiscrollbar = {

  open({
    content,
    // style,
    theme = 'dark',
    axis = 'y',
  }) {
    let name = content;
    if (content[0] == '.' || content[0] == '#') {
      name = content.substring(1);
    }
    const bordername = `.sui-scrollborder-${name} `;

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
    $(content).wrap(`<div class="sui-scrollborder sui-scrollborder-${name}"></div>`);
    $(bordername).append(`<div class="sui-scrollbar">
            <div class="sui-scrollline"><div class="sui-scrollline-line"></div></div>
            <div class="sui-scrollup fa fa-chevron-up"></div>
            <div class="sui-scrollbox">
            <div class="sui-scrollbox-box"></div>
            </div>
            <div class="sui-scrolldown fa fa-chevron-down"></div></div>`);

    $(bordername).height($(content).height());
    $(bordername).width($(content).outerWidth());

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

    const h = $(content).prop('scrollHeight') - $(content).prop('offsetHeight');

    $(bordername).on('mouseenter', () => {
      $(`${bordername}.sui-scrollbar`).stop().fadeIn(300);
    });
    $(bordername).on('mouseleave', () => {
      $(`${bordername}.sui-scrollbar`).stop().fadeOut(300);
    });

    $('body').on('mousedown', `${bordername}.sui-scrollbox`, function (event) {
      $(bordername).off('mouseenter').off('mouseleave');
      const box = $(this);
      const box2 = $(this).parent();
      if (event.button == 0) {
        const b = event.clientY;
        const t = parseInt(box.css('top'));
        document.onmousemove = function (event) {
          const y = event.clientY;
          let top = y - b + t;
          if (top <= 0) {
            top = 0;
          } else if (top >= box2.height() - box.height()) {
            top = box2.height() - box.height();
          }
          box.css({
            top: `${top}px`,
          });
          const nowh = h * (top / (box2.height() - box.height()));
          $(content).scrollTop(nowh);
        };
        document.onmouseup = function (event) {
          if (event.pageX >= $(bordername).offset().left && event.pageX <= $(bordername).offset().left + $(bordername).outerWidth()
                        && event.pageY >= $(bordername).offset().top && event.pageY <= $(bordername).offset().top + $(bordername).outerHeight()) {} else {
            $(`${bordername}.sui-scrollbar`).stop().fadeOut(300);
          }
          $(bordername).on('mouseenter', () => {
            $(`${bordername}.sui-scrollbar`).stop().fadeIn(300);
          });
          $(bordername).on('mouseleave', () => {
            $(`${bordername}.sui-scrollbar`).stop().fadeOut(300);
          });
          document.onmousemove = null;
          document.onmouseup = null;
        };
        return false;
      }
    });

    $(content).on('scroll', () => {
      const h = $(content).prop('scrollHeight') - $(content).prop('offsetHeight');
      const top = ($(content).scrollTop() / h) * ($(`${bordername}.sui-scrollbar`).height() - $(`${bordername}.sui-scrollbox`).height());
      $(`${bordername}.sui-scrollbox`).css({
        top: `${top}px`,
      });
    });

    $(`${bordername}.sui-scrollup`).on('mousedown', () => {
      const a = setInterval(() => {
        $(content).scrollTop($(content).scrollTop() - h * 0.002);
      }, 1);
      $(`${bordername}.sui-scrollup`).on('mouseup', () => {
        clearInterval(a);
      });
    });

    $(`${bordername}.sui-scrollup`).on('dblclick', () => {
      const h = $(content).prop('scrollHeight') - $(content).prop('offsetHeight');
      const xx = $(content).scrollTop() / h;
      $(content).animate({
        scrollTop: 0,
      }, xx * 500);
    });

    $(`${bordername}.sui-scrolldown`).on('mousedown', () => {
      const a = setInterval(() => {
        $(content).scrollTop($(content).scrollTop() + h * 0.002);
      }, 1);
      $(`${bordername}.sui-scrolldown`).on('mouseup', () => {
        clearInterval(a);
      });
    });

    $(`${bordername}.sui-scrolldown`).on('dblclick', () => {
      // console.log(123);
      const h = $(content).prop('scrollHeight') - $(content).prop('offsetHeight');
      const xx = 1 - $(content).scrollTop() / h;
      $(content).animate({
        scrollTop: h,
      }, xx * 500);
    });

    $('body').on('click', `${bordername}.sui-scrollline`, function (event) {
      const b = event.clientY;
      const top  = $(this).offset().top-$('html').scrollTop();
      const x = (b - top) / ($(bordername).height() - $(`${bordername}.sui-scrollbox`).height());
      let xx = Math.abs(x - $(content).scrollTop() / h);
      if (xx >= 1) {
        xx = 1;
      }
      $(content).animate({
        scrollTop: x * h,
      }, xx * 1000);
    });

    // $(bordername).off('mousewheel', function(event, delta) {return false;});
    $(`${bordername}.sui-scrollbar`).on('wheel', (event) => {
      event.preventDefault()
      const a = event.originalEvent.wheelDelta;
      $(content).scrollTop($(content).scrollTop() - a / 1.2);
    });
  },
};

export default suiscrollbar;
