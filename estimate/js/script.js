let selectedItems = [];

const cards = document.querySelectorAll(".card");
const type = document.getElementById("type");
const qty = document.getElementById("qty");

cards.forEach(card => {
  card.addEventListener("click", () => {

    const name = card.dataset.name;

    if (name === "水回りセット") {
      selectedItems = [{ name, price: getPrice(card) }];
      cards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      updateTotal();
      return;
    }

    selectedItems = selectedItems.filter(i => i.name !== "水回りセット");

    card.classList.toggle("selected");

    const index = selectedItems.findIndex(i => i.name === name);

    if (index > -1) {
      selectedItems.splice(index,1);
    } else {
      selectedItems.push({ name, price: getPrice(card) });
    }

    updateTotal();
  });
});

function getPrice(card){
  return parseInt(type.value === "empty" ? card.dataset.empty : card.dataset.live);
}

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

document.getElementById("createBtn").addEventListener("click", () => {

  let total = 0;
  let html = "<h2>お見積書</h2><table border='1' width='100%'><tr><th>項目</th><th>金額</th></tr>";

  selectedItems.forEach(item => {
    let price = item.price;
    if(item.name === "エアコン"){ price *= qty.value; }
    total += price;

    html += `<tr><td>${item.name}</td><td>${price.toLocaleString()}円</td></tr>`;
  });

  html += "</table>";
  html += `<p>合計：${total.toLocaleString()}円</p>`;

  document.getElementById("preview").innerHTML = html;
});

document.getElementById("pdfBtn").addEventListener("click", () => {

  const preview = document.getElementById("preview");

  if (!preview.innerHTML.trim()) {
    alert("先に見積りを作成してください");
    return;
  }

  // クローン作成（これが重要）
  const clone = preview.cloneNode(true);

  clone.style.display = "block";
  clone.style.position = "absolute";
  clone.style.left = "-9999px";
  clone.style.top = "0";
  clone.style.width = "800px";
  clone.style.background = "#fff";
  clone.style.padding = "20px";

  document.body.appendChild(clone);

  const opt = {
    margin: 10,
    filename: '見積書.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    }
  };

  html2pdf().set(opt).from(clone).save().then(() => {
    document.body.removeChild(clone);
  });

});

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
        table { width: 100%; border-collapse: collapse; }
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