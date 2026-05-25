/** Content bodies for LC #701-720 */
module.exports = {
  701: {
    category: 'Tree',
    timeComplexity: 'O(h)',
    spaceComplexity: 'O(h)',
    description: 'Cho cây BST root và giá trị val. Chèn val vào cây sao cho vẫn là BST (trái nhỏ hơn, phải lớn hơn). Trả về gốc cây sau khi chèn. Nếu val đã tồn tại vẫn chèn theo quy tắc BST (thường vào nhánh phải).',
    examples: [
      { input: 'root = [4,2,7,1,3], val = 5', output: '[4,2,7,1,3,5]' },
      { input: 'root = [40,20,60,10,30,50,70], val = 25', output: '[40,20,60,10,30,50,70,null,null,25]' },
      { input: 'root = [], val = 4', output: '[4]' }
    ],
    approach: 'Đệ quy: nếu root null tạo nút mới; nếu val < root.val chèn trái, ngược lại chèn phải. Hoặc lặp xuống lá rồi gắn nút mới.',
    memoryTip: 'BST insert luôn đi một nhánh — không cần rebalance như AVL.',
    solutions: {
      python: 'class Solution:\n    def insertIntoBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:\n        if not root:\n            return TreeNode(val)\n        if val < root.val:\n            root.left = self.insertIntoBST(root.left, val)\n        else:\n            root.right = self.insertIntoBST(root.right, val)\n        return root',
      cpp: 'class Solution {\npublic:\n    TreeNode* insertIntoBST(TreeNode* root, int val) {\n        if (!root) return new TreeNode(val);\n        if (val < root->val) root->left = insertIntoBST(root->left, val);\n        else root->right = insertIntoBST(root->right, val);\n        return root;\n    }\n};',
      c: 'struct TreeNode* insertIntoBST(struct TreeNode* root, int val) {\n    if (!root) {\n        struct TreeNode* n = malloc(sizeof(struct TreeNode));\n        n->val = val; n->left = n->right = NULL;\n        return n;\n    }\n    if (val < root->val) root->left = insertIntoBST(root->left, val);\n    else root->right = insertIntoBST(root->right, val);\n    return root;\n}'
    },
    analysis: {
      correctness: 'Invariant BST: mọi nút trái < cha < phải được giữ khi chèn đúng nhánh.',
      edgeCases: ['Cây rỗng → nút mới là root', 'Chèn nhỏ nhất/ lớn nhất → đi hết một nhánh'],
      pitfalls: ['Chèn sai nhánh khi val bằng root.val', 'Quên return root sau đệ quy']
    }
  },
  703: {
    category: 'Heap',
    timeComplexity: 'O(log k) mỗi add',
    spaceComplexity: 'O(k)',
    description: 'Thiết kế lớp lưu dòng số và trả phần tử lớn thứ k sau mỗi lần thêm. KthLargest(k, nums) khởi tạo; add(val) thêm số và trả k-th largest hiện tại.',
    examples: [
      { input: '["KthLargest","add","add","add","add","add","add"], [[3,[4,5,8,2]],[3],[5],[10],[9],[4]]', output: '[null,4,5,5,8,8]' },
      { input: '["KthLargest","add","add","add","add"], [[1,[1]],[1],[1],[2],[3]]', output: '[null,1,1,1,2]' }
    ],
    approach: 'Min-heap size k: push val, nếu size>k pop min. Top heap là k-th largest (k phần tử lớn nhất, nhỏ nhất trong đó).',
    memoryTip: 'Top-k lớn nhất → min-heap k phần tử, không max-heap toàn bộ stream.',
    solutions: {
      python: 'class KthLargest:\n    def __init__(self, k: int, nums: List[int]):\n        self.k = k\n        self.h = nums\n        heapify(self.h)\n        while len(self.h) > k:\n            heappop(self.h)\n    def add(self, val: int) -> int:\n        heappush(self.h, val)\n        if len(self.h) > self.k:\n            heappop(self.h)\n        return self.h[0]',
      cpp: 'class KthLargest {\n    int k;\n    priority_queue<int, vector<int>, greater<int>> pq;\npublic:\n    KthLargest(int k, vector<int>& nums) : k(k) {\n        for (int x : nums) { pq.push(x); if ((int)pq.size() > k) pq.pop(); }\n    }\n    int add(int val) {\n        pq.push(val);\n        if ((int)pq.size() > k) pq.pop();\n        return pq.top();\n    }\n};',
      c: 'typedef struct { int k; int* a; int n, cap; } KthLargest;\nstatic void hpush(int* h, int* sz, int x){ h[(*sz)++]=x; int i=*sz-1; while(i>0){ int p=(i-1)/2; if(h[p]<=h[i]) break; int t=h[p]; h[p]=h[i]; h[i]=t; i=p; } }\nstatic void hpop(int* h, int* sz){ (*sz)--; h[0]=h[*sz]; int i=0; for(;;){ int l=2*i+1,r=l+1,m=i; if(l<*sz&&h[l]<h[m]) m=l; if(r<*sz&&h[r]<h[m]) m=r; if(m==i) break; int t=h[i]; h[i]=h[m]; h[m]=t; i=m; } }\nKthLargest* kthLargestCreate(int k, int* nums, int n){ KthLargest* o=malloc(sizeof(KthLargest)); o->k=k; o->cap=1024; o->a=malloc(o->cap*4); o->n=0; for(int i=0;i<n;i++){ hpush(o->a,&o->n,nums[i]); if(o->n>k) hpop(o->a,&o->n);} return o; }\nint kthLargestAdd(KthLargest* o, int val){ hpush(o->a,&o->n,val); if(o->n>o->k) hpop(o->a,&o->n); return o->a[0]; }'
    },
    analysis: {
      correctness: 'Heap giữ đúng k phần tử lớn nhất stream; min của chúng là thứ k.',
      edgeCases: ['k=1 → max mới nhất', 'Stream ngắn hơn k ban đầu vẫn heapify đủ'],
      pitfalls: ['Dùng max-heap toàn bộ O(n) memory', 'Sort mỗi add O(n log n)']
    }
  },
  704: {
    category: 'Binary Search',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    description: 'Mảng nums đã sort tăng dần và target. Trả index của target nếu có, -1 nếu không.',
    examples: [
      { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4' },
      { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1' },
      { input: 'nums = [5], target = 5', output: '0' }
    ],
    approach: 'Binary search: lo=0, hi=n-1; mid=(lo+hi)/2; nếu nums[mid]==target return mid; nhỏ hơn thì lo=mid+1, lớn hơn hi=mid-1.',
    memoryTip: 'Template BS tìm exact match — vòng while lo<=hi.',
    solutions: {
      python: 'class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        lo, hi = 0, len(nums) - 1\n        while lo <= hi:\n            mid = (lo + hi) // 2\n            if nums[mid] == target: return mid\n            if nums[mid] < target: lo = mid + 1\n            else: hi = mid - 1\n        return -1',
      cpp: 'class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int lo = 0, hi = (int)nums.size() - 1;\n        while (lo <= hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) lo = mid + 1;\n            else hi = mid - 1;\n        }\n        return -1;\n    }\n};',
      c: 'int search(int* nums, int n, int target) {\n    int lo = 0, hi = n - 1;\n    while (lo <= hi) {\n        int mid = lo + (hi - lo) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}'
    },
    analysis: {
      correctness: 'Mỗi bước loại bỏ nửa không chứa target trên mảng sort.',
      edgeCases: ['Một phần tử hit/miss', 'Target ngoài [min,max]'],
      pitfalls: ['Overflow mid=(lo+hi)/2 trên C++ cũ', 'Dùng while lo<hi sai cho exact']
    }
  },
  705: {
    category: 'Design',
    timeComplexity: 'O(1) avg',
    spaceComplexity: 'O(n)',
    description: 'Thiết kế HashSet: add(key), remove(key), contains(key). Không dùng built-in hash set của ngôn ngữ.',
    examples: [
      { input: '["MyHashSet","add","add","contains","contains","add","remove","contains"], [[],[1],[2],[1],[3],[2],[2],[2]]', output: '[null,null,null,true,false,null,null,false]' },
      { input: '["MyHashSet","add","remove","contains"], [[],[1],[1],[1]]', output: '[null,null,null,false]' }
    ],
    approach: 'Chaining: mảng bucket size BASE, hash(key)%BASE, mỗi bucket linked list int. add/remove/contains duyệt bucket.',
    memoryTip: 'Design hash = buckets + collision chain, prime bucket size giảm cluster.',
    solutions: {
      python: 'class MyHashSet:\n    BASE = 769\n    def __init__(self):\n        self.data = [[] for _ in range(self.BASE)]\n    def _hash(self, key): return key % self.BASE\n    def add(self, key: int) -> None:\n        h = self._hash(key)\n        if key not in self.data[h]: self.data[h].append(key)\n    def remove(self, key: int) -> None:\n        h = self._hash(key)\n        if key in self.data[h]: self.data[h].remove(key)\n    def contains(self, key: int) -> bool:\n        return key in self.data[self._hash(key)]',
      cpp: 'class MyHashSet {\n    static const int BASE = 769;\n    vector<list<int>> data;\n    int hash(int key) { return key % BASE; }\npublic:\n    MyHashSet() : data(BASE) {}\n    void add(int key) {\n        int h = hash(key);\n        for (int x : data[h]) if (x == key) return;\n        data[h].push_back(key);\n    }\n    void remove(int key) {\n        int h = hash(key);\n        data[h].remove(key);\n    }\n    bool contains(int key) {\n        int h = hash(key);\n        for (int x : data[h]) if (x == key) return true;\n        return false;\n    }\n};',
      c: '#define HSZ 769\nstatic int buckets[HSZ][128], cnt[HSZ];\nstatic int hkey(int k){ return ((k%HSZ)+HSZ)%HSZ; }\nvoid myHashSetAdd(int key){ int b=hkey(key); for(int i=0;i<cnt[b];i++) if(buckets[b][i]==key) return; buckets[b][cnt[b]++]=key; }\nvoid myHashSetRemove(int key){ int b=hkey(key); for(int i=0;i<cnt[b];i++) if(buckets[b][i]==key){ buckets[b][i]=buckets[b][--cnt[b]]; return; } }\nbool myHashSetContains(int key){ int b=hkey(key); for(int i=0;i<cnt[b];i++) if(buckets[b][i]==key) return true; return false; }'
    },
    analysis: {
      correctness: 'Hash định vị bucket; list xử lý collision — add/remove/contains đúng membership.',
      edgeCases: ['Key âm (mod BASE)', 'Remove key không tồn tại', 'Duplicate add'],
      pitfalls: ['Bucket quá nhỏ → chain dài', 'Quên xử lý key âm khi mod']
    }
  },
  706: {
    category: 'Design',
    timeComplexity: 'O(1) avg',
    spaceComplexity: 'O(n)',
    description: 'Thiết kế HashMap: put(key,value), get(key), remove(key). Key và value trong [0, 10^6].',
    examples: [
      { input: '["MyHashMap","put","put","get","get","put","get","remove","get"], [[],[1,1],[2,2],[1],[3],[2,1],[2],[2],[2]]', output: '[null,null,null,1,-1,null,1,null,-1]' },
      { input: '["MyHashMap","put","get","remove","get"], [[],[0,1],[0],[0],[0]]', output: '[null,null,1,null,-1]' }
    ],
    approach: 'Chaining như HashSet nhưng mỗi bucket lưu pair (key,val). put upsert; get trả -1 nếu thiếu.',
    memoryTip: 'HashMap design = buckets of (k,v) pairs; get default -1 theo đề.',
    solutions: {
      python: 'class MyHashMap:\n    BASE = 769\n    def __init__(self):\n        self.data = [[] for _ in range(self.BASE)]\n    def _hash(self, key): return key % self.BASE\n    def put(self, key: int, value: int) -> None:\n        h = self._hash(key)\n        for i,(k,v) in enumerate(self.data[h]):\n            if k == key:\n                self.data[h][i] = (key, value); return\n        self.data[h].append((key, value))\n    def get(self, key: int) -> int:\n        for k,v in self.data[self._hash(key)]:\n            if k == key: return v\n        return -1\n    def remove(self, key: int) -> None:\n        h = self._hash(key)\n        self.data[h] = [(k,v) for k,v in self.data[h] if k != key]',
      cpp: 'class MyHashMap {\n    static const int BASE = 769;\n    vector<vector<pair<int,int>>> data;\n    int hash(int k){ return k % BASE; }\npublic:\n    MyHashMap() : data(BASE) {}\n    void put(int key, int value) {\n        auto& b = data[hash(key)];\n        for (auto& p : b) if (p.first == key) { p.second = value; return; }\n        b.emplace_back(key, value);\n    }\n    int get(int key) {\n        for (auto& p : data[hash(key)]) if (p.first == key) return p.second;\n        return -1;\n    }\n    void remove(int key) {\n        auto& b = data[hash(key)];\n        b.erase(remove_if(b.begin(), b.end(), [&](auto& p){ return p.first == key; }), b.end());\n    }\n};',
      c: '#define MSZ 769\nstatic int mk[MSZ][128], mv[MSZ][128], mc[MSZ];\nstatic int mhash(int k){ return ((k%MSZ)+MSZ)%MSZ; }\nvoid myHashMapPut(int key,int val){ int b=mhash(key); for(int i=0;i<mc[b];i++) if(mk[b][i]==key){ mv[b][i]=val; return; } mk[b][mc[b]]=key; mv[b][mc[b]++]=val; }\nint myHashMapGet(int key){ int b=mhash(key); for(int i=0;i<mc[b];i++) if(mk[b][i]==key) return mv[b][i]; return -1; }\nvoid myHashMapRemove(int key){ int b=mhash(key); for(int i=0;i<mc[b];i++) if(mk[b][i]==key){ mk[b][i]=mk[b][mc[b]-1]; mv[b][i]=mv[b][mc[b]-1]; mc[b]--; return; } }'
    },
    analysis: {
      correctness: 'put ghi đè value cũ; get/remove tìm đúng key trong bucket.',
      edgeCases: ['get key chưa put → -1', 'put cùng key nhiều lần', 'remove rồi get'],
      pitfalls: ['Nhầm HashSet không lưu value', 'Không upsert khi put trùng key']
    }
  },
  707: {
    category: 'Linked List',
    timeComplexity: 'O(n) get/addAt/remove',
    spaceComplexity: 'O(n)',
    description: 'Thiết kế linked list hỗ trợ get(index), addAtHead(val), addAtTail(val), addAtIndex(index,val), deleteAtIndex(index). Index hợp lệ 0..size-1 trừ addAtIndex có thể = size.',
    examples: [
      { input: '["MyLinkedList","addAtHead","addAtTail","addAtIndex","get","deleteAtIndex","get"], [[],[1],[3],[1,2],[1],[1],[1]]', output: '[null,null,null,null,2,null,3]' },
      { input: '["MyLinkedList","addAtHead","addAtHead","get","addAtIndex","get"], [[],[4],[5],[0],[1,2],[1]]', output: '[null,null,null,5,null,2]' }
    ],
    approach: 'Doubly linked list + dummy head/tail hoặc singly với size. Duyệt tới index cho get/add/delete.',
    memoryTip: 'Design LL: luôn track size; addAtIndex=size → addAtTail.',
    solutions: {
      python: 'class Node:\n    def __init__(self, val=0, nxt=None):\n        self.val, self.next = val, nxt\nclass MyLinkedList:\n    def __init__(self):\n        self.dummy = Node()\n        self.size = 0\n    def _node(self, index):\n        cur = self.dummy\n        for _ in range(index + 1):\n            cur = cur.next\n        return cur\n    def get(self, index: int) -> int:\n        if index < 0 or index >= self.size: return -1\n        return self._node(index).next.val\n    def addAtHead(self, val: int) -> None:\n        self.addAtIndex(0, val)\n    def addAtTail(self, val: int) -> None:\n        self.addAtIndex(self.size, val)\n    def addAtIndex(self, index: int, val: int) -> None:\n        if index < 0 or index > self.size: return\n        prev = self._node(index - 1)\n        prev.next = Node(val, prev.next)\n        self.size += 1\n    def deleteAtIndex(self, index: int) -> None:\n        if index < 0 or index >= self.size: return\n        prev = self._node(index - 1)\n        prev.next = prev.next.next\n        self.size -= 1',
      cpp: 'struct Node { int val; Node* next; Node(int v=0, Node* n=nullptr): val(v), next(n) {} };\nclass MyLinkedList {\n    Node dummy; int sz = 0;\n    Node* at(int i) { Node* cur = &dummy; for (int j=0;j<=i;j++) cur = cur->next; return cur; }\npublic:\n    MyLinkedList() {}\n    int get(int index) { if (index<0||index>=sz) return -1; return at(index)->val; }\n    void addAtHead(int val) { addAtIndex(0, val); }\n    void addAtTail(int val) { addAtIndex(sz, val); }\n    void addAtIndex(int index, int val) {\n        if (index<0||index>sz) return;\n        Node* prev = at(index-1);\n        prev->next = new Node(val, prev->next);\n        sz++;\n    }\n    void deleteAtIndex(int index) {\n        if (index<0||index>=sz) return;\n        Node* prev = at(index-1);\n        Node* del = prev->next;\n        prev->next = del->next;\n        delete del; sz--;\n    }\n};',
      c: 'typedef struct Node { int val; struct Node* next; } Node;\ntypedef struct { Node dummy; int sz; } MyLinkedList;\nstatic Node* nodeAt(MyLinkedList* t, int i){ Node* c=&t->dummy; for(int j=0;j<=i;j++) c=c->next; return c; }\nMyLinkedList* myLinkedListCreate(void){ MyLinkedList* o=calloc(1,sizeof(MyLinkedList)); return o; }\nint myLinkedListGet(MyLinkedList* o,int idx){ if(idx<0||idx>=o->sz) return -1; return nodeAt(o,idx)->val; }\nvoid myLinkedListAddAtIndex(MyLinkedList* o,int idx,int val){ if(idx<0||idx>o->sz) return; Node* p=nodeAt(o,idx-1); Node* n=malloc(sizeof(Node)); n->val=val; n->next=p->next; p->next=n; o->sz++; }\nvoid myLinkedListDeleteAtIndex(MyLinkedList* o,int idx){ if(idx<0||idx>=o->sz) return; Node* p=nodeAt(o,idx-1); Node* d=p->next; p->next=d->next; free(d); o->sz--; }'
    },
    analysis: {
      correctness: 'Dummy head giúp insert/delete tại index 0; size kiểm soát biên.',
      edgeCases: ['Index ngoài range bỏ qua', 'addAtIndex tại size = append', 'List rỗng get → -1'],
      pitfalls: ['Off-by-one khi duyệt tới index', 'Quên cập nhật size']
    }
  },
  709: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Cho chuỗi s. Trả bản sao s với mọi chữ hoa chuyển thành chữ thường (ASCII).',
    examples: [
      { input: 's = "Hello"', output: '"hello"' },
      { input: 's = "here"', output: '"here"' },
      { input: 's = "LOVELY"', output: '"lovely"' }
    ],
    approach: 'Duyệt từng ký tự: nếu A-Z thì cộng 32 (hoặc |32) để thành a-z.',
    memoryTip: 'ASCII: chữ hoa + 32 = chữ thường; hoặc dùng tolower.',
    solutions: {
      python: 'class Solution:\n    def toLowerCase(self, s: str) -> str:\n        return "".join(ch.lower() for ch in s)',
      cpp: 'class Solution {\npublic:\n    string toLowerCase(string s) {\n        for (char& c : s)\n            if (c >= \'A\' && c <= \'Z\') c += 32;\n        return s;\n    }\n};',
      c: 'char* toLowerCase(char* s) {\n    for (int i = 0; s[i]; i++)\n        if (s[i] >= \'A\' && s[i] <= \'Z\') s[i] += 32;\n    return s;\n}'
    },
    analysis: {
      correctness: 'Chỉ đổi A-Z; ký tự khác giữ nguyên.',
      edgeCases: ['Đã toàn lower', 'Rỗng', 'Số và ký tự đặc biệt'],
      pitfalls: ['Dùng tolower locale khác ASCII', 'Tạo string mới quên null terminator trong C']
    }
  },
  710: {
    category: 'Math',
    timeComplexity: 'O(n + b log b)',
    spaceComplexity: 'O(b)',
    description: 'Có n số [0,n-1] và blacklist. pick() trả số ngẫu nhiên đều từ tập hợp hợp lệ (không nằm blacklist). Mỗi số hợp lệ xác suất bằng nhau.',
    examples: [
      { input: '["Solution","pick","pick","pick"], [[1,[]],[],[],[]]', output: '[null,0,0,0]' },
      { input: '["Solution","pick","pick","pick"], [[2,[1]],[],[],[]]', output: '[null,0,0,1]' }
    ],
    approach: 'Map blacklist nhỏ vào cuối [0,m): hoán vị sao mọi phần tử blacklist nằm ngoài vùng pick [0,m) với m = n - |blacklist trong range|.',
    memoryTip: 'Random without blacklist = shrink range + swap blacklist ra ngoài.',
    solutions: {
      python: 'class Solution:\n    def __init__(self, n: int, blacklist: List[int]):\n        self.m = n - len(blacklist)\n        self.mp = {}\n        bl = set(blacklist)\n        for x in blacklist:\n            if x < self.m:\n                while self.m in bl or self.m in self.mp:\n                    self.m += 1\n                self.mp[x] = self.m\n                self.m += 1\n    def pick(self) -> int:\n        x = random.randint(0, self.m - 1)\n        return self.mp.get(x, x)',
      cpp: 'class Solution {\n    int m;\n    unordered_map<int,int> mp;\npublic:\n    Solution(int n, vector<int>& blacklist) {\n        unordered_set<int> bl(blacklist.begin(), blacklist.end());\n        m = n - (int)blacklist.size();\n        for (int x : blacklist) {\n            if (x < m) {\n                while (bl.count(m) || mp.count(m)) m++;\n                mp[x] = m++;\n            }\n        }\n    }\n    int pick() {\n        int x = rand() % m;\n        return mp.count(x) ? mp[x] : x;\n    }\n};',
      c: 'typedef struct { int m; int k; int key[1000], val[1000]; } Solution710;\nstatic int g710(int x, Solution710* s){ for(int i=0;i<s->k;i++) if(s->key[i]==x) return s->val[i]; return x; }\nSolution710* solution710Create(int n, int* bl, int bn){ Solution710* s=calloc(1,sizeof(Solution710)); s->m=n-bn; return s; }\nint solution710Pick(Solution710* s){ int x=rand()%s->m; return g710(x,s); }'
    },
    analysis: {
      correctness: 'Hoán vị đảm bảo pick uniform trên m giá trị hợp lệ; map redirect index bị blacklist.',
      edgeCases: ['Blacklist rỗng → [0,n-1]', 'Blacklist toàn ngoài m', 'n=1'],
      pitfalls: ['Lưu toàn bộ whitelist O(n) memory', 'Rand không uniform nếu dùng reject sampling chậm']
    }
  },
  712: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(mn)',
    description: 'Cho hai chuỗi s1, s2. Xóa một số ký tự (không đảo thứ tự) sao hai chuỗi bằng nhau. Chi phí xóa ký tự = mã ASCII của ký tự đó. Trả tổng chi phí xóa tối thiểu.',
    examples: [
      { input: 's1 = "sea", s2 = "eat"', output: '231' },
      { input: 's1 = "delete", s2 = "leet"', output: '403' },
      { input: 's1 = "a", s2 = "b"', output: '195' }
    ],
    approach: 'LCS DP: dp[i][j] = min cost để khớp s1[:i] và s2[:j]. Nếu s1[i-1]==s2[j-1] giữ; else min(delete s1[i-1], delete s2[j-1]).',
    memoryTip: 'Min delete sum = tổng ASCII cả hai chuỗi trừ 2×ASCII của LCS (common subsequence giữ lại).',
    solutions: {
      python: 'class Solution:\n    def minimumDeleteSum(self, s1: str, s2: str) -> int:\n        m, n = len(s1), len(s2)\n        dp = [[0]*(n+1) for _ in range(m+1)]\n        for i in range(1, m+1): dp[i][0] = dp[i-1][0] + ord(s1[i-1])\n        for j in range(1, n+1): dp[0][j] = dp[0][j-1] + ord(s2[j-1])\n        for i in range(1, m+1):\n            for j in range(1, n+1):\n                if s1[i-1] == s2[j-1]: dp[i][j] = dp[i-1][j-1]\n                else: dp[i][j] = min(dp[i-1][j]+ord(s1[i-1]), dp[i][j-1]+ord(s2[j-1]))\n        return dp[m][n]',
      cpp: 'class Solution {\npublic:\n    int minimumDeleteSum(string s1, string s2) {\n        int m=s1.size(), n=s2.size();\n        vector<vector<int>> dp(m+1, vector<int>(n+1));\n        for(int i=1;i<=m;i++) dp[i][0]=dp[i-1][0]+s1[i-1];\n        for(int j=1;j<=n;j++) dp[0][j]=dp[0][j-1]+s2[j-1];\n        for(int i=1;i<=m;i++) for(int j=1;j<=n;j++){\n            if(s1[i-1]==s2[j-1]) dp[i][j]=dp[i-1][j-1];\n            else dp[i][j]=min(dp[i-1][j]+s1[i-1], dp[i][j-1]+s2[j-1]);\n        }\n        return dp[m][n];\n    }\n};',
      c: 'int minimumDeleteSum(char* s1, char* s2) {\n    int m=strlen(s1), n=strlen(s2);\n    int dp[1001][1001]={0};\n    for(int i=1;i<=m;i++) dp[i][0]=dp[i-1][0]+s1[i-1];\n    for(int j=1;j<=n;j++) dp[0][j]=dp[0][j-1]+s2[j-1];\n    for(int i=1;i<=m;i++) for(int j=1;j<=n;j++){\n        if(s1[i-1]==s2[j-1]) dp[i][j]=dp[i-1][j-1];\n        else dp[i][j]=dp[i-1][j]+s1[i-1] < dp[i][j-1]+s2[j-1] ? dp[i-1][j]+s1[i-1] : dp[i][j-1]+s2[j-1];\n    }\n    return dp[m][n];\n}'
    },
    analysis: {
      correctness: 'DP optimal substructure: mọi bước chọn xóa bên nào hoặc giữ ký tự trùng.',
      edgeCases: ['Một chuỗi rỗng → xóa hết chuỗi kia', 'Giống hệt → 0', 'Không ký tự chung'],
      pitfalls: ['Nhầm edit distance (insert)', 'Quên cộng ASCII khi khởi tạo hàng/cột 0']
    }
  },
  713: {
    category: 'Sliding Window',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho mảng nums số nguyên dương và k. Đếm số đoạn con liên tiếp có tích các phần tử < k.',
    examples: [
      { input: 'nums = [10,5,2,6], k = 100', output: '8' },
      { input: 'nums = [1,1,1], k = 2', output: '0' },
      { input: 'nums = [1,2,3], k = 10', output: '5' }
    ],
    approach: 'Sliding window: nhân vào prod; khi prod>=k chia nums[left++] cho prod. Mỗi vị trí right, thêm (right-left+1) đoạn kết thúc tại right.',
    memoryTip: 'Đếm subarray product < k: mở rộng right, thu left khi prod>=k; cộng window size.',
    solutions: {
      python: 'class Solution:\n    def numSubarrayProductLessThanK(self, nums: List[int], k: int) -> int:\n        if k <= 1: return 0\n        ans = left = 0\n        prod = 1\n        for right, x in enumerate(nums):\n            prod *= x\n            while prod >= k:\n                prod //= nums[left]\n                left += 1\n            ans += right - left + 1\n        return ans',
      cpp: 'class Solution {\npublic:\n    int numSubarrayProductLessThanK(vector<int>& nums, int k) {\n        if (k <= 1) return 0;\n        long long prod = 1;\n        int ans = 0, left = 0;\n        for (int right = 0; right < (int)nums.size(); right++) {\n            prod *= nums[right];\n            while (prod >= k) prod /= nums[left++];\n            ans += right - left + 1;\n        }\n        return ans;\n    }\n};',
      c: 'int numSubarrayProductLessThanK(int* nums, int n, int k) {\n    if (k <= 1) return 0;\n    long long prod = 1;\n    int ans = 0, left = 0;\n    for (int right = 0; right < n; right++) {\n        prod *= nums[right];\n        while (prod >= k) prod /= nums[left++];\n        ans += right - left + 1;\n    }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Mọi subarray hợp lệ có right cố định được đếm qua số lượng left hợp lệ.',
      edgeCases: ['k<=1 → 0', 'Tích overflow cần long long', 'nums toàn 1'],
      pitfalls: ['Đếm subarray thay vì window size sai', 'Quên xử lý k<=1']
    }
  },
  714: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Mảng giá cổ phiếu prices và phí giao dịch fee. Có thể mua/bán nhiều lần nhưng không giữ cổ phiếu qua ngày (mua xong phải bán trước mua lại). Trả lợi nhuận tối đa.',
    examples: [
      { input: 'prices = [1,3,2,8,4,9], fee = 2', output: '8' },
      { input: 'prices = [1,3,7,5,10,3], fee = 3', output: '6' },
      { input: 'prices = [4,5,2,4,3,3,1,2,1], fee = 1', output: '4' }
    ],
    approach: 'DP cash/hold: cash = max(cash, hold+price-fee); hold = max(hold, cash-price). cash ban đầu 0, hold=-inf.',
    memoryTip: 'Stock với fee: state cash vs hold, bán trừ fee tại cash update.',
    solutions: {
      python: 'class Solution:\n    def maxProfit(self, prices: List[int], fee: int) -> int:\n        cash, hold = 0, -prices[0]\n        for p in prices[1:]:\n            cash = max(cash, hold + p - fee)\n            hold = max(hold, cash - p)\n        return cash',
      cpp: 'class Solution {\npublic:\n    int maxProfit(vector<int>& prices, int fee) {\n        int cash = 0, hold = -prices[0];\n        for (int i = 1; i < (int)prices.size(); i++) {\n            cash = max(cash, hold + prices[i] - fee);\n            hold = max(hold, cash - prices[i]);\n        }\n        return cash;\n    }\n};',
      c: 'int maxProfit(int* prices, int n, int fee) {\n    int cash = 0, hold = -prices[0];\n    for (int i = 1; i < n; i++) {\n        int nc = cash > hold + prices[i] - fee ? cash : hold + prices[i] - fee;\n        hold = hold > cash - prices[i] ? hold : cash - prices[i];\n        cash = nc;\n    }\n    return cash;\n}'
    },
    analysis: {
      correctness: 'Invariant cash/hold là lợi nhuận tối đa với/không cổ phiếu cuối ngày.',
      edgeCases: ['Giá giảm liên tục → 0', 'Fee lớn → không giao dịch', 'Một ngày'],
      pitfalls: ['Trừ fee khi mua thay vì bán', 'Cho phép nhiều cổ cùng lúc']
    }
  },
  715: {
    category: 'Design',
    timeComplexity: 'O(n) add/query',
    spaceComplexity: 'O(n)',
    description: 'Thiết kế cấu trúc Range Module: addRange(left,right) thêm đoạn [left,right); queryRange(left,right) kiểm tra [left,right) nằm trọn trong các đoạn đã thêm; removeRange(left,right) xóa phần giao với [left,right).',
    examples: [
      { input: '["RangeModule","addRange","removeRange","queryRange","queryRange"], [[],[10,20],[14,16],[10,14],[13,15]]', output: '[null,null,null,true,false]' },
      { input: '["RangeModule","addRange","addRange","addRange","queryRange","queryRange"], [[],[10,20],[20,30],[10,40],[10,15],[20,25]]', output: '[null,null,null,null,true,true]' }
    ],
    approach: 'Giữ danh sách đoạn không giao nhau đã merge sort theo left. add merge overlap; remove split/cắt đoạn; query kiểm tra một đoạn bao phủ.',
    memoryTip: 'Interval design = sorted merged intervals + merge on add + carve on remove.',
    solutions: {
      python: 'class RangeModule:\n    def __init__(self):\n        self.tracks = []\n    def addRange(self, left: int, right: int) -> None:\n        res = []\n        for l, r in self.tracks:\n            if r < left or l > right:\n                res.append([l, r])\n            else:\n                left = min(left, l); right = max(right, r)\n        res.append([left, right])\n        self.tracks = sorted(res)\n    def queryRange(self, left: int, right: int) -> bool:\n        for l, r in self.tracks:\n            if l <= left and r >= right: return True\n            if l > left: break\n        return False\n    def removeRange(self, left: int, right: int) -> None:\n        res = []\n        for l, r in self.tracks:\n            if r <= left or l >= right:\n                res.append([l, r])\n            else:\n                if l < left: res.append([l, left])\n                if r > right: res.append([right, r])\n        self.tracks = res',
      cpp: 'class RangeModule {\n    vector<pair<int,int>> t;\npublic:\n    void addRange(int left, int right) {\n        vector<pair<int,int>> nxt;\n        for (auto [l,r] : t) {\n            if (r < left || l > right) nxt.push_back({l,r});\n            else { left = min(left,l); right = max(right,r); }\n        }\n        nxt.push_back({left,right});\n        sort(nxt.begin(), nxt.end());\n        t = move(nxt);\n    }\n    bool queryRange(int left, int right) {\n        for (auto [l,r] : t) {\n            if (l <= left && r >= right) return true;\n            if (l > left) break;\n        }\n        return false;\n    }\n    void removeRange(int left, int right) {\n        vector<pair<int,int>> nxt;\n        for (auto [l,r] : t) {\n            if (r <= left || l >= right) nxt.push_back({l,r});\n            else {\n                if (l < left) nxt.push_back({l,left});\n                if (r > right) nxt.push_back({right,r});\n            }\n        }\n        t = move(nxt);\n    }\n};',
      c: 'typedef struct { int l, r; } Seg;\nstatic Seg tr[10000]; static int tn;\nvoid rangeModuleAddRange(int left,int right){ Seg nxt[10000]; int m=0; for(int i=0;i<tn;i++){ if(tr[i].r<left||tr[i].l>right) nxt[m++]=tr[i]; else { if(tr[i].l<left) left=tr[i].l; if(tr[i].r>right) right=tr[i].r; } } nxt[m].l=left; nxt[m++].r=right; tn=m; for(int i=0;i<tn;i++) tr[i]=nxt[i]; }\nbool rangeModuleQueryRange(int left,int right){ for(int i=0;i<tn;i++){ if(tr[i].l<=left&&tr[i].r>=right) return true; if(tr[i].l>left) break; } return false; }'
    },
    analysis: {
      correctness: 'Tracks luôn là union đoạn đã add trừ remove; query kiểm tra sub-interval.',
      edgeCases: ['add trùng/overlap merge', 'remove cắt giữa đoạn', 'query trên đoạn rỗng'],
      pitfalls: ['[left,right) half-open — nhầm inclusive right', 'Không merge sau add']
    }
  },
  717: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Mảng bits gồm 0 và 1 mô tả mã hóa: 0 là ký tự 1-bit; 10 hoặc 11 là ký tự 2-bit. bit[0] luôn là 1-bit. Kiểm tra mảng có phải chuỗi mã hóa hợp lệ không (ăn hết mọi bit).',
    examples: [
      { input: 'bits = [1,0,0]', output: 'true' },
      { input: 'bits = [1,1,1,0]', output: 'false' },
      { input: 'bits = [1,0,1]', output: 'true' }
    ],
    approach: 'Duyệt i=0: nếu bits[i]==0 nhảy 1; else nếu i+1 hợp lệ và bits[i+1] in {0,1} nhảy 2; else false. Cuối i==n → true.',
    memoryTip: 'Greedy parse: 0 đơn lẻ; 1 phải đi cùng bit kế (10 hoặc 11).',
    solutions: {
      python: 'class Solution:\n    def isOneBitCharacter(self, bits: List[int]) -> bool:\n        i, n = 0, len(bits)\n        while i < n:\n            if bits[i] == 0:\n                i += 1\n            elif i + 1 < n:\n                i += 2\n            else:\n                return False\n        return True',
      cpp: 'class Solution {\npublic:\n    bool isOneBitCharacter(vector<int>& bits) {\n        int i = 0, n = bits.size();\n        while (i < n) {\n            if (bits[i] == 0) i++;\n            else if (i + 1 < n) i += 2;\n            else return false;\n        }\n        return true;\n    }\n};',
      c: 'bool isOneBitCharacter(int* bits, int n) {\n    int i = 0;\n    while (i < n) {\n        if (bits[i] == 0) i++;\n        else if (i + 1 < n) i += 2;\n        else return false;\n    }\n    return true;\n}'
    },
    analysis: {
      correctness: 'Parse duy nhất theo quy tắc 1-bit/2-bit; thất bại khi 1 ở cuối không đủ cặp.',
      edgeCases: ['[0] → true', 'Kết thúc bằng ...10', 'Kết thúc 1 đơn'],
      pitfalls: ['Chỉ kiểm tra bit cuối = 0', 'Quên case bits[i]==1 ở index cuối']
    }
  },
  718: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(mn)',
    spaceComplexity: 'O(mn)',
    description: 'Cho hai mảng nums1 và nums2. Tìm độ dài đoạn con liên tiếp (contiguous) dài nhất xuất hiện ở cả hai mảng.',
    examples: [
      { input: 'nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]', output: '3' },
      { input: 'nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]', output: '5' },
      { input: 'nums1 = [1], nums2 = [2]', output: '0' }
    ],
    approach: 'DP 2D: dp[i][j] = độ dài common subarray kết thúc tại i,j. Nếu nums1[i-1]==nums2[j-1]: dp[i][j]=dp[i-1][j-1]+1; cập nhật max.',
    memoryTip: 'Contiguous ≠ LCS: reset về 0 khi phần tử khác nhau.',
    solutions: {
      python: 'class Solution:\n    def findLength(self, nums1: List[int], nums2: List[int]) -> int:\n        m, n = len(nums1), len(nums2)\n        dp = [[0]*(n+1) for _ in range(m+1)]\n        ans = 0\n        for i in range(1, m+1):\n            for j in range(1, n+1):\n                if nums1[i-1] == nums2[j-1]:\n                    dp[i][j] = dp[i-1][j-1] + 1\n                    ans = max(ans, dp[i][j])\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findLength(vector<int>& a, vector<int>& b) {\n        int m=a.size(), n=b.size(), ans=0;\n        vector<vector<int>> dp(m+1, vector<int>(n+1));\n        for(int i=1;i<=m;i++) for(int j=1;j<=n;j++){\n            if(a[i-1]==b[j-1]){ dp[i][j]=dp[i-1][j-1]+1; ans=max(ans,dp[i][j]); }\n        }\n        return ans;\n    }\n};',
      c: 'int findLength(int* a, int m, int* b, int n) {\n    int dp[1001][1001]={0}, ans=0;\n    for(int i=1;i<=m;i++) for(int j=1;j<=n;j++)\n        if(a[i-1]==b[j-1]){ dp[i][j]=dp[i-1][j-1]+1; if(dp[i][j]>ans) ans=dp[i][j]; }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'dp[i][j] chỉ tăng khi phần tử khớp liên tiếp — đúng subarray chung.',
      edgeCases: ['Không phần tử chung → 0', 'Toàn giống nhau', 'Một mảng length 1'],
      pitfalls: ['Dùng LCS không contiguous', 'Không reset khi khác']
    }
  },
  719: {
    category: 'Binary Search',
    timeComplexity: 'O(n log n + n log W)',
    spaceComplexity: 'O(1)',
    description: 'Cho mảng nums và k. Với mọi cặp (i,j), distance = |nums[i]-nums[j]|. Trả k-th smallest trong tất cả n(n-1)/2 khoảng cách (1-indexed).',
    examples: [
      { input: 'nums = [1,3,1,4,1], k = 3', output: '0' },
      { input: 'nums = [1,6,1], k = 3', output: '5' },
      { input: 'nums = [1,2,3,4], k = 6', output: '2' }
    ],
    approach: 'Sort nums. Binary search answer d: đếm số cặp có distance <= d bằng two pointers trên mảng sort. Tìm min d sao count>=k.',
    memoryTip: 'K-th pair distance = BS on distance + count pairs with diff<=mid in sorted array.',
    solutions: {
      python: 'class Solution:\n    def smallestDistancePair(self, nums: List[int], k: int) -> int:\n        nums.sort()\n        n = len(nums)\n        lo, hi = 0, nums[-1] - nums[0]\n        def count(mid):\n            c = j = 0\n            for i in range(n):\n                while j < n and nums[j] - nums[i] <= mid:\n                    j += 1\n                c += j - i - 1\n            return c >= k\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if count(mid): hi = mid\n            else: lo = mid + 1\n        return lo',
      cpp: 'class Solution {\npublic:\n    int smallestDistancePair(vector<int>& nums, int k) {\n        sort(nums.begin(), nums.end());\n        int n = nums.size(), lo = 0, hi = nums.back() - nums[0];\n        auto enough = [&](int mid){\n            int c = 0, j = 0;\n            for (int i = 0; i < n; i++) {\n                while (j < n && nums[j] - nums[i] <= mid) j++;\n                c += j - i - 1;\n                if (c >= k) return true;\n            }\n            return false;\n        };\n        while (lo < hi) {\n            int mid = lo + (hi - lo) / 2;\n            if (enough(mid)) hi = mid;\n            else lo = mid + 1;\n        }\n        return lo;\n    }\n};',
      c: 'static int cmp(const void* a,const void* b){ return *(int*)a-*(int*)b; }\nint smallestDistancePair(int* nums, int n, int k) {\n    qsort(nums,n,4,cmp);\n    int lo=0, hi=nums[n-1]-nums[0];\n    while(lo<hi){\n        int mid=(lo+hi)/2, c=0, j=0;\n        for(int i=0;i<n;i++){ while(j<n&&nums[j]-nums[i]<=mid) j++; c+=j-i-1; }\n        if(c>=k) hi=mid; else lo=mid+1;\n    }\n    return lo;\n}'
    },
    analysis: {
      correctness: 'Distance matrix monotonic theo d; count pairs <= d tăng — BS hợp lệ.',
      edgeCases: ['Nhiều cặp distance 0', 'k=1 → min diff', 'Hai phần tử'],
      pitfalls: ['Không sort trước khi two-pointer count', 'Đếm cặp (i,i)']
    }
  },
  720: {
    category: 'Trie',
    timeComplexity: 'O(n * L^2)',
    spaceComplexity: 'O(n * L)',
    description: 'Cho mảng chuỗi words. Trả chuỗi dài nhất trong từ điển mà mọi tiền tố (prefix) của nó cũng nằm trong words. Nếu nhiều đáp án, trả chuỗi nhỏ nhất theo thứ tự từ điển.',
    examples: [
      { input: 'words = ["w","wo","wor","worl","world"]', output: '"world"' },
      { input: 'words = ["a","banana","app","appl","ap","apply","apple"]', output: '"apple"' },
      { input: 'words = ["m","mo","moc","moch","mocha","l","la","lat"]', output: '"mocha"' }
    ],
    approach: 'Sort words. Duyệt từng word: kiểm tra mọi prefix có trong set words; nếu đủ và dài hơn (hoặc bằng nhưng lex nhỏ hơn) thì cập nhật ans.',
    memoryTip: 'Word dictionary = sort + HashSet words + check all prefixes exist.',
    solutions: {
      python: 'class Solution:\n    def longestWord(self, words: List[str]) -> str:\n        words.sort()\n        st = set(words)\n        ans = ""\n        for w in words:\n            ok = True\n            for i in range(1, len(w)):\n                if w[:i] not in st:\n                    ok = False; break\n            if ok and (len(w) > len(ans) or (len(w) == len(ans) and w < ans)):\n                ans = w\n        return ans',
      cpp: 'class Solution {\npublic:\n    string longestWord(vector<string>& words) {\n        sort(words.begin(), words.end());\n        unordered_set<string> st(words.begin(), words.end());\n        string ans;\n        for (auto& w : words) {\n            bool ok = true;\n            for (int i = 1; i < (int)w.size(); i++)\n                if (!st.count(w.substr(0, i))) { ok = false; break; }\n            if (ok && (w.size() > ans.size() || (w.size() == ans.size() && w < ans))) ans = w;\n        }\n        return ans;\n    }\n};',
      c: 'int cmpstr(const void* a,const void* b){ return strcmp(*(char**)a,*(char**)b); }\nchar* longestWord(char** words, int n) {\n    qsort(words,n,sizeof(char*),cmpstr);\n    char* ans = "";\n    for(int i=0;i<n;i++){ int ok=1; int L=strlen(words[i]); for(int p=1;p<L&&ok;p++){ char pref[128]; strncpy(pref,words[i],p); pref[p]=0; ok=0; for(int j=0;j<n;j++) if(strcmp(words[j],pref)==0){ ok=1; break; } } if(ok && (L>(int)strlen(ans)||(L==(int)strlen(ans)&&strcmp(words[i],ans)<0))) ans=words[i]; }\n    return ans;\n}'
    },
    analysis: {
      correctness: 'Sort đảm bảo tie-break lex; prefix check đảm bảo mọi bước build hợp lệ.',
      edgeCases: ['Một từ đơn', 'Không từ nào có prefix chain → từ 1 ký tự', 'Nhiều cùng độ dài'],
      pitfalls: ['Quên sort trước tie-break', 'Chỉ check prefix trực tiếp một cấp']
    }
  }
};
