/**
 * 过滤敏感字符输入
 * @param char
 * @return {boolean}
 */
function filter(expression, char) {
    return expression.test(char);
}

/**
 *
 * @param img
 * @param text
 */
function invalid(img, text) {
    img.src = "chemlab/img/index/uncheck.png";
    img.nextElementSibling.innerHTML = text;
    img.nextElementSibling.style.display = "inline";
    return false
}

/**
 *
 * @param img
 */
function valid(img) {
    img.src = "chemlab/img/index/check.png";
    img.nextElementSibling.style.display = "none";
    return true;
}

function userNameValidate(imageElement, username, async = true) {
    //用户名为空，用户名不符号正则表达式，只允许 1-20个特定给字符
    if (!filter(/^[0-9a-zA-Z]{1,20}$/, username)) {
        return invalid(imageElement, "无效的用户名")
    }
    //向数据库获取用户名，看是否存在同名
    axios.get(`/index/username/${username}`, {})
        .then(function (response) {
            if (response.data.code === 200) {
                valid(imageElement)
            } else {
                invalid(imageElement, response.data.message)
            }
        })
}

function emailValidate(imageElement, email, async = true) {
    //邮箱不符号正则表达式，只允许英文字母、数字、下划线、英文句号、以及中划线组成
    if (!filter(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, email)) {
        invalid(imageElement, "无效的邮箱")
        return
    }

    //向数据库获取邮箱，看是否存在同名
    axios.get(`/index/email/${email}`, {})
        .then(function (response) {
            if (response.data.code === 200) {
                valid(imageElement)
            } else {
                invalid(imageElement, response.data.message)
            }
        })
}

function passwordValidate(imageElement, password) {
    //密码不符号正则表达式，只允许 6-20个特定给字符
    if (!filter(/^[0-9a-zA-Z@.!#$%^_=+;:]{6,20}$/, password)) {
        return invalid(imageElement, "无效的密码")
    }
    return valid(imageElement)
}

function confirmValidate(imageElement, confirmPassword, password) {
    //看是否和上一次密码相同
    if (confirmPassword !== password || confirmPassword === "") {
        return invalid(imageElement, "密码不一致")
    }
    return valid(imageElement)

}

//注册页面脚本
window.onload = function () {
    let signupForm = document.forms.item(0);
    let usernameEle = signupForm.querySelector("#userName");
    let emailEle = signupForm.querySelector("#email");
    let passwordEle = signupForm.querySelector("#password");
    let secondaryConfirmationEle = signupForm.querySelector("#secondaryConfirmation");
    let password;
    let signupButton = signupForm.querySelector("button[name='signup']");
    //用户输入过滤
    signupForm.addEventListener("input", (event) => {
        //对用户名、邮件、密码的输入过滤
        switch (event.target.id) {
            case 'userName':
                if (!filter(/^[0-9a-zA-Z]+$/, event.data)) {
                    event.target.value = event.target.value.replaceAll(/[^0-9a-zA-Z]+/g, "");
                }
                break
            case 'email':
                if (!filter(/^[0-9a-zA-Z@.]+$/, event.data)) {
                    event.target.value = event.target.value.replaceAll(/[^0-9a-zA-Z@.]+/g, "");
                }
                break
            case 'password':
                if (!filter(/^[0-9a-zA-Z@.!#$%^_=+;:]+$/, event.data)) {
                    event.target.value = event.target.value.replaceAll(/[^0-9a-zA-Z@.!#$%^_=+;:]+/g, "");
                }
                break
            case 'secondaryConfirmation':
                if (!filter(/^[0-9a-zA-Z@.!#$%^_=+;:]+$/, event.data)) {
                    event.target.value = event.target.value.replaceAll(/[^0-9a-zA-Z@.!#$%^_=+;:]+/g, "");
                }
        }
    })

    //用户名校验
    usernameEle.addEventListener("blur", (event) => {
            let imageElement = usernameEle.previousElementSibling.querySelector("img");
            let username = usernameEle.value;
            userNameValidate(imageElement, username);
        }
    )
    //邮箱校验
    emailEle.addEventListener("blur", (event) => {
        let imageElement = emailEle.previousElementSibling.querySelector("img");
        let email = emailEle.value;
        emailValidate(imageElement, email);
    })
    //密码校验
    passwordEle.addEventListener("blur", (event) => {
        let imageElement = passwordEle.previousElementSibling.querySelector("img");
        password = passwordEle.value;
        passwordValidate(imageElement, password);
    })
    //密码再次校验
    secondaryConfirmationEle.addEventListener("blur", (event) => {
        let imageElement = secondaryConfirmationEle.previousElementSibling.querySelector("img");
        let confirmPassword = secondaryConfirmationEle.value;
        confirmValidate(imageElement, confirmPassword, password);
    })

    signupButton.addEventListener("click", (event) => {
        event.preventDefault();
        let inputEles = signupForm.getElementsByTagName("input");
        let usernameElement = inputEles[0]
        let emailElement = inputEles[1]
        let passwordElement = inputEles[2]
        let confirmElement = inputEles[3]
        let imageElement = usernameElement.previousElementSibling.querySelector("img");
        let value = usernameElement.value;

        //用户名校验
        if (!filter(/^[0-9a-zA-Z]{1,20}$/, value)) {
            invalid(imageElement, "无效的用户名")
            return
        }
        //向数据库获取用户名，看是否存在同名
        let xhr = new XMLHttpRequest();
        //取消异步请求，用同步请求
        xhr.open("get", `/index/username/${value}`, false);
        xhr.send(null);
        //获取查询结果
        if (JSON.parse(xhr.response).code === 200) {
            valid(imageElement);
        } else {
            const temp = JSON.parse(xhr.response)
            invalid(imageElement, temp.message)
            return;
        }

        imageElement = emailElement.previousElementSibling.querySelector("img");
        value = emailElement.value;
        //邮箱校验
        //邮箱不符号正则表达式，只允许英文字母、数字、下划线、英文句号、以及中划线组成
        if (!filter(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, value)) {
            invalid(imageElement, "无效的邮箱")
            return
        }
        //向数据库获取邮箱，看是否存在同名
        xhr = new XMLHttpRequest();
        //取消异步请求，用同步请求
        xhr.open("get", `/index/email/${value}`, false);
        xhr.send(null);
        //获取查询结果
        if (JSON.parse(xhr.response).code === 200) {
            valid(imageElement);
        } else {
            const temp = JSON.parse(xhr.response)
            invalid(imageElement, temp.message)
            return;
        }

        imageElement = passwordElement.previousElementSibling.querySelector("img");
        password = passwordElement.value;
        //密码校验
        if (!passwordValidate(imageElement, password)) {
            return;
        }
        imageElement = confirmElement.previousElementSibling.querySelector("img");
        value = confirmElement.value
        //二次密码校验
        if (!confirmValidate(imageElement, value, password)) {
            return;
        }
        signupForm.submit()
    })

}