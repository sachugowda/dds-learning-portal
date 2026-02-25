// Portal Configuration - All CS Topics
// Old standalone HTML files are now just reference material; the portal
// renders unified content and simulations for each CS/topic.
const CS_CONFIG = {
    1: {
        title: 'Distributed Data Storage Technology',
        topics: [
            'Distributed Systems',
            'Server-Centric',
            'Storage-Centric',
            'Disk Subsystems',
            'IO Channels & JBOD',
            'RAID Simulation',
            'DAS/NAS/SAN',
            'Healthcare Examples'
        ]
    },
    2: {
        title: 'Storage Systems Simulator',
        topics: [
            'JBOD',
            'RAID 0',
            'RAID 1',
            'RAID 10',
            'RAID 5',
            'RAID 6',
            'DAS/NAS/SAN'
        ]
    },
    3: {
        title: 'Distributed DBMS Concepts',
        topics: [
            'Distributed DB Basics',
            'ANSI/SPARC Layers',
            'Architecture Models',
            'System Challenges',
            'Design Decisions'
        ]
    },
    4: {
        title: 'Distributed DBMS Architecture',
        topics: [
            'Core Concepts',
            'Client/Server',
            'Peer-to-Peer',
            'MDBS',
            'Data Sources',
            'Real-World Apps',
            'Comparison'
        ]
    },
    5: {
        title: 'Distributed Database Design',
        topics: [
            'Sharing Levels',
            'Fragmentation',
            'Allocation',
            'Query Simulator',
            'Case Study'
        ]
    },
    6: {
        title: 'Distributed Database Design & Integration',
        topics: [
            'Bottom-Up Design',
            'Schema Matching',
            'Schema Integration',
            'Schema Mapping',
            'Data Cleaning',
            'Allocation',
            'Data Directory'
        ]
    },
    7: {
        title: 'Data and Access Control',
        topics: [
            'View Management',
            'Materialized Views',
            'Data Security',
            'Discretionary Access',
            'Multilevel Access',
            'Distributed Access'
        ]
    },
    8: {
        title: 'Revision Session (CS 1-7)',
        topics: ['Revision Activities'],
        isRevision: true
    },
    9: { title: 'Update Soon', topics: ['Update Soon'] },
    10: { title: 'Update Soon', topics: ['Update Soon'] },
    11: { title: 'Update Soon', topics: ['Update Soon'] },
    12: { title: 'Update Soon', topics: ['Update Soon'] },
    13: { title: 'Update Soon', topics: ['Update Soon'] },
    14: { title: 'Update Soon', topics: ['Update Soon'] },
    15: { title: 'Update Soon', topics: ['Update Soon'] },
    16: {
        title: 'Final Revision Session',
        topics: ['Comprehensive Revision'],
        isRevision: true
    }
};

let currentCS = null;
let currentTopic = null;
let selectedText = '';

// Adaptive AI Test State
let adaptiveTestState = {
    active: false,
    correctStreak: 0,
    targetStreak: 5,
    currentQuestion: null,
    questionNumber: 0,
    topics: [],
    askedQuestions: [] // Track asked questions to avoid repeats
};

// Lightweight content templates for each CS/topic.
// These are intentionally simple but consistent, and can be enriched over time.
function getTopicContent(csNum, topic) {
    const description = getTopicDescription(csNum, topic);
    return `
      <div class="topic-layout">
        <div class="topic-text">
          <h2>${topic}</h2>
          <p class="topic-intro">
            ${description}
          </p>
          <button class="btn-inline" data-action="ask-ai-topic">
            🤖 Ask AI Tutor about “${topic}”
          </button>
        </div>
        <div class="topic-sim" data-cs="${csNum}" data-topic="${topic}">
          ${getSimulationShell(csNum, topic)}
        </div>
      </div>
    `;
}

// Short, topic-specific descriptions + real-world examples
function getTopicDescription(csNum, topic) {
    switch (csNum) {
        case 1:
            switch (topic) {
                case 'Distributed Systems':
                    return `<strong>What is a Distributed System?</strong><br><br>
                    A distributed system is a collection of independent computers (nodes) that appear to users as a single coherent system. These computers are connected by a network and coordinate their actions by passing messages to achieve a common goal.<br><br>
                    
                    <strong>Key Characteristics:</strong><br>
                    • <strong>Scalability:</strong> Can grow by adding more nodes (e.g., Netflix adding servers to handle more users)<br>
                    • <strong>Availability:</strong> System continues working even if some nodes fail<br>
                    • <strong>Fault Tolerance:</strong> Can recover from failures automatically<br>
                    • <strong>Transparency:</strong> Users don't need to know where data is stored or processed<br><br>
                    
                    <strong>Real-World Examples:</strong><br>
                    • <strong>Netflix:</strong> 250+ million users served via geo-distributed Cassandra clusters. When you watch a movie, data comes from servers closest to you<br>
                    • <strong>Google Search:</strong> Thousands of servers across the world cooperate to answer your query in milliseconds<br>
                    • <strong>Facebook:</strong> Billions of users accessing data stored across multiple data centers globally<br><br>
                    
                    <strong>How It Works:</strong> When you make a request (like watching a video), the system automatically routes it to the nearest available server, replicates data for redundancy, and balances load across multiple nodes. The simulation below shows how multiple nodes work together as one system.`;
                case 'Server-Centric':
                    return `<strong>Server-Centric Architecture</strong><br><br>
                    In a server-centric setup, storage is directly attached to a single server via SCSI (Small Computer System Interface) cables. The storage device is physically and logically tied to that one server.<br><br>
                    
                    <strong>Key Features:</strong><br>
                    • Storage is directly connected to one server (typically within 25 meters due to SCSI limitations)<br>
                    • No sharing: Only that server can access the storage<br>
                    • Single point of failure: If the server crashes, data becomes unavailable<br>
                    • Simple setup: Easy to configure but limited scalability<br><br>
                    
                    <strong>Real-World Example:</strong><br>
                    A small Norwegian hospital clinic uses a server-centric PACS (Picture Archiving and Communication System) where all MRI images (500GB+) are stored on one machine. If that server fails, doctors cannot access any patient scans until it's repaired.<br><br>
                    
                    <strong>Limitations:</strong><br>
                    • Cannot share data across multiple servers<br>
                    • No redundancy: Server failure = complete data loss<br>
                    • Limited scalability: Adding storage requires adding more servers<br>
                    • Geographic constraints: Storage must be physically close to the server<br><br>
                    
                    <strong>Solution:</strong> Storage-centric architectures solve these problems by decoupling storage from servers. Click the simulation button to see what happens when the server fails.`;
                case 'Storage-Centric':
                    return `<strong>Storage-Centric Architecture</strong><br><br>
                    Storage-centric architectures decouple servers from storage devices. Multiple servers can share large, intelligent disk subsystems over a storage network (SAN - Storage Area Network).<br><br>
                    
                    <strong>Key Features:</strong><br>
                    • Storage is independent: Not tied to any single server<br>
                    • Shared access: Multiple servers can access the same storage simultaneously<br>
                    • Centralized management: Easier to manage and backup<br>
                    • High availability: If one server fails, others can still access the data<br>
                    • Scalability: Can add servers or storage independently<br><br>
                    
                    <strong>Real-World Example:</strong><br>
                    Norwegian bank DNB uses a storage-centric architecture where multiple application servers (Bank Server 1, Bank Server 2, etc.) share a massive 10 petabyte storage subsystem. This allows:<br>
                    • Multiple banking applications to access the same customer data<br>
                    • Load balancing across servers<br>
                    • Easy backup and disaster recovery<br>
                    • Compliance with financial regulations<br><br>
                    
                    <strong>Benefits Over Server-Centric:</strong><br>
                    • Better resource utilization: Storage is shared efficiently<br>
                    • Improved fault tolerance: Server failures don't affect data availability<br>
                    • Easier maintenance: Update servers without touching storage<br>
                    • Cost-effective: Fewer storage devices needed<br><br>
                    
                    Click the simulation to see how multiple servers access shared storage simultaneously.`;
                case 'Disk Subsystems':
                    return `<strong>Intelligent Disk Subsystems</strong><br><br>
                    An intelligent disk subsystem is a storage device that hides the complexity of many physical disks behind a controller. The controller provides advanced features like caching, RAID, and virtualization, making multiple disks appear as a single logical unit.<br><br>
                    
                    <strong>Components:</strong><br>
                    • <strong>Controller:</strong> The "brain" that manages all disks, provides caching, and implements RAID<br>
                    • <strong>Cache:</strong> Fast memory (RAM) that stores frequently accessed data for quick retrieval<br>
                    • <strong>Physical Disks:</strong> Multiple hard drives or SSDs connected to the controller<br>
                    • <strong>Virtualization Layer:</strong> Makes multiple disks appear as one logical volume<br><br>
                    
                    <strong>How It Works:</strong><br>
                    When a server requests data, the controller checks its cache first. If found (cache hit), data is returned instantly. If not (cache miss), the controller retrieves it from the appropriate disk. The controller also handles RAID operations, error correction, and load balancing across disks.<br><br>
                    
                    <strong>Real-World Example:</strong><br>
                    Cloud providers like AWS and Netflix use intelligent disk subsystems to:<br>
                    • Cache popular videos for instant streaming<br>
                    • Implement RAID for data protection<br>
                    • Virtualize petabytes of storage<br>
                    • Provide consistent performance to millions of users<br><br>
                    
                    <strong>Benefits:</strong><br>
                    • Performance: Caching dramatically speeds up data access<br>
                    • Reliability: RAID protects against disk failures<br>
                    • Simplicity: Servers see one logical disk, not many physical ones<br>
                    • Scalability: Can add more disks without reconfiguring servers<br><br>
                    
                    The simulation shows how a controller manages multiple disks behind the scenes.`;
                case 'IO Channels & JBOD':
                    return 'I/O channels connect servers to disks. “Just a Bunch Of Disks” (JBOD) is the simplest way to group disks that still behave as independent drives—no redundancy, but more capacity.';
                case 'RAID Simulation':
                    return `<strong>RAID (Redundant Array of Independent Disks)</strong><br><br>
                    RAID combines multiple physical disks into one logical unit to improve reliability, performance, or both. Different RAID levels offer different trade-offs between capacity, speed, and fault tolerance.<br><br>
                    
                    <strong>Common RAID Levels:</strong><br>
                    • <strong>RAID 0 (Striping):</strong> Data split across disks for speed. No redundancy—one disk failure = total data loss<br>
                    • <strong>RAID 1 (Mirroring):</strong> Data duplicated on two disks. Survives one disk failure, but uses 50% capacity<br>
                    • <strong>RAID 5 (Striping + Parity):</strong> Data and parity distributed across all disks. Survives one disk failure with better capacity efficiency<br>
                    • <strong>RAID 6 (Double Parity):</strong> Like RAID 5 but survives two disk failures<br>
                    • <strong>RAID 10 (Mirroring + Striping):</strong> Combines RAID 1 and RAID 0 for both speed and redundancy<br><br>
                    
                    <strong>How RAID 5 Works:</strong><br>
                    Data is striped across disks, and parity (XOR calculation) is distributed. For example, with 4 data disks + 1 parity disk:<br>
                    • Block A goes to Disk 1<br>
                    • Block B goes to Disk 2<br>
                    • Parity P = A XOR B XOR C XOR D goes to Disk 5<br>
                    If Disk 2 fails, Block B can be reconstructed: B = A XOR C XOR D XOR P<br><br>
                    
                    <strong>Real-World Example:</strong><br>
                    NTNU Library uses RAID 5 to protect a 1 petabyte thesis archive. When Disk 3 failed, the system automatically reconstructed the data from parity without any downtime. The failed disk was replaced, and data was rebuilt in the background.<br><br>
                    
                    <strong>Trade-offs:</strong><br>
                    • RAID 0: Fastest, no redundancy<br>
                    • RAID 1: Most reliable, but expensive (50% capacity loss)<br>
                    • RAID 5: Good balance of speed, capacity, and reliability<br>
                    • RAID 6: Best for large arrays where rebuild times are long<br><br>
                    
                    Click "Fail a Disk" in the simulation to see how RAID handles disk failures.`;
                case 'DAS/NAS/SAN':
                    return `<strong>Storage Connection Types: DAS, NAS, and SAN</strong><br><br>
                    These three acronyms describe different ways to connect storage to servers:<br><br>
                    
                    <strong>1. DAS (Direct Attached Storage)</strong><br>
                    Storage directly connected to one server via SCSI, SATA, or SAS cables.<br>
                    • <strong>Access:</strong> Block-level (raw disk access)<br>
                    • <strong>Performance:</strong> Very high (no network overhead)<br>
                    • <strong>Sharing:</strong> No—only one server can access it<br>
                    • <strong>Example:</strong> Laptop hard drive, desktop internal drive<br>
                    • <strong>Use Case:</strong> Single-server applications, local databases<br><br>
                    
                    <strong>2. NAS (Network Attached Storage)</strong><br>
                    Storage connected over an IP network (Ethernet) that provides file-level access.<br>
                    • <strong>Access:</strong> File-level (NFS, SMB/CIFS protocols)<br>
                    • <strong>Performance:</strong> Medium (network latency affects speed)<br>
                    • <strong>Sharing:</strong> Yes—multiple servers can access files<br>
                    • <strong>Example:</strong> Synology home server, office file server<br>
                    • <strong>Use Case:</strong> File sharing, document storage, media libraries<br><br>
                    
                    <strong>3. SAN (Storage Area Network)</strong><br>
                    Dedicated network (Fibre Channel or iSCSI) that provides block-level access to shared storage.<br>
                    • <strong>Access:</strong> Block-level (appears as local disk to server)<br>
                    • <strong>Performance:</strong> Very high (dedicated network, low latency)<br>
                    • <strong>Sharing:</strong> Yes—multiple servers share block devices<br>
                    • <strong>Example:</strong> Enterprise database storage (DNB Bank), VMware clusters<br>
                    • <strong>Use Case:</strong> High-performance databases, virtualized environments<br><br>
                    
                    <strong>Comparison Table:</strong><br>
                    <table style="width:100%; border-collapse: collapse; margin: 10px 0;">
                    <tr style="background: #f3f4f6;"><th style="padding:8px; border:1px solid #ddd;">Type</th><th style="padding:8px; border:1px solid #ddd;">Access Level</th><th style="padding:8px; border:1px solid #ddd;">Performance</th><th style="padding:8px; border:1px solid #ddd;">Sharing</th></tr>
                    <tr><td style="padding:8px; border:1px solid #ddd;">DAS</td><td style="padding:8px; border:1px solid #ddd;">Block</td><td style="padding:8px; border:1px solid #ddd;">Very High</td><td style="padding:8px; border:1px solid #ddd;">No</td></tr>
                    <tr><td style="padding:8px; border:1px solid #ddd;">NAS</td><td style="padding:8px; border:1px solid #ddd;">File</td><td style="padding:8px; border:1px solid #ddd;">Medium</td><td style="padding:8px; border:1px solid #ddd;">Yes</td></tr>
                    <tr><td style="padding:8px; border:1px solid #ddd;">SAN</td><td style="padding:8px; border:1px solid #ddd;">Block</td><td style="padding:8px; border:1px solid #ddd;">Very High</td><td style="padding:8px; border:1px solid #ddd;">Yes</td></tr>
                    </table><br>
                    
                    <strong>Real-World Usage:</strong><br>
                    Norwegian firms use SAN for high-IOPS (Input/Output Operations Per Second) banking transactions where speed and reliability are critical. NAS is common for office file sharing, while DAS is used for single-server applications.`;
                case 'Healthcare Examples':
                    return `<strong>Distributed Storage in Healthcare</strong><br><br>
                    Healthcare systems have unique requirements: they need to store massive amounts of medical imaging data (MRIs, CT scans, X-rays) while ensuring privacy, compliance, and accessibility across multiple locations.<br><br>
                    
                    <strong>PACS (Picture Archiving and Communication System) - Karolinska Example:</strong><br>
                    The Karolinska Institute in Sweden uses a distributed PACS system where:<br>
                    • Medical images are stored across multiple data centers in Sweden and Norway<br>
                    • Doctors in different cities can instantly retrieve patient scans<br>
                    • Data is replicated for redundancy and disaster recovery<br>
                    • GDPR-compliant: Patient data stays within EU boundaries<br>
                    • Fast access: Cached images load in seconds, not minutes<br><br>
                    
                    <strong>Challenges:</strong><br>
                    • <strong>Volume:</strong> A single MRI scan can be 50-200MB. A hospital generates terabytes per year<br>
                    • <strong>Privacy:</strong> Must comply with HIPAA (US) and GDPR (EU) regulations<br>
                    • <strong>Availability:</strong> Doctors need 24/7 access to critical patient data<br>
                    • <strong>Latency:</strong> Images must load quickly for diagnosis<br>
                    • <strong>Long-term Storage:</strong> Medical records must be kept for decades<br><br>
                    
                    <strong>Solutions:</strong><br>
                    • Distributed storage across multiple sites for redundancy<br>
                    • Edge caching: Frequently accessed images stored locally<br>
                    • Encryption: Data encrypted at rest and in transit<br>
                    • Access controls: Only authorized doctors can view patient data<br>
                    • Automated backups: Multiple copies in different locations<br><br>
                    
                    <strong>Future Trends:</strong><br>
                    • <strong>Federated Learning:</strong> Norwegian hospitals train AI models (e.g., tumor segmentation) without sharing patient CT data. Models are trained locally and only model updates are shared<br>
                    • <strong>Edge Computing:</strong> Processing happens closer to where data is generated (e.g., Yara Birkeland autonomous ferry processes sensor data locally)<br>
                    • <strong>Cloud Integration:</strong> Hybrid systems combining on-premise storage with cloud backup<br><br>
                    
                    These distributed systems ensure that critical medical data is always available, secure, and accessible to healthcare professionals when they need it most.`;
            }
            break;
        case 2:
            switch (topic) {
                case 'JBOD':
                    return '<strong>JBOD (Just a Bunch Of Disks)</strong><br><br>'
                        + 'JBOD puts several physical disks in one box, but the system still sees them as separate drives. '
                        + 'There is no striping, no mirroring, and no parity layer on top.<br><br>'
                        + '<strong>Key ideas:</strong><br>'
                        + '• Capacity is roughly the sum of all disks.<br>'
                        + '• Each disk fails independently; if one disk fails, only the data on that disk is lost.<br>'
                        + '• There is no automatic performance boost or redundancy from the enclosure itself.<br><br>'
                        + '<strong>Real example:</strong> A small lab uses three 4 TB disks in JBOD for raw experiment data. '
                        + 'Important results are copied to cloud backup; the local JBOD is treated as a working area, not a safe archive.<br><br>'
                        + '<strong>Simulation:</strong> Observe that each disk is an independent unit with no protection across disks.';
                case 'RAID 0':
                    return '<strong>RAID 0 (Striping)</strong><br><br>'
                        + 'RAID 0 chops data into blocks and spreads those blocks across multiple disks. '
                        + 'Because disks work in parallel, throughput improves and full raw capacity is available.<br><br>'
                        + '<strong>Key ideas:</strong><br>'
                        + '• Best performance for sequential and parallel reads and writes.<br>'
                        + '• Zero redundancy: one disk failure makes the whole volume unusable.<br>'
                        + '• Suitable only when data can be regenerated from some other source.<br><br>'
                        + '<strong>Real example:</strong> A video editing workstation stripes large video files across several SSDs to get smooth 4K playback, '
                        + 'while long‑term backups are stored safely on a different system.<br><br>'
                        + '<strong>Simulation:</strong> Follow blocks A1, A2, A3, B1, B2, B3 to see how data is split and why losing one disk breaks the full sequence.';
                case 'RAID 1':
                    return '<strong>RAID 1 (Mirroring)</strong><br><br>'
                        + 'RAID 1 writes every block to at least two disks. The copies are kept in sync, so any one disk can fail without data loss.<br><br>'
                        + '<strong>Key ideas:</strong><br>'
                        + '• Very strong protection against single disk failure.<br>'
                        + '• Read performance can improve because reads can be served from any healthy mirror.<br>'
                        + '• Storage efficiency is about fifty percent because each block is stored twice.<br><br>'
                        + '<strong>Real example:</strong> A small organisation keeps its transactional database on a pair of mirrored SSDs so that service continues even if one SSD dies during working hours.<br><br>'
                        + '<strong>Simulation:</strong> Watch how each logical block has two copies and how one copy can fail without losing the data.';
                case 'RAID 10':
                    return '<strong>RAID 10 (Mirroring plus Striping)</strong><br><br>'
                        + 'RAID 10 first creates mirrored pairs of disks, then stripes data across those pairs. '
                        + 'It combines the performance benefits of striping with the fault tolerance of mirroring.<br><br>'
                        + '<strong>Key ideas:</strong><br>'
                        + '• Can survive multiple disk failures as long as both disks in the same pair do not fail.<br>'
                        + '• Very good for workloads with many small random reads and writes.<br>'
                        + '• Uses about half of the raw capacity for redundancy, similar to RAID 1.<br><br>'
                        + '<strong>Real example:</strong> An online shopping application stores its order and payment tables on a RAID 10 array so that it gets fast response time and continues working when a disk fails.<br><br>'
                        + '<strong>Simulation:</strong> See mirrored pairs first, then the striping of data across those pairs.';
                case 'RAID 5':
                    return '<strong>RAID 5 (Striping with Distributed Parity)</strong><br><br>'
                        + 'RAID 5 distributes both data blocks and parity blocks across all disks. '
                        + 'If one disk fails, the lost blocks can be recomputed from the remaining data blocks and the parity information.<br><br>'
                        + '<strong>Key ideas:</strong><br>'
                        + '• Tolerates a single disk failure while preserving all data.<br>'
                        + '• Better capacity utilisation than RAID 1 or RAID 10 (only one disks worth of parity in a group).<br>'
                        + '• Small random writes are slower because parity has to be recalculated.<br><br>'
                        + '<strong>Real example:</strong> A file server for course materials stores many medium sized documents on RAID 5. '
                        + 'The organisation wants good capacity and acceptable protection without the high cost of mirroring everything.<br><br>'
                        + '<strong>Simulation:</strong> Track D1, D2, D3 and parity P to see how a missing block can be reconstructed.';
                case 'RAID 6':
                    return '<strong>RAID 6 (Dual Parity)</strong><br><br>'
                        + 'RAID 6 extends RAID 5 by storing two independent parity values for each stripe. '
                        + 'This allows the array to survive the loss of any two disks in the group.<br><br>'
                        + '<strong>Key ideas:</strong><br>'
                        + '• Protects against a second disk failing while the first one is being rebuilt.<br>'
                        + '• Particularly important for large capacity disks where rebuild times are long.<br>'
                        + '• Write performance is lower than RAID 5 because two parity values must be updated.<br><br>'
                        + '<strong>Real example:</strong> A large archival system holds several hundred terabytes of log and sensor data on RAID 6, '
                        + 'because replacing and rebuilding disks can take many hours or days and the risk of a second failure is real.<br><br>'
                        + '<strong>Simulation:</strong> Observe how there are two different parity blocks and how two failed blocks can still be recovered.';
                case 'DAS/NAS/SAN':
                    return '<strong>DAS, NAS, and SAN</strong><br><br>'
                        + '<strong>DAS (Direct Attached Storage):</strong> RAID box or JBOD connected to one server by a direct cable. '
                        + 'Fast and simple, but other servers cannot see the disks directly.<br><br>'
                        + '<strong>NAS (Network Attached Storage):</strong> Storage system that exposes shared folders over a network protocol such as NFS or SMB. '
                        + 'Clients see files, not raw blocks; ideal for team file shares and home directories.<br><br>'
                        + '<strong>SAN (Storage Area Network):</strong> Specialised network that presents remote RAID arrays as local disks at block level. '
                        + 'Multiple application servers attach to the same storage pool and run databases or virtual machines on top.<br><br>'
                        + '<strong>Simulation:</strong> Compare where RAID arrays sit in DAS, NAS and SAN and which servers can reach them.';
            }
            break;
        case 3:
            switch (topic) {
                case 'Distributed DB Basics':
                    return '<strong>Distributed Database Basics</strong><br><br>'
                        + 'A distributed database stores logically related data at multiple sites connected by a network, '
                        + 'but to the application it looks like a single unified database. Tables may be fragmented and replicated, '
                        + 'yet SQL queries still use one global schema.<br><br>'
                        + '<strong>Key ideas:</strong><br>'
                        + '• <strong>Transparency:</strong> Users do not see where data is actually stored (location, fragmentation, and replication transparency).<br>'
                        + '• <strong>Distribution of data:</strong> Fragments live at different sites that are connected by communication links.<br>'
                        + '• <strong>Distributed transaction management:</strong> ACID properties must hold even when a transaction touches several sites.<br>'
                        + '• <strong>Distributed query processing:</strong> The optimizer decides which sites to contact and how to ship intermediate results.<br><br>'
                        + '<strong>Real example:</strong> A global online retailer stores customer and order data in multiple regional data centres. '
                        + 'When a user views their order history, the system automatically fetches data from the correct sites and presents it as one logical table.<br><br>'
                        + '<strong>Simulation:</strong> Watch how a single client request is decomposed into sub‑requests that travel to Site A and Site B and then return combined results.';
                case 'ANSI/SPARC Layers':
                    return '<strong>ANSI/SPARC Three-Layer Architecture in a Distributed Setting</strong><br><br>'
                        + 'The ANSI/SPARC model separates a database system into three levels:<br>'
                        + '• <strong>External level:</strong> Individual user or application views (e.g. a “Student Portal” view vs a “Finance” view).<br>'
                        + '• <strong>Conceptual level:</strong> One global logical schema for the whole organisation.<br>'
                        + '• <strong>Internal level:</strong> Physical storage structures, file layouts, indexes and, in a distributed DB, fragment placements across sites.<br><br>'
                        + 'In a distributed database the <strong>internal level</strong> includes which fragments are stored at which sites and how they are replicated, '
                        + 'while the conceptual and external views stay stable.<br><br>'
                        + '<strong>Real example:</strong> A university can move exam-result fragments from one data centre to another (internal level) to improve performance '
                        + 'without changing the logical tables seen by applications (conceptual level) or student dashboards (external views).<br><br>'
                        + '<strong>Simulation:</strong> See the three layers stacked and toggle a physical change at the internal level while the conceptual and external views stay unchanged.';
                case 'Architecture Models':
                    return '<strong>Distributed DB Architecture Models</strong><br><br>'
                        + '<strong>Client/Server (C/S):</strong> Many client machines send SQL to a central DB server (or small server cluster). '
                        + 'Data and control are mostly centralised.<br>'
                        + '<strong>Peer‑to‑Peer (P2P):</strong> Each node can act as both client and server; data and processing are spread more evenly across sites.<br>'
                        + '<strong>Multidatabase System (MDBS):</strong> Several autonomous local DBMSs keep their own schemas and control, while a mediator exposes a global schema on top.<br><br>'
                        + '<strong>Trade‑offs:</strong> C/S is simpler to manage but a bottleneck; P2P and MDBS distribute control and reduce single points of failure but add coordination complexity.<br><br>'
                        + '<strong>Real example:</strong> After a company merger, each division keeps its own DBMS (autonomous), and an MDBS layer provides a single global view to reporting tools.<br><br>'
                        + '<strong>Simulation:</strong> Compare three mini‑diagrams side‑by‑side for C/S, P2P and MDBS, and highlight each model in turn.';
                case 'System Challenges':
                    return '<strong>System Challenges in Distributed DBMS</strong><br><br>'
                        + 'Building a distributed DBMS introduces several technical challenges:<br>'
                        + '• <strong>Replication consistency:</strong> Keeping multiple copies of data in sync across sites.<br>'
                        + '• <strong>Fragment placement:</strong> Deciding where to store each fragment to minimise communication cost and latency.<br>'
                        + '• <strong>Failure handling:</strong> Dealing with site crashes, network partitions and message loss.<br>'
                        + '• <strong>Clock and ordering issues:</strong> There is no single global clock; protocols like two‑phase commit and logical timestamps are needed.<br>'
                        + '• <strong>Distributed query optimisation:</strong> Choosing good execution plans that consider data location and network cost.<br><br>'
                        + '<strong>Real example:</strong> In a banking system, an account may be replicated at two data centres. When a transfer occurs, '
                        + 'the system must make sure both replicas are updated or, in case of failure, rolled back consistently.<br><br>'
                        + '<strong>Simulation:</strong> Cycle through different “challenge” badges (latency, failure, skew, etc.) on a small network diagram to see how each affects the system.';
                case 'Design Decisions':
                    return '<strong>Design Decisions in Distributed DBMS</strong><br><br>'
                        + 'Designing a distributed database means making coordinated choices about:<br>'
                        + '• <strong>Fragmentation:</strong> Horizontal vs vertical vs hybrid, and how to keep fragments reconstructable.<br>'
                        + '• <strong>Replication:</strong> Which fragments to replicate, how many copies and which consistency model to use.<br>'
                        + '• <strong>Allocation:</strong> Which sites should hold which fragments and replicas, considering workload and legal constraints.<br>'
                        + '• <strong>Autonomy:</strong> How much independence each site should have to control its own schema and transactions.<br><br>'
                        + '<strong>Real example:</strong> A multinational company may keep customer data fragments in each region (for latency and legal reasons), '
                        + 'replicate a lightweight global customer directory to all sites and centralise a small set of sensitive financial tables.<br><br>'
                        + '<strong>Simulation:</strong> Follow a simple “design path” where fragmentation, replication and allocation choices are highlighted in sequence.';
            }
            break;
        case 4:
            switch (topic) {
                case 'Core Concepts':
                    return '<strong>Core Concepts in Distributed DB Architecture</strong><br><br>'
                        + 'The architecture of a distributed DBMS is built on a few core building blocks:<br>'
                        + '• <strong>Fragmentation:</strong> Splitting tables into pieces stored at different sites.<br>'
                        + '• <strong>Replication:</strong> Keeping multiple copies of important fragments for availability and performance.<br>'
                        + '• <strong>Transparency:</strong> Hiding location, fragmentation and replication details from applications.<br>'
                        + '• <strong>Autonomy:</strong> Allowing sites to retain some local control over data and transactions.<br><br>'
                        + 'These concepts show up differently in client/server, peer‑to‑peer and multidatabase systems, but they are always present.<br><br>'
                        + '<strong>Real example:</strong> A banking group runs several regional DB servers but exposes a single “ACCOUNT” table to applications. '
                        + 'Under the hood, the table is fragmented and partially replicated, but the architecture hides that complexity.<br><br>'
                        + '<strong>Simulation:</strong> Step through each concept badge and connect it back to where it appears in the architecture.';
                case 'Client/Server':
                    return '<strong>Client/Server Architecture</strong><br><br>'
                        + 'In client/server (C/S) architecture, many client applications connect over the network to one or a small cluster of central DB servers. '
                        + 'All SQL processing and transaction control happen at the server side.<br><br>'
                        + '<strong>Characteristics:</strong><br>'
                        + '• Simple to manage: schema, indexes and data live at the server.<br>'
                        + '• Clear central point for backup, tuning and security.<br>'
                        + '• Potential bottleneck and single point of failure if not replicated or clustered.<br><br>'
                        + '<strong>Real example:</strong> An internal HR system where employees use a web UI and all data lives in one central PostgreSQL server in the data centre.<br><br>'
                        + '<strong>Simulation:</strong> Watch client requests converge on a single server node and think about what happens if that node fails.';
                case 'Peer-to-Peer':
                    return '<strong>Peer‑to‑Peer Architecture</strong><br><br>'
                        + 'In a peer‑to‑peer (P2P) distributed DBMS, each node can play the role of both client and server. '
                        + 'Data and processing responsibilities are shared more evenly across sites.<br><br>'
                        + '<strong>Characteristics:</strong><br>'
                        + '• No single permanent “master” server.<br>'
                        + '• Peers may each hold part of the global data and participate in query processing.<br>'
                        + '• Better fault tolerance, but more complex coordination and query routing.<br><br>'
                        + '<strong>Real example:</strong> A bank where each branch server can answer balance queries for local accounts but also cooperates to answer global reports that combine data from many branches.<br><br>'
                        + '<strong>Simulation:</strong> See how requests can circulate among peers instead of always going to one central point.';
                case 'MDBS':
                    return '<strong>MDBS (Multidatabase System)</strong><br><br>'
                        + 'An MDBS integrates several autonomous local DBMSs behind a mediator. '
                        + 'Each site keeps its own schema, indexes and transaction management, while the mediator exposes a global schema built from exported views.<br><br>'
                        + '<strong>Characteristics:</strong><br>'
                        + '• High local autonomy: sites can continue to operate even if the mediator is down.<br>'
                        + '• Heterogeneity: local DBMSs may use different vendors, data models or schemas.<br>'
                        + '• Global queries are rewritten into combinations of local queries using schema mappings.<br><br>'
                        + '<strong>Real example:</strong> After a merger, two companies keep their Oracle and SQL Server systems, but deploy an MDBS‑style integration layer that lets analysts run unified reports without rewriting the local systems.<br><br>'
                        + '<strong>Simulation:</strong> Observe how the mediator node sits above multiple local DB nodes and routes queries down and results up.';
                case 'Data Sources':
                    return '<strong>Data Sources in a Distributed Architecture</strong><br><br>'
                        + 'A modern distributed DBMS often unifies data from several kinds of sources:<br>'
                        + '• <strong>Relational DBs:</strong> Classic OLTP systems (e.g. orders, customers).<br>'
                        + '• <strong>Legacy systems:</strong> Mainframes, older hierarchical or network DBs.<br>'
                        + '• <strong>File repositories:</strong> CSV, JSON, XML or log files.<br>'
                        + '• <strong>External feeds:</strong> APIs, message queues, sensors.<br><br>'
                        + 'Wrappers/adapters hide source‑specific details and present a common relational or semi‑structured view to the distributed DBMS.<br><br>'
                        + '<strong>Real example:</strong> A logistics company combines relational shipment data, GPS event streams and spreadsheet‑based tariffs into one integrated reporting layer.<br><br>'
                        + '<strong>Simulation:</strong> Highlight each source type in turn and see how they all feed into the global view.';
                case 'Real-World Apps':
                    return '<strong>Real‑World Applications of Distributed DB Architecture</strong><br><br>'
                        + 'Distributed DB architectures are used in many domains:<br>'
                        + '• <strong>Healthcare:</strong> Hospital networks aggregating patient data from different vendors while respecting privacy rules.<br>'
                        + '• <strong>E‑commerce:</strong> Global order processing with regional data centres close to customers.<br>'
                        + '• <strong>Finance:</strong> Trading and risk systems combining data from multiple legacy platforms.<br><br>'
                        + 'Each application chooses an architecture (C/S, P2P, MDBS or hybrid) that balances autonomy, consistency, performance and ease of management.<br><br>'
                        + '<strong>Simulation:</strong> Browse through three application cards and connect each to a suitable architecture model.';
                case 'Comparison':
                    return '<strong>Comparison of C/S, P2P and MDBS</strong><br><br>'
                        + 'When choosing an architecture you must compare:<br>'
                        + '• <strong>Autonomy:</strong> How much local control each site keeps.<br>'
                        + '• <strong>Ease of global queries:</strong> How easy it is to ask questions spanning many sites.<br>'
                        + '• <strong>Fault isolation:</strong> Whether failures stay local or affect the whole system.<br>'
                        + '• <strong>Administrative complexity:</strong> How hard it is to configure, tune and monitor the system.<br><br>'
                        + '<strong>High‑level summary:</strong><br>'
                        + '• C/S: simple, central control, potential bottleneck.<br>'
                        + '• P2P: shared control and load, more complex coordination.<br>'
                        + '• MDBS: strong local autonomy, powerful but complex integration layer.<br><br>'
                        + '<strong>Simulation:</strong> Cycle through the three architecture boxes and focus on the pros and cons of each.';
            }
            break;
        case 5:
            switch (topic) {
                case 'Sharing Levels':
                    return '<strong>Sharing Levels in Distributed Databases</strong><br><br>'
                        + 'Distributed design ranges from <strong>no sharing</strong> (each site has its own independent database) '
                        + 'to <strong>full sharing</strong> (all data fully replicated everywhere). In practice, most systems use <strong>selective sharing</strong>: '
                        + 'only the tables and fragments that are needed for cross‑site work are shared.<br><br>'
                        + '<strong>Key ideas:</strong><br>'
                        + '• No sharing: simple, but global queries are impossible.<br>'
                        + '• Selective sharing: share only what is necessary; balance performance, freshness and complexity.<br>'
                        + '• Full sharing: easy global queries, but expensive updates and harder consistency.<br><br>'
                        + '<strong>Real example:</strong> A university lets each campus keep its own local timetable tables, '
                        + 'but shares a lightweight student directory across all campuses so that logins and IDs are consistent.<br><br>'
                        + '<strong>Simulation:</strong> Cycle through the three sharing levels and relate them to different application needs.';
                case 'Fragmentation':
                    return '<strong>Fragmentation</strong><br><br>'
                        + 'Fragmentation splits a global table into smaller pieces called <strong>fragments</strong>. '
                        + 'Each fragment can be stored at the site that uses it most.<br><br>'
                        + '<strong>Types:</strong><br>'
                        + '• <strong>Horizontal:</strong> Subsets of rows (e.g. STUDENT[Campus = A] vs STUDENT[Campus = B]).<br>'
                        + '• <strong>Vertical:</strong> Subsets of columns (e.g. personal data vs exam results).<br>'
                        + '• <strong>Hybrid:</strong> Combine horizontal and vertical fragmentation.<br><br>'
                        + 'The original table must be <strong>reconstructable</strong> from its fragments using UNION and JOIN.<br><br>'
                        + '<strong>Real example:</strong> A retailer fragments ORDER by region (EU, US, APAC) so that most queries hit the closest region only.<br><br>'
                        + '<strong>Simulation:</strong> Watch how fragments labelled A, B, C are shuffled across sites and think which campus or region each fragment could represent.';
                case 'Allocation':
                    return '<strong>Allocation of Fragments</strong><br><br>'
                        + 'Allocation decides <strong>where</strong> to place each fragment and replica. A good allocation minimises communication cost, balances load '
                        + 'and respects storage and legal constraints (for example, keeping EU personal data within the EU).<br><br>'
                        + '<strong>Design questions:</strong><br>'
                        + '• Which site should own each primary fragment?<br>'
                        + '• Where should replicas go to support read‑heavy workloads and fault‑tolerance?<br>'
                        + '• How will updates propagate between replicas?<br><br>'
                        + '<strong>Real example:</strong> A company places CUSTOMER_EU at a Frankfurt data centre, CUSTOMER_US at a Virginia data centre and '
                        + 'a small replicated CUSTOMER_ID directory at all sites for fast authentication.<br><br>'
                        + '<strong>Simulation:</strong> See how re‑allocating fragments between Site A, B and C changes which site serves which users.';
                case 'Query Simulator':
                    return '<strong>Distributed Query Simulator</strong><br><br>'
                        + 'The distributed query processor must decide which fragments to access, at which sites, and in what order to move intermediate results. '
                        + 'A simple SQL query over a global table becomes a <strong>distributed execution plan</strong> that touches several sites.<br><br>'
                        + '<strong>Example:</strong> A query on ORDER that filters by region may be executed only at the sites that hold the relevant ORDER fragments, '
                        + 'then the partial results are shipped back and combined.<br><br>'
                        + '<strong>Real example:</strong> A reporting job that computes total sales per region will run sub‑queries close to data (regional sites) and aggregate results centrally.<br><br>'
                        + '<strong>Simulation:</strong> Follow the flow from client to Site A and Site B and back to see how a distributed plan is executed.';
                case 'Case Study':
                    return '<strong>Case Study: University Database</strong><br><br>'
                        + 'Consider a university distributed across multiple campuses. A good distributed design might:<br>'
                        + '• Fragment STUDENT horizontally by campus.<br>'
                        + '• Allocate EXAM_RESULTS near departments that own the courses.<br>'
                        + '• Replicate a small STUDENT_DIRECTORY with (StudentID, Name) at every campus for fast logins.<br><br>'
                        + 'This combines fragmentation, allocation and selective replication to balance performance, autonomy and global reporting needs.<br><br>'
                        + '<strong>Simulation:</strong> Step through the final design and see where each fragment is stored and why.';
            }
            break;
        case 6:
            switch (topic) {
                case 'Bottom-Up Design':
                    return '<strong>Bottom-Up Design</strong><br><br>'
                        + 'Bottom‑up design starts from <strong>existing local conceptual schemas</strong> at each site. '
                        + 'These local schemas are first translated into a common data model, then gradually integrated into one <strong>Global Conceptual Schema (GCS)</strong>.<br><br>'
                        + '<strong>Steps:</strong><br>'
                        + '• Collect and understand local schemas (A, B, ...).<br>'
                        + '• Translate them into a common representation (e.g. all into ER or relational).<br>'
                        + '• Match and integrate them into a single GCS.<br><br>'
                        + '<strong>Advantages:</strong> Respects investments in existing systems, avoids “big bang” redesign and lets sites keep autonomy during migration.<br><br>'
                        + '<strong>Simulation:</strong> See Local A and Local B gradually combined into one Global Schema.';
                case 'Schema Matching':
                    return '<strong>Schema Matching</strong><br><br>'
                        + 'Schema matching identifies which entities and attributes in two schemas correspond to each other—for example, '
                        + '<code>STUDENT.SSN</code> in one DB vs <code>PERSON.NationalID</code> in another.<br><br>'
                        + '<strong>Key ideas:</strong><br>'
                        + '• Use names, data types, constraints and sometimes instance data to propose matches.<br>'
                        + '• Distinguish <strong>1‑1 matches</strong> (SSN ↔ NationalID) from more complex correspondences.<br>'
                        + '• Matching is the foundation: without it, integration and mapping are impossible.<br><br>'
                        + '<strong>Simulation:</strong> Highlight pairs of attributes that match across Local Schema A and B.';
                case 'Schema Integration':
                    return '<strong>Schema Integration</strong><br><br>'
                        + 'Schema integration merges matched local schemas into one <strong>global conceptual schema</strong>. '
                        + 'You resolve naming conflicts, structural differences and choose canonical representations.<br><br>'
                        + '<strong>Examples of conflicts:</strong><br>'
                        + '• Different names for the same concept (STUDENT vs PERSON).<br>'
                        + '• Different structures (address as one attribute vs split into street/city/zip).<br><br>'
                        + '<strong>Simulation:</strong> Watch Local A and Local B collapse into a single Global Schema box when you play the integration.';
                case 'Schema Mapping':
                    return '<strong>Schema Mapping</strong><br><br>'
                        + 'Schema mappings define how data moves between the <strong>global schema</strong> and <strong>local schemas</strong>. '
                        + 'In data warehouses, mappings drive ETL; in virtual integration, they are used at query time to rewrite global queries into local ones.<br><br>'
                        + '<strong>Simulation:</strong> See arrows from Global Schema, through Mapping Rules, down to Local Schemas.';
                case 'Data Cleaning':
                    return '<strong>Data Cleaning</strong><br><br>'
                        + 'Data cleaning (data quality) detects and repairs duplicates, missing values, inconsistent codes and conflicting values before data is presented or loaded into a warehouse.<br><br>'
                        + '<strong>Typical issues:</strong><br>'
                        + '• Duplicate records for the same person.<br>'
                        + '• Different code sets for the same concept (M/F vs 1/0).<br>'
                        + '• Typos and invalid values.<br><br>'
                        + '<strong>Simulation:</strong> Observe “dirty” records being turned into “clean” ones when the cleaning process runs.';
                case 'Allocation':
                    return '<strong>Allocation After Integration</strong><br><br>'
                        + 'Once a global schema exists, we still need to <strong>allocate fragments</strong> of that schema to physical sites. '
                        + 'This is similar to CS5, but now decisions are made at the global‑schema level.<br><br>'
                        + '<strong>Goals:</strong><br>'
                        + '• Put data close to where it is used most.<br>'
                        + '• Limit cross‑site traffic for common queries.<br>'
                        + '• Respect storage and legal constraints.<br><br>'
                        + '<strong>Simulation:</strong> Fragments of the global schema are placed at Site A, Site B and Site C—think about which is best for your workload.';
                case 'Data Directory':
                    return '<strong>Data Directory (Catalog)</strong><br><br>'
                        + 'The data directory (catalog) stores <strong>metadata</strong> about global and local schemas, fragments, locations and mappings. '
                        + 'It is effectively the “phone book” that the distributed DBMS uses to find where each piece of data lives and how to access it.<br><br>'
                        + '<strong>Contents:</strong><br>'
                        + '• Global schema definitions.<br>'
                        + '• Local schema descriptions.<br>'
                        + '• Fragmentation and replication information.<br>'
                        + '• Schema mappings and access paths.<br><br>'
                        + '<strong>Simulation:</strong> See the Catalog box connected to both global and local schemas, emphasising its central coordination role.';
            }
            break;
        case 7:
            switch (topic) {
                case 'View Management':
                    return '<strong>View Management</strong><br><br>'
                        + 'SQL views define <strong>logical windows</strong> on base tables. They can hide sensitive columns, rename attributes and simplify complex joins '
                        + 'for specific user groups.<br><br>'
                        + '<strong>Examples:</strong><br>'
                        + '• A STUDENT_PORTAL view that exposes only non‑sensitive columns of STUDENT.<br>'
                        + '• A DEPT_REPORT view that joins STUDENT, COURSE and EXAM_RESULTS into one simpler interface.<br><br>'
                        + 'Views are central to implementing <strong>logical data independence</strong> and access control.<br><br>'
                        + '<strong>Simulation:</strong> Toggle between different views (Student, Dept, Admin) and notice how they see different slices of the same base tables.';
                case 'Materialized Views':
                    return '<strong>Materialized Views</strong><br><br>'
                        + 'A materialized view stores the <strong>result of a query</strong> physically, rather than recomputing it for every request. '
                        + 'This speeds up read‑heavy workloads at the cost of storage and refresh overhead.<br><br>'
                        + '<strong>Refresh strategies:</strong><br>'
                        + '• Immediate (on every change).<br>'
                        + '• Deferred / lazy.<br>'
                        + '• Periodic (e.g. nightly).<br><br>'
                        + '<strong>Simulation:</strong> Compare the latency of reading from a base table vs a materialized view and see how stale data can appear if refresh is delayed.';
                case 'Data Security':
                    return '<strong>Data Security</strong><br><br>'
                        + 'Data security in distributed DBs aims to preserve <strong>confidentiality</strong>, <strong>integrity</strong> and <strong>availability</strong> across multiple sites and networks.<br><br>'
                        + '<strong>Techniques:</strong><br>'
                        + '• Authentication and authorisation (who are you, what may you do?).<br>'
                        + '• Encryption at rest and in transit.<br>'
                        + '• Auditing and logging of sensitive operations.<br><br>'
                        + '<strong>Simulation:</strong> Explore how different classification levels (TS, S, C, U) restrict access to rows or columns.';
                case 'Discretionary Access':
                    return '<strong>Discretionary Access Control (DAC)</strong><br><br>'
                        + 'Under DAC, <strong>owners</strong> of database objects decide who may SELECT, INSERT, UPDATE or DELETE via GRANT/REVOKE. '
                        + 'Role‑based access control is a practical form of DAC used in many DBMSs.<br><br>'
                        + '<strong>Example:</strong> The EXAM_RESULTS table owner grants SELECT to lecturers and REVOKE from students.<br><br>'
                        + '<strong>Simulation:</strong> Assign and revoke permissions for roles and see access badges update.';
                case 'Multilevel Access':
                    return '<strong>Multilevel Security</strong><br><br>'
                        + 'Multilevel security labels data and users with classifications such as Top Secret, Secret, Confidential and Unclassified. '
                        + 'The classic rules are “no read up” and “no write down” to prevent information leaks between levels.<br><br>'
                        + '<strong>Simulation:</strong> Apply different levels (TS, S, C, U) to users and data and test which combinations are allowed.';
                case 'Distributed Access':
                    return '<strong>Distributed Access Control</strong><br><br>'
                        + 'In a distributed DBMS, access control must be coordinated across sites so that a user authenticated at one site can access remote data '
                        + 'with the correct privileges, without re‑logging in at each site.<br><br>'
                        + '<strong>Challenges:</strong><br>'
                        + '• Single sign‑on across sites.<br>'
                        + '• Propagating roles and privileges.<br>'
                        + '• Ensuring consistent enforcement when replicas exist.<br><br>'
                        + '<strong>Simulation:</strong> See how a user logged in at Site A accesses objects at Site B and C, based on their distributed role.';
            }
            break;
        default:
            return 'This topic builds on earlier contact sessions. Read the summary, explore the simulation, and use the AI tutor to clarify any doubts.';
    }
}

function getSimulationShell(csNum, topic) {
    // Distinct visual style per CS, with small variations per topic.
    switch (csNum) {
        case 1: {
            switch (topic) {
                case 'Distributed Systems':
                    return `
                      <div class="sim-card sim-network" data-sim="cs1-network">
                        <div class="sim-title">🌐 Multiple Nodes Acting as One System</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click the button below to see how a user request flows through multiple servers and storage nodes. Watch the nodes pulse to show data movement.</div>
                        <div class="sim-grid">
                          <div class="node node-client">👤 User</div>
                          <div class="node node-server" style="top:20px;right:80px;">🌍 Region A</div>
                          <div class="node node-server" style="top:20px;right:20px;">🌍 Region B</div>
                          <div class="node node-storage" style="left:50%;bottom:20px;transform:translateX(-50%);">💾 Replicated Data</div>
                          <svg class="sim-links" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="10" y1="10" x2="50" y2="50" />
                            <line x1="90" y1="10" x2="50" y2="50" />
                            <line x1="50" y1="50" x2="50" y2="90" />
                          </svg>
                        </div>
                        <button class="btn-inline" data-action="pulse-network">▶️ Simulate Global Request</button>
                      </div>
                    `;
                case 'Server-Centric':
                    return `
                      <div class="sim-card sim-network" data-sim="cs1-network">
                        <div class="sim-title">🖥️ Single Server + Local Storage</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click to simulate what happens when the server fails. Notice how the entire system becomes unavailable—this is the main weakness of server-centric architecture.</div>
                        <div class="sim-grid">
                          <div class="node node-client" style="left:20px;top:20px;">👤 Client</div>
                          <div class="node node-server" style="top:20px;right:20px;">🖥️ Server</div>
                          <div class="node node-storage" style="left:50%;bottom:20px;transform:translateX(-50%);">💾 Local Disk</div>
                          <svg class="sim-links" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="10" y1="10" x2="90" y2="10" />
                            <line x1="90" y1="10" x2="50" y2="90" />
                          </svg>
                        </div>
                        <button class="btn-inline" data-action="pulse-network">⚠️ Simulate Server Failure</button>
                      </div>
                    `;
                case 'Storage-Centric':
                    return `
                      <div class="sim-card sim-network" data-sim="cs1-network">
                        <div class="sim-title">🔄 Many Servers, One Shared Storage</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click to see how multiple servers can simultaneously access the same shared storage. Even if one server fails, others continue working—this is the advantage of storage-centric architecture.</div>
                        <div class="sim-grid">
                          <div class="node node-server" style="top:20px;left:20px;">🖥️ App Server 1</div>
                          <div class="node node-server" style="top:20px;right:20px;">🖥️ App Server 2</div>
                          <div class="node node-storage" style="left:50%;bottom:20px;transform:translateX(-50%);">💾 Storage Subsystem</div>
                          <svg class="sim-links" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="15" y1="10" x2="50" y2="90" />
                            <line x1="85" y1="10" x2="50" y2="90" />
                          </svg>
                        </div>
                        <button class="btn-inline" data-action="pulse-network">▶️ Simulate Shared Access</button>
                      </div>
                    `;
                case 'Disk Subsystems':
                    return `
                      <div class="sim-card sim-arch" data-sim="cs1-disks">
                        <div class="sim-title">🎛️ Intelligent Disk Subsystem Architecture</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> This shows how a controller manages multiple physical disks. The controller provides caching, RAID, and virtualization, making many disks appear as one logical unit to servers.</div>
                        <div class="arch-grid">
                          <div class="arch-col">
                            <div class="arch-box arch-controller">🎛️ Controller<br><small>(Cache + RAID)</small></div>
                          </div>
                          <div class="arch-col">
                            <div class="arch-box arch-disk">💾 Disk 1</div>
                          </div>
                          <div class="arch-col">
                            <div class="arch-box arch-disk">💾 Disk 2</div>
                          </div>
                          <div class="arch-col">
                            <div class="arch-box arch-disk">💾 Disk 3</div>
                          </div>
                        </div>
                        <div style="margin-top: 12px; font-size: 0.85rem; color: #6b7280; text-align: center;">
                          <strong>Flow:</strong> Server Request → Controller (checks cache) → Physical Disks
                        </div>
                      </div>
                    `;
                case 'IO Channels & JBOD':
                    return `
                      <div class="sim-card sim-raid" data-sim="cs1-io">
                        <div class="sim-title">🔌 I/O Channels & JBOD Configuration</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> This shows redundant I/O channels connecting to JBOD (Just a Bunch Of Disks). Click to see how load is balanced across channels. If one channel fails, the other continues working.</div>
                        <div class="stripe-row">
                          <div class="stripe-block" style="background: #dbeafe; border-color: #3b82f6;">🔌 Channel 1<br>→ 💾 Disk A</div>
                          <div class="stripe-block" style="background: #dcfce7; border-color: #22c55e;">🔌 Channel 2<br>→ 💾 Disk B</div>
                        </div>
                        <div style="margin-top: 12px; font-size: 0.85rem; color: #6b7280;">
                          <strong>JBOD:</strong> Each disk is independent. No RAID, no redundancy at disk level.
                        </div>
                        <button class="btn-inline" data-action="pulse-network">⚖️ Show Active-Active Load Sharing</button>
                      </div>
                    `;
                case 'RAID Simulation':
                    return `
                      <div class="sim-card sim-raid" data-sim="cs2-raid">
                        <div class="sim-title">🔧 RAID-5 Striping with Distributed Parity</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> This shows how data (D1, D2, D3, D4) and parity (P) are distributed across disks. Click "Fail a Disk" to see how RAID can reconstruct lost data using parity blocks.</div>
                        <div class="stripe-row">
                          <div class="stripe-block" data-disk="1">📦 D1 (Data)</div>
                          <div class="stripe-block" data-disk="2">📦 D2 (Data)</div>
                          <div class="stripe-block" data-disk="3">🔐 P (Parity)</div>
                        </div>
                        <div class="stripe-row">
                          <div class="stripe-block" data-disk="1">📦 D3 (Data)</div>
                          <div class="stripe-block" data-disk="2">🔐 P (Parity)</div>
                          <div class="stripe-block" data-disk="3">📦 D4 (Data)</div>
                        </div>
                        <div style="margin-top: 12px; font-size: 0.85rem; color: #6b7280;">
                          <strong>Legend:</strong> 📦 = Data Block | 🔐 = Parity Block
                        </div>
                        <button class="btn-inline" data-action="fail-disk">⚠️ Fail a Disk (See Recovery)</button>
                      </div>
                    `;
                case 'DAS/NAS/SAN':
                    return `
                      <div class="sim-card sim-arch" data-sim="cs1-das-nas-san">
                        <div class="sim-title">📊 Storage Connection Types Comparison</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Compare the three storage connection types. Hover over each to see details. DAS is direct, NAS uses file-level network access, SAN uses block-level network access.</div>
                        <div class="arch-grid">
                          <div class="arch-col">
                            <h4 style="margin-bottom: 8px; color: #1f2937;">🔗 DAS</h4>
                            <div class="arch-box arch-das">💾 Direct Attached<br><small>Block-level, Single Server</small></div>
                          </div>
                          <div class="arch-col">
                            <h4 style="margin-bottom: 8px; color: #1f2937;">🌐 NAS</h4>
                            <div class="arch-box arch-nas">📁 Network Attached<br><small>File-level, Shared</small></div>
                          </div>
                          <div class="arch-col">
                            <h4 style="margin-bottom: 8px; color: #1f2937;">⚡ SAN</h4>
                            <div class="arch-box arch-san">🔷 Storage Area Network<br><small>Block-level, Shared</small></div>
                          </div>
                        </div>
                      </div>
                    `;
                case 'Healthcare Examples':
                    return `
                      <div class="sim-card sim-network" data-sim="cs1-health">
                        <div class="sim-title">🏥 Distributed Healthcare Storage (PACS)</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> This shows how multiple hospitals share medical imaging data through a distributed PACS system. Data is replicated across sites for redundancy and fast access.</div>
                        <div class="sim-grid">
                          <div class="node node-server" style="top:20px;left:20px;">🏥 Hospital A<br><small>Stockholm</small></div>
                          <div class="node node-server" style="top:20px;right:20px;">🏥 Hospital B<br><small>Oslo</small></div>
                          <div class="node node-storage" style="left:50%;bottom:20px;transform:translateX(-50%);">💾 Distributed PACS<br><small>Replicated & Encrypted</small></div>
                          <svg class="sim-links" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="15" y1="10" x2="50" y2="90" />
                            <line x1="85" y1="10" x2="50" y2="90" />
                          </svg>
                        </div>
                        <div style="margin-top: 12px; font-size: 0.85rem; color: #6b7280; text-align: center;">
                          <strong>Features:</strong> GDPR Compliant | 24/7 Availability | Edge Caching | Encrypted
                        </div>
                      </div>
                    `;
            }
            // Fallback for CS1
            return `
              <div class="sim-card sim-network" data-sim="cs1-network">
                <div class="sim-title">Distributed Nodes & Shared Storage</div>
                <div class="sim-grid">
                  <div class="node node-client">Client</div>
                  <div class="node node-server">Server A</div>
                  <div class="node node-server">Server B</div>
                  <div class="node node-storage">Storage Cluster</div>
                  <svg class="sim-links" viewBox="0 0 200 120" preserveAspectRatio="none">
                    <line x1="20" y1="20" x2="100" y2="60" />
                    <line x1="180" y1="20" x2="100" y2="60" />
                    <line x1="100" y1="60" x2="100" y2="110" />
                  </svg>
                </div>
                <button class="btn-inline" data-action="pulse-network">Simulate Requests</button>
              </div>
            `;
        }
        case 2: {
            switch (topic) {
                case 'JBOD':
                    return `
                      <div class="sim-card sim-raid" data-sim="cs2-jbod">
                        <div class="sim-title">💾 JBOD: Independent Disks</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Each disk is separate—no striping, no parity. If one fails, only that disk's data is lost. Compare with RAID below.</div>
                        <div class="stripe-row">
                          <div class="stripe-block">💾 Disk 1</div>
                          <div class="stripe-block">💾 Disk 2</div>
                          <div class="stripe-block">💾 Disk 3</div>
                        </div>
                        <div style="margin-top:10px;font-size:0.85rem;color:#6b7280;">No redundancy • Full capacity</div>
                      </div>
                    `;
                case 'RAID 0':
                    return `
                      <div class="sim-card sim-raid" data-sim="cs2-raid">
                        <div class="sim-title">⚡ RAID 0: Striping (No Parity)</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Data striped across disks for speed. Click "Fail a Disk" to see: one disk fail = entire volume lost.</div>
                        <div class="stripe-row">
                          <div class="stripe-block" data-disk="1">A1</div>
                          <div class="stripe-block" data-disk="2">A2</div>
                          <div class="stripe-block" data-disk="3">A3</div>
                        </div>
                        <div class="stripe-row">
                          <div class="stripe-block" data-disk="1">B1</div>
                          <div class="stripe-block" data-disk="2">B2</div>
                          <div class="stripe-block" data-disk="3">B3</div>
                        </div>
                        <button class="btn-inline" data-action="fail-disk">⚠️ Fail a Disk</button>
                      </div>
                    `;
                case 'RAID 1':
                    return `
                      <div class="sim-card sim-raid" data-sim="cs2-raid">
                        <div class="sim-title">🪞 RAID 1: Mirroring</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Same data on two disks. One can fail; data stays. Click "Fail a Disk" to see one copy marked failed—other still works.</div>
                        <div class="stripe-row">
                          <div class="stripe-block" data-disk="1">A (copy 1)</div>
                          <div class="stripe-block" data-disk="2">A (copy 2)</div>
                        </div>
                        <div class="stripe-row">
                          <div class="stripe-block" data-disk="1">B (copy 1)</div>
                          <div class="stripe-block" data-disk="2">B (copy 2)</div>
                        </div>
                        <button class="btn-inline" data-action="fail-disk">⚠️ Fail a Disk</button>
                      </div>
                    `;
                case 'RAID 10':
                case 'RAID 5':
                case 'RAID 6':
                    return `
                      <div class="sim-card sim-raid" data-sim="cs2-raid">
                        <div class="sim-title">🔧 ${topic}: Striping & Parity</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Data (D) and parity (P) distributed. Click "Fail a Disk" to see how one block can be reconstructed from parity.</div>
                        <div class="stripe-row">
                          <div class="stripe-block" data-disk="1">D1</div>
                          <div class="stripe-block" data-disk="2">D2</div>
                          <div class="stripe-block" data-disk="3">P</div>
                        </div>
                        <div class="stripe-row">
                          <div class="stripe-block" data-disk="1">D3</div>
                          <div class="stripe-block" data-disk="2">P</div>
                          <div class="stripe-block" data-disk="3">D4</div>
                        </div>
                        <button class="btn-inline" data-action="fail-disk">⚠️ Fail a Disk</button>
                      </div>
                    `;
                case 'DAS/NAS/SAN':
                    return `
                      <div class="sim-card sim-arch" data-sim="cs1-das-nas-san">
                        <div class="sim-title">📊 DAS vs NAS vs SAN</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Compare where RAID arrays sit: DAS = one server; NAS = file server over IP; SAN = block network shared by servers.</div>
                        <div class="arch-grid">
                          <div class="arch-col">
                            <h4>DAS</h4>
                            <div class="arch-box arch-das">💾 Direct<br><small>One server</small></div>
                          </div>
                          <div class="arch-col">
                            <h4>NAS</h4>
                            <div class="arch-box arch-nas">📁 File share<br><small>TCP/IP</small></div>
                          </div>
                          <div class="arch-col">
                            <h4>SAN</h4>
                            <div class="arch-box arch-san">🔷 Block network<br><small>Shared</small></div>
                          </div>
                        </div>
                      </div>
                    `;
                default:
                    return `
                      <div class="sim-card sim-raid" data-sim="cs2-raid">
                        <div class="sim-title">🔧 Striping & Parity</div>
                        <div class="sim-instructions">💡 Click "Fail a Disk" to see how parity allows recovery.</div>
                        <div class="stripe-row">
                          <div class="stripe-block" data-disk="1">A1</div>
                          <div class="stripe-block" data-disk="2">A2</div>
                          <div class="stripe-block" data-disk="3">P</div>
                        </div>
                        <div class="stripe-row">
                          <div class="stripe-block" data-disk="1">B1</div>
                          <div class="stripe-block" data-disk="2">P</div>
                          <div class="stripe-block" data-disk="3">B2</div>
                        </div>
                        <button class="btn-inline" data-action="fail-disk">Fail a Disk</button>
                      </div>
                    `;
            }
        }
        case 3: {
            // Distinct simulations per CS3 topic
            switch (topic) {
                case 'Distributed DB Basics':
                    return `
                      <div class="sim-card sim-flow" data-sim="cs3-basics-flow">
                        <div class="sim-title">🌐 Request Flow Across Sites</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Run Flow" to see how one logical query is split into sub‑requests to Site A and Site B, then combined back into a single answer.</div>
                        <div class="flow-row">
                          <div class="flow-node flow-client">👤 Client</div>
                          <div class="flow-arrow"></div>
                          <div class="flow-node flow-site">🌍 Site A<br><small>Fragment F1</small></div>
                          <div class="flow-arrow"></div>
                          <div class="flow-node flow-site">🌍 Site B<br><small>Fragment F2</small></div>
                        </div>
                        <button class="btn-inline" data-action="run-flow">▶️ Run Flow</button>
                      </div>
                    `;
                case 'ANSI/SPARC Layers':
                    return `
                      <div class="sim-card sim-schema" data-sim="cs3-ansi">
                        <div class="sim-title">📐 ANSI/SPARC Layers</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Change Physical Storage" to simulate moving fragments between sites. Notice that the conceptual schema and external views stay unchanged.</div>
                        <div class="schema-stack">
                          <div class="schema-layer schema-external">🔭 External Views<br><small>Student, Finance, Reporting</small></div>
                          <div class="schema-layer schema-conceptual">🧩 Conceptual Schema<br><small>Global relational model</small></div>
                          <div class="schema-layer schema-internal ansi-internal">💽 Internal / Physical<br><small>Fragments & replicas at sites</small></div>
                        </div>
                        <button class="btn-inline" data-action="toggle-physical-change">⚙️ Change Physical Storage</button>
                      </div>
                    `;
                case 'Architecture Models':
                    return `
                      <div class="sim-card sim-arch" data-sim="cs3-arch">
                        <div class="sim-title">🏗️ C/S vs P2P vs MDBS</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Highlight Next Model" to cycle through Client/Server, Peer‑to‑Peer and MDBS architectures and focus on how data and control are organised.</div>
                        <div class="arch-grid">
                          <div class="arch-col">
                            <h4>Client/Server</h4>
                            <div class="arch-box arch-client-server">🖥️ Central DB<br><small>Clients → Server</small></div>
                          </div>
                          <div class="arch-col">
                            <h4>Peer‑to‑Peer</h4>
                            <div class="arch-box arch-p2p">🔄 Equal Peers<br><small>Data & processing shared</small></div>
                          </div>
                          <div class="arch-col">
                            <h4>MDBS</h4>
                            <div class="arch-box arch-mdbs">🔗 Mediator<br><small>Autonomous DBs</small></div>
                          </div>
                        </div>
                        <button class="btn-inline" data-action="highlight-next-model">🔍 Highlight Next Model</button>
                      </div>
                    `;
                case 'System Challenges':
                    return `
                      <div class="sim-card sim-flow" data-sim="cs3-challenges">
                        <div class="sim-title">⚠️ Challenges on a Distributed Network</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Cycle Challenges" to see latency, failures and skew highlighted on the network. Think how each one affects queries and transactions.</div>
                        <div class="flow-row">
                          <div class="flow-node flow-client">👤 Client</div>
                          <div class="flow-arrow"></div>
                          <div class="flow-node flow-site">🌍 Site A</div>
                          <div class="flow-arrow"></div>
                          <div class="flow-node flow-site">🌍 Site B</div>
                        </div>
                        <div class="challenge-row">
                          <span class="challenge-badge" data-challenge="latency">⏱️ Latency</span>
                          <span class="challenge-badge" data-challenge="failure">💥 Site/Link Failure</span>
                          <span class="challenge-badge" data-challenge="skew">⚖️ Load / Data Skew</span>
                          <span class="challenge-badge" data-challenge="consistency">📄 Replication Consistency</span>
                        </div>
                        <button class="btn-inline" data-action="cycle-challenge">🔄 Cycle Challenges</button>
                      </div>
                    `;
                case 'Design Decisions':
                    return `
                      <div class="sim-card sim-design" data-sim="cs3-decisions">
                        <div class="sim-title">📋 Design Path for a Distributed DB</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Play Design Path" to highlight, step‑by‑step, how we choose fragmentation, replication and allocation for a new distributed database.</div>
                        <div class="decision-row">
                          <div class="decision-step" data-step="fragmentation">✂️ Fragmentation<br><small>Horizontal / Vertical</small></div>
                          <div class="decision-step" data-step="replication">📑 Replication<br><small>Which fragments, how many copies</small></div>
                          <div class="decision-step" data-step="allocation">📍 Allocation<br><small>Which site stores what</small></div>
                          <div class="decision-step" data-step="autonomy">🔓 Autonomy<br><small>Who controls local data</small></div>
                        </div>
                        <button class="btn-inline" data-action="play-design-path">▶️ Play Design Path</button>
                      </div>
                    `;
                default:
                    // Fallback: simple request‑flow animation
                    return `
                      <div class="sim-card sim-flow" data-sim="cs3-basics-flow">
                        <div class="sim-title">🌐 Request Flow Across Sites</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Run Flow" to see how a request moves from client to multiple sites.</div>
                        <div class="flow-row">
                          <div class="flow-node flow-client">👤 Client</div>
                          <div class="flow-arrow"></div>
                          <div class="flow-node flow-site">🌍 Site A</div>
                          <div class="flow-arrow"></div>
                          <div class="flow-node flow-site">🌍 Site B</div>
                        </div>
                        <button class="btn-inline" data-action="run-flow">▶️ Run Flow</button>
                      </div>
                    `;
            }
        }
        case 4: {
            switch (topic) {
                case 'Core Concepts':
                    return `
                      <div class="sim-card sim-core" data-sim="cs4-core">
                        <div class="sim-title">🧱 Core Building Blocks</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Cycle Concepts" to highlight fragmentation, replication, transparency and autonomy one by one. For each, connect it to where it appears in the architecture.</div>
                        <div class="core-row">
                          <div class="core-tag" data-core="fragmentation">✂️ Fragmentation</div>
                          <div class="core-tag" data-core="replication">📑 Replication</div>
                          <div class="core-tag" data-core="transparency">🎭 Transparency</div>
                          <div class="core-tag" data-core="autonomy">🔓 Autonomy</div>
                        </div>
                        <button class="btn-inline" data-action="cycle-core">🔄 Cycle Concepts</button>
                      </div>
                    `;
                case 'Client/Server':
                    return `
                      <div class="sim-card sim-network" data-sim="cs4-cs">
                        <div class="sim-title">🖥️ Client/Server Request Flow</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Simulate Requests" to see two clients sending SQL to one central DB server at the bottom. Arrows show how everything is funnelled to that server.</div>
                        <div class="sim-grid cs4-cs-grid">
                          <div class="node node-client cs4-client-left">👤 Client 1</div>
                          <div class="node node-client cs4-client-right">👤 Client 2</div>
                          <div class="node node-server cs4-cs-server">🖥️ DB Server<br><small>Central DBMS</small></div>
                          <svg class="sim-links" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="25" y1="20" x2="50" y2="80" />
                            <line x1="75" y1="20" x2="50" y2="80" />
                          </svg>
                        </div>
                        <button class="btn-inline" data-action="pulse-network">▶️ Simulate Requests</button>
                      </div>
                    `;
                case 'Peer-to-Peer':
                    return `
                      <div class="sim-card sim-p2p" data-sim="cs4-p2p">
                        <div class="sim-title">🔄 Peer‑to‑Peer Ring</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Pulse Peers" to see how requests and data can circulate around peers instead of going to one central server.</div>
                        <div class="p2p-ring">
                          <div class="p2p-node">🌐 P1</div>
                          <div class="p2p-node">🌐 P2</div>
                          <div class="p2p-node">🌐 P3</div>
                          <div class="p2p-node">🌐 P4</div>
                        </div>
                        <button class="btn-inline" data-action="pulse-network">🔁 Pulse Peers</button>
                      </div>
                    `;
                case 'MDBS':
                    return `
                      <div class="sim-card sim-arch" data-sim="cs4-mdbs">
                        <div class="sim-title">🔗 MDBS Mediator and Local DBs</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Simulate Global Query" to see how a query goes to the mediator, which then contacts autonomous local DBs and merges their answers.</div>
                        <div class="arch-grid">
                          <div class="arch-col">
                            <h4>Mediator</h4>
                            <div class="arch-box arch-mdbs">🌐 Global View<br><small>Query Rewriter</small></div>
                          </div>
                          <div class="arch-col">
                            <h4>Local DB A</h4>
                            <div class="arch-box arch-client-server">🗄️ Oracle<br><small>Autonomous</small></div>
                          </div>
                          <div class="arch-col">
                            <h4>Local DB B</h4>
                            <div class="arch-box arch-client-server">🗄️ SQL Server<br><small>Autonomous</small></div>
                          </div>
                        </div>
                        <button class="btn-inline" data-action="pulse-network">▶️ Simulate Global Query</button>
                      </div>
                    `;
                case 'Data Sources':
                    return `
                      <div class="sim-card sim-sources" data-sim="cs4-sources">
                        <div class="sim-title">📥 Different Data Sources</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Cycle Sources" to highlight each type of data source that feeds the distributed DBMS.</div>
                        <div class="source-row">
                          <div class="source-card" data-source="relational">🗄️ Relational DB</div>
                          <div class="source-card" data-source="legacy">🧮 Legacy System</div>
                          <div class="source-card" data-source="files">📁 Files / Logs</div>
                          <div class="source-card" data-source="api">🔌 External API</div>
                        </div>
                        <button class="btn-inline" data-action="cycle-source">🔄 Cycle Sources</button>
                      </div>
                    `;
                case 'Real-World Apps':
                    return `
                      <div class="sim-card sim-apps" data-sim="cs4-apps">
                        <div class="sim-title">🌍 Example Applications</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Next App" to move through healthcare, e‑commerce and finance examples and think which architecture each uses.</div>
                        <div class="app-grid">
                          <div class="app-card" data-app="health">🏥 Healthcare<br><small>Hospital network</small></div>
                          <div class="app-card" data-app="commerce">🛒 E‑commerce<br><small>Global store</small></div>
                          <div class="app-card" data-app="finance">💰 Finance<br><small>Trading & risk</small></div>
                        </div>
                        <button class="btn-inline" data-action="cycle-app">➡️ Next App</button>
                      </div>
                    `;
                case 'Comparison':
                default:
                    return `
                      <div class="sim-card sim-arch" data-sim="cs4-arch">
                        <div class="sim-title">🏗️ Client/Server vs P2P vs MDBS</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Highlight Next Model" to focus on each architecture in turn and recall its main properties.</div>
                        <div class="arch-grid">
                          <div class="arch-col">
                            <h4>Client/Server</h4>
                            <div class="arch-box arch-client-server">🖥️ Central DB<br><small>Clients → Server</small></div>
                          </div>
                          <div class="arch-col">
                            <h4>Peer‑to‑Peer</h4>
                            <div class="arch-box arch-p2p">🔄 Equal Peers<br><small>Data & processing shared</small></div>
                          </div>
                          <div class="arch-col">
                            <h4>MDBS</h4>
                            <div class="arch-box arch-mdbs">🔗 Mediator<br><small>Autonomous local DBs</small></div>
                          </div>
                        </div>
                        <button class="btn-inline" data-action="highlight-next-model">🔍 Highlight Next Model</button>
                      </div>
                    `;
            }
        }
        case 5: {
            switch (topic) {
                case 'Sharing Levels':
                    return `
                      <div class="sim-card sim-sharing" data-sim="cs5-sharing">
                        <div class="sim-title">📡 Sharing Levels Between Sites</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Cycle Levels" to move through no sharing, selective sharing and full replication. Relate each level to different application needs.</div>
                        <div class="sharing-row">
                          <div class="sharing-level" data-level="none">No Sharing<br><small>Each site has own DB</small></div>
                          <div class="sharing-level" data-level="partial">Selective Sharing<br><small>Only some tables/fragments</small></div>
                          <div class="sharing-level" data-level="full">Full Replication<br><small>All sites same data</small></div>
                        </div>
                        <button class="btn-inline" data-action="cycle-sharing">🔄 Cycle Levels</button>
                      </div>
                    `;
                case 'Fragmentation':
                    return `
                      <div class="sim-card sim-design" data-sim="cs5-fragmentation">
                        <div class="sim-title">✂️ Fragmentation of a Global Table</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Think of a STUDENT table fragmented by campus or program. Click "Shuffle Fragments" to see how fragments A, B, C can move between sites.</div>
                        <div class="design-row">
                          <div class="design-fragment" data-site="Campus A">📦 Frag A<br><small>Campus A</small></div>
                          <div class="design-fragment" data-site="Campus B">📦 Frag B<br><small>Campus B</small></div>
                          <div class="design-fragment" data-site="Online">📦 Frag C<br><small>Online Students</small></div>
                        </div>
                        <button class="btn-inline" data-action="shuffle-fragments">🔄 Shuffle Fragments</button>
                      </div>
                    `;
                case 'Allocation':
                    return `
                      <div class="sim-card sim-design" data-sim="cs5-allocation">
                        <div class="sim-title">📍 Allocation of Fragments to Sites</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Fragments are placed at different sites. Click "Shuffle Allocation" to see alternative designs and think about communication cost and locality.</div>
                        <div class="design-row">
                          <div class="design-fragment" data-site="Site A">📦 Orders_EU<br><small>Site A</small></div>
                          <div class="design-fragment" data-site="Site B">📦 Orders_US<br><small>Site B</small></div>
                          <div class="design-fragment" data-site="Site C">📦 Customer_Dir<br><small>All Sites</small></div>
                        </div>
                        <button class="btn-inline" data-action="shuffle-fragments">🔄 Shuffle Allocation</button>
                      </div>
                    `;
                case 'Query Simulator':
                    return `
                      <div class="sim-card sim-flow" data-sim="cs5-query">
                        <div class="sim-title">🚚 Distributed Query Plan</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Run Plan" to see how a global query is split into sub‑queries at Site A and Site B, then combined back at the client.</div>
                        <div class="flow-row">
                          <div class="flow-node flow-client">👤 Client</div>
                          <div class="flow-arrow"></div>
                          <div class="flow-node flow-site">🌍 Site A<br><small>Orders_EU</small></div>
                          <div class="flow-arrow"></div>
                          <div class="flow-node flow-site">🌍 Site B<br><small>Orders_US</small></div>
                        </div>
                        <button class="btn-inline" data-action="run-flow">▶️ Run Plan</button>
                      </div>
                    `;
                case 'Case Study':
                default:
                    return `
                      <div class="sim-card sim-design" data-sim="cs5-case">
                        <div class="sim-title">🎓 University DB Case Study</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Show Design" to highlight, in order, how fragments and replicas are placed for a multi‑campus university.</div>
                        <div class="design-row">
                          <div class="design-fragment">📦 STUDENT_A<br><small>Campus A</small></div>
                          <div class="design-fragment">📦 STUDENT_B<br><small>Campus B</small></div>
                          <div class="design-fragment">📦 EXAM_RESULTS<br><small>Dept Site</small></div>
                          <div class="design-fragment">📦 STUDENT_DIR<br><small>All Campuses</small></div>
                        </div>
                        <button class="btn-inline" data-action="play-case">▶️ Show Design</button>
                      </div>
                    `;
            }
        }
        case 6: {
            switch (topic) {
                case 'Bottom-Up Design':
                    return `
                      <div class="sim-card sim-schema" data-sim="cs6-bottomup">
                        <div class="sim-title">🔽 Bottom-Up Integration</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Play Integration" to see Local Schemas A and B combined into one Global Conceptual Schema.</div>
                        <div class="schema-row">
                          <div class="schema-box">📄 Local Schema A</div>
                          <div class="schema-box">📄 Local Schema B</div>
                          <div class="schema-box schema-global">🌐 Global Conceptual Schema</div>
                        </div>
                        <button class="btn-inline" data-action="play-bottomup">▶️ Play Integration</button>
                      </div>
                    `;
                case 'Schema Matching':
                    return `
                      <div class="sim-card sim-schema" data-sim="cs6-matching">
                        <div class="sim-title">🔗 Schema Matching</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Highlight Matches" to see pairs of attributes that correspond across Local A and Local B.</div>
                        <div class="schema-row matching-row">
                          <div class="matching-col">
                            <div class="schema-box">STUDENT.SSN</div>
                            <div class="schema-box">STUDENT.Name</div>
                          </div>
                          <div class="matching-col">
                            <div class="schema-box">PERSON.NationalID</div>
                            <div class="schema-box">PERSON.FullName</div>
                          </div>
                        </div>
                        <button class="btn-inline" data-action="highlight-match">✨ Highlight Matches</button>
                      </div>
                    `;
                case 'Schema Integration':
                    return `
                      <div class="sim-card sim-schema" data-sim="cs6-integration">
                        <div class="sim-title">🧩 Schema Integration</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Integrate" to see Local A and Local B collapse into a single Global Schema.</div>
                        <div class="schema-row">
                          <div class="schema-box">📄 Local A</div>
                          <div class="schema-box">📄 Local B</div>
                          <div class="schema-box schema-global">🌐 Global Schema</div>
                        </div>
                        <button class="btn-inline" data-action="play-integration">▶️ Integrate</button>
                      </div>
                    `;
                case 'Schema Mapping':
                    return `
                      <div class="sim-card sim-schema" data-sim="cs6-mapping">
                        <div class="sim-title">🗺️ Schema Mapping</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Show Mapping" to highlight how queries on the Global Schema are mapped to Local Schemas.</div>
                        <div class="schema-row">
                          <div class="schema-box schema-global">🌐 Global Schema</div>
                          <div class="schema-box">📜 Mapping Rules</div>
                          <div class="schema-box">📄 Local Schemas</div>
                        </div>
                        <button class="btn-inline" data-action="play-mapping">▶️ Show Mapping</button>
                      </div>
                    `;
                case 'Data Cleaning':
                    return `
                      <div class="sim-card sim-schema" data-sim="cs6-cleaning">
                        <div class="sim-title">🧹 Data Cleaning</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Clean Data" to see dirty records turned into clean, consistent ones.</div>
                        <div class="schema-row cleaning-row">
                          <div class="schema-box cleaning-dirty">Record 1<br><small>Duplicate / Missing</small></div>
                          <div class="schema-box cleaning-dirty">Record 2<br><small>Inconsistent Code</small></div>
                          <div class="schema-box cleaning-clean">Record 3<br><small>Already Clean</small></div>
                        </div>
                        <button class="btn-inline" data-action="run-cleaning">🧹 Clean Data</button>
                      </div>
                    `;
                case 'Allocation':
                    return `
                      <div class="sim-card sim-design" data-sim="cs6-allocation">
                        <div class="sim-title">📍 Allocation of Global Fragments</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Shuffle Allocation" to see alternative placements of global fragments across sites.</div>
                        <div class="design-row">
                          <div class="design-fragment">📦 Frag_Student_A<br><small>Campus A</small></div>
                          <div class="design-fragment">📦 Frag_Student_B<br><small>Campus B</small></div>
                          <div class="design-fragment">📦 Frag_Exams<br><small>Dept Site</small></div>
                        </div>
                        <button class="btn-inline" data-action="shuffle-fragments">🔄 Shuffle Allocation</button>
                      </div>
                    `;
                case 'Data Directory':
                default:
                    return `
                      <div class="sim-card sim-schema" data-sim="cs6-directory">
                        <div class="sim-title">📚 Data Directory (Catalog)</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Highlight Catalog" to see how the directory connects the Global Schema and Local Schemas.</div>
                        <div class="schema-row">
                          <div class="schema-box">📄 Local Schemas</div>
                          <div class="schema-box">📚 Catalog</div>
                          <div class="schema-box schema-global">🌐 Global Schema</div>
                        </div>
                        <button class="btn-inline" data-action="highlight-directory">✨ Highlight Catalog</button>
                      </div>
                    `;
            }
        }
        case 7: {
            switch (topic) {
                case 'View Management':
                    return `
                      <div class="sim-card sim-schema" data-sim="cs7-views">
                        <div class="sim-title">🪟 Different Views on the Same Data</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Cycle Views" to see how Student, Department and Admin views expose different columns from the same base tables.</div>
                        <div class="view-row">
                          <div class="view-box" data-view="student">🎓 Student View<br><small>Limited columns</small></div>
                          <div class="view-box" data-view="dept">🏛️ Dept View<br><small>Courses & exams</small></div>
                          <div class="view-box" data-view="admin">⚙️ Admin View<br><small>Full access</small></div>
                        </div>
                        <button class="btn-inline" data-action="cycle-view">🔄 Cycle Views</button>
                      </div>
                    `;
                case 'Materialized Views':
                    return `
                      <div class="sim-card sim-schema" data-sim="cs7-mview">
                        <div class="sim-title">📦 Base Table vs Materialized View</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Compare Reads" to highlight the difference between reading from the base table and from a precomputed materialized view.</div>
                        <div class="schema-row">
                          <div class="schema-box">📄 Base Table</div>
                          <div class="schema-box schema-global">📦 Materialized View</div>
                        </div>
                        <button class="btn-inline" data-action="compare-mview">⚖️ Compare Reads</button>
                      </div>
                    `;
                case 'Data Security':
                    return `
                      <div class="sim-card sim-security" data-sim="cs7-security">
                        <div class="sim-title">🔐 Data Security Layers</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Cycle Focus" to focus on confidentiality, integrity and availability in turn.</div>
                        <div class="security-row">
                          <div class="sec-badge sec-ts" data-sec="conf">Confidentiality</div>
                          <div class="sec-badge sec-c" data-sec="integ">Integrity</div>
                          <div class="sec-badge sec-u" data-sec="avail">Availability</div>
                        </div>
                        <button class="btn-inline" data-action="cycle-security">🔄 Cycle Focus</button>
                      </div>
                    `;
                case 'Discretionary Access':
                    return `
                      <div class="sim-card sim-schema" data-sim="cs7-dac">
                        <div class="sim-title">🧑‍⚖️ Discretionary Access (Roles)</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Toggle Role" to see how permissions differ for Student, Lecturer and Admin.</div>
                        <div class="view-row">
                          <div class="view-box" data-role="student">🎓 Student</div>
                          <div class="view-box" data-role="lecturer">👩‍🏫 Lecturer</div>
                          <div class="view-box" data-role="admin">⚙️ Admin</div>
                        </div>
                        <button class="btn-inline" data-action="cycle-role">🔄 Toggle Role</button>
                      </div>
                    `;
                case 'Multilevel Access':
                    return `
                      <div class="sim-card sim-security" data-sim="cs7-mls">
                        <div class="sim-title">🔐 Multilevel Access (TS, S, C, U)</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Cycle Levels" to step through Top Secret, Secret, Confidential and Unclassified and recall the rules “no read up” and “no write down”.</div>
                        <div class="security-row">
                          <div class="sec-badge sec-ts">TS<br><small>Top Secret</small></div>
                          <div class="sec-badge sec-s">S<br><small>Secret</small></div>
                          <div class="sec-badge sec-c">C<br><small>Confidential</small></div>
                          <div class="sec-badge sec-u">U<br><small>Unclassified</small></div>
                        </div>
                        <button class="btn-inline" data-action="cycle-mls">🔄 Cycle Levels</button>
                      </div>
                    `;
                case 'Distributed Access':
                default:
                    return `
                      <div class="sim-card sim-schema" data-sim="cs7-distributed">
                        <div class="sim-title">🌐 Distributed Access Control</div>
                        <div class="sim-instructions">💡 <strong>Instructions:</strong> Click "Simulate Login" to see a user authenticated at Site A accessing data at Site B and C via propagated roles.</div>
                        <div class="schema-row">
                          <div class="schema-box">👤 User @ Site A</div>
                          <div class="schema-box">🔐 Roles / Tokens</div>
                          <div class="schema-box schema-global">💾 Data @ Sites B & C</div>
                        </div>
                        <button class="btn-inline" data-action="play-distributed-access">▶️ Simulate Login</button>
                      </div>
                    `;
            }
        }
        default:
            return `<div class="sim-card"><div class="sim-title">Interactive view</div><p>Simulation coming soon.</p></div>`;
    }
}

// Initialize portal
document.addEventListener('DOMContentLoaded', function() {
    setupSessionButtons();
    setupContextMenu();
    checkAPIKey();
    updateProgress();
    loadBookmarks();
});

function setupSessionButtons() {
    const buttons = document.querySelectorAll('.session-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const csNum = parseInt(this.dataset.cs);
            if (this.classList.contains('coming-soon')) {
                return;
            }
            loadCS(csNum);
            
            // Update active state
            buttons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function loadCS(csNum) {
    currentCS = csNum;
    const config = CS_CONFIG[csNum];
    
    if (!config) return;
    
    // Update header
    document.getElementById('currentSessionTitle').textContent = `CS ${csNum}: ${config.title}`;
    
    // Show bookmark button
    document.getElementById('bookmarkBtn').style.display = 'block';
    
    const tabsContainer = document.getElementById('topicTabsContainer');
    const tabsDiv = document.getElementById('topicTabs');
    const contentArea = document.getElementById('contentArea');
    const aiTestingSection = document.getElementById('aiTestingSection');
    const completionSection = document.getElementById('completionSection');
    
    // Clear previous content
    tabsDiv.innerHTML = '';
    contentArea.innerHTML = '';
    
    // Handle "Update Soon" sessions
    if (csNum >= 9 && csNum <= 15) {
        tabsContainer.style.display = 'none';
        contentArea.innerHTML = `
            <div class="welcome-screen">
                <h2>📝 Content Session ${csNum}</h2>
                <p style="font-size: 1.2em; color: #999; margin-top: 20px;">Update Soon</p>
                <p style="color: #666; margin-top: 10px;">This content will be available in a future update.</p>
            </div>
        `;
        aiTestingSection.style.display = 'none';
        completionSection.style.display = 'none';
        return;
    }
    
    // Handle revision sessions
    if (config.isRevision) {
        tabsContainer.style.display = 'none';
        const revisionContent = csNum === 8 
            ? generateCS8Revision()
            : generateCS16Revision();
        contentArea.innerHTML = revisionContent;
        aiTestingSection.style.display = 'block';
        completionSection.style.display = 'block';
        return;
    }
    
    // Show topic tabs
    tabsContainer.style.display = 'block';
    
    // Create topic tabs
    config.topics.forEach((topic, index) => {
        const tab = document.createElement('button');
        tab.className = 'topic-tab' + (index === 0 ? ' active' : '');
        tab.textContent = topic;
        tab.onclick = () => loadTopic(csNum, topic, index);
        tabsDiv.appendChild(tab);
    });
    
    // Load first topic by default
    if (config.topics.length > 0) {
        loadTopic(csNum, config.topics[0], 0);
    }
    
    // Show AI testing and completion sections
    aiTestingSection.style.display = 'block';
    completionSection.style.display = 'block';
}

function loadTopic(csNum, topic, topicIndex) {
    currentTopic = topic;
    const config = CS_CONFIG[csNum];
    
    // Update active tab
    document.querySelectorAll('.topic-tab').forEach((tab, idx) => {
        tab.classList.toggle('active', idx === topicIndex);
    });
    
    const contentArea = document.getElementById('contentArea');
    
    // Render unified topic layout with text + simulation area
    contentArea.innerHTML = getTopicContent(csNum, topic);
    initTopicInteractions(csNum, topic);
    makeContentSelectable();
}

// Attach simple interactive behaviour per CS/topic simulation
function initTopicInteractions(csNum, topic) {
    currentTopic = topic;
    const simRoot = document.querySelector('.topic-sim');
    if (!simRoot) return;
    
    const simType = simRoot.querySelector('[data-sim]');
    if (!simType) return;
    
    const simId = simType.getAttribute('data-sim');
    
    if (simId === 'cs1-network') {
        const btn = simType.querySelector('[data-action="pulse-network"]');
        const nodes = simType.querySelectorAll('.node');
        btn?.addEventListener('click', () => {
            nodes.forEach(n => {
                n.classList.add('node-pulse');
                setTimeout(() => n.classList.remove('node-pulse'), 1000);
            });
        });
    } else if (simId === 'cs1-io') {
        const btn = simType.querySelector('[data-action="pulse-network"]');
        const blocks = simType.querySelectorAll('.stripe-block');
        btn?.addEventListener('click', () => {
            blocks.forEach(b => {
                b.style.animation = 'none';
                b.offsetHeight;
                b.style.animation = 'nodePulse 0.8s ease-out';
                setTimeout(() => { b.style.animation = ''; }, 800);
            });
        });
    } else if (simId === 'cs2-raid' || simId === 'cs2-jbod') {
        const btnFail = simType.querySelector('[data-action="fail-disk"]');
        btnFail?.addEventListener('click', () => {
            const blocks = simType.querySelectorAll('.stripe-block');
            if (blocks.length) {
                const idx = Math.floor(Math.random() * blocks.length);
                blocks[idx].classList.toggle('stripe-failed');
            }
        });
    } else if (simId === 'cs3-basics-flow') {
        const btn = simType.querySelector('[data-action="run-flow"]');
        const arrows = simType.querySelectorAll('.flow-arrow');
        btn?.addEventListener('click', () => {
            arrows.forEach(a => {
                a.classList.add('flow-active');
                setTimeout(() => a.classList.remove('flow-active'), 800);
            });
        });
    } else if (simId === 'cs3-ansi') {
        const btn = simType.querySelector('[data-action="toggle-physical-change"]');
        const internal = simType.querySelector('.ansi-internal');
        btn?.addEventListener('click', () => {
            internal?.classList.toggle('schema-changed');
        });
    } else if (simId === 'cs3-arch' || simId === 'cs4-arch') {
        const btn = simType.querySelector('[data-action="highlight-next-model"]');
        const boxes = Array.from(simType.querySelectorAll('.arch-box'));
        let idx = 0;
        btn?.addEventListener('click', () => {
            boxes.forEach(b => b.classList.remove('arch-highlight'));
            boxes[idx].classList.add('arch-highlight');
            idx = (idx + 1) % boxes.length;
        });
    } else if (simId === 'cs3-challenges') {
        const btn = simType.querySelector('[data-action="cycle-challenge"]');
        const badges = Array.from(simType.querySelectorAll('.challenge-badge'));
        let idx = 0;
        btn?.addEventListener('click', () => {
            badges.forEach(b => b.classList.remove('challenge-active'));
            badges[idx].classList.add('challenge-active');
            idx = (idx + 1) % badges.length;
        });
    } else if (simId === 'cs3-decisions') {
        const btn = simType.querySelector('[data-action="play-design-path"]');
        const steps = Array.from(simType.querySelectorAll('.decision-step'));
        btn?.addEventListener('click', () => {
            steps.forEach(s => s.classList.remove('decision-active'));
            steps.forEach((s, i) => {
                setTimeout(() => s.classList.add('decision-active'), i * 400);
            });
        });
    } else if (simId === 'cs4-core') {
        const btn = simType.querySelector('[data-action="cycle-core"]');
        const tags = Array.from(simType.querySelectorAll('.core-tag'));
        let idx = 0;
        btn?.addEventListener('click', () => {
            tags.forEach(t => t.classList.remove('core-active'));
            tags[idx].classList.add('core-active');
            idx = (idx + 1) % tags.length;
        });
    } else if (simId === 'cs4-cs' || simId === 'cs4-p2p' || simId === 'cs4-mdbs') {
        const btn = simType.querySelector('[data-action="pulse-network"]');
        const nodes = simType.querySelectorAll('.node, .p2p-node, .arch-box');
        btn?.addEventListener('click', () => {
            nodes.forEach(n => {
                n.classList.add('node-pulse');
                setTimeout(() => n.classList.remove('node-pulse'), 800);
            });
        });
    } else if (simId === 'cs4-sources') {
        const btn = simType.querySelector('[data-action="cycle-source"]');
        const cards = Array.from(simType.querySelectorAll('.source-card'));
        let idx = 0;
        btn?.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('source-active'));
            cards[idx].classList.add('source-active');
            idx = (idx + 1) % cards.length;
        });
    } else if (simId === 'cs4-apps') {
        const btn = simType.querySelector('[data-action="cycle-app"]');
        const apps = Array.from(simType.querySelectorAll('.app-card'));
        let idx = 0;
        btn?.addEventListener('click', () => {
            apps.forEach(a => a.classList.remove('app-active'));
            apps[idx].classList.add('app-active');
            idx = (idx + 1) % apps.length;
        });
    } else if (simId === 'cs5-sharing') {
        const btn = simType.querySelector('[data-action="cycle-sharing"]');
        const levels = Array.from(simType.querySelectorAll('.sharing-level'));
        let idx = 0;
        btn?.addEventListener('click', () => {
            levels.forEach(l => l.classList.remove('sharing-active'));
            levels[idx].classList.add('sharing-active');
            idx = (idx + 1) % levels.length;
        });
    } else if (simId === 'cs5-fragmentation' || simId === 'cs5-allocation') {
        const btn = simType.querySelector('[data-action="shuffle-fragments"]');
        const frags = Array.from(simType.querySelectorAll('.design-fragment'));
        btn?.addEventListener('click', () => {
            frags.sort(() => Math.random() - 0.5);
            const row = simType.querySelector('.design-row');
            frags.forEach(f => row.appendChild(f));
        });
    } else if (simId === 'cs5-query') {
        const btn = simType.querySelector('[data-action="run-flow"]');
        const arrows = simType.querySelectorAll('.flow-arrow');
        btn?.addEventListener('click', () => {
            arrows.forEach(a => {
                a.classList.add('flow-active');
                setTimeout(() => a.classList.remove('flow-active'), 800);
            });
        });
    } else if (simId === 'cs5-case') {
        const btn = simType.querySelector('[data-action="play-case"]');
        const frags = Array.from(simType.querySelectorAll('.design-fragment'));
        btn?.addEventListener('click', () => {
            frags.forEach(f => f.classList.remove('decision-active'));
            frags.forEach((f, i) => {
                setTimeout(() => f.classList.add('decision-active'), i * 400);
            });
        });
    } else if (simId === 'cs6-bottomup') {
        const btn = simType.querySelector('[data-action="play-bottomup"]');
        const boxes = Array.from(simType.querySelectorAll('.schema-box'));
        btn?.addEventListener('click', () => {
            boxes.forEach(b => b.classList.remove('decision-active'));
            boxes.forEach((b, i) => {
                setTimeout(() => b.classList.add('decision-active'), i * 400);
            });
        });
    } else if (simId === 'cs6-matching') {
        const btn = simType.querySelector('[data-action="highlight-match"]');
        const boxes = Array.from(simType.querySelectorAll('.schema-box'));
        btn?.addEventListener('click', () => {
            boxes.forEach(b => b.classList.toggle('decision-active'));
        });
    } else if (simId === 'cs6-integration') {
        const btn = simType.querySelector('[data-action="play-integration"]');
        const boxes = Array.from(simType.querySelectorAll('.schema-box'));
        btn?.addEventListener('click', () => {
            boxes.forEach(b => b.classList.remove('decision-active'));
            boxes.forEach((b, i) => {
                setTimeout(() => b.classList.add('decision-active'), i * 300);
            });
        });
    } else if (simId === 'cs6-mapping') {
        const btn = simType.querySelector('[data-action="play-mapping"]');
        const boxes = Array.from(simType.querySelectorAll('.schema-box'));
        btn?.addEventListener('click', () => {
            boxes.forEach(b => b.classList.remove('decision-active'));
            boxes.forEach((b, i) => {
                setTimeout(() => b.classList.add('decision-active'), i * 300);
            });
        });
    } else if (simId === 'cs6-cleaning') {
        const btn = simType.querySelector('[data-action="run-cleaning"]');
        const dirty = Array.from(simType.querySelectorAll('.cleaning-dirty'));
        const clean = Array.from(simType.querySelectorAll('.cleaning-clean'));
        btn?.addEventListener('click', () => {
            dirty.forEach(d => {
                d.classList.remove('cleaning-dirty');
                d.classList.add('cleaning-fixed');
            });
            clean.forEach(c => c.classList.add('cleaning-fixed'));
        });
    } else if (simId === 'cs6-allocation') {
        const btn = simType.querySelector('[data-action="shuffle-fragments"]');
        const frags = Array.from(simType.querySelectorAll('.design-fragment'));
        btn?.addEventListener('click', () => {
            frags.sort(() => Math.random() - 0.5);
            const row = simType.querySelector('.design-row');
            frags.forEach(f => row.appendChild(f));
        });
    } else if (simId === 'cs6-directory') {
        const btn = simType.querySelector('[data-action="highlight-directory"]');
        const boxes = Array.from(simType.querySelectorAll('.schema-box'));
        btn?.addEventListener('click', () => {
            boxes.forEach(b => b.classList.remove('decision-active'));
            boxes.forEach((b, i) => {
                setTimeout(() => b.classList.add('decision-active'), i * 300);
            });
        });
    } else if (simId === 'cs7-views') {
        const btn = simType.querySelector('[data-action="cycle-view"]');
        const boxes = Array.from(simType.querySelectorAll('.view-box'));
        let idx = 0;
        btn?.addEventListener('click', () => {
            boxes.forEach(b => b.classList.remove('view-active'));
            boxes[idx].classList.add('view-active');
            idx = (idx + 1) % boxes.length;
        });
    } else if (simId === 'cs7-mview') {
        const btn = simType.querySelector('[data-action="compare-mview"]');
        const boxes = Array.from(simType.querySelectorAll('.schema-box'));
        btn?.addEventListener('click', () => {
            boxes.forEach(b => b.classList.toggle('decision-active'));
        });
    } else if (simId === 'cs7-security') {
        const btn = simType.querySelector('[data-action="cycle-security"]');
        const badges = Array.from(simType.querySelectorAll('.sec-badge'));
        let idx = 0;
        btn?.addEventListener('click', () => {
            badges.forEach(b => b.classList.remove('challenge-active'));
            badges[idx].classList.add('challenge-active');
            idx = (idx + 1) % badges.length;
        });
    } else if (simId === 'cs7-dac') {
        const btn = simType.querySelector('[data-action="cycle-role"]');
        const roles = Array.from(simType.querySelectorAll('.view-box'));
        let idx = 0;
        btn?.addEventListener('click', () => {
            roles.forEach(r => r.classList.remove('view-active'));
            roles[idx].classList.add('view-active');
            idx = (idx + 1) % roles.length;
        });
    } else if (simId === 'cs7-mls') {
        const btn = simType.querySelector('[data-action="cycle-mls"]');
        const badges = Array.from(simType.querySelectorAll('.sec-badge'));
        let idx = 0;
        btn?.addEventListener('click', () => {
            badges.forEach(b => b.classList.remove('challenge-active'));
            badges[idx].classList.add('challenge-active');
            idx = (idx + 1) % badges.length;
        });
    } else if (simId === 'cs7-distributed') {
        const btn = simType.querySelector('[data-action="play-distributed-access"]');
        const boxes = Array.from(simType.querySelectorAll('.schema-box'));
        btn?.addEventListener('click', () => {
            boxes.forEach(b => b.classList.remove('decision-active'));
            boxes.forEach((b, i) => {
                setTimeout(() => b.classList.add('decision-active'), i * 300);
            });
        });
    }
    
    // Button to open AI tutor focused on this topic
    const askBtn = document.querySelector('[data-action="ask-ai-topic"]');
    askBtn?.addEventListener('click', () => {
        openAITutor(`Explain the topic "${topic}" from Content Session ${csNum} in Distributed Database Systems with clear, step-by-step examples.`);
    });
}

function makeContentSelectable() {
    const contentArea = document.getElementById('contentArea');

    // Only attach listeners once to avoid duplicates when switching topics
    if (makeContentSelectable._initialized) return;
    makeContentSelectable._initialized = true;
    
    // Enable right-click AI tutor on any selected text in the content area
    contentArea.addEventListener('contextmenu', function(e) {
        const selection = window.getSelection().toString();
        if (selection.trim()) {
            e.preventDefault();
            selectedText = selection;
            showContextMenu(e.pageX, e.pageY);
        }
    });
    
    // Hide context menu on click elsewhere
    document.addEventListener('click', function() {
        hideContextMenu();
    });
}

function setupContextMenu() {
    // Context menu is already in HTML
}

function showContextMenu(x, y) {
    const menu = document.getElementById('contextMenu');
    menu.style.display = 'block';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
}

function hideContextMenu() {
    document.getElementById('contextMenu').style.display = 'none';
}

function askAITutor() {
    hideContextMenu();
    if (!selectedText.trim()) {
        alert('Please select some text first.');
        return;
    }
    openAITutor(`Explain this: ${selectedText}`);
}

function explainConcept() {
    hideContextMenu();
    if (!selectedText.trim()) {
        alert('Please select some text first.');
        return;
    }
    openAITutor(`Explain this concept in detail: ${selectedText}`);
}

function getExample() {
    hideContextMenu();
    if (!selectedText.trim()) {
        alert('Please select some text first.');
        return;
    }
    openAITutor(`Give me a real-world example of: ${selectedText}`);
}

function addToNotes() {
    hideContextMenu();
    if (!selectedText.trim()) {
        alert('Please select some text first.');
        return;
    }
    showNotes();
    document.getElementById('notesTextarea').value = `[CS ${currentCS} - ${currentTopic}]\n${selectedText}\n\n`;
    document.getElementById('notesTextarea').focus();
}

function openAITutor(initialMessage = '') {
    const modal = document.getElementById('aiTutorModal');
    modal.style.display = 'flex';
    
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.innerHTML = '';
    if (initialMessage) {
        addChatMessage('user', initialMessage);
        sendMessageToAI(initialMessage);
    }
}

function closeAITutor() {
    document.getElementById('aiTutorModal').style.display = 'none';
}

function addChatMessage(role, message) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message ' + role;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;
    
    addChatMessage('user', message);
    input.value = '';
    sendMessageToAI(message);
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

async function sendMessageToAI(message) {
    addChatMessage('ai', 'Thinking...');
    
    try {
        const contextPrompt = currentCS 
            ? `You are an AI tutor for Distributed Database Systems course. The student is currently studying CS ${currentCS}: ${CS_CONFIG[currentCS].title}, Topic: ${currentTopic}. `
            : 'You are an AI tutor for Distributed Database Systems course. ';
        
        const response = await askGemini(contextPrompt + message);
        const chatMessages = document.getElementById('chatMessages');
        const lastMessage = chatMessages.lastChild;
        // Basic formatting: escape HTML then turn newlines into <br> for readability
        const safe = response
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        const html = safe
            .split(/\n\n+/)
            .map(p => p.trim())
            .filter(p => p.length)
            .map(p => p.replace(/\n/g, '<br>'))
            .map(p => `<p>${p}</p>`)
            .join('');
        lastMessage.innerHTML = html || '<p>(No response content)</p>';
    } catch (error) {
        const chatMessages = document.getElementById('chatMessages');
        const lastMessage = chatMessages.lastChild;
        const isQuota = (error.message || '').includes('QUOTA_EXCEEDED') || (error.message || '').toLowerCase().includes('quota');
        if (isQuota) {
            lastMessage.innerHTML = getQuotaExceededMessageForTutor();
        } else {
            const msg = (error.message || 'Unknown error').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            lastMessage.innerHTML = '<p><strong>⚠️ Error:</strong> ' + msg + '</p><p style="margin-top:8px;font-size:0.9em;">If this persists, check your API key or try again later.</p>';
        }
    }
}

function getQuotaExceededMessageForTutor() {
    return `
        <p><strong>⏳ Free tier quota used for now</strong></p>
        <p>The AI tutor works when your free tier quota is available. Right now your daily/minute limit has been reached.</p>
        <p><strong>What you can do:</strong></p>
        <ul style="margin:8px 0 0 20px; padding-left:8px;">
            <li>Wait 15–30 minutes (or try again later today) — quotas reset over time.</li>
            <li><strong>Practice other topics</strong> — read the content, try the simulations, and come back to the tutor later.</li>
            <li>Your progress is saved. You can keep learning and ask the tutor again when quota has reset.</li>
        </ul>
        <p style="margin-top:12px; font-size:0.9em; color:#64748b;">You can close this and continue studying; try "Ask AI Tutor" again in a little while.</p>
    `;
}

function startAITest() {
    if (!currentCS) {
        alert('Please select a content session first.');
        return;
    }
    
    const config = CS_CONFIG[currentCS];
    const testContent = document.getElementById('aiTestContent');
    
    // Initialize adaptive test state
    adaptiveTestState = {
        active: true,
        correctStreak: 0,
        targetStreak: 5,
        currentQuestion: null,
        questionNumber: 0,
        topics: config.topics,
        askedQuestions: [] // Reset asked questions for new test
    };
    
    testContent.innerHTML = '<p style="text-align:center;padding:20px;">🎯 <strong>Adaptive AI Test</strong><br><br>You need to answer <strong>5 questions correctly in a row</strong> to complete this test.<br>If you get one wrong, the streak resets and you continue.<br><br><span style="color:#667eea;">🤖 Generating first question via AI...</span><br><small style="color:#999;">Each question is uniquely generated based on CS ${currentCS} topics</small></p>';
    
    // Generate and show first question
    generateSingleQuestion(currentCS, config.topics)
        .then(question => {
            if (question) {
                adaptiveTestState.currentQuestion = question;
                adaptiveTestState.questionNumber = 1;
                displaySingleQuestion(question, 1, adaptiveTestState.correctStreak);
            } else {
                testContent.innerHTML = '<p style="color: red;">Failed to generate question. Please try again.</p><button onclick="startAITest()" class="btn-test">Retry</button>';
            }
        })
        .catch(error => {
            const isQuota = (error.message || '').includes('QUOTA_EXCEEDED') || (error.message || '').toLowerCase().includes('quota');
            testContent.innerHTML = isQuota ? getQuotaExceededMessage() : getGenericErrorMessage(error.message);
        });
}

function getQuotaExceededMessage() {
    return `
        <div class="quota-message" style="padding: 24px; background: linear-gradient(135deg, #e8f4fd 0%, #f0f9ff 100%); border-radius: 12px; border: 2px solid #0ea5e9; text-align: center;">
            <div style="font-size: 3em; margin-bottom: 16px;">⏳</div>
            <h3 style="color: #0369a1; margin-bottom: 12px; font-size: 1.3em;">Free tier quota used for now</h3>
            <p style="color: #0c4a6e; margin-bottom: 12px; line-height: 1.6;">
                The AI quiz works when your free tier quota is available. Right now your daily/minute limit has been reached.
            </p>
            <p style="color: #0c4a6e; margin-bottom: 16px; line-height: 1.6;">
                <strong>What you can do:</strong><br>
                • Wait 15–30 minutes (or try again later today) — quotas reset over time.<br>
                • <strong>Practice other topics</strong> in this session — read the content, try the simulations, and use the AI tutor on selected text.<br>
                • Come back later to take the quiz when quota has reset.
            </p>
            <p style="color: #64748b; font-size: 0.9em; margin-bottom: 20px;">
                Your progress is saved. You can continue learning and retry the test when ready.
            </p>
            <button onclick="startAITest()" class="btn-test" style="background: #0ea5e9; color: white;">🔄 Try again later</button>
        </div>
    `;
}

function getGenericErrorMessage(message) {
    const safeMsg = (message || 'Unknown error').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `
        <div style="padding: 20px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107;">
            <p style="color: #856404; margin-bottom: 15px;"><strong>⚠️ Error generating question:</strong></p>
            <p style="color: #856404; margin-bottom: 15px;">${safeMsg}</p>
            <p style="color: #856404; font-size: 0.9em; margin-bottom: 15px;">Possible causes:</p>
            <ul style="color: #856404; font-size: 0.9em; margin-left: 20px; margin-bottom: 15px;">
                <li>API key not configured or invalid</li>
                <li>Network connectivity issues</li>
                <li>API rate limit exceeded</li>
            </ul>
            <button onclick="startAITest()" class="btn-test">🔄 Retry Test</button>
        </div>
    `;
}

async function generateSingleQuestion(csNum, topics, retryCount = 0) {
    // Select a random topic from the available topics to vary questions
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    // Build context about previously asked questions to avoid repeats
    const askedContext = adaptiveTestState.askedQuestions.length > 0 
        ? `\n\nIMPORTANT: Do NOT repeat these questions that were already asked:\n${adaptiveTestState.askedQuestions.slice(-5).map((q, i) => `${i+1}. ${q}`).join('\n')}\n\nGenerate a COMPLETELY DIFFERENT question with a different scenario or angle.`
        : '';
    
    // CS-specific prompts with use-case focus
    let promptBase = '';
    if (csNum === 1) {
        promptBase = `Generate ONE multiple-choice question about Distributed Database Systems - Content Session 1: Distributed Data Storage Technology.

FOCUS TOPIC: ${randomTopic}

Focus on REAL-WORLD USE CASES and PRACTICAL SCENARIOS. Create a question that tests understanding through a concrete situation or problem.

Examples of good question types for CS1:
- "A hospital needs to store MRI images across multiple locations. Which architecture would be best?"
- "Netflix serves 250M users globally. What distributed storage concept enables this?"
- "A bank wants to ensure data availability if one server fails. Which approach should they use?"
- "A company needs to share storage between multiple servers. Which storage connection type is most suitable?"
- "What happens to data in a JBOD configuration if one disk fails?"

Make the question:
- Scenario-based or use-case oriented
- Test practical understanding, not just memorization
- Include real-world context (companies, industries, specific problems)
- Have one clearly correct answer with plausible distractors`;
    } else if (csNum === 2) {
        promptBase = `Generate ONE multiple-choice question about Distributed Database Systems - Content Session 2: Storage Systems Simulator.

FOCUS TOPIC: ${randomTopic}

This session covers storage architectures such as JBOD, RAID 0, RAID 1, RAID 10, RAID 5, RAID 6 and DAS/NAS/SAN.

Create a PRACTICAL, REAL-WORLD scenario that forces the student to reason about storage design, performance and fault-tolerance, not just remember definitions.

Examples of good question types for CS2:
- "A university needs cheap storage for lab experiment data that is backed up elsewhere. Which option (JBOD vs RAID) is most suitable and why?"
- "An online game server must load map files very quickly but data can be restored from source control. Which RAID level is appropriate?"
- "A hospital wants imaging data to survive a single disk failure with good usable capacity. Which RAID level fits best?"
- "A bank archive holds petabytes of historical logs on large disks. Rebuilds are long; they worry about a second disk failing during rebuild. Which RAID level should they choose?"
- "An organisation wants to share the same RAID array across many application servers. Should they use DAS, NAS or SAN?"

Requirements:
- Use concrete numbers or constraints (e.g. number of disks, capacity, failure scenarios, cost vs performance trade-offs).
- The question must clearly test understanding of the chosen topic (${randomTopic}) within CS2.
- The correct answer must be justified by properties like redundancy, performance, capacity utilisation, or sharing model.`;
    } else if (csNum === 4) {
        promptBase = `Generate ONE multiple-choice question about Distributed Database Systems - Content Session 4: Distributed DBMS Architecture.

FOCUS TOPIC: ${randomTopic}

This session covers architectural ideas such as core concepts (fragmentation, replication, transparency, autonomy), client/server, peer‑to‑peer, multidatabase systems (MDBS), data sources and real‑world applications.

Create a scenario that forces the student to choose or reason about an appropriate architecture, trade‑offs or core design decision.

Examples of good question types for CS4:
- "A company after a merger wants to keep two autonomous DBMSs but provide one global view. Which architecture is most suitable and why?"
- "A small HR system with one central server and many thin clients is best modelled as what architecture?"
- "A banking network where each branch has its own DB but they cooperate to answer global queries corresponds to which model?"
- "Given requirements for autonomy, global queries and fault isolation, which of C/S, P2P or MDBS is preferred?"

Requirements:
- Include enough detail in the scenario (industry, number of sites, autonomy needs, failure considerations).
- The correct answer must be justified by architectural properties such as autonomy, centralisation, fault isolation or heterogeneity support.`;
    } else {
        promptBase = `Generate ONE multiple-choice question about Distributed Database Systems - Content Session ${csNum}.

FOCUS TOPIC: ${randomTopic}

Covering topics: ${topics.join(', ')}.

Focus on practical understanding, real-world applications, and conceptual clarity. Make the question challenging but fair. Include scenario-based questions when possible.`;
    }
    
    const prompt = `${promptBase}${askedContext}

Format as JSON object with EXACTLY this structure:
{
  "question": "Your question text here",
  "options": ["Option A text", "Option B text", "Option C text", "Option D text"],
  "correct": "A",
  "explanation": "Detailed explanation of why the correct answer is right, including real-world context if applicable"
}

Return ONLY valid JSON, no other text. Ensure the question is unique and different from previously asked questions.`;
    
    try {
        const response = await askGemini(prompt);
        
        // Try multiple JSON extraction methods
        let question = null;
        
        // Method 1: Try to find JSON object
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            try {
                question = JSON.parse(jsonMatch[0]);
            } catch (e) {
                console.error('JSON parse error:', e);
            }
        }
        
        // Method 2: If that fails, try to extract from code blocks
        if (!question) {
            const codeBlockMatch = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
            if (codeBlockMatch) {
                try {
                    question = JSON.parse(codeBlockMatch[1]);
                } catch (e) {
                    console.error('Code block JSON parse error:', e);
                }
            }
        }
        
        // Validate question structure
        if (question && question.question && question.options && Array.isArray(question.options) && 
            question.options.length >= 2 && question.correct && question.explanation) {
            
            // Normalize correct answer (A, B, C, D)
            const correct = String(question.correct).toUpperCase().charAt(0);
            if (['A', 'B', 'C', 'D'].includes(correct) && question.options.length >= ['A', 'B', 'C', 'D'].indexOf(correct) + 1) {
                // Track this question to avoid repeats
                adaptiveTestState.askedQuestions.push(question.question.substring(0, 100)); // Store first 100 chars
                
                // Ensure correct answer matches an option
                question.correct = correct;
                return question;
            }
        }
        
        // Retry logic if question is invalid
        if (retryCount < 2) {
            console.log(`Retrying question generation (attempt ${retryCount + 2})...`);
            return await generateSingleQuestion(csNum, topics, retryCount + 1);
        }
        
        // Last resort: throw error instead of using fallback
        throw new Error('Failed to generate valid question after multiple attempts. Please check your API key and try again.');
        
    } catch (e) {
        console.error('Error generating question:', e);
        
        // Only use fallback on last retry
        if (retryCount >= 2) {
            throw new Error(`Unable to generate AI question: ${e.message}. Please check your API key and try again.`);
        }
        
        // Retry once more
        return await generateSingleQuestion(csNum, topics, retryCount + 1);
    }
}

// Removed getSampleQuestion - we now rely entirely on AI generation
// If AI fails, we show an error message instead of falling back to predefined questions


function displaySingleQuestion(question, questionNum, currentStreak) {
    const testContent = document.getElementById('aiTestContent');
    if (!question) return;
    
    const correct = (question.correct && String(question.correct).toUpperCase().charAt(0)) || 'A';
    const optionLetters = 'ABCDEFGH';
    const remaining = adaptiveTestState.targetStreak - currentStreak;
    
    let html = `
        <div class="adaptive-test-header" style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            <div style="font-size: 1.1em; color: #667eea; font-weight: bold; margin-bottom: 8px;">
                🎯 Adaptive Test Progress
            </div>
            <div style="display: flex; justify-content: center; gap: 20px; align-items: center;">
                <div>
                    <strong>Correct Streak:</strong> <span style="color: #4caf50; font-size: 1.2em;">${currentStreak}</span> / ${adaptiveTestState.targetStreak}
                </div>
                <div style="width: 2px; height: 30px; background: #ccc;"></div>
                <div>
                    <strong>Question:</strong> #${questionNum}
                </div>
                <div style="width: 2px; height: 30px; background: #ccc;"></div>
                <div>
                    <strong>Remaining:</strong> ${remaining} more correct
                </div>
            </div>
        </div>
        <div class="question-card" data-correct="${correct}" style="margin-bottom: 20px;">
            <h4>Question ${questionNum}: ${escapeHtml(question.question)}</h4>
            <div class="options">
                ${(question.options || []).map((opt, i) => {
                    const letter = optionLetters[i] || String.fromCharCode(65 + i);
                    return `<label class="option">
                        <input type="radio" name="currentQ" value="${letter}">
                        ${letter}. ${escapeHtml(opt)}
                    </label>`;
                }).join('')}
            </div>
            <div class="explanation" id="currentExplanation" style="display: none; margin-top: 15px; padding: 15px; background: #f3f4f6; border-radius: 8px; border-left: 4px solid #667eea;">
                <strong style="color: #667eea;">Correct Answer: <span id="correctAnswerDisplay"></span></strong><br><br>
                <strong>Explanation:</strong> <span id="explanationText"></span>
            </div>
        </div>
        <button type="button" id="submitAnswerBtn" class="btn-test" style="width: 100%;">Submit Answer</button>
    `;
    
    testContent.innerHTML = html;
    
    const submitBtn = document.getElementById('submitAnswerBtn');
    if (submitBtn) {
        submitBtn.addEventListener('click', handleAnswerSubmission);
    }
    
    // Store question data for answer checking
    adaptiveTestState.currentQuestion = question;
}

function handleAnswerSubmission() {
    if (!adaptiveTestState.active || !adaptiveTestState.currentQuestion) return;
    
    const selected = document.querySelector('input[name="currentQ"]:checked');
    const submitBtn = document.getElementById('submitAnswerBtn');
    const explanationDiv = document.getElementById('currentExplanation');
    const correctAnswerDisplay = document.getElementById('correctAnswerDisplay');
    const explanationText = document.getElementById('explanationText');
    
    if (!selected) {
        alert('Please select an answer first.');
        return;
    }
    
    if (submitBtn) submitBtn.disabled = true;
    
    const correctAnswer = (adaptiveTestState.currentQuestion.correct || 'A').toUpperCase().charAt(0);
    const userAnswer = selected.value.toUpperCase();
    const isCorrect = userAnswer === correctAnswer;
    
    // Show explanation
    if (explanationDiv) {
        explanationDiv.style.display = 'block';
        if (correctAnswerDisplay) correctAnswerDisplay.textContent = correctAnswer;
        if (explanationText) {
            const exp = escapeHtml(adaptiveTestState.currentQuestion.explanation || 'No explanation provided.');
            explanationText.innerHTML = exp;
        }
    }
    
    // Highlight selected option
    const selectedOption = selected.closest('.option');
    const allOptions = document.querySelectorAll('.option');
    
    allOptions.forEach(opt => {
        const input = opt.querySelector('input[type="radio"]');
        if (input && input.value === correctAnswer) {
            opt.style.background = '#c8e6c9';
            opt.style.borderColor = '#4caf50';
        }
    });
    
    if (isCorrect) {
        selectedOption.style.background = '#c8e6c9';
        selectedOption.style.borderColor = '#4caf50';
        adaptiveTestState.correctStreak++;
    } else {
        selectedOption.style.background = '#ffcdd2';
        selectedOption.style.borderColor = '#f44336';
        adaptiveTestState.correctStreak = 0; // Reset streak
    }
    
    // Wait a moment, then move to next question or complete
    setTimeout(() => {
        if (adaptiveTestState.correctStreak >= adaptiveTestState.targetStreak) {
            // Test complete!
            showTestCompletion();
        } else {
            // Generate next question
            generateNextQuestion();
        }
    }, 2000); // 2 second delay to read explanation
}

function generateNextQuestion() {
    const testContent = document.getElementById('aiTestContent');
    testContent.innerHTML = '<p style="text-align:center;padding:20px;"><span style="color:#667eea;">🤖 Generating next question via AI...</span><br><small style="color:#999;">This may take a few seconds</small></p>';
    
    adaptiveTestState.questionNumber++;
    
    generateSingleQuestion(currentCS, adaptiveTestState.topics)
        .then(question => {
            if (question) {
                adaptiveTestState.currentQuestion = question;
                displaySingleQuestion(question, adaptiveTestState.questionNumber, adaptiveTestState.correctStreak);
            } else {
                testContent.innerHTML = '<p style="color: red;">Failed to generate question. Please try again.</p><button onclick="startAITest()" class="btn-test">Retry</button>';
            }
        })
        .catch(error => {
            console.error('Question generation error:', error);
            const isQuota = (error.message || '').includes('QUOTA_EXCEEDED') || (error.message || '').toLowerCase().includes('quota');
            testContent.innerHTML = isQuota ? getQuotaExceededMessage() : getGenericErrorMessage(error.message);
        });
}

function showTestCompletion() {
    const testContent = document.getElementById('aiTestContent');
    adaptiveTestState.active = false;
    
    testContent.innerHTML = `
        <div style="text-align: center; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
            <div style="font-size: 4em; margin-bottom: 20px;">🎉</div>
            <h2 style="margin-bottom: 15px; font-size: 2em;">Test Completed!</h2>
            <p style="font-size: 1.2em; margin-bottom: 25px;">
                Congratulations! You answered <strong>${adaptiveTestState.targetStreak} questions correctly in a row</strong>.
            </p>
            <p style="font-size: 1em; opacity: 0.9; margin-bottom: 30px;">
                Total questions answered: ${adaptiveTestState.questionNumber}
            </p>
            <button onclick="startAITest()" class="btn-test" style="background: white; color: #667eea; font-size: 1.1em; padding: 15px 40px;">
                🔁 Take Another Test
            </button>
        </div>
    `;
}

function escapeHtml(text) {
    if (text == null) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Old submitTest function removed - now using adaptive sequential testing

function markComplete() {
    if (!currentCS) return;
    
    const completed = JSON.parse(localStorage.getItem('completed_sessions') || '[]');
    if (!completed.includes(currentCS)) {
        completed.push(currentCS);
        localStorage.setItem('completed_sessions', JSON.stringify(completed));
    }
    
    updateProgress();
    updateSessionStatus();
    
    alert(`✅ CS ${currentCS} marked as complete!`);
}

function updateProgress() {
    const completed = JSON.parse(localStorage.getItem('completed_sessions') || '[]');
    const totalSessions = 7; // CS 1-7 are the main sessions
    const completedMain = completed.filter(cs => cs >= 1 && cs <= 7).length;
    const percentage = Math.round((completedMain / totalSessions) * 100);
    
    document.getElementById('overallProgress').style.width = percentage + '%';
    document.getElementById('progressText').textContent = percentage + '% Complete';
}

function updateSessionStatus() {
    const completed = JSON.parse(localStorage.getItem('completed_sessions') || '[]');
    
    for (let i = 1; i <= 16; i++) {
        const statusEl = document.getElementById(`cs${i}-status`);
        if (statusEl && completed.includes(i)) {
            statusEl.textContent = 'Completed';
            statusEl.classList.add('completed');
        }
    }
}

function showNotes() {
    document.getElementById('notesModal').style.display = 'flex';
    loadNotes();
}

function closeNotes() {
    document.getElementById('notesModal').style.display = 'none';
}

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('user_notes') || '[]');
    const notesList = document.getElementById('notesList');
    
    if (notes.length === 0) {
        notesList.innerHTML = '<p style="color: #999; text-align: center;">No notes yet. Add your first note below!</p>';
        return;
    }
    
    notesList.innerHTML = notes.map((note, index) => `
        <div class="note-item">
            <h4>${note.title || 'Note ' + (index + 1)}</h4>
            <p>${note.content}</p>
            <div class="note-meta">${note.session || ''} - ${note.date || ''}</div>
            <button onclick="deleteNote(${index})" style="margin-top: 10px; padding: 5px 10px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
        </div>
    `).join('');
}

function saveNote() {
    const textarea = document.getElementById('notesTextarea');
    const content = textarea.value.trim();
    
    if (!content) {
        alert('Please enter some content for your note.');
        return;
    }
    
    const notes = JSON.parse(localStorage.getItem('user_notes') || '[]');
    notes.push({
        content: content,
        session: currentCS ? `CS ${currentCS}: ${currentTopic}` : '',
        date: new Date().toLocaleDateString(),
        title: content.substring(0, 50) + (content.length > 50 ? '...' : '')
    });
    
    localStorage.setItem('user_notes', JSON.stringify(notes));
    textarea.value = '';
    loadNotes();
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('user_notes') || '[]');
    notes.splice(index, 1);
    localStorage.setItem('user_notes', JSON.stringify(notes));
    loadNotes();
}

function showBookmarks() {
    document.getElementById('bookmarksModal').style.display = 'flex';
    loadBookmarks();
}

function closeBookmarks() {
    document.getElementById('bookmarksModal').style.display = 'none';
}

function loadBookmarks() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const bookmarksList = document.getElementById('bookmarksList');
    
    if (bookmarks.length === 0) {
        bookmarksList.innerHTML = '<p style="color: #999; text-align: center;">No bookmarks yet. Right-click on content and select "Add to Notes" or bookmark topics!</p>';
        return;
    }
    
    bookmarksList.innerHTML = bookmarks.map((bookmark, index) => `
        <div class="bookmark-item">
            <h4>${bookmark.title}</h4>
            <p>${bookmark.session}</p>
            <button onclick="goToBookmark(${bookmark.cs}, '${bookmark.topic}')" style="margin-top: 10px; padding: 5px 10px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer;">Go to</button>
            <button onclick="deleteBookmark(${index})" style="margin-top: 10px; padding: 5px 10px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 5px;">Delete</button>
        </div>
    `).join('');
}

function toggleBookmark() {
    if (!currentCS || !currentTopic) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    const existing = bookmarks.findIndex(b => b.cs === currentCS && b.topic === currentTopic);
    
    if (existing >= 0) {
        bookmarks.splice(existing, 1);
        alert('Bookmark removed');
    } else {
        bookmarks.push({
            cs: currentCS,
            topic: currentTopic,
            title: `CS ${currentCS}: ${currentTopic}`,
            session: CS_CONFIG[currentCS].title
        });
        alert('Bookmark added!');
    }
    
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function goToBookmark(cs, topic) {
    loadCS(cs);
    setTimeout(() => {
        const tabs = document.querySelectorAll('.topic-tab');
        tabs.forEach((tab, idx) => {
            if (tab.textContent === topic) {
                tab.click();
            }
        });
    }, 500);
    closeBookmarks();
}

function deleteBookmark(index) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    loadBookmarks();
}

function showSearch() {
    const searchBox = document.getElementById('searchBox');
    searchBox.style.display = searchBox.style.display === 'none' ? 'block' : 'none';
    if (searchBox.style.display === 'block') {
        searchBox.focus();
    }
}

function generateCS8Revision() {
    return `
        <div class="welcome-screen">
            <h2>📚 Revision Contact Session: CS 1-7</h2>
            <p style="font-size: 1.1em; margin-top: 20px; color: #666;">
                Review and reinforce your understanding of Content Sessions 1-7
            </p>
            
            <div style="margin-top: 40px;">
                <h3 style="color: #667eea; margin-bottom: 20px;">Revision Activities</h3>
                
                <div class="welcome-features">
                    <div class="feature-card" onclick="startQuickReview()" style="cursor: pointer;">
                        <span class="feature-icon">⚡</span>
                        <h3>Quick Review</h3>
                        <p>Review key concepts from CS 1-7</p>
                    </div>
                    
                    <div class="feature-card" onclick="startPracticeTest()" style="cursor: pointer;">
                        <span class="feature-icon">📝</span>
                        <h3>Practice Test</h3>
                        <p>Test your knowledge across all sessions</p>
                    </div>
                    
                    <div class="feature-card" onclick="startConceptMap()" style="cursor: pointer;">
                        <span class="feature-icon">🗺️</span>
                        <h3>Concept Map</h3>
                        <p>Visualize relationships between concepts</p>
                    </div>
                    
                    <div class="feature-card" onclick="startFlashcards()" style="cursor: pointer;">
                        <span class="feature-icon">🃏</span>
                        <h3>Flashcards</h3>
                        <p>Review important terms and definitions</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generateCS16Revision() {
    return `
        <div class="welcome-screen">
            <h2>🎓 Final Revision Contact Session</h2>
            <p style="font-size: 1.1em; margin-top: 20px; color: #666;">
                Comprehensive review of all Content Sessions
            </p>
            
            <div style="margin-top: 40px;">
                <h3 style="color: #667eea; margin-bottom: 20px;">Final Revision Activities</h3>
                
                <div class="welcome-features">
                    <div class="feature-card" onclick="startComprehensiveReview()" style="cursor: pointer;">
                        <span class="feature-icon">📚</span>
                        <h3>Comprehensive Review</h3>
                        <p>Review all concepts from CS 1-16</p>
                    </div>
                    
                    <div class="feature-card" onclick="startFinalExam()" style="cursor: pointer;">
                        <span class="feature-icon">🎯</span>
                        <h3>Final Exam Practice</h3>
                        <p>Complete practice exam covering all topics</p>
                    </div>
                    
                    <div class="feature-card" onclick="startSummary()" style="cursor: pointer;">
                        <span class="feature-icon">📋</span>
                        <h3>Topic Summary</h3>
                        <p>Get AI-generated summary of all topics</p>
                    </div>
                    
                    <div class="feature-card" onclick="startWeakAreas()" style="cursor: pointer;">
                        <span class="feature-icon">💪</span>
                        <h3>Focus on Weak Areas</h3>
                        <p>Identify and review challenging topics</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function startQuickReview() {
    openAITutor('Help me quickly review the key concepts from CS 1-7. Provide a concise summary of the most important points.');
}

function startPracticeTest() {
    startAITest();
}

function startConceptMap() {
    openAITutor('Create a concept map showing the relationships between topics covered in CS 1-7. Show how concepts connect and build upon each other.');
}

function startFlashcards() {
    openAITutor('Generate flashcards for important terms and definitions from CS 1-7. Format as question-answer pairs.');
}

function startComprehensiveReview() {
    openAITutor('Help me review all content sessions (CS 1-16). Provide a comprehensive overview of all topics covered in the course.');
}

function startFinalExam() {
    openAITutor('Generate a comprehensive practice exam covering all topics from CS 1-16. Include questions from all major concepts.');
}

function startSummary() {
    openAITutor('Provide a detailed summary of all topics covered in CS 1-16. Organize by content session and highlight key concepts.');
}

function startWeakAreas() {
    openAITutor('Based on my learning progress, help me identify areas where I need more practice. Suggest specific topics to review.');
}

function checkAPIKey() {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
        alert('Please configure your API key in the setup page first.');
        window.location.href = 'index.html';
    }
}

// Initialize session status on load
updateSessionStatus();
