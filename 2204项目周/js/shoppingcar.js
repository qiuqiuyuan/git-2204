const oDelAll = document.querySelector("#deleteAll");
const user = getCookie("lgc");
let oOnes;

let countIpt;
let oPrice;
let oSubtotal;
let oTotal = document.querySelector("#priceTotal");
let oSelectedTotal = document.querySelector("#selectedTotal");
let checkAll = document.querySelector(".check-all");

setList();
 async function setList() {
  if (user) {
   await showShoppingCar({user}).then(res=>{
    let html = "";
    const { list } = res;
   
    list.forEach((v) => {
      html += `
<tr data-id="${v.cartId}">
  <td class="checkbox"><input class="check-one check" type="checkbox" /></td>
  <td class="goods"><img src="${v.goodsImg}" alt="" /><span>${
        v.goodsName
      }</span></td>
  <td class="price">${v.goodsPrice}</td>
  <td class="count">
<span class="reduce" onclick="reduce('${v.cartId}',this)">${
        v.buyNum > 1 ? "-" : ""
      }</span>
      <input class="count-input" type="text" value="${v.buyNum}" />
      <span class="add" onclick="add('${v.cartId}',this)">+</span>
  </td>
  <td class="subtotal">${(v.goodsPrice * v.buyNum).toFixed(2)}</td>
  <td class="operation"><span class="delete" onclick="del('${
    v.cartId
  }' , this)">删除</span></td>
</tr>
`;

      let oTbody = document.querySelector("tbody");
      oTbody.innerHTML = html;
      oOnes = document.querySelectorAll(".check-one");
      countIpt = document.querySelector(".count-input");
      oPrice = document.querySelector(".price");
      oSubtotal = document.querySelector(".subtotal");
      checkAll.onclick = function () {
        let status = this.checked;
        for (let i = 0; i < oOnes.length; i++) {
          let checkOne = oOnes[i];
          checkOne.checked = status;
        }
        getTotal();
      };
      for (let i = 0; i < oOnes.length; i++) {
        let checkOne = oOnes[i];
        checkOne.onclick = function () {
          // 点击单选  =>  判断所有的单选是否都选中
          var flag = true; //假设全部被选中
          for (let j = 0; j < oOnes.length; j++) {
            var each = oOnes[j];
            if (!each.checked) {
              // !each.checked==true =>  each.checked == false
              flag = false;
              break;
            }
          }
          console.log(flag);
          checkAll.checked = flag;
          getTotal();
        };
      }
    });
   })
  }
}


async function del(id, obj) {
 await dele({id}).then(res=>{
  const { status } = data;
  if (status) {
    setList();
  }
 })
  getTotal();
}

oDelAll.onclick =async function () {
  // console.log(1);
  // 判断单选
  for (let i = 0; i < oOnes.length; i++) {
    console.log(oOnes);
    if (oOnes[i].checked) {
      const id = oOnes[i].parentNode.parentNode.getAttribute("data-id");
      // 删除成功
      console.log(id);
      oOnes[i].parentNode.parentNode.remove();

      // 判断是否全部删除了  oOnes.length  来判断
      await dele({id}).then(res=>{
        const { status} = res;
        if (status) {
          console.log("删除成功");
          // DOM会有卡顿   先直接删除
          //    oOnes[i].parentNode.parentNode.remove() ;
        } else {
          alert("服务器错误");
        }
       })
    }
  }
  getTotal();
};


 async function add(id, that) {
  // that.previousElementSibling.value++;

  that.previousElementSibling.value++;
  const buyNum = that.previousElementSibling.value;
  let price = prev(parent(that)).innerText;

  console.log(price);
  const subTotalPrice = buyNum * 1 * (price * 1);
  that.parentNode.nextElementSibling.innerText = subTotalPrice.toFixed(2);
  // console.log(subTotalPrice);
  // console.log(price);

  // console.log(id);
  // console.log(buyNum);

  await count({ id, buyNum, subTotalPrice }).then();
  getTotal();
}
//减少件数
 async function reduce(id, that) {
  const rduNum=(next(that).value)*1;
  console.log(rduNum);
  if(rduNum<=1){
    alert("亲,不能在少了!")
    return false;
  }
  
  that.nextElementSibling.value--;
  const buyNum = that.nextElementSibling.value;
  let price = prev(parent(that)).innerText;
  const subTotalPrice = buyNum * 1 * (price * 1);
  that.parentNode.nextElementSibling.innerText = subTotalPrice.toFixed(2);
  // console.log(subTotalPrice);
  // console.log(price);
  // console.log(id);
  // console.log(buyNum);
   await count({ id, buyNum, subTotalPrice }).then();
  getTotal();
}



function getTotal(){
    // 找到所有选中状态的单选框 => 数量和小计 =>累加
    var sum = 0;
    var allPrice = 0;
    for (var j = 0; j < oOnes.length; j++) {
        var checkOne = oOnes[j];
        if (checkOne.checked) {
            // console.log(checkOne);
            var tr = parent(parent(checkOne));
            var countInp = tr.getElementsByClassName("count-input")[0];
            var subtotalTd = tr.getElementsByClassName("subtotal")[0];

            var num = countInp.value * 1;
            var subtotal = subtotalTd.innerText * 1;
            sum += num;
            allPrice += subtotal;

        }
    }
    oSelectedTotal.innerText = sum;
    oTotal.innerText = allPrice.toFixed(2);
}
function parent(ele) {
  return ele.parentElement || ele.parentNode;
}
function prev(ele) {
  return ele.previousElementSibling || ele.previousSibling;
}
function next(ele) {
  return ele.nextElementSibling || ele.nextSibling;
}