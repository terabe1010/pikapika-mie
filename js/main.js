$(function () {

  /*===================================================
  フェード
  ===================================================*/
  // スクロールして表示領域に入ったらclass付与
  $(".js-fadeUp").on("inview", function () {
    $(this).addClass("is-inview");
  });
  $(".p").on("inview", function () {
    $(this).addClass("is-inview");
  });

  /*===================================================
  スムーススクロール
  ===================================================*/
  $('a[href^="#"]').click(function () {
    let speed = 1500;
    let type = 'swing';

    let href = $(this).attr("href");
    let target = $(href == "#index" ? 'html' : href);

    // 画面幅でヘッダー高さを切り替え
    let headerHeight = $(window).width() <= 768 ? 60 : 80;

    let position = target.offset().top - headerHeight;

    $('body,html').animate({ scrollTop: position }, speed, type);
    return false;
  });
});

/*===================================================
ハンバーガー、追従ヘッダー
===================================================*/
document.addEventListener('DOMContentLoaded', () => {
  // --- 1. 要素の取得（新しい構造に合わせています） ---
  const header = document.querySelector('#header');
  const btn = document.querySelector('.hamburger');
  const body = document.querySelector('body');
  const mask = document.querySelector('#mask');
  const menuLinks = document.querySelectorAll('#menu-sp a');
  // --- 2. スクロール時のヘッダー制御 ---
  window.addEventListener('scroll', () => {
    // 400px以上スクロールしたらクラスを付与
    if (window.scrollY > 400) {
      header.classList.add('is-fixed');
    } else {
      header.classList.remove('is-fixed');
    }
  });
  // --- 3. ハンバーガーメニューの開閉 ---
  if (btn) { // ボタンが存在する場合のみ実行
    btn.addEventListener('click', () => {
      body.classList.toggle('nav-open');
    });
  }
  // 背景マスクをクリックで閉じる
  if (mask) {
    mask.addEventListener('click', () => {
      body.classList.remove('nav-open');
    });
  }
  // メニュー内のリンクをクリックしたら閉じる
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      body.classList.remove('nav-open');
    });
  });
});

/*===================================================
animation
===================================================*/
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  // Fallback for very old browsers.
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target); // 1回だけ再生したい場合
      }
    });
  }, {
    threshold: 0.15
  });

  targets.forEach((el) => observer.observe(el));
});



