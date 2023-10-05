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
    let code = item.code;
    return `
        <section class="item" data-code="${code}" data-name="${item.name}" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
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
			itemDetailView(btn.currentTarget);
		});
	})
}

const setCategoryNumber = (categoryNumbers) => {
    const number = getRandomNumber(1, categoryNumbers.length);
    const { code, name } = categoryNumbers[number - 1];
    getCategoryItem(code, name);
}

const itemDetailView = (ele) => {
	const itemName = ele.dataset.name;
	const code = ele.dataset.code;
	const offcanvas = document.querySelector('div.offcanvas.offcanvas-start');
	const offcanvasExampleLabel = offcanvas.querySelector('#offcanvasExampleLabel');
	const representativeImage = offcanvas.querySelector('.offcanvas.offcanvas-start .offcanvas-body>div>section:first-child');
	const itemInfomation = offcanvas.querySelector('.offcanvas.offcanvas-start .offcanvas-body>div>section:last-child');
	offcanvasExampleLabel.innerText = itemName;
	representativeImage.innerHTML = `
		<img src="/images/1000/gransen_${code}.jpg">
	`;
	itemInfomation.innerHTML = `
		<section>
			<article>정상가</article>
			<article></article>
		</section>
		<section>
			<article>공급가</article>
			<article></article>
		</section>
		<section>
			<article>원산지</article>
			<article></article>
		</section>
		<section>
			<article>모델명</article>
			<article></article>
		</section>
		<section>
			<article>옵 션</article>
			<article></article>
		</section>
	`;
}