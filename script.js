let price = 50;
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

const formatResults = (status, change) => {
  cdScreen.innerHTML = `<h5>Change Due:</h5>  <p>Status: ${status}</p>`;
  change.map((money) => (cdScreen.innerHTML += `<p>${money[0]}: $${money[1]}</p>`)  //here the map method is returning an array of innerHtml elements
  );
  return;
};

const checkBal = ()=>{
  if (Number(cash.value) < price) {
      alert('Customer does not have enough money to purchase the item');
      cash.value = '';
      return;
  }

  if (Number(cash.value) === price) {
    cdScreen.innerHTML ='<h5>Change Due:</h5> <p>No change due - customer paid with exact cash</p>';
    cash.value = '';
    return;
  }
  let cidSum = parseFloat(cid.map((total) => total[1]).reduce((sum, curr) => sum + curr,0).toFixed(2)); 
  /* map method returns array only containing the number part  
  then reduce method adds all those values and returns sum after that toFixed method rounds off the sum to 2 decimal places*/
  let changeDue = Number(cash.value) - price;
  const denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
  const reversedCid = [...cid].reverse();
  const result = {status: "OPEN", changeArr: []}

  if(cidSum < changeDue){
    return (cdScreen.innerHTML = '<h5>Change Due:</h5> <p>Status: INSUFFICIENT_FUNDS</p>');
  }

  if (cidSum === changeDue) {
    result.status = 'CLOSED';
  }

  for (let i = 0 ; i < cid.length; i++) {                                 //for loop running to the length of cid array        
    if (changeDue > denominations[i] && changeDue > 0) {                  // checking if the change due is greater than the denomination[i] element and chnage due > 0
      let count = 0;
      let total = reversedCid[i][1];                                       //allocating value of denomination eg-[100] to a variable total for calculation purpose
      while (total > 0 && changeDue >= denominations[i]) {                 // while loop running until the condition satisfies  
        total -= denominations[i];                                         // subtracting denominations[i] from total 
        changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));   // then subtracting denomination[i] from change due
        count++;                                                              // count ++ - keep tracks of successful subtractions (tells the number of a certain denomination is required to provide change eg - 3 20's are req to give $60 change)
      }
      if (count > 0) {                                                        // checks if count > 0 
        result.changeArr.push([reversedCid[i][0], count * denominations[i]]);      // pushing array containing name of currency and count*denomination[i] in changeArr 
      }
    }
  }
  if (changeDue > 0) {
    return (cdScreen.innerHTML = '<h5>Change Due:</h5> <p>Status: INSUFFICIENT_FUNDS</p>');
  }
  formatResults(result.status, result.changeArr);
  updateUI(result.changeArr);
}

const updateUI = (change) => {
  const currencyNameMap = {
    PENNY: 'Pennies',
    NICKEL: 'Nickels',
    DIME: 'Dimes',
    QUARTER: 'Quarters',
    ONE: 'Ones',
    FIVE: 'Fives',
    TEN: 'Tens',
    TWENTY: 'Twenties',
    'ONE HUNDRED': 'Hundreds'
  };
  
  if (change) {
    change.forEach((change) => {
      const targetArr = cid.find((cidArr) => cidArr[0] === change[0]);
      targetArr[1] = parseFloat((targetArr[1] - change[1]).toFixed(2));
    });
  }

  cash.value = '';
  screenInfo.textContent = `Total: $${price}`;
  infoScreen.innerHTML = `<h5>Change in drawer : </h5>
    ${cid
      .map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
      .join('')}  
  `;
};

cash.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      checkBal();
    }
  });

purchaseBtn.addEventListener("click",()=>{
  checkBal();
})

updateUI();