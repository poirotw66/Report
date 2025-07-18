
        // NeoTrendHub Hugo Theme JavaScript
        document.addEventListener('DOMContentLoaded', function() {
            // 初始化主題功能
            initializeTheme();
            initializeNavigation();
            initializeSearch();
            initializeSessionsPage();
            initializeTrendsPage();
        });

        function initializeTheme() {
            // 主題切換功能
            const themeToggle = document.querySelector('.theme-toggle');
            if (themeToggle) {
                themeToggle.addEventListener('click', toggleTheme);
            }
        }

        function initializeNavigation() {
            // 導航功能
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');

            if (navToggle && navMenu) {
                navToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                });
            }
        }

        function initializeSearch() {
            // 搜索功能
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.addEventListener('input', handleSearch);
            }
        }

        function toggleTheme() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        }

        function handleSearch(event) {
            const query = event.target.value.toLowerCase();
            // 實現搜索邏輯
            console.log('搜索查詢:', query);
        }

        // 會議頁面專用功能
        function initializeSessionsPage() {
            if (!document.querySelector('.sessions-page')) return;

            const searchInput = document.querySelector('#search-sessions');
            const categoryFilter = document.querySelector('#category-filter');
            const sortFilter = document.querySelector('#sort-sessions');
            const resetButton = document.querySelector('#reset-session-filters');
            const sessionsGrid = document.querySelector('#sessions-grid');
            const loadMoreBtn = document.querySelector('#load-more-sessions');

            if (!sessionsGrid) return;

            const originalSessions = Array.from(sessionsGrid.children);
            let currentPage = 1;
            const itemsPerPage = 6;

            function applySessionFilters() {
                const searchValue = searchInput?.value.toLowerCase() || '';
                const categoryValue = categoryFilter?.value || '';
                const sortValue = sortFilter?.value || 'title';

                let filteredSessions = originalSessions.filter(session => {
                    const title = session.querySelector('.session-title a').textContent.toLowerCase();
                    const category = session.dataset.category || '';
                    const excerpt = session.querySelector('.session-excerpt').textContent.toLowerCase();

                    const searchMatch = !searchValue || title.includes(searchValue) || excerpt.includes(searchValue);
                    const categoryMatch = !categoryValue || category === categoryValue;

                    return searchMatch && categoryMatch;
                });

                // 排序
                filteredSessions.sort((a, b) => {
                    switch (sortValue) {
                        case 'title':
                            return a.querySelector('.session-title a').textContent.localeCompare(
                                b.querySelector('.session-title a').textContent
                            );
                        case 'date':
                            return new Date(b.dataset.date) - new Date(a.dataset.date);
                        case 'relevance':
                            return 0;
                        default:
                            return 0;
                    }
                });

                // 清空並重新添加
                sessionsGrid.innerHTML = '';
                const visibleSessions = filteredSessions.slice(0, currentPage * itemsPerPage);
                visibleSessions.forEach((session, index) => {
                    sessionsGrid.appendChild(session);
                    session.style.opacity = '0';
                    session.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        session.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        session.style.opacity = '1';
                        session.style.transform = 'translateY(0)';
                    }, index * 50);
                });

                // 更新載入更多按鈕
                if (loadMoreBtn) {
                    const loadInfo = document.querySelector('.load-info');
                    if (filteredSessions.length > visibleSessions.length) {
                        loadMoreBtn.style.display = 'block';
                        if (loadInfo) {
                            loadInfo.textContent = `顯示 ${visibleSessions.length} / ${filteredSessions.length} 場會議`;
                        }
                    } else {
                        loadMoreBtn.style.display = 'none';
                        if (loadInfo) {
                            loadInfo.textContent = `共 ${filteredSessions.length} 場會議`;
                        }
                    }
                }
            }

            // 事件監聽器
            searchInput?.addEventListener('input', debounce(applySessionFilters, 300));
            categoryFilter?.addEventListener('change', applySessionFilters);
            sortFilter?.addEventListener('change', applySessionFilters);

            resetButton?.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                if (categoryFilter) categoryFilter.value = '';
                if (sortFilter) sortFilter.value = 'title';
                currentPage = 1;
                applySessionFilters();
            });

            loadMoreBtn?.addEventListener('click', () => {
                currentPage++;
                applySessionFilters();
            });

            // 初始化
            applySessionFilters();
        }

        // 趨勢頁面專用功能
        function initializeTrendsPage() {
            if (!document.querySelector('.trends-page')) return;

            // 趨勢卡片動畫
            const trendCards = document.querySelectorAll('.trend-card');

            // 使用 Intersection Observer 實現滾動動畫
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                });

                trendCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
                    observer.observe(card);
                });
            }

            // 熱度條動畫
            const heatBars = document.querySelectorAll('.heat-fill');
            setTimeout(() => {
                heatBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        bar.style.transition = 'width 1s ease';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    }, index * 200);
                });
            }, 500);

            // 關鍵字標籤互動
            const keywordTags = document.querySelectorAll('.keyword-tag');
            keywordTags.forEach(tag => {
                tag.addEventListener('click', () => {
                    const keyword = tag.textContent;
                    console.log('搜尋關鍵字:', keyword);
                });
            });
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
