/**
 * The idea is->
 * calculamos o presum, que vai ser o mesmo que o total de "1", na ultima posicao do array
 * percorremos o array da ultima posicao ate a primeira
 *  se o total de "1" da posicao que estamos ate a ultima posicao do array + o numero de pulos que já demos for diferente, 
 * isso indica que tem um 0 no meio dos "1", entao temos que dar um flip
 * 
 * só precisamos fazer essa conferencia quando o numero for um "1", porque quando for 0 eu vou ter mais digitos a direita
 * do que o total de 1, mas nao tem problema se o 0 for a esquerda. como estamos percorrendo da direta para esquerda,
 * só precisamos validar os "1" a esquerda dos zeros.
 */
var minFlipsMonoIncr = function (s) {
    let presum = getPresum(s);
    let flips = 0;
    for (let i = (s.length - 1); i >= 0; i--) {
        const currentNumber = s[i];
        let oneCountToTheRight = presum[s.length - 1] - presum[i];
        let digitsToTheRight = (s.length - i);
        if (currentNumber === '1') oneCountToTheRight++;
        if ((oneCountToTheRight + flips) !== digitsToTheRight && currentNumber === '1') {
            //I have zeros between my trailing ones
            flips++;
        }
    }
    return flips;
}

function getPresum(s) {
    let preSum = Array(s.length);
    preSum[0] = parseInt(s[0]);

    for (let i = 1; i < s.length; i++) {
        const currentNumber = parseInt(s[i]);
        preSum[i] = preSum[i - 1] + currentNumber;
    }
    return preSum;
}

minFlipsMonoIncr("101010111001010000011101101110");//11
minFlipsMonoIncr("10011111110010111011");//5
minFlipsMonoIncr("00110");
minFlipsMonoIncr("111011100100100"); // 7
minFlipsMonoIncr("010110");
minFlipsMonoIncr("00011000");
minFlipsMonoIncr("11100111");