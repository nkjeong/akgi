"use strict";

const getCategoryItem = async (categoryPrefix, name) => {
    const listTitle = document.querySelector('.listCategory .listTitle span.itemSize');
    try {
		if(listTitle){
	        const response = await fetch(`/api/gallery/category/${categoryPrefix}`);
	        if (!response.ok) {
	            throw new Error('Network response was not ok');
	        }
	        const data = await response.json();
	        listTitle.innerHTML = `<b>${name}(${data.length}개)</b>`;
	        setList(data);
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error.message);
    }
    
}

const createItemHTML = (item) => {
    let itemName = item.name.length > 10 ? item.name.substring(0, 11) + '...' : item.name;
    let code = item.code;
    let itemString = JSON.stringify(item).replace(/"/g, '&quot;');
    return `
        <section class="item" data-item="${itemString}" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <article><img src="/images/1000/gransen_${code}.jpg"></article>
            <article>${itemName}</article>
            <article>${getCurrentMony(item.price)}</article>
        </section>
    `;
}

const setList = (data) => {
    const categoryList = document.querySelector('.listCategory .itemList');
    const itemsToShow = data.slice(0, Math.min(data.length, 6));
    categoryList.innerHTML = itemsToShow.map(createItemHTML).join('');
    
    const item = categoryList.querySelectorAll('section.item');
    item.forEach(btns=>{
		btns.addEventListener('click', btn => {
			itemDetailView(btn.currentTarget, data);
		});
	})
}

const setCategoryNumber = (categoryNumbers) => {
    const number = getRandomNumber(1, categoryNumbers.length);
    const { code, name } = categoryNumbers[number - 1];
    getCategoryItem(code, name);
}

const retrieveItemData = (ele) => {
    let itemString = ele.dataset.item.replace(/&quot;/g, '"');
    let item = JSON.parse(itemString);
    return item;
}

const getDetailImg = async (directoryPath, fileName) => {
	try {
        const response = await fetch(`/api/files/search?directoryPath=${encodeURIComponent(directoryPath)}&filename=${fileName}`);
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching the file list:', error);
    }
}

const itemDetailView = (ele) => {
    const { price, servicePrice, origin, itemNumber, size, name: itemName, code } = retrieveItemData(ele);
    
    const offcanvas = document.querySelector('div.offcanvas.offcanvas-start');
    const offcanvasBody = offcanvas.querySelector('.offcanvas-body');
    const offcanvasFirstDiv = offcanvasBody.querySelector('div:first-child');
    const offcanvasLastDiv = offcanvasBody.querySelector('div:last-child');
    
    const offcanvasExampleLabel = offcanvas.querySelector('#offcanvasExampleLabel');
    const representativeImage = offcanvasFirstDiv.querySelector('section:first-child');
    const itemInfomation = offcanvasFirstDiv.querySelector('section:last-child');
    const itemNameSection = offcanvasLastDiv.querySelector('section:first-child');
    const itemDetailSection = offcanvasLastDiv.querySelector('section:last-child');

    offcanvasExampleLabel.innerText = `${itemName} ${itemNumber}`;
    
    representativeImage.innerHTML = `<img src="/images/1000/gransen_${code}.jpg">`;
    
    const createInfoSection = (title, value) => `
        <section>
            <article>${title} :</article>
            <article>${value}</article>
        </section>
    `;

    itemInfomation.innerHTML = `
        ${createInfoSection('정상가', getCurrentMony(price))}
        ${createInfoSection('공급가', getCurrentMony(servicePrice))}
        ${createInfoSection('원산지', origin)}
        ${createInfoSection('모델명', itemNumber)}
        ${createInfoSection('사이즈', size)}
        ${createInfoSection('쇼핑몰', '')}
        ${createInfoSection('옵 션', '')}
        ${createInfoSection('코 드', code)}
    `;
	//getDetailImg('E:/gitakgi/akgi/web/src/main/resources/static/images/detail', `gransen_${code}.jpg`).then(data => {
	getDetailImg('H:/0_akgi/github/akgi/web/src/main/resources/static/images/detail', `gransen_${code}.jpg`).then(data => {
	    console.log(data);
	    itemNameSection.innerHTML = `<section>Detail View [${itemName}]</section>`;
	    let timestamp = new Date().getTime(); // 현재 타임스탬프
	    itemDetailSection.innerHTML = `<section><img src="/images/detail/${data}?t=${timestamp}"></section>`;
	});

}
