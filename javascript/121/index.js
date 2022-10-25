/**
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
    if(prices.length <= 1) return 0;
   
    let maxSellAtIdx = Array(prices.length).fill(Infinity);
    maxSellAtIdx[prices.length - 1] = prices[prices.length - 1];
    for(let i = (prices.length - 2); i > 0 ; i--){
        maxSellAtIdx[i] = Math.max( prices[i], maxSellAtIdx[i + 1] );
    }
    let maxProfit = [];
    maxProfit[0] = maxSellAtIdx[1] - prices[0]  ;
    for(let i = 1; i < prices.length - 1 ; i++){ // Skip the first day, cant buy there
        maxProfit[i] = Math.max(
                            (  maxSellAtIdx[i + 1] - prices[i]  ), //Buy now sell later
                            maxProfit[i - 1] // Keep previous operation
                    )
    }
    return Math.max(maxProfit[maxProfit.length - 1],0);// If negative, return 0
};