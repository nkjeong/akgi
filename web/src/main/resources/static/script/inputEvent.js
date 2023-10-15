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

class PasswordValidator {
    constructor(passwordSelector1, passwordSelector2, feedbackSelector, statusSelector) {
        this.password1Element = document.querySelector(passwordSelector1);
        this.password2Element = document.querySelector(passwordSelector2);
        this.feedbackElement = document.querySelector(feedbackSelector);
        this.statusElement = document.querySelector(statusSelector);
        this.addEventListeners();
    }
    hasSpecialChar(value) {
        const specialChars = ['!', '@', '#', '%', '_'];
        return specialChars.some(char => value.includes(char));
    }
    validatePasswords() {
        const pwd1 = this.password1Element.value;
        const pwd2 = this.password2Element.value;
        if (pwd1.trim().length === 0 || pwd2.trim().length === 0) {
            this.feedbackElement.textContent = '동일한 비밀번호를 입력하세요';
            this.statusElement.value = 'NO';
            return;
        }
        if (pwd1 !== pwd2) {
            this.feedbackElement.textContent = '동일한 비밀번호를 입력하세요';
            this.statusElement.value = 'NO';
            return;
        }
        if (!this.hasSpecialChar(pwd1)) {
            this.feedbackElement.textContent = `"!, @, #, %, _" 중에 1자 이상 포함하세요`;
            this.statusElement.value = 'NO';
            return;
        }
        this.feedbackElement.textContent = '비밀번호가 일치 합니다.';
        this.statusElement.value = 'YES';
    }
    addEventListeners() {
        [this.password1Element, this.password2Element].forEach(passwordInput => {
            passwordInput.addEventListener('keyup', () => {
                if (passwordInput.value.length < 10) {
                    this.feedbackElement.textContent = '비밀번호를 10자 이상 입력해 주세요';
                    this.statusElement.value = 'NO';
                } else {
                    this.validatePasswords();
                }
            });
        });
    }
}

const validator = new PasswordValidator('.userPw', '.userPwRe', '.ckPassword', '.ckPwd');
