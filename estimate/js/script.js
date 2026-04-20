let selectedItems = [];

const cards = document.querySelectorAll(".card");
const type = document.getElementById("type");
const qty = document.getElementById("qty");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    const name = card.dataset.name;

    if (name === "キッチンセット") {
      selectedItems = [{ name, price: getPrice(card) }];
      cards.forEach((current) => current.classList.remove("selected"));
      card.classList.add("selected");
      updateTotal();
      return;
    }

    selectedItems = selectedItems.filter((item) => item.name !== "キッチンセット");
    document.querySelector(".set")?.classList.remove("selected");

    card.classList.toggle("selected");

    const index = selectedItems.findIndex((item) => item.name === name);

    if (index > -1) {
      selectedItems.splice(index, 1);
    } else {
      selectedItems.push({ name, price: getPrice(card) });
    }

    updateTotal();
  });
});

function getPrice(card) {
  return parseInt(type.value === "empty" ? card.dataset.empty : card.dataset.live, 10);
}

function updateTotal() {
  let total = 0;

  selectedItems.forEach((item) => {
    let price = item.price;

    if (item.name === "エアコン") {
      price *= Number(qty.value || 1);
    }

    total += price;
  });

  document.getElementById("liveTotal").textContent = `${total.toLocaleString()}円`;
}

type.addEventListener("change", () => {
  selectedItems = selectedItems.map((item) => {
    const card = Array.from(cards).find((current) => current.dataset.name === item.name);
    return card ? { ...item, price: getPrice(card) } : item;
  });
  updateTotal();
});

qty.addEventListener("input", updateTotal);

document.getElementById("createBtn").addEventListener("click", () => {
  const name = document.getElementById("name").value || "未入力";
  const address = document.getElementById("address").value || "未入力";
  const tel = document.getElementById("tel").value || "未入力";
  const dayPreference = document.getElementById("dayPreference").value;
  const timePreference = document.getElementById("timePreference").value;
  const timeFree = document.getElementById("timeFree").value;
  const today = new Date().toLocaleDateString("ja-JP");

  let total = 0;

  let html = `
    <div style="text-align:center;">
      <img src="img/h_logo.svg" style="width:120px;" alt="ピカピカ三重店">
      <h2>御見積書</h2>
    </div>

    <p>発行日: ${today}</p>

    <p>
      <strong>ピカピカ三重店</strong><br>
      三重県亀山市中庄町630<br>
      エコ・プランニング<br>
      TEL: 080-3305-5601<br>
      営業時間: 8:00 - 20:00
    </p>

    <hr>

    <p>お名前: ${name}</p>
    <p>ご住所: ${address}</p>
    <p>電話番号: ${tel}</p>
    <p>希望日: ${dayPreference}</p>
    <p>希望時間: ${timePreference}</p>
    ${timeFree ? `<p>ご要望: ${timeFree}</p>` : ""}

    <table border="1" width="100%" cellpadding="8" style="border-collapse:collapse;">
      <tr>
        <th>項目</th>
        <th>金額</th>
      </tr>
  `;

  selectedItems.forEach((item) => {
    let price = item.price;

    if (item.name === "エアコン") {
      price *= Number(qty.value || 1);
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
      合計: <strong>${total.toLocaleString()}円</strong>
    </p>

    <p style="font-size:12px; margin-top:20px;">
      ・本見積もりは概算見積もりとなります。<br>
      ・汚れ具合によっては追加料金が発生する場合もあります。<br>
      ・現地確認後、正式なお見積もりをご案内いたします。
    </p>
  `;

  document.getElementById("preview").innerHTML = html;
});

function printEstimate() {
  const content = document.getElementById("preview").innerHTML;

  if (!content.trim()) {
    alert("先に見積書を作成してください。");
    return;
  }

  const win = window.open("", "", "width=800,height=600");

  if (!win) {
    alert("ポップアップがブロックされました。");
    return;
  }

  win.document.write(`
    <html>
    <head>
      <title>御見積書</title>
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
