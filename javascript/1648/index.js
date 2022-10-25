//Suggest Answer, my code was failing because of BigInt manipulation in JS

const min = (a, b) => a < b? a:b;

const summationN = n => n * (n + BigInt(1)) / BigInt(2);

const MOD = BigInt(1e9 + 7);
/**
 * @param {number[]} inventory
 * @param {number} orders
 * @return {number}
 */

var maxProfit = function(inventory, orders) {
  inventory.sort((a, b) => b - a);
  inventory.push(0);
  inventory = inventory.map( e => BigInt(e));
  let top = inventory[0];
  let answer = BigInt(0);
  let i = 1;
  orders = BigInt(orders);
  const len = inventory.length;
  debugger;
  while(i < len && orders > 0) {
    while(i < len && inventory[i] == top) {
      i++;
    }
    let col = BigInt(i);
    let row = BigInt(top - inventory[i]);
    let cells = row * col;
    let take = min(orders, cells);
    let res = take / col;
    let rem = take % col;
    
    answer = (answer + ((summationN(top) - summationN(top - res)) * col) % MOD) % MOD;
    answer = (answer + ((top - res) * rem) % MOD) % MOD;
    orders -= take;
    top = inventory[i];
    i++;
  }
  return answer;
};

