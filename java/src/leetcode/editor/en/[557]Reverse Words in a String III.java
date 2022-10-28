//Given a string s, reverse the order of characters in each word within a 
//sentence while still preserving whitespace and initial word order. 
//
// 
// Example 1: 
// Input: s = "Let's take LeetCode contest"
//Output: "s'teL ekat edoCteeL tsetnoc"
// 
// Example 2: 
// Input: s = "God Ding"
//Output: "doG gniD"
// 
// 
// Constraints: 
//
// 
// 1 <= s.length <= 5 * 10⁴ 
// s contains printable ASCII characters. 
// s does not contain any leading or trailing spaces. 
// There is at least one word in s. 
// All the words in s are separated by a single space. 
// 
//
// 👍 4247 👎 214


//leetcode submit region begin(Prohibit modification and deletion)
class Solution {

    public String reverseWords(String s) {
        int left = 0;
        int right = 0;
        char[] sAsArray = s.toCharArray();
        while (right < sAsArray.length) {
            if (right + 1 == sAsArray.length || sAsArray[right + 1] == ' ') {
                this.reverseString(sAsArray, left, right);
                left = right + 1;
                while (left < sAsArray.length && sAsArray[left] == ' ') {
                    left++;
                }
            }
            right++;
        }
        return new String(sAsArray);
    }

    public void reverseString(char[] s, int left, int right) {
        while (left < right) {
            this.swap(s, left, right);
            left++;
            right--;
        }
    }

    public void swap(char[] s, int i, int j) {
        char temp = s[i];
        s[i] = s[j];
        s[j] = temp;
    }
}
//leetcode submit region end(Prohibit modification and deletion)
