/** Content bodies for LC #532-560 */
module.exports = {
  532: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho mảng nums và số k. Đếm số cặp (i,j) với i<j sao nums[i]-nums[j]=k hoặc nums[j]-nums[i]=k. Mỗi cặp giá trị chỉ đếm một lần.',
    examples: [
      { input: 'nums = [3,1,4,1,5], k = 2', output: '2' },
      { input: 'nums = [1,2,3,4,5], k = 1', output: '4' },
      { input: 'nums = [1,3,1,5,4], k = 0', output: '1' }
    ],
    approach: 'HashMap đếm tần suất. Với mỗi x, cộng count[x+k] + (k==0 ? count[x]-1 : count[x-k]?) — chuẩn: duyệt x, cộng seen[x-k], rồi tăng seen[x].',
    memoryTip: 'K-diff pairs: duyệt nums, ans += freq[x-k], rồi freq[x]++ (k=0 xử lý trùng).',
    solutions: {
      python: 'class Solution:\n    def findPairs(self, nums: List[int], k: int) -> int:\n        from collections import Counter\n        cnt = Counter()\n        ans = 0\n        for x in nums:\n            if k == 0:\n                if cnt[x]:\n                    ans += 1\n            elif cnt[x - k]:\n                ans += 1\n            cnt[x] += 1\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findPairs(vector<int>& nums, int k) {\n        unordered_map<int,int> cnt;\n        int ans = 0;\n        for (int x : nums) {\n            if (k == 0) { if (cnt[x]) ans++; }\n            else if (cnt.count(x - k)) ans++;\n            cnt[x]++;\n        }\n        return ans;\n    }\n};',
      c: '/* Hash freq x-k — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi cặp được đếm khi gặp phần tử thứ hai; freq tránh double count.',
      edgeCases: ['k=0 đếm cặp trùng giá trị', 'Không cặp → 0'],
      pitfalls: ['Đếm cả (i,j) và (j,i)', 'Dùng set bỏ sót duplicate values']
    }
  },
  535: {
    category: 'Design',
    timeComplexity: 'O(1) encode/decode',
    spaceComplexity: 'O(n)',
    description: 'Thiết kế hệ thống rút gọn URL: encode(longUrl) trả shortUrl ngẫu nhiên; decode(shortUrl) trả longUrl gốc.',
    examples: [
      { input: 'encode("https://example.com/long/path")', output: 'short key vd. "http://tinyurl.com/0"' },
      { input: 'decode short key', output: 'longUrl ban đầu' }
    ],
    approach: 'Map bidirectional: long→short và short→long. Sinh key ngẫu nhiên hoặc tăng dần counter cho path.',
    memoryTip: 'TinyURL = 2 hash maps + random/base62 key; decode tra short→long.',
    solutions: {
      python: 'class Codec:\n    def __init__(self):\n        self.l2s = {}\n        self.s2l = {}\n        self.base = "http://tinyurl.com/"\n    def encode(self, longUrl: str) -> str:\n        if longUrl in self.l2s:\n            return self.l2s[longUrl]\n        key = str(len(self.l2s))\n        short = self.base + key\n        self.l2s[longUrl] = short\n        self.s2l[short] = longUrl\n        return short\n    def decode(self, shortUrl: str) -> str:\n        return self.s2l[shortUrl]',
      cpp: 'class Codec {\n    unordered_map<string,string> l2s, s2l;\n    string base = "http://tinyurl.com/";\npublic:\n    string encode(string longUrl) {\n        if (l2s.count(longUrl)) return l2s[longUrl];\n        string key = to_string(l2s.size());\n        string shortUrl = base + key;\n        l2s[longUrl] = shortUrl;\n        s2l[shortUrl] = longUrl;\n        return shortUrl;\n    }\n    string decode(string shortUrl) { return s2l[shortUrl]; }\n};',
      c: '/* Bidirectional hash map — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi longUrl map 1-1 shortUrl; decode tra ngược chính xác.',
      edgeCases: ['Encode cùng URL hai lần → cùng short', 'URL dài bất kỳ'],
      pitfalls: ['Chỉ map một chiều', 'Key collision không xử lý']
    }
  },
  537: {
    category: 'Math',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Cho hai số phức dạng chuỗi "a+bi". Trả tích dạng "c+di" (a,b,c,d nguyên).',
    examples: [
      { input: 'num1 = "1+1i", num2 = "1+1i"', output: '"0+2i"' },
      { input: 'num1 = "1+-1i", num2 = "1+-1i"', output: '"0+-2i"' }
    ],
    approach: 'Parse a,b từ num1 và c,d từ num2. (a+bi)(c+di) = (ac-bd) + (ad+bc)i.',
    memoryTip: 'Complex multiply: parse real/imag, công thức ac-bd và ad+bc.',
    solutions: {
      python: 'class Solution:\n    def complexNumberMultiply(self, num1: str, num2: str) -> str:\n        def parse(s):\n            i = s.index(\'+\')\n            a = int(s[:i])\n            b = int(s[i+1:-1])\n            return a, b\n        a, b = parse(num1)\n        c, d = parse(num2)\n        return f"{a*c-b*d}+{a*d+b*c}i"',
      cpp: 'class Solution {\n    pair<int,int> parse(const string& s) {\n        int p = s.find(\'+\');\n        int a = stoi(s.substr(0, p));\n        int b = stoi(s.substr(p+1, s.size()-p-2));\n        return {a,b};\n    }\npublic:\n    string complexNumberMultiply(string num1, string num2) {\n        auto [a,b] = parse(num1);\n        auto [c,d] = parse(num2);\n        return to_string(a*c-b*d) + "+" + to_string(a*d+b*c) + "i";\n    }\n};',
      c: '/* Parse + multiply formula — xem C++ */'
    },
    analysis: {
      correctness: 'Công thức nhân số phức chuẩn trên phần thực/ảo đã parse.',
      edgeCases: ['Số âm trong chuỗi', 'Phần ảo 0'],
      pitfalls: ['Parse sai vị trí +', 'Quên dấu âm ở imag']
    }
  },
  538: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description: 'Biến BST thành Greater Tree: mỗi node.val = tổng tất cả giá trị lớn hơn hoặc bằng node cũ (bao gồm chính nó).',
    examples: [
      { input: 'root = [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]', output: '[30,36,21,36,35,26,16,null,null,null,33,null,null,null,8]' },
      { input: 'root = [0,null,1]', output: '[1, null, 1]' }
    ],
    approach: 'Reverse inorder (phải → gốc → trái): cộng dồn sum, gán node.val = sum.',
    memoryTip: 'Convert BST greater = reverse inorder accumulate sum right-first.',
    solutions: {
      python: 'class Solution:\n    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        self.s = 0\n        def dfs(n):\n            if not n: return\n            dfs(n.right)\n            self.s += n.val\n            n.val = self.s\n            dfs(n.left)\n        dfs(root)\n        return root',
      cpp: 'class Solution {\n    int sum = 0;\n    void revInorder(TreeNode* n) {\n        if (!n) return;\n        revInorder(n->right);\n        sum += n->val;\n        n->val = sum;\n        revInorder(n->left);\n    }\npublic:\n    TreeNode* convertBST(TreeNode* root) {\n        revInorder(root);\n        return root;\n    }\n};',
      c: '/* Reverse inorder sum — xem C++ */'
    },
    analysis: {
      correctness: 'Duyệt giảm dần inorder đảm bảo cộng đủ mọi giá trị lớn hơn trước khi gán.',
      edgeCases: ['Một nút', 'Chỉ nhánh phải'],
      pitfalls: ['Inorder thường (trái trước) sai thứ tự', 'Không cộng dồn global']
    }
  },
  539: {
    category: 'Array',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Cho mảng time dạng "HH:MM" (24h). Trả chênh lệch thời gian nhỏ nhất (phút) giữa hai mốc bất kỳ (có thể qua nửa đêm).',
    examples: [
      { input: 'time = ["23:59","00:00"]', output: '1' },
      { input: 'time = ["00:00","04:00","22:00"]', output: '120' }
    ],
    approach: 'Chuyển mỗi time sang phút 0..1439; sort; min diff giữa kề + wrap (1440 - last + first).',
    memoryTip: 'Min time diff: parse to minutes, sort, check adjacent + circular midnight.',
    solutions: {
      python: 'class Solution:\n    def findMinDifference(self, timeList: List[str]) -> int:\n        mins = []\n        for t in timeList:\n            h, m = map(int, t.split(":"))\n            mins.append(h * 60 + m)\n        mins.sort()\n        ans = 24 * 60\n        for i in range(1, len(mins)):\n            ans = min(ans, mins[i] - mins[i-1])\n        ans = min(ans, 24*60 - mins[-1] + mins[0])\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findMinDifference(vector<string>& timeList) {\n        vector<int> m;\n        for (auto& t : timeList) {\n            int h = stoi(t.substr(0,2)), mi = stoi(t.substr(3,2));\n            m.push_back(h*60+mi);\n        }\n        sort(m.begin(), m.end());\n        int ans = 1440;\n        for (int i = 1; i < (int)m.size(); i++) ans = min(ans, m[i]-m[i-1]);\n        ans = min(ans, 1440 - m.back() + m.front());\n        return ans;\n    }\n};',
      c: '/* Parse minutes sort wrap — xem C++ */'
    },
    analysis: {
      correctness: 'Min diff trên vòng tròn 1440 phút = min kề sort và qua midnight.',
      edgeCases: ['Hai time đối xứng midnight', 'Trùng time → 0'],
      pitfalls: ['Quên wrap cuối-đầu', 'Parse HH:MM sai']
    }
  },
  540: {
    category: 'Array',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Mảng đã sort, mọi phần tử xuất hiện đúng hai lần trừ một phần tử xuất hiện một lần. Tìm phần tử đơn.',
    examples: [
      { input: 'nums = [1,1,2,3,3,4,4,8,8]', output: '2' },
      { input: 'nums = [3,3,7,7,10,11,11]', output: '10' }
    ],
    approach: 'Binary search: tại mid, nếu mid chẵn thì nums[mid]==nums[mid+1]; lẻ thì nums[mid]==nums[mid-1]. Điều chỉnh left/right theo cặp lệch.',
    memoryTip: 'Single in sorted: BS theo parity — cặt đôi đúng ở nửa trái hay phải single.',
    solutions: {
      python: 'class Solution:\n    def singleNonDuplicate(self, nums: List[int]) -> int:\n        lo, hi = 0, len(nums) - 1\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if mid % 2 == 1:\n                mid -= 1\n            if nums[mid] == nums[mid + 1]:\n                lo = mid + 2\n            else:\n                hi = mid\n        return nums[lo]',
      cpp: 'class Solution {\npublic:\n    int singleNonDuplicate(vector<int>& nums) {\n        int lo = 0, hi = (int)nums.size() - 1;\n        while (lo < hi) {\n            int mid = (lo + hi) / 2;\n            if (mid % 2) mid--;\n            if (nums[mid] == nums[mid + 1]) lo = mid + 2;\n            else hi = mid;\n        }\n        return nums[lo];\n    }\n};',
      c: '/* Binary search parity — xem C++ */'
    },
    analysis: {
      correctness: 'Invariant: single nằm bên có số phần tử lẻ sau khi loại cặt đôi đúng.',
      edgeCases: ['Single ở đầu/cuối', 'Mảng 3 phần tử'],
      pitfalls: ['XOR toàn mảng không O(log n)', 'Mid parity xử lý sai']
    }
  },
  541: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho s và k. Đảo chuỗi theo khối 2k: mỗi 2k ký tự đảo k ký tự đầu; đoạn cuối <2k thì đảo k đầu (hoặc hết nếu ngắn hơn).',
    examples: [
      { input: 's = "abcdefg", k = 2', output: '"bacdfeg"' },
      { input: 's = "abcd", k = 2', output: '"bacd"' }
    ],
    approach: 'Duyệt i += 2k; reverse s[i..i+k-1] bằng two-pointer.',
    memoryTip: 'Reverse II: for i step 2k, reverse subrange [i, i+k).',
    solutions: {
      python: 'class Solution:\n    def reverseStr(self, s: str, k: int) -> str:\n        a = list(s)\n        for i in range(0, len(a), 2 * k):\n            a[i:i+k] = reversed(a[i:i+k])\n        return "".join(a)',
      cpp: 'class Solution {\npublic:\n    string reverseStr(string s, int k) {\n        for (int i = 0; i < (int)s.size(); i += 2 * k) {\n            reverse(s.begin() + i, s.begin() + min(i + k, (int)s.size()));\n        }\n        return s;\n    }\n};',
      c: '/* Reverse every 2k block — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi khối 2k chỉ đảo đúng k ký tự đầu theo đề.',
      edgeCases: ['k=1 đảo từng ký tự xen kẽ', 'Đoạn cuối < k'],
      pitfalls: ['Đảo cả 2k thay vì k', 'Off-by-one trên đoạn cuối']
    }
  },
  542: {
    category: 'Array',
    timeComplexity: 'O(m * n)',
    spaceComplexity: 'O(m * n)',
    description: 'Ma trận 0/1. Trả ma trận khoảng cách Manhattan tới ô 0 gần nhất (ô 0 có dist 0).',
    examples: [
      { input: 'mat = [[0,0,0],[0,1,0],[1,1,1]]', output: '[[0,0,0],[0,1,0],[1,2,1]]' },
      { input: 'mat = [[0,1],[1,0]]', output: '[[0,1],[1,0]]' }
    ],
    approach: 'Multi-source BFS: enqueue mọi ô 0 dist=0; lan 4 hướng gán dist+1.',
    memoryTip: '01 Matrix = BFS từ tất cả zeros đồng thời, không DP từng ô riêng.',
    solutions: {
      python: 'class Solution:\n    def updateMatrix(self, mat: List[List[int]]) -> List[List[int]]:\n        m, n = len(mat), len(mat[0])\n        dist = [[10**9]*n for _ in range(m)]\n        from collections import deque\n        q = deque()\n        for i in range(m):\n            for j in range(n):\n                if mat[i][j] == 0:\n                    dist[i][j] = 0\n                    q.append((i,j))\n        dirs = [(1,0),(-1,0),(0,1),(0,-1)]\n        while q:\n            r,c = q.popleft()\n            for dr,dc in dirs:\n                nr, nc = r+dr, c+dc\n                if 0<=nr<m and 0<=nc<n and dist[nr][nc] > dist[r][c]+1:\n                    dist[nr][nc] = dist[r][c]+1\n                    q.append((nr,nc))\n        return dist',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {\n        int m = mat.size(), n = mat[0].size();\n        vector<vector<int>> dist(m, vector<int>(n, 1e9));\n        queue<pair<int,int>> q;\n        for (int i = 0; i < m; i++)\n            for (int j = 0; j < n; j++)\n                if (!mat[i][j]) { dist[i][j] = 0; q.push({i,j}); }\n        int d[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};\n        while (!q.empty()) {\n            auto [r,c] = q.front(); q.pop();\n            for (auto& dd : d) {\n                int nr=r+dd[0], nc=c+dd[1];\n                if (nr>=0&&nr<m&&nc>=0&&nc<n && dist[nr][nc]>dist[r][c]+1) {\n                    dist[nr][nc]=dist[r][c]+1; q.push({nr,nc});\n                }\n            }\n        }\n        return dist;\n    }\n};',
      c: '/* Multi-source BFS — xem C++ */'
    },
    analysis: {
      correctness: 'BFS layer đầu tiên tới mỗi ô cho dist tối thiểu tới 0.',
      edgeCases: ['Toàn 0', 'Một 0 góc'],
      pitfalls: ['DP 4 chiều phức tạp hơn cần', 'Không init dist lớn']
    }
  },
  543: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description: 'Trả đường kính cây nhị phân (số cạnh dài nhất giữa hai nút bất kỳ).',
    examples: [
      { input: 'root = [1,2,3,4,5]', output: '3' },
      { input: 'root = [1,2]', output: '1' }
    ],
    approach: 'DFS: tại mỗi node, diameter candidate = depth(left)+depth(right); trả max depth lên parent.',
    memoryTip: 'Tree diameter: postorder depth, update global max leftDepth+rightDepth.',
    solutions: {
      python: 'class Solution:\n    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:\n        self.ans = 0\n        def depth(n):\n            if not n: return 0\n            l = depth(n.left)\n            r = depth(n.right)\n            self.ans = max(self.ans, l + r)\n            return 1 + max(l, r)\n        depth(root)\n        return self.ans',
      cpp: 'class Solution {\n    int ans = 0;\n    int depth(TreeNode* n) {\n        if (!n) return 0;\n        int l = depth(n->left), r = depth(n->right);\n        ans = max(ans, l + r);\n        return 1 + max(l, r);\n    }\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        depth(root);\n        return ans;\n    }\n};',
      c: '/* DFS diameter depth — xem C++ */'
    },
    analysis: {
      correctness: 'Đường kính qua node = tổng chiều cao hai nhánh con; max over nodes.',
      edgeCases: ['Một nút → 0', 'Đường kính không qua root'],
      pitfalls: ['Nhầm đường kính với chiều cao', 'Không cập nhật global ans']
    }
  },
  546: {
    category: 'Array',
    timeComplexity: 'O(n^4)',
    spaceComplexity: 'O(n^3)',
    description: 'Xóa hộp liên tiếp cùng màu thu điểm k*(k+1). Trả điểm tối đa xóa hết mảng boxes.',
    examples: [
      { input: 'boxes = [1,3,5,8,8,3,4,1]', output: '23' },
      { input: 'boxes = [1,1,1]', output: '9' }
    ],
    approach: 'DP[l][r][k]: max score đoạn [l,r] với k hộp cùng màu boxes[r] phía sau. Thử tách tại p hoặc gộp k+1 cùng màu.',
    memoryTip: 'Remove Boxes = interval DP 3D (l,r,extra same color suffix).',
    solutions: {
      python: 'class Solution:\n    def removeBoxes(self, boxes: List[int]) -> int:\n        from functools import lru_cache\n        @lru_cache(None)\n        def dp(l, r, k):\n            if l > r: return 0\n            while r > l and boxes[r] == boxes[r-1]:\n                r -= 1\n                k += 1\n            ans = dp(l, r-1, 0) + (k+1)*(k+1)\n            for p in range(l, r):\n                if boxes[p] == boxes[r]:\n                    ans = max(ans, dp(l, p, k+1) + dp(p+1, r-1, 0))\n            return ans\n        return dp(0, len(boxes)-1, 0)',
      cpp: 'class Solution {\n    vector<int> b;\n    int dp[100][100][100];\n    int solve(int l, int r, int k) {\n        if (l > r) return 0;\n        if (dp[l][r][k]) return dp[l][r][k];\n        while (r > l && b[r] == b[r-1]) { r--; k++; }\n        int ans = solve(l, r-1, 0) + (k+1)*(k+1);\n        for (int p = l; p < r; p++)\n            if (b[p] == b[r])\n                ans = max(ans, solve(l, p, k+1) + solve(p+1, r-1, 0));\n        return dp[l][r][k] = ans;\n    }\npublic:\n    int removeBoxes(vector<int>& boxes) {\n        b = boxes;\n        memset(dp, 0, sizeof dp);\n        return solve(0, boxes.size()-1, 0);\n    }\n};',
      c: '/* 3D interval DP — xem C++ */'
    },
    analysis: {
      correctness: 'State (l,r,k) cover mọi cách gộp hộp cùng màu cuối trước khi nổ.',
      edgeCases: ['Một màu → n*n', 'Nhiều màu xen kẽ'],
      pitfalls: ['Greedy sai', 'Quên gộp trailing same color vào k']
    }
  },
  547: {
    category: 'Graph',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n)',
    description: 'Ma trận n×n isConnected: isConnected[i][j]=1 nếu thành phố i,j cùng tỉnh. Đếm số tỉnh (connected components).',
    examples: [
      { input: 'isConnected = [[1,1,0],[1,1,0],[0,0,1]]', output: '2' },
      { input: 'isConnected = [[1,0,0],[0,1,0],[0,0,1]]', output: '3' }
    ],
    approach: 'DFS/BFS hoặc Union-Find: duyệt i=0..n-1, nếu chưa thăm thì dfs lan và tăng count.',
    memoryTip: 'Number of provinces = count connected components in adjacency matrix.',
    solutions: {
      python: 'class Solution:\n    def findCircleNum(self, isConnected: List[List[int]]) -> int:\n        n = len(isConnected)\n        seen = [False]*n\n        def dfs(u):\n            seen[u] = True\n            for v in range(n):\n                if isConnected[u][v] and not seen[v]:\n                    dfs(v)\n        ans = 0\n        for i in range(n):\n            if not seen[i]:\n                dfs(i)\n                ans += 1\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findCircleNum(vector<vector<int>>& isConnected) {\n        int n = isConnected.size();\n        vector<bool> seen(n);\n        function<void(int)> dfs = [&](int u) {\n            seen[u] = true;\n            for (int v = 0; v < n; v++)\n                if (isConnected[u][v] && !seen[v]) dfs(v);\n        };\n        int ans = 0;\n        for (int i = 0; i < n; i++)\n            if (!seen[i]) { dfs(i); ans++; }\n        return ans;\n    }\n};',
      c: '/* DFS components — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi DFS thăm trọn một component; đếm số lần khởi dfs.',
      edgeCases: ['n=1 → 1', 'Toàn kết nối → 1'],
      pitfalls: ['Chỉ xét cạnh i,i+1', 'Quên matrix đối xứng vẫn dfs đủ']
    }
  },
  550: {
    category: 'Database',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Bảng Activity. Tính tỷ lệ player có first_login không phải ngày đầu tiên của họ (event_date > MIN date) trong tổng số player.',
    examples: [
      { input: 'Player A login ngày 2 và 3, first=1', output: 'Tỷ lệ player có ngày đầu > ngày first thực' },
      { input: 'Mọi player chỉ 1 ngày', output: '0.00' }
    ],
    approach: 'WITH first AS (MIN date per player), tính COUNT player có EXISTS login sau first / COUNT player.',
    memoryTip: 'Game Play IV = so sánh first event date với MIN date per player ratio.',
    solutions: {
      python: '# SQL\nSELECT ROUND(\n  IFNULL(\n    (SELECT COUNT(DISTINCT player_id) FROM Activity a\n     JOIN (SELECT player_id, MIN(event_date) fd FROM Activity GROUP BY player_id) f\n       ON a.player_id=f.player_id AND a.event_date>f.fd)\n    / (SELECT COUNT(DISTINCT player_id) FROM Activity), 0), 2) AS fraction;',
      cpp: '// SQL\nSELECT ROUND(\n  IFNULL(\n    (SELECT COUNT(DISTINCT player_id) FROM Activity a\n     JOIN (SELECT player_id, MIN(event_date) fd FROM Activity GROUP BY player_id) f\n       ON a.player_id=f.player_id AND a.event_date>f.fd)\n    / (SELECT COUNT(DISTINCT player_id) FROM Activity), 0), 2) AS fraction;',
      c: '/* SQL ratio first login — xem SQL trên */'
    },
    analysis: {
      correctness: 'Player được đếm nếu có ít nhất một activity sau ngày đầu tiên của họ.',
      edgeCases: ['Một activity/player → 0', 'ROUND 2 chữ số'],
      pitfalls: ['Nhầm với Game Play I MIN date', 'Chia cho 0 khi không player']
    }
  },
  551: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Kiểm tra chuỗi attendance hợp lệ: tối đa một \'A\' (absent) và không có 3 \'L\' liên tiếp.',
    examples: [
      { input: 's = "PPALLP"', output: 'true' },
      { input: 's = "PPALLL"', output: 'false' },
      { input: 's = "P"', output: 'true' }
    ],
    approach: 'Duyệt một lần: đếm A, streak L reset khi gặp P/A.',
    memoryTip: 'Attendance I: count A ≤1 và max consecutive L <3.',
    solutions: {
      python: 'class Solution:\n    def checkRecord(self, s: str) -> bool:\n        a = l = 0\n        for c in s:\n            if c == "A":\n                a += 1\n                if a > 1: return False\n                l = 0\n            elif c == "L":\n                l += 1\n                if l >= 3: return False\n            else:\n                l = 0\n        return True',
      cpp: 'class Solution {\npublic:\n    bool checkRecord(string s) {\n        int a = 0, l = 0;\n        for (char c : s) {\n            if (c == \'A\') { if (++a > 1) return false; l = 0; }\n            else if (c == \'L\') { if (++l >= 3) return false; }\n            else l = 0;\n        }\n        return true;\n    }\n};',
      c: '/* Scan A count L streak — xem C++ */'
    },
    analysis: {
      correctness: 'Hai ràng buộc độc lập kiểm tra trong một pass.',
      edgeCases: ['Không A không L', 'LLL ngay đầu'],
      pitfalls: ['Chỉ check A quên LLL', 'Reset L khi A sai']
    }
  },
  552: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Đếm số chuỗi attendance hợp lệ độ dài n (P/L/A) với tối đa 1 A và không LLL. Trả mod 10^9+7.',
    examples: [
      { input: 'n = 1', output: '3' },
      { input: 'n = 2', output: '8' },
      { input: 'n = 3', output: '19' }
    ],
    approach: 'DP theo (pos, absent used, late streak 0..2): thêm P reset late; L tăng streak; A nếu chưa absent.',
    memoryTip: 'Attendance II = DP dimensions length × absent flag × late count 0-2.',
    solutions: {
      python: 'class Solution:\n    def checkRecord(self, n: int) -> int:\n        MOD = 10**9+7\n        dp = [[0]*3 for _ in range(2)]\n        dp[0][0] = 1\n        for _ in range(n):\n            ndp = [[0]*3 for _ in range(2)]\n            for a in range(2):\n                for l in range(3):\n                    v = dp[a][l]\n                    if not v: continue\n                    ndp[a][0] = (ndp[a][0]+v)%MOD\n                    if l+1 < 3: ndp[a][l+1] = (ndp[a][l+1]+v)%MOD\n                    if a == 0: ndp[1][0] = (ndp[1][0]+v)%MOD\n            dp = ndp\n        return sum(sum(row) for row in dp) % MOD',
      cpp: 'class Solution {\npublic:\n    int checkRecord(int n) {\n        const int MOD = 1e9+7;\n        long long dp[2][3] = {};\n        dp[0][0] = 1;\n        while (n--) {\n            long long ndp[2][3] = {};\n            for (int a = 0; a < 2; a++)\n                for (int l = 0; l < 3; l++) if (dp[a][l]) {\n                    ndp[a][0] = (ndp[a][0]+dp[a][l])%MOD;\n                    if (l+1<3) ndp[a][l+1]=(ndp[a][l+1]+dp[a][l])%MOD;\n                    if (!a) ndp[1][0]=(ndp[1][0]+dp[a][l])%MOD;\n                }\n            memcpy(dp, ndp, sizeof dp);\n        }\n        long long ans=0;\n        for (int a=0;a<2;a++) for(int l=0;l<3;l++) ans=(ans+dp[a][l])%MOD;\n        return ans;\n    }\n};',
      c: '/* DP absent/late — xem C++ */'
    },
    analysis: {
      correctness: 'State machine cover mọi chuỗi hợp lệ; modulo ở mỗi bước.',
      edgeCases: ['n=1 → P,L,A', 'n lớn cần mod'],
      pitfalls: ['Quên mod', 'Late streak >2 không cắt']
    }
  },
  553: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho mảng số dương. Ghép biểu thức a/b/c/... với ngoặc tối ưu để giá trị lớn nhất. Trả chuỗi biểu thức.',
    examples: [
      { input: 'nums = [1000,100,10,2]', output: '"1000/(10/2)"' },
      { input: 'nums = [2,3,4]', output: '"2/(3/4)"' }
    ],
    approach: 'n=1 trả s0; n=2 trả a/b; n≥3 luôn a/(b/c/d...) — mẫu số nhỏ tối đa hóa thương.',
    memoryTip: 'Optimal division: first/(second/rest joined by /) — only one optimal pattern.',
    solutions: {
      python: 'class Solution:\n    def optimalDivision(self, nums: List[int]) -> str:\n        if len(nums) == 1:\n            return str(nums[0])\n        if len(nums) == 2:\n            return f"{nums[0]}/{nums[1]}"\n        return f"{nums[0]}/({\'/\'.join(map(str, nums[1:]))})"',
      cpp: 'class Solution {\npublic:\n    string optimalDivision(vector<int>& nums) {\n        if (nums.size() == 1) return to_string(nums[0]);\n        if (nums.size() == 2) return to_string(nums[0]) + "/" + to_string(nums[1]);\n        string s = to_string(nums[0]) + "/(" + to_string(nums[1]);\n        for (size_t i = 2; i < nums.size(); i++) s += "/" + to_string(nums[i]);\n        return s + ")";\n    }\n};',
      c: '/* Format a/(b/c/...) — xem C++ */'
    },
    analysis: {
      correctness: 'Chia liên tiếp trái sang phải nhỏ nhất khi nhóm mẫu số từ phần tử 2.',
      edgeCases: ['2 phần tử không cần ngoặc', '1 phần tử'],
      pitfalls: ['DP không cần — pattern cố định', 'Thiếu ngoặc với n≥3']
    }
  },
  554: {
    category: 'Array',
    timeComplexity: 'O(n * m)',
    spaceComplexity: 'O(m)',
    description: 'Tường gạch: mỗi hàng là list vị trí seam (ngoại trừ 0 và width). Tìm seam dọc sao số gạch cắt qua ít nhất (max rows không cắt).',
    examples: [
      { input: 'wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]', output: '2' },
      { input: 'wall = [[1],[1]]', output: '0' }
    ],
    approach: 'Prefix sum mỗi hàng; hash đếm tổng prefix tại mỗi seam; answer = n - max count.',
    memoryTip: 'Brick wall = count prefix sums at seams, max alignment → n - max.',
    solutions: {
      python: 'class Solution:\n    def leastBricks(self, wall: List[List[int]]) -> int:\n        from collections import Counter\n        cnt = Counter()\n        for row in wall:\n            s = 0\n            for b in row[:-1]:\n                s += b\n                cnt[s] += 1\n        if not cnt:\n            return len(wall)\n        return len(wall) - cnt.most_common(1)[0][1]',
      cpp: 'class Solution {\npublic:\n    int leastBricks(vector<vector<int>>& wall) {\n        unordered_map<int,int> cnt;\n        for (auto& row : wall) {\n            int s = 0;\n            for (int i = 0; i + 1 < (int)row.size(); i++) {\n                s += row[i];\n                cnt[s]++;\n            }\n        }\n        int best = 0;\n        for (auto& p : cnt) best = max(best, p.second);\n        return wall.size() - best;\n    }\n};',
      c: '/* Prefix seam count — xem C++ */'
    },
    analysis: {
      correctness: 'Seam chung nhiều hàng nhất = max rows không phải cắt gạch.',
      edgeCases: ['Mỗi hàng 1 gạch → 0 seam chung', 'Tất cả cùng pattern'],
      pitfalls: ['Tính cả seam cuối hàng', 'Trả max thay vì n-max']
    }
  },
  556: {
    category: 'Math',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Cho số nguyên n. Trả next greater với cùng các chữ số (next permutation); không có trả -1.',
    examples: [
      { input: 'n = 12', output: '21' },
      { input: 'n = 21', output: '-1' },
      { input: 'n = 534976', output: '536479' }
    ],
    approach: 'Chuyển sang mảng chữ số; next_permutation: tìm i giảm dần, swap với số lớn hơn nhỏ nhất bên phải, reverse suffix.',
    memoryTip: 'Next greater element III = next_permutation on digits; overflow check 32-bit.',
    solutions: {
      python: 'class Solution:\n    def nextGreaterElement(self, n: int) -> int:\n        a = list(str(n))\n        i = len(a) - 2\n        while i >= 0 and a[i] >= a[i+1]:\n            i -= 1\n        if i < 0:\n            return -1\n        j = len(a) - 1\n        while a[j] <= a[i]:\n            j -= 1\n        a[i], a[j] = a[j], a[i]\n        a[i+1:] = reversed(a[i+1:])\n        ans = int("".join(a))\n        return ans if ans < 2**31 else -1',
      cpp: 'class Solution {\npublic:\n    int nextGreaterElement(int n) {\n        string a = to_string(n);\n        int i = (int)a.size()-2;\n        while (i>=0 && a[i]>=a[i+1]) i--;\n        if (i<0) return -1;\n        int j = (int)a.size()-1;\n        while (a[j]<=a[i]) j--;\n        swap(a[i], a[j]);\n        reverse(a.begin()+i+1, a.end());\n        long long ans = stoll(a);\n        return ans >= (1LL<<31) ? -1 : (int)ans;\n    }\n};',
      c: '/* Next permutation digits — xem C++ */'
    },
    analysis: {
      correctness: 'Next permutation chuẩn trên chữ số; kiểm tra 32-bit signed.',
      edgeCases: ['Đã max permutation → -1', 'Overflow → -1'],
      pitfalls: ['Quên reverse suffix', 'Không check INT_MAX']
    }
  },
  557: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Đảo ngược từng từ trong chuỗi (từ cách nhau bởi space), giữ nguyên thứ tự từ và khoảng trắng đơn.',
    examples: [
      { input: 's = "Let\'s take LeetCode contest"', output: '"s\'teL ekat edoCteeL tsetnoc"' },
      { input: 's = "God Ding"', output: '"doG gniD"' }
    ],
    approach: 'Split theo space hoặc duyệt: reverse từng đoạn giữa spaces.',
    memoryTip: 'Reverse words III = reverse each word segment in char array.',
    solutions: {
      python: 'class Solution:\n    def reverseWords(self, s: str) -> str:\n        return " ".join(w[::-1] for w in s.split(" "))',
      cpp: 'class Solution {\npublic:\n    string reverseWords(string s) {\n        for (int i = 0; i < (int)s.size(); i++) {\n            int j = i;\n            while (j < (int)s.size() && s[j] != \' \') j++;\n            reverse(s.begin()+i, s.begin()+j);\n            i = j;\n        }\n        return s;\n    }\n};',
      c: '/* Reverse each word — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi word được reverse độc lập; spaces giữ nguyên vị trí.',
      edgeCases: ['Một từ', 'Hai từ'],
      pitfalls: ['Reverse cả chuỗi', 'split() nuốt spaces (Python dùng split(" "))']
    }
  },
  558: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(log n)',
    description: 'Hai lưới n×n và quad-tree. Trả quad-tree là OR logic của hai lưới (leaf 0/1 hoặc merge 4 con).',
    examples: [
      { input: 'grid1, grid2 2x2', output: 'Quad-tree OR từng ô' },
      { input: 'Một grid toàn 0', output: 'Leaf val=0' }
    ],
    approach: 'Đệ quy chia 4 góc phần tư; nếu vùng uniform trả leaf; else internal 4 children OR đệ quy.',
    memoryTip: 'Quad-tree OR = divide 4 quadrants, uniform → leaf else internal node.',
    solutions: {
      python: 'class Solution:\n    def intersect(self, quadTree1: Node, quadTree2: Node) -> Node:\n        if quadTree1.isLeaf:\n            return quadTree1 if quadTree1.val else quadTree2\n        if quadTree2.isLeaf:\n            return quadTree2 if quadTree2.val else quadTree1\n        return Node(True, False,\n            self.intersect(quadTree1.topLeft, quadTree2.topLeft),\n            self.intersect(quadTree1.topRight, quadTree2.topRight),\n            self.intersect(quadTree1.bottomLeft, quadTree2.bottomLeft),\n            self.intersect(quadTree1.bottomRight, quadTree2.bottomRight))',
      cpp: '/* LC558 OR quad-tree — build from grids then merge */\nclass Solution {\n    Node* build(vector<vector<int>>& g, int x, int y, int len) {\n        if (len == 1) return new Node(g[x][y], true, nullptr,nullptr,nullptr,nullptr);\n        auto tl=build(g,x,y,len/2), tr=build(g,x,y+len/2,len/2);\n        auto bl=build(g,x+len/2,y,len/2), br=build(g,x+len/2,y+len/2,len/2);\n        if (tl->isLeaf&&tr->isLeaf&&bl->isLeaf&&br->isLeaf && tl->val==tr->val&&tl->val==bl->val&&tl->val==br->val)\n            return new Node(tl->val,true,nullptr,nullptr,nullptr,nullptr);\n        return new Node(false,false,tl,tr,bl,br);\n    }\npublic:\n    Node* intersect(Node* a, Node* b) {\n        if (a->isLeaf) return a->val ? a : b;\n        if (b->isLeaf) return b->val ? b : a;\n        return new Node(true,false,\n            intersect(a->topLeft,b->topLeft), intersect(a->topRight,b->topRight),\n            intersect(a->bottomLeft,b->bottomLeft), intersect(a->bottomRight,b->bottomRight));\n    }\n};',
      c: '/* Quad-tree OR recursive — xem C++ */'
    },
    analysis: {
      correctness: 'OR: leaf 1 dominate; hai leaf 0 → 0; internal merge 4 nhánh.',
      edgeCases: ['Grid 1x1', 'Một tree leaf 1'],
      pitfalls: ['Nhầm AND vs OR', 'Không compress uniform children']
    }
  },
  559: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description: 'Trả độ sâu tối đa của cây N-ary (mỗi node có list children).',
    examples: [
      { input: 'root = [1,null,3,2,4,null,5,6]', output: '3' },
      { input: 'root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10]', output: '5' }
    ],
    approach: 'DFS/BFS: depth = 1 + max depth con (hoặc BFS level count).',
    memoryTip: 'N-ary max depth = 1 + max(child depths) recursive.',
    solutions: {
      python: 'class Solution:\n    def maxDepth(self, root: Node) -> int:\n        if not root:\n            return 0\n        if not root.children:\n            return 1\n        return 1 + max(self.maxDepth(c) for c in root.children)',
      cpp: 'class Solution {\npublic:\n    int maxDepth(Node* root) {\n        if (!root) return 0;\n        int d = 0;\n        for (auto* c : root->children) d = max(d, maxDepth(c));\n        return 1 + d;\n    }\n};',
      c: '/* DFS max child depth — xem C++ */'
    },
    analysis: {
      correctness: 'Độ sâu cây = 1 + max subtree depth over children.',
      edgeCases: ['null → 0', 'Chỉ root → 1'],
      pitfalls: ['Dùng left/right binary', 'Quên leaf depth 1']
    }
  },
  560: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Đếm số subarray liên tiếp có tổng bằng k (có thể có số âm).',
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2' },
      { input: 'nums = [1,2,3], k = 3', output: '2' },
      { input: 'nums = [1,-1,0], k = 0', output: '3' }
    ],
    approach: 'Prefix sum + hash: freq[prefix]; mỗi bước cộng freq[sum-k] vào answer.',
    memoryTip: 'Subarray sum K = prefix map count of (currentSum - k).',
    solutions: {
      python: 'class Solution:\n    def subarraySum(self, nums: List[int], k: int) -> int:\n        from collections import defaultdict\n        cnt = defaultdict(int)\n        cnt[0] = 1\n        s = ans = 0\n        for x in nums:\n            s += x\n            ans += cnt[s - k]\n            cnt[s] += 1\n        return ans',
      cpp: 'class Solution {\npublic:\n    int subarraySum(vector<int>& nums, int k) {\n        unordered_map<int,int> cnt{{0,1}};\n        long long s = 0;\n        int ans = 0;\n        for (int x : nums) {\n            s += x;\n            if (cnt.count(s - k)) ans += cnt[s - k];\n            cnt[s]++;\n        }\n        return ans;\n    }\n};',
      c: '/* Prefix sum hash — xem C++ */'
    },
    analysis: {
      correctness: 'Mỗi prefix trước có sum = cur-k tạo một subarray tổng k.',
      edgeCases: ['k=0 với prefix lặp', 'Toàn số âm'],
      pitfalls: ['Quên khởi tạo cnt[0]=1', 'Dùng sliding window chỉ khi dương']
    }
  }
};
