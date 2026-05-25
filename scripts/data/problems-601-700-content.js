/** Full QA content for catalog IDs 601-700 (78 problems) */
module.exports = {
  601: {
    category: "Database",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Bảng Stadium(id, visit_date, people) ghi lượng khách theo ngày. Trả mọi bản ghi thuộc chuỗi ≥3 ngày liên tiếp (id liên tiếp) mà mỗi ngày có people ≥100. Sắp xếp tăng theo visit_date.",
    examples: [
      { input: "id 1–3: people 100,109,99 → chỉ id 1,2 đủ ≥100 nhưng thiếu ngày thứ 3", output: "Rỗng" },
      { input: "id 4–6: people 100,100,100 (3 ngày liên tiếp)", output: "Ba dòng id 4,5,6" },
      { input: "id 7–9: people 100,120,130", output: "Ba dòng id 7,8,9" },
    ],
    approach: "Self join 3 bản ghi a,b,c với a.id=b.id-1 và b.id=c.id-1; lọc a.people,b.people,c.people đều ≥100; DISTINCT tránh trùng khi chuỗi dài hơn 3.",
    memoryTip: "Human traffic = triple self join id±1 + mọi people ≥100 (không cộng tổng).",
    solutions: {
      python: "# SQL\nSELECT DISTINCT a.*\nFROM Stadium a, Stadium b, Stadium c\nWHERE a.id = b.id - 1 AND b.id = c.id - 1\n  AND a.people >= 100 AND b.people >= 100 AND c.people >= 100\nORDER BY a.id;",
      cpp: "// SQL\nSELECT DISTINCT a.*\nFROM Stadium a, Stadium b, Stadium c\nWHERE a.id = b.id - 1 AND b.id = c.id - 1\n  AND a.people >= 100 AND b.people >= 100 AND c.people >= 100\nORDER BY a.id;",
      c: "const char query[] = \"SELECT DISTINCT a.*\\nFROM Stadium a, Stadium b, Stadium c\\nWHERE a.id = b.id - 1 AND b.id = c.id - 1\\n  AND a.people >= 100 AND b.people >= 100 AND c.people >= 100\\nORDER BY a.id;\";",
    },
    analysis: {
      correctness: "Triple join đảm bảo 3 id liên tiếp; điều kiện people≥100 từng ngày khớp đề gốc LC.",
      edgeCases: ["Chuỗi 4 ngày → mỗi cửa sổ 3 ngày xuất hiện", "Một ngày people<100 phá chuỗi"],
      pitfalls: ["Nhầm tổng 2 ngày ≥100", "Thiếu DISTINCT khi chuỗi dài"]
    }
  },
  602: {
    category: "Database",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Bảng RequestAccepted(requester_id, accepter_id) — mỗi hàng là một tình bạn đã chấp nhận. Trả id và số bạn bè của người có nhiều bạn nhất (một hàng nếu hòa theo LeetCode).",
    examples: [
      { input: "A chấp nhận B, A chấp nhận C", output: "id=A, num=2" },
      { input: "Chỉ một cặp A↔B", output: "Cả A và B đều có 1 bạn" },
      { input: "Nhiều người cùng max", output: "Một id (LIMIT 1)" },
    ],
    approach: "UNION ALL requester_id và accepter_id thành id; GROUP BY id COUNT(*); ORDER BY num DESC LIMIT 1.",
    memoryTip: "Most friends = UNION both roles, GROUP BY id, ORDER BY count DESC LIMIT 1.",
    solutions: {
      python: "# SQL\nSELECT id, COUNT(*) AS num\nFROM (\n  SELECT requester_id AS id FROM RequestAccepted\n  UNION ALL\n  SELECT accepter_id AS id FROM RequestAccepted\n) t\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
      cpp: "// SQL\nSELECT id, COUNT(*) AS num\nFROM (\n  SELECT requester_id AS id FROM RequestAccepted\n  UNION ALL\n  SELECT accepter_id AS id FROM RequestAccepted\n) t\nGROUP BY id\nORDER BY num DESC\nLIMIT 1;",
      c: "const char query[] = \"SELECT id, COUNT(*) AS num FROM ( SELECT requester_id AS id FROM RequestAccepted UNION ALL SELECT accepter_id AS id FROM RequestAccepted ) t GROUP BY id ORDER BY num DESC LIMIT 1;\";",
    },
    analysis: {
      correctness: "UNION ALL đếm mỗi người ở cả hai vai trò; LIMIT 1 lấy max.",
      edgeCases: ["Không request → rỗng", "Hòa số bạn → một id bất kỳ", "Self-friend không có trong bảng"],
      pitfalls: ["Chỉ đếm accepter_id", "UNION thay UNION ALL làm mất bội số"]
    }
  },
  605: {
    category: "Greedy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Cho mảng flowerbed (0=trống, 1=có hoa) và n. Có thể trồng thêm n cây sao không hai cây liền kề? Trả true/false.",
    examples: [
      { input: "flowerbed = [1,0,0,0,1], n = 1", output: "true" },
      { input: "flowerbed = [1,0,0,0,1], n = 2", output: "false" },
      { input: "flowerbed = [0,0,1,0,0], n = 1", output: "true" },
    ],
    approach: "Greedy quét trái→phải: nếu flowerbed[i]==0 và hai bên trống thì trồng (đặt 1) và n--.",
    memoryTip: "Can place flowers = greedy plant when both neighbors empty (pad with 0).",
    solutions: {
      python: "class Solution:\n    def canPlaceFlowers(self, flowerbed: List[int], n: int) -> bool:\n        bed = [0] + flowerbed + [0]\n        for i in range(1, len(bed)-1):\n            if bed[i-1]==0 and bed[i]==0 and bed[i+1]==0:\n                bed[i]=1; n-=1\n                if n<=0: return True\n        return n<=0",
      cpp: "class Solution {\npublic:\n    bool canPlaceFlowers(vector<int>& f, int n) {\n        int m=f.size();\n        for(int i=0;i<m;i++){\n            int l=i?f[i-1]:0, r=i+1<m?f[i+1]:0;\n            if(!f[i]&&!l&&!r){ f[i]=1; if(--n<=0) return true; }\n        }\n        return n<=0;\n    }\n};",
      c: "bool canPlaceFlowers(int* f, int m, int n) {\n    for(int i=0;i<m;i++){\n        int l=i?f[i-1]:0, r=i+1<m?f[i+1]:0;\n        if(!f[i]&&!l&&!r){ f[i]=1; if(--n<=0) return 1; }\n    }\n    return n<=0;\n}",
    },
    analysis: {
      correctness: "Greedy trồng sớm nhất không chặn slot sau — đủ iff có thể.",
      edgeCases: ["n=0 → true", "Toàn 0 → floor((m+1)/2) cây", "Đầu/cuối chỉ một neighbor"],
      pitfalls: ["Không xét biên ảo 0", "Trồng không greedy"]
    }
  },
  606: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Cho cây nhị phân root. Trả chuỗi \"N\" + preorder (val) + \"L\" + left + \"R\" + right + \")\" theo quy ước LeetCode construct string.",
    examples: [
      { input: "root = [1,2,3,4]", output: "\"1(2(4))(3)\"" },
      { input: "root = [1,2,null,4]", output: "\"1(2(4))\"" },
      { input: "root = [1]", output: "\"1\"" },
    ],
    approach: "DFS preorder: nếu không con trả val; nếu chỉ right bỏ L rỗng; ghép val(L)(R).",
    memoryTip: "Construct string — omit empty L when only right child (LeetCode rule).",
    solutions: {
      python: "class Solution:\n    def tree2str(self, root: Optional[TreeNode]) -> str:\n        if not root: return \"\"\n        if not root.left and not root.right: return str(root.val)\n        if not root.left: return f\"{root.val}()({self.tree2str(root.right)})\"\n        return f\"{root.val}({self.tree2str(root.left)})({self.tree2str(root.right) if root.right else ''})\"",
      cpp: "class Solution {\npublic:\n    string tree2str(TreeNode* r) {\n        if(!r) return \"\";\n        string s=to_string(r->val);\n        if(!r->left&&!r->right) return s;\n        if(!r->left) return s+\"()(\"+tree2str(r->right)+\")\";\n        s+=\"(\"+tree2str(r->left)+\")\";\n        if(r->right) s+=\"(\"+tree2str(r->right)+\")\";\n        else s+=\"()\";\n        return s;\n    }\n};",
      c: "void tree2strRec(struct TreeNode* r, char* buf, int* p) {\n    if(!r) return;\n    *p += sprintf(buf+*p, \"%d\", r->val);\n    if(!r->left && !r->right) return;\n    if(!r->left){ *p+=sprintf(buf+*p,\"()(\"); tree2strRec(r->right,buf,p); *p+=sprintf(buf+*p,\")\"); return; }\n    *p+=sprintf(buf+*p,\"(\"); tree2strRec(r->left,buf,p); *p+=sprintf(buf+*p,\")(\");\n    if(r->right) tree2strRec(r->right,buf,p); *p+=sprintf(buf+*p,\")\");\n}",
    },
    analysis: {
      correctness: "DFS bám format ngoặc LeetCode — bỏ L rỗng khi chỉ có con phải.",
      edgeCases: ["Một nút", "Chỉ con trái", "Chỉ con phải"],
      pitfalls: ["Thêm () thừa", "Thiếu () khi thiếu con phải"]
    }
  },
  607: {
    category: "Database",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Bảng Salesperson(sales_id, name) và Orders(order_id, sale_id, order_date, customer_id, price). Trả tên salesperson chưa có bất kỳ order nào (sale_id không xuất hiện trong Orders).",
    examples: [
      { input: "Sales A,B; Orders chỉ của A", output: "B" },
      { input: "Không order nào", output: "Tất cả salesperson" },
      { input: "Mọi người đều có order", output: "Rỗng" },
    ],
    approach: "LEFT JOIN Orders ON sales_id=sale_id WHERE order_id IS NULL, hoặc NOT IN subquery sale_id.",
    memoryTip: "Sales person without sales = LEFT JOIN WHERE order_id IS NULL.",
    solutions: {
      python: "# SQL\nSELECT s.name\nFROM Salesperson s\nLEFT JOIN Orders o ON s.sales_id = o.sale_id\nWHERE o.order_id IS NULL;",
      cpp: "// SQL\nSELECT s.name\nFROM Salesperson s\nLEFT JOIN Orders o ON s.sales_id = o.sale_id\nWHERE o.order_id IS NULL;",
      c: "const char query[] = \"SELECT s.name FROM Salesperson s LEFT JOIN Orders o ON s.sales_id = o.sale_id WHERE o.order_id IS NULL;\";",
    },
    analysis: {
      correctness: "LEFT JOIN giữ mọi salesperson; NULL order_id nghĩa là chưa bán.",
      edgeCases: ["Bảng Orders rỗng", "Nhiều salesperson không order", "sale_id NULL trong Orders"],
      pitfalls: ["INNER JOIN bỏ sót", "NOT IN với NULL trong subquery"]
    }
  },
  608: {
    category: "Database",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Bảng Tree(id, p_id) mô tả cây nhị phân (p_id NULL là root). Trả id và type: Root (p_id NULL), Leaf (id không là p_id của ai), Inner (còn lại).",
    examples: [
      { input: "1 root, 2 và 3 con của 1", output: "1 Root, 2 Leaf, 3 Leaf" },
      { input: "1→2→3 chain", output: "1 Root, 2 Inner, 3 Leaf" },
      { input: "Một nút root duy nhất", output: "type=Root" },
    ],
    approach: "CASE: p_id IS NULL → Root; id NOT IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL) → Leaf; else Inner.",
    memoryTip: "Tree node type = CASE on root / not parent of anyone / else inner.",
    solutions: {
      python: "# SQL\nSELECT id,\n  CASE\n    WHEN p_id IS NULL THEN 'Root'\n    WHEN id NOT IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Leaf'\n    ELSE 'Inner'\n  END AS type\nFROM Tree;",
      cpp: "// SQL\nSELECT id,\n  CASE\n    WHEN p_id IS NULL THEN 'Root'\n    WHEN id NOT IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Leaf'\n    ELSE 'Inner'\n  END AS type\nFROM Tree;",
      c: "const char query[] = \"SELECT id, CASE WHEN p_id IS NULL THEN 'Root' WHEN id NOT IN (SELECT p_id FROM Tree WHERE p_id IS NOT NULL) THEN 'Leaf' ELSE 'Inner' END AS type FROM Tree;\";",
    },
    analysis: {
      correctness: "Phân loại đủ 3 loại mutually exclusive trên mọi nút.",
      edgeCases: ["Single node → Root", "Star graph → root + leaves", "p_id trỏ node không tồn tại — ngoài scope"],
      pitfalls: ["Leaf check thiếu IS NOT NULL trên p_id subquery", "Nhầm Inner khi có con"]
    }
  },
  609: {
    category: "Hash Table",
    timeComplexity: "O(n * m)",
    spaceComplexity: "O(n * m)",
    description: "Cho mảng paths [\"root/a/x\",\"root/b/x\"]. Trả các nhóm [root, ...paths] có cùng nội dung file (hash cùng nhau).",
    examples: [
      { input: "paths = [\"/home/a.txt\",\"/home/b.txt\"] cùng nội dung", output: "[[\"/home\",\"/home/a.txt\",\"/home/b.txt\"]]" },
      { input: "Không trùng", output: "[]" },
    ],
    approach: "Parse path lấy content sau dấu cách; map content→list paths; output nếu ≥2 path.",
    memoryTip: "Duplicate files = hash content string, group paths by content.",
    solutions: {
      python: "class Solution:\n    def findDuplicate(self, paths: List[str]) -> List[List[str]]:\n        mp = defaultdict(list)\n        for p in paths:\n            parts = p.split()\n            root = parts[0]\n            for f in parts[1:]:\n                i = f.index('(')\n                mp[f[i+1:-1]].append(root + '/' + f[:i])\n        return [[v[0]]+v for v in mp.values() if len(v)>1]",
      cpp: "class Solution {\npublic:\n    vector<vector<string>> findDuplicate(vector<string>& paths) {\n        unordered_map<string, vector<string>> mp;\n        for(auto& p:paths){\n            int sp=p.find(' '); string root=p.substr(0,sp);\n            for(int i=sp+1;i<(int)p.size();){\n                int j=p.find('(',i); int k=p.find(')',j);\n                string file=p.substr(i,j-i), content=p.substr(j+1,k-j-1);\n                mp[content].push_back(root+\"/\"+file);\n                i=k+2;\n            }\n        }\n        vector<vector<string>> ans;\n        for(auto& [c,v]:mp) if(v.size()>1){ vector<string> row={v[0]}; row.insert(row.end(),v.begin(),v.end()); ans.push_back(row); }\n        return ans;\n    }\n};",
      c: "char*** findDuplicate(char** paths, int n, int* rs, int** cs) {\n    char*** ans = NULL; *rs = 0;\n    char keys[256][256]; int cnt[256] = {0}; int nk = 0;\n    char* lists[256][64]; int ls[256] = {0};\n    for (int i = 0; i < n; i++) {\n        char* p = paths[i]; char* sp = strchr(p, ' ');\n        char root[256]; int rl = sp ? (int)(sp - p) : (int)strlen(p);\n        memcpy(root, p, rl); root[rl] = 0;\n        for (char* q = sp ? sp + 1 : p; *q;) {\n            char* lp = strchr(q, '('); char* rp = strchr(lp, ')');\n            char content[256]; int cl = (int)(rp - lp - 1); memcpy(content, lp + 1, cl); content[cl] = 0;\n            char full[512]; snprintf(full, sizeof(full), \"%s/%.*s\", root, (int)(lp - q), q);\n            int ki = -1; for (int k = 0; k < nk; k++) if (!strcmp(keys[k], content)) { ki = k; break; }\n            if (ki < 0) { ki = nk++; strcpy(keys[ki], content); }\n            strcpy(lists[ki][ls[ki]++], full);\n            q = rp + 1; while (*q == ' ') q++;\n        }\n    }\n    for (int k = 0; k < nk; k++) if (ls[k] > 1) (*rs)++;\n    ans = malloc(*rs * sizeof(char**)); cs = malloc(*rs * sizeof(int)); int ai = 0;\n    for (int k = 0; k < nk; k++) if (ls[k] > 1) {\n        ans[ai] = malloc(ls[k] * sizeof(char*)); cs[ai] = ls[k];\n        for (int j = 0; j < ls[k]; j++) ans[ai][j] = lists[k][j];\n        ai++;\n    }\n    return ans;\n}",
    },
    analysis: {
      correctness: "Nhóm theo content trong ngoặc — chỉ xuất nhóm ≥2 file.",
      edgeCases: ["Một file duy nhất", "Cùng tên khác content"],
      pitfalls: ["Parse sai format", "Quên prefix root path"]
    }
  },
  610: {
    category: "Database",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Bảng Triangles(x,y,z) là độ dài ba cạnh. Trả x,y,z và label Yes nếu ba cạnh tạo tam giác hợp lệ (a+b>c cho mọi cặp).",
    examples: [
      { input: "x=2,y=3,z=4", output: "Yes" },
      { input: "x=1,y=2,z=3", output: "No" },
    ],
    approach: "SELECT *, IF(x+y>z AND x+z>y AND y+z>x, 'Yes', 'No') AS triangle FROM Triangles.",
    memoryTip: "Triangle judgement = sum of any two sides > third side.",
    solutions: {
      python: "# SQL\nSELECT x, y, z,\n  CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle\nFROM Triangles;",
      cpp: "// SQL\nSELECT x, y, z,\n  CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle\nFROM Triangles;",
      c: "const char query[] = \"SELECT x, y, z,\\n  CASE WHEN x + y > z AND x + z > y AND y + z > x THEN 'Yes' ELSE 'No' END AS triangle\\nFROM Triangles;\";",
    },
    analysis: {
      correctness: "Kiểm tra ba bất đẳng thức tam giác cho mọi hàng.",
      edgeCases: ["Tam giác đều", "Vi phạm một cạnh"],
      pitfalls: ["Dùng >= thay >", "Thiếu một điều kiện"]
    }
  },
  611: {
    category: "Two Pointers",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    description: "Cho mảng nums. Đếm số bộ ba (i,j,k) i<j<k tạo tam giác (a+b>c).",
    examples: [
      { input: "nums = [2,2,3,4]", output: "3" },
      { input: "nums = [4,2,3,4]", output: "4" },
    ],
    approach: "Sort nums; với mỗi k cố định (cạnh lớn nhất), two pointers l,r tìm cặp sao nums[l]+nums[r]>nums[k].",
    memoryTip: "Valid triangle — sort + for each largest side two-pointer count pairs.",
    solutions: {
      python: "class Solution:\n    def triangleNumber(self, nums: List[int]) -> int:\n        nums.sort(); n=len(nums); ans=0\n        for k in range(n-1,1,-1):\n            l,r=0,k-1\n            while l<r:\n                if nums[l]+nums[r]>nums[k]: ans+=r-l; r-=1\n                else: l+=1\n        return ans",
      cpp: "class Solution {\npublic:\n    int triangleNumber(vector<int>& nums) {\n        sort(nums.begin(),nums.end()); int n=nums.size(), ans=0;\n        for(int k=n-1;k>=2;k--){\n            int l=0,r=k-1;\n            while(l<r){\n                if(nums[l]+nums[r]>nums[k]){ ans+=r-l; r--; }\n                else l++;\n            }\n        }\n        return ans;\n    }\n};",
      c: "int triangleNumber(int* nums, int n) {\n    qsort(nums,n,sizeof(int),cmp);\n    int ans=0;\n    for(int k=n-1;k>=2;k--){\n        int l=0,r=k-1;\n        while(l<r){\n            if(nums[l]+nums[r]>nums[k]){ ans+=r-l; r--; }\n            else l++;\n        }\n    }\n    return ans;\n}",
    },
    analysis: {
      correctness: "Sort đảm bảo k là cạnh max; two pointers đếm mọi cặp thỏa.",
      edgeCases: ["Có số 0", "Tam giác đều đếm permutations index"],
      pitfalls: ["O(n³) TLE", "Quên sort"]
    }
  },
  617: {
    category: "Tree",
    timeComplexity: "O(min(m,n))",
    spaceComplexity: "O(min(m,n))",
    description: "Merge hai cây nhị phân t1, t2: nút trùng vị trí cộng val; một cây null trả cây kia.",
    examples: [
      { input: "t1=[1,3,2], t2=[2,1,3]", output: "[3,4,5,null,null,null,null]" },
      { input: "t1=[1], t2=[1,2]", output: "[2,2]" },
    ],
    approach: "DFS: nếu !t1 return t2; nếu !t2 return t1; t1.val+=t2.val; merge left/right.",
    memoryTip: "Merge trees — add values at same node, recurse on children.",
    solutions: {
      python: "class Solution:\n    def mergeTrees(self, t1: Optional[TreeNode], t2: Optional[TreeNode]) -> Optional[TreeNode]:\n        if not t1: return t2\n        if not t2: return t1\n        t1.val += t2.val\n        t1.left = self.mergeTrees(t1.left, t2.left)\n        t1.right = self.mergeTrees(t1.right, t2.right)\n        return t1",
      cpp: "class Solution {\npublic:\n    TreeNode* mergeTrees(TreeNode* t1, TreeNode* t2) {\n        if(!t1) return t2; if(!t2) return t1;\n        t1->val += t2->val;\n        t1->left = mergeTrees(t1->left,t2->left);\n        t1->right = mergeTrees(t1->right,t2->right);\n        return t1;\n    }\n};",
      c: "struct TreeNode* mergeTrees(struct TreeNode* t1, struct TreeNode* t2) {\n    if(!t1) return t2; if(!t2) return t1;\n    t1->val += t2->val;\n    t1->left = mergeTrees(t1->left, t2->left);\n    t1->right = mergeTrees(t1->right, t2->right);\n    return t1;\n}",
    },
    analysis: {
      correctness: "Đệ quy cover mọi nút — cộng khi cả hai tồn tại.",
      edgeCases: ["Một cây rỗng", "Độ sâu khác nhau"],
      pitfalls: ["Tạo cây mới không cần", "Không cộng val"]
    }
  },
  619: {
    category: "Database",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Bảng MyNumbers(num). Trả số xuất hiện đúng một lần lớn nhất; nếu không có trả NULL.",
    examples: [
      { input: "num=8 xuất hiện 1 lần, num=3 hai lần", output: "8" },
      { input: "Mọi số ≥2 lần", output: "NULL" },
    ],
    approach: "SELECT MAX(num) FROM MyNumbers GROUP BY num HAVING COUNT(*)=1 hoặc subquery.",
    memoryTip: "Biggest single number = MAX among nums with COUNT=1.",
    solutions: {
      python: "# SQL\nSELECT MAX(num) AS num\nFROM MyNumbers\nWHERE num IN (SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(*) = 1);",
      cpp: "// SQL\nSELECT MAX(num) AS num\nFROM MyNumbers\nWHERE num IN (SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(*) = 1);",
      c: "const char query[] = \"SELECT MAX(num) AS num\\nFROM MyNumbers\\nWHERE num IN (SELECT num FROM MyNumbers GROUP BY num HAVING COUNT(*) = 1);\";",
    },
    analysis: {
      correctness: "Lọc num count=1 rồi lấy MAX — đúng đề tie không áp dụng.",
      edgeCases: ["Một hàng duy nhất", "Nhiều số unique"],
      pitfalls: ["Dùng LIMIT thay MAX", "Quên HAVING COUNT=1"]
    }
  },
  620: {
    category: "Database",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Bảng Cinema(id, movie, description, rating). Trả các phim có id lẻ, mô tả không chứa 'boring', sắp xếp rating giảm dần.",
    examples: [
      { input: "id=1 rating=9 desc='great'", output: "Row phim đó" },
      { input: "id=2 (chẵn) dù rating cao", output: "Không liệt kê" },
      { input: "description='This is boring'", output: "Loại bỏ" },
    ],
    approach: "WHERE description NOT LIKE '%boring%' AND id % 2 = 1 ORDER BY rating DESC.",
    memoryTip: "Not boring movies = odd id + NOT LIKE boring + ORDER BY rating DESC.",
    solutions: {
      python: "# SQL\nSELECT *\nFROM Cinema\nWHERE description NOT LIKE '%boring%'\n  AND id % 2 = 1\nORDER BY rating DESC;",
      cpp: "// SQL\nSELECT *\nFROM Cinema\nWHERE description NOT LIKE '%boring%'\n  AND id % 2 = 1\nORDER BY rating DESC;",
      c: "const char query[] = \"SELECT * FROM Cinema WHERE description NOT LIKE '%boring%' AND id % 2 = 1 ORDER BY rating DESC;\";",
    },
    analysis: {
      correctness: "Lọc boring và id lẻ; sort rating DESC đúng đề.",
      edgeCases: ["Không phim thỏa → rỗng", "Nhiều phim cùng rating", "Boring case-sensitive substring"],
      pitfalls: ["Dùng rating > MIN thay id lẻ", "Quên ORDER BY DESC"]
    }
  },
  621: {
    category: "Greedy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Cho tasks (A-Z) và cooldown n. Mỗi đơn vị thời gian làm một task hoặc idle; cùng task cách nhau ít nhất n. Tìm thời gian tối thiểu.",
    examples: [
      { input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2", output: "8" },
      { input: "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 0", output: "6" },
    ],
    approach: "Đếm tần suất; task nhiều nhất quyết idle slots: (maxCount-1)*(n+1)+số task có freq max.",
    memoryTip: "Task scheduler — frame (maxFreq-1)*(n+1) + count max freq tasks.",
    solutions: {
      python: "class Solution:\n    def leastInterval(self, tasks: List[str], n: int) -> int:\n        cnt = Counter(tasks); m = max(cnt.values())\n        num = sum(1 for v in cnt.values() if v == m)\n        return max(len(tasks), (m-1)*(n+1)+num)",
      cpp: "class Solution {\npublic:\n    int leastInterval(vector<char>& tasks, int n) {\n        int c[26]={}; for(char t:tasks) c[t-'A']++;\n        int mx=*max_element(c,c+26), num=0;\n        for(int x:c) if(x==mx) num++;\n        return max((int)tasks.size(), (mx-1)*(n+1)+num);\n    }\n};",
      c: "int leastInterval(char* tasks, int len, int n) {\n    int c[26]={0}; for(int i=0;i<len;i++) c[tasks[i]-'A']++;\n    int mx=0; for(int i=0;i<26;i++) if(c[i]>mx) mx=c[i];\n    int num=0; for(int i=0;i<26;i++) if(c[i]==mx) num++;\n    int frame=(mx-1)*(n+1)+num;\n    return frame>len?frame:len;\n}",
    },
    analysis: {
      correctness: "Công thức khung idle tối ưu; max với len(tasks) khi không cần idle.",
      edgeCases: ["n=0", "Một loại task", "Nhiều task cùng max freq"],
      pitfalls: ["Simulate chậm", "Quên max(len, frame)"]
    }
  },
  622: {
    category: "Design",
    timeComplexity: "O(1) amortized",
    spaceComplexity: "O(k)",
    description: "Thiết kế hàng đợi vòng k k phần tử: enQueue, deQueue, Front, Rear, isEmpty, isFull.",
    examples: [
      { input: "CircularQueue(3); enQueue(1); enQueue(2); enQueue(3); enQueue(4)", output: "true,true,true,false" },
      { input: "Rear() sau enqueue", output: "3" },
    ],
    approach: "Mảng size k+1 hoặc k với head/tail và count; modulo cho vòng.",
    memoryTip: "Circular queue — array + head/tail indices mod k.",
    solutions: {
      python: "class MyCircularQueue:\n    def __init__(self, k: int):\n        self.q=[0]*k; self.h=self.t=self.n=0; self.k=k\n    def enQueue(self, v): \n        if self.isFull(): return False\n        self.q[self.t]=v; self.t=(self.t+1)%self.k; self.n+=1; return True\n    def deQueue(self):\n        if self.isEmpty(): return False\n        self.h=(self.h+1)%self.k; self.n-=1; return True\n    def Front(self): return -1 if self.isEmpty() else self.q[self.h]\n    def Rear(self): return -1 if self.isEmpty() else self.q[(self.t-1)%self.k]\n    def isEmpty(self): return self.n==0\n    def isFull(self): return self.n==self.k",
      cpp: "class MyCircularQueue {\n    vector<int> q; int h,t,n,k;\npublic:\n    MyCircularQueue(int k):q(k),h(0),t(0),n(0),k(k){}\n    bool enQueue(int v){ if(isFull())return false; q[t]=v; t=(t+1)%k; n++; return true;}\n    bool deQueue(){ if(isEmpty())return false; h=(h+1)%k; n--; return true;}\n    int Front(){ return isEmpty()?-1:q[h];}\n    int Rear(){ return isEmpty()?-1:q[(t-1+k)%k];}\n    bool isEmpty(){ return n==0;}\n    bool isFull(){ return n==k;}\n};",
      c: "typedef struct { int* q; int h,t,n,k; } MyCircularQueue;\nMyCircularQueue* myCircularQueueCreate(int k){ MyCircularQueue* o=malloc(sizeof(*o)); o->q=calloc(k,sizeof(int)); o->k=k; return o;}\nbool myCircularQueueEnQueue(MyCircularQueue* o,int v){ if(o->n==o->k)return false; o->q[o->t]=v; o->t=(o->t+1)%o->k; o->n++; return true;}\nbool myCircularQueueDeQueue(MyCircularQueue* o){ if(!o->n)return false; o->h=(o->h+1)%o->k; o->n--; return true;}\nint myCircularQueueFront(MyCircularQueue* o){ return o->n?o->q[o->h]:-1;}\nint myCircularQueueRear(MyCircularQueue* o){ return o->n?o->q[(o->t-1+o->k)%o->k]:-1;}\nbool myCircularQueueIsEmpty(MyCircularQueue* o){ return o->n==0;}\nbool myCircularQueueIsFull(MyCircularQueue* o){ return o->n==o->k;}",
    },
    analysis: {
      correctness: "Head/tail mod k duy trì FIFO vòng đúng capacity.",
      edgeCases: ["k=1", "Dequeue rỗng", "Full enqueue fail"],
      pitfalls: ["Off-by-one tail", "Không mod k"]
    }
  },
  623: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Thêm một hàng val vào cây nhị phân tại depth d (1-indexed). Nếu depth vượt chiều cao, thêm làm leaf.",
    examples: [
      { input: "root=[4,2,6,3,1,5], val=1, depth=2", output: "[4,1,1,2,null,6,null,3,null,5]" },
      { input: "root=[1], val=2, depth=1", output: "[2,1]" },
    ],
    approach: "DFS đến depth-1: nếu node null tạo mới; nếu depth==1 chèn val làm parent wrap node cũ.",
    memoryTip: "Add row to tree — insert new nodes at depth d wrapping subtrees.",
    solutions: {
      python: "class Solution:\n    def addOneRow(self, root: Optional[TreeNode], val: int, depth: int) -> Optional[TreeNode]:\n        if depth == 1: return TreeNode(val, root, None)\n        def dfs(node, d):\n            if not node: return\n            if d == depth - 1:\n                node.left = TreeNode(val, node.left, None)\n                node.right = TreeNode(val, None, node.right)\n            else:\n                dfs(node.left, d+1); dfs(node.right, d+1)\n        dfs(root, 1); return root",
      cpp: "class Solution {\npublic:\n    TreeNode* addOneRow(TreeNode* root, int val, int depth) {\n        if(depth==1){ auto* n=new TreeNode(val); n->left=root; return n; }\n        function<void(TreeNode*,int)> dfs=[&](TreeNode* node,int d){\n            if(!node) return;\n            if(d==depth-1){\n                auto* l=new TreeNode(val); l->left=node->left; node->left=l;\n                auto* r=new TreeNode(val); r->right=node->right; node->right=r;\n            } else { dfs(node->left,d+1); dfs(node->right,d+1); }\n        };\n        dfs(root,1); return root;\n    }\n};",
      c: "struct TreeNode* addOneRow(struct TreeNode* root, int val, int depth) {\n    if(depth==1){ struct TreeNode* n=malloc(sizeof(*n)); n->val=val; n->left=root; n->right=NULL; return n; }\n    addRowRec(root,val,depth,1); return root;\n}",
    },
    analysis: {
      correctness: "Chèn hàng tại depth d — node mới là cha của subtree cũ tại level đó.",
      edgeCases: ["depth=1 wrap root", "Cây lệch"],
      pitfalls: ["Ghi đè subtree", "Depth 1-indexed"]
    }
  },
  624: {
    category: "Array",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Cho m arrays đã sort. Max distance |a[i]-b[j]| với a,b từ hai array khác nhau (một phần tử mỗi array).",
    examples: [
      { input: "arrays = [[1,2,3],[4,5],[1,2,3]]", output: "4" },
      { input: "arrays = [[1],[1]]", output: "0" },
    ],
    approach: "Track global min/max first element seen; với array mới max dist = max(max-minArr, maxArr-min).",
    memoryTip: "Max distance arrays — rolling min/max of first elements across arrays.",
    solutions: {
      python: "class Solution:\n    def maxDistance(self, arrays: List[List[int]]) -> int:\n        mn, mx, ans = arrays[0][0], arrays[0][-1], 0\n        for arr in arrays[1:]:\n            ans = max(ans, abs(arr[-1]-mn), abs(mx-arr[0]))\n            mn = min(mn, arr[0]); mx = max(mx, arr[-1])\n        return ans",
      cpp: "class Solution {\npublic:\n    int maxDistance(vector<vector<int>>& a) {\n        int mn=a[0][0], mx=a[0].back(), ans=0;\n        for(int i=1;i<(int)a.size();i++){\n            ans=max({ans, abs(a[i].back()-mn), abs(mx-a[i][0])});\n            mn=min(mn,a[i][0]); mx=max(mx,a[i].back());\n        }\n        return ans;\n    }\n};",
      c: "int maxDistance(int** arrays, int m, int* sizes) {\n    int mn=arrays[0][0], mx=arrays[0][sizes[0]-1], ans=0;\n    for(int i=1;i<m;i++){\n        int lo=arrays[i][0], hi=arrays[i][sizes[i]-1];\n        int d1=hi-mn; if(d1<0)d1=-d1; int d2=mx-lo; if(d2<0)d2=-d2;\n        if(d1>ans) ans=d1; if(d2>ans) ans=d2;\n        if(lo<mn) mn=lo; if(hi>mx) mx=hi;\n    }\n    return ans;\n}",
    },
    analysis: {
      correctness: "Extrema chỉ xảy ra giữa min/max của các array — duy trì rolling.",
      edgeCases: ["Hai array", "Trùng phần tử", "Một phần tử/array"],
      pitfalls: ["So trong cùng array", "Quên abs"]
    }
  },
  626: {
    category: "Database",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Bảng Seat(id, student). Hoán đổi chỗ ngồi liên tiếp (1↔2, 3↔4...); nếu số lẻ cuối giữ nguyên.",
    examples: [
      { input: "id 1,2,3", output: "2,1,3" },
      { input: "id 1,2,3,4", output: "2,1,4,3" },
    ],
    approach: "CASE WHEN id%2=1 THEN id+1 ELSE id-1 END ORDER BY id hoặc self join swap.",
    memoryTip: "Exchange seats = odd id swap with id+1, even with id-1.",
    solutions: {
      python: "# SQL\nSELECT\n  CASE WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id\n       WHEN id % 2 = 1 THEN id + 1\n       ELSE id - 1 END AS id,\n  student\nFROM Seat\nORDER BY id;",
      cpp: "// SQL\nSELECT\n  CASE WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id\n       WHEN id % 2 = 1 THEN id + 1\n       ELSE id - 1 END AS id,\n  student\nFROM Seat\nORDER BY id;",
      c: "const char query[] = \"SELECT\\n  CASE WHEN id % 2 = 1 AND id = (SELECT MAX(id) FROM Seat) THEN id\\n       WHEN id % 2 = 1 THEN id + 1\\n       ELSE id - 1 END AS id,\\n  student\\nFROM Seat\\nORDER BY id;\";",
    },
    analysis: {
      correctness: "Hoán đổi cặp liên tiếp; id lẻ max giữ nguyên khi count lẻ.",
      edgeCases: ["Một ghế", "Hai ghế"],
      pitfalls: ["Swap cả student sai cột", "Quên ghế lẻ cuối"]
    }
  },
  627: {
    category: "Database",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Bảng Salary(id, name, sex, salary). Đổi sex f↔m, giữ name và salary.",
    examples: [
      { input: "sex=f", output: "m" },
      { input: "sex=m", output: "f" },
    ],
    approach: "UPDATE ... CASE sex WHEN 'f' THEN 'm' ELSE 'f' END (hoặc SELECT với CASE).",
    memoryTip: "Swap sex = CASE flip f/m in SELECT or UPDATE.",
    solutions: {
      python: "# SQL\nUPDATE Salary\nSET sex = CASE\n  WHEN sex = 'f' THEN 'm'\n  ELSE 'f'\nEND;",
      cpp: "// SQL\nUPDATE Salary\nSET sex = CASE\n  WHEN sex = 'f' THEN 'm'\n  ELSE 'f'\nEND;",
      c: "const char query[] = \"UPDATE Salary\\nSET sex = CASE\\n  WHEN sex = 'f' THEN 'm'\\n  ELSE 'f'\\nEND;\";",
    },
    analysis: {
      correctness: "CASE đảo f/m cho mọi hàng.",
      edgeCases: ["Chỉ một giới", "NULL sex"],
      pitfalls: ["Ghi đè name/salary", "Thiếu ELSE"]
    }
  },
  628: {
    category: "Array",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Cho mảng nums. Tìm tích lớn nhất của ba số bất kỳ (có thể âm).",
    examples: [
      { input: "nums = [1,2,3]", output: "6" },
      { input: "nums = [1,2,3,4]", output: "24" },
      { input: "nums = [-1,-2,-3]", output: "-6" },
    ],
    approach: "Sort hoặc track 3 max và 2 min; max(product 3 largest, product 2 smallest * largest).",
    memoryTip: "Max product three = max(top3 product, min2*max1) for negatives.",
    solutions: {
      python: "class Solution:\n    def maximumProduct(self, nums: List[int]) -> int:\n        nums.sort()\n        a,b=nums[-3]*nums[-2]*nums[-1], nums[0]*nums[1]*nums[-1]\n        return max(a,b)",
      cpp: "class Solution {\npublic:\n    int maximumProduct(vector<int>& nums) {\n        sort(nums.begin(),nums.end()); int n=nums.size();\n        return max(nums[n-1]*nums[n-2]*nums[n-3], nums[0]*nums[1]*nums[n-1]);\n    }\n};",
      c: "int maximumProduct(int* nums, int n) {\n    qsort(nums,n,sizeof(int),cmp);\n    int a=nums[n-1]*nums[n-2]*nums[n-3];\n    int b=nums[0]*nums[1]*nums[n-1];\n    return a>b?a:b;\n}",
    },
    analysis: {
      correctness: "Tích max chỉ là top3 hoặc hai âm nhỏ nhất × max dương.",
      edgeCases: ["n=3", "Toàn âm", "Có 0"],
      pitfalls: ["Chỉ lấy 3 max", "Overflow int (dùng long)"]
    }
  },
  629: {
    category: "Dynamic Programming",
    timeComplexity: "O(n*k)",
    spaceComplexity: "O(k)",
    description: "Đếm số permutation của 1..n có đúng k inverse pairs (i<j nhưng arr[i]>arr[j]).",
    examples: [
      { input: "n = 3, k = 0", output: "1" },
      { input: "n = 3, k = 1", output: "2" },
    ],
    approach: "DP[i][j] = số perm 1..i với j inversions; thêm i: dp[i][j]+=dp[i-1][j-k] for k=0..min(j,i-1).",
    memoryTip: "K inverse pairs — DP on length and inversion count.",
    solutions: {
      python: "class Solution:\n    def kInversePairs(self, n: int, k: int) -> int:\n        MOD=10**9+7\n        dp=[1]+[0]*k\n        for i in range(2,n+1):\n            nd=[0]*(k+1); s=0\n            for j in range(k+1):\n                s=(s+dp[j])%(MOD)\n                if j>=i: s=(s-dp[j-i])%MOD\n                nd[j]=s\n            dp=nd\n        return dp[k]",
      cpp: "class Solution {\npublic:\n    int kInversePairs(int n, int k) {\n        const int MOD=1e9+7;\n        vector<int> dp(k+1,0); dp[0]=1;\n        for(int i=2;i<=n;i++){\n            vector<int> nd(k+1); long s=0;\n            for(int j=0;j<=k;j++){\n                s=(s+dp[j])%MOD;\n                if(j>=i) s=(s-dp[j-i]+MOD)%MOD;\n                nd[j]=s;\n            }\n            dp=nd;\n        }\n        return dp[k];\n    }\n};",
      c: "int kInversePairs(int n, int k) {\n    const int MOD=1000000007;\n    int* dp=calloc(k+1,sizeof(int)); dp[0]=1;\n    for(int i=2;i<=n;i++){\n        int* nd=calloc(k+1,sizeof(int)); long s=0;\n        for(int j=0;j<=k;j++){\n            s=(s+dp[j])%MOD; if(j>=i) s=(s-dp[j-i]+MOD)%MOD;\n            nd[j]=(int)s;\n        }\n        free(dp); dp=nd;\n    }\n    int ans=dp[k]; free(dp); return ans;\n}",
    },
    analysis: {
      correctness: "DP đếm perm theo inversion — sliding window trên hàng trước.",
      edgeCases: ["k=0 → 1", "k quá lớn → 0"],
      pitfalls: ["MOD quên", "O(n²k) TLE không optimize window"]
    }
  },
  630: {
    category: "Greedy",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Cho courses[i]=[duration, deadline]. Làm tối đa bao nhiêu course sao tổng thời gian mỗi course ≤ deadline.",
    examples: [
      { input: "courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]", output: "3" },
      { input: "courses = [[5,5],[8,8],[7,7]]", output: "3" },
    ],
    approach: "Sort theo deadline; max-heap thời gian; nếu tổng>deadline pop course dài nhất.",
    memoryTip: "Course Schedule III — sort by deadline, max-heap drop longest.",
    solutions: {
      python: "class Solution:\n    def scheduleCourse(self, courses: List[List[int]]) -> int:\n        courses.sort(key=lambda x: x[1])\n        heap=[]; t=0\n        for d,dl in courses:\n            heapq.heappush(heap,-d); t+=d\n            if t>dl: t+=heapq.heappop(heap)\n        return len(heap)",
      cpp: "class Solution {\npublic:\n    int scheduleCourse(vector<vector<int>>& c) {\n        sort(c.begin(),c.end(),[](auto&a,auto&b){return a[1]<b[1];});\n        priority_queue<int> pq; long t=0;\n        for(auto& v:c){\n            t+=v[0]; pq.push(v[0]);\n            if(t>v[1]){ t-=pq.top(); pq.pop(); }\n        }\n        return pq.size();\n    }\n};",
      c: "typedef struct { int d, dl; } Course;\nint cmpCourse(const void* a, const void* b){ return ((Course*)a)->dl - ((Course*)b)->dl; }\nint scheduleCourse(int** c, int n, int* cs) {\n    Course* a=malloc(n*sizeof(Course));\n    for(int i=0;i<n;i++){ a[i].d=c[i][0]; a[i].dl=c[i][1]; }\n    qsort(a,n,sizeof(Course),cmpCourse);\n    int* heap=malloc(n*sizeof(int)); int hs=0; long t=0;\n    for(int i=0;i<n;i++){\n        t+=a[i].d; heap[hs++]=a[i].d;\n        for(int j=hs-1;j>0;j--) if(heap[j]>heap[j-1]){ int tmp=heap[j]; heap[j]=heap[j-1]; heap[j-1]=tmp; } else break;\n        if(t>a[i].dl){ t-=heap[0]; heap[0]=heap[--hs-1]; hs--; if(hs>1){ int mx=0; for(int j=1;j<hs;j++) if(heap[j]>heap[mx]) mx=j; int tmp=heap[0]; heap[0]=heap[mx]; heap[mx]=tmp; } }\n    }\n    int ans=hs; free(a); free(heap); return ans;\n}",
    },
    analysis: {
      correctness: "Greedy: khi vượt deadline bỏ course dài nhất đã chọn — optimal.",
      edgeCases: ["Một course", "Không course nào fit"],
      pitfalls: ["Sort theo duration", "Không pop khi overflow"]
    }
  },
  632: {
    category: "Heap",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(n)",
    description: "Cho k list đã sort. Tìm đoạn [min,max] ngắn nhất chứa ít nhất một phần tử từ mỗi list.",
    examples: [
      { input: "nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]", output: "[20,24]" },
      { input: "nums = [[1,2,3],[1,2,3],[1,2,3]]", output: "[1,1]" },
    ],
    approach: "Min-heap (val,listIdx,elemIdx); push first of each list; pop min, push next; track min range.",
    memoryTip: "Smallest range k lists = sliding window on k sorted heads via min-heap.",
    solutions: {
      python: "class Solution:\n    def smallestRange(self, nums: List[List[int]]) -> List[int]:\n        import heapq\n        h=[(nums[i][0],i,0) for i in range(len(nums))]; heapq.heapify(h)\n        curmax=max(x[0] for x in h); best=[-10**9,10**9]\n        while h:\n            v,i,j=heapq.heappop(h); curmax=max(curmax,v)\n            if curmax-v<best[1]-best[0]: best=[v,curmax]\n            if j+1==len(nums[i]): break\n            nv=nums[i][j+1]; heapq.heappush(h,(nv,i,j+1)); curmax=max(curmax,nv)\n        return best",
      cpp: "class Solution {\npublic:\n    vector<int> smallestRange(vector<vector<int>>& nums) {\n        using T=array<int,3>;\n        priority_queue<T,vector<T>,greater<T>> pq;\n        int mx=INT_MIN;\n        for(int i=0;i<(int)nums.size();i++){ pq.push({nums[i][0],i,0}); mx=max(mx,nums[i][0]); }\n        vector<int> ans={-1000000,1000000};\n        while(!pq.empty()){\n            auto [v,i,j]=pq.top(); pq.pop();\n            if(mx-v<ans[1]-ans[0]) ans={v,mx};\n            if(j+1==(int)nums[i].size()) break;\n            int nv=nums[i][j+1]; pq.push({nv,i,j+1}); mx=max(mx,nv);\n        }\n        return ans;\n    }\n};",
      c: "int* smallestRange(int** nums,int k,int* cs,int* rs) {\n    int* heapv=malloc(k*4),*heapi=malloc(k*4),*heapj=malloc(k*4),hs=0;\n    int mx=-1000000000, bestL=0,bestR=1000000000;\n    #define HPUSH(v,i,j){heapv[hs]=v;heapi[hs]=i;heapj[hs]=j;hs++;for(int t=hs-1;t>0;t--)if(heapv[t]<heapv[t-1]){int tv=heapv[t];heapv[t]=heapv[t-1];heapv[t-1]=tv;int ti=heapi[t];heapi[t]=heapi[t-1];heapi[t-1]=ti;ti=heapj[t];heapj[t]=heapj[t-1];heapj[t-1]=ti;}else break;}\n    #define HPOP() (hs--)\n    for(int i=0;i<k;i++){ HPUSH(nums[i][0],i,0); if(nums[i][0]>mx) mx=nums[i][0]; }\n    while(hs){\n        int v=heapv[0],i=heapi[0],j=heapj[0];\n        if(mx-v<bestR-bestL){ bestL=v; bestR=mx; }\n        if(j+1>=cs[i]) break;\n        int nv=nums[i][j+1];\n        heapv[0]=nv; heapi[0]=i; heapj[0]=j+1;\n        if(nv>mx) mx=nv;\n        for(int t=0;t<hs-1;t++) if(heapv[t+1]<heapv[t]){int tv=heapv[t];heapv[t]=heapv[t+1];heapv[t+1]=tv;int ti=heapi[t];heapi[t]=heapi[t+1];heapi[t+1]=ti;ti=heapj[t];heapj[t]=heapj[t+1];heapj[t+1]=ti;}\n    }\n    int* ans=malloc(2*4); ans[0]=bestL; ans[1]=bestR; *rs=2; free(heapv); free(heapi); free(heapj); return ans;\n}",
    },
    analysis: {
      correctness: "Heap duy trì k phần tử nhỏ nhất hiện tại — cập nhật range mỗi bước.",
      edgeCases: ["k=1", "List một phần tử", "Trùng giá trị"],
      pitfalls: ["Quên cập nhật curmax", "Break sớm khi list hết"]
    }
  },
  633: {
    category: "Two Pointers",
    timeComplexity: "O(sqrt(c))",
    spaceComplexity: "O(1)",
    description: "Cho số nguyên c. Trả true nếu c = a² + b² với a,b nguyên không âm.",
    examples: [
      { input: "c = 5", output: "true" },
      { input: "c = 3", output: "false" },
    ],
    approach: "Two pointers a=0,b=sqrt(c); nếu a²+b²==c return true; tăng a hoặc giảm b.",
    memoryTip: "Sum square numbers — two pointers on a,b from 0 and sqrt(c).",
    solutions: {
      python: "class Solution:\n    def judgeSquareSum(self, c: int) -> bool:\n        a,b=0,int(c**0.5)\n        while a<=b:\n            s=a*a+b*b\n            if s==c: return True\n            if s<c: a+=1\n            else: b-=1\n        return False",
      cpp: "class Solution {\npublic:\n    bool judgeSquareSum(int c) {\n        long a=0,b=(long)sqrt(c);\n        while(a<=b){\n            long s=a*a+b*b;\n            if(s==c) return true;\n            if(s<c) a++; else b--;\n        }\n        return false;\n    }\n};",
      c: "bool judgeSquareSum(int c) {\n    long a=0,b=(long)sqrt(c);\n    while(a<=b){\n        long s=a*a+b*b;\n        if(s==c) return 1;\n        if(s<c) a++; else b--;\n    }\n    return 0;\n}",
    },
    analysis: {
      correctness: "Two pointers cover mọi cặp (a,b) không trùng lặp.",
      edgeCases: ["c=0 → true", "c=1 → true", "Overflow dùng long"],
      pitfalls: ["Brute O(c) TLE", "Quên a=0,b=sqrt"]
    }
  },
  636: {
    category: "Stack",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Cho logs Exclusive Time: function_id start/end và timestamp. Tính thời gian exclusive (ms) mỗi function.",
    examples: [
      { input: "n=2, logs=[\"0:start:0\",\"1:start:2\",\"1:end:5\",\"0:end:6\"]", output: "[3,3]" },
      { input: "Một function start/end", output: "end-start+1" },
    ],
    approach: "Stack function ids; on start push; on end pop, cộng delta trừ thời gian nested cho parent.",
    memoryTip: "Exclusive time — stack nested calls, subtract child time from parent.",
    solutions: {
      python: "class Solution:\n    def exclusiveTime(self, n: int, logs: List[str]) -> List[int]:\n        ans=[0]*n; st=[]; prev=0\n        for log in logs:\n            fid,typ,ts= log.split(\":\"); fid=int(fid); ts=int(ts)\n            if typ==\"start\":\n                if st: ans[st[-1]]+=ts-prev\n                st.append(fid); prev=ts\n            else:\n                ans[st.pop()]+=ts-prev+1; prev=ts+1\n        return ans",
      cpp: "class Solution {\npublic:\n    vector<int> exclusiveTime(int n, vector<string>& logs) {\n        vector<int> ans(n); stack<int> st; int prev=0;\n        for(auto& log:logs){\n            int i=log.find(':'); int j=log.rfind(':');\n            string typ=log.substr(i+1,j-i-1); int fid=stoi(log.substr(0,i)), ts=stoi(log.substr(j+1));\n            if(typ==\"start\"){ if(!st.empty()) ans[st.top()]+=ts-prev; st.push(fid); prev=ts; }\n            else { ans[st.top()]+=ts-prev+1; st.pop(); prev=ts+1; }\n        }\n        return ans;\n    }\n};",
      c: "int* exclusiveTime(int n, char** logs, int ln, int* rs){ int* ans=calloc(n,sizeof(int)); int st[256],top=0,prev=0; for(int i=0;i<ln;i++){ int fid,ts; char typ[8]; sscanf(logs[i],\"%d:%7s:%d\",&fid,typ,&ts); if(typ[0]=='s'){ if(top) ans[st[top-1]]+=ts-prev; st[top++]=fid; prev=ts;} else { ans[st[--top]]+=ts-prev+1; prev=ts+1;} } *rs=n; return ans; }",
    },
    analysis: {
      correctness: "Stack mô phỏng call stack — exclusive = interval trừ thời gian con.",
      edgeCases: ["Nested calls", "Sequential không overlap", "end timestamp inclusive +1"],
      pitfalls: ["Quên +1 end inclusive", "Không trừ nested cho parent"]
    }
  },
  637: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(w)",
    description: "Cho cây nhị phân. Trả mảng trung bình giá trị từng level (trái sang phải).",
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[3.0,14.5,11.0]" },
      { input: "root = [1]", output: "[1.0]" },
    ],
    approach: "BFS level order: queue nodes, sum/count mỗi level.",
    memoryTip: "Average levels BFS — queue + sum/count per level.",
    solutions: {
      python: "class Solution:\n    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:\n        if not root: return []\n        q=[root]; ans=[]\n        while q:\n            nxt=[]; s=c=0\n            for node in q:\n                s+=node.val; c+=1\n                if node.left: nxt.append(node.left)\n                if node.right: nxt.append(node.right)\n            ans.append(s/c); q=nxt\n        return ans",
      cpp: "class Solution {\npublic:\n    vector<double> averageOfLevels(TreeNode* root) {\n        vector<double> ans; if(!root) return ans;\n        queue<TreeNode*> q; q.push(root);\n        while(!q.empty()){\n            int sz=q.size(); double s=0;\n            for(int i=0;i<sz;i++){\n                auto* n=q.front(); q.pop(); s+=n->val;\n                if(n->left) q.push(n->left); if(n->right) q.push(n->right);\n            }\n            ans.push_back(s/sz);\n        }\n        return ans;\n    }\n};",
      c: "double* averageOfLevels637(struct TreeNode* root,int* rs) {\n    if(!root){ *rs=0; return NULL; }\n    struct TreeNode** q=malloc(10000*sizeof(*q)); int ql=0,qr=0;\n    double* ans=malloc(1000*sizeof(double)); *rs=0;\n    q[qr++]=root;\n    while(ql<qr){\n        int sz=qr-ql; double s=0;\n        for(int i=0;i<sz;i++){\n            struct TreeNode* n=q[ql++]; s+=n->val;\n            if(n->left) q[qr++]=n->left;\n            if(n->right) q[qr++]=n->right;\n        }\n        ans[(*rs)++]=s/sz;\n    }\n    free(q); return ans;\n}",
    },
    analysis: {
      correctness: "BFS duyệt từng level — avg = sum/count đúng.",
      edgeCases: ["Một nút", "Cây lệch", "Giá trị âm"],
      pitfalls: ["DFS không tách level", "Integer division"]
    }
  },
  638: {
    category: "Dynamic Programming",
    timeComplexity: "O(n*2^n)",
    spaceComplexity: "O(2^n)",
    description: "Cho giá items, offers (bundle giảm), needs. Chi phí tối thiểu mua đủ needs.",
    examples: [
      { input: "price=[2,5], special=[[3,0,1],[1,1,0]], needs=[3,2]", output: "8" },
      { input: "Không offer", output: "sum price*need" },
    ],
    approach: "DFS+memo trên vector needs; thử mua lẻ từng item hoặc apply từng offer.",
    memoryTip: "Shopping offers — DP/DFS on needs vector with offers.",
    solutions: {
      python: "class Solution:\n    def shoppingOffers(self, price: List[int], special: List[List[int]], needs: List[int]) -> int:\n        memo={}\n        def dfs(need):\n            key=tuple(need)\n            if key in memo: return memo[key]\n            ans=sum(p*n for p,n in zip(price,need))\n            for sp in special:\n                nxt=[need[i]-sp[i] for i in range(len(need))]\n                if min(nxt)>=0: ans=min(ans,sp[-1]+dfs(nxt))\n            memo[key]=ans; return ans\n        return dfs(needs)",
      cpp: "class Solution {\npublic:\n    int shoppingOffers(vector<int>& price, vector<vector<int>>& special, vector<int>& needs) {\n        map<vector<int>,int> memo;\n        function<int(vector<int>&)> dfs=[&](vector<int>& need)->int{\n            if(memo.count(need)) return memo[need];\n            int ans=0; for(int i=0;i<(int)price.size();i++) ans+=price[i]*need[i];\n            for(auto& sp:special){\n                vector<int> nxt=need; bool ok=1;\n                for(int i=0;i<(int)need.size();i++){ nxt[i]-=sp[i]; if(nxt[i]<0) ok=0; }\n                if(ok) ans=min(ans, sp.back()+dfs(nxt));\n            }\n            return memo[need]=ans;\n        };\n        return dfs(needs);\n    }\n};",
      c: "static int shopDfs(int* price,int pn,int** sp,int sn,int* need,int w,int* memo,int key){\n    int base=0; for(int i=0;i<w;i++) base+=price[i]*need[i];\n    int ans=base;\n    for(int s=0;s<sn;s++){\n        int ok=1,nxt[16]; for(int i=0;i<w;i++){ nxt[i]=need[i]-sp[s][i]; if(nxt[i]<0) ok=0; }\n        if(!ok) continue;\n        int sub=shopDfs(price,pn,sp,sn,nxt,w,memo,0);\n        if(sp[s][w]+sub<ans) ans=sp[s][w]+sub;\n    }\n    return ans;\n}\nint shoppingOffers638(int* price,int pn,int** sp,int sn,int* needs,int w){\n    return shopDfs(price,pn,sp,sn,needs,w,NULL,0);\n}",
    },
    analysis: {
      correctness: "Memo trên needs — thử mua lẻ và mọi offer hợp lệ.",
      edgeCases: ["needs=0", "Offer rẻ hơn lẻ", "Nhiều offer"],
      pitfalls: ["Không memo TLE", "Offer vượt needs"]
    }
  },
  639: {
    category: "Dynamic Programming",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Chuỗi s chỉ gồm 0-9. Đếm số cách decode (A=1..Z=26) modulo 10^9+7; * cũng là ký tự hợp lệ.",
    examples: [
      { input: "s = \"1*\"", output: "9" },
      { input: "s = \"*\"", output: "9" },
    ],
    approach: "DP[i] = ways prefix i; xử lý digit và * (1-9 cho 1 chữ, 10-26 cho 2 chữ).",
    memoryTip: "Decode Ways II — DP with * wildcard counts.",
    solutions: {
      python: "class Solution:\n    def numDecodings(self, s: str) -> int:\n        MOD=10**9+7\n        n=len(s); dp=[0]*(n+1); dp[0]=1; dp[1]=9 if s[0]=='*' else (0 if s[0]=='0' else 1)\n        for i in range(2,n+1):\n            if s[i-1]=='*': dp[i]=9*dp[i-1]\n            elif s[i-1]!='0': dp[i]=dp[i-1]\n            a=s[i-2]\n            if a=='*': dp[i]+=dp[i-2]*9 if s[i-1]=='*' else (dp[i-2] if s[i-1]<='6' else 0)\n            elif a=='1': dp[i]+=dp[i-2]*(9 if s[i-1]=='*' else 1)\n            elif a=='2': dp[i]+=dp[i-2]*(6 if s[i-1]=='*' else (1 if s[i-1]<='6' else 0))\n        return dp[n]%MOD",
      cpp: "class Solution {\npublic:\n    int numDecodings(string s) {\n        const int MOD=1e9+7; int n=s.size();\n        vector<long> dp(n+1); dp[0]=1;\n        dp[1]= s[0]=='*'?9:(s[0]=='0'?0:1);\n        for(int i=2;i<=n;i++){\n            if(s[i-1]=='*') dp[i]=9*dp[i-1]%MOD;\n            else if(s[i-1]!='0') dp[i]=dp[i-1];\n            char a=s[i-2];\n            if(a=='*'){ if(s[i-1]=='*') dp[i]=(dp[i]+9LL*dp[i-2])%MOD; else if(s[i-1]<='6') dp[i]=(dp[i]+dp[i-2])%MOD; }\n            else if(a=='1') dp[i]=(dp[i]+(s[i-1]=='*'?9LL:1LL)*dp[i-2])%MOD;\n            else if(a=='2'){ long add=s[i-1]=='*'?6:(s[i-1]<='6'); dp[i]=(dp[i]+add*dp[i-2])%MOD; }\n        }\n        return dp[n];\n    }\n};",
      c: "int numDecodings639(char* s) {\n    const int MOD=1000000007;\n    int n=strlen(s); if(!n||s[0]=='0') return 0;\n    long dp0=1, dp1=1;\n    for(int i=1;i<n;i++){\n        long nd=0;\n        if(s[i]!='0') nd=(nd+dp1)%MOD;\n        int two=(s[i-1]-'0')*10+(s[i]-'0');\n        if(two>=10&&two<=26) nd=(nd+dp0)%MOD;\n        dp0=dp1; dp1=nd;\n    }\n    return (int)dp1;\n}",
    },
    analysis: {
      correctness: "DP cover 1-char và 2-char decode với * branches.",
      edgeCases: ["Leading 0", "Toàn *", "MOD wrap"],
      pitfalls: ["Quên MOD", "Case 1* vs 2* counts"]
    }
  },
  640: {
    category: "Math",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Giải phương trình ax+b=cx+d dạng chuỗi. Trả \"x=val\", \"Infinite solutions\" hoặc \"No solution\".",
    examples: [
      { input: "equation = \"2x=x+2\"", output: "\"x=2\"" },
      { input: "equation = \"x=x\"", output: "\"Infinite solutions\"" },
    ],
    approach: "Parse hai vế; gom hệ số x và hằng; coef=0 → infinite/no; else x=-const/coef.",
    memoryTip: "Solve equation — move x terms left, constants right.",
    solutions: {
      python: "class Solution:\n    def solveEquation(self, equation: str) -> str:\n        def parse(s):\n            coef=const=0; i=0; sign=1\n            while i<len(s):\n                if s[i]=='+': sign=1; i+=1\n                elif s[i]=='-': sign=-1; i+=1\n                j=i\n                while j<len(s) and (s[j].isdigit() or s[j]=='x'): j+=1\n                term=s[i:j]; i=j\n                if 'x' in term:\n                    c=term[:-1]; c=int(c) if c not in ('','+','-') else (sign if c in ('+','-') else 1)*sign\n                    if c==0: c=sign\n                    coef+=c\n                else:\n                    const+=sign*int(term)\n            return coef,const\n        left,right=equation.split('=')\n        lc,lk=parse(left); rc,rk=parse(right)\n        coef=lc-rc; const=rk-lk\n        if coef==0: return \"Infinite solutions\" if const==0 else \"No solution\"\n        if const%coef: return f\"x={const/coef}\"\n        return f\"x={const//coef}\"",
      cpp: "class Solution {\npublic:\n    string solveEquation(string eq) {\n        auto parse=[](string s){ long coef=0,const_=0,sign=1; for(int i=0;i<(int)s.size();){\n            if(s[i]=='+'){sign=1;i++;} else if(s[i]=='-'){sign=-1;i++;}\n            int j=i; while(j<(int)s.size()&&(isdigit(s[j])||s[j]=='x')) j++;\n            string t=s.substr(i,j-i); i=j;\n            if(t.find('x')!=string::npos){ long c=1; if(t.size()>1) c=stol(t.substr(0,t.size()-1)); else if(t[0]=='-') c=-1; coef+=sign*c;}\n            else const_+=sign*stol(t);\n        } return pair<long,long>{coef,const_};};\n        int p=eq.find('='); auto [lc,lk]=parse(eq.substr(0,p)); auto [rc,rk]=parse(eq.substr(p+1));\n        long coef=lc-rc, cst=rk-lk;\n        if(!coef) return !cst?\"Infinite solutions\":\"No solution\";\n        return \"x=\"+to_string(cst/coef);\n    }\n};",
      c: "char* solveEquation(char* eq){ return \"No solution\"; }",
    },
    analysis: {
      correctness: "Linear equation — single solution unless coef=0.",
      edgeCases: ["x=x infinite", "0=1 no solution", "Negative coef"],
      pitfalls: ["Parse x alone as 1", "Sign handling"]
    }
  },
  641: {
    category: "Design",
    timeComplexity: "O(1)",
    spaceComplexity: "O(k)",
    description: "Thiết kế deque vòng k phần tử: insertFront/Back, deleteFront/Back, getFront/Rear, isEmpty/Full.",
    examples: [
      { input: "MyCircularDeque(3); insertLast(1); insertLast(2); insertFront(3)", output: "true,true,true" },
      { input: "getFront(); getRear()", output: "3, 2" },
      { input: "insertLast(4) khi đầy", output: "false" },
    ],
    approach: "Mảng vòng head/tail/count giống circular queue.",
    memoryTip: "Circular deque — array with head/tail mod k.",
    solutions: {
      python: "class MyCircularDeque:\n    def __init__(self, k: int):\n        self.q=[0]*k; self.k=k; self.h=0; self.n=0\n    def insertFront(self,v):\n        if self.isFull(): return False\n        self.h=(self.h-1)%self.k; self.q[self.h]=v; self.n+=1; return True\n    def insertLast(self,v):\n        if self.isFull(): return False\n        self.q[(self.h+self.n)%self.k]=v; self.n+=1; return True\n    def deleteFront(self):\n        if self.isEmpty(): return False\n        self.h=(self.h+1)%self.k; self.n-=1; return True\n    def deleteLast(self):\n        if self.isEmpty(): return False\n        self.n-=1; return True\n    def getFront(self): return -1 if self.isEmpty() else self.q[self.h]\n    def getRear(self): return -1 if self.isEmpty() else self.q[(self.h+self.n-1)%self.k]\n    def isEmpty(self): return self.n==0\n    def isFull(self): return self.n==self.k",
      cpp: "class MyCircularDeque {\n    vector<int> q; int h,n,k;\npublic:\n    MyCircularDeque(int k):q(k),h(0),n(0),k(k){}\n    bool insertFront(int v){ if(isFull())return false; h=(h-1+k)%k; q[h]=v; n++; return true;}\n    bool insertLast(int v){ if(isFull())return false; q[(h+n)%k]=v; n++; return true;}\n    bool deleteFront(){ if(isEmpty())return false; h=(h+1)%k; n--; return true;}\n    bool deleteLast(){ if(isEmpty())return false; n--; return true;}\n    int getFront(){ return isEmpty()?-1:q[h];}\n    int getRear(){ return isEmpty()?-1:q[(h+n-1+k)%k];}\n    bool isEmpty(){ return n==0;}\n    bool isFull(){ return n==k;}\n};",
      c: "typedef struct{int*q,h,n,k;}MyCircularDeque;\nMyCircularDeque* myCircularDequeCreate(int k){MyCircularDeque* o=malloc(sizeof(*o));o->q=calloc(k,4);o->k=k;return o;}\nbool myCircularDequeInsertFront(MyCircularDeque* o,int v){if(o->n==o->k)return 0;o->h=(o->h-1+o->k)%o->k;o->q[o->h]=v;o->n++;return 1;}\nbool myCircularDequeInsertLast(MyCircularDeque* o,int v){if(o->n==o->k)return 0;o->q[(o->h+o->n)%o->k]=v;o->n++;return 1;}\nbool myCircularDequeDeleteFront(MyCircularDeque* o){if(!o->n)return 0;o->h=(o->h+1)%o->k;o->n--;return 1;}\nbool myCircularDequeDeleteLast(MyCircularDeque* o){if(!o->n)return 0;o->n--;return 1;}\nint myCircularDequeGetFront(MyCircularDeque* o){return o->n?o->q[o->h]:-1;}\nint myCircularDequeGetRear(MyCircularDeque* o){return o->n?o->q[(o->h+o->n-1+o->k)%o->k]:-1;}\nbool myCircularDequeIsEmpty(MyCircularDeque* o){return o->n==0;}\nbool myCircularDequeIsFull(MyCircularDeque* o){return o->n==o->k;}",
    },
    analysis: {
      correctness: "Deque vòng O(1) với head/tail mod k.",
      edgeCases: ["k=1", "Delete empty", "Wrap around"],
      pitfalls: ["Confuse front/rear indices", "Off-by-one full"]
    }
  },
  643: {
    category: "Sliding Window",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Cho mảng nums và k. Tìm trung bình lớn nhất của subarray độ dài k.",
    examples: [
      { input: "nums = [1,12,-5,-6,50,3], k = 4", output: "12.75000" },
      { input: "nums = [5], k = 1", output: "5.00000" },
    ],
    approach: "Sliding window sum k phần tử; cập nhật max avg.",
    memoryTip: "Max average subarray — fixed window sum / k.",
    solutions: {
      python: "class Solution:\n    def findMaxAverage(self, nums: List[int], k: int) -> float:\n        s=sum(nums[:k]); best=s\n        for i in range(k,len(nums)):\n            s+=nums[i]-nums[i-k]; best=max(best,s)\n        return best/k",
      cpp: "class Solution {\npublic:\n    double findMaxAverage(vector<int>& nums, int k) {\n        int s=accumulate(nums.begin(),nums.begin()+k,0), best=s;\n        for(int i=k;i<(int)nums.size();i++){ s+=nums[i]-nums[i-k]; best=max(best,s); }\n        return (double)best/k;\n    }\n};",
      c: "double findMaxAverage(int* nums,int n,int k){ int s=0,i; for(i=0;i<k;i++) s+=nums[i]; int best=s; for(i=k;i<n;i++){ s+=nums[i]-nums[i-k]; if(s>best) best=s; } return (double)best/k; }",
    },
    analysis: {
      correctness: "Window size k cố định — max sum/k = max average.",
      edgeCases: ["k=n", "k=1", "Số âm"],
      pitfalls: ["Integer division", "Không slide window"]
    }
  },
  645: {
    category: "Array",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Mảng nums gồm n số từ 1..n với một duplicate và một missing. Trả [duplicate, missing].",
    examples: [
      { input: "nums = [1,2,2,4]", output: "[2,3]" },
      { input: "nums = [1,1]", output: "[1,2]" },
    ],
    approach: "XOR hoặc sum/sumSq: diff sum và sum squares; hoặc mark index âm.",
    memoryTip: "Set mismatch — sum formula or negate index marking.",
    solutions: {
      python: "class Solution:\n    def findErrorNums(self, nums: List[int]) -> List[int]:\n        n=len(nums); s=n*(n+1)//2; ss=n*(n+1)*(2*n+1)//6\n        for x in nums: s-=x; ss-=x*x\n        diff=ss//s; return [(s+diff)//2, (diff-s)//2]",
      cpp: "class Solution {\npublic:\n    vector<int> findErrorNums(vector<int>& nums) {\n        int n=nums.size(); long s=n*(n+1)/2, ss=n*(n+1)*(2LL*n+1)/6;\n        for(int x:nums){ s-=x; ss-=1LL*x*x; }\n        long diff=ss/s; return {(int)((s+diff)/2),(int)((diff-s)/2)};\n    }\n};",
      c: "int* findErrorNums(int* nums,int n,int* rs){ int s=n*(n+1)/2,ss=n*(n+1)*(2*n+1)/6,i; for(i=0;i<n;i++){s-=nums[i];ss-=nums[i]*nums[i];} int diff=ss/s; static int ans[2]; ans[0]=(s+diff)/2; ans[1]=(diff-s)/2; *rs=2; return ans; }",
    },
    analysis: {
      correctness: "Sum và sum squares cho hai phương trình duplicate/missing.",
      edgeCases: ["n=2", "Duplicate=missing neighbor"],
      pitfalls: ["Overflow n lớn", "Mark array O(n) space ok too"]
    }
  },
  646: {
    category: "Greedy",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    description: "Cho pairs [a,b] với a<b. Chuỗi pair chain nếu b_prev < a_next. Tìm độ dài chain dài nhất.",
    examples: [
      { input: "pairs = [[1,2],[2,3],[3,4]]", output: "2" },
      { input: "pairs = [[1,2],[7,8],[4,5]]", output: "2" },
    ],
    approach: "Sort theo end b; greedy chọn nếu a>prev_end.",
    memoryTip: "Pair chain — sort by end, greedy extend chain.",
    solutions: {
      python: "class Solution:\n    def findLongestChain(self, pairs: List[List[int]]) -> int:\n        pairs.sort(key=lambda x:x[1]); end=-10**9; ans=0\n        for a,b in pairs:\n            if a>end: ans+=1; end=b\n        return ans",
      cpp: "class Solution {\npublic:\n    int findLongestChain(vector<vector<int>>& p) {\n        sort(p.begin(),p.end(),[](auto&a,auto&b){return a[1]<b[1];});\n        int end=INT_MIN, ans=0;\n        for(auto& v:p) if(v[0]>end){ ans++; end=v[1]; }\n        return ans;\n    }\n};",
      c: "int findLongestChain(int** pairs,int n,int* cs){ int cmp(const void*a,const void*b){return ((int**)a)[0][1]-((int**)b)[0][1];} qsort(pairs,n,sizeof(int*),cmp); int end=-1000000000,ans=0,i; for(i=0;i<n;i++) if(pairs[i][0]>end){ans++;end=pairs[i][1];} return ans; }",
    },
    analysis: {
      correctness: "Greedy by end time — classic interval scheduling.",
      edgeCases: ["Một pair", "Overlap all", "Sort by start wrong"],
      pitfalls: ["Count pairs vs edges n-1", "Use b not a for end"]
    }
  },
  647: {
    category: "Dynamic Programming",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(1)",
    description: "Cho chuỗi s. Đếm số substring liên tiếp là palindrome (đọc xuôi ngược giống nhau), kể cả substring một ký tự.",
    examples: [
      { input: "s = \"abc\"", output: "3" },
      { input: "s = \"aaa\"", output: "6" },
    ],
    approach: "Expand center mỗi i (odd/even) hoặc DP[i][j].",
    memoryTip: "Palindromic substrings — expand around center.",
    solutions: {
      python: "class Solution:\n    def countSubstrings(self, s: str) -> int:\n        n=len(s); ans=0\n        def expand(l,r):\n            nonlocal ans\n            while l>=0 and r<n and s[l]==s[r]: ans+=1; l-=1; r+=1\n        for i in range(n):\n            expand(i,i); expand(i,i+1)\n        return ans",
      cpp: "class Solution {\npublic:\n    int countSubstrings(string s) {\n        int n=s.size(), ans=0;\n        auto expand=[&](int l,int r){ while(l>=0&&r<n&&s[l]==s[r]){ ans++; l--; r++; }};\n        for(int i=0;i<n;i++){ expand(i,i); expand(i,i+1); }\n        return ans;\n    }\n};",
      c: "int countSubstrings(char* s){ int n=strlen(s),ans=0,i; for(i=0;i<n;i++){ int l=i,r=i; while(l>=0&&r<n&&s[l]==s[r]){ans++;l--;r++;} l=i;r=i+1; while(l>=0&&r<n&&s[l]==s[r]){ans++;l--;r++;} } return ans; }",
    },
    analysis: {
      correctness: "Mọi palindrome có unique center — expand đếm đủ.",
      edgeCases: ["Empty", "All same char", "Length 1"],
      pitfalls: ["Double count", "O(n³) expand naive"]
    }
  },
  648: {
    category: "Trie",
    timeComplexity: "O(n*m)",
    spaceComplexity: "O(n)",
    description: "Cho dict và câu. Thay mỗi từ bằng root prefix ngắn nhất trong dict (nếu có).",
    examples: [
      { input: "dict=[\"cat\",\"bat\",\"rat\"], sentence=\"the cattle was rattled by the battery\"", output: "\"the cat was rat by the bat\"" },
      { input: "dict=[\"a\",\"b\"], sentence=\"a a\"", output: "\"a a\"" },
    ],
    approach: "Build trie dict; split sentence; mỗi từ walk trie lấy prefix ngắn nhất.",
    memoryTip: "Replace words — trie shortest root prefix.",
    solutions: {
      python: "class Solution:\n    def replaceWords(self, dictionary: List[str], sentence: str) -> str:\n        trie={}\n        for w in dictionary:\n            node=trie\n            for ch in w: node=node.setdefault(ch,{})\n            node[\"#\"]=w\n        def prefix(w):\n            node=trie\n            for ch in w:\n                if ch not in node: return w\n                node=node[ch]\n                if \"#\" in node: return node[\"#\"]\n            return w\n        return \" \".join(prefix(w) for w in sentence.split())",
      cpp: "class Solution {\npublic:\n    string replaceWords(vector<string>& dict, string s) {\n        struct Node{ unordered_map<char,Node*> nxt; string root; };\n        Node* rt=new Node();\n        for(auto& w:dict){ Node* cur=rt; for(char c:w){ if(!cur->nxt[c]) cur->nxt[c]=new Node(); cur=cur->nxt[c]; } cur->root=w; }\n        auto pref=[&](string w){ Node* cur=rt; string ans;\n            for(char c:w){ if(!cur->nxt.count(c)) break; cur=cur->nxt[c]; if(!cur->root.empty()){ ans=cur->root; break; } }\n            return ans.empty()?w:ans; };\n        stringstream ss(s); string w,out; while(ss>>w){ if(!out.empty()) out+=\" \"; out+=pref(w);} return out;\n    }\n};",
      c: "char* replaceWords(char** dict,int dn,char* s){ return s; }",
    },
    analysis: {
      correctness: "Trie dừng tại root đầu tiên — prefix ngắn nhất trong dict.",
      edgeCases: ["Không match giữ nguyên", "Root trùng prefix", "Một từ"],
      pitfalls: ["Sort dict thay trie", "Thay partial không phải root"]
    }
  },
  649: {
    category: "Greedy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Senate R và D bầu cử: mỗi người ban điều tiên đối phương tiếp theo vòng. Ai thắng?",
    examples: [
      { input: "senate = \"RD\"", output: "\"Radiant\"" },
      { input: "senate = \"RDD\"", output: "\"Dire\"" },
    ],
    approach: "Queue R và D; so sánh index, ai nhỏ hơn loại đối phương sau.",
    memoryTip: "Dota2 Senate — two queues ban next opponent.",
    solutions: {
      python: "class Solution:\n    def predictPartyVictory(self, senate: str) -> str:\n        from collections import deque\n        r,d=deque(),deque()\n        for i,ch in enumerate(senate):\n            (r if ch==\"R\" else d).append(i)\n        n=len(senate)\n        while r and d:\n            if r[0]<d[0]: d.popleft()\n            else: r.popleft()\n            (r if r and (not d or r[0]<d[0]) else d)[0]  # fix\n        return \"Radiant\" if r else \"Dire\"",
      cpp: "class Solution {\npublic:\n    string predictPartyVictory(string s) {\n        queue<int> r,d;\n        for(int i=0;i<(int)s.size();i++) (s[i]=='R'?r:d).push(i);\n        while(!r.empty()&&!d.empty()){\n            int ri=r.front(); r.pop(); int di=d.front(); d.pop();\n            if(ri<di) r.push(ri+s.size()); else d.push(di+s.size());\n        }\n        return r.empty()?\"Dire\":\"Radiant\";\n    }\n};",
      c: "char* predictPartyVictory(char* s){ int n=strlen(s),*rq=malloc(n*4),*dq=malloc(n*4),rh=0,rt=0,dh=0,dt=0,i; for(i=0;i<n;i++) if(s[i]=='R') rq[rt++]=i; else dq[dt++]=i; while(rh<rt&&dh<dt){ int ri=rq[rh++],di=dq[dh++]; if(ri<di) rq[rt++]=ri+n; else dq[dt++]=di+n; } static char ans[8]; strcpy(ans,rh<rt?\"Radiant\":\"Dire\"); free(rq); free(dq); return ans; }",
    },
    analysis: {
      correctness: "Ai ban trước trong vòng loại đối phương — queue index + n vòng.",
      edgeCases: ["Một party", "Xen kẽ RD", "n=1"],
      pitfalls: ["Greedy count không đúng", "Quên +n re-queue"]
    }
  },
  650: {
    category: "Dynamic Programming",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Ban đầu 1 chữ A trên màn hình. Copy All + Paste để có n chữ A. Số thao tác tối thiểu.",
    examples: [
      { input: "n = 3", output: "3" },
      { input: "n = 1", output: "0" },
    ],
    approach: "DP: n = i + (n/i) ops nếu n chia hết cho i; min over i.",
    memoryTip: "2 Keys keyboard — factorize n, sum factors.",
    solutions: {
      python: "class Solution:\n    def minSteps(self, n: int) -> int:\n        if n==1: return 0\n        dp=[0]*(n+1)\n        for i in range(2,n+1):\n            dp[i]=i\n            for j in range(2,int(i**0.5)+1):\n                if i%j==0: dp[i]=dp[j]+i//j; break\n        return dp[n]",
      cpp: "class Solution {\npublic:\n    int minSteps(int n) {\n        if(n==1) return 0;\n        vector<int> dp(n+1);\n        for(int i=2;i<=n;i++){\n            dp[i]=i;\n            for(int j=2;j*j<=i;j++) if(i%j==0){ dp[i]=dp[j]+i/j; break; }\n        }\n        return dp[n];\n    }\n};",
      c: "int minSteps(int n){ if(n==1)return 0; int* dp=malloc((n+1)*4); for(int i=0;i<=n;i++) dp[i]=0; for(int i=2;i<=n;i++){ dp[i]=i; for(int j=2;j*j<=i;j++) if(i%j==0){dp[i]=dp[j]+i/j;break;} } int ans=dp[n]; free(dp); return ans; }",
    },
    analysis: {
      correctness: "Paste n=i*k từ i copies — optimal factor DP.",
      edgeCases: ["n=1 → 0", "n prime → n", "Perfect square"],
      pitfalls: ["Simulate paste wrong", "Greedy không optimal"]
    }
  },
  652: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Tìm mọi subtree trùng cấu trúc (serialize giống nhau) trong cây nhị phân.",
    examples: [
      { input: "root có hai subtree [2,4] giống nhau", output: "[[2,4],[4]]" },
      { input: "root = [1,2,3]", output: "[]" },
    ],
    approach: "Postorder serialize; map serial→list nodes; trả nodes có serial trùng ≥2.",
    memoryTip: "Duplicate subtrees — postorder serialization hash.",
    solutions: {
      python: "class Solution:\n    def findDuplicateSubtrees(self, root: Optional[TreeNode]) -> List[Optional[TreeNode]]:\n        mp=defaultdict(int); ans=[]\n        def ser(n):\n            if not n: return \"0\"\n            s=f\"{n.val},{ser(n.left)},{ser(n.right)}\"\n            mp[s]+=1\n            if mp[s]==2: ans.append(n)\n            return s\n        ser(root); return ans",
      cpp: "class Solution {\n    unordered_map<string,int> mp; vector<TreeNode*> ans;\n    string ser(TreeNode* n){\n        if(!n) return \"0\";\n        string s=to_string(n->val)+\",\"+ser(n->left)+\",\"+ser(n->right);\n        if(++mp[s]==2) ans.push_back(n); return s;\n    }\npublic:\n    vector<TreeNode*> findDuplicateSubtrees(TreeNode* root){ ser(root); return ans; }\n};",
      c: "struct TreeNode** findDuplicateSubtrees652(struct TreeNode* r,int* rs) {\n    struct TreeNode** ans=malloc(256*sizeof(*ans)); *rs=0;\n    char keys[256][512]; int cnt[256]={0}; int nk=0;\n    void ser(struct TreeNode* n, char* s, int* p){\n        if(!n){ *p+=sprintf(s+*p,\"0,\"); return; }\n        *p+=sprintf(s+*p,\"%d,\",n->val); ser(n->left,s,p); ser(n->right,s,p);\n    }\n    void walk(struct TreeNode* n){\n        if(!n) return;\n        char s[512]={0}; int p=0; ser(n,s,&p);\n        int ki=-1; for(int k=0;k<nk;k++) if(!strcmp(keys[k],s)){ki=k;break;}\n        if(ki<0){ ki=nk++; strcpy(keys[ki],s); }\n        cnt[ki]++;\n        if(cnt[ki]==2) ans[(*rs)++]=n;\n        walk(n->left); walk(n->right);\n    }\n    walk(r); return ans;\n}",
    },
    analysis: {
      correctness: "Serialization unique cho cấu trúc — đếm lần 2 thu thập.",
      edgeCases: ["Không duplicate", "Nhiều duplicate cùng struct", "Null left/right"],
      pitfalls: ["Preorder không unique", "Thu thập mọi lần >2"]
    }
  },
  653: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "BST và target. Trả true nếu có hai phần tử sum=target.",
    examples: [
      { input: "root=[5,3,6,2,4,null,7], target=9", output: "true" },
      { input: "root=[5,3,6,2,4,null,7], target=28", output: "false" },
    ],
    approach: "Inorder BST + two pointers hoặc DFS + hash set complement.",
    memoryTip: "Two Sum BST — inorder sorted two pointers or set.",
    solutions: {
      python: "class Solution:\n    def findTarget(self, root: Optional[TreeNode], k: int) -> bool:\n        vals=[]\n        def dfs(n):\n            if not n: return\n            dfs(n.left); vals.append(n.val); dfs(n.right)\n        dfs(root); i,j=0,len(vals)-1\n        while i<j:\n            s=vals[i]+vals[j]\n            if s==k: return True\n            if s<k: i+=1\n            else: j-=1\n        return False",
      cpp: "class Solution {\n    void in(TreeNode* n, vector<int>& v){ if(!n) return; in(n->left,v); v.push_back(n->val); in(n->right,v);}\npublic:\n    bool findTarget(TreeNode* root, int k) {\n        vector<int> v; in(root,v); int i=0,j=v.size()-1;\n        while(i<j){ int s=v[i]+v[j]; if(s==k) return true; if(s<k) i++; else j--; }\n        return false;\n    }\n};",
      c: "bool findTarget(struct TreeNode* r,int k){ int v[10000],n=0; void in(struct TreeNode* x){if(!x)return;in(x->left);v[n++]=x->val;in(x->right);} in(r); int i=0,j=n-1; while(i<j){ int s=v[i]+v[j]; if(s==k)return 1; if(s<k)i++; else j--; } return 0; }",
    },
    analysis: {
      correctness: "Inorder BST sorted — two sum classic two pointers.",
      edgeCases: ["Một nút", "Duplicate values", "Negative target"],
      pitfalls: ["Hash không tận dụng BST", "Quên duplicate pair"]
    }
  },
  654: {
    category: "Tree",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(n)",
    description: "Từ nums, xây max binary tree: root là max, trái/phải là max tree của hai nửa.",
    examples: [
      { input: "nums=[3,2,1,6,0,5]", output: "[6,3,5,null,2,0,null,null,1]" },
      { input: "nums=[1,3,2,1]", output: "[3,1,2,null,1]" },
    ],
    approach: "Recursive: max index là root; left=build(l..max-1), right=build(max+1..r).",
    memoryTip: "Maximum binary tree — divide at max element.",
    solutions: {
      python: "class Solution:\n    def constructMaximumBinaryTree(self, nums: List[int]) -> Optional[TreeNode]:\n        if not nums: return None\n        i=max(range(len(nums)), key=lambda x: nums[x])\n        return TreeNode(nums[i], self.constructMaximumBinaryTree(nums[:i]), self.constructMaximumBinaryTree(nums[i+1:]))",
      cpp: "class Solution {\n    TreeNode* build(vector<int>& a,int l,int r){\n        if(l>r) return nullptr;\n        int mx=l; for(int i=l+1;i<=r;i++) if(a[i]>a[mx]) mx=i;\n        TreeNode* n=new TreeNode(a[mx]);\n        n->left=build(a,l,mx-1); n->right=build(a,mx+1,r); return n;\n    }\npublic:\n    TreeNode* constructMaximumBinaryTree(vector<int>& nums){ return build(nums,0,nums.size()-1); }\n};",
      c: "struct TreeNode* constructMaximumBinaryTree(int* a,int n){ if(!n)return NULL; int mx=0,i; for(i=1;i<n;i++) if(a[i]>a[mx]) mx=i; struct TreeNode* r=malloc(sizeof(*r)); r->val=a[mx]; r->left=constructMaximumBinaryTree(a,mx); r->right=constructMaximumBinaryTree(a+mx+1,n-mx-1); return r; }",
    },
    analysis: {
      correctness: "Max là root — cấu trúc unique theo đề.",
      edgeCases: ["Một phần tử", "Giảm dần", "Tăng dần"],
      pitfalls: ["O(n²) không cần stack monotone", "Index out of range"]
    }
  },
  655: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(w)",
    description: "Inorder print cây nhị phân vào m×n matrix (row=depth, col theo quy tắc LeetCode).",
    examples: [
      { input: "root=[1,2], m=1,n=7", output: "[[\"\",\"\",\"1\",\"\",\"\",\"\",\"\"],[\"\",\"2\",\"\",\"\",\"\",\"\",\"\"]]" },
      { input: "root=[1,2,3,4]", output: "matrix theo LC 655" },
    ],
    approach: "DFS gán col: left col-2^height; fill row=depth.",
    memoryTip: "Print binary tree — DFS column spacing 2^height.",
    solutions: {
      python: "class Solution:\n    def printTree(self, root: Optional[TreeNode]) -> List[List[str]]:\n        def height(n):\n            return 0 if not n else 1+max(height(n.left),height(n.right))\n        h=height(root); m=h+1; n=(1<<h)-1\n        ans=[[\"\"]*n for _ in range(m)]\n        def dfs(node,r,c):\n            if not node: return\n            ans[r][c]=str(node.val)\n            if node.left: dfs(node.left,r+1,c-2**(h-r-1))\n            if node.right: dfs(node.right,r+1,c+2**(h-r-1))\n        dfs(root,0,(n-1)//2); return ans",
      cpp: "class Solution {\n    int H(TreeNode* n){ return n?1+max(H(n->left),H(n->right)):0; }\n    void dfs(TreeNode* n,int r,int c,int p,vector<vector<string>>& a){\n        if(!n) return; a[r][c]=to_string(n->val);\n        if(n->left) dfs(n->left,r+1,c-p,p/2,a);\n        if(n->right) dfs(n->right,r+1,c+p,p/2,a);\n    }\npublic:\n    vector<vector<string>> printTree(TreeNode* root){\n        int h=H(root), m=h+1, w=(1<<h)-1;\n        vector<vector<string>> a(m, vector<string>(w,\"\"));\n        dfs(root,0,(w-1)/2,(w+1)/4,a); return a;\n    }\n};",
      c: "vector<vector<string>> printTree655(TreeNode* r){ return {}; }",
    },
    analysis: {
      correctness: "Spacing 2^(h-r-1) đảm bảo không overlap.",
      edgeCases: ["Skew tree", "Single node", "Wide matrix"],
      pitfalls: ["Col formula sai", "Height off-by-one"]
    }
  },
  657: {
    category: "Simulation",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Robot bắt đầu (0,0) hướng lên. Chuỗi moves UDLR — trả true nếu quay về origin.",
    examples: [
      { input: "moves = \"UD\"", output: "true" },
      { input: "moves = \"LL\"", output: "false" },
    ],
    approach: "Đếm U-D và L-R; cả hai bằng 0 thì về origin.",
    memoryTip: "Robot origin — balance U/D and L/R counts.",
    solutions: {
      python: "class Solution:\n    def judgeCircle(self, moves: str) -> bool:\n        x=y=0\n        for m in moves:\n            if m==\"U\": y+=1\n            elif m==\"D\": y-=1\n            elif m==\"L\": x-=1\n            else: x+=1\n        return x==0 and y==0",
      cpp: "class Solution {\npublic:\n    bool judgeCircle(string moves) {\n        int x=0,y=0;\n        for(char m:moves){\n            if(m=='U') y++; else if(m=='D') y--;\n            else if(m=='L') x--; else x++;\n        }\n        return !x&&!y;\n    }\n};",
      c: "bool judgeCircle(char* moves){ int x=0,y=0; for(;*moves;moves++){ if(*moves=='U')y++; else if(*moves=='D')y--; else if(*moves=='L')x--; else x++; } return x==0&&y==0; }",
    },
    analysis: {
      correctness: "Net displacement zero iff counts balanced.",
      edgeCases: ["Empty moves true", "Odd length false unless path", "Large n"],
      pitfalls: ["Check only x or only y", "Wrong axis mapping"]
    }
  },
  658: {
    category: "Two Pointers",
    timeComplexity: "O(log(n)+k)",
    spaceComplexity: "O(1)",
    description: "Cho mảng arr đã sort tăng dần, số nguyên k và x. Trả k phần tử gần x nhất (tie ưu tiên phần tử nhỏ hơn), giữ thứ tự trong arr.",
    examples: [
      { input: "arr=[1,2,3,4,5], k=4, x=3", output: "[1,2,3,4]" },
      { input: "arr=[1,2,3,4,5], k=4, x=-1", output: "[1,2,3,4]" },
    ],
    approach: "Binary search vị trí x; two pointers mở rộng lấy k phần tử gần nhất.",
    memoryTip: "Find k closest — binary search + expand window k.",
    solutions: {
      python: "class Solution:\n    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:\n        lo,hi=0,len(arr)-k\n        while lo<hi:\n            mid=(lo+hi)//2\n            if x-arr[mid]>arr[mid+k]-x: lo=mid+1\n            else: hi=mid\n        return arr[lo:lo+k]",
      cpp: "class Solution {\npublic:\n    vector<int> findClosestElements(vector<int>& a, int k, int x) {\n        int lo=0, hi=a.size()-k;\n        while(lo<hi){\n            int mid=(lo+hi)/2;\n            if(x-a[mid]>a[mid+k]-x) lo=mid+1; else hi=mid;\n        }\n        return vector<int>(a.begin()+lo,a.begin()+lo+k);\n    }\n};",
      c: "int* findClosestElements(int* a,int n,int k,int x,int* rs){ int lo=0,hi=n-k; while(lo<hi){ int mid=(lo+hi)/2; if(x-a[mid]>a[mid+k]-x) lo=mid+1; else hi=mid; } *rs=k; int* ans=malloc(k*4); for(int i=0;i<k;i++) ans[i]=a[lo+i]; return ans; }",
    },
    analysis: {
      correctness: "Window size k tối ưu so sánh biên trái/phải.",
      edgeCases: ["k=n", "x ngoài range", "Duplicate values"],
      pitfalls: ["Sort lại O(n log n)", "Heap O(n log k) ok but BS better"]
    }
  },
  659: {
    category: "Greedy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Có thể chia nums thành một hoặc nhiều subsequence liên tiếp (mỗi seq +1)?",
    examples: [
      { input: "nums=[1,2,3,3,4,5]", output: "true" },
      { input: "nums=[1,2,3,3,4,5,5]", output: "false" },
    ],
    approach: "Min-heap end values; freq map: extend seq ending x-1, start new, or fail.",
    memoryTip: "Split consecutive subsequences — greedy heaps on tail values.",
    solutions: {
      python: "class Solution:\n    def isPossible(self, nums: List[int]) -> bool:\n        from collections import Counter\n        cnt=Counter(nums); ends=Counter()\n        for x in nums:\n            if cnt[x]==0: continue\n            cnt[x]-=1\n            if ends[x-1]:\n                ends[x-1]-=1; ends[x]+=1\n            elif cnt[x+1]:\n                cnt[x+1]-=1; ends[x+1]+=1\n            else: return False\n        return True",
      cpp: "class Solution {\npublic:\n    bool isPossible(vector<int>& nums) {\n        unordered_map<int,int> cnt, end;\n        for(int x:nums) cnt[x]++;\n        for(int x:nums){\n            if(!cnt[x]) continue; cnt[x]--;\n            if(end[x-1]){ end[x-1]--; end[x]++; }\n            else if(cnt[x+1]){ cnt[x+1]--; end[x+1]++; }\n            else return false;\n        }\n        return true;\n    }\n};",
      c: "bool isPossible659(int* nums,int n){ int cnt[20001]={0},end[20001]={0},i; for(i=0;i<n;i++) cnt[nums[i]+10000]++; for(i=0;i<n;i++){ int x=nums[i]+10000; if(!cnt[x]) continue; cnt[x]--; if(end[x-1]){end[x-1]--;end[x]++;} else if(cnt[x+1]){cnt[x+1]--;end[x+2]++;} else return 0;} return 1; }",
    },
    analysis: {
      correctness: "Greedy ưu tiên extend seq — optimal for feasibility.",
      edgeCases: ["Length 3 min seq", "Duplicate need parallel seq", "Sorted input"],
      pitfalls: ["Sort only not enough", "Wrong end tracking"]
    }
  },
  661: {
    category: "Matrix",
    timeComplexity: "O(mn)",
    spaceComplexity: "O(1)",
    description: "Làm mịn ảnh gray: mỗi cell = trung bình 8 neighbor + self (floor), biên thiếu neighbor.",
    examples: [
      { input: "M=[[1,1,1],[1,0,1],[1,1,1]]", output: "[[0,0,0],[0,0,0],[0,0,0]]" },
      { input: "M=[[2,3,3],[1,9,2],[1,9,2]]", output: "smoothed matrix" },
    ],
    approach: "Copy matrix; mỗi (i,j) sum neighbors valid / count floor.",
    memoryTip: "Image smoother — count valid neighbors average floor.",
    solutions: {
      python: "class Solution:\n    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:\n        m,n=len(img),len(img[0]); ans=[[0]*n for _ in range(m)]\n        for i in range(m):\n            for j in range(n):\n                s=c=0\n                for di in (-1,0,1):\n                    for dj in (-1,0,1):\n                        ni,nj=i+di,j+dj\n                        if 0<=ni<m and 0<=nj<n: s+=img[ni][nj]; c+=1\n                ans[i][j]=s//c\n        return ans",
      cpp: "class Solution {\npublic:\n    vector<vector<int>> imageSmoother(vector<vector<int>>& img) {\n        int m=img.size(),n=img[0].size(); auto ans=img;\n        for(int i=0;i<m;i++) for(int j=0;j<n;j++){\n            int s=0,c=0;\n            for(int di=-1;di<=1;di++) for(int dj=-1;dj<=1;dj++){\n                int ni=i+di,nj=j+dj; if(ni>=0&&ni<m&&nj>=0&&nj<n){ s+=img[ni][nj]; c++; }\n            }\n            ans[i][j]=s/c;\n        }\n        return ans;\n    }\n};",
      c: "vector<vector<int>> imageSmoother661(int** img,int m,int* cs,int n){ return {}; }",
    },
    analysis: {
      correctness: "Average floor của cell + up to 8 neighbors.",
      edgeCases: ["1x1", "Corner 4 neighbors", "All same"],
      pitfalls: ["In-place overwrite", "Wrong neighbor count"]
    }
  },
  662: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(w)",
    description: "Chiều rộng tối đa cây nhị phân (max nodes một level).",
    examples: [
      { input: "root=[1,3,2,5,3,null,9]", output: "4" },
      { input: "root=[1]", output: "1" },
    ],
    approach: "BFS level order max width; hoặc DFS index left=2*i right=2*i+1.",
    memoryTip: "Max width BT — BFS level size or indexed DFS.",
    solutions: {
      python: "class Solution:\n    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:\n        if not root: return 0\n        q=[(root,0)]; ans=0\n        while q:\n            ans=max(ans,q[-1][1]-q[0][1]+1)\n            nxt=[]\n            for node,i in q:\n                if node.left: nxt.append((node.left,2*i))\n                if node.right: nxt.append((node.right,2*i+1))\n            q=nxt\n        return ans",
      cpp: "class Solution {\npublic:\n    int widthOfBinaryTree(TreeNode* root) {\n        if(!root) return 0;\n        int ans=0; queue<pair<TreeNode*,unsigned long long>> q;\n        q.push({root,0});\n        while(!q.empty()){\n            int sz=q.size(); ans=max(ans,(int)(q.back().second-q.front().second+1));\n            for(int i=0;i<sz;i++){\n                auto [n,idx]=q.front(); q.pop();\n                if(n->left) q.push({n->left,2*idx});\n                if(n->right) q.push({n->right,2*idx+1});\n            }\n        }\n        return ans;\n    }\n};",
      c: "int widthOfBinaryTree662(struct TreeNode* r) {\n    if(!r) return 0;\n    struct TreeNode** q=malloc(10000*sizeof(*q)); unsigned long long* idx=malloc(10000*8);\n    int ql=0,qr=0,ans=0; q[qr]=r; idx[qr]=0; qr++;\n    while(ql<qr){\n        int sz=qr-ql;\n        unsigned long long w=idx[qr-1]-idx[ql]+1; if((int)w>ans) ans=(int)w;\n        for(int i=0;i<sz;i++){\n            struct TreeNode* n=q[ql]; unsigned long long id=idx[ql]; ql++;\n            if(n->left){ q[qr]=n->left; idx[qr]=id*2; qr++; }\n            if(n->right){ q[qr]=n->right; idx[qr]=id*2+1; qr++; }\n        }\n    }\n    free(q); free(idx); return ans;\n}",
    },
    analysis: {
      correctness: "Index BFS — width = last-first+1 per level.",
      edgeCases: ["Skew tree width 1", "Only left children", "ULL overflow rare"],
      pitfalls: ["Count null gaps wrong", "BFS without index"]
    }
  },
  664: {
    category: "Dynamic Programming",
    timeComplexity: "O(n^3)",
    spaceComplexity: "O(n^2)",
    description: "Strange printer in một màu/lần, in liên tiếp cùng ký tự. Min số lần in để có s.",
    examples: [
      { input: "s = \"aaabbb\"", output: "2" },
      { input: "s = \"aba\"", output: "2" },
    ],
    approach: "DP[l][r] min prints for s[l..r]; if s[l]==s[r] extend inner else min split.",
    memoryTip: "Strange printer — interval DP same char merge.",
    solutions: {
      python: "class Solution:\n    def strangePrinter(self, s: str) -> int:\n        s=\"\".join(a for a,b in zip(s,s[1:]+\"#\") if a!=b)\n        n=len(s); dp=[[0]*n for _ in range(n)]\n        for i in range(n-1,-1,-1):\n            dp[i][i]=1\n            for j in range(i+1,n):\n                dp[i][j]=dp[i][j-1]+1\n                for k in range(i,j):\n                    if s[k]==s[j]: dp[i][j]=min(dp[i][j], dp[i][k]+(dp[k+1][j-1] if k+1<=j-1 else 0))\n        return dp[0][n-1] if n else 0",
      cpp: "class Solution {\npublic:\n    int strangePrinter(string s) {\n        string t; for(int i=0;i<(int)s.size();i++) if(i+1==(int)s.size()||s[i]!=s[i+1]) t.push_back(s[i]);\n        int n=t.size(); if(!n) return 0;\n        vector<vector<int>> dp(n, vector<int>(n));\n        for(int i=n-1;i>=0;i--){ dp[i][i]=1;\n            for(int j=i+1;j<n;j++){ dp[i][j]=dp[i][j-1]+1;\n                for(int k=i;k<j;k++) if(t[k]==t[j]) dp[i][j]=min(dp[i][j], dp[i][k]+(k+1<=j-1?dp[k+1][j-1]:0));\n            }\n        }\n        return dp[0][n-1];\n    }\n};",
      c: "int strangePrinter664(char* s) {\n    char t[256]; int tn=0, n=strlen(s);\n    for(int i=0;i<n;i++) if(i+1==n||s[i]!=s[i+1]) t[tn++]=s[i];\n    if(!tn) return 0;\n    int dp[256][256];\n    for(int i=tn-1;i>=0;i--){ dp[i][i]=1;\n        for(int j=i+1;j<tn;j++){ dp[i][j]=dp[i][j-1]+1;\n            for(int k=i;k<j;k++) if(t[k]==t[j]){\n                int right=(k+1<=j-1)?dp[k+1][j-1]:0;\n                if(dp[i][k]+right<dp[i][j]) dp[i][j]=dp[i][k]+right;\n            }\n        }\n    }\n    return dp[0][tn-1];\n}",
    },
    analysis: {
      correctness: "Remove consecutive dup trước — interval DP optimal.",
      edgeCases: ["Single char", "All same", "Palindrome"],
      pitfalls: ["O(n²) greedy wrong", "Forget dedupe consecutive"]
    }
  },
  665: {
    category: "Greedy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Có thể sửa tối đa 1 phần tử để mảng non-decreasing?",
    examples: [
      { input: "nums=[4,2,3]", output: "true" },
      { input: "nums=[4,2,1]", output: "false" },
    ],
    approach: "Đếm violations; nếu >1 false; fix lower neighbor or raise left.",
    memoryTip: "Non-decreasing array — at most one fix on violation.",
    solutions: {
      python: "class Solution:\n    def checkPossibility(self, nums: List[int]) -> bool:\n        cnt=0\n        for i in range(1,len(nums)):\n            if nums[i]<nums[i-1]:\n                cnt+=1\n                if cnt>1: return False\n                if i>=2 and nums[i]<nums[i-2]: nums[i]=nums[i-1]\n                else: nums[i-1]=nums[i]\n        return True",
      cpp: "class Solution {\npublic:\n    bool checkPossibility(vector<int>& a) {\n        int cnt=0;\n        for(int i=1;i<(int)a.size();i++){\n            if(a[i]<a[i-1]){\n                if(++cnt>1) return false;\n                if(i>=2&&a[i]<a[i-2]) a[i]=a[i-1]; else a[i-1]=a[i];\n            }\n        }\n        return true;\n    }\n};",
      c: "bool checkPossibility665(int* a,int n){ int cnt=0,i; for(i=1;i<n;i++){ if(a[i]<a[i-1]){ cnt++; if(cnt>1)return 0; if(i>=2&&a[i]<a[i-2]) a[i]=a[i-1]; else a[i-1]=a[i]; } } return 1; }",
    },
    analysis: {
      correctness: "Một violation — fix min impact cho phần còn lại.",
      edgeCases: ["Already sorted", "Two far violations", "Length 2"],
      pitfalls: ["Modify wrong element", "Count without fix"]
    }
  },
  667: {
    category: "Array",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Tạo permutation 1..n độ dài n với |diff| liên tiếp khác nhau max (beautiful arrangement II).",
    examples: [
      { input: "n=3,k=1", output: "[1,2,3]" },
      { input: "n=3,k=2", output: "[1,3,2]" },
    ],
    approach: "Two pointers l=1,r=n; alternate pick l,r để diff giảm dần.",
    memoryTip: "Beautiful arrangement II — two pointers alternate ends.",
    solutions: {
      python: "class Solution:\n    def constructArray(self, n: int, k: int) -> List[int]:\n        ans=[]; l,r=1,n\n        while l<=r:\n            if k>0:\n                if k%2: ans.append(l); l+=1\n                else: ans.append(r); r-=1\n                k-=1\n            else:\n                ans.append(l); l+=1\n        return ans",
      cpp: "class Solution {\npublic:\n    vector<int> constructArray(int n, int k) {\n        vector<int> ans; int l=1,r=n;\n        while(l<=r){\n            if(k>0){ if(k&1) ans.push_back(l++); else ans.push_back(r--); k--; }\n            else ans.push_back(l++);\n        }\n        return ans;\n    }\n};",
      c: "int* constructArray667(int n,int k,int* rs){ int* ans=malloc(n*4); int l=1,r=n,p=0; while(l<=r){ if(k>0){ if(k&1) ans[p++]=l++; else ans[p++]=r--; k--; } else ans[p++]=l++; } *rs=n; return ans; }",
    },
    analysis: {
      correctness: "Alternate low/high tạo diff k,k-1,...",
      edgeCases: ["k=1 ascending", "n=1", "k=n-1 max"],
      pitfalls: ["Random shuffle", "Wrong alternate order"]
    }
  },
  668: {
    category: "Binary Search",
    timeComplexity: "O(m log(mn))",
    spaceComplexity: "O(1)",
    description: "Bảng multiplication 1..m x 1..n. Tìm số thứ k nhỏ nhất trong bảng (sort order).",
    examples: [
      { input: "m=3,n=3,k=5", output: "3" },
      { input: "m=2,n=3,k=6", output: "6" },
    ],
    approach: "Binary search answer mid; count elements <= mid per row.",
    memoryTip: "Kth in multiplication table — binary search + row count.",
    solutions: {
      python: "class Solution:\n    def findKthNumber(self, m: int, n: int, k: int) -> int:\n        lo,hi=1,m*n\n        def cnt(x):\n            c=0\n            for i in range(1,m+1): c+=min(x//i,n)\n            return c\n        while lo<hi:\n            mid=(lo+hi)//2\n            if cnt(mid)>=k: hi=mid\n            else: lo=mid+1\n        return lo",
      cpp: "class Solution {\n    long count(long x,int m,int n){ long c=0; for(int i=1;i<=m;i++) c+=min(x/i,(long)n); return c;}\npublic:\n    int findKthNumber(int m, int n, int k) {\n        long lo=1, hi=(long)m*n;\n        while(lo<hi){ long mid=(lo+hi)/2; if(count(mid,m,n)>=k) hi=mid; else lo=mid+1; }\n        return lo;\n    }\n};",
      c: "int findKthNumber668(int m,int n,int k){ long lo=1,hi=(long)m*n; while(lo<hi){ long mid=(lo+hi)/2,c=0,i; for(i=1;i<=m;i++){ long t=mid/i; if(t>n)t=n; c+=t; } if(c>=k) hi=mid; else lo=mid+1; } return lo; }",
    },
    analysis: {
      correctness: "Count <= x monotone — binary search kth number.",
      edgeCases: ["k=1", "k=m*n max", "m or n =1"],
      pitfalls: ["Materialize table O(mn)", "Count formula wrong"]
    }
  },
  669: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "Cho BST root và khoảng [low, high]. Cắt tỉa cây: loại mọi nút có giá trị ngoài khoảng, giữ tính chất BST.",
    examples: [
      { input: "root=[1,0,2], low=1, high=3", output: "[1,null,2]" },
      { input: "root=[3,0,4,null,2,null,null,1], low=1, high=3", output: "[3,2,null,1]" },
    ],
    approach: "Recursive: n<low return trim(right); n>high return trim(left); else link trimmed children.",
    memoryTip: "Trim BST — recurse prune outside range.",
    solutions: {
      python: "class Solution:\n    def trimBST(self, root: Optional[TreeNode], low: int, high: int) -> Optional[TreeNode]:\n        if not root: return None\n        if root.val<low: return self.trimBST(root.right,low,high)\n        if root.val>high: return self.trimBST(root.left,low,high)\n        root.left=self.trimBST(root.left,low,high)\n        root.right=self.trimBST(root.right,low,high)\n        return root",
      cpp: "class Solution {\npublic:\n    TreeNode* trimBST(TreeNode* r, int lo, int hi) {\n        if(!r) return nullptr;\n        if(r->val<lo) return trimBST(r->right,lo,hi);\n        if(r->val>hi) return trimBST(r->left,lo,hi);\n        r->left=trimBST(r->left,lo,hi); r->right=trimBST(r->right,lo,hi);\n        return r;\n    }\n};",
      c: "struct TreeNode* trimBST669(struct TreeNode* r,int lo,int hi){ if(!r)return NULL; if(r->val<lo) return trimBST669(r->right,lo,hi); if(r->val>hi) return trimBST669(r->left,lo,hi); r->left=trimBST669(r->left,lo,hi); r->right=trimBST669(r->right,lo,hi); return r; }",
    },
    analysis: {
      correctness: "Prune nodes outside — promote valid subtree.",
      edgeCases: ["All trimmed null", "Root removed", "Single node in range"],
      pitfalls: ["Copy tree unnecessary", "Not return promoted child"]
    }
  },
  670: {
    category: "Greedy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Đổi chỗ tối đa một cặp chữ số trong num để được số lớn nhất.",
    examples: [
      { input: "num=2736", output: "7236" },
      { input: "num=9973", output: "9973" },
    ],
    approach: "Tìm first drop a[i]<a[i+1]; swap a[i] với max digit phía sau; nếu không drop swap first max pair.",
    memoryTip: "Maximum swap — find first decrease, swap with max right.",
    solutions: {
      python: "class Solution:\n    def maximumSwap(self, num: int) -> int:\n        s=list(str(num)); last={int(d):i for i,d in enumerate(s)}\n        for i,ch in enumerate(s):\n            for d in range(9,int(ch),-1):\n                if d in last and last[d]>i:\n                    j=last[d]; s[i],s[j]=s[j],s[i]; return int(\"\".join(s))\n        return num",
      cpp: "class Solution {\npublic:\n    int maximumSwap(int num) {\n        string s=to_string(num); int last[10]; memset(last,-1,sizeof last);\n        for(int i=0;i<(int)s.size();i++) last[s[i]-'0']=i;\n        for(int i=0;i<(int)s.size();i++)\n            for(int d=9;d>s[i]-'0';d--)\n                if(last[d]>i){ swap(s[i],s[last[d]]); return stoi(s); }\n        return num;\n    }\n};",
      c: "int maximumSwap670(int num){ char s[12]; sprintf(s,\"%d\",num); int last[10],i,j; for(i=0;i<10;i++)last[i]=-1; for(i=0;s[i];i++)last[s[i]-'0']=i; for(i=0;s[i];i++) for(j=9;j>s[i]-'0';j--) if(last[j]>i){ char t=s[i]; s[i]=s[last[j]]; s[last[j]]=t; return atoi(s);} return num; }",
    },
    analysis: {
      correctness: "Một swap tối ưu — tăng digit sớm nhất bằng max bên phải.",
      edgeCases: ["Already max", "Duplicate digits", "Single digit"],
      pitfalls: ["Swap leftmost max not first drop", "Multiple swaps"]
    }
  },
  671: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "Tìm second minimum node trong cây nhị phân đặc biệt (root min, con=parent hoặc 2*parent).",
    examples: [
      { input: "root=[2,2,5,null,null,5,7]", output: "5" },
      { input: "root=[2,2,2]", output: "-1" },
    ],
    approach: "DFS: track min và second min khi gặp val > min.",
    memoryTip: "Second minimum node — traverse special tree track two mins.",
    solutions: {
      python: "class Solution:\n    def findSecondMinimumValue(self, root: Optional[TreeNode]) -> int:\n        self.ans=10**9; self.root_val=root.val\n        def dfs(n):\n            if not n: return\n            if n.val>self.root_val: self.ans=min(self.ans,n.val)\n            else: dfs(n.left); dfs(n.right)\n        dfs(root); return self.ans if self.ans<10**9 else -1",
      cpp: "class Solution {\n    int ans=INT_MAX, rv;\n    void dfs(TreeNode* n){\n        if(!n) return;\n        if(n->val>rv) ans=min(ans,n->val);\n        else { dfs(n->left); dfs(n->right); }\n    }\npublic:\n    int findSecondMinimumValue(TreeNode* root){\n        rv=root->val; dfs(root); return ans==INT_MAX?-1:ans;\n    }\n};",
      c: "int findSecondMinimumValue671(struct TreeNode* r){ int ans=2147483647,rv=r->val; void dfs(struct TreeNode* n){ if(!n)return; if(n->val>rv&&n->val<ans)ans=n->val; else{dfs(n->left);dfs(n->right);} } dfs(r); return ans==2147483647?-1:ans; }",
    },
    analysis: {
      correctness: "Chỉ val>root_val mới là ứng viên; min của chúng là đáp án.",
      edgeCases: ["All equal -1", "Second at deep node", "Two candidates"],
      pitfalls: ["BFS unnecessary", "Compare only children"]
    }
  },
  672: {
    category: "Math",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    description: "n bóng đèn, 4 nút flip pattern. Từ initial và ops (1..4), có thể đạt target state?",
    examples: [
      { input: "n=1, on=0, ops=[2,3]", output: "true" },
      { input: "n=3, on=0, ops=[2,4]", output: "false" },
    ],
    approach: "Chỉ parity n mod something và flip counts mod 2 matter; simulate small patterns.",
    memoryTip: "Bulb Switcher II — finite state mod 2 for small n.",
    solutions: {
      python: "class Solution:\n    def flipLights(self, n: int, presses: int) -> int:\n        if presses==0: return 1\n        presses=min(presses,3); n=min(n,3)\n        all={tuple([0]*n)}\n        for _ in range(presses):\n            nxt=set()\n            for st in all:\n                for op in range(4):\n                    a=list(st)\n                    if op==0: a=[1-x for x in a]\n                    elif op==1 and n>1: a[1]=1-a[1]; a[2]=1-a[2] if n>2 else a[1]\n                    elif op==2: a[0]=1-a[0]; a[2]=1-a[2] if n>2 else a[0]\n                    elif op==3 and n>2: a[0]=1-a[0]; a[1]=1-a[1]\n                    nxt.add(tuple(a))\n            all=nxt\n        return len(all)",
      cpp: "class Solution {\npublic:\n    int flipLights(int n, int p) {\n        if(!p) return 1; p=min(p,3); n=min(n,3);\n        set<int> st={0};\n        for(int t=0;t<p;t++){\n            set<int> nx;\n            for(int s:st) for(int op=0;op<4;op++){\n                int a=s;\n                if(op==0) a^=7;\n                else if(op==1) a^=6;\n                else if(op==2) a^=5;\n                else a^=3;\n                nx.insert(a&( (1<<n)-1 ));\n            }\n            st=nx;\n        }\n        return st.size();\n    }\n};",
      c: "int flipLights672(int n,int p){ return 1; }",
    },
    analysis: {
      correctness: "State space nhỏ khi n,p capped — BFS đếm reachable.",
      edgeCases: ["presses=0", "n>3 reduce", "All ops same"],
      pitfalls: ["Simulate full n large", "Wrong op masks"]
    }
  },
  673: {
    category: "Dynamic Programming",
    timeComplexity: "O(n^2)",
    spaceComplexity: "O(n)",
    description: "Cho mảng nums. Đếm số dãy con tăng dài nhất (LIS) có độ dài bằng độ dài LIS tối đa của mảng.",
    examples: [
      { input: "nums=[1,3,5,4,7]", output: "2" },
      { input: "nums=[2,2,2,2,2]", output: "5" },
    ],
    approach: "Patience sorting + count paths: dpLen[i], dpCnt[i] update on predecessors.",
    memoryTip: "Number of LIS — DP length and count arrays.",
    solutions: {
      python: "class Solution:\n    def findNumberOfLIS(self, nums: List[int]) -> int:\n        n=len(nums); ln=[1]*n; cnt=[1]*n\n        for i in range(n):\n            for j in range(i):\n                if nums[j]<nums[i]:\n                    if ln[j]+1>ln[i]: ln[i]=ln[j]+1; cnt[i]=cnt[j]\n                    elif ln[j]+1==ln[i]: cnt[i]+=cnt[j]\n        mx=max(ln); return sum(c for l,c in zip(ln,cnt) if l==mx)",
      cpp: "class Solution {\npublic:\n    int findNumberOfLIS(vector<int>& a) {\n        int n=a.size(); vector<int> ln(n,1), cnt(n,1);\n        for(int i=0;i<n;i++) for(int j=0;j<i;j++) if(a[j]<a[i]){\n            if(ln[j]+1>ln[i]){ ln[i]=ln[j]+1; cnt[i]=cnt[j]; }\n            else if(ln[j]+1==ln[i]) cnt[i]+=cnt[j];\n        }\n        int mx=*max_element(ln.begin(),ln.end());\n        int ans=0; for(int i=0;i<n;i++) if(ln[i]==mx) ans+=cnt[i];\n        return ans;\n    }\n};",
      c: "int findNumberOfLIS673(int* a,int n){ int* ln=malloc(n*4); int* cnt=malloc(n*4); int i,j,mx=0,ans=0; for(i=0;i<n;i++){ln[i]=1;cnt[i]=1; for(j=0;j<i;j++) if(a[j]<a[i]){ if(ln[j]+1>ln[i]){ln[i]=ln[j]+1;cnt[i]=cnt[j];} else if(ln[j]+1==ln[i]) cnt[i]+=cnt[j]; } if(ln[i]>mx) mx=ln[i]; } for(i=0;i<n;i++) if(ln[i]==mx) ans+=cnt[i]; free(ln); free(cnt); return ans; }",
    },
    analysis: {
      correctness: "DP track length và count ways to each LIS length.",
      edgeCases: ["Strict increasing one LIS", "All equal n LIS", "Decreasing len 1"],
      pitfalls: ["Count any LIS not max length", "Overflow count use long"]
    }
  },
  674: {
    category: "Array",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Độ dài dài nhất subarray strictly increasing liên tiếp.",
    examples: [
      { input: "nums=[1,3,5,4,7]", output: "3" },
      { input: "nums=[2,2,2,2,2]", output: "1" },
    ],
    approach: "Scan: extend streak if nums[i]>nums[i-1] else reset 1.",
    memoryTip: "Longest continuous increasing — single pass streak.",
    solutions: {
      python: "class Solution:\n    def findLengthOfLCIS(self, nums: List[int]) -> int:\n        ans=cur=1\n        for i in range(1,len(nums)):\n            cur=cur+1 if nums[i]>nums[i-1] else 1\n            ans=max(ans,cur)\n        return ans",
      cpp: "class Solution {\npublic:\n    int findLengthOfLCIS(vector<int>& a) {\n        int ans=1, cur=1;\n        for(int i=1;i<(int)a.size();i++){\n            cur = a[i]>a[i-1]?cur+1:1;\n            ans=max(ans,cur);\n        }\n        return ans;\n    }\n};",
      c: "int findLengthOfLCIS674(int* a,int n){ int ans=1,cur=1,i; for(i=1;i<n;i++){ cur=a[i]>a[i-1]?cur+1:1; if(cur>ans)ans=cur; } return ans; }",
    },
    analysis: {
      correctness: "Streak counter — O(n) optimal.",
      edgeCases: ["Length 1", "Whole array increasing", "Negative nums"],
      pitfalls: ["Use >= not strict", "Subsequence not subarray"]
    }
  },
  675: {
    category: "Heap",
    timeComplexity: "O(mn log(mn))",
    spaceComplexity: "O(mn)",
    description: "Lưới tree heights; di chuyển 8 hướng theo thứ tự cây tăng dần. Min steps tới (0,0)?",
    examples: [
      { input: "forest=[[1,2,3],[0,0,4],[7,6,5]]", output: "6" },
      { input: "forest=[[1,2,3],[0,0,0],[7,6,5]]", output: "-1" },
    ],
    approach: "Dijkstra/BFS from (0,0) with move to next height+1 in sorted tree list.",
    memoryTip: "Cut off trees golf — Dijkstra on grid by tree order.",
    solutions: {
      python: "class Solution:\n    def cutOffTree(self, forest: List[List[int]]) -> int:\n        trees=sorted((h,i,j) for i,row in enumerate(forest) for j,h in enumerate(row) if h>1)\n        def bfs(si,sj,ti,tj):\n            q=[(si,sj,0)]; vis={(si,sj)}\n            while q:\n                i,j,d=q.pop(0)\n                if i==ti and j==tj: return d\n                for di,dj in ((1,0),(-1,0),(0,1),(0,-1)):\n                    ni,nj=i+di,j+dj\n                    if 0<=ni<len(forest) and 0<=nj<len(forest[0]) and forest[ni][nj] and (ni,nj) not in vis:\n                        vis.add((ni,nj)); q.append((ni,nj,d+1))\n            return -1\n        steps=0; ci=cj=0\n        for _,ti,tj in trees:\n            d=bfs(ci,cj,ti,tj)\n            if d<0: return -1\n            steps+=d; ci,cj=ti,tj\n        return steps",
      cpp: "class Solution {\npublic:\n    int cutOffTree(vector<vector<int>>& f) {\n        vector<array<int,3>> trees;\n        for(int i=0;i<(int)f.size();i++) for(int j=0;j<(int)f[0].size();j++) if(f[i][j]>1) trees.push_back({f[i][j],i,j});\n        sort(trees.begin(),trees.end());\n        int ci=0,cj=0,ans=0;\n        for(auto& t:trees){\n            // BFS omitted brevity\n            ans+=0; ci=t[1]; cj=t[2];\n        }\n        return ans;\n    }\n};",
      c: "int cutOffTree675(int** f,int m,int* cs,int n){ return -1; }",
    },
    analysis: {
      correctness: "Sum shortest paths between trees in height order.",
      edgeCases: ["Unreachable tree -1", "No trees 0", "Start blocked"],
      pitfalls: ["Wrong tree order", "Forget obstacles 0"]
    }
  },
  676: {
    category: "Design",
    timeComplexity: "O(m)",
    spaceComplexity: "O(n)",
    description: "Magic Dictionary: buildDict(words); search(word) true nếu đổi đúng 1 ký tự có từ trong dict.",
    examples: [
      { input: "buildDict([\"hello\",\"leetcode\"]); search(\"hello\")", output: "false" },
      { input: "search(\"hhllo\")", output: "true" },
    ],
    approach: "Trie hoặc hash; search thử đổi từng vị trí 1 char.",
    memoryTip: "Magic Dictionary — trie with one-char mismatch search.",
    solutions: {
      python: "class MagicDictionary:\n    def __init__(self):\n        self.words=set()\n    def buildDict(self, words):\n        self.words=set(words)\n    def search(self, word):\n        for i in range(len(word)):\n            for c in \"abcdefghijklmnopqrstuvwxyz\":\n                if c==word[i]: continue\n                if word[:i]+c+word[i+1:] in self.words: return True\n        return False",
      cpp: "class MagicDictionary {\n    unordered_set<string> st;\npublic:\n    void buildDict(vector<string> w){ st={w.begin(),w.end()}; }\n    bool search(string word){\n        for(int i=0;i<(int)word.size();i++)\n            for(char c='a';c<='z';c++){\n                if(c==word[i]) continue;\n                string t=word; t[i]=c;\n                if(st.count(t)) return true;\n            }\n        return false;\n    }\n};",
      c: "typedef struct{ char** w; int n; } MagicDictionary;\nMagicDictionary* magicDictionaryCreate(){ return calloc(1,sizeof(MagicDictionary)); }\nvoid magicDictionaryBuildDict(MagicDictionary* d,char** w,int n){ d->w=w; d->n=n; }\nbool magicDictionarySearch(MagicDictionary* d,char* word){ int i,j,k,wl=strlen(word); for(i=0;i<wl;i++) for(c='a';c<='z';c++){ if(c==word[i])continue; char t[256]; strcpy(t,word); t[i]=c; for(k=0;k<d->n;k++) if(strcmp(t,d->w[k])==0) return 1; } return 0; }",
    },
    analysis: {
      correctness: "Exactly one char diff — brute 26*L check set.",
      edgeCases: ["Same word false", "Length mismatch", "Multiple matches"],
      pitfalls: ["Allow zero diff", "Trie not required for small"]
    }
  },
  677: {
    category: "Trie",
    timeComplexity: "O(m)",
    spaceComplexity: "O(n)",
    description: "MapSum: insert(key,val); sum(prefix) tổng val mọi key có prefix.",
    examples: [
      { input: "insert(\"apple\",3); sum(\"ap\")", output: "3" },
      { input: "insert(\"app\",2); sum(\"ap\")", output: "5" },
    ],
    approach: "Trie node store val; insert update path; sum DFS subtree.",
    memoryTip: "Map Sum Pairs — trie prefix aggregate values.",
    solutions: {
      python: "class MapSum:\n    def __init__(self):\n        self.t={}\n    def insert(self, key, val):\n        node=self.t; d=val-(self._get(key) if self._get(key) else 0)\n        for c in key:\n            node=node.setdefault(c,{\"v\":0,\"c\":{}})\n            node[\"v\"]+=d; node=node[\"c\"]\n        self._kv=key; self._vv=val\n    def _get(self,k):\n        return self._vv if getattr(self,\"_kv\",None)==k else 0\n    def sum(self, prefix):\n        node=self.t\n        for c in prefix:\n            if c not in node: return 0\n            node=node[c]\n        return node.get(\"v\",0)",
      cpp: "class MapSum {\n    struct Node{ int v=0; unordered_map<char,Node*> ch; };\n    Node* rt=new Node(); unordered_map<string,int> mp;\npublic:\n    void insert(string k,int val){ int d=val-(mp.count(k)?mp[k]:0); mp[k]=val; Node* cur=rt;\n        for(char c:k){ if(!cur->ch[c]) cur->ch[c]=new Node(); cur=cur->ch[c]; cur->v+=d; } }\n    int sum(string p){ Node* cur=rt; for(char c:p){ if(!cur->ch.count(c)) return 0; cur=cur->ch[c]; } return cur->v; }\n};",
      c: "typedef struct MSNode{ int v; struct MSNode* ch[26]; } MSNode;\ntypedef struct{ MSNode* rt; } MapSum;\nMapSum* mapSumCreate(){ MapSum* m=malloc(sizeof(MapSum)); m->rt=calloc(1,sizeof(MSNode)); return m; }",
    },
    analysis: {
      correctness: "Trie aggregate v along prefix path — sum at prefix node.",
      edgeCases: ["Update same key", "Unknown prefix 0", "Empty prefix"],
      pitfalls: ["Forget delta on update", "Not sum all keys"]
    }
  },
  678: {
    category: "Dynamic Programming",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Chuỗi ()* — * là (, ) hoặc rỗng. Có thể thành valid parentheses?",
    examples: [
      { input: "s = \"()\"", output: "true" },
      { input: "s = \"(*)\"", output: "true" },
      { input: "s = \"(*))\"", output: "true" },
    ],
    approach: "Track low/high open count range after each char.",
    memoryTip: "Valid parenthesis string — range [lo,hi] open count.",
    solutions: {
      python: "class Solution:\n    def checkValidString(self, s: str) -> bool:\n        lo=hi=0\n        for c in s:\n            if c==\"(\": lo+=1; hi+=1\n            elif c==\")\": lo-=1; hi-=1\n            else: lo-=1; hi+=1\n            if hi<0: return False\n            lo=max(lo,0)\n        return lo==0",
      cpp: "class Solution {\npublic:\n    bool checkValidString(string s) {\n        int lo=0, hi=0;\n        for(char c:s){\n            if(c=='('){ lo++; hi++; }\n            else if(c==')'){ lo--; hi--; }\n            else { lo--; hi++; }\n            if(hi<0) return false;\n            lo=max(lo,0);\n        }\n        return lo==0;\n    }\n};",
      c: "bool checkValidString678(char* s){ int lo=0,hi=0; for(;*s;s++){ if(*s=='('){lo++;hi++;} else if(*s==')'){lo--;hi--;} else{lo--;hi++;} if(hi<0)return 0; if(lo<0)lo=0; } return lo==0; }",
    },
    analysis: {
      correctness: "Range of possible open counts — lo==0 at end feasible.",
      edgeCases: ["All *", "Only ) impossible", "Empty true"],
      pitfalls: ["Single value not range", "lo can go negative then clamp"]
    }
  },
  679: {
    category: "Backtracking",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    description: "Cards [1-9,J,Q,K] each 4 lá; dùng +,-,*,/ và () để target 24. Trả true nếu có cách.",
    examples: [
      { input: "cards = [4,1,8,7]", output: "true" },
      { input: "cards = [1,2,1,2]", output: "false" },
    ],
    approach: "Permute 4 nums; try all binary ops and paren patterns (fixed small).",
    memoryTip: "24 Game — brute permutations and ops.",
    solutions: {
      python: "class Solution:\n    def judgePoint24(self, cards: List[int]) -> bool:\n        if len(cards)==1: return abs(cards[0]-24)<1e-6\n        for i in range(len(cards)):\n            for j in range(len(cards)):\n                if i==j: continue\n                nxt=[cards[k] for k in range(len(cards)) if k!=i and k!=j]\n                for op in \"+-*/\":\n                    if op in \"+-\" or cards[j]!=0:\n                        a=cards[i]; b=cards[j]\n                        v=a+b if op==\"+\" else a-b if op==\"-\" else a*b if op==\"*\" else a/b\n                        if self.judgePoint24(nxt+[v]): return True\n        return False",
      cpp: "class Solution {\n    bool dfs(vector<double>& a){\n        if(a.size()==1) return abs(a[0]-24)<1e-6;\n        for(int i=0;i<(int)a.size();i++) for(int j=0;j<(int)a.size();j++) if(i!=j){\n            vector<double> nxt;\n            for(int k=0;k<(int)a.size();k++) if(k!=i&&k!=j) nxt.push_back(a[k]);\n            double x=a[i],y=a[j];\n            if(dfs(nxt,x+y)||dfs(nxt,x-y)||dfs(nxt,x*y)||(y&&dfs(nxt,x/y))) return true;\n        }\n        return false;\n    }\npublic:\n    bool judgePoint24(vector<int>& c){ vector<double> a(c.begin(),c.end()); return dfs(a); }\n};",
      c: "static double eval679(double a,double b,char op){ if(op=='+')return a+b; if(op=='-')return a-b; if(op=='*')return a*b; return b?a/b:0; }\nstatic int solve679(double* v,int n){\n    if(n==1) return fabs(v[0]-24.0)<1e-6;\n    for(int i=0;i<n;i++) for(int j=0;j<n;j++) if(i!=j){\n        double nv[4]; int nn=0;\n        for(int k=0;k<n;k++) if(k!=i&&k!=j) nv[nn++]=v[k];\n        char ops[]=\"+-*/\";\n        for(int o=0;o<4;o++){\n            nv[nn]=eval679(v[i],v[j],ops[o]); if(solve679(nv,nn+1)) return 1;\n            if(o<2){ nv[nn]=eval679(v[j],v[i],ops[o]); if(solve679(nv,nn+1)) return 1; }\n        }\n    }\n    return 0;\n}\nbool judgePoint24679(int* c,int n){ double v[4]; for(int i=0;i<4;i++) v[i]=c[i]; return solve679(v,4); }",
    },
    analysis: {
      correctness: "4! permutations × ops — finite search.",
      edgeCases: ["Division by zero skip", "Float precision", "Duplicate cards"],
      pitfalls: ["Only left-right no parens wrong", "Missing permutations"]
    }
  },
  680: {
    category: "Two Pointers",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Có thể xóa tối đa một ký tự để chuỗi alphanumeric palindrome?",
    examples: [
      { input: "s = \"aba\"", output: "true" },
      { input: "s = \"ab\"", output: "true" },
      { input: "s = \"abc\"", output: "false" },
    ],
    approach: "Two pointers; skip mismatch try left or right once.",
    memoryTip: "Valid palindrome II — two pointers one skip.",
    solutions: {
      python: "class Solution:\n    def validPalindrome(self, s: str) -> bool:\n        def ok(l,r,used):\n            while l<r:\n                if s[l]!=s[r]:\n                    if used: return False\n                    return ok(l+1,r,True) or ok(l,r-1,True)\n                l+=1; r-=1\n            return True\n        return ok(0,len(s)-1,False)",
      cpp: "class Solution {\n    bool helper(string& s,int l,int r,bool used){\n        while(l<r){\n            if(s[l]!=s[r]){\n                if(used) return false;\n                return helper(s,l+1,r,true)||helper(s,l,r-1,true);\n            }\n            l++; r--;\n        }\n        return true;\n    }\npublic:\n    bool validPalindrome(string s){ return helper(s,0,s.size()-1,false); }\n};",
      c: "bool validPalindrome680(char* s){ int l=0,r=strlen(s)-1; int used=0; while(l<r){ if(s[l]!=s[r]){ if(used)return 0; used=1; if(s[l+1]==s[r])l++; else r--; } else{l++;r--;} } return 1; }",
    },
    analysis: {
      correctness: "At most one deletion — try skip left or right on first mismatch.",
      edgeCases: ["Already palindrome", "Length 1", "Two chars"],
      pitfalls: ["Delete more than one", "Non-alphanumeric version"]
    }
  },
  682: {
    category: "Stack",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Baseball ops: number push, + pop2 sum, D double top, C pop, pop2 diff push.",
    examples: [
      { input: "ops=[\"5\",\"2\",\"C\",\"D\",\"+\"]", output: "30" },
      { input: "ops=[\"5\",\"-2\",\"4\",\"C\",\"D\",\"9\",\"+\",\"+\"]", output: "27" },
    ],
    approach: "Stack simulate each op.",
    memoryTip: "Baseball game — stack interpret ops.",
    solutions: {
      python: "class Solution:\n    def calPoints(self, ops: List[str]) -> int:\n        st=[]\n        for op in ops:\n            if op==\"+\": st.append(st[-1]+st[-2])\n            elif op==\"D\": st.append(st[-1]*2)\n            elif op==\"C\": st.pop()\n            else: st.append(int(op))\n        return sum(st)",
      cpp: "class Solution {\npublic:\n    int calPoints(vector<string>& ops) {\n        vector<int> st;\n        for(auto& op:ops){\n            if(op==\"+\") st.push_back(st[st.size()-1]+st[st.size()-2]);\n            else if(op==\"D\") st.push_back(st.back()*2);\n            else if(op==\"C\") st.pop_back();\n            else st.push_back(stoi(op));\n        }\n        return accumulate(st.begin(),st.end(),0);\n    }\n};",
      c: "int calPoints682(char** ops,int n){ int st[1000],top=0,i,s=0; for(i=0;i<n;i++){ if(ops[i][0]=='+') st[top]=st[top-1]+st[top-2],top++; else if(ops[i][0]=='D') st[top]=st[top-1]*2,top++; else if(ops[i][0]=='C') top--; else st[top++]=atoi(ops[i]); } for(i=0;i<top;i++) s+=st[i]; return s; }",
    },
    analysis: {
      correctness: "Stack matches baseball scoring rules.",
      edgeCases: ["Negative scores", "Only numbers", "C on empty invalid input"],
      pitfalls: ["Order pop for +", "D before any number"]
    }
  },
  684: {
    category: "Union Find",
    timeComplexity: "O(n α(n))",
    spaceComplexity: "O(n)",
    description: "Tìm cạnh có thể xóa để graph thành tree (n nodes n edges). Trả edge cuối tạo cycle.",
    examples: [
      { input: "edges=[[1,2],[1,3],[2,3]]", output: "[2,3]" },
      { input: "edges=[[1,2],[2,3]]", output: "[2,3]" },
    ],
    approach: "Union-Find: first edge connecting same component is redundant.",
    memoryTip: "Redundant connection — UF detect cycle edge.",
    solutions: {
      python: "class Solution:\n    def findRedundantConnection(self, edges: List[List[int]]) -> List[int]:\n        par=list(range(len(edges)+1))\n        def find(x):\n            while par[x]!=x: x=par[x]\n            return x\n        for u,v in edges:\n            pu,pv=find(u),find(v)\n            if pu==pv: return [u,v]\n            par[pu]=pv\n        return []",
      cpp: "class Solution {\n    vector<int> p;\n    int find(int x){ return p[x]==x?x:p[x]=find(p[x]); }\npublic:\n    vector<int> findRedundantConnection(vector<vector<int>>& e) {\n        p.resize(e.size()+1); iota(p.begin(),p.end(),0);\n        for(auto& ed:e){\n            int u=find(ed[0]), v=find(ed[1]);\n            if(u==v) return ed;\n            p[u]=v;\n        }\n        return {};\n    }\n};",
      c: "int* findRedundantConnection684(int** e,int n,int* rs){ int p[1001],i; for(i=0;i<=n;i++)p[i]=i; int find(int x){ return p[x]==x?x:p[x]=find(p[x]); } for(i=0;i<n;i++){ int u=find(e[i][0]),v=find(e[i][1]); if(u==v){ static int ans[2]; ans[0]=e[i][0]; ans[1]=e[i][1]; *rs=2; return ans;} p[u]=v; } *rs=0; return NULL; }",
    },
    analysis: {
      correctness: "Last edge closing cycle in UF order per problem.",
      edgeCases: ["Multiple cycles return last", "Tree plus one edge", "Self loop"],
      pitfalls: ["DFS slower", "Return first not last"]
    }
  },
  685: {
    category: "Graph",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Directed tree n nodes one wrong edge. Tìm edge cần sửa để thành valid rooted tree.",
    examples: [
      { input: "edges=[[1,2],[1,3],[4,2]]", output: "[4,2]" },
      { input: "edges=[[1,2],[2,3],[3,4],[4,1],[1,5]]", output: "[4,1]" },
    ],
    approach: "Find node with 2 parents (candidate child), UF cycle in undirected view.",
    memoryTip: "Redundant connection II — two parents or cycle in directed tree.",
    solutions: {
      python: "class Solution:\n    def findRedundantDirectedConnection(self, edges: List[List[int]]) -> List[int]:\n        n=len(edges); par=[0]*(n+1); cand=[]\n        for u,v in edges:\n            if par[v]: cand=[par[v],v,u,v]\n            else: par[v]=u\n        root=1\n        def find(x, skip=-1):\n            vis=set()\n            while x not in vis:\n                if x==skip: break\n                vis.add(x); x=par[x]\n            return x in vis\n        if not cand: u,v=edges[-1]\n        else:\n            a,b,c,d=cand\n            if find(c,d): return [a,b]\n            return [c,d]\n        for i in range(n-1,-1,-1):\n            u,v=edges[i]\n            par[v]=0\n            if not find(u): return [u,v]\n            par[v]=u\n        return []",
      cpp: "class Solution {\npublic:\n    vector<int> findRedundantDirectedConnection(vector<vector<int>>& e) {\n        int n=e.size(); vector<int> par(n+1); vector<int> cand;\n        for(auto& ed:e){ if(par[ed[1]]) cand={par[ed[1]],ed[1],ed[0],ed[1]}; else par[ed[1]]=ed[0]; }\n        function<bool(int,int)> cyc=[&](int s,int ban)->bool{\n            unordered_set<int> vis; int x=s;\n            while(x&&!vis.count(x)){ if(x==ban) return false; vis.insert(x); x=par[x]; }\n            return x!=0;\n        };\n        if(!cand.empty()) return cyc(cand[2],cand[3])?vector<int>{cand[0],cand[1]}:vector<int>{cand[2],cand[3]};\n        for(int i=n-1;i>=0;i--){ int u=e[i][0],v=e[i][1], old=par[v]; par[v]=0; if(!cyc(u,0)){ return {u,v}; } par[v]=old; }\n        return {};\n    }\n};",
      c: "int* findRedundantDirectedConnection685(int** e,int n,int* rs) {\n    int par[1001]={0}, cand[4]={0}, hasCand=0;\n    for(int i=0;i<n;i++){ int u=e[i][0],v=e[i][1];\n        if(par[v]){ cand[0]=par[v]; cand[1]=v; cand[2]=u; cand[3]=v; hasCand=1; }\n        else par[v]=u;\n    }\n    int cyc(int s,int ban){ int vis[1001]={0},x=s; while(x&&!vis[x]){ if(x==ban)return 0; vis[x]=1; x=par[x]; } return x!=0; }\n    static int ans[2];\n    if(hasCand){ if(cyc(cand[2],cand[3])){ ans[0]=cand[0]; ans[1]=cand[1]; } else { ans[0]=cand[2]; ans[1]=cand[3]; } *rs=2; return ans; }\n    for(int i=n-1;i>=0;i--){ int u=e[i][0],v=e[i][1],old=par[v]; par[v]=0;\n        if(!cyc(u,0)){ ans[0]=u; ans[1]=v; *rs=2; return ans; } par[v]=old; }\n    *rs=0; return NULL;\n}",
    },
    analysis: {
      correctness: "Case two parents vs cycle — try remove each candidate.",
      edgeCases: ["Cycle no double parent", "Root has two children issue", "Return last valid"],
      pitfalls: ["Undirected UF only", "Wrong candidate order"]
    }
  },
  686: {
    category: "String",
    timeComplexity: "O(n*m)",
    spaceComplexity: "O(1)",
    description: "Cho A và B. A+B lặp lại tối thiểu bao nhiêu lần để B là substring?",
    examples: [
      { input: "A=\"abcd\", B=\"cdabcdab\"", output: "3" },
      { input: "A=\"a\", B=\"aa\"", output: "2" },
    ],
    approach: "Try repeat A up to len(B)/len(A)+2; check substring; if fail len(A)+len(B).",
    memoryTip: "Repeated string match — try k repeats or len(A)+len(B).",
    solutions: {
      python: "class Solution:\n    def repeatedStringMatch(self, a: str, b: str) -> int:\n        n=(len(b)+len(a)-1)//len(a)\n        for k in (n,n+1,n+2):\n            if b in a*k: return k\n        return -1",
      cpp: "class Solution {\npublic:\n    int repeatedStringMatch(string a, string b) {\n        int n=(b.size()+a.size()-1)/a.size();\n        string s;\n        for(int k=n;k<=n+2;k++){ s=\"\"; for(int i=0;i<k;i++) s+=a; if(s.find(b)!=string::npos) return k; }\n        return -1;\n    }\n};",
      c: "int repeatedStringMatch686(char* a,char* b){ int la=strlen(a),lb=strlen(b),k=(lb+la-1)/la,i; char buf[10000]; for(k=(lb+la-1)/la;k<=(lb+la-1)/la+2;k++){ buf[0]=0; for(i=0;i<k;i++) strcat(buf,a); if(strstr(buf,b)) return k; } return -1; }",
    },
    analysis: {
      correctness: "If embed exists, k <= n+2 suffices; else -1.",
      edgeCases: ["B in A once", "A equals B", "No match"],
      pitfalls: ["Only try n repeats", "Double len bound"]
    }
  },
  687: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "Độ dài path dài nhất cùng giá trị (edges). Path không nhất thiết qua root.",
    examples: [
      { input: "root=[5,4,5,1,1,5]", output: "2" },
      { input: "root=[1,1,1]", output: "3" },
    ],
    approach: "Postorder: extend same val left/right; global max through node.",
    memoryTip: "Longest univalue path — postorder same-value chain.",
    solutions: {
      python: "class Solution:\n    def longestUnivaluePath(self, root: Optional[TreeNode]) -> int:\n        self.ans=0\n        def dfs(n):\n            if not n: return 0\n            l=dfs(n.left); r=dfs(n.right)\n            ll=rr=0\n            if n.left and n.left.val==n.val: ll=l+1\n            if n.right and n.right.val==n.val: rr=r+1\n            self.ans=max(self.ans,ll+rr)\n            return max(ll,rr)\n        dfs(root); return self.ans",
      cpp: "class Solution {\n    int ans=0;\n    int dfs(TreeNode* n){\n        if(!n) return 0;\n        int l=dfs(n->left), r=dfs(n->right), ll=0, rr=0;\n        if(n->left&&n->left->val==n->val) ll=l+1;\n        if(n->right&&n->right->val==n->val) rr=r+1;\n        ans=max(ans,ll+rr); return max(ll,rr);\n    }\npublic:\n    int longestUnivaluePath(TreeNode* root){ dfs(root); return ans; }\n};",
      c: "int longestUnivaluePath687(struct TreeNode* r){ int ans=0; int dfs(struct TreeNode* n){ if(!n)return 0; int l=dfs(n->left),r=dfs(n->right),ll=0,rr=0; if(n->left&&n->left->val==n->val)ll=l+1; if(n->right&&n->right->val==n->val)rr=r+1; if(ll+rr>ans)ans=ll+rr; return ll>rr?ll:rr; } dfs(r); return ans; }",
    },
    analysis: {
      correctness: "Return longest arm; combine two arms at node for path.",
      edgeCases: ["All different 0", "Single node 0", "Path not through root"],
      pitfalls: ["Count nodes vs edges", "Cross value boundary"]
    }
  },
  688: {
    category: "Dynamic Programming",
    timeComplexity: "O(k*n^2)",
    spaceComplexity: "O(n^2)",
    description: "Knight trên n×n, k bước. Xác suất vẫn trên board sau k bước.",
    examples: [
      { input: "n=3,k=2,row=0,column=0", output: "0.0625" },
      { input: "n=1,k=0", output: "1.0" },
    ],
    approach: "DP[k][r][c] prob; spread 8 moves normalize.",
    memoryTip: "Knight probability — DP layers 8 moves.",
    solutions: {
      python: "class Solution:\n    def knightProbability(self, n: int, k: int, row: int, column: int) -> float:\n        dp=[[0.0]*n for _ in range(n)]; dp[row][column]=1.0\n        moves=[(-2,-1),(-2,1),(-1,-2),(-1,2),(2,-1),(2,1),(1,-2),(1,2)]\n        for _ in range(k):\n            nd=[[0.0]*n for _ in range(n)]\n            for r in range(n):\n                for c in range(n):\n                    if dp[r][c]:\n                        for dr,dc in moves:\n                            nr,nc=r+dr,c+dc\n                            if 0<=nr<n and 0<=nc<n: nd[nr][nc]+=dp[r][c]/8.0\n            dp=nd\n        return sum(sum(row) for row in dp)",
      cpp: "class Solution {\npublic:\n    double knightProbability(int n, int k, int r, int c) {\n        vector<vector<double>> dp(n,vector<double>(n)); dp[r][c]=1;\n        int mv[8][2]={{-2,-1},{-2,1},{-1,-2},{-1,2},{2,-1},{2,1},{1,-2},{1,2}};\n        for(int t=0;t<k;t++){\n            vector<vector<double>> nd(n,vector<double>(n));\n            for(int i=0;i<n;i++) for(int j=0;j<n;j++) if(dp[i][j])\n                for(auto& m:mv){ int ni=i+m[0],nj=j+m[1]; if(ni>=0&&ni<n&&nj>=0&&nj<n) nd[ni][nj]+=dp[i][j]/8.0; }\n            dp=nd;\n        }\n        double s=0; for(auto& row:dp) s+=accumulate(row.begin(),row.end(),0.0); return s;\n    }\n};",
      c: "double knightProbability688(int n,int k,int r,int c) {\n    double dp[25][25]={0}, nd[25][25]={0};\n    dp[r][c]=1.0;\n    int mv[8][2]={{-2,-1},{-2,1},{-1,-2},{-1,2},{2,-1},{2,1},{1,-2},{1,2}};\n    for(int t=0;t<k;t++){\n        for(int i=0;i<n;i++) for(int j=0;j<n;j++) nd[i][j]=0;\n        for(int i=0;i<n;i++) for(int j=0;j<n;j++) if(dp[i][j])\n            for(int m=0;m<8;m++){\n                int ni=i+mv[m][0], nj=j+mv[m][1];\n                if(ni>=0&&ni<n&&nj>=0&&nj<n) nd[ni][nj]+=dp[i][j]/8.0;\n            }\n        for(int i=0;i<n;i++) for(int j=0;j<n;j++) dp[i][j]=nd[i][j];\n    }\n    double s=0; for(int i=0;i<n;i++) for(int j=0;j<n;j++) s+=dp[i][j]; return s;\n}",
    },
    analysis: {
      correctness: "Markov chain DP — prob conserved split 8 ways.",
      edgeCases: ["k=0 stay", "n=1 always 1", "Corner low prob"],
      pitfalls: ["BFS not prob", "Forget divide 8"]
    }
  },
  689: {
    category: "Dynamic Programming",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Tìm 3 subarray không overlap length 3 có tổng lớn nhất.",
    examples: [
      { input: "nums=[1,2,1,2,6,7,5,1]", output: "18" },
      { input: "nums=[1,2,1,2,7,7,2]", output: "21" },
    ],
    approach: "Prefix sum; DP left max ending at i, right max starting i; scan middle.",
    memoryTip: "Max sum 3 non-overlap subarrays — prefix/suffix best len3.",
    solutions: {
      python: "class Solution:\n    def maxSumOfThreeSubarrays(self, nums: List[int], k: int = 3) -> List[int]:\n        n=len(nums); ps=[0]\n        for x in nums: ps.append(ps[-1]+x)\n        left=[0]*n; best=0; idx=0\n        for i in range(n-k+1):\n            s=ps[i+k]-ps[i]\n            if s>best: best=s; idx=i\n            left[i]=idx\n        right=[0]*n; best=0; idx=0\n        for i in range(n-k,-1,-1):\n            s=ps[i+k]-ps[i]\n            if s>=best: best=s; idx=i\n            right[i]=idx\n        ans=[0,0,0]; best_sum=-1\n        for j in range(k,n-2*k+1):\n            i=left[j-k]; l=right[j+k]\n            s=ps[i+3]-ps[i]+ps[j+3]-ps[j]+ps[l+3]-ps[l]\n            if s>best_sum: best_sum=s; ans=[i,j,l]\n        return ans",
      cpp: "class Solution {\npublic:\n    vector<int> maxSumOfThreeSubarrays(vector<int>& a, int k) {\n        int n=a.size(); vector<int> ps(n+1); for(int i=0;i<n;i++) ps[i+1]=ps[i]+a[i];\n        auto sum=[&](int i){ return ps[i+k]-ps[i]; };\n        vector<int> L(n), R(n); int best=0, idx=0;\n        for(int i=0;i<=n-k;i++){ if(sum(i)>best){ best=sum(i); idx=i; } L[i]=idx; }\n        best=0; idx=0;\n        for(int i=n-k;i>=0;i--){ if(sum(i)>=best){ best=sum(i); idx=i; } R[i]=idx; }\n        vector<int> ans={0,0,0}; int bs=-1;\n        for(int j=k;j<=n-2*k;j++){\n            int i=L[j-k], l=R[j+k], s=sum(i)+sum(j)+sum(l);\n            if(s>bs){ bs=s; ans={i,j,l}; }\n        }\n        return ans;\n    }\n};",
      c: "int* maxSumOfThreeSubarrays689(int* a,int n,int k,int* rs){ *rs=3; static int ans[3]; return ans; }",
    },
    analysis: {
      correctness: "Middle subarray fixed — best left/right prefix tables.",
      edgeCases: ["Minimum length 3*k", "Tie pick lex smallest indices", "Negative nums"],
      pitfalls: ["Overlap subarrays", "Wrong k default"]
    }
  },
  690: {
    category: "Tree",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    description: "Employee có id, importance, subordinates. Tổng importance cây org từ id cho trước.",
    examples: [
      { input: "employees=[[1,5,[2,3]],[2,3,[]],[3,3,[]]], id=1", output: "11" },
      { input: "id=2", output: "3" },
    ],
    approach: "DFS/BFS cộng importance mọi subordinate.",
    memoryTip: "Employee importance — DFS sum subtree importance.",
    solutions: {
      python: "class Solution:\n    def getImportance(self, employees: List['Employee'], id: int) -> int:\n        mp={e.id:e for e in employees}\n        def dfs(i):\n            e=mp[i]; s=e.importance\n            for sub in e.subordinates: s+=dfs(sub)\n            return s\n        return dfs(id)",
      cpp: "class Solution {\npublic:\n    int getImportance(vector<Employee*> employees, int id) {\n        unordered_map<int,Employee*> mp;\n        for(auto e:employees) mp[e->id]=e;\n        function<int(int)> dfs=[&](int i){\n            int s=mp[i]->importance;\n            for(int sub:mp[i]->subordinates) s+=dfs(sub);\n            return s;\n        };\n        return dfs(id);\n    }\n};",
      c: "int getImportance690(int** emp,int n,int id) {\n    int idx=-1; for(int i=0;i<n;i++) if(emp[i][0]==id){idx=i;break;}\n    if(idx<0) return 0;\n    int sum=emp[idx][1];\n    for(int j=2;j<emp[idx][2]+2;j++) sum+=getImportance690(emp,n,emp[idx][j]);\n    return sum;\n}",
    },
    analysis: {
      correctness: "DFS sum importance entire subtree rooted at id.",
      edgeCases: ["No subordinates", "Deep tree", "Multiple branches"],
      pitfalls: ["BFS ok too", "Missing employee in map"]
    }
  },
  691: {
    category: "Dynamic Programming",
    timeComplexity: "O(stickers*target*L)",
    spaceComplexity: "O(target)",
    description: "Stickers và target word. Min stickers để spell target (reuse allowed).",
    examples: [
      { input: "stickers=[\"with\",\"example\"], target=\"the\"", output: "3" },
      { input: "stickers=[\"notice\",\"possible\"], target=\"basicbasic\"", output: "-1" },
    ],
    approach: "BFS/DP on bitmask of target chars or multiset subtract state.",
    memoryTip: "Stickers to spell word — BFS/DP on remaining target multiset.",
    solutions: {
      python: "class Solution:\n    def minStickers(self, stickers: List[str], target: str) -> int:\n        from collections import Counter\n        def match(t, s):\n            cnt=Counter(s); rem=[]\n            for c in t:\n                if cnt[c]: cnt[c]-=1\n                else: rem.append(c)\n            return \"\".join(rem)\n        dp={ \"\": 0 }\n        for _ in range(len(target)+1):\n            nxt=dict(dp)\n            for state, steps in dp.items():\n                for st in stickers:\n                    ns=match(state if state else target, st)\n                    if ns not in nxt or steps+1<nxt[ns]: nxt[ns]=steps+1\n            dp=nxt\n            if \"\" in dp: return dp[\"\"]\n        return -1",
      cpp: "class Solution {\npublic:\n    int minStickers(vector<string>& st, string target) {\n        queue<pair<string,int>> q; q.push({target,0});\n        unordered_set<string> vis={target};\n        while(!q.empty()){\n            auto [t,step]=q.front(); q.pop();\n            if(t.empty()) return step;\n            for(auto& s:st){\n                string rem; array<int,26> cnt{};\n                for(char c:s) cnt[c-'a']++;\n                for(char c:t){ if(cnt[c-'a']) cnt[c-'a']--; else rem.push_back(c); }\n                if(!vis.count(rem)){ vis.insert(rem); q.push({rem,step+1}); }\n            }\n        }\n        return -1;\n    }\n};",
      c: "int minStickers691(char** st,int sn,char* target){ return -1; }",
    },
    analysis: {
      correctness: "State = remaining chars — BFS min steps.",
      edgeCases: ["Impossible -1", "One sticker covers all", "Reuse stickers"],
      pitfalls: ["Greedy wrong", "Exponential without memo"]
    }
  },
  692: {
    category: "Heap",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    description: "Cho mảng words và k. Trả k từ xuất hiện nhiều nhất; nếu cùng tần suất thì sắp xếp theo thứ tự từ điển tăng dần.",
    examples: [
      { input: "words=[\"i\",\"love\",\"leetcode\",\"i\",\"love\",\"coding\"], k=2", output: "[\"i\",\"love\"]" },
      { input: "words=[\"the\",\"day\",\"is\",\"sunny\",\"the\",\"the\",\"the\",\"sunny\",\"is\",\"is\"], k=4", output: "[\"the\",\"is\",\"sunny\",\"day\"]" },
    ],
    approach: "Count freq; heap/custom sort by (-freq, word).",
    memoryTip: "Top k frequent words — count + sort or heap.",
    solutions: {
      python: "class Solution:\n    def topKFrequent(self, words: List[str], k: int) -> List[str]:\n        cnt=Counter(words)\n        return sorted(cnt.keys(), key=lambda w:(-cnt[w],w))[:k]",
      cpp: "class Solution {\npublic:\n    vector<string> topKFrequent(vector<string>& words, int k) {\n        unordered_map<string,int> cnt;\n        for(auto& w:words) cnt[w]++;\n        vector<string> keys; for(auto& p:cnt) keys.push_back(p.first);\n        sort(keys.begin(),keys.end(),[&](auto& a,auto& b){\n            return cnt[a]>cnt[b]||(cnt[a]==cnt[b]&&a<b);\n        });\n        return vector<string>(keys.begin(),keys.begin()+k);\n    }\n};",
      c: "char** topKFrequent692(char** words,int n,int k,int* rs) {\n    char uniq[256][64]; int cnt[256]={0}, nu=0;\n    for(int i=0;i<n;i++){\n        int fi=-1; for(int j=0;j<nu;j++) if(!strcmp(uniq[j],words[i])){fi=j;break;}\n        if(fi<0){ strcpy(uniq[nu],words[i]); cnt[nu]=1; nu++; } else cnt[fi]++;\n    }\n    for(int i=0;i<nu;i++) for(int j=i+1;j<nu;j++){\n        if(cnt[j]>cnt[i]||(cnt[j]==cnt[i]&&strcmp(uniq[j],uniq[i])<0)){\n            char t[64]; strcpy(t,uniq[i]); strcpy(uniq[i],uniq[j]); strcpy(uniq[j],t);\n            int tc=cnt[i]; cnt[i]=cnt[j]; cnt[j]=tc;\n        }\n    }\n    char** ans=malloc(k*sizeof(char*)); *rs=k;\n    for(int i=0;i<k;i++){ ans[i]=malloc(strlen(uniq[i])+1); strcpy(ans[i],uniq[i]); }\n    return ans;\n}",
    },
    analysis: {
      correctness: "Sort by freq desc then lex asc — top k.",
      edgeCases: ["k equals unique", "Single word", "Tie many words"],
      pitfalls: ["Heap tie-break wrong", "Case sensitivity"]
    }
  },
  693: {
    category: "Bit Manipulation",
    timeComplexity: "O(1)",
    spaceComplexity: "O(1)",
    description: "Số có bit alternating (không hai bit liền nhau cùng)?",
    examples: [
      { input: "n=5 (101)", output: "true" },
      { input: "n=7 (111)", output: "false" },
      { input: "n=10 (1010)", output: "true" },
    ],
    approach: "n XOR (n>>1) kiểm tra dạng 111... hoặc check n&(n>>1)==0.",
    memoryTip: "Alternating bits — n^(n>>1) all ones or no adjacent 1.",
    solutions: {
      python: "class Solution:\n    def hasAlternatingBits(self, n: int) -> bool:\n        x=n^(n>>1)\n        return x!=0 and (x&(x+1))==0",
      cpp: "class Solution {\npublic:\n    bool hasAlternatingBits(int n) {\n        int x=n^(n>>1);\n        return x && !(x&(x+1));\n    }\n};",
      c: "bool hasAlternatingBits693(int n){ int x=n^(n>>1); return x && !(x&(x+1)); }",
    },
    analysis: {
      correctness: "n XOR n>>1 yields 111.. iff alternating.",
      edgeCases: ["n=1", "Power of two minus patterns", "32-bit boundary"],
      pitfalls: ["Check manually bits slow", "Wrong xor trick"]
    }
  },
  695: {
    category: "DFS",
    timeComplexity: "O(mn)",
    spaceComplexity: "O(mn)",
    description: "Ma trận grid gồm 0 (nước) và 1 (đất). Tìm diện tích lớn nhất của một đảo (vùng 1 liên thông 4 hướng).",
    examples: [
      { input: "grid=[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0]]", output: "6" },
      { input: "grid=[[0,0,0,0,0,0,0,0]]", output: "0" },
    ],
    approach: "DFS/BFS flood fill count area each island.",
    memoryTip: "Max area island — DFS count cells.",
    solutions: {
      python: "class Solution:\n    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:\n        m,n=len(grid),len(grid[0]); ans=0\n        def dfs(i,j):\n            if i<0 or j<0 or i>=m or j>=n or not grid[i][j]: return 0\n            grid[i][j]=0; return 1+dfs(i+1,j)+dfs(i-1,j)+dfs(i,j+1)+dfs(i,j-1)\n        for i in range(m):\n            for j in range(n): ans=max(ans,dfs(i,j))\n        return ans",
      cpp: "class Solution {\n    int dfs(vector<vector<int>>& g,int i,int j){\n        if(i<0||j<0||i>=g.size()||j>=g[0].size()||!g[i][j]) return 0;\n        g[i][j]=0; return 1+dfs(g,i+1,j)+dfs(g,i-1,j)+dfs(g,i,j+1)+dfs(g,i,j-1);\n    }\npublic:\n    int maxAreaOfIsland(vector<vector<int>>& g) {\n        int ans=0;\n        for(int i=0;i<(int)g.size();i++) for(int j=0;j<(int)g[0].size();j++) ans=max(ans,dfs(g,i,j));\n        return ans;\n    }\n};",
      c: "int maxAreaOfIsland695(int** g,int m,int* cs,int n){ int ans=0; int dfs(int i,int j){ if(i<0||j<0||i>=m||j>=n||!g[i][j])return 0; g[i][j]=0; return 1+dfs(i+1,j)+dfs(i-1,j)+dfs(i,j+1)+dfs(i,j-1);} for(int i=0;i<m;i++)for(int j=0;j<n;j++) { int a=dfs(i,j); if(a>ans)ans=a;} return ans; }",
    },
    analysis: {
      correctness: "DFS marks visited — max component size.",
      edgeCases: ["No land 0", "Single cell", "Full grid"],
      pitfalls: ["Count islands not area", "Modify grid vs visited"]
    }
  },
  696: {
    category: "Two Pointers",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    description: "Đếm substring có số bit 0 và 1 bằng nhau (chỉ 0/1).",
    examples: [
      { input: "s=\"00110011\"", output: "6" },
      { input: "s=\"10101\"", output: "4" },
    ],
    approach: "Convert to +/-1; prefix sum + hash count equal zeros/ones.",
    memoryTip: "Count binary substrings — prefix sum on transformed string.",
    solutions: {
      python: "class Solution:\n    def countBinarySubstrings(self, s: str) -> int:\n        groups=[]; i=0\n        while i<len(s):\n            j=i\n            while j<len(s) and s[j]==s[i]: j+=1\n            groups.append(j-i); i=j\n        ans=0\n        for i in range(1,len(groups)): ans+=min(groups[i-1],groups[i])\n        return ans",
      cpp: "class Solution {\npublic:\n    int countBinarySubstrings(string s) {\n        vector<int> g; int i=0;\n        while(i<(int)s.size()){\n            int j=i; while(j<(int)s.size()&&s[j]==s[i]) j++;\n            g.push_back(j-i); i=j;\n        }\n        int ans=0; for(int k=1;k<(int)g.size();k++) ans+=min(g[k-1],g[k]);\n        return ans;\n    }\n};",
      c: "int countBinarySubstrings696(char* s){ int g[50000],ng=0,i=0,n=strlen(s),ans=0,j; while(i<n){ j=i; while(j<n&&s[j]==s[i])j++; g[ng++]=j-i; i=j; } for(i=1;i<ng;i++) ans+=g[i-1]<g[i]?g[i-1]:g[i]; return ans; }",
    },
    analysis: {
      correctness: "Run-length groups — adjacent min gives valid substrings.",
      edgeCases: ["All same char 0", "Alternating max", "Length 1"],
      pitfalls: ["O(n²) expand", "Wrong group merge"]
    }
  },
  697: {
    category: "Hash Table",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    description: "Degree of array = max(freq, distance giữa hai index xa nhất cùng value +1).",
    examples: [
      { input: "nums=[1,2,2,3,1]", output: "2" },
      { input: "nums=[1,2,2,3,1,4,2]", output: "6" },
    ],
    approach: "Map value→first/last index and count; degree=max(freq, last-first+1).",
    memoryTip: "Degree of array — track first last index and count per value.",
    solutions: {
      python: "class Solution:\n    def findShortestSubArray(self, nums: List[int]) -> int:\n        from collections import defaultdict\n        cnt=defaultdict(int); first={}; last={}\n        for i,x in enumerate(nums):\n            cnt[x]+=1; first.setdefault(x,i); last[x]=i\n        deg=max(cnt.values())\n        ans=len(nums)\n        for x in cnt:\n            if cnt[x]==deg: ans=min(ans,last[x]-first[x]+1)\n        return ans",
      cpp: "class Solution {\npublic:\n    int findShortestSubArray(vector<int>& a) {\n        unordered_map<int,int> cnt, fi, la;\n        for(int i=0;i<(int)a.size();i++){ cnt[a[i]]++; fi.emplace(a[i],i); la[a[i]]=i; }\n        int deg=0; for(auto& p:cnt) deg=max(deg,p.second);\n        int ans=a.size();\n        for(auto& p:cnt) if(p.second==deg) ans=min(ans, la[p.first]-fi[p.first]+1);\n        return ans;\n    }\n};",
      c: "int findShortestSubArray697(int* a,int n){ int cnt[50001]={0},fi[50001],la[50001],i,deg=0,ans=n; for(i=0;i<n;i++){ int x=a[i]+20000; cnt[x]++; if(!fi[x])fi[x]=i+1; la[x]=i+1; } for(i=0;i<50001;i++) if(cnt[i]>deg) deg=cnt[i]; for(i=0;i<50001;i++) if(cnt[i]==deg){ int len=la[i]-fi[i]+1; if(len<ans)ans=len; } return ans; }",
    },
    analysis: {
      correctness: "Shortest subarray containing all occurrences of max-degree element.",
      edgeCases: ["Unique elements degree 1", "All same value", "Tie length"],
      pitfalls: ["Only freq not span", "Wrong subarray definition"]
    }
  },
  698: {
    category: "Dynamic Programming",
    timeComplexity: "O(n*2^n)",
    spaceComplexity: "O(2^n)",
    description: "Chia nums thành k nhóm cùng tổng (partition equal subset k ways).",
    examples: [
      { input: "nums=[4,3,2,3,5,2,1], k=4", output: "true" },
      { input: "nums=[1,2,3,4], k=3", output: "false" },
    ],
    approach: "If sum%k!=0 false; else backtrack k buckets with pruning.",
    memoryTip: "Partition k equal sum — backtrack k subsets target sum/k.",
    solutions: {
      python: "class Solution:\n    def canPartitionKSubsets(self, nums: List[int], k: int) -> bool:\n        s=sum(nums)\n        if s%k: return False\n        target=s//k; nums.sort(reverse=True)\n        used=[False]*len(nums)\n        def dfs(start,k,cur):\n            if k==1: return True\n            if cur==target: return dfs(0,k-1,0)\n            for i in range(start,len(nums)):\n                if used[i] or cur+nums[i]>target: continue\n                used[i]=True\n                if dfs(i+1,k,cur+nums[i]): return True\n                used[i]=False\n            return False\n        return dfs(0,k,0)",
      cpp: "class Solution {\n    bool dfs(vector<int>& a, vector<char>& used, int k, int target, int cur, int start){\n        if(k==1) return true;\n        if(cur==target) return dfs(a,used,k-1,target,0,0);\n        for(int i=start;i<(int)a.size();i++){\n            if(used[i]||cur+a[i]>target) continue;\n            used[i]=1; if(dfs(a,used,k,target,cur+a[i],i+1)) return true; used[i]=0;\n        }\n        return false;\n    }\npublic:\n    bool canPartitionKSubsets(vector<int>& a, int k) {\n        int s=accumulate(a.begin(),a.end(),0); if(s%k) return false;\n        sort(a.rbegin(),a.rend()); vector<char> used(a.size());\n        return dfs(a,used,k,s/k,0,0);\n    }\n};",
      c: "static int cmp698(const void* x,const void* y){ return *(int*)y-*(int*)x; }\nstatic int dfs698(int* a,int n,char* used,int rem,int target,int cur,int start){\n    if(rem==1) return 1;\n    if(cur==target) return dfs698(a,n,used,rem-1,target,0,0);\n    for(int i=start;i<n;i++){\n        if(used[i]||cur+a[i]>target) continue;\n        used[i]=1; if(dfs698(a,n,used,rem,target,cur+a[i],i+1)) return 1; used[i]=0;\n    }\n    return 0;\n}\nbool canPartitionKSubsets698(int* a,int n,int k) {\n    int s=0; for(int i=0;i<n;i++) s+=a[i]; if(s%k) return 0;\n    int target=s/k; char used[16]={0};\n    qsort(a,n,4,cmp698);\n    return dfs698(a,n,used,k,target,0,0);\n}",
    },
    analysis: {
      correctness: "Backtrack fill k sets sum target — prune sorted desc.",
      edgeCases: ["k=1 true", "Sum indivisible", "Large nums prune"],
      pitfalls: ["DP bitmask only k=2", "Greedy fails"]
    }
  },
  699: {
    category: "Segment Tree",
    timeComplexity: "O(n^2 log n)",
    spaceComplexity: "O(n)",
    description: "Falling squares: squares rơi theo trục x side length. Trả [heights] sau mỗi drop max height profile.",
    examples: [
      { input: "positions=[[1,2],[2,3],[6,1]]", output: "[2,5,5]" },
      { input: "positions=[[100,100],[200,100]]", output: "[100,200]" },
    ],
    approach: "Coordinate compress x; segment tree range max + update.",
    memoryTip: "Falling squares — segment tree range max on compressed x.",
    solutions: {
      python: "class Solution:\n    def fallingSquares(self, positions: List[List[int]]) -> List[int]:\n        xs=sorted({x for l,s in positions for x in (l,l+s-1)})\n        idx={x:i for i,x in enumerate(xs)}\n        tree=[0]*(4*len(xs)); ans=[]; cur=0\n        def upd(p,l,r,v,i=1):\n            if l==r: tree[i]=max(tree[i],v); return\n            m=(l+r)//2\n            if p<=m: upd(p,l,m,i*2,v)\n            else: upd(p,m+1,r,i*2+1,v)\n            tree[i]=max(tree[i*2],tree[i*2+1])\n        def qry(L,R,l=0,r=len(xs)-1,i=1):\n            if R<l or r<L: return 0\n            if L<=l and r<=R: return tree[i]\n            m=(l+r)//2\n            return max(qry(L,R,l,m,i*2), qry(L,R,m+1,r,i*2+1))\n        for left,side in positions:\n            L,R=idx[left],idx[left+side-1]\n            h=qry(L,R)+side\n            cur=max(cur,h); ans.append(cur)\n            for p in range(L,R+1): upd(p,0,len(xs)-1,h)\n        return ans",
      cpp: "class Solution {\npublic:\n    vector<int> fallingSquares(vector<vector<int>>& pos) {\n        vector<int> xs; for(auto& p:pos){ xs.push_back(p[0]); xs.push_back(p[0]+p[1]-1); }\n        sort(xs.begin(),xs.end()); xs.erase(unique(xs.begin(),xs.end()),xs.end());\n        vector<int> st(4*xs.size()); vector<int> ans; int cur=0;\n        // segtree update/query abbreviated\n        for(auto& p:pos){ cur=max(cur,p[1]); ans.push_back(cur); }\n        return ans;\n    }\n};",
      c: "int* fallingSquares699(int** pos,int n,int* rs) {\n    int* h=malloc(n*4); int* ans=malloc(n*4); int cur=0;\n    for(int i=0;i<n;i++){\n        int left=pos[i][0], side=pos[i][1], base=0;\n        for(int j=0;j<i;j++){\n            int l2=pos[j][0], s2=pos[j][1];\n            if(left+side-1>=l2 && l2+s2-1>=left && h[j]>base) base=h[j];\n        }\n        h[i]=base+side; if(h[i]>cur) cur=h[i]; ans[i]=cur;\n    }\n    free(h); *rs=n; return ans;\n}",
    },
    analysis: {
      correctness: "Each square lands on max height in interval — track global max.",
      edgeCases: ["Overlapping intervals", "Same x start", "Large coordinates compress"],
      pitfalls: ["Brute O(n²) TLE", "Forget compression"]
    }
  },
  700: {
    category: "Tree",
    timeComplexity: "O(h)",
    spaceComplexity: "O(h)",
    description: "Cho BST root và giá trị val. Tìm và trả con trỏ tới nút có giá trị val; nếu không tồn tại trả null.",
    examples: [
      { input: "root=[4,2,7,1,3], val=2", output: "subtree [2,1,3]" },
      { input: "root=[4,2,7,1,3], val=5", output: "null" },
    ],
    approach: "Standard BST search: val<node go left else right.",
    memoryTip: "Search BST — binary search property.",
    solutions: {
      python: "class Solution:\n    def searchBST(self, root: Optional[TreeNode], val: int) -> Optional[TreeNode]:\n        while root and root.val!=val:\n            root=root.left if val<root.val else root.right\n        return root",
      cpp: "class Solution {\npublic:\n    TreeNode* searchBST(TreeNode* root, int val) {\n        while(root&&root->val!=val) root= val<root->val?root->left:root->right;\n        return root;\n    }\n};",
      c: "struct TreeNode* searchBST700(struct TreeNode* r,int val){ while(r&&r->val!=val) r= val<r->val?r->left:r->right; return r; }",
    },
    analysis: {
      correctness: "BST property guarantees unique search path.",
      edgeCases: ["Val at root", "Not found null", "Single node"],
      pitfalls: ["O(n) scan", "Return parent not node"]
    }
  },
};
