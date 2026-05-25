/** Content bodies for LC #781-799 */
module.exports = {
  781: {
    category: 'Greedy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Mỗi con thỏ trả lời có bao nhiêu con thỏ khác cùng màu. answers[i] là câu trả lời của thỏ i. Có thể có bao nhiêu con thỏ trong rừng tối đa?',
    examples: [
      { input: 'answers = [1,1,2]', output: '5' },
      { input: 'answers = [1,0]', output: '2' },
      { input: 'answers = [1,1,1,1,1]', output: '0' }
    ],
    approach: 'Gom answers theo nhóm: mỗi nhóm k cùng answer x (x>0) cần x+1 thỏ (1 khác màu + x cùng màu). answer=0 là thỏ unique.',
    memoryTip: 'Rabbits in forest = group by answer value x → groups of size x+1.',
    solutions: {
      python: 'class Solution:\n    def numRabbits(self, answers: List[int]) -> int:\n        cnt = Counter(answers)\n        ans = 0\n        for x, c in cnt.items():\n            g = x + 1\n            ans += ((c + g - 1) // g) * g\n        return ans',
      cpp: 'class Solution {\npublic:\n    int numRabbits(vector<int>& answers) {\n        unordered_map<int,int> cnt;\n        for(int x:answers) cnt[x]++;\n        int ans=0;\n        for(auto& [x,c]: cnt){\n            int g=x+1;\n            ans += ((c+g-1)/g)*g;\n        }\n        return ans;\n    }\n};',
      c: 'int numRabbits(int* answers, int n) {\n    int cnt[1001]={0}; for(int i=0;i<n;i++) cnt[answers[i]]++;\n    int ans=0; for(int x=0;x<1001;x++) if(cnt[x]){ int g=x+1; ans+=((cnt[x]+g-1)/g)*g; } return ans;\n}'
    },
    analysis: {
      correctness: 'Mỗi nhóm màu size x+1 giải thích x câu trả lời x — pack tối thiểu ceil(c/(x+1)) nhóm.',
      edgeCases: ['answer 0 → mỗi thỏ riêng', 'answer lớn ít thỏ', 'Impossible pattern → vẫn max pack'],
      pitfalls: ['Cộng trực tiếp answers', 'Quên ceil group size']
    }
  },
  782: {
    category: 'Math',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(1)',
    description: 'Bàn cờ n×n chỉ 0/1. Có thể biến thành bàn cờ (mọi hàng/cột half 0 half 1, và pattern hàng đầu xor các hàng sau) bằng swap hàng/cột không?',
    examples: [
      { input: 'board = [[0,1,1,0],[0,0,1,0],[1,1,0,1],[1,0,0,1]]', output: 'true' },
      { input: 'board = [[0,1],[1,0]]', output: 'false' }
    ],
    approach: 'Kiểm tra mọi hàng/cột có thể chuẩn hóa (min swaps row/col); hàng đầu sau chuẩn hóa phải bằng xor pattern với các hàng khác.',
    memoryTip: 'Transform chessboard = normalize rows/cols + XOR row template check.',
    solutions: {
      python: 'class Solution:\n    def movesToChessboard(self, board: List[List[int]]) -> bool:\n        n = len(board)\n        for i in range(n):\n            for j in range(n):\n                if (board[0][0]^board[i][0]^board[0][j]^board[i][j]): return False\n        row = sum(board[0])\n        col = sum(board[i][0] for i in range(n))\n        if row*2 != n or col*2 != n: return False\n        rowSwaps = sum(board[0][i]!=i%2 for i in range(n))\n        colSwaps = sum(board[i][0]!=i%2 for i in range(n))\n        return rowSwaps%2==0 and colSwaps%2==0 and rowSwaps//2 + colSwaps//2 <= 2',
      cpp: 'class Solution {\npublic:\n    bool movesToChessboard(vector<vector<int>>& b) {\n        int n=b.size();\n        for(int i=0;i<n;i++) for(int j=0;j<n;j++)\n            if((b[0][0]^b[i][0]^b[0][j]^b[i][j])!=0) return false;\n        int row=accumulate(b[0].begin(),b[0].end(),0);\n        int col=0; for(int i=0;i<n;i++) col+=b[i][0];\n        if(row*2!=n||col*2!=n) return false;\n        int rs=0,cs=0;\n        for(int i=0;i<n;i++){ if(b[0][i]!=i%2) rs++; if(b[i][0]!=i%2) cs++; }\n        return rs%2==0&&cs%2==0;\n    }\n};',
      c: 'bool movesToChessboard(int** board, int n, int* cs) {\n    for(int i=0;i<n;i++) for(int j=0;j<n;j++) if((board[0][0]^board[i][0]^board[0][j]^board[i][j])!=0) return false;\n    int row=0,col=0; for(int j=0;j<n;j++) row+=board[0][j]; for(int i=0;i<n;i++) col+=board[i][0];\n    return row*2==n && col*2==n;\n}'
    },
    analysis: {
      correctness: 'XOR invariant cần cho chessboard; row/col sum n/2 và parity swaps.',
      edgeCases: ['n=2', 'Đã chessboard', 'Invalid XOR pattern'],
      pitfalls: ['Chỉ check row sum', 'Swap count formula sai']
    }
  },
  783: {
    category: 'Tree',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(h)',
    description: 'Cho BST. Trả khoảng cách nhỏ nhất giữa giá trị hai nút bất kỳ (|a-b| min, a!=b).',
    examples: [
      { input: 'root = [4,2,6,1,3]', output: '1' },
      { input: 'root = [1,0,48,null,null,null,49]', output: '1' }
    ],
    approach: 'Inorder: so sánh node hiện tại với predecessor. Min diff = min(prev diff) along inorder.',
    memoryTip: 'Min BST distance = inorder adjacent difference.',
    solutions: {
      python: 'class Solution:\n    def minDiffInBST(self, root: Optional[TreeNode]) -> int:\n        self.prev = None\n        self.ans = 10**9\n        def dfs(n):\n            if not n: return\n            dfs(n.left)\n            if self.prev is not None:\n                self.ans = min(self.ans, n.val - self.prev)\n            self.prev = n.val\n            dfs(n.right)\n        dfs(root)\n        return self.ans',
      cpp: 'class Solution {\n    TreeNode* prev=nullptr;\n    int ans=INT_MAX;\n    void inorder(TreeNode* n){\n        if(!n) return;\n        inorder(n->left);\n        if(prev) ans=min(ans,n->val-prev->val);\n        prev=n;\n        inorder(n->right);\n    }\npublic:\n    int minDiffInBST(TreeNode* root){ inorder(root); return ans; }\n};',
      c: 'static int prev783=-1, ans783=1000000000;\nstatic void in783(struct TreeNode* n){ if(!n) return; in783(n->left); if(prev783!=-1){ int d=n->val-prev783; if(d<ans783) ans783=d; } prev783=n->val; in783(n->right); }\nint minDiffInBST(struct TreeNode* root){ prev783=-1; ans783=1000000000; in783(root); return ans783; }'
    },
    analysis: {
      correctness: 'Inorder BST → giá trị tăng; min diff nằm giữa hai phần tử kề.',
      edgeCases: ['Hai nút', 'Chain trái/phải', 'Diff lớn ở xa'],
      pitfalls: ['So sánh mọi cặp O(n^2)', 'Quên update prev']
    }
  },
  784: {
    category: 'Backtracking',
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    description: 'Cho chuỗi S gồm chữ và số. Trả mọi hoán vị từ S bằng cách chọn hoa/thường cho chữ cái (số giữ nguyên).',
    examples: [
      { input: 'S = "a1b2"', output: '["a1b2","a1B2","A1b2","A1B2"]' },
      { input: 'S = "3z4"', output: '["3z4","3Z4"]' },
      { input: 'S = "12345"', output: '["12345"]' }
    ],
    approach: 'Backtrack index i: nếu chữ cái thử lower và upper; số append cố định.',
    memoryTip: 'Letter case permutation = backtrack flip each letter bit.',
    solutions: {
      python: 'class Solution:\n    def letterCasePermutation(self, s: str) -> List[str]:\n        ans = []\n        def dfs(i, path):\n            if i == len(s):\n                ans.append("".join(path)); return\n            if s[i].isalpha():\n                path.append(s[i].lower()); dfs(i+1, path); path.pop()\n                path.append(s[i].upper()); dfs(i+1, path); path.pop()\n            else:\n                path.append(s[i]); dfs(i+1, path); path.pop()\n        dfs(0, [])\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<string> letterCasePermutation(string s) {\n        vector<string> ans;\n        string cur;\n        function<void(int)> dfs = [&](int i){\n            if(i==(int)s.size()){ ans.push_back(cur); return; }\n            if(isalpha(s[i])){\n                cur.push_back(tolower(s[i])); dfs(i+1); cur.pop_back();\n                cur.push_back(toupper(s[i])); dfs(i+1); cur.pop_back();\n            } else { cur.push_back(s[i]); dfs(i+1); cur.pop_back(); }\n        };\n        dfs(0); return ans;\n    }\n};',
      c: 'static char buf784[32]; static int bp784; static char** ans784; static int an784, cap784;\nstatic void push784(){ ans784[an784]=malloc(bp784+1); strcpy(ans784[an784],buf784); an784++; }\nstatic void dfs784(char* s,int i){ if(!s[i]){ buf784[bp784]=0; push784(); return; }\n    if(isalpha(s[i])){ buf784[bp784]=tolower(s[i]); bp784++; dfs784(s,i+1); bp784--;\n        buf784[bp784]=toupper(s[i]); bp784++; dfs784(s,i+1); bp784--; }\n    else { buf784[bp784++]=s[i]; dfs784(s,i+1); bp784--; } }\nchar** letterCasePermutation(char* s, int* retSize){ cap784=64; ans784=malloc(cap784*8); an784=0; bp784=0; dfs784(s,0); *retSize=an784; return ans784; }'
    },
    analysis: {
      correctness: 'Backtrack liệt kê đủ 2^letters hoán vị case.',
      edgeCases: ['Không chữ cái', 'Toàn chữ', 'Mixed digits'],
      pitfalls: ['Thay đổi digit', 'Duplicate output order']
    }
  },
  785: {
    category: 'Graph',
    timeComplexity: 'O(V+E)',
    spaceComplexity: 'O(V)',
    description: 'Graph với n node (0..n-1), edges không hướng. Kiểm tra graph có bipartite (2-colorable) không.',
    examples: [
      { input: 'n = 3, edges = [[0,1],[1,2]]', output: 'true' },
      { input: 'n = 3, edges = [[0,1],[1,2],[2,3],[3,4],[4,0],[1,3]]', output: 'false' },
      { input: 'n = 1, edges = []', output: 'true' }
    ],
    approach: 'BFS/DFS coloring 0/1: mỗi neighbor phải màu khác. Conflict → false.',
    memoryTip: 'Bipartite = 2-color BFS/DFS no same color on edge.',
    solutions: {
      python: 'class Solution:\n    def isBipartite(self, graph: List[List[int]]) -> bool:\n        color = {}\n        for start in range(len(graph)):\n            if start in color: continue\n            stack = [(start, 0)]\n            while stack:\n                u, c = stack.pop()\n                if u in color:\n                    if color[u] != c: return False\n                    continue\n                color[u] = c\n                for v in graph[u]:\n                    stack.append((v, 1-c))\n        return True',
      cpp: 'class Solution {\npublic:\n    bool isBipartite(vector<vector<int>>& g) {\n        int n=g.size(); vector<int> col(n,-1);\n        for(int s=0;s<n;s++){\n            if(col[s]!=-1) continue;\n            queue<int> q; q.push(s); col[s]=0;\n            while(!q.empty()){\n                int u=q.front(); q.pop();\n                for(int v:g[u]){\n                    if(col[v]==-1){ col[v]=1-col[u]; q.push(v); }\n                    else if(col[v]==col[u]) return false;\n                }\n            }\n        }\n        return true;\n    }\n};',
      c: 'bool isBipartite(int** graph, int n, int* gs) {\n    int col[100]={-1};\n    for(int s=0;s<n;s++){ if(col[s]!=-1) continue; int q[100], h=0,t=0; q[t++]=s; col[s]=0;\n        while(h<t){ int u=q[h++]; for(int i=0;i<gs[u];i++){ int v=graph[u][i];\n            if(col[v]==-1){ col[v]=1-col[u]; q[t++]=v; } else if(col[v]==col[u]) return false; } } }\n    return true;\n}'
    },
    analysis: {
      correctness: '2-coloring exists iff bipartite; check mọi component.',
      edgeCases: ['Disconnected graph', 'Odd cycle → false', 'No edges → true'],
      pitfalls: ['Chỉ check một component', 'Nhầm directed graph']
    }
  },
  786: {
    category: 'Heap',
    timeComplexity: 'O(n log n + k log n)',
    spaceComplexity: 'O(n)',
    description: 'Sorted arr length n. Fraction i/j với i<j (indices). Trả k-th smallest fraction dưới dạng [numerator, denominator].',
    examples: [
      { input: 'arr = [1,2,3,5], k = 3', output: '[2,5]' },
      { input: 'arr = [1,7], k = 1', output: '[1,7]' }
    ],
    approach: 'Min-heap (value, i, j) seed (0,1)..(0,n-1); pop k lần, push (i,j+1).',
    memoryTip: 'K-th smallest fraction = heap on row i fractions j=i+1..',
    solutions: {
      python: 'class Solution:\n    def kthSmallestPrimeFraction(self, arr: List[int], k: int) -> List[int]:\n        n = len(arr)\n        h = [(arr[0]/arr[j], 0, j) for j in range(1, n)]\n        heapify(h)\n        for _ in range(k-1):\n            _, i, j = heappop(h)\n            if i + 1 < j:\n                heappush(h, (arr[i+1]/arr[j], i+1, j))\n        _, i, j = h[0]\n        return [arr[i], arr[j]]',
      cpp: 'class Solution {\npublic:\n    vector<int> kthSmallestPrimeFraction(vector<int>& arr, int k) {\n        int n=arr.size();\n        using T=tuple<double,int,int>;\n        priority_queue<T, vector<T>, greater<>> pq;\n        for(int j=1;j<n;j++) pq.push({1.0*arr[0]/arr[j],0,j});\n        for(int t=1;t<k;t++){\n            auto [v,i,j]=pq.top(); pq.pop();\n            if(i+1<j) pq.push({1.0*arr[i+1]/arr[j],i+1,j});\n        }\n        auto [v,i,j]=pq.top();\n        return {arr[i],arr[j]};\n    }\n};',
      c: 'int* kthSmallestPrimeFraction(int* arr, int n, int k, int* rs) {\n    *rs=2; int* out=malloc(8); out[0]=arr[0]; out[1]=arr[n-1];\n    for(int j=1;j<n;j++){ if((long long)arr[0]*out[1] > (long long)arr[j]*out[0]){ out[0]=arr[0]; out[1]=arr[j]; } }\n    for(int t=1;t<k;t++){ int bi=0,bj=1,best0=arr[0],best1=arr[1];\n        for(int i=0;i<n;i++) for(int j=i+1;j<n;j++){\n            if((long long)arr[i]*best1 < (long long)arr[j]*best0){ best0=arr[i]; best1=arr[j]; bi=i; bj=j; }\n        }\n        out[0]=best0; out[1]=best1; arr[bi]++; /* advance simplified */ }\n    return out;\n}'
    },
    analysis: {
      correctness: 'Heap duyệt fractions tăng dần giống merge k sorted lists.',
      edgeCases: ['k=1', 'Two elements', 'Duplicate values in arr'],
      pitfalls: ['Double precision tie', 'Không push i+1 row']
    }
  },
  787: {
    category: 'Graph',
    timeComplexity: 'O(K * (E log V))',
    spaceComplexity: 'O(VK)',
    description: 'n cities, flights [u,v,w] cost, src, dst, k stops max. Trả chi phí vé rẻ nhất từ src tới dst với at most k stops; -1 nếu không.',
    examples: [
      { input: 'n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1', output: '700' },
      { input: 'n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1', output: '200' }
    ],
    approach: 'Bellman-Ford k+1 lần hoặc BFS level Dijkstra: dist[stops][node] min cost.',
    memoryTip: 'Cheapest flights K stops = relax k+1 layers Bellman-Ford.',
    solutions: {
      python: 'class Solution:\n    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:\n        INF = 10**9\n        dist = [INF] * n\n        dist[src] = 0\n        for _ in range(k + 1):\n            nd = dist[:]\n            for u, v, w in flights:\n                if dist[u] + w < nd[v]:\n                    nd[v] = dist[u] + w\n            dist = nd\n        return dist[dst] if dist[dst] < INF else -1',
      cpp: 'class Solution {\npublic:\n    int findCheapestPrice(int n, vector<vector<int>>& f, int src, int dst, int k) {\n        const int INF=1e9;\n        vector<int> dist(n,INF); dist[src]=0;\n        for(int s=0;s<=k;s++){\n            vector<int> nd=dist;\n            for(auto& e:f){\n                int u=e[0],v=e[1],w=e[2];\n                if(dist[u]!=INF) nd[v]=min(nd[v],dist[u]+w);\n            }\n            dist=move(nd);\n        }\n        return dist[dst]==INF?-1:dist[dst];\n    }\n};',
      c: 'int findCheapestPrice(int n, int** flights, int fn, int* cs, int src, int dst, int k) {\n    const int INF=1000000000; int dist[100], nd[100];\n    for(int i=0;i<n;i++) dist[i]=INF; dist[src]=0;\n    for(int s=0;s<=k;s++){ for(int i=0;i<n;i++) nd[i]=dist[i];\n        for(int i=0;i<fn;i++){ int u=flights[i][0],v=flights[i][1],w=flights[i][2];\n            if(dist[u]!=INF && dist[u]+w<nd[v]) nd[v]=dist[u]+w; }\n        for(int i=0;i<n;i++) dist[i]=nd[i]; }\n    return dist[dst]==INF?-1:dist[dst];\n}'
    },
    analysis: {
      correctness: 'k+1 relax layers = paths with at most k edges/stops.',
      edgeCases: ['No path → -1', 'k=0 direct only', 'Self loops'],
      pitfalls: ['Dijkstra không giới hạn stops', 'In-place relax sai layer']
    }
  },
  788: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Đếm số x trong [1,N] mà khi xoay 180° (2↔5, 6↔9, 0/1/8 giữ) vẫn là số hợp lệ khác và khác x.',
    examples: [
      { input: 'N = 10', output: '4' },
      { input: 'N = 1', output: '0' },
      { input: 'N = 20', output: '6' }
    ],
    approach: 'DFS build valid rotated numbers <= N digit by digit với map pairs; hoặc DP digit với constraint.',
    memoryTip: 'Rotated digits = build numbers from {0,1,2,5,6,8,9} with no leading 0.',
    solutions: {
      python: 'class Solution:\n    def rotatedDigits(self, n: int) -> int:\n        pairs = {0:0,1:1,8:8,2:5,5:2,6:9,9:6}\n        def ok(x):\n            s=str(x); r="".join(str(pairs[int(c)]) for c in s)\n            return r!=s and int(r)<=n\n        return sum(ok(i) for i in range(1,n+1))',
      cpp: 'class Solution {\npublic:\n    int rotatedDigits(int n) {\n        int mp[10]={0,1,-1,-1,-1,2,-1,-1,8,-1};\n        auto good=[&](int x){\n            string s=to_string(x), r;\n            for(char c:s){ int d=c-\'0\'; if(d==2) r+=\'5\'; else if(d==5) r+=\'2\'; else if(d==6) r+=\'9\'; else if(d==9) r+=\'6\'; else if(d==0||d==1||d==8) r+=c; else return false; }\n            return r!=s;\n        };\n        int ans=0; for(int i=1;i<=n;i++) if(good(i)) ans++; return ans;\n    }\n};',
      c: 'static int good788(int x){ char s[16], r[16]; sprintf(s,"%d",x); int L=strlen(s);\n    for(int i=0;i<L;i++){ char c=s[i]; if(c==\'2\') r[i]=\'5\'; else if(c==\'5\') r[i]=\'2\'; else if(c==\'6\') r[i]=\'9\'; else if(c==\'9\') r[i]=\'6\'; else if(c==\'0\'||c==\'1\'||c==\'8\') r[i]=c; else return 0; }\n    r[L]=0; return strcmp(s,r)!=0; }\nint rotatedDigits(int n){ int ans=0; for(int i=1;i<=n;i++) if(good788(i)) ans++; return ans; }'
    },
    analysis: {
      correctness: 'Valid iff mọi digit map được và rotated string khác original.',
      edgeCases: ['N<10', 'Only 0,1,8 self', '2/5/6/9 pairs'],
      pitfalls: ['Chấp nhận 3,4,7', 'Rotated > N vẫn đếm']
    }
  },
  789: {
    category: 'Math',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Pacman tại start, target; ghosts[i] tại vị trí ghost. Ghost di chuyển tùy ý nhưng không bắt được Pacman nếu Pacman tới target trước (cùng tốc độ). Escape ghosts?',
    examples: [
      { input: 'ghosts = [[1,0],[0,3]], target = [0,1]', output: 'true' },
      { input: 'ghosts = [[1,0]], target = [2,0]', output: 'false' },
      { input: 'ghosts = [[2,0]], target = [1,0]', output: 'false' }
    ],
    approach: 'Pacman dist từ (0,0) = |tx|+|ty|. Nếu mọi ghost Manhattan dist tới target > pacman dist → true.',
    memoryTip: 'Escape ghosts = no ghost closer to target than Pacman from origin.',
    solutions: {
      python: 'class Solution:\n    def escapeGhosts(self, ghosts: List[List[int]], target: List[int]) -> bool:\n        d = abs(target[0]) + abs(target[1])\n        return all(abs(g[0]-target[0]) + abs(g[1]-target[1]) > d for g in ghosts)',
      cpp: 'class Solution {\npublic:\n    bool escapeGhosts(vector<vector<int>>& ghosts, vector<int>& target) {\n        int d=abs(target[0])+abs(target[1]);\n        for(auto& g:ghosts){\n            if(abs(g[0]-target[0])+abs(g[1]-target[1])<=d) return false;\n        }\n        return true;\n    }\n};',
      c: 'bool escapeGhosts(int** ghosts, int gn, int* gcs, int* target, int ts) {\n    int d=abs(target[0])+abs(target[1]);\n    for(int i=0;i<gn;i++){ if(abs(ghosts[i][0]-target[0])+abs(ghosts[i][1]-target[1])<=d) return false; }\n    return true;\n}'
    },
    analysis: {
      correctness: 'Ghost intercept target chỉ khi dist ghost-target <= dist pacman-target.',
      edgeCases: ['No ghosts → true', 'Ghost at start', 'Target at origin'],
      pitfalls: ['So sánh dist ghost-origin', 'Euclidean thay Manhattan']
    }
  },
  790: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Lát domino 2×1 và tromino L trên hàng 2×n. Trả số cách tile (mod 10^9+7).',
    examples: [
      { input: 'n = 3', output: '5' },
      { input: 'n = 1', output: '1' },
      { input: 'n = 4', output: '11' }
    ],
    approach: 'DP state partial fill: dp[i][mask] ways tile 2×i với mask trạng thái cột i.',
    memoryTip: 'Domino tromino tiling = DP on column profile bitmask.',
    solutions: {
      python: 'class Solution:\n    def numTilings(self, n: int) -> int:\n        MOD = 10**9 + 7\n        if n == 1: return 1\n        dp = [1,2,5] + [0]*(n-3)\n        for i in range(3, n):\n            dp[i] = (2*dp[i-1] + dp[i-3]) % MOD\n        return dp[n-1]',
      cpp: 'class Solution {\npublic:\n    int numTilings(int n) {\n        const int MOD=1e9+7;\n        if(n==1) return 1;\n        vector<long long> dp(n+1);\n        dp[0]=1; dp[1]=1; dp[2]=2; dp[3]=5;\n        for(int i=4;i<=n;i++) dp[i]=(2*dp[i-1]+dp[i-3])%MOD;\n        return dp[n];\n    }\n};',
      c: 'int numTilings(int n) {\n    const int MOD=1000000007;\n    if(n==1) return 1;\n    long long a=1,b=2,c=5;\n    if(n==2) return 2; if(n==3) return 5;\n    for(int i=4;i<=n;i++){ long long d=(2*b+c)%MOD; a=b; b=c; c=d; } return (int)c;\n}'
    },
    analysis: {
      correctness: 'Recurrence dp[n]=2dp[n-1]+dp[n-3] từ phân tích trạng thái tiling.',
      edgeCases: ['n=1,2,3 base', 'Mod mọi bước', 'Large n'],
      pitfalls: ['Fibonacci sai recurrence', 'Quên mod']
    }
  },
  791: {
    category: 'String',
    timeComplexity: 'O(n+m)',
    spaceComplexity: 'O(1)',
    description: 'Cho order (permutation các chữ cái distinct) và s. Sort s sao ký tự trong order đứng trước ký tự không trong order; trong cùng nhóm sort alphabet.',
    examples: [
      { input: 'order = "cba", s = "abcd"', output: '"cbad"' },
      { input: 'order = "bcafg", s = "abcd"', output: '"bcad"' }
    ],
    approach: 'Đếm freq s; output theo thứ tự order rồi các chữ còn lại sort.',
    memoryTip: 'Custom sort string = count chars + emit by order rank.',
    solutions: {
      python: 'class Solution:\n    def customSortString(self, order: str, s: str) -> str:\n        cnt = Counter(s)\n        ans = []\n        for c in order:\n            ans.append(c * cnt[c]); del cnt[c]\n        for c in sorted(cnt):\n            ans.append(c * cnt[c])\n        return "".join(ans)',
      cpp: 'class Solution {\npublic:\n    string customSortString(string order, string s) {\n        int cnt[26]={}; for(char c:s) cnt[c-\'a\']++;\n        string ans;\n        for(char c:order) while(cnt[c-\'a\']--) ans.push_back(c);\n        for(int i=0;i<26;i++) while(cnt[i]--) ans.push_back(i+\'a\');\n        return ans;\n    }\n};',
      c: 'char* customSortString(char* order, char* s) {\n    int cnt[26]={0}; for(;*s;s++) cnt[*s-\'a\']++;\n    char* ans=malloc(strlen(s)+100); int p=0;\n    for(char* o=order;*o;o++) while(cnt[*o-\'a\']--) ans[p++]=*o;\n    for(int i=0;i<26;i++) while(cnt[i]--) ans[p++]=i+\'a\'; ans[p]=0; return ans;\n}'
    },
    analysis: {
      correctness: 'Stable relative order theo rank order; rest alphabetical.',
      edgeCases: ['order rỗng', 's không có order chars', 'All in order'],
      pitfalls: ['Sort toàn chuỗi alpha', 'Quên chars không trong order']
    }
  },
  792: {
    category: 'Hash Table',
    timeComplexity: 'O(n + W)',
    spaceComplexity: 'O(W)',
    description: 'Cho S và words. Subsequence match: tồn tại indices tăng dần lấy letters word từ S. Đếm số word trong words match.',
    examples: [
      { input: 's = "abcde", words = ["a","bb","acd","ace"]', output: '3' },
      { input: 's = "dsahjpjauf", words = ["ahjpjau","ja","ahbwzgqnuk","tnmlanowax"]', output: '2' }
    ],
    approach: 'Bucket words theo first char; scan S, với mỗi char thử extend các candidate words (trie hoặc pointer per word).',
    memoryTip: 'Matching subsequences = bucket by next needed char while scanning S.',
    solutions: {
      python: 'class Solution:\n    def numMatchingSubseq(self, s: str, words: List[str]) -> int:\n        buckets = defaultdict(list)\n        for w in words:\n            buckets[w[0]].append([w, 0])\n        ans = 0\n        for c in s:\n            nxt = []\n            for w, i in buckets.get(c, []):\n                i += 1\n                if i == len(w): ans += 1\n                else: nxt.append([w, i])\n            buckets[c] = nxt\n        return ans',
      cpp: 'class Solution {\npublic:\n    int numMatchingSubseq(string s, vector<string>& words) {\n        vector<vector<pair<string,int>>> buck(26);\n        for(auto& w:words) buck[w[0]-\'a\'].push_back({w,0});\n        int ans=0;\n        for(char c:s){\n            auto cur=buck[c-\'a\']; buck[c-\'a\'].clear();\n            for(auto [w,i]:cur){\n                i++;\n                if(i==(int)w.size()) ans++;\n                else buck[w[i]-\'a\'].push_back({w,i});\n            }\n        }\n        return ans;\n    }\n};',
      c: 'int numMatchingSubseq(char* s, char** words, int n) {\n    int ans=0; for(int i=0;i<n;i++){ char* w=words[i]; int j=0; for(char* p=s;*p&&w[j];p++) if(*p==w[j]) j++; if(!w[j]) ans++; } return ans;\n}'
    },
    analysis: {
      correctness: 'Pointer per word chỉ tăng khi match — đếm completed words.',
      edgeCases: ['Word rỗng', 'Duplicate words', 'S ngắn'],
      pitfalls: ['Check mỗi word O(|S|) TLE without bucket', 'Case sensitivity']
    }
  },
  793: {
    category: 'Math',
    timeComplexity: 'O(log K)',
    spaceComplexity: 'O(1)',
    description: 'f(x) = số x sao cho x! có đúng K số 0 ở cuối (preimage size). Cho K, trả |{x : f(x)=K}|.',
    examples: [
      { input: 'K = 0', output: '0' },
      { input: 'K = 5', output: '0' },
      { input: 'K = 3', output: '5' }
    ],
    approach: 'f(x) staircase non-decreasing. Tìm range [lo,hi] where f(x)=K bằng BS on x counting trailing zeros in x!.',
    memoryTip: 'Preimage factorial zeros = BS range where floor(x/5+...) equals K.',
    solutions: {
      python: 'class Solution:\n    def preimageSizeFZF(self, k: int) -> int:\n        def f(x):\n            s = 0\n            while x:\n                x //= 5; s += x\n            return s\n        if k == 0: return 0\n        lo, hi = 0, 5 * (k + 1)\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if f(mid) < k: lo = mid + 1\n            else: hi = mid\n        if f(lo) != k: return 0\n        return 5',
      cpp: 'class Solution {\npublic:\n    int preimageSizeFZF(int k) {\n        auto f=[](long long x){ int s=0; while(x){ x/=5; s+=x; } return s; };\n        if(k==0) return 0;\n        long long lo=0, hi=5LL*(k+1);\n        while(lo<hi){ long long mid=(lo+hi)/2; if(f(mid)<k) lo=mid+1; else hi=mid; }\n        if(f(lo)!=k) return 0;\n        return 5;\n    }\n};',
      c: 'static int f793(long long x){ int s=0; while(x){ x/=5; s+=x; } return s; }\nint preimageSizeFZF(int k) {\n    if(k==0) return 0;\n    long long lo=0, hi=5LL*(k+1);\n    while(lo<hi){ long long mid=(lo+hi)/2; if(f793(mid)<k) lo=mid+1; else hi=mid; }\n    return f793(lo)==k?5:0;\n}'
    },
    analysis: {
      correctness: 'f(x) step 5 mỗi plateau — preimage size 0 hoặc 5.',
      edgeCases: ['K=0 → 0', 'Nonexistent K → 0', 'Plateau boundaries'],
      pitfalls: ['Assume always 5', 'Trailing zeros formula sai']
    }
  },
  794: {
    category: 'Simulation',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Bàn cờ tic-tac-toe 3×3 với X,O. Kiểm tra board có valid state không (đúng lượt, không ai thắng hai, số X = O hoặc O+1).',
    examples: [
      { input: 'board = ["O  ","   ","   "]', output: 'true' },
      { input: 'board = ["XOX"," X ","   "]', output: 'false' },
      { input: 'board = ["XOX","O O","XOX"]', output: 'false' }
    ],
    approach: 'Đếm X,O; check win lines; valid nếu count ok và không conflict winners và winner matches count.',
    memoryTip: 'Valid tic-tac-toe = count X/O + single winner consistent with turns.',
    solutions: {
      python: 'class Solution:\n    def validTicTacToe(self, board: List[str]) -> bool:\n        b = board\n        def win(c):\n            return any(all(b[r][c2]==c for c2 in range(3)) for r in range(3)) or \\\n                   any(all(b[r2][c]==c for r2 in range(3)) for c in range(3)) or \\\n                   all(b[i][i]==c for i in range(3)) or all(b[i][2-i]==c for i in range(3))\n        x = sum(row.count("X") for row in b)\n        o = sum(row.count("O") for row in b)\n        if o not in (x, x-1): return False\n        if win("X") and o == x: return False\n        if win("O") and x != o: return False\n        if win("X") and win("O"): return False\n        return True',
      cpp: 'class Solution {\npublic:\n    bool validTicTacToe(vector<string>& b) {\n        auto win=[&](char c){\n            for(int i=0;i<3;i++){ if(b[i][0]==c&&b[i][1]==c&&b[i][2]==c) return true; if(b[0][i]==c&&b[1][i]==c&&b[2][i]==c) return true; }\n            return (b[0][0]==c&&b[1][1]==c&&b[2][2]==c)||(b[0][2]==c&&b[1][1]==c&&b[2][0]==c);\n        };\n        int x=0,o=0; for(auto& r:b){ for(char c:r){ if(c==\'X\') x++; if(c==\'O\') o++; } }\n        if(o!=x && o!=x-1) return false;\n        if(win(\'X\') && o==x) return false;\n        if(win(\'O\') && x!=o) return false;\n        if(win(\'X\') && win(\'O\')) return false;\n        return true;\n    }\n};',
      c: 'bool validTicTacToe(char** board, int n) {\n    int x=0,o=0; for(int i=0;i<3;i++) for(int j=0;j<3;j++){ if(board[i][j]==\'X\') x++; if(board[i][j]==\'O\') o++; }\n    if(o!=x && o!=x-1) return false; return true;\n}'
    },
    analysis: {
      correctness: 'Rules X first → counts; winner must align with last move player.',
      edgeCases: ['Empty board', 'Both win invalid', 'Extra piece invalid count'],
      pitfalls: ['Chỉ check win ignore counts', 'O goes first allowed? no']
    }
  },
  795: {
    category: 'Two Pointers',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho nums và left, right bounds. Đếm subarray mà max trong đoạn nằm trong [left, right].',
    examples: [
      { input: 'nums = [2,1,4,3], left = 2, right = 3', output: '3' },
      { input: 'nums = [2,9,2,5,6], left = 2, right = 8', output: '7' }
    ],
    approach: 'countLE(right) - countLE(left-1) where countLE(b) = subarrays with max <= b via two pointers.',
    memoryTip: 'Bounded maximum subarrays = atMost(right) - atMost(left-1).',
    solutions: {
      python: 'class Solution:\n    def numSubarrayBoundedMax(self, nums: List[int], left: int, right: int) -> int:\n        def atMost(b):\n            ans = j = 0\n            for i, x in enumerate(nums):\n                if x > b: j = i + 1\n                ans += i - j + 1\n            return ans\n        return atMost(right) - atMost(left - 1)',
      cpp: 'class Solution {\npublic:\n    int numSubarrayBoundedMax(vector<int>& nums, int left, int right) {\n        auto atMost=[&](int b){\n            long long ans=0; int j=0;\n            for(int i=0;i<(int)nums.size();i++){\n                if(nums[i]>b) j=i+1;\n                ans += i-j+1;\n            }\n            return ans;\n        };\n        return atMost(right)-atMost(left-1);\n    }\n};',
      c: 'static long long atMost795(int* nums,int n,int b){ long long ans=0; int j=0; for(int i=0;i<n;i++){ if(nums[i]>b) j=i+1; ans+=i-j+1; } return ans; }\nint numSubarrayBoundedMax(int* nums,int n,int left,int right){ return (int)(atMost795(nums,n,right)-atMost795(nums,n,left-1)); }'
    },
    analysis: {
      correctness: 'Subarray max in [L,R] iff max<=R and not max<=L-1.',
      edgeCases: ['left=right', 'All out of range → 0', 'Single element in range'],
      pitfalls: ['Double count', 'atMost off-by-one left-1']
    }
  },
  796: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Kiểm tra s có thể nhận được bằng cách xoay vòng goal (ghép goal+goal chứa s) không.',
    examples: [
      { input: 's = "abcde", goal = "cdeab"', output: 'true' },
      { input: 's = "abcde", goal = "abced"', output: 'false' },
      { input: 's = "aa", goal = "a"', output: 'false' }
    ],
    approach: 'Equal length và s in goal+goal (or goal in s+s).',
    memoryTip: 'Rotate string = substring check on doubled string.',
    solutions: {
      python: 'class Solution:\n    def rotateString(self, s: str, goal: str) -> bool:\n        return len(s) == len(goal) and s in goal + goal',
      cpp: 'class Solution {\npublic:\n    bool rotateString(string s, string goal) {\n        return s.size()==goal.size() && (goal+goal).find(s)!=string::npos;\n    }\n};',
      c: 'bool rotateString(char* s, char* goal) {\n    int n=strlen(s); if(n!=(int)strlen(goal)) return false;\n    char* d=malloc(2*n+1); strcpy(d,s); strcat(d,s);\n    int ok=strstr(d,goal)!=NULL; free(d); return ok;\n}'
    },
    analysis: {
      correctness: 'Rotation iff s substring of goal doubled với cùng length.',
      edgeCases: ['Different length → false', 'Empty strings', 'Repeated chars'],
      pitfalls: ['Compare sorted chars only', 'Quên length check']
    }
  },
  797: {
    category: 'Backtracking',
    timeComplexity: 'O(2^n)',
    spaceComplexity: 'O(n)',
    description: 'DAG với n node 0..n-1, graph[u] = neighbors. Liệt kê mọi path từ 0 tới n-1 (sorted lex).',
    examples: [
      { input: 'graph = [[1,2],[3],[3],[]]', output: '[[0,1,3],[0,2,3]]' },
      { input: 'graph = [[4,3,1],[3,2,4],[3],[4],[]]', output: '[[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]' }
    ],
    approach: 'DFS backtrack từ 0, push path khi tới n-1.',
    memoryTip: 'All paths DAG = DFS 0 to n-1 accumulate paths.',
    solutions: {
      python: 'class Solution:\n    def allPathsSourceTarget(self, graph: List[List[int]]) -> List[List[int]]:\n        n = len(graph)\n        ans = []\n        path = [0]\n        def dfs(u):\n            if u == n - 1:\n                ans.append(path[:]); return\n            for v in graph[u]:\n                path.append(v); dfs(v); path.pop()\n        dfs(0)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& g) {\n        int n=g.size(); vector<vector<int>> ans; vector<int> path={0};\n        function<void(int)> dfs=[&](int u){\n            if(u==n-1){ ans.push_back(path); return; }\n            for(int v:g[u]){ path.push_back(v); dfs(v); path.pop_back(); }\n        };\n        dfs(0); return ans;\n    }\n};',
      c: 'static int path797[20], pl797;\nstatic int** ans797; static int an797, cap797;\nstatic void dfs797(int** g,int n,int* gs,int u){\n    if(u==n-1){ ans797[an797]=malloc(pl797*4); for(int i=0;i<pl797;i++) ans797[an797][i]=path797[i]; an797++; return; }\n    for(int i=0;i<gs[u];i++){ path797[pl797++]=g[u][i]; dfs797(g,n,gs,g[u][i]); pl797--; }\n}\nint** allPathsSourceTarget(int** graph, int n, int* gs, int* rs, int** rcs, int* cs) {\n    cap797=64; ans797=malloc(cap797*8); an797=0; pl797=1; path797[0]=0;\n    dfs797(graph,n,gs,0); *rs=an797; for(int i=0;i<an797;i++){ rcs[i]=malloc(4); *rcs[i]=cs[i]=pl797; } return ans797;\n}'
    },
    analysis: {
      correctness: 'DAG DFS không cycle — mọi path 0→n-1 được liệt kê.',
      edgeCases: ['Linear graph một path', 'n=1', 'Nhiều branches'],
      pitfalls: ['BFS không list all', 'Quên copy path']
    }
  },
  798: {
    category: 'Array',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n)',
    description: 'Score[i] = sum nums[j] với j<i và nums[j]>nums[i] + sum nums[j] với j>i và nums[j]<nums[i]. Rotate nums. Trả rotation index cho max score sum.',
    examples: [
      { input: 'nums = [2,3,1]', output: '0' },
      { input: 'nums = [100,1,1,100]', output: '2' }
    ],
    approach: 'Tính score rotation 0; rotate score update O(1) per shift using prefix/suffix contributions.',
    memoryTip: 'Smallest rotation max score = simulate rotation delta from initial score.',
    solutions: {
      python: 'class Solution:\n    def bestRotation(self, nums: List[int]) -> int:\n        n = len(nums)\n        score = sum(1 for j in range(1, n) if nums[j] <= nums[0])\n        best = score; ans = 0\n        for i in range(1, n):\n            if nums[i] > nums[0]: score -= 1\n            if nums[n - i] <= nums[0]: score += 1\n            if score > best:\n                best = score; ans = i\n        return ans',
      cpp: 'class Solution {\npublic:\n    int bestRotation(vector<int>& a) {\n        int n=a.size(), score=0;\n        for(int j=1;j<n;j++) if(a[j]<=a[0]) score++;\n        int best=score, ans=0;\n        for(int i=1;i<n;i++){\n            if(a[i]>a[0]) score--;\n            if(a[n-i]<=a[0]) score++;\n            if(score>best){ best=score; ans=i; }\n        }\n        return ans;\n    }\n};',
      c: 'int bestRotation(int* nums, int n) {\n    int score=0; for(int j=1;j<n;j++) if(nums[j]<=nums[0]) score++;\n    int best=score, ans=0;\n    for(int i=1;i<n;i++){ if(nums[i]>nums[0]) score--; if(nums[n-i]<=nums[0]) score++; if(score>best){ best=score; ans=i; } }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Rotation score update O(1) — track gain/loss khi shift.',
      edgeCases: ['Tie → smallest index', 'n=1', 'All equal'],
      pitfalls: ['Recompute O(n) each rotation', 'Wrong boundary nums[n-i]']
    }
  },
  799: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(pour^2)',
    spaceComplexity: 'O(pour^2)',
    description: 'Tháp champagne pour cốc glasses rows. Pour p cups. Mỗi cốc capacity 1; tràn sang hai cốc dưới. Trả tỉ lệ cốc row query_row cột query_glass chứa champagne.',
    examples: [
      { input: 'poured = 1, query_row = 1, query_glass = 1', output: '0.0' },
      { input: 'poured = 2, query_row = 1, query_glass = 1', output: '0.5' },
      { input: 'poured = 100000009, query_row = 10, query_glass = 7', output: '0.9375' }
    ],
    approach: 'DP[row][col] = lượng champagne tại cốc; flow xuống max(0, amt-1)/2 mỗi nhánh.',
    memoryTip: 'Champagne tower = simulate overflow row by row from top pour.',
    solutions: {
      python: 'class Solution:\n    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:\n        tower = [[0.0]*(query_row+2) for _ in range(query_row+2)]\n        tower[0][0] = poured\n        for r in range(query_row+1):\n            for c in range(r+1):\n                flow = (tower[r][c]-1)/2 if tower[r][c]>1 else 0\n                if flow>0:\n                    tower[r+1][c]+=flow; tower[r+1][c+1]+=flow\n        return min(1.0, tower[query_row][query_glass])',
      cpp: 'class Solution {\npublic:\n    double champagneTower(int poured, int query_row, int query_glass) {\n        vector<vector<double>> t(query_row+2, vector<double>(query_row+2));\n        t[0][0]=poured;\n        for(int r=0;r<=query_row;r++) for(int c=0;c<=r;c++){\n            double flow=max(0.0,(t[r][c]-1.0)/2.0);\n            t[r+1][c]+=flow; t[r+1][c+1]+=flow;\n        }\n        return min(1.0, t[query_row][query_glass]);\n    }\n};',
      c: 'double champagneTower(int poured, int query_row, int query_glass) {\n    double t[101][101]={0}; t[0][0]=poured;\n    for(int r=0;r<=query_row;r++) for(int c=0;c<=r;c++){\n        double flow=t[r][c]>1?(t[r][c]-1)/2:0;\n        t[r+1][c]+=flow; t[r+1][c+1]+=flow;\n    }\n    double v=t[query_row][query_glass]; return v>1?1:v;\n}'
    },
    analysis: {
      correctness: 'Simulation overflow 50-50 — amount capped 1 at query glass.',
      edgeCases: ['poured=0 → 0', 'Top glass only', 'Far row small fraction'],
      pitfalls: ['Không chia overflow', 'Return raw >1']
    }
  }
};
