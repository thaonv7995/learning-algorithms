/** Content bodies for LC #501-530 (catalog range) */
module.exports = {
  501: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho cây BST. Trả về tất cả giá trị mode (xuất hiện nhiều nhất). Nếu nhiều mode thì trả tất cả, thứ tự tăng dần. Duyệt inorder vì BST cho thứ tự đã sort.',
    examples: [
      { input: 'root = [1,null,2,2]', output: '[2]' },
      { input: 'root = [0]', output: '[0]' },
      { input: 'root = [1,1,2,2,2]', output: '[2]' }
    ],
    approach: 'Inorder duyệt tăng dần: đếm tần suất liên tiếp, cập nhật maxCount và danh sách modes khi gặp tần suất mới hoặc bằng max.',
    memoryTip: 'BST mode = inorder + đếm run liên tiếp, không cần hash toàn cây nếu chỉ cần mode trên giá trị sort.',
    solutions: {
      python: 'class Solution:\n    def findMode(self, root: Optional[TreeNode]) -> List[int]:\n        self.prev = None\n        self.maxCnt = self.cnt = 0\n        self.modes = []\n        def dfs(n):\n            if not n: return\n            dfs(n.left)\n            if self.prev is None:\n                self.cnt = 1\n            elif n.val == self.prev:\n                self.cnt += 1\n            else:\n                self.cnt = 1\n            if self.cnt > self.maxCnt:\n                self.maxCnt = self.cnt\n                self.modes = [n.val]\n            elif self.cnt == self.maxCnt:\n                self.modes.append(n.val)\n            self.prev = n.val\n            dfs(n.right)\n        dfs(root)\n        return self.modes',
      cpp: 'class Solution {\n    TreeNode* prev = nullptr;\n    int maxCnt = 0, cnt = 0;\n    vector<int> modes;\n    void inorder(TreeNode* n) {\n        if (!n) return;\n        inorder(n->left);\n        cnt = (!prev || n->val == prev->val) ? cnt + 1 : 1;\n        if (cnt > maxCnt) { maxCnt = cnt; modes = {n->val}; }\n        else if (cnt == maxCnt) modes.push_back(n->val);\n        prev = n;\n        inorder(n->right);\n    }\npublic:\n    vector<int> findMode(TreeNode* root) {\n        inorder(root);\n        return modes;\n    }\n};',
      c: '/* Inorder đếm run — xem C++ */'
    },
    analysis: {
      correctness: 'Inorder liệt kê giá trị không giảm; đếm run cho tần suất chính xác trên BST.',
      edgeCases: ['Một nút → mode là giá trị đó', 'Nhiều mode cùng tần suất max'],
      pitfalls: ['Dùng hash bỏ qua thứ tự tăng dần output', 'Quên reset cnt khi giá trị đổi']
    }
  },
  502: {
    category: 'Array',
    timeComplexity: 'O(n log n + k log n)',
    spaceComplexity: 'O(n)',
    description: 'Có k dự án (capital[i], profits[i]) và vốn ban đầu w. Mỗi lần chọn dự án có capital ≤ w, cộng profit vào w. Lặp tối đa k lần. Trả vốn tối đa sau k dự án.',
    examples: [
      { input: 'k=2, w=0, capital=[1,2,3], profits=[0,1,1]', output: '4' },
      { input: 'k=3, w=0, capital=[1,2], profits=[1,2]', output: '3' }
    ],
    approach: 'Sort theo capital. Max-heap profit các dự án khả thi. Mỗi vòng: đẩy mọi dự án capital≤w vào heap, chọn profit lớn nhất một lần, cộng vào w.',
    memoryTip: 'IPO = greedy khả thi + max-heap profit; sort capital trước, mở rộng tập khả thi dần.',
    solutions: {
      python: 'class Solution:\n    def findMaximizedCapital(self, k: int, w: int, profits: List[int], capital: List[int]) -> int:\n        import heapq\n        projects = sorted(zip(capital, profits))\n        heap = []\n        i = 0\n        for _ in range(k):\n            while i < len(projects) and projects[i][0] <= w:\n                heapq.heappush(heap, -projects[i][1])\n                i += 1\n            if not heap:\n                break\n            w -= heapq.heappop(heap)\n        return w',
      cpp: 'class Solution {\npublic:\n    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {\n        int n = profits.size();\n        vector<pair<int,int>> p(n);\n        for (int i = 0; i < n; i++) p[i] = {capital[i], profits[i]};\n        sort(p.begin(), p.end());\n        priority_queue<int> pq;\n        int i = 0;\n        while (k--) {\n            while (i < n && p[i].first <= w) pq.push(p[i++].second);\n            if (pq.empty()) break;\n            w += pq.top(); pq.pop();\n        }\n        return w;\n    }\n};',
      c: '/* Greedy + max-heap — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi bước chọn profit lớn nhất trong tập khả thi là optimal greedy khi vốn chỉ tăng.',
      edgeCases: ['k=0 → w ban đầu', 'Không dự án khả thi → dừng sớm'],
      pitfalls: ['Sort sai chiều capital', 'Quên push dự án mới khả thi sau khi w tăng']
    }
  },
  503: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho mảng vòng (next của phần tử cuối là phần tử đầu). Với mỗi nums[i], trả next greater element; không có thì -1.',
    examples: [
      { input: 'nums = [1,2,1]', output: '[2,-1,2]' },
      { input: 'nums = [1,2,3,4,3]', output: '[2,3,4,-1,4]' }
    ],
    approach: 'Monotonic stack giảm dần trên mảng lặp 2n: pop khi nums[i%n] > stack top, gán NGE; push i%n.',
    memoryTip: 'NGE vòng = duyệt 2n với index % n, stack lưu index chưa có NGE.',
    solutions: {
      python: 'class Solution:\n    def nextGreaterElements(self, nums: List[int]) -> List[int]:\n        n = len(nums)\n        ans = [-1] * n\n        st = []\n        for i in range(2 * n - 1, -1, -1):\n            idx = i % n\n            while st and nums[st[-1]] <= nums[idx]:\n                st.pop()\n            if st:\n                ans[idx] = nums[st[-1]]\n            st.append(idx)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<int> nextGreaterElements(vector<int>& nums) {\n        int n = nums.size();\n        vector<int> ans(n, -1);\n        stack<int> st;\n        for (int i = 2 * n - 1; i >= 0; i--) {\n            int idx = i % n;\n            while (!st.empty() && nums[st.top()] <= nums[idx]) st.pop();\n            if (!st.empty()) ans[idx] = nums[st.top()];\n            st.push(idx);\n        }\n        return ans;\n    }\n};',
      c: '/* Monotonic stack 2n — xem C++ */'
    },
    analysis: {
      correctness: 'Duyệt ngược mô phỏng tìm phần tử lớn hơn tiếp theo trên vòng tròn.',
      edgeCases: ['Một phần tử → -1', 'Mảng giảm dần → toàn -1 trừ vòng'],
      pitfalls: ['Chỉ duyệt n lần bỏ sót wrap', 'Stack không pop bằng <= gây sai NGE']
    }
  },
  504: {
    category: 'Math',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Cho số nguyên num. Trả về biểu diễn base-7 dạng chuỗi (kể cả số âm, thêm dấu trừ). num=0 trả "0".',
    examples: [
      { input: 'num = 100', output: '"134"' },
      { input: 'num = -7', output: '"-10"' },
      { input: 'num = 0', output: '"0"' }
    ],
    approach: 'Lặp lấy num % 7 và num // 7 (Python) hoặc xử lý dấu riêng với C++ % âm.',
    memoryTip: 'Base-7: chia dư 7 đảo chuỗi; số âm xử lý dấu trước vòng lặp.',
    solutions: {
      python: 'class Solution:\n    def convertToBase7(self, num: int) -> str:\n        if num == 0:\n            return "0"\n        neg = num < 0\n        num = abs(num)\n        s = []\n        while num:\n            s.append(str(num % 7))\n            num //= 7\n        res = "".join(reversed(s))\n        return "-" + res if neg else res',
      cpp: 'class Solution {\npublic:\n    string convertToBase7(int num) {\n        if (num == 0) return "0";\n        bool neg = num < 0;\n        long long n = abs((long long)num);\n        string s;\n        while (n) { s.push_back(\'0\' + n % 7); n /= 7; }\n        reverse(s.begin(), s.end());\n        return neg ? "-" + s : s;\n    }\n};',
      c: '/* Chia dư base 7 — xem C++ */'
    },
    analysis: {
      correctness: 'Thuật toán chuyển cơ số chuẩn với xử lý dấu và num=0.',
      edgeCases: ['num=0', 'num âm lớn'],
      pitfalls: ['C++ % với số âm', 'Quên reverse chuỗi digit']
    }
  },
  506: {
    category: 'Array',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Cho mảng điểm score. Xếp hạng: hạng 1 "Gold Medal", 2 "Silver Medal", 3 "Bronze Medal", còn lại là số hạng. Trả mảng chuỗi cùng thứ tự score.',
    examples: [
      { input: 'score = [5,4,3,2,1]', output: '["Gold Medal","Silver Medal","Bronze Medal","4","5"]' },
      { input: 'score = [10,3,8,9,4]', output: '["Gold Medal","5","Bronze Medal","Silver Medal","4"]' }
    ],
    approach: 'Sort index theo score giảm dần; gán medal cho 3 hạng đầu, các hạng sau gán số thứ tự.',
    memoryTip: 'Relative ranks = sort (score, index) desc rồi map rank vào vị trí gốc.',
    solutions: {
      python: 'class Solution:\n    def findRelativeRanks(self, score: List[int]) -> List[str]:\n        n = len(score)\n        order = sorted(range(n), key=lambda i: -score[i])\n        ans = [""] * n\n        medals = ["Gold Medal", "Silver Medal", "Bronze Medal"]\n        for rank, i in enumerate(order):\n            ans[i] = medals[rank] if rank < 3 else str(rank + 1)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<string> findRelativeRanks(vector<int>& score) {\n        int n = score.size();\n        vector<int> idx(n);\n        iota(idx.begin(), idx.end(), 0);\n        sort(idx.begin(), idx.end(), [&](int a, int b){ return score[a] > score[b]; });\n        vector<string> ans(n);\n        vector<string> m = {"Gold Medal","Silver Medal","Bronze Medal"};\n        for (int r = 0; r < n; r++)\n            ans[idx[r]] = r < 3 ? m[r] : to_string(r + 1);\n        return ans;\n    }\n};',
      c: '/* Sort index by score — xem C++ */'
    },
    analysis: {
      correctness: 'Xếp hạng theo thứ tự score giảm dần, map ngược về index gốc.',
      edgeCases: ['n=1 chỉ Gold', 'n=2 không có Bronze'],
      pitfalls: ['Gán rank theo index sort thay vì vị trí gốc', 'Nhầm hạng 4-based vs 0-based']
    }
  },
  507: {
    category: 'Math',
    timeComplexity: 'O(sqrt n)',
    spaceComplexity: 'O(1)',
    description: 'Số hoàn hảo là số bằng tổng các ước dương đúng (không tính chính nó). Kiểm tra num có phải perfect number không.',
    examples: [
      { input: 'num = 28', output: 'true' },
      { input: 'num = 7', output: 'false' },
      { input: 'num = 1', output: 'false' }
    ],
    approach: 'Cộng ước từ 1 đến sqrt(num); nếu i chia hết thì cộng i và num/i (trừ trùng sqrt).',
    memoryTip: 'Perfect number: sum divisors = num; luôn cộng 1, duyệt đến sqrt.',
    solutions: {
      python: 'class Solution:\n    def checkPerfectNumber(self, num: int) -> bool:\n        if num <= 1:\n            return False\n        s = 1\n        i = 2\n        while i * i <= num:\n            if num % i == 0:\n                s += i\n                if i * i != num:\n                    s += num // i\n            i += 1\n        return s == num',
      cpp: 'class Solution {\npublic:\n    bool checkPerfectNumber(int num) {\n        if (num <= 1) return false;\n        int sum = 1;\n        for (int i = 2; i * i <= num; i++) {\n            if (num % i == 0) {\n                sum += i;\n                if (i * i != num) sum += num / i;\n            }\n        }\n        return sum == num;\n    }\n};',
      c: '/* Sum divisors sqrt — xem C++ */'
    },
    analysis: {
      correctness: 'Tổng ước đúng (không kể num) so với num xác định perfect number.',
      edgeCases: ['num=1 → false', 'num=6 → true'],
      pitfalls: ['Cộng cả chính num', 'Double-count ước sqrt']
    }
  },
  508: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho cây nhị phân. Tính tổng mỗi subtree; trả mọi giá trị tổng xuất hiện nhiều nhất (bất kỳ thứ tự).',
    examples: [
      { input: 'root = [5,2,-3]', output: '[2,-3,4]' },
      { input: 'root = [5,2,-5]', output: '[2]' }
    ],
    approach: 'Postorder: tổng subtree = val + trái + phải; hash đếm tần suất; thu max và thu thập keys.',
    memoryTip: 'Subtree sum frequency = postorder sum + Counter, giống mode trên mảng tổng.',
    solutions: {
      python: 'class Solution:\n    def findFrequentTreeSum(self, root: Optional[TreeNode]) -> List[int]:\n        from collections import Counter\n        cnt = Counter()\n        def dfs(n):\n            if not n: return 0\n            s = n.val + dfs(n.left) + dfs(n.right)\n            cnt[s] += 1\n            return s\n        dfs(root)\n        if not cnt: return []\n        mx = max(cnt.values())\n        return [k for k, v in cnt.items() if v == mx]',
      cpp: 'class Solution {\n    unordered_map<int,int> cnt;\n    int dfs(TreeNode* n) {\n        if (!n) return 0;\n        int s = n->val + dfs(n->left) + dfs(n->right);\n        cnt[s]++;\n        return s;\n    }\npublic:\n    vector<int> findFrequentTreeSum(TreeNode* root) {\n        dfs(root);\n        int mx = 0;\n        for (auto& p : cnt) mx = max(mx, p.second);\n        vector<int> ans;\n        for (auto& p : cnt) if (p.second == mx) ans.push_back(p.first);\n        return ans;\n    }\n};',
      c: '/* Postorder + hash count — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi subtree sum được đếm đúng một lần qua postorder.',
      edgeCases: ['Một nút → tổng là val', 'Nhiều tổng cùng max freq'],
      pitfalls: ['Quên cộng subtree con', 'Không thu hết keys có max count']
    }
  },
  509: {
    category: 'Math',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Tính số Fibonacci thứ n (F0=0, F1=1, Fn=F(n-1)+F(n-2)). 0 ≤ n ≤ 30.',
    examples: [
      { input: 'n = 2', output: '1' },
      { input: 'n = 3', output: '2' },
      { input: 'n = 4', output: '3' }
    ],
    approach: 'Lặp từ 2 đến n: cập nhật (a,b) = (b, a+b) — O(1) space.',
    memoryTip: 'Fib iterative: rolling two biến, không cần mảng dp khi n ≤ 30.',
    solutions: {
      python: 'class Solution:\n    def fib(self, n: int) -> int:\n        if n <= 1:\n            return n\n        a, b = 0, 1\n        for _ in range(2, n + 1):\n            a, b = b, a + b\n        return b',
      cpp: 'class Solution {\npublic:\n    int fib(int n) {\n        if (n <= 1) return n;\n        int a = 0, b = 1;\n        for (int i = 2; i <= n; i++) {\n            int c = a + b;\n            a = b;\n            b = c;\n        }\n        return b;\n    }\n};',
      c: '/* Rolling fib — xem C++ */'
    },
    analysis: {
      correctness: 'Invariant a=F(i-1), b=F(i) sau mỗi vòng.',
      edgeCases: ['n=0 → 0', 'n=1 → 1'],
      pitfalls: ['Recursion không memo → TLE', 'Off-by-one vòng lặp']
    }
  },
  511: {
    category: 'Database',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Bảng Activity(player_id, device_id, event_date, games_played). Tìm player_id đầu tiên (nhỏ nhất) của mỗi người chơi — ngày đăng nhập/ chơi đầu tiên.',
    examples: [
      { input: 'Activity: (1,2,2016-03-01,5), (1,2,2016-05-02,11)', output: 'player_id=1, first_date=2016-03-01' },
      { input: 'Hai player khác ngày đầu', output: 'Mỗi player một dòng MIN(event_date)' }
    ],
    approach: 'SELECT player_id, MIN(event_date) AS first_login FROM Activity GROUP BY player_id.',
    memoryTip: 'First event per user = GROUP BY id + MIN(date).',
    solutions: {
      python: '# SQL\nSELECT player_id, MIN(event_date) AS first_login\nFROM Activity\nGROUP BY player_id;',
      cpp: '// SQL\nSELECT player_id, MIN(event_date) AS first_login\nFROM Activity\nGROUP BY player_id;',
      c: '/* SQL GROUP BY MIN date */'
    },
    analysis: {
      correctness: 'MIN(event_date) theo player_id cho ngày đầu tiên chính xác.',
      edgeCases: ['Một dòng mỗi player', 'Nhiều device cùng ngày'],
      pitfalls: ['SELECT * thay vì MIN', 'Quên GROUP BY player_id']
    }
  },
  513: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(w)',
    description: 'Cho cây nhị phân. Trả giá trị nút ở góc dưới-trái (deepest level, ưu tiên trái nếu cùng depth).',
    examples: [
      { input: 'root = [2,1,3]', output: '1' },
      { input: 'root = [1,2,3,4,null,5,6,null,null,7]', output: '7' }
    ],
    approach: 'BFS level-order: lưu nút đầu mỗi hàng; sau cùng trả val nút đầu hàng cuối (hoặc DFS ưu tiên trái depth max).',
    memoryTip: 'Bottom-left = BFS lấy phần tử đầu mỗi level, cập nhật đến level cuối.',
    solutions: {
      python: 'class Solution:\n    def findBottomLeftValue(self, root: Optional[TreeNode]) -> int:\n        from collections import deque\n        q = deque([root])\n        left = root.val\n        while q:\n            left = q[0].val\n            for _ in range(len(q)):\n                n = q.popleft()\n                if n.left: q.append(n.left)\n                if n.right: q.append(n.right)\n        return left',
      cpp: 'class Solution {\npublic:\n    int findBottomLeftValue(TreeNode* root) {\n        queue<TreeNode*> q;\n        q.push(root);\n        int left = root->val;\n        while (!q.empty()) {\n            left = q.front()->val;\n            int sz = q.size();\n            while (sz--) {\n                auto* n = q.front(); q.pop();\n                if (n->left) q.push(n->left);\n                if (n->right) q.push(n->right);\n            }\n        }\n        return left;\n    }\n};',
      c: '/* BFS level first node — xem C++ */'
    },
    analysis: {
      correctness: 'BFS duyệt theo level; nút đầu level cuối là bottom-left theo định nghĩa.',
      edgeCases: ['Chỉ root', 'Chỉ nhánh trái'],
      pitfalls: ['DFS không ưu tiên trái cùng depth', 'Lấy nút cuối level thay vì đầu']
    }
  },
  514: {
    category: 'String',
    timeComplexity: 'O(n * m^2)',
    spaceComplexity: 'O(n * m)',
    description: 'Ring chứa key (có thể lặp ký tự). Bắt đầu tại \'A\', di chuyển tối thiểu trên ring để gõ key. Trả tổng bước (di chuyển + bấm phím).',
    examples: [
      { input: 'ring = "godding", key = "gd"', output: '4' },
      { input: 'ring = "godding", key = "godding"', output: '13' }
    ],
    approach: 'DP[i][j]: min cost gõ key[0..i) khi tay ở vị trí j trên ring. Precompute khoảng cách vòng giữa mọi cặp vị trí cùng ký tự.',
    memoryTip: 'Freedom Trail = DP trên (index key, vị trí ring) + dist vòng tròn min(clock, counter).',
    solutions: {
      python: 'class Solution:\n    def findRotateSteps(self, ring: str, key: str) -> int:\n        from collections import defaultdict\n        pos = defaultdict(list)\n        for i, c in enumerate(ring):\n            pos[c].append(i)\n        n, m = len(ring), len(key)\n        INF = 10**9\n        dp = [[INF] * n for _ in range(len(key) + 1)]\n        dp[0][0] = 0\n        for i in range(len(key)):\n            for j in range(n):\n                if dp[i][j] == INF:\n                    continue\n                for k in pos[key[i]]:\n                    step = min(abs(k - j), n - abs(k - j)) + 1\n                    dp[i + 1][k] = min(dp[i + 1][k], dp[i][j] + step)\n        return min(dp[len(key)])\n',
      cpp: 'class Solution {\npublic:\n    int findRotateSteps(string ring, string key) {\n        int n = ring.size();\n        vector<vector<int>> pos(26);\n        for (int i = 0; i < n; i++) pos[ring[i]-\'a\'].push_back(i);\n        int m = key.size();\n        const int INF = 1e9;\n        vector<vector<int>> dp(m+1, vector<int>(n, INF));\n        dp[0][0] = 0;\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) if (dp[i][j] < INF) {\n                for (int k : pos[key[i]-\'a\']) {\n                    int step = min(abs(k-j), n-abs(k-j)) + 1;\n                    dp[i+1][k] = min(dp[i+1][k], dp[i][j] + step);\n                }\n            }\n        }\n        return *min_element(dp[m].begin(), dp[m].end());\n    }\n};',
      c: '/* DP ring + key — xem C++ */'
    },
    analysis: {
      correctness: 'DP thử mọi vị trí ring khớp ký tự key, cộng bước xoay tối thiểu + 1 bấm.',
      edgeCases: ['key một ký tự', 'Nhiều vị trí cùng chữ trên ring'],
      pitfalls: ['Quên +1 bấm phím', 'Dist vòng sai (không min hai chiều)']
    }
  },
  515: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(w)',
    description: 'Cho cây nhị phân. Trả mảng giá trị lớn nhất ở mỗi hàng (level) từ trên xuống.',
    examples: [
      { input: 'root = [1,3,2,5,3,null,9]', output: '[1,3,9]' },
      { input: 'root = [1,2,3]', output: '[1,3]' }
    ],
    approach: 'BFS theo level: duyệt từng hàng, cập nhật max val trong hàng, push vào answer.',
    memoryTip: 'Max each row = BFS level loop + max trong batch size hiện tại.',
    solutions: {
      python: 'class Solution:\n    def largestValues(self, root: Optional[TreeNode]) -> List[int]:\n        if not root: return []\n        from collections import deque\n        q = deque([root])\n        ans = []\n        while q:\n            mx = float("-inf")\n            for _ in range(len(q)):\n                n = q.popleft()\n                mx = max(mx, n.val)\n                if n.left: q.append(n.left)\n                if n.right: q.append(n.right)\n            ans.append(mx)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<int> largestValues(TreeNode* root) {\n        if (!root) return {};\n        queue<TreeNode*> q;\n        q.push(root);\n        vector<int> ans;\n        while (!q.empty()) {\n            int sz = q.size(), mx = INT_MIN;\n            while (sz--) {\n                auto* n = q.front(); q.pop();\n                mx = max(mx, n->val);\n                if (n->left) q.push(n->left);\n                if (n->right) q.push(n->right);\n            }\n            ans.push_back(mx);\n        }\n        return ans;\n    }\n};',
      c: '/* BFS max per level — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi level được quét hết trước khi sang level kế; max đúng cho hàng.',
      edgeCases: ['Một nút → [val]', 'Giá trị âm'],
      pitfalls: ['Không tách batch theo size q', 'DFS depth không đảm bảo cùng row']
    }
  },
  516: {
    category: 'String',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n^2)',
    description: 'Cho chuỗi s. Trả độ dài subsequence palindrome dài nhất (không cần liên tiếp).',
    examples: [
      { input: 's = "bbbab"', output: '4' },
      { input: 's = "cbbd"', output: '2' }
    ],
    approach: 'DP[i][j]: LPS trong s[i..j]. Nếu s[i]==s[j]: 2+dp[i+1][j-1]; else max(dp[i+1][j], dp[i][j-1]).',
    memoryTip: 'LPS interval DP: khớp hai đầu +2, không khớp max bỏ một đầu.',
    solutions: {
      python: 'class Solution:\n    def longestPalindromeSubseq(self, s: str) -> int:\n        n = len(s)\n        dp = [[0]*n for _ in range(n)]\n        for i in range(n-1, -1, -1):\n            dp[i][i] = 1\n            for j in range(i+1, n):\n                if s[i] == s[j]:\n                    dp[i][j] = 2 + dp[i+1][j-1]\n                else:\n                    dp[i][j] = max(dp[i+1][j], dp[i][j-1])\n        return dp[0][n-1]',
      cpp: 'class Solution {\npublic:\n    int longestPalindromeSubseq(string s) {\n        int n = s.size();\n        vector<vector<int>> dp(n, vector<int>(n));\n        for (int i = n-1; i >= 0; i--) {\n            dp[i][i] = 1;\n            for (int j = i+1; j < n; j++) {\n                if (s[i] == s[j]) dp[i][j] = 2 + dp[i+1][j-1];\n                else dp[i][j] = max(dp[i+1][j], dp[i][j-1]);\n            }\n        }\n        return dp[0][n-1];\n    }\n};',
      c: '/* Interval DP LPS — xem C++ */'
    },
    analysis: {
      correctness: 'DP interval đầy đủ cho mọi đoạn con; base dp[i][i]=1.',
      edgeCases: ['Một ký tự → 1', 'Toàn giống nhau → n'],
      pitfalls: ['Nhầm với longest palindrome substring', 'Thứ tự vòng i,j sai']
    }
  },
  517: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'n máy giặt, mỗi máy có lượng quần áo. Có thể chuyển quần giữa máy kề. Tìm số lần chuyển tối thiểu để mọi máy bằng nhau; không thể thì -1.',
    examples: [
      { input: 'machines = [1,0,5]', output: '3' },
      { input: 'machines = [0,3,0]', output: '-1' }
    ],
    approach: 'Tổng phải chia hết n. Target t = sum/n. Prefix balance: mỗi bước cần |prefix| tối đa để cân; answer = max over positions.',
    memoryTip: 'Washing machines: sum%n≠0 → -1; else max |prefix excess| và |simultaneous load|.',
    solutions: {
      python: 'class Solution:\n    def findMinMoves(self, machines: List[int]) -> int:\n        total = sum(machines)\n        n = len(machines)\n        if total % n:\n            return -1\n        target = total // n\n        ans = bal = 0\n        for m in machines:\n            diff = m - target\n            bal += diff\n            ans = max(ans, abs(bal), abs(diff))\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findMinMoves(vector<int>& machines) {\n        long long sum = 0;\n        for (int x : machines) sum += x;\n        int n = machines.size();\n        if (sum % n) return -1;\n        int target = sum / n;\n        long long bal = 0;\n        int ans = 0;\n        for (int m : machines) {\n            int diff = m - target;\n            bal += diff;\n            ans = max({ans, (int)abs(bal), abs(diff)});\n        }\n        return ans;\n    }\n};',
      c: '/* Prefix balance max — xem C++ */'
    },
    analysis: {
      correctness: 'Cân bằng prefix và diff tại từng máy giới hạn số lần chuyển đồng thời cần thiết.',
      edgeCases: ['sum không chia n → -1', 'Một máy'],
      pitfalls: ['Chỉ xét prefix không xét |diff|', 'Quên kiểm tra sum % n']
    }
  },
  518: {
    category: 'Array',
    timeComplexity: 'O(n * amount)',
    spaceComplexity: 'O(amount)',
    description: 'Cho coins và amount. Đếm số cách tổ hợp (thứ tự coin không quan trọng) sao tổng bằng amount.',
    examples: [
      { input: 'amount=5, coins=[1,2,5]', output: '4' },
      { input: 'amount=3, coins=[2]', output: '0' },
      { input: 'amount=10, coins=[10]', output: '1' }
    ],
    approach: 'Unbounded knapsack đếm cách: dp[0]=1; duyệt coin ngoài, cộng dp[j-coin] vào dp[j].',
    memoryTip: 'Coin change II = DP amount, coin loop outside tránh đếm hoán vị.',
    solutions: {
      python: 'class Solution:\n    def change(self, amount: int, coins: List[int]) -> int:\n        dp = [0] * (amount + 1)\n        dp[0] = 1\n        for c in coins:\n            for j in range(c, amount + 1):\n                dp[j] += dp[j - c]\n        return dp[amount]',
      cpp: 'class Solution {\npublic:\n    int change(int amount, vector<int>& coins) {\n        vector<int> dp(amount + 1);\n        dp[0] = 1;\n        for (int c : coins)\n            for (int j = c; j <= amount; j++)\n                dp[j] += dp[j - c];\n        return dp[amount];\n    }\n};',
      c: '/* Unbounded knapsack count — xem C++ */'
    },
    analysis: {
      correctness: 'dp[j] = tổng cách dùng coin đã xét; coin ngoài vòng tránh trùng hoán vị.',
      edgeCases: ['amount=0 → 1 cách rỗng', 'Không coin khớp → 0'],
      pitfalls: ['Đảo vòng coin/amount → đếm permutation', 'Overflow int với amount lớn']
    }
  },
  519: {
    category: 'Hash Table',
    timeComplexity: 'O(1) amortized per flip',
    spaceComplexity: 'O(k)',
    description: 'Ma trận m×n, flip ngẫu nhiên một ô chưa flip (uniform). reset() đưa về chưa flip. Implement class với flip() và reset().',
    examples: [
      { input: 'RandomFlipMatrix(1,2); flip(); flip(); reset()', output: 'Hai ô khác nhau rồi reset' },
      { input: 'm=2,n=2 nhiều flip', output: 'Mỗi ô chưa flip có xác suất bằng nhau' }
    ],
    approach: 'Map index đã flip sang slot mới; pool = m*n - flipped. Chọn r ngẫu nhiên, hoán đổi với phần tử cuối pool (Fisher-Yates ảo).',
    memoryTip: 'Random flip = reservoir trên chỉ số chưa dùng + hash remap khi reset lazy.',
    solutions: {
      python: 'class Solution:\n    def __init__(self, m: int, n: int):\n        self.m, self.n = m, n\n        self.total = m * n\n        self.avail = self.total\n        self.idx_map = {}\n        self.reset()\n    def flip(self) -> List[int]:\n        import random\n        r = random.randint(0, self.avail - 1)\n        idx = self.idx_map.get(r, r)\n        self.idx_map[r] = self.idx_map.get(self.avail - 1, self.avail - 1)\n        self.avail -= 1\n        return [idx // self.n, idx % self.n]\n    def reset(self) -> None:\n        self.avail = self.total\n        self.idx_map.clear()',
      cpp: 'class Solution {\n    int m, n, total, avail;\n    unordered_map<int,int> mp;\npublic:\n    Solution(int m, int n): m(m), n(n), total(m*n), avail(total) {}\n    vector<int> flip() {\n        int r = rand() % avail;\n        int idx = mp.count(r) ? mp[r] : r;\n        mp[r] = mp.count(avail-1) ? mp[avail-1] : avail-1;\n        avail--;\n        return {idx / n, idx % n};\n    }\n    void reset() { avail = total; mp.clear(); }\n};',
      c: '/* Random flip hash map — xem C++ */'
    },
    analysis: {
      correctness: 'Hoán đổi ảo đảm bảo mọi ô chưa chọn có xác suất đều mỗi flip.',
      edgeCases: ['1x1 chỉ một ô', 'Reset khôi phục pool đầy'],
      pitfalls: ['Lưu bitmask O(mn) memory', 'Không remap khi chọn r']
    }
  },
  520: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Kiểm tra chuỗi word có đúng một trong ba dạng: toàn chữ thường, toàn HOA, hoặc chỉ chữ cái đầu HOA còn lại thường.',
    examples: [
      { input: 'word = "USA"', output: 'true' },
      { input: 'word = "FlaG"', output: 'false' },
      { input: 'word = "google"', output: 'true' }
    ],
    approach: 'Đếm số chữ HOA. OK nếu caps==0, caps==len, hoặc caps==1 và word[0] upper.',
    memoryTip: 'Detect capital: count upper ∈ {0, 1, n} với n==1 phải là index 0.',
    solutions: {
      python: 'class Solution:\n    def detectCapitalUse(self, word: str) -> bool:\n        caps = sum(1 for c in word if c.isupper())\n        return caps == 0 or caps == len(word) or (caps == 1 and word[0].isupper())',
      cpp: 'class Solution {\npublic:\n    bool detectCapitalUse(string word) {\n        int caps = 0;\n        for (char c : word) if (isupper(c)) caps++;\n        return caps == 0 || caps == (int)word.size() || (caps == 1 && isupper(word[0]));\n    }\n};',
      c: '/* Count uppercase — xem C++ */'
    },
    analysis: {
      correctness: 'Ba pattern capital hóa được cover bởi điều kiện đếm HOA.',
      edgeCases: ['Một ký tự', 'Số không có trong word'],
      pitfalls: ['Chỉ check first upper + rest lower bỏ sót ALL CAPS', 'isupper trên non-alpha']
    }
  },
  521: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho hai chuỗi a và b. Trả độ dài subsequence không chung dài nhất giữa hai chuỗi; nếu a==b trả -1.',
    examples: [
      { input: 'a = "aba", b = "cdc"', output: '3' },
      { input: 'a = "aaa", b = "bbb"', output: '3' },
      { input: 'a = "aaa", b = "aaa"', output: '-1' }
    ],
    approach: 'Nếu a!=b: luôn tồn tại uncommon (cả chuỗi nếu không subsequence kia); trả max(len(a), len(b)). Nếu a==b: -1.',
    memoryTip: 'LUS I: khác nhau → max length; giống nhau → không có uncommon (-1).',
    solutions: {
      python: 'class Solution:\n    def findLUSlength(self, a: str, b: str) -> int:\n        return -1 if a == b else max(len(a), len(b))',
      cpp: 'class Solution {\npublic:\n    int findLUSlength(string a, string b) {\n        if (a == b) return -1;\n        return max((int)a.size(), (int)b.size());\n    }\n};',
      c: '/* Compare equality max len — xem C++ */'
    },
    analysis: {
      correctness: 'Hai chuỗi khác nhau: ít nhất một chuỗi không phải subsequence của kia nên LUS ≥ max len.',
      edgeCases: ['a==b → -1', 'Độ dài 1 khác nhau → 1'],
      pitfalls: ['Overthink subsequence khi chỉ cần so sánh equality', 'Quên trả -1 khi a và b giống hệt']
    }
  },
  522: {
    category: 'String',
    timeComplexity: 'O(n^2 * L)',
    spaceComplexity: 'O(n)',
    description: 'Cho mảng strs. Trả độ dài subsequence không chung dài nhất xuất hiện trong đúng một chuỗi (không phải subsequence của chuỗi khác).',
    examples: [
      { input: 'strs = ["aba","cdc","eae"]', output: '3' },
      { input: 'strs = ["aaa","aaa","aa"]', output: '-1' }
    ],
    approach: 'Sort strs theo length giảm dần. Với mỗi s, kiểm tra có phải subsequence của chuỗi khác không; nếu không → trả len(s).',
    memoryTip: 'LUS II: sort by len desc, first string not subseq of any other wins.',
    solutions: {
      python: 'class Solution:\n    def findLUSlength(self, strs: List[str]) -> int:\n        def subseq(a, b):\n            i = 0\n            for c in b:\n                if i < len(a) and a[i] == c:\n                    i += 1\n            return i == len(a)\n        strs.sort(key=len, reverse=True)\n        for i, s in enumerate(strs):\n            if all(i == j or not subseq(s, strs[j]) for j in range(len(strs))):\n                return len(s)\n        return -1',
      cpp: 'class Solution {\n    bool isSub(const string& a, const string& b) {\n        int i = 0;\n        for (char c : b) if (i < (int)a.size() && a[i] == c) i++;\n        return i == (int)a.size();\n    }\npublic:\n    int findLUSlength(vector<string>& strs) {\n        sort(strs.begin(), strs.end(), [](auto& x, auto& y){ return x.size() > y.size(); });\n        for (int i = 0; i < (int)strs.size(); i++) {\n            bool ok = true;\n            for (int j = 0; j < (int)strs.size(); j++)\n                if (i != j && isSub(strs[i], strs[j])) { ok = false; break; }\n            if (ok) return strs[i].size();\n        }\n        return -1;\n    }\n};',
      c: '/* Sort + subsequence check — xem C++ */'
    },
    analysis: {
      correctness: 'Chuỗi dài nhất không phải subseq của ai là LUS tối ưu; sort đảm bảo thử dài trước.',
      edgeCases: ['Mọi chuỗi giống nhau → -1', 'Một chuỗi unique dài nhất'],
      pitfalls: ['Không sort → bỏ sót đáp án dài hơn', 'Subsequence check sai chiều a,b']
    }
  },
  523: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Kiểm tra tồn tại subarray dài ≥ 2 có tổng chia hết cho k (có thể có số âm).',
    examples: [
      { input: 'nums = [23,2,4,6,7], k = 6', output: 'true' },
      { input: 'nums = [23,2,6,4,7], k = 6', output: 'true' },
      { input: 'nums = [1,2,12], k = 6', output: 'false' }
    ],
    approach: 'Prefix mod k: nếu cùng remainder cách nhau ≥ 2 index → có subarray sum % k == 0.',
    memoryTip: 'Continuous subarray sum k: hash map remainder → earliest index; gap ≥ 2.',
    solutions: {
      python: 'class Solution:\n    def checkSubarraySum(self, nums: List[int], k: int) -> bool:\n        rem_idx = {0: -1}\n        s = 0\n        for i, x in enumerate(nums):\n            s += x\n            r = s % k if k else s\n            if r in rem_idx:\n                if i - rem_idx[r] >= 2:\n                    return True\n            else:\n                rem_idx[r] = i\n        return False',
      cpp: 'class Solution {\npublic:\n    bool checkSubarraySum(vector<int>& nums, int k) {\n        unordered_map<int,int> remIdx{{0,-1}};\n        long long s = 0;\n        for (int i = 0; i < (int)nums.size(); i++) {\n            s += nums[i];\n            int r = k ? s % k : (int)s;\n            if (remIdx.count(r)) {\n                if (i - remIdx[r] >= 2) return true;\n            } else remIdx[r] = i;\n        }\n        return false;\n    }\n};',
      c: '/* Prefix mod hash — xem C++ */'
    },
    analysis: {
      correctness: 'Hai prefix cùng mod k → hiệu chia hết k; khoảng index ≥ 2 đảm bảo length ≥ 2.',
      edgeCases: ['k=0: remainder là tổng trực tiếp', 'Subarray [0,0] length 2'],
      pitfalls: ['Cập nhật rem_idx mỗi lần gặp (mất index sớm)', 'Quên seed {0:-1}']
    }
  },
  524: {
    category: 'String',
    timeComplexity: 'O(n * L^2)',
    spaceComplexity: 'O(1)',
    description: 'Cho s và mảng dictionary. Trả từ dài nhất trong dictionary là subsequence của s (xóa ký tự không cần); nếu nhiều từ cùng dài nhất chọn lex nhỏ nhất.',
    examples: [
      { input: 's = "abpcplea", dictionary = ["ale","apple","monkey","plea"]', output: '"apple"' },
      { input: 's = "abpcplea", dictionary = ["a","b","c"]', output: '"a"' }
    ],
    approach: 'Sort dictionary: length desc, lex asc. Trả từ đầu tiên là subsequence của s.',
    memoryTip: 'Longest word deleting: sort (len desc, word asc) + two-pointer subseq check.',
    solutions: {
      python: 'class Solution:\n    def findLongestWord(self, s: str, dictionary: List[str]) -> str:\n        def subseq(w):\n            i = 0\n            for c in s:\n                if i < len(w) and w[i] == c:\n                    i += 1\n            return i == len(w)\n        for w in sorted(dictionary, key=lambda x: (-len(x), x)):\n            if subseq(w):\n                return w\n        return ""',
      cpp: 'class Solution {\n    bool subseq(const string& w, const string& s) {\n        int i = 0;\n        for (char c : s) if (i < (int)w.size() && w[i] == c) i++;\n        return i == (int)w.size();\n    }\npublic:\n    string findLongestWord(string s, vector<string>& d) {\n        sort(d.begin(), d.end(), [](auto& a, auto& b){\n            if (a.size() != b.size()) return a.size() > b.size();\n            return a < b;\n        });\n        for (auto& w : d) if (subseq(w, s)) return w;\n        return "";\n    }\n};',
      c: '/* Sort dict + subseq — xem C++ */'
    },
    analysis: {
      correctness: 'Thứ tự sort đảm bảo từ dài nhất lex nhỏ nhất được thử trước.',
      edgeCases: ['Không từ nào match → ""', 'Nhiều cùng length'],
      pitfalls: ['Sort chỉ theo length bỏ tie-break lex', 'Subsequence direction sai']
    }
  },
  525: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Mảng chỉ gồm 0 và 1. Tìm độ dài subarray liên tiếp dài nhất có số 0 và 1 bằng nhau.',
    examples: [
      { input: 'nums = [0,1]', output: '2' },
      { input: 'nums = [0,1,0]', output: '2' },
      { input: 'nums = [0,0,0,1,1,0,0]', output: '6' }
    ],
    approach: 'Biến 0→-1, 1→+1. Prefix sum: hai index cùng sum → subarray cân bằng; max độ dài.',
    memoryTip: 'Contiguous array = prefix sum 0/1 as +/-1, hash first index each sum.',
    solutions: {
      python: 'class Solution:\n    def findMaxLength(self, nums: List[int]) -> int:\n        first = {0: -1}\n        s = ans = 0\n        for i, x in enumerate(nums):\n            s += 1 if x else -1\n            if s in first:\n                ans = max(ans, i - first[s])\n            else:\n                first[s] = i\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findMaxLength(vector<int>& nums) {\n        unordered_map<int,int> first{{0,-1}};\n        int s = 0, ans = 0;\n        for (int i = 0; i < (int)nums.size(); i++) {\n            s += nums[i] ? 1 : -1;\n            if (first.count(s)) ans = max(ans, i - first[s]);\n            else first[s] = i;\n        }\n        return ans;\n    }\n};',
      c: '/* Prefix sum balance — xem C++ */'
    },
    analysis: {
      correctness: 'Cùng prefix sum nghĩa là số 0 và 1 bằng nhau trên đoạn.',
      edgeCases: ['Toàn 0 hoặc toàn 1 → 0', 'Seed sum 0 at -1'],
      pitfalls: ['Dùng count 0/1 riêng thay prefix', 'Ghi đè first index sớm']
    }
  },
  526: {
    category: 'Array',
    timeComplexity: 'O(n!)',
    spaceComplexity: 'O(n)',
    description: 'Hoán vị 1..n sao ở vị trí i (1-indexed), i chia hết cho nums[i] hoặc nums[i] chia hết cho i. Đếm số hoán vị "beautiful".',
    examples: [
      { input: 'n = 2', output: '2' },
      { input: 'n = 1', output: '1' }
    ],
    approach: 'Backtracking: thử gán số chưa dùng vào pos i nếu thỏa điều kiện chia hết.',
    memoryTip: 'Beautiful arrangement = backtrack permutations with divisibility prune at each pos.',
    solutions: {
      python: 'class Solution:\n    def countArrangement(self, n: int) -> int:\n        used = [False] * (n + 1)\n        def dfs(i):\n            if i > n:\n                return 1\n            ans = 0\n            for v in range(1, n + 1):\n                if not used[v] and (i % v == 0 or v % i == 0):\n                    used[v] = True\n                    ans += dfs(i + 1)\n                    used[v] = False\n            return ans\n        return dfs(1)',
      cpp: 'class Solution {\n    int n;\n    vector<bool> used;\n    int dfs(int i) {\n        if (i > n) return 1;\n        int ans = 0;\n        for (int v = 1; v <= n; v++) {\n            if (!used[v] && (i % v == 0 || v % i == 0)) {\n                used[v] = true;\n                ans += dfs(i + 1);\n                used[v] = false;\n            }\n        }\n        return ans;\n    }\npublic:\n    int countArrangement(int n) {\n        this->n = n;\n        used.assign(n + 1, false);\n        return dfs(1);\n    }\n};',
      c: '/* Backtracking divisibility — xem C++ */'
    },
    analysis: {
      correctness: 'DFS duyệt mọi hoán vị hợp lệ với prune điều kiện tại từng vị trí.',
      edgeCases: ['n=1 → 1', 'n lớn prune mạnh'],
      pitfalls: ['1-indexed vs 0-indexed nhầm', 'Không backtrack used[]']
    }
  },
  528: {
    category: 'Array',
    timeComplexity: 'O(log n) per pick',
    spaceComplexity: 'O(n)',
    description: 'Implement pickIndex() trả index i với xác suất w[i]/sum(w). Gọi nhiều lần.',
    examples: [
      { input: 'w=[1], pickIndex() nhiều lần', output: 'Luôn 0' },
      { input: 'w=[1,3], pickIndex()', output: 'Index 1 ~75%, index 0 ~25%' }
    ],
    approach: 'Prefix sum của w; random target in [0,total); binary search index đầu tiên prefix ≥ target.',
    memoryTip: 'Weighted pick = prefix sums + binary search trên cumulative weights.',
    solutions: {
      python: 'class Solution:\n    def __init__(self, w: List[int]):\n        self.prefix = []\n        s = 0\n        for x in w:\n            s += x\n            self.prefix.append(s)\n        self.total = s\n    def pickIndex(self) -> int:\n        import random, bisect\n        r = random.random() * self.total\n        return bisect.bisect_left(self.prefix, r)',
      cpp: 'class Solution {\n    vector<int> pre;\n    int total;\npublic:\n    Solution(vector<int>& w) {\n        for (int x : w) { total += x; pre.push_back(total); }\n    }\n    int pickIndex() {\n        int r = rand() % total;\n        return lower_bound(pre.begin(), pre.end(), r + 1) - pre.begin();\n    }\n};',
      c: '/* Prefix + binary search — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi index chiếm đoạn trên [0,total) dài w[i] → đúng phân phối.',
      edgeCases: ['Một phần tử', 'Weight lớn lệch xác suất'],
      pitfalls: ['Binary search trên r thay vì r+1', 'Không dùng prefix cumulative']
    }
  },
  529: {
    category: 'Array',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
    description: 'Bảng Minesweeper: \'M\' mìn, \'E\' ô trống chưa mở. Click (click,r,c): mở ô; nếu ô trống thì mở lan các ô kề không mìn và ghi số mìn kề.',
    examples: [
      { input: 'board=[["E","E","E"],["E","E","M"],["E","E","E"]], click=[0,0]', output: 'Lan mở với số mìn kề' },
      { input: 'click vào M', output: 'Giữ M' }
    ],
    approach: 'DFS/BFS từ click: nếu M return; đếm mìn kề 8 hướng; nếu 0 thì tiếp tục DFS ô kề \'E\'.',
    memoryTip: 'Minesweeper DFS: count neighbors, nếu 0 thì flood fill 8 directions.',
    solutions: {
      python: 'class Solution:\n    def updateBoard(self, board: List[List[str]], click: List[int]) -> List[List[str]]:\n        m, n = len(board), len(board[0])\n        r, c = click\n        if board[r][c] == "M":\n            board[r][c] = "X"\n            return board\n        dirs = [(1,0),(-1,0),(0,1),(0,-1),(1,1),(1,-1),(-1,1),(-1,-1)]\n        def count(r,c):\n            cnt = 0\n            for dr,dc in dirs:\n                nr, nc = r+dr, c+dc\n                if 0<=nr<m and 0<=nc<n and board[nr][nc] in "MX":\n                    cnt += 1\n            return cnt\n        def dfs(r,c):\n            if board[r][c] != "E": return\n            mines = count(r,c)\n            board[r][c] = str(mines) if mines else "B"\n            if mines == 0:\n                for dr,dc in dirs:\n                    dfs(r+dr, c+dc)\n        dfs(r,c)\n        return board',
      cpp: 'class Solution {\n    int m, n;\n    int dirs[8][2] = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};\n    int count(vector<vector<char>>& b, int r, int c) {\n        int cnt = 0;\n        for (auto& d : dirs) {\n            int nr = r+d[0], nc = c+d[1];\n            if (nr>=0&&nr<m&&nc>=0&&nc<n && (b[nr][nc]==\'M\'||b[nr][nc]==\'X\')) cnt++;\n        }\n        return cnt;\n    }\n    void dfs(vector<vector<char>>& b, int r, int c) {\n        if (b[r][c] != \'E\') return;\n        int mines = count(b,r,c);\n        b[r][c] = mines ? (\'0\'+mines) : \'B\';\n        if (!mines) for (auto& d : dirs) dfs(b, r+d[0], c+d[1]);\n    }\npublic:\n    vector<vector<char>> updateBoard(vector<vector<char>>& board, vector<int>& click) {\n        m = board.size(); n = board[0].size();\n        if (board[click[0]][click[1]] == \'M\') { board[click[0]][click[1]] = \'X\'; return board; }\n        dfs(board, click[0], click[1]);\n        return board;\n    }\n};',
      c: '/* DFS flood fill mines — xem C++ */'
    },
    analysis: {
      correctness: 'DFS chỉ lan khi ô trống 0 mìn kề; số mìn đếm đủ 8 hướng.',
      edgeCases: ['Click mìn → X', 'Board 1x1'],
      pitfalls: ['Lan khi mines>0', 'Không đánh dấu visited → vòng lặp']
    }
  },
  530: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description: 'Cho BST. Trả minimum absolute difference giữa hai giá trị bất kỳ trong cây.',
    examples: [
      { input: 'root = [4,2,6,1,3]', output: '1' },
      { input: 'root = [1,0,48,null,null,12,49]', output: '1' }
    ],
    approach: 'Inorder BST → dãy tăng dần; min diff = min(nums[i]-nums[i-1]).',
    memoryTip: 'Min abs diff BST = inorder adjacent pairs only.',
    solutions: {
      python: 'class Solution:\n    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:\n        self.prev = None\n        self.ans = 10**18\n        def dfs(n):\n            if not n: return\n            dfs(n.left)\n            if self.prev is not None:\n                self.ans = min(self.ans, n.val - self.prev)\n            self.prev = n.val\n            dfs(n.right)\n        dfs(root)\n        return self.ans',
      cpp: 'class Solution {\n    TreeNode* prev = nullptr;\n    int ans = INT_MAX;\n    void inorder(TreeNode* n) {\n        if (!n) return;\n        inorder(n->left);\n        if (prev) ans = min(ans, n->val - prev->val);\n        prev = n;\n        inorder(n->right);\n    }\npublic:\n    int getMinimumDifference(TreeNode* root) {\n        inorder(root);\n        return ans;\n    }\n};',
      c: '/* Inorder min adjacent — xem C++ */'
    },
    analysis: {
      correctness: 'Trong BST sorted inorder, min diff luôn giữa hai phần tử kề nhau.',
      edgeCases: ['Hai nút', 'Giá trị cách xa nhưng diff nhỏ ở kề'],
      pitfalls: ['So sánh mọi cặp O(n^2)', 'Quên init prev']
    }
  }
};
