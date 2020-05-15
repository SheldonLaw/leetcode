/**
 * @param {string} s
 * @return {string}
 */

var check = (r) => {
    var start = 0, end = r.length - 1;
    while (start < end ) {
        if (r[start] !== r[end]) { return false; }
        start += 1;
        end -= 1;
    }
    return true;
}
var findLast = (arr, char, end) => {
    for (let index = end; end > 0; index--) {
        if (arr[index] === char) {
            return index;
        }   
    }
    return false;
}

var getEmptyOutput = (arr) => {
    if (arr.length !== 0) return arr[0];
    return '';
}

// 1. 暴力：遍历每一位，从后开始找等于这一位的位置，判断是否回文，是则直接返回，不是则继续往前找
var longestPalindrome = function(s) {
    let maxStr = '';
    const arr = s.split('');
    arr.forEach((char, i) => {
        let end = arr.length - 1;
        let strEnd = 0;
        while(strEnd = findLast(arr, char, end)) {
            const subArr = arr.slice(i, strEnd + 1); // @NOTE 没必要操作数组，可以记录下标，只是懒
            if (check(subArr)) {
                if (subArr.length > maxStr.length) {
                    maxStr = subArr.join('');
                }
                break;
            } else {
                end = strEnd - 1;
            }
        }
    });
    return maxStr ? maxStr : getEmptyOutput(arr);
};

// 2. 最长公共子串（翻转一次，求和原来最长公共子串）
// 如何求公共子串？动态规划?

// var longestPalindrome = function(s) {
//     // 处理特殊情况
//     if (s.length <= 1) { return s; }
//     var reverseS = s.split('').reverse();
    
// }

console.log(longestPalindrome('aba'));