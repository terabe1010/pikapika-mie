// header.htmlの設定
function header() {
  $.ajax({
    url: "header.html",
    cache: false,
    success: function (html) {
      document.write(html);
    }
  });
}

// footer.htmlの設定
function footer() {
  $.ajax({
    url: "footer.html",
    cache: false,
    success: function (html) {
      document.write(html);
    }
  });
}