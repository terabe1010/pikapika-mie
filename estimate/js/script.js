let selectedItems = [];

const cards = document.querySelectorAll(".card");
const type = document.getElementById("type");
const qty = document.getElementById("qty");

// ==========================
// カード選択処理
// ==========================
cards.forEach(card => {
  card.addEventListener("click", () => {

    const name = card.dataset.name;

    // 水回りセット選択時
    if (name === "水回りセット") {
      selectedItems = [{ name, price: getPrice(card) }];
      cards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      updateTotal();
      return;
    }

    // セット解除
    selectedItems = selectedItems.filter(i => i.name !== "水回りセット");
    document.querySelector(".set")?.classList.remove("selected");

    card.classList.toggle("selected");

    const index = selectedItems.findIndex(i => i.name === name);

    if (index > -1) {
      selectedItems.splice(index, 1);
    } else {
      selectedItems.push({ name, price: getPrice(card) });
    }

    updateTotal();
  });
});

// ==========================
// 金額取得
// ==========================
function getPrice(card){
  return parseInt(type.value === "empty" ? card.dataset.empty : card.dataset.live);
}

// ==========================
// リアルタイム合計
// ==========================
function updateTotal(){
  let total = 0;

  selectedItems.forEach(item => {
    let price = item.price;

    if(item.name === "エアコン"){
      price *= qty.value;
    }

    total += price;
  });

  document.getElementById("liveTotal").textContent =
    total.toLocaleString() + "円";
}

type.addEventListener("change", updateTotal);
qty.addEventListener("input", updateTotal);

// ==========================
// 見積書作成
// ==========================
document.getElementById("createBtn").addEventListener("click", () => {

  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const tel = document.getElementById("tel").value;

  const today = new Date().toLocaleDateString();
  const dayPreference = document.getElementById("dayPreference").value;
  const timePreference = document.getElementById("timePreference").value;
  const timeFree = document.getElementById("timeFree").value;

  let total = 0;

  let html = `
    <div style="text-align:center;">
      <img src="img/h_logo.svg" style="width:120px;">
      <h2>お見積書</h2>
    </div>

    <p>日付：${today}</p>

    <p>
      <strong>ピカピカ三重店</strong><br>
      三重県亀山市中庄町630<br>
      （株式会社エコ・プランニング内）<br>
      TEL：080-3305-5601<br>
      営業時間：8:00〜20:00（年中無休）
    </p>

    <hr>

    <p>お名前：${name}</p>
    <p>住所：${address}</p>
    <p>電話：${tel}</p>
    
    <p>お電話可能日：${dayPreference}</p>
    <p>時間帯：${timePreference}</p>
    ${timeFree ? `<p>ご希望時間：${timeFree}</p>` : ""}

    <table border="1" width="100%" cellpadding="8" style="border-collapse:collapse;">
      <tr>
        <th>項目</th>
        <th>金額</th>
      </tr>
  `;

  selectedItems.forEach(item => {
    let price = item.price;

    if(item.name === "エアコン"){
      price *= qty.value;
    }

    total += price;

    html += `
      <tr>
        <td>${item.name}</td>
        <td>${price.toLocaleString()}円</td>
      </tr>
    `;
  });

  html += `
    </table>

    <p style="text-align:right; font-size:18px; margin-top:10px;">
      合計：<strong>${total.toLocaleString()}円（税込）</strong>
    </p>

    <p style="font-size:12px; margin-top:20px;">
      ※本見積りは簡易見積りとなります。<br>
      ※汚れ具合によっては追加料金が発生する場合もあります。<br>
      ※現地確認後、正式なお見積りをご提示させていただきます。
    </p>
  `;

  document.getElementById("preview").innerHTML = html;
});

// ==========================
// PDF（印刷）
// ==========================
function printEstimate() {

  const content = document.getElementById("preview").innerHTML;

  if (!content.trim()) {
    alert("先に見積りを作成してください");
    return;
  }

  const win = window.open("", "", "width=800,height=600");

  win.document.write(`
    <html>
    <head>
      <title>見積書</title>
      <style>
        body { font-family: sans-serif; padding: 20px; }
        table { border-collapse: collapse; width: 100%; }
        td, th { border: 1px solid #000; padding: 8px; }
        h2 { text-align: center; }
      </style>
    </head>
    <body>
      ${content}
    </body>
    </html>
  `);

  win.document.close();
  win.print();
}