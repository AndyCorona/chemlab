const addTodoList = document.querySelector("#addTodoList");
const todoListContainer = document.querySelector('#todolistContainer');
let todoListArr

//渲染用户 todolist
if (window.localStorage.getItem("todolist") === null) {
    const arr = [];
    window.localStorage.setItem("todolist", JSON.stringify(arr));
} else {
    todoListArr = JSON.parse(window.localStorage.getItem("todolist"));
    const fragment = document.createDocumentFragment();
    todoListArr.forEach((element, index, todoListArr) => {
        const liElement = document.createElement("li");
        const imgElement1 = document.createElement("img");
        const imgElement2 = document.createElement("img");
        const inputElement = document.createElement("input");

        inputElement.setAttribute("type", "text");
        inputElement.setAttribute("value", `${element.content}`);

        imgElement1.setAttribute("src", `${element.checked ? '/chemlab/img/shared/todolist-check.png' : '/chemlab/img/shared/todolist-uncheck.png'}`);
        imgElement2.setAttribute("class", "close");
        imgElement2.setAttribute("src", "/chemlab/img/shared/close.svg");
        imgElement2.setAttribute("index", `${element.index}`);
        liElement.classList.add("list-group-item", "d-flex", "align-items-center");
        liElement.appendChild(imgElement1);
        liElement.appendChild(inputElement);
        liElement.appendChild(imgElement2);
        fragment.appendChild(liElement);
    })
    todoListContainer.appendChild(fragment);
}

//用户添加 todolist
addTodoList.addEventListener("click", (event) => {
    let todolistUUID = random5(10);
    const liElement = document.createElement("li");
    const imgElement1 = document.createElement("img");
    const imgElement2 = document.createElement("img");
    const inputElement = document.createElement("input");

    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("value", "TO-DO");

    imgElement1.setAttribute("src", "/chemlab/img/shared/todolist-uncheck.png");
    imgElement2.setAttribute("class", "close");
    imgElement2.setAttribute("src", "/chemlab/img/shared/close.svg");
    imgElement2.setAttribute("index", `${todolistUUID}`);
    liElement.classList.add("list-group-item", "d-flex", "align-items-center");
    liElement.appendChild(imgElement1);
    liElement.appendChild(inputElement);
    liElement.appendChild(imgElement2);

    //页面添加
    todoListContainer.appendChild(liElement);

    //保存到本次 storage 中
    todoListArr = JSON.parse(window.localStorage.getItem("todolist"));
    todoListArr.push({index: todolistUUID, checked: false, content: "TO-DO"})
    window.localStorage.setItem("todolist", JSON.stringify(todoListArr))
})

//用户删除 todolist
todoListContainer.addEventListener("click", (event) => {
    if (event.target.className === 'close') {
        //从页面删除
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        //从本地 localStorage 中删除
        const indexUUID = event.target.getAttribute("index");
        todoListArr = JSON.parse(window.localStorage.getItem("todolist"));
        //过滤数组，返回新数组
        todoListArr = todoListArr.filter((element) => {
            return element.index !== indexUUID;
        })
        window.localStorage.setItem("todolist", JSON.stringify(todoListArr));
        //点击 todolist 切换图片
    } else if (event.target instanceof HTMLImageElement) {
        const img = event.target;
        const isCheck = img.getAttribute('src');
        if (isCheck !== null) {
            if (isCheck === '/chemlab/img/shared/todolist-uncheck.png') {
                img.setAttribute('src', '/chemlab/img/shared/todolist-check.png')
                //更新 storage
                todoListArr.forEach((element, index, todoListAr) => {
                    if (element.index === event.target.nextElementSibling.nextElementSibling.getAttribute("index")) {
                        element.checked = true
                    }
                })
            } else if (isCheck === '/chemlab/img/shared/todolist-check.png') {
                img.setAttribute('src', '/chemlab/img/shared/todolist-uncheck.png')
                //更新 storage
                todoListArr.forEach((element, index, todoListAr) => {
                    if (element.index === event.target.nextElementSibling.nextElementSibling.getAttribute("index")) {
                        element.checked = false
                    }
                })
            } else {
                return;
            }
            window.localStorage.setItem("todolist", JSON.stringify(todoListArr));
        }
    }
})

//用户修改 todolist 内容
todoListContainer.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement) {
        todoListArr = JSON.parse(window.localStorage.getItem("todolist"));
        todoListArr.forEach((element, index, todoListAr) => {
            if (element.index === event.target.nextElementSibling.getAttribute("index")) {
                element.content = event.target.value;
            }
        })
        window.localStorage.setItem("todolist", JSON.stringify(todoListArr));
    }
})


//用户修改 todolist 打勾
function popCloseModal(message, name, value) {
    const modalEle = document.querySelector("#dialogClose");
    const myModal = new bootstrap.Modal(modalEle);
    const messageContainer = modalEle.querySelector(".modal-body").firstElementChild;
    const submitBtn = modalEle.querySelector("button[type='submit']");
    submitBtn.setAttribute("name", name);
    submitBtn.setAttribute("value", value);
    messageContainer.innerText = message;
    myModal.show();
}

function popAutoCloseModal(message, millisecond, boolean = "true") {
    const modalEle = document.querySelector("#dialogAutoClose");
    const messageContainer = modalEle.querySelector(".modal-body").firstElementChild;
    let modalContent = modalEle.querySelector(".modal-content")
    messageContainer.innerText = message;
    let myModal = new bootstrap.Modal(modalEle);
    if (boolean !== "true") {
        modalContent.setAttribute("right","right")
    }else {
        modalContent.setAttribute("right","wrong")
    }
    myModal.show();
    setTimeout(function () {
        myModal.hide();
    }, millisecond)

}




