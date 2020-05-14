/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

// 1. 2路归并排序
var findMedianSortedArrays = function(nums1, nums2) {
    var arr = [];
    var a, b;
    while(true) {
        if (isNaN(a)) { a = nums1.shift(); }
        if (isNaN(b)) { b = nums2.shift(); }
        if (isNaN(a) && isNaN(b)) { break; }
        if (isNaN(a)) {
            arr = arr.concat(b, nums2);
            break;
        }
        if (isNaN(b)) { 
            arr = arr.concat(a, nums1);
            break;
        }
        if (!isNaN(a) && !isNaN(b)) {
            if (a > b) {
                arr.push(b);
                b = NaN; // b小，先消耗b
            } else {
                arr.push(a);
                a = NaN; // 同上
            }
        }
    }
    if (arr.length % 2 === 0) {
        var middle = arr.length / 2;
        return (arr[middle - 1] + arr[middle]) / 2;
    } else {
        var middle = Math.floor(arr.length / 2);
        return arr[middle];
    }
};

// 2. 直接找中位数 = 第K小的数字

var nums1 = [1, 2];
var nums2 = [3, 4];
console.log(findMedianSortedArrays(nums1, nums2));