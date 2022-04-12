window.onload = function () {

    //用户更换头像
    const userLogoImg = document.querySelector("#userLogo");

    //用户更换描述
    const userDescEle = document.querySelector("#userDesc");


    //分页渲染用户项目
    const projectCard = document.querySelector("#projectCard");
    let timer;
    let currentPage = 1;
    let size = 6;
    let newProject = projectCard.querySelector("#newProject");
    const logoPrefix = "http://10.19.106.212:9876";
    projectCard.addEventListener("mousewheel", (event) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            currentPage++;
            axios.get(`/project/?currentPage=${currentPage}&size=${size}`).then(function (response) {
                //这里只能用 response.status！！！
                if (response.status === 200) {
                    let fragment = document.createDocumentFragment();
                    const arr = response.data.data;
                    if (arr.length > 0) {
                        arr.forEach((element, index, arr) => {
                            //创建一个项目 html 标签
                            const divElement1 = document.createElement("div");
                            const divElement2 = document.createElement("div");
                            const divElement3 = document.createElement("div");
                            const divElement4 = document.createElement("div");
                            const imageElement = document.createElement("img");
                            const labelElement = document.createElement("label");
                            const buttonElement = document.createElement("button");
                            const spanElement = document.createElement("span");
                            divElement1.setAttribute("class", "col-4 dropdown");
                            divElement1.setAttribute("cardbody", "cardbody");

                            spanElement.setAttribute("projectId", element.id.toString());
                            spanElement.style.display = "none";

                            imageElement.setAttribute("src", `${logoPrefix}${element.projectCoverUrl}`)

                            labelElement.innerText = element.projectName;

                            divElement2.setAttribute("class", "dropdown-content");
                            divElement3.setAttribute("class", "deleteProject");
                            divElement3.innerText = "Delete";
                            divElement4.setAttribute("class", "changeCover");
                            divElement4.innerText = "Change cover";

                            divElement2.appendChild(divElement3);
                            divElement2.appendChild(divElement4);

                            divElement1.appendChild(spanElement);
                            divElement1.appendChild(imageElement);
                            divElement1.appendChild(labelElement);
                            divElement1.appendChild(buttonElement);
                            divElement1.appendChild(divElement2);
                            fragment.appendChild(divElement1);
                        })
                        projectCard.insertBefore(fragment, newProject);
                    }
                }
            })
        }, 250)
    })

    //用户查看指定项目
    projectCard.addEventListener("click", (event) => {
            //用户新增项目
            if (event.target.id === 'newProject') {
                axios.put("/project/").then(function (response) {
                    if (response.data.code === 200) {
                        //跳转到 /user/project/路径下
                        history.replaceState(null, null, '/user/project/')
                        window.location.href = "/user/project/"
                    }
                })
                //用户打开修改图片模态框
            } else if (event.target.className === 'changeCover') {
                const projectCoverContainer = document.querySelector("#projectCoverContainer");
                console.log(projectCoverContainer)
                event.target.parentNode.parentNode.appendChild(projectCoverContainer);


                projectCoverContainer.style.display = 'block';
                //获取本地 storage，填充到历史记录中
                if (window.localStorage.getItem("recentCover") === null) {
                    const arr = [];
                    window.localStorage.setItem("recentCover", JSON.stringify(arr));
                } else {
                    const arr = JSON.parse(window.localStorage.getItem("recentCover"));
                    const fragment = document.createDocumentFragment();
                    arr.forEach((element, index, arr) => {
                        const imageElement = document.createElement("img");
                        imageElement.setAttribute("src", element.url);
                        imageElement.setAttribute("coverId", element.id);
                        fragment.appendChild(imageElement)
                    })
                    const recentContainer = projectCoverContainer.querySelector("#projectCoverRecentContainer");
                    recentContainer.innerHTML = "";
                    recentContainer.append(fragment);
                }
                setTimeout(() => {
                    projectCoverContainer.style.display = null;
                }, 100)
            }//用户删除项目
            else if (event.target.className === 'deleteProject') {
                const projectName = event.target.parentNode.parentNode.querySelector("label").innerText;
                const projectId = event.target.parentNode.parentNode.querySelector("span").getAttribute("projectId");
                popCloseModal(`确认删除项目${projectName}及其下的所有反应？`, "deleteProject", projectId)
            }//用户修改项目图片
            else if (event.target.getAttribute("for") === 'projectCoverGallery') {
                const projectCoverContainer = event.target.parentNode;
                //向后端请求数据，填充到图片中
                axios.get("/project-cover/").then(function (response) {
                    if (response.data.code === 200) {
                        const fragment = document.createDocumentFragment();
                        const arr = response.data.object;
                        arr.forEach((element, index, arr) => {
                            const imageElement = document.createElement("img");
                            imageElement.setAttribute("src", `${logoPrefix}${element.url}`)
                            imageElement.setAttribute("coverId", element.id);
                            fragment.appendChild(imageElement);
                        })
                        const divElement = document.createElement("div");
                        divElement.setAttribute("class", "projectCoverIconContainer");
                        divElement.append(fragment)
                        const projectCoverGallery = projectCoverContainer.querySelector('#projectCoverGallery');
                        projectCoverGallery.removeChild(projectCoverGallery.lastElementChild)
                        projectCoverGallery.append(divElement);
                    }
                })
                event.target.style.boxShadow = '0 0 0.4rem rgba(0,0,0,0.25)';
                event.target.nextElementSibling.style.boxShadow = 'none';
                event.target.nextElementSibling.nextElementSibling.style.display = 'block';
                event.target.nextElementSibling.nextElementSibling.nextElementSibling.style.display = 'none';
            } else if (event.target.getAttribute("for") === 'projectCoverUpload') {
                event.target.style.boxShadow = '0 0 0.4rem rgba(0,0,0,0.25)';
                event.target.previousElementSibling.style.boxShadow = 'none';
                event.target.nextElementSibling.style.display = 'none';
                event.target.nextElementSibling.nextElementSibling.style.display = 'block';
            } else if (event.target.getAttribute("coverId") !== null) {
                //向服务器发送请求，修改 session 中的用户指定项目的 projectCoverUrl 和数据库中的数据
                const coverId = event.target.getAttribute("coverId");
                const coverUrl = event.target.getAttribute("src");
                const projectCoverContainer = event.target.parentNode.parentNode.parentNode;
                const projectCover = projectCoverContainer.parentNode.querySelector("img");
                const projectId = projectCoverContainer.parentNode.firstElementChild.getAttribute("projectId");
                axios.post(`/user/project-cover/${projectId}/${coverId}`).then(function (response) {
                    if (response.data.code === 200) {
                        //修改成功则立即更换项目图片
                        projectCover.setAttribute("src", `${coverUrl}`)
                        //将历史记录保存到本地 storage 中
                        const coverArr = JSON.parse(window.localStorage.getItem("recentCover"));
                        if (coverArr.length > 2) {
                            coverArr.pop()
                        }
                        coverArr.unshift({url: coverUrl, id: coverId})
                        window.localStorage.setItem("recentCover", JSON.stringify(coverArr));
                        projectCoverContainer.style.display = "none";
                    } else {
                        //修改失败则弹窗提示
                        popAutoCloseModal("修改失败", 1000);
                    }
                })
            }//用户查看项目
            else if (event.target instanceof HTMLLabelElement || event.target instanceof HTMLImageElement) {
                const projectId = event.target.parentNode.firstElementChild.getAttribute("projectId");
                axios.post(`/project/${projectId}`).then(function (response) {
                    console.log(response)
                    if (response.data.code === 200) {
                        //跳转到 /user/project/路径下
                        history.replaceState(null, null, '/user/project/')
                        window.location.href = "/user/project/"
                    }
                })
            }
        }
    )

    //修改用户描述
    let userDesc = document.querySelector("#userDesc");
    userDesc.addEventListener("blur", (event) => {
        const desc = userDesc.innerText;
        axios.post(`/user/desc/${desc}`).then(function (response) {
            if (response.data.code === 200) {
            } else {
                //修改失败则弹窗提示
                popAutoCloseModal("修改失败", 1000);
            }
        })
    })

    let logoDropdown = document.querySelector('#logoDropdown');
    let logoContainer = logoDropdown.querySelector("#logoContainer");
    let emojiContainer = logoContainer.querySelector("#emoji");
    let uploadContainer = logoContainer.querySelector("#upload");

    //点击修改用户头像
    logoDropdown.addEventListener("click", (event) => {
        if (event.target.getAttribute('for') === 'emoji') {
            //向后端请求数据，填充到图标中
            axios.get("/logo/").then(function (response) {
                if (response.data.code === 200) {
                    const fragment = document.createDocumentFragment();
                    const arr = response.data.object;
                    arr.forEach((element, index, arr) => {
                        const imageElement = document.createElement("img");
                        imageElement.setAttribute("src", `${logoPrefix}${element.url}`)
                        imageElement.setAttribute("logoId", element.id);
                        fragment.appendChild(imageElement);

                    })
                    const divElement = document.createElement("div");
                    divElement.setAttribute("class", "iconContainer");
                    divElement.append(fragment)
                    emojiContainer.removeChild(emojiContainer.lastElementChild)
                    emojiContainer.append(divElement);
                }
            })
            event.target.nextElementSibling.style.boxShadow = 'none'
            event.target.style.boxShadow = '0 0 0.4rem rgba(0,0,0,0.25)';
            emojiContainer.style.display = "block";
            uploadContainer.style.display = "none";
        } else if (event.target.getAttribute('for') === 'upload') {
            event.target.previousElementSibling.style.boxShadow = 'none'
            event.target.style.boxShadow = '0 0 0.4rem rgba(0,0,0,0.25)';
            uploadContainer.style.display = "block";
            emojiContainer.style.display = "none";
        } else if (event.target instanceof HTMLImageElement && event.target.id !== "userLogo") {
            //向服务器发送请求，修改 session 中的用户 logourl 和数据库中的数据
            const logoId = event.target.getAttribute("logoId");
            const logoUrl = event.target.getAttribute("src");
            axios.post(`/user/logo/${logoId}`).then(function (response) {
                if (response.data.code === 200) {
                    //修改成功则立即更换页面 logo
                    userLogoImg.setAttribute("src", `${logoUrl}`)
                    //将历史记录保存到本地 storage 中
                    const logoArr = JSON.parse(window.localStorage.getItem("recentLogo"));
                    if (logoArr.length > 9) {
                        logoArr.pop()
                    }
                    logoArr.unshift({url: logoUrl, id: logoId})
                    window.localStorage.setItem("recentLogo", JSON.stringify(logoArr));

                    logoContainer.style.display = "none";
                } else {
                    //修改失败则弹窗提示
                    popAutoCloseModal("修改失败", 1000);
                }
            })
        }
        //获取本地 storage，填充到历史记录中
        if (window.localStorage.getItem("recentLogo") === null) {
            const arr = [];
            window.localStorage.setItem("recentLogo", JSON.stringify(arr));
        } else {
            const arr = JSON.parse(window.localStorage.getItem("recentLogo"));
            const fragment = document.createDocumentFragment();
            arr.forEach((element, index, arr) => {
                const imageElement = document.createElement("img");
                imageElement.setAttribute("src", element.url);
                imageElement.setAttribute("logoId", element.id);
                fragment.appendChild(imageElement)
            })
            const recentContainer = logoContainer.querySelector("#recentContainer");
            recentContainer.innerHTML = "";
            recentContainer.append(fragment);
        }
        logoContainer.style.display = "block";
    })

    logoDropdown.addEventListener("mouseleave", (event) => {
        logoContainer.style.display = "none";
    })

    let schemeDropdown = document.querySelector('#schemeDropdown');
    let schemeContainer = schemeDropdown.querySelector("#schemeContainer");
    let galleryContainer = schemeDropdown.querySelector("#gallery");
    let schemeUploadContainer = schemeDropdown.querySelector("#schemeUpload");


    // 点击修改用户背景
    schemeDropdown.addEventListener("click", (event) => {
        //用户更换背景
        const userScheme = document.querySelector("#userScheme");
        if (event.target.getAttribute('for') === 'gallery') {
            //向后端请求数据，填充到图标中
            axios.get("/scheme/").then(function (response) {
                if (response.data.code === 200) {
                    const fragment = document.createDocumentFragment();
                    const arr = response.data.object;
                    arr.forEach((element, index, arr) => {
                        const imageElement = document.createElement("img");
                        imageElement.setAttribute("src", `${logoPrefix}${element.url}`)
                        imageElement.setAttribute("schemeId", element.id);
                        fragment.appendChild(imageElement);
                    })
                    const divElement = document.createElement("div");
                    divElement.setAttribute("class", "coverContainer");
                    divElement.append(fragment)
                    galleryContainer.removeChild(galleryContainer.lastElementChild)
                    galleryContainer.append(divElement);
                }
            })
            event.target.nextElementSibling.style.boxShadow = 'none'
            event.target.style.boxShadow = '0 0 0.4rem rgba(0,0,0,0.25)';
            galleryContainer.style.display = "block";
            schemeUploadContainer.style.display = "none";
        } else if (event.target.getAttribute('for') === 'schemeUpload') {
            event.target.previousElementSibling.style.boxShadow = 'none'
            event.target.style.boxShadow = '0 0 0.4rem rgba(0,0,0,0.25)';
            schemeUploadContainer.style.display = "block";
            galleryContainer.style.display = "none";
        } else if (event.target instanceof HTMLImageElement && event.target.id !== "userScheme") {
            //向服务器发送请求，修改 session 中的用户 schemeUrl 和数据库中的数据
            const schemeId = event.target.getAttribute("schemeId");
            const schemeUrl = event.target.getAttribute("src");
            axios.post(`/user/scheme/${schemeId}`).then(function (response) {
                if (response.data.code === 200) {
                    //修改成功则立即更换页面背景
                    userScheme.setAttribute("src", `${schemeUrl}`)
                    schemeDropdown.style.padding = "0";
                    schemeDropdown.removeChild(userScheme);
                    const scheme = document.createElement("img");
                    scheme.setAttribute("src", schemeUrl);
                    scheme.setAttribute("id", "userScheme");
                    scheme.style.cursor = 'pointer';
                    scheme.style.width = '100%';
                    schemeDropdown.insertBefore(scheme, schemeContainer);

                    //将历史记录保存到本地 storage 中
                    const schemeArr = JSON.parse(window.localStorage.getItem("recentScheme"));
                    if (schemeArr.length > 2) {
                        schemeArr.pop()
                    }
                    schemeArr.unshift({url: schemeUrl, id: schemeId})
                    window.localStorage.setItem("recentScheme", JSON.stringify(schemeArr));

                    schemeContainer.style.display = "none";
                } else {
                    //修改失败则弹窗提示
                    popAutoCloseModal("修改失败", 1000);
                }
            })


        }
        //获取本地 storage，填充到历史记录中
        if (window.localStorage.getItem("recentScheme") === null) {
            const arr = [];
            window.localStorage.setItem("recentScheme", JSON.stringify(arr));
        } else {
            const arr = JSON.parse(window.localStorage.getItem("recentScheme"));
            const fragment = document.createDocumentFragment();
            arr.forEach((element, index, arr) => {
                const imageElement = document.createElement("img");
                imageElement.setAttribute("src", element.url);
                imageElement.setAttribute("schemeId", element.id);
                fragment.appendChild(imageElement)
            })
            const schemeRecentContainer = schemeContainer.querySelector("#schemeRecentContainer");
            schemeRecentContainer.innerHTML = "";
            schemeRecentContainer.append(fragment);
        }
        schemeContainer.style.display = "block";
    })

    schemeDropdown.addEventListener("mouseleave", (event) => {
        schemeContainer.style.display = "none";
    })

    //用户点击模态框确认按钮时
    const dialogCloseBtn = document.querySelector("#dialogClose button[type='submit']");
    dialogCloseBtn.addEventListener("click", (event) => {
        const name = event.target.getAttribute("name");
        const value = event.target.getAttribute("value");
        //用户确认删除项目
        if (name === 'deleteProject') {
            axios.delete(`/project/${value}`).then(function (response) {
                if (response.data.code === 200) {
                    //修改成功则立即删除页面项目
                    for (const cardBody of projectCard.children) {
                        if (cardBody.getAttribute("id") === null) {
                            if (cardBody.firstElementChild.getAttribute("projectId") === value) {
                                projectCard.removeChild(cardBody);
                                break;
                            }
                        }
                    }
                } else {
                    //修改失败则弹窗提示
                    popAutoCloseModal("删除失败", 1000);
                }
            })
        }
    })

}