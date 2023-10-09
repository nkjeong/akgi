"use strict";
const input = document.querySelectorAll('input');

input.forEach(inp => {
	inp.addEventListener('focus', (field) =>{
		field.currentTarget.style.backgroundColor = `#2c2c2c`;
	});
	inp.addEventListener('blur', (field) =>{
		field.currentTarget.style.backgroundColor = `#111111`;
	});
});