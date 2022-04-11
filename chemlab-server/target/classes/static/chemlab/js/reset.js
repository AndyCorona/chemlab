function filter(expression, char) {
    return expression.test(char);
}

function valid(img) {
    img.src = "/chemlab/img/index/check.png";
    img.nextElementSibling.style.display = "none";
    return true;
}

function invalid(img, text) {
    img.src = "/chemlab/img/index/uncheck.png";
    img.nextElementSibling.innerHTML = text;
    img.nextElementSibling.style.display = "inline";
    return false
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

window.onload = function () {

    let resetForm = document.forms.item(0);
    let passwordEle = resetForm.querySelector("#password");
    let secondaryConfirmationEle = resetForm.querySelector("#secondaryConfirmation");
    let password;
    let resetButton = resetForm.querySelector("button[name='reset']");


    resetForm.addEventListener("input", (event) => {
        //对密码的输入过滤
        switch (event.target.id) {
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
    //密码校验
    passwordEle.addEventListener("blur", () => {
        let imageElement = passwordEle.previousElementSibling.querySelector("img");
        password = passwordEle.value;
        passwordValidate(imageElement, password);
    })
    //密码再次校验
    secondaryConfirmationEle.addEventListener("blur", () => {
        let imageElement = secondaryConfirmationEle.previousElementSibling.querySelector("img");
        let confirmPassword = secondaryConfirmationEle.value;
        confirmValidate(imageElement, confirmPassword, password);
    })

    resetButton.addEventListener("click", (event) => {
        event.preventDefault();

        let imageElement = passwordEle.previousElementSibling.querySelector("img");
        password = passwordEle.value;
        //密码校验
        if (!passwordValidate(imageElement, password)) {
            return;
        }
        imageElement = secondaryConfirmationEle.previousElementSibling.querySelector("img");
        let confirmPassword = secondaryConfirmationEle.value;
        //二次密码校验
        if (!confirmValidate(imageElement, confirmPassword, password)) {
            return;
        }

        axios.post("/index/reset", serialize(resetForm))
            .then(function (response) {
                if (response.data.code === 200) {
                    window.location.href="/";
                } else {
                    passwordEle.previousElementSibling.lastElementChild.style.display = 'inline';
                    passwordEle.previousElementSibling.lastElementChild.innerText = response.data.message;
                }
            })


    })
}