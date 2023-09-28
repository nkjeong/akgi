"use strict";

let categoryNumbers = []; // 전역 변수로 설정

const fetchJSON = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
};

const setCategory = (categories) => {
    const mainNavigationElement = document.querySelector('section.mainNav ul');
    
    const categoryNumbers = categories.map(category => ({
        "code": category.code, 
        "name": category.name
    })); // 전역 변수에 값을 할당
    setCategoryNumber(categoryNumbers);//카테고리 상품 진열
    const html = categories.map(category => `
        <li>
            <article>${category.name}</article>
            <article class="subMenu" data-code="${category.code}">
                <ul></ul>
            </article>
        </li>
    `).join('');

    mainNavigationElement.innerHTML = html;
    setSubMenus(mainNavigationElement);
};

const setSubMenus = (element) => {
    const subMenuElements = element.querySelectorAll('article.subMenu');
    subMenuElements.forEach(subMenuElement => {
        updateSubMenu(subMenuElement.dataset.code, subMenuElement);
    });
};

const updateSubMenu = async (categoryCode, subMenuElement) => {
    const categories = await fetchJSON(`/categoryone/category/${categoryCode}`);
    const ulElement = subMenuElement.querySelector('ul');
    
    ulElement.innerHTML = categories.map(category => `<li>${category.name}</li>`).join('');
    if (categories.length === 0) {
        ulElement.parentNode.style.display = 'none';
    }
};

// Fetch and set categories on page load.
(async () => {
    try {
        const categories = await fetchJSON('/categories');
        setCategory(categories);
    } catch (error) {
        console.error('Fetch error:', error);
    }
})();

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
