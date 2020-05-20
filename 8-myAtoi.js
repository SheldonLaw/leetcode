/**
 * @param {string} str
 * @return {number}
 */

// 1. 万能的修修补补大法（ifelse）
var myAtoi = function(str) {
    const length = str.length;
    const r = [];
    const max = Math.pow(2, 31) - 1;
    const min = - (max + 1);
    const charReg = /[+\-0-9]/;
    let hasSymbol = false;
    for(let i=0; i<length; i++) {
        const char = str[i];
        if (char === '+' || char === '-') {
            // 符号重复 or 已有值后面出现符号，直接忽略后面的值
            if (hasSymbol || r.length != 0) { break; }
            else { hasSymbol = true; }
        }
        if (charReg.test(char)) {
            r.push(char);
        } else if (r.length !== 0) { // 前面有值的情况下，遇到不符合的字符，则忽略后面所有字符
            break;
        } else if (char !== ' ') { // 前面没值，遇到非法字符（非空），返回0
            return 0;
        }
    }
    // return parseInt(r.join('')); // 这是作弊
    const compute = (arr, isNegative) => {
        let pow = isNegative ? -1 : 1;
        let sum = 0;
        for (let i=arr.length - 1; i>=0; i--) {
            sum += arr[i] * pow;
            if (sum > max) { return max; }
            if (sum < min) { return min; }
            pow = pow * 10;
        }
        return sum;
    };
    if (r[0] === '-') {
        return compute(r.slice(1), true);
    } else if (r[0] === '+') {
        return compute(r.slice(1), false);
    } else {
        return compute(r, false);
    }
};

// 2. 高冷的自动机算法
var myAtoi = function(str) {
    const length = str.length;
    let status = 'start'; // start - sign - in_number - end
    const r = [];
    // 计算
    const max = Math.pow(2, 31) - 1;
    const min = - (max + 1);
    const end = () => {
        const compute = (arr, isNegative) => {
            let pow = isNegative ? -1 : 1;
            let sum = 0;
            for (let i=arr.length - 1; i>=0; i--) {
                sum += arr[i] * pow;
                if (sum > max) { return max; }
                if (sum < min) { return min; }
                pow = pow * 10;
            }
            return sum;
        };
        if (r[0] === '-') {
            return compute(r.slice(1), true);
        } else if (r[0] === '+') {
            return compute(r.slice(1), false);
        } else {
            return compute(r, false);
        }
    }

    // 状态转换核心
    for(let i=0; i<length; i++) {
        const char = str[i];
        switch (status) {
            case 'start':
                if (char === '+' || char === '-') {
                    status = 'sign';
                    r.push(char);
                } else if (/[0-9]/.test(char)) {
                    status = 'in_number';
                    r.push(char);
                } else if (char !== ' ') {
                    return 0;
                }
                break;
            case 'sign':
                if (/[0-9]/.test(char)) {
                    status = 'in_number';
                    r.push(char);
                } else {
                    return end();
                }
                break;
            case 'in_number':
                if (/[0-9]/.test(char)) {
                    r.push(char);
                } else {
                    return end();
                }
                break;
            default:
                break;
        }
    }
    return end();
}

console.log(myAtoi("42"));