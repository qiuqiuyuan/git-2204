const oUser = document.querySelector('#user');
const oPwd = document.querySelector("#pwd");
const oBtn = document.querySelector('#btn');

oBtn.addEventListener('click', async function () {
    const user = oUser.value.trim();
    const pwd = oPwd.value.trim();
    let date = new Date();
    date.setDate(date.getDate() + 1);
    if (user && pwd) {
        await loginApi({ user, pwd }).then(res => {
            const { status } = res;
            if (status) {
                document.cookie = `lgc=${user}; expires=" +${date}+ ";path=/`;
                location.href = '../html/index.html';
            }
        })
    }
})