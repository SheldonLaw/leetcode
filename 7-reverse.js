/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    x = x.toString();
    const isNegative = x[0] === '-';
    if (isNegative) {
        x = x.substring(1);
    }
    x = x.split('').reverse().join('');
    const max = Math.pow(2, 31) - 1;
    const min = max + 1;
    if (!isNegative && x > max) { return 0; }
    if (isNegative && x > min) { return 0; }
    if (isNegative) {
        x = '-' + x;
    }
    return x;
};

console.log(reverse(123));