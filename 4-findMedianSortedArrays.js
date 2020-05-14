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
// 思路参考：https://leetcode-cn.com/problems/median-of-two-sorted-arrays/solution/xiang-xi-tong-su-de-si-lu-fen-xi-duo-jie-fa-by-w-2/
// 我写得不好：相当于遍历的所有的情况
var findMedianSortedArrays = function(nums1, nums2) {
    var k = Math.floor((nums1.length + nums2.length) / 2);
    if (k === 0) {
        var noEmptyArr = nums1.length !== 0 ? nums1 : nums2;
        return noEmptyArr[0];
    }
    var hasTwo = (nums1.length + nums2.length) % 2 === 0;
    function findKth(arr1, arr2, k) {
        // 结束条件：k = 1 || arr1 or arr2 = [];
        if (k === 1 && arr1.length !== 0 && arr2.length !== 0) { // 如果还要删除一个数，则先删除（为什么不放在下一次递归里，因为这个时候deleteNum计算出来是0了，也要做兼容）
            var targetArr = arr1[0] > arr2[0] ? arr2 : arr1;
            var deleteNum = targetArr.splice(0, 1)[0];
            if (!hasTwo) { // 一个中位数，取剩余数组中最小的那个
                if (arr1.length === 0 || arr2.length === 0) {
                    var noEmptyArr = arr1.length !== 0 ? arr1 : arr2;
                    return noEmptyArr[0];
                } else {
                    return Math.min(arr1[0], arr2[0]);
                }
            } else { // 两个中位数，取最小那个和已删除那个
                if (arr1.length === 0 || arr2.length === 0) {
                    var noEmptyArr = arr1.length !== 0 ? arr1 : arr2;
                    return (deleteNum + noEmptyArr[0])/2;
                } else {
                    return (deleteNum + Math.min(arr1[0], arr2[0]))/2;
                }
            }              
        } else if (arr1.length === 0 || arr2.length === 0) { // 如果某个数组为空，则在剩下的数组里面去第k小（取两个，第k个）
            var noEmptyArr = arr1.length !== 0 ? arr1 : arr2;
            return hasTwo ? (noEmptyArr[k-1] + noEmptyArr[k])/2 : noEmptyArr[k];
        }
        var deleteNum = Math.floor(k / 2);
        var arr1KEnd = deleteNum >= arr1.length ? arr1[arr1.length - 1] : arr1[deleteNum - 1];
        var arr2KEnd = deleteNum >= arr2.length ? arr2[arr2.length - 1] : arr2[deleteNum - 1];
        var targetArr = arr1KEnd > arr2KEnd ? arr2 : arr1;
        // 移除较小数组的前面的部分
        if (deleteNum >= targetArr.length) { 
            deleteNum = targetArr.length;
            if (targetArr === arr1) { arr1 = []; }
            else { arr2 = []; }
        } else {
            targetArr.splice(0, deleteNum); // @NOTE 其实不用清理数组，只有记录下标即可，懒而已
        }
        k = k - deleteNum;
        return findKth(arr1, arr2, k);
    }
    return findKth(nums1, nums2, k);
}

var nums1 = [1, 2];
var nums2 = [-1, 3];
console.log(findMedianSortedArrays(nums1, nums2));