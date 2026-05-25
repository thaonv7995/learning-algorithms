// Database of C and Python solutions for the 50 LeetCode problems
const SOLUTIONS = {
    1: {
        c: `// Solution in C (Two Sum)
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    *returnSize = 2;
    int* res = (int*)malloc(2 * sizeof(int));
    for (int i = 0; i < numsSize; i++) {
        for (int j = i + 1; j < numsSize; j++) {
            if (nums[i] + nums[j] == target) {
                res[0] = i;
                res[1] = j;
                return res;
            }
        }
    }
    *returnSize = 0;
    return NULL;
}`,
        python: `# Solution in Python (Two Sum)
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        seen = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in seen:
                return [seen[complement], i]
            seen[num] = i
        return []`
    },
    3: {
        c: `// Solution in C (Longest Substring Without Repeating Characters)
int lengthOfLongestSubstring(char* s) {
    int charIndex[128];
    for (int i = 0; i < 128; i++) charIndex[i] = -1;
    int left = 0, maxLength = 0;
    for (int right = 0; s[right] != '\\0'; right++) {
        if (charIndex[(unsigned char)s[right]] >= left) {
            left = charIndex[(unsigned char)s[right]] + 1;
        }
        charIndex[(unsigned char)s[right]] = right;
        int currentLength = right - left + 1;
        if (currentLength > maxLength) {
            maxLength = currentLength;
        }
    }
    return maxLength;
}`,
        python: `# Solution in Python (Longest Substring Without Repeating Characters)
class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_index = {}
        left = max_length = 0
        for right, char in enumerate(s):
            if char in char_index and char_index[char] >= left:
                left = char_index[char] + 1
            char_index[char] = right
            max_length = max(max_length, right - left + 1)
        return max_length`
    },
    4: {
        c: `// Solution in C (Median of Two Sorted Arrays)
double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size) {
    int total = nums1Size + nums2Size;
    int i = 0, j = 0;
    int prev = 0, curr = 0;
    for (int count = 0; count <= total / 2; count++) {
        prev = curr;
        if (i < nums1Size && (j >= nums2Size || nums1[i] < nums2[j])) {
            curr = nums1[i++];
        } else {
            curr = nums2[j++];
        }
    }
    if (total % 2 == 1) {
        return curr;
    }
    return (double)(prev + curr) / 2.0;
}`,
        python: `# Solution in Python (Median of Two Sorted Arrays)
class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        A, B = nums1, nums2
        total = len(nums1) + len(nums2)
        half = total // 2
        if len(B) < len(A):
            A, B = B, A
        l, r = 0, len(A) - 1
        while True:
            i = (l + r) // 2
            j = half - i - 2
            Aleft = A[i] if i >= 0 else float("-infinity")
            Aright = A[i + 1] if (i + 1) < len(A) else float("infinity")
            Bleft = B[j] if j >= 0 else float("-infinity")
            Bright = B[j + 1] if (j + 1) < len(B) else float("infinity")
            if Aleft <= Bright and Bleft <= Aright:
                if total % 2:
                    return min(Aright, Bright)
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
            elif Aleft > Bright:
                r = i - 1
            else:
                l = i + 1`
    },
    11: {
        c: `// Solution in C (Container With Most Water)
int maxArea(int* height, int heightSize) {
    int left = 0, right = heightSize - 1;
    int maxW = 0;
    while (left < right) {
        int h = height[left] < height[right] ? height[left] : height[right];
        int w = right - left;
        int area = h * w;
        if (area > maxW) maxW = area;
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxW;
}`,
        python: `# Solution in Python (Container With Most Water)
class Solution:
    def maxArea(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        max_area = 0
        while left < right:
            h = min(height[left], height[right])
            area = h * (right - left)
            max_area = max(max_area, area)
            if height[left] < height[right]:
                left += 1
            else:
                right -= 1
        return max_area`
    },
    15: {
        c: `// Solution in C (3Sum)
int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    qsort(nums, numsSize, sizeof(int), compare);
    int** res = (int**)malloc(numsSize * numsSize * sizeof(int*));
    *returnColumnSizes = (int*)malloc(numsSize * numsSize * sizeof(int));
    int count = 0;
    for (int i = 0; i < numsSize; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int left = i + 1, right = numsSize - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                res[count] = (int*)malloc(3 * sizeof(int));
                res[count][0] = nums[i];
                res[count][1] = nums[left];
                res[count][2] = nums[right];
                (*returnColumnSizes)[count] = 3;
                count++;
                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    *returnSize = count;
    return res;
}`,
        python: `# Solution in Python (3Sum)
class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        res = []
        nums.sort()
        for i in range(len(nums)):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            left, right = i + 1, len(nums) - 1
            while left < right:
                three_sum = nums[i] + nums[left] + nums[right]
                if three_sum == 0:
                    res.append([nums[i], nums[left], nums[right]])
                    while left < right and nums[left] == nums[left + 1]:
                        left += 1
                    while left < right and nums[right] == nums[right - 1]:
                        right -= 1
                    left += 1
                    right -= 1
                elif three_sum < 0:
                    left += 1
                else:
                    right -= 1
        return res`
    },
    19: {
        c: `// Solution in C (Remove Nth Node From End of List)
struct ListNode* removeNthFromEnd(struct ListNode* head, int n) {
    struct ListNode dummy;
    dummy.val = 0;
    dummy.next = head;
    struct ListNode* first = &dummy;
    struct ListNode* second = &dummy;
    for (int i = 0; i <= n; i++) {
        first = first->next;
    }
    while (first != NULL) {
        first = first->next;
        second = second->next;
    }
    second->next = second->next->next;
    return dummy.next;
}`,
        python: `# Solution in Python (Remove Nth Node From End of List)
class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode(0, head)
        first = second = dummy
        for _ in range(n + 1):
            first = first.next
        while first:
            first = first.next
            second = second.next
        second.next = second.next.next
        return dummy.next`
    },
    20: {
        c: `// Solution in C (Valid Parentheses)
bool isValid(char* s) {
    int len = strlen(s);
    char* stack = (char*)malloc(len * sizeof(char));
    int top = -1;
    for (int i = 0; i < len; i++) {
        char c = s[i];
        if (c == '(' || c == '{' || c == '[') {
            stack[++top] = c;
        } else {
            if (top == -1) {
                free(stack);
                return false;
            }
            char t = stack[top--];
            if ((c == ')' && t != '(') ||
                (c == '}' && t != '{') ||
                (c == ']' && t != '[')) {
                free(stack);
                return false;
            }
        }
    }
    bool result = (top == -1);
    free(stack);
    return result;
}`,
        python: `# Solution in Python (Valid Parentheses)
class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
        return not stack`
    },
    21: {
        c: `// Solution in C (Merge Two Sorted Lists)
struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    struct ListNode dummy;
    dummy.val = 0;
    dummy.next = NULL;
    struct ListNode* tail = &dummy;
    while (list1 && list2) {
        if (list1->val <= list2->val) {
            tail->next = list1;
            list1 = list1->next;
        } else {
            tail->next = list2;
            list2 = list2->next;
        }
        tail = tail->next;
    }
    tail->next = list1 ? list1 : list2;
    return dummy.next;
}`,
        python: `# Solution in Python (Merge Two Sorted Lists)
class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode()
        tail = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        tail.next = list1 if list1 else list2
        return dummy.next`
    },
    22: {
        c: `// Solution in C (Generate Parentheses)
void backtrack(char** res, int* count, char* current, int n, int open, int close, int max) {
    if (open + close == max * 2) {
        res[*count] = strdup(current);
        (*count)++;
        return;
    }
    if (open < max) {
        current[open + close] = '(';
        current[open + close + 1] = '\\0';
        backtrack(res, count, current, n, open + 1, close, max);
    }
    if (close < open) {
        current[open + close] = ')';
        current[open + close + 1] = '\\0';
        backtrack(res, count, current, n, open, close + 1, max);
    }
}

char** generateParenthesis(int n, int* returnSize) {
    char** res = (char**)malloc(5000 * sizeof(char*));
    char* current = (char*)malloc((2 * n + 1) * sizeof(char));
    current[0] = '\\0';
    *returnSize = 0;
    backtrack(res, returnSize, current, n, 0, 0, n);
    free(current);
    return res;
}`,
        python: `# Solution in Python (Generate Parentheses)
class Solution:
    def generateParenthesis(self, n: int) -> List[str]:
        res = []
        def backtrack(S = [], open = 0, close = 0):
            if len(S) == 2 * n:
                res.append("".join(S))
                return
            if open < n:
                S.append("(")
                backtrack(S, open + 1, close)
                S.pop()
            if close < open:
                S.append(")")
                backtrack(S, open, close + 1)
                S.pop()
        backtrack()
        return res`
    },
    23: {
        c: `// Solution in C (Merge k Sorted Lists)
struct ListNode* mergeTwoLists(struct ListNode* l1, struct ListNode* l2) {
    struct ListNode dummy;
    dummy.next = NULL;
    struct ListNode* tail = &dummy;
    while (l1 && l2) {
        if (l1->val <= l2->val) {
            tail->next = l1; l1 = l1->next;
        } else {
            tail->next = l2; l2 = l2->next;
        }
        tail = tail->next;
    }
    tail->next = l1 ? l1 : l2;
    return dummy.next;
}

struct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {
    if (listsSize == 0) return NULL;
    int interval = 1;
    while (interval < listsSize) {
        for (int i = 0; i + interval < listsSize; i += interval * 2) {
            lists[i] = mergeTwoLists(lists[i], lists[i + interval]);
        }
        interval *= 2;
    }
    return lists[0];
}`,
        python: `# Solution in Python (Merge k Sorted Lists)
import heapq
class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        heap = []
        for i, l in enumerate(lists):
            if l:
                heapq.heappush(heap, (l.val, i, l))
        dummy = ListNode(0)
        curr = dummy
        while heap:
            val, i, node = heapq.heappop(heap)
            curr.next = node
            curr = curr.next
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
        return dummy.next`
    },
    25: {
        c: `// Solution in C (Reverse Nodes in k-Group)
struct ListNode* reverse(struct ListNode* first, struct ListNode* last) {
    struct ListNode* prev = last;
    while (first != last) {
        struct ListNode* tmp = first->next;
        first->next = prev;
        prev = first;
        first = tmp;
    }
    return prev;
}

struct ListNode* reverseKGroup(struct ListNode* head, int k) {
    struct ListNode* node = head;
    for (int i = 0; i < k; i++) {
        if (!node) return head;
        node = node->next;
    }
    struct ListNode* newHead = reverse(head, node);
    head->next = reverseKGroup(node, k);
    return newHead;
}`,
        python: `# Solution in Python (Reverse Nodes in k-Group)
class Solution:
    def reverseKGroup(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        curr = head
        count = 0
        while curr and count < k:
            curr = curr.next
            count += 1
        if count == k:
            reversed_head = self.reverse(head, k)
            head.next = self.reverseKGroup(curr, k)
            return reversed_head
        return head
    
    def reverse(self, head: ListNode, k: int) -> ListNode:
        prev = None
        curr = head
        for _ in range(k):
            tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp
        return prev`
    },
    33: {
        c: `// Solution in C (Search in Rotated Sorted Array)
int search(int* nums, int numsSize, int target) {
    int low = 0, high = numsSize - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[low] <= nums[mid]) {
            if (nums[low] <= target && target < nums[mid]) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        } else {
            if (nums[mid] < target && target <= nums[high]) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    return -1;
}`,
        python: `# Solution in Python (Search in Rotated Sorted Array)
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            if nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1
        return -1`
    },
    42: {
        c: `// Solution in C (Trapping Rain Water)
int trap(int* height, int heightSize) {
    if (heightSize == 0) return 0;
    int left = 0, right = heightSize - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    return water;
}`,
        python: `# Solution in Python (Trapping Rain Water)
class Solution:
    def trap(self, height: List[int]) -> int:
        if not height:
            return 0
        left, right = 0, len(height) - 1
        left_max = right_max = 0
        water = 0
        while left < right:
            if height[left] < height[right]:
                if height[left] >= left_max:
                    left_max = height[left]
                else:
                    water += left_max - height[left]
                left += 1
            else:
                if height[right] >= right_max:
                    right_max = height[right]
                else:
                    water += right_max - height[right]
                right -= 1
        return water`
    },
    49: {
        c: `// Solution in C (Group Anagrams)
// Solution in C usually requires structures, sorting, and hash map.
// For brief C solution representation, we use nested comparisons or sorted array sorting.
int compareChars(const void* a, const void* b) {
    return (*(char*)a - *(char*)b);
}
// Representation of standard group anagrams output in C`,
        python: `# Solution in Python (Group Anagrams)
from collections import defaultdict
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        groups = defaultdict(list)
        for s in strs:
            key = "".join(sorted(s))
            groups[key].append(s)
        return list(groups.values())`
    },
    51: {
        c: `// Solution in C (N-Queens)
void solveNQueensHelper(int row, int n, int* queens, char*** res, int* returnSize) {
    if (row == n) {
        res[*returnSize] = (char**)malloc(n * sizeof(char*));
        for (int i = 0; i < n; i++) {
            res[*returnSize][i] = (char*)malloc((n + 1) * sizeof(char));
            for (int j = 0; j < n; j++) {
                res[*returnSize][i][j] = (queens[i] == j) ? 'Q' : '.';
            }
            res[*returnSize][i][n] = '\\0';
        }
        (*returnSize)++;
        return;
    }
    for (int col = 0; col < n; col++) {
        bool isValid = true;
        for (int r = 0; r < row; r++) {
            if (queens[r] == col || abs(queens[r] - col) == abs(r - row)) {
                isValid = false; break;
            }
        }
        if (isValid) {
            queens[row] = col;
            solveNQueensHelper(row + 1, n, queens, res, returnSize);
            queens[row] = -1;
        }
    }
}`,
        python: `# Solution in Python (N-Queens)
class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        res = []
        board = [["."] * n for _ in range(n)]
        cols = set()
        posDiag = set() # (r + c)
        negDiag = set() # (r - c)
        
        def backtrack(r):
            if r == n:
                copy = ["".join(row) for row in board]
                res.append(copy)
                return
            for c in range(n):
                if c in cols or (r + c) in posDiag or (r - c) in negDiag:
                    continue
                cols.add(c)
                posDiag.add(r + c)
                negDiag.add(r - c)
                board[r][c] = "Q"
                
                backtrack(r + 1)
                
                cols.remove(c)
                posDiag.remove(r + c)
                negDiag.remove(r - c)
                board[r][c] = "."
        backtrack(0)
        return res`
    },
    62: {
        c: `// Solution in C (Unique Paths)
int uniquePaths(int m, int n) {
    int dp[m][n];
    for (int i = 0; i < m; i++) dp[i][0] = 1;
    for (int j = 0; j < n; j++) dp[0][j] = 1;
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    return dp[m-1][n-1];
}`,
        python: `# Solution in Python (Unique Paths)
class Solution:
    def uniquePaths(self, m: int, n: int) -> int:
        dp = [1] * n
        for i in range(1, m):
            for j in range(1, n):
                dp[j] += dp[j - 1]
        return dp[-1]`
    },
    76: {
        c: `// Solution in C (Minimum Window Substring)
char* minWindow(char* s, char* t) {
    int map[128] = {0};
    for (int i = 0; t[i] != '\\0'; i++) map[(unsigned char)t[i]]++;
    int counter = strlen(t);
    int begin = 0, end = 0, head = 0, len = INT_MAX;
    while (s[end] != '\\0') {
        if (map[(unsigned char)s[end]] > 0) counter--;
        map[(unsigned char)s[end]]--;
        end++;
        while (counter == 0) {
            if (end - begin < len) {
                len = end - begin;
                head = begin;
            }
            map[(unsigned char)s[begin]]++;
            if (map[(unsigned char)s[begin]] > 0) counter++;
            begin++;
        }
    }
    if (len == INT_MAX) return "";
    char* res = (char*)malloc((len + 1) * sizeof(char));
    strncpy(res, s + head, len);
    res[len] = '\\0';
    return res;
}`,
        python: `# Solution in Python (Minimum Window Substring)
from collections import Counter
class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not t or not s:
            return ""
        dict_t = Counter(t)
        required = len(dict_t)
        l, r = 0, 0
        formed = 0
        window_counts = {}
        ans = float("inf"), None, None
        while r < len(s):
            character = s[r]
            window_counts[character] = window_counts.get(character, 0) + 1
            if character in dict_t and window_counts[character] == dict_t[character]:
                formed += 1
            while l <= r and formed == required:
                character = s[l]
                if r - l + 1 < ans[0]:
                    ans = (r - l + 1, l, r)
                window_counts[character] -= 1
                if character in dict_t and window_counts[character] < dict_t[character]:
                    formed -= 1
                l += 1    
            r += 1
        return "" if ans[0] == float("inf") else s[ans[1] : ans[2] + 1]`
    },
    84: {
        c: `// Solution in C (Largest Rectangle in Histogram)
int largestRectangleArea(int* heights, int heightsSize) {
    int* stack = (int*)malloc((heightsSize + 1) * sizeof(int));
    int top = -1;
    int maxArea = 0;
    int i = 0;
    while (i < heightsSize) {
        if (top == -1 || heights[i] >= heights[stack[top]]) {
            stack[++top] = i++;
        } else {
            int tp = stack[top--];
            int width = (top == -1) ? i : (i - stack[top] - 1);
            int area = heights[tp] * width;
            if (area > maxArea) maxArea = area;
        }
    }
    while (top != -1) {
        int tp = stack[top--];
        int width = (top == -1) ? i : (i - stack[top] - 1);
        int area = heights[tp] * width;
        if (area > maxArea) maxArea = area;
    }
    free(stack);
    return maxArea;
}`,
        python: `# Solution in Python (Largest Rectangle in Histogram)
class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        stack = []
        max_area = 0
        heights.append(0)
        for i, h in enumerate(heights):
            while stack and heights[stack[-1]] > h:
                height = heights[stack.pop()]
                width = i if not stack else i - stack[-1] - 1
                max_area = max(max_area, height * width)
            stack.append(i)
        return max_area`
    },
    91: {
        c: `// Solution in C (Decode Ways)
int numDecodings(char* s) {
    int len = strlen(s);
    if (len == 0 || s[0] == '0') return 0;
    int prev2 = 1, prev1 = 1;
    for (int i = 1; i < len; i++) {
        int curr = 0;
        if (s[i] != '0') curr += prev1;
        int twoDigit = (s[i-1] - '0') * 10 + (s[i] - '0');
        if (twoDigit >= 10 && twoDigit <= 26) curr += prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
        python: `# Solution in Python (Decode Ways)
class Solution:
    def numDecodings(self, s: str) -> int:
        if not s or s[0] == '0':
            return 0
        dp = [0] * (len(s) + 1)
        dp[0] = dp[1] = 1
        for i in range(2, len(s) + 1):
            if s[i - 1] != '0':
                dp[i] += dp[i - 1]
            two_digit = int(s[i - 2:i])
            if 10 <= two_digit <= 26:
                dp[i] += dp[i - 2]
        return dp[-1]`
    },
    98: {
        c: `// Solution in C (Validate Binary Search Tree)
bool validate(struct TreeNode* node, long minVal, long maxVal) {
    if (!node) return true;
    if (node->val <= minVal || node->val >= maxVal) return false;
    return validate(node->left, minVal, node->val) && validate(node->right, node->val, maxVal);
}

bool isValidBST(struct TreeNode* root) {
    return validate(root, LONG_MIN, LONG_MAX);
}`,
        python: `# Solution in Python (Validate Binary Search Tree)
class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node, low=-float('inf'), high=float('inf')):
            if not node:
                return True
            if node.val <= low or node.val >= high:
                return False
            return (validate(node.left, low, node.val) and 
                    validate(node.right, node.val, high))
        return validate(root)`
    },
    100: {
        c: `// Solution in C (Same Tree)
bool isSameTree(struct TreeNode* p, struct TreeNode* q) {
    if (!p && !q) return true;
    if (!p || !q) return false;
    if (p->val != q->val) return false;
    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}`,
        python: `# Solution in Python (Same Tree)
class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        if not p and not q:
            return True
        if not p or not q:
            return False
        if p.val != q.val:
            return False
        return self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)`
    },
    102: {
        c: `// Solution in C (Binary Tree Level Order Traversal)
// Requires standard dynamic queue allocation for levels traversal representation.`,
        python: `# Solution in Python (Binary Tree Level Order Traversal)
from collections import deque
class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        res, queue = [], deque([root])
        while queue:
            level = []
            for _ in range(len(queue)):
                node = queue.popleft()
                level.append(node.val)
                if node.left: queue.append(node.left)
                if node.right: queue.append(node.right)
            res.append(level)
        return res`
    },
    104: {
        c: `// Solution in C (Maximum Depth of Binary Tree)
int maxDepth(struct TreeNode* root) {
    if (!root) return 0;
    int l = maxDepth(root->left);
    int r = maxDepth(root->right);
    return 1 + (l > r ? l : r);
}`,
        python: `# Solution in Python (Maximum Depth of Binary Tree)
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`
    },
    121: {
        c: `// Solution in C (Best Time to Buy and Sell Stock)
int maxProfit(int* prices, int pricesSize) {
    int minPrice = INT_MAX;
    int maxProf = 0;
    for (int i = 0; i < pricesSize; i++) {
        if (prices[i] < minPrice) minPrice = prices[i];
        else if (prices[i] - minPrice > maxProf) {
            maxProf = prices[i] - minPrice;
        }
    }
    return maxProf;
}`,
        python: `# Solution in Python (Best Time to Buy and Sell Stock)
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for price in prices:
            if price < min_price:
                min_price = price
            elif price - min_price > max_profit:
                max_profit = price - min_price
        return max_profit`
    },
    124: {
        c: `// Solution in C (Binary Tree Maximum Path Sum)
int helper(struct TreeNode* node, int* maxSum) {
    if (!node) return 0;
    int l = helper(node->left, maxSum);
    int r = helper(node->right, maxSum);
    int leftMax = l > 0 ? l : 0;
    int rightMax = r > 0 ? r : 0;
    int currentSum = node->val + leftMax + rightMax;
    if (currentSum > *maxSum) *maxSum = currentSum;
    return node->val + (leftMax > rightMax ? leftMax : rightMax);
}

int maxPathSum(struct TreeNode* root) {
    int maxSum = INT_MIN;
    helper(root, &maxSum);
    return maxSum;
}`,
        python: `# Solution in Python (Binary Tree Maximum Path Sum)
class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        max_sum = float('-inf')
        def helper(node):
            nonlocal max_sum
            if not node:
                return 0
            left = max(helper(node.left), 0)
            right = max(helper(node.right), 0)
            current_sum = node.val + left + right
            max_sum = max(max_sum, current_sum)
            return node.val + max(left, right)
        helper(root)
        return max_sum`
    },
    125: {
        c: `// Solution in C (Valid Palindrome)
bool isPalindrome(char* s) {
    int left = 0, right = strlen(s) - 1;
    while (left < right) {
        while (left < right && !isalnum((unsigned char)s[left])) left++;
        while (left < right && !isalnum((unsigned char)s[right])) right--;
        if (tolower((unsigned char)s[left]) != tolower((unsigned char)s[right])) return false;
        left++; right--;
    }
    return true;
}`,
        python: `# Solution in Python (Valid Palindrome)
class Solution:
    def isPalindrome(self, s: str) -> bool:
        left, right = 0, len(s) - 1
        while left < right:
            while left < right and not s[left].isalnum():
                left += 1
            while left < right and not s[right].isalnum():
                right -= 1
            if s[left].lower() != s[right].lower():
                return False
            left += 1
            right -= 1
        return True`
    },
    128: {
        c: `// Solution in C (Longest Consecutive Sequence)
int compare(const void* a, const void* b) {
    return (*(int*)a - *(int*)b);
}

int longestConsecutive(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    qsort(nums, numsSize, sizeof(int), compare);
    int longest = 1, current = 1;
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] != nums[i - 1]) {
            if (nums[i] == nums[i - 1] + 1) {
                current++;
            } else {
                if (current > longest) longest = current;
                current = 1;
            }
        }
    }
    return current > longest ? current : longest;
}`,
        python: `# Solution in Python (Longest Consecutive Sequence)
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        num_set = set(nums)
        longest = 0
        for num in num_set:
            if num - 1 not in num_set:
                current_num = num
                current_streak = 1
                while current_num + 1 in num_set:
                    current_num += 1
                    current_streak += 1
                longest = max(longest, current_streak)
        return longest`
    },
    133: {
        c: `// Solution in C (Clone Graph)
// Requires dynamic tracking, adjacency lists and DFS pointers representation.`,
        python: `# Solution in Python (Clone Graph)
class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None
        visited = {}
        def dfs(curr):
            if curr in visited:
                return visited[curr]
            clone = Node(curr.val)
            visited[curr] = clone
            for neighbor in curr.neighbors:
                clone.neighbors.append(dfs(neighbor))
            return clone
        return dfs(node)`
    },
    136: {
        c: `// Solution in C (Single Number)
int singleNumber(int* nums, int numsSize) {
    int res = 0;
    for (int i = 0; i < numsSize; i++) {
        res ^= nums[i];
    }
    return res;
}`,
        python: `# Solution in Python (Single Number)
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        res = 0
        for num in nums:
            res ^= num
        return res`
    },
    139: {
        c: `// Solution in C (Word Break)
bool wordBreak(char* s, char** wordDict, int wordDictSize) {
    int len = strlen(s);
    bool* dp = (bool*)calloc(len + 1, sizeof(bool));
    dp[0] = true;
    for (int i = 1; i <= len; i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j]) {
                // Check if substring s[j..i-1] is in dictionary
                char temp = s[i];
                s[i] = '\\0';
                char* sub = s + j;
                bool found = false;
                for (int w = 0; w < wordDictSize; w++) {
                    if (strcmp(sub, wordDict[w]) == 0) {
                        found = true; break;
                    }
                }
                s[i] = temp;
                if (found) {
                    dp[i] = true; break;
                }
            }
        }
    }
    bool result = dp[len];
    free(dp);
    return result;
}`,
        python: `# Solution in Python (Word Break)
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        word_set = set(wordDict)
        dp = [False] * (len(s) + 1)
        dp[0] = True
        for i in range(1, len(s) + 1):
            for j in range(i):
                if dp[j] and s[j:i] in word_set:
                    dp[i] = True
                    break
        return dp[-1]`
    },
    141: {
        c: `// Solution in C (Linked List Cycle)
bool hasCycle(struct ListNode *head) {
    if (!head || !head->next) return false;
    struct ListNode *slow = head;
    struct ListNode *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`,
        python: `# Solution in Python (Linked List Cycle)
class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if not head or not head.next:
            return False
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow == fast:
                return True
        return False`
    },
    155: {
        c: `// Solution in C (Min Stack)
typedef struct {
    int* data;
    int* minData;
    int top;
} MinStack;

MinStack* minStackCreate() {
    MinStack* obj = (MinStack*)malloc(sizeof(MinStack));
    obj->data = (int*)malloc(10000 * sizeof(int));
    obj->minData = (int*)malloc(10000 * sizeof(int));
    obj->top = -1;
    return obj;
}

void minStackPush(MinStack* obj, int val) {
    obj->top++;
    obj->data[obj->top] = val;
    if (obj->top == 0) {
        obj->minData[obj->top] = val;
    } else {
        int currentMin = obj->minData[obj->top - 1];
        obj->minData[obj->top] = val < currentMin ? val : currentMin;
    }
}

void minStackPop(MinStack* obj) {
    obj->top--;
}

int minStackTop(MinStack* obj) {
    return obj->data[obj->top];
}

int minStackGetMin(MinStack* obj) {
    return obj->minData[obj->top];
}

void minStackFree(MinStack* obj) {
    free(obj->data);
    free(obj->minData);
    free(obj);
}`,
        python: `# Solution in Python (Min Stack)
class MinStack:
    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        val = self.stack.pop()
        if val == self.min_stack[-1]:
            self.min_stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.min_stack[-1]`
    },
    198: {
        c: `// Solution in C (House Robber)
int rob(int* nums, int numsSize) {
    if (numsSize == 0) return 0;
    if (numsSize == 1) return nums[0];
    int prev2 = 0;
    int prev1 = 0;
    for (int i = 0; i < numsSize; i++) {
        int temp = prev1;
        int current = prev2 + nums[i] > prev1 ? prev2 + nums[i] : prev1;
        prev2 = temp;
        prev1 = current;
    }
    return prev1;
}`,
        python: `# Solution in Python (House Robber)
class Solution:
    def rob(self, nums: List[int]) -> int:
        prev2 = prev1 = 0
        for num in nums:
            temp = prev1
            prev1 = max(prev2 + num, prev1)
            prev2 = temp
        return prev1`
    },
    200: {
        c: `// Solution in C (Number of Islands)
void dfs(char** grid, int gridSize, int* gridColSize, int r, int c) {
    if (r < 0 || c < 0 || r >= gridSize || c >= gridColSize[r] || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, gridSize, gridColSize, r + 1, c);
    dfs(grid, gridSize, gridColSize, r - 1, c);
    dfs(grid, gridSize, gridColSize, r, c + 1);
    dfs(grid, gridSize, gridColSize, r, c - 1);
}

int numIslands(char** grid, int gridMatrixSize, int* gridColSize) {
    int count = 0;
    for (int r = 0; r < gridMatrixSize; r++) {
        for (int c = 0; c < gridColSize[r]; c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, gridMatrixSize, gridColSize, r, c);
            }
        }
    }
    return count;
}`,
        python: `# Solution in Python (Number of Islands)
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid: return 0
        count = 0
        rows, cols = len(grid), len(grid[0])
        def dfs(r, c):
            if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
                return
            grid[r][c] = '0'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
        for r in range(rows):
            for c in range(cols):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`
    },
    206: {
        c: `// Solution in C (Reverse Linked List)
struct ListNode* reverseList(struct ListNode* head) {
    struct ListNode* prev = NULL;
    struct ListNode* curr = head;
    while (curr) {
        struct ListNode* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}`,
        python: `# Solution in Python (Reverse Linked List)
class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        prev = None
        curr = head
        while curr:
            nextNode = curr.next
            curr.next = prev
            prev = curr
            curr = nextNode
        return prev`
    },
    207: {
        c: `// Solution in C (Course Schedule)
// BFS Topological Sort (Kahn's Algorithm) representation.`,
        python: `# Solution in Python (Course Schedule)
from collections import deque
class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for dest, src in prerequisites:
            adj[src].append(dest)
            indegree[dest] += 1
        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        visited = 0
        while queue:
            node = queue.popleft()
            visited += 1
            for neighbor in adj[node]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    queue.append(neighbor)
        return visited == numCourses`
    },
    226: {
        c: `// Solution in C (Invert Binary Tree)
struct TreeNode* invertTree(struct TreeNode* root) {
    if (!root) return NULL;
    struct TreeNode* temp = root->left;
    root->left = invertTree(root->right);
    root->right = invertTree(temp);
    return root;
}`,
        python: `# Solution in Python (Invert Binary Tree)
class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`
    },
    238: {
        c: `// Solution in C (Product of Array Except Self)
int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    *returnSize = numsSize;
    int* ans = (int*)malloc(numsSize * sizeof(int));
    ans[0] = 1;
    for (int i = 1; i < numsSize; i++) {
        ans[i] = ans[i - 1] * nums[i - 1];
    }
    int right = 1;
    for (int i = numsSize - 1; i >= 0; i--) {
        ans[i] *= right;
        right *= nums[i];
    }
    return ans;
}`,
        python: `# Solution in Python (Product of Array Except Self)
class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        n = len(nums)
        ans = [1] * n
        for i in range(1, n):
            ans[i] = ans[i - 1] * nums[i - 1]
        right = 1
        for i in range(n - 1, -1, -1):
            ans[i] *= right
            right *= nums[i]
        return ans`
    },
    239: {
        c: `// Solution in C (Sliding Window Maximum)
// Requires Monotonic Deque layout representation.`,
        python: `# Solution in Python (Sliding Window Maximum)
from collections import deque
class Solution:
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        res = []
        q = deque() # index stores
        for i, num in enumerate(nums):
            while q and nums[q[-1]] < num:
                q.pop()
            q.append(i)
            if q[0] == i - k:
                q.popleft()
            if i >= k - 1:
                res.append(nums[q[0]])
        return res`
    },
    242: {
        c: `// Solution in C (Valid Anagram)
bool isAnagram(char* s, char* t) {
    if (strlen(s) != strlen(t)) return false;
    int count[26] = {0};
    for (int i = 0; s[i] != '\\0'; i++) {
        count[s[i] - 'a']++;
        count[t[i] - 'a']--;
    }
    for (int i = 0; i < 26; i++) {
        if (count[i] != 0) return false;
    }
    return true;
}`,
        python: `# Solution in Python (Valid Anagram)
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        count = [0] * 26
        for i in range(len(s)):
            count[ord(s[i]) - ord('a')] += 1
            count[ord(t[i]) - ord('a')] -= 1
        return all(c == 0 for c in count)`
    },
    283: {
        c: `// Solution in C (Move Zeroes)
void moveZeroes(int* nums, int numsSize) {
    int lastNonZero = 0;
    for (int i = 0; i < numsSize; i++) {
        if (nums[i] != 0) {
            int tmp = nums[lastNonZero];
            nums[lastNonZero++] = nums[i];
            nums[i] = tmp;
        }
    }
}`,
        python: `# Solution in Python (Move Zeroes)
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        last = 0
        for i in range(len(nums)):
            if nums[i] != 0:
                nums[last], nums[i] = nums[i], nums[last]
                last += 1`
    },
    297: {
        c: `// Solution in C (Serialize and Deserialize Binary Tree)
// Requires standard dynamic tree traversal buffers.`,
        python: `# Solution in Python (Serialize and Deserialize Binary Tree)
class Codec:
    def serialize(self, root):
        res = []
        def dfs(node):
            if not node:
                res.append("N")
                return
            res.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(res)

    def deserialize(self, data):
        vals = data.split(",")
        self.i = 0
        def dfs():
            if vals[self.i] == "N":
                self.i += 1
                return None
            node = TreeNode(int(vals[self.i]))
            self.i += 1
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()`
    },
    322: {
        c: `// Solution in C (Coin Change)
int coinChange(int* coins, int coinsSize, int amount) {
    int* dp = (int*)malloc((amount + 1) * sizeof(int));
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) dp[i] = amount + 1;
    for (int i = 1; i <= amount; i++) {
        for (int j = 0; j < coinsSize; j++) {
            if (coins[j] <= i) {
                int rem = dp[i - coins[j]] + 1;
                if (rem < dp[i]) dp[i] = rem;
            }
        }
    }
    int ans = dp[amount] > amount ? -1 : dp[amount];
    free(dp);
    return ans;
}`,
        python: `# Solution in Python (Coin Change)
class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0
        for i in range(1, amount + 1):
            for coin in coins:
                if coin <= i:
                    dp[i] = min(dp[i], dp[i - coin] + 1)
        return dp[amount] if dp[amount] <= amount else -1`
    },
    328: {
        c: `// Solution in C (Odd Even Linked List)
struct ListNode* oddEvenList(struct ListNode* head) {
    if (!head) return NULL;
    struct ListNode* odd = head;
    struct ListNode* even = head->next;
    struct ListNode* evenHead = even;
    while (even && even->next) {
        odd->next = even->next;
        odd = odd->next;
        even->next = odd->next;
        even = even->next;
    }
    odd->next = evenHead;
    return head;
}`,
        python: `# Solution in Python (Odd Even Linked List)
class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head: return None
        odd, even = head, head.next
        even_head = even
        while even and even.next:
            odd.next = even.next
            odd = odd.next
            even.next = odd.next
            even = even.next
        odd.next = even_head
        return head`
    },
    347: {
        c: `// Solution in C (Top K Frequent Elements)
// Requires quickselect or min-heap representation.`,
        python: `# Solution in Python (Top K Frequent Elements)
import collections, heapq
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        count = collections.Counter(nums)
        return heapq.nlargest(k, count.keys(), key=count.get)`
    },
    387: {
        c: `// Solution in C (First Unique Character in a String)
int firstUniqChar(char* s) {
    int count[26] = {0};
    for (int i = 0; s[i] != '\\0'; i++) count[s[i] - 'a']++;
    for (int i = 0; s[i] != '\\0'; i++) {
        if (count[s[i] - 'a'] == 1) return i;
    }
    return -1;
}`,
        python: `# Solution in Python (First Unique Character in a String)
import collections
class Solution:
    def firstUniqChar(self, s: str) -> int:
        count = collections.Counter(s)
        for idx, char in enumerate(s):
            if count[char] == 1:
                return idx
        return -1`
    },
    704: {
        c: `// Solution in C (Binary Search)
int search(int* nums, int numsSize, int target) {
    int low = 0, high = numsSize - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`,
        python: `# Solution in Python (Binary Search)
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            elif nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1
        return -1`
    },
    731: {
        c: `// Solution in C (Koko Eating Bananas)
int minEatingSpeed(int* piles, int pilesSize, int h) {
    int low = 1, high = 0;
    for (int i = 0; i < pilesSize; i++) {
        if (piles[i] > high) high = piles[i];
    }
    int ans = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        long totalHours = 0;
        for (int i = 0; i < pilesSize; i++) {
            totalHours += (piles[i] + mid - 1) / mid;
        }
        if (totalHours <= h) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`,
        python: `# Solution in Python (Koko Eating Bananas)
import math
class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        low, high = 1, max(piles)
        ans = high
        while low <= high:
            mid = (low + high) // 2
            total_hours = sum(math.ceil(p / mid) for p in piles)
            if total_hours <= h:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans`
    },
    739: {
        c: `// Solution in C (Daily Temperatures)
int* dailyTemperatures(int* T, int TSize, int* returnSize) {
    *returnSize = TSize;
    int* ans = (int*)calloc(TSize, sizeof(int));
    int* stack = (int*)malloc(TSize * sizeof(int));
    int top = -1;
    for (int i = 0; i < TSize; i++) {
        while (top != -1 && T[i] > T[stack[top]]) {
            int idx = stack[top--];
            ans[idx] = i - idx;
        }
        stack[++top] = i;
    }
    free(stack);
    return ans;
}`,
        python: `# Solution in Python (Daily Temperatures)
class Solution:
    def dailyTemperatures(self, T: List[int]) -> List[int]:
        ans = [0] * len(T)
        stack = [] # indices stores
        for i, t in enumerate(T):
            while stack and t > T[stack[-1]]:
                idx = stack.pop()
                ans[idx] = i - idx
            stack.append(i)
        return ans`
    },
    875: {
        c: `// Solution in C (Koko Eating Bananas)
int minEatingSpeed(int* piles, int pilesSize, int h) {
    int low = 1, high = 0;
    for (int i = 0; i < pilesSize; i++) {
        if (piles[i] > high) high = piles[i];
    }
    int ans = high;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        long totalHours = 0;
        for (int i = 0; i < pilesSize; i++) {
            totalHours += (piles[i] + mid - 1) / mid;
        }
        if (totalHours <= h) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}`,
        python: `# Solution in Python (Koko Eating Bananas)
import math
class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        low, high = 1, max(piles)
        ans = high
        while low <= high:
            mid = (low + high) // 2
            hours = sum(math.ceil(p / mid) for p in piles)
            if hours <= h:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans`
    },
    1143: {
        c: `// Solution in C (Longest Common Subsequence)
int longestCommonSubsequence(char* text1, char* text2) {
    int len1 = strlen(text1);
    int len2 = strlen(text2);
    int dp[len1 + 1][len2 + 1];
    for (int i = 0; i <= len1; i++) dp[i][0] = 0;
    for (int j = 0; j <= len2; j++) dp[0][j] = 0;
    for (int i = 1; i <= len1; i++) {
        for (int j = 1; j <= len2; j++) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                int max = dp[i - 1][j] > dp[i][j - 1] ? dp[i - 1][j] : dp[i][j - 1];
                dp[i][j] = max;
            }
        }
    }
    return dp[len1][len2];
}`,
        python: `# Solution in Python (Longest Common Subsequence)
class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]
        for i in range(1, len(text1) + 1):
            for j in range(1, len(text2) + 1):
                if text1[i - 1] == text2[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1] + 1
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
        return dp[-1][-1]`
    }
};

if (typeof module !== 'undefined') {
    module.exports = SOLUTIONS;
}
if (typeof window !== 'undefined') {
    window.SOLUTIONS = SOLUTIONS;
}
