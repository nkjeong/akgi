"use strict";

const getCategoryItem = (categoryPrefix, name) => {
	const listTitle = document.querySelector('.listCategory .listTitle span.itemSize');
	fetch(`/api/gallery/category/${categoryPrefix}`)
		.then(response => {
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			return response.json();
		})
		.then(data => {
			listTitle.innerHTML = `
				<b>${name}(${data.length}개)</b>
			`;
			setList(data);
		})
		.catch(error => {
			console.log('There was a problem with the fetch operation:', error.message);
		});
}

const setList = (data) => {
	console.log(data)
	const categoryList = document.querySelector('.listCategory .itemList');
	let html = '';
	let itemSize = 0;
	if(data.length < 6){
		itemSize = data.length;
	}else{
		itemSize = 6;
	}
	for(let i = 0 ; i < itemSize ; i++){
		let itemName = data[i].name;
		if(itemName.length > 10){
			itemName = itemName.substring(0, 11)+'...';
		}
		html += `
			<section>
				<article><img src="/images/1000/gransen_${data[i].code}.jpg"></article>
				<article>${itemName}</article>
				<article>${getCurrentMony(data[i].price)}</article>
			</section>
		`;
	}
	categoryList.innerHTML = html;
}

const setCategoryNumber = (categoryNumbers) => {
	const number = getRandomNumber(1, categoryNumbers.length);
	const code = categoryNumbers[number-1].code;
	const name = categoryNumbers[number-1].name;
	getCategoryItem(code, name);
}