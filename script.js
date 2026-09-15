// Mobile view toggle button
const navToggle = document.querySelector('.nav-toggle');
const mainNavbar = document.querySelector('.main-navbar');

navToggle.addEventListener('click', () => {
    const isOpen = mainNavbar.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
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
s

const menuData = [
    {id: 1, name: "Adobo", category: "main-course", price: 150, image: "imgs/filipino-adobo.webp", description: "Mga hiwa ng manok na pinalambot sa pinaghalong suka, toyo, maraming bawang, paminta, at dahon ng laurel. Dahan-dahang iniluluto sa mahinang apoy hanggang sa kumapit at magmamantika ang masarap na sarsa."},
    {id: 2, name: "Sinigang", category: "main-course", price: 180, image: "imgs/sinigang.webp", description: "Malalambot na hiwa ng kasim o liempo ng baboy na nakalubog sa maasim at mainit na sabaw ng sampalok. May kasamang mga sariwang gulay tulad ng kangkong, labanos, sitaw, talong, at siling haba."},
    {id: 3, name: "Humba", category: "main-course", price: 200, image: "imgs/humba.webp", description: "Malalambot na hiwa ng baboy na niluto sa pinaghalong toyo, suka, bawang, at asukal. May kasamang mga sangkap tulad ng pinya, itlog, at paminta. Ang humba ay kilala sa kanyang matamis at malinamnam na lasa."},
    {id: 4, name: "Halo-Halo", category: "desserts", price: 120, image: "imgs/halo_halo.jpg"},
    {id: 5, name: "Turon", category: "desserts", price: 80, image: "imgs/turon.jpg"},
    {id: 6, name: "Lumpia", category: "appetizers", price: 100, image: "imgs/lumpia.jpg"},
    {id: 7, name: "Calamares", category: "appetizers", price: 150, image: "imgs/calamares.jpg"},
    {id: 8, name: "Buko Juice", category: "beverages", price: 60, image: "imgs/buko_juice.jpg"},
    {id: 9, name: "Sago't Gulaman", category: "beverages", price: 70, image: "imgs/sagot_gulaman.jpg"}
    //change this content
];

const menuGrid = document.getElementById('menuGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderMenuItems(items) {
    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <p class="menu-title">${item.name}</p>
            <p class="description">${item.description}</p>
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