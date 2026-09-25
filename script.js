// Mobile view toggle button
const navToggle = document.querySelector('.nav-toggle');
const mainNavbar = document.querySelector('.main-navbar');
const hamMenu = document.querySelector('.ham-menu');

navToggle.addEventListener('click', () => {
    const isOpen = mainNavbar.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

//Menu button transition
hamMenu.addEventListener('click', () => {
    const navOpen = mainNavbar.classList.toggle('nav-open');
    hamMenu.classList.toggle('active');
    navOpen.classList.toggle('active');
});

let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 300);
});   

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const mainNavbar = document.querySelector('.main-navbar');
    
    navToggle.addEventListener('click', () => {
        const isOpen = mainNavbar.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', isOpen);
    });

    if (!header || !navToggle || !mainNavbar) return;

    const updateHeaderBackground = () => {
        if (mainNavbar.classList.contains('is-open')){
            header.classList.add('scrolled');
            return;
        }

        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled')
        }
    };

    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();

        mainNavbar.classList.toggle('is-open');

        updateHeaderBackground();
    });

    window.addEventListener('scroll', updateHeaderBackground, { passive: true});

    updateHeaderBackground();
});

const menuData = [
    {id: 1, name: "Adobong Manok", category: "main-course", price: 150, image: "assets/imgs/foods/chicken_adobo.webp", description: "Manok na inatado sa toyo, suka, bawang, at paminta hanggang sa mag-mantika."},
    {id: 2, name: "Sinigang na Baboy", category: "main-course", price: 180, image: "assets/imgs/foods/pork_sinigang.webp", description: "Maasim na sabaw ng kasim ng baboy na may kangkong, labanos, talong, at sili."},
    {id: 3, name: "Humba", category: "main-course", price: 200, image: "assets/imgs/foods/pork_humba.webp", description: "Malambot na liempo sa matamis-tamis na sabaw na may tausi, bulaklak ng saging, at itlog."},
    {id: 4, name: "Sisig na Baboy", category: "main-course", price: 200, image: "assets/imgs/foods/pork_sisig.webp", description: "Inihaw at tinadtad na mukha ng baboy at atay na may calamansi, sibuyas, sili, at biniyak na itlog sa ibabaw."},
    {id: 5, name: "Kare-kare", category: "main-course", price: 200, image: "assets/imgs/foods/beef_karekare.webp", description: "Malambot na baka at tuwalya na iniluto sa malasa sabaw ng mani kasama ang mga sariwang gulay, inihahain na may katambal na ginisang bagoong alamang."},
    {id: 6, name: "Ensaladang Talong", category: "appetizers", price: 120, image: "assets/imgs/foods/es_talong.webp", description: "Inihaw na talong na may kamatis, sibuyas, calamansi, at bagoong."},
    {id: 7, name: "Lumpiang Shanghai", category: "appetizers", price: 80, image: "assets/imgs/foods/lumpiang_shanghai.webp", description: "Muling pritong lumpiang baboy na may gulay at pampalasa, isinisilbi kasama ang matamis at maasim na saw-sawan."},
    {id: 8, name: "Espesyal na Palabok", category: "appetizers", price: 80, image: "assets/imgs/foods/palabok.webp", description: "Makapal na bihon na may malinamnam na sarsa ng hipon at atsuete, may ibabaw na chicharon, itlog, at sibuyas na mura."},
    {id: 9, name: "Tokwa&#39t Baboy", category: "appetizers", price: 80, image: "assets/imgs/foods/tokwaTbaboy.webp", description: "Makapal na bihon na may malinamnam na sarsa ng hipon at atsuete, may ibabaw na chicharon, itlog, at sibuyas na mura."},
    {id: 10, name: "Achara", category: "appetizers", price: 80, image: "assets/imgs/foods/achara.webp", description: "Atsarang papaya sa matamis na suka, carrots, at bell pepper."},    
    {id: 11, name: "Puto Bumbong at Bibingka", category: "desserts", price: 80, image: "assets/imgs/foods/pbbingka.webp", description: "Mula sa pugon na kakanin na may niyog, mantikilya, at muscovado."},
    {id: 12, name: "Leche flan", category: "desserts", price: 80, image: "assets/imgs/foods/leche_flan.webp", description: "Malambot at pino na caramel custard."},
    {id: 13, name: "Sago&#39t gulaman", category: "desserts", price: 80, image: "assets/imgs/foods/sagot-gulaman.webp", description: "Malamig na arnibal na may pandan, sago, at gulaman."},
    {id: 14, name: "Sariwang kalamansi at pipino", category: "beverages", price: 80, image: "assets/imgs/foods/kalamansi.webp", description: "Piniga na kalamansi na may hiniwang pipino at honey."},
    {id: 15, name: "Buko pandan", category: "beverages", price: 80, image: "assets/imgs/foods/buko_pandan.webp", description: "Sabaw ng buko na may kayod na buko, gulaman na pandan, at gatas."}
    
    //change this content
];

const menuGrid = document.getElementById('menuGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderMenuItems(items) {
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img class="menu-photo" src="${item.image}" alt="${item.name}" loading="lazy">
            <p class="menu-title">${item.name}</p>
            <p class="menu-desc">${item.description}</p>
            <p class="menu-price">${item.price}</p>
        </div>
    `).join("");
}

function setUpFilterListeners() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const selectedCategory = button.getAttribute('data-filter');

            const menuItems = document.querySelectorAll('.menu-item');

            menuItems.forEach(item => { 
                const itemCategory = item.getAttribute('data-category');
                let count = 0;

                if (selectedCategory === 'all' || itemCategory === selectedCategory) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
}

renderMenuItems(menuData);
setUpFilterListeners();

const btns = document.querySelectorAll('.tab-btn');
const tabs = document.querySelectorAll('.content-tab');

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const dataItem = btn.getAttribute('data-target');

        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        tabs.forEach(tab => {
            const tabIndex = tab.getAttribute('data-index');

            if (tabIndex === dataItem){
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    });
});

//reservation form
function toggleModal(show) {
    const modal = document.getElementById('modalOverlay');
    modal.style.display = show ? 'flex' : 'none';
}

window.onclick = function(event) {
    const modal = this.document.getElementById('modalOverlay');
    if (event.target === modal) {
        toggleModal(false)
    }
};