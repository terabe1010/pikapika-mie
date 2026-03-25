$(".slider").slick({
  lazyLoad: 'ondemand',
  autoplay: true, // 自動再生
  autoplaySpeed: 3000, // 再生速度（ミリ秒設定） 1000ミリ秒=1秒
  infinite: true, // 無限スライド
  fade: true,
  speed: 3000,
  arrows: true, // 矢印
  dots: false, // インジケーター
  centerMode: false,// 前後スライドを部分表示
  centerPadding: '0',// 両端の見切れるスライド幅
  responsive: [{
    breakpoint: 768, // ブレイクポイントを指定
    settings: {
      slidesToShow: 1,
      centerMode: false,
      centerPadding: '0',
      arrows: false,
      dots: false,
    },
  },
  ]
});