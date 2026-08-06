export const INITIAL_USER = {
  name: "Rakshith Y B",
  email: "rakshith.yb@skillforge.edu",
  avatar: "RY",
  role: "Aspiring SDE-1 / CS Senior",
  targetRole: "Full Stack Engineer",
  streak: 12,
  points: 2450,
  rank: 14,
  mcqAccuracy: 88,
  codingAccuracy: 64,
  descriptiveScore: 75,
  completedProblems: 84,
  totalProblems: 150,
  joinedDate: "Jan 2026",
};

export const COURSES_DATA = [
  {
    id: "dsa-mastery",
    title: "Data Structures & Algorithms Mastery",
    category: "Core CS",
    difficulty: "Intermediate",
    progress: 72,
    modulesCount: 24,
    completedModules: 17,
    duration: "45 Hours",
    rating: 4.9,
    studentsCount: 14200,
    instructor: "Dr. Aris Thorne (Ex-Google Lead)",
    image: "https://images.unsplash.com/photo-1516116211223-4c7142b2e2ec?auto=format&fit=crop&w=600&q=80",
    tags: ["Arrays", "Trees", "Graphs", "Dynamic Programming"],
    description: "Comprehensive guide to mastering problem solving patterns for FAANG & tier-1 technical interviews.",
    status: "In Progress",
    modules: [
      { id: 1, title: "Array & Two-Pointers Technique", duration: "2h 30m", completed: true },
      { id: 2, title: "Sliding Window & Hash Maps", duration: "3h 15m", completed: true },
      { id: 3, title: "Trees & Binary Search Trees", duration: "4h 00m", completed: true },
      { id: 4, title: "Graph Traversal (BFS & DFS)", duration: "5h 20m", completed: false },
      { id: 5, title: "Dynamic Programming Foundations", duration: "6h 45m", completed: false },
    ]
  },
  {
    id: "dbms-internals",
    title: "Database Management Systems & SQL Scaling",
    category: "Database",
    difficulty: "Beginner to Intermediate",
    progress: 40,
    modulesCount: 16,
    completedModules: 6,
    duration: "28 Hours",
    rating: 4.8,
    studentsCount: 9800,
    instructor: "Prof. Elena Vance (Database Architect)",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
    tags: ["SQL", "Indexing", "ACID", "Transactions", "Sharding"],
    description: "Deep dive into relational engine internals, query optimization, indexing strategies, and distributed storage.",
    status: "In Progress",
    modules: [
      { id: 1, title: "Relational Data Modeling & ER Diagrams", duration: "2h 10m", completed: true },
      { id: 2, title: "Advanced SQL Queries & Window Functions", duration: "3h 30m", completed: true },
      { id: 3, title: "B-Tree Indexing & Query Execution Plans", duration: "4h 15m", completed: false },
      { id: 4, title: "ACID Properties & Concurrency Control", duration: "3h 45m", completed: false },
    ]
  },
  {
    id: "system-design",
    title: "System Design for High Scale Applications",
    category: "Architecture",
    difficulty: "Advanced",
    progress: 15,
    modulesCount: 20,
    completedModules: 3,
    duration: "36 Hours",
    rating: 4.95,
    studentsCount: 18500,
    instructor: "Marcus Brody (Principal Systems Architect)",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    tags: ["Load Balancing", "Microservices", "Kafka", "Caching"],
    description: "Learn how to architect distributed systems handling millions of requests per second.",
    status: "In Progress",
    modules: [
      { id: 1, title: "Scalability Fundamentals & CAP Theorem", duration: "2h 45m", completed: true },
      { id: 2, title: "Load Balancing & Rate Limiting Algorithms", duration: "3h 50m", completed: false },
      { id: 3, title: "Distributed Caching with Redis & Memcached", duration: "4h 10m", completed: false },
      { id: 4, title: "Message Queues: Kafka vs RabbitMQ", duration: "5h 00m", completed: false },
    ]
  },
  {
    id: "operating-systems",
    title: "Operating Systems & Low Level Concurrency",
    category: "Core CS",
    difficulty: "Intermediate",
    progress: 0,
    modulesCount: 18,
    completedModules: 0,
    duration: "30 Hours",
    rating: 4.7,
    studentsCount: 7600,
    instructor: "Sarah Jenkins (Kernel Engineer)",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80",
    tags: ["Threads", "Virtual Memory", "Deadlocks", "POSIX"],
    description: "Understand kernel memory management, process scheduling, multithreading synchronization, and I/O multiplexing.",
    status: "New",
    modules: [
      { id: 1, title: "Process Control Blocks & Context Switching", duration: "2h 00m", completed: false },
      { id: 2, title: "Memory Management & Paging Systems", duration: "3h 30m", completed: false },
    ]
  },
  {
    id: "fullstack-react-node",
    title: "Production Full Stack Engineering",
    category: "Development",
    difficulty: "Intermediate",
    progress: 100,
    modulesCount: 22,
    completedModules: 22,
    duration: "40 Hours",
    rating: 4.9,
    studentsCount: 21000,
    instructor: "Rakshith Y B & Dev Team",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80",
    tags: ["React.js", "Node.js", "TypeScript", "Docker"],
    description: "Build, containerize, and deploy full stack web applications with modern CI/CD pipelines.",
    status: "Completed",
    modules: [
      { id: 1, title: "React 19 Architecture & Custom Hooks", duration: "4h 00m", completed: true },
      { id: 2, title: "Express RESTful APIs & Middleware Security", duration: "3h 30m", completed: true },
    ]
  },
  {
    id: "distributed-consensus-raft",
    title: "Distributed Consensus & Raft Protocol Architecture",
    category: "Architecture",
    difficulty: "Advanced",
    progress: 0,
    modulesCount: 20,
    completedModules: 0,
    duration: "40 Hours",
    rating: 4.95,
    studentsCount: 5400,
    instructor: "Dr. K. S. Ramanujan",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
    tags: ["Distributed Systems", "Raft", "Paxos", "Fault Tolerance"],
    description: "Deep dive into distributed consensus protocols, leader election, log replication, and Byzantine fault tolerance.",
    status: "New",
    enrolledStudentsList: ["Rakshith Y B", "Preetham S Gowda", "Lohith R C"],
    modules: [
      { id: 1, title: "State Machine Replication Foundations", duration: "2h 30m", completed: false },
      { id: 2, title: "Raft Leader Election & Term Monotonic Counters", duration: "3h 45m", completed: false },
      { id: 3, title: "Log Inconsistency Safety & Membership Changes", duration: "4h 10m", completed: false }
    ]
  },
  {
    id: "compiler-design-llvm",
    title: "Advanced Compiler Design & LLVM Optimizations",
    category: "Core CS",
    difficulty: "Advanced",
    progress: 0,
    modulesCount: 18,
    completedModules: 0,
    duration: "36 Hours",
    rating: 4.88,
    studentsCount: 4200,
    instructor: "Prof. Sundararajan Iyengar",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    tags: ["LLVM", "Abstract Syntax Trees", "SSA Form", "Code Generation"],
    description: "Build a programming language compiler frontend and backend pass pipeline using LLVM IR optimization passes.",
    status: "New",
    enrolledStudentsList: ["Avani J C", "Monica KS", "Kanikka M"],
    modules: [
      { id: 1, title: "Lexical Analysis & AST Construction", duration: "3h 00m", completed: false },
      { id: 2, title: "Static Single Assignment (SSA) Transformations", duration: "4h 15m", completed: false }
    ]
  },
  {
    id: "quantum-computing-qiskit",
    title: "Quantum Computing Algorithms & Qiskit Engineering",
    category: "Core CS",
    difficulty: "Advanced",
    progress: 0,
    modulesCount: 16,
    completedModules: 0,
    duration: "30 Hours",
    rating: 4.90,
    studentsCount: 3800,
    instructor: "Dr. Ananya Venkatesh",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
    tags: ["Quantum Gates", "Qiskit", "Shor's Algorithm", "Grover Search"],
    description: "Explore quantum mechanical principles, qubit entanglement, quantum circuits, and Grover's search algorithm.",
    status: "New",
    enrolledStudentsList: ["Shwetha B G", "Kanya V P", "Rakshith Y B"],
    modules: [
      { id: 1, title: "Qubits, Superposition & Bloch Sphere", duration: "2h 30m", completed: false },
      { id: 2, title: "Quantum Teleportation & Phase Estimation", duration: "3h 40m", completed: false }
    ]
  },
  {
    id: "stream-processing-flink",
    title: "High-Throughput Stream Processing with Apache Flink",
    category: "Database",
    difficulty: "Intermediate",
    progress: 0,
    modulesCount: 15,
    completedModules: 0,
    duration: "28 Hours",
    rating: 4.85,
    studentsCount: 6100,
    instructor: "Prof. N. R. Narayana Swamy",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    tags: ["Apache Flink", "Event Time", "Windowing", "Stateful Processing"],
    description: "Architect real-time streaming pipelines with event-time semantics, watermarks, and exactly-once state recovery.",
    status: "New",
    enrolledStudentsList: ["Preetham S Gowda", "Rakshith Y B", "Avani J C"],
    modules: [
      { id: 1, title: "Stream & Batch Unification Core Concepts", duration: "2h 15m", completed: false }
    ]
  },
  {
    id: "gpu-parallel-cuda",
    title: "GPU Parallel Computing & CUDA Programming",
    category: "Core CS",
    difficulty: "Advanced",
    progress: 0,
    modulesCount: 22,
    completedModules: 0,
    duration: "42 Hours",
    rating: 4.92,
    studentsCount: 7400,
    instructor: "Dr. Srinivas R. Murthy",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=600&q=80",
    tags: ["CUDA", "GPU Parallelism", "Shared Memory", "Warp Divergence"],
    description: "Write mass parallel kernel programs executing across thousands of GPU cores for deep learning and matrix acceleration.",
    status: "New",
    enrolledStudentsList: ["Monica KS", "Shwetha B G", "Kanikka M"],
    modules: [
      { id: 1, title: "CUDA Execution Model & Thread Grids", duration: "3h 20m", completed: false }
    ]
  },
  {
    id: "mlops-infrastructure",
    title: "Machine Learning Systems (MLOps) Infrastructure",
    category: "Development",
    difficulty: "Intermediate",
    progress: 0,
    modulesCount: 16,
    completedModules: 0,
    duration: "32 Hours",
    rating: 4.91,
    studentsCount: 8900,
    instructor: "Prof. Radhakrishnan Iyer",
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=600&q=80",
    tags: ["MLOps", "Kubeflow", "MLflow", "Model Monitoring"],
    description: "Build automated ML pipelines for feature stores, continuous training, model registries, and drift detection.",
    status: "New",
    enrolledStudentsList: ["Rakshith Y B", "Kanya V P", "Preetham S Gowda"],
    modules: [
      { id: 1, title: "Feature Store Design & Data Lineage", duration: "2h 45m", completed: false }
    ]
  },
  {
    id: "low-latency-trading-systems",
    title: "Low-Latency Financial Trading System Architecture",
    category: "Architecture",
    difficulty: "Advanced",
    progress: 0,
    modulesCount: 19,
    completedModules: 0,
    duration: "38 Hours",
    rating: 4.94,
    studentsCount: 5100,
    instructor: "Dr. Balaji Subramanian",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80",
    tags: ["Low Latency", "Lock-Free Ring Buffers", "Kernel Bypass", "DPDK"],
    description: "Design sub-microsecond algorithmic order matching engines using lock-free data structures and DPDK networking.",
    status: "New",
    enrolledStudentsList: ["Rakshith Y B", "Avani J C", "Monica KS"],
    modules: [
      { id: 1, title: "LMAX Disruptor & Ring Buffer Mechanics", duration: "3h 10m", completed: false }
    ]
  },
  {
    id: "robotics-ros2-control",
    title: "Autonomous Mobile Robotics & ROS2 Control",
    category: "Development",
    difficulty: "Intermediate",
    progress: 0,
    modulesCount: 17,
    completedModules: 0,
    duration: "35 Hours",
    rating: 4.87,
    studentsCount: 4600,
    instructor: "Dr. Meenakshi Sundaram",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
    tags: ["ROS2", "SLAM", "Kalman Filters", "Kinematics"],
    description: "Program autonomous navigation nodes, sensor fusion algorithms (LiDAR + IMU), and path planning in ROS2.",
    status: "New",
    enrolledStudentsList: ["Kanikka M", "Shwetha B G", "Kanya V P"],
    modules: [
      { id: 1, title: "ROS2 Nodes, Topics & Action Servers", duration: "2h 50m", completed: false }
    ]
  },
  {
    id: "microservices-security-oauth2",
    title: "Microservices Security & OAuth2/OIDC Deep Dive",
    category: "Architecture",
    difficulty: "Intermediate",
    progress: 0,
    modulesCount: 14,
    completedModules: 0,
    duration: "24 Hours",
    rating: 4.89,
    studentsCount: 9300,
    instructor: "Dr. Vigneshwaran K.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
    tags: ["OAuth2", "OIDC", "JWT", "API Gateways"],
    description: "Implement zero-trust security architectures, token introspection, mTLS service communication, and PKCE auth flows.",
    status: "New",
    enrolledStudentsList: ["Rakshith Y B", "Preetham S Gowda", "Shwetha B G"],
    modules: [
      { id: 1, title: "OAuth2 Authorization Code Grant & PKCE Flow", duration: "2h 30m", completed: false }
    ]
  },
  {
    id: "freertos-embedded-systems",
    title: "Embedded Real-Time Operating Systems (FreeRTOS)",
    category: "Core CS",
    difficulty: "Intermediate",
    progress: 0,
    modulesCount: 16,
    completedModules: 0,
    duration: "30 Hours",
    rating: 4.83,
    studentsCount: 3900,
    instructor: "Prof. S. Shankaranarayanan",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
    tags: ["FreeRTOS", "Task Scheduling", "Semaphores", "Interrupts"],
    description: "Develop deterministic embedded RTOS applications handling priority inversion, semaphores, queues, and ISRs.",
    status: "New",
    enrolledStudentsList: ["Avani J C", "Rakshith Y B", "Kanikka M"],
    modules: [
      { id: 1, title: "Preemptive Task Scheduling & Tick Timers", duration: "2h 40m", completed: false }
    ]
  },
  {
    id: "vlsi-verilog-hdl",
    title: "VLSI Circuit Design & Verilog HDL Synthesis",
    category: "Core CS",
    difficulty: "Advanced",
    progress: 0,
    modulesCount: 21,
    completedModules: 0,
    duration: "44 Hours",
    rating: 4.86,
    studentsCount: 3500,
    instructor: "Dr. Vidya Narasimhan",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=600&q=80",
    tags: ["VLSI", "Verilog", "FPGA", "Static Timing Analysis"],
    description: "Design digital integrated circuits, synthesize hardware using Verilog HDL, and perform static timing analysis on FPGAs.",
    status: "New",
    enrolledStudentsList: ["Kanya V P", "Monica KS", "Rakshith Y B"],
    modules: [
      { id: 1, title: "Combinational & Sequential Verilog Modeling", duration: "3h 15m", completed: false }
    ]
  },
  {
    id: "computer-vision-spatial-ai",
    title: "Deep Learning for Computer Vision & Spatial AI",
    category: "Development",
    difficulty: "Advanced",
    progress: 0,
    modulesCount: 20,
    completedModules: 0,
    duration: "40 Hours",
    rating: 4.96,
    studentsCount: 11200,
    instructor: "Prof. B. S. Jayaprakash",
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=600&q=80",
    tags: ["YOLO", "CNNs", "NeRFs", "3D Vision"],
    description: "Build 3D spatial vision perception models, neural radiance fields (NeRFs), and real-time YOLO object detectors.",
    status: "New",
    enrolledStudentsList: ["Preetham S Gowda", "Shwetha B G", "Avani J C"],
    modules: [
      { id: 1, title: "Convolutional Architectures & ResNet Backbones", duration: "3h 00m", completed: false }
    ]
  },
  {
    id: "kubernetes-internals",
    title: "Cloud Native Infrastructure & Kubernetes Internals",
    category: "Architecture",
    difficulty: "Intermediate",
    progress: 0,
    modulesCount: 15,
    completedModules: 0,
    duration: "30 Hours",
    rating: 4.90,
    studentsCount: 12500,
    instructor: "Dr. Karthik Seshadri",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=80",
    tags: ["Kubernetes", "Containerd", "Custom Controllers", "CNI"],
    description: "Understand K8s control plane mechanics, write Custom Resource Definitions (CRDs), and implement Go operators.",
    status: "New",
    enrolledStudentsList: ["Rakshith Y B", "Kanikka M", "Kanya V P"],
    modules: [
      { id: 1, title: "Kube-Apiserver, Etcd & Controller Reconciliation", duration: "2h 45m", completed: false }
    ]
  },
  {
    id: "cryptographic-engineering-zkp",
    title: "Cryptographic Engineering & Zero-Knowledge Proofs",
    category: "Core CS",
    difficulty: "Advanced",
    progress: 0,
    modulesCount: 18,
    completedModules: 0,
    duration: "36 Hours",
    rating: 4.93,
    studentsCount: 4100,
    instructor: "Prof. R. Vasudevan",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    tags: ["Cryptography", "zk-SNARKs", "Elliptic Curves", "AES"],
    description: "Master modern cryptographic primitives, RSA/ECC mathematics, and non-interactive zero-knowledge proofs (zk-SNARKs).",
    status: "New",
    enrolledStudentsList: ["Monica KS", "Rakshith Y B", "Preetham S Gowda"],
    modules: [
      { id: 1, title: "Elliptic Curve Group Theory & Pairings", duration: "3h 20m", completed: false }
    ]
  },
  {
    id: "database-kernel-btree",
    title: "Database Kernel Engine & B-Tree Storage Engines",
    category: "Database",
    difficulty: "Advanced",
    progress: 0,
    modulesCount: 16,
    completedModules: 0,
    duration: "32 Hours",
    rating: 4.91,
    studentsCount: 5800,
    instructor: "Dr. Lakshmi Prasanna",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
    tags: ["B-Trees", "Buffer Pool", "WAL Log", "Query Planner"],
    description: "Write a relational database storage engine in C++/Rust featuring B+Tree page splitters, buffer managers, and write-ahead logs.",
    status: "New",
    enrolledStudentsList: ["Avani J C", "Rakshith Y B", "Shwetha B G"],
    modules: [
      { id: 1, title: "Disk Page Layout & Buffer Pool Eviction", duration: "2h 50m", completed: false }
    ]
  }
];

export const PRACTICE_PROBLEMS = [
  {
    id: "prob-1",
    title: "Optimized Placement Match Score",
    difficulty: "Medium",
    category: "Arrays & Hash Map",
    acceptance: "78.4%",
    points: 50,
    description: `Given a student profile object containing skills vector \`V\` and target role threshold \`T\`, implement an algorithm that calculates the optimal candidate match score in O(N) time complexity.

Return \`"Top Tier Match"\` if score > 95, else calculate weighted placement probability using the provided ATS metric helper.`,
    starterCode: {
      python: `def optimize_placement(profile):\n    # Extract metric scores\n    skills = profile.get_metrics()\n    if skills.score > 95:\n        return "Top Tier Match"\n    \n    # Calculate ATS match probability\n    total_score = sum(skills.values) / len(skills.values)\n    return f"Match Score: {total_score:.1f}%"`,
      javascript: `function optimizePlacement(profile) {\n  const skills = profile.getMetrics();\n  if (skills.score > 95) {\n    return "Top Tier Match";\n  }\n  const avg = Object.values(skills.values).reduce((a, b) => a + b, 0) / Object.keys(skills.values).length;\n  return \`Match Score: \${avg.toFixed(1)}%\`;\n}`,
      cpp: `#include <iostream>\n#include <string>\n#include <vector>\n\nstd::string optimizePlacement(const std::vector<int>& skills) {\n    int sum = 0;\n    for(int s : skills) sum += s;\n    double avg = (double)sum / skills.size();\n    if(avg > 95) return "Top Tier Match";\n    return "Qualified Candidate";\n}`
    },
    testCases: [
      { id: 1, input: "profile = { score: 98, values: [95, 99, 100] }", expected: '"Top Tier Match"', passed: true },
      { id: 2, input: "profile = { score: 88, values: [85, 90, 89] }", expected: '"Match Score: 88.0%"', passed: true },
      { id: 3, input: "profile = { score: 72, values: [70, 75, 71] }", expected: '"Match Score: 72.0%"', passed: true }
    ],
    groqAiInsight: "Code structure optimized. Time complexity: O(N), Space complexity: O(1). ATS match probability increased to 98%."
  },
  {
    id: "prob-2",
    title: "LRU Cache Memory eviction",
    difficulty: "Hard",
    category: "Data Structures",
    acceptance: "52.1%",
    points: 100,
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(capacity)\` Initialize the LRU cache with positive size capacity.
- \`get(key)\` Return the value of the key if key exists, otherwise return -1.
- \`put(key, value)\` Update the value if key exists, otherwise add key-value pair. If keys exceed capacity, evict the least recently used key.`,
    starterCode: {
      python: `class LRUCache:\n    def __init__(self, capacity: int):\n        self.cap = capacity\n        self.cache = {}\n\n    def get(self, key: int) -> int:\n        if key in self.cache:\n            val = self.cache.pop(key)\n            self.cache[key] = val\n            return val\n        return -1\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            self.cache.pop(key)\n        elif len(self.cache) >= self.cap:\n            first_key = next(iter(self.cache))\n            del self.cache[first_key]\n        self.cache[key] = value`,
      javascript: `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    else if (this.map.size >= this.capacity) {\n      const oldest = this.map.keys().next().value;\n      this.map.delete(oldest);\n    }\n    this.map.set(key, value);\n  }\n}`
    },
    testCases: [
      { id: 1, input: "LRUCache(2) -> put(1,1), put(2,2), get(1)", expected: "1", passed: true },
      { id: 2, input: "put(3,3) -> evicts key 2 -> get(2)", expected: "-1", passed: true }
    ],
    groqAiInsight: "Using Doubly Linked List + Hash Map yields true O(1) time complexity for get and put operations."
  }
];

export const LEADERBOARD_USERS = [
  { rank: 1, name: "Aarav Sharma", avatar: "AS", college: "IIT Bombay", points: 4890, streak: 45, badge: "🥇 Grandmaster", problems: 240 },
  { rank: 2, name: "Priya Patel", avatar: "PP", college: "BITS Pilani", points: 4620, streak: 38, badge: "🥈 Master", problems: 215 },
  { rank: 3, name: "Rohan Mehta", avatar: "RM", college: "IIT Delhi", points: 4310, streak: 31, badge: "🥉 Master", problems: 198 },
  { rank: 4, name: "Sneha Reddy", avatar: "SR", college: "NIT Trichy", points: 3950, streak: 29, badge: "Expert", problems: 175 },
  { rank: 5, name: "Vikram Malhotra", avatar: "VM", college: "IIIT Hyderabad", points: 3810, streak: 24, badge: "Expert", problems: 162 },
  { rank: 14, name: "Rakshith Y B (You)", avatar: "RY", college: "SkillForge Academy", points: 2450, streak: 12, badge: "Specialist", problems: 84, isCurrentUser: true }
];

export const NOTIFICATIONS_DATA = [
  { id: 1, title: "Streak Saved!", message: "Your 12-day streak is active. Keep learning today!", time: "10 mins ago", read: false },
  { id: 2, title: "Groq AI ATS Audit Ready", message: "Your resume scored 88/100 for SDE-1 role. Check 3 keyword suggestions.", time: "1 hour ago", read: false },
  { id: 3, title: "New Mock Contest", message: "System Design Mock Assessment goes live tomorrow at 6 PM.", time: "3 hours ago", read: true },
];
