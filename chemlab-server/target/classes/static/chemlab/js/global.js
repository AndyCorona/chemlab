/**
 *  创建 ajax 对象，响应报文以 json 格式处理
 * @param method ajax 对象发送的 HTTP 请求方法，若为 post 请求方法，会模拟表单提交
 * @param url ajax 对象请求的 URL
 * @param data ajax 对象发送的数据
 * @param async 请求是否异步
 * @returns {XMLHttpRequest}
 */
function ajax(method, url, data) {

    //创建 xhr 对象
    let xhr = new XMLHttpRequest();
    //设置浏览器处理 json 响应文本
    xhr.responseType = "json";
    xhr.open(method, url, true);

    //若 HTTP 请求方法为 post，设置 Content-Type 请求头，模拟表单提交
    switch (method) {
        case "post":
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        default:
            break;
    }

    xhr.send(data);
    return xhr;
}


/**
 *  绑定 ajax readystatechange 事件，当服务器返回 [200,300] || 304 响应码后，执行第一个回调函数，否则执行第二个回调函数
 *  @param ajax 绑定事件的 ajax 对象
 * @param okFun [200,300] || 304 响应码执行的回调函数
 * @param errorFun 剩余响应码执行的回调函数
 */
function ajaxFunctions(ajax, okFun, errorFun) {

    ajax.addEventListener("readystatechange", (event) => {
        if (ajax.readyState === 4) {
            //成功调到接口
            if (ajax.status >= 200 && ajax.status <= 300 || ajax.status === 304) {
                //接口返回 200
                if (ajax.response.code === 200) {
                    okFun();
                } else {
                    errorFun();
                }
            } else {
                alert("无法连接到服务器")
            }
        }
    })
}

/**
 *  序列化表单
 * @param form 要序列化的表单
 * @returns {string} 表单序列化后的字符串
 */
function serialize(form) {

    //用于保存表单数据
    let parts = [];


    let optValue;

    //遍表单元素
    for (let field of form.elements) {

        //判断表单元素类型
        switch (field.type) {

            //多选框有单选和多选的情况
            case "select-one":
            case "select-multiple":

                //表单元素必须有 name 属性
                if (field.name.length) {

                    //遍历多选框按钮
                    for (let option of field.options) {

                        //获取被选中的多选框 value 属性值
                        if (option.selected) {

                            //支持 hasAttribute() 的浏览器
                            if (option.hasAttribute) {

                                //获取选中项的 value 属性值，若不存在 value 属性值，获取选中项文本
                                optValue = (option.hasAttribute("value") ? option.value : option.text);

                                //IE8 及之前的浏览器用 value 的 specified 属性
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value : option.text);
                            }

                            //数组中存放序列化后的 name-value 键值对
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue)
                            );
                        }
                    }
                }
                break;


            case undefined: // 字段集
            case "file": // 文件输入
            case "submit": // 提交按钮
            case "reset": // 重置按钮
            case "button": // 自定义按钮

                //以上五种表单元素无需序列化
                break;

            case "radio": // 单选按钮
            case "checkbox": // 复选框

                //未被选中的无需序列化
                if (!field.checked) {
                    break;
                }
            default:
                // 不包含没有 name 属性的表单字段
                if (field.name.length) {
                    parts.push(`${encodeURIComponent(field.name)}=` + `${encodeURIComponent(field.value)}`);
                }
        }
    }
    return parts.join("&");
}

//发送的 axios 请求，对响应结果进行拦截
axios.interceptors.response.use(success => {
    //若成功调用后端接口，放行
    return success
}, error => {
    //若无法调用后端接口，返回失败信息
    alert("请检查网络，无法连接到服务器")
    return
})




// 版本一：
function random1() { // 生成10-12位不等的字符串
    return Math.random().toString(36).slice(2); // 截取小数点后的字符串
}

// 版本二：
function random2(n) { // 生成6位长度的字符串
    return (~~(Math.random() * (1 << 30))).toString(36); // "<<"操作相当于乘上2的n次方，"~~"相当于parseInt
}

// 版本三
function random4(n) { // 生成n位长度的字符串
    return function (n, s) {
        if (n === 1) return s;
        return random(n - 1, (~~(Math.random() * 36)).toString(36) + s);
    }(n, (~~(Math.random() * 36)).toString(36));
}

// 版本四：
function random5(n) { // 生成n位长度的字符串
    let str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
    let result = "";
    for (let i = 0; i < n; i++) {
        result += str[parseInt(Math.random() * str.length)];
    }
    return result;
}

