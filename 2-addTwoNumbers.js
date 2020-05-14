/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

// @NOTE 题目比较简单，重在考虑全边界条件

// 1. 递归
var addTwoNumbers = function(l1, l2) {
    var result = {
        val: 0,
        next: null,
    };
    function sub(a, b, addOne, curNode) {
        // 终止条件
        if (!a && !b) {
            return;
        }
        // 处理异常情况，下面的代码空值报错
        if (!a) { a = { val: 0, next: null } }
        if (!b) { b = { val: 0, next: null } }
        var newAddOne = 0;
        var aVal = a ? a.val : 0;
        var bVal = b ? b.val : 0;
        var sum = aVal + bVal + addOne;
        if (sum >= 10) {
            sum -= 10;
            newAddOne = 1;
        }
        curNode.val = sum;
        // 明确没有下一步的时候，把next置空，不然把curNode.next传递之后，next不能把curNode.next置空
        if (!a.next && !b.next) {
            if (newAddOne) {
                curNode.next = {
                    val: 1,
                    next: null,
                };
            } else {
                curNode.next = null;
            }
        } else {
            curNode.next = {
                val: 0,
                next: null,
            };
        }
        sub(a.next, b.next, newAddOne, curNode.next);
    }
    sub(l1, l2, 0, result);
    return result;
};

// 2. 循环取值
var addTwoNumbers = function(l1, l2) {
    var result = {};
    var addOne = 0;
    var curNode = result;
    while(l1 != null || l2 != null) {
        if (!l1) { l1 = { val: 0, next: null } };
        if (!l2) { l2 = { val: 0, next: null } };
        var sum = l1.val + l2.val + addOne;
        if (sum >= 10) {
            sum -= 10;
            addOne = 1;
        } else {
            addOne = 0;
        }
        curNode.val = sum;
        if (!l1.next && !l2.next) {
            curNode.next = addOne ? { val: 1, next: null } : null;
        } else {
            curNode.next = { val: 0, next: null };
        }
        curNode = curNode.next;
        l1 = l1.next;
        l2 = l2.next;
    }
    return result;
}

var l2 = {
    val: 7,
    next: {
        val: 3,
        next: null,
    }
}
var l1 = {
    val: 0,
    next: null
}
console.log(addTwoNumbers(l1, l2));