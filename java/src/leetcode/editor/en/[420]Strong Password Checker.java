//A password is considered strong if the below conditions are all met: 
//
// 
// It has at least 6 characters and at most 20 characters. 
// It contains at least one lowercase letter, at least one uppercase letter, 
//and at least one digit. 
// It does not contain three repeating characters in a row (i.e., "...aaa..." 
//is weak, but "...aa...a..." is strong, assuming other conditions are met). 
// 
//
// Given a string password, return the minimum number of steps required to make 
//password strong. if password is already strong, return 0. 
//
// In one step, you can: 
//
// 
// Insert one character to password, 
// Delete one character from password, or 
// Replace one character of password with another character. 
// 
//
// 
// Example 1: 
// Input: password = "a"
//Output: 5
// 
// Example 2: 
// Input: password = "aA1"
//Output: 3
// 
// Example 3: 
// Input: password = "1337C0d3"
//Output: 0
// 
// 
// Constraints: 
//
// 
// 1 <= password.length <= 50 
// password consists of letters, digits, dot '.' or exclamation mark '!'. 
// 
//
// 👍 590 👎 1421


import java.util.HashMap;

//leetcode submit region begin(Prohibit modification and deletion)
class Solution {
    public int strongPasswordChecker(String password) {
        int left = 0;
        int right = 0;
        int minChanges = 0;
        int lowerRequired = 1;
        int upperRequired = 1;
        int digitsRequired = 1;
        int lengthRequired = Math.max((6 - password.length()), 0);


        HashMap<Character, Integer> windowCount = new HashMap<Character, Integer>();

        while (right < password.length()) {
            Character c = password.charAt(right);
            int count = 0;
            if (windowCount.containsKey(c)) {
                count = windowCount.get(c);
            }
            windowCount.put(c, ++count);
            if ((right - left) == 3) {
                Character leftC = password.charAt(left);
                count = windowCount.get(leftC);
                count--;
                if (count == 0) windowCount.remove(leftC);
                else windowCount.put(leftC, count);
                left++;
            }
            count = windowCount.get(c);
            if (count == 3) minChanges++;
            if (lowerRequired == 1 && Character.isLowerCase(c)) lowerRequired = 0;
            if (upperRequired == 1 && Character.isUpperCase(c)) upperRequired = 0;
            if (digitsRequired == 1 && Character.isDigit(c)) digitsRequired = 0;
            right++;
        }
        int allRequirements = lengthRequired - ( lowerRequired + upperRequired + digitsRequired );


    }
}
//leetcode submit region end(Prohibit modification and deletion)
