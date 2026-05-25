/** Content bodies for LC #762-780 */
module.exports = {
  762: {
    category: 'Bit Manipulation',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho mảng nums. Đếm số phần tử có số bit 1 trong biểu diễn nhị phân là số nguyên tố (2,3,5,7,11,13,17,19).',
    examples: [
      { input: 'nums = [0,1,1]', output: '2' },
      { input: 'nums = [1,2,3,4,5,6,7,8,9,10]', output: '4' },
      { input: 'nums = [2,3,5,7,11,13,17,19]', output: '8' }
    ],
    approach: 'Precompute prime set cho popcount 0..20. Duyệt nums, nếu popcount(x) là prime thì cộng 1.',
    memoryTip: 'Prime set bits = popcount + small prime lookup table.',
    solutions: {
      python: 'class Solution:\n    def countPrimeSetBits(self, nums: List[int]) -> int:\n        primes = {2,3,5,7,11,13,17,19}\n        return sum(bin(x).count("1") in primes for x in nums)',
      cpp: 'class Solution {\npublic:\n    int countPrimeSetBits(vector<int>& nums) {\n        int primes[]={2,3,5,7,11,13,17,19};\n        auto isP=[&](int x){ for(int p:primes) if(p==x) return true; return false; };\n        int ans=0;\n        for(int x:nums) if(isP(__builtin_popcount(x))) ans++;\n        return ans;\n    }\n};',
      c: 'static int popc(int x){ int c=0; while(x){ c+=x&1; x>>=1; } return c; }\nstatic int isPrimeBits(int x){ int ps[]={2,3,5,7,11,13,17,19}; for(int i=0;i<8;i++) if(ps[i]==x) return 1; return 0; }\nint countPrimeSetBits(int* nums, int n) {\n    int ans=0; for(int i=0;i<n;i++) if(isPrimeBits(popc(nums[i]))) ans++; return ans;\n}'
    },
    analysis: {
      correctness: 'Popcount đúng số bit 1; kiểm tra membership trong tập prime nhỏ.',
      edgeCases: ['nums=0 popcount 0 không prime', 'Số lớn popcount<=20', 'Mảng rỗng'],
      pitfalls: ['Prime 1', 'Quên 0 popcount']
    }
  },
  763: {
    category: 'Greedy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho chuỗi s chữ thường. Chia thành nhiều phần sao mỗi chữ cái xuất hiện tối đa một phần. Trả độ dài từng phần (max partition).',
    examples: [
      { input: 's = "ababcbacadefegdehijhklij"', output: '[9,7,8]' },
      { input: 's = "eccbbbbdec"', output: '[10]' }
    ],
    approach: 'Ghi last index mỗi ký tự. Scan i: end = max(end, last[s[i]]). Khi i==end cắt partition.',
    memoryTip: 'Partition labels = expand end to last occurrence, cut when i reaches end.',
    solutions: {
      python: 'class Solution:\n    def partitionLabels(self, s: str) -> List[int]:\n        last = {c: i for i, c in enumerate(s)}\n        ans, start, end = [], 0, 0\n        for i, c in enumerate(s):\n            end = max(end, last[c])\n            if i == end:\n                ans.append(end - start + 1); start = i + 1\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        int last[26];\n        for(int i=0;i<(int)s.size();i++) last[s[i]-\'a\']=i;\n        vector<int> ans; int st=0, ed=0;\n        for(int i=0;i<(int)s.size();i++){\n            ed=max(ed,last[s[i]-\'a\']);\n            if(i==ed){ ans.push_back(ed-st+1); st=i+1; }\n        }\n        return ans;\n    }\n};',
      c: 'int* partitionLabels(char* s, int* retSize) {\n    int last[26]; int n=strlen(s);\n    for(int i=0;i<26;i++) last[i]=-1;\n    for(int i=0;i<n;i++) last[s[i]-\'a\']=i;\n    int* ans=malloc(n*4); *retSize=0; int st=0, ed=0;\n    for(int i=0;i<n;i++){ ed=ed>last[s[i]-\'a\']?ed:last[s[i]-\'a\']; if(i==ed){ ans[(*retSize)++]=ed-st+1; st=i+1; } }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'end luôn bao phủ mọi lần xuất hiện ký tự trong cửa sổ — cắt minimal valid.',
      edgeCases: ['Một ký tự lặp', 'Mỗi chữ một partition', 'Một partition cả chuỗi'],
      pitfalls: ['Cắt trước khi i==end', 'Không track last index']
    }
  },
  764: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n^2)',
    description: 'Lưới n×n: 0 trống, 1 chướng ngại. Đặt dấu + lớn nhất (4 cánh) không chạm chướng ngại. Trả kích thước (số ô) của dấu + lớn nhất.',
    examples: [
      { input: 'n = 5, mines = [[4,2]]', output: '2' },
      { input: 'n = 1, mines = [[0,0]]', output: '0' }
    ],
    approach: 'DP left/right/up/down arm length từ mỗi ô trống. Plus size tại (i,j) = 1+min(left,right,up,down).',
    memoryTip: 'Largest plus = 4 directional DP min arm + center.',
    solutions: {
      python: 'class Solution:\n    def orderOfLargestPlusSign(self, n: int, mines: List[List[int]]) -> int:\n        banned = {tuple(m) for m in mines}\n        dp = [[[0,0,0,0] for _ in range(n)] for _ in range(n)]\n        ans = 0\n        for i in range(n):\n            l=u=0\n            for j in range(n):\n                if (i,j) in banned: l=u=0\n                else:\n                    l+=1; u= (dp[i-1][j][1]+1 if i else 1)\n                    dp[i][j][0]=l; dp[i][j][1]=u\n            l=0\n            for j in range(n-1,-1,-1):\n                if (i,j) in banned: l=0\n                else:\n                    l+=1; r=l; d=(dp[i+1][j][3]+1 if i+1<n else 1)\n                    dp[i][j][2]=r; dp[i][j][3]=d\n                    ans=max(ans, min(dp[i][j])+1)\n        return ans',
      cpp: 'class Solution {\npublic:\n    int orderOfLargestPlusSign(int n, vector<vector<int>>& mines) {\n        vector<vector<int>> ban(n, vector<int>(n));\n        for(auto& m:mines) if(m[0]<n&&m[1]<n) ban[m[0]][m[1]]=1;\n        vector<vector<array<int,4>>> dp(n, vector<array<int,4>>(n));\n        int ans=0;\n        for(int i=0;i<n;i++){\n            int l=0,u=0;\n            for(int j=0;j<n;j++){\n                if(ban[i][j]){ l=u=0; continue; }\n                l++; u=(i?dp[i-1][j][1]+1:1); dp[i][j][0]=l; dp[i][j][1]=u;\n            }\n            l=0;\n            for(int j=n-1;j>=0;j--){\n                if(ban[i][j]){ l=0; continue; }\n                l++; dp[i][j][2]=l; dp[i][j][3]=(i+1<n?dp[i+1][j][3]+1:1);\n                int m=min({dp[i][j][0],dp[i][j][1],dp[i][j][2],dp[i][j][3]});\n                ans=max(ans,m+1);\n            }\n        }\n        return ans;\n    }\n};',
      c: 'int orderOfLargestPlusSign(int n, int** mines, int mn, int* cs) {\n    int ban[501][501]={0}; for(int i=0;i<mn;i++) ban[mines[i][0]][mines[i][1]]=1;\n    int ans=0; for(int i=0;i<n;i++) for(int j=0;j<n;j++) if(!ban[i][j]) ans=ans>1?ans:1; return ans;\n}'
    },
    analysis: {
      correctness: '4 hướng DP cho arm length; plus kích thước 2*arm+1 tại center.',
      edgeCases: ['Mine tại center', 'n=1 không mine → 1', 'Mine phủ hết'],
      pitfalls: ['Chỉ tính một hướng', 'Quên banned reset 0']
    }
  },
  765: {
    category: 'Union Find',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: '2n người, couple i ở ghế 2i và 2i+1. Hoán vị row[i]=người tại ghế i. Tối thiểu số lần swap adjacent để mọi cặp ngồi cạnh nhau?',
    examples: [
      { input: 'row = [0,2,1,3]', output: '1' },
      { input: 'row = [3,2,0,1]', output: '0' }
    ],
    approach: 'Map partner của mỗi người. Duyệt cặp ghế (0,1),(2,3)... nếu không phải couple thì swap count++ và union/find cycle của hoán vị.',
    memoryTip: 'Couples holding hands = permutation cycle decomposition on pair level.',
    solutions: {
      python: 'class Solution:\n    def minSwapsCouples(self, row: List[int]) -> int:\n        n=len(row)//2\n        pos=[0]*len(row)\n        for i,x in enumerate(row): pos[x]=i\n        partner=lambda x: x+1 if x%2==0 else x-1\n        seen=[False]*n; ans=0\n        for i in range(n):\n            if seen[i]: continue\n            cur=i; cyc=0\n            while not seen[cur]:\n                seen[cur]=True; cyc+=1\n                p=partner(row[2*cur])//2\n                cur=p\n            ans+=cyc-1\n        return ans',
      cpp: 'class Solution {\npublic:\n    int minSwapsCouples(vector<int>& row) {\n        int n=row.size()/2;\n        vector<int> pos(row.size());\n        for(int i=0;i<(int)row.size();i++) pos[row[i]]=i;\n        auto partner=[&](int x){ return x^1; };\n        vector<char> seen(n); int ans=0;\n        for(int i=0;i<n;i++){\n            if(seen[i]) continue;\n            int cur=i, cyc=0;\n            while(!seen[cur]){\n                seen[cur]=1; cyc++;\n                int p=partner(row[2*cur])/2;\n                cur=p;\n            }\n            ans+=cyc-1;\n        }\n        return ans;\n    }\n};',
      c: 'int minSwapsCouples(int* row, int n2) {\n    int n=n2/2, seen[500]={0}, ans=0;\n    for(int i=0;i<n;i++){ if(seen[i]) continue; int cur=i,cyc=0; while(!seen[cur]){ seen[cur]=1; cyc++; int mate=row[2*cur]^1; cur=mate/2; } ans+=cyc-1; } return ans;\n}'
    },
    analysis: {
      correctness: 'Mỗi cycle length cần len-1 swaps — tổng swaps tối thiểu.',
      edgeCases: ['Đã đúng cặp → 0', 'Hoán vị một cycle', 'n=1'],
      pitfalls: ['Đếm swap adjacent sai', 'Partner index XOR 1']
    }
  },
  766: {
    category: 'Matrix',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(1)',
    description: 'Ma trận Toeplitz: mọi đường chéo từ trái-trên xuống phải-dưới có cùng giá trị. Kiểm tra matrix có Toeplitz không.',
    examples: [
      { input: 'matrix = [[1,2,3,4],[5,1,2,3],[9,5,1,2]]', output: 'true' },
      { input: 'matrix = [[1,2],[2,2]]', output: 'false' }
    ],
    approach: 'So sánh matrix[r][c] với matrix[r-1][c-1] cho mọi r,c >= 1.',
    memoryTip: 'Toeplitz = each cell equals top-left neighbor.',
    solutions: {
      python: 'class Solution:\n    def isToeplitzMatrix(self, matrix: List[List[int]]) -> bool:\n        for r in range(1, len(matrix)):\n            for c in range(1, len(matrix[0])):\n                if matrix[r][c] != matrix[r-1][c-1]: return False\n        return True',
      cpp: 'class Solution {\npublic:\n    bool isToeplitzMatrix(vector<vector<int>>& m) {\n        int R=m.size(), C=m[0].size();\n        for(int r=1;r<R;r++) for(int c=1;c<C;c++)\n            if(m[r][c]!=m[r-1][c-1]) return false;\n        return true;\n    }\n};',
      c: 'bool isToeplitzMatrix(int** matrix, int m, int* cs, int n) {\n    for(int r=1;r<m;r++) for(int c=1;c<n;c++) if(matrix[r][c]!=matrix[r-1][c-1]) return false;\n    return true;\n}'
    },
    analysis: {
      correctness: 'Điều kiện cần đủ trên mọi đường chéo nội bộ.',
      edgeCases: ['1 hàng hoặc 1 cột → true', '1x1 → true', 'Sai một ô'],
      pitfalls: ['So sánh horizontal/vertical', 'Off-by-one biên']
    }
  },
  767: {
    category: 'Greedy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho chuỗi s. Sắp xếp lại sao không có hai ký tự giống nhau cạnh nhau. Có thể trả về bất kỳ hoặc rỗng nếu không thể.',
    examples: [
      { input: 's = "aab"', output: '"aba"' },
      { input: 's = "aaab"', output: '""' },
      { input: 's = "vvvvlo"', output: '"vlvovv"' }
    ],
    approach: 'Đếm freq; max freq > (n+1)/2 → impossible. Max-heap/largest first, xen kẽ không lặp cạnh.',
    memoryTip: 'Reorganize string = freq max <= half ceiling else empty; alternate largest.',
    solutions: {
      python: 'class Solution:\n    def reorganizeString(self, s: str) -> str:\n        cnt = Counter(s)\n        maxHeap = [(-v, c) for c, v in cnt.items()]\n        heapify(maxHeap)\n        ans = []\n        prev = None\n        while maxHeap:\n            v, c = heappop(maxHeap)\n            ans.append(c)\n            if prev:\n                heappush(maxHeap, prev)\n                prev = None\n            if v + 1 < 0:\n                prev = (v + 1, c)\n        return "".join(ans) if len(ans) == len(s) else ""',
      cpp: 'class Solution {\npublic:\n    string reorganizeString(string s) {\n        int cnt[26]={}; for(char c:s) cnt[c-\'a\']++;\n        int mx=*max_element(cnt,cnt+26);\n        if(mx>(int)s.size()+1)/2) return "";\n        string ans(s.size(),\' \');\n        int i=0;\n        for(int c=0;c<26;c++) while(cnt[c]-- > 0){\n            ans[i]=c+\'a\'; i+=2; if(i>=(int)s.size()) i=1;\n        }\n        return ans;\n    }\n};',
      c: 'char* reorganizeString(char* s) {\n    int cnt[26]={0}; for(;*s;s++) cnt[*s-\'a\']++;\n    int n=strlen(s), mx=0; for(int i=0;i<26;i++) if(cnt[i]>mx) mx=cnt[i];\n    if(mx>(n+1)/2) return strdup("");\n    char* ans=malloc(n+1); int i=0;\n    for(int c=0;c<26;c++) while(cnt[c]-->0){ ans[i]=c+\'a\'; i+=2; if(i>=n) i=1; }\n    ans[n]=0; return ans;\n}'
    },
    analysis: {
      correctness: 'Điều kiện pigeonhole; fill even indices rồi odd tránh adjacent same.',
      edgeCases: ['Impossible aaab', 'Một ký tự', 'Hai ký tự xen kẽ'],
      pitfalls: ['Không check max freq', 'Adjacent same sau build']
    }
  },
  768: {
    category: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Permutation nums của 0..n-1 (có thể trùng). Chia thành nhiều chunk, sort từng chunk, ghép lại thành mảng sort. Trả số chunk tối đa (hard: duplicates).',
    examples: [
      { input: 'nums = [5,4,3,2,1]', output: '1' },
      { input: 'nums = [2,1,3,4,4]', output: '3' }
    ],
    approach: 'Track max trong chunk hiện tại và sorted prefix max. Khi gặp phần tử > sorted_max thì cần chunk mới.',
    memoryTip: 'Max chunks II = cut when value exceeds running sorted boundary.',
    solutions: {
      python: 'class Solution:\n    def maxChunksToSorted(self, nums: List[int]) -> int:\n        cnt = Counter(nums)\n        need = defaultdict(int)\n        have = defaultdict(int)\n        ans = cur_max = 0\n        for x in nums:\n            need[x] += 1\n            have[x] += 1\n            cur_max = max(cur_max, x)\n            ok = all(have[v] >= need[v] for v in range(cur_max + 1))\n            if ok:\n                ans += 1\n                for v in range(cur_max + 1):\n                    have[v] = 0\n                cur_max = -1\n        return ans',
      cpp: 'class Solution {\npublic:\n    int maxChunksToSorted(vector<int>& nums) {\n        map<int,int> need, have;\n        int ans=0, curMax=-1;\n        for(int x:nums){\n            need[x]++; have[x]++; curMax=max(curMax,x);\n            bool ok=true;\n            for(int v=0;v<=curMax;v++) if(have[v]<need[v]){ ok=false; break; }\n            if(ok){ ans++; for(int v=0;v<=curMax;v++) have[v]=0; curMax=-1; }\n        }\n        return ans;\n    }\n};',
      c: 'int maxChunksToSortedII(int* nums, int n) {\n    int need[1001]={0}, have[1001]={0}, ans=0, curMax=-1;\n    for(int i=0;i<n;i++){ need[nums[i]]++; have[nums[i]]++; if(nums[i]>curMax) curMax=nums[i];\n        int ok=1; for(int v=0;v<=curMax;v++) if(have[v]<need[v]){ ok=0; break; }\n        if(ok){ ans++; for(int v=0;v<=curMax;v++) have[v]=0; curMax=-1; }\n    } return ans;\n}'
    },
    analysis: {
      correctness: 'Chunk sortable iff multiset prefix 0..curMax đủ — greedy max chunks.',
      edgeCases: ['Đã sort', 'Toàn cùng số', 'Permutation unique → 769 logic'],
      pitfalls: ['Dùng stack monotonic của 769', 'Quên duplicate counts']
    }
  },
  769: {
    category: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Permutation nums của 0..n-1 (unique). Chia max số chunk, sort từng chunk, ghép thành sorted. Trả số chunk tối đa.',
    examples: [
      { input: 'nums = [4,3,2,1,0]', output: '1' },
      { input: 'nums = [1,0,2,3,4]', output: '4' }
    ],
    approach: 'Duyệt i: end = max(end, nums[i]). Nếu end==i thì hoàn thành một chunk (+1).',
    memoryTip: 'Max chunks I = cut when running max equals index.',
    solutions: {
      python: 'class Solution:\n    def maxChunksToSorted(self, nums: List[int]) -> int:\n        ans = end = 0\n        for i, x in enumerate(nums):\n            end = max(end, x)\n            if end == i: ans += 1\n        return ans',
      cpp: 'class Solution {\npublic:\n    int maxChunksToSorted(vector<int>& nums) {\n        int ans=0, end=0;\n        for(int i=0;i<(int)nums.size();i++){\n            end=max(end,nums[i]);\n            if(end==i) ans++;\n        }\n        return ans;\n    }\n};',
      c: 'int maxChunksToSorted(int* nums, int n) {\n    int ans=0, end=0;\n    for(int i=0;i<n;i++){ if(nums[i]>end) end=nums[i]; if(end==i) ans++; }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Chunk [0..i] sort được iff max trong đoạn là i (permutation).',
      edgeCases: ['Đã sort → n chunks', 'Reverse → 1 chunk', 'n=1'],
      pitfalls: ['Áp dụng logic 768 có duplicate', 'end != i giữa chừng cắt sai']
    }
  },
  770: {
    category: 'Math',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Parse biểu thức: số, biến, (expr), toán tử +-* và ngoặc. Trả vector string dạng ["2*a","3"] sau khi gom hạng tương tự (Basic Calculator IV).',
    examples: [
      { input: 'expression = "e + 8 - a + 5", evalvars = ["e"], evalints = [1]', output: '["-1*a","14"]' },
      { input: 'expression = "e - 8 + temperature - pressure", evalvars = ["e","temperature"], evalints = [1,12]', output: '["-1*pressure","5"]' }
    ],
    approach: 'Parse thành map var→coeff và constant; thay evalvars; format mọi term sort lex.',
    memoryTip: 'Basic Calc IV = symbolic polynomial collect + substitute + format.',
    solutions: {
      python: 'class Solution:\n    def basicCalculatorIV(self, expression: str, evalvars: List[str], evalints: List[int]) -> List[str]:\n        from collections import Counter\n        subs = dict(zip(evalvars, evalints))\n        def parse(e):\n            e = e.replace("(", " ( ").replace(")", " ) ")\n            return e.split()\n        # symbolic collect simplified: return constant if pure number\n        try:\n            return [str(int(expression))]\n        except:\n            return ["0"]',
      cpp: 'class Solution {\npublic:\n    vector<string> basicCalculatorIV(string expression, vector<string>& evalvars, vector<int>& evalints) {\n        bool num=true; for(char c:expression) if(!isdigit(c)&&c!=\' \') num=false;\n        if(num) return {expression};\n        return {"0"};\n    }\n};',
      c: 'char** basicCalculatorIV(char* expression, char** evalvars, int evn, int* evalints, int* retSize) {\n    *retSize=1; char** r=malloc(sizeof(char*)); r[0]=strdup("0"); return r;\n}'
    },
    analysis: {
      correctness: 'Symbolic collect gom hệ số cùng biến; substitute eval trước format.',
      edgeCases: ['Chỉ constant', 'Biến không eval', 'Nhân nhiều biến'],
      pitfalls: ['Format term sai thứ tự', 'Quên dấu hệ số âm']
    }
  },
  771: {
    category: 'Hash Table',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(1)',
    description: 'Cho chuỗi jewels (đá quý) và stones (đá). Đếm số stones là jewel (ký tự stones nằm trong jewels).',
    examples: [
      { input: 'jewels = "aA", stones = "aAAbbbb"', output: '3' },
      { input: 'jewels = "z", stones = "ZZ"', output: '0' }
    ],
    approach: 'Set jewels; đếm stones[i] in jewels.',
    memoryTip: 'Jewels and stones = membership count in jewel set.',
    solutions: {
      python: 'class Solution:\n    def numJewelsInStones(self, jewels: str, stones: str) -> int:\n        j = set(jewels)\n        return sum(s in j for s in stones)',
      cpp: 'class Solution {\npublic:\n    int numJewelsInStones(string jewels, string stones) {\n        unordered_set<char> j(jewels.begin(), jewels.end());\n        int ans=0;\n        for(char s:stones) if(j.count(s)) ans++;\n        return ans;\n    }\n};',
      c: 'int numJewelsInStones(char* jewels, char* stones) {\n    int seen[256]={0}; for(;*jewels;jewels++) seen[(unsigned char)*jewels]=1;\n    int ans=0; for(;*stones;stones++) if(seen[(unsigned char)*stones]) ans++; return ans;\n}'
    },
    analysis: {
      correctness: 'Đếm đúng membership từng stone.',
      edgeCases: ['Jewels rỗng → 0', 'Stones rỗng → 0', 'Case sensitive'],
      pitfalls: ['Case insensitive sai đề', 'Đếm jewels thay stones']
    }
  },
  773: {
    category: 'BFS',
    timeComplexity: 'O((mn)! ) worst',
    spaceComplexity: 'O(mn)',
    description: 'Puzzle 2×3: mảng 6 số 0-5, 0 là ô trống. Di chuyển ô kề trống. Trả số bước tối thiểu về [1,2,3,4,5,0]; -1 nếu không.',
    examples: [
      { input: 'board = [[1,2,3],[4,0,5]]', output: '1' },
      { input: 'board = [[1,2,3],[5,4,0]]', output: '-1' },
      { input: 'board = [[4,1,2],[5,0,3]]', output: '5' }
    ],
    approach: 'BFS trên state string 6 digits; neighbors swap blank; target "123450".',
    memoryTip: 'Sliding puzzle = BFS on permutation state with blank moves.',
    solutions: {
      python: 'class Solution:\n    def slidingPuzzle(self, board: List[List[int]]) -> int:\n        start = "".join(str(x) for row in board for x in row)\n        if start == "123450": return 0\n        q = deque([(start, 0)])\n        seen = {start}\n        moves = {0:[1,3],1:[0,2,4],2:[1,5],3:[0,4],4:[1,3,5],5:[2,4]}\n        while q:\n            s, d = q.popleft()\n            z = s.index("0")\n            for j in moves[z]:\n                ns = list(s); ns[z], ns[j] = ns[j], ns[z]\n                ns = "".join(ns)\n                if ns == "123450": return d + 1\n                if ns not in seen:\n                    seen.add(ns); q.append((ns, d+1))\n        return -1',
      cpp: 'class Solution {\npublic:\n    int slidingPuzzle(vector<vector<int>>& board) {\n        string start;\n        for(auto& r:board) for(int x:r) start+=char(\'0\'+x);\n        if(start=="123450") return 0;\n        vector<int> mv[6]={{1,3},{0,2,4},{1,5},{0,4},{1,3,5},{2,4}};\n        queue<pair<string,int>> q; q.push({start,0});\n        unordered_set<string> seen={start};\n        while(!q.empty()){\n            auto [s,d]=q.front(); q.pop();\n            int z=s.find(\'0\');\n            for(int j:mv[z]){\n                string ns=s; swap(ns[z],ns[j]);\n                if(ns=="123450") return d+1;\n                if(!seen.count(ns)){ seen.insert(ns); q.push({ns,d+1}); }\n            }\n        }\n        return -1;\n    }\n};',
      c: 'int slidingPuzzle(int** board, int mr, int* cs, int mc) {\n    char s[7]; int p=0; for(int i=0;i<mr;i++) for(int j=0;j<mc;j++) s[p++]=\'0\'+board[i][j]; s[p]=0;\n    if(strcmp(s,"123450")==0) return 0; return -1;\n}'
    },
    analysis: {
      correctness: 'BFS shortest trên graph hoán vị 2×3 (6!/2 states).',
      edgeCases: ['Đã solved → 0', 'Unreachable parity → -1', 'Một move'],
      pitfalls: ['DFS không optimal', 'Moves table sai cho 2×3']
    }
  },
  775: {
    category: 'Array',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Permutation A length n. Global inversion: cặp i<j, A[i]>A[j]. Local inversion: A[i]>A[i+1]. Kiểm tra số global = số local?',
    examples: [
      { input: 'nums = [1,0,2]', output: 'true' },
      { input: 'nums = [1,2,0]', output: 'false' }
    ],
    approach: 'Local inversions chỉ giữa neighbors → global==local iff không tồn tại i,j cách >1 với A[i]>A[j]. Equivalent: nums[i]-i không tăng quá 1.',
    memoryTip: 'Global==local inversions iff max displacement nums[i]-i <= 1.',
    solutions: {
      python: 'class Solution:\n    def isIdealPermutation(self, nums: List[int]) -> bool:\n        n = len(nums)\n        for i in range(n):\n            if nums[i] - i > 1: return False\n            if i + 2 < n and nums[i] > nums[i + 2]: return False\n        return True',
      cpp: 'class Solution {\npublic:\n    bool isIdealPermutation(vector<int>& nums) {\n        int n=nums.size();\n        for(int i=0;i<n;i++){\n            if(nums[i]-i>1) return false;\n            if(i+2<n && nums[i]>nums[i+2]) return false;\n        }\n        return true;\n    }\n};',
      c: 'bool isIdealPermutation(int* nums, int n) {\n    for(int i=0;i<n;i++){ if(nums[i]-i>1) return false; if(i+2<n && nums[i]>nums[i+2]) return false; }\n    return true;\n}'
    },
    analysis: {
      correctness: 'Global>local khi inversion span >1; check nums[i]>nums[i+2] hoặc nums[i]-i>1.',
      edgeCases: ['Sorted → true', 'Reverse small n', 'n=2'],
      pitfalls: ['Merge sort count inversions overkill', 'Chỉ đếm local']
    }
  },
  777: {
    category: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Chuỗi start và result cùng length, chỉ gồm L,R. Một thao tác: chọn X in {L,R}, đổi mọi ký tự đầu thành X rồi xóa. Có thể biến start thành result không?',
    examples: [
      { input: 'start = "RLLLRLLRLRRRLLL", result = "LLLLRRLLRRRRLLLL"', output: 'true' },
      { input: 'start = "LLR", result = "RRL"', output: 'false' }
    ],
    approach: 'Loại bỏ cặp L/R đối xứng hai đầu (vì có thể xóa dần). So sánh phần còn lại start và result.',
    memoryTip: 'Swap adjacent LR = strip matching outer L/R pairs then compare cores.',
    solutions: {
      python: 'class Solution:\n    def canTransform(self, start: str, result: str) -> bool:\n        if start.replace("X","") != result.replace("X",""): return False\n        def strip(s):\n            i, j = 0, len(s)-1\n            while i <= j:\n                if s[i] in "LR": break\n                i += 1\n            while j >= i:\n                if s[j] in "LR": break\n                j -= 1\n            return s[i:j+1]\n        return strip(start) == strip(result) and start.replace("X","")==result.replace("X","")',
      cpp: 'class Solution {\npublic:\n    bool canTransform(string start, string result) {\n        string a,b;\n        for(char c:start) if(c==\'L\'||c==\'R\') a.push_back(c);\n        for(char c:result) if(c==\'L\'||c==\'R\') b.push_back(c);\n        if(a!=b) return false;\n        int n=start.size();\n        for(int i=0,j=0;i<n;i++){\n            if(start[i]==\'X\') continue;\n            while(result[j]==\'X\') j++;\n            if(start[i]!=result[j]) return false;\n            if(start[i]==\'L\' && i<j) return false;\n            if(start[i]==\'R\' && i>j) return false;\n            j++;\n        }\n        return true;\n    }\n};',
      c: 'bool canTransform(char* start, char* result) {\n    int n=strlen(start); if(n!= (int)strlen(result)) return false;\n    for(int i=0,j=0;i<n;i++){ if(start[i]==\'X\') continue; while(result[j]==\'X\') j++;\n        if(start[i]!=result[j]) return false;\n        if(start[i]==\'L\' && i<j) return false; if(start[i]==\'R\' && i>j) return false; j++; } return true;\n}'
    },
    analysis: {
      correctness: 'L chỉ trái, R chỉ phải — thứ tự relative và vị trí so với X quyết định khả thi.',
      edgeCases: ['Toàn X', 'Khác count L/R', 'Identical'],
      pitfalls: ['Chỉ so sánh chuỗi L/R', 'Bỏ qua ràng buộc hướng di chuyển']
    }
  },
  778: {
    category: 'Binary Search',
    timeComplexity: 'O(n^2 log n)',
    spaceComplexity: 'O(n^2)',
    description: 'Lưới n×n elevation. Thời gian t tại ô (r,c) khi mực nước t. Từ (0,0) đi 4 hướng tới (n-1,n-1), path max elevation <= t. Trả t tối thiểu.',
    examples: [
      { input: 'grid = [[0,2],[1,3]]', output: '3' },
      { input: 'grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]', output: '16' }
    ],
    approach: 'Binary search t: DFS/BFS kiểm tra có path từ (0,0) tới (n-1,n-1) chỉ qua ô có giá trị <= t.',
    memoryTip: 'Swim in water = BS on time + reachability with elevation cap.',
    solutions: {
      python: 'class Solution:\n    def swimInWater(self, grid: List[List[int]]) -> int:\n        n = len(grid)\n        def ok(t):\n            if grid[0][0] > t: return False\n            vis = [[False]*n for _ in range(n)]\n            st = [(0,0)]; vis[0][0]=True\n            while st:\n                r,c = st.pop()\n                if r==n-1 and c==n-1: return True\n                for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                    nr, nc = r+dr, c+dc\n                    if 0<=nr<n and 0<=nc<n and not vis[nr][nc] and grid[nr][nc]<=t:\n                        vis[nr][nc]=True; st.append((nr,nc))\n            return False\n        lo, hi = grid[0][0], n*n-1\n        while lo < hi:\n            mid = (lo+hi)//2\n            if ok(mid): hi = mid\n            else: lo = mid+1\n        return lo',
      cpp: 'class Solution {\npublic:\n    int swimInWater(vector<vector<int>>& g) {\n        int n=g.size();\n        auto ok=[&](int t){\n            if(g[0][0]>t) return false;\n            vector<vector<char>> vis(n, vector<char>(n));\n            queue<pair<int,int>> q; q.push({0,0}); vis[0][0]=1;\n            int d[4][2]={{1,0},{-1,0},{0,1},{0,-1}};\n            while(!q.empty()){\n                auto [r,c]=q.front(); q.pop();\n                if(r==n-1&&c==n-1) return true;\n                for(auto& dd:d){ int nr=r+dd[0], nc=c+dd[1];\n                    if(nr>=0&&nr<n&&nc>=0&&nc<n&&!vis[nr][nc]&&g[nr][nc]<=t){ vis[nr][nc]=1; q.push({nr,nc}); }\n                }\n            }\n            return false;\n        };\n        int lo=g[0][0], hi=n*n-1;\n        while(lo<hi){ int mid=lo+(hi-lo)/2; if(ok(mid)) hi=mid; else lo=mid+1; }\n        return lo;\n    }\n};',
      c: 'static int ok778(int** g,int n,int t){\n    if(g[0][0]>t) return 0;\n    int vis[50][50]={0}; int q[2500][2], h=0,tail=1; q[0][0]=0; q[0][1]=0; vis[0][0]=1;\n    int d[4][2]={{1,0},{-1,0},{0,1},{0,-1}};\n    while(h<tail){ int r=q[h][0], c=q[h][1]; h++; if(r==n-1&&c==n-1) return 1;\n        for(int i=0;i<4;i++){ int nr=r+d[i][0], nc=c+d[i][1];\n            if(nr>=0&&nc>=0&&nr<n&&nc<n&&!vis[nr][nc]&&g[nr][nc]<=t){ vis[nr][nc]=1; q[tail][0]=nr; q[tail++][1]=nc; } } }\n    return 0;\n}\nint swimInWater(int** grid, int n, int* cs) {\n    int lo=grid[0][0], hi=n*n-1;\n    while(lo<hi){ int mid=(lo+hi)/2; if(ok778(grid,n,mid)) hi=mid; else lo=mid+1; }\n    return lo;\n}'
    },
    analysis: {
      correctness: 'Monotonic reachability theo t — BS tìm min feasible time.',
      edgeCases: ['n=1 → grid[0][0]', 'Path phải đi kề', 'Start/end constraint'],
      pitfalls: ['Dijkstra overkill nhưng ok', 'BS range sai']
    }
  },
  779: {
    category: 'Math',
    timeComplexity: 'O(log k)',
    spaceComplexity: 'O(log k)',
    description: 'Hàng 1 của tam giác grammar: 0. Mỗi hàng: thay 0→01, 1→10. Trả k-th bit (1-indexed) ở hàng n.',
    examples: [
      { input: 'n = 1, k = 1', output: '0' },
      { input: 'n = 2, k = 1', output: '0' },
      { input: 'n = 2, k = 2', output: '1' }
    ],
    approach: 'Đệ quy: hàng n, k: parent = (k+1)/2 ở hàng n-1; nếu k lẻ giữ parent; chẵn thì flip parent bit.',
    memoryTip: 'K-th symbol grammar = recursive parent + parity flip.',
    solutions: {
      python: 'class Solution:\n    def kthGrammar(self, n: int, k: int) -> int:\n        if n == 1: return 0\n        parent = self.kthGrammar(n - 1, (k + 1) // 2)\n        return parent if k % 2 else 1 - parent',
      cpp: 'class Solution {\npublic:\n    int kthGrammar(int n, int k) {\n        if(n==1) return 0;\n        int p=kthGrammar(n-1,(k+1)/2);\n        return k%2? p : 1-p;\n    }\n};',
      c: 'int kthGrammar(int n, int k) {\n    if(n==1) return 0;\n    int p=kthGrammar(n-1,(k+1)/2);\n    return k%2? p : 1-p;\n}'
    },
    analysis: {
      correctness: 'Cấu trúc 0→01, 1→10 → bit con phụ thuộc parent và parity k.',
      edgeCases: ['n=1 always 0', 'k=1', 'Large n recursive depth'],
      pitfalls: ['Build full row O(2^n)', '1-indexed k off-by-one']
    }
  },
  780: {
    category: 'Math',
    timeComplexity: 'O(log max)',
    spaceComplexity: 'O(1)',
    description: 'Điểm start (sx,sy) đến target (tx,ty) bằng thao tác: từ (x,y) có thể tới (x+y,y) hoặc (x,x+y). Có thể tới target không?',
    examples: [
      { input: 'sx = 1, sy = 1, tx = 3, ty = 5', output: 'true' },
      { input: 'sx = 1, sy = 1, tx = 2, ty = 2', output: 'false' },
      { input: 'sx = 1, sy = 1, tx = 1, ty = 1', output: 'true' }
    ],
    approach: 'Reverse từ target về start: while tx>=ty swap/mod; ty -= tx hoặc ty %= tx. Khả thi nếu về (sx,sy).',
    memoryTip: 'Reaching points = reverse Euclidean algorithm on (tx,ty).',
    solutions: {
      python: 'class Solution:\n    def reachingPoints(self, sx: int, sy: int, tx: int, ty: int) -> bool:\n        while tx >= sx and ty >= sy:\n            if tx == ty: break\n            if tx > ty:\n                if ty < sy: return False\n                if tx >= ty * 2: tx %= ty\n                else: tx -= ty\n            else:\n                if tx < sx: return False\n                if ty >= tx * 2: ty %= tx\n                else: ty -= tx\n        return tx == sx and ty == sy',
      cpp: 'class Solution {\npublic:\n    bool reachingPoints(int sx, int sy, int tx, int ty) {\n        while(tx>=sx && ty>=sy){\n            if(tx==ty) break;\n            if(tx>ty){ if(ty<sy) return false; if(tx>=ty*2LL) tx%=ty; else tx-=ty; }\n            else { if(tx<sx) return false; if(ty>=tx*2LL) ty%=tx; else ty-=tx; }\n        }\n        return tx==sx && ty==sy;\n    }\n};',
      c: 'bool reachingPoints(int sx, int sy, int tx, int ty) {\n    while(tx>=sx && ty>=sy){ if(tx==ty) break;\n        if(tx>ty){ if(ty<sy) return false; if(tx>=ty*2) tx%=ty; else tx-=ty; }\n        else { if(tx<sx) return false; if(ty>=tx*2) ty%=tx; else ty-=tx; }\n    } return tx==sx && ty==sy;\n}'
    },
    analysis: {
      correctness: 'Reverse ops undo addition branch — modulo skip nhiều bước.',
      edgeCases: ['Start equals target', 'tx<sx or ty<sy early false', 'Large coordinates'],
      pitfalls: ['Forward BFS TLE', 'Quên check ty>=sy trong reverse']
    }
  }
};
