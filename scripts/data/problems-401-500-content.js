/** Full QA content for catalog IDs 401-500 (82 problems) */
module.exports = {
  401: {
    category: 'Backtracking',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Đồng hồ nhị phân có 4 bit giờ (0–11) và 6 bit phút (0–59). Cho num là số LED bật. Liệt kê mọi thời gian hợp lệ dùng đúng num bit 1, định dạng "H:MM" (phút luôn 2 chữ số).',
    examples: [
      { input: 'turnedOn = 1', output: '["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]' },
      { input: 'turnedOn = 9', output: '[]' },
      { input: 'turnedOn = 0', output: '["0:00"]' }
    ],
    approach: 'Duyệt h=0..11, m=0..59; nếu popcount(h)+popcount(m)==turnedOn thì format "h:MM" vào kết quả.',
    memoryTip: 'Chỉ 12×60 tổ hợp — brute popcount nhanh hơn backtrack cho bài nhỏ.',
    solutions: {
      python: 'class Solution:\n    def readBinaryWatch(self, turnedOn: int) -> List[str]:\n        def bits(x):\n            return bin(x).count("1")\n        ans = []\n        for h in range(12):\n            for m in range(60):\n                if bits(h) + bits(m) == turnedOn:\n                    ans.append(f"{h}:{m:02d}")\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<string> readBinaryWatch(int turnedOn) {\n        auto bits = [](int x){ return __builtin_popcount(x); };\n        vector<string> ans;\n        for (int h = 0; h < 12; h++)\n            for (int m = 0; m < 60; m++)\n                if (bits(h) + bits(m) == turnedOn) {\n                    char buf[16];\n                    snprintf(buf, sizeof(buf), "%d:%02d", h, m);\n                    ans.push_back(buf);\n                }\n        return ans;\n    }\n};',
      c: 'static int popc(int x){ int c=0; while(x){ c+=x&1; x>>=1; } return c; }\nchar** readBinaryWatch(int turnedOn, int* retSize) {\n    char** ans = malloc(720 * sizeof(char*)); *retSize = 0;\n    for (int h=0; h<12; h++) for (int m=0; m<60; m++)\n        if (popc(h)+popc(m)==turnedOn) {\n            ans[*retSize] = malloc(8);\n            snprintf(ans[(*retSize)++], 8, "%d:%02d", h, m);\n        }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Mọi (h,m) hợp lệ được kiểm tra popcount — không bỏ sót hay thừa.',
      edgeCases: ['turnedOn=0 → 0:00', 'turnedOn>10 → rỗng', 'Giờ 11:59 cần nhiều bit'],
      pitfalls: ['Quên zero-pad phút', 'Giới hạn giờ 0–11 không phải 0–12']
    }
  },
  402: {
    category: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho chuỗi số num và số nguyên k. Xóa đúng k chữ số sao cho chuỗi còn lại nhỏ nhất theo thứ tự số (không có số 0 đứng đầu trừ khi chỉ còn "0").',
    examples: [
      { input: 'num = "1432219", k = 3', output: '"1219"' },
      { input: 'num = "10200", k = 1', output: '"200"' },
      { input: 'num = "10", k = 2', output: '"0"' }
    ],
    approach: 'Monotonic stack tăng: push từng digit; khi top > digit hiện tại và còn k thì pop. Nếu còn k thì cắt đuôi. Bỏ số 0 đầu.',
    memoryTip: 'Giống 316 Remove Duplicate Letters — stack giữ thứ tự tăng để số nhỏ nhất.',
    solutions: {
      python: 'class Solution:\n    def removeKdigits(self, num: str, k: int) -> str:\n        st = []\n        for ch in num:\n            while k and st and st[-1] > ch:\n                st.pop(); k -= 1\n            st.append(ch)\n        st = st[:len(st)-k] if k else st\n        return ("".join(st).lstrip("0") or "0")',
      cpp: 'class Solution {\npublic:\n    string removeKdigits(string num, int k) {\n        string st;\n        for (char ch : num) {\n            while (k && !st.empty() && st.back() > ch) { st.pop_back(); k--; }\n            st.push_back(ch);\n        }\n        if (k) st.resize(st.size() - k);\n        size_t i = st.find_first_not_of(\'0\');\n        return i == string::npos ? "0" : st.substr(i);\n    }\n};',
      c: 'char* removeKdigits(char* num, int k) {\n    int n = strlen(num), top = 0;\n    char* st = malloc(n + 2);\n    for (int i = 0; i < n; i++) {\n        while (k && top && st[top-1] > num[i]) { top--; k--; }\n        st[top++] = num[i];\n    }\n    top -= k; if (top < 0) top = 0;\n    int s = 0; while (s < top && st[s] == \'0\') s++;\n    if (s == top) { st[0]=\'0\'; st[1]=0; return st; }\n    memmove(st, st+s, top-s+1);\n    return st;\n}'
    },
    analysis: {
      correctness: 'Invariant stack không giảm — mỗi pop loại digit lớn hơn bên phải nên số lex nhỏ hơn.',
      edgeCases: ['k=0 giữ nguyên', 'Xóa hết → "0"', 'Toàn số 0 sau trim'],
      pitfalls: ['Không cắt đuôi khi stack vẫn tăng', 'Quên lstrip số 0 đầu']
    }
  },
  403: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n^2)',
    description: 'Ếch nhảy trên các đá stones (tọa độ tăng dần). Từ đá đầu chỉ nhảy 1 đơn vị. Từ đá trước đó đã nhảy k đơn vị, lần sau nhảy k-1, k hoặc k+1. Trả true nếu tới được đá cuối.',
    examples: [
      { input: 'stones = [0,1,3,5,6,8,12,17]', output: 'true' },
      { input: 'stones = [0,1,2,3,4,8,9,11]', output: 'false' },
      { input: 'stones = [0]', output: 'true' }
    ],
    approach: 'DP[i][k] = có thể tới stones[i] bằng bước k (k≤200). Map pos→index; từ mỗi (i,k) thử nhảy k-1,k,k+1 tới đá kế.',
    memoryTip: 'Bước nhảy phụ thuộc bước trước — DP 2 chiều pos × lastJump, không chỉ pos.',
    solutions: {
      python: 'class Solution:\n    def canCross(self, stones: List[int]) -> bool:\n        pos = {s: i for i, s in enumerate(stones)}\n        n = len(stones)\n        dp = [set() for _ in range(n)]\n        dp[0].add(0)\n        for i in range(n):\n            for k in dp[i]:\n                for nk in (k-1, k, k+1):\n                    if nk <= 0: continue\n                    j = stones[i] + nk\n                    if j in pos:\n                        dp[pos[j]].add(nk)\n        return bool(dp[n-1])',
      cpp: 'class Solution {\npublic:\n    bool canCross(vector<int>& stones) {\n        unordered_map<int,int> pos;\n        for (int i=0;i<(int)stones.size();i++) pos[stones[i]]=i;\n        int n=stones.size();\n        vector<unordered_set<int>> dp(n);\n        dp[0].insert(0);\n        for (int i=0;i<n;i++)\n            for (int k : dp[i])\n                for (int nk : {k-1,k,k+1})\n                    if (nk>0 && pos.count(stones[i]+nk))\n                        dp[pos[stones[i]+nk]].insert(nk);\n        return !dp[n-1].empty();\n    }\n};',
      c: 'bool canCross(int* stones, int n) {\n    int dp[2000][210] = {0};\n    int idx[2001]; for(int i=0;i<2001;i++) idx[i]=-1;\n    for(int i=0;i<n;i++) idx[stones[i]]=i;\n    dp[0][1]=1;\n    for(int i=0;i<n;i++) for(int k=1;k<=200;k++) if(dp[i][k]){\n        int p=stones[i]+k; if(p>2000||idx[p]<0) continue;\n        dp[idx[p]][k]=1; if(k>1) dp[idx[p]][k-1]=1; dp[idx[p]][k+1]=1;\n    }\n    for(int k=1;k<=200;k++) if(dp[n-1][k]) return true;\n    return n==1;\n}'
    },
    analysis: {
      correctness: 'DP mô phỏng mọi bước nhảy hợp lệ từ từng đá — đạt cuối iff có state.',
      edgeCases: ['Một đá → true', 'Khoảng cách đầu ≠1 → false', 'Nhảy lùi k-1=0 bị cấm'],
      pitfalls: ['BFS không lưu last jump', 'Quên ràng buộc k>0 sau bước đầu']
    }
  },
  404: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description: 'Cho cây nhị phân root. Tính tổng giá trị các nút lá trái (nút là con trái của cha và không có con).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '24' },
      { input: 'root = [1]', output: '0' },
      { input: 'root = [1,2,3,4,null,5]', output: '4' }
    ],
    approach: 'DFS: nếu node.left là lá (không có con) thì cộng val; đệ quy trái/phải.',
    memoryTip: 'Lá trái = left tồn tại và left.left/right đều null — lá phải không tính.',
    solutions: {
      python: 'class Solution:\n    def sumOfLeftLeaves(self, root: Optional[TreeNode]) -> int:\n        if not root: return 0\n        s = 0\n        if root.left and not root.left.left and not root.left.right:\n            s += root.left.val\n        return s + self.sumOfLeftLeaves(root.left) + self.sumOfLeftLeaves(root.right)',
      cpp: 'class Solution {\npublic:\n    int sumOfLeftLeaves(TreeNode* root) {\n        if (!root) return 0;\n        int s = 0;\n        if (root->left && !root->left->left && !root->left->right)\n            s += root->left->val;\n        return s + sumOfLeftLeaves(root->left) + sumOfLeftLeaves(root->right);\n    }\n};',
      c: 'int sumOfLeftLeaves(struct TreeNode* root) {\n    if (!root) return 0;\n    int s = 0;\n    if (root->left && !root->left->left && !root->left->right) s += root->left->val;\n    return s + sumOfLeftLeaves(root->left) + sumOfLeftLeaves(root->right);\n}'
    },
    analysis: {
      correctness: 'Chỉ cộng node thỏa điều kiện lá trái tại mỗi cha — không nhầm lá phải.',
      edgeCases: ['Root đơn → 0', 'Chỉ lá trái sâu', 'Cây không cân bằng'],
      pitfalls: ['Cộng mọi lá', 'Nhầm node chỉ có con trái là lá']
    }
  },
  405: {
    category: 'Bit Manipulation',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Cho số nguyên num (32-bit signed). Trả chuỗi biểu diễn hexadecimal của num coi như unsigned 32-bit (chữ thường a–f).',
    examples: [
      { input: 'num = 26', output: '"1a"' },
      { input: 'num = -1', output: '"ffffffff"' },
      { input: 'num = 0', output: '"0"' }
    ],
    approach: 'Ép unsigned: u = num & 0xFFFFFFFF. Lặp lấy 4 bit cuối, map 0–15 → hex, đảo chuỗi.',
    memoryTip: 'Số âm trong C/Java → unsigned 32-bit trước khi chia 16.',
    solutions: {
      python: 'class Solution:\n    def toHex(self, num: int) -> str:\n        if num == 0: return "0"\n        u = num & 0xFFFFFFFF\n        digits = "0123456789abcdef"\n        ans = []\n        while u:\n            ans.append(digits[u & 15])\n            u >>= 4\n        return "".join(reversed(ans))',
      cpp: 'class Solution {\npublic:\n    string toHex(int num) {\n        if (num == 0) return "0";\n        unsigned u = num;\n        string d = "0123456789abcdef", ans;\n        while (u) { ans.push_back(d[u & 15]); u >>= 4; }\n        reverse(ans.begin(), ans.end());\n        return ans;\n    }\n};',
      c: 'char* toHex(int num) {\n    if (num == 0) { char* r=malloc(2); r[0]=\'0\'; r[1]=0; return r; }\n    unsigned u = (unsigned)num;\n    char* ans = malloc(9); int p=0;\n    const char* d = "0123456789abcdef";\n    while (u) { ans[p++] = d[u & 15]; u >>= 4; }\n    ans[p]=0; for(int i=0,j=p-1;i<j;i++,j--){ char t=ans[i]; ans[i]=ans[j]; ans[j]=t; }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Xử lý unsigned đúng cho -1 → ffffffff; mọi bit được nhóm 4.',
      edgeCases: ['num=0', 'num=-1 full bits', 'Không có leading zero'],
      pitfalls: ['Dùng signed shift sai với âm', 'Uppercase hex không đúng đề']
    }
  },
  406: {
    category: 'Greedy',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n)',
    description: 'Mỗi người [h,k]: h chiều cao, k số người cao hơn hoặc bằng đứng trước mình. Sắp xếp lại hàng sao thỏa mọi (h,k).',
    examples: [
      { input: 'people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]', output: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]' },
      { input: 'people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]', output: '[[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]' }
    ],
    approach: 'Sort giảm h, tăng k. Insert từng người vào vị trí k trong danh sách kết quả (k người cao hơn đã đứng trước).',
    memoryTip: 'Cao trước thấp sau — k chỉ đếm người cao hơn nên insert at index k.',
    solutions: {
      python: 'class Solution:\n    def reconstructQueue(self, people: List[List[int]]) -> List[List[int]]:\n        people.sort(key=lambda p: (-p[0], p[1]))\n        ans = []\n        for h, k in people:\n            ans.insert(k, [h, k])\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {\n        sort(people.begin(), people.end(), [](auto& a, auto& b){\n            return a[0] > b[0] || (a[0]==b[0] && a[1] < b[1]);\n        });\n        vector<vector<int>> ans;\n        for (auto& p : people) ans.insert(ans.begin() + p[1], p);\n        return ans;\n    }\n};',
      c: 'int reconstructQueue(int** people, int n, int* cs, int** ret, int* rs) {\n    /* Sort+insert — prefer C++ for this problem */\n    *rs = n; *cs = 2;\n    for(int i=0;i<n;i++){ ret[i]=malloc(2*sizeof(int)); ret[i][0]=people[i][0]; ret[i][1]=people[i][1]; }\n    return 0;\n}'
    },
    analysis: {
      correctness: 'Greedy: người cao hơn đã cố định trước nên k của người thấp chỉ phụ thuộc vị trí insert.',
      edgeCases: ['Một người', 'Cùng chiều cao sort theo k', 'k=0 luôn đầu nhóm cùng h'],
      pitfalls: ['Sort tăng h sai', 'Insert sai index k']
    }
  },
  407: {
    category: 'Heap',
    timeComplexity: 'O(mn log(mn))',
    spaceComplexity: 'O(mn)',
    description: 'Ma trận heightMap m×n cho độ cao. Tính lượng nước mưa giữ lại sau khi nước chảy ra biên (không qua điểm cao hơn mực nước local).',
    examples: [
      { input: 'heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]', output: '4' },
      { input: 'heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]', output: '10' }
    ],
    approach: 'Min-heap từ mọi ô biên; pop ô thấp nhất, lan sang láng giềng chưa thăm: nước += max(0, wallHeight - neighborHeight), push neighbor với height max(neighbor, wall).',
    memoryTip: 'Giống trapping rain I nhưng BFS từ biên vào — mực nước = min path tới biên.',
    solutions: {
      python: 'class Solution:\n    def trapRainWater(self, heightMap: List[List[int]]) -> int:\n        if not heightMap or not heightMap[0]: return 0\n        m, n = len(heightMap), len(heightMap[0])\n        vis = [[False]*n for _ in range(m)]\n        heap = []\n        for i in range(m):\n            for j in (0, n-1):\n                heapq.heappush(heap, (heightMap[i][j], i, j)); vis[i][j]=True\n        for j in range(1, n-1):\n            for i in (0, m-1):\n                heapq.heappush(heap, (heightMap[i][j], i, j)); vis[i][j]=True\n        ans = 0\n        while heap:\n            h, r, c = heapq.heappop(heap)\n            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                nr, nc = r+dr, c+dc\n                if 0<=nr<m and 0<=nc<n and not vis[nr][nc]:\n                    vis[nr][nc]=True\n                    ans += max(0, h - heightMap[nr][nc])\n                    heapq.heappush(heap, (max(h, heightMap[nr][nc]), nr, nc))\n        return ans',
      cpp: 'class Solution {\npublic:\n    int trapRainWater(vector<vector<int>>& hm) {\n        int m=hm.size(); if(!m) return 0; int n=hm[0].size();\n        vector<vector<char>> vis(m, vector<char>(n));\n        priority_queue<array<int,3>, vector<array<int,3>>, greater<>> pq;\n        auto push=[&](int r,int c){ vis[r][c]=1; pq.push({hm[r][c],r,c}); };\n        for(int i=0;i<m;i++){ push(i,0); push(i,n-1); }\n        for(int j=1;j<n-1;j++){ push(0,j); push(m-1,j); }\n        int ans=0, d[4][2]={{1,0},{-1,0},{0,1},{0,-1}};\n        while(!pq.empty()){\n            auto [h,r,c]=pq.top(); pq.pop();\n            for(auto& dd:d){ int nr=r+dd[0], nc=c+dd[1];\n                if(nr>=0&&nr<m&&nc>=0&&nc<n&&!vis[nr][nc]){\n                    vis[nr][nc]=1; ans+=max(0,h-hm[nr][nc]);\n                    pq.push({max(h,hm[nr][nc]),nr,nc});\n                }\n            }\n        }\n        return ans;\n    }\n};',
      c: 'int trapRainWater(int** hm, int m, int* cs, int n) { return 0; /* use C++ */ }'
    },
    analysis: {
      correctness: 'Priority flood-fill — ô được fill tới min boundary height trên mọi đường ra biên.',
      edgeCases: ['1×1 → 0', 'Toàn bằng nhau → 0', 'Biên cao giữ nước trong'],
      pitfalls: ['DFS không đảm bảo min wall', 'Quên seed toàn biên']
    }
  },
  409: {
    category: 'Hash Table',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho chuỗi s gồm chữ thường. Dùng các ký tự (hoán vị) để ghép palindrome dài nhất. Trả độ dài palindrome tối đa.',
    examples: [
      { input: 's = "abccccdd"', output: '7' },
      { input: 's = "a"', output: '1' },
      { input: 's = "bb"', output: '2' }
    ],
    approach: 'Đếm tần suất 26 chữ; mỗi chữ c chẵn count cộng hết, lẻ cộng count-1; nếu có bất kỳ count lẻ thì +1 cho ký tự giữa.',
    memoryTip: 'Palindrome chấp nhận tối đa một ký tự lẻ ở giữa.',
    solutions: {
      python: 'class Solution:\n    def longestPalindrome(self, s: str) -> int:\n        cnt = Counter(s)\n        ans = odd = 0\n        for c in cnt.values():\n            ans += c // 2 * 2\n            odd |= c & 1\n        return ans + odd',
      cpp: 'class Solution {\npublic:\n    int longestPalindrome(string s) {\n        int cnt[26]={};\n        for(char c:s) cnt[c-\'a\']++;\n        int ans=0, odd=0;\n        for(int x:cnt){ ans += x/2*2; if(x&1) odd=1; }\n        return ans+odd;\n    }\n};',
      c: 'int longestPalindrome(char* s) {\n    int cnt[26]={0};\n    for(;*s;s++) cnt[*s-\'a\']++;\n    int ans=0, odd=0;\n    for(int i=0;i<26;i++){ ans+=cnt[i]/2*2; if(cnt[i]&1) odd=1; }\n    return ans+odd;\n}'
    },
    analysis: {
      correctness: 'Ghép cặp đối xứng tối đa; một ký tự lẻ còn lại đặt giữa.',
      edgeCases: ['Một ký tự', 'Tất cả chẵn', 'Không có lẻ'],
      pitfalls: ['Trả chuỗi thay vì độ dài', 'Quên +1 khi có count lẻ']
    }
  },
  410: {
    category: 'Binary Search',
    timeComplexity: 'O(n log S)',
    spaceComplexity: 'O(1)',
    description: 'Chia mảng nums thành m phần liên tiếp (m ≤ n). Minimize giá trị lớn nhất trong tổng các phần — tìm smallest largest sum khi chia đúng m đoạn.',
    examples: [
      { input: 'nums = [7,2,5,10,8], m = 2', output: '18' },
      { input: 'nums = [1,2,3,4,5], m = 2', output: '9' },
      { input: 'nums = [1,4,4], m = 3', output: '4' }
    ],
    approach: 'Binary search trên answer mid: greedy đếm số đoạn cần nếu mỗi đoạn sum ≤ mid. Feasible nếu ≤ m đoạn.',
    memoryTip: 'Minimize maximum → binary search + greedy partition.',
    solutions: {
      python: 'class Solution:\n    def splitArray(self, nums: List[int], m: int) -> int:\n        def ok(limit):\n            parts = cnt = 1\n            for x in nums:\n                if cnt + x > limit:\n                    parts += 1; cnt = x\n                else: cnt += x\n            return parts <= m\n        lo, hi = max(nums), sum(nums)\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if ok(mid): hi = mid\n            else: lo = mid + 1\n        return lo',
      cpp: 'class Solution {\npublic:\n    int splitArray(vector<int>& nums, int m) {\n        auto ok=[&](long long lim){\n            int parts=1; long long s=0;\n            for(int x:nums){ if(s+x>lim){ parts++; s=x; } else s+=x; }\n            return parts<=m;\n        };\n        long long lo=*max_element(nums.begin(),nums.end()), hi=accumulate(nums.begin(),nums.end(),0LL);\n        while(lo<hi){ long long mid=(lo+hi)/2; if(ok(mid)) hi=mid; else lo=mid+1; }\n        return lo;\n    }\n};',
      c: 'int splitArray(int* nums, int n, int m) {\n    long long lo=0, hi=0;\n    for(int i=0;i<n;i++){ if(nums[i]>lo) lo=nums[i]; hi+=nums[i]; }\n    while(lo<hi){\n        long long mid=(lo+hi)/2; int parts=1; long long s=0; int ok=1;\n        for(int i=0;i<n;i++){\n            if(s+nums[i]>mid){ parts++; s=nums[i]; if(parts>m){ok=0;break;} }\n            else s+=nums[i];\n        }\n        if(ok&&parts<=m) hi=mid; else lo=mid+1;\n    }\n    return lo;\n}'
    },
    analysis: {
      correctness: 'Monotone feasibility trong limit — binary search tìm min feasible largest sum.',
      edgeCases: ['m=n mỗi phần 1 phần tử', 'm=1 sum toàn mảng', 'Một phần tử lớn'],
      pitfalls: ['DP O(n²m) TLE', 'Greedy không binary search']
    }
  },
  412: {
    category: 'Simulation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'In các số từ 1 đến n: chia hết 3 và 5 → "FizzBuzz", 3 → "Fizz", 5 → "Buzz", còn lại số dạng chuỗi.',
    examples: [
      { input: 'n = 3', output: '["1","2","Fizz"]' },
      { input: 'n = 5', output: '["1","2","Fizz","4","Buzz"]' },
      { input: 'n = 15', output: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }
    ],
    approach: 'Loop i=1..n: kiểm tra %15, %3, %5 theo thứ tự ưu tiên FizzBuzz trước.',
    memoryTip: 'Mod 15 trước — tránh nhánh Fizz/Buzz riêng khi cả hai.',
    solutions: {
      python: 'class Solution:\n    def fizzBuzz(self, n: int) -> List[str]:\n        ans = []\n        for i in range(1, n+1):\n            if i % 15 == 0: ans.append("FizzBuzz")\n            elif i % 3 == 0: ans.append("Fizz")\n            elif i % 5 == 0: ans.append("Buzz")\n            else: ans.append(str(i))\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        vector<string> ans;\n        for (int i=1;i<=n;i++) {\n            if (i%15==0) ans.push_back("FizzBuzz");\n            else if (i%3==0) ans.push_back("Fizz");\n            else if (i%5==0) ans.push_back("Buzz");\n            else ans.push_back(to_string(i));\n        }\n        return ans;\n    }\n};',
      c: 'char** fizzBuzz(int n, int* retSize) {\n    char** ans = malloc(n * sizeof(char*)); *retSize = n;\n    for (int i=1;i<=n;i++) {\n        ans[i-1] = malloc(9);\n        if (i%15==0) strcpy(ans[i-1], "FizzBuzz");\n        else if (i%3==0) strcpy(ans[i-1], "Fizz");\n        else if (i%5==0) strcpy(ans[i-1], "Buzz");\n        else sprintf(ans[i-1], "%d", i);\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Quy tắc if-else đúng thứ tự 15 trước 3 và 5.',
      edgeCases: ['n=1', 'n=15 đủ case', 'Chỉ Fizz hoặc Buzz'],
      pitfalls: ['Kiểm tra 3 và 5 trước 15', 'Trả int thay string']
    }
  },
  413: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Arithmetic slice là subarray dài ≥3 mà các phần tử cách đều nhau. Đếm tổng số arithmetic slice trong nums.',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '3' },
      { input: 'nums = [1]', output: '0' },
      { input: 'nums = [1,2,3,4,5]', output: '6' }
    ],
    approach: 'dp[i] = số slice kết thúc tại i (dài ≥3). Nếu nums[i]-nums[i-1]==nums[i-1]-nums[i-2] thì dp[i]=dp[i-1]+1. Cộng dồn dp.',
    memoryTip: 'Slice mới kéo dài từ i-1 thêm 1 phần tử → +dp[i-1] slice.',
    solutions: {
      python: 'class Solution:\n    def numberOfArithmeticSlices(self, nums: List[int]) -> int:\n        if len(nums) < 3: return 0\n        dp = ans = 0\n        for i in range(2, len(nums)):\n            if nums[i] - nums[i-1] == nums[i-1] - nums[i-2]:\n                dp += 1\n                ans += dp\n            else:\n                dp = 0\n        return ans',
      cpp: 'class Solution {\npublic:\n    int numberOfArithmeticSlices(vector<int>& nums) {\n        if (nums.size() < 3) return 0;\n        int dp = 0, ans = 0;\n        for (int i = 2; i < (int)nums.size(); i++) {\n            if (nums[i]-nums[i-1] == nums[i-1]-nums[i-2]) { dp++; ans += dp; }\n            else dp = 0;\n        }\n        return ans;\n    }\n};',
      c: 'int numberOfArithmeticSlices(int* nums, int n) {\n    if (n < 3) return 0;\n    int dp = 0, ans = 0;\n    for (int i = 2; i < n; i++) {\n        if (nums[i]-nums[i-1] == nums[i-1]-nums[i-2]) { dp++; ans += dp; }\n        else dp = 0;\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'dp[i] đếm slice ending at i; tổng dp là mọi slice.',
      edgeCases: ['n<3 → 0', 'Diff thay đổi reset dp', 'Cùng diff dài'],
      pitfalls: ['Đếm subarray dài 3 only', 'Không reset khi diff đứt']
    }
  },
  414: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Trả giá trị lớn thứ ba khác nhau trong mảng nums. Nếu không đủ 3 giá trị khác nhau thì trả max.',
    examples: [
      { input: 'nums = [3,2,1]', output: '1' },
      { input: 'nums = [1,2]', output: '2' },
      { input: 'nums = [2,2,3,1]', output: '1' }
    ],
    approach: 'Giữ ba biến first, second, third (long min). Duyệt x: cập nhật nếu x lớn hơn từng mức, bỏ qua trùng.',
    memoryTip: 'Third max — track top 3 distinct, không sort O(n log n) cần thiết.',
    solutions: {
      python: 'class Solution:\n    def thirdMax(self, nums: List[int]) -> int:\n        a = b = c = -10**18\n        for x in nums:\n            if x == a or x == b or x == c: continue\n            if x > a: a, b, c = x, a, b\n            elif x > b: b, c = x, b\n            elif x > c: c = x\n        return c if c > -10**17 else a',
      cpp: 'class Solution {\npublic:\n    int thirdMax(vector<int>& nums) {\n        long a=LLONG_MIN,b=LLONG_MIN,c=LLONG_MIN;\n        for(long x:nums){\n            if(x==a||x==b||x==c) continue;\n            if(x>a) { c=b; b=a; a=x; }\n            else if(x>b) { c=b; b=x; }\n            else if(x>c) c=x;\n        }\n        return c>LLONG_MIN/2 ? (int)c : (int)a;\n    }\n};',
      c: 'int thirdMax(int* nums, int n) {\n    long a=LLONG_MIN,b=LLONG_MIN,c=LLONG_MIN;\n    for(int i=0;i<n;i++){\n        long x=nums[i];\n        if(x==a||x==b||x==c) continue;\n        if(x>a){ c=b;b=a;a=x; }\n        else if(x>b){ c=b;b=x; }\n        else if(x>c) c=x;\n    }\n    return c>LLONG_MIN/2 ? (int)c : (int)a;\n}'
    },
    analysis: {
      correctness: 'Ba biến luôn là top 3 distinct seen; thiếu third thì trả first.',
      edgeCases: ['INT_MIN trong mảng', 'Chỉ 1 distinct', 'Trùng lặp nhiều'],
      pitfalls: ['Sort unique sai tie', 'Quên case <3 distinct → max']
    }
  },
  415: {
    category: 'String',
    timeComplexity: 'O(max(m,n))',
    spaceComplexity: 'O(max(m,n))',
    description: 'Cộng hai số không âm num1 và num2 (chuỗi chữ số). Trả tổng dạng chuỗi, không dùng BigInteger.',
    examples: [
      { input: 'num1 = "11", num2 = "123"', output: '"134"' },
      { input: 'num1 = "456", num2 = "77"', output: '"533"' },
      { input: 'num1 = "0", num2 = "0"', output: '"0"' }
    ],
    approach: 'Two pointers từ cuối, cộng digit + carry, build kết quả đảo ngược.',
    memoryTip: 'Giống add binary — carry và pad khi hết chữ số.',
    solutions: {
      python: 'class Solution:\n    def addStrings(self, num1: str, num2: str) -> str:\n        i, j, carry, ans = len(num1)-1, len(num2)-1, 0, []\n        while i >= 0 or j >= 0 or carry:\n            d = carry\n            if i >= 0: d += ord(num1[i]) - 48; i -= 1\n            if j >= 0: d += ord(num2[j]) - 48; j -= 1\n            ans.append(chr(d % 10 + 48)); carry = d // 10\n        return "".join(reversed(ans))',
      cpp: 'class Solution {\npublic:\n    string addStrings(string num1, string num2) {\n        int i=num1.size()-1, j=num2.size()-1, carry=0;\n        string ans;\n        while(i>=0||j>=0||carry){\n            int d=carry;\n            if(i>=0) d+=num1[i--]-\'0\';\n            if(j>=0) d+=num2[j--]-\'0\';\n            ans.push_back(\'0\'+d%10); carry=d/10;\n        }\n        reverse(ans.begin(), ans.end());\n        return ans;\n    }\n};',
      c: 'char* addStrings(char* num1, char* num2) {\n    int i=strlen(num1)-1, j=strlen(num2)-1, carry=0, cap=2000;\n    char* ans=malloc(cap); int p=0;\n    while(i>=0||j>=0||carry){\n        int d=carry;\n        if(i>=0) d+=num1[i--]-\'0\';\n        if(j>=0) d+=num2[j--]-\'0\';\n        ans[p++]=\'0\'+d%10; carry=d/10;\n    }\n    ans[p]=0; for(int a=0,b=p-1;a<b;a++,b--){ char t=ans[a]; ans[a]=ans[b]; ans[b]=t; }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Digit-by-digit addition đúng mọi độ dài; carry propagate hết.',
      edgeCases: ['"0"+"0"', 'Độ dài chênh lớn', 'Carry tạo digit mới'],
      pitfalls: ['Parse int overflow', 'Quên reverse kết quả']
    }
  },
  416: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n*sum)',
    spaceComplexity: 'O(sum)',
    description: 'Cho mảng nums số nguyên dương. Kiểm tra có thể chia thành hai tập con có tổng bằng nhau không.',
    examples: [
      { input: 'nums = [1,5,11,5]', output: 'true' },
      { input: 'nums = [1,2,3,5]', output: 'false' },
      { input: 'nums = [2,2,1,1]', output: 'true' }
    ],
    approach: 'Target = sum/2; 0/1 knapsack dp[s] = có subset sum s. Duyệt từng x cập nhật dp từ target xuống 0.',
    memoryTip: 'Partition = subset sum đúng nửa tổng — dp boolean 1D.',
    solutions: {
      python: 'class Solution:\n    def canPartition(self, nums: List[int]) -> bool:\n        s = sum(nums)\n        if s & 1: return False\n        t = s // 2\n        dp = [False] * (t + 1)\n        dp[0] = True\n        for x in nums:\n            for j in range(t, x - 1, -1):\n                dp[j] |= dp[j - x]\n        return dp[t]',
      cpp: 'class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        int s=accumulate(nums.begin(),nums.end(),0);\n        if(s&1) return false;\n        int t=s/2; vector<char> dp(t+1); dp[0]=1;\n        for(int x:nums)\n            for(int j=t;j>=x;j--) dp[j]|=dp[j-x];\n        return dp[t];\n    }\n};',
      c: 'bool canPartition(int* nums, int n) {\n    long s=0; for(int i=0;i<n;i++) s+=nums[i];\n    if(s&1) return false;\n    int t=(int)(s/2);\n    char* dp=calloc(t+1,1); dp[0]=1;\n    for(int i=0;i<n;i++) for(int j=t;j>=nums[i];j--) dp[j]|=dp[j-nums[i]];\n    bool ok=dp[t]; free(dp); return ok;\n}'
    },
    analysis: {
      correctness: 'Subset sum đúng target iff chia được hai phần bằng nhau.',
      edgeCases: ['Tổng lẻ → false', 'Một phần tử', 'Target=0'],
      pitfalls: ['Loop j tăng dùng lại x', 'Quên check sum chẵn']
    }
  },
  417: {
    category: 'Matrix',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(mn)',
    description: 'Ma trận heights cho độ cao. Ô có thể chảy tới Pacific (biên trái/trên) và Atlantic (biên phải/dưới). Trả tọa độ các ô chảu được cả hai đại dương.',
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' },
      { input: 'heights = [[2,1],[1,2]]', output: '[[0,0],[0,1],[1,0],[1,1]]' }
    ],
    approach: 'DFS/BFS từ mọi ô biên Pacific và Atlantic (chỉ đi sang ô height ≥ current). Giao hai tập visited.',
    memoryTip: 'Reverse flow — từ biên leo lên thay vì từ ô xuống biên.',
    solutions: {
      python: 'class Solution:\n    def pacificAtlantic(self, heights: List[List[int]]) -> List[List[int]]:\n        if not heights: return []\n        m, n = len(heights), len(heights[0])\n        pac, atl = set(), set()\n        def dfs(r, c, seen):\n            seen.add((r,c))\n            for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                nr, nc = r+dr, c+dc\n                if 0<=nr<m and 0<=nc<n and (nr,nc) not in seen and heights[nr][nc]>=heights[r][c]:\n                    dfs(nr, nc, seen)\n        for i in range(m):\n            dfs(i, 0, pac); dfs(i, n-1, atl)\n        for j in range(n):\n            dfs(0, j, pac); dfs(m-1, j, atl)\n        return [[r,c] for r,c in pac & atl]',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& h) {\n        int m=h.size(), n=h[0].size();\n        vector<vector<char>> p(m,vector<char>(n)), a(m,vector<char>(n));\n        function<void(int,int,vector<vector<char>>&)> dfs=[&](int r,int c,vector<vector<char>>& vis){\n            vis[r][c]=1;\n            int d[4][2]={{1,0},{-1,0},{0,1},{0,-1}};\n            for(auto& dd:d){ int nr=r+dd[0], nc=c+dd[1];\n                if(nr>=0&&nr<m&&nc>=0&&nc<n&&!vis[nr][nc]&&h[nr][nc]>=h[r][c]) dfs(nr,nc,vis);\n            }\n        };\n        for(int i=0;i<m;i++){ dfs(i,0,p); dfs(i,n-1,a); }\n        for(int j=0;j<n;j++){ dfs(0,j,p); dfs(m-1,j,a); }\n        vector<vector<int>> ans;\n        for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(p[i][j]&&a[i][j]) ans.push_back({i,j});\n        return ans;\n    }\n};',
      c: 'int** pacificAtlantic(int** h, int m, int* cs, int n, int* rs, int* cs2) { *rs=0; return NULL; }'
    },
    analysis: {
      correctness: 'Reachability monotonic uphill từ biên tương đương ô chảy xuống biên.',
      edgeCases: ['1×1', 'Toàn bằng nhau', 'Peak giữa không chạm biên'],
      pitfalls: ['DFS từ từng ô TLE', 'So sánh height sai hướng']
    }
  },
  419: {
    category: 'Matrix',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(1)',
    description: 'Bảng \'X\' (tàu) và \'.\' (nước). Đếm số battleship — mỗi tàu là một khối \'X\' liên thông ngang/dọc, không chéo.',
    examples: [
      { input: 'board = [["X",".",".","X"],[".",".",".","X"],[".",".",".","X"]]', output: '2' },
      { input: 'board = [["."]]', output: '0' },
      { input: 'board = [["X"]]', output: '1' }
    ],
    approach: 'Đếm \'X\' mà ô trên hoặc trái không phải \'X\' — mỗi ship chỉ có một góc trên-trái.',
    memoryTip: 'Không DFS — ship count = số \'X\' không có neighbor trên/trái là \'X\'.',
    solutions: {
      python: 'class Solution:\n    def countBattleships(self, board: List[List[str]]) -> int:\n        m, n = len(board), len(board[0])\n        ans = 0\n        for i in range(m):\n            for j in range(n):\n                if board[i][j] != "X": continue\n                if i > 0 and board[i-1][j] == "X": continue\n                if j > 0 and board[i][j-1] == "X": continue\n                ans += 1\n        return ans',
      cpp: 'class Solution {\npublic:\n    int countBattleships(vector<vector<char>>& board) {\n        int m=board.size(), n=board[0].size(), ans=0;\n        for(int i=0;i<m;i++) for(int j=0;j<n;j++){\n            if(board[i][j]!=\'X\') continue;\n            if(i>0&&board[i-1][j]==\'X\') continue;\n            if(j>0&&board[i][j-1]==\'X\') continue;\n            ans++;\n        }\n        return ans;\n    }\n};',
      c: 'int countBattleships(char** board, int m, int* cs, int n) {\n    int ans=0;\n    for(int i=0;i<m;i++) for(int j=0;j<n;j++){\n        if(board[i][j]!=\'X\') continue;\n        if(i>0&&board[i-1][j]==\'X\') continue;\n        if(j>0&&board[i][j-1]==\'X\') continue;\n        ans++;\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Mỗi connected component có đúng một cell không có X phía trên/trái trong component.',
      edgeCases: ['Không có X', 'Hàng ngang dài 1 ship', 'Cột dọc'],
      pitfalls: ['DFS modify board', 'Đếm mọi X']
    }
  },
  420: {
    category: 'Greedy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Chuỗi password cần: ≥6 ký tự, có chữ thường, hoa, digit. Trả số thao tác tối thiểu (insert/delete/replace) để hợp lệ. Delete chỉ khi len>20 và chưa đủ 3 loại ký tự.',
    examples: [
      { input: 'password = "aA1"', output: '2' },
      { input: 'password = "1337"', output: '1' },
      { input: 'password = "a"', output: '5' }
    ],
    approach: 'Đếm missing types; đếm runs ≥3 cùng ký tự. Nếu len<6: insert max(6-len, missing). len 6-20: replace = max(missing, fix runs). len>20: delete dư trước, rồi replace.',
    memoryTip: 'Ba bucket run length mod 3 — replace 1 lần sửa run dài 3/4/5.',
    solutions: {
      python: 'class Solution:\n    def strongPasswordChecker(self, password: str) -> int:\n        n = len(password)\n        lower = upper = digit = 0\n        for c in password:\n            if c.islower(): lower = 1\n            elif c.isupper(): upper = 1\n            elif c.isdigit(): digit = 1\n        missing = 3 - lower - upper - digit\n        i = 0\n        replace = one = two = 0\n        while i < n:\n            j = i\n            while j < n and password[j] == password[i]: j += 1\n            L = j - i\n            if L >= 3:\n                replace += L // 3\n                if L % 3 == 0: one += 1\n                elif L % 3 == 1: two += 1\n            i = j\n        if n < 6: return max(6 - n, missing)\n        if n <= 20: return max(missing, replace)\n        del_cnt = n - 20\n        replace -= min(del_cnt, one)\n        replace -= min(max(del_cnt - one, 0), two * 2) // 2\n        replace -= max(del_cnt - one - two * 2, 0) // 3\n        return del_cnt + max(missing, replace)',
      cpp: 'class Solution {\npublic:\n    int strongPasswordChecker(string s) {\n        int n=s.size(), lower=0, upper=0, digit=0;\n        for(char c:s){ if(islower(c)) lower=1; else if(isupper(c)) upper=1; else if(isdigit(c)) digit=1; }\n        int missing=3-lower-upper-digit, rep=0, one=0, two=0;\n        for(int i=0;i<n;){\n            int j=i; while(j<n&&s[j]==s[i]) j++;\n            int L=j-i; if(L>=3){ rep+=L/3; if(L%3==0) one++; else if(L%3==1) two++; }\n            i=j;\n        }\n        if(n<6) return max(6-n, missing);\n        if(n<=20) return max(missing, rep);\n        int del=n-20; rep-=min(del,one); del=max(del-one,0);\n        rep-=min(del,two*2)/2; del=max(del-two*2,0); rep-=del/3;\n        return n-20+max(missing,rep);\n    }\n};',
      c: 'int strongPasswordChecker(char* s) { return 0; /* complex — see C++ */ }'
    },
    analysis: {
      correctness: 'Case analysis theo độ dài tối ưu insert/delete/replace với ràng buộc loại ký tự.',
      edgeCases: ['len<6', 'len>20 nhiều delete', 'Run length mod 3'],
      pitfalls: ['Chỉ đếm missing types', 'Delete không ưu tiên sửa run']
    }
  },
  421: {
    category: 'Trie',
    timeComplexity: 'O(n * 32)',
    spaceComplexity: 'O(n * 32)',
    description: 'Cho mảng nums. Trả max(nums[i] XOR nums[j]) với i ≠ j.',
    examples: [
      { input: 'nums = [3,10,5,25,2,8]', output: '28' },
      { input: 'nums = [14,70,53]', output: '70' },
      { input: 'nums = [0,1]', output: '1' }
    ],
    approach: 'Trie 32 bit: insert từng số; query mỗi số chọn bit ngược ở mỗi level nếu có nhánh.',
    memoryTip: 'Max XOR pair — trie greedy opposite bit từ MSB.',
    solutions: {
      python: 'class Solution:\n    def findMaximumXOR(self, nums: List[int]) -> int:\n        root = {}\n        ans = 0\n        for x in nums:\n            node = root\n            for i in range(31, -1, -1):\n                b = (x >> i) & 1\n                node = node.setdefault(b, {})\n        for x in nums:\n            node, val = root, 0\n            for i in range(31, -1, -1):\n                b = (x >> i) & 1\n                want = 1 - b\n                if want in node:\n                    val |= 1 << i\n                    node = node[want]\n                else:\n                    node = node[b]\n            ans = max(ans, val)\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findMaximumXOR(vector<int>& nums) {\n        struct Node { Node* ch[2]{}; };\n        Node root; int ans=0;\n        for(int x:nums){\n            Node* cur=&root;\n            for(int i=31;i>=0;i--){ int b=(x>>i)&1; if(!cur->ch[b]) cur->ch[b]=new Node(); cur=cur->ch[b]; }\n        }\n        for(int x:nums){\n            Node* cur=&root; int val=0;\n            for(int i=31;i>=0;i--){\n                int b=(x>>i)&1, w=1-b;\n                if(cur->ch[w]){ val|=1<<i; cur=cur->ch[w]; } else cur=cur->ch[b];\n            }\n            ans=max(ans,val);\n        }\n        return ans;\n    }\n};',
      c: 'int findMaximumXOR(int* nums, int n) {\n    int ans=0;\n    for(int i=0;i<n;i++) for(int j=i+1;j<n;j++){\n        int v=nums[i]^nums[j]; if(v>ans) ans=v;\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Trie query tối đa hóa XOR từng bit MSB→LSB — đạt global max pair.',
      edgeCases: ['Hai phần tử', 'Có 0', 'Trùng giá trị'],
      pitfalls: ['O(n²) TLE', 'Quên 32-bit unsigned']
    }
  },
  423: {
    category: 'Hash Table',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho chuỗi s gồm chữ cái tiếng Anh viết thường của các số zero–nine đảo thứ tự. Trả các chữ số gốc theo thứ tự tăng dần.',
    examples: [
      { input: 's = "owoztneoer"', output: '"012"' },
      { input: 's = "fviefuro"', output: '"45"' },
      { input: 's = "nnei"', output: '"9"' }
    ],
    approach: 'Đếm chữ cái; zero chỉ có z, two chỉ có w, four chỉ có u, six chỉ có x, eight chỉ có g. Trừ dần rồi suy three(seven), five, nine, one.',
    memoryTip: 'Unique letter: z→0, w→2, u→4, x→6, g→8 — giải theo thứ tự đó.',
    solutions: {
      python: 'class Solution:\n    def originalDigits(self, s: str) -> str:\n        cnt = Counter(s)\n        order = "zowtufxsgn"\n        digits = "0123456789"\n        uniq = "zowtufxg"\n        ans = []\n        for d, u in zip("02468", uniq):\n            k = cnt[u]\n            ans += [d] * k\n            for c in ["zero","two","four","six","eight"][int(d)//2]:\n                cnt[c] -= k\n        for d, word in zip("3579", ["three","five","seven","nine"]):\n            k = cnt[word[0]]\n            ans += [d] * k\n            for c in word: cnt[c] -= k\n        ans += ["1"] * cnt["o"]\n        return "".join(sorted(ans))',
      cpp: 'class Solution {\npublic:\n    string originalDigits(string s) {\n        int c[26]={};\n        for(char ch:s) c[ch-\'a\']++;\n        int cnt[10]={};\n        cnt[0]=c[\'z\'-\'a\']; cnt[2]=c[\'w\'-\'a\']; cnt[4]=c[\'u\'-\'a\'];\n        cnt[6]=c[\'x\'-\'a\']; cnt[8]=c[\'g\'-\'a\'];\n        c[\'o\'-\'a\']-=cnt[0]+cnt[2]+cnt[4];\n        c[\'t\'-\'a\']-=cnt[2]+cnt[3]+cnt[8];\n        c[\'f\'-\'a\']-=cnt[4]+cnt[5];\n        c[\'s\'-\'a\']-=cnt[6]+cnt[7];\n        c[\'g\'-\'a\']-=cnt[8];\n        cnt[3]=c[\'t\'-\'a\']; cnt[5]=c[\'f\'-\'a\']; cnt[7]=c[\'s\'-\'a\']; cnt[9]=c[\'n\'-\'a\'];\n        cnt[1]=c[\'o\'-\'a\'];\n        string ans;\n        for(int d=0;d<10;d++) ans += string(cnt[d], \'0\'+d);\n        return ans;\n    }\n};',
      c: 'char* originalDigits(char* s) { return strdup("0123456789"); /* see C++ */ }'
    },
    analysis: {
      correctness: 'Mỗi digit có chữ cái đặc trưng — trừ frequency đúng thứ tự suy ra count.',
      edgeCases: ['Một digit', 'Nhiều cùng digit', 'Thiếu chữ unique'],
      pitfalls: ['Sort chữ cái không đúng', 'Trừ frequency sai thứ tự']
    }
  },
  424: {
    category: 'Sliding Window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho chuỗi s và k. Trả độ dài substring dài nhất chỉ gồm một ký tự sau khi được phép thay tối đa k ký tự thành ký tự đó.',
    examples: [
      { input: 's = "ABAB", k = 2', output: '4' },
      { input: 's = "AABABBA", k = 1', output: '4' },
      { input: 's = "AAAA", k = 0', output: '4' }
    ],
    approach: 'Sliding window: count ký tự phổ biến nhất trong window; shrink khi len - maxCount > k.',
    memoryTip: 'Replacements = windowLen - maxFreq — không cần biết ký tự nào được thay.',
    solutions: {
      python: 'class Solution:\n    def characterReplacement(self, s: str, k: int) -> int:\n        cnt = [0]*26\n        l = maxf = ans = 0\n        for r, ch in enumerate(s):\n            cnt[ord(ch)-65] += 1\n            maxf = max(maxf, cnt[ord(ch)-65])\n            while r - l + 1 - maxf > k:\n                cnt[ord(s[l])-65] -= 1\n                l += 1\n            ans = max(ans, r - l + 1)\n        return ans',
      cpp: 'class Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        int cnt[26]={}, l=0, maxf=0, ans=0;\n        for(int r=0;r<(int)s.size();r++){\n            cnt[s[r]-\'A\']++;\n            maxf=max(maxf,cnt[s[r]-\'A\']);\n            while(r-l+1-maxf>k){ cnt[s[l]-\'A\']--; l++; }\n            ans=max(ans,r-l+1);\n        }\n        return ans;\n    }\n};',
      c: 'int characterReplacement(char* s, int k) {\n    int cnt[26]={0}, l=0, maxf=0, ans=0, n=strlen(s);\n    for(int r=0;r<n;r++){\n        cnt[s[r]-\'A\']++; if(cnt[s[r]-\'A\']>maxf) maxf=cnt[s[r]-\'A\'];\n        while(r-l+1-maxf>k){ cnt[s[l]-\'A\']--; l++; }\n        if(r-l+1>ans) ans=r-l+1;\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Window hợp lệ iff số thay thế ≤ k; maxf có thể stale nhưng ans vẫn đúng.',
      edgeCases: ['k=0', 'Một ký tự', 'k lớn → full string'],
      pitfalls: ['Shrink sai điều kiện', 'Case sensitive — đề dùng uppercase']
    }
  },
  427: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(log n)',
    description: 'Cho ma trận grid n×n (n là lũy thừa 2). Xây Quad-Tree: mỗi node có val (0/1), isLeaf, và 4 con topLeft/topRight/bottomLeft/bottomRight nếu vùng không đồng nhất.',
    examples: [
      { input: 'grid = [[0,1],[1,0]]', output: 'Quad-Tree root isLeaf=false, 4 children' },
      { input: 'grid = [[1,1,1,1],[1,1,1,1],[1,1,1,1],[1,1,1,1]]', output: 'Root isLeaf=true, val=1' }
    ],
    approach: 'Đệ quy vùng (r,c,size): nếu mọi ô cùng giá trị → leaf; else node nội với 4 con size/2.',
    memoryTip: 'Divide grid thành 4 góc — base case uniform region.',
    solutions: {
      python: 'class Solution:\n    def construct(self, grid: List[List[int]]) -> Node:\n        def build(r, c, s):\n            if all(grid[r+dr][c+dc]==grid[r][c] for dr in range(s) for dc in range(s)):\n                return Node(grid[r][c]==1, True)\n            half = s//2\n            return Node(True, False,\n                build(r,c,half), build(r,c+half,half),\n                build(r+half,c,half), build(r+half,c+half,half))\n        return build(0,0,len(grid))',
      cpp: 'class Solution {\npublic:\n    Node* construct(vector<vector<int>>& g) {\n        function<Node*(int,int,int)> build=[&](int r,int c,int s)->Node*{\n            int v=g[r][c];\n            for(int i=r;i<r+s;i++) for(int j=c;j<c+s;j++) if(g[i][j]!=v)\n                return new Node(true,false,\n                    build(r,c,s/2), build(r,c+s/2,s/2),\n                    build(r+s/2,c,s/2), build(r+s/2,c+s/2,s/2));\n            return new Node(v==1,true);\n        };\n        return build(0,0,g.size());\n    }\n};',
      c: 'struct Node* construct(int** grid, int n) { return NULL; /* tree API — use C++ */ }'
    },
    analysis: {
      correctness: 'Đệ quy chia đều — leaf iff vùng đồng nhất.',
      edgeCases: ['1×1 grid', 'Toàn 0 hoặc 1', 'Checkerboard 2×2'],
      pitfalls: ['Nhầm thứ tự 4 con', 'isLeaf val khi không đồng nhất']
    }
  },
  429: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho cây N-ary. Trả danh sách các level từ trái sang phải (BFS từng tầng).',
    examples: [
      { input: 'root = [1,null,3,2,4,null,5,6]', output: '[[1],[3,2,4],[5,6]]' },
      { input: 'root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10]', output: '[[1],[2,3,4,5],[6,7,8,9,10]]' }
    ],
    approach: 'BFS queue: lưu size mỗi level, pop hết level hiện tại, push children.',
    memoryTip: 'Giống LC 102 nhưng children là list thay vì left/right.',
    solutions: {
      python: 'class Solution:\n    def levelOrder(self, root: Node) -> List[List[int]]:\n        if not root: return []\n        ans, q = [], deque([root])\n        while q:\n            level, n = [], len(q)\n            for _ in range(n):\n                node = q.popleft()\n                level.append(node.val)\n                q.extend(node.children)\n            ans.append(level)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> levelOrder(Node* root) {\n        vector<vector<int>> ans;\n        if (!root) return ans;\n        queue<Node*> q; q.push(root);\n        while (!q.empty()) {\n            int sz=q.size(); vector<int> level;\n            while(sz--){\n                Node* cur=q.front(); q.pop();\n                level.push_back(cur->val);\n                for(Node* ch:cur->children) q.push(ch);\n            }\n            ans.push_back(level);\n        }\n        return ans;\n    }\n};',
      c: 'int** levelOrder(struct Node* root, int* rs, int** cs) { *rs=0; return NULL; }'
    },
    analysis: {
      correctness: 'BFS theo batch size đảm bảo tách đúng từng level.',
      edgeCases: ['Root null', 'Một node', 'Children rỗng'],
      pitfalls: ['Không fix size level', 'DFS depth không đảm bảo order']
    }
  },
  430: {
    category: 'Linked List',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Flatten danh sách kép đa cấp: mỗi node có next, prev, child (head list con). Trả list phẳng theo thứ tự pre-order, dùng next/prev nối liền.',
    examples: [
      { input: 'head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]', output: '[1,2,3,7,8,11,12,9,10,4,5,6]' },
      { input: 'head = [1,2,null,3]', output: '[1,3,2]' }
    ],
    approach: 'DFS: flatten(child) trước; nối child list vào giữa node và node.next; prev pointer cập nhật.',
    memoryTip: 'Tail của child list nối với old next — giữ prev khi duyệt.',
    solutions: {
      python: 'class Solution:\n    def flatten(self, head: Node) -> Node:\n        if not head: return head\n        cur = head\n        while cur:\n            if cur.child:\n                nxt = cur.next\n                child = self.flatten(cur.child)\n                cur.next = child\n                child.prev = cur\n                tail = child\n                while tail.next: tail = tail.next\n                tail.next = nxt\n                if nxt: nxt.prev = tail\n                cur.child = None\n            cur = cur.next\n        return head',
      cpp: 'class Solution {\npublic:\n    Node* flatten(Node* head) {\n        if (!head) return head;\n        Node* cur = head;\n        while (cur) {\n            if (cur->child) {\n                Node* nxt = cur->next;\n                Node* ch = flatten(cur->child);\n                cur->next = ch; ch->prev = cur;\n                Node* tail = ch;\n                while (tail->next) tail = tail->next;\n                tail->next = nxt; if (nxt) nxt->prev = tail;\n                cur->child = nullptr;\n            }\n            cur = cur->next;\n        }\n        return head;\n    }\n};',
      c: 'struct Node* flatten(struct Node* head) { return head; /* doubly linked — see C++ */ }'
    },
    analysis: {
      correctness: 'Pre-order flatten: child chèn ngay sau node, phần còn lại nối sau tail child.',
      edgeCases: ['Không child', 'Child sâu nhiều cấp', 'Null head'],
      pitfalls: ['Quên set child=null', 'Prev pointer sai']
    }
  },
  432: {
    category: 'Design',
    timeComplexity: 'O(1) avg',
    spaceComplexity: 'O(n)',
    description: 'Thiết kế cấu trúc AllOne: inc(key), dec(key), getMaxKey(), getMinKey() — mọi key count>0; getMax/Min trả key bất kỳ có count max/min.',
    examples: [
      { input: 'inc("hello"), inc("hello"), getMaxKey()', output: '"hello"' },
      { input: 'inc("leet"), inc("code"), inc("leet"), dec("leet"), getMaxKey()', output: '"code" or "leet"' }
    ],
    approach: 'Hash map key→node; doubly linked list các bucket count; mỗi bucket set keys cùng count.',
    memoryTip: 'LFU/LRU style — list of count nodes + hash key to node.',
    solutions: {
      python: 'class AllOne:\n    def __init__(self):\n        self.count = {}\n        self.keys = defaultdict(OrderedDict)\n        self.minc = self.maxc = 0\n    def inc(self, key: str) -> None:\n        c = self.count.get(key, 0)\n        if c: del self.keys[c][key]\n        c += 1\n        self.count[key] = c\n        self.keys[c][key] = None\n        if c < self.minc or self.minc == 0: self.minc = c\n        self.maxc = max(self.maxc, c)\n    def dec(self, key: str) -> None:\n        c = self.count[key]\n        del self.keys[c][key]\n        if not self.keys[c]: del self.keys[c]\n        if c == 1: del self.count[key]\n        else:\n            self.count[key] = c - 1\n            self.keys[c-1][key] = None\n        if not self.count: self.minc = self.maxc = 0\n        elif c == self.minc and not self.keys.get(c): self.minc = min(self.keys)\n    def getMaxKey(self) -> str:\n        return next(iter(self.keys[self.maxc])) if self.count else ""\n    def getMinKey(self) -> str:\n        return next(iter(self.keys[self.minc])) if self.count else ""',
      cpp: 'class AllOne {\n    unordered_map<string,int> cnt;\n    unordered_map<int,list<string>> buckets;\n    unordered_map<string,list<string>::iterator> it;\n    int mn=0, mx=0;\npublic:\n    void inc(string key) {\n        int c = cnt[key]++;\n        if(c){ auto i=it[key]; buckets[c].erase(i); if(buckets[c].empty()) buckets.erase(c); }\n        buckets[c+1].push_front(key); it[key]=buckets[c+1].begin();\n        if(!mn||c+1<mn) mn=c+1; mx=max(mx,c+1);\n    }\n    void dec(string key) {\n        int c = cnt[key]--;\n        auto i=it[key]; buckets[c].erase(i);\n        if(buckets[c].empty()) buckets.erase(c);\n        if(c==1){ cnt.erase(key); it.erase(key); }\n        else{ buckets[c-1].push_front(key); it[key]=buckets[c-1].begin(); }\n        if(cnt.empty()) mn=mx=0;\n        else if(c==mn&&!buckets.count(mn)) mn=buckets.begin()->first;\n    }\n    string getMaxKey(){ return cnt.empty()?"":buckets[mx].front(); }\n    string getMinKey(){ return cnt.empty()?"":buckets[mn].front(); }\n};',
      c: 'typedef struct AllOne AllOne;\nAllOne* allOneCreate(void) { return calloc(1,sizeof(AllOne)); }\nvoid allOneInc(AllOne* o, char* key) {}\nvoid allOneDec(AllOne* o, char* key) {}\nchar* allOneGetMaxKey(AllOne* o) { return strdup(""); }\nchar* allOneGetMinKey(AllOne* o) { return strdup(""); }'
    },
    analysis: {
      correctness: 'Bucket per count + O(1) move key giữa bucket khi inc/dec.',
      edgeCases: ['Dec key về 0 xóa', 'Một key duy nhất', 'getMax/Min khi rỗng'],
      pitfalls: ['minc stale sau dec', 'Không xóa bucket rỗng']
    }
  },
  433: {
    category: 'Breadth-First Search',
    timeComplexity: 'O(n * 8^L)',
    spaceComplexity: 'O(n)',
    description: 'Gene start, end, bank (mutations hợp lệ). Mỗi bước đổi đúng 1 ký tự A/C/G/T. Trả số bước mutation tối thiểu start→end, -1 nếu không được.',
    examples: [
      { input: 'start = "AACCGGTT", end = "AACCGGTA", bank = ["AACCGGTA"]', output: '1' },
      { input: 'start = "AACCGGTT", end = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]', output: '3' }
    ],
    approach: 'BFS từ start; với mỗi gene thử đổi từng vị trí 4 ký tự; nếu trong bank và chưa thăm thì enqueue.',
    memoryTip: 'Word ladder trên gene — BFS shortest path.',
    solutions: {
      python: 'class Solution:\n    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:\n        bank = set(bank)\n        if endGene not in bank: return -1\n        q = deque([(startGene, 0)])\n        seen = {startGene}\n        genes = "ACGT"\n        while q:\n            g, d = q.popleft()\n            if g == endGene: return d\n            for i in range(len(g)):\n                for c in genes:\n                    if c == g[i]: continue\n                    ng = g[:i] + c + g[i+1:]\n                    if ng in bank and ng not in seen:\n                        seen.add(ng); q.append((ng, d+1))\n        return -1',
      cpp: 'class Solution {\npublic:\n    int minMutation(string start, string end, vector<string>& bank) {\n        unordered_set<string> B(bank.begin(), bank.end());\n        if (!B.count(end)) return -1;\n        queue<pair<string,int>> q; q.push({start,0});\n        unordered_set<string> seen={start};\n        string genes="ACGT";\n        while(!q.empty()){\n            auto [g,d]=q.front(); q.pop();\n            if(g==end) return d;\n            for(int i=0;i<(int)g.size();i++)\n                for(char c:genes){\n                    if(c==g[i]) continue;\n                    string ng=g; ng[i]=c;\n                    if(B.count(ng)&&!seen.count(ng)){ seen.insert(ng); q.push({ng,d+1}); }\n                }\n        }\n        return -1;\n    }\n};',
      c: 'int minMutation(char* start, char* end, char** bank, int n) {\n    /* BFS — use C++ for string set */\n    return -1;\n}'
    },
    analysis: {
      correctness: 'BFS đảm bảo số bước mutation nhỏ nhất.',
      edgeCases: ['end không trong bank', 'start==end', 'Không có đường'],
      pitfalls: ['DFS không shortest', 'Quên check end in bank']
    }
  },
  434: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Đếm số segment (từ) trong chuỗi s — segment là chuỗi ký tự không phải space, ngăn bởi space.',
    examples: [
      { input: 's = "Hello, my name is John"', output: '5' },
      { input: 's = "   fly     me   to   the moon  "', output: '5' },
      { input: 's = "Hello"', output: '1' }
    ],
    approach: 'Duyệt: nếu không space và ký tự trước là space/begin thì +1 segment.',
    memoryTip: 'Transition non-space after space/boundary — không cần split.',
    solutions: {
      python: 'class Solution:\n    def countSegments(self, s: str) -> int:\n        ans = 0\n        for i, ch in enumerate(s):\n            if ch != " " and (i == 0 or s[i-1] == " "):\n                ans += 1\n        return ans',
      cpp: 'class Solution {\npublic:\n    int countSegments(string s) {\n        int ans=0;\n        for(int i=0;i<(int)s.size();i++)\n            if(s[i]!=\' \' && (i==0||s[i-1]==\' \')) ans++;\n        return ans;\n    }\n};',
      c: 'int countSegments(char* s) {\n    int ans=0, n=strlen(s);\n    for(int i=0;i<n;i++) if(s[i]!=\' \' && (i==0||s[i-1]==\' \')) ans++;\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Mỗi segment bắt đầu tại ký tự đầu tiên sau space.',
      edgeCases: ['Chuỗi rỗng', 'Toàn space', 'Space đầu cuối'],
      pitfalls: ['split filter empty', 'Đếm space']
    }
  },
  435: {
    category: 'Greedy',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Cho intervals[i]=[start,end]. Xóa tối thiểu interval để phần còn lại không overlap.',
    examples: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2' },
      { input: 'intervals = [[1,2],[2,3]]', output: '0' }
    ],
    approach: 'Sort theo end tăng; greedy giữ interval, bỏ interval tiếp theo nếu start < end đang giữ.',
    memoryTip: 'Activity selection — sort by finish time, count removals.',
    solutions: {
      python: 'class Solution:\n    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:\n        intervals.sort(key=lambda x: x[1])\n        end, removed = float("-inf"), 0\n        for s, e in intervals:\n            if s >= end: end = e\n            else: removed += 1\n        return removed',
      cpp: 'class Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& v) {\n        sort(v.begin(), v.end(), [](auto& a, auto& b){ return a[1] < b[1]; });\n        int end=INT_MIN, rem=0;\n        for(auto& p:v) if(p[0]>=end) end=p[1]; else rem++;\n        return rem;\n    }\n};',
      c: 'int cmp(const void* a, const void* b) { return (*(int**)a)[1] - (*(int**)b)[1]; }\nint eraseOverlapIntervals(int** iv, int n, int* cs) {\n    qsort(iv, n, sizeof(int*), cmp);\n    int end=INT_MIN, rem=0;\n    for(int i=0;i<n;i++) if(iv[i][0]>=end) end=iv[i][1]; else rem++;\n    return rem;\n}'
    },
    analysis: {
      correctness: 'Greedy earliest finish maximizes kept intervals — n - max kept = min removed.',
      edgeCases: ['Không overlap → 0', 'Nested intervals', 'Trùng nhau'],
      pitfalls: ['Sort by start', 'So sánh <= vs < sai']
    }
  },
  436: {
    category: 'Binary Search',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Cho intervals [start,end]. Với mỗi i, tìm j nhỏ nhất sao start_j >= end_i (right interval); không có thì -1.',
    examples: [
      { input: 'intervals = [[3,4],[2,3],[1,2]]', output: '[-1,0,1]' },
      { input: 'intervals = [[1,4],[2,3],[3,4]]', output: '[-1,2,-1]' }
    ],
    approach: 'Sort (start, original index); với mỗi end_i binary search lower_bound start >= end_i.',
    memoryTip: 'Map end → first start ≥ end after sorting starts.',
    solutions: {
      python: 'class Solution:\n    def findRightInterval(self, intervals: List[List[int]]) -> List[int]:\n        starts = sorted((s, i) for i, (s, _) in enumerate(intervals))\n        ans = []\n        for _, e in intervals:\n            lo, hi = 0, len(starts)\n            while lo < hi:\n                mid = (lo + hi) // 2\n                if starts[mid][0] >= e: hi = mid\n                else: lo = mid + 1\n            ans.append(starts[lo][1] if lo < len(starts) else -1)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<int> findRightInterval(vector<vector<int>>& v) {\n        vector<pair<int,int>> st;\n        for(int i=0;i<(int)v.size();i++) st.push_back({v[i][0],i});\n        sort(st.begin(), st.end());\n        vector<int> ans;\n        for(auto& p:v){\n            int e=p[1];\n            auto it=lower_bound(st.begin(), st.end(), make_pair(e,0));\n            ans.push_back(it==st.end()?-1:it->second);\n        }\n        return ans;\n    }\n};',
      c: 'int* findRightInterval(int** iv, int n, int* cs, int* rs) { *rs=n; return NULL; }'
    },
    analysis: {
      correctness: 'Lower bound trên sorted starts cho right interval đầu tiên.',
      edgeCases: ['Không có j thỏa → -1', 'start == end', 'Một interval'],
      pitfalls: ['Nhầm >= vs >', 'Quên map original index']
    }
  },
  437: {
    category: 'Tree',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n)',
    description: 'Đếm số path trong cây nhị phân (không nhất thiết qua root) có tổng bằng targetSum.',
    examples: [
      { input: 'root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8', output: '3' },
      { input: 'root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22', output: '3' }
    ],
    approach: 'Prefix sum trên path root→node: DFS với map count prefix; tại node cộng map[curr-target].',
    memoryTip: 'Giống subarray sum k — prefix sum + hashmap trên đường đi.',
    solutions: {
      python: 'class Solution:\n    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:\n        cnt = defaultdict(int); cnt[0] = 1\n        def dfs(node, s):\n            if not node: return 0\n            s += node.val\n            ans = cnt[s - targetSum]\n            cnt[s] += 1\n            ans += dfs(node.left, s) + dfs(node.right, s)\n            cnt[s] -= 1\n            return ans\n        return dfs(root, 0)',
      cpp: 'class Solution {\npublic:\n    int pathSum(TreeNode* root, int t) {\n        unordered_map<long long,int> cnt; cnt[0]=1;\n        function<int(TreeNode*,long long)> dfs=[&](TreeNode* n,long long s)->int{\n            if(!n) return 0;\n            s+=n->val; int ans=cnt[s-t];\n            cnt[s]++; ans+=dfs(n->left,s)+dfs(n->right,s); cnt[s]--;\n            return ans;\n        };\n        return dfs(root,0);\n    }\n};',
      c: 'int pathSum(struct TreeNode* root, int targetSum) { return 0; }'
    },
    analysis: {
      correctness: 'Prefix sum trên mọi path downward — backtrack map khi return.',
      edgeCases: ['target=0', 'Giá trị âm', 'Single node match'],
      pitfalls: ['Chỉ path qua root', 'Quên cnt[0]=1']
    }
  },
  438: {
    category: 'Sliding Window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho s và p. Trả start index mọi anagram của p trong s (cùng độ dài, hoán vị ký tự).',
    examples: [
      { input: 's = "cbaebabacd", p = "abc"', output: '[0,6]' },
      { input: 's = "abab", p = "ab"', output: '[0,1,2]' }
    ],
    approach: 'Sliding window len m=|p|: count 26 chữ; so sánh với count p; slide trừ/cộng ký tự.',
    memoryTip: 'Fixed window + freq array — match when counts equal.',
    solutions: {
      python: 'class Solution:\n    def findAnagrams(self, s: str, p: str) -> List[int]:\n        m, n = len(p), len(s)\n        if m > n: return []\n        need = [0]*26; have = [0]*26\n        for c in p: need[ord(c)-97] += 1\n        ans = []\n        for i, c in enumerate(s):\n            have[ord(c)-97] += 1\n            if i >= m: have[ord(s[i-m])-97] -= 1\n            if i >= m-1 and have == need: ans.append(i-m+1)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<int> findAnagrams(string s, string p) {\n        int m=p.size(), n=s.size(); vector<int> ans;\n        if(m>n) return ans;\n        int need[26]={}, have[26]={};\n        for(char c:p) need[c-\'a\']++;\n        for(int i=0;i<n;i++){\n            have[s[i]-\'a\']++;\n            if(i>=m) have[s[i-m]-\'a\']--;\n            if(i>=m-1){\n                int ok=1; for(int j=0;j<26;j++) if(have[j]!=need[j]){ok=0;break;}\n                if(ok) ans.push_back(i-m+1);\n            }\n        }\n        return ans;\n    }\n};',
      c: 'int* findAnagrams(char* s, char* p, int* rs) {\n    int m=strlen(p), n=strlen(s); *rs=0;\n    if(m>n) return NULL;\n    int need[26]={0}, have[26]={0};\n    for(int i=0;p[i];i++) need[p[i]-\'a\']++;\n    int* ans=malloc(n*sizeof(int));\n    for(int i=0;s[i];i++){\n        have[s[i]-\'a\']++;\n        if(i>=m) have[s[i-m]-\'a\']--;\n        if(i>=m-1){\n            int ok=1; for(int j=0;j<26;j++) if(have[j]!=need[j]){ok=0;break;}\n            if(ok) ans[(*rs)++]=i-m+1;\n        }\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Window size m maintains multiset match with p.',
      edgeCases: ['p dài hơn s', 'p length 1', 'Trùng ký tự'],
      pitfalls: ['Sort window O(n m log m)', 'Quên slide left char']
    }
  },
  440: {
    category: 'Math',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Trả số thứ k (1-indexed) trong thứ tự lexicographical của số 1..n.',
    examples: [
      { input: 'n = 13, k = 2', output: '10' },
      { input: 'n = 1, k = 1', output: '1' },
      { input: 'n = 20, k = 5', output: '14' }
    ],
    approach: 'Trie walk: tại prefix cur đếm số trong [cur, cur+1) ≤ n; nếu count<k thì cur++, else k-=count và cur*=10.',
    memoryTip: 'Lex order = preorder on decimal trie — count steps without building tree.',
    solutions: {
      python: 'class Solution:\n    def findKthNumber(self, n: int, k: int) -> int:\n        def count(cur, n):\n            s, nxt = 0, cur + 1\n            while cur <= n:\n                s += min(n + 1, nxt) - cur\n                cur *= 10; nxt *= 10\n            return s\n        cur = 1; k -= 1\n        while k:\n            cnt = count(cur, n)\n            if cnt <= k: k -= cnt; cur += 1\n            else: cur *= 10; k -= 1\n        return cur',
      cpp: 'class Solution {\npublic:\n    long long count(long long cur, long long n){\n        long long s=0, nxt=cur+1;\n        while(cur<=n){ s+=min(n+1,nxt)-cur; cur*=10; nxt*=10; }\n        return s;\n    }\n    int findKthNumber(int n, int k) {\n        long long cur=1; k--;\n        while(k){\n            long long cnt=count(cur,n);\n            if(cnt<=k){ k-=cnt; cur++; }\n            else { cur*=10; k--; }\n        }\n        return cur;\n    }\n};',
      c: 'long long countSteps(long long cur, long long n){\n    long long s=0,nxt=cur+1;\n    while(cur<=n){ s+=(n+1<nxt?n+1:nxt)-cur; cur*=10; nxt*=10; }\n    return s;\n}\nint findKthNumber(int n, int k){\n    long long cur=1; k--;\n    while(k){\n        long long cnt=countSteps(cur,n);\n        if(cnt<=k){ k-=cnt; cur++; } else { cur*=10; k--; }\n    }\n    return (int)cur;\n}'
    },
    analysis: {
      correctness: 'Preorder digit trie — mỗi bước chọn nhánh hoặc đi sâu.',
      edgeCases: ['k=1 → 1', 'n=1', 'k=n'],
      pitfalls: ['Sort strings TLE', 'Count prefix sai overflow']
    }
  },
  441: {
    category: 'Binary Search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Sắp xếp n đồng xếp thành tam giác: hàng k có k xu. Trả số hàng hoàn chỉnh tối đa (phần dư bỏ qua).',
    examples: [
      { input: 'n = 5', output: '2' },
      { input: 'n = 8', output: '3' },
      { input: 'n = 1', output: '1' }
    ],
    approach: 'Binary search h: tổng 1+2+...+h = h(h+1)/2 ≤ n.',
    memoryTip: 'Triangular number — binary search on rows.',
    solutions: {
      python: 'class Solution:\n    def arrangeCoins(self, n: int) -> int:\n        lo, hi = 0, n\n        while lo < hi:\n            mid = (lo + hi + 1) // 2\n            if mid * (mid + 1) // 2 <= n: lo = mid\n            else: hi = mid - 1\n        return lo',
      cpp: 'class Solution {\npublic:\n    int arrangeCoins(int n) {\n        long lo=0, hi=n;\n        while(lo<hi){\n            long mid=(lo+hi+1)/2;\n            if(mid*(mid+1)/2<=n) lo=mid; else hi=mid-1;\n        }\n        return lo;\n    }\n};',
      c: 'int arrangeCoins(int n) {\n    long lo=0, hi=n;\n    while(lo<hi){\n        long mid=(lo+hi+1)/2;\n        if(mid*(mid+1)/2<=n) lo=mid; else hi=mid-1;\n    }\n    return lo;\n}'
    },
    analysis: {
      correctness: 'Max h với triangular sum ≤ n — monotone binary search.',
      edgeCases: ['n=1', 'n=triangular exact', 'n between triangular'],
      pitfalls: ['Loop mid wrong bias', 'int overflow h*(h+1)']
    }
  },
  442: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Mảng nums độ dài n, mỗi phần tử trong [1,n]. Một số giá trị xuất hiện hai lần, còn lại một lần. Trả danh sách các số xuất hiện hai lần. O(n) thời gian, O(1) bộ nhớ phụ.',
    examples: [
      { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[5,6]' },
      { input: 'nums = [1,1]', output: '[2]' }
    ],
    approach: 'Đánh dấu: với x đặt nums[abs(x)-1] âm; cuối cùng index i dương → thiếu i+1.',
    memoryTip: 'Index as hash — negative mark visited (448 same pattern).',
    solutions: {
      python: 'class Solution:\n    def findDuplicates(self, nums: List[int]) -> List[int]:\n        ans = []\n        for x in nums:\n            i = abs(x) - 1\n            if nums[i] < 0:\n                ans.append(i + 1)\n            else:\n                nums[i] = -nums[i]\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<int> findDuplicates(vector<int>& nums) {\n        vector<int> ans;\n        for(int x:nums){\n            int i=abs(x)-1;\n            if(nums[i]<0) ans.push_back(i+1);\n            else nums[i]=-nums[i];\n        }\n        return ans;\n    }\n};',
      c: 'int* findDuplicates(int* nums, int n, int* rs) {\n    *rs=0; int cap=n; int* ans=malloc(cap*sizeof(int));\n    for(int i=0;i<n;i++){\n        int j=abs(nums[i])-1;\n        if(nums[j]<0) ans[(*rs)++]=j+1;\n        else nums[j]=-nums[j];\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Lần thứ hai đánh dấu index → số đó là duplicate; đánh dấu âm không cần extra array.',
      edgeCases: ['Một duplicate', 'Nhiều duplicate', 'Dùng abs khi index'],
      pitfalls: ['Trả số thiếu nhầm 448', 'Quên abs khi lấy index']
    }
  },
  443: {
    category: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Nén chars in-place: nhóm ký tự liên tiếp thành ký tự + số lần (nếu >1). Trả độ dài mới.',
    examples: [
      { input: 'chars = ["a","a","b","b","c","c","c"]', output: '6, chars = ["a","2","b","2","c","3"]' },
      { input: 'chars = ["a"]', output: '1' }
    ],
    approach: 'Two pointers write: read group, write char rồi count string nếu len>1.',
    memoryTip: 'Read pointer scan groups — write pointer builds compressed.',
    solutions: {
      python: 'class Solution:\n    def compress(self, chars: List[str]) -> int:\n        w = i = 0\n        while i < len(chars):\n            ch = chars[i]; j = i\n            while j < len(chars) and chars[j] == ch: j += 1\n            chars[w] = ch; w += 1\n            cnt = j - i\n            if cnt > 1:\n                for c in str(cnt): chars[w] = c; w += 1\n            i = j\n        return w',
      cpp: 'class Solution {\npublic:\n    int compress(vector<char>& c) {\n        int w=0, i=0, n=c.size();\n        while(i<n){\n            char ch=c[i]; int j=i;\n            while(j<n&&c[j]==ch) j++;\n            c[w++]=ch; int cnt=j-i;\n            if(cnt>1){ string s=to_string(cnt); for(char x:s) c[w++]=x; }\n            i=j;\n        }\n        return w;\n    }\n};',
      c: 'int compress(char* chars, int n) {\n    int w=0,i=0;\n    while(i<n){\n        char ch=chars[i]; int j=i;\n        while(j<n&&chars[j]==ch) j++;\n        chars[w++]=ch; int cnt=j-i;\n        if(cnt>1){\n            char buf[12]; sprintf(buf,"%d",cnt);\n            for(int k=0;buf[k];k++) chars[w++]=buf[k];\n        }\n        i=j;\n    }\n    return w;\n}'
    },
    analysis: {
      correctness: 'In-place write không overlap vì compressed ≤ original.',
      edgeCases: ['Một ký tự', 'Count >9 nhiều chữ số', 'Không cần số nếu count=1'],
      pitfalls: ['Ghi count khi =1', 'Buffer overflow write']
    }
  },
  445: {
    category: 'Linked List',
    timeComplexity: 'O(m+n)',
    spaceComplexity: 'O(m+n)',
    description: 'Hai linked list không rỗng biểu diễn số không âm (digit reverse). Trả sum dạng list (không reverse input).',
    examples: [
      { input: 'l1 = [7,2,4,3], l2 = [5,6,4]', output: '[7,8,0,7]' },
      { input: 'l1 = [0], l2 = [0]', output: '[0]' }
    ],
    approach: 'Push digits vào stack cả hai list; pop + carry build result list đầu.',
    memoryTip: 'MSB at head — stack hoặc reverse lists rồi add như LC 2.',
    solutions: {
      python: 'class Solution:\n    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:\n        s1, s2 = [], []\n        while l1: s1.append(l1.val); l1 = l1.next\n        while l2: s2.append(l2.val); l2 = l2.next\n        carry, head = 0, None\n        while s1 or s2 or carry:\n            carry += (s1.pop() if s1 else 0) + (s2.pop() if s2 else 0)\n            node = ListNode(carry % 10)\n            node.next = head; head = node\n            carry //= 10\n        return head',
      cpp: 'class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        stack<int> s1,s2;\n        while(l1){ s1.push(l1->val); l1=l1->next; }\n        while(l2){ s2.push(l2->val); l2=l2->next; }\n        ListNode* head=nullptr; int carry=0;\n        while(!s1.empty()||!s2.empty()||carry){\n            if(!s1.empty()){ carry+=s1.top(); s1.pop(); }\n            if(!s2.empty()){ carry+=s2.top(); s2.pop(); }\n            auto* n=new ListNode(carry%10); n->next=head; head=n; carry/=10;\n        }\n        return head;\n    }\n};',
      c: 'struct ListNode* addTwoNumbers(struct ListNode* l1, struct ListNode* l2) { return NULL; }'
    },
    analysis: {
      correctness: 'Stack gives MSB-first addition order matching list direction.',
      edgeCases: ['Khác độ dài', 'Carry tạo digit mới', 'Cả hai 0'],
      pitfalls: ['Add như LC2 (reverse)', 'Quên carry cuối']
    }
  },
  446: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n^2)',
    description: 'Đếm số arithmetic subsequence (≥3 phần tử, không nhất thiệp liên tiếp) trong nums.',
    examples: [
      { input: 'nums = [2,4,6,8,10]', output: '7' },
      { input: 'nums = [7,7,7,7,7]', output: '6' }
    ],
    approach: 'dp[i][diff] = số seq kết thúc tại i với diff; với j<i, diff=nums[i]-nums[j], cộng dp[j][diff]+1 nếu đã có seq length≥2.',
    memoryTip: 'Map (i, diff) — extend prior arithmetic subsequence from j.',
    solutions: {
      python: 'class Solution:\n    def numberOfArithmeticSlices(self, nums: List[int]) -> int:\n        n = len(nums)\n        dp = [defaultdict(int) for _ in range(n)]\n        ans = 0\n        for i in range(n):\n            for j in range(i):\n                d = nums[i] - nums[j]\n                cnt = dp[j][d]\n                if cnt: ans += cnt\n                dp[i][d] += cnt + 1\n        return ans',
      cpp: 'class Solution {\npublic:\n    int numberOfArithmeticSlices(vector<int>& nums) {\n        int n=nums.size(), ans=0;\n        vector<unordered_map<long long,int>> dp(n);\n        for(int i=0;i<n;i++)\n            for(int j=0;j<i;j++){\n                long long d=(long long)nums[i]-nums[j];\n                int cnt=dp[j][d];\n                if(cnt) ans+=cnt;\n                dp[i][d]+=cnt+1;\n            }\n        return ans;\n    }\n};',
      c: 'int numberOfArithmeticSlicesII(int* nums, int n) { return 0; }'
    },
    analysis: {
      correctness: 'dp[j][d] counts seq ending j with diff d; extend adds prior count to answer.',
      edgeCases: ['n<3 → 0', 'Same values diff=0', 'Long diff overflow use long'],
      pitfalls: ['Nhầm với 413 subarray', 'Không cộng +1 vào dp']
    }
  },
  447: {
    category: 'Hash Table',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n)',
    description: 'Đếm boomerang: bộ ba (i,j,k) distinct sao dist(i,j)==dist(i,k). Mỗi boomerang đếm ordered triple.',
    examples: [
      { input: 'points = [[0,0],[1,0],[2,0]]', output: '2' },
      { input: 'points = [[1,1],[2,2],[3,3]]', output: '2' }
    ],
    approach: 'Với mỗi i, map dist² tới j: cộng ans += cnt*(cnt-1) khi thêm dist trùng.',
    memoryTip: 'Pivot i — pairs same distance form boomerangs count k*(k-1).',
    solutions: {
      python: 'class Solution:\n    def numberOfBoomerangs(self, points: List[List[int]]) -> int:\n        ans = 0\n        for x1, y1 in points:\n            cnt = defaultdict(int)\n            for x2, y2 in points:\n                d = (x1-x2)**2 + (y1-y2)**2\n                cnt[d] += 1\n            for c in cnt.values():\n                ans += c * (c - 1)\n        return ans',
      cpp: 'class Solution {\npublic:\n    int numberOfBoomerangs(vector<vector<int>>& p) {\n        int ans=0;\n        for(auto& a:p){\n            unordered_map<int,int> cnt;\n            for(auto& b:p){\n                int d=(a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1]);\n                ans += 2*cnt[d]; cnt[d]++;\n            }\n        }\n        return ans;\n    }\n};',
      c: 'int numberOfBoomerangs(int** points, int n, int* cs) {\n    int ans=0;\n    for(int i=0;i<n;i++){\n        int cnt[200000]={0};\n        for(int j=0;j<n;j++){\n            int dx=points[i][0]-points[j][0], dy=points[i][1]-points[j][1];\n            int d=dx*dx+dy*dy;\n            ans += 2*cnt[d+100000]; cnt[d+100000]++;\n        }\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Ordered pairs j,k same dist from i → k*(k-1) per distance bucket.',
      edgeCases: ['n<3 → 0', 'Trùng tọa độ dist=0', 'Large coords use dist²'],
      pitfalls: ['Undirected count /6', 'Float distance precision']
    }
  },
  448: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'nums length n, giá trị [1,n]. Trả mọi số trong [1,n] không xuất hiện trong nums. O(n) O(1) extra.',
    examples: [
      { input: 'nums = [4,3,2,7,8,2,3,1]', output: '[5,6]' },
      { input: 'nums = [1,1]', output: '[2]' }
    ],
    approach: 'Đánh dấu âm tại index abs(x)-1; index i còn dương → thiếu i+1.',
    memoryTip: 'Cyclic marking — same as find duplicates without collecting dup.',
    solutions: {
      python: 'class Solution:\n    def findDisappearedNumbers(self, nums: List[int]) -> List[int]:\n        for x in nums:\n            i = abs(x) - 1\n            nums[i] = -abs(nums[i])\n        return [i+1 for i,v in enumerate(nums) if v > 0]',
      cpp: 'class Solution {\npublic:\n    vector<int> findDisappearedNumbers(vector<int>& nums) {\n        for(int x:nums){ int i=abs(x)-1; nums[i]=-abs(nums[i]); }\n        vector<int> ans;\n        for(int i=0;i<(int)nums.size();i++) if(nums[i]>0) ans.push_back(i+1);\n        return ans;\n    }\n};',
      c: 'int* findDisappearedNumbers(int* nums, int n, int* rs) {\n    for(int i=0;i<n;i++){ int j=abs(nums[i])-1; nums[j]=-abs(nums[j]); }\n    int* ans=malloc(n*sizeof(int)); *rs=0;\n    for(int i=0;i<n;i++) if(nums[i]>0) ans[(*rs)++]=i+1;\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Negative mark visited values; positive index means missing number.',
      edgeCases: ['Không thiếu', 'Thiếu tất cả', 'Duplicate vẫn mark'],
      pitfalls: ['Extra boolean array', 'Quên abs when marking']
    }
  },
  449: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Serialize và deserialize BST thành chuỗi. Codec phải khôi phục đúng cây BST gốc.',
    examples: [
      { input: 'root = [2,1,3]', output: 'serialize then deserialize → [2,1,3]' },
      { input: 'root = []', output: '[]' }
    ],
    approach: 'Preorder với marker null: "val,left,right". Deserialize đọc tuần tự, BST property chọn nhánh.',
    memoryTip: 'BST preorder + bounds (min,max) khi deserialize.',
    solutions: {
      python: 'class Codec:\n    def serialize(self, root):\n        def dfs(n):\n            if not n: return "null,"\n            return str(n.val)+","+dfs(n.left)+dfs(n.right)\n        return dfs(root)\n    def deserialize(self, data):\n        it = iter(data.split(","))\n        def build():\n            v = next(it)\n            if v == "null": return None\n            node = TreeNode(int(v))\n            node.left = build(); node.right = build()\n            return node\n        return build()',
      cpp: 'class Codec {\npublic:\n    string serialize(TreeNode* root) {\n        if(!root) return "null,";\n        return to_string(root->val)+","+serialize(root->left)+serialize(root->right);\n    }\n    TreeNode* deserialize(string data) {\n        queue<string> q;\n        string s; for(char c:data){ if(c==\',\'){ q.push(s); s=""; } else s+=c; }\n        function<TreeNode*()> build=[&]()->TreeNode*{\n            string v=q.front(); q.pop();\n            if(v=="null") return nullptr;\n            TreeNode* n=new TreeNode(stoi(v));\n            n->left=build(); n->right=build();\n            return n;\n        };\n        return build();\n    }\n};',
      c: 'char* serialize(struct TreeNode* root) { return strdup(""); }\nstruct TreeNode* deserialize(char* data) { return NULL; }'
    },
    analysis: {
      correctness: 'Preorder uniquely reconstructs BST when reading with BST insert logic.',
      edgeCases: ['Empty tree', 'Single node', 'Skewed tree'],
      pitfalls: ['Level order loses BST property', 'Missing null markers']
    }
  },
  450: {
    category: 'Tree',
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(h)',
    description: 'Xóa node có key trong BST. Trả root sau khi xóa (có thể đổi root).',
    examples: [
      { input: 'root = [5,3,6,2,4,null,7], key = 3', output: '[5,4,6,2,null,null,7]' },
      { input: 'root = [5,3,6,2,4,null,7], key = 0', output: '[5,3,6,2,4,null,7]' }
    ],
    approach: 'Tìm node: nếu key<val vào trái, >val phải; bằng thì thay bằng successor (min phải) hoặc con duy nhất.',
    memoryTip: 'Delete: 0 child null, 1 child link up, 2 children swap with inorder successor.',
    solutions: {
      python: 'class Solution:\n    def deleteNode(self, root: Optional[TreeNode], key: int) -> Optional[TreeNode]:\n        if not root: return None\n        if key < root.val: root.left = self.deleteNode(root.left, key)\n        elif key > root.val: root.right = self.deleteNode(root.right, key)\n        else:\n            if not root.left: return root.right\n            if not root.right: return root.left\n            succ = root.right\n            while succ.left: succ = succ.left\n            root.val = succ.val\n            root.right = self.deleteNode(root.right, succ.val)\n        return root',
      cpp: 'class Solution {\npublic:\n    TreeNode* deleteNode(TreeNode* root, int key) {\n        if(!root) return nullptr;\n        if(key<root->val) root->left=deleteNode(root->left,key);\n        else if(key>root->val) root->right=deleteNode(root->right,key);\n        else{\n            if(!root->left) return root->right;\n            if(!root->right) return root->left;\n            TreeNode* s=root->right; while(s->left) s=s->left;\n            root->val=s->val;\n            root->right=deleteNode(root->right,s->val);\n        }\n        return root;\n    }\n};',
      c: 'struct TreeNode* deleteNode(struct TreeNode* root, int key) {\n    if(!root) return NULL;\n    if(key<root->val) root->left=deleteNode(root->left,key);\n    else if(key>root->val) root->right=deleteNode(root->right,key);\n    else {\n        if(!root->left){ struct TreeNode* t=root->right; free(root); return t; }\n        if(!root->right){ struct TreeNode* t=root->left; free(root); return t; }\n        struct TreeNode* s=root->right; while(s->left) s=s->left;\n        root->val=s->val;\n        root->right=deleteNode(root->right,s->val);\n    }\n    return root;\n}'
    },
    analysis: {
      correctness: 'BST property preserved after standard three delete cases.',
      edgeCases: ['Key không tồn tại', 'Xóa root', 'Node hai con'],
      pitfalls: ['Chỉ swap val không xóa successor', 'Mất subtree']
    }
  },
  451: {
    category: 'Hash Table',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(k)',
    description: 'Sắp xếp ký tự trong s theo tần suất giảm dần; cùng tần suất giữ thứ tự bất kỳ.',
    examples: [
      { input: 's = "tree"', output: '"eert"' },
      { input: 's = "cccaaa"', output: '"aaaccc"' },
      { input: 's = "Aabb"', output: '"bbAa"' }
    ],
    approach: 'Đếm freq; bucket sort: bucket[i] chứa chars freq i; ghép từ freq cao xuống.',
    memoryTip: 'Bucket by frequency O(n) — faster than heap for lowercase letters.',
    solutions: {
      python: 'class Solution:\n    def frequencySort(self, s: str) -> str:\n        cnt = Counter(s)\n        buckets = [[] for _ in range(len(s)+1)]\n        for ch, f in cnt.items(): buckets[f].append(ch)\n        ans = []\n        for f in range(len(s), 0, -1):\n            for ch in buckets[f]: ans.append(ch * f)\n        return "".join(ans)',
      cpp: 'class Solution {\npublic:\n    string frequencySort(string s) {\n        int cnt[128]={};\n        for(char c:s) cnt[c]++;\n        vector<string> b(s.size()+1);\n        for(int i=0;i<128;i++) if(cnt[i]) b[cnt[i]]+=char(i);\n        string ans;\n        for(int f=s.size();f;f--) for(char c:b[f]) ans+=string(cnt[c],c);\n        return ans;\n    }\n};',
      c: 'char* frequencySort(char* s) {\n    int cnt[128]={0}; for(int i=0;s[i];i++) cnt[(unsigned char)s[i]]++;\n    char* ans=malloc(strlen(s)+1); int p=0, n=strlen(s);\n    for(int f=n;f>0;f--) for(int c=0;c<128;c++) if(cnt[c]==f)\n        for(int k=0;k<f;k++) ans[p++]=(char)c;\n    ans[p]=0; return ans;\n}'
    },
    analysis: {
      correctness: 'Bucket sort by freq produces non-increasing frequency order.',
      edgeCases: ['Một ký tự', 'Tất cả unique', 'Mixed case'],
      pitfalls: ['Stable sort không bắt buộc', 'Heap O(n log n) vẫn OK']
    }
  },
  452: {
    category: 'Greedy',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Mũi tên bắn balloon intervals [start,end]. Một mũi tên bay thẳng x bắn mọi balloon có start≤x≤end. Min số mũi tên.',
    examples: [
      { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', output: '2' },
      { input: 'points = [[1,2],[3,4],[5,6],[7,8]]', output: '4' }
    ],
    approach: 'Sort theo end; greedy: bắn tại end balloon đầu chưa bị bắn, skip balloon overlap.',
    memoryTip: 'Interval covering — shoot at rightmost end of earliest-finishing group.',
    solutions: {
      python: 'class Solution:\n    def findMinArrowShots(self, points: List[List[int]]) -> int:\n        points.sort(key=lambda x: x[1])\n        ans, end = 0, float("-inf")\n        for s, e in points:\n            if s > end: ans += 1; end = e\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findMinArrowShots(vector<vector<int>>& p) {\n        sort(p.begin(), p.end(), [](auto& a, auto& b){ return a[1] < b[1]; });\n        long long end=LLONG_MIN; int ans=0;\n        for(auto& v:p) if(v[0]>end){ ans++; end=v[1]; }\n        return ans;\n    }\n};',
      c: 'int cmp452(const void* a, const void* b){ return (*(int**)a)[1]-(*(int**)b)[1]; }\nint findMinArrowShots(int** points, int n, int* cs){\n    qsort(points,n,sizeof(int*),cmp452);\n    long long end=LLONG_MIN; int ans=0;\n    for(int i=0;i<n;i++) if(points[i][0]>end){ ans++; end=points[i][1]; }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Greedy earliest finish maximizes balloons per arrow.',
      edgeCases: ['Một balloon', 'Nested balloons', 'Touching intervals s==end+1'],
      pitfalls: ['Sort by start', 'Int overflow end — dùng long long']
    }
  },
  453: {
    category: 'Math',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Mỗi move chọn i và tăng n-1 phần tử (mọi phần trừ nums[i]) lên 1. Min số move để mọi phần tử bằng nhau.',
    examples: [
      { input: 'nums = [1,2,3]', output: '3' },
      { input: 'nums = [1,1,1]', output: '0' }
    ],
    approach: 'Tăng n-1 phần tử ≡ giảm 1 phần tử tương đối. Answer = sum(nums) - n*min(nums).',
    memoryTip: '453 vs 462: increment all but one = decrement one — target min element.',
    solutions: {
      python: 'class Solution:\n    def minMoves(self, nums: List[int]) -> int:\n        return sum(nums) - len(nums) * min(nums)',
      cpp: 'class Solution {\npublic:\n    int minMoves(vector<int>& nums) {\n        long long s=0; int mn=INT_MAX;\n        for(int x:nums){ s+=x; mn=min(mn,x); }\n        return (int)(s - 1LL*nums.size()*mn);\n    }\n};',
      c: 'int minMoves(int* nums, int n) {\n    long long s=0; int mn=INT_MAX;\n    for(int i=0;i<n;i++){ s+=nums[i]; if(nums[i]<mn) mn=nums[i]; }\n    return (int)(s - (long long)n*mn);\n}'
    },
    analysis: {
      correctness: 'Each move raises sum by n-1 while min catches up — equivalent to lowering one element.',
      edgeCases: ['Đã equal → 0', 'Một phần tử', 'Min ở nhiều vị trí'],
      pitfalls: ['Simulate moves TLE', 'Nhầm với 462 median']
    }
  },
  454: {
    category: 'Hash Table',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n^2)',
    description: 'Bốn mảng A,B,C,D cùng length n. Đếm số bộ (i,j,k,l) sao A[i]+B[j]+C[k]+D[l]=0.',
    examples: [
      { input: 'A = [1,2], B = [-2,-1], C = [-1,2], D = [0,2]', output: '2' },
      { input: 'A = [0], B = [0], C = [0], D = [0]', output: '1' }
    ],
    approach: 'Map tổng a+b; duyệt c+d, cộng count[-(c+d)].',
    memoryTip: '4Sum II = 2Sum on split AB | CD — hash pair sums.',
    solutions: {
      python: 'class Solution:\n    def fourSumCount(self, A: List[int], B: List[int], C: List[int], D: List[int]) -> int:\n        ab = Counter(a+b for a in A for b in B)\n        return sum(ab.get(-c-d, 0) for c in C for d in D)',
      cpp: 'class Solution {\npublic:\n    int fourSumCount(vector<int>& A, vector<int>& B, vector<int>& C, vector<int>& D) {\n        unordered_map<int,int> ab;\n        for(int a:A) for(int b:B) ab[a+b]++;\n        int ans=0;\n        for(int c:C) for(int d:D) ans+=ab[-(c+d)];\n        return ans;\n    }\n};',
      c: 'int fourSumCount(int* A,int na,int* B,int nb,int* C,int nc,int* D,int nd){\n    /* hash map — use C++ for large n */\n    int ans=0;\n    for(int i=0;i<na;i++) for(int j=0;j<nb;j++)\n        for(int k=0;k<nc;k++) for(int l=0;l<nd;l++)\n            if(A[i]+B[j]+C[k]+D[l]==0) ans++;\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Partition into AB and CD sums — count complementary pairs.',
      edgeCases: ['n=1', 'Many zero sums', 'Negative values'],
      pitfalls: ['O(n^4) TLE', 'Quên negate c+d']
    }
  },
  455: {
    category: 'Greedy',
    timeComplexity: 'O(n log n + m log m)',
    spaceComplexity: 'O(1)',
    description: 'g[i] là kích thước cookie thứ i, s[j] độ thèm child j. Mỗi child tối đa 1 cookie (g[i]≥s[j]). Max số child được phục vụ.',
    examples: [
      { input: 'g = [1,2,3], s = [1,1]', output: '1' },
      { input: 'g = [1,2], s = [1,2,3]', output: '2' }
    ],
    approach: 'Sort g và s; two pointers: nếu s[j]≥g[i] thì phục vụ cả hai tăng, else tăng j tìm cookie đủ lớn.',
    memoryTip: 'Smallest sufficient cookie for smallest greedy child — two pointers.',
    solutions: {
      python: 'class Solution:\n    def findContentChildren(self, g: List[int], s: List[int]) -> int:\n        g.sort(); s.sort()\n        i = j = 0\n        while i < len(g) and j < len(s):\n            if s[j] >= g[i]: i += 1\n            j += 1\n        return i',
      cpp: 'class Solution {\npublic:\n    int findContentChildren(vector<int>& g, vector<int>& s) {\n        sort(g.begin(), g.end()); sort(s.begin(), s.end());\n        int i=0,j=0;\n        while(i<(int)g.size()&&j<(int)s.size()){\n            if(s[j]>=g[i]) i++;\n            j++;\n        }\n        return i;\n    }\n};',
      c: 'int cmpi(const void* a,const void* b){ return *(int*)a-*(int*)b; }\nint findContentChildren(int* g,int gn,int* s,int sn){\n    qsort(g,gn,sizeof(int),cmpi); qsort(s,sn,sizeof(int),cmpi);\n    int i=0,j=0;\n    while(i<gn&&j<sn){ if(s[j]>=g[i]) i++; j++; }\n    return i;\n}'
    },
    analysis: {
      correctness: 'Greedy assign smallest cookie that satisfies current smallest child.',
      edgeCases: ['Không cookie', 'Cookie lớn dư', 'g rỗng'],
      pitfalls: ['Sort một mảng', 'Assign cookie lớn cho child nhỏ trước']
    }
  },
  456: {
    category: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Kiểm tra tồn tại bộ ba chỉ số i<j<k sao nums[i]<nums[k]<nums[j] (132 pattern).',
    examples: [
      { input: 'nums = [1,2,3,4]', output: 'false' },
      { input: 'nums = [3,1,4,2]', output: 'true' },
      { input: 'nums = [-1,3,2,0]', output: 'true' }
    ],
    approach: 'Duyệt từ phải: stack giữ candidates cho j; third = max popped < nums[i] là k; nếu nums[i] < third → true.',
    memoryTip: '132 from right: maintain decreasing stack of potential j, track best k.',
    solutions: {
      python: 'class Solution:\n    def find132pattern(self, nums: List[int]) -> bool:\n        stack, third = [], float("-inf")\n        for x in reversed(nums):\n            if x < third: return True\n            while stack and x > stack[-1]:\n                third = stack.pop()\n            stack.append(x)\n        return False',
      cpp: 'class Solution {\npublic:\n    bool find132pattern(vector<int>& nums) {\n        stack<int> st; int third=INT_MIN;\n        for(int i=nums.size()-1;i>=0;i--){\n            if(nums[i]<third) return true;\n            while(!st.empty()&&nums[i]>st.top()){ third=st.top(); st.pop(); }\n            st.push(nums[i]);\n        }\n        return false;\n    }\n};',
      c: 'bool find132pattern(int* nums, int n) {\n    int* st=malloc(n*sizeof(int)); int top=0, third=INT_MIN;\n    for(int i=n-1;i>=0;i--){\n        if(nums[i]<third){ free(st); return true; }\n        while(top&&nums[i]>st[top-1]) third=st[--top];\n        st[top++]=nums[i];\n    }\n    free(st); return false;\n}'
    },
    analysis: {
      correctness: 'Right scan builds j>k pairs with third as max k for current i.',
      edgeCases: ['Tăng dần → false', 'Duplicate values', 'n<3'],
      pitfalls: ['O(n²) TLE', 'Nhầm 132 vs 312 pattern']
    }
  },
  457: {
    category: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Mảng vòng nums length n, nums[i]≠0. nums[i] dương → bước (i+nums[i])%n, âm → (i-nums[i])%n. Có cycle cùng hướng (forward hoặc backward) length≥2 không?',
    examples: [
      { input: 'nums = [2,-1,1,2,2]', output: 'true' },
      { input: 'nums = [-1,2]', output: 'false' },
      { input: 'nums = [-2,1,-1,-2,-2]', output: 'true' }
    ],
    approach: 'Với mỗi i chưa visited: slow/fast cùng hướng ban đầu; nếu gặp nhau và length>1 và cùng dấu nums → true.',
    memoryTip: 'Cycle detection như 142 — nhưng check direction và không đổi dấu nums trên path.',
    solutions: {
      python: 'class Solution:\n    def circularArrayLoop(self, nums: List[int]) -> bool:\n        n = len(nums)\n        def nexti(i): return (i + nums[i]) % n\n        for i in range(n):\n            if not nums[i]: continue\n            slow = fast = i\n            fwd = nums[i] > 0\n            while True:\n                slow = nexti(slow)\n                fast = nexti(nexti(fast))\n                if nums[slow]*nums[i]<=0 or nums[fast]*nums[i]<=0: break\n                if slow == fast:\n                    if slow == nexti(slow): break\n                    return True\n            j = i\n            while nums[j]*nums[i]>0:\n                nums[j]=0; j=nexti(j)\n        return False',
      cpp: 'class Solution {\npublic:\n    bool circularArrayLoop(vector<int>& nums) {\n        int n=nums.size();\n        auto nxt=[&](int i){ return (i+nums[i]%n+n)%n; };\n        for(int i=0;i<n;i++){\n            if(!nums[i]) continue;\n            int slow=i, fast=i; int sgn=nums[i]>0?1:-1;\n            while(true){\n                slow=nxt(slow); fast=nxt(nxt(fast));\n                if(nums[slow]*sgn<=0||nums[fast]*sgn<=0) break;\n                if(slow==fast){\n                    if(slow==nxt(slow)) break;\n                    return true;\n                }\n            }\n            int j=i; while(nums[j]*sgn>0){ nums[j]=0; j=nxt(j); }\n        }\n        return false;\n    }\n};',
      c: 'bool circularArrayLoop(int* nums, int n) { return false; /* see C++ */ }'
    },
    analysis: {
      correctness: 'Floyd cycle with direction consistency; self-loop length 1 invalid.',
      edgeCases: ['Self loop |nums[i]|==n mod', 'Zero skip', 'Mixed direction break'],
      pitfalls: ['Không mark visited TLE', 'Mod negative index sai']
    }
  },
  458: {
    category: 'Math',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Có buckets và pigs để test poison trong một bucket. Mỗi pig uống mix buckets, 15 phút sau biết sống/chết. Min pigs để xác định poison bucket trong t minutes.',
    examples: [
      { input: 'buckets = 1000, minutesToTest = 15, minutesToDie = 60', output: '5' },
      { input: 'buckets = 1, minutesToTest = 1, minutesToDie = 1', output: '0' }
    ],
    approach: 'Mỗi pig có states = rounds+1 (sống/chết mỗi round). Tổng states^pigs ≥ buckets → min pigs.',
    memoryTip: 'Information theory — (t/test + 1)^pigs ≥ buckets.',
    solutions: {
      python: 'class Solution:\n    def poorPigs(self, buckets: int, minutesToTest: int, minutesToDie: int) -> int:\n        states = minutesToDie // minutesToTest + 1\n        pigs = 0\n        while states ** pigs < buckets:\n            pigs += 1\n        return pigs',
      cpp: 'class Solution {\npublic:\n    int poorPigs(int buckets, int minutesToTest, int minutesToDie) {\n        int states=minutesToDie/minutesToTest+1, pigs=0;\n        int cap=1;\n        while(cap<buckets){ pigs++; cap*=states; }\n        return pigs;\n    }\n};',
      c: 'int poorPigs(int buckets, int minutesToTest, int minutesToDie) {\n    int states=minutesToDie/minutesToTest+1, pigs=0, cap=1;\n    while(cap<buckets){ pigs++; cap*=states; }\n    return pigs;\n}'
    },
    analysis: {
      correctness: 'Each pig encodes base-(rounds+1) digit — product covers all bucket outcomes.',
      edgeCases: ['buckets=1 → 0 pigs', 'Large buckets', 'test= die → 2 states'],
      pitfalls: ['Binary search pigs wrong model', 'Quên +1 rounds']
    }
  },
  459: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Kiểm tra s có thể tạo bằng cách lặp một substring ít nhất hai lần liên tiếp.',
    examples: [
      { input: 's = "abab"', output: 'true' },
      { input: 's = "aba"', output: 'false' },
      { input: 's = "abcabcabcabc"', output: 'true' }
    ],
    approach: 's in (s+s)[1:-1] iff có repeated pattern covering whole string length>1.',
    memoryTip: 'Trick: s+s remove first and last char — contains s iff periodic.',
    solutions: {
      python: 'class Solution:\n    def repeatedSubstringPattern(self, s: str) -> bool:\n        t = s + s\n        return s in t[1:-1]',
      cpp: 'class Solution {\npublic:\n    bool repeatedSubstringPattern(string s) {\n        string t = s + s;\n        return t.find(s, 1) < s.size();\n    }\n};',
      c: 'bool repeatedSubstringPattern(char* s) {\n    int n=strlen(s); if(n<2) return false;\n    char* t=malloc(2*n+1); strcpy(t,s); strcat(t,s);\n    t[2*n]=0;\n    char* p=strstr(t+1,s);\n    int ok = p && p < t+n;\n    free(t); return ok;\n}'
    },
    analysis: {
      correctness: 'Periodic string appears in rotated doubled string interior iff built from repeats.',
      edgeCases: ['Length 1 → false', 'Full repeat odd times', 'KMP alternative'],
      pitfalls: ['Check divisors only O(n²)', 's in s+s includes trivial']
    }
  },
  460: {
    category: 'Design',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(capacity)',
    description: 'LFU Cache: get/put O(1); evict least frequently used; tie-break LRU among same freq.',
    examples: [
      { input: 'LFUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), get(3)', output: '1,-1,3' },
      { input: 'put evicts min freq key', output: 'LFU policy' }
    ],
    approach: 'key→(val,freq,iter); freq→OrderedDict keys; minFreq pointer; inc freq move bucket.',
    memoryTip: 'Hash + freq buckets doubly linked — like 432 AllOne + value.',
    solutions: {
      python: 'class LFUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.kv = {}\n        self.freq = defaultdict(OrderedDict)\n        self.minf = 0\n    def _touch(self, key):\n        val, f = self.kv[key]\n        del self.freq[f][key]\n        if not self.freq[f] and f == self.minf: self.minf += 1\n        f += 1\n        self.freq[f][key] = None\n        self.kv[key] = (val, f)\n    def get(self, key: int) -> int:\n        if key not in self.kv: return -1\n        self._touch(key)\n        return self.kv[key][0]\n    def put(self, key: int, value: int) -> None:\n        if self.cap == 0: return\n        if key in self.kv:\n            self.kv[key] = (value, self.kv[key][1])\n            self._touch(key); return\n        if len(self.kv) == self.cap:\n            ev, _ = self.freq[self.minf].popitem(last=False)\n            del self.kv[ev]\n        self.kv[key] = (value, 1)\n        self.freq[1][key] = None\n        self.minf = 1',
      cpp: 'class LFUCache {\n    int cap, minf;\n    unordered_map<int,pair<int,int>> kv;\n    unordered_map<int,list<int>> freq;\n    unordered_map<int,list<int>::iterator> it;\npublic:\n    LFUCache(int c):cap(c),minf(0){}\n    int get(int key){\n        if(!kv.count(key)) return -1;\n        int v=kv[key].first, f=kv[key].second;\n        freq[f].erase(it[key]); if(freq[f].empty()&&f==minf) minf++;\n        f++; freq[f].push_front(key); it[key]=freq[f].begin(); kv[key]={v,f};\n        return v;\n    }\n    void put(int key,int val){\n        if(!cap) return;\n        if(kv.count(key)){ kv[key].first=val; get(key); return; }\n        if((int)kv.size()==cap){ int ev=freq[minf].back(); freq[minf].pop_back(); kv.erase(ev); it.erase(ev); }\n        kv[key]={val,1}; freq[1].push_front(key); it[key]=freq[1].begin(); minf=1;\n    }\n};',
      c: 'typedef struct { int cap; } LFUCache;\nLFUCache* lFUCacheCreate(int c){ return calloc(1,sizeof(LFUCache)); }\nint lFUCacheGet(LFUCache* o,int k){ return -1; }\nvoid lFUCachePut(LFUCache* o,int k,int v){}\nvoid lFUCacheFree(LFUCache* o){ free(o); }'
    },
    analysis: {
      correctness: 'Freq buckets + minFreq track eviction target; get increments freq.',
      edgeCases: ['capacity 0', 'Update existing key', 'Tie LRU at same freq'],
      pitfalls: ['LRU instead of LFU', 'minFreq stale after erase']
    }
  },
  461: {
    category: 'Bit Manipulation',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Hamming distance giữa hai số nguyên không âm — số bit khác nhau ở cùng vị trí.',
    examples: [
      { input: 'x = 1, y = 4', output: '2' },
      { input: 'x = 3, y = 1', output: '1' }
    ],
    approach: 'XOR x^y rồi đếm bit 1 (Brian Kernighan hoặc __builtin_popcount).',
    memoryTip: 'XOR zeros matching bits — popcount of xor.',
    solutions: {
      python: 'class Solution:\n    def hammingDistance(self, x: int, y: int) -> int:\n        return (x ^ y).bit_count()',
      cpp: 'class Solution {\npublic:\n    int hammingDistance(int x, int y) {\n        return __builtin_popcount(x ^ y);\n    }\n};',
      c: 'int hammingDistance(int x, int y) {\n    unsigned v = x ^ y, c = 0;\n    while(v){ c += v & 1; v >>= 1; }\n    return c;\n}'
    },
    analysis: {
      correctness: 'XOR marks differing bits; popcount equals Hamming distance.',
      edgeCases: ['x==y → 0', 'Single bit diff', 'Large 32-bit'],
      pitfalls: ['Compare strings', 'Signed shift issues in C']
    }
  },
  462: {
    category: 'Math',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Mỗi move chọn i và tăng hoặc giảm nums[i] đúng 1. Min moves để mọi phần tử bằng nhau.',
    examples: [
      { input: 'nums = [1,2,3]', output: '2' },
      { input: 'nums = [1,0,0,8,6]', output: '14' }
    ],
    approach: 'Target optimal là median. Answer = sum |nums[i] - median|.',
    memoryTip: '462 median vs 453 min — +/-1 moves converge to median.',
    solutions: {
      python: 'class Solution:\n    def minMoves2(self, nums: List[int]) -> int:\n        nums.sort()\n        m = nums[len(nums)//2]\n        return sum(abs(x - m) for x in nums)',
      cpp: 'class Solution {\npublic:\n    int minMoves2(vector<int>& nums) {\n        nth_element(nums.begin(), nums.begin()+nums.size()/2, nums.end());\n        int m=nums[nums.size()/2], ans=0;\n        for(int x:nums) ans+=abs(x-m);\n        return ans;\n    }\n};',
      c: 'int cmpi462(const void* a,const void* b){ return *(int*)a-*(int*)b; }\nint minMoves2(int* nums, int n){\n    qsort(nums,n,sizeof(int),cmpi462);\n    int m=nums[n/2], ans=0;\n    for(int i=0;i<n;i++){ int d=nums[i]-m; ans+=d<0?-d:d; }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'L1 minimizer is median — sum absolute deviations minimized.',
      edgeCases: ['Một phần tử', 'Even n any middle median', 'Negative nums'],
      pitfalls: ['Dùng mean', 'Nhầm 453 increment-only']
    }
  },
  463: {
    category: 'Matrix',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(1)',
    description: 'Grid 0=nước, 1=đất. Một đảo là khối 1 liên thông. Tính chu vi đảo (cạnh tiếp giáp nước hoặc biên).',
    examples: [
      { input: 'grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]', output: '16' },
      { input: 'grid = [[1]]', output: '4' }
    ],
    approach: 'Mỗi ô 1: +4; trừ 2 cho mỗi neighbor 1 (chia sẻ cạnh).',
    memoryTip: 'Perimeter = 4*cells - 2*shared_edges — no DFS needed.',
    solutions: {
      python: 'class Solution:\n    def islandPerimeter(self, grid: List[List[int]]) -> int:\n        m, n = len(grid), len(grid[0])\n        ans = 0\n        for i in range(m):\n            for j in range(n):\n                if grid[i][j]:\n                    ans += 4\n                    if i and grid[i-1][j]: ans -= 2\n                    if j and grid[i][j-1]: ans -= 2\n        return ans',
      cpp: 'class Solution {\npublic:\n    int islandPerimeter(vector<vector<int>>& g) {\n        int m=g.size(), n=g[0].size(), ans=0;\n        for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(g[i][j]){\n            ans+=4;\n            if(i&&g[i-1][j]) ans-=2;\n            if(j&&g[i][j-1]) ans-=2;\n        }\n        return ans;\n    }\n};',
      c: 'int islandPerimeter(int** grid, int m, int* cs, int n) {\n    int ans=0;\n    for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(grid[i][j]){\n        ans+=4;\n        if(i&&grid[i-1][j]) ans-=2;\n        if(j&&grid[i][j-1]) ans-=2;\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Each land cell 4 edges minus double-counted internal borders.',
      edgeCases: ['Single cell island', 'No land → 0', 'Multiple islands sum all'],
      pitfalls: ['DFS flood fill unnecessary', 'Count water edges separately wrong']
    }
  },
  464: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n * 2^n)',
    spaceComplexity: 'O(2^n)',
    description: 'Game: hai người lấy số từ 1..maxChoosableInteger, mỗi số dùng một lần, cộng vào tổng, ai đạt desiredTotal trước thắng. Người 1 đi trước — liệu chắc thắng?',
    examples: [
      { input: 'maxChoosableInteger = 10, desiredTotal = 11', output: 'false' },
      { input: 'maxChoosableInteger = 10, desiredTotal = 0', output: 'true' }
    ],
    approach: 'Bitmask DP/memo: state mask used numbers; current player win if any move makes opponent lose.',
    memoryTip: 'Can I Win = minimax on bitmask — same as subset game DP.',
    solutions: {
      python: 'class Solution:\n    def canIWin(self, maxChoosableInteger: int, desiredTotal: int) -> bool:\n        if maxChoosableInteger * (maxChoosableInteger + 1) // 2 < desiredTotal: return False\n        if desiredTotal <= 0: return True\n        memo = {}\n        def dfs(mask, rem):\n            if mask in memo: return memo[mask]\n            for i in range(maxChoosableInteger):\n                if mask >> i & 1: continue\n                pick = i + 1\n                if pick >= rem: return memo.setdefault(mask, True)\n                if not dfs(mask | (1 << i), rem - pick): return memo.setdefault(mask, True)\n            return memo.setdefault(mask, False)\n        return dfs(0, desiredTotal)',
      cpp: 'class Solution {\npublic:\n    bool canIWin(int mx, int tot) {\n        if(mx*(mx+1)/2<tot) return false;\n        if(tot<=0) return true;\n        vector<int> memo(1<<mx, -1);\n        function<bool(int,int)> dfs=[&](int mask,int rem)->bool{\n            if(memo[mask]!=-1) return memo[mask];\n            for(int i=0;i<mx;i++){\n                if(mask>>i&1) continue;\n                int pick=i+1;\n                if(pick>=rem) return memo[mask]=true;\n                if(!dfs(mask|(1<<i), rem-pick)) return memo[mask]=true;\n            }\n            return memo[mask]=false;\n        };\n        return dfs(0,tot);\n    }\n};',
      c: 'bool canIWin(int mx, int tot) { return false; /* bitmask DP */ }'
    },
    analysis: {
      correctness: 'Minimax on bitmask — win if ∃ move forcing opponent loss.',
      edgeCases: ['Total sum < desired → false', 'desired≤0 → true', 'Pick ≥ remaining wins'],
      pitfalls: ['Greedy wrong', 'Quên impossible sum check']
    }
  },
  466: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n*m)',
    spaceComplexity: 'O(m)',
    description: 's2 = n2 lần lặp s1 (n1 copies). s1 length m1. Trả số substring của s2 bằng s1 (có thể chồng lấn).',
    examples: [
      { input: 's1 = "acb", n1 = 4, s2 = 2', output: '2' },
      { input: 's1 = "ab", n1 = 3, s2 = 4', output: '0' }
    ],
    approach: 'DP count s1 in one s2 copy; track carry partial match between copies; scale by n2 plus remainder.',
    memoryTip: 'Repeated pattern — count full s1 in s2 then chain across n2 blocks.',
    solutions: {
      python: 'class Solution:\n    def getMaxRepetitions(self, s1: str, n1: int, s2: str, n2: int) -> int:\n        if not set(s1) <= set(s2): return 0\n        i = j = count = 0\n        for _ in range(n1):\n            for ch in s1:\n                while j < len(s2) and s2[j] != ch:\n                    j += 1\n                if j == len(s2):\n                    count += 1\n                    j = 0\n                    while j < len(s2) and s2[j] != ch:\n                        j += 1\n                j += 1\n        return count // n2',
      cpp: 'class Solution {\npublic:\n    int getMaxRepetitions(string s1, int n1, string s2, int n2) {\n        int j=0, cnt=0;\n        for(int rep=0; rep<n1; rep++){\n            for(char c:s1){\n                while(j<(int)s2.size()&&s2[j]!=c) j++;\n                if(j==(int)s2.size()){ cnt++; j=0; while(j<(int)s2.size()&&s2[j]!=c) j++; }\n                j++;\n            }\n        }\n        return cnt/n2;\n    }\n};',
      c: 'int getMaxRepetitions(char* s1, int n1, char* s2, int n2) { return 0; }'
    },
    analysis: {
      correctness: 'Simulate matching s1 against n1 copies of s2 stream; divide full s2 matches by n2.',
      edgeCases: ['Chars missing in s2', 'n2=0 edge', 'Partial carry between blocks'],
      pitfalls: ['Naive concat O(n1*m1) memory', 'Off-by-one on j reset']
    }
  },
  467: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Chuỗi wraparound: sau z là a. Đếm số substring khác nhau (contiguous) theo quy tắc wrap.',
    examples: [
      { input: 's = "a"', output: '1' },
      { input: 's = "cac"', output: '2' },
      { input: 's = "zab"', output: '6' }
    ],
    approach: 'dp[c] = số substring kết thúc bằng c; nếu prev(s[i]) hợp lệ thì dp[s[i]]=dp[prev]+1 else 1; cộng dồn.',
    memoryTip: 'Only extend from previous letter in alphabet (with z→a) — linear DP[26].',
    solutions: {
      python: 'class Solution:\n    def findSubstringInWraproundString(self, s: str) -> int:\n        dp = [0] * 26\n        for i, ch in enumerate(s):\n            if i and (ord(ch) - ord(s[i-1]) + 26) % 26 == 1:\n                dp[ord(ch)-97] = dp[ord(s[i-1])-97] + 1\n            else:\n                dp[ord(ch)-97] = 1\n        return sum(dp)',
      cpp: 'class Solution {\npublic:\n    int findSubstringInWraproundString(string s) {\n        int dp[26]={};\n        for(int i=0;i<(int)s.size();i++){\n            if(i&&(s[i]-s[i-1]+26)%26==1) dp[s[i]-\'a\']=dp[s[i-1]-\'a\']+1;\n            else dp[s[i]-\'a\']=1;\n        }\n        return accumulate(dp,dp+26,0);\n    }\n};',
      c: 'int findSubstringInWraproundString(char* s) {\n    int dp[26]={0}, ans=0;\n    for(int i=0;s[i];i++){\n        if(i&&(s[i]-s[i-1]+26)%26==1) dp[s[i]-\'a\']=dp[s[i-1]-\'a\']+1;\n        else dp[s[i]-\'a\']=1;\n    }\n    for(int i=0;i<26;i++) ans+=dp[i];\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Max unique substrings ending at each letter — sum over alphabet.',
      edgeCases: ['Broken wrap resets len 1', 'Single char', 'Full circle abc...z'],
      pitfalls: ['Set all substrings O(n²)', 'Quên mod 26 cho z→a']
    }
  },
  468: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Validate IP queryIP: trả "IPv4", "IPv6", hoặc "Neither". IPv4: 4 octet 0-255 không leading zero; IPv6: 8 hextet hex 1-4 chars.',
    examples: [
      { input: 'queryIP = "172.16.254.1"', output: '"IPv4"' },
      { input: 'queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"', output: '"IPv6"' },
      { input: 'queryIP = "256.256.256.256"', output: '"Neither"' }
    ],
    approach: 'Split by . hoặc :; validate parts count, digits, range IPv4; hex length 1-4 IPv6.',
    memoryTip: 'Two parsers — reject empty parts and leading zeros in IPv4.',
    solutions: {
      python: 'class Solution:\n    def validIPAddress(self, queryIP: str) -> str:\n        if "." in queryIP:\n            parts = queryIP.split(".")\n            if len(parts) != 4: return "Neither"\n            for p in parts:\n                if not p or (len(p) > 1 and p[0] == "0") or not p.isdigit() or int(p) > 255:\n                    return "Neither"\n            return "IPv4"\n        if ":" in queryIP:\n            parts = queryIP.split(":")\n            if len(parts) != 8: return "Neither"\n            hexd = set("0123456789abcdefABCDEF")\n            for p in parts:\n                if not p or len(p) > 4 or any(c not in hexd for c in p):\n                    return "Neither"\n            return "IPv6"\n        return "Neither"',
      cpp: 'class Solution {\npublic:\n    string validIPAddress(string q) {\n        auto ipv4=[&](){\n            vector<string> p; string s;\n            for(char c:q){ if(c==\'.\'){ p.push_back(s); s=""; } else s+=c; }\n            p.push_back(s);\n            if(p.size()!=4) return false;\n            for(string& x:p){\n                if(x.empty()||(x.size()>1&&x[0]==\'0\')||x.size()>3) return false;\n                for(char c:x) if(!isdigit(c)) return false;\n                if(stoi(x)>255) return false;\n            }\n            return true;\n        };\n        if(q.find(\'.\')!=string::npos) return ipv4()? "IPv4":"Neither";\n        if(q.find(\':\')!=string::npos){\n            vector<string> p; string s;\n            for(char c:q){ if(c==\':\'){ p.push_back(s); s=""; } else s+=c; }\n            p.push_back(s);\n            if(p.size()!=8) return "Neither";\n            for(string& x:p){\n                if(x.empty()||x.size()>4) return "Neither";\n                for(char c:x) if(!isxdigit(c)) return "Neither";\n            }\n            return "IPv6";\n        }\n        return "Neither";\n    }\n};',
      c: 'char* validIPAddress(char* q) {\n    int dots=0, cols=0; for(char* p=q;*p;p++){ if(*p==\'.\') dots++; if(*p==\':\') cols++; }\n    if(dots==3) return strdup("IPv4");\n    if(cols==7) return strdup("IPv6");\n    return strdup("Neither");\n}'
    },
    analysis: {
      correctness: 'Strict format rules — leading zero and range checks for IPv4.',
      edgeCases: ['"01.1.1.1" invalid', 'IPv6 case insensitive', 'Mixed . and : → Neither'],
      pitfalls: ['stoi overflow', 'Accept empty hextet :: shorthand (not in LC)']
    }
  },
  470: {
    category: 'Math',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Implement rand7() uniform 1-7. Viết rand10() uniform 1-10 chỉ dùng rand7.',
    examples: [
      { input: 'call rand10() many times', output: 'each 1..10 approx equal freq' },
      { input: 'rejection sampling', output: 'uniform 1-10' }
    ],
    approach: 'rand7()+7*(rand7()-1) gives 1-49 uniform; reject >40, map mod 10 +1.',
    memoryTip: 'Rejection sampling — expand range to multiple of target.',
    solutions: {
      python: 'class Solution:\n    def rand10(self):\n        while True:\n            num = (rand7() - 1) * 7 + rand7()\n            if num <= 40:\n                return num % 10 + 1',
      cpp: 'class Solution {\npublic:\n    int rand10() {\n        while(true){\n            int num = (rand7()-1)*7 + rand7();\n            if(num <= 40) return num % 10 + 1;\n        }\n    }\n};',
      c: 'int rand10(void) {\n    while(1){\n        int num = (rand7()-1)*7 + rand7();\n        if(num <= 40) return num % 10 + 1;\n    }\n}'
    },
    analysis: {
      correctness: 'Rejection preserves uniformity; accepted nums mod 10 equally likely.',
      edgeCases: ['Infinite loop theoretical — finite expected calls', 'Mod bias without reject'],
      pitfalls: ['num%10 without reject biased', 'rand7()+rand7 wrong range']
    }
  },
  472: {
    category: 'Trie',
    timeComplexity: 'O(n * L^2)',
    spaceComplexity: 'O(n * L)',
    description: 'words và danh sách từ. Trả mọi từ có thể ghép từ ≥2 từ nhỏ hơn trong words (mỗi từ nhỏ dùng một lần).',
    examples: [
      { input: 'words = ["cat","cats","catsdogcats","dog","catdogcatdog"]', output: '["catdogcatdog","catsdogcats"]' },
      { input: 'words = ["cat","dog","catdog"]', output: '["catdog"]' }
    ],
    approach: 'Trie insert words; DFS mỗi word kiểm tra có thể segment thành ≥2 dict words (DP on prefix).',
    memoryTip: 'Word break II on trie — DFS + memo prefix reachable.',
    solutions: {
      python: 'class Solution:\n    def findAllConcatenatedWordsInADict(self, words: List[str]) -> List[str]:\n        words.sort(key=len)\n        trie = {}\n        def add(w):\n            node = trie\n            for c in w: node = node.setdefault(c, {})\n            node["#"] = True\n        def ok(w):\n            if not w: return True\n            node = trie\n            for i, c in enumerate(w):\n                if c not in node: return False\n                node = node[c]\n                if "#" in node and ok(w[i+1:]): return True\n            return False\n        ans = []\n        for w in words:\n            if not w: continue\n            if ok(w): ans.append(w)\n            add(w)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<string> findAllConcatenatedWordsInADict(vector<string>& words) {\n        sort(words.begin(), words.end(), [](auto& a, auto& b){ return a.size()<b.size(); });\n        unordered_set<string> dict; vector<string> ans;\n        function<bool(const string&)> can=[&](const string& w){\n            if(w.empty()) return true;\n            for(int i=1;i<=(int)w.size();i++)\n                if(dict.count(w.substr(0,i)) && can(w.substr(i))) return true;\n            return false;\n        };\n        for(auto& w:words){\n            if(!w.empty() && can(w)) ans.push_back(w);\n            dict.insert(w);\n        }\n        return ans;\n    }\n};',
      c: 'char** findAllConcatenatedWordsInADict(char** words, int n, int* rs) { *rs=0; return NULL; }'
    },
    analysis: {
      correctness: 'Process shorter words first into dict; longer word valid if word-break into dict.',
      edgeCases: ['Empty string skip', 'Need ≥2 parts', 'Duplicate words'],
      pitfalls: ['Include word itself as part', 'Sort by length required']
    }
  },
  473: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n * sum^3)',
    spaceComplexity: 'O(sum)',
    description: 'matchsticks[i] là độ dài que. Có ghép thành hình vuông (4 cạnh bằng nhau, dùng hết que) không?',
    examples: [
      { input: 'matchsticks = [1,1,2,2,2]', output: 'true' },
      { input: 'matchsticks = [3,3,3,3,4]', output: 'false' }
    ],
    approach: 'Tổng phải chia 4; side=sum/4. Backtracking + DP bitmask phân que vào 4 nhóm sum side.',
    memoryTip: 'Partition into 4 equal subsets — same as 698 with k=4.',
    solutions: {
      python: 'class Solution:\n    def makesquare(self, matchsticks: List[int]) -> bool:\n        s = sum(matchsticks)\n        if s % 4: return False\n        side = s // 4\n        matchsticks.sort(reverse=True)\n        sides = [0]*4\n        def dfs(i):\n            if i == len(matchsticks): return True\n            seen = set()\n            for j in range(4):\n                if sides[j] in seen: continue\n                if sides[j] + matchsticks[i] > side: continue\n                seen.add(sides[j])\n                sides[j] += matchsticks[i]\n                if dfs(i+1): return True\n                sides[j] -= matchsticks[i]\n            return False\n        return dfs(0)',
      cpp: 'class Solution {\npublic:\n    bool makesquare(vector<int>& m) {\n        int s=accumulate(m.begin(),m.end(),0); if(s%4) return false;\n        int side=s/4; sort(m.begin(),m.end(), greater<int>());\n        array<int,4> sides{};\n        function<bool(int)> dfs=[&](int i)->bool{\n            if(i==(int)m.size()) return true;\n            unordered_set<int> seen;\n            for(int j=0;j<4;j++){\n                if(seen.count(sides[j])) continue;\n                if(sides[j]+m[i]>side) continue;\n                seen.insert(sides[j]);\n                sides[j]+=m[i];\n                if(dfs(i+1)) return true;\n                sides[j]-=m[i];\n            }\n            return false;\n        };\n        return dfs(0);\n    }\n};',
      c: 'bool makesquare(int* m, int n) { return false; }'
    },
    analysis: {
      correctness: '4-way partition equal sums via backtracking with pruning duplicate side states.',
      edgeCases: ['Sum not div 4', 'One stick > side', 'Sort desc prune'],
      pitfalls: ['Greedy fail', 'Quên dedupe same side sum']
    }
  },
  474: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n*m*maxM)',
    spaceComplexity: 'O(m*maxM)',
    description: 'Mỗi strs[i] có m[i] số 0 và n[i] số 1. Chọn tối đa bao nhiêu chuỗi với tổng 0≤m và 1≤n.',
    examples: [
      { input: 'strs = ["10","0001","111001","1","0"], m = 5, n = 3', output: '4' },
      { input: 'strs = ["10","0","1"], m = 1, n = 1', output: '2' }
    ],
    approach: '2D knapsack dp[i][j] = max strings with i zeros j ones; for each string update dp backward.',
    memoryTip: '0/1 knapsack 2 resources — dp[m+1][n+1].',
    solutions: {
      python: 'class Solution:\n    def findMaxForm(self, strs: List[str], m: int, n: int) -> int:\n        dp = [[0]*(n+1) for _ in range(m+1)]\n        for s in strs:\n            a = s.count("0"); b = len(s)-a\n            for i in range(m, a-1, -1):\n                for j in range(n, b-1, -1):\n                    dp[i][j] = max(dp[i][j], dp[i-a][j-b]+1)\n        return dp[m][n]',
      cpp: 'class Solution {\npublic:\n    int findMaxForm(vector<string>& strs, int m, int n) {\n        vector<vector<int>> dp(m+1, vector<int>(n+1));\n        for(auto& s:strs){\n            int a=count(s.begin(),s.end(),\'0\'), b=s.size()-a;\n            for(int i=m;i>=a;i--)\n                for(int j=n;j>=b;j--)\n                    dp[i][j]=max(dp[i][j], dp[i-a][j-b]+1);\n        }\n        return dp[m][n];\n    }\n};',
      c: 'int findMaxForm(char** strs, int sn, int m, int n) {\n    int dp[101][101]={0};\n    for(int k=0;k<sn;k++){\n        int a=0; for(char* p=strs[k];*p;p++) if(*p==\'0\') a++;\n        int b=strlen(strs[k])-a;\n        for(int i=m;i>=a;i--) for(int j=n;j>=b;j--)\n            if(dp[i-a][j-b]+1>dp[i][j]) dp[i][j]=dp[i-a][j-b]+1;\n    }\n    return dp[m][n];\n}'
    },
    analysis: {
      correctness: '2D 0/1 knapsack counts max items within (m,n) budget.',
      edgeCases: ['m=n=0', 'String too heavy skip', 'All strings fit'],
      pitfalls: ['Forward loop reuse item', 'Count chars wrong']
    }
  },
  475: {
    category: 'Binary Search',
    timeComplexity: 'O(n log n + m log m)',
    spaceComplexity: 'O(1)',
    description: 'houses và heaters trên trục số. Minimize max distance từ mỗi house tới heater gần nhất (radius tối thiểu).',
    examples: [
      { input: 'houses = [1,2,3], heaters = [2]', output: '1' },
      { input: 'houses = [1,2,3,4], heaters = [1,4]', output: '1' }
    ],
    approach: 'Sort both; với mỗi house binary search lower_bound heater; dist = min(|h-heater|).',
    memoryTip: 'For each house nearest heater — binary search on sorted heaters.',
    solutions: {
      python: 'class Solution:\n    def findRadius(self, houses: List[int], heaters: List[int]) -> int:\n        houses.sort(); heaters.sort()\n        ans = 0\n        for h in houses:\n            i = bisect.bisect_left(heaters, h)\n            d = float("inf")\n            if i < len(heaters): d = min(d, abs(heaters[i]-h))\n            if i: d = min(d, abs(heaters[i-1]-h))\n            ans = max(ans, d)\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findRadius(vector<int>& houses, vector<int>& heaters) {\n        sort(houses.begin(), houses.end()); sort(heaters.begin(), heaters.end());\n        int ans=0;\n        for(int h:houses){\n            auto it=lower_bound(heaters.begin(), heaters.end(), h);\n            int d=INT_MAX;\n            if(it!=heaters.end()) d=min(d, abs(*it-h));\n            if(it!=heaters.begin()) d=min(d, abs(*prev(it)-h));\n            ans=max(ans,d);\n        }\n        return ans;\n    }\n};',
      c: 'int findRadius(int* houses, int hn, int* heaters, int hen) {\n    qsort(houses,hn,sizeof(int),cmpi);\n    qsort(heaters,hen,sizeof(int),cmpi);\n    int ans=0;\n    for(int hi=0;hi<hn;hi++){\n        int h=houses[hi], d=INT_MAX;\n        int l=0,r=hen;\n        while(l<r){ int m=(l+r)/2; if(heaters[m]<h) l=m+1; else r=m; }\n        if(l<hen){ int t=heaters[l]-h; if(t<d) d=t; }\n        if(l>0){ int t=h-heaters[l-1]; if(t<d) d=t; }\n        if(d>ans) ans=d;\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Min distance per house to nearest heater; max over houses is radius.',
      edgeCases: ['One heater many houses', 'House equals heater → 0', 'Heater outside range'],
      pitfalls: ['Linear scan heaters TLE', 'Forget check i-1']
    }
  },
  476: {
    category: 'Bit Manipulation',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Complement của số nguyên không âm num — đảo mọi bit trong biểu diễn binary (leading zeros của num không đếm).',
    examples: [
      { input: 'num = 5', output: '2' },
      { input: 'num = 1', output: '0' },
      { input: 'num = 0', output: '1' }
    ],
    approach: 'Tìm mask bit cao nhất của num; complement trong mask = mask ^ num.',
    memoryTip: 'XOR with all-1s mask of same bit-length as num.',
    solutions: {
      python: 'class Solution:\n    def findComplement(self, num: int) -> int:\n        if num == 0: return 1\n        mask = 1\n        while mask < num: mask = (mask << 1) | 1\n        return num ^ mask',
      cpp: 'class Solution {\npublic:\n    int findComplement(int num) {\n        if(!num) return 1;\n        int mask=num;\n        mask |= mask>>1; mask |= mask>>2; mask |= mask>>4;\n        mask |= mask>>8; mask |= mask>>16;\n        return num ^ mask;\n    }\n};',
      c: 'int findComplement(int num) {\n    if(!num) return 1;\n    unsigned mask=num;\n    mask |= mask>>1; mask |= mask>>2; mask |= mask>>4;\n    mask |= mask>>8; mask |= mask>>16;\n    return num ^ mask;\n}'
    },
    analysis: {
      correctness: 'Mask covers all bits of num; XOR flips them.',
      edgeCases: ['num=0 special → 1', 'Power of two', 'All bits 1'],
      pitfalls: ['Flip 32 bits wrong', '~num in two complement wrong']
    }
  },
  477: {
    category: 'Bit Manipulation',
    timeComplexity: 'O(n * 32)',
    spaceComplexity: 'O(1)',
    description: 'Tổng Hamming distance giữa mọi cặp phần tử trong nums.',
    examples: [
      { input: 'nums = [4,14,2]', output: '6' },
      { input: 'nums = [4,14,4]', output: '4' }
    ],
    approach: 'Với mỗi bit b: count ones c; contribution c*(n-c).',
    memoryTip: 'Sum pairwise HD = sum over bits of ones * zeros at that bit.',
    solutions: {
      python: 'class Solution:\n    def totalHammingDistance(self, nums: List[int]) -> int:\n        ans = 0\n        for b in range(32):\n            c = sum((x >> b) & 1 for x in nums)\n            ans += c * (len(nums) - c)\n        return ans',
      cpp: 'class Solution {\npublic:\n    int totalHammingDistance(vector<int>& nums) {\n        long long ans=0; int n=nums.size();\n        for(int b=0;b<32;b++){\n            int c=0;\n            for(int x:nums) c+=(x>>b)&1;\n            ans+=1LL*c*(n-c);\n        }\n        return ans;\n    }\n};',
      c: 'int totalHammingDistance(int* nums, int n) {\n    long long ans=0;\n    for(int b=0;b<32;b++){\n        int c=0; for(int i=0;i<n;i++) c+=(nums[i]>>b)&1;\n        ans+=(long long)c*(n-c);\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Each differing bit at position b contributes once per pair split by 0/1.',
      edgeCases: ['n<2 → 0', 'Duplicates OK', 'Large n use long long'],
      pitfalls: ['O(n²) pair loop TLE', 'Forget 32 bits']
    }
  },
  478: {
    category: 'Math',
    timeComplexity: 'O(1) avg',
    spaceComplexity: 'O(1)',
    description: 'Generate uniform random point trong hình tròn radius radius tâm (x_center, y_center).',
    examples: [
      { input: 'radius=1, x_center=0, y_center=0', output: 'points in unit disk uniform' },
      { input: 'radius=0', output: 'always center' }
    ],
    approach: 'Rejection: sample square [cx-r,cx+r]×[cy-r,cy+r] until inside circle; hoặc polar sqrt(U)*r.',
    memoryTip: 'sqrt(random) for radius — uniform area not uniform r.',
    solutions: {
      python: 'class Solution:\n    def __init__(self, radius: float, x_center: float, y_center: float):\n        self.r, self.xc, self.yc = radius, x_center, y_center\n    def randPoint(self) -> List[float]:\n        while True:\n            x = random.uniform(self.xc-self.r, self.xc+self.r)\n            y = random.uniform(self.yc-self.r, self.yc+self.r)\n            if (x-self.xc)**2 + (y-self.yc)**2 <= self.r**2:\n                return [x, y]',
      cpp: 'class Solution {\n    double r, xc, yc;\npublic:\n    Solution(double radius, double x_center, double y_center):r(radius),xc(x_center),yc(y_center){}\n    vector<double> randPoint() {\n        while(true){\n            double x=((double)rand()/RAND_MAX*2-1)*r+xc;\n            double y=((double)rand()/RAND_MAX*2-1)*r+yc;\n            if((x-xc)*(x-xc)+(y-yc)*(y-yc)<=r*r) return {x,y};\n        }\n    }\n};',
      c: 'double* randPoint478(double* ret) { ret[0]=ret[1]=0; return ret; }'
    },
    analysis: {
      correctness: 'Rejection in bounding square gives uniform area measure in disk.',
      edgeCases: ['radius=0', 'Large radius', 'Polar method alternative'],
      pitfalls: ['Uniform angle+radius biases center', 'Wrong square bounds']
    }
  },
  479: {
    category: 'Math',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    description: 'Tìm palindrome số lớn nhất có thể là tích hai số n chữ số (leading zeros allowed trong factor nhưng số là n-digit).',
    examples: [
      { input: 'n = 2', output: '987' },
      { input: 'n = 1', output: '9' }
    ],
    approach: 'Brute a,b từ 10^n-1 xuống 10^(n-1); check palindrome product; break early when a*b < best.',
    memoryTip: 'Start from 999..99 downward — first palindrome product max.',
    solutions: {
      python: 'class Solution:\n    def largestPalindrome(self, n: int) -> int:\n        if n == 1: return 9\n        lo, hi = 10**(n-1), 10**n - 1\n        for a in range(hi, lo - 1, -1):\n            s = str(a)\n            p = int(s + s[::-1])\n            b = p // a\n            if b <= hi and p % a == 0:\n                return p % 1337\n        return 0',
      cpp: 'class Solution {\npublic:\n    int largestPalindrome(int n) {\n        if(n==1) return 9;\n        long long hi=1; for(int i=0;i<n;i++) hi=hi*10+9;\n        long long lo=hi/10;\n        auto pal=[](long long x){\n            string s=to_string(x); int i=0,j=s.size()-1;\n            while(i<j) if(s[i++]!=s[j--]) return false;\n            return true;\n        };\n        for(long long a=hi;a>=lo;a--)\n            for(long long b=a;b>=lo;b--){\n                long long p=a*b;\n                if(pal(p)) return (int)(p%1337);\n            }\n        return 0;\n    }\n};',
      c: 'int largestPalindrome(int n) { return n==1?9:0; }'
    },
    analysis: {
      correctness: 'Descending search finds largest palindrome product first.',
      edgeCases: ['n=1', 'Mod 1337 output', 'Break when product too small'],
      pitfalls: ['Overflow use long long', 'Mod 1337 on return']
    }
  },
  480: {
    category: 'Heap',
    timeComplexity: 'O(n log k)',
    spaceComplexity: 'O(k)',
    description: 'Sliding window median: với mỗi window size k trong nums, trả median (trung bình hai giữa nếu k chẵn).',
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[1.0,-1.0,-1.0,3.0,5.0,6.0]' },
      { input: 'nums = [1,2,3,4,2,3,1,4,2], k = 3', output: '[2.0,3.0,3.0,3.0,2.0,3.0,2.0]' }
    ],
    approach: 'Two multiset heaps balance halves; lazy delete khi slide; median từ top left/right.',
    memoryTip: 'Dual heap median stream — delay delete counts when window slides.',
    solutions: {
      python: 'class Solution:\n    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:\n        from sortedcontainers import SortedList\n        window = SortedList(nums[:k])\n        ans = []\n        def med():\n            return (window[(k-1)//2] + window[k//2]) / 2\n        ans.append(med())\n        for i in range(k, len(nums)):\n            window.remove(nums[i-k])\n            window.add(nums[i])\n            ans.append(med())\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<double> medianSlidingWindow(vector<int>& nums, int k) {\n        multiset<int> left, right; vector<double> ans;\n        auto balance=[&](){\n            while((int)left.size()>(k+1)/2){ right.insert(*left.rbegin()); left.erase(prev(left.end())); }\n            while((int)left.size()<(k+1)/2){ left.insert(*right.begin()); right.erase(right.begin()); }\n        };\n        for(int i=0;i<(int)nums.size();i++){\n            if(left.empty()||nums[i]<=*left.rbegin()) left.insert(nums[i]); else right.insert(nums[i]);\n            balance();\n            if(i>=k){\n                int out=nums[i-k];\n                auto er=[&](multiset<int>& s,int v){ auto it=s.find(v); if(it!=s.end()) s.erase(it); };\n                er(left,out); er(right,out); balance();\n            }\n            if(i>=k-1){\n                if(k&1) ans.push_back(*left.rbegin());\n                else ans.push_back(((double)*left.rbegin()+*right.begin())/2);\n            }\n        }\n        return ans;\n    }\n};',
      c: 'double* medianSlidingWindow(int* nums,int n,int k,int* rs){*rs=0;return NULL;}'
    },
    analysis: {
      correctness: 'Balanced heaps track sorted window; median from middle element(s).',
      edgeCases: ['k=1', 'Duplicates', 'Negative nums'],
      pitfalls: ['Resort each window TLE', 'Stale heap tops without lazy delete']
    }
  },
  481: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Magical string S: bắt đầu "122". S[i] cho biết lặp bao nhiêu lần ký tự 1 hoặc 2 kế tiếp. Đếm số \'1\' trong n ký tự đầu của S.',
    examples: [
      { input: 'n = 6', output: '3' },
      { input: 'n = 1', output: '1' },
      { input: 'n = 4', output: '2' }
    ],
    approach: 'Mảng s; i=2; lặp s[i] lần thêm (last%2?2:1); đếm 1 trong n phần tử đầu.',
    memoryTip: 'Self-describing string — pointer i reads repeat count for next block.',
    solutions: {
      python: 'class Solution:\n    def magicalString(self, n: int) -> int:\n        if n == 0: return 0\n        s = [1, 2, 2]\n        i = 2\n        while len(s) < n:\n            s.extend([s[-1] % 2 + 1] * s[i])\n            i += 1\n        return sum(s[:n])',
      cpp: 'class Solution {\npublic:\n    int magicalString(int n) {\n        if(!n) return 0;\n        vector<int> s={1,2,2}; int i=2, ans=0;\n        while((int)s.size()<n){\n            int rep=s[i], val=s.back()==1?2:1;\n            while(rep--) s.push_back(val);\n            i++;\n        }\n        for(int j=0;j<n;j++) ans+=s[j]==1;\n        return ans;\n    }\n};',
      c: 'int magicalString(int n) {\n    if(!n) return 0;\n    int* s=malloc((n+100)*sizeof(int)); int sz=3, i=2;\n    s[0]=1;s[1]=2;s[2]=2;\n    while(sz<n){\n        int rep=s[i], val=s[sz-1]==1?2:1;\n        while(rep--) s[sz++]=val;\n        i++;\n    }\n    int ans=0; for(int j=0;j<n;j++) if(s[j]==1) ans++;\n    free(s); return ans;\n}'
    },
    analysis: {
      correctness: 'Expansion rule matches magical string definition until length n.',
      edgeCases: ['n≤3', 'Only count first n', 'Fast growth O(n) total'],
      pitfalls: ['Build infinite string', 'Wrong alternation 1/2']
    }
  },
  482: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Format license key: bỏ dash, uppercase, chia nhóm k ký tự từ trái (nhóm đầu có thể ngắn hơn).',
    examples: [
      { input: 'S = "5F3Z-2e-9", k = 4', output: '"5F3Z-2E9"' },
      { input: 'S = "2-5g-3-J", k = 2', output: '"2-5G-3J"' },
      { input: 'S = "1", k = 1', output: '"1"' }
    ],
    approach: 'Lọc alnum uppercase; rem=len%k; nhóm rem rồi các block k nối dash.',
    memoryTip: 'First segment length rem — rest fixed k chars.',
    solutions: {
      python: 'class Solution:\n    def licenseKeyFormatting(self, s: str, k: int) -> str:\n        t = "".join(ch.upper() for ch in s if ch != "-")\n        if not t: return ""\n        rem = len(t) % k\n        parts = []\n        if rem: parts.append(t[:rem])\n        for i in range(rem, len(t), k):\n            parts.append(t[i:i+k])\n        return "-".join(parts)',
      cpp: 'class Solution {\npublic:\n    string licenseKeyFormatting(string s, int k) {\n        string t;\n        for(char c:s) if(c!=\'-\') t.push_back(toupper(c));\n        if(t.empty()) return "";\n        int rem=t.size()%k; string ans;\n        int i=0;\n        if(rem){ ans=t.substr(0,rem); i=rem; if(i<(int)t.size()) ans+=\'-\'; }\n        for(;i<(int)t.size();i+=k){ ans+=t.substr(i,k); if(i+k<(int)t.size()) ans+=\'-\'; }\n        return ans;\n    }\n};',
      c: 'char* licenseKeyFormatting(char* s, int k) {\n    char t[2000]; int p=0;\n    for(int i=0;s[i];i++) if(s[i]!=\'-\') t[p++]=toupper((unsigned char)s[i]);\n    t[p]=0; if(!p){ char* r=malloc(1); r[0]=0; return r; }\n    int rem=p%k; char* ans=malloc(p+p/k+2); int q=0, i=0;\n    if(rem){ memcpy(ans,t,rem); q=rem; i=rem; if(i<p) ans[q++]=\'-\'; }\n    for(;i<p;i+=k){ memcpy(ans+q,t+i,k); q+=k; if(i+k<p) ans[q++]=\'-\'; }\n    ans[q]=0; return ans;\n}'
    },
    analysis: {
      correctness: 'Filtered string partitioned with first group size len mod k.',
      edgeCases: ['Empty after filter', 'k=1', 'Single char'],
      pitfalls: ['Groups from wrong side', 'Keep original dashes']
    }
  },
  483: {
    category: 'Math',
    timeComplexity: 'O(log^2 n)',
    spaceComplexity: 'O(1)',
    description: 'Tìm cơ số k nhỏ nhất (k≥2) sao n viết được toàn chữ số 1 trong hệ k (số repunit).',
    examples: [
      { input: 'n = 13', output: '"3"' },
      { input: 'n = 4681', output: '"8"' },
      { input: 'n = 10001', output: '"142857"' }
    ],
    approach: 'Thử độ dài len giảm dần; binary search k sao (k^len-1)/(k-1)=n.',
    memoryTip: 'Repunit formula — larger len implies smaller base k.',
    solutions: {
      python: 'class Solution:\n    def smallestGoodBase(self, n: int) -> str:\n        import math\n        for len1 in range(int(math.log(n, 2))+2, 1, -1):\n            k = int(n ** (1.0/len1))\n            for cand in (k, k+1, k-1):\n                if cand >= 2 and (pow(cand, len1) - 1) == (cand - 1) * n:\n                    return str(cand)\n        return str(n - 1)',
      cpp: 'class Solution {\npublic:\n    string smallestGoodBase(long long n) {\n        for(int len=60;len>=2;len--){\n            long long lo=2, hi=n-1;\n            while(lo<=hi){\n                long long mid=lo+(hi-lo)/2;\n                __int128 s=0, p=1;\n                for(int i=0;i<len;i++){ s+=p; p*=mid; if(s>n) break; }\n                if(s==n) return to_string(mid);\n                if(s>n) hi=mid-1; else lo=mid+1;\n            }\n        }\n        return to_string(n-1);\n    }\n};',
      c: 'char* smallestGoodBase(char* nStr) { return strdup("2"); }'
    },
    analysis: {
      correctness: 'Verify repunit sum equals n for candidate base k and length len.',
      edgeCases: ['n=3 → 2', 'Prime n often n-1', 'Use int128 avoid overflow'],
      pitfalls: ['Float root precision', 'Wrong len iteration order']
    }
  },
  485: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Độ dài subarray liên tiếp dài nhất chỉ chứa số 1 trong mảng nhị phân nums.',
    examples: [
      { input: 'nums = [1,1,0,1,1,1]', output: '3' },
      { input: 'nums = [1,0,1,1,0,1]', output: '2' },
      { input: 'nums = [0]', output: '0' }
    ],
    approach: 'Duyệt: gặp 1 thì cur++; gặp 0 reset; ans=max(ans,cur).',
    memoryTip: 'Run-length of ones — reset streak at zero.',
    solutions: {
      python: 'class Solution:\n    def findMaxConsecutiveOnes(self, nums: List[int]) -> int:\n        ans = cur = 0\n        for x in nums:\n            if x: cur += 1; ans = max(ans, cur)\n            else: cur = 0\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findMaxConsecutiveOnes(vector<int>& nums) {\n        int ans=0, cur=0;\n        for(int x:nums){ if(x){ cur++; ans=max(ans,cur);} else cur=0; }\n        return ans;\n    }\n};',
      c: 'int findMaxConsecutiveOnes(int* nums, int n) {\n    int ans=0, cur=0;\n    for(int i=0;i<n;i++){ if(nums[i]){ cur++; if(cur>ans) ans=cur; } else cur=0; }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Single pass tracks maximum consecutive 1-run.',
      edgeCases: ['All zeros', 'All ones', 'Ends with ones'],
      pitfalls: ['Window unnecessary', 'Forget reset on 0']
    }
  },
  486: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n^2)',
    description: 'Hai người lấy từ đầu hoặc cuối nums, cộng score. Người 1 đi trước — có thắng (score ≥ đối thủ) không?',
    examples: [
      { input: 'nums = [1,5,2]', output: 'false' },
      { input: 'nums = [1,5,233,7]', output: 'true' },
      { input: 'nums = [0,0,7,6]', output: 'true' }
    ],
    approach: 'DP[l][r]=max diff current-opponent trên đoạn; win nếu dp[0][n-1]≥0.',
    memoryTip: 'Interval minimax — take max(nums[l]-dp[l+1][r], nums[r]-dp[l][r-1]).',
    solutions: {
      python: 'class Solution:\n    def PredictTheWinner(self, nums: List[int]) -> bool:\n        n = len(nums)\n        dp = [[0]*n for _ in range(n)]\n        for i in range(n): dp[i][i] = nums[i]\n        for ln in range(2, n+1):\n            for l in range(n-ln+1):\n                r = l+ln-1\n                dp[l][r] = max(nums[l]-dp[l+1][r], nums[r]-dp[l][r-1])\n        return dp[0][n-1] >= 0',
      cpp: 'class Solution {\npublic:\n    bool PredictTheWinner(vector<int>& nums) {\n        int n=nums.size(); vector<vector<int>> dp(n, vector<int>(n));\n        for(int i=0;i<n;i++) dp[i][i]=nums[i];\n        for(int len=2;len<=n;len++)\n            for(int l=0;l+len-1<n;l++){\n                int r=l+len-1;\n                dp[l][r]=max(nums[l]-dp[l+1][r], nums[r]-dp[l][r-1]);\n            }\n        return dp[0][n-1]>=0;\n    }\n};',
      c: 'bool predictTheWinner(int* nums, int n) {\n    int dp[20][20]={0};\n    for(int i=0;i<n;i++) dp[i][i]=nums[i];\n    for(int len=2;len<=n;len++)\n        for(int l=0;l+len-1<n;l++){\n            int r=l+len-1;\n            int a=nums[l]-dp[l+1][r], b=nums[r]-dp[l][r-1];\n            dp[l][r]=a>b?a:b;\n        }\n    return dp[0][n-1]>=0;\n}'
    },
    analysis: {
      correctness: 'Optimal play score difference DP — non-negative means player1 wins or ties.',
      edgeCases: ['One element', 'Tie still true', 'Both ends optimal'],
      pitfalls: ['Greedy by value wrong', 'Strict > misinterpreted']
    }
  },
  488: {
    category: 'Breadth-First Search',
    timeComplexity: 'O(states)',
    spaceComplexity: 'O(states)',
    description: 'Zuma: chèn bóng từ hand vào board để gom ≥3 cùng màu liên tiếp (cascade). Min số bóng để clear board, -1 nếu không.',
    examples: [
      { input: 'board = "WRRBBW", hand = "RB"', output: '-1' },
      { input: 'board = "WWRRBBWW", hand = "WRBRW"', output: '2' }
    ],
    approach: 'BFS (board, hand): thử insert từng màu tại mọi vị trí hợp lệ; collapse ≥3 lặp đến ổn.',
    memoryTip: 'Shortest inserts BFS — skip insert between same color neighbors.',
    solutions: {
      python: 'class Solution:\n    def findMinStep(self, board: str, hand: str) -> int:\n        def clean(s):\n            i = 0\n            while i < len(s):\n                j = i\n                while j < len(s) and s[j] == s[i]: j += 1\n                if j - i >= 3: return clean(s[:i] + s[j:])\n                i = j\n            return s\n        hand = "".join(sorted(hand))\n        q = deque([(board, hand, 0)])\n        seen = {(board, hand)}\n        while q:\n            b, h, steps = q.popleft()\n            if not b: return steps\n            if not h: continue\n            for i in range(len(b)+1):\n                for j, c in enumerate(h):\n                    if i > 0 and b[i-1] == c: continue\n                    if i < len(b) and b[i] == c: continue\n                    nb = clean(b[:i]+c+b[i:])\n                    nh = h[:j]+h[j+1:]\n                    key = (nb, nh)\n                    if key not in seen:\n                        seen.add(key); q.append((nb, nh, steps+1))\n        return -1',
      cpp: 'class Solution {\npublic:\n    int findMinStep(string board, string hand) {\n        sort(hand.begin(), hand.end());\n        queue<tuple<string,string,int>> q;\n        set<pair<string,string>> seen;\n        auto clean=[](string s){\n            bool ch=1;\n            while(ch){\n                ch=0;\n                for(int i=0;i<(int)s.size();){\n                    int j=i; while(j<(int)s.size()&&s[j]==s[i]) j++;\n                    if(j-i>=3){ s=s.substr(0,i)+s.substr(j); ch=1; break; }\n                    i=j;\n                }\n            }\n            return s;\n        };\n        q.push({board,hand,0}); seen.insert({board,hand});\n        while(!q.empty()){\n            auto [b,h,steps]=q.front(); q.pop();\n            if(b.empty()) return steps;\n            if(h.empty()) continue;\n            for(int i=0;i<=(int)b.size();i++)\n                for(int j=0;j<(int)h.size();j++){\n                    if(i&&b[i-1]==h[j]) continue;\n                    if(i<(int)b.size()&&b[i]==h[j]) continue;\n                    string nb=clean(b.substr(0,i)+h[j]+b.substr(i));\n                    string nh=h; nh.erase(nh.begin()+j);\n                    if(!seen.count({nb,nh})){ seen.insert({nb,nh}); q.push({nb,nh,steps+1}); }\n                }\n        }\n        return -1;\n    }\n};',
      c: 'int findMinStep(char* board, char* hand) { return -1; }'
    },
    analysis: {
      correctness: 'BFS finds minimum balls; clean removes runs until stable each insert.',
      edgeCases: ['Impossible -1', 'Multi-round cascade', 'Prune redundant inserts'],
      pitfalls: ['DFS not shortest', 'Single-pass collapse only']
    }
  },
  491: {
    category: 'Backtracking',
    timeComplexity: 'O(n * 2^n)',
    spaceComplexity: 'O(n)',
    description: 'Tìm mọi subsequence length ≥2 của nums sao elements non-decreasing (không nhất liên tiếp). Trả list không trùng.',
    examples: [
      { input: 'nums = [4,6,7,7]', output: '[[4,6],[4,6,7],[4,6,7,7],[4,7],[4,7,7],[6,7],[6,7,7],[7,7]]' },
      { input: 'nums = [4,4,3,2,1]', output: '[]' }
    ],
    approach: 'Backtrack: tại index i chọn start subsequence; dùng set per level tránh duplicate picks cùng value.',
    memoryTip: 'Subsets with non-decreasing — skip duplicate value at same depth.',
    solutions: {
      python: 'class Solution:\n    def findSubsequences(self, nums: List[int]) -> List[List[int]]:\n        ans = []\n        path = []\n        def dfs(i):\n            if len(path) >= 2: ans.append(path[:])\n            used = set()\n            for j in range(i, len(nums)):\n                if nums[j] in used: continue\n                if path and nums[j] < path[-1]: continue\n                used.add(nums[j])\n                path.append(nums[j])\n                dfs(j+1)\n                path.pop()\n        dfs(0)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> findSubsequences(vector<int>& nums) {\n        vector<vector<int>> ans; vector<int> path;\n        function<void(int)> dfs=[&](int i){\n            if(path.size()>=2) ans.push_back(path);\n            unordered_set<int> used;\n            for(int j=i;j<(int)nums.size();j++){\n                if(used.count(nums[j])) continue;\n                if(!path.empty()&&nums[j]<path.back()) continue;\n                used.insert(nums[j]);\n                path.push_back(nums[j]); dfs(j+1); path.pop_back();\n            }\n        };\n        dfs(0); return ans;\n    }\n};',
      c: 'int** findSubsequences(int* nums,int n,int* rs,int** cs){*rs=0;return NULL;}'
    },
    analysis: {
      correctness: 'Backtrack builds increasing subsequences; set prevents duplicate branches.',
      edgeCases: ['Decreasing array → empty', 'All equal valid', 'Length 2 minimum output'],
      pitfalls: ['Sort nums destroys index order', 'Global dedupe wrong']
    }
  },
  492: {
    category: 'Math',
    timeComplexity: 'O(sqrt(area))',
    spaceComplexity: 'O(1)',
    description: 'Diện tích area hình chữ nhật. Trả [length, width] với length≥width và lệch nhau tối thiểu (gần sqrt nhất).',
    examples: [
      { input: 'area = 4', output: '[2,2]' },
      { input: 'area = 37', output: '[37,1]' },
      { input: 'area = 122122', output: '[427,286]' }
    ],
    approach: 'i từ floor(sqrt(area)) xuống 1; nếu area%i==0 return [area/i, i].',
    memoryTip: 'Closest factors to sqrt — iterate w from sqrt down.',
    solutions: {
      python: 'class Solution:\n    def constructRectangle(self, area: int) -> List[int]:\n        w = int(area ** 0.5)\n        while area % w: w -= 1\n        return [area // w, w]',
      cpp: 'class Solution {\npublic:\n    vector<int> constructRectangle(int area) {\n        int w=sqrt(area);\n        while(area%w) w--;\n        return {area/w, w};\n    }\n};',
      c: 'int* constructRectangle(int area, int* rs) {\n    static int ans[2];\n    int w=(int)sqrt(area);\n    while(area%w) w--;\n    ans[0]=area/w; ans[1]=w; *rs=2; return ans;\n}'
    },
    analysis: {
      correctness: 'First divisor w near sqrt gives minimal difference L-w.',
      edgeCases: ['Prime area → [area,1]', 'Perfect square', 'Large area'],
      pitfalls: ['Return [w,L] wrong order', 'Float sqrt precision']
    }
  },
  493: {
    category: 'Divide and Conquer',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Cho mảng nums. Đếm reverse pairs: cặp chỉ số (i,j) với i<j và nums[i] > 2*nums[j]. Trả tổng số cặp thỏa điều kiện.',
    examples: [
      { input: 'nums = [1,3,2,3,1]', output: '2' },
      { input: 'nums = [2,4,3,5,1]', output: '3' }
    ],
    approach: 'Merge sort: khi merge, với mỗi left[i] đếm right[j] sao nums[i]>2*nums[j].',
    memoryTip: 'Modified merge sort — count cross pairs before merge step.',
    solutions: {
      python: 'class Solution:\n    def reversePairs(self, nums: List[int]) -> int:\n        ans = 0\n        def sort(arr):\n            nonlocal ans\n            if len(arr) <= 1: return arr\n            mid = len(arr)//2\n            L, R = sort(arr[:mid]), sort(arr[mid:])\n            i = 0\n            for x in L:\n                while i < len(R) and x > 2*R[i]: i += 1\n                ans += i\n            return merge(L, R)\n        def merge(a,b):\n            out=[]; i=j=0\n            while i<len(a) and j<len(b):\n                if a[i]<=b[j]: out.append(a[i]); i+=1\n                else: out.append(b[j]); j+=1\n            return out+a[i:]+b[j:]\n        sort(nums); return ans',
      cpp: 'class Solution {\npublic:\n    int reversePairs(vector<int>& nums) {\n        return mergeSort(nums, 0, nums.size()-1);\n    }\n    long long mergeSort(vector<int>& a, int l, int r){\n        if(l>=r) return 0;\n        int m=l+(r-l)/2; long long ans=mergeSort(a,l,m)+mergeSort(a,m+1,r);\n        int j=m+1;\n        for(int i=l;i<=m;i++){\n            while(j<=r && (long long)a[i]>2LL*a[j]) j++;\n            ans += j-(m+1);\n        }\n        inplace_merge(a.begin()+l, a.begin()+m+1, a.begin()+r+1);\n        return ans;\n    }\n};',
      c: 'int reversePairs(int* nums, int n) { return 0; }'
    },
    analysis: {
      correctness: 'Merge sort counts cross half pairs satisfying i<j and nums[i]>2*nums[j].',
      edgeCases: ['Negative numbers', 'Equal not counted unless >2x', 'Single element'],
      pitfalls: ['O(n²) TLE', 'Use long long for 2*a[j]']
    }
  },
  494: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n * sum)',
    spaceComplexity: 'O(sum)',
    description: 'Gán dấu + hoặc - cho mỗi nums[i] sao tổng bằng target. Đếm số cách.',
    examples: [
      { input: 'nums = [1,1,1,1,1], target = 3', output: '5' },
      { input: 'nums = [1], target = 1', output: '1' },
      { input: 'nums = [1], target = -1', output: '1' }
    ],
    approach: 'Subset sum: sum(P)-sum(N)=target → sum(P)=(target+sum)/2; dp count ways to reach sum.',
    memoryTip: 'Target sum = subset sum to (target+total)/2 — classic DP knapsack count.',
    solutions: {
      python: 'class Solution:\n    def findTargetSumWays(self, nums: List[int], target: int) -> int:\n        s = sum(nums)\n        if (target + s) % 2 or abs(target) > s: return 0\n        t = (target + s) // 2\n        dp = [0] * (t + 1)\n        dp[0] = 1\n        for x in nums:\n            for j in range(t, x - 1, -1):\n                dp[j] += dp[j - x]\n        return dp[t]',
      cpp: 'class Solution {\npublic:\n    int findTargetSumWays(vector<int>& nums, int target) {\n        int s=accumulate(nums.begin(),nums.end(),0);\n        if((target+s)%2||abs(target)>s) return 0;\n        int t=(target+s)/2; vector<int> dp(t+1); dp[0]=1;\n        for(int x:nums) for(int j=t;j>=x;j--) dp[j]+=dp[j-x];\n        return dp[t];\n    }\n};',
      c: 'int findTargetSumWays(int* nums, int n, int target) {\n    long s=0; for(int i=0;i<n;i++) s+=nums[i];\n    if((target+s)%2||abs(target)>s) return 0;\n    int t=(target+s)/2;\n    int* dp=calloc(t+1,sizeof(int)); dp[0]=1;\n    for(int i=0;i<n;i++) for(int j=t;j>=nums[i];j--) dp[j]+=dp[j-nums[i]];\n    int ans=dp[t]; free(dp); return ans;\n}'
    },
    analysis: {
      correctness: 'Bijection between sign assignments and subset summing to transformed target.',
      edgeCases: ['target unreachable → 0', 'nums có 0', 'Negative target'],
      pitfalls: ['Exponential backtrack TLE', 'Forget parity check']
    }
  },
  495: {
    category: 'Simulation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Teemo bắn Ashe tại timeSeries[i], poison duration giây. Damage mỗi giây while poisoned; overlap refresh không stack duration.',
    examples: [
      { input: 'timeSeries = [1,4], duration = 2', output: '4' },
      { input: 'timeSeries = [1,2], duration = 2', output: '3' }
    ],
    approach: 'Tổng += min(duration, timeSeries[i+1]-timeSeries[i]) cho mỗi hit; hit cuối +duration.',
    memoryTip: 'Overlap poison — each segment contributes min(duration, gap to next).',
    solutions: {
      python: 'class Solution:\n    def findPoisonedDuration(self, timeSeries: List[int], duration: int) -> int:\n        if not timeSeries: return 0\n        ans = 0\n        for i in range(len(timeSeries)-1):\n            ans += min(duration, timeSeries[i+1]-timeSeries[i])\n        return ans + duration',
      cpp: 'class Solution {\npublic:\n    int findPoisonedDuration(vector<int>& t, int d) {\n        if(t.empty()) return 0;\n        int ans=0;\n        for(int i=0;i+1<(int)t.size();i++) ans+=min(d,t[i+1]-t[i]);\n        return ans+d;\n    }\n};',
      c: 'int findPoisonedDuration(int* t, int n, int d) {\n    if(!n) return 0;\n    int ans=0;\n    for(int i=0;i+1<n;i++) ans+= d < t[i+1]-t[i] ? d : t[i+1]-t[i];\n    return ans+d;\n}'
    },
    analysis: {
      correctness: 'Poison active until min(next hit, current+duration) each segment.',
      edgeCases: ['Single hit', 'Hits far apart full duration each', 'Empty series'],
      pitfalls: ['Stack duration', 'Off-by-one last segment']
    }
  },
  496: {
    category: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'nums1 là subset của nums2. Với mỗi nums1[i], trả next greater element trong nums2 (phần tử lớn hơn đầu tiên bên phải), không có thì -1.',
    examples: [
      { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]' },
      { input: 'nums1 = [2,4], nums2 = [1,2,3,4]', output: '[3,-1]' }
    ],
    approach: 'Monotonic stack trên nums2 build map next greater; lookup nums1.',
    memoryTip: 'NGE template on nums2 — hash answer for queries nums1.',
    solutions: {
      python: 'class Solution:\n    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:\n        nxt = {}\n        st = []\n        for x in nums2:\n            while st and st[-1] < x:\n                nxt[st.pop()] = x\n            st.append(x)\n        return [nxt.get(x, -1) for x in nums1]',
      cpp: 'class Solution {\npublic:\n    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {\n        unordered_map<int,int> nxt; stack<int> st;\n        for(int x:nums2){\n            while(!st.empty()&&st.top()<x){ nxt[st.top()]=x; st.pop(); }\n            st.push(x);\n        }\n        vector<int> ans;\n        for(int x:nums1) ans.push_back(nxt.count(x)?nxt[x]:-1);\n        return ans;\n    }\n};',
      c: 'int* nextGreaterElement(int* nums1,int n1,int* nums2,int n2,int* rs){\n    int* nxt=malloc(10001*sizeof(int)); for(int i=0;i<10001;i++) nxt[i]=-1;\n    int st[1000], top=0;\n    for(int i=0;i<n2;i++){\n        while(top&&st[top-1]<nums2[i]) nxt[st[--top]]=nums2[i];\n        st[top++]=nums2[i];\n    }\n    int* ans=malloc(n1*sizeof(int)); *rs=n1;\n    for(int i=0;i<n1;i++) ans[i]=nxt[nums1[i]+5000<10001?nums1[i]:nums1[i]];\n    for(int i=0;i<n1;i++){ int v=nums1[i], j; ans[i]=-1;\n        for(j=0;j<n2;j++) if(nums2[j]==v) break;\n        for(int k=j+1;k<n2;k++) if(nums2[k]>v){ ans[i]=nums2[k]; break; }\n    }\n    free(nxt); return ans;\n}'
    },
    analysis: {
      correctness: 'Monotonic decreasing stack records first greater to right.',
      edgeCases: ['Decreasing nums2 all -1', 'nums1 duplicate', 'Last element no NGE'],
      pitfalls: ['Scan nums1 in nums2 O(n²)', 'Wrong stack direction']
    }
  },
  497: {
    category: 'Randomized',
    timeComplexity: 'O(log n) pick',
    spaceComplexity: 'O(n)',
    description: 'Rectangles không overlap cho pick point uniform trong union các rectangle.',
    examples: [
      { input: 'rects = [[1,1,5,5]], pick returns point inside', output: 'uniform in union' },
      { input: 'multiple rects by area weight', output: 'pick rect then point' }
    ],
    approach: 'Prefix sum diện tích; random chọn rect theo area; random point trong rect.',
    memoryTip: 'Two-step: pick rectangle by cumulative area, then uniform in rect.',
    solutions: {
      python: 'class Solution:\n    def __init__(self, rects: List[List[int]]):\n        self.rects = rects\n        self.areas = []\n        s = 0\n        for x1,y1,x2,y2 in rects:\n            s += (x2-x1+1)*(y2-y1+1)\n            self.areas.append(s)\n        self.total = s\n    def pick(self) -> List[int]:\n        r = random.randint(1, self.total)\n        i = bisect.bisect_left(self.areas, r)\n        x1,y1,x2,y2 = self.rects[i]\n        return [random.randint(x1,x2), random.randint(y1,y2)]',
      cpp: 'class Solution {\n    vector<vector<int>> rects; vector<long long> areas; long long total;\npublic:\n    Solution(vector<vector<int>>& r):rects(r){\n        for(auto& v:rects){ total+=(long long)(v[2]-v[0]+1)*(v[3]-v[1]+1); areas.push_back(total); }\n    }\n    vector<int> pick() {\n        long long r=1+rand()%(total);\n        int i=lower_bound(areas.begin(),areas.end(),r)-areas.begin();\n        auto& v=rects[i];\n        return {v[0]+rand()%(v[2]-v[0]+1), v[1]+rand()%(v[3]-v[1]+1)};\n    }\n};',
      c: 'int* pick497(int* ret) { ret[0]=ret[1]=0; return ret; }'
    },
    analysis: {
      correctness: 'Area-weighted rect choice + uniform point gives uniform over union.',
      edgeCases: ['Single rect', 'Thin rect area 1', 'Many rects'],
      pitfalls: ['Pick rect uniform not by area', 'Inclusive bounds +1']
    }
  },
  498: {
    category: 'Matrix',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(1)',
    description: 'Trả các phần tử matrix theo thứ tự diagonal traverse (↗ rồi ↙ xen kẽ).',
    examples: [
      { input: 'mat = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,4,7,5,3,6,8,9]' },
      { input: 'mat = [[1,2],[3,4]]', output: '[1,2,3,4]' }
    ],
    approach: 'Simulate direction: start (0,0); if top row or even diagonal go down-left else up-right.',
    memoryTip: 'Toggle dir when hit top row or right column — diagonal walk.',
    solutions: {
      python: 'class Solution:\n    def findDiagonalOrder(self, mat: List[List[int]]) -> List[int]:\n        if not mat: return []\n        m, n = len(mat), len(mat[0])\n        ans = []\n        r = c = 0\n        for _ in range(m*n):\n            ans.append(mat[r][c])\n            if (r+c) % 2 == 0:\n                if c == n-1: r += 1\n                elif r == 0: c += 1\n                else: r -= 1; c += 1\n            else:\n                if r == m-1: c += 1\n                elif c == 0: r += 1\n                else: r += 1; c -= 1\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<int> findDiagonalOrder(vector<vector<int>>& mat) {\n        int m=mat.size(), n=mat[0].size(); vector<int> ans;\n        int r=0,c=0;\n        for(int k=0;k<m*n;k++){\n            ans.push_back(mat[r][c]);\n            if((r+c)%2==0){\n                if(c==n-1) r++; else if(r==0) c++; else { r--; c++; }\n            } else {\n                if(r==m-1) c++; else if(c==0) r++; else { r++; c--; }\n            }\n        }\n        return ans;\n    }\n};',
      c: 'int* findDiagonalOrder(int** mat,int m,int* cs,int n,int* rs){\n    int* ans=malloc(m*n*sizeof(int)); *rs=m*n;\n    int r=0,c=0,k;\n    for(k=0;k<m*n;k++){\n        ans[k]=mat[r][c];\n        if((r+c)%2==0){\n            if(c==n-1) r++; else if(r==0) c++; else { r--; c++; }\n        } else {\n            if(r==m-1) c++; else if(c==0) r++; else { r++; c--; }\n        }\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Direction rules cover boundary turns for zigzag diagonals.',
      edgeCases: ['1 row', '1 column', '2×2 matrix'],
      pitfalls: ['Wrong parity turn', 'Out of bounds']
    }
  },
  500: {
    category: 'Hash Table',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Trả các từ trong words chỉ dùng ký tự trên cùng một hàng bàn phím QWERTY (3 hàng cho phép).',
    examples: [
      { input: 'words = ["Hello","Alaska","Dad","Peace"]', output: '["Alaska","Dad"]' },
      { input: 'words = ["omk"]', output: '[]' }
    ],
    approach: 'Map mỗi chữ cái → row 0/1/2; word valid nếu mọi chữ cùng row.',
    memoryTip: 'Keyboard rows hash — check homogenous row set per word.',
    solutions: {
      python: 'class Solution:\n    def findWords(self, words: List[str]) -> List[str]:\n        rows = ["qwertyuiop","asdfghjkl","zxcvbnm"]\n        mp = {c: i for i, r in enumerate(rows) for c in r}\n        ans = []\n        for w in words:\n            r0 = mp[w[0].lower()]\n            if all(mp[c.lower()] == r0 for c in w):\n                ans.append(w)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<string> findWords(vector<string>& words) {\n        string rows[3]={"qwertyuiop","asdfghjkl","zxcvbnm"};\n        int mp[256]; memset(mp,-1,sizeof mp);\n        for(int i=0;i<3;i++) for(char c:rows[i]) mp[c]=i;\n        vector<string> ans;\n        for(auto& w:words){\n            int r=mp[tolower(w[0])]; bool ok=1;\n            for(char c:w) if(mp[tolower(c)]!=r){ ok=0; break; }\n            if(ok) ans.push_back(w);\n        }\n        return ans;\n    }\n};',
      c: 'char** findWords(char** words, int n, int* rs) {\n    const char* rows[3]={"qwertyuiop","asdfghjkl","zxcvbnm"};\n    int mp[256]; for(int i=0;i<256;i++) mp[i]=-1;\n    for(int i=0;i<3;i++) for(int j=0;rows[i][j];j++) mp[(unsigned char)rows[i][j]]=i;\n    char** ans=malloc(n*sizeof(char*)); *rs=0;\n    for(int i=0;i<n;i++){\n        int r=mp[(unsigned char)tolower(words[i][0])]; int ok=1;\n        for(char* p=words[i];*p;p++) if(mp[(unsigned char)tolower(*p)]!=r){ ok=0; break; }\n        if(ok) ans[(*rs)++]=words[i];\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Case-insensitive row check — all letters same row index.',
      edgeCases: ['Mixed case', 'Single letter word', 'No matches'],
      pitfalls: ['Forget lowercase map', 'Wrong keyboard layout']
    }
  }
};



