/**
 * @param {string} s
 * @return {number}
 */

// 1. 暴力算法
var lengthOfLongestSubstring = function(s) {
    var arr = s.split('');
    var cacheMap = {};
    var length = 0;
    arr.forEach((char, i) => {
        cacheMap[char] = true;
        for (let index = i+1; index < arr.length; index++) {
            const nextChar = arr[index];
            // 存在重复, 从下一位开始找
            if (cacheMap[nextChar]) {
                // 从已有结果和上一次最大结果中取最大
                length = Math.max(length, Object.keys(cacheMap).length);
                cacheMap = {};
                return;
            } else {
                cacheMap[nextChar] = true;
            }
        }
        // 同理，取最大，这里只是找到最后都没有重复出现的特殊情况
        length = Math.max(length, Object.keys(cacheMap).length);
    });
    return length;
};

// 2. 滑动窗口（不回溯）
var lengthOfLongestSubstring = function(s) {
    var arr = s.split('');
    if (arr.length === 0) return 0;
    var window = [arr[0]];
    var length = 1;
    arr.forEach((char, i) => {
        if (i === 0) return;
        if (window.indexOf(char) !== -1) {
            length = Math.max(length, window.length);
            // 出现重复，可以从左清理窗口
            while(window.indexOf(char) !== -1) {
                window.shift();
            }
        }
        window.push(char);
    });
    // 覆盖找到最后都没有重复出现的特殊情况
    length = Math.max(length, window.length);
    return length;
}

var s = '';
console.log(lengthOfLongestSubstring(s));