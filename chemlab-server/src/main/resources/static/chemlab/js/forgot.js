window.onload = function () {
    const forgotForm = document.forms.item(0);
    const randomCodeBtn = forgotForm.querySelector("button[name='randomCode']");
    const resetBtn = forgotForm.querySelector("button[name='reset']");
    const emailEle = forgotForm.querySelector("#email");
    const randomCodeEle = forgotForm.querySelector("#randomCode");

    resetBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (emailEle.value === "" || randomCodeEle.value === "") {
            emailEle.previousElementSibling.firstElementChild.innerHTML = "请输入邮箱和验证码"
            emailEle.previousElementSibling.firstElementChild.style.display = 'inline';
            return;
        }

        axios.post('/index/checkRandomCode', serialize(forgotForm))
            .then(function (response) {
                if (response.data.code === 200) {
                    forgotForm.submit();
                } else {
                    emailEle.previousElementSibling.firstElementChild.innerHTML = response.data.message;
                    emailEle.previousElementSibling.firstElementChild.style.display = 'inline';
                }
            })
    })

    //防止一直按按钮
    let count = 5;
    randomCodeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        if (emailEle.value === "") {
            emailEle.previousElementSibling.firstElementChild.innerHTML = "请输入邮箱"
            emailEle.previousElementSibling.firstElementChild.style.display = 'inline';
            return;
        }
        axios.post('/index/getRandomCode',
            serialize(forgotForm)
        ).then(function (response) {
            if (response.data.code === 200) {
                randomCodeBtn.style.cursor = 'no-drop';
                randomCodeBtn.setAttribute('disabled', 'disabled');
            } else {
                count--;
                if (count < 0) {
                    randomCodeBtn.style.cursor = 'no-drop';
                    randomCodeBtn.setAttribute('disabled', 'disabled');
                }
            }
            emailEle.previousElementSibling.firstElementChild.innerHTML = response.data.message;
            emailEle.previousElementSibling.firstElementChild.style.display = 'inline';
        })

    })


}