/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    // 处理特殊情况
    if (numRows < 2) return s;
    const r = [];
    // 求列数
    const section = numRows + (numRows - 2); // 三分之二n字
    let numCols = Math.floor(s.length / section) * (1 + numRows - 2);
    const left = s.length % section;
    if (left >= numRows) {
        numCols += (1 + left - numRows);
    } else {
        numCols += left;
    }
    let x = 0, y = 0;
    for(let i=0; i<s.length; i++) {
        const char = s[i];
        const curIndex = x + y * numCols; // 转化二维数组坐标
        r[curIndex] = char;
        // 更新x, y
        const d = i % section;
        if (d < numRows - 1) { // 竖列
            y += 1;
        } else {
            x += 1;
            y -= 1;
        }
    }
    return r.join('');
};

console.log(convert('abc', 1));