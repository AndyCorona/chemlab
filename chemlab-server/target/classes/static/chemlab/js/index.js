window.onload = function () {
    let loginForm = document.forms.item(0);
    let usernameEle = loginForm.querySelector("#username");
    let passwordEle = loginForm.querySelector("#password");
    let loginBtn = loginForm.querySelector("button[name='login']");

    loginBtn.addEventListener("click", (event) => {
        event.preventDefault();
        let username = usernameEle.value;
        let password = passwordEle.value;

        //没有输入用户名或密码时
        if (username === "" || password === "") {
            usernameEle.previousElementSibling.firstElementChild.innerHTML = '请输入用户名或密码';
            usernameEle.previousElementSibling.firstElementChild.style.display = 'inline';
            return
        }

        axios.post("/index/login", serialize(loginForm))
            .then(function (response) {
                if (response.data.code === 200) {
                    usernameEle.previousElementSibling.firstElementChild.style.display = 'none';
                    //跳转到 user 模板页面
                    history.replaceState(null, null, '/user/')
                    window.location.href = '/user/';
                } else {
                    usernameEle.previousElementSibling.firstElementChild.style.display = 'inline';
                    usernameEle.previousElementSibling.firstElementChild.innerHTML = response.data.message;
                }
            })
    })
}
