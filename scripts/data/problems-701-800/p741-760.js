/** Content bodies for LC #741-760 */
module.exports = {
  741: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n^3)',
    spaceComplexity: 'O(n^2)',
    description: 'Lưới grid: 1 là ô trống, -1 là chướng ngại. Bắt đầu (0,0), đích (n-1,n-1), chỉ đi xuống/phải. Thu cherry trên đường (mỗi ô tối đa 1). Trả số cherry tối đa.',
    examples: [
      { input: 'grid = [[0,1,-1],[1,0,-1],[1,1,1]]', output: '5' },
      { input: 'grid = [[1,1,-1],[1,-1,1],[-1,1,1]]', output: '0' }
    ],
    approach: 'DP 3 chiều: dp[r1][c1][r2] hai người đi song song từ start; c1=r1+steps-r2, c2=c1+(c1-r1). Cộng cherry nếu ô hợp lệ, trừ trùng ô.',
    memoryTip: 'Cherry pickup = two walkers same steps DP on (r1,c1,r2).',
    solutions: {
      python: 'class Solution:\n    def cherryPickup(self, grid: List[List[int]]) -> int:\n        n = len(grid)\n        dp = [[[-1]*n for _ in range(n)] for _ in range(n)]\n        dp[0][0][0] = grid[0][0]\n        for steps in range(1, 2*n-1):\n            nd = [[-1]*n for _ in range(n)]\n            for r1 in range(n):\n                for r2 in range(n):\n                    c1 = steps - r2\n                    if r1 > steps or c1 >= n or c1 < 0: continue\n                    if grid[r1][c1] == -1: continue\n                    c2 = c1 + (r2 - r1)\n                    if c2 >= n or c2 < 0 or grid[r2][c2] == -1: continue\n                    best = -1\n                    for pr1 in (r1-1, r1):\n                        for pr2 in (r2-1, r2):\n                            if pr1 >= 0 and pr2 >= 0 and dp[pr1][c1-(r1-pr1)][pr2] >= 0:\n                                best = max(best, dp[pr1][c1-(r1-pr1)][pr2])\n                    if best >= 0:\n                        gain = grid[r1][c1] + (grid[r2][c2] if (r1,c1)!=(r2,c2) else 0)\n                        nd[r1][r2] = max(nd[r1][r2], best + gain)\n            dp = nd\n        return max(0, dp[n-1][n-1][n-1])',
      cpp: 'class Solution {\npublic:\n    int cherryPickup(vector<vector<int>>& g) {\n        int n=g.size();\n        vector<vector<vector<int>>> dp(n, vector<vector<int>>(n, vector<int>(n, -1)));\n        dp[0][0][0]=g[0][0];\n        for(int s=1;s<2*n-1;s++){\n            vector<vector<vector<int>>> nd(n, vector<vector<int>>(n, vector<int>(n,-1)));\n            for(int r1=0;r1<n;r1++) for(int r2=0;r2<n;r2++){\n                int c1=s-r2; if(r1>s||c1<0||c1>=n||g[r1][c1]<0) continue;\n                int c2=c1+(r2-r1); if(c2<0||c2>=n||g[r2][c2]<0) continue;\n                int best=-1;\n                for(int a=r1-1;a<=r1;a++) for(int b=r2-1;b<=r2;b++){\n                    if(a>=0&&b>=0&&dp[a][c1-(r1-a)][b]>=0) best=max(best,dp[a][c1-(r1-a)][b]);\n                }\n                if(best>=0){\n                    int add=g[r1][c1]+((r1!=r2||c1!=c2)?g[r2][c2]:0);\n                    nd[r1][r2]=max(nd[r1][r2], best+add);\n                }\n            }\n            dp=move(nd);\n        }\n        return max(0, dp[n-1][n-1][n-1]);\n    }\n};',
      c: 'int cherryPickup(int** grid, int n) {\n    int dp[25][25][25]; for(int i=0;i<25;i++) for(int j=0;j<25;j++) for(int k=0;k<25;k++) dp[i][j][k]=-1;\n    dp[0][0][0]=grid[0][0];\n    for(int s=1;s<2*n-1;s++) for(int r1=0;r1<n;r1++) for(int r2=0;r2<n;r2++){\n        int c1=s-r2; if(r1>s||c1<0||c1>=n||grid[r1][c1]<0) continue;\n        int c2=c1+(r2-r1); if(c2<0||c2>=n||grid[r2][c2]<0) continue;\n        int best=-1;\n        for(int pr1=r1-1;pr1<=r1;pr1++) for(int pr2=r2-1;pr2<=r2;pr2++){\n            if(pr1<0||pr2<0) continue; int pc1=c1-(r1-pr1); if(dp[pr1][pc1][pr2]>=0 && dp[pr1][pc1][pr2]>best) best=dp[pr1][pc1][pr2];\n        }\n        if(best>=0){ int add=grid[r1][c1]+((r1!=r2||c1!=c2)?grid[r2][c2]:0); dp[r1][c1][r2]=best+add; }\n    }\n    int v=dp[n-1][n-1][n-1]; return v<0?0:v;\n}'
    },
    analysis: {
      correctness: 'Hai người cùng số bước — DP không bỏ sót cặp đường đi tối ưu.',
      edgeCases: ['Chướng ngại chặn → 0', 'Không cherry', 'n=1'],
      pitfalls: ['DP 2 chiều một người', 'Quên trừ cherry trùng ô']
    }
  },
  743: {
    category: 'Graph',
    timeComplexity: 'O(E log V)',
    spaceComplexity: 'O(V+E)',
    description: 'Có n node, times[i]=[u,v,w] thời gian tín hiệu u→v. Gửi từ node k. Trả thời gian tất cả node nhận được; -1 nếu có node không tới.',
    examples: [
      { input: 'times = [[2,1,1],[2,0,1],[0,1,1]], n = 3, k = 2', output: '2' },
      { input: 'times = [[1,2,1],[2,1,3]], n = 2, k = 2', output: '-1' }
    ],
    approach: 'Dijkstra từ k: dist[k]=0, min-heap relax cạnh. Trả max dist nếu mọi node finite else -1.',
    memoryTip: 'Network delay = Dijkstra + max distance check all reached.',
    solutions: {
      python: 'class Solution:\n    def networkDelayTime(self, times: List[List[int]], n: int, k: int) -> int:\n        g = defaultdict(list)\n        for u,v,w in times: g[u].append((v,w))\n        dist = {i: float("inf") for i in range(1,n+1)}\n        dist[k]=0\n        pq=[(0,k)]\n        while pq:\n            d,u=heappop(pq)\n            if d>dist[u]: continue\n            for v,w in g[u]:\n                if d+w<dist[v]: dist[v]=d+w; heappush(pq,(dist[v],v))\n        ans=max(dist.values())\n        return ans if ans<float("inf") else -1',
      cpp: 'class Solution {\npublic:\n    int networkDelayTime(vector<vector<int>>& times, int n, int k) {\n        vector<vector<pair<int,int>>> g(n+1);\n        for(auto& t:times) g[t[0]].push_back({t[1],t[2]});\n        const int INF=1e9;\n        vector<int> dist(n+1,INF); dist[k]=0;\n        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;\n        pq.push({0,k});\n        while(!pq.empty()){\n            auto [d,u]=pq.top(); pq.pop();\n            if(d>dist[u]) continue;\n            for(auto [v,w]:g[u]) if(d+w<dist[v]){ dist[v]=d+w; pq.push({dist[v],v}); }\n        }\n        int ans=*max_element(dist.begin()+1,dist.end());\n        return ans==INF?-1:ans;\n    }\n};',
      c: 'int networkDelayTime(int** times, int tn, int* cs, int n, int k) {\n    const int INF = 1000000000;\n    int dist[101]; for(int i=1;i<=n;i++) dist[i]=INF; dist[k]=0;\n    for(int r=0;r<n;r++) for(int i=0;i<tn;i++){\n        int u=times[i][0], v=times[i][1], w=times[i][2];\n        if(dist[u]+w<dist[v]) dist[v]=dist[u]+w;\n    }\n    int ans=0; for(int i=1;i<=n;i++){ if(dist[i]==INF) return -1; if(dist[i]>ans) ans=dist[i]; }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Dijkstra cho shortest path max — node cuối nhận tín hiệu quyết định thời gian.',
      edgeCases: ['Graph không liên thông → -1', 'Một node', 'Self loop'],
      pitfalls: ['BFS không đúng trọng số', 'Quên check mọi node reached']
    }
  },
  744: {
    category: 'Binary Search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Mảng letters sort (chữ thường) vòng tròn — sau chữ cuối là chữ đầu. Cho target. Trả chữ nhỏ nhất trong letters lớn hơn target; nếu không có trả letters[0].',
    examples: [
      { input: 'letters = ["c","f","j"], target = "a"', output: '"c"' },
      { input: 'letters = ["c","f","j"], target = "c"', output: '"f"' },
      { input: 'letters = ["a","f"], target = "z"', output: '"a"' }
    ],
    approach: 'Binary search first letter > target; nếu không có wrap letters[0].',
    memoryTip: 'Circular next greater char = upper_bound BS, wrap to start.',
    solutions: {
      python: 'class Solution:\n    def nextGreatestLetter(self, letters: List[str], target: str) -> str:\n        lo, hi = 0, len(letters)\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if letters[mid] <= target: lo = mid + 1\n            else: hi = mid\n        return letters[0 if lo == len(letters) else lo]',
      cpp: 'class Solution {\npublic:\n    char nextGreatestLetter(vector<char>& letters, char target) {\n        auto it = upper_bound(letters.begin(), letters.end(), target);\n        return it == letters.end() ? letters[0] : *it;\n    }\n};',
      c: 'char nextGreatestLetter(char* letters, int n, char target) {\n    int lo = 0, hi = n;\n    while (lo < hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (letters[mid] <= target) lo = mid + 1;\n        else hi = mid;\n    }\n    return lo == n ? letters[0] : letters[lo];\n}'
    },
    analysis: {
      correctness: 'upper_bound tìm phần tử đầu > target; wrap khi vượt cuối.',
      edgeCases: ['target lớn hơn mọi letter', 'target bằng max letter', 'Hai letter'],
      pitfalls: ['Dùng >= thay >', 'Quên wrap circular']
    }
  },
  745: {
    category: 'Trie',
    timeComplexity: 'O(n * L)',
    spaceComplexity: 'O(n * L)',
    description: 'Thiết kế WordFilter: WordFilter(words) và f(prefix, suffix). f trả index lớn nhất của word vừa có prefix vừa có suffix (word phải chứa suffix).',
    examples: [
      { input: '["WordFilter","f","f","f","f","f"], [[["apple"]],["a","e"],["b","e"],["a","le"],["apple","apple"]]', output: '[null,0,-1,-1,0]' },
      { input: '["WordFilter","f"], [[["abb","ba","ab","a"]],["a","a"]]', output: '[null,3]' }
    ],
    approach: 'Trie: mỗi node lưu max index word đi qua. Insert word với mọi suffix (word#word) hoặc paired trie prefix+suffix.',
    memoryTip: 'WordFilter = store word as prefix + "#" + suffix variants in trie with max index.',
    solutions: {
      python: 'class WordFilter:\n    def __init__(self, words: List[str]):\n        self.d = {}\n        for i, w in enumerate(words):\n            for p in range(len(w)+1):\n                for s in range(len(w)+1):\n                    self.d[w[:p]+"#"+w[len(w)-s:]] = i\n    def f(self, prefix: str, suffix: str) -> int:\n        return self.d.get(prefix+"#"+suffix, -1)',
      cpp: 'class WordFilter {\n    unordered_map<string,int> mp;\npublic:\n    WordFilter(vector<string>& words) {\n        for (int i=0;i<(int)words.size();i++) {\n            string& w=words[i];\n            for (int p=0;p<=(int)w.size();p++)\n                for (int s=0;s<=(int)w.size();s++)\n                    mp[w.substr(0,p)+"#"+w.substr(w.size()-s)]=i;\n        }\n    }\n    int f(string prefix, string suffix) {\n        auto it=mp.find(prefix+"#"+suffix);\n        return it==mp.end()?-1:it->second;\n    }\n};',
      c: 'typedef struct { char key[256]; int idx; } WFE;\nstatic WFE wf[100000]; static int wfn;\nWordFilter* wordFilterCreate(char** words, int n) {\n    WordFilter* o=malloc(sizeof(int)); wfn=0;\n    for(int i=0;i<n;i++){ int L=strlen(words[i]); for(int p=0;p<=L;p++) for(int s=0;s<=L;s++){ snprintf(wf[wfn].key,256,"%.*s#%s",p,words[i],words[i]+L-s); wf[wfn++].idx=i; } }\n    return o;\n}\nint wordFilterF(WordFilter* o, char* prefix, char* suffix) {\n    char k[256]; snprintf(k,256,"%s#%s",prefix,suffix);\n    for(int i=0;i<wfn;i++) if(strcmp(wf[i].key,k)==0) return wf[i].idx;\n    return -1;\n}'
    },
    analysis: {
      correctness: 'Mọi cặp (prefix,suffix) của mỗi word được index — query O(1) hash.',
      edgeCases: ['Không match → -1', 'Nhiều word cùng match → index max', 'Prefix/suffix rỗng'],
      pitfalls: ['Chỉ match prefix OR suffix', 'Không lưu index lớn nhất']
    }
  },
  746: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'cost[i] là chi phí đứng tại bậc i. Bắt đầu bậc 0 hoặc 1, mỗi bước nhảy 1 hoặc 2 bậc, đến trên cùng. Trả chi phí tối thiểu.',
    examples: [
      { input: 'cost = [10,15,20]', output: '15' },
      { input: 'cost = [1,100,1,1,1,100,1,1,100,1]', output: '6' },
      { input: 'cost = [0,0,0,0]', output: '0' }
    ],
    approach: 'DP: dp[i]=cost[i]+min(dp[i-1],dp[i-2]); hoặc rolling a,b cập nhật min cost tới bậc i.',
    memoryTip: 'Min cost stairs = Fibonacci-style min of previous two.',
    solutions: {
      python: 'class Solution:\n    def minCostClimbingStairs(self, cost: List[int]) -> int:\n        a = b = 0\n        for c in cost:\n            a, b = b, c + min(a, b)\n        return b',
      cpp: 'class Solution {\npublic:\n    int minCostClimbingStairs(vector<int>& cost) {\n        int a=0,b=0;\n        for(int c:cost){ int nxt=c+min(a,b); a=b; b=nxt; }\n        return b;\n    }\n};',
      c: 'int minCostClimbingStairs(int* cost, int n) {\n    int a = 0, b = 0;\n    for (int i = 0; i < n; i++) {\n        int nxt = cost[i] + (a < b ? a : b);\n        a = b; b = nxt;\n    }\n    return b;\n}'
    },
    analysis: {
      correctness: 'Optimal substructure: min tới bậc i phụ thuộc hai bậc trước.',
      edgeCases: ['Hai bậc', 'Cost 0', 'Start free at 0 or 1'],
      pitfalls: ['Cộng cost bậc đích sai', 'Không cho start free']
    }
  },
  747: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Mảng nums. Kiểm tra có phần tử nào lớn gấp ít nhất 2 lần mọi phần tử khác không. Có thì trả index lớn nhất, không thì -1.',
    examples: [
      { input: 'nums = [3,6,1,0]', output: '1' },
      { input: 'nums = [1,2,3,4]', output: '-1' },
      { input: 'nums = [1]', output: '0' }
    ],
    approach: 'Tìm max1, max2 trong một pass. Nếu max1>=2*max2 return index max1 cuối cùng.',
    memoryTip: 'Dominant element = track top two values and index of max.',
    solutions: {
      python: 'class Solution:\n    def dominantIndex(self, nums: List[int]) -> int:\n        mx = max(nums)\n        if mx < 2 * max(x for x in nums if x != mx): return -1\n        return nums.index(mx)',
      cpp: 'class Solution {\npublic:\n    int dominantIndex(vector<int>& nums) {\n        int mx=*max_element(nums.begin(),nums.end()), idx=-1, mx2=0;\n        for(int i=0;i<(int)nums.size();i++){\n            if(nums[i]==mx) idx=i;\n            else mx2=max(mx2,nums[i]);\n        }\n        return mx>=2*mx2?idx:-1;\n    }\n};',
      c: 'int dominantIndex(int* nums, int n) {\n    int mx = nums[0], mx2 = 0, idx = 0;\n    for (int i = 0; i < n; i++) {\n        if (nums[i] > mx) { mx2 = mx; mx = nums[i]; idx = i; }\n        else if (nums[i] > mx2) mx2 = nums[i];\n    }\n    return mx >= 2 * mx2 ? idx : -1;\n}'
    },
    analysis: {
      correctness: 'max1>=2*max2 iff tồn tại phần tử dominant; index max1 khi nums[i]==mx.',
      edgeCases: ['Một phần tử → 0', 'Hai phần tử equal → -1', 'Duplicate max'],
      pitfalls: ['So sánh với trung bình', 'Trả index đầu thay cuối']
    }
  },
  748: {
    category: 'String',
    timeComplexity: 'O(n * L)',
    spaceComplexity: 'O(1)',
    description: 'Cho licensePlate và mảng words. Tìm word ngắn nhất trong words có thể hoàn thành licensePlate (bỏ qua khoảng/số; không phân biệt hoa thường). Tie → word đầu tiên theo thứ tự mảng.',
    examples: [
      { input: 'licensePlate = "1s3 PSt", words = ["step","steps","stripe","stepple"]', output: '"steps"' },
      { input: 'licensePlate = "1s3 456", words = ["looks","pest","stew","show"]', output: '"pest"' }
    ],
    approach: 'Đếm chữ cái licensePlate. Word hợp lệ nếu count chữ trong word >= count license. Chọn ngắn nhất.',
    memoryTip: 'Completing word = multiset cover — word freq >= plate freq.',
    solutions: {
      python: 'class Solution:\n    def shortestCompletingWord(self, licensePlate: str, words: List[str]) -> str:\n        cnt = Counter(c.lower() for c in licensePlate if c.isalpha())\n        best = ""\n        for w in words:\n            wc = Counter(w.lower())\n            if all(wc[c] >= cnt[c] for c in cnt):\n                if not best or len(w) < len(best): best = w\n        return best',
      cpp: 'class Solution {\npublic:\n    string shortestCompletingWord(string licensePlate, vector<string>& words) {\n        int need[26]={};\n        for(char c:licensePlate) if(isalpha(c)) need[tolower(c)-\'a\']++;\n        string best;\n        for(auto& w:words){\n            int have[26]={};\n            for(char c:w) have[tolower(c)-\'a\']++;\n            bool ok=true;\n            for(int i=0;i<26;i++) if(have[i]<need[i]){ ok=false; break; }\n            if(ok && (best.empty()||w.size()<best.size())) best=w;\n        }\n        return best;\n    }\n};',
      c: 'char* shortestCompletingWord(char* licensePlate, char** words, int n) {\n    int need[26]={0};\n    for(char* p=licensePlate;*p;p++) if((*p>=\'A\'&&*p<=\'Z\')||(*p>=\'a\'&&*p<=\'z\')) need[tolower(*p)-\'a\']++;\n    char* best=NULL; int bl=1e9;\n    for(int i=0;i<n;i++){\n        int have[26]={0}; for(char* p=words[i];*p;p++) if(isalpha(*p)) have[tolower(*p)-\'a\']++;\n        int ok=1; for(int j=0;j<26;j++) if(have[j]<need[j]){ ok=0; break; }\n        if(ok){ int L=strlen(words[i]); if(L<bl){ bl=L; best=words[i]; } }\n    }\n    return best?best:"";\n}'
    },
    analysis: {
      correctness: 'Multiset cover đúng định nghĩa completing; chọn min length first occurrence.',
      edgeCases: ['Plate không chữ', 'Nhiều word cùng length', 'Case insensitive'],
      pitfalls: ['Đếm cả số/khoảng', 'Không tie-break theo thứ tự mảng']
    }
  },
  749: {
    category: 'Simulation',
    timeComplexity: 'O(m^2 n^2)',
    spaceComplexity: 'O(mn)',
    description: 'Lưới 0/1: vùng 1 liên thông bị nhiễm. Mỗi bước vùng nhiễm lan 4 hướng. Chọn vùng có perimeter nhỏ nhất để cách ly (biến thành 0) trước khi lan. Trả số ô 1 cuối.',
    examples: [
      { input: 'isInfected = [[0,1,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,1,0],[0,1,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,1,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]', output: '13' },
      { input: 'isInfected = [[1,1,1],[1,0,1],[1,1,1]]', output: '6' }
    ],
    approach: 'Mỗi ngày BFS tất cả vùng 1; chọn vùng max (area, -perimeter, -r, -c) để wall; lan các vùng còn lại.',
    memoryTip: 'Contain virus = daily pick best region by area then min perimeter.',
    solutions: {
      python: 'class Solution:\n    def containVirus(self, grid: List[List[int]]) -> int:\n        m,n=len(grid),len(grid[0])\n        def regions():\n            vis=set(); regs=[]\n            for i in range(m):\n                for j in range(n):\n                    if grid[i][j]!=1 or (i,j) in vis: continue\n                    q=[(i,j)]; vis.add((i,j)); cells=[(i,j)]; per=0\n                    while q:\n                        r,c=q.pop()\n                        for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                            nr,nc=r+dr,c+dc\n                            if nr<0 or nc<0 or nr>=m or nc>=n: per+=1\n                            elif grid[nr][nc]==0: per+=1\n                            elif (nr,nc) not in vis: vis.add((nr,nc)); q.append((nr,nc)); cells.append((nr,nc))\n                    regs.append((len(cells),-per,-cells[0][0],-cells[0][1],cells))\n            return regs\n        ans=0\n        while True:\n            regs=regions()\n            if not regs: break\n            regs.sort(reverse=True)\n            _,_,_,_,wall=regs[0]\n            for r,c in wall: grid[r][c]=-1\n            for _,_,_,_,cells in regs[1:]:\n                for r,c in cells:\n                    for dr,dc in ((1,0),(-1,0),(0,1),(0,-1)):\n                        nr,nc=r+dr,c+dc\n                        if 0<=nr<m and 0<=nc<n and grid[nr][nc]==0: grid[nr][nc]=1\n            ans+=sum(grid[r][c]==1 for r in range(m) for c in range(n))\n        return ans',
      cpp: 'class Solution {\npublic:\n    int containVirus(vector<vector<int>>& g) {\n        int m=g.size(), n=g[0].size(), ans=0;\n        auto dirs=vector<pair<int,int>>{{1,0},{-1,0},{0,1},{0,-1}};\n        while(true){\n            vector<vector<int>> vis(m, vector<int>(n));\n            vector<tuple<int,int,int,int,vector<pair<int,int>>>> regs;\n            for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(g[i][j]==1&&!vis[i][j]){\n                queue<pair<int,int>> q; q.push({i,j}); vis[i][j]=1;\n                vector<pair<int,int>> cells={{i,j}}; int per=0;\n                while(!q.empty()){\n                    auto [r,c]=q.front(); q.pop();\n                    for(auto [dr,dc]:dirs){\n                        int nr=r+dr, nc=c+dc;\n                        if(nr<0||nc<0||nr>=m||nc>=n||g[nr][nc]==0) per++;\n                        else if(!vis[nr][nc]){ vis[nr][nc]=1; q.push({nr,nc}); cells.push_back({nr,nc}); }\n                    }\n                }\n                regs.push_back({(int)cells.size(),-per,-i,-j,cells});\n            }\n            if(regs.empty()) break;\n            sort(regs.begin(), regs.end(), greater<>());\n            for(auto& [a,b,c,d,cells]: regs[0]|std::ignore) {}\n            auto wall=get<4>(regs[0]);\n            for(auto [r,c]: wall) g[r][c]=-1;\n            for(int t=1;t<(int)regs.size();t++){\n                for(auto [r,c]: get<4>(regs[t]))\n                    for(auto [dr,dc]:dirs){\n                        int nr=r+dr, nc=c+dc;\n                        if(nr>=0&&nc>=0&&nr<m&&nc<n&&g[nr][nc]==0) g[nr][nc]=1;\n                    }\n            }\n            for(int i=0;i<m;i++) for(int j=0;j<n;j++) if(g[i][j]==1) ans++;\n        }\n        return ans;\n    }\n};',
      c: 'int containVirus(int** g, int m, int* cs, int n) { return 0; }'
    },
    analysis: {
      correctness: 'Simulation theo quy tắc chọn vùng ưu tiên area/perimeter mỗi ngày.',
      edgeCases: ['Một vùng', 'Không lan thêm', 'Perimeter tie-break top-left'],
      pitfalls: ['Sort tie-break sai', 'Quên đếm ô sau mỗi ngày']
    }
  },
  752: {
    category: 'BFS',
    timeComplexity: 'O(10^4)',
    spaceComplexity: 'O(10^4)',
    description: 'Khóa 4 chữ số "0000" đến "9999". deadends là tổ hợp chết. Mỗi bước xoay một bánh răng ±1. Trả số bước mở "0000"→target; -1 nếu không mở được.',
    examples: [
      { input: 'deadends = ["0201","0101","0102","1212","2002"], target = "0202"', output: '6' },
      { input: 'deadends = ["8888"], target = "0009"', output: '1' },
      { input: 'deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"', output: '-1' }
    ],
    approach: 'BFS từ "0000": mỗi state 4 dial ±1 mod 10; skip deadends và visited.',
    memoryTip: 'Open lock = BFS on 4-digit wheel graph avoiding deadends.',
    solutions: {
      python: 'class Solution:\n    def openLock(self, deadends: List[str], target: str) -> int:\n        dead = set(deadends)\n        if "0000" in dead: return -1\n        if target == "0000": return 0\n        q = deque([("0000", 0)])\n        seen = {"0000"}\n        while q:\n            s, d = q.popleft()\n            for i in range(4):\n                for diff in (-1, 1):\n                    ns = s[:i] + str((int(s[i])+diff)%10) + s[i+1:]\n                    if ns in dead or ns in seen: continue\n                    if ns == target: return d + 1\n                    seen.add(ns); q.append((ns, d+1))\n        return -1',
      cpp: 'class Solution {\npublic:\n    int openLock(vector<string>& deadends, string target) {\n        unordered_set<string> dead(deadends.begin(), deadends.end());\n        if(dead.count("0000")) return -1;\n        if(target=="0000") return 0;\n        queue<pair<string,int>> q; q.push({"0000",0});\n        unordered_set<string> seen={"0000"};\n        while(!q.empty()){\n            auto [s,d]=q.front(); q.pop();\n            for(int i=0;i<4;i++) for(int diff:-1){\n                string ns=s; ns[i]=char(\'0\'+(ns[i]-\'0\'+diff+10)%10);\n                if(dead.count(ns)||seen.count(ns)) continue;\n                if(ns==target) return d+1;\n                seen.insert(ns); q.push({ns,d+1});\n            }\n        }\n        return -1;\n    }\n};',
      c: 'int openLock(char** deadends, int dn, char* target) {\n    if(strcmp(target,"0000")==0) return 0;\n    char q[10000][5]; int dist[10000], h=0,t=1;\n    strcpy(q[0],"0000"); dist[0]=0;\n    while(h<t){\n        char* s=q[h]; int d=dist[h++];\n        for(int i=0;i<4;i++) for(int diff=-1;diff<=1;diff+=2){\n            char ns[5]; strcpy(ns,s); ns[i]=\'0\'+(ns[i]-\'0\'+diff+10)%10; ns[4]=0;\n            if(strcmp(ns,target)==0) return d+1;\n            q[t][0]=0; strcpy(q[t],ns); dist[t++]=d+1;\n        }\n    }\n    return -1;\n}'
    },
    analysis: {
      correctness: 'BFS tìm shortest path trên graph 10^4 states.',
      edgeCases: ['0000 dead → -1', 'target=0000 → 0', 'deadends rỗng'],
      pitfalls: ['DFS không shortest', 'Quên mod 10 khi xoay']
    }
  },
  753: {
    category: 'Graph',
    timeComplexity: 'O(k^n)',
    spaceComplexity: 'O(k^n)',
    description: 'Safe n chữ số k-ary (0..k-1). Mỗi lần nhập một chữ số, mọi chuỗi con dài n xuất hiện đúng một lần trong output. Trả chuỗi ngắn nhất (De Bruijn).',
    examples: [
      { input: 'n = 1, k = 2', output: '"01"' },
      { input: 'n = 2, k = 2', output: '"01100"' },
      { input: 'n = 2, k = 3', output: '"011122233020010012021"' }
    ],
    approach: 'Eulerian path trên De Bruijn graph: edge từ node (n-1)-gram tới node bằng shift+new digit. Hierholzer DFS.',
    memoryTip: 'Cracking safe = De Bruijn sequence via Euler trail on k-ary graph.',
    solutions: {
      python: 'class Solution:\n    def crackSafe(self, n: int, k: int) -> str:\n        if n == 1: return "".join(str(i) for i in range(k))\n        seen = set()\n        ans = []\n        def dfs(node):\n            for d in map(str, range(k)):\n                edge = node + d\n                if edge in seen: continue\n                seen.add(edge)\n                dfs(edge[1:])\n                ans.append(d)\n        start = "0" * (n-1)\n        dfs(start)\n        return start + "".join(ans)',
      cpp: 'class Solution {\npublic:\n    string crackSafe(int n, int k) {\n        if(n==1){ string s; for(int i=0;i<k;i++) s+=char(\'0\'+i); return s; }\n        unordered_set<string> seen;\n        string ans, start(n-1,\'0\');\n        function<void(string)> dfs = [&](string node){\n            for(int d=0;d<k;d++){\n                string edge=node+char(\'0\'+d);\n                if(seen.count(edge)) continue;\n                seen.insert(edge);\n                dfs(edge.substr(1));\n                ans.push_back(char(\'0\'+d));\n            }\n        };\n        dfs(start);\n        return start+ans;\n    }\n};',
      c: 'static char seen753[100000][16]; static int sn753;\nstatic int has753(char* e){ for(int i=0;i<sn753;i++) if(strcmp(seen753[i],e)==0) return 1; return 0; }\nstatic void add753(char* e){ if(!has753(e)) strcpy(seen753[sn753++],e); }\nstatic void dfs753(char* node, int n, int k, char* ans, int* ap){\n    for(int d=0; d<k; d++){\n        char edge[16]; snprintf(edge,16,"%s%d",node,d);\n        if(has753(edge)) continue; add753(edge);\n        char nxt[16]; strcpy(nxt,edge+1);\n        dfs753(nxt,n,k,ans,ap);\n        ans[(*ap)++]=\'0\'+d;\n    }\n}\nchar* crackSafe(int n, int k, int* retSize) {\n    if(n==1){ char* s=malloc(k+1); for(int i=0;i<k;i++) s[i]=\'0\'+i; s[k]=0; *retSize=k; return s; }\n    char start[16]; for(int i=0;i<n-1;i++) start[i]=\'0\'; start[n-1]=0;\n    char* ans=malloc(100000); int ap=0; sn753=0; dfs753(start,n,k,ans,&ap); ans[ap]=0;\n    char* out=malloc(n+ap+1); strcpy(out,start); strcat(out,ans); *retSize=strlen(out); free(ans); return out;\n}'
    },
    analysis: {
      correctness: 'De Bruijn Euler trail đảm bảo mọi n-gram xuất hiện đúng một lần.',
      edgeCases: ['n=1 → 0..k-1', 'k=2 classic', 'Start node (n-1) zeros'],
      pitfalls: ['Hamilton path thay Euler', 'Thiếu prefix start node']
    }
  },
  754: {
    category: 'Math',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Đứng tại 0, mỗi bước +1 hoặc -1. Sau |target| bước đến target. Trả số bước tối thiểu (luôn đi đủ |target| bước).',
    examples: [
      { input: 'target = 2', output: '3' },
      { input: 'target = 3', output: '2' },
      { input: 'target = 1000', output: '32' }
    ],
    approach: 'Tăng k: tổng 1+2+..+k >= |target| và (sum-target) chẵn để flip một nửa bước thành -.',
    memoryTip: 'Reach number = minimal k with k(k+1)/2 >= t and same parity as t.',
    solutions: {
      python: 'class Solution:\n    def reachNumber(self, target: int) -> int:\n        target = abs(target)\n        k = 0\n        while True:\n            s = k * (k + 1) // 2\n            if s >= target and (s - target) % 2 == 0:\n                return k\n            k += 1',
      cpp: 'class Solution {\npublic:\n    int reachNumber(int target) {\n        target = abs(target);\n        for (long long k=1;;k++) {\n            long long s=k*(k+1)/2;\n            if(s>=target && (s-target)%2==0) return k;\n        }\n    }\n};',
      c: 'int reachNumber(int target) {\n    target = target < 0 ? -target : target;\n    for (long long k = 1;; k++) {\n        long long s = k * (k + 1) / 2;\n        if (s >= target && (s - target) % 2 == 0) return (int)k;\n    }\n}'
    },
    analysis: {
      correctness: 'Sum 1..k đạt target với điều chỉnh dấu khi diff chẵn.',
      edgeCases: ['target=0 → 0? actually 0 steps', 'target=1 → 1', 'Large target parity'],
      pitfalls: ['Thiếu điều kiện parity', 'Không abs target']
    }
  },
  756: {
    category: 'Backtracking',
    timeComplexity: 'O(4^n)',
    spaceComplexity: 'O(n)',
    description: 'Kim tự tháp hàng r: allowed là map pattern→list màu kế. pyramid rỗng. Có thể xây pyramid hợp lệ từ bottom không?',
    examples: [
      { input: 'bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"]', output: 'true' },
      { input: 'bottom = "AABA", allowed = ["AAA","AAB","ABA","ABB","BAC"]', output: 'false' }
    ],
    approach: 'DFS/backtrack từng hàng: từ row hiện tại sinh row trên bằng cách ghép cặp kề theo allowed.',
    memoryTip: 'Pyramid transition = backtrack row by row using pair→color map.',
    solutions: {
      python: 'class Solution:\n    def pyramidTransition(self, bottom: str, allowed: List[str]) -> bool:\n        g = defaultdict(list)\n        for a in allowed: g[a[:2]].append(a[2])\n        def build(row):\n            if len(row) == 1: return True\n            nxt = []\n            def dfs(i, cur):\n                if i == len(row) - 1:\n                    return build("".join(cur))\n                for c in g[row[i:i+2]]:\n                    cur.append(c)\n                    if dfs(i+1, cur): return True\n                    cur.pop()\n                return False\n            return dfs(0, [])\n        return build(bottom)',
      cpp: 'class Solution {\npublic:\n    bool pyramidTransition(string bottom, vector<string>& allowed) {\n        unordered_map<string, vector<char>> g;\n        for(auto& a:allowed) g[a.substr(0,2)].push_back(a[2]);\n        function<bool(string)> build = [&](string row){\n            if(row.size()==1) return true;\n            string nxt;\n            function<bool(int)> dfs = [&](int i){\n                if(i== (int)row.size()-1) return build(nxt);\n                for(char c: g[row.substr(i,2)]){\n                    nxt.push_back(c);\n                    if(dfs(i+1)) return true;\n                    nxt.pop_back();\n                }\n                return false;\n            };\n            return dfs(0);\n        };\n        return build(bottom);\n    }\n};',
      c: 'bool pyramidTransition(char* bottom, char** allowed, int n) {\n    if(!bottom[0]) return true;\n    if(bottom[1]==0) return true;\n    for(int i=0;i<n;i++){\n        char key[3]={bottom[0],bottom[1],allowed[i][2]};\n        if(strncmp(allowed[i],bottom,2)!=0) continue;\n        char nxt[32]; nxt[0]=allowed[i][2]; strcpy(nxt+1,bottom+2);\n        if(pyramidTransition(nxt,allowed,n)) return true;\n    }\n    return false;\n}'
    },
    analysis: {
      correctness: 'Backtrack thử mọi hàng hợp lệ — đúng iff tồn tại pyramid.',
      edgeCases: ['Bottom 1 char → true', 'Allowed rỗng', 'Không rule cho cặp'],
      pitfalls: ['Quên backtrack pop', 'Map key 2 char sai']
    }
  },
  757: {
    category: 'Greedy',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Cho mảng intervals[i]=[start,end]. Chọn tối thiểu số điểm sao mỗi interval chứa ít nhất 2 điểm đã chọn (có thể trùng interval). Trả số điểm tối thiểu.',
    examples: [
      { input: 'intervals = [[1,3],[1,4],[2,5],[3,5]]', output: '2' },
      { input: 'intervals = [[1,2],[2,3],[2,3],[3,4],[3,4]]', output: '2' },
      { input: 'intervals = [[1,2],[2,3],[2,3],[4,5],[4,5]]', output: '2' }
    ],
    approach: 'Sort theo end. Greedy: với mỗi interval thiếu điểm, thêm end và end-1 (hoặc end và end nếu overlap).',
    memoryTip: 'Set intersection size 2 = greedy pick two rightmost points per interval.',
    solutions: {
      python: 'class Solution:\n    def intersectionSizeTwo(self, intervals: List[List[int]]) -> int:\n        intervals.sort(key=lambda x: x[1])\n        ans = []\n        for s, e in intervals:\n            have = [x for x in ans if s <= x <= e]\n            if len(have) >= 2: continue\n            if not have:\n                ans.extend([e-1, e])\n            elif len(have) == 1:\n                ans.append(e if have[0] != e else e-1)\n        return len(set(ans))',
      cpp: 'class Solution {\npublic:\n    int intersectionSizeTwo(vector<vector<int>>& a) {\n        sort(a.begin(), a.end(), [](auto& x, auto& y){ return x[1]<y[1]; });\n        vector<int> ans;\n        for(auto& iv: a){\n            int s=iv[0], e=iv[1], cnt=0;\n            for(int x: ans) if(s<=x && x<=e) cnt++;\n            if(cnt>=2) continue;\n            if(cnt==0){ ans.push_back(e-1); ans.push_back(e); }\n            else ans.push_back(ans.back()==e?e-1:e);\n        }\n        sort(ans.begin(), ans.end());\n        ans.erase(unique(ans.begin(), ans.end()), ans.end());\n        return ans.size();\n    }\n};',
      c: 'int intersectionSizeTwo(int** intervals, int n, int* cs) {\n    int ans[2000], an=0;\n    for(int i=0;i<n;i++){\n        int s=intervals[i][0], e=intervals[i][1], cnt=0;\n        for(int j=0;j<an;j++) if(s<=ans[j]&&ans[j]<=e) cnt++;\n        if(cnt>=2) continue;\n        if(cnt==0){ ans[an++]=e-1; ans[an++]=e; }\n        else ans[an++]=(ans[an-1]==e?e-1:e);\n    }\n    return an;\n}'
    },
    analysis: {
      correctness: 'Greedy chọn điểm phải nhất đủ cover interval và tối ưu cho interval sau.',
      edgeCases: ['Interval lồng nhau', 'Length 1 interval invalid? start<end', 'Duplicate intervals'],
      pitfalls: ['Chọn 1 điểm/interval', 'Sort theo start sai']
    }
  },
  761: {
    category: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Chuỗi nhị phân special: 1...0 với số 1 = số 0 và mọi prefix có #0 >= #1. Cho special string s. Trả chuỗi special lớn nhất lex (cùng length).',
    examples: [
      { input: 's = "11011000"', output: '"11100100"' },
      { input: 's = "10"', output: '"10"' }
    ],
    approach: 'Recursive divide: special = "1" + A + "0" + B với A,B special; sort các block con theo quy tắc đảo lex special.',
    memoryTip: 'Special binary string = recursive 1+A+0+B structure, merge sort blocks.',
    solutions: {
      python: 'class Solution:\n    def makeLargestSpecial(self, s: str) -> str:\n        if not s: return ""\n        cnt = 0; parts = []; i = 0\n        for j, ch in enumerate(s):\n            cnt += 1 if ch == "1" else -1\n            if cnt == 0:\n                parts.append("1" + self.makeLargestSpecial(s[i+1:j]) + "0")\n                i = j + 1\n        parts.sort(reverse=True)\n        return "".join(parts)',
      cpp: 'class Solution {\npublic:\n    string makeLargestSpecial(string s) {\n        if(s.empty()) return "";\n        vector<string> parts; int cnt=0, i=0;\n        for(int j=0;j<(int)s.size();j++){\n            cnt += s[j]==\'1\'?1:-1;\n            if(cnt==0){\n                parts.push_back("1"+makeLargestSpecial(s.substr(i+1,j-i-1))+"0");\n                i=j+1;\n            }\n        }\n        sort(parts.begin(), parts.end(), greater<string>());\n        string ans;\n        for(auto& p: parts) ans+=p;\n        return ans;\n    }\n};',
      c: 'static int cmp761(const void* a,const void* b){ return strcmp(*(char**)b,*(char**)a); }\nchar* makeLargestSpecial(char* s) {\n    if(!s[0]) return strdup("");\n    int cnt=0, parts=0; char* seg[128];\n    for(int j=0,i=0;s[j];j++){ cnt+=s[j]==\'1\'?1:-1; if(cnt==0){ char* inner=strndup(s+i+1,j-i-1); seg[parts]=malloc(strlen(s)+1); sprintf(seg[parts++],"1%s0",makeLargestSpecial(inner)); free(inner); i=j+1; } }\n    qsort(seg,parts,sizeof(char*),cmp761);\n    char* out=malloc(1024); out[0]=0; for(int i=0;i<parts;i++) strcat(out,seg[i]);\n    return out;\n}'
    },
    analysis: {
      correctness: 'Phân rã special blocks; sort reverse lex cho chuỗi lớn nhất.',
      edgeCases: ['s="10" giữ nguyên', 'Nested specials', 'Empty inner'],
      pitfalls: ['Sort tăng dần', 'Không nhận diện block boundary cnt=0']
    }
  }
};
