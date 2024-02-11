let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const cash = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const screenInfo = document.getElementById("screen");
const infoScreen = document.getElementById("info");
const cdScreen = document.getElementById("change-due")

const addPTag = (info,id)=>{
    const p = document.createElement("p");
    p.innerText = info;
    id.appendChild(p);  
}
window.onload = function() {
    //addPTag(price,screenInfo);
    //addPTag(cid,infoScreen);
}

const checkBal = (num)=>{
    if (Number(cash.value) < price) {
        alert('Customer does not have enough money to purchase the item');
        cash.value = '';
        return;
      }
}

cash.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      checkBal();
    }
  });

purchaseBtn.addEventListener("click",()=>{
    checkBal();
})