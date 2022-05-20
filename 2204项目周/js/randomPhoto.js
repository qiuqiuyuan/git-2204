const  oCountdown_GL=document.querySelector('.countdown_GL');
setList1();
function setList1(){
    
    ajax({
        type:'get',
        url:'../php/goodslist.php',
        success:res=>{
            const {status,list}=res;
            if(status){
                 let html='';
				 console.log(list);
				list.forEach(v => {
					const{goodsId, goodsName, goodsPrice, goodsImg, goodsDetail}=v;
					html+=`
					
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
					
					
					oCountdown_GL.innerHTML=html;
				});
			 }
		 }
	 })
 }
