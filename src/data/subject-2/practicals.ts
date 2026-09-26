import type { Practical } from '../../types/practical';

export const subject2Practicals: Practical[] = [
  {
    id: 'practical-01',
    number: 1,
    title: 'Prime Number Check',
    language: 'Java',

    aim: 'To write a program to determine whether the given number is Prime or not.',

    theory: `A prime number is a natural number greater than 1 that has exactly two factors: 1 and itself.

For example:
- 2 is a prime number because it is divisible only by 1 and 2.
- 5 is a prime number because it is divisible only by 1 and 5.
- 8 is not a prime number because it is divisible by 1, 2, 4, and 8.

In this practical, the given number is checked for divisibility from 2 up to the square root of the number.

If any number divides the given number exactly, the number is not prime.

The program uses Math.sqrt(n) to reduce the number of iterations and improve efficiency.

Algorithm:
1. Read the number.
2. Assume the number is prime.
3. If the number is less than or equal to 1, mark it as not prime.
4. Check divisibility from 2 to √n.
5. If a divisor is found, mark the number as not prime.
6. Display the result.`,

    code: `import java.util.Scanner;

class PrimeNumber {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number: ");
        int n = sc.nextInt();

        boolean prime = true;

        if (n <= 1) {
            prime = false;
        }

        for (int i = 2; i <= Math.sqrt(n); i++) {

            if (n % i == 0) {
                prime = false;
                break;
            }
        }

        if (prime)
            System.out.println(n + " is Prime");
        else
            System.out.println(n + " is Not Prime");
    }
}`,

    conclusion: 'Thus, the given number was successfully checked using Java and the program determined whether the number is prime or not.'
  },


  {
    id: 'practical-02',
    number: 2,
    title: 'Search Insert Position using Binary Search',
    language: 'Java',

    aim: 'To find the index of a target value in a sorted array. If the target is not found, return the index where it would be inserted in sorted order.',

    theory: `Binary Search is an efficient searching algorithm used on a sorted array.

Instead of checking every element one by one, Binary Search repeatedly divides the search range into two halves.

The algorithm maintains two pointers:
- **low** – starting index of the search range.
- **high** – ending index of the search range.

The middle element is calculated as:

mid = low + (high - low) / 2

If the middle element is equal to the target, its index is returned.

If the middle element is smaller than the target, the search continues in the right half.

If the middle element is greater than the target, the search continues in the left half.

If the target is not found, low represents the correct insertion position.

Time Complexity: O(log n).`,

    code: `import java.util.Scanner;

class SearchInsert {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter size: ");
        int n = sc.nextInt();

        int[] arr = new int[n];

        System.out.println("Enter sorted array:");

        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }

        System.out.print("Enter target: ");
        int target = sc.nextInt();

        int low = 0;
        int high = n - 1;

        while (low <= high) {

            int mid = low + (high - low) / 2;

            if (arr[mid] == target) {

                System.out.println("Index: " + mid);
                return;

            } else if (arr[mid] < target) {

                low = mid + 1;

            } else {

                high = mid - 1;
            }
        }

        System.out.println("Index: " + low);
    }
}`,

    conclusion: 'Thus, Binary Search was successfully used to find the target element or determine its correct insertion position in a sorted array.'
  },


  {
    id: 'practical-03',
    number: 3,
    title: 'Candy Distribution',
    language: 'Java',

    aim: 'To calculate the minimum number of candies required for children based on their ratings such that every child gets at least one candy and children with higher ratings receive more candies than their neighbours.',

    theory: `Candy Distribution is an optimization problem where candies must be distributed according to the ratings of children.

The rules are:
1. Every child must receive at least one candy.
2. A child with a higher rating than an immediate neighbour must receive more candies than that neighbour.

The solution uses two passes:

**Left-to-Right Pass:**
If the current child's rating is greater than the previous child's rating, the current child receives one more candy.

**Right-to-Left Pass:**
If the current child's rating is greater than the next child's rating, the candy count is updated using the maximum of the existing value and the required value.

Finally, all candy values are added to calculate the minimum total number of candies.`,

    code: `import java.util.Scanner;

class CandyDistribution {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of children: ");
        int n = sc.nextInt();

        int[] rating = new int[n];
        int[] candy = new int[n];

        System.out.println("Enter ratings:");

        for (int i = 0; i < n; i++) {
            rating[i] = sc.nextInt();
            candy[i] = 1;
        }

        // Left to right
        for (int i = 1; i < n; i++) {

            if (rating[i] > rating[i - 1]) {
                candy[i] = candy[i - 1] + 1;
            }
        }

        // Right to left
        for (int i = n - 2; i >= 0; i--) {

            if (rating[i] > rating[i + 1]) {
                candy[i] = Math.max(
                    candy[i],
                    candy[i + 1] + 1
                );
            }
        }

        int sum = 0;

        for (int x : candy) {
            sum += x;
        }

        System.out.println(
            "Minimum candies required: " + sum
        );
    }
}`,

    conclusion: 'Thus, the minimum number of candies required for all children was successfully calculated according to their ratings.'
  },


  {
    id: 'practical-04',
    number: 4,
    title: 'Aggressive Cows',
    language: 'Java',

    aim: 'To place cows in stalls such that the minimum distance between any two cows is as large as possible and find the largest possible minimum distance.',

    theory: `Aggressive Cows is a classic optimization problem.

We are given:
- N stalls positioned along a straight line.
- C cows that must be placed in the stalls.

The objective is to maximize the minimum distance between any two cows.

The solution uses:
1. Sorting the stall positions.
2. Binary Search on the possible minimum distance.
3. A helper function to check whether cows can be placed with a particular distance.

The **canPlace()** function greedily places cows from left to right.

If all cows can be placed with the selected distance, the distance may be increased.

Otherwise, the distance is decreased.

This is an example of Binary Search on Answer.

Time Complexity: O(N log N) after sorting.`,

    code: `import java.util.*;

class AggressiveCows {

    static boolean canPlace(
        int[] stalls,
        int cows,
        int distance
    ) {

        int count = 1;
        int last = stalls[0];

        for (int i = 1; i < stalls.length; i++) {

            if (stalls[i] - last >= distance) {

                count++;
                last = stalls[i];

                if (count >= cows)
                    return true;
            }
        }

        return false;
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number of stalls: ");
        int n = sc.nextInt();

        int[] stalls = new int[n];

        System.out.println("Enter stall positions:");

        for (int i = 0; i < n; i++) {
            stalls[i] = sc.nextInt();
        }

        System.out.print("Enter number of cows: ");
        int cows = sc.nextInt();

        Arrays.sort(stalls);

        int low = 1;
        int high = stalls[n - 1] - stalls[0];
        int answer = 0;

        while (low <= high) {

            int mid = low + (high - low) / 2;

            if (canPlace(stalls, cows, mid)) {

                answer = mid;
                low = mid + 1;

            } else {

                high = mid - 1;
            }
        }

        System.out.println(
            "Largest minimum distance: " + answer
        );
    }
}`,

    conclusion: 'Thus, the largest possible minimum distance between cows was successfully calculated using sorting and binary search.'
  },


  {
    id: 'practical-05',
    number: 5,
    title: 'Cycle Detection in Undirected Graph',
    language: 'Java',

    aim: 'To check whether an undirected graph with V vertices and E edges contains a cycle or not.',

    theory: `A cycle in an undirected graph is a path that starts and ends at the same vertex without repeating edges unnecessarily.

Depth First Search (DFS) can be used to detect a cycle in an undirected graph.

During DFS:
- Each visited vertex is marked.
- If an unvisited neighbour is found, DFS continues recursively.
- If a visited neighbour is found and that neighbour is not the parent of the current vertex, a cycle exists.

The parent vertex is important because in an undirected graph every edge appears in both directions.

Algorithm:
1. Create an adjacency list.
2. Maintain a visited array.
3. Perform DFS from every unvisited vertex.
4. During DFS, check visited neighbours.
5. If a visited neighbour is not the parent, a cycle exists.

Time Complexity: O(V + E).`,

    code: `import java.util.*;

class CycleDetection {

    static boolean dfs(
        int node,
        int parent,
        ArrayList<ArrayList<Integer>> graph,
        boolean[] visited
    ) {

        visited[node] = true;

        for (int neighbour : graph.get(node)) {

            if (!visited[neighbour]) {

                if (dfs(
                    neighbour,
                    node,
                    graph,
                    visited
                )) {
                    return true;
                }

            } else if (neighbour != parent) {

                return true;
            }
        }

        return false;
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter vertices: ");
        int V = sc.nextInt();

        System.out.print("Enter edges: ");
        int E = sc.nextInt();

        ArrayList<ArrayList<Integer>> graph =
            new ArrayList<>();

        for (int i = 0; i < V; i++) {
            graph.add(new ArrayList<>());
        }

        System.out.println("Enter edges:");

        for (int i = 0; i < E; i++) {

            int u = sc.nextInt();
            int v = sc.nextInt();

            graph.get(u).add(v);
            graph.get(v).add(u);
        }

        boolean[] visited = new boolean[V];
        boolean cycle = false;

        for (int i = 0; i < V; i++) {

            if (!visited[i]) {

                if (dfs(
                    i,
                    -1,
                    graph,
                    visited
                )) {

                    cycle = true;
                    break;
                }
            }
        }

        if (cycle)
            System.out.println(
                "Graph contains a cycle"
            );
        else
            System.out.println(
                "Graph does not contain a cycle"
            );
    }
}`,

    conclusion: 'Thus, DFS was successfully used to determine whether the given undirected graph contains a cycle.'
  },


  {
    id: 'practical-06',
    number: 6,
    title: 'Critical Connections in a Network',
    language: 'Java',

    aim: 'To find all critical connections in an undirected network where removing a critical connection makes some servers unable to reach other servers.',

    theory: `A critical connection, also called a bridge, is an edge in a graph whose removal increases the number of connected components.

In a network:
- Vertices represent servers.
- Edges represent connections between servers.
- A critical connection is a connection whose removal disconnects part of the network.

The program uses DFS with two important arrays:

- **discovery[]** – stores the time at which a node is first visited.
- **low[]** – stores the earliest discovery time reachable from the node.

For an edge from node to neighbour, if:

low[neighbour] > discovery[node]

then the edge is a critical connection.

This approach is based on Tarjan's bridge-finding algorithm.

Time Complexity: O(V + E).`,

    code: `import java.util.*;

class CriticalConnections {

    static int timer = 0;

    static void dfs(
        int node,
        int parent,
        ArrayList<ArrayList<Integer>> graph,
        int[] discovery,
        int[] low,
        List<List<Integer>> result
    ) {

        discovery[node] = low[node] = ++timer;

        for (int neighbour : graph.get(node)) {

            if (neighbour == parent)
                continue;

            if (discovery[neighbour] == 0) {

                dfs(
                    neighbour,
                    node,
                    graph,
                    discovery,
                    low,
                    result
                );

                low[node] = Math.min(
                    low[node],
                    low[neighbour]
                );

                if (
                    low[neighbour]
                    > discovery[node]
                ) {

                    result.add(
                        Arrays.asList(
                            node,
                            neighbour
                        )
                    );
                }

            } else {

                low[node] = Math.min(
                    low[node],
                    discovery[neighbour]
                );
            }
        }
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print(
            "Enter number of servers: "
        );
        int n = sc.nextInt();

        System.out.print(
            "Enter number of connections: "
        );
        int m = sc.nextInt();

        ArrayList<ArrayList<Integer>> graph =
            new ArrayList<>();

        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }

        System.out.println("Enter connections:");

        for (int i = 0; i < m; i++) {

            int u = sc.nextInt();
            int v = sc.nextInt();

            graph.get(u).add(v);
            graph.get(v).add(u);
        }

        int[] discovery = new int[n];
        int[] low = new int[n];

        List<List<Integer>> result =
            new ArrayList<>();

        for (int i = 0; i < n; i++) {

            if (discovery[i] == 0) {

                dfs(
                    i,
                    -1,
                    graph,
                    discovery,
                    low,
                    result
                );
            }
        }

        System.out.println(
            "Critical connections:"
        );

        for (List<Integer> edge : result) {

            System.out.println(
                edge.get(0) + " - " + edge.get(1)
            );
        }
    }
}`,

    conclusion: 'Thus, critical connections in the given network were successfully identified using DFS, discovery times, and low-link values.'
  },


  {
    id: 'practical-07',
    number: 7,
    title: 'Number of Islands',
    language: 'Java',

    aim: 'To find the number of islands in a grid consisting of 0s representing water and 1s representing land.',

    theory: `The Number of Islands problem involves finding separate groups of connected land cells in a two-dimensional grid.

In the grid:
- **0** represents water.
- **1** represents land.

An island is a group of connected land cells.

The program uses Depth First Search (DFS).

Whenever an unvisited land cell is found:
1. Increase the island count.
2. Perform DFS from that cell.
3. Mark all connected land cells as visited by changing them from 1 to 0.

The DFS explores four directions:
- Up
- Down
- Left
- Right

Time Complexity: O(N × M), where N is the number of rows and M is the number of columns.`,

    code: `import java.util.*;

class NumberOfIslands {

    static void dfs(
        int[][] grid,
        int r,
        int c
    ) {

        int n = grid.length;
        int m = grid[0].length;

        if (
            r < 0 ||
            r >= n ||
            c < 0 ||
            c >= m ||
            grid[r][c] == 0
        ) {
            return;
        }

        grid[r][c] = 0;

        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter rows: ");
        int n = sc.nextInt();

        System.out.print("Enter columns: ");
        int m = sc.nextInt();

        int[][] grid = new int[n][m];

        System.out.println("Enter grid:");

        for (int i = 0; i < n; i++) {

            for (int j = 0; j < m; j++) {

                grid[i][j] = sc.nextInt();
            }
        }

        int islands = 0;

        for (int i = 0; i < n; i++) {

            for (int j = 0; j < m; j++) {

                if (grid[i][j] == 1) {

                    islands++;

                    dfs(grid, i, j);
                }
            }
        }

        System.out.println(
            "Number of islands: " + islands
        );
    }
}`,

    conclusion: 'Thus, the number of islands in the given binary grid was successfully calculated using Depth First Search.'
  },


  {
    id: 'practical-08',
    number: 8,
    title: 'Rotting Oranges',
    language: 'Java',

    aim: 'To determine the minimum time required to rot all fresh oranges in a given grid.',

    theory: `The Rotting Oranges problem is a grid-based problem that can be solved using Breadth First Search (BFS).

Each grid cell can contain:
- **0** – Empty cell.
- **1** – Fresh orange.
- **2** – Rotten orange.

A rotten orange can rot adjacent fresh oranges in one unit of time.

The program uses a Queue to perform BFS.

Initially, all rotten oranges are added to the queue.

For every level of BFS:
1. Remove the currently rotten oranges.
2. Check their four neighbouring cells.
3. Convert fresh oranges into rotten oranges.
4. Add newly rotten oranges to the queue.
5. Increase the time when at least one orange becomes rotten.

If all fresh oranges become rotten, the minimum time is returned.

If some fresh oranges remain unreachable, -1 is returned.

Time Complexity: O(N × M).`,

    code: `import java.util.*;

class RottenOranges {

    static int orangesRotting(int[][] grid) {

        int n = grid.length;
        int m = grid[0].length;

        Queue<int[]> queue =
            new LinkedList<>();

        int fresh = 0;

        // Add rotten oranges to queue
        for (int i = 0; i < n; i++) {

            for (int j = 0; j < m; j++) {

                if (grid[i][j] == 2) {

                    queue.add(
                        new int[]{i, j}
                    );

                } else if (grid[i][j] == 1) {

                    fresh++;
                }
            }
        }

        int time = 0;

        int[][] directions = {
            {1, 0},
            {-1, 0},
            {0, 1},
            {0, -1}
        };

        while (!queue.isEmpty()) {

            int size = queue.size();
            boolean changed = false;

            for (int i = 0; i < size; i++) {

                int[] current = queue.poll();

                for (int[] d : directions) {

                    int r = current[0] + d[0];
                    int c = current[1] + d[1];

                    if (
                        r >= 0 &&
                        r < n &&
                        c >= 0 &&
                        c < m &&
                        grid[r][c] == 1
                    ) {

                        grid[r][c] = 2;
                        fresh--;

                        queue.add(
                            new int[]{r, c}
                        );

                        changed = true;
                    }
                }
            }

            if (changed)
                time++;
        }

        return fresh == 0 ? time : -1;
    }

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter rows: ");
        int n = sc.nextInt();

        System.out.print("Enter columns: ");
        int m = sc.nextInt();

        int[][] grid = new int[n][m];

        System.out.println("Enter grid:");

        for (int i = 0; i < n; i++) {

            for (int j = 0; j < m; j++) {

                grid[i][j] = sc.nextInt();
            }
        }

        System.out.println(
            "Minimum time: " +
            orangesRotting(grid)
        );
    }
}`,

    conclusion: 'Thus, Breadth First Search was successfully used to calculate the minimum time required to rot all reachable fresh oranges.'
  },


  {
    id: 'practical-09',
    number: 9,
    title: 'Edit Distance',
    language: 'Java',

    aim: 'To find the minimum number of operations required to convert one string into another using insertion, deletion, and replacement operations.',

    theory: `Edit Distance is a Dynamic Programming problem used to determine the minimum number of operations required to convert one string into another.

The allowed operations are:
1. **Insert** – Insert a character.
2. **Remove** – Remove a character.
3. **Replace** – Replace one character with another.

All operations have equal cost.

A two-dimensional DP table is used.

dp[i][j] represents the minimum number of operations required to convert the first i characters of the first string into the first j characters of the second string.

If the current characters are equal:

dp[i][j] = dp[i-1][j-1]

Otherwise:

dp[i][j] = 1 + minimum(
    insertion,
    deletion,
    replacement
)

Time Complexity: O(n × m).
Space Complexity: O(n × m).`,

    code: `import java.util.Scanner;

class EditDistance {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter first string: ");
        String str1 = sc.nextLine();

        System.out.print("Enter second string: ");
        String str2 = sc.nextLine();

        int n = str1.length();
        int m = str2.length();

        int[][] dp =
            new int[n + 1][m + 1];

        // Convert first string to empty string
        for (int i = 0; i <= n; i++) {
            dp[i][0] = i;
        }

        // Convert empty string to second string
        for (int j = 0; j <= m; j++) {
            dp[0][j] = j;
        }

        for (int i = 1; i <= n; i++) {

            for (int j = 1; j <= m; j++) {

                if (
                    str1.charAt(i - 1)
                    == str2.charAt(j - 1)
                ) {

                    dp[i][j] =
                        dp[i - 1][j - 1];

                } else {

                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j],
                        Math.min(
                            dp[i][j - 1],
                            dp[i - 1][j - 1]
                        )
                    );
                }
            }
        }

        System.out.println(
            "Minimum operations: " +
            dp[n][m]
        );
    }
}`,

    conclusion: 'Thus, the minimum number of insertion, deletion, and replacement operations required to convert one string into another was successfully calculated using Dynamic Programming.'
  },


  {
    id: 'practical-10',
    number: 10,
    title: 'Minimum Path Sum',
    language: 'Java',

    aim: 'To find the minimum path sum from the top-left corner to the bottom-right corner of a grid containing non-negative integers.',

    theory: `Minimum Path Sum is a Dynamic Programming problem.

The grid contains non-negative integers. The objective is to travel from the top-left cell to the bottom-right cell while minimizing the total sum of the values along the path.

The movement is restricted to:
- Right
- Down

The program modifies the grid to store the minimum path sum reaching each cell.

For the first column, only downward movement is possible.

For the first row, only rightward movement is possible.

For every remaining cell:

grid[i][j] += min(
    grid[i-1][j],
    grid[i][j-1]
)

The bottom-right cell finally contains the minimum path sum.

Time Complexity: O(N × M).`,

    code: `import java.util.Scanner;

class MinimumPathSum {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter rows: ");
        int n = sc.nextInt();

        System.out.print("Enter columns: ");
        int m = sc.nextInt();

        int[][] grid = new int[n][m];

        System.out.println("Enter grid:");

        for (int i = 0; i < n; i++) {

            for (int j = 0; j < m; j++) {

                grid[i][j] = sc.nextInt();
            }
        }

        // First column
        for (int i = 1; i < n; i++) {

            grid[i][0] +=
                grid[i - 1][0];
        }

        // First row
        for (int j = 1; j < m; j++) {

            grid[0][j] +=
                grid[0][j - 1];
        }

        // Remaining cells
        for (int i = 1; i < n; i++) {

            for (int j = 1; j < m; j++) {

                grid[i][j] += Math.min(
                    grid[i - 1][j],
                    grid[i][j - 1]
                );
            }
        }

        System.out.println(
            "Minimum path sum: " +
            grid[n - 1][m - 1]
        );
    }
}`,

    conclusion: 'Thus, the minimum path sum from the top-left to the bottom-right of the given grid was successfully calculated using Dynamic Programming.'
  },


  {
    id: 'practical-11',
    number: 11,
    title: 'Remove K Digits',
    language: 'Java',

    aim: 'To find the smallest possible integer after removing exactly k digits from a given non-negative integer.',

    theory: `The Remove K Digits problem requires removing exactly k digits from a number so that the resulting number is as small as possible.

A Stack is used to solve this problem efficiently.

For every digit:
1. Compare it with the digit at the top of the stack.
2. If the top digit is greater than the current digit and k is greater than zero, remove the top digit.
3. Continue until the current digit can be added.
4. If k digits still remain, remove digits from the end.
5. Remove leading zeros.
6. If the final result is empty, return 0.

The greedy approach ensures that larger digits appearing before smaller digits are removed whenever possible.

Time Complexity: O(n).`,

    code: `import java.util.*;

class RemoveKDigits {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter number: ");
        String num = sc.next();

        System.out.print("Enter k: ");
        int k = sc.nextInt();

        Stack<Character> stack =
            new Stack<>();

        for (char digit : num.toCharArray()) {

            while (
                !stack.isEmpty() &&
                k > 0 &&
                stack.peek() > digit
            ) {

                stack.pop();
                k--;
            }

            stack.push(digit);
        }

        // Remove remaining digits
        while (k > 0) {

            stack.pop();
            k--;
        }

        StringBuilder result =
            new StringBuilder();

        for (char c : stack) {
            result.append(c);
        }

        // Remove leading zeros
        while (
            result.length() > 1 &&
            result.charAt(0) == '0'
        ) {

            result.deleteCharAt(0);
        }

        if (result.length() == 0) {
            result.append("0");
        }

        System.out.println(
            "Smallest number: " + result
        );
    }
}`,

    conclusion: 'Thus, the smallest possible number after removing k digits was successfully obtained using a greedy approach and Stack.'
  },


  {
    id: 'practical-12',
    number: 12,
    title: 'Unique Paths',
    language: 'Java',

    aim: 'To calculate the number of unique paths for a robot to move from the top-left corner to the bottom-right corner of an m × n grid using only down and right movements.',

    theory: `The Unique Paths problem is a Dynamic Programming problem.

A robot starts at the top-left corner of an m × n grid and needs to reach the bottom-right corner.

The robot can move only:
- Right
- Down

The first row has only one possible way because the robot can only move right.

Similarly, the first column has only one possible way because the robot can only move down.

For every other cell:

dp[i][j] =
    dp[i-1][j] + dp[i][j-1]

This means the number of paths to the current cell is the sum of paths from the cell above and the cell to the left.

The bottom-right cell contains the total number of unique paths.

Time Complexity: O(m × n).
Space Complexity: O(m × n).`,

    code: `import java.util.Scanner;

class UniquePaths {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.print("Enter rows: ");
        int m = sc.nextInt();

        System.out.print("Enter columns: ");
        int n = sc.nextInt();

        int[][] dp =
            new int[m][n];

        // First column
        for (int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }

        // First row
        for (int j = 0; j < n; j++) {
            dp[0][j] = 1;
        }

        // Calculate paths
        for (int i = 1; i < m; i++) {

            for (int j = 1; j < n; j++) {

                dp[i][j] =
                    dp[i - 1][j] +
                    dp[i][j - 1];
            }
        }

        System.out.println(
            "Number of unique paths: " +
            dp[m - 1][n - 1]
        );
    }
}`,

    conclusion: 'Thus, the number of unique paths from the top-left to the bottom-right corner of the grid was successfully calculated using Dynamic Programming.'
  },
];
