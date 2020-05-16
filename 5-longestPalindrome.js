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

// 3. 中心扩散法（由回文串的特征决定）

var longestPalindrome = function(s) {
    if (s.length <= 1) { return s; } // 处理特殊情况
    const arr = s.split('');
    let maxStart = 0;
    let maxLength = 0;
    var check = (left, right) => {
        if (left < 0) return false;
        if (right >= arr.length) return false;
        return s[left] === s[right];
    }
    var spread = (left, right) => {
        // 找到从left，right扩散的最大扩散范围
        while(check(left, right)) {
            left -= 1;
            right += 1;
        }
        return { length: (right - 1) - (left + 1) + 1, start: left + 1  };
    }
    arr.forEach((char, i) => {
        // 两种扩散 i-1, i+1 or i, i+1
        const spread1 = spread(i-1, i+1);
        const spread2 = spread(i, i+1);
        const maxResult = spread1.length > spread2.length ? spread1 : spread2;
        if (maxResult.length > maxLength) {
            maxLength = maxResult.length;
            maxStart = maxResult.start;
        }
    });
    return s.substring(maxStart,maxStart+maxLength);
    
}

console.log(longestPalindrome('ada'));