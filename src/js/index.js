import $ from 'jquery';
import sui from './modules/sui';

window.sui = sui;

sui.suiscrollbarbody.open({background:undefined})
sui.suiscrollbar.open({
  content: '.testscroll',
  // theme:'none'
});
$('#btn').on('click', () => {
  sui.suibox.open({
    type: 0,
    anim: 0,
    btncallback: [() => {
      // eslint-disable-next-line no-console
      console.log(1);
    }, function () {
      console.log(2);
    }],
    content: $('.test'),
    title: '动画1：平滑放大',
    move: '.test',
    fixed: false,
    closeBtn: 1,
    // move:false,
    // moveOut: true,
    resize: [1, 1, 1, 1],
    area: ['300px', '300px'],
    cancel() {
      '13132123';
    },
    success() {
      console.log(123);
    },
    end() {
      console.log('end');
    },
    moveEnd() {
      console.log('moveEnd');
    },
    resizeEnd() {
      console.log('resizeEnd');
    },
    full() {
      console.log('full');
    },
    min() {
      console.log('min');
    },
    restore() {
      console.log('restore');
    },
  });
//      sui.suiscrollbar.open({
//     content:'.sui-suibox4 .sui-suibox-content'
// })
});
$('#btn2').on('click', () => {
  const id2 = sui.suibox.open({
    type: 1,
    anim: 1,
    btn: ['1', '2'],
    btncallback: [function () {
      console.log(1);
    }, function () {
      console.log(2);
    }],
    content: $('.test'),
    title: '动画2：上方飞入',
    // move: '.test',
    fixed: false,
    closeBtn: 2,
    // move:false,
    moveOut: true,
    resize: [1, 1, 1, 1],
    area: ['300px', '300px'],
    // cancel: function () {
    //     '13132123'
    // },
    success() {
      console.log(id2, 'success');
    },
    end() {
      console.log('end');
    },
    moveEnd() {
      console.log('moveEnd');
    },
    resizeEnd() {
      console.log('resizeEnd');
    },
    full() {
      console.log('full');
    },
    min() {
      console.log('min');
    },
    restore() {
      console.log('restore');
    },
  });
});
$('#btn3').on('click', () => {
  const id3 = sui.suibox.open({
    type: 0,
    anim: 2,
    btn: ['1', '2'],
    btncallback: [function () {
      console.log(1);
    }, function () {
      console.log(2);
    }],
    content: $('.test'),
    title: '动画3：下方飞入',
    move: '.test',
    fixed: false,
    closeBtn: 2,
    // move:false,
    maxmin: false,
    moveOut: true,
    resize: [1, 1, 1, 1],
    area: ['300px', '300px'],

    success() {
      console.log(id3, 'success');
    },
    end() {
      console.log('end');
    },
    moveEnd() {
      console.log('moveEnd');
    },
    resizeEnd() {
      console.log('resizeEnd');
    },
    full() {
      console.log('full');
    },
    min() {
      console.log('min');
    },
    restore() {
      console.log('restore');
    },
  });
});
$('#btn4').on('click', () => {
  const id4 = sui.suibox.open({
    type: 0,
    anim: 3,
    btn: ['1', '2'],
    btncallback: [function () {
      console.log(1);
    }, function () {
      console.log(2);
    }],
    content: $('.test'),
    title: '动画4：左边飞入',
    move: '.test',
    fixed: false,
    closeBtn: 0,
    maxmin: false,
    // move:false,
    moveOut: true,
    resize: [1, 1, 1, 1],
    area: ['300px', '300px'],

    success() {
      console.log(id4, 'success');
    },
    end() {
      console.log('end');
    },
    moveEnd() {
      console.log('moveEnd');
    },
    resizeEnd() {
      console.log('resizeEnd');
    },
    full() {
      console.log('full');
    },
    min() {
      console.log('min');
    },
    restore() {
      console.log('restore');
    },
  });
});
$('#btn5').on('click', () => {
   const id5 = sui.suibox.open({
    type: 0,
    anim: 4,
    btn: ['1', '2'],
    btncallback: [function () {
      console.log(1);
    }, function () {
      console.log(2);
    }],
    content: $('.test'),
    title: '动画5：旋转飞入',
    move: '.test',
    fixed: false,
    closeBtn: 2,
    // move:false,
    moveOut: true,
    resize: [1, 1, 1, 1],
    area: ['300px', '300px'],

    success() {
      console.log(id5, 'success');
    },
    end() {
      console.log('end');
    },
    moveEnd() {
      console.log('moveEnd');
    },
    resizeEnd() {
      console.log('resizeEnd');
    },
    full() {
      console.log('full');
    },
    min() {
      console.log('min');
    },
    restore() {
      console.log('restore');
    },
  });
});
$('#btn7').on('click', () => {
   const id6 = sui.suibox.open({
    type: 0,
    anim: 5,
    btn: ['1', '2'],
    btncallback: [function () {
      console.log(1);
    }, function () {
      console.log(2);
    }],
    content: '动画6：',
    // title: false,
    // move: '.test',
    fixed: false,
    closeBtn: 1,
    // move:false,
    moveOut: true,
    resize: [1, 1, 1, 1],
    area: ['300px', '300px'],
    success() {
      console.log(id6, 'success');
    },
    end() {
      console.log('end');
    },
    moveEnd() {
      console.log('moveEnd');
    },
    resizeEnd() {
      console.log('resizeEnd');
    },
    full() {
      console.log('full');
    },
    min() {
      console.log('min');
    },
    restore() {
      console.log('restore');
    },
  });
});
$('#btn6').on('click', () => {
   const id7 = sui.suibox.open({
    type: 0,
    anim: 6,
    btn: ['1', '2'],
    btncallback: [function () {
      console.log(1);
    }, function () {
      console.log(2);
    }],
    content: $('.test'),
    title: '动画7：抖动',
    move: '.test',
    fixed: false,
    closeBtn: 2,
    // move:false,
    moveOut: true,
    resize: [1, 1, 1, 1],
    area: ['300px', '300px'],

    success() {
      console.log(id7, 'success');
    },
    end() {
      console.log('end');
    },
    moveEnd() {
      console.log('moveEnd');
    },
    resizeEnd() {
      console.log('resizeEnd');
    },
    full() {
      console.log('full');
    },
    min() {
      console.log('min');
    },
    restore() {
      console.log('restore');
    },
  });
});

sui.suibox.open({
  anim: 1,
  content: $('.test2'),
  title: '12345678987654321',
  maxmin: false,
  offset: 'lb',
  // move:'.test',
  // move:false,
  // moveOut:true,
  resize: [1, 1],
  area: ['300px', '200px'],
  end() {
    console.log();
  },
});
sui.suibox.open({
  anim: 0,
  content: $('.test3'),
  title: '3',
  offset: 'rt',
  closeBtn: 2,
  // maxmin:false,
  // move:'.test',
  // move:false,
  // moveOut:true,
  resize: [1, 1],
  area: ['300px', '200px'],
  // end:function(){
  //     console.log()
  // }
});

const test1 = sui.suibox.open({
  anim: 2,
  content: $('.test1'),
  title: false,
  closeBtn: 2,
  offset: 'rb',
  move: '.test1',
  // move:false,
  // moveOut:true,
  resize: [1, 1],
  area: ['300px', '200px'],
  end() {
    console.log('销毁');
  },
});
