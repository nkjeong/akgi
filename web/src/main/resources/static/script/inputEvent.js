"use strict";
const input = document.querySelectorAll('input[type="text"], input[type="password"], input[type="email"]');

input.forEach(inp => {
	inp.addEventListener('focus', (field) =>{
		field.currentTarget.style.backgroundColor = `#2c2c2c`;
	});
	inp.addEventListener('blur', (field) =>{
		field.currentTarget.style.backgroundColor = `#111111`;
	});
});

const passwordIsEquals = (userPw, userPwRe, ckPassword, ckPwd) => {
	if(userPwRe.value != userPw.value){
		ckPassword.textContent = '비밀번호가 같아야 합니다.';
		ckPwd.value='NO';
	}else{
		ckPassword.textContent = '비밀번호가 일치 합니다.';
		ckPwd.value='YES';
	}
}

const checkPassword = () => {
	const userPw = document.querySelector('.userPw');
	const userPwRe = document.querySelector('.userPwRe');
	const ckPassword = document.querySelector('.ckPassword');
	const ckPwd = document.querySelector('.ckPwd');
	if(userPw && userPwRe && ckPassword){
		userPw.addEventListener('keyup', (pw)=>{
			let pwv = pw.target.value;
			if(pwv.length < 10){
				ckPwd.value='NO';
				ckPassword.textContent = '비밀번호를 10자 이상 입력해 주세요';
			}else{
				passwordIsEquals(userPw, userPwRe, ckPassword, ckPwd);
			}
		});
		
		userPw.addEventListener('blur', (pw)=>{
			let pwv = pw.target.value;
			const specialChars = ['!', '@', '#', '%', '_'];
		    if (pwv.trim().length == 0 || !specialChars.some(char => pwv.includes(char))) {
		        ckPassword.textContent = `"!, @, #, %, _" 중에 1자 이상 포함하세요`;
		        ckPwd.value='NO';
		        return;
		    }
		});
	}
}

checkPassword();