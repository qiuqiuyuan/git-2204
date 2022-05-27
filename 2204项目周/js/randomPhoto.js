const oCountdown_GL = document.querySelector('.countdown_GL');
setList1();
 function setList1() {
     goodsList().then(res => {
        const { status, list } = res;

        // console.log(status,list);
        if (status) {
            let html = '';
            console.log(list);
            list.forEach(v => {
                const {goodsName, goodsPrice, goodsImg } = v;
                html += `
    <li>
        <a href="" ><img
                src="${goodsImg}"
                alt=""></a>
        <p class="title">${goodsName}</p>
        <p class="price">
            ${goodsPrice}
        </p>
    </li>
            
            `
                oCountdown_GL.innerHTML = html;
            });
        }
    })
}
