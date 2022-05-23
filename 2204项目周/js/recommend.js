const oRecommendImg=document.querySelector('.recommend_img');
setList2();
function setList2(){
	ajax({
		type:'get',
		url:'../php/goodslist.php',
		success:res=>{
			const {status,list}=res;
			
			if(status){
				let html1='';
				list.forEach(v => {
					const{goodsId, goodsName, goodsPrice, goodsImg, goodsDetail}=v;
					html1+=`
					
					<li>
                <a href="./detail.html?id=${goodsId}" ><img
                        src="${goodsImg}"
                        alt=""></a>
                <p class="title1">${goodsName}</p>
                <p class="price1">
					${goodsPrice}
                </p>
            </li>
					
					`
					oRecommendImg.innerHTML=html1;
				});
			}
		}
	})
}