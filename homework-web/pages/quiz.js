/**
 * 测验逻辑脚本
 */

// 状态变量
let currentModuleIndex = 0;
let currentQuestionIndex = 0;
let userAnswers = {};      // 存储用户答案 { questionId: optionIndex }
let isSubmitted = false;

const QUESTIONS_PER_MODULE = 10;  // 每个模块10道题
const TOTAL_QUESTIONS = 50;       // 总共50道题
const POINTS_PER_QUESTION = 2;    // 每题2分

/**
 * 初始化测验
 */
function initQuiz() {
    currentModuleIndex = 0;
    currentQuestionIndex = 0;
    userAnswers = {};
    isSubmitted = false;
    
    // 重置模块状态显示
    for (let i = 0; i < 5; i++) {
        const statusEl = document.getElementById(`status-${i}`);
        if (statusEl) {
            statusEl.textContent = '';
            statusEl.className = 'status';
        }
    }
    
    // 显示测验区域
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-section').style.display = 'block';
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('review-section').style.display = 'none';
    
    // 更新模块按钮状态
    updateModuleButtons();
    
    // 显示第一题
    displayQuestion();
}

/**
 * 开始测验
 */
function startQuiz() {
    initQuiz();
}

/**
 * 获取当前模块
 */
function getCurrentModule() {
    const moduleKey = MODULE_ORDER[currentModuleIndex];
    return QUIZ_DATA[moduleKey];
}

/**
 * 获取当前题目
 */
function getCurrentQuestion() {
    const module = getCurrentModule();
    return module.questions[currentQuestionIndex];
}

/**
 * 显示题目
 */
function displayQuestion() {
    const module = getCurrentModule();
    const question = getCurrentQuestion();
    
    // 更新进度信息
    document.getElementById('current-module').textContent = 
        `模块 ${currentModuleIndex + 1}/5: ${module.name}`;
    document.getElementById('current-question').textContent = 
        `题目 ${currentQuestionIndex + 1}/${QUESTIONS_PER_MODULE}`;
    
    // 更新进度条
    const totalQuestions = currentModuleIndex * QUESTIONS_PER_MODULE + currentQuestionIndex + 1;
    const progress = (totalQuestions / TOTAL_QUESTIONS) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    
    // 更新题目信息
    document.getElementById('q-number').textContent = `Q${question.id}`;
    document.getElementById('q-module').textContent = module.icon + ' ' + module.name;
    document.getElementById('q-text').textContent = question.question;
    
    // 生成选项
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionEl = document.createElement('div');
        optionEl.className = 'option-item';
        optionEl.dataset.index = index;
        
        // 检查是否已选择
        if (userAnswers[question.id] === index) {
            optionEl.classList.add('selected');
        }
        
        // 如果已提交，显示正确/错误状态
        if (isSubmitted) {
            if (index === question.answer) {
                optionEl.classList.add('correct');
            } else if (userAnswers[question.id] === index) {
                optionEl.classList.add('wrong');
            }
        }
        
        optionEl.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option.substring(3)}</span>
        `;
        
        if (!isSubmitted) {
            optionEl.onclick = () => selectOption(index);
        }
        
        optionsList.appendChild(optionEl);
    });
    
    // 更新导航按钮
    updateNavigationButtons();
}

/**
 * 选择选项
 */
function selectOption(index) {
    if (isSubmitted) return;
    
    const question = getCurrentQuestion();
    userAnswers[question.id] = index;
    
    // 更新选项显示
    const options = document.querySelectorAll('.option-item');
    options.forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === index) {
            opt.classList.add('selected');
        }
    });
    
    // 更新模块状态
    updateModuleButtons();
}

/**
 * 上一题
 */
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
    } else if (currentModuleIndex > 0) {
        currentModuleIndex--;
        currentQuestionIndex = QUESTIONS_PER_MODULE - 1;
    }
    
    updateModuleButtons();
    displayQuestion();
}

/**
 * 下一题
 */
function nextQuestion() {
    if (currentQuestionIndex < QUESTIONS_PER_MODULE - 1) {
        currentQuestionIndex++;
    } else if (currentModuleIndex < 4) {
        currentModuleIndex++;
        currentQuestionIndex = 0;
    }
    
    updateModuleButtons();
    displayQuestion();
}

/**
 * 切换模块
 */
function switchModule(index) {
    if (index === currentModuleIndex) return;
    
    currentModuleIndex = index;
    currentQuestionIndex = 0;
    
    updateModuleButtons();
    displayQuestion();
}

/**
 * 更新导航按钮状态
 */
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    
    // 上一题按钮
    if (currentModuleIndex === 0 && currentQuestionIndex === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }
    
    // 下一题/提交按钮
    if (currentModuleIndex === 4 && currentQuestionIndex === QUESTIONS_PER_MODULE - 1) {
        nextBtn.style.display = 'none';
        if (!isSubmitted) {
            submitBtn.style.display = 'block';
        } else {
            submitBtn.style.display = 'none';
        }
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

/**
 * 更新模块按钮状态
 */
function updateModuleButtons() {
    const buttons = document.querySelectorAll('.module-btn');
    
    buttons.forEach((btn, index) => {
        btn.classList.remove('active', 'completed');
        
        if (index === currentModuleIndex) {
            btn.classList.add('active');
        }
        
        // 检查该模块是否已答完
        const moduleKey = MODULE_ORDER[index];
        const module = QUIZ_DATA[moduleKey];
        const answeredCount = module.questions.filter(q => 
            userAnswers[q.id] !== undefined
        ).length;
        
        const statusEl = document.getElementById(`status-${index}`);
        if (statusEl) {
            if (answeredCount === QUESTIONS_PER_MODULE) {
                statusEl.textContent = '✓';
                statusEl.className = 'status completed';
                btn.classList.add('completed');
            } else if (answeredCount > 0) {
                statusEl.textContent = `${answeredCount}/${QUESTIONS_PER_MODULE}`;
                statusEl.className = 'status partial';
            } else {
                statusEl.textContent = '';
                statusEl.className = 'status';
            }
        }
    });
}

/**
 * 提交测验
 */
function submitQuiz() {
    // 检查是否答完所有题
    const answeredCount = Object.keys(userAnswers).length;
    if (answeredCount < TOTAL_QUESTIONS) {
        const unanswered = TOTAL_QUESTIONS - answeredCount;
        if (!confirm(`还有 ${unanswered} 道题未作答，确定要提交吗？`)) {
            return;
        }
    }
    
    isSubmitted = true;
    
    // 计算成绩
    const result = calculateScore();
    
    // 显示结果
    showResult(result);
}

/**
 * 计算成绩
 */
function calculateScore() {
    let totalScore = 0;
    const moduleScores = {};
    
    MODULE_ORDER.forEach(moduleKey => {
        const module = QUIZ_DATA[moduleKey];
        let correctCount = 0;
        
        module.questions.forEach(q => {
            if (userAnswers[q.id] === q.answer) {
                correctCount++;
                totalScore += POINTS_PER_QUESTION;
            }
        });
        
        moduleScores[moduleKey] = {
            name: module.name,
            icon: module.icon,
            correct: correctCount,
            total: QUESTIONS_PER_MODULE,
            score: correctCount * POINTS_PER_QUESTION
        };
    });
    
    return {
        totalScore,
        moduleScores
    };
}

/**
 * 显示结果
 */
function showResult(result) {
    // 隐藏测验区域
    document.getElementById('quiz-section').style.display = 'none';
    
    // 显示结果区域
    const resultSection = document.getElementById('result-section');
    resultSection.style.display = 'block';
    
    // 更新分数显示
    const scoreNumber = document.getElementById('score-number');
    const scoreCircle = document.getElementById('score-circle');
    const resultTitle = document.getElementById('result-title');
    const resultMessage = document.getElementById('result-message');
    
    // 动画显示分数
    let currentScore = 0;
    const targetScore = result.totalScore;
    const duration = 1000;
    const increment = targetScore / (duration / 16);
    
    const animateScore = () => {
        currentScore += increment;
        if (currentScore >= targetScore) {
            currentScore = targetScore;
            scoreNumber.textContent = Math.round(currentScore);
        } else {
            scoreNumber.textContent = Math.round(currentScore);
            requestAnimationFrame(animateScore);
        }
    };
    
    animateScore();
    
    // 设置分数圆圈颜色
    if (targetScore >= 80) {
        scoreCircle.className = 'score-circle excellent';
        resultTitle.textContent = '🎉 优秀！';
        resultMessage.textContent = '你对 Linux 系统编程有很好的理解！';
    } else if (targetScore >= 60) {
        scoreCircle.className = 'score-circle good';
        resultTitle.textContent = '👍 不错！';
        resultMessage.textContent = '继续努力，你已经掌握了大部分知识点。';
    } else if (targetScore >= 40) {
        scoreCircle.className = 'score-circle fair';
        resultTitle.textContent = '💪 加油！';
        resultMessage.textContent = '建议重新学习相关章节，巩固基础知识。';
    } else {
        scoreCircle.className = 'score-circle poor';
        resultTitle.textContent = '📚 需要努力';
        resultMessage.textContent = '建议从头开始学习，打好基础很重要。';
    }
    
    // 显示模块得分
    const moduleScoresEl = document.getElementById('module-scores');
    moduleScoresEl.innerHTML = '';
    
    Object.entries(result.moduleScores).forEach(([key, data]) => {
        const scoreCard = document.createElement('div');
        scoreCard.className = 'module-score-card';
        scoreCard.innerHTML = `
            <div class="module-info">
                <span class="module-icon">${data.icon}</span>
                <span class="module-name">${data.name}</span>
            </div>
            <div class="module-result">
                <span class="correct-count">${data.correct}/${data.total}</span>
                <span class="module-points">${data.score}分</span>
            </div>
        `;
        moduleScoresEl.appendChild(scoreCard);
    });
    
    // 保存结果到 localStorage
    saveQuizResult(result);
}

/**
 * 保存测验结果
 */
function saveQuizResult(result) {
    const record = {
        date: new Date().toISOString(),
        score: result.totalScore,
        answers: userAnswers
    };
    
    let history = JSON.parse(localStorage.getItem('quiz-history') || '[]');
    history.push(record);
    
    // 只保留最近 10 次记录
    if (history.length > 10) {
        history = history.slice(-10);
    }
    
    localStorage.setItem('quiz-history', JSON.stringify(history));
}

/**
 * 查看解析
 */
function reviewAnswers() {
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('review-section').style.display = 'block';
    
    const reviewContent = document.getElementById('review-content');
    reviewContent.innerHTML = '';
    
    MODULE_ORDER.forEach(moduleKey => {
        const module = QUIZ_DATA[moduleKey];
        
        const moduleSection = document.createElement('div');
        moduleSection.className = 'review-module';
        moduleSection.innerHTML = `<h3 class="review-module-title">${module.icon} ${module.name}</h3>`;
        
        module.questions.forEach(q => {
            const userAnswer = userAnswers[q.id];
            const isCorrect = userAnswer === q.answer;
            
            const questionReview = document.createElement('div');
            questionReview.className = `review-question ${isCorrect ? 'correct' : 'wrong'}`;
            questionReview.innerHTML = `
                <div class="review-q-header">
                    <span class="review-q-status">${isCorrect ? '✓' : '✗'}</span>
                    <span class="review-q-number">Q${q.id}</span>
                </div>
                <div class="review-q-text">${q.question}</div>
                <div class="review-q-options">
                    ${q.options.map((opt, i) => `
                        <div class="review-option ${i === q.answer ? 'answer' : ''} ${userAnswer === i && i !== q.answer ? 'user-wrong' : ''}">
                            <span class="option-letter">${String.fromCharCode(65 + i)}</span>
                            <span>${opt.substring(3)}</span>
                            ${i === q.answer ? '<span class="badge correct-badge">正确答案</span>' : ''}
                            ${userAnswer === i && i !== q.answer ? '<span class="badge wrong-badge">你的答案</span>' : ''}
                        </div>
                    `).join('')}
                </div>
                <div class="review-explanation">
                    <strong>解析：</strong>${q.explanation}
                </div>
            `;
            
            moduleSection.appendChild(questionReview);
        });
        
        reviewContent.appendChild(moduleSection);
    });
}

/**
 * 返回结果页
 */
function backToResult() {
    document.getElementById('review-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
}

/**
 * 重新测验
 */
function retryQuiz() {
    if (confirm('确定要重新开始测验吗？当前答题记录将被清除。')) {
        initQuiz();
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 添加导航链接
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && !navLinks.querySelector('a[href="quiz.html"]')) {
        const quizLink = document.createElement('li');
        quizLink.innerHTML = '<a href="pages/quiz.html">测验</a>';
        navLinks.appendChild(quizLink);
    }
});
