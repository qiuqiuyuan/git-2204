
const oBtn = document.querySelector(".search_btn");
const oGoodsList = document.querySelector(".goodsList");
const oAsc = document.querySelector('.asc');
const oDesc = document.querySelector('.desc');
let keyWord = document.querySelector("input");
const intoCart=document.querySelector('.cart');
setList3();
// oAsc.addEventListener("click", async function () {
//  await sort({sort:asc}).then(res=>{
// const { status,list } = res;
// if (status) {
//   let html = '';
//   list.forEach(v => {
//     const { goodsId, goodsName, goodsImg, goodsPrice } = v;
//     html += `
//     <li>
       
//       <a href="./detail.html?id=${goodsId}" ><img
//               src="${goodsImg}"
//               alt=""></a>
//       <p class="title1">${goodsName}</p>
//       <p class="price1">
//           ${goodsPrice}
//       </p>
//   </li>
//   `
//     oGoodsList.innerHTML = html;
//   });
// }
//  })
// });

// oDesc.addEventListener("click",async function () {
//  await sort({sort:desc}).then(res=>{
//   const { status,list } = res;
//   if (status) {

//     let html = '';
//     list.forEach(v => {
//       const { goodsId, goodsName, goodsImg, goodsPrice } = v;
//       html += `
//       <li> 
//         <a href="./detail.html?id=${goodsId}" ><img
//                 src="${goodsImg}"
//                 alt=""></a>
//         <p class="title1">${goodsName}</p>
//         <p class="price1">
//             ${goodsPrice}
//         </p>
//     </li>
//       `
//       oGoodsList.innerHTML = html;
//     });
//   }
//  })
// });



// oBtn.onclick = function () {

//   kw = keyWord.value.trim();

//   setList3();
// };


async function setList3() {
  let kw = "";
  kw = queryString("kw");
 await goodsList({kw}).then(res=>{
   console.log(res);
  const { status:status, list:list } = res;
  console.log(status, list);
  if (status) {
    let html = '';
    list.forEach(v => {
      const { goodsId, goodsName, goodsImg, goodsPrice } = v;
      html += `
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
      oGoodsList.innerHTML = html;
    });
  }
 })
 
}

intoCart.onclick=function(){
  const user = getCookie("lgc");
  if(user){
    location.href='./shoppingCar.html';
  }
}