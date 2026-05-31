// Данные о направлениях: теперь с ссылками на отдельные страницы
const directionsData = [
    {
        title: "ИСТОРИЯ ПОНЯТИЙ",
        link: "pages/istoriya-ponyatij.html"
    },
    {
        title: "МИКРОИСТОРИЯ",
        link: "pages/mikroistoriya.html"
    },
    {
        title: "НОВАЯ КУЛЬТУРНАЯ ИСТОРИЯ",
        link: "pages/novaya-kulturnaya-istoriya.html"
    },
    {
        title: "ГЕНДЕРНАЯ ИСТОРИЯ",
        link: "pages/gendernaya-istoriya.html"
    },
    {
        title: "ИНТЕЛЛЕКТУАЛЬНАЯ ИСТОРИЯ",
        link: "pages/intellektualnaya-istoriya.html"
    },
    {
        title: "ПОСТКОЛОНИАЛЬНАЯ ИСТОРИЯ",
        link: "pages/postkolonialnaya-istoriya.html"
    },
    {
        title: "ПОСТМОДЕРНИЗМ",
        link: "pages/postmodernizm.html"
    }
];

// Функция для генерации карточек на главной странице
function buildCards() {
    const grid = document.getElementById('cardsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    directionsData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'direction-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        
        const title = document.createElement('h3');
        title.textContent = item.title;
        
        const hint = document.createElement('div');
        hint.className = 'hover-hint';
        hint.textContent = 'нажми, чтобы узнать →';
        
        card.appendChild(title);
        card.appendChild(hint);
        
        // При клике переходим на страницу направления
        card.addEventListener('click', () => {
            window.location.href = item.link;
        });
        
        grid.appendChild(card);
        
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

// -------------------------------
// ПЛАВНАЯ СМЕНА ФОНА ПРИ СКРОЛЛЕ
// -------------------------------
const bgLayers = document.querySelectorAll('.bg-layer');

function updateBackgroundOnScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    
    const heroSection = document.querySelector('.hero');
    const directionsSection = document.querySelector('.directions');
    
    if (!heroSection || !directionsSection) return;
    
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    const directionsTop = directionsSection.offsetTop;
    
    const fadeStart = heroBottom - windowHeight * 0.3;
    const fadeEnd = directionsTop - windowHeight * 0.2;
    
    let progress = 0;
    
    if (scrollPosition <= fadeStart) {
        progress = 0;
    } else if (scrollPosition >= fadeEnd) {
        progress = 1;
    } else {
        progress = (scrollPosition - fadeStart) / (fadeEnd - fadeStart);
    }
    
    if (progress < 0.33) {
        bgLayers[0].classList.add('active');
        bgLayers[1].classList.remove('active');
        bgLayers[2].classList.remove('active');
    } else if (progress < 0.66) {
        bgLayers[0].classList.remove('active');
        bgLayers[1].classList.add('active');
        bgLayers[2].classList.remove('active');
    } else {
        bgLayers[0].classList.remove('active');
        bgLayers[1].classList.remove('active');
        bgLayers[2].classList.add('active');
    }
}

window.addEventListener('scroll', updateBackgroundOnScroll);
window.addEventListener('load', updateBackgroundOnScroll);
window.addEventListener('resize', updateBackgroundOnScroll);

document.addEventListener('DOMContentLoaded', () => {
    buildCards();
});