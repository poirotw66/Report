
// NeoTrendHub Hugo Theme JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initializeTheme();
    initializeNavigation();
    initializeSearch();
    initializeScrollEffects();
    initializeAccessibility();
    initializeFilters();
    initializeTagCloud();
    initializeViewToggle();
    initializeLoadMore();
    initializeInteractiveCards();
});

// 主題切換功能
function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);

        // 更新主題圖標
        updateThemeIcon();
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark-theme');
    const lightIcon = document.querySelector('.theme-icon-light');
    const darkIcon = document.querySelector('.theme-icon-dark');

    if (lightIcon && darkIcon) {
        lightIcon.style.display = isDark ? 'none' : 'block';
        darkIcon.style.display = isDark ? 'block' : 'none';
    }
}

// 導航功能
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isExpanded = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');

            // 更新 ARIA 屬性
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.setAttribute('aria-label', isExpanded ? '開啟選單' : '關閉選單');
        });

        // 點擊外部關閉選單
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.setAttribute('aria-label', '開啟選單');
            }
        });
    }

    // 回到頂部按鈕
    const backToTop = document.querySelector('#back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 搜尋功能
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    const searchResults = document.querySelector('#search-results');

    if (searchInput) {
        let searchTimeout;

        searchInput.addEventListener('input', function(event) {
            clearTimeout(searchTimeout);
            const query = event.target.value.trim();

            if (query.length < 2) {
                hideSearchResults();
                return;
            }

            // 延遲搜尋以避免過多請求
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });

        // 按 Enter 鍵搜尋
        searchInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const query = event.target.value.trim();
                if (query.length >= 2) {
                    performSearch(query);
                }
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query.length >= 2) {
                performSearch(query);
            }
        });
    }
}

function performSearch(query) {
    // 這裡實作搜尋邏輯
    // 可以搜尋頁面標題、內容、標籤等
    console.log('搜尋查詢:', query);

    // 模擬搜尋結果（實際應用中應該從索引或 API 獲取）
    const mockResults = [
        { title: '深思考端側多模態大模型創新實踐', url: '/sessions/session-06738cfc/', excerpt: '關於邊緣智慧的深度解析...' },
        { title: 'AI 技術趨勢分析', url: '/trends/', excerpt: '最新的人工智慧發展趨勢...' }
    ];

    showSearchResults(mockResults, query);
}

function showSearchResults(results, query) {
    const searchResults = document.querySelector('#search-results');
    if (!searchResults) return;

    if (results.length === 0) {
        searchResults.innerHTML = `<div class="search-no-results">找不到與 "${query}" 相關的結果</div>`;
    } else {
        const resultsHTML = results.map(result => `
            <div class="search-result-item">
                <h4><a href="${result.url}">${highlightQuery(result.title, query)}</a></h4>
                <p>${highlightQuery(result.excerpt, query)}</p>
            </div>
        `).join('');

        searchResults.innerHTML = resultsHTML;
    }

    searchResults.classList.add('active');
}

function hideSearchResults() {
    const searchResults = document.querySelector('#search-results');
    if (searchResults) {
        searchResults.classList.remove('active');
    }
}

function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// 滾動效果
function initializeScrollEffects() {
    const backToTop = document.querySelector('#back-to-top');

    window.addEventListener('scroll', function() {
        // 顯示/隱藏回到頂部按鈕
        if (backToTop) {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // 導航欄滾動效果
        const header = document.querySelector('.site-header');
        if (header) {
            if (window.pageYOffset > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
}

// 無障礙功能
function initializeAccessibility() {
    // 鍵盤導航支援
    document.addEventListener('keydown', function(event) {
        // ESC 鍵關閉搜尋結果和選單
        if (event.key === 'Escape') {
            hideSearchResults();

            const navMenu = document.querySelector('.nav-menu');
            const navToggle = document.querySelector('.nav-toggle');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.focus();
                }
            }
        }
    });

    // 焦點管理
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    // 跳過連結（無障礙）
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = '跳到主要內容';
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// 工具函數
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 載入完成後的初始化
window.addEventListener('load', function() {
    // 移除載入動畫
    document.body.classList.add('loaded');

    // 預載入關鍵資源
    preloadCriticalResources();
});

function preloadCriticalResources() {
    // 預載入常用頁面
    const criticalLinks = [
        '/seminars/',
        '/categories/',
        '/tags/'
    ];

    criticalLinks.forEach(link => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'prefetch';
        linkElement.href = link;
        document.head.appendChild(linkElement);
    });
}

// 篩選功能
function initializeFilters() {
    const seminarFilter = document.querySelector('#seminar-filter');
    const categoryFilter = document.querySelector('#category-filter');
    const sortFilter = document.querySelector('#sort-filter');
    const resetButton = document.querySelector('#reset-filters');
    const reportsGrid = document.querySelector('#reports-grid');

    if (!reportsGrid) return;

    const originalReports = Array.from(reportsGrid.children);

    function applyFilters() {
        const seminarValue = seminarFilter?.value || '';
        const categoryValue = categoryFilter?.value || '';
        const sortValue = sortFilter?.value || 'date-desc';

        let filteredReports = originalReports.filter(report => {
            const seminar = report.dataset.seminar || '';
            const category = report.dataset.category || '';

            const seminarMatch = !seminarValue || seminar.includes(seminarValue);
            const categoryMatch = !categoryValue || category.includes(categoryValue);

            return seminarMatch && categoryMatch;
        });

        // 排序
        filteredReports.sort((a, b) => {
            switch (sortValue) {
                case 'date-desc':
                    return new Date(b.dataset.date) - new Date(a.dataset.date);
                case 'date-asc':
                    return new Date(a.dataset.date) - new Date(b.dataset.date);
                case 'title-asc':
                    return a.querySelector('.report-title a').textContent.localeCompare(
                        b.querySelector('.report-title a').textContent
                    );
                case 'title-desc':
                    return b.querySelector('.report-title a').textContent.localeCompare(
                        a.querySelector('.report-title a').textContent
                    );
                default:
                    return 0;
            }
        });

        // 清空並重新添加
        reportsGrid.innerHTML = '';
        filteredReports.forEach(report => {
            reportsGrid.appendChild(report);
        });

        // 添加動畫效果
        filteredReports.forEach((report, index) => {
            report.style.opacity = '0';
            report.style.transform = 'translateY(20px)';
            setTimeout(() => {
                report.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                report.style.opacity = '1';
                report.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // 事件監聽器
    seminarFilter?.addEventListener('change', applyFilters);
    categoryFilter?.addEventListener('change', applyFilters);
    sortFilter?.addEventListener('change', applyFilters);

    resetButton?.addEventListener('click', () => {
        if (seminarFilter) seminarFilter.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (sortFilter) sortFilter.value = 'date-desc';
        applyFilters();
    });
}

// 標籤雲篩選
function initializeTagCloud() {
    const tagFilterBtns = document.querySelectorAll('.tag-filter-btn');
    const tagCloudItems = document.querySelectorAll('.tag-cloud-item');

    tagFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新活動按鈕
            tagFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            tagCloudItems.forEach(item => {
                const tagText = item.textContent.toLowerCase();
                let shouldShow = true;

                if (filter !== 'all') {
                    switch (filter) {
                        case 'ai':
                            shouldShow = tagText.includes('ai') || tagText.includes('ml') ||
                                       tagText.includes('機器學習') || tagText.includes('深度學習');
                            break;
                        case 'tech':
                            shouldShow = tagText.includes('技術') || tagText.includes('開發') ||
                                       tagText.includes('程式') || tagText.includes('系統');
                            break;
                        case 'business':
                            shouldShow = tagText.includes('商業') || tagText.includes('市場') ||
                                       tagText.includes('策略') || tagText.includes('管理');
                            break;
                    }
                }

                if (shouldShow) {
                    item.style.display = 'inline-flex';
                    item.style.opacity = '1';
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        if (item.style.opacity === '0') {
                            item.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    });
}

// 視圖切換
function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const seminarsView = document.querySelector('#seminars-view');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const view = btn.dataset.view;

            if (seminarsView) {
                if (view === 'list') {
                    seminarsView.classList.add('list-view');
                    seminarsView.classList.remove('seminars-grid');
                } else {
                    seminarsView.classList.remove('list-view');
                    seminarsView.classList.add('seminars-grid');
                }
            }
        });
    });
}

// 載入更多功能
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('#load-more');
    const reportsGrid = document.querySelector('#reports-grid');

    if (!loadMoreBtn || !reportsGrid) return;

    let currentPage = 1;
    const itemsPerPage = 6;

    // 模擬更多報告數據（實際應用中應該從 API 獲取）
    const additionalReports = [
        // 這裡可以添加更多報告數據
    ];

    loadMoreBtn.addEventListener('click', () => {
        // 模擬載入延遲
        loadMoreBtn.textContent = '載入中...';
        loadMoreBtn.disabled = true;

        setTimeout(() => {
            // 這裡應該載入更多報告
            currentPage++;

            if (currentPage >= 3) { // 假設只有3頁
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.textContent = '載入更多報告';
                loadMoreBtn.disabled = false;
            }
        }, 1000);
    });
}

// 互動卡片效果
function initializeInteractiveCards() {
    const interactiveCards = document.querySelectorAll('.interactive-card');

    interactiveCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });

        // 點擊效果
        card.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A') {
                const link = card.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            }
        });
    });
}
        