"use strict";
const itemsMoreBtn = document.querySelectorAll('.fa-arrow-up-right-from-square');
itemsMoreBtn.forEach(btns => {
	btns.addEventListener('click', (btn)=>{
		const mode = btn.currentTarget.dataset.mode;
		openMoreBack(mode);
	});
});
const openMoreBack = (mode) => {
	document.body.style.overflowY = 'hidden';
	document.body.style.paddingRight = '8px';
	const moreBack = document.createElement('section');
	moreBack.classList.remove('fadeOut');
    moreBack.classList.add('moreBack', 'fadeIn');
	let setTitle;
	if(mode == 'category'){
		setTitle = 'Category Items';
	}else{
		setTitle = 'All Items';
	}
	moreBack.innerHTML = `
		<section>
			${setTitle}
		</section>
		<section>
		</section>
	`;
	document.body.appendChild(moreBack);
	
	moreBack.addEventListener('click', btn => {
		moreBack.classList.remove('fadeIn');
    	moreBack.classList.add('fadeOut');
	});
	moreBack.addEventListener('animationend', (event) => {
	    if(event.animationName === 'fadeIn') {
	        moreBack.classList.remove('fadeIn');
	    } else if(event.animationName === 'fadeOut') {
	        document.body.removeChild(moreBack);
	        document.body.removeAttribute('style');
	    }
	});
}