"use strict";

const getCategoryItem = async (categoryPrefix, name) => {
    const listTitle = document.querySelector('.listCategory .listTitle span.itemSize');

    try {
        const response = await fetch(`/api/gallery/category/${categoryPrefix}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        listTitle.innerHTML = `<b>${name}(${data.length}개)</b>`;
        setList(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
}

const createItemHTML = (item) => {
    let itemName = item.name.length > 10 ? item.name.substring(0, 11) + '...' : item.name;
    return `
        <section>
            <article><img src="/images/1000/gransen_${item.code}.jpg"></article>
            <article>${itemName}</article>
            <article>${getCurrentMony(item.price)}</article>
        </section>
    `;
}

const setList = (data) => {
    const categoryList = document.querySelector('.listCategory .itemList');
    const itemsToShow = data.slice(0, Math.min(data.length, 6));
    categoryList.innerHTML = itemsToShow.map(createItemHTML).join('');
}

const setCategoryNumber = (categoryNumbers) => {
    const number = getRandomNumber(1, categoryNumbers.length);
    const { code, name } = categoryNumbers[number - 1];
    getCategoryItem(code, name);
}
