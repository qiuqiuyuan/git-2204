let kw = "";
const oBtn = document.querySelector(".search_btn");
const oGoodsList = document.querySelector(".goodsList");
const oAsc = document.querySelector('.asc');
const oDesc = document.querySelector('.desc');
let keyWord = document.querySelector("input");
const intoCart=document.querySelector('.cart');
kw = queryString("kw");
setList3();
oAsc.addEventListener("click", function () {
  ajax({
    type: "get",
    url: "../php/asc&desc.php",
    data: { sort: "asc" },
    success: (res) => {
      const { status, msg, list } = res;
      // console.log(list);

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
    },
  });
});

oDesc.addEventListener("click", function () {
  ajax({
    type: "get",
    url: "../php/asc&desc.php",
    data: { sort: "desc" },
    success: (res) => {
      const { status, msg, list } = res;
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
    },
  });
});



oBtn.onclick = function () {

  kw = keyWord.value.trim();

  setList3();
};
function setList3() {
  ajax({
    type: "get",
    url: "../php/goodslist.php",
    data: {
      kw,
    },
    success: (res) => {
      const { status, msg, list } = res;
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
    },
  });
}

intoCart.onclick=function(){
  const user = getCookie("lgc");
  if(user){
    location.href='./shoppingCar.html';
  }
}