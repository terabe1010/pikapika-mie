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
  html2pdf().from(document.getElementById("preview")).save();
});