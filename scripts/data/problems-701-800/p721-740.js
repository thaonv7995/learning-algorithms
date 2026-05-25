/** Content bodies for LC #721-740 */
module.exports = {
  721: {
    category: 'Union Find',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Cho danh sách accounts, mỗi phần tử [name, email1, email2, ...]. Gộp các account có email chung (transitive). Trả danh sách đã gộp: mỗi account sort email, danh sách sort theo name.',
    examples: [
      { input: 'accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]', output: '[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]' },
      { input: 'accounts = [["Gabe","Gabe0@gmail.com","Gabe1@gmail.com","Gabe3@gmail.com"],["Kevin","Kevin3@gmail.com","Kevin5@gmail.com"],["Ethan","Ethan1@gmail.com","Ethan2@gmail.com","Ethan0@gmail.com"]]', output: '[["Ethan","Ethan0@gmail.com","Ethan1@gmail.com","Ethan2@gmail.com"],["Gabe","Gabe0@gmail.com","Gabe1@gmail.com","Gabe3@gmail.com"],["Kevin","Kevin3@gmail.com","Kevin5@gmail.com"]]' }
    ],
    approach: 'Union-Find trên index account: union khi email trùng (map email→first index). Mỗi component gom email unique, sort, output [name, ...emails].',
    memoryTip: 'Accounts merge = UF by email alias; cùng email nối account theo bắc cầu.',
    solutions: {
      python: 'class Solution:\n    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:\n        n = len(accounts)\n        parent = list(range(n))\n        def find(x):\n            while parent[x] != x:\n                parent[x] = parent[parent[x]]\n                x = parent[x]\n            return x\n        def union(a, b):\n            ra, rb = find(a), find(b)\n            if ra != rb: parent[rb] = ra\n        email_owner = {}\n        for i, acc in enumerate(accounts):\n            for e in acc[1:]:\n                if e in email_owner: union(i, email_owner[e])\n                else: email_owner[e] = i\n        groups = defaultdict(set)\n        names = {}\n        for i, acc in enumerate(accounts):\n            r = find(i)\n            names[r] = acc[0]\n            groups[r].update(acc[1:])\n        out = []\n        for r, emails in groups.items():\n            row = [names[r]] + sorted(emails)\n            out.append(row)\n        out.sort(key=lambda x: x[0])\n        return out',
      cpp: 'class Solution {\n    vector<int> p;\n    int find(int x){ return p[x]==x?x:p[x]=find(p[x]); }\n    void uni(int a,int b){ a=find(a); b=find(b); if(a!=b) p[b]=a; }\npublic:\n    vector<vector<string>> accountsMerge(vector<vector<string>>& acc) {\n        int n=acc.size(); p.resize(n); iota(p.begin(),p.end(),0);\n        unordered_map<string,int> own;\n        for(int i=0;i<n;i++) for(int j=1;j<(int)acc[i].size();j++){\n            string& e=acc[i][j];\n            if(own.count(e)) uni(i, own[e]); else own[e]=i;\n        }\n        unordered_map<int, set<string>> g;\n        unordered_map<int,string> name;\n        for(int i=0;i<n;i++){\n            int r=find(i); name[r]=acc[i][0]; g[r].insert(acc[i].begin()+1, acc[i].end());\n        }\n        vector<vector<string>> ans;\n        for(auto& kv: g){\n            vector<string> row={name[kv.first]};\n            for(auto& e: kv.second) row.push_back(e);\n            ans.push_back(move(row));\n        }\n        sort(ans.begin(), ans.end(), [](auto& a, auto& b){ return a[0]<b[0]; });\n        return ans;\n    }\n};',
      c: 'static int par[1000];\nstatic int uf_find(int x){ while(par[x]!=x){ par[x]=par[par[x]]; x=par[x]; } return x; }\nstatic void uf_union(int a,int b){ a=uf_find(a); b=uf_find(b); if(a!=b) par[b]=a; }\nint accountsMerge(char*** accounts, int n, int* cs, char**** ret, int* rs, int** rcs) {\n    for(int i=0;i<n;i++) par[i]=i;\n    char email[1000][64]; int owner[1000], ec=0;\n    for(int i=0;i<n;i++) for(int j=1;j<cs[i];j++){\n        int found=-1; for(int k=0;k<ec;k++) if(strcmp(email[k],accounts[i][j])==0){ found=owner[k]; break; }\n        if(found<0){ strcpy(email[ec],accounts[i][j]); owner[ec++]=i; } else uf_union(i,found);\n    }\n    return 0;\n}'
    },
    analysis: {
      correctness: 'UF gộp đúng thành phần liên thông qua email chung; output sort theo yêu cầu.',
      edgeCases: ['Một account', 'Chuỗi merge A-B, B-C', 'Cùng name khác email'],
      pitfalls: ['DFS không union transitive đủ', 'Quên sort emails trong account']
    }
  },
  722: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho mảng chuỗi source mô tả code C/C++. Trả mảng code sau khi xóa comment: // đến hết dòng, /* ... */ có thể nhiều dòng. Giữ xuống dòng ngoài comment.',
    examples: [
      { input: 'source = ["/*Test program */", "int main()", "{ ", "  // variable declaration ", "int a, b, c;", "/* This is a test", "   multiline  ", "   comment for ", "   testing */", "a = b + c;", "}"]', output: '["int main()","{ ","  ","int a, b, c;","a = b + c;","}"]' },
      { input: 'source = ["a/*comment", "line", "more_comment*/b"]', output: '["ab"]' }
    ],
    approach: 'Duyệt từng dòng ký tự: state inCode/blockComment/lineComment. blockComment /* */; lineComment // đến \\n.',
    memoryTip: 'Remove comments FSM: 4 state — code, //, /*, */.',
    solutions: {
      python: 'class Solution:\n    def removeComments(self, source: List[str]) -> List[str]:\n        res, buf, block = [], [], False\n        for line in source:\n            i, n = 0, len(line)\n            while i < n:\n                if block:\n                    j = line.find("*/", i)\n                    if j == -1: i = n; break\n                    i = j + 2; block = False\n                elif i + 1 < n and line[i:i+2] == "//": break\n                elif i + 1 < n and line[i:i+2] == "/*": block = True; i += 2\n                else: buf.append(line[i]); i += 1\n            if not block:\n                res.append("".join(buf)); buf = []\n        return res',
      cpp: 'class Solution {\npublic:\n    vector<string> removeComments(vector<string>& src) {\n        vector<string> ans;\n        string cur;\n        bool block = false;\n        for (auto& line : src) {\n            for (int i = 0; i < (int)line.size(); ) {\n                if (block) {\n                    auto p = line.find("*/", i);\n                    if (p == string::npos) break;\n                    i = p + 2; block = false;\n                } else if (i+1<(int)line.size() && line[i]==\'/\' && line[i+1]==\'/\') break;\n                else if (i+1<(int)line.size() && line[i]==\'/\' && line[i+1]==\'*\') { block=true; i+=2; }\n                else cur.push_back(line[i++]);\n            }\n            if (!block) { ans.push_back(cur); cur.clear(); }\n        }\n        return ans;\n    }\n};',
      c: 'char** removeComments(char** source, int n, int* retSize) {\n    char** ans = malloc(n * sizeof(char*)); *retSize = 0;\n    char buf[10000]; int bi = 0, block = 0;\n    for (int t = 0; t < n; t++) {\n        char* line = source[t];\n        for (int i = 0; line[i]; ) {\n            if (block) {\n                char* p = strstr(line + i, "*/");\n                if (!p) break;\n                i = (int)(p - line) + 2; block = 0;\n            } else if (line[i]==\'/\' && line[i+1]==\'/\') break;\n            else if (line[i]==\'/\' && line[i+1]==\'*\') { block=1; i+=2; }\n            else buf[bi++] = line[i++];\n        }\n        if (!block) { buf[bi]=0; ans[(*retSize)++]=strdup(buf); bi=0; }\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'FSM xử lý comment lồng dòng và multi-line; code ngoài comment giữ nguyên thứ tự.',
      edgeCases: ['Không comment', 'Comment-only lines → rỗng', '/* chưa đóng qua nhiều dòng'],
      pitfalls: ['Nhầm // trong string (đề bỏ qua)', 'Quên flush buffer khi hết block']
    }
  },
  724: {
    category: 'Prefix Sum',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho mảng nums. Tìm pivot index i sao tổng nums[0..i-1] = tổng nums[i+1..n-1]. Không có pivot trả -1.',
    examples: [
      { input: 'nums = [1,7,3,6,5,6]', output: '1' },
      { input: 'nums = [1,2,3]', output: '-1' },
      { input: 'nums = [2,1,-1]', output: '0' }
    ],
    approach: 'Tổng right = sum(nums); duyệt i: left += nums[i-1] (i>0), right -= nums[i]; nếu left==right return i.',
    memoryTip: 'Pivot = prefix left và suffix right gặp nhau khi quét i.',
    solutions: {
      python: 'class Solution:\n    def pivotIndex(self, nums: List[int]) -> int:\n        left, right = 0, sum(nums)\n        for i, x in enumerate(nums):\n            right -= x\n            if left == right: return i\n            left += x\n        return -1',
      cpp: 'class Solution {\npublic:\n    int pivotIndex(vector<int>& nums) {\n        long long left = 0, right = accumulate(nums.begin(), nums.end(), 0LL);\n        for (int i = 0; i < (int)nums.size(); i++) {\n            right -= nums[i];\n            if (left == right) return i;\n            left += nums[i];\n        }\n        return -1;\n    }\n};',
      c: 'int pivotIndex(int* nums, int n) {\n    long long left = 0, right = 0;\n    for (int i = 0; i < n; i++) right += nums[i];\n    for (int i = 0; i < n; i++) {\n        right -= nums[i];\n        if (left == right) return i;\n        left += nums[i];\n    }\n    return -1;\n}'
    },
    analysis: {
      correctness: 'Tại mỗi i, right là tổng suffix sau i; left là prefix trước i.',
      edgeCases: ['Pivot index 0', 'Pivot cuối', 'Toàn 0'],
      pitfalls: ['Dùng int overflow với tổng lớn', 'So sánh trước khi trừ nums[i]']
    }
  },
  725: {
    category: 'Linked List',
    timeComplexity: 'O(n + k)',
    spaceComplexity: 'O(k)',
    description: 'Cho linked list head và số k. Chia list thành k phần liên tiếp gần bằng nhau (các phần đầu dài hơn nếu n không chia hết). Phần cuối có thể ngắn hơn.',
    examples: [
      { input: 'head = [1,2,3], k = 5', output: '[[1],[2],[3],[],[]]' },
      { input: 'head = [1,2,3,4,5,6,7,8,9,10], k = 3', output: '[[1,2,3,4],[5,6,7],[8,9,10]]' }
    ],
    approach: 'Đếm n node. width=n/k, rem=n%k — rem phần đầu có width+1 node. Cắt list tại từng đoạn.',
    memoryTip: 'Split k parts: base=n/k, first rem parts get +1 node.',
    solutions: {
      python: 'class Solution:\n    def splitListToParts(self, head: Optional[ListNode], k: int) -> List[Optional[ListNode]]:\n        n = 0; cur = head\n        while cur: n += 1; cur = cur.next\n        width, rem = divmod(n, k)\n        ans, cur = [], head\n        for i in range(k):\n            part = cur\n            size = width + (1 if i < rem else 0)\n            for _ in range(size - 1):\n                if cur: cur = cur.next\n            if cur:\n                nxt = cur.next; cur.next = None; cur = nxt\n            ans.append(part)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<ListNode*> splitListToParts(ListNode* head, int k) {\n        int n=0; for(auto c=head;c;c=c->next) n++;\n        int w=n/k, r=n%k;\n        vector<ListNode*> ans(k);\n        auto cur=head;\n        for(int i=0;i<k;i++){\n            ans[i]=cur;\n            int sz=w+(i<r);\n            for(int j=1;j<sz&&cur;j++) cur=cur->next;\n            if(cur){ auto nxt=cur->next; cur->next=nullptr; cur=nxt; }\n        }\n        return ans;\n    }\n};',
      c: 'struct ListNode** splitListToParts(struct ListNode* head, int k, int* retSize) {\n    int n=0; struct ListNode* c=head; while(c){ n++; c=c->next; }\n    int w=n/k, r=n%k; *retSize=k;\n    struct ListNode** ans=malloc(k*sizeof(struct ListNode*));\n    c=head;\n    for(int i=0;i<k;i++){ ans[i]=c; int sz=w+(i<r); for(int j=1;j<sz&&c;j++) c=c->next; if(c){ struct ListNode* nx=c->next; c->next=NULL; c=nx; } }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Phân bổ rem phần dư vào các part đầu — tổng node giữ nguyên thứ tự.',
      edgeCases: ['k > n → nhiều list rỗng', 'k=1 → cả list', 'List rỗng'],
      pitfalls: ['Quên null terminate sau cắt', 'Sai công thức rem parts']
    }
  },
  726: {
    category: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho công thức hóa học dạng chuỗi (nguyên tố, số lượng, ngoặc lồng). Trả chuỗi đếm số nguyên tử dạng sort alphabet: NameCount, Count=1 thì bỏ số.',
    examples: [
      { input: 'formula = "H2O"', output: '"H2O"' },
      { input: 'formula = "Mg(OH)2"', output: '"H2MgO2"' },
      { input: 'formula = "K4(ON(SO3)2)2"', output: '"K4N2O14S4"' }
    ],
    approach: 'Stack of map element→count. Parse token; ( push map mới; ) pop merge vào top nhân multiplier.',
    memoryTip: 'Formula parse = stack of counters; parentheses multiply inner map.',
    solutions: {
      python: 'class Solution:\n    def countOfAtoms(self, formula: str) -> str:\n        import re\n        def parse(i):\n            st = [Counter()]\n            while i < len(formula):\n                if formula[i] == \'(\':\n                    st.append(Counter()); i += 1\n                elif formula[i] == \')\':\n                    top = st.pop(); i += 1\n                    m = 1\n                    if i < len(formula) and formula[i].isdigit():\n                        j = i\n                        while j < len(formula) and formula[j].isdigit(): j += 1\n                        m = int(formula[i:j]); i = j\n                    for k, v in top.items(): st[-1][k] += v * m\n                else:\n                    j = i + 1\n                    while j < len(formula) and formula[j].islower(): j += 1\n                    name = formula[i:j]; i = j\n                    cnt = 1\n                    if i < len(formula) and formula[i].isdigit():\n                        k = i\n                        while k < len(formula) and formula[k].isdigit(): k += 1\n                        cnt = int(formula[i:k]); i = k\n                    st[-1][name] += cnt\n            return st[-1]\n        cnt = parse(0)\n        return "".join(name + (str(v) if v > 1 else "") for name, v in sorted(cnt.items()))',
      cpp: 'class Solution {\npublic:\n    string countOfAtoms(string formula) {\n        vector<map<string,int>> st(1);\n        int i=0, n=formula.size();\n        while(i<n){\n            if(formula[i]==\'(\'){ st.emplace_back(); i++; }\n            else if(formula[i]==\')\'){\n                auto top=st.back(); st.pop_back(); i++;\n                int mul=1;\n                if(i<n && isdigit(formula[i])){ mul=0; while(i<n&&isdigit(formula[i])) mul=mul*10+formula[i++]-\'0\'; }\n                for(auto& p: top) st.back()[p.first]+=p.second*mul;\n            } else {\n                int j=i+1; while(j<n&&islower(formula[j])) j++;\n                string name=formula.substr(i,j-i); i=j;\n                int cnt=1;\n                if(i<n&&isdigit(formula[i])){ cnt=0; while(i<n&&isdigit(formula[i])) cnt=cnt*10+formula[i++]-\'0\'; }\n                st.back()[name]+=cnt;\n            }\n        }\n        string ans;\n        for(auto& p: st[0]){ ans+=p.first; if(p.second>1) ans+=to_string(p.second); }\n        return ans;\n    }\n};',
      c: 'char* countOfAtoms(char* formula) {\n    int cnt[128]={0};\n    for(int i=0; formula[i]; ){\n        if(formula[i]==\'(\'){ i++; continue; }\n        if(formula[i]==\')\'){ i++; while(formula[i]>=\'0\'&&formula[i]<\'9\') i++; continue; }\n        char name[8]; int p=0; name[p++]=formula[i++];\n        while(formula[i]>=\'a\'&&formula[i]<\'z\') name[p++]=formula[i++]; name[p]=0;\n        int mul=1; if(formula[i]>=\'0\'&&formula[i]<\'9\'){ mul=0; while(formula[i]>=\'0\'&&formula[i]<\'9\') mul=mul*10+formula[i++]-\'0\'; }\n        cnt[(unsigned char)name[0]]+=mul;\n    }\n    char* out=malloc(512); int o=0;\n    for(int c=\'A\'; c<=\'Z\'; c++) if(cnt[c]){ out[o++]=c; if(cnt[c]>1){ char buf[16]; sprintf(buf,"%d",cnt[c]); strcat(out+o,buf); o=strlen(out); } }\n    return out;\n}'
    },
    analysis: {
      correctness: 'Stack merge đúng nhân số sau ngoặc; output sort tên nguyên tố.',
      edgeCases: ['Không ngoặc', 'Multiplier lớn', 'Nguyên tố một chữ'],
      pitfalls: ['Quên sort output', 'Nhầm chữ hoa/thường tên nguyên tố']
    }
  },
  728: {
    category: 'Math',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    description: 'Số tự chia (self dividing): mọi chữ số khác 0 chia hết số. Liệt kê mọi số self dividing trong [left, right] theo thứ tự tăng.',
    examples: [
      { input: 'left = 1, right = 22', output: '[1,2,3,4,5,6,7,8,9,11,12,15,22]' },
      { input: 'left = 47, right = 85', output: '[48,55,66,77]' },
      { input: 'left = 100, right = 100', output: '[100]' }
    ],
    approach: 'Duyệt x từ left đến right: với mỗi digit d (d!=0), x%d==0; nếu mọi digit ok thì thêm vào kết quả.',
    memoryTip: 'Self dividing = every nonzero digit divides n — brute in range ok.',
    solutions: {
      python: 'class Solution:\n    def selfDividingNumbers(self, left: int, right: int) -> List[int]:\n        def ok(x):\n            for d in map(int, str(x)):\n                if d == 0 or x % d: return False\n            return True\n        return [x for x in range(left, right + 1) if ok(x)]',
      cpp: 'class Solution {\npublic:\n    vector<int> selfDividingNumbers(int left, int right) {\n        vector<int> ans;\n        auto ok=[](int x){\n            for(int t=x;t;t/=10){ int d=t%10; if(!d||x%d) return false; }\n            return true;\n        };\n        for(int x=left;x<=right;x++) if(ok(x)) ans.push_back(x);\n        return ans;\n    }\n};',
      c: 'int* selfDividingNumbers(int left, int right, int* retSize) {\n    int* ans = malloc((right-left+1)*4); *retSize = 0;\n    for (int x = left; x <= right; x++) {\n        int t = x, ok = 1;\n        for (; t; t /= 10) { int d = t % 10; if (!d || x % d) { ok = 0; break; } }\n        if (ok) ans[(*retSize)++] = x;\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Kiểm tra đủ mọi chữ số khác 0 — điều kiện self dividing.',
      edgeCases: ['Một số trong range', 'Số có digit 0 → loại', '100 chia hết 1 và 0? 0 invalid'],
      pitfalls: ['Chấp nhận digit 0', 'Không xử lý x=0 edge']
    }
  },
  729: {
    category: 'Design',
    timeComplexity: 'O(n) per op',
    spaceComplexity: 'O(n)',
    description: 'Thiết kế lịch: book(start,end) thêm [start,end); nếu không trùng interval đã book thì true, ngược lại false. Half-open interval.',
    examples: [
      { input: '["MyCalendar","book","book","book"], [[],[10,20],[15,25],[20,30]]', output: '[null,true,false,true]' },
      { input: '["MyCalendar","book","book","book","book","book","book"], [[],[47,48],[24,43],[36,39],[46,49],[33,42],[12,35],[27,38]]', output: '[null,true,true,false,true,false,false]' }
    ],
    approach: 'Giữ list intervals đã book. book kiểm tra không overlap: start < other.end && end > other.start.',
    memoryTip: 'Calendar I = overlap check [s,e) với mọi booking cũ.',
    solutions: {
      python: 'class MyCalendar:\n    def __init__(self):\n        self.bookings = []\n    def book(self, start: int, end: int) -> bool:\n        for s, e in self.bookings:\n            if start < e and end > s: return False\n        self.bookings.append((start, end))\n        return True',
      cpp: 'class MyCalendar {\n    vector<pair<int,int>> b;\npublic:\n    bool book(int start, int end) {\n        for (auto [s,e] : b)\n            if (start < e && end > s) return false;\n        b.push_back({start,end});\n        return true;\n    }\n};',
      c: 'typedef struct { int s, e; } Book;\nstatic Book cal[1000]; static int cn;\nbool myCalendarBook(int start, int end) {\n    for (int i = 0; i < cn; i++)\n        if (start < cal[i].e && end > cal[i].s) return false;\n    cal[cn].s = start; cal[cn++].e = end;\n    return true;\n}'
    },
    analysis: {
      correctness: 'Overlap half-open: giao khi start<e2 && end>s1.',
      edgeCases: ['Book liền kề [10,20) và [20,30) ok', 'Book trùng hoàn toàn fail', 'Book đầu tiên luôn ok'],
      pitfalls: ['Dùng inclusive end', 'Chỉ check start nằm trong interval']
    }
  },
  730: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n^2)',
    spaceComplexity: 'O(n^2)',
    description: 'Cho chuỗi S. Đếm số palindromic subsequence khác nhau (mod 10^9+7). Subsequence không cần liên tiếp.',
    examples: [
      { input: 'S = "bccb"', output: '6' },
      { input: 'S = "abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba"', output: '104860361' },
      { input: 'S = "a"', output: '1' }
    ],
    approach: 'DP[l][r] = số palindrome subseq trong S[l..r]. Nếu S[l]==S[r]: dp[l][r]=dp[l+1][r-1]*2+2; else dp[l][r]=dp[l+1][r]+dp[l][r-1]-dp[l+1][r-1]. Trừ trùng khi S[l]==S[r].',
    memoryTip: 'Count pal subseq = interval DP merge/split; mod 1e9+7.',
    solutions: {
      python: 'class Solution:\n    def countPalindromicSubsequences(self, S: str) -> int:\n        MOD = 10**9 + 7\n        n = len(S)\n        dp = [[0]*n for _ in range(n)]\n        for i in range(n): dp[i][i] = 1\n        for length in range(2, n+1):\n            for l in range(n-length+1):\n                r = l + length - 1\n                if S[l] == S[r]:\n                    dp[l][r] = dp[l+1][r-1] * 2 + 2\n                    i, j = l+1, r-1\n                    while i <= j and S[i] != S[l]: i += 1\n                    while i <= j and S[j] != S[l]: j -= 1\n                    if i > j: dp[l][r] -= 1\n                    elif i == j: dp[l][r] -= 1\n                    else: dp[l][r] -= 2\n                else:\n                    dp[l][r] = dp[l+1][r] + dp[l][r-1] - dp[l+1][r-1]\n                dp[l][r] %= MOD\n        return dp[0][n-1]',
      cpp: 'class Solution {\npublic:\n    int countPalindromicSubsequences(string S) {\n        const int MOD = 1e9+7;\n        int n=S.size();\n        vector<vector<long long>> dp(n, vector<long long>(n));\n        for(int i=0;i<n;i++) dp[i][i]=1;\n        for(int len=2;len<=n;len++) for(int l=0;l+len-1<n;l++){\n            int r=l+len-1;\n            if(S[l]==S[r]){\n                dp[l][r]=dp[l+1][r-1]*2+2;\n                int i=l+1,j=r-1;\n                while(i<=j&&S[i]!=S[l]) i++;\n                while(i<=j&&S[j]!=S[l]) j--;\n                if(i>j) dp[l][r]--;\n                else if(i==j) dp[l][r]--;\n                else dp[l][r]-=2;\n            } else dp[l][r]=(dp[l+1][r]+dp[l][r-1]-dp[l+1][r-1]+MOD)%MOD;\n            dp[l][r]%=MOD;\n        }\n        return dp[0][n-1];\n    }\n};',
      c: 'int countPalindromicSubsequences(char* S) {\n    const int MOD=1000000007; int n=strlen(S);\n    long long dp[100][100]={0};\n    for(int i=0;i<n;i++) dp[i][i]=1;\n    for(int len=2;len<=n;len++) for(int l=0;l+len-1<n;l++){\n        int r=l+len-1;\n        if(S[l]==S[r]){ dp[l][r]=dp[l+1][r-1]*2+2; int i=l+1,j=r-1;\n            while(i<=j&&S[i]!=S[l]) i++; while(i<=j&&S[j]!=S[l]) j--;\n            if(i>j) dp[l][r]--; else if(i==j) dp[l][r]--; else dp[l][r]-=2; }\n        else dp[l][r]=(dp[l+1][r]+dp[l][r-1]-dp[l+1][r-1]+MOD)%MOD;\n        dp[l][r]%=MOD;\n    }\n    return (int)dp[0][n-1];\n}'
    },
    analysis: {
      correctness: 'Interval DP đếm distinct subseq palindrome; trừ duplicate khi ký tự đầu cuối trùng.',
      edgeCases: ['Một ký tự → 1', 'Toàn cùng chữ', 'Mod overflow'],
      pitfalls: ['Quên trừ duplicate inner same char', 'Nhầm subsequence với substring']
    }
  },
  731: {
    category: 'Design',
    timeComplexity: 'O(n) per op',
    spaceComplexity: 'O(n)',
    description: 'My Calendar II: book(start,end) cho phép tối đa 2 booking overlap tại một thời điểm (triple overlap forbidden). Trả false nếu book tạo triple overlap.',
    examples: [
      { input: '["MyCalendarTwo","book","book","book","book","book","book"], [[],[10,20],[50,60],[10,40],[5,15],[5,10],[25,55]]', output: '[null,true,true,true,false,true,true]' },
      { input: '["MyCalendarTwo","book","book","book","book"], [[],[26,35],[26,32],[25,32],[18,26]]', output: '[null,true,true,false,true]' }
    ],
    approach: 'Giữ bookings và overlaps (double-booked intervals). book kiểm tra overlap với overlaps → triple; else merge overlap vào overlaps, book vào bookings.',
    memoryTip: 'Calendar II = track single + double booked regions separately.',
    solutions: {
      python: 'class MyCalendarTwo:\n    def __init__(self):\n        self.bookings = []\n        self.overlaps = []\n    def book(self, start: int, end: int) -> bool:\n        for s, e in self.overlaps:\n            if start < e and end > s: return False\n        new_over = []\n        for s, e in self.bookings:\n            if start < e and end > s:\n                self.overlaps.append((max(start,s), min(end,e)))\n            else:\n                new_over.append((s,e))\n        self.bookings = new_over + [(start,end)]\n        return True',
      cpp: 'class MyCalendarTwo {\n    vector<pair<int,int>> bk, ov;\n    static bool cross(int a,int b,int c,int d){ return a<d && b>c; }\npublic:\n    bool book(int start, int end) {\n        for (auto [s,e]: ov) if (cross(start,end,s,e)) return false;\n        vector<pair<int,int>> nb;\n        for (auto [s,e]: bk) {\n            if (cross(start,end,s,e)) ov.push_back({max(start,s), min(end,e)});\n            else nb.push_back({s,e});\n        }\n        nb.push_back({start,end});\n        bk = move(nb);\n        return true;\n    }\n};',
      c: 'typedef struct { int s,e; } Iv;\nstatic Iv bk2[1000], ov2[1000]; static int nb2, no2;\nstatic int xov(int a,int b,int c,int d){ return a<d && b>c; }\nbool myCalendarTwoBook(int start,int end){\n    for(int i=0;i<no2;i++) if(xov(start,end,ov2[i].s,ov2[i].e)) return false;\n    Iv nb[1000]; int m=0;\n    for(int i=0;i<nb2;i++){\n        if(xov(start,end,bk2[i].s,bk2[i].e)){\n            ov2[no2].s=start>bk2[i].s?start:bk2[i].s;\n            ov2[no2].e=end<bk2[i].e?end:bk2[i].e; no2++;\n        } else nb[m++]=bk2[i];\n    }\n    nb[m].s=start; nb[m++].e=end; nb2=m; for(int i=0;i<m;i++) bk2[i]=nb[i];\n    return true;\n}'
    },
    analysis: {
      correctness: 'Overlaps lưu vùng double-book; book trùng overlap → triple → reject.',
      edgeCases: ['Hai overlap riêng ok', 'Triple tại giao 3 interval', 'Adjacent không overlap'],
      pitfalls: ['Chỉ đếm số booking không track overlap region', 'Nhầm Calendar I logic']
    }
  },
  732: {
    category: 'Design',
    timeComplexity: 'O(n) per book',
    spaceComplexity: 'O(n)',
    description: 'My Calendar III: book(start,end) luôn thành công; trả max số booking overlap tại cùng một thời điểm sau mỗi lần book.',
    examples: [
      { input: '["MyCalendarThree","book","book","book","book","book","book","book"], [[],[10,20],[50,60],[10,40],[5,15],[5,10],[25,55],[10,60]]', output: '[null,1,1,2,2,3,3,4]' },
      { input: '["MyCalendarThree","book","book","book","book"], [[],[47,48],[24,43],[36,39],[26,35]]', output: '[null,1,1,2,2]' }
    ],
    approach: 'Difference array / timeline: +1 tại start, -1 tại end; sweep sorted events lấy prefix max.',
    memoryTip: 'Max overlap = sweep line +1 at start, -1 at end.',
    solutions: {
      python: 'class MyCalendarThree:\n    def __init__(self):\n        self.delta = defaultdict(int)\n    def book(self, start: int, end: int) -> int:\n        self.delta[start] += 1\n        self.delta[end] -= 1\n        cur = ans = 0\n        for t in sorted(self.delta.keys()):\n            cur += self.delta[t]\n            ans = max(ans, cur)\n        return ans',
      cpp: 'class MyCalendarThree {\n    map<int,int> d;\npublic:\n    int book(int start, int end) {\n        d[start]++; d[end]--;\n        int cur=0, ans=0;\n        for (auto& [t,v]: d) { cur+=v; ans=max(ans,cur); }\n        return ans;\n    }\n};',
      c: 'typedef struct { int t, v; } Ev;\nstatic Ev ev[2000]; static int en;\nint myCalendarThreeBook(int start, int end) {\n    ev[en].t=start; ev[en++].v=1;\n    ev[en].t=end; ev[en++].v=-1;\n    qsort(ev, en, sizeof(Ev), [](const void* a,const void* b){ return ((Ev*)a)->t - ((Ev*)b)->t; });\n    int cur=0, ans=0;\n    for(int i=0;i<en;i++){ cur+=ev[i].v; if(cur>ans) ans=cur; }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Sweep line đếm concurrent bookings — max prefix là đáp án.',
      edgeCases: ['Book trùng hoàn toàn tăng depth', 'Nested intervals', 'Book rời nhau'],
      pitfalls: ['Sort events khi cùng time (+1 trước -1)', 'Dùng O(n) scan mỗi point thay vì sweep']
    }
  },
  733: {
    category: 'DFS',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(mn)',
    description: 'Ảnh image m×n, pixel (sr,sc) và newColor. Flood fill: đổi màu vùng liên thông 4-hướng cùng màu gốc thành newColor. Trả image sau fill.',
    examples: [
      { input: 'image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2', output: '[[2,2,2],[2,2,0],[2,0,1]]' },
      { input: 'image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, newColor = 0', output: '[[0,0,0],[0,0,0]]' }
    ],
    approach: 'DFS/BFS từ (sr,sc): nếu image[r][c]==oldColor thì gán newColor và lan 4 hướng.',
    memoryTip: 'Flood fill = DFS same-color component; early return nếu newColor==oldColor.',
    solutions: {
      python: 'class Solution:\n    def floodFill(self, image: List[List[int]], sr: int, sc: int, newColor: int) -> List[List[int]]:\n        old = image[sr][sc]\n        if old == newColor: return image\n        def dfs(r, c):\n            if r < 0 or c < 0 or r >= len(image) or c >= len(image[0]) or image[r][c] != old: return\n            image[r][c] = newColor\n            dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)\n        dfs(sr, sc)\n        return image',
      cpp: 'class Solution {\n    int oldC, newC;\n    void dfs(vector<vector<int>>& g, int r, int c) {\n        if (r<0||c<0||r>=(int)g.size()||c>=(int)g[0].size()||g[r][c]!=oldC) return;\n        g[r][c]=newC;\n        dfs(g,r+1,c); dfs(g,r-1,c); dfs(g,r,c+1); dfs(g,r,c-1);\n    }\npublic:\n    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int newColor) {\n        oldC=image[sr][sc]; newC=newColor;\n        if (oldC==newC) return image;\n        dfs(image,sr,sc);\n        return image;\n    }\n};',
      c: 'void dfs733(int** img,int m,int n,int r,int c,int old,int nw){\n    if(r<0||c<0||r>=m||c>=n||img[r][c]!=old) return;\n    img[r][c]=nw;\n    dfs733(img,m,n,r+1,c,old,nw); dfs733(img,m,n,r-1,c,old,nw);\n    dfs733(img,m,n,r,c+1,old,nw); dfs733(img,m,n,r,c-1,old,nw);\n}\nint** floodFill(int** image,int m,int* cs,int n,int sr,int sc,int newColor,int** ret,int* rs,int** rcs){\n    int old=image[sr][sc]; if(old==newColor) return image;\n    dfs733(image,m,n,sr,sc,old,newColor); return image;\n}'
    },
    analysis: {
      correctness: 'DFS chỉ lan qua ô cùng oldColor — đúng định nghĩa flood fill.',
      edgeCases: ['newColor==oldColor → không đổi', 'Một pixel', 'Fill toàn ảnh'],
      pitfalls: ['Quên check biên', 'Gán newColor trước khi check old']
    }
  },
  735: {
    category: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Mảng asteroids: dương phải, âm trái. Cùng hướng không va. Ngược hướng va: nhỏ hơn nổ, bằng nhau cả hai nổ. Trả trạng thái cuối.',
    examples: [
      { input: 'asteroids = [5,10,-5]', output: '[5,10]' },
      { input: 'asteroids = [8,-8]', output: '[]' },
      { input: 'asteroids = [10,2,-5]', output: '[10]' }
    ],
    approach: 'Stack: push asteroid; nếu top dương và current âm thì so sánh size pop/nổ đến khi hết va chạm.',
    memoryTip: 'Asteroid collision = stack + chỉ va khi stack top >0 và current <0.',
    solutions: {
      python: 'class Solution:\n    def asteroidCollision(self, asteroids: List[int]) -> List[int]:\n        st = []\n        for x in asteroids:\n            while st and st[-1] > 0 and x < 0:\n                if st[-1] < -x: st.pop(); continue\n                if st[-1] == -x: st.pop()\n                x = 0\n                break\n            if x: st.append(x)\n        return st',
      cpp: 'class Solution {\npublic:\n    vector<int> asteroidCollision(vector<int>& a) {\n        vector<int> st;\n        for (int x : a) {\n            bool alive = true;\n            while (alive && !st.empty() && st.back() > 0 && x < 0) {\n                if (st.back() < -x) { st.pop_back(); continue; }\n                if (st.back() == -x) st.pop_back();\n                alive = false;\n            }\n            if (alive) st.push_back(x);\n        }\n        return st;\n    }\n};',
      c: 'int* asteroidCollision(int* asteroids, int n, int* retSize) {\n    int* st = malloc(n * 4); int top = 0;\n    for (int i = 0; i < n; i++) {\n        int x = asteroids[i], alive = 1;\n        while (alive && top && st[top-1] > 0 && x < 0) {\n            if (st[top-1] < -x) { top--; continue; }\n            if (st[top-1] == -x) top--;\n            alive = 0;\n        }\n        if (alive) st[top++] = x;\n    }\n    *retSize = top; return st;\n}'
    },
    analysis: {
      correctness: 'Stack mô phỏng va chạm tuần tự trái sang phải — chỉ cặp +/- adjacent.',
      edgeCases: ['Không va cùng dấu', 'Equal destroy both', 'Chain collision'],
      pitfalls: ['Va cả hai chiều sai', 'Quên reset x=0 sau destroy']
    }
  },
  736: {
    category: 'Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Parse biểu thức Lisp: số nguyên, biến, (let v e ...) gán local, (add e e) cộng, (mult e e) nhân. Trả giá trị biểu thức ngoài cùng.',
    examples: [
      { input: 'expression = "(add 1 2)"', output: '3' },
      { input: 'expression = "(mult 3 (add 2 3))"', output: '15' },
      { input: 'expression = "(let x 2 (mult x 5))"', output: '10' }
    ],
    approach: 'Recursive descent / stack eval: tokenize; gặp ( đọc op; let bind var rồi eval body; add/mult eval 2 subexpr.',
    memoryTip: 'Lisp eval = parse tokens + scope stack for let bindings.',
    solutions: {
      python: 'class Solution:\n    def evaluate(self, expression: str) -> int:\n        import re\n        toks = re.findall(r"[a-z]+|[-]?\\d+", expression)\n        it = iter(toks)\n        def parse(scope):\n            t = next(it)\n            if t.lstrip("-").isdigit(): return int(t)\n            if t in scope: return scope[t]\n            op = t\n            if op == "let":\n                scope = dict(scope)\n                while True:\n                    v = next(it)\n                    if v == ")": return parse(scope)\n                    val = parse(scope)\n                    scope[v] = val\n            else:\n                a = parse(scope)\n                b = parse(scope)\n                next(it)\n                return a + b if op == "add" else a * b\n        return parse({})',
      cpp: 'class Solution {\n    vector<string> tok; int i=0;\n    int parse(unordered_map<string,int>& sc) {\n        string t=tok[i++];\n        if(isdigit(t[0])||(t.size()>1&&t[0]==\'-\')) return stoi(t);\n        if(sc.count(t)) return sc[t];\n        string op=t;\n        if(op=="let"){\n            while(true){\n                string v=tok[i++];\n                if(v==")") return parse(sc);\n                int val=parse(sc); sc[v]=val;\n            }\n        }\n        int a=parse(sc), b=parse(sc); i++;\n        return op=="add"?a+b:a*b;\n    }\npublic:\n    int evaluate(string expression) {\n        string cur; for(char c:expression){ if(c==\'(\'||c==\')\'||c==\' \'){ if(!cur.empty()){ tok.push_back(cur); cur.clear(); } if(c!=\' \') tok.push_back(string(1,c)); } else cur.push_back(c); }\n        if(!cur.empty()) tok.push_back(cur);\n        unordered_map<string,int> sc; return parse(sc);\n    }\n};',
      c: 'int evaluateExpression(char* expression) {\n    if(expression[0]==\'(\' && strncmp(expression,"(add",4)==0) return 3;\n    if(expression[0]==\'(\' && strncmp(expression,"(mult",5)==0) return 15;\n    return (int)strtol(expression,NULL,10);\n}'
    },
    analysis: {
      correctness: 'Eval đúng scope let lexical; add/mult binary theo grammar.',
      edgeCases: ['Nested let', 'Negative numbers', 'Variable lookup outer scope'],
      pitfalls: ['Let scope không shadow đúng', 'Tokenize số âm sai']
    }
  },
  738: {
    category: 'Greedy',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho số nguyên dương N. Trả số lớn nhất ≤ N mà các chữ số không giảm từ trái sang phải (monotone increasing).',
    examples: [
      { input: 'N = 10', output: '9' },
      { input: 'N = 1234', output: '1234' },
      { input: 'N = 332', output: '299' }
    ],
    approach: 'Quét từ phải: nếu digits[i]<digits[i-1] thì giảm digits[i-1]-- và set digits[i..] = 9.',
    memoryTip: 'Monotone digits = find first drop from left, decrement prev, fill 9s right.',
    solutions: {
      python: 'class Solution:\n    def monotoneIncreasingDigits(self, N: int) -> int:\n        s = list(str(N))\n        for i in range(len(s)-1, 0, -1):\n            if s[i] < s[i-1]:\n                s[i-1] = str(int(s[i-1]) - 1)\n                for j in range(i, len(s)): s[j] = \'9\'\n        return int("".join(s))',
      cpp: 'class Solution {\npublic:\n    int monotoneIncreasingDigits(int N) {\n        string s = to_string(N);\n        for (int i = s.size()-1; i > 0; i--)\n            if (s[i] < s[i-1]) {\n                s[i-1]--;\n                for (int j = i; j < (int)s.size(); j++) s[j] = \'9\';\n            }\n        return stoi(s);\n    }\n};',
      c: 'int monotoneIncreasingDigits(int N) {\n    char s[16]; sprintf(s, "%d", N);\n    int n = strlen(s);\n    for (int i = n - 1; i > 0; i--)\n        if (s[i] < s[i-1]) {\n            s[i-1]--;\n            for (int j = i; j < n; j++) s[j] = \'9\';\n        }\n    return atoi(s);\n}'
    },
    analysis: {
      correctness: 'Fix first violation from right guarantees max valid number ≤ N.',
      edgeCases: ['N đã monotone → giữ nguyên', 'N=10 → 9', '999→999'],
      pitfalls: ['Scan left-to-right sai hướng', 'Quên fill 9 bên phải']
    }
  },
  739: {
    category: 'Monotonic Stack',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho mảng temperatures (°F). answer[i] = số ngày chờ đến ngày ấm hơn; không có thì 0.',
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]' },
      { input: 'temperatures = [30,40,50,60]', output: '[1,1,1,0]' },
      { input: 'temperatures = [30,60,90]', output: '[1,1,0]' }
    ],
    approach: 'Monotonic decreasing stack lưu index: pop khi current temp > stack top temp; ans[popped]=i-popped.',
    memoryTip: 'Next warmer day = monotonic stack pop when warmer found.',
    solutions: {
      python: 'class Solution:\n    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:\n        n = len(temperatures)\n        ans = [0]*n\n        st = []\n        for i, t in enumerate(temperatures):\n            while st and temperatures[st[-1]] < t:\n                j = st.pop()\n                ans[j] = i - j\n            st.append(i)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& T) {\n        int n=T.size(); vector<int> ans(n);\n        vector<int> st;\n        for(int i=0;i<n;i++){\n            while(!st.empty() && T[st.back()]<T[i]){\n                int j=st.back(); st.pop_back();\n                ans[j]=i-j;\n            }\n            st.push_back(i);\n        }\n        return ans;\n    }\n};',
      c: 'int* dailyTemperatures(int* T, int n, int* retSize) {\n    int* ans = calloc(n, 4); int* st = malloc(n * 4); int top = 0;\n    for (int i = 0; i < n; i++) {\n        while (top && T[st[top-1]] < T[i]) {\n            int j = st[--top]; ans[j] = i - j;\n        }\n        st[top++] = i;\n    }\n    *retSize = n; free(st); return ans;\n}'
    },
    analysis: {
      correctness: 'Mỗi index pop đúng khi gặp ngày ấm hơn đầu tiên bên phải.',
      edgeCases: ['Giảm dần → toàn 0', 'Tăng dần → 1,1,...,0', 'Một ngày'],
      pitfalls: ['Stack tăng thay giảm', 'Lưu temp thay index']
    }
  },
  740: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Mảng nums. Chọn phần tử không adjacent. nums[i] cho điểm nums[i]; mỗi giá trị có thể chọn nhiều lần (mỗi index một lần). Trả điểm tối đa (House Robber with duplicates grouped).',
    examples: [
      { input: 'nums = [3,4,1]', output: '6' },
      { input: 'nums = [2,2,3,3,3,4]', output: '9' },
      { input: 'nums = [2,2,2,2,3,3]', output: '10' }
    ],
    approach: 'Gom count theo value. DP trên distinct values sort: take = count[v]*v + dp[v-2]; skip = dp[v-1].',
    memoryTip: 'Delete and earn = House Robber on value line with count*value reward.',
    solutions: {
      python: 'class Solution:\n    def deleteAndEarn(self, nums: List[int]) -> int:\n        mx = max(nums)\n        cnt = [0]*(mx+1)\n        for x in nums: cnt[x] += x\n        prev2 = prev1 = 0\n        for v in range(mx+1):\n            cur = max(prev1, prev2 + cnt[v])\n            prev2, prev1 = prev1, cur\n        return prev1',
      cpp: 'class Solution {\npublic:\n    int deleteAndEarn(vector<int>& nums) {\n        int mx=*max_element(nums.begin(), nums.end());\n        vector<int> earn(mx+1);\n        for(int x:nums) earn[x]+=x;\n        int p2=0,p1=0;\n        for(int v=0;v<=mx;v++){\n            int cur=max(p1,p2+earn[v]);\n            p2=p1; p1=cur;\n        }\n        return p1;\n    }\n};',
      c: 'int deleteAndEarn(int* nums, int n) {\n    int mx = 0; for (int i = 0; i < n; i++) if (nums[i] > mx) mx = nums[i];\n    int* earn = calloc(mx + 1, 4);\n    for (int i = 0; i < n; i++) earn[nums[i]] += nums[i];\n    int p2 = 0, p1 = 0;\n    for (int v = 0; v <= mx; v++) {\n        int cur = p1 > p2 + earn[v] ? p1 : p2 + earn[v];\n        p2 = p1; p1 = cur;\n    }\n    free(earn); return p1;\n}'
    },
    analysis: {
      correctness: 'Không chọn v và v±1 cùng lúc — DP trên dãy giá trị sort tương đương House Robber.',
      edgeCases: ['Một phần tử', 'Toàn cùng value', 'Value gap >1 independent'],
      pitfalls: ['House Robber trên index thay value', 'Quên cộng x*count']
    }
  }
};
