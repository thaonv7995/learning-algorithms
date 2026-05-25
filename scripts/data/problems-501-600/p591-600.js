/** Content bodies for LC #591-600 */
module.exports = {
  591: {
    category: 'String',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Kiểm tra chuỗi code hợp lệ: tag XML đóng mở khớp, tên tag chỉ chữ cái, độ dài tag 1..9, nội dung giữa tag và CDATA theo quy tắc LeetCode.',
    examples: [
      { input: 'code = "<DIV>This is the first line <![CDATA[<div>]]></DIV>"', output: 'true' },
      { input: 'code = "<DIV>>>  ![cdata[]] <div>></div>]]>]]>>]</DIV>"', output: 'true' },
      { input: 'code = "<A>  <B> such a nonsense </B>   <A>"', output: 'false' }
    ],
    approach: 'Stack tag names; parse <TAG>, </TAG>, <![CDATA[...]]>; kiểm tra ký tự ngoài tag và CDATA.',
    memoryTip: 'Tag validator = stack + state machine for CDATA vs normal content.',
    solutions: {
      python: 'class Solution:\n    def isValid(self, code: str) -> bool:\n        if not code.startswith("<") or code[0] != "<" or not code.endswith(">"):\n            return False\n        stack = []\n        i = 0\n        while i < len(code):\n            if stack and code[i] not in "<":\n                i += 1\n                continue\n            if code.startswith("<![CDATA[", i):\n                j = code.find("]]>", i)\n                if j == -1 or not stack: return False\n                i = j + 3\n            elif code.startswith("</", i):\n                j = code.find(">", i)\n                if j == -1: return False\n                tag = code[i+2:j]\n                if not stack or stack.pop() != tag: return False\n                i = j + 1\n                if not stack and i != len(code): return False\n            elif code.startswith("<", i):\n                j = code.find(">", i)\n                if j == -1: return False\n                tag = code[i+1:j]\n                if not tag or len(tag) > 9 or not tag[0].isupper() or not tag.isalpha():\n                    return False\n                stack.append(tag)\n                i = j + 1\n            else:\n                return False\n        return not stack',
      cpp: 'class Solution {\npublic:\n    bool isValid(string code) {\n        if (code.empty() || code[0] != \'<\' || code.back() != \'>\') return false;\n        vector<string> st;\n        for (int i = 0; i < (int)code.size(); ) {\n            if (!st.empty() && code[i] != \'<\') { i++; continue; }\n            if (code.compare(i, 9, "<![CDATA[") == 0) {\n                size_t j = code.find("]]>", i);\n                if (j == string::npos || st.empty()) return false;\n                i = j + 3;\n            } else if (code.compare(i, 2, "</") == 0) {\n                size_t j = code.find(\'>\', i);\n                if (j == string::npos) return false;\n                string tag = code.substr(i+2, j-i-2);\n                if (st.empty() || st.back() != tag) return false;\n                st.pop_back();\n                i = j + 1;\n                if (st.empty() && i != (int)code.size()) return false;\n            } else if (code[i] == \'<\') {\n                size_t j = code.find(\'>\', i);\n                if (j == string::npos) return false;\n                string tag = code.substr(i+1, j-i-1);\n                if (tag.empty() || tag.size()>9 || !isupper(tag[0])) return false;\n                for (char c : tag) if (!isalpha(c)) return false;\n                st.push_back(tag);\n                i = j + 1;\n            } else return false;\n        }\n        return st.empty();\n    }\n};',
      c: '/* Stack tag parser — xem C++ */'
    },
    analysis: {
      correctness: 'Stack đảm bảo tag lồng khớp; CDATA chỉ hợp lệ trong tag mở.',
      edgeCases: ['Một tag bọc toàn bộ', 'CDATA chứa >'],
      pitfalls: ['Quên kiểm tra hết chuỗi sau đóng root', 'Tag name có số']
    }
  },
  592: {
    category: 'Math',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Cho biểu thức chuỗi gồm phân số dạng ±a/b cộng trừ nhau. Trả kết quả phân số tối giản dạng "p/q".',
    examples: [
      { input: 'expression = "-1/2+1/2"', output: '"0/1"' },
      { input: 'expression = "-1/2+1/2+1/3"', output: '"1/3"' },
      { input: 'expression = "1/3-1/2"', output: '"-1/6"' }
    ],
    approach: 'Parse từng phân số; cộng dồn num/den lcm; cuối gcd rút gọn, chuẩn hóa dấu mẫu dương.',
    memoryTip: 'Fraction expression = parse sign+num/den, accumulate with lcm, gcd reduce.',
    solutions: {
      python: 'class Solution:\n    def fractionAddition(self, expression: str) -> str:\n        import re\n        from math import gcd\n        nums = list(map(int, re.findall(r\'[+-]?\\d+\', expression)))\n        num = den = 0\n        for i in range(0, len(nums), 2):\n            a, b = nums[i], nums[i+1]\n            num = num * b + a * den\n            den = den * b if den else b\n            g = gcd(abs(num), abs(den))\n            num //= g\n            den //= g\n        if den < 0:\n            num, den = -num, -den\n        return f"{num}/{den}"',
      cpp: 'class Solution {\n    long long gcdll(long long a, long long b){ return b?gcdll(b,a%b):abs(a); }\npublic:\n    string fractionAddition(string expression) {\n        long long num=0, den=1;\n        int i=0, n=expression.size();\n        while (i<n) {\n            long long sign=1; if (expression[i]==\'+\'||expression[i]==\'-\'){ sign=expression[i]==\'-\'?-1:1; i++; }\n            long long a=0; while (i<n && isdigit(expression[i])) a=a*10+expression[i++]-\'0\'; a*=sign;\n            i++; long long b=0; while (i<n && isdigit(expression[i])) b=b*10+expression[i++]-\'0\';\n            num = num*b + a*den; den = den*b;\n            long long g = gcdll(num, den); num/=g; den/=g;\n        }\n        if (den<0){ num=-num; den=-den; }\n        return to_string(num)+"/"+to_string(den);\n    }\n};',
      c: '/* Parse fractions lcm gcd — xem C++ */'
    },
    analysis: {
      correctness: 'Cộng phân số qua lcm; gcd sau mỗi bước tránh overflow.',
      edgeCases: ['Kết quả 0 → 0/1', 'Một phân số âm'],
      pitfalls: ['Quên chuẩn hóa dấu mẫu', 'Parse dấu + ẩn']
    }
  },
  593: {
    category: 'Math',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(1)',
    description: 'Cho 4 điểm 2D. Kiểm tra có tạo thành hình vuông hợp lệ (4 cạnh bằng, 2 đường chéo bằng, không trùng điểm).',
    examples: [
      { input: 'points = [[0,0],[1,1],[1,0],[0,1]]', output: 'true' },
      { input: 'points = [[0,0],[1,1],[1,0],[2,1]]', output: 'false' },
      { input: 'points = [[1,0],[0,1],[1,1],[0,0]]', output: 'true' }
    ],
    approach: 'Tính 6 khoảng cách bình; multiset phải có 4 cạnh bằng + 2 diagonal bằng (diagonal = 2*cạnh).',
    memoryTip: 'Valid square = 4 equal side^2 and 2 equal diagonal^2 in 6 pairwise dists.',
    solutions: {
      python: 'class Solution:\n    def validSquare(self, p1: List[int], p2: List[int], p3: List[int], p4: List[int]) -> bool:\n        pts = [p1,p2,p3,p4]\n        dists = []\n        for i in range(4):\n            for j in range(i+1,4):\n                dx=pts[i][0]-pts[j][0]; dy=pts[i][1]-pts[j][1]\n                dists.append(dx*dx+dy*dy)\n        dists.sort()\n        return dists[0]>0 and dists[0]==dists[1]==dists[2]==dists[3] and dists[4]==dists[5]==2*dists[0]',
      cpp: 'class Solution {\n    int dist(vector<int>& a, vector<int>& b) {\n        return (a[0]-b[0])*(a[0]-b[0])+(a[1]-b[1])*(a[1]-b[1]);\n    }\npublic:\n    bool validSquare(vector<int>& p1, vector<int>& p2, vector<int>& p3, vector<int>& p4) {\n        vector<vector<int>*> pts = {&p1,&p2,&p3,&p4};\n        vector<int> d;\n        for (int i=0;i<4;i++) for (int j=i+1;j<4;j++) d.push_back(dist(*pts[i],*pts[j]));\n        sort(d.begin(), d.end());\n        return d[0]>0 && d[0]==d[1]&&d[1]==d[2]&&d[2]==d[3] && d[4]==d[5]&&d[5]==2*d[0];\n    }\n};',
      c: '/* Six distances pattern — xem C++ */'
    },
    analysis: {
      correctness: 'Hình vuông có đúng 2 loại dist: cạnh (4 lần) và diagonal (2 lần, gấp đôi).',
      edgeCases: ['Điểm trùng → dist 0 fail', 'Hình thoi không vuông fail'],
      pitfalls: ['So sánh cạnh không sqrt cần bình', 'Chỉ check 4 cạnh bỏ diagonal']
    }
  },
  594: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Harmonious subsequence: max-min=1. Trả độ dài subsequence hài hòa dài nhất (không cần liên tiếp).',
    examples: [
      { input: 'nums = [1,3,2,2,5,2,3,7]', output: '5' },
      { input: 'nums = [1,2,3,4]', output: '2' },
      { input: 'nums = [1,1,1,1]', output: '0' }
    ],
    approach: 'Đếm freq mỗi số; với mỗi x nếu có x+1 thì ans = max(ans, freq[x]+freq[x+1]).',
    memoryTip: 'Harmonious = count(x)+count(x+1) for each x in freq map.',
    solutions: {
      python: 'class Solution:\n    def findLHS(self, nums: List[int]) -> int:\n        from collections import Counter\n        cnt = Counter(nums)\n        ans = 0\n        for x in cnt:\n            if x+1 in cnt:\n                ans = max(ans, cnt[x] + cnt[x+1])\n        return ans',
      cpp: 'class Solution {\npublic:\n    int findLHS(vector<int>& nums) {\n        unordered_map<int,int> cnt;\n        for (int x : nums) cnt[x]++;\n        int ans = 0;\n        for (auto& p : cnt)\n            if (cnt.count(p.first+1))\n                ans = max(ans, p.second + cnt[p.first+1]);\n        return ans;\n    }\n};',
      c: '/* Freq pair x x+1 — xem C++ */'
    },
    analysis: {
      correctness: 'Subsequence hài hòa chỉ gồm hai giá trị liền kề; tổng freq là max length.',
      edgeCases: ['Không cặp liền kề → 0', 'Nhiều cặp chọn max'],
      pitfalls: ['Sliding window trên sorted (subsequence không liên tiếp)', 'Check x-1 và x+1 double count']
    }
  },
  595: {
    category: 'Database',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Bảng World(name, continent, area, population). Trả name, continent, area của các "big country": area > 3000000 HOẶC population > 25000000.',
    examples: [
      { input: 'area=3287263', output: 'Row country đó' },
      { input: 'population=26000000', output: 'Row country đó' }
    ],
    approach: 'SELECT name, continent, area FROM World WHERE area > 3000000 OR population > 25000000.',
    memoryTip: 'Big countries = OR filter on area and population thresholds.',
    solutions: {
      python: '# SQL\nSELECT name, continent, area\nFROM World\nWHERE area > 3000000 OR population > 25000000;',
      cpp: '// SQL\nSELECT name, continent, area\nFROM World\nWHERE area > 3000000 OR population > 25000000;',
      c: '/* SQL OR threshold filter */'
    },
    analysis: {
      correctness: 'OR đúng điều kiện đề; trả đủ 3 cột yêu cầu.',
      edgeCases: ['Đúng ngưỡng 3000000 không lấy (>)', 'Cả hai điều kiện thỏa'],
      pitfalls: ['AND thay OR', 'Thiếu cột continent']
    }
  },
  596: {
    category: 'Database',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    description: 'Bảng Courses(student, class). Trả các class có ≥5 học sinh (student có thể trùng class).',
    examples: [
      { input: 'class A có 5 student', output: 'A' },
      { input: 'class B có 4 student', output: 'Không liệt kê B' }
    ],
    approach: 'SELECT class FROM Courses GROUP BY class HAVING COUNT(DISTINCT student) >= 5 (hoặc COUNT(*) nếu mỗi row unique).',
    memoryTip: 'Classes 5+ students = GROUP BY class HAVING COUNT >= 5.',
    solutions: {
      python: '# SQL\nSELECT class\nFROM Courses\nGROUP BY class\nHAVING COUNT(*) >= 5;',
      cpp: '// SQL\nSELECT class\nFROM Courses\nGROUP BY class\nHAVING COUNT(*) >= 5;',
      c: '/* SQL GROUP BY HAVING — xem SQL */'
    },
    analysis: {
      correctness: 'GROUP BY class đếm enrollment đủ 5.',
      edgeCases: ['Nhiều class đủ điều kiện', 'Student trùng class nhiều lần — dùng DISTINCT nếu cần'],
      pitfalls: ['WHERE COUNT sai chỗ', 'Ngưỡng 5 dùng > thay >=']
    }
  },
  598: {
    category: 'Array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(1)',
    description: 'Ma trận m×n ban đầu toàn 0. Mỗi op [r,c] cộng 1 mọi ô (i,j) với 0≤i<r, 0≤j<c. Trả số ô có giá trị lớn nhất.',
    examples: [
      { input: 'm=3, n=3, ops=[[2,2],[3,3]]', output: '4' },
      { input: 'm=3, n=3, ops=[]', output: '9' }
    ],
    approach: 'Mọi op cộng hình chữ nhật góc trên; max count = min(r)*min(c) over all ops (hoặc m*n nếu rỗng).',
    memoryTip: 'Range Addition II = answer is minRow * minCol across ops.',
    solutions: {
      python: 'class Solution:\n    def maxCount(self, m: int, n: int, ops: List[List[int]]) -> int:\n        if not ops:\n            return m * n\n        mr = min(op[0] for op in ops)\n        mc = min(op[1] for op in ops)\n        return mr * mc',
      cpp: 'class Solution {\npublic:\n    int maxCount(int m, int n, vector<vector<int>>& ops) {\n        if (ops.empty()) return m * n;\n        int mr = m, mc = n;\n        for (auto& op : ops) { mr = min(mr, op[0]); mc = min(mc, op[1]); }\n        return mr * mc;\n    }\n};',
      c: '/* min r min c product — xem C++ */'
    },
    analysis: {
      correctness: 'Giao mọi hình chữ nhật op là [0,minR)×[0,minC); mọi ô đó nhận mọi op.',
      edgeCases: ['ops rỗng → m*n', 'Op nhỏ hơn ma trận'],
      pitfalls: ['Simulate matrix O(mn*ops)', 'Max thay vì min trên ops']
    }
  },
  599: {
    category: 'Array',
    timeComplexity: 'O(n + m)',
    spaceComplexity: 'O(n + m)',
    description: 'Hai list đều không trùng tên trong từng list. Tìm tên xuất hiện cả hai list sao indexSum = index1+index2 nhỏ nhất.',
    examples: [
      { input: 'list1=["Shogun","Tapioca","Burger"], list2=["Piatti","The Grill","Trousers","Overstock"]', output: '["Shogun"]' },
      { input: 'Cùng indexSum nhiều tên', output: 'Tất cả tên có min sum' }
    ],
    approach: 'Hash map tên→index list1; duyệt list2, nếu chung thì cập nhật min sum và danh sách kết quả.',
    memoryTip: 'Min index sum two lists = hash index list1 + scan list2.',
    solutions: {
      python: 'class Solution:\n    def findRestaurant(self, list1: List[str], list2: List[str]) -> List[str]:\n        idx = {w:i for i,w in enumerate(list1)}\n        best = 10**9\n        ans = []\n        for j, w in enumerate(list2):\n            if w in idx:\n                s = idx[w] + j\n                if s < best:\n                    best = s\n                    ans = [w]\n                elif s == best:\n                    ans.append(w)\n        return ans',
      cpp: 'class Solution {\npublic:\n    vector<string> findRestaurant(vector<string>& list1, vector<string>& list2) {\n        unordered_map<string,int> idx;\n        for (int i=0;i<(int)list1.size();i++) idx[list1[i]]=i;\n        int best = INT_MAX;\n        vector<string> ans;\n        for (int j=0;j<(int)list2.size();j++) {\n            auto it = idx.find(list2[j]);\n            if (it==idx.end()) continue;\n            int s = it->second + j;\n            if (s < best) { best = s; ans = {list2[j]}; }\n            else if (s == best) ans.push_back(list2[j]);\n        }\n        return ans;\n    }\n};',
      c: '/* Hash index intersection — xem C++ */'
    },
    analysis: {
      correctness: 'Min sum index chỉ cần duyệt giao tên; tie thu hết tên cùng sum.',
      edgeCases: ['Không chung tên → []', 'Một chung tên'],
      pitfalls: ['Nested loop O(n*m)', 'Quên reset ans khi sum nhỏ hơn']
    }
  },
  600: {
    category: 'Dynamic Programming',
    timeComplexity: 'O(log num)',
    spaceComplexity: 'O(log num)',
    description: 'Đếm số nguyên trong [0, num] mà biểu diễn nhị phân không có hai bit 1 liên tiếp.',
    examples: [
      { input: 'num = 5', output: '5' },
      { input: 'num = 1', output: '2' },
      { input: 'num = 1000000000', output: '847286447' }
    ],
    approach: 'Digit DP trên bit string của num: dp[pos][prev1][tight] đếm số hợp lệ ≤ num.',
    memoryTip: 'No consecutive ones = digit DP on binary with state prev bit + tight.',
    solutions: {
      python: 'class Solution:\n    def findIntegers(self, num: int) -> int:\n        bits = bin(num)[2:]\n        from functools import lru_cache\n        @lru_cache(None)\n        def dp(i, prev1, tight):\n            if i == len(bits):\n                return 1\n            limit = int(bits[i]) if tight else 1\n            ans = 0\n            for d in range(0, limit+1):\n                if prev1 and d == 1:\n                    continue\n                ans += dp(i+1, d==1, tight and d==limit)\n            return ans\n        return dp(0, False, True)',
      cpp: 'class Solution {\n    string bits;\n    int dp[35][2][2];\n    int dfs(int i, int prev1, int tight) {\n        if (i == (int)bits.size()) return 1;\n        if (dp[i][prev1][tight] != -1) return dp[i][prev1][tight];\n        int limit = tight ? bits[i]-\'0\' : 1;\n        int ans = 0;\n        for (int d=0; d<=limit; d++) {\n            if (prev1 && d==1) continue;\n            ans += dfs(i+1, d==1, tight && d==limit);\n        }\n        return dp[i][prev1][tight]=ans;\n    }\npublic:\n    int findIntegers(int num) {\n        bits = bitset<32>(num).to_string();\n        bits = bits.substr(bits.find(\'1\'));\n        memset(dp, -1, sizeof dp);\n        return dfs(0, 0, 1);\n    }\n};',
      c: '/* Binary digit DP — xem C++ */'
    },
    analysis: {
      correctness: 'DP đếm mọi số ≤ num thỏa ràng buộc không "11" trong binary.',
      edgeCases: ['num=0 → 1', 'num=1 → 2 (0,1)'],
      pitfalls: ['Fibonacci formula off-by-one', 'Quên tight constraint']
    }
  }
};
