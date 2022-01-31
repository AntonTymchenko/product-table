let name = document.querySelector("#name");
let price = document.querySelector("#price");
let amount = document.querySelector("#amount");
let add = document.querySelector("#add");
let table = document.querySelector("#table");
let total = document.querySelector("#total");

let trIndx = 0;
let totalPrice = 0;

table.addEventListener("click", onTableClick);
add.addEventListener("click", onBtnAddClick);
table.addEventListener("dblclick", onTableDoubleClick);

function onTableClick(e) {
  if (e.target.className === "deleteBtn") {
    e.target.parentNode.parentNode.remove();
    const cellSumCollection = document.querySelectorAll("td[data-sum]");
    countNewTotalSum(cellSumCollection);
  }
}
function onTableDoubleClick(e) {
  if (e.target.dataset.change) {
    let textTd = e.target.textContent;
    const input = document.createElement("input");
    input.value = textTd;
    input.setAttribute("data-input", e.target.dataset.change);
    input.autofocus = true;
    input.addEventListener("keypress", editItem);
    e.target.textContent = "";
    e.target.append(input);
  }
}

function editItem(e) {
  if (e.key === "Enter") {
    const cellSumCollection = document.querySelectorAll("td[data-sum]");
    const indxCurrentSum = [...cellSumCollection].findIndex(
      (item) => +item.dataset.sum === +e.target.dataset.input
    );
    e.target.parentNode.textContent = e.target.value;
    const tdCollection = document.querySelectorAll(`td[data-change]`);
    cellSumCollection[indxCurrentSum].textContent = countNewSum(
      tdCollection,
      +e.target.dataset.input
    );
    countNewTotalSum(cellSumCollection);
    e.target.remove();
  }
}

function onBtnAddClick() {
  let product = name.value;
  let priceProd = price.value;
  let amountProd = amount.value;
  let sum = priceProd * amountProd;

  if (!product || !priceProd || !amountProd) {
    alert("Заполните все ячейки");
    return;
  }
  totalPrice += sum;
  table.append(createTr(product, priceProd, amountProd, sum));
  clearInputs(name, price, amount);
  total.textContent = totalPrice;
}

function createTr(...rest) {
  let tr = document.createElement("tr");
  const tdCollection = [];
  tr.setAttribute("data-tr", (trIndx += 1));
  for (let i = 0; i < rest.length + 1; i += 1) {
    let td = document.createElement("td");
    if (i < 3) {
      td.setAttribute("data-change", trIndx);
    }
    if (i === 3) {
      td.setAttribute("data-sum", trIndx);
    }
    if (!rest[i]) {
      td.appendChild(createDeleteBtn(trIndx));
    } else {
      td.textContent = rest[i];
    }
    tdCollection.push(td);
  }
  tr.append(...tdCollection);
  return tr;
}

function clearInputs(...rest) {
  rest.forEach((item) => (item.value = ""));
}
function createDeleteBtn(trIndx) {
  let deleteBtn = document.createElement("button");
  deleteBtn.textContent = "удалить";
  deleteBtn.className = "deleteBtn";
  deleteBtn.setAttribute("data-btn", trIndx);
  return deleteBtn;
}

function countNewSum(arr, indx) {
  return [...arr].reduce((acc, item) => {
    if (+item.textContent && +item.dataset.change === +indx) {
      acc *= item.textContent;
      return acc;
    }
    return acc;
  }, 1);
}

function countNewTotalSum(arr) {
  total.textContent = [...arr].reduce((acc, item) => {
    acc += +item.textContent;
    return acc;
  }, 0);
}
