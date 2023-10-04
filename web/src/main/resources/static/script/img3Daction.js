"use strict";
const set3DactionImg = async (ele, dir) => {
    const getEle = document.querySelector(`${ele}`);
    const directoryPath = dir;

    try {
        const response = await fetch(`/api/files/list?directoryPath=${encodeURIComponent(directoryPath)}`);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching the file list:', error);
    }
}



set3DactionImg('.box_1', 'H:/0_akgi/github/akgi/web/src/main/resources/static/images/banner/banner_3d_1');
set3DactionImg('.box_2', 'H:/0_akgi/github/akgi/web/src/main/resources/static/images/banner/banner_3d_2');