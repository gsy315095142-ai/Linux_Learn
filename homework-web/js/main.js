/**
 * Linux 系统编程学习 - 主脚本
 */

// 存储键名
const STORAGE_KEY = 'linux-programming-progress';

// 模块列表
const MODULES = [
    { id: 'linux-env', name: '熟悉 Linux 环境', file: 'linux-env.html' },
    { id: 'architecture', name: 'Linux 整体结构', file: 'architecture.html' },
    { id: 'c-programming', name: 'C 语言编程', file: 'c-programming.html' },
    { id: 'kernel', name: '内核核心模块', file: 'kernel.html' },
    { id: 'android', name: '安卓与 Linux', file: 'android.html' }
];

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initProgress();
    initCodeCopy();
    initCodeHighlight();
});

/**
 * 初始化进度显示
 */
function initProgress() {
    const progress = getProgress();
    const completedCount = Object.values(progress).filter(v => v).length;
    
    // 更新首页进度
    const countEl = document.getElementById('completed-count');
    const fillEl = document.querySelector('.progress-fill');
    
    if (countEl) {
        countEl.textContent = completedCount;
    }
    
    if (fillEl) {
        const percentage = (completedCount / MODULES.length) * 100;
        fillEl.style.width = percentage + '%';
    }
    
    // 更新导航状态
    updateNavState();
}

/**
 * 获取学习进度
 */
function getProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

/**
 * 保存学习进度
 */
function saveProgress(moduleId) {
    const progress = getProgress();
    progress[moduleId] = true;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    initProgress();
}

/**
 * 更新导航状态
 */
function updateNavState() {
    const progress = getProgress();
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href.includes(currentPage)) {
            link.classList.add('active');
        }
        
        // 标记已完成的模块
        MODULES.forEach(module => {
            if (href.includes(module.id) && progress[module.id]) {
                link.classList.add('completed');
            }
        });
    });
}

/**
 * 复制代码功能
 */
function initCodeCopy() {
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('code');
            
            navigator.clipboard.writeText(code.textContent).then(() => {
                const originalText = this.textContent;
                this.textContent = '已复制!';
                this.style.background = '#10b981';
                this.style.borderColor = '#10b981';
                this.style.color = 'white';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                    this.style.borderColor = '';
                    this.style.color = '';
                }, 2000);
            });
        });
    });
}

/**
 * 简单的代码高亮
 */
function initCodeHighlight() {
    document.querySelectorAll('.code-block code').forEach(block => {
        let code = block.innerHTML;
        
        // 高亮关键字
        const keywords = ['int', 'char', 'void', 'if', 'else', 'while', 'for', 'return', 
                          'struct', 'typedef', 'const', 'static', 'extern', 'NULL', 'size_t',
                          'pid_t', 'FILE', 'ssize_t', 'off_t'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
            code = code.replace(regex, '<span style="color: #c678dd;">$1</span>');
        });
        
        // 高亮函数调用
        code = code.replace(/\b([a-z_][a-z0-9_]*)\s*\(/gi, '<span style="color: #61afef;">$1</span>(');
        
        // 高亮字符串
        code = code.replace(/"([^"]*)"/g, '<span style="color: #98c379;">"$1"</span>');
        
        // 高亮单行注释
        code = code.replace(/(\/\/.*)/g, '<span style="color: #5c6370; font-style: italic;">$1</span>');
        
        // 高亮预处理指令
        code = code.replace(/(#include\s*&lt;.*?&gt;)/g, '<span style="color: #e5c07b;">$1</span>');
        code = code.replace(/(#include\s*".*?")/g, '<span style="color: #e5c07b;">$1</span>');
        code = code.replace(/(#define\s+\w+)/g, '<span style="color: #e5c07b;">$1</span>');
        
        // 高亮数字
        code = code.replace(/\b(\d+)\b/g, '<span style="color: #d19a66;">$1</span>');
        
        block.innerHTML = code;
    });
}

/**
 * 标记当前模块为已完成
 */
function markCompleted(moduleId) {
    saveProgress(moduleId);
    showNotification('✅ 学习进度已保存！');
}

/**
 * 显示通知
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * 切换标签页
 */
function showTab(tabGroup, tabId) {
    // 隐藏所有标签页内容
    const panes = document.querySelectorAll(`[data-tab-group="${tabGroup}"]`);
    panes.forEach(pane => pane.classList.remove('active'));
    
    // 移除所有按钮的 active 状态
    const buttons = document.querySelectorAll(`[data-tab-btn="${tabGroup}"]`);
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // 显示选中的标签页
    const activePane = document.getElementById(tabId);
    if (activePane) {
        activePane.classList.add('active');
    }
    
    // 高亮选中的按钮
    event.target.classList.add('active');
}

/**
 * 平滑滚动到元素
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const offset = 80;
        const top = element.offsetTop - offset;
        window.scrollTo({
            top: top,
            behavior: 'smooth'
        });
    }
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 控制台欢迎信息
console.log('%c🐧 Linux 系统编程学习指南', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%c从基础到内核，图文并茂的系统化学习', 'font-size: 14px; color: #94a3b8;');
