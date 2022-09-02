/**
 * @param {string} s
 * @return {number}
 */
/*
Entenda que uma letra K, tem "LEFT" letras a sua esquerda sem repetir.
Entenda que uma letra K, tem "RIGHT" letras a sua esquerda sem repetir.
o número total de strings que conseguimos formar usando o K como letra única, é (LEFT+1)*(RIGHT+1)

Fazemos a soma dessa formula para todas as letras, e chegamos na resposta.

L ----> left = 0, right = 7, subarrays = (0+1) * (7+1) = 8
E ----> left = 1, right = 0, subarrays = (1+1) * (0+1) = 2
E ----> left = 0, right = 4, subarrays = (0+1) * (4+1) = 5
T ----> left = 3, right = 4, subarrays = (3+1) * (4+1) = 20
C ----> left = 4, right = 3, subarrays = (4+1) * (3+1) = 20
O ----> left = 5, right = 2, subarrays = (5+1) * (2+1) = 18
D ----> left = 6, right = 1, subarrays = (6+1) * (1+1) = 14
E -----> left = 4, right = 0, subarrays = (4+1) * (0+1) = 5

Total contribution for all characters = 8 + 2 + 5 + 20 + 20 + 18 + 14 + 5 = 92
*/
var uniqueLetterString = function (s) {

    let temp = Array(26).fill(-1);
    let left = Array(s.length);
    let right = Array(s.length);

    for (let i = 0; i < s.length; i++) {
        const index = s[i].charCodeAt(0) - 65; // Indice para cada letra
        const lastFoundAt = temp[index];
        if (lastFoundAt === -1) {
            left[i] = i + 1; //Já somamos 1 ao armazenar
        } else {
            left[i] = i - lastFoundAt; //Se temos o caracter logo antes da letra atual, a conta aqui vai dar 1, pois no lastFoundAt nao somamos +1;
        }
        temp[index] = i;
    }
    temp.fill(-1);

    const lenOfInput = s.length;
    let uniqueLetterCount = 0;

    for (let i = lenOfInput - 1; i >= 0; i--) {
        const index = s[i].charCodeAt(0) - 65; // Indice para cada letra
        const lastFoundAt = temp[index];
        if (lastFoundAt === -1) {
            right[i] = lenOfInput - i; //Já fica com 1 a mais, pois a string de tamanho 10 termina no indice 9
        } else {
            right[i] = lastFoundAt - i; //Se temos o caracter logo antes da letra atual, a conta aqui vai dar 1, pois no lastFoundAt nao somamos +1;
        }
        temp[index] = i;
        uniqueLetterCount += ((left[i]) * (right[i]))
    }

    return uniqueLetterCount;

};
uniqueLetterString("ABC");
uniqueLetterString("DELQGVWNZKIJJPSXOVWWIZUXCEGWSQLESNSRBMKZARFPAXSVWQEZDENDAHNNIBHGHTFDLPGDLFXMIYRFNLMXHNPIFUAXINXPXLCTTJNLGGMKJIOEWBECNOFQPVCIKIAZMNGHEHFMCPWSMJTMGVSXTOGCGUYKFMNCGLCBRAFJLJVPIVDOLJBURULPGXBVDCEWXXXLTRMSHPKSPFDGNVOCZWDXJUWVNAREDOKTZMIUDKDQWWWSAEUUDBHMWZELOSBIHMAYJEMGZPMDOOGSCKLVHTGMETHUISCLJKDOQEWGVBULEMUXGTRKGXYFDIZTZWMLOFTCANBGUARNWQEQWGMIKMORVQUZANJNRNPMJWYLVHWKDFLDDBBMILAKGFROEQAMEVONUVHOHGPKLBPNYZFPLXNBCIFENCGIMIDCXIIQJWPVVCOCJTSKSHVMQJNLHSQTEZQTTMOXUSKBMUJEJDBJQNXECJGSZUDENJCPTTSREKHPRIISXMWBUGMTOVOTRKQCFSDOTEFPSVQINYLHXYVZTVAMWGPNKIDLOPGAMWSKDXEPLPPTKUHEKBQAWEBMORRZHBLOGIYLTPMUVBPGOOOIEBJEGTKQKOUURHSEJCMWMGHXYIAOGKJXFAMRLGTPNSLERNOHSDFSSFASUJTFHBDMGBQOKZRBRAZEQQVWFRNUNHBGKRFNBETEDJIWCTUBJDPFRRVNZENGRANELPHSDJLKVHWXAXUTMPWHUQPLTLYQAATEFXHZARFAUDLIUDEHEGGNIYICVARQNRJJKQSLXKZZTFPVJMOXADCIGKUXCVMLPFJGVXMMBEKQXFNXNUWOHCSZSEZWZHDCXPGLROYPMUOBDFLQMTTERGSSGVGOURDWDSEXONCKWHDUOVDHDESNINELLCTURJHGCJWVIPNSISHRWTFSFNRAHJAJNNXKKEMESDWGIYIQQRLUUADAXOUEYURQRVZBCSHXXFLYWFHDZKPHAGYOCTYGZNPALAUZSTOU")