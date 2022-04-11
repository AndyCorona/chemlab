window.onload = function () {
    const projectNameContainer = document.querySelector("#projectName");
    //修改项目名字
    projectNameContainer.addEventListener("change", (event) => {
        const projectName = event.target.value;
        axios.post(`/user/project-name/${projectName}`).then(function (response) {
            if (response.data.code === 200) {
                //修改导航栏文件
                const navOl = document.querySelector(".breadcrumb");
                navOl.lastElementChild.firstElementChild.innerText = projectName;
            } else {
                //修改失败则弹窗提示
                popAutoCloseModal("修改失败", 1000);
            }
        })
    })

    const reactionCard = document.querySelector("#reactionCard");
    let timer;
    let currentPage = 1;
    let size = 6;
    const logoPrefix = "http://10.19.106.212:9876";
    //分页获取 reaction
    reactionCard.addEventListener("mousewheel", (event) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            currentPage++;
            axios.get(`/reaction/?currentPage=${currentPage}&size=${size}`).then(function (response) {
                //这里只能用 response.status！！！
                if (response.status === 200) {
                    let fragment = document.createDocumentFragment();
                    const arr = response.data.data;
                    if (arr.length > 0) {
                        arr.forEach((element, index, arr) => {
                            //创建一个反应的 html 标签
                            const divElement = document.createElement("div");
                            const pElement1 = document.createElement("p");
                            const pElement2 = document.createElement("p");
                            const pElement3 = document.createElement("p");
                            const spanElement1 = document.createElement("span");
                            const spanElement2 = document.createElement("span");
                            const spanElement3 = document.createElement("span");
                            const inputElement = document.createElement("input")

                            divElement.classList.add('row', 'g-0', 'd-flex', 'align-items-center');
                            pElement1.setAttribute('class', 'col-5');
                            pElement1.innerText = element.reactionName;
                            pElement2.setAttribute('class', 'col-2');
                            pElement2.innerText = element.reactionDate;
                            pElement3.classList.add('col-4', 'd-flex', 'align-items-center')

                            inputElement.setAttribute('type', 'checkbox')
                            inputElement.setAttribute('class', 'col-1')
                            inputElement.setAttribute('name', element.id)

                            spanElement1.innerText = element.tag1;
                            spanElement2.innerText = element.tag2;
                            spanElement3.innerText = element.tag3;

                            if (element.tag1 !== null) {
                                pElement3.appendChild(spanElement1)
                            }
                            if (element.tag2 !== null) {
                                pElement3.appendChild(spanElement2)
                            }
                            if (element.tag3 !== null) {
                                pElement3.appendChild(spanElement3)
                            }

                            divElement.appendChild(pElement1)
                            divElement.appendChild(pElement2)
                            divElement.appendChild(pElement3)
                            divElement.appendChild(inputElement)
                            fragment.appendChild(divElement);
                        })
                        reactionCard.appendChild(fragment);
                    }
                }
            })
        }, 250)
    })

    //用户查看反应
    reactionCard.addEventListener("click", (event) => {
        let reactionId;
        if (event.target instanceof HTMLSpanElement) {
            reactionId = event.target.parentNode.parentNode.querySelector("input").getAttribute("name")
        } else if (event.target instanceof HTMLParagraphElement) {
            reactionId = event.target.parentNode.querySelector("input").getAttribute("name")
        } else if (event.target instanceof HTMLInputElement) {
            return
        } else {
            return;
        }
        if (reactionId !== "") {
            axios.post(`/project/reaction/${reactionId}`).then(function (response) {
                if (response.data.code === 200) {
                    window.sessionStorage.removeItem("versionControl")
                    window.sessionStorage.removeItem("reactionForm")
                    //跳转到 reaction 页面，此时 session 中已经有了 reaction
                    window.location.href = "/user/project/reaction";
                } else {
                    //修改失败则弹窗提示
                    popAutoCloseModal("获取失败", 1000);
                }
            })
        }

    })

    //用户创建新反应
    document.querySelector("#newReaction").addEventListener("click", (event) => {
        axios.post(`/project/reaction/-1`).then(function (response) {
            if (response.data.code === 200) {
                //跳转到 reaction 页面，此时 session 中的 reaction 为 null
                window.sessionStorage.removeItem("versionControl")
                window.sessionStorage.removeItem("reactionForm")
                window.location.href = "/user/project/reaction";
            } else {
                //修改失败则弹窗提示
                popAutoCloseModal("无法新建反应", 1000);
            }
        })
    })
    //用户删除反应
    document.querySelector("#deleteReaction").addEventListener("click", (event) => {
        //保存选中的反应
        let arr = []
        //获取所有反应
        let allReactions = reactionCard.querySelectorAll("input");
        for (let i = 0; i < allReactions.length; i++) {
            //如果反应被选中，则加入保存选中反应的数组中
            if (allReactions[i].checked === true) {
                let reactionId = allReactions[i].getAttribute("name");
                //如果 id 不能转为数字，说明被修改过，不将此反应加入数组中
                if (parseInt(reactionId)) {
                    arr.push(parseInt(reactionId))
                }
            }
        }
        if (arr.length > 0) {
            popCloseModal(`确认删除所选中的反应？`, "deleteReaction", JSON.stringify(arr))
        }
    })

    //用户点击模态框确认按钮时
    const dialogCloseBtn = document.querySelector("#dialogClose button[type='submit']");
    dialogCloseBtn.addEventListener("click", (event) => {
        const name = event.target.getAttribute("name");
        const value = event.target.getAttribute("value");
        //用户确认删除反应
        if (name === 'deleteReaction') {
            console.log(JSON.stringify(value))
            axios.delete(`/reaction/${JSON.parse(value)}`).then(function (response) {
                if (response.data.code === 200) {
                    //删除成功则刷新页面
                    location.reload();
                } else {
                    //修改失败则弹窗提示
                    popAutoCloseModal("删除失败", 1000);
                }
            })
        }
    })
}