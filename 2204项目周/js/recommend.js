const oRecommendImg = document.querySelector('.recommend_img');
setList2();
async function setList2() {

    await goodsList().then(res => {
        const { status, list } = res;
        if (status) {
            let html = '';
            console.log(list);
            list.forEach(v => {
                const { goodsId, goodsName, goodsPrice, goodsImg } = v;
                html += `
                <li>
            <a href="./detail.html?id=${goodsId}" ><img
                    src="${goodsImg}"
                    alt=""></a>
            <p class="title">${goodsName}</p>
            <p class="price">
                ${goodsPrice}
            </p>
        </li> 
                `
                oRecommendImg.innerHTML = html;
            });
        }
    })
}