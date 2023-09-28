"use strict";

const getCategory = async () => {
    try {
        const response = await fetch('/categories');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setCategory(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const setCategory = (data) => {
    const mainNavigationElement = document.querySelector('section.mainNav ul');
    const html = data.map(d => `
        <li>
            <article>${d.name}</article>
            <article class="subMenu" data-code="${d.code}">
                <ul></ul>
            </article>
        </li>
    `).join('');

    mainNavigationElement.innerHTML = html;
    setSubMenu(mainNavigationElement);
};

// Initiate the getCategory function
getCategory();

const setSubMenu = (element) => {
	const getSubMenuExpectedElement = element.querySelectorAll('article.subMenu');
	getSubMenuExpectedElement.forEach(ele => {
		subMenu(ele.dataset.code, ele);
	})
}

const getCategoriesByCategoryCode = async (categoryCode) => {
    try {
        const response = await fetch(`/categoryone/category/${categoryCode}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

const subMenu = async (categoryCode, ele) => {
    const categories = await getCategoriesByCategoryCode(categoryCode);
    const getSubMenuSetElement = ele.querySelector('ul');
    let html = '';
    categories.forEach(category => {
		html += `
			<li>${category.name}</li>
		`;
    });
    getSubMenuSetElement.innerHTML = html;
    if(categories.length == 0){
		getSubMenuSetElement.parentNode.style.display = 'none';
	}
};