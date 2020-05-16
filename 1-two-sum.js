/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
// 暴力法
// var twoSum = function(nums, target) {
//     for(var i=0; i<nums.length; i++) {
//         var cur = nums[i];
//         var sub = target - cur;
//         for(var j=i+1; j<nums.length; j++) {
//             if (nums[j] === sub) {
//                 return [i, j];
//             }
//         }
//     }
// };

// hash表法
// var twoSum = function(nums, target) {
//     var map = {}; // num: index
//     nums.forEach((num, i) => {
//         map[num] = i;
//     });
//     for(var i=0; i<nums.length; i++) {
//         var sub = target - nums[i];
//         var subIndex = map[sub];
//         if (subIndex && subIndex !== i) {
//             return [i, subIndex];
//         }
//     }
// };

// 一次hash表法
var twoSum = function(nums, target) {
    var map = {}; // num: index
    for(var i=0; i<nums.length; i++) {
        var num = nums[i];
        var sub = target - num;
        var subIndex = map[sub];
        if (subIndex >= 0) {
            return [subIndex, i];
        }
        map[num] = i;
    }
};

// case
var nums = [3, 3];
var target = 6;
var result = twoSum(nums, target);
console.log(result);