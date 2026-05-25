/** Content bodies for LC #561-590 */
module.exports = {
  561: {
    category: 'Array',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Ghép cặp 2n số nguyên thành n cặp (a1,b1),... sao tổng min(a1,b1)+...+min(an,bn) lớn nhất.',
    examples: [
      { input: 'nums = [1,4,3,2]', output: '4' },
      { input: 'nums = [6,2,6,5,1,2]', output: '9' }
    ],
    approach: 'Sort tăng dần; cộng nums[0], nums[2], nums[4],... — min của mỗi cặp kề nhau sau sort.',
    memoryTip: 'Array partition: sort ascending, sum every other index starting 0.',
    solutions: {
      python: 'class Solution:\n    def arrayPairSum(self, nums: List[int]) -> int:\n        nums.sort()\n        return sum(nums[::2])',
      cpp: 'class Solution {\npublic:\n    int arrayPairSum(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        int ans = 0;\n        for (int i = 0; i < (int)nums.size(); i += 2) ans += nums[i];\n        return ans;\n    }\n};',
      c: '/* Sort sum even indices — xem C++ */'
    },
    analysis: {
      correctness: 'Greedy: ghép số nhỏ với số nhỏ kế tiếp để max hóa tổng các min.',
      edgeCases: ['n=1 một cặp', 'Toàn số bằng nhau'],
      pitfalls: ['Cộng max thay min', 'Không sort trước']
    }
  },
  563: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description: 'Tilt của node = |tổng cây con trái - tổng cây con phải|. Trả tổng tilt mọi node.',
    examples: [
      { input: 'root = [1,2,3]', output: '1' },
      { input: 'root = [4,-9,20,null,null,15,7]', output: '44' }
    ],
    approach: 'Postorder: trả tổng subtree; cộng |sumL-sumR| vào global answer.',
    memoryTip: 'Binary tree tilt = postorder sum + accumulate abs(leftSum-rightSum).',
    solutions: {
      python: 'class Solution:\n    def findTilt(self, root: Optional[TreeNode]) -> int:\n        self.ans = 0\n        def dfs(n):\n            if not n: return 0\n            l, r = dfs(n.left), dfs(n.right)\n            self.ans += abs(l - r)\n            return n.val + l + r\n        dfs(root)\n        return self.ans',
      cpp: 'class Solution {\n    int ans = 0;\n    int dfs(TreeNode* n) {\n        if (!n) return 0;\n        int l = dfs(n->left), r = dfs(n->right);\n        ans += abs(l - r);\n        return n->val + l + r;\n    }\npublic:\n    int findTilt(TreeNode* root) {\n        dfs(root);\n        return ans;\n    }\n};',
      c: '/* Postorder subtree sum — xem C++ */'
    },
    analysis: {
      correctness: 'Tổng subtree đúng tại mỗi node; tilt cộng dồn độc lập.',
      edgeCases: ['Một nút tilt 0', 'Giá trị âm'],
      pitfalls: ['Tính tilt tại root only', 'Nhầm tilt với balance factor']
    }
  },
  564: {
    category: 'Math',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(log n)',
    description: 'Cho số nguyên n. Trả palindrome gần n nhất (khác n). Nếu hoà tie chọn nhỏ hơn.',
    examples: [
      { input: 'n = 4', output: '3' },
      { input: 'n = 123', output: '121' },
      { input: 'n = 1234', output: '1221' }
    ],
    approach: 'Sinh ứng viên từ n: palindrome cùng độ dài (mirror nửa trái ±1), và độ dài n±1 (99, 1001...). Lọc khác n, min |diff|.',
    memoryTip: 'Closest palindrome: candidates from half mirror, ±1 on left half, and 10^d±1.',
    solutions: {
      python: 'class Solution:\n    def nearestPalindromic(self, n: str) -> str:\n        def mirror(s, odd):\n            k = len(s)//2 if odd else len(s)//2\n            return s[:k] + s[:k][::-1] if odd else s[:k] + s[:k-1][::-1]\n        def candidates(s):\n            L = len(s)\n            res = {str(10**L - 1), str(10**(L-1) + 1)}\n            k = L // 2\n            left = int(s[:k] if L%2 else s[:k])\n            for d in (-1, 0, 1):\n                nl = str(left + d)\n                if L % 2:\n                    res.add(nl + nl[-2::-1])\n                else:\n                    res.add(nl + nl[::-1])\n            return res\n        cands = [c for c in candidates(n) if c != n]\n        cands.sort(key=lambda x: (abs(int(x)-int(n)), int(x)))\n        return cands[0]',
      cpp: 'class Solution {\n    long long build(const string& left, bool odd, const string& s) {\n        string p = left;\n        if (odd) { for (int i = (int)s.size()/2-1; i >= 0; i--) p += s[i]; }\n        else { for (int i = (int)left.size()-1; i >= 0; i--) p += left[i]; }\n        return stoll(p);\n    }\npublic:\n    string nearestPalindromic(string n) {\n        long long num = stoll(n);\n        set<long long> cand;\n        int L = n.size();\n        cand.insert((long long)pow(10,L)-1);\n        cand.insert((long long)pow(10,L-1)+1);\n        string half = n.substr(0, (L+1)/2);\n        long long h = stoll(half);\n        for (long long d : {h-1,h,h+1}) {\n            string ds = to_string(d);\n            cand.insert(build(ds, L%2, n));\n        }\n        cand.erase(num);\n        long long best = *cand.begin(), bestDiff = LLONG_MAX;\n        for (long long c : cand) {\n            long long diff = llabs(c-num);\n            if (diff < bestDiff || (diff==bestDiff && c < best)) { bestDiff=diff; best=c; }\n        }\n        return to_string(best);\n    }\n};',
      c: '/* Generate palindrome candidates — xem C++ */'
    },
    analysis: {
      correctness: 'Palindrome gần nhất luôn thuộc tập ứng viên sinh từ nửa trái ±1 và 10^k±1.',
      edgeCases: ['n=11 → 9 hoặc 22 tie chọn nhỏ', 'n lớn 11 chữ số'],
      pitfalls: ['Thử mọi palindrome O(n)', 'Quên tie-break smaller']
    }
  },
  565: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Mảng là permutation 0..n-1. nums[i] trỏ tới nums[nums[i]]. Tìm độ dài nesting dài nhất (chu trình).',
    examples: [
      { input: 'nums = [5,4,0,3,1,6,2]', output: '4' },
      { input: 'nums = [0,1,2]', output: '1' }
    ],
    approach: 'Duyệt i chưa visit; đi theo nums[i] đếm bước trong cycle; đánh dấu visited.',
    memoryTip: 'Array nesting = find max cycle length in functional graph.',
    solutions: {
      python: 'class Solution:\n    def arrayNesting(self, nums: List[int]) -> int:\n        seen = [False]*len(nums)\n        ans = 0\n        for i in range(len(nums)):\n            if seen[i]: continue\n            cnt = 0\n            j = i\n            while not seen[j]:\n                seen[j] = True\n                j = nums[j]\n                cnt += 1\n            ans = max(ans, cnt)\n        return ans',
      cpp: 'class Solution {\npublic:\n    int arrayNesting(vector<int>& nums) {\n        vector<bool> seen(nums.size());\n        int ans = 0;\n        for (int i = 0; i < (int)nums.size(); i++) {\n            if (seen[i]) continue;\n            int cnt = 0, j = i;\n            while (!seen[j]) { seen[j]=true; j=nums[j]; cnt++; }\n            ans = max(ans, cnt);\n        }\n        return ans;\n    }\n};',
      c: '/* Cycle detection walk — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi phần tử thuộc đúng một cycle; max cycle length là đáp án.',
      edgeCases: ['Một phần tử → 1', 'Một cycle toàn bộ mảng'],
      pitfalls: ['DFS stack overflow với visited sai', 'Đếm lại node đã visit']
    }
  },
  566: {
    category: 'Array',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
    description: 'Reshape ma trận m×n thành r×c. Không thể reshape trả ma trận gốc (cùng ref).',
    examples: [
      { input: 'mat=[[1,2],[3,4]], r=1, c=4', output: '[[1,2,3,4]]' },
      { input: 'mat=[[1,2],[3,4]], r=2, c=4', output: '[[1,2],[3,4]]' }
    ],
    approach: 'Nếu m*n != r*c return mat; flatten row-major rồi fill ma trận r×c.',
    memoryTip: 'Reshape matrix: check size then index k -> (k/c, k%c).',
    solutions: {
      python: 'class Solution:\n    def matrixReshape(self, mat: List[List[int]], r: int, c: int) -> List[List[int]]:\n        m, n = len(mat), len(mat[0])\n        if m*n != r*c:\n            return mat\n        flat = [x for row in mat for x in row]\n        return [flat[i*c:(i+1)*c] for i in range(r)]',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> matrixReshape(vector<vector<int>>& mat, int r, int c) {\n        int m = mat.size(), n = mat[0].size();\n        if (m*n != r*c) return mat;\n        vector<vector<int>> ans(r, vector<int>(c));\n        for (int k = 0; k < m*n; k++) ans[k/c][k%c] = mat[k/n][k%n];\n        return ans;\n    }\n};',
      c: '/* Flatten reshape — xem C++ */'
    },
    analysis: {
      correctness: 'Thứ tự row-major giữ nguyên khi reshape hợp lệ.',
      edgeCases: ['r,c bằng m,n → copy', '1xN reshape'],
      pitfalls: ['Không check m*n==r*c', 'Column-major nhầm']
    }
  },
  567: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Kiểm tra s2 có chứa permutation của s1 (cùng độ dài, đa tập ký tự) không.',
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true' },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: 'false' }
    ],
    approach: 'Sliding window len |s1| trên s2: so sánh freq 26 chữ cái; matches==26.',
    memoryTip: 'Permutation in string = fixed window char count diff/matches.',
    solutions: {
      python: 'class Solution:\n    def checkInclusion(self, s1: str, s2: str) -> bool:\n        if len(s1) > len(s2): return False\n        need = [0]*26\n        win = [0]*26\n        for c in s1: need[ord(c)-97] += 1\n        for i, c in enumerate(s2):\n            win[ord(c)-97] += 1\n            if i >= len(s1):\n                win[ord(s2[i-len(s1)])-97] -= 1\n            if i >= len(s1)-1:\n                if win == need: return True\n        return False',
      cpp: 'class Solution {\npublic:\n    bool checkInclusion(string s1, string s2) {\n        if (s1.size() > s2.size()) return false;\n        vector<int> need(26), win(26);\n        for (char c : s1) need[c-\'a\']++;\n        for (int i = 0; i < (int)s2.size(); i++) {\n            win[s2[i]-\'a\']++;\n            if (i >= (int)s1.size()) win[s2[i-s1.size()]-\'a\']--;\n            if (i >= (int)s1.size()-1 && win == need) return true;\n        }\n        return false;\n    }\n};',
      c: '/* Sliding window freq — xem C++ */'
    },
    analysis: {
      correctness: 'Window size cố định |s1|; freq khớp iff permutation tồn tại.',
      edgeCases: ['s1 dài hơn s2', 'Trùng hoàn toàn substring'],
      pitfalls: ['Sort substring O(n log n)', 'Quên shrink window']
    }
  },
  570: {
    category: 'Database',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Bảng Employee(id, name, salary, managerId). Liệt kê tên manager có ≥5 direct reports.',
    examples: [
      { input: 'Manager 101 có 5 nhân viên trực tiếp', output: 'Tên manager 101' },
      { input: 'Không manager nào ≥5', output: 'Rỗng' }
    ],
    approach: 'GROUP BY managerId HAVING COUNT(*)>=5 JOIN Employee lấy name manager.',
    memoryTip: 'Managers 5+ reports = GROUP BY managerId HAVING COUNT >= 5.',
    solutions: {
      python: '# SQL\nSELECT name\nFROM Employee\nWHERE id IN (\n  SELECT managerId FROM Employee\n  WHERE managerId IS NOT NULL\n  GROUP BY managerId HAVING COUNT(*) >= 5\n);',
      cpp: '// SQL\nSELECT name\nFROM Employee\nWHERE id IN (\n  SELECT managerId FROM Employee\n  WHERE managerId IS NOT NULL\n  GROUP BY managerId HAVING COUNT(*) >= 5\n);',
      c: '/* SQL GROUP BY managerId — xem SQL */'
    },
    analysis: {
      correctness: 'managerId group count đúng số direct reports; join lấy tên.',
      edgeCases: ['managerId NULL bỏ qua', 'Nhiều manager đủ điều kiện'],
      pitfalls: ['Đếm cả indirect reports', 'Quên IS NOT NULL']
    }
  },
  572: {
    category: 'Tree',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(h)',
    description: 'Kiểm tra subRoot có phải subtree của root không (cùng cấu trúc và giá trị).',
    examples: [
      { input: 'root=[3,4,5,1,2], subRoot=[4,1,2]', output: 'true' },
      { input: 'root=[3,4,5,1,2,null,null,null,0], subRoot=[4,1,2]', output: 'false' }
    ],
    approach: 'DFS root: tại mỗi node gọi isSameTree(node, subRoot); nếu khớp return true.',
    memoryTip: 'Subtree check = traverse + isSameTree helper at each node.',
    solutions: {
      python: 'class Solution:\n    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n        def same(a, b):\n            if not a and not b: return True\n            if not a or not b or a.val != b.val: return False\n            return same(a.left,b.left) and same(a.right,b.right)\n        if not root: return False\n        if same(root, subRoot): return True\n        return self.isSubtree(root.left, subRoot) or self.isSubtree(root.right, subRoot)',
      cpp: 'class Solution {\n    bool same(TreeNode* a, TreeNode* b) {\n        if (!a && !b) return true;\n        if (!a || !b || a->val != b->val) return false;\n        return same(a->left,b->left) && same(a->right,b->right);\n    }\npublic:\n    bool isSubtree(TreeNode* root, TreeNode* subRoot) {\n        if (!root) return false;\n        if (same(root, subRoot)) return true;\n        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);\n    }\n};',
      c: '/* DFS isSameTree — xem C++ */'
    },
    analysis: {
      correctness: 'Subtree phải khớp cấu trúc từ một node; isSameTree kiểm tra đủ.',
      edgeCases: ['subRoot null → true', 'subRoot lớn hơn root → false'],
      pitfalls: ['Serialize compare O(n) nhưng cần delimiter', 'Chỉ match root top']
    }
  },
  575: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'candyType có 2n loại (mỗi loại 2 viên). Alice ăn n viên, tối đa hóa số loại khác nhau.',
    examples: [
      { input: 'candyType = [1,1,2,2,3,3]', output: '3' },
      { input: 'candyType = [1,1,2,3]', output: '2' },
      { input: 'candyType = [6,6,7,7]', output: '1' }
    ],
    approach: 'Answer = min(n, số loại unique) vì tối đa n viên và mỗi loại tối đa 1 viên để đa dạng.',
    memoryTip: 'Distribute candies: min(len/2, count distinct types).',
    solutions: {
      python: 'class Solution:\n    def distributeCandies(self, candyType: List[int]) -> int:\n        return min(len(candyType)//2, len(set(candyType)))',
      cpp: 'class Solution {\npublic:\n    int distributeCandies(vector<int>& candyType) {\n        unordered_set<int> s(candyType.begin(), candyType.end());\n        return min((int)candyType.size()/2, (int)s.size());\n    }\n};',
      c: '/* min n/2 unique — xem C++ */'
    },
    analysis: {
      correctness: 'Giới hạn bởi số viên n và số loại; min của hai là tối ưu.',
      edgeCases: ['Một loại duy nhất', 'Mọi loại khác nhau'],
      pitfalls: ['Greedy phức tạp không cần', 'Quên chia 2 cho n']
    }
  },
  576: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(m * n * N)',
    spaceComplexity: 'O(m * n * N)',
    description: 'Lưới m×n, bắt đầu (0,0), N bước di chuyển U/D/L/R. Đếm số path ra ngoài biên (out of boundary). Mod 10^9+7.',
    examples: [
      { input: 'm=2, n=2, N=2, start=(0,0)', output: '6' },
      { input: 'm=1, n=3, N=3', output: '12' }
    ],
    approach: 'DP[step][i][j] = số cách ở (i,j) sau step bước; chuyển 4 hướng, cộng out khi ra ngoài.',
    memoryTip: 'Out of boundary paths = 3D DP steps × position, add when move OOB.',
    solutions: {
      python: 'class Solution:\n    def findPaths(self, m: int, n: int, maxMove: int, startRow: int, startColumn: int) -> int:\n        MOD = 10**9+7\n        dp = [[[0]*n for _ in range(m)] for _ in range(maxMove+1)]\n        dp[0][startRow][startColumn] = 1\n        ans = 0\n        dirs = [(1,0),(-1,0),(0,1),(0,-1)]\n        for s in range(maxMove):\n            for i in range(m):\n                for j in range(n):\n                    v = dp[s][i][j]\n                    if not v: continue\n                    for di,dj in dirs:\n                        ni, nj = i+di, j+dj\n                        if 0<=ni<m and 0<=nj<n:\n                            dp[s+1][ni][nj] = (dp[s+1][ni][nj]+v)%MOD\n                        else:\n                            ans = (ans+v)%MOD\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findPaths(int m, int n, int maxMove, int sr, int sc) {\n        const int MOD = 1e9+7;\n        vector<vector<vector<int>>> dp(maxMove+1, vector<vector<int>>(m, vector<int>(n)));\n        dp[0][sr][sc] = 1;\n        long long ans = 0;\n        int d[4][2]={{1,0},{-1,0},{0,1},{0,-1}};\n        for (int s=0;s<maxMove;s++)\n            for (int i=0;i<m;i++)\n                for (int j=0;j<n;j++) if (dp[s][i][j])\n                    for (auto& dd:d) {\n                        int ni=i+dd[0], nj=j+dd[1];\n                        if (ni>=0&&ni<m&&nj>=0&&nj<n) dp[s+1][ni][nj]=(dp[s+1][ni][nj]+dp[s][i][j])%MOD;\n                        else ans=(ans+dp[s][i][j])%MOD;\n                    }\n        return ans;\n    }\n};',
      c: '/* DP paths OOB — xem C++ */'
    },
    analysis: {
      correctness: 'DP đếm mọi walk đúng N bước; ra biên tại bước bất kỳ cộng vào ans.',
      edgeCases: ['N=0 không di chuyển', 'Grid 1x1'],
      pitfalls: ['Quên mod', 'Nhầm in-bound paths vs out-bound']
    }
  },
  577: {
    category: 'Database',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Employee LEFT JOIN Bonus. Liệt kê name nhân viên không có bonus hoặc bonus < 1000.',
    examples: [
      { input: 'Employee có bonus NULL', output: 'Tên employee đó' },
      { input: 'Bonus 500', output: 'Tên employee bonus < 1000' }
    ],
    approach: 'SELECT e.name FROM Employee e LEFT JOIN Bonus b ON e.empId=b.empId WHERE b.bonus IS NULL OR b.bonus<1000.',
    memoryTip: 'Employee bonus = LEFT JOIN + filter NULL or low bonus.',
    solutions: {
      python: '# SQL\nSELECT e.name\nFROM Employee e\nLEFT JOIN Bonus b ON e.empId = b.empId\nWHERE b.bonus IS NULL OR b.bonus < 1000;',
      cpp: '// SQL\nSELECT e.name\nFROM Employee e\nLEFT JOIN Bonus b ON e.empId = b.empId\nWHERE b.bonus IS NULL OR b.bonus < 1000;',
      c: '/* SQL LEFT JOIN filter — xem SQL */'
    },
    analysis: {
      correctness: 'LEFT JOIN giữ employee không bonus; điều kiện OR cover cả hai case.',
      edgeCases: ['Mọi người bonus cao → rỗng', 'Bonus đúng 1000 không liệt kê'],
      pitfalls: ['INNER JOIN mất no-bonus', 'So sánh NULL với <1000 sai']
    }
  },
  581: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Tìm độ dài subarray liên tiếp ngắn nhất cần sort để cả mảng non-decreasing.',
    examples: [
      { input: 'nums = [2,6,4,8,10,9,15]', output: '5' },
      { input: 'nums = [1,2,3,4]', output: '0' },
      { input: 'nums = [1]', output: '0' }
    ],
    approach: 'Tìm left: điểm đầu unsorted; right: điểm cuối unsorted bằng scan min/max suffix/prefix.',
    memoryTip: 'Shortest unsorted subarray: expand left/right then shrink with min/max bounds.',
    solutions: {
      python: 'class Solution:\n    def findUnsortedSubarray(self, nums: List[int]) -> int:\n        n = len(nums)\n        lo, hi = 0, n-1\n        while lo < n-1 and nums[lo] <= nums[lo+1]: lo += 1\n        if lo == n-1: return 0\n        while hi > 0 and nums[hi] >= nums[hi-1]: hi -= 1\n        submax = max(nums[lo:hi+1])\n        submin = min(nums[lo:hi+1])\n        while lo > 0 and nums[lo-1] > submin: lo -= 1\n        while hi < n-1 and nums[hi+1] < submax: hi += 1\n        return hi - lo + 1',
      cpp: 'class Solution {\npublic:\n    int findUnsortedSubarray(vector<int>& nums) {\n        int n = nums.size(), lo=0, hi=n-1;\n        while (lo<n-1 && nums[lo]<=nums[lo+1]) lo++;\n        if (lo==n-1) return 0;\n        while (hi>0 && nums[hi]>=nums[hi-1]) hi--;\n        int submax=*max_element(nums.begin()+lo, nums.begin()+hi+1);\n        int submin=*min_element(nums.begin()+lo, nums.begin()+hi+1);\n        while (lo>0 && nums[lo-1]>submin) lo--;\n        while (hi<n-1 && nums[hi+1]<submax) hi++;\n        return hi-lo+1;\n    }\n};',
      c: '/* Expand unsorted bounds — xem C++ */'
    },
    analysis: {
      correctness: 'Core unsorted [lo,hi] mở rộng để mọi phần tử ngoài không vi phạm sort.',
      edgeCases: ['Đã sorted → 0', 'Toàn mảng unsorted'],
      pitfalls: ['Sort copy O(n log n) chấp nhận nhưng có O(n)', 'Min/max subarray sai biên']
    }
  },
  583: {
    category: 'String',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
    description: 'Xóa tối thiểu ký tự ở word1 và word2 để hai chuỗi còn lại giống nhau. Trả số ký tự xóa tối thiểu.',
    examples: [
      { input: 'word1 = "sea", word2 = "eat"', output: '2' },
      { input: 'word1 = "leetcode", word2 = "etco"', output: '4' }
    ],
    approach: 'LCS length L; answer = len1 + len2 - 2*L.',
    memoryTip: 'Delete ops two strings = m+n - 2*LCS (giữ common subsequence).',
    solutions: {
      python: 'class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        m, n = len(word1), len(word2)\n        dp = [[0]*(n+1) for _ in range(m+1)]\n        for i in range(1,m+1):\n            for j in range(1,n+1):\n                if word1[i-1]==word2[j-1]: dp[i][j]=dp[i-1][j-1]+1\n                else: dp[i][j]=max(dp[i-1][j], dp[i][j-1])\n        return m+n-2*dp[m][n]',
      cpp: 'class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        int m=word1.size(), n=word2.size();\n        vector<vector<int>> dp(m+1, vector<int>(n+1));\n        for (int i=1;i<=m;i++)\n            for (int j=1;j<=n;j++)\n                dp[i][j]=word1[i-1]==word2[j-1]?dp[i-1][j-1]+1:max(dp[i-1][j],dp[i][j-1]);\n        return m+n-2*dp[m][n];\n    }\n};',
      c: '/* LCS delete count — xem C++ */'
    },
    analysis: {
      correctness: 'Giữ LCS tối đa; xóa phần còn lại hai bên.',
      edgeCases: ['Một chuỗi rỗng → len kia', 'Giống hệt → 0'],
      pitfalls: ['Edit distance nhầm (insert+delete)', 'Không nhân 2 cho LCS']
    }
  },
  584: {
    category: 'Database',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Bảng Customer(name, referee_id). Liệt kê tên khách hàng không có referee (referee_id IS NULL).',
    examples: [
      { input: 'referee_id NULL', output: 'Tên customer' },
      { input: 'Mọi customer có referee', output: 'Rỗng' }
    ],
    approach: 'SELECT name FROM Customer WHERE referee_id IS NULL.',
    memoryTip: 'Find customer referee NULL = simple WHERE referee_id IS NULL.',
    solutions: {
      python: '# SQL\nSELECT name\nFROM Customer\nWHERE referee_id IS NULL;',
      cpp: '// SQL — trả danh sách tên khách không có referee\nSELECT name\nFROM Customer\nWHERE referee_id IS NULL;',
      c: '/* SQL IS NULL filter */'
    },
    analysis: {
      correctness: 'IS NULL chọn đúng khách không referee.',
      edgeCases: ['referee_id=0 khác NULL', 'Tên trùng'],
      pitfalls: ['WHERE referee_id = NULL sai', 'Loại referee_id=2 theo đề gốc — chỉ NULL']
    }
  },
  585: {
    category: 'Database',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Insurance table t1 join t2 cùng pid khác tuid, t1 ttype=\'premium\', t2 ttype=\'claim\', t1 tname khác t2 tname, t1 txn_date năm 2016. SUM t2 price.',
    examples: [
      { input: 'Premium và claim khác insurer cùng policy 2016', output: 'Tổng claim price' },
      { input: 'Không cặp thỏa', output: 'NULL hoặc 0 tùy engine' }
    ],
    approach: 'Self join Insurance ON pid, filter premium/claim, different tname, year 2016, SUM t2.price.',
    memoryTip: 'Investments 2016 = self join premium vs claim same pid diff name year filter.',
    solutions: {
      python: '# SQL\nSELECT SUM(t2.price) AS total\nFROM Insurance t1\nJOIN Insurance t2 ON t1.pid = t2.pid\nWHERE t1.ttype = \'premium\' AND t2.ttype = \'claim\'\n  AND t1.tname != t2.tname\n  AND t1.txn_date LIKE \'2016%\';',
      cpp: '// SQL\nSELECT SUM(t2.price) AS total\nFROM Insurance t1\nJOIN Insurance t2 ON t1.pid = t2.pid\nWHERE t1.ttype = \'premium\' AND t2.ttype = \'claim\'\n  AND t1.tname != t2.tname\n  AND t1.txn_date LIKE \'2016%\';',
      c: '/* SQL self join Insurance — xem SQL */'
    },
    analysis: {
      correctness: 'Join cùng policy premium/claim khác insurer, lọc năm 2016 trên premium.',
      edgeCases: ['Nhiều claim một policy', 'Không row → NULL sum'],
      pitfalls: ['Join sai ttype', 'Lọc năm trên claim thay premium']
    }
  },
  586: {
    category: 'Database',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Orders(customer_number, order_number). Tìm customer_number có nhiều order nhất; tie lấy customer nhỏ nhất.',
    examples: [
      { input: 'Customer 1: 3 orders, customer 2: 1', output: '1' },
      { input: 'Hai customer cùng 2 orders', output: 'customer id nhỏ hơn' }
    ],
    approach: 'GROUP BY customer_number ORDER BY COUNT(*) DESC, customer_number ASC LIMIT 1.',
    memoryTip: 'Most orders customer = GROUP BY count desc min customer tie-break.',
    solutions: {
      python: '# SQL\nSELECT customer_number\nFROM Orders\nGROUP BY customer_number\nORDER BY COUNT(*) DESC, customer_number ASC\nLIMIT 1;',
      cpp: '// SQL\nSELECT customer_number\nFROM Orders\nGROUP BY customer_number\nORDER BY COUNT(*) DESC, customer_number ASC\nLIMIT 1;',
      c: '/* SQL GROUP BY ORDER LIMIT — xem SQL */'
    },
    analysis: {
      correctness: 'Sort count desc rồi customer asc chọn đúng tie-break.',
      edgeCases: ['Một customer', 'Mọi người 1 order → min id'],
      pitfalls: ['MAX(count) subquery phức tạp hơn cần', 'Quên tie-break ASC']
    }
  },
  587: {
    category: 'Array',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Cho tập điểm 2D. Trả các điểm trên convex hull (fence) theo thứ tự ngược chiều kim đồng hồ.',
    examples: [
      { input: 'points = [[0,0],[0,1],[1,1],[1,0]]', output: '[[0,0],[1,0],[1,1],[0,1]]' },
      { input: 'points = [[1,1],[2,2],[3,3]]', output: '[[1,1],[2,2],[3,3]]' }
    ],
    approach: 'Andrew monotone chain: sort points, build lower và upper hull, loại duplicate cuối.',
    memoryTip: 'Erect the fence = convex hull Andrew scan, cross product > 0 pop.',
    solutions: {
      python: 'class Solution:\n    def outerTrees(self, points: List[List[int]]) -> List[List[int]]:\n        pts = sorted(set(map(tuple, points)))\n        if len(pts) <= 1:\n            return [list(p) for p in pts]\n        def cross(o,a,b):\n            return (a[0]-o[0])*(b[1]-o[1])-(a[1]-o[1])*(b[0]-o[0])\n        lower=[]\n        for p in pts:\n            while len(lower)>=2 and cross(lower[-2],lower[-1],p)<0: lower.pop()\n            lower.append(p)\n        upper=[]\n        for p in reversed(pts):\n            while len(upper)>=2 and cross(upper[-2],upper[-1],p)<0: upper.pop()\n            upper.append(p)\n        return [list(p) for p in lower[:-1]+upper[:-1]]',
      cpp: 'class Solution {\n    long long cross(vector<int>& o, vector<int>& a, vector<int>& b) {\n        return (long long)(a[0]-o[0])*(b[1]-o[1]) - (long long)(a[1]-o[1])*(b[0]-o[0]);\n    }\npublic:\n    vector<vector<int>> outerTrees(vector<vector<int>>& points) {\n        sort(points.begin(), points.end());\n        vector<vector<int>> lower, upper;\n        for (auto& p : points) {\n            while (lower.size()>=2 && cross(lower[lower.size()-2], lower.back(), p) < 0) lower.pop_back();\n            lower.push_back(p);\n        }\n        for (int i=points.size()-1;i>=0;i--) {\n            auto& p = points[i];\n            while (upper.size()>=2 && cross(upper[upper.size()-2], upper.back(), p) < 0) upper.pop_back();\n            upper.push_back(p);\n        }\n        lower.pop_back(); upper.pop_back();\n        lower.insert(lower.end(), upper.begin(), upper.end());\n        return lower;\n    }\n};',
      c: '/* Convex hull Andrew — xem C++ */'
    },
    analysis: {
      correctness: 'Monotone chain cho convex hull; cross product loại điểm lõm.',
      edgeCases: ['Collinear trên cạnh — giữ điểm đầu cuối', '≤2 điểm'],
      pitfalls: ['Graham scan sort angle phức tạp', 'Cross sign ngược chiều hull']
    }
  },
  589: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description: 'Preorder traversal cây N-ary: root trước, rồi lần lượt từng subtree con.',
    examples: [
      { input: 'root = [1,null,3,2,4,null,5,6]', output: '[1,3,5,6,2,4]' },
      { input: 'root = [1,null,2,3,4,5]', output: '[1,2,3,4,5]' }
    ],
    approach: 'DFS preorder push val rồi recurse children; hoặc stack push children ngược thứ tự.',
    memoryTip: 'N-ary preorder = visit root then each child left-to-right recursive.',
    solutions: {
      python: 'class Solution:\n    def preorder(self, root: Node) -> List[int]:\n        ans = []\n        def dfs(n):\n            if not n: return\n            ans.append(n.val)\n            for c in n.children:\n                dfs(c)\n        dfs(root)\n        return ans',
      cpp: 'class Solution {\n    void dfs(Node* n, vector<int>& ans) {\n        if (!n) return;\n        ans.push_back(n->val);\n        for (auto* c : n->children) dfs(c, ans);\n    }\npublic:\n    vector<int> preorder(Node* root) {\n        vector<int> ans;\n        dfs(root, ans);\n        return ans;\n    }\n};',
      c: '/* DFS preorder N-ary — xem C++ */'
    },
    analysis: {
      correctness: 'Thứ tự root trước con trái→phải đúng preorder N-ary.',
      edgeCases: ['null → []', 'Leaf không children'],
      pitfalls: ['Postorder nhầm', 'Stack order ngược khi iterative']
    }
  },
  590: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description: 'Postorder traversal cây N-ary: duyệt hết subtree con trước, ghi root sau cùng.',
    examples: [
      { input: 'root = [1,null,3,2,4,null,5,6]', output: '[5,6,3,2,4,1]' },
      { input: 'root = [1,null,2,3,4,5]', output: '[2,3,4,5,1]' }
    ],
    approach: 'DFS postorder: recurse children trước, append val sau.',
    memoryTip: 'N-ary postorder = all children first then root value.',
    solutions: {
      python: 'class Solution:\n    def postorder(self, root: Node) -> List[int]:\n        ans = []\n        def dfs(n):\n            if not n: return\n            for c in n.children:\n                dfs(c)\n            ans.append(n.val)\n        dfs(root)\n        return ans',
      cpp: 'class Solution {\n    void dfs(Node* n, vector<int>& ans) {\n        if (!n) return;\n        for (auto* c : n->children) dfs(c, ans);\n        ans.push_back(n->val);\n    }\npublic:\n    vector<int> postorder(Node* root) {\n        vector<int> ans;\n        dfs(root, ans);\n        return ans;\n    }\n};',
      c: '/* DFS postorder N-ary — xem C++ */'
    },
    analysis: {
      correctness: 'Mọi node được thêm sau toàn bộ descendants.',
      edgeCases: ['null → []', 'Single node → [val]'],
      pitfalls: ['Preorder nhầm', 'Iterative phức tạp không cần']
    }
  }
};
