/**
 * 测验题目数据
 * 每个模块 10 道题，共 5 个模块，总计 50 道题
 */

const QUIZ_DATA = {
    // 模块1: Linux 环境
    "linux-env": {
        name: "Linux 环境",
        icon: "🖥️",
        questions: [
            {
                id: 1,
                question: "Linux 系统中的 root 用户是什么？",
                options: [
                    "A. 一个普通用户账户",
                    "B. 拥有系统最高权限的超级用户",
                    "C. 系统的访客账户",
                    "D. 只能访问根目录的用户"
                ],
                answer: 1,
                explanation: "root 是 Linux 系统的超级用户（Superuser），拥有系统的最高权限，可以访问任何文件和修改任何配置。"
            },
            {
                id: 2,
                question: "Linux 文件权限 'rwxr-xr--' 中，中间的 'r-x' 代表什么？",
                options: [
                    "A. 文件所有者的权限",
                    "B. 组用户的权限（读和执行）",
                    "C. 其他用户的权限（读和写）",
                    "D. 根用户的权限"
                ],
                answer: 1,
                explanation: "权限分为三组：所有者、组用户、其他用户。中间的 'r-x' 表示组用户有读和执行权限，没有写权限。"
            },
            {
                id: 3,
                question: "关于进程，以下说法正确的是？",
                options: [
                    "A. 进程之间可以随意访问对方的内存",
                    "B. 进程是正在运行的程序实例，默认是隔离的",
                    "C. 一个程序只能有一个进程",
                    "D. 进程和程序是完全相同的概念"
                ],
                answer: 1,
                explanation: "进程是正在运行的程序实例，默认情况下进程之间是隔离的，不能直接访问对方的内存，这对系统安全非常重要。"
            },
            {
                id: 4,
                question: "使用哪个命令可以查看文件的详细权限信息？",
                options: [
                    "A. cat",
                    "B. cd",
                    "C. ls -la",
                    "D. pwd"
                ],
                answer: 2,
                explanation: "ls -la 命令可以列出当前目录下所有文件的详细信息，包括权限、所有者、大小、修改时间等。"
            },
            {
                id: 5,
                question: "权限数字 755 对应的权限是什么？",
                options: [
                    "A. rwxrwxrwx",
                    "B. rwxr-xr-x",
                    "C. rwx------",
                    "D. rw-r--r--"
                ],
                answer: 1,
                explanation: "755 = 7(rwx) + 5(r-x) + 5(r-x)，即所有者有读写执行权限，组用户和其他用户有读和执行权限。"
            },
            {
                id: 6,
                question: "使用 sudo 命令的目的是什么？",
                options: [
                    "A. 切换用户",
                    "B. 以超级用户权限执行命令",
                    "C. 关闭系统",
                    "D. 查看系统日志"
                ],
                answer: 1,
                explanation: "sudo（superuser do）允许普通用户以超级用户（root）权限执行命令，是进行系统管理操作的常用方式。"
            },
            {
                id: 7,
                question: "Linux 中用于修改文件权限的命令是？",
                options: [
                    "A. chown",
                    "B. chmod",
                    "C. chgrp",
                    "D. chattr"
                ],
                answer: 1,
                explanation: "chmod（change mode）命令用于修改文件或目录的访问权限。chown 用于修改所有者，chgrp 用于修改所属组。"
            },
            {
                id: 8,
                question: "查看当前登录用户信息的命令是？",
                options: [
                    "A. whoami",
                    "B. who",
                    "C. id",
                    "D. 以上都可以"
                ],
                answer: 3,
                explanation: "whoami 显示当前用户名，who 显示所有登录用户，id 显示用户ID和组ID信息。这三个命令都可以用来获取用户信息。"
            },
            {
                id: 9,
                question: "Linux 中进程的唯一标识符叫什么？",
                options: [
                    "A. UID",
                    "B. GID",
                    "C. PID",
                    "D. SID"
                ],
                answer: 2,
                explanation: "PID（Process ID）是进程的唯一标识符，是一个正整数，系统启动时 init 进程的 PID 为 1。"
            },
            {
                id: 10,
                question: "查看进程状态的命令是？",
                options: [
                    "A. ls",
                    "B. ps",
                    "C. top",
                    "D. B 和 C 都是"
                ],
                answer: 3,
                explanation: "ps 命令可以查看当前进程状态快照，top 命令可以实时动态显示进程信息。两者都是常用的进程查看工具。"
            }
        ]
    },

    // 模块2: 系统架构
    "architecture": {
        name: "系统架构",
        icon: "🏗️",
        questions: [
            {
                id: 11,
                question: "在 Linux 系统架构中，内核层的主要职责是什么？",
                options: [
                    "A. 运行用户的应用程序",
                    "B. 提供图形界面",
                    "C. 管理硬件资源和提供系统调用接口",
                    "D. 编译源代码"
                ],
                answer: 2,
                explanation: "内核是操作系统的核心，负责管理硬件资源（CPU、内存、设备等）并通过系统调用为上层提供服务。"
            },
            {
                id: 12,
                question: "用户程序如何与内核进行交互？",
                options: [
                    "A. 直接访问硬件",
                    "B. 通过系统调用（System Call）",
                    "C. 通过网络协议",
                    "D. 通过文件复制"
                ],
                answer: 1,
                explanation: "用户程序运行在用户模式，不能直接访问硬件。需要通过系统调用（如 read、write、fork 等）请求内核服务。"
            },
            {
                id: 13,
                question: "系统库层（如 glibc）的作用是什么？",
                options: [
                    "A. 直接控制硬件",
                    "B. 封装系统调用，提供更友好的接口",
                    "C. 替代内核功能",
                    "D. 管理网络连接"
                ],
                answer: 1,
                explanation: "系统库层封装了底层的系统调用，提供更友好、跨平台的编程接口，如 fopen() 封装了 open() 系统调用。"
            },
            {
                id: 14,
                question: "Shell 执行命令 'ls' 时的正确流程是？",
                options: [
                    "A. 直接运行 ls 程序",
                    "B. 在 PATH 中查找 → fork() → exec() 执行",
                    "C. 内核直接执行命令",
                    "D. 将命令写入文件执行"
                ],
                answer: 1,
                explanation: "Shell 先在 PATH 环境变量中查找 ls 程序路径，然后通过 fork() 创建子进程，再用 exec() 加载并执行 ls 程序。"
            },
            {
                id: 15,
                question: "内核模式（Kernel Mode）和用户模式（User Mode）的主要区别是？",
                options: [
                    "A. 没有区别",
                    "B. 内核模式权限更高，可以直接操作硬件",
                    "C. 用户模式可以执行所有指令",
                    "D. 内核模式只能运行 Shell"
                ],
                answer: 1,
                explanation: "内核模式拥有最高权限，可以执行特权指令和直接访问硬件。用户模式权限受限，必须通过系统调用请求内核服务。"
            },
            {
                id: 16,
                question: "以下哪个不是硬件层的组成部分？",
                options: [
                    "A. CPU",
                    "B. 内存",
                    "C. Shell",
                    "D. 网卡"
                ],
                answer: 2,
                explanation: "CPU、内存、硬盘、网卡都属于硬件层。Shell 是命令行解释器，属于应用层软件。"
            },
            {
                id: 17,
                question: "Linux 系统启动的正确顺序是？",
                options: [
                    "A. 内核 → Bootloader → init 进程",
                    "B. Bootloader → 内核 → init 进程",
                    "C. init 进程 → 内核 → Bootloader",
                    "D. Shell → 内核 → Bootloader"
                ],
                answer: 1,
                explanation: "系统启动顺序：BIOS/UEFI → Bootloader（如GRUB）→ 加载内核 → 启动 init 进程（PID 1）→ 启动其他服务。"
            },
            {
                id: 18,
                question: "文件描述符（File Descriptor）是什么？",
                options: [
                    "A. 文件的名称",
                    "B. 内核分配给打开文件的整数标识符",
                    "C. 文件的路径",
                    "D. 文件的大小"
                ],
                answer: 1,
                explanation: "文件描述符是内核为每个打开的文件分配的非负整数，用于标识和访问文件。0=标准输入，1=标准输出，2=标准错误。"
            },
            {
                id: 19,
                question: "PATH 环境变量的作用是什么？",
                options: [
                    "A. 存储当前目录路径",
                    "B. 存储可执行文件的搜索路径",
                    "C. 存储用户主目录",
                    "D. 存储临时文件路径"
                ],
                answer: 1,
                explanation: "PATH 环境变量包含一组目录路径，Shell 在执行命令时会到这些目录中查找可执行文件。"
            },
            {
                id: 20,
                question: "Shell 内建命令（Built-in）和外部命令的区别是？",
                options: [
                    "A. 内建命令更快，外部命令需要 fork+exec",
                    "B. 内建命令需要 fork，外部命令不需要",
                    "C. 没有区别",
                    "D. 外部命令更快"
                ],
                answer: 0,
                explanation: "内建命令（如 cd、echo）直接在 Shell 进程中执行，不需要创建子进程，速度更快。外部命令需要 fork+exec 执行。"
            }
        ]
    },

    // 模块3: C 语言
    "c-programming": {
        name: "C 语言",
        icon: "💻",
        questions: [
            {
                id: 21,
                question: "在 C 语言中，指针存储的是什么？",
                options: [
                    "A. 普通变量的值",
                    "B. 内存地址",
                    "C. 字符串",
                    "D. 文件内容"
                ],
                answer: 1,
                explanation: "指针是一个特殊的变量，它存储的是另一个变量的内存地址，而不是普通的数据值。"
            },
            {
                id: 22,
                question: "以下哪个操作符用于获取变量的地址？",
                options: [
                    "A. *",
                    "B. &",
                    "C. ->",
                    "D. ."
                ],
                answer: 1,
                explanation: "& 是取地址符，&variable 返回变量的内存地址。* 是解引用符，用于获取指针指向的值。"
            },
            {
                id: 23,
                question: "fork() 系统调用的返回值是什么？",
                options: [
                    "A. 总是返回 0",
                    "B. 总是返回子进程 PID",
                    "C. 父进程返回子进程 PID，子进程返回 0",
                    "D. 总是返回 -1"
                ],
                answer: 2,
                explanation: "fork() 创建子进程后，父进程收到子进程的 PID（正数），子进程收到 0，失败时返回 -1。"
            },
            {
                id: 24,
                question: "C 语言中 malloc() 分配的内存应该用什么函数释放？",
                options: [
                    "A. delete()",
                    "B. free()",
                    "C. release()",
                    "D. clear()"
                ],
                answer: 1,
                explanation: "malloc() 从堆中分配动态内存，使用完后必须调用 free() 释放，否则会导致内存泄漏。"
            },
            {
                id: 25,
                question: "以下哪个是正确的指针声明？",
                options: [
                    "A. int p*;",
                    "B. int *p;",
                    "C. pointer int p;",
                    "D. *int p;"
                ],
                answer: 1,
                explanation: "C 语言中声明指针的语法是 '类型 *变量名'，例如 int *p; 声明了一个指向 int 类型的指针 p。"
            },
            {
                id: 26,
                question: "C 语言中 fopen() 函数的返回值类型是？",
                options: [
                    "A. int",
                    "B. char*",
                    "C. FILE*",
                    "D. void*"
                ],
                answer: 2,
                explanation: "fopen() 返回 FILE 指针（FILE*），用于后续的文件操作。如果打开失败则返回 NULL。"
            },
            {
                id: 27,
                question: "以下哪个循环至少会执行一次循环体？",
                options: [
                    "A. for 循环",
                    "B. while 循环",
                    "C. do-while 循环",
                    "D. 以上都不是"
                ],
                answer: 2,
                explanation: "do-while 循环先执行循环体再判断条件，因此至少会执行一次。for 和 while 都是先判断条件再执行。"
            },
            {
                id: 28,
                question: "C 语言中 exit() 函数的作用是什么？",
                options: [
                    "A. 暂停程序",
                    "B. 终止程序运行",
                    "C. 重新启动程序",
                    "D. 等待用户输入"
                ],
                answer: 1,
                explanation: "exit() 函数用于正常终止程序运行，会刷新并关闭所有打开的文件，然后返回退出状态码给操作系统。"
            },
            {
                id: 29,
                question: "以下哪个不是 C 语言的基本数据类型？",
                options: [
                    "A. int",
                    "B. float",
                    "C. string",
                    "D. char"
                ],
                answer: 2,
                explanation: "C 语言的基本数据类型包括 int、float、double、char 等。string 不是基本类型，C 中用字符数组或指针表示字符串。"
            },
            {
                id: 30,
                question: "C 语言中，数组名表示什么？",
                options: [
                    "A. 数组的第一个元素",
                    "B. 数组的首地址",
                    "C. 数组的长度",
                    "D. 数组的最后一个元素"
                ],
                answer: 1,
                explanation: "数组名本质上是一个指向数组第一个元素的指针，存储的是数组在内存中的起始地址。"
            }
        ]
    },

    // 模块4: 内核模块
    "kernel": {
        name: "内核模块",
        icon: "⚙️",
        questions: [
            {
                id: 31,
                question: "虚拟内存的主要作用是什么？",
                options: [
                    "A. 增加硬盘容量",
                    "B. 为每个进程提供独立的地址空间，实现进程隔离",
                    "C. 加快 CPU 速度",
                    "D. 减少内存使用"
                ],
                answer: 1,
                explanation: "虚拟内存让每个进程都认为自己拥有完整的内存空间，同时实现进程间的隔离，提高系统安全性和稳定性。"
            },
            {
                id: 32,
                question: "当访问的虚拟页不在物理内存时，会发生什么？",
                options: [
                    "A. 程序直接崩溃",
                    "B. 触发缺页异常，内核从磁盘加载该页",
                    "C. CPU 自动忽略该访问",
                    "D. 内存被清空"
                ],
                answer: 1,
                explanation: "当访问的虚拟页不在物理内存时，MMU 会触发缺页异常（Page Fault），内核处理异常并从磁盘加载所需页面。"
            },
            {
                id: 33,
                question: "Linux 中 Inode 存储的是什么信息？",
                options: [
                    "A. 文件名",
                    "B. 文件的元数据（权限、大小、数据块位置等）",
                    "C. 文件内容",
                    "D. 目录结构"
                ],
                answer: 1,
                explanation: "Inode（索引节点）存储文件的元数据，包括权限、大小、时间戳、数据块位置等，但不包含文件名。"
            },
            {
                id: 34,
                question: "网络数据包从网卡到用户程序的正确流程是？",
                options: [
                    "A. 网卡 → 用户程序 → 内核",
                    "B. 网卡 → 内核驱动 → 协议栈 → Socket 缓冲区 → 用户程序",
                    "C. 用户程序 → 网卡 → 内核",
                    "D. 内核 → 网卡 → 用户程序"
                ],
                answer: 1,
                explanation: "数据包首先由网卡接收，经内核驱动处理，通过协议栈解析，分发到对应 Socket 缓冲区，最后由用户程序通过 read/recv 读取。"
            },
            {
                id: 35,
                question: "MMU（内存管理单元）的主要功能是什么？",
                options: [
                    "A. 存储数据",
                    "B. 将虚拟地址转换为物理地址",
                    "C. 执行程序指令",
                    "D. 管理网络连接"
                ],
                answer: 1,
                explanation: "MMU 是 CPU 的一部分，负责将虚拟内存地址转换为物理内存地址，是实现虚拟内存的关键硬件组件。"
            },
            {
                id: 36,
                question: "Linux 进程的内存布局中，栈（Stack）的作用是什么？",
                options: [
                    "A. 存储全局变量",
                    "B. 存储动态分配的内存",
                    "C. 存储函数调用的局部变量和返回地址",
                    "D. 存储程序代码"
                ],
                answer: 2,
                explanation: "栈用于存储函数的局部变量、参数和返回地址。函数调用时栈增长，函数返回时栈收缩。"
            },
            {
                id: 37,
                question: "Linux 中用于创建子进程的系统调用是？",
                options: [
                    "A. create()",
                    "B. fork()",
                    "C. new()",
                    "D. spawn()"
                ],
                answer: 1,
                explanation: "fork() 是 Linux 中创建新进程的系统调用，它会创建一个与父进程几乎相同的子进程。"
            },
            {
                id: 38,
                question: "进程调度器的作用是什么？",
                options: [
                    "A. 创建新进程",
                    "B. 决定哪个进程获得 CPU 时间",
                    "C. 分配内存",
                    "D. 管理文件系统"
                ],
                answer: 1,
                explanation: "进程调度器负责决定哪个进程在什么时候获得 CPU 使用权，是操作系统实现多任务的关键组件。"
            },
            {
                id: 39,
                question: "页（Page）和帧（Frame）的关系是什么？",
                options: [
                    "A. 页是物理内存块，帧是虚拟内存块",
                    "B. 页是虚拟内存块，帧是物理内存块",
                    "C. 页和帧是同一个概念",
                    "D. 页比帧大"
                ],
                answer: 1,
                explanation: "页（Page）是虚拟内存的固定大小块，帧（Frame）是物理内存的固定大小块，页表负责建立页到帧的映射。"
            },
            {
                id: 40,
                question: "设备驱动程序运行在什么模式下？",
                options: [
                    "A. 用户模式",
                    "B. 内核模式",
                    "C. 虚拟模式",
                    "D. 保护模式"
                ],
                answer: 1,
                explanation: "设备驱动程序需要直接访问硬件，因此运行在内核模式下，拥有高权限。这也是驱动程序出错可能导致系统崩溃的原因。"
            }
        ]
    },

    // 模块5: 安卓
    "android": {
        name: "安卓",
        icon: "📱",
        questions: [
            {
                id: 41,
                question: "安卓与 Linux 的关系是什么？",
                options: [
                    "A. 安卓完全独立，与 Linux 无关",
                    "B. 安卓 = Linux 内核 + 自己的框架层",
                    "C. Linux 是安卓的子集",
                    "D. 安卓和 Linux 使用完全不同的内核"
                ],
                answer: 1,
                explanation: "安卓底层使用 Linux 内核，上层则是自己的一套框架（HAL、Framework、ART 虚拟机等）。"
            },
            {
                id: 42,
                question: "安卓系统中用于进程间通信（IPC）的核心机制是？",
                options: [
                    "A. Pipe",
                    "B. Binder",
                    "C. Socket",
                    "D. Message Queue"
                ],
                answer: 1,
                explanation: "Binder 是安卓特有的 IPC 机制，是安卓系统中进程间通信的核心，替代了传统 Linux 的 IPC 方式。"
            },
            {
                id: 43,
                question: "安卓的 ART 是什么？",
                options: [
                    "A. 一种图形界面",
                    "B. 安卓运行时环境，用于执行 Java/Kotlin 字节码",
                    "C. 文件系统",
                    "D. 网络协议"
                ],
                answer: 1,
                explanation: "ART（Android Runtime）是安卓的运行时环境，负责执行应用的 Java/Kotlin 字节码，包含 JIT/AOT 编译和垃圾回收。"
            },
            {
                id: 44,
                question: "以下哪个是安卓特有的内核模块？",
                options: [
                    "A. ext4 文件系统",
                    "B. TCP/IP 协议栈",
                    "C. Wakelock 电源管理",
                    "D. 进程调度器"
                ],
                answer: 2,
                explanation: "Wakelock 是安卓特有的电源管理机制，用于防止设备休眠。Binder、Ashmem、Low Memory Killer 也是安卓特有的内核模块。"
            },
            {
                id: 45,
                question: "Android Framework 层中的 Activity Manager 的作用是什么？",
                options: [
                    "A. 管理文件系统",
                    "B. 管理应用的生命周期和任务栈",
                    "C. 管理网络连接",
                    "D. 管理数据库"
                ],
                answer: 1,
                explanation: "Activity Manager 是 Android Framework 的核心组件之一，负责管理应用的启动、切换、销毁等生命周期，以及任务栈的管理。"
            },
            {
                id: 46,
                question: "安卓应用的主要开发语言是？（2020年之前）",
                options: [
                    "A. C++",
                    "B. Python",
                    "C. Java",
                    "D. JavaScript"
                ],
                answer: 2,
                explanation: "2020年之前，Java 是安卓开发的主要语言。之后 Kotlin 成为 Google 推荐的首选语言，但 Java 仍然被广泛使用。"
            },
            {
                id: 47,
                question: "HAL（硬件抽象层）的作用是什么？",
                options: [
                    "A. 提供用户界面",
                    "B. 屏蔽硬件差异，为上层提供统一接口",
                    "C. 管理网络连接",
                    "D. 执行应用代码"
                ],
                answer: 1,
                explanation: "HAL（Hardware Abstraction Layer）屏蔽了不同硬件厂商的差异性，为上层的 Framework 提供统一的硬件访问接口。"
            },
            {
                id: 48,
                question: "安卓应用的文件格式是什么？",
                options: [
                    "A. .exe",
                    "B. .apk",
                    "C. .deb",
                    "D. .rpm"
                ],
                answer: 1,
                explanation: "APK（Android Package）是安卓应用的安装包格式，包含应用的代码、资源和清单文件。"
            },
            {
                id: 49,
                question: "安卓中用于低内存时杀进程的机制是？",
                options: [
                    "A. OOM Killer",
                    "B. Low Memory Killer",
                    "C. Memory Manager",
                    "D. Process Terminator"
                ],
                answer: 1,
                explanation: "Low Memory Killer 是安卓特有的内核机制，当系统内存不足时，会根据进程的优先级（oom_adj）杀死低优先级的进程。"
            },
            {
                id: 50,
                question: "Content Provider 在安卓中的作用是什么？",
                options: [
                    "A. 提供网络连接",
                    "B. 实现跨应用的数据共享",
                    "C. 管理应用生命周期",
                    "D. 显示界面"
                ],
                answer: 1,
                explanation: "Content Provider 是安卓四大组件之一，用于在不同应用之间共享数据，如通讯录、媒体库等。"
            }
        ]
    }
};

// 模块顺序
const MODULE_ORDER = ["linux-env", "architecture", "c-programming", "kernel", "android"];
