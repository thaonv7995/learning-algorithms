/* ==========================================================================
   LEETCODE PROBLEMS DATABASE (problems-data.js)
   Chứa danh sách 50 bài toán Easy, Medium, Hard kinh điển cùng mã nguồn C++
   ========================================================================== */

const PROBLEMS = [
            // 1-15: EASY
            {
                id: 1,
                title: "Two Sum",
                difficulty: "Easy",
                category: "Array",
                timeComplexity: "O(N)",
                spaceComplexity: "O(N)",
                description: "Cho một mảng số nguyên nums và một số nguyên target, hãy tìm chỉ số của hai số sao cho tổng của chúng bằng target.\n\nGiả định rằng mỗi đầu vào có duy nhất một giải pháp và bạn không được phép sử dụng cùng một phần tử hai lần.",
                examples: [
                    { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1] (Vì nums[0] + nums[1] == 9)" }
                ],
                approach: "Sử dụng kỹ thuật Hash Map (Bảng băm) một lượt quét. Khi đi qua từng số, ta tính toán giá trị cần tìm (complement = target - nums[i]). Nếu complement đã tồn tại trong Hash Map, ta lập tức trả về chỉ số của complement và chỉ số hiện tại. Nếu chưa, ta ghi nhận giá trị hiện tại cùng chỉ số của nó vào Hash Map để các phần tử phía sau tra cứu.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">vector&lt;int&gt;</span> <span class="fn">twoSum</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums, <span class="ty">int</span> target) {
        <span class="ty">unordered_map&lt;int, int&gt;</span> seen; <span class="cm">// key: gia tri, val: chi so</span>
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; nums.<span class="fn">size</span>(); i++) {
            <span class="ty">int</span> complement = target - nums[i];
            <span class="kw">if</span> (seen.<span class="fn">count</span>(complement)) {
                <span class="kw">return</span> {seen[complement], i}; <span class="cm">// Tra ve cap index tim thay</span>
            }
            seen[nums[i]] = i; <span class="cm">// Ghi nhan vi tri phan tu</span>
        }
        <span class="kw">return</span> {};
    }
};`,
                memoryTip: "unordered_map trong C++ lưu trữ các bucket trên phân vùng Heap RAM. Việc sử dụng bảng băm tốn O(N) bộ nhớ phụ trợ nhưng tối ưu thời gian tìm kiếm từ O(N^2) xuống O(N) tuyến tính cực kỳ hiệu quả."
            },
            {
                id: 20,
                title: "Valid Parentheses",
                difficulty: "Easy",
                category: "Stack",
                timeComplexity: "O(N)",
                spaceComplexity: "O(N)",
                description: "Cho một chuỗi s chỉ chứa các ký tự mở/đóng ngoặc '(', ')', '{', '}', '[' và ']', hãy kiểm tra xem chuỗi đầu vào có hợp lệ hay không.\n\nChuỗi hợp lệ phải mở ngoặc đúng loại và đóng ngoặc theo đúng thứ tự LIFO.",
                examples: [
                    { input: "s = \"()[]{}\"", output: "true" },
                    { input: "s = \"(]\"", output: "false" }
                ],
                approach: "Sử dụng cấu trúc dữ liệu Ngăn xếp (Stack) để quản lý thứ tự lồng nhau của các dấu ngoặc. Khi gặp một ký tự mở '(', '{', '[', ta đẩy (push) nó vào Stack. Khi gặp một ký tự đóng, ta kiểm tra xem Stack có rỗng hay không; nếu rỗng hoặc ký tự đầu Stack không khớp loại mở tương ứng, chuỗi không hợp lệ. Khi kết thúc chuỗi, Stack phải trống hoàn toàn.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">bool</span> <span class="fn">isValid</span>(<span class="ty">string</span> s) {
        <span class="ty">stack&lt;char&gt;</span> st;
        <span class="kw">for</span> (<span class="ty">char</span> c : s) {
            <span class="kw">if</span> (c == <span class="st">'('</span> || c == <span class="st">'{'</span> || c == <span class="st">'['</span>) {
                st.<span class="fn">push</span>(c);
            } <span class="kw">else</span> {
                <span class="kw">if</span> (st.<span class="fn">empty</span>()) <span class="kw">return</span> <span class="kw">false</span>;
                <span class="ty">char</span> top = st.<span class="fn">top</span>();
                <span class="kw">if</span> ((c == <span class="st">')'</span> &amp;&amp; top != <span class="st">'('</span>) ||
                    (c == <span class="st">'}'</span> &amp;&amp; top != <span class="st">'{'</span>) ||
                    (c == <span class="st">']'</span> &amp;&amp; top != <span class="st">'['</span>)) <span class="kw">return</span> <span class="kw">false</span>;
                st.<span class="fn">pop</span>();
            }
        }
        <span class="kw">return</span> st.<span class="fn">empty</span>();
    }
};`,
                memoryTip: "Kích thước tối đa của Stack trong trường hợp xấu nhất là O(N) khi toàn bộ chuỗi chứa dấu mở ngoặc. Vùng nhớ Stack này được phân bổ liên tục giúp bảo toàn Cache locality."
            },
            {
                id: 21,
                title: "Merge Two Sorted Lists",
                difficulty: "Easy",
                category: "Linked List",
                timeComplexity: "O(N + M)",
                spaceComplexity: "O(1)",
                description: "Trộn hai danh sách liên kết đơn đã được sắp xếp tăng dần thành một danh sách liên kết mới duy nhất cũng được sắp xếp.",
                examples: [
                    { input: "l1 = 1->2->4, l2 = 1->3->4", output: "1->1->2->3->4->4" }
                ],
                approach: "Sử dụng một nút giả (Dummy Node) để làm gốc neo cho danh sách kết quả. Ta dùng con trỏ chạy `tail` duyệt song song hai danh sách, liên tục so sánh giá trị nút hiện tại của l1 và l2 để nối nút nhỏ hơn vào `tail->next`, sau đó tịnh tiến con trỏ tương ứng. Khi một trong hai danh sách kết thúc, ta nối trực tiếp phần còn lại của danh sách chưa rỗng vào cuối.",
                code: `<span class="kw">struct</span> <span class="ty">ListNode</span> {
    <span class="ty">int</span> val;
    <span class="ty">ListNode</span> *next;
};

<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">ListNode</span>* <span class="fn">mergeTwoLists</span>(<span class="ty">ListNode</span>* list1, <span class="ty">ListNode</span>* list2) {
        <span class="ty">ListNode</span> dummy(<span class="st">0</span>); <span class="cm">// Khoi tao Nut gia tren Stack RAM</span>
        <span class="ty">ListNode</span>* tail = &amp;dummy;
        <span class="kw">while</span> (list1 &amp;&amp; list2) {
            <span class="kw">if</span> (list1-&gt;val &lt;= list2-&gt;val) {
                tail-&gt;next = list1;
                list1 = list1-&gt;next;
            } <span class="kw">else</span> {
                tail-&gt;next = list2;
                list2 = list2-&gt;next;
            }
            tail = tail-&gt;next;
        }
        tail-&gt;next = list1 ? list1 : list2; <span class="cm">// Noi duoi phan con lai</span>
        <span class="kw">return</span> dummy.next;
    }
};`,
                memoryTip: "Bằng cách tái sử dụng trực tiếp các con trỏ liên kết có sẵn của l1 và l2 mà không tạo mới bất kỳ nút nào qua `new` hay `malloc`, thuật toán hoàn thành với độ phức tạp bộ nhớ phụ trợ tuyệt đối O(1)."
            },
            {
                id: 121,
                title: "Best Time to Buy and Sell Stock",
                difficulty: "Easy",
                category: "Array",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Cho một mảng prices trong đó prices[i] là giá của một cổ phiếu vào ngày thứ i. Bạn chỉ được phép mua một lần và bán một lần sau đó. Hãy tìm lợi nhuận tối đa thu được.",
                examples: [
                    { input: "prices = [7, 1, 5, 3, 6, 4]", output: "5 (Mua ngày 2 giá 1, bán ngày 5 giá 6)" }
                ],
                approach: "Duyệt qua mảng giá một lượt (One-pass). Ta liên tục cập nhật mức giá mua nhỏ nhất đã gặp (`minPrice`) và tính toán lợi nhuận nếu bán tại mức giá hiện tại (`prices[i] - minPrice`). Lợi nhuận lớn nhất liên tục được lưu trữ lại.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">maxProfit</span>(<span class="ty">vector&lt;int&gt;</span>&amp; prices) {
        <span class="ty">int</span> minPrice = INT_MAX;
        <span class="ty">int</span> maxProfit = <span class="st">0</span>;
        <span class="kw">for</span> (<span class="ty">int</span> price : prices) {
            <span class="kw">if</span> (price &lt; minPrice) minPrice = price;
            <span class="kw">else if</span> (price - minPrice &gt; maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        <span class="kw">return</span> maxProfit;
    }
};`,
                memoryTip: "Kỹ thuật mỏ neo hai biến đơn giản giúp giải thuật chạy cực nhanh trong O(N) thời gian và O(1) bộ nhớ, tránh hoàn toàn việc cấp phát động."
            },
            {
                id: 125,
                title: "Valid Palindrome",
                difficulty: "Easy",
                category: "Two Pointers",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Kiểm tra xem một chuỗi có phải là chuỗi đối xứng hay không, sau khi đã chuyển tất cả ký tự viết hoa thành viết thường và loại bỏ toàn bộ ký tự không phải chữ và số.",
                examples: [
                    { input: "s = \"A man, a plan, a canal: Panama\"", output: "true" }
                ],
                approach: "Sử dụng hai con trỏ trái và phải (`left`, `right`) xuất phát từ hai biên chuỗi. Ta liên tục di chuyển hai con trỏ hướng vào tâm, bỏ qua tất cả ký tự đặc biệt không phải chữ và số thông qua hàm `isalnum()`. So sánh hai ký tự tại hai đầu sau khi chuẩn hóa về chữ thường `tolower()`. Nếu lệch nhau, trả về false.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">bool</span> <span class="fn">isPalindrome</span>(<span class="ty">string</span> s) {
        <span class="ty">int</span> left = <span class="st">0</span>, right = s.<span class="fn">length</span>() - <span class="st">1</span>;
        <span class="kw">while</span> (left &lt; right) {
            <span class="kw">while</span> (left &lt; right &amp;&amp; !<span class="fn">isalnum</span>(s[left])) left++;
            <span class="kw">while</span> (left &lt; right &amp;&amp; !<span class="fn">isalnum</span>(s[right])) right--;
            <span class="kw">if</span> (<span class="fn">tolower</span>(s[left]) != <span class="fn">tolower</span>(s[right])) <span class="kw">return</span> <span class="kw">false</span>;
            left++; right--;
        }
        <span class="kw">return</span> <span class="kw">true</span>;
    }
};`,
                memoryTip: "Việc so sánh trực tiếp In-place trên chuỗi ban đầu giúp tiết kiệm hoàn toàn bộ nhớ phụ trợ so với việc tạo chuỗi phụ mới lọc ký tự, đảm bảo an toàn bộ nhớ tối đa."
            },
            {
                id: 136,
                title: "Single Number",
                difficulty: "Easy",
                category: "Array",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Cho một mảng số nguyên không rỗng nums, mọi phần tử đều xuất hiện hai lần ngoại trừ một phần tử duy nhất. Hãy tìm phần tử đơn độc đó.",
                examples: [
                    { input: "nums = [4, 1, 2, 1, 2]", output: "4" }
                ],
                approach: "Sử dụng phép toán Bitwise XOR (^). Phép toán XOR có các tính chất cực kỳ đặc biệt: A ^ A = 0 và A ^ 0 = A. Khi ta thực hiện XOR tích lũy tất cả các phần tử trong mảng lại với nhau, các cặp số giống nhau sẽ triệt tiêu hoàn toàn về 0, để lại kết quả cuối cùng chính là phần tử đơn độc duy nhất.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">singleNumber</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums) {
        <span class="ty">int</span> result = <span class="st">0</span>;
        <span class="kw">for</span> (<span class="ty">int</span> num : nums) {
            result ^= num; <span class="cm">// XOR giup triet tieu cac cap giong nhau</span>
        }
        <span class="kw">return</span> result;
    }
};`,
                memoryTip: "Thuật toán này là một minh chứng xuất sắc về tối ưu hóa phần cứng. Phép toán XOR chạy trực tiếp trên các thanh ghi CPU với tốc độ xung nhịp cực nhanh mà không phát sinh bất kỳ byte nhớ Heap hay Stack nào."
            },
            {
                id: 141,
                title: "Linked List Cycle",
                difficulty: "Easy",
                category: "Linked List",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Hãy xác định xem một danh sách liên kết đơn có chứa chu trình (vòng lặp vô hạn) hay không.",
                examples: [
                    { input: "head = 3->2->0->-4->(trỏ ngược về 2)", output: "true" }
                ],
                approach: "Áp dụng thuật toán tìm chu trình Floyd (Thuật toán Rùa và Thỏ - Tortoise and Hare). Ta sử dụng hai con trỏ chạy với tốc độ khác nhau: con trỏ chậm `slow` dịch chuyển 1 bước mỗi lần, con trỏ nhanh `fast` dịch chuyển 2 bước. Nếu danh sách có chu trình, con trỏ nhanh sẽ đuổi kịp con trỏ chậm tại một thời điểm nào đó. Nếu con trỏ nhanh gặp NULL, danh sách không có chu trình.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">bool</span> <span class="fn">hasCycle</span>(<span class="ty">ListNode</span> *head) {
        <span class="kw">if</span> (!head || !head-&gt;next) <span class="kw">return</span> <span class="kw">false</span>;
        <span class="ty">ListNode</span> *slow = head;
        <span class="ty">ListNode</span> *fast = head;
        <span class="kw">while</span> (fast &amp;&amp; fast-&gt;next) {
            slow = slow-&gt;next;
            fast = fast-&gt;next-&gt;next;
            <span class="kw">if</span> (slow == fast) <span class="kw">return</span> <span class="kw">true</span>; <span class="cm">// Tho va Rua gap nhau</span>
        }
        <span class="kw">return</span> <span class="kw">false</span>;
    }
};`,
                memoryTip: "Kỹ thuật hai con trỏ chạy trên danh sách giúp phát hiện chu trình mà không cần dùng bảng Hash Set lưu địa chỉ các nút đã qua, tối ưu bộ nhớ về O(1)."
            },
            {
                id: 226,
                title: "Invert Binary Tree",
                difficulty: "Easy",
                category: "Tree",
                timeComplexity: "O(N)",
                spaceComplexity: "O(H) (H là chiều cao cây)",
                description: "Đảo ngược một cây nhị phân (hoán đổi nhánh con bên trái và bên phải của tất cả các nút trên cây).",
                examples: [
                    { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" }
                ],
                approach: "Sử dụng đệ quy duyệt cây theo chiều sâu (DFS). Bài toán cơ sở: nếu nút hiện tại rỗng (NULL), ta trả về NULL. Ngược lại, hoán đổi hai nhánh con `left` và `right` của nút hiện tại, sau đó gọi đệ quy đảo ngược tiếp tục cho nhánh trái và nhánh phải.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">TreeNode</span>* <span class="fn">invertTree</span>(<span class="ty">TreeNode</span>* root) {
        <span class="kw">if</span> (!root) <span class="kw">return</span> NULL;
        <span class="ty">TreeNode</span>* temp = root-&gt;left;
        root-&gt;left = <span class="fn">invertTree</span>(root-&gt;right);
        root-&gt;right = <span class="fn">invertTree</span>(temp);
        <span class="kw">return</span> root;
    }
};`,
                memoryTip: "Độ sâu đệ quy lớn nhất bằng chiều cao của cây H. Hệ thống sẽ cấp phát các Stack Frame tương ứng trên Call Stack của luồng thực thi, tốn O(H) bộ nhớ."
            },
            {
                id: 704,
                title: "Binary Search",
                difficulty: "Easy",
                category: "Binary Search",
                timeComplexity: "O(log N)",
                spaceComplexity: "O(1)",
                description: "Cho một mảng số nguyên nums đã sắp xếp tăng dần và một số nguyên target, hãy tìm kiếm target trong mảng. Nếu tìm thấy, trả về chỉ số của nó, ngược lại trả về -1.",
                examples: [
                    { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" }
                ],
                approach: "Áp dụng giải thuật chia đôi phạm vi tìm kiếm liên tục. Ta đặt hai con trỏ `low` ở đầu và `high` ở cuối mảng. Mỗi bước ta tính chốt giữa `mid = low + (high - low)/2` để tránh tràn số nguyên. So sánh `nums[mid]` với target: nếu bằng thì trả về `mid`; nếu nhỏ hơn target, ta thu hẹp tìm kiếm về bên phải bằng cách gán `low = mid + 1`; nếu lớn hơn target, ta thu hẹp về bên trái bằng cách gán `high = mid - 1`.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">search</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums, <span class="ty">int</span> target) {
        <span class="ty">int</span> low = <span class="st">0</span>, high = nums.<span class="fn">size</span>() - <span class="st">1</span>;
        <span class="kw">while</span> (low &lt;= high) {
            <span class="ty">int</span> mid = low + (high - low) / <span class="st">2</span>; <span class="cm">// Tranh overflow</span>
            <span class="kw">if</span> (nums[mid] == target) <span class="kw">return</span> mid;
            <span class="kw">else if</span> (nums[mid] &lt; target) low = mid + <span class="st">1</span>;
            <span class="kw">else</span> high = mid - <span class="st">1</span>;
        }
        <span class="kw">return</span> -<span class="st">1</span>;
    }
};`,
                memoryTip: "Giải thuật này hoàn thành phép tìm kiếm chỉ sau tối đa log2(N) lần so sánh mà không phát sinh thêm bộ nhớ, cực kỳ thích hợp cho các mảng dữ liệu cực lớn."
            },
            {
                id: 387,
                title: "First Unique Character in a String",
                difficulty: "Easy",
                category: "String",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1) (Do bảng chữ cái giới hạn 26 ký tự)",
                description: "Tìm ký tự đầu tiên không lặp lại trong một chuỗi và trả về chỉ số của nó. Nếu không tồn tại, trả về -1.",
                examples: [
                    { input: "s = \"leetcode\"", output: "0 (Ký tự 'l')" }
                ],
                approach: "Sử dụng mảng đếm tần suất kích thước cố định là 26. Quét qua chuỗi lần thứ nhất để đếm số lần xuất hiện của từng ký tự `count[c - 'a']++`. Quét qua chuỗi lần thứ hai, kiểm tra ký tự nào có tần suất xuất hiện đúng bằng 1 đầu tiên thì trả về chỉ số của nó ngay lập tức.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">firstUniqChar</span>(<span class="ty">string</span> s) {
        <span class="ty">int</span> count[<span class="st">26</span>] = {<span class="st">0</span>};
        <span class="kw">for</span> (<span class="ty">char</span> c : s) count[c - <span class="st">'a'</span>]++;
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; s.<span class="fn">length</span>(); i++) {
            <span class="kw">if</span> (count[s[i] - <span class="st">'a'</span>] == <span class="st">1</span>) <span class="kw">return</span> i;
        }
        <span class="kw">return</span> -<span class="st">1</span>;
    }
};`,
                memoryTip: "Kích thước mảng đếm là cố định (26 * 4B = 104 Bytes) nên độ phức tạp không gian phụ trợ được coi là O(1), cấp phát tĩnh cực nhanh trên Stack."
            },
            {
                id: 206,
                title: "Reverse Linked List",
                difficulty: "Easy",
                category: "Linked List",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Đảo ngược một danh sách liên kết đơn bằng phương pháp lặp tại chỗ (In-place).",
                examples: [
                    { input: "head = 1->2->3->NULL", output: "3->2->1->NULL" }
                ],
                approach: "Duyệt qua danh sách bằng cách sử dụng ba con trỏ: `prev` (lưu nút phía trước, khởi tạo bằng NULL), `curr` (nút hiện tại, khởi tạo bằng head) và `next` (lưu nút tiếp theo). Trong vòng lặp, ta lưu tạm `next = curr->next`, đảo ngược liên kết `curr->next = prev`, tịnh tiến `prev = curr` và `curr = next`.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">ListNode</span>* <span class="fn">reverseList</span>(<span class="ty">ListNode</span>* head) {
        <span class="ty">ListNode</span>* prev = NULL;
        <span class="ty">ListNode</span>* curr = head;
        <span class="kw">while</span> (curr) {
            <span class="ty">ListNode</span>* nextNode = curr-&gt;next; <span class="cm">// Luu tam nut tiep theo</span>
            curr-&gt;next = prev;             <span class="cm">// Dao nguoc con tro</span>
            prev = curr;                   <span class="cm">// Tien prev</span>
            curr = nextNode;               <span class="cm">// Tien curr</span>
        }
        <span class="kw">return</span> prev;
    }
};`,
                memoryTip: "Hoàn toàn hoán đổi liên kết pointer tại chỗ, không sinh thêm nút mới trong RAM, cực kỳ tối ưu bộ nhớ."
            },
            {
                id: 100,
                title: "Same Tree",
                difficulty: "Easy",
                category: "Tree",
                timeComplexity: "O(N)",
                spaceComplexity: "O(H)",
                description: "Cho hai nút gốc của hai cây nhị phân p và q, hãy kiểm tra xem hai cây đó có giống hệt nhau về cấu trúc và giá trị hay không.",
                examples: [
                    { input: "p = [1,2,3], q = [1,2,3]", output: "true" }
                ],
                approach: "Kiểm tra đệ quy đồng thời cả hai cây. Nếu cả hai nút đều rỗng, chúng giống nhau (trả về true). Nếu chỉ một trong hai rỗng hoặc giá trị của chúng lệch nhau, trả về false. Tiếp tục gọi đệ quy kiểm tra đồng thời nhánh trái và nhánh phải của cả hai cây.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">bool</span> <span class="fn">isSameTree</span>(<span class="ty">TreeNode</span>* p, <span class="ty">TreeNode</span>* q) {
        <span class="kw">if</span> (!p &amp;&amp; !q) <span class="kw">return</span> <span class="kw">true</span>;
        <span class="kw">if</span> (!p || !q) <span class="kw">return</span> <span class="kw">false</span>;
        <span class="kw">if</span> (p-&gt;val != q-&gt;val) <span class="kw">return</span> <span class="kw">false</span>;
        <span class="kw">return</span> <span class="fn">isSameTree</span>(p-&gt;left, q-&gt;left) &amp;&amp; <span class="fn">isSameTree</span>(p-&gt;right, q-&gt;right);
    }
};`,
                memoryTip: "Độ sâu đệ quy lớn nhất phụ thuộc chiều cao H của cây nhị phân lớn hơn, tốn O(H) không gian Call Stack."
            },
            {
                id: 104,
                title: "Maximum Depth of Binary Tree",
                difficulty: "Easy",
                category: "Tree",
                timeComplexity: "O(N)",
                spaceComplexity: "O(H)",
                description: "Tìm chiều cao (độ sâu lớn nhất) của một cây nhị phân, tính bằng số lượng nút dọc theo con đường dài nhất từ nút gốc đến nút lá xa nhất.",
                examples: [
                    { input: "root = [3,9,20,null,null,15,7]", output: "3" }
                ],
                approach: "Sử dụng đệ quy đếm độ cao từ dưới lên. Chiều cao của một nút bằng 1 cộng với giá trị lớn nhất giữa chiều cao của con trái và con phải. Bài toán cơ sở: nếu nút rỗng, độ sâu bằng 0.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">maxDepth</span>(<span class="ty">TreeNode</span>* root) {
        <span class="kw">if</span> (!root) <span class="kw">return</span> <span class="st">0</span>;
        <span class="kw">return</span> <span class="st">1</span> + <span class="fn">max</span>(<span class="fn">maxDepth</span>(root-&gt;left), <span class="fn">maxDepth</span>(root-&gt;right));
    }
};`,
                memoryTip: "Độ phức tạp bộ nhớ đệ quy O(H) tối ưu cho cây cân bằng vì H = log(N), nhưng có thể lên tới O(N) nếu cây bị lệch thành danh sách liên kết."
            },
            {
                id: 283,
                title: "Move Zeroes",
                difficulty: "Easy",
                category: "Two Pointers",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Cho một mảng nums, hãy di chuyển toàn bộ các số 0 về cuối mảng trong khi vẫn giữ nguyên thứ tự tương đối của các phần tử khác 0 ban đầu.",
                examples: [
                    { input: "nums = [0,1,0,3,12]", output: "[1,3,12,0,0]" }
                ],
                approach: "Sử dụng hai con trỏ chạy trên cùng một mảng. Con trỏ `lastNonZero` dùng để ghi nhận vị trí điền số khác 0 tiếp theo. Khi duyệt mảng bằng con trỏ `i`, nếu gặp số khác 0, ta thực hiện hoán đổi (swap) giá trị giữa `nums[i]` và `nums[lastNonZero]`, sau đó tăng `lastNonZero` lên 1 đơn vị.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">void</span> <span class="fn">moveZeroes</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums) {
        <span class="ty">int</span> lastNonZero = <span class="st">0</span>;
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; nums.<span class="fn">size</span>(); i++) {
            <span class="kw">if</span> (nums[i] != <span class="st">0</span>) {
                <span class="fn">swap</span>(nums[lastNonZero++], nums[i]);
            }
        }
    }
};`,
                memoryTip: "Giải thuật tại chỗ (In-place) không cần cấp phát mảng phụ giúp tiết kiệm bộ nhớ tối đa, giữ O(1) phụ trợ."
            },
            {
                id: 242,
                title: "Valid Anagram",
                difficulty: "Easy",
                category: "String",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Cho hai chuỗi s và t, hãy kiểm tra xem t có phải là một đảo chữ (Anagram) của s hay không (chứa chính xác các ký tự giống nhau với cùng số lần xuất hiện nhưng thứ tự khác nhau).",
                examples: [
                    { input: "s = \"anagram\", t = \"nagaram\"", output: "true" }
                ],
                approach: "Sử dụng một bảng tần suất kích thước 26. Duyệt qua hai chuỗi có cùng độ dài, với chuỗi s ta cộng tần suất `count[s[i] - 'a']++`, chuỗi t ta trừ tần suất `count[t[i] - 'a']--`. Cuối cùng kiểm tra xem toàn bộ mảng đếm có bằng 0 hay không.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">bool</span> <span class="fn">isAnagram</span>(<span class="ty">string</span> s, <span class="ty">string</span> t) {
        <span class="kw">if</span> (s.<span class="fn">length</span>() != t.<span class="fn">length</span>()) <span class="kw">return</span> <span class="kw">false</span>;
        <span class="ty">int</span> count[<span class="st">26</span>] = {<span class="st">0</span>};
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; s.<span class="fn">length</span>(); i++) {
            count[s[i] - <span class="st">'a'</span>]++;
            count[t[i] - <span class="st">'a'</span>]--;
        }
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; <span class="st">26</span>; i++) {
            <span class="kw">if</span> (count[i] != <span class="st">0</span>) <span class="kw">return</span> <span class="kw">false</span>;
        }
        <span class="kw">return</span> <span class="kw">true</span>;
    }
};`,
                memoryTip: "Kích thước mảng đếm cố định 26 số nguyên trên Stack RAM giúp tốc độ xử lý nhanh, bộ nhớ phụ trợ O(1) tuyệt đối."
            },

            // 16-40: MEDIUM
            {
                id: 3,
                title: "Longest Substring Without Repeating Characters",
                difficulty: "Medium",
                category: "Sliding Window",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1) (Bộ ký tự ASCII giới hạn)",
                description: "Cho một chuỗi s, hãy tìm độ dài của chuỗi con dài nhất không chứa ký tự lặp lại.",
                examples: [
                    { input: "s = \"abcabcbb\"", output: "3 (Chuỗi con \"abc\")" }
                ],
                approach: "Áp dụng kỹ thuật Cửa sổ trượt (Sliding Window) kết hợp Hash Map lưu chỉ số xuất hiện gần nhất của ký tự. Ta đặt hai con trỏ `left` và `right` đại diện hai biên của cửa sổ. Khi con trỏ `right` duyệt qua ký tự hiện tại, nếu ký tự này đã xuất hiện bên trong cửa sổ hiện tại (chỉ số xuất hiện gần nhất >= left), ta đẩy biên `left` nhảy cóc sang phải vị trí trùng lặp cũ + 1 để loại bỏ trùng lặp. Lấy max của `right - left + 1` làm độ dài tối ưu.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">lengthOfLongestSubstring</span>(<span class="ty">string</span> s) {
        <span class="ty">int</span> charIndex[<span class="st">128</span>]; <span class="cm">// ASCII Table</span>
        <span class="fn">memset</span>(charIndex, -<span class="st">1</span>, <span class="kw">sizeof</span>(charIndex));
        <span class="ty">int</span> left = <span class="st">0</span>, maxLength = <span class="st">0</span>;
        <span class="kw">for</span> (<span class="ty">int</span> right = <span class="st">0</span>; right &lt; s.<span class="fn">length</span>(); right++) {
            <span class="kw">if</span> (charIndex[s[right]] &gt;= left) {
                left = charIndex[s[right]] + <span class="st">1</span>; <span class="cm">// Nhay left de loai bo duplicate</span>
            }
            charIndex[s[right]] = right;
            maxLength = <span class="fn">max</span>(maxLength, right - left + <span class="st">1</span>);
        }
        <span class="kw">return</span> maxLength;
    }
};`,
                memoryTip: "Bằng việc sử dụng mảng tĩnh kích thước 128 số nguyên thay cho unordered_map động, giải thuật tối ưu hóa bộ nhớ cực tốt và tránh việc truy cập vùng nhớ rời rạc trên Heap."
            },
            {
                id: 11,
                title: "Container With Most Water",
                difficulty: "Medium",
                category: "Two Pointers",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Cho một mảng số nguyên height độ dài n. Có n đường thẳng đứng được vẽ sao cho hai điểm đầu cuối của đường thẳng i là (i, 0) và (i, height[i]). Hãy tìm hai đường thẳng cùng với trục hoành tạo thành một thùng chứa nước chứa được nhiều nước nhất.",
                examples: [
                    { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49 (Nối cột cao 8 ở index 1 và cột cao 7 ở index 8)" }
                ],
                approach: "Sử dụng hai con trỏ trái và phải (`left`, `right`) xuất phát từ hai biên mảng hướng vào nhau. Tại mỗi bước, lượng nước chứa được bằng: `(right - left) * min(height[left], height[right])`. Để tối đa hóa lượng nước, ta giữ lại cột cao hơn và dịch chuyển con trỏ ở cột thấp hơn hướng vào tâm (vì dịch chuyển cột cao hơn chỉ làm giảm chiều rộng mà không thể làm tăng chiều cao tối đa của bể).",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">maxArea</span>(<span class="ty">vector&lt;int&gt;</span>&amp; height) {
        <span class="ty">int</span> left = <span class="st">0</span>, right = height.<span class="fn">size</span>() - <span class="st">1</span>;
        <span class="ty">int</span> maxW = <span class="st">0</span>;
        <span class="kw">while</span> (left &lt; right) {
            <span class="ty">int</span> h = <span class="fn">min</span>(height[left], height[right]);
            maxW = <span class="fn">max</span>(maxW, (right - left) * h);
            <span class="kw">if</span> (height[left] &lt; height[right]) left++;
            <span class="kw">else</span> right--;
        }
        <span class="kw">return</span> maxW;
    }
};`,
                memoryTip: "Kỹ thuật hai con trỏ tối ưu hóa triệt để không gian trạng thái từ O(N^2) xuống O(N) mà không tốn thêm bất kỳ byte nhớ Heap nào."
            },
            {
                id: 15,
                title: "3Sum",
                difficulty: "Medium",
                category: "Two Pointers",
                timeComplexity: "O(N^2)",
                spaceComplexity: "O(log N) đến O(N) (Phụ thuộc bộ sắp xếp)",
                description: "Cho một mảng số nguyên nums, hãy tìm tất cả các bộ ba độc nhất [nums[i], nums[j], nums[k]] sao cho i != j, i != k, j != k và tổng của chúng bằng 0.",
                examples: [
                    { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" }
                ],
                approach: "Sắp xếp mảng tăng dần trước. Duyệt qua mảng bằng một vòng lặp ngoài `i`. Đối với mỗi phần tử `nums[i]`, ta sử dụng kỹ thuật hai con trỏ `left = i + 1` và `right = n - 1` để tìm hai phần tử có tổng bằng `-nums[i]`. Đặc biệt lưu ý bỏ qua các phần tử trùng lặp ở cả vòng lặp ngoài và trong để tránh sinh ra các bộ ba giống nhau.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">vector&lt;vector&lt;int&gt;&gt;</span> <span class="fn">threeSum</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums) {
        <span class="ty">vector&lt;vector&lt;int&gt;&gt;</span> res;
        <span class="fn">sort</span>(nums.<span class="fn">begin</span>(), nums.<span class="fn">end</span>()); <span class="cm">// Sap xep truoc</span>
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; nums.<span class="fn">size</span>(); i++) {
            <span class="kw">if</span> (i &gt; <span class="st">0</span> &amp;&amp; nums[i] == nums[i - <span class="st">1</span>]) <span class="kw">continue</span>; <span class="cm">// Tranh trung lap</span>
            <span class="ty">int</span> left = i + <span class="st">1</span>, right = nums.<span class="fn">size</span>() - <span class="st">1</span>;
            <span class="kw">while</span> (left &lt; right) {
                <span class="ty">int</span> sum = nums[i] + nums[left] + nums[right];
                <span class="kw">if</span> (sum == <span class="st">0</span>) {
                    res.<span class="fn">push_back</span>({nums[i], nums[left], nums[right]});
                    <span class="kw">while</span> (left &lt; right &amp;&amp; nums[left] == nums[left + <span class="st">1</span>]) left++;
                    <span class="kw">while</span> (left &lt; right &amp;&amp; nums[right] == nums[right - <span class="st">1</span>]) right--;
                    left++; right--;
                } <span class="kw">else</span> <span class="kw">if</span> (sum &lt; <span class="st">0</span>) left++;
                <span class="kw">else</span> right--;
            }
        }
        <span class="kw">return</span> res;
    }
};`,
                memoryTip: "Việc sắp xếp mảng in-place giúp loại bỏ sự cần thiết của Hash Set lưu trữ các bộ ba đã duyệt, giảm thiểu áp lực lên bộ nhớ động Heap."
            },
            {
                id: 49,
                title: "Group Anagrams",
                difficulty: "Medium",
                category: "String",
                timeComplexity: "O(N * K log K) (K là chiều dài từ lớn nhất)",
                spaceComplexity: "O(N * K)",
                description: "Cho một mảng các chuỗi strs, hãy nhóm các chuỗi đảo chữ (Anagrams) lại với nhau thành các nhóm độc lập.",
                examples: [
                    { input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" }
                ],
                approach: "Sử dụng Hash Map dạng `unordered_map<string, vector<string>>`. Đối với mỗi chuỗi trong danh sách, ta sao chép chuỗi đó, sắp xếp các ký tự của nó tăng dần để tạo ra một 'khóa gốc' (Sorted Key). Sau đó, đẩy chuỗi ban đầu vào danh sách vector tương ứng với khóa gốc đó trong Hash Map. Kết quả cuối cùng là tập hợp các vector giá trị trong Map.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">vector&lt;vector&lt;string&gt;&gt;</span> <span class="fn">groupAnagrams</span>(<span class="ty">vector&lt;string&gt;</span>&amp; strs) {
        <span class="ty">unordered_map&lt;string, vector&lt;string&gt;&gt;</span> groups;
        <span class="kw">for</span> (<span class="ty">string</span> s : strs) {
            <span class="ty">string</span> key = s;
            <span class="fn">sort</span>(key.<span class="fn">begin</span>(), key.<span class="fn">end</span>()); <span class="cm">// Sap xep lam key goc</span>
            groups[key].<span class="fn">push_back</span>(s);
        }
        <span class="ty">vector&lt;vector&lt;string&gt;&gt;</span> res;
        <span class="kw">for</span> (<span class="kw">auto</span>&amp; pair : groups) res.<span class="fn">push_back</span>(pair.second);
        <span class="kw">return</span> res;
    }
};`,
                memoryTip: "Hash Map lưu trữ các bucket rời rạc trên Heap. Khi N và K lớn, các thao tác phân bổ lại (Rehash) bảng băm có thể tốn tài nguyên đáng kể, nên cân nhắc tối ưu hóa trước bằng cách khai báo `reserve()` cho Map."
            },
            {
                id: 347,
                title: "Top K Frequent Elements",
                difficulty: "Medium",
                category: "Heap",
                timeComplexity: "O(N log K)",
                spaceComplexity: "O(N + K)",
                description: "Cho một mảng số nguyên nums và một số nguyên k, hãy tìm k phần tử xuất hiện nhiều nhất trong mảng.",
                examples: [
                    { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1, 2]" }
                ],
                approach: "Bước 1: Đếm tần suất xuất hiện bằng Hash Map. Bước 2: Sử dụng một Hàng đợi ưu tiên kiểu Min-Heap chứa các cặp `std::pair<int, int>` đại diện cho `(tần suất, giá trị)`. Duyệt qua các phần tử trong Map, đẩy vào Min-Heap; nếu kích thước Heap vượt quá k, ta thực hiện `pop()` phần tử có tần suất nhỏ nhất ra ngoài. Kết quả còn lại trong Heap chính là k phần tử cần tìm.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">vector&lt;int&gt;</span> <span class="fn">topKFrequent</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums, <span class="ty">int</span> k) {
        <span class="ty">unordered_map&lt;int, int&gt;</span> freq;
        <span class="kw">for</span> (<span class="ty">int</span> n : nums) freq[n]++;
        
        <span class="cm">// Min-Heap de luu tru Top K</span>
        <span class="ty">priority_queue&lt;pair&lt;int, int&gt;, vector&lt;pair&lt;int, int&gt;&gt;, greater&lt;pair&lt;int, int&gt;&gt;&gt;</span> pq;
        <span class="kw">for</span> (<span class="kw">auto</span>&amp; p : freq) {
            pq.<span class="fn">push</span>({p.second, p.first});
            <span class="kw">if</span> (pq.<span class="fn">size</span>() &gt; k) pq.<span class="fn">pop</span>(); <span class="cm">// Xoa phan tu it xuat hien nhat</span>
        }
        
        <span class="ty">vector&lt;int&gt;</span> res;
        <span class="kw">while</span> (!pq.<span class="fn">empty</span>()) {
            res.<span class="fn">push_back</span>(pq.<span class="fn">top</span>().second);
            pq.<span class="fn">pop</span>();
        }
        <span class="kw">return</span> res;
    }
};`,
                memoryTip: "Bằng việc duy trì Hàng đợi ưu tiên giới hạn kích thước tối đa k phần tử, giải thuật tiết kiệm bộ nhớ Heap phụ trợ và đẩy nhanh tốc độ chèn xuống O(log K) thay vì O(log N)."
            },
            {
                id: 238,
                title: "Product of Array Except Self",
                difficulty: "Medium",
                category: "Array",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1) (Nếu không tính mảng kết quả trả về)",
                description: "Cho một mảng số nguyên nums, hãy trả về một mảng ans sao cho ans[i] bằng tích của tất cả các phần tử trong nums ngoại trừ nums[i]. Yêu cầu không được sử dụng phép chia và phải chạy trong O(N).",
                examples: [
                    { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" }
                ],
                approach: "Sử dụng tích lũy tiền tố và hậu tố. Ta tạo mảng kết quả `ans`. Lượt đi từ trái qua phải, ta điền vào `ans[i]` tích của tất cả các số bên trái nó. Lượt về từ phải qua trái, ta sử dụng một biến trung gian `rightProduct` lưu tích lũy các số bên phải, nhân trực tiếp vào `ans[i]` hiện tại và cập nhật `rightProduct` liên tục.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">vector&lt;int&gt;</span> <span class="fn">productExceptSelf</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums) {
        <span class="ty">int</span> n = nums.<span class="fn">size</span>();
        <span class="ty">vector&lt;int&gt;</span> ans(n, <span class="st">1</span>);
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">1</span>; i &lt; n; i++) {
            ans[i] = ans[i - <span class="st">1</span>] * nums[i - <span class="st">1</span>]; <span class="cm">// Tich cac phan tu ben trai</span>
        }
        <span class="ty">int</span> rightProduct = <span class="st">1</span>;
        <span class="kw">for</span> (<span class="ty">int</span> i = n - <span class="st">1</span>; i &gt;= <span class="st">0</span>; i--) {
            ans[i] *= rightProduct; <span class="cm">// Nhan tich cac phan tu ben phai</span>
            rightProduct *= nums[i];
        }
        <span class="kw">return</span> ans;
    }
};`,
                memoryTip: "Kỹ thuật co gộp biến giúp giải quyết bài toán tối ưu mà không cần tạo 2 mảng phụ chứa Prefix và Suffix rời rạc, tiết kiệm tối đa bộ nhớ phụ trợ."
            },
            {
                id: 128,
                title: "Longest Consecutive Sequence",
                difficulty: "Medium",
                category: "Array",
                timeComplexity: "O(N)",
                spaceComplexity: "O(N)",
                description: "Cho một mảng số nguyên nums chưa được sắp xếp, hãy tìm độ dài của chuỗi liên tục dài nhất các số nguyên tăng dần (ví dụ: [1, 2, 3, 4] có độ dài 4). Thuật toán phải chạy trong O(N).",
                examples: [
                    { input: "nums = [100, 4, 200, 1, 3, 2]", output: "4 (Chuỗi liên tục là [1, 2, 3, 4])" }
                ],
                approach: "Đẩy toàn bộ các số trong mảng vào một bảng Hash Set (`unordered_set`) để tra cứu trong O(1). Duyệt qua từng số trong Set, ta chỉ bắt đầu đếm chuỗi khi tìm thấy phần tử 'bắt đầu' của một chuỗi tiềm năng (tức là số `num - 1` không tồn tại trong Set). Từ số bắt đầu này, ta dùng vòng lặp liên tục kiểm tra và đếm xem các số tiếp theo `num + 1`, `num + 2`... có trong Set không, từ đó tìm ra độ dài chuỗi lớn nhất.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">longestConsecutive</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums) {
        <span class="ty">unordered_set&lt;int&gt;</span> numSet(nums.<span class="fn">begin</span>(), nums.<span class="fn">end</span>());
        <span class="ty">int</span> longest = <span class="st">0</span>;
        <span class="kw">for</span> (<span class="ty">int</span> num : numSet) {
            <span class="kw">if</span> (!numSet.<span class="fn">count</span>(num - <span class="st">1</span>)) { <span class="cm">// Chi bat dau neu la diem dau chuoi</span>
                <span class="ty">int</span> currentNum = num;
                <span class="ty">int</span> currentStreak = <span class="st">1</span>;
                <span class="kw">while</span> (numSet.<span class="fn">count</span>(currentNum + <span class="st">1</span>)) {
                    currentNum += <span class="st">1</span>;
                    currentStreak += <span class="st">1</span>;
                }
                longest = <span class="fn">max</span>(longest, currentStreak);
            }
        }
        <span class="kw">return</span> longest;
    }
};`,
                memoryTip: "Mặc dù vòng lặp lồng nhau xuất hiện bên trong code, nhưng mỗi phần tử thực tế chỉ được truy cập tối đa 2 lần (1 lần kiểm tra biên và 1 lần chạy đếm), giữ vững độ phức tạp thời gian tuyến tính O(N) với chi phí đánh đổi là O(N) bộ nhớ Heap cho Hash Set."
            },
            {
                id: 155,
                title: "Min Stack",
                difficulty: "Medium",
                category: "Stack",
                timeComplexity: "O(1) cho tất cả thao tác",
                spaceComplexity: "O(N)",
                description: "Thiết kế cấu trúc dữ liệu Ngăn xếp (Stack) hỗ trợ các thao tác cơ bản và có khả năng truy vấn lấy ra phần tử nhỏ nhất hiện tại trong Stack chỉ trong O(1) thời gian.",
                examples: [
                    { input: "push(-2), push(0), push(-3), getMin() -> -3, pop(), top() -> 0, getMin() -> -2" }
                ],
                approach: "Sử dụng hai ngăn xếp chạy song song. Ngăn xếp thứ nhất `st` dùng để lưu trữ dữ liệu thông thường. Ngăn xếp thứ hai `minSt` dùng để lưu trữ giá trị nhỏ nhất tương ứng tính đến thời điểm đó. Khi đẩy (push) một giá trị mới `val` vào `st`, ta cũng đẩy giá trị `min(val, minSt.top())` vào `minSt`. Khi xóa (pop), cả hai stack đều thực hiện pop đồng thời.",
                code: `<span class="kw">class</span> <span class="ty">MinStack</span> {
<span class="ty">stack&lt;int&gt;</span> st;
<span class="ty">stack&lt;int&gt;</span> minSt;
<span class="kw">public</span>:
    <span class="ty">void</span> <span class="fn">push</span>(<span class="ty">int</span> val) {
        st.<span class="fn">push</span>(val);
        <span class="kw">if</span> (minSt.<span class="fn">empty</span>()) minSt.<span class="fn">push</span>(val);
        <span class="kw">else</span> minSt.<span class="fn">push</span>(<span class="fn">min</span>(val, minSt.<span class="fn">top</span>()));
    }
    <span class="ty">void</span> <span class="fn">pop</span>() {
        st.<span class="fn">pop</span>();
        minSt.<span class="fn">pop</span>();
    }
    <span class="ty">int</span> <span class="fn">top</span>() { <span class="kw">return</span> st.<span class="fn">top</span>(); }
    <span class="ty">int</span> <span class="fn">getMin</span>() { <span class="kw">return</span> minSt.<span class="fn">top</span>(); }
};`,
                memoryTip: "Kỹ thuật đồng bộ hóa hai stack song song giúp loại bỏ hoàn toàn nhu cầu duyệt stack tìm min (tốn O(N)), đánh đổi bằng việc tốn gấp đôi bộ nhớ Stack liên tục cực kỳ an toàn và tối ưu."
            },
            {
                id: 22,
                title: "Generate Parentheses",
                difficulty: "Medium",
                category: "Stack",
                timeComplexity: "O(4^N / sqrt(N)) (Số Catalan)",
                spaceComplexity: "O(N) (Không gian Call Stack đệ quy)",
                description: "Cho n cặp dấu ngoặc đơn, hãy viết hàm tạo ra tất cả các tổ hợp dấu ngoặc hợp lệ.",
                examples: [
                    { input: "n = 3", output: "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]" }
                ],
                approach: "Áp dụng kỹ thuật Đệ quy Quay lui (Backtracking). Ta xây dựng chuỗi kết quả ký tự từng bước. Quy tắc nhánh rẽ hợp lệ: ta có thể thêm một dấu mở ngoặc '(' nếu số lượng dấu mở ngoặc đã dùng nhỏ hơn n; và ta có thể thêm một dấu đóng ngoặc ')' nếu số lượng dấu đóng ngoặc đã dùng nhỏ hơn số lượng dấu mở ngoặc đã dùng.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
    <span class="ty">vector&lt;string&gt;</span> res;
    <span class="ty">void</span> <span class="fn">backtrack</span>(<span class="ty">string</span> curr, <span class="ty">int</span> open, <span class="ty">int</span> close, <span class="ty">int</span> maxN) {
        <span class="kw">if</span> (curr.<span class="fn">length</span>() == maxN * <span class="st">2</span>) {
            res.<span class="fn">push_back</span>(curr);
            <span class="kw">return</span>;
        }
        <span class="kw">if</span> (open &lt; maxN) backtrack(curr + <span class="st">'('</span>, open + <span class="st">1</span>, close, maxN);
        <span class="kw">if</span> (close &lt; open) backtrack(curr + <span class="st">')'</span>, open, close + <span class="st">1</span>, maxN);
    }
<span class="kw">public</span>:
    <span class="ty">vector&lt;string&gt;</span> <span class="fn">generateParenthesis</span>(<span class="ty">int</span> n) {
        <span class="fn">backtrack</span>(<span class="st">""</span>, <span class="st">0</span>, <span class="st">0</span>, n);
        <span class="kw">return</span> res;
    }
};`,
                memoryTip: "Không gian Call Stack hệ thống tỷ lệ thuận với 2N (độ sâu tối đa của cây đệ quy quay lui), phân bổ tối ưu trên vùng nhớ Stack cục bộ."
            },
            {
                id: 739,
                title: "Daily Temperatures",
                difficulty: "Medium",
                category: "Stack",
                timeComplexity: "O(N)",
                spaceComplexity: "O(N)",
                description: "Cho một mảng số nguyên temperatures đại diện cho nhiệt độ hàng ngày. Hãy trả về một mảng ans sao cho ans[i] là số ngày bạn phải đợi cho đến khi có nhiệt độ ấm hơn. Nếu không có ngày nào ấm hơn, gán ans[i] = 0.",
                examples: [
                    { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" }
                ],
                approach: "Sử dụng cấu trúc dữ liệu Ngăn xếp Đơn điệu Giảm dần (Monotonic Decreasing Stack). Ta duyệt qua mảng nhiệt độ từ trái sang phải, lưu trữ các chỉ số (index) vào Stack. Khi gặp một ngày có nhiệt độ lớn hơn nhiệt độ của ngày ở index đỉnh Stack, ta liên tục rút (pop) đỉnh Stack ra, tính khoảng cách ngày `i - prevIndex` điền vào mảng kết quả, cho đến khi Stack trống hoặc nhiệt độ đỉnh Stack lớn hơn ngày hiện tại.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">vector&lt;int&gt;</span> <span class="fn">dailyTemperatures</span>(<span class="ty">vector&lt;int&gt;</span>&amp; T) {
        <span class="ty">int</span> n = T.<span class="fn">size</span>();
        <span class="ty">vector&lt;int&gt;</span> ans(n, <span class="st">0</span>);
        <span class="ty">stack&lt;int&gt;</span> st; <span class="cm">// Luu tru chi so index</span>
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; n; i++) {
            <span class="kw">while</span> (!st.<span class="fn">empty</span>() &amp;&amp; T[i] &gt; T[st.<span class="fn">top</span>()]) {
                <span class="ty">int</span> idx = st.<span class="fn">top</span>(); st.<span class="fn">pop</span>();
                ans[idx] = i - idx; <span class="cm">// Khoang cach ngay cho doi</span>
            }
            st.<span class="fn">push</span>(i);
        }
        <span class="kw">return</span> ans;
    }
};`,
                memoryTip: "Kỹ thuật Monotonic Stack giúp mỗi index chỉ bị push và pop đúng 1 lần duy nhất, tối ưu hiệu năng CPU và bộ nhớ đệm cực tốt."
            },
            {
                id: 875,
                title: "Koko Eating Bananas",
                difficulty: "Medium",
                category: "Binary Search",
                timeComplexity: "O(N log M) (M là số chuối lớn nhất trong 1 nải)",
                spaceComplexity: "O(1)",
                description: "Có n nải chuối, nải thứ i có piles[i] quả chuối. Koko muốn ăn hết chuối trong vòng h giờ. Hãy tìm tốc độ ăn chuối tối thiểu k (quả/giờ) sao cho Koko có thể ăn hết chuối đúng giờ.",
                examples: [
                    { input: "piles = [3,6,7,11], h = 8", output: "4 (Tốc độ tối thiểu k=4)" }
                ],
                approach: "Áp dụng Tìm kiếm nhị phân trên không gian nghiệm. Tốc độ ăn tối thiểu `low = 1` quả/giờ, tốc độ ăn tối đa `high = max(piles)` quả/giờ. Với mỗi chốt giữa `mid = low + (high - low)/2`, ta tính tổng số giờ cần thiết để ăn hết chuối: `hours = sum(ceil(pile / mid))`. Nếu tổng số giờ <= h, tốc độ ăn này khả thi, ta thử tìm tốc độ nhỏ hơn bằng cách gán `high = mid`; ngược lại ta tăng tốc độ ăn bằng cách gán `low = mid + 1`.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
    <span class="ty">bool</span> <span class="fn">canEatAll</span>(<span class="ty">vector&lt;int&gt;</span>&amp; piles, <span class="ty">int</span> speed, <span class="ty">int</span> h) {
        <span class="ty">long long</span> hours = <span class="st">0</span>;
        <span class="kw">for</span> (<span class="ty">int</span> pile : piles) {
            hours += (pile + speed - <span class="st">1</span>) / speed; <span class="cm">// Phép tinh lam tron len</span>
        }
        <span class="kw">return</span> hours &lt;= h;
    }
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">minEatingSpeed</span>(<span class="ty">vector&lt;int&gt;</span>&amp; piles, <span class="ty">int</span> h) {
        <span class="ty">int</span> low = <span class="st">1</span>, high = *<span class="fn">max_element</span>(piles.<span class="fn">begin</span>(), piles.<span class="fn">end</span>());
        <span class="kw">while</span> (low &lt; high) {
            <span class="ty">int</span> mid = low + (high - low) / <span class="st">2</span>;
            <span class="kw">if</span> (<span class="fn">canEatAll</span>(piles, mid, h)) high = mid;
            <span class="kw">else</span> low = mid + <span class="st">1</span>;
        }
        <span class="kw">return</span> low;
    }
};`,
                memoryTip: "Tìm kiếm trên phạm vi kết quả đầu ra giúp giải quyết bài toán tối ưu cực kỳ tinh tế mà không tiêu tốn bộ nhớ lưu trữ trung gian."
            },
            {
                id: 33,
                title: "Search in Rotated Sorted Array",
                difficulty: "Medium",
                category: "Binary Search",
                timeComplexity: "O(log N)",
                spaceComplexity: "O(1)",
                description: "Cho một mảng nums đã được sắp xếp tăng dần nhưng bị xoay vòng tại một chốt ẩn không biết trước (ví dụ: [0,1,2,4,5,6,7] trở thành [4,5,6,7,0,1,2]). Hãy tìm kiếm target trong mảng xoay vòng đó.",
                examples: [
                    { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" }
                ],
                approach: "Sử dụng Tìm kiếm nhị phân cải tiến. Trong một mảng xoay vòng, chốt giữa `mid` luôn chia mảng thành 2 nửa: một nửa chắc chắn được sắp xếp tăng dần tuần tự, và một nửa bị xoay vòng. Ta xác định nửa nào được sắp xếp chuẩn: nếu nửa trái chuẩn (`nums[low] <= nums[mid]`), ta kiểm tra xem target có nằm trong biên của nửa trái không để co hẹp tương ứng. Làm tương tự cho nửa phải nếu nửa phải chuẩn.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">search</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums, <span class="ty">int</span> target) {
        <span class="ty">int</span> low = <span class="st">0</span>, high = nums.<span class="fn">size</span>() - <span class="st">1</span>;
        <span class="kw">while</span> (low &lt;= high) {
            <span class="ty">int</span> mid = low + (high - low) / <span class="st">2</span>;
            <span class="kw">if</span> (nums[mid] == target) <span class="kw">return</span> mid;
            <span class="kw">if</span> (nums[low] &lt;= nums[mid]) { <span class="cm">// Nua trai sap xep chuan</span>
                <span class="kw">if</span> (nums[low] &lt;= target &amp;&amp; target &lt; nums[mid]) high = mid - <span class="st">1</span>;
                <span class="kw">else</span> low = mid + <span class="st">1</span>;
            } <span class="kw">else</span> { <span class="cm">// Nua phai sap xep chuan</span>
                <span class="kw">if</span> (nums[mid] &lt; target &amp;&amp; target &lt;= nums[high]) low = mid + <span class="st">1</span>;
                <span class="kw">else</span> high = mid - <span class="st">1</span>;
            }
        }
        <span class="kw">return</span> -<span class="st">1</span>;
    }
};`,
                memoryTip: "Kỹ thuật co ranh giới thông minh giúp giải thuật đạt hiệu năng O(log N) mà không cần phân tách hay sắp xếp lại mảng vật lý ban đầu."
            },
            {
                id: 19,
                title: "Remove Nth Node From End of List",
                difficulty: "Medium",
                category: "Linked List",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Xóa nút thứ n tính từ cuối danh sách liên kết đơn lên và trả về nút gốc của danh sách mới.",
                examples: [
                    { input: "head = 1->2->3->4->5, n = 2", output: "1->2->3->5" }
                ],
                approach: "Áp dụng kỹ thuật Hai con trỏ cách khoảng (Two Pointers - Fast and Slow). Ta sử dụng nút giả `dummy` trỏ tới `head`. Thiết lập hai con trỏ `first` và `second` ở nút `dummy`. Dịch chuyển `first` đi trước n + 1 bước. Sau đó, dịch chuyển đồng thời cả hai con trỏ từng bước một cho đến khi `first` gặp NULL. Khi đó, `second` sẽ dừng ngay trước nút cần xóa. Ta thực hiện `second->next = second->next->next` để ngắt kết nối nút cần xóa.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">ListNode</span>* <span class="fn">removeNthFromEnd</span>(<span class="ty">ListNode</span>* head, <span class="ty">int</span> n) {
        <span class="ty">ListNode</span> dummy(<span class="st">0</span>);
        dummy.next = head;
        <span class="ty">ListNode</span>* first = &amp;dummy;
        <span class="ty">ListNode</span>* second = &amp;dummy;
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt;= n; i++) first = first-&gt;next; <span class="cm">// Di truoc n+1 buoc</span>
        <span class="kw">while</span> (first) {
            first = first-&gt;next;
            second = second-&gt;next;
        }
        <span class="ty">ListNode</span>* toDelete = second-&gt;next;
        second-&gt;next = second-&gt;next-&gt;next; <span class="cm">// Ngat ket noi nut</span>
        <span class="fn">delete</span> toDelete; <span class="cm">// Giai phong Heap RAM trong C++</span>
        <span class="kw">return</span> dummy.next;
    }
};`,
                memoryTip: "Kỹ thuật một lượt duyệt (One-pass) giúp giải thuật đạt tốc độ lý tưởng. Luôn ghi nhớ giải phóng (delete/free) nút bị xóa để tránh rò rỉ bộ nhớ Heap."
            },
            {
                id: 328,
                title: "Odd Even Linked List",
                difficulty: "Medium",
                category: "Linked List",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Gom toàn bộ các nút ở vị trí chỉ số lẻ lên trước, sau đó nối tiếp toàn bộ các nút ở vị trí chỉ số chẵn của danh sách liên kết đơn ban đầu.",
                examples: [
                    { input: "head = 1->2->3->4->5", output: "1->3->5->2->4" }
                ],
                approach: "Sử dụng hai con trỏ độc lập `odd` đại diện danh sách lẻ (khởi tạo bằng head) và `even` đại diện chẵn (khởi tạo bằng `head->next`). Đồng thời lưu lại nút gốc chẵn `evenHead` để nối đuôi sau này. Duyệt qua danh sách, ta liên tục chuyển liên kết: `odd->next = even->next; odd = odd->next; even->next = odd->next; even = even->next`. Kết thúc nối `odd->next = evenHead`.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">ListNode</span>* <span class="fn">oddEvenList</span>(<span class="ty">ListNode</span>* head) {
        <span class="kw">if</span> (!head) <span class="kw">return</span> NULL;
        <span class="ty">ListNode</span>* odd = head;
        <span class="ty">ListNode</span>* even = head-&gt;next;
        <span class="ty">ListNode</span>* evenHead = even; <span class="cm">// Luu goc chan</span>
        <span class="kw">while</span> (even &amp;&amp; even-&gt;next) {
            odd-&gt;next = even-&gt;next;
            odd = odd-&gt;next;
            even-&gt;next = odd-&gt;next;
            even = even-&gt;next;
        }
        odd-&gt;next = evenHead; <span class="cm">// Noi duoi le vao dau chan</span>
        <span class="kw">return</span> head;
    }
};`,
                memoryTip: "Tái cấu trúc trực tiếp liên kết pointer vật lý In-place trong O(1) bộ nhớ phụ trợ, cực kỳ nhanh chóng và an toàn."
            },
            {
                id: 102,
                title: "Binary Tree Level Order Traversal",
                difficulty: "Medium",
                category: "Tree",
                timeComplexity: "O(N)",
                spaceComplexity: "O(N) (Kích thước Hàng đợi chứa tầng lá)",
                description: "Duyệt cây nhị phân theo từng tầng từ trên xuống dưới, từ trái qua phải (BFS Tree Traversal) và trả về mảng 2D.",
                examples: [
                    { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" }
                ],
                approach: "Sử dụng cấu trúc dữ liệu Hàng đợi (Queue) để thực hiện duyệt theo chiều rộng (BFS). Ta đẩy nút gốc vào Queue. Trong vòng lặp ngoài, mỗi lượt ta đếm kích thước hiện tại của Queue `size` (tương ứng số lượng nút trong tầng). Vòng lặp trong chạy đúng `size` lần để rút nút ra, lưu giá trị, và đẩy các con trái/phải tương ứng vào Queue.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">vector&lt;vector&lt;int&gt;&gt;</span> <span class="fn">levelOrder</span>(<span class="ty">TreeNode</span>* root) {
        <span class="kw">if</span> (!root) <span class="kw">return</span> {};
        <span class="ty">vector&lt;vector&lt;int&gt;&gt;</span> res;
        <span class="ty">queue&lt;TreeNode*&gt;</span> q;
        q.<span class="fn">push</span>(root);
        <span class="kw">while</span> (!q.<span class="fn">empty</span>()) {
            <span class="ty">int</span> size = q.<span class="fn">size</span>();
            <span class="ty">vector&lt;int&gt;</span> level;
            <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; size; i++) {
                <span class="ty">TreeNode</span>* curr = q.<span class="fn">front</span>(); q.<span class="fn">pop</span>();
                level.<span class="fn">push_back</span>(curr-&gt;val);
                <span class="kw">if</span> (curr-&gt;left) q.<span class="fn">push</span>(curr-&gt;left);
                <span class="kw">if</span> (curr-&gt;right) q.<span class="fn">push</span>(curr-&gt;right);
            }
            res.<span class="fn">push_back</span>(level);
        }
        <span class="kw">return</span> res;
    }
};`,
                memoryTip: "Kích thước Queue lớn nhất chứa toàn bộ số lượng nút lá ở tầng cuối cùng (tối đa N/2 nút đối với cây hoàn chỉnh), tiêu thụ bộ nhớ động trên Heap."
            },
            {
                id: 98,
                title: "Validate Binary Search Tree",
                difficulty: "Medium",
                category: "Tree",
                timeComplexity: "O(N)",
                spaceComplexity: "O(H)",
                description: "Kiểm tra xem một cây nhị phân có phải là Cây tìm kiếm nhị phân (BST) hợp lệ hay không (nhánh trái chứa các nút có giá trị nhỏ hơn nút gốc, nhánh phải lớn hơn).",
                examples: [
                    { input: "root = [2,1,3]", output: "true" }
                ],
                approach: "Sử dụng đệ quy truyền kèm phạm vi giá trị hợp lệ `[minVal, maxVal]` cho từng nút. Ban đầu nút gốc có phạm vi `[-infinity, +infinity]`. Khi đi xuống con bên trái, giới hạn trên thay đổi: `maxVal = root->val`. Khi đi xuống con bên phải, giới hạn dưới thay đổi: `minVal = root->val`. Nếu nút hiện tại vượt ra khỏi biên giới hạn, cây không hợp lệ.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
    <span class="ty">bool</span> <span class="fn">validate</span>(<span class="ty">TreeNode</span>* node, <span class="ty">long long</span> minV, <span class="ty">long long</span> maxV) {
        <span class="kw">if</span> (!node) <span class="kw">return</span> <span class="kw">true</span>;
        <span class="kw">if</span> (node-&gt;val &lt;= minV || node-&gt;val &gt;= maxV) <span class="kw">return</span> <span class="kw">false</span>;
        <span class="kw">return</span> <span class="fn">validate</span>(node-&gt;left, minV, node-&gt;val) &amp;&amp;
               <span class="fn">validate</span>(node-&gt;right, node-&gt;val, maxV);
    }
<span class="kw">public</span>:
    <span class="ty">bool</span> <span class="fn">isValidBST</span>(<span class="ty">TreeNode</span>* root) {
        <span class="kw">return</span> <span class="fn">validate</span>(root, LONG_MIN, LONG_MAX);
    }
};`,
                memoryTip: "Việc sử dụng kiểu `long long` giúp tránh tràn số nguyên khi nút gốc chứa giá trị `INT_MIN` hoặc `INT_MAX`. Độ sâu đệ quy Stack là O(H)."
            },
            {
                id: 200,
                title: "Number of Islands",
                difficulty: "Medium",
                category: "Graph",
                timeComplexity: "O(R * C) (R là hàng, C là cột)",
                spaceComplexity: "O(R * C) (Trong trường hợp xấu nhất toàn bộ grid là đất liền)",
                description: "Cho một lưới 2D grid kích thước R x C chứa các ký tự '1' (đất liền) và '0' (nước), hãy đếm số lượng hòn đảo biệt lập (các vùng đất '1' kết nối với nhau theo 4 hướng ngang dọc).",
                examples: [
                    { input: "grid = [['1','1','0'],['1','1','0'],['0','0','1']]", output: "2" }
                ],
                approach: "Duyệt qua từng ô trong lưới 2D. Nếu phát hiện đất liền '1', ta bắt đầu loang đệ quy theo chiều sâu (DFS) sang các ô lân cận để đánh dấu toàn bộ hòn đảo đã được duyệt (để tránh lặp lại, ta đổi giá trị đất liền '1' đã duyệt thành nước '0'). Mỗi lần kích hoạt DFS từ vòng lặp ngoài đại diện cho một hòn đảo mới được tìm thấy.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
    <span class="ty">void</span> <span class="fn">dfs</span>(<span class="ty">vector&lt;vector&lt;char&gt;&gt;</span>&amp; grid, <span class="ty">int</span> r, <span class="ty">int</span> c) {
        <span class="kw">if</span> (r &lt; <span class="st">0</span> || c &lt; <span class="st">0</span> || r &gt;= grid.<span class="fn">size</span>() || c &gt;= grid[<span class="st">0</span>].<span class="fn">size</span>() || grid[r][c] == <span class="st">'0'</span>) {
            <span class="kw">return</span>;
        }
        grid[r][c] = <span class="st">'0'</span>; <span class="cm">// Danh dau da duyet</span>
        <span class="fn">dfs</span>(grid, r - <span class="st">1</span>, c);
        <span class="fn">dfs</span>(grid, r + <span class="st">1</span>, c);
        <span class="fn">dfs</span>(grid, r, c - <span class="st">1</span>);
        <span class="fn">dfs</span>(grid, r, c + <span class="st">1</span>);
    }
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">numIslands</span>(<span class="ty">vector&lt;vector&lt;char&gt;&gt;</span>&amp; grid) {
        <span class="ty">int</span> count = <span class="st">0</span>;
        <span class="kw">for</span> (<span class="ty">int</span> r = <span class="st">0</span>; r &lt; grid.<span class="fn">size</span>(); r++) {
            <span class="kw">for</span> (<span class="ty">int</span> c = <span class="st">0</span>; c &lt; grid[<span class="st">0</span>].<span class="fn">size</span>(); c++) {
                <span class="kw">if</span> (grid[r][c] == <span class="st">'1'</span>) {
                    count++;
                    <span class="fn">dfs</span>(grid, r, c); <span class="cm">// Loang danh dau</span>
                }
            }
        }
        <span class="kw">return</span> count;
    }
};`,
                memoryTip: "Việc thay đổi trực tiếp giá trị grid tại chỗ (`grid[r][c] = '0'`) giúp giải thuật chạy mà không cần sử dụng mảng phụ `visited[][]`, tiết kiệm dung lượng bộ nhớ Heap cực lớn."
            },
            {
                id: 133,
                title: "Clone Graph",
                difficulty: "Medium",
                category: "Graph",
                timeComplexity: "O(V + E)",
                spaceComplexity: "O(V) (Bảng băm lưu trữ các đỉnh nhân bản)",
                description: "Hãy tạo một bản sao sâu (Deep Copy) của một đồ thị liên thông vô hướng.",
                examples: [
                    { input: "Node 1 -> Node 2, Node 2 -> Node 3, Node 1 -> Node 3", output: "Đồ thị nhân bản sâu hoàn toàn mới trong RAM" }
                ],
                approach: "Sử dụng thuật toán duyệt đồ thị DFS hoặc BFS kết hợp với một bảng Hash Map dạng `unordered_map<Node*, Node*>` để liên kết ánh xạ giữa nút gốc và nút nhân bản mới. Khi gặp một đỉnh chưa được nhân bản, ta chạy `new Node()`, lưu vào Map và gọi đệ quy nhân bản sâu cho toàn bộ danh sách kề `neighbors` của nó.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
    <span class="ty">unordered_map&lt;Node*, Node*&gt;</span> copies;
<span class="kw">public</span>:
    <span class="ty">Node</span>* <span class="fn">cloneGraph</span>(<span class="ty">Node</span>* node) {
        <span class="kw">if</span> (!node) <span class="kw">return</span> NULL;
        <span class="kw">if</span> (copies.<span class="fn">count</span>(node)) <span class="kw">return</span> copies[node];
        
        <span class="ty">Node</span>* clone = <span class="kw">new</span> <span class="ty">Node</span>(node-&gt;val);
        copies[node] = clone;
        <span class="kw">for</span> (<span class="ty">Node</span>* neighbor : node-&gt;neighbors) {
            clone-&gt;neighbors.<span class="fn">push_back</span>(<span class="fn">cloneGraph</span>(neighbor));
        }
        <span class="kw">return</span> clone;
    }
};`,
                memoryTip: "Khai báo `new` liên tục tạo các thực thể Node mới trên vùng nhớ Heap. Cần kiểm soát chặt chẽ ánh xạ Hash Map để tránh việc đệ quy tuần hoàn vô hạn trên đồ thị chứa chu trình."
            },
            {
                id: 207,
                title: "Course Schedule",
                difficulty: "Medium",
                category: "Graph",
                timeComplexity: "O(V + E)",
                spaceComplexity: "O(V + E)",
                description: "Có tổng cộng numCourses khóa học bạn phải hoàn thành, đánh số từ 0 đến numCourses - 1. Cho mảng prerequisites trong đó prerequisites[i] = [a, b] nghĩa là bạn phải hoàn thành khóa học b trước khi học khóa học a. Hãy kiểm tra xem bạn có thể hoàn thành tất cả các khóa học hay không (phát hiện chu trình trong đồ thị có hướng).",
                examples: [
                    { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true" },
                    { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false (Chu trình vô hạn)" }
                ],
                approach: "Bài toán thực chất là kiểm tra xem đồ thị có hướng được tạo bởi danh sách tiền đề có chứa chu trình hay không. Ta sử dụng thuật toán duyệt đồ thị DFS kết hợp mảng trạng thái `visited` có 3 giá trị: `0` (chưa duyệt), `1` (đang duyệt - nằm trong Call Stack hiện tại), `2` (đã duyệt xong an toàn). Nếu quá trình DFS gặp một nút đang có trạng thái `1`, tức là ta đã phát hiện một cạnh ngược tạo thành chu trình.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
    <span class="ty">bool</span> <span class="fn">hasCycle</span>(<span class="ty">int</span> u, <span class="ty">vector&lt;vector&lt;int&gt;&gt;</span>&amp; adj, <span class="ty">vector&lt;int&gt;</span>&amp; visited) {
        visited[u] = <span class="st">1</span>; <span class="cm">// Đang duyệt</span>
        <span class="kw">for</span> (<span class="ty">int</span> v : adj[u]) {
            <span class="kw">if</span> (visited[v] == <span class="st">1</span>) <span class="kw">return</span> <span class="kw">true</span>; <span class="cm">// Phat hien chu trinh!</span>
            <span class="kw">if</span> (visited[v] == <span class="st">0</span> &amp;&amp; <span class="fn">hasCycle</span>(v, adj, visited)) <span class="kw">return</span> <span class="kw">true</span>;
        }
        visited[u] = <span class="st">2</span>; <span class="cm">// Đã duyệt xong an toàn</span>
        <span class="kw">return</span> <span class="kw">false</span>;
    }
<span class="kw">public</span>:
    <span class="ty">bool</span> <span class="fn">canFinish</span>(<span class="ty">int</span> numCourses, <span class="ty">vector&lt;vector&lt;int&gt;&gt;</span>&amp; prerequisites) {
        <span class="ty">vector&lt;vector&lt;int&gt;&gt;</span> adj(numCourses);
        <span class="kw">for</span> (<span class="kw">auto</span>&amp; pre : prerequisites) adj[pre[<span class="st">1</span>]].<span class="fn">push_back</span>(pre[<span class="st">0</span>]);
        <span class="ty">vector&lt;int&gt;</span> visited(numCourses, <span class="st">0</span>);
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; numCourses; i++) {
            <span class="kw">if</span> (visited[i] == <span class="st">0</span> &amp;&amp; <span class="fn">hasCycle</span>(i, adj, visited)) <span class="kw">return</span> <span class="kw">false</span>;
        }
        <span class="kw">return</span> <span class="kw">true</span>;
    }
};`,
                memoryTip: "Việc lưu trữ đồ thị dưới dạng Danh sách kề `vector<vector<int>>` giúp duyệt cực nhanh và tiết kiệm bộ nhớ tối đa O(V + E) so với việc dùng Ma trận kề O(V^2)."
            },
            {
                id: 1143,
                title: "Longest Common Subsequence",
                difficulty: "Medium",
                category: "Dynamic Programming",
                timeComplexity: "O(N * M) (N, M là độ dài 2 chuỗi)",
                spaceComplexity: "O(N * M)",
                description: "Cho hai chuỗi text1 và text2, hãy tìm độ dài của chuỗi con chung dài nhất (LCS) giữa chúng.",
                examples: [
                    { input: "text1 = \"abcde\", text2 = \"ace\"", output: "3 (Chuỗi chung dài nhất là \"ace\")" }
                ],
                approach: "Áp dụng Quy hoạch động lập bảng Bottom-Up 2D. Gọi `dp[i][j]` là độ dài LCS của chuỗi con `text1[0...i-1]` và `text2[0...j-1]`. Công thức chuyển trạng thái:\n- Nếu `text1[i-1] == text2[j-1]`: hai ký tự khớp nhau, `dp[i][j] = 1 + dp[i-1][j-1]` (tăng độ dài + đi chéo lên trên bên trái).\n- Nếu lệch: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (mượn giá trị tối ưu lớn nhất từ ô trên hoặc ô trái).",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">longestCommonSubsequence</span>(<span class="ty">string</span> text1, <span class="ty">string</span> text2) {
        <span class="ty">int</span> n = text1.<span class="fn">length</span>(), m = text2.<span class="fn">length</span>();
        <span class="ty">vector&lt;vector&lt;int&gt;&gt;</span> dp(n + <span class="st">1</span>, <span class="ty">vector&lt;int&gt;</span>(m + <span class="st">1</span>, <span class="st">0</span>));
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">1</span>; i &lt;= n; i++) {
            <span class="kw">for</span> (<span class="ty">int</span> j = <span class="st">1</span>; j &lt;= m; j++) {
                <span class="kw">if</span> (text1[i - <span class="st">1</span>] == text2[j - <span class="st">1</span>]) {
                    dp[i][j] = <span class="st">1</span> + dp[i - <span class="st">1</span>][j - <span class="st">1</span>];
                } <span class="kw">else</span> {
                    dp[i][j] = <span class="fn">max</span>(dp[i - <span class="st">1</span>][j], dp[i][j - 1]);
                }
            }
        }
        <span class="kw">return</span> dp[n][m];
    }
};`,
                memoryTip: "Bảng quy hoạch động 2D kích thước (N+1)*(M+1) được phân bổ động liên tục trên Heap. Có thể tối ưu hóa bộ nhớ xuống O(min(N, M)) bằng cách sử dụng hai hàng cuộn lặp (rolling array)."
            },
            {
                id: 322,
                title: "Coin Change",
                difficulty: "Medium",
                category: "Dynamic Programming",
                timeComplexity: "O(N * amount) (N là số loại tiền xu)",
                spaceComplexity: "O(amount)",
                description: "Cho một mảng các số nguyên coins đại diện cho các mệnh giá tiền xu và số nguyên amount đại diện cho tổng số tiền. Hãy tìm số lượng đồng xu ít nhất cần thiết để tạo thành tổng số tiền đó. Nếu không thể tạo thành, trả về -1.",
                examples: [
                    { input: "coins = [1,2,5], amount = 11", output: "3 (Bằng xu 5 + 5 + 1)" }
                ],
                approach: "Áp dụng Quy hoạch động Bottom-Up mảng 1D. Gọi `dp[i]` là số lượng đồng xu tối thiểu cần để đổi được số tiền là `i`. Khởi tạo `dp[0] = 0` và tất cả các ô khác bằng `amount + 1` (giá trị vô hạn giả lập). Công thức trạng thái lặp:\nVới mỗi đồng xu `c` trong coins:\n`dp[i] = min(dp[i], 1 + dp[i - c])` (nếu `i >= c`).",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">coinChange</span>(<span class="ty">vector&lt;int&gt;</span>&amp; coins, <span class="ty">int</span> amount) {
        <span class="ty">vector&lt;int&gt;</span> dp(amount + <span class="st">1</span>, amount + <span class="st">1</span>);
        dp[<span class="st">0</span>] = <span class="st">0</span>;
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">1</span>; i &lt;= amount; i++) {
            <span class="kw">for</span> (<span class="ty">int</span> coin : coins) {
                <span class="kw">if</span> (coin &lt;= i) {
                    dp[i] = <span class="fn">min</span>(dp[i], <span class="st">1</span> + dp[i - coin]);
                }
            }
        }
        <span class="kw">return</span> dp[amount] &gt; amount ? -<span class="st">1</span> : dp[amount];
    }
};`,
                memoryTip: "Mảng 1D tuyến tính kích thước `amount + 1` giúp tiết kiệm đáng kể không gian RAM so với bảng quy hoạch động 2D cồng kềnh."
            },
            {
                id: 198,
                title: "House Robber",
                difficulty: "Medium",
                category: "Dynamic Programming",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Bạn là một kẻ trộm đang lên kế hoạch cướp các ngôi nhà trên một con phố. Mỗi ngôi nhà có một lượng tiền nhất định. Tuy nhiên, các ngôi nhà liền kề có hệ thống báo động kết nối trực tiếp, bạn không được phép cướp hai nhà liên tiếp. Hãy tìm số tiền lớn nhất bạn có thể cướp được.",
                examples: [
                    { input: "nums = [2,7,9,3,1]", output: "12 (Cướp nhà 1, 3, 5: 2 + 9 + 1 = 12)" }
                ],
                approach: "Áp dụng quy hoạch động. Tại mỗi ngôi nhà `i`, ta có hai lựa chọn:\n- Lựa chọn 1: Cướp ngôi nhà này -> Số tiền nhận được bằng tiền nhà này `nums[i]` cộng tiền tối đa cướp được tính đến nhà `i-2`.\n- Lựa chọn 2: Bỏ qua nhà này -> Tiền tối đa giữ nguyên của nhà `i-1`.\nCông thức: `dp[i] = max(dp[i-1], nums[i] + dp[i-2])`.\nTa có thể tối ưu hóa bộ nhớ chỉ cần dùng 2 biến lưu giữ kết quả nhà `i-1` và `i-2` liên tục cập nhật.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">rob</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums) {
        <span class="ty">int</span> n = nums.<span class="fn">size</span>();
        <span class="kw">if</span> (n == <span class="st">0</span>) <span class="kw">return</span> <span class="st">0</span>;
        <span class="kw">if</span> (n == <span class="st">1</span>) <span class="kw">return</span> nums[<span class="st">0</span>];
        <span class="ty">int</span> prev2 = <span class="st">0</span>; <span class="cm">// Luu dp[i-2]</span>
        <span class="ty">int</span> prev1 = <span class="st">0</span>; <span class="cm">// Luu dp[i-1]</span>
        <span class="kw">for</span> (<span class="ty">int</span> num : nums) {
            <span class="ty">int</span> temp = <span class="fn">max</span>(prev1, num + prev2);
            prev2 = prev1;
            prev1 = temp;
        }
        <span class="kw">return</span> prev1;
    }
};`,
                memoryTip: "Bằng việc sử dụng kỹ thuật cuộn biến (`prev1`, `prev2`), độ phức tạp không gian phụ trợ đạt O(1) tuyệt đối, loại bỏ hoàn toàn việc cấp phát mảng tĩnh hay động trên RAM."
            },
            {
                id: 139,
                title: "Word Break",
                difficulty: "Medium",
                category: "Dynamic Programming",
                timeComplexity: "O(N^3) (Do phép cắt và tra cứu chuỗi)",
                spaceComplexity: "O(N + M) (M là kích thước wordDict)",
                description: "Cho một chuỗi s và một danh sách từ vựng wordDict, hãy xác định xem chuỗi s có thể được phân tách thành một chuỗi các từ vựng hợp lệ trong danh sách hay không.",
                examples: [
                    { input: "s = \"leetcode\", wordDict = [\"leet\", \"code\"]", output: "true" }
                ],
                approach: "Áp dụng Quy hoạch động Bottom-Up. Gọi `dp[i]` là giá trị Boolean (true/false) biểu thị chuỗi con `s[0...i-1]` có thể phân tách hợp lệ hay không. Khởi tạo `dp[0] = true` (chuỗi rỗng luôn hợp lệ). Với mỗi vị trí `i` từ 1 đến N, ta duyệt ngược `j` từ 0 đến `i-1`: nếu `dp[j] == true` và chuỗi con `s[j...i-1]` tồn tại trong Hash Set `wordDict`, ta đánh dấu `dp[i] = true` và dừng kiểm tra.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">bool</span> <span class="fn">wordBreak</span>(<span class="ty">string</span> s, <span class="ty">vector&lt;string&gt;</span>&amp; wordDict) {
        <span class="ty">unordered_set&lt;string&gt;</span> dict(wordDict.<span class="fn">begin</span>(), wordDict.<span class="fn">end</span>());
        <span class="ty">int</span> n = s.<span class="fn">length</span>();
        <span class="ty">vector&lt;bool&gt;</span> dp(n + <span class="st">1</span>, <span class="kw">false</span>);
        dp[<span class="st">0</span>] = <span class="kw">true</span>;
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">1</span>; i &lt;= n; i++) {
            <span class="kw">for</span> (<span class="ty">int</span> j = <span class="st">0</span>; j &lt; i; j++) {
                <span class="kw">if</span> (dp[j] &amp;&amp; dict.<span class="fn">count</span>(s.<span class="fn">substr</span>(j, i - j))) {
                    dp[i] = <span class="kw">true</span>;
                    <span class="kw">break</span>; <span class="cm">// Thoa man, khong can check cac j khac</span>
                }
            }
        }
        <span class="kw">return</span> dp[n];
    }
};`,
                memoryTip: "Khai báo Hash Set từ `wordDict` giúp tra cứu chuỗi con trong O(1) thời gian thay vì O(M) tuyến tính. Mảng Boolean `dp` phân bổ tĩnh siêu nhẹ trên Stack."
            },
            {
                id: 62,
                title: "Unique Paths",
                difficulty: "Medium",
                category: "Dynamic Programming",
                timeComplexity: "O(M * N)",
                spaceComplexity: "O(N)",
                description: "Một robot ở góc trên bên trái của lưới m x n. Robot chỉ có thể di chuyển xuống dưới hoặc sang phải tại bất kỳ thời điểm nào. Robot muốn đi tới góc dưới bên phải. Hãy tính số lượng con đường độc nhất robot có thể đi.",
                examples: [
                    { input: "m = 3, n = 7", output: "28" }
                ],
                approach: "Áp dụng Quy hoạch động lập bảng. Số lượng con đường đi đến ô `(r, c)` bằng tổng số con đường đi đến ô phía trên `(r-1, c)` và ô bên trái `(r, c-1)`. Do ta chỉ cần thông tin của hàng phía trên và ô bên trái hiện tại, ta có thể tối ưu bộ nhớ chỉ sử dụng mảng 1D kích thước `n` (số cột) liên tục cập nhật cộng dồn.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">uniquePaths</span>(<span class="ty">int</span> m, <span class="ty">int</span> n) {
        <span class="ty">vector&lt;int&gt;</span> dp(n, <span class="st">1</span>); <span class="cm">// Hang dau toan bo la 1</span>
        <span class="kw">for</span> (<span class="ty">int</span> r = <span class="st">1</span>; r &lt; m; r++) {
            <span class="kw">for</span> (<span class="ty">int</span> c = <span class="st">1</span>; c &lt; n; c++) {
                dp[c] += dp[c - <span class="st">1</span>]; <span class="cm">// dp[c-1] la o ben trai, dp[c] cu la o phia tren</span>
            }
        }
        <span class="kw">return</span> dp[n - <span class="st">1</span>];
    }
};`,
                memoryTip: "Việc rút gọn không gian trạng thái từ bảng 2D kích thước M*N về mảng 1D kích thước N giúp giải thuật cực kỳ an toàn về bộ nhớ RAM và chạy siêu tốc."
            },
            {
                id: 91,
                title: "Decode Ways",
                difficulty: "Medium",
                category: "Dynamic Programming",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Một thông điệp chứa các chữ cái từ A-Z được mã hóa thành các chữ số sử dụng ánh xạ: 'A' -> \"1\", 'B' -> \"2\"... 'Z' -> \"26\". Cho một chuỗi s chứa toàn ký tự số, hãy tính số lượng cách giải mã chuỗi đó thành thông điệp chữ cái hợp lệ.",
                examples: [
                    { input: "s = \"226\"", output: "3 (Có thể giải mã thành \"BZ\" (2 26), \"VF\" (22 6), hoặc \"BBF\" (2 2 6))" }
                ],
                approach: "Áp dụng Quy hoạch động. Gọi `dp[i]` là số lượng cách giải mã chuỗi con `s[0...i-1]`. Tại mỗi ký tự `s[i-1]`, ta có hai khả năng giải mã:\n- Giải mã đơn ký tự: hợp lệ nếu `s[i-1] != '0'`. Kết quả cộng thêm `dp[i-1]`.\n- Giải mã song ký tự: ghép hai chữ số `s[i-2]` và `s[i-1]`, hợp lệ nếu giá trị ghép nằm trong khoảng `10 - 26`. Kết quả cộng thêm `dp[i-2]`.\nTối ưu hóa bộ nhớ xuống O(1) bằng cách chỉ sử dụng hai biến tích lũy thay vì mảng.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">numDecodings</span>(<span class="ty">string</span> s) {
        <span class="kw">if</span> (s.empty() || s[<span class="st">0</span>] == <span class="st">'0'</span>) <span class="kw">return</span> <span class="st">0</span>;
        <span class="ty">int</span> prev2 = <span class="st">1</span>; <span class="cm">// tuong duong dp[i-2]</span>
        <span class="ty">int</span> prev1 = <span class="st">1</span>; <span class="cm">// tuong duong dp[i-1]</span>
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">1</span>; i &lt; s.<span class="fn">length</span>(); i++) {
            <span class="ty">int</span> current = <span class="st">0</span>;
            <span class="kw">if</span> (s[i] != <span class="st">'0'</span>) current += prev1; <span class="cm">// Giai ma don</span>
            <span class="ty">int</span> twoDigit = <span class="fn">stoi</span>(s.<span class="fn">substr</span>(i - <span class="st">1</span>, <span class="st">2</span>));
            <span class="kw">if</span> (twoDigit &gt;= <span class="st">10</span> &amp;&amp; twoDigit &lt;= <span class="st">26</span>) {
                current += prev2; <span class="cm">// Giai ma kep</span>
            }
            prev2 = prev1;
            prev1 = current;
        }
        <span class="kw">return</span> prev1;
    }
};`,
                memoryTip: "Kỹ thuật cuộn biến loại bỏ hoàn toàn việc cấp phát động mảng, giúp giải thuật đạt hiệu năng xử lý lý tưởng ở mức phần cứng."
            },

            // 41-50: HARD
            {
                id: 239,
                title: "Sliding Window Maximum",
                difficulty: "Hard",
                category: "Sliding Window",
                timeComplexity: "O(N) (Mỗi phần tử được đưa vào/rút ra Deque tối đa 1 lần)",
                spaceComplexity: "O(K) (Kích thước tối đa của Deque)",
                description: "Cho một mảng số nguyên nums và kích thước cửa sổ trượt k liên tục dịch từ trái sang phải mỗi lần 1 phần tử. Hãy trả về một mảng chứa giá trị lớn nhất trong mỗi cửa sổ trượt.",
                examples: [
                    { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" }
                ],
                approach: "Sử dụng Hàng đợi hai đầu đơn điệu (Monotonic Deque) lưu trữ các chỉ số (index) của mảng. Deque luôn duy trì các giá trị tương ứng với chỉ số giảm dần từ đầu đến cuối Deque. Mỗi khi duyệt qua phần tử `nums[i]`:\n1. Loại bỏ các chỉ số đã trượt ra ngoài cửa sổ bên trái khỏi Deque (`index < i - k + 1`).\n2. Loại bỏ tất cả các chỉ số ở cuối Deque có giá trị tương ứng nhỏ hơn `nums[i]` (vì chúng không còn cơ hội làm giá trị lớn nhất).\n3. Đẩy chỉ số `i` vào cuối Deque.\n4. Đỉnh Deque (đầu hàng) chính là index chứa giá trị lớn nhất của cửa sổ hiện tại.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">vector&lt;int&gt;</span> <span class="fn">maxSlidingWindow</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums, <span class="ty">int</span> k) {
        <span class="ty">vector&lt;int&gt;</span> res;
        <span class="ty">deque&lt;int&gt;</span> dq; <span class="cm">// Luu tru index phan tu</span>
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; nums.<span class="fn">size</span>(); i++) {
            <span class="kw">if</span> (!dq.<span class="fn">empty</span>() &amp;&amp; dq.<span class="fn">front</span>() &lt; i - k + <span class="st">1</span>) {
                dq.<span class="fn">pop_front</span>(); <span class="cm">// Loai bo index ra ngoai cua so truyen</span>
            }
            <span class="kw">while</span> (!dq.<span class="fn">empty</span>() &amp;&amp; nums[dq.<span class="fn">back</span>()] &lt; nums[i]) {
                dq.<span class="fn">pop_back</span>(); <span class="cm">// Duy tri tinh don dieu giam dan</span>
            }
            dq.<span class="fn">push_back</span>(i);
            <span class="kw">if</span> (i &gt;= k - <span class="st">1</span>) res.<span class="fn">push_back</span>(nums[dq.<span class="fn">front</span>()]);
        }
        <span class="kw">return</span> res;
    }
};`,
                memoryTip: "Cấu trúc `std::deque` trong C++ phân bổ bộ nhớ động trên các chunk rời rạc trên Heap. Việc duy trì kích thước tối đa k phần tử giúp giới hạn không gian phụ trợ ở mức O(K) cực tốt."
            },
            {
                id: 76,
                title: "Minimum Window Substring",
                difficulty: "Hard",
                category: "Sliding Window",
                timeComplexity: "O(N + M) (N, M là chiều dài chuỗi s và t)",
                spaceComplexity: "O(1) (Do bảng chữ cái giới hạn 128 ký tự ASCII)",
                description: "Cho hai chuỗi s và t, hãy tìm chuỗi con có độ dài nhỏ nhất trong s sao cho nó chứa đầy đủ tất cả các ký tự của chuỗi t (kể cả các ký tự trùng lặp). Nếu không tồn tại, trả về chuỗi rỗng.",
                examples: [
                    { input: "s = \"ADOBECODEBANC\", t = \"ABC\"", output: "\"BANC\"" }
                ],
                approach: "Áp dụng kỹ thuật Cửa sổ trượt (Sliding Window) với hai con trỏ `left` và `right` kết hợp hai mảng đếm tần suất ký tự. Ta duyệt `right` mở rộng cửa sổ sang phải, ghi nhận ký tự khớp. Khi cửa sổ đã chứa đầy đủ các ký tự của t, ta thực hiện co hẹp cửa sổ bằng cách tịnh tiến con trỏ `left` sang phải hết mức có thể trong khi vẫn đảm bảo cửa sổ chứa đủ t. Ghi nhận và cập nhật chuỗi con ngắn nhất thỏa mãn.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">string</span> <span class="fn">minWindow</span>(<span class="ty">string</span> s, <span class="ty">string</span> t) {
        <span class="ty">int</span> mapT[<span class="st">128</span>] = {<span class="st">0</span>}, mapS[<span class="st">128</span>] = {<span class="st">0</span>};
        <span class="kw">for</span> (<span class="ty">char</span> c : t) mapT[c]++;
        
        <span class="ty">int</span> required = <span class="st">0</span>;
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt; <span class="st">128</span>; i++) <span class="kw">if</span> (mapT[i] &gt; <span class="st">0</span>) required++;
        
        <span class="ty">int</span> left = <span class="st">0</span>, minLen = INT_MAX, startIdx = <span class="st">0</span>;
        <span class="ty">int</span> formed = <span class="st">0</span>;
        
        <span class="kw">for</span> (<span class="ty">int</span> right = <span class="st">0</span>; right &lt; s.<span class="fn">length</span>(); right++) {
            <span class="ty">char</span> c = s[right];
            mapS[c]++;
            <span class="kw">if</span> (mapT[c] &gt; <span class="st">0</span> &amp;&amp; mapS[c] == mapT[c]) formed++;
            
            <span class="kw">while</span> (left &lt;= right &amp;&amp; formed == required) {
                c = s[left];
                <span class="kw">if</span> (right - left + <span class="st">1</span> &lt; minLen) {
                    minLen = right - left + <span class="st">1</span>;
                    startIdx = left;
                }
                mapS[c]--;
                <span class="kw">if</span> (mapT[c] &gt; <span class="st">0</span> &amp;&amp; mapS[c] &lt; mapT[c]) formed--;
                left++;
            }
        }
        <span class="kw">return</span> minLen == INT_MAX ? <span class="st">""</span> : s.<span class="fn">substr</span>(startIdx, minLen);
    }
};`,
                memoryTip: "Sử dụng mảng tĩnh 128 số nguyên trên Stack thay vì bảng băm động unordered_map giúp loại bỏ hoàn toàn chi phí rehash và tăng tốc độ đọc ghi cực lớn."
            },
            {
                id: 23,
                title: "Merge k Sorted Lists",
                difficulty: "Hard",
                category: "Linked List",
                timeComplexity: "O(N log k) (k là số danh sách, N là tổng số nút)",
                spaceComplexity: "O(k) (Bộ nhớ Heap lưu trữ cây Priority Queue)",
                description: "Trộn k danh sách liên kết đơn đã được sắp xếp tăng dần thành một danh sách liên kết đơn duy nhất cũng được sắp xếp.",
                examples: [
                    { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "1->1->2->3->4->4->5->6" }
                ],
                approach: "Sử dụng một Hàng đợi ưu tiên kiểu Min-Heap. Ta đẩy nút đầu tiên của tất cả k danh sách liên kết vào Min-Heap. Mỗi bước, ta rút nút nhỏ nhất ra khỏi Heap để nối vào danh sách kết quả, sau đó nếu nút vừa rút có nút tiếp theo (`next`), ta đẩy tiếp nút tiếp theo đó vào Heap. Lặp lại cho đến khi Heap trống.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
    <span class="kw">struct</span> <span class="ty">compare</span> {
        <span class="ty">bool</span> <span class="kw">operator</span>()(<span class="ty">ListNode</span>* a, <span class="ty">ListNode</span>* b) {
            <span class="kw">return</span> a-&gt;val &gt; b-&gt;val; <span class="cm">// Min-Heap</span>
        }
    };
<span class="kw">public</span>:
    <span class="ty">ListNode</span>* <span class="fn">mergeKLists</span>(<span class="ty">vector&lt;ListNode*&gt;</span>&amp; lists) {
        <span class="ty">priority_queue&lt;ListNode*, vector&lt;ListNode*&gt;, compare&gt;</span> pq;
        <span class="kw">for</span> (<span class="ty">ListNode</span>* node : lists) {
            <span class="kw">if</span> (node) pq.<span class="fn">push</span>(node);
        }
        <span class="ty">ListNode</span> dummy(<span class="st">0</span>);
        <span class="ty">ListNode</span>* tail = &amp;dummy;
        <span class="kw">while</span> (!pq.<span class="fn">empty</span>()) {
            <span class="ty">ListNode</span>* curr = pq.<span class="fn">top</span>(); pq.<span class="fn">pop</span>();
            tail-&gt;next = curr;
            tail = tail-&gt;next;
            <span class="kw">if</span> (curr-&gt;next) pq.<span class="fn">push</span>(curr-&gt;next);
        }
        <span class="kw">return</span> dummy.next;
    }
};`,
                memoryTip: "Việc duy trì Min-Heap kích thước tối đa k giúp ta luôn tìm ra nút nhỏ nhất tiếp theo trong O(log k) cực kỳ hiệu quả mà không cần quét tuần tự O(k)."
            },
            {
                id: 25,
                title: "Reverse Nodes in k-Group",
                difficulty: "Hard",
                category: "Linked List",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Cho một danh sách liên kết đơn, hãy đảo ngược các nút của danh sách theo từng nhóm k nút một và trả về danh sách mới kết quả. Nếu số lượng nút còn lại ở cuối không đủ k nút, hãy giữ nguyên thứ tự của chúng.",
                examples: [
                    { input: "head = 1->2->3->4->5, k = 2", output: "2->1->4->3->5" }
                ],
                approach: "Áp dụng hoán đổi liên kết In-place. Ta dùng một vòng lặp quét đếm xem danh sách phía trước có đủ k nút hay không. Nếu đủ, ta thực hiện đảo ngược k nút này bằng phương pháp lặp 3 con trỏ truyền thống. Điểm mấu chốt là kết nối đầu chốt của nhóm vừa đảo ngược vào nhóm phía trước và gọi đệ quy giải quyết tiếp các nhóm phía sau.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">ListNode</span>* <span class="fn">reverseKGroup</span>(<span class="ty">ListNode</span>* head, <span class="ty">int</span> k) {
        <span class="ty">ListNode</span>* curr = head;
        <span class="ty">int</span> count = <span class="st">0</span>;
        <span class="kw">while</span> (curr &amp;&amp; count != k) { <span class="cm">// Dem xem co du k nut khong</span>
            curr = curr-&gt;next;
            count++;
        }
        <span class="kw">if</span> (count == k) { <span class="cm">// Neu du k nut</span>
            curr = <span class="fn">reverseKGroup</span>(curr, k); <span class="cm">// De quy xu ly duoi</span>
            <span class="kw">while</span> (count-- &gt; <span class="st">0</span>) {
                <span class="ty">ListNode</span>* temp = head-&gt;next;
                head-&gt;next = curr;
                curr = head;
                head = temp;
            }
            head = curr;
        }
        <span class="kw">return</span> head;
    }
};`,
                memoryTip: "Mặc dù cài đặt đệ quy tốn O(N/k) Call Stack RAM, nhưng ta có thể chuyển đổi hoàn toàn sang lặp thuần túy để giải phóng không gian bộ nhớ phụ trợ về O(1) tuyệt đối."
            },
            {
                id: 42,
                title: "Trapping Rain Water",
                difficulty: "Hard",
                category: "Two Pointers",
                timeComplexity: "O(N)",
                spaceComplexity: "O(1)",
                description: "Cho một mảng các số nguyên không âm height đại diện cho bản đồ độ cao của các cột có chiều rộng là 1. Hãy tính lượng nước mưa có thể bị giữ lại giữa các cột sau khi mưa.",
                examples: [
                    { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" }
                ],
                approach: "Sử dụng hai con trỏ trái và phải (`left = 0`, `right = n-1`) cùng hai biến lưu độ cao lớn nhất của cột ở biên trái (`leftMax`) và biên phải (`rightMax`). Ta liên tục so sánh `height[left]` và `height[right]`:\n- Nếu cột trái thấp hơn cột phải: cột trái chịu giới hạn bởi `leftMax`. Ta tính lượng nước đọng bằng `leftMax - height[left]`, cộng dồn vào kết quả, cập nhật `leftMax` và dịch `left` sang phải.\n- Ngược lại làm tương tự cho bên phải.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">trap</span>(<span class="ty">vector&lt;int&gt;</span>&amp; height) {
        <span class="ty">int</span> left = <span class="st">0</span>, right = height.<span class="fn">size</span>() - <span class="st">1</span>;
        <span class="ty">int</span> leftMax = <span class="st">0</span>, rightMax = <span class="st">0</span>;
        <span class="ty">int</span> water = <span class="st">0</span>;
        <span class="kw">while</span> (left &lt; right) {
            <span class="kw">if</span> (height[left] &lt; height[right]) {
                <span class="kw">if</span> (height[left] &gt;= leftMax) leftMax = height[left];
                <span class="kw">else</span> water += leftMax - height[left];
                left++;
            } <span class="kw">else</span> {
                <span class="kw">if</span> (height[right] &gt;= rightMax) rightMax = height[right];
                <span class="kw">else</span> water += rightMax - height[right];
                right--;
            }
        }
        <span class="kw">return</span> water;
    }
};`,
                memoryTip: "Phương pháp hai con trỏ giúp giải bài toán đọng nước kinh điển chỉ trong 1 lượt quét O(N) và O(1) bộ nhớ phụ trợ, vượt trội so với cách làm dùng mảng phụ O(N) bộ nhớ."
            },
            {
                id: 84,
                title: "Largest Rectangle in Histogram",
                difficulty: "Hard",
                category: "Stack",
                timeComplexity: "O(N)",
                spaceComplexity: "O(N)",
                description: "Cho một mảng số nguyên heights đại diện cho bản đồ độ cao của biểu đồ cột. Hãy tìm diện tích của hình chữ nhật lớn nhất có thể tạo ra bên trong biểu đồ cột đó.",
                examples: [
                    { input: "heights = [2,1,5,6,2,3]", output: "10 (Hình chữ nhật tạo bởi cột 5 và 6 có chiều rộng bằng 2)" }
                ],
                approach: "Sử dụng Ngăn xếp Đơn điệu Tăng dần (Monotonic Increasing Stack) lưu trữ index. Ta duyệt qua các cột. Nếu gặp cột hiện tại thấp hơn cột ở đỉnh Stack, tức là ta đã tìm thấy biên phải giới hạn của cột đỉnh Stack. Ta liên tục pop cột ra, tính chiều rộng của hình chữ nhật tạo bởi cột vừa pop: `width = Stack trống ? i : (i - Stack.top() - 1)`, tính diện tích và lấy max liên tục.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">largestRectangleArea</span>(<span class="ty">vector&lt;int&gt;</span>&amp; heights) {
        <span class="ty">stack&lt;int&gt;</span> st;
        <span class="ty">int</span> maxArea = <span class="st">0</span>;
        <span class="ty">int</span> n = heights.<span class="fn">size</span>();
        <span class="kw">for</span> (<span class="ty">int</span> i = <span class="st">0</span>; i &lt;= n; i++) {
            <span class="ty">int</span> h = (i == n) ? <span class="st">0</span> : heights[i];
            <span class="kw">while</span> (!st.<span class="fn">empty</span>() &amp;&amp; h &lt; heights[st.<span class="fn">top</span>()]) {
                <span class="ty">int</span> height = heights[st.<span class="fn">top</span>()]; st.<span class="fn">pop</span>();
                <span class="ty">int</span> width = st.<span class="fn">empty</span>() ? i : i - st.<span class="fn">top</span>() - <span class="st">1</span>;
                maxArea = <span class="fn">max</span>(maxArea, height * width);
            }
            st.<span class="fn">push</span>(i);
        }
        <span class="kw">return</span> maxArea;
    }
};`,
                memoryTip: "Bằng việc đẩy một cột ảo có độ cao bằng 0 vào cuối mảng (`i == n`), ta ép buộc giải thuật tự động giải phóng toàn bộ các index còn lại trong Stack mà không cần viết thêm hàm phụ."
            },
            {
                id: 124,
                title: "Binary Tree Maximum Path Sum",
                difficulty: "Hard",
                category: "Tree",
                timeComplexity: "O(N)",
                spaceComplexity: "O(H)",
                description: "Cho nút gốc của một cây nhị phân, hãy tìm con đường có tổng các giá trị nút lớn nhất (đường đi có thể bắt đầu và kết thúc tại bất kỳ nút nào trên cây và các nút không được lặp lại).",
                examples: [
                    { input: "root = [-10,9,20,null,null,15,7]", output: "42 (Đường đi là 15 -> 20 -> 7)" }
                ],
                approach: "Sử dụng đệ quy DFS. Tại mỗi nút hiện tại, ta tính đóng đóng góp lớn nhất của nhánh trái `leftGain = max(0, dfs(node->left))` và nhánh phải `rightGain = max(0, dfs(node->right))` (nếu tổng âm, ta bỏ qua bằng hàm `max(0, ...)`). Tổng đường đi đi qua nút hiện tại và rẽ sang hai nhánh bằng: `node->val + leftGain + rightGain`. Ta cập nhật biến Max toàn cục liên tục. Hàm đệ quy trả về cho nút cha giá trị của nhánh lớn hơn để tạo đường đi thẳng: `node->val + max(leftGain, rightGain)`.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
    <span class="ty">int</span> maxSum = INT_MIN;
    <span class="ty">int</span> <span class="fn">maxGain</span>(<span class="ty">TreeNode</span>* node) {
        <span class="kw">if</span> (!node) <span class="kw">return</span> <span class="st">0</span>;
        <span class="ty">int</span> leftG = <span class="fn">max</span>(<span class="st">0</span>, <span class="fn">maxGain</span>(node-&gt;left));
        <span class="ty">int</span> rightG = <span class="fn">max</span>(<span class="st">0</span>, <span class="fn">maxGain</span>(node-&gt;right));
        
        <span class="ty">int</span> currentPath = node-&gt;val + leftG + rightG;
        maxSum = <span class="fn">max</span>(maxSum, currentPath); <span class="cm">// Cap nhat bien toan cuc</span>
        
        <span class="kw">return</span> node-&gt;val + <span class="fn">max</span>(leftG, rightG); <span class="cm">// Tra ve duong di don</span>
    }
<span class="kw">public</span>:
    <span class="ty">int</span> <span class="fn">maxPathSum</span>(<span class="ty">TreeNode</span>* root) {
        <span class="fn">maxGain</span>(root);
        <span class="kw">return</span> maxSum;
    }
};`,
                memoryTip: "Kỹ thuật tính đóng góp và cập nhật gián tiếp biến toàn cục là phương pháp kinh điển giải quyết các bài toán tối ưu trên cây vô cùng hiệu quả."
            },
            {
                id: 297,
                title: "Serialize and Deserialize Binary Tree",
                difficulty: "Hard",
                category: "Tree",
                timeComplexity: "O(N)",
                spaceComplexity: "O(N)",
                description: "Thiết kế một thuật toán để tuần tự hóa (Serialize) một cây nhị phân thành một chuỗi ký tự và giải tuần tự hóa (Deserialize) chuỗi ký tự đó khôi phục lại cây nhị phân ban đầu.",
                examples: [
                    { input: "root = [1,2,3,null,null,4,5]", output: "Chuỗi \"1,2,#,#,3,4,#,#,5,#,#\" và khôi phục lại cây ban đầu" }
                ],
                approach: "Sử dụng giải thuật duyệt cây theo tiền thứ tự (Preorder DFS). Khi tuần tự hóa, ta ghi giá trị nút hiện tại kèm dấu phân tách, nếu nút NULL ta ghi ký tự đặc biệt `#`. Khi giải tuần tự hóa, ta đọc từng token từ chuỗi ký tự, nếu gặp `#` ta trả về NULL, ngược lại ta tạo nút mới và gọi đệ quy xây dựng con bên trái rồi đến con bên phải.",
                code: `<span class="kw">class</span> <span class="ty">Codec</span> {
    <span class="ty">void</span> <span class="fn">serializeDFS</span>(<span class="ty">TreeNode</span>* root, <span class="ty">string</span>&amp; out) {
        <span class="kw">if</span> (!root) { out += <span class="st">"#,"</span>; <span class="kw">return</span>; }
        out += <span class="fn">to_string</span>(root-&gt;val) + <span class="st">","</span>;
        <span class="fn">serializeDFS</span>(root-&gt;left, out);
        <span class="fn">serializeDFS</span>(root-&gt;right, out);
    }
    <span class="ty">TreeNode</span>* <span class="fn">deserializeDFS</span>(<span class="ty">stringstream</span>&amp; ss) {
        <span class="ty">string</span> val;
        <span class="fn">getline</span>(ss, val, <span class="st">','</span>);
        <span class="kw">if</span> (val == <span class="st">"#"</span>) <span class="kw">return</span> NULL;
        <span class="ty">TreeNode</span>* node = <span class="kw">new</span> <span class="ty">TreeNode</span>(<span class="fn">stoi</span>(val));
        node-&gt;left = <span class="fn">deserializeDFS</span>(ss);
        node-&gt;right = <span class="fn">deserializeDFS</span>(ss);
        <span class="kw">return</span> node;
    }
<span class="kw">public</span>:
    <span class="ty">string</span> <span class="fn">serialize</span>(<span class="ty">TreeNode</span>* root) {
        <span class="ty">string</span> out = <span class="st">""</span>;
        <span class="fn">serializeDFS</span>(root, out);
        <span class="kw">return</span> out;
    }
    <span class="ty">TreeNode</span>* <span class="fn">deserialize</span>(<span class="ty">string</span> data) {
        <span class="ty">stringstream</span> ss(data);
        <span class="kw">return</span> <span class="fn">deserializeDFS</span>(ss);
    }
};`,
                memoryTip: "Sử dụng `stringstream` giúp băm tách chuỗi cực kỳ sạch sẽ trong C++. Lưu ý giải phóng toàn bộ các thực thể Heap Node khi thực hiện hủy cây để tránh rò rỉ RAM hệ thống."
            },
            {
                id: 4,
                title: "Median of Two Sorted Arrays",
                difficulty: "Hard",
                category: "Binary Search",
                timeComplexity: "O(log(min(M, N)))",
                spaceComplexity: "O(1)",
                description: "Cho hai mảng số nguyên đã được sắp xếp nums1 và nums2 kích thước m và n, hãy tìm số trung vị (Median) của hai mảng gộp chung lại. Yêu cầu độ phức tạp thời gian phải là O(log(m + n)).",
                examples: [
                    { input: "nums1 = [1,3], nums2 = [2]", output: "2.0" }
                ],
                approach: "Áp dụng Tìm kiếm nhị phân trên đường cắt phân hoạch. Giả sử ta thực hiện cắt mảng nhỏ hơn `nums1` tại chỉ số `i` và mảng lớn hơn `nums2` tại chỉ số `j = (m + n + 1) / 2 - i`. Ta tìm kiếm nhị phân chỉ số `i` trong khoảng `[0, m]` sao cho: phần tử bên trái đường cắt của nums1 nhỏ hơn hoặc bằng phần tử bên phải đường cắt của nums2 (`nums1[i-1] <= nums2[j]`) và ngược lại. Khi tìm thấy đường cắt tối ưu, ta dễ dàng tính toán số trung vị từ các giá trị biên xung quanh đường cắt.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
<span class="kw">public</span>:
    <span class="ty">double</span> <span class="fn">findMedianSortedArrays</span>(<span class="ty">vector&lt;int&gt;</span>&amp; nums1, <span class="ty">vector&lt;int&gt;</span>&amp; nums2) {
        <span class="kw">if</span> (nums1.<span class="fn">size</span>() &gt; nums2.<span class="fn">size</span>()) <span class="kw">return</span> <span class="fn">findMedianSortedArrays</span>(nums2, nums1);
        <span class="ty">int</span> x = nums1.<span class="fn">size</span>(), y = nums2.<span class="fn">size</span>();
        <span class="ty">int</span> low = <span class="st">0</span>, high = x;
        <span class="kw">while</span> (low &lt;= high) {
            <span class="ty">int</span> partitionX = low + (high - low) / <span class="st">2</span>;
            <span class="ty">int</span> partitionY = (x + y + <span class="st">1</span>) / <span class="st">2</span> - partitionX;
            
            <span class="ty">int</span> maxLeftX = (partitionX == <span class="st">0</span>) ? INT_MIN : nums1[partitionX - <span class="st">1</span>];
            <span class="ty">int</span> minRightX = (partitionX == x) ? INT_MAX : nums1[partitionX];
            
            <span class="ty">int</span> maxLeftY = (partitionY == <span class="st">0</span>) ? INT_MIN : nums2[partitionY - <span class="st">1</span>];
            <span class="ty">int</span> minRightY = (partitionY == y) ? INT_MAX : nums2[partitionY];
            
            <span class="kw">if</span> (maxLeftX &lt;= minRightY &amp;&amp; maxLeftY &lt;= minRightX) {
                <span class="kw">if</span> ((x + y) % <span class="st">2</span> == <span class="st">0</span>) {
                    <span class="kw">return</span> (<span class="fn">max</span>(maxLeftX, maxLeftY) + <span class="fn">min</span>(minRightX, minRightY)) / <span class="st">2.0</span>;
                } <span class="kw">else</span> {
                    <span class="kw">return</span> <span class="fn">max</span>(maxLeftX, maxLeftY);
                }
            } <span class="kw">else</span> <span class="kw">if</span> (maxLeftX &gt; minRightY) high = partitionX - <span class="st">1</span>;
            <span class="kw">else</span> low = partitionX + <span class="st">1</span>;
        }
        <span class="kw">return</span> <span class="st">0.0</span>;
    }
};`,
                memoryTip: "Thuật toán tìm kiếm nhị phân trên mảng kích thước nhỏ hơn giúp giới hạn số lần lặp ở mức cực thấp log(min(M, N)), tối ưu hóa bộ nhớ phụ trợ về O(1)."
            },
            {
                id: 51,
                title: "N-Queens",
                difficulty: "Hard",
                category: "Dynamic Programming", // Using DP/Recursion/Backtracking category
                timeComplexity: "O(N!)",
                spaceComplexity: "O(N) (Mảng lưu cấu hình quân hậu)",
                description: "Bài toán xếp quân hậu: Đặt n quân hậu trên một bàn cờ kích thước n x n sao cho không có hai quân hậu nào tấn công nhau (không cùng hàng, cột hoặc đường chéo). Hãy trả về tất cả các cấu hình bàn cờ hợp lệ.",
                examples: [
                    { input: "n = 4", output: "2 cấu hình bàn cờ hợp lệ dạng [[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"], ...]" }
                ],
                approach: "Áp dụng kỹ thuật Đệ quy Quay lui (Backtracking). Ta xếp quân hậu theo từng hàng `row` từ 0 đến N-1. Tại mỗi hàng, ta duyệt qua các cột `col` từ 0 đến N-1, kiểm tra xem việc đặt quân hậu tại `(row, col)` có an toàn không bằng cách sử dụng 3 bảng Hash Set / Mảng trạng thái lưu trữ các cột, đường chéo chính (r - c) và đường chéo phụ (r + c) đã có quân hậu. Nếu an toàn, ta ghi nhận và gọi đệ quy xếp tiếp hàng dưới.",
                code: `<span class="kw">class</span> <span class="ty">Solution</span> {
    <span class="ty">vector&lt;vector&lt;string&gt;&gt;</span> res;
    <span class="ty">vector&lt;string&gt;</span> board;
    <span class="ty">unordered_set&lt;int&gt;</span> cols, diag1, diag2;
    
    <span class="ty">void</span> <span class="fn">backtrack</span>(<span class="ty">int</span> r, <span class="ty">int</span> n) {
        <span class="kw">if</span> (r == n) { res.<span class="fn">push_back</span>(board); <span class="kw">return</span>; }
        <span class="kw">for</span> (<span class="ty">int</span> c = <span class="st">0</span>; c &lt; n; c++) {
            <span class="kw">if</span> (cols.<span class="fn">count</span>(c) || diag1.<span class="fn">count</span>(r - c) || diag2.<span class="fn">count</span>(r + c)) <span class="kw">continue</span>;
            
            board[r][c] = <span class="st">'Q'</span>;
            cols.<span class="fn">insert</span>(c); diag1.<span class="fn">insert</span>(r - c); diag2.<span class="fn">insert</span>(r + c);
            
            <span class="fn">backtrack</span>(r + <span class="st">1</span>, n); <span class="cm">// De quy xep hang tiep theo</span>
            
            board[r][c] = <span class="st">'.'</span>; <span class="cm">// Quay lui (Backtrack)</span>
            cols.<span class="fn">erase</span>(c); diag1.<span class="fn">erase</span>(r - c); diag2.<span class="fn">erase</span>(r + c);
        }
    }
<span class="kw">public</span>:
    <span class="ty">vector&lt;vector&lt;string&gt;&gt;</span> <span class="fn">solveNQueens</span>(<span class="ty">int</span> n) {
        board = <span class="ty">vector&lt;string&gt;</span>(n, <span class="ty">string</span>(n, <span class="st">'.'</span>));
        <span class="fn">backtrack</span>(<span class="st">0</span>, n);
        <span class="kw">return</span> res;
    }
};`,
                memoryTip: "Bằng việc sử dụng ba bảng Hash Set `cols`, `diag1`, `diag2` để kiểm tra an toàn trong O(1) thay vì duyệt bàn cờ tốn O(N), giải thuật tăng tốc độ tính toán vượt bậc."
            }
        ];

// Xuất module cho môi trường Node.js (generator) và Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PROBLEMS;
}
