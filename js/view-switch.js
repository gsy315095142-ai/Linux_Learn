/**
 * 视图切换脚本
 */

let isMobileView = true;

function toggleView() {
    isMobileView = !isMobileView;
    const body = document.body;
    const btn = document.getElementById('viewSwitchBtn');
    
    if (isMobileView) {
        body.classList.remove('desktop-view');
        body.classList.add('mobile-view');
        btn.innerHTML = '<span class="view-icon">📱</span><span class="view-text">手机版</span>';
    } else {
        body.classList.remove('mobile-view');
        body.classList.add('desktop-view');
        btn.innerHTML = '<span class="view-icon">🖥️</span><span class="view-text">网页版</span>';
    }
    
    localStorage.setItem('viewPreference', isMobileView ? 'mobile' : 'desktop');
}

// 页面加载时恢复偏好
document.addEventListener('DOMContentLoaded', function() {
    const preference = localStorage.getItem('viewPreference');
    if (preference === 'desktop') {
        toggleView();
    }
    
    // 高亮当前页面的底部导航
    const currentPath = window.location.pathname;
    const bottomNavLinks = document.querySelectorAll('.mobile-bottom-nav a');
    bottomNavLinks.forEach(link => {
        link.classList.remove('active');
        if (currentPath.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
});
