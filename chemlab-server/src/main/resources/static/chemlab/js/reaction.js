//标签数目
let tagCount = 0;
// window.addEventListener("beforeunload", function (e) {
//     let confirmationMessage = "\o/";
//     (e || window.event).returnValue = confirmationMessage;     //Gecko + IE
//     return confirmationMessage;                                //Webkit, Safari, Chrome etc.
// });

//检测 span 内容变化
let observer = new MutationObserver((recordArray, mutationObserver) => {
    if (recordArray[0].target.textContent.length > 10) {
        recordArray[0].target.nodeValue = recordArray[0].target.textContent.match(/.{0,10}/)[0]
    }
});

window.onload = function () {
    //sessionStorage 中有历史记录
    if (sessionStorage.getItem("versionControl") !== null) {
        drawRightAside(JSON.parse(sessionStorage.getItem("versionControl")), document.querySelector("#rightAside").querySelector("ul"));
    } else {
        axios.get(`/reaction/list`).then(function (response) {
            if (response.data.code === 200) {
                if (response.data.object.length > 0) {
                    sessionStorage.setItem("versionControl", JSON.stringify(response.data.object));
                    drawRightAside(response.data.object, document.querySelector("#rightAside").querySelector("ul"))
                }
            }
        })
    }

    //sessionStorage 中有 reactionForm
    if (sessionStorage.getItem("reactionForm") !== null) {
        drawTemplateArea(JSON.parse(sessionStorage.getItem("reactionForm")), document.querySelector("#putTemplate"));
    } else {
        axios.post(`/reaction/`).then(function (response) {
            if (response.data.code === 200) {
                //跳转到 reaction 页面，此时 session 中已经有了 reaction
                console.log(response.data)
                //给页面填充数据
                if (response.data.object !== null) {
                    sessionStorage.setItem("reactionForm", JSON.stringify(response.data.object))
                    let reactionForm = response.data.object;
                    drawTemplateArea(reactionForm, document.querySelector("#putTemplate"))
                }
            } else {
                //修改失败则弹窗提示
                popAutoCloseModal("获取失败", 1000);
            }
        })
    }

    //绑定添加标签事件
    let addTagBtn = document.querySelector("#addTag");
    addTagBtn.addEventListener("click", (event) => {
        event.preventDefault();
        tagCount++;
        //当 tag 数量大于 3 时，隐藏添加标签按钮
        if (tagCount >= 3) {
            addTagBtn.style.display = "none";
        }
        //添加 tag
        let spanEle = document.createElement("span");
        spanEle.classList.add("tag")
        spanEle.setAttribute('contenteditable', 'true');
        observer.observe(spanEle, {characterData: true, characterDataOldValue: true, subtree: true})
        event.target.parentNode.insertBefore(spanEle, event.target);
        spanEle.focus();
    })

    let tempArea = document.querySelector("#putTemplate");
    let dragFromSide;
    let indexOfDragEle;
    let preClassName;
    let deleteColumn;
    let imgAndLinkDragged = false;

    //创建一个临时 tempDiv，用于添加新模块时
    let tempDiv = document.createElement("div");
    tempDiv.setAttribute("id", 'tempDiv');
    let temInput = document.createElement("input");
    temInput.className = "header";
    tempDiv.appendChild(temInput);
    tempDiv.appendChild(document.createElement("div"));

    //创建另一个临时 dragDiv，用于拖动已有模块时
    let dragDiv = document.createElement("div");
    dragDiv.setAttribute("id", 'dragDiv');
    dragDiv.appendChild(document.createElement("div"));

    //创建模块
    function createModule(moduleType) {
        let ranNum = Math.random() * 100
        //创建 picture 模块
        if (moduleType === 'picture') {
            let pictureFragment = document.createDocumentFragment();
            let divElement = document.createElement("div");
            let inputElement1 = document.createElement("input");
            let inputElement3 = document.createElement("input");
            let inputElement2 = document.createElement("input");
            let labelElement = document.createElement("label");

            inputElement1.style.display = "none";
            inputElement1.setAttribute("type", "file");
            inputElement1.setAttribute("id", `pictureUpload${ranNum}`);
            inputElement1.setAttribute("name", `pictureUpload${ranNum}`);
            inputElement1.setAttribute("accept", `image/jpeg,image/png`);

            inputElement3.classList.add("deleteModule");
            inputElement3.setAttribute("type", "button")

            labelElement.setAttribute("for", `pictureUpload${ranNum}`);
            labelElement.className = 'col-12 g-0';
            labelElement.innerHTML = '+&nbsp;NEW';


            inputElement2.className = 'header';
            inputElement2.setAttribute("type", 'text');
            inputElement2.setAttribute("placeholder", 'Scheme');
            inputElement2.setAttribute("name", `pictureTitle${ranNum}`);


            divElement.className = 'picture';
            divElement.setAttribute("draggable", "true");

            divElement.appendChild(inputElement2);
            divElement.appendChild(inputElement3);
            divElement.appendChild(labelElement);
            divElement.appendChild(inputElement1);
            pictureFragment.appendChild(divElement);

            return pictureFragment;
            //创建 text 模块
        } else if (moduleType === 'text') {
            let textFragment = document.createDocumentFragment();

            let divElement = document.createElement("div");
            let inputElement = document.createElement("input");
            let inputElement2 = document.createElement("input");
            let textAreaElement = document.createElement("textarea");
            let pElement = document.createElement("p");

            inputElement2.classList.add("deleteModule");
            inputElement2.setAttribute("type", "button")
            textAreaElement.className = 'col-12';
            textAreaElement.style.height = "6rem";
            inputElement.className = "header";
            inputElement.setAttribute("type", "text");
            inputElement.setAttribute("placeholder", "Procedure");
            inputElement.setAttribute("name", `textTitle${ranNum}`);
            divElement.className = 'rText';
            divElement.setAttribute("draggable", "true");

            pElement.innerText = '111';

            divElement.appendChild(inputElement);
            divElement.appendChild(inputElement2);
            divElement.appendChild(textAreaElement);
            divElement.appendChild(pElement);
            textFragment.appendChild(divElement);
            return textFragment;
            //创建 table 模块，默认为 3 列
        } else if (moduleType === 'table') {

            let tableFragment = document.createDocumentFragment();

            let divElement = document.createElement("div");
            let inputElement1 = document.createElement("input");
            let inputElement2 = document.createElement("input");
            let tableElement = document.createElement("table");
            let theadElement = document.createElement("thead");
            let tbodyElement = document.createElement("tbody");
            let tfootElement = document.createElement("tfoot");
            let trElement1 = document.createElement("tr");
            let trElement2 = document.createElement("tr");
            let trElement3 = document.createElement("tr");
            let thElement1 = document.createElement("th")
            let thElement2 = document.createElement("th")
            let thElement3 = document.createElement("th")
            let thElement4 = document.createElement("th")
            let thElement5 = document.createElement("th")
            let thElement6 = document.createElement("th")
            let tdElement1 = document.createElement("td")
            let tdElement2 = document.createElement("td")

            tdElement1.setAttribute("contenteditable", "false");
            tdElement1.setAttribute("colspan", "10000");
            tdElement1.classList.add("addPadding");

            tdElement2.setAttribute("contenteditable", "false");
            tdElement2.setAttribute("colspan", "10000");
            tdElement2.classList.add("addRow");
            tdElement2.innerHTML = `+&nbsp;NEW`
            trElement2.appendChild(tdElement1);
            trElement3.appendChild(tdElement2);
            tfootElement.appendChild(trElement2);
            tfootElement.appendChild(trElement3);

            tbodyElement.setAttribute("contenteditable", "true");
            theadElement.setAttribute("contenteditable", "true");

            thElement1.draggable = true;
            thElement2.classList.add("resizeBar");
            thElement2.contentEditable = false;
            thElement4.classList.add("resizeBar");
            thElement4.contentEditable = false;
            thElement6.classList.add("addColumn");
            thElement6.contentEditable = false;
            thElement3.draggable = true;
            thElement5.draggable = true;

            trElement1.appendChild(thElement1);
            trElement1.appendChild(thElement2);
            trElement1.appendChild(thElement3);
            trElement1.appendChild(thElement4);
            trElement1.appendChild(thElement5);
            trElement1.appendChild(thElement6);

            theadElement.appendChild(trElement1);

            tableElement.appendChild(theadElement);
            tableElement.appendChild(tbodyElement);
            tableElement.appendChild(tfootElement);

            tableElement.classList.add("col-12");
            tableElement.contentEditable = false;

            inputElement1.classList.add("header");
            inputElement1.setAttribute("type", "text");
            inputElement1.setAttribute("placeholder", "This is table");

            inputElement2.setAttribute("type", "button");
            inputElement2.classList.add("deleteModule");

            divElement.classList.add("rTable");
            divElement.draggable = true;
            divElement.appendChild(inputElement1);
            divElement.appendChild(inputElement2);
            divElement.appendChild(tableElement);

            tableFragment.appendChild(divElement);

            return tableFragment;
        } else if (moduleType === 'data') {
            let dataFragment = document.createDocumentFragment();
            let divElement = document.createElement("div");
            let tableElement = document.createElement("table")
            let theadElement = document.createElement("thead")
            let tbodyElement = document.createElement("tbody")
            let tfootElement = document.createElement("tfoot")
            let inputElement1 = document.createElement("input")
            let inputElement2 = document.createElement("input")
            let trElement1 = document.createElement("tr")
            let trElement2 = document.createElement("tr")
            let trElement3 = document.createElement("tr")
            let tdElement1 = document.createElement("td")
            let tdElement2 = document.createElement("td")
            let thElement1 = document.createElement("th")
            let thElement2 = document.createElement("th")
            let thElement3 = document.createElement("th")
            let thElement4 = document.createElement("th")
            let thElement5 = document.createElement("th")
            let thElement6 = document.createElement("th")
            let thElement7 = document.createElement("th")
            let thElement8 = document.createElement("th")


            thElement1.innerText = 'Instrument';
            thElement2.setAttribute("contenteditable", false)
            thElement3.innerText = 'Test type';
            thElement4.setAttribute("contenteditable", false)
            thElement5.innerText = 'Test Date';
            thElement6.setAttribute("contenteditable", false)
            thElement7.setAttribute("contenteditable", false)
            thElement7.innerText = 'File'
            thElement8.setAttribute("contenteditable", false)
            thElement8.classList.add("noAddColumn");

            trElement1.appendChild(thElement1)
            trElement1.appendChild(thElement2)
            trElement1.appendChild(thElement3)
            trElement1.appendChild(thElement4)
            trElement1.appendChild(thElement5)
            trElement1.appendChild(thElement6)
            trElement1.appendChild(thElement7)
            trElement1.appendChild(thElement8)

            theadElement.appendChild(trElement1);

            tdElement1.setAttribute("contenteditable", false)
            tdElement1.setAttribute("colspan", "10000")
            tdElement1.setAttribute("class", "addPadding")
            trElement2.appendChild(tdElement1)

            tdElement2.setAttribute("contenteditable", false)
            tdElement2.setAttribute("colspan", "10000")
            tdElement2.setAttribute("class", "addDataRow")
            tdElement2.innerHTML = '+&nbsp;NEW'
            trElement3.appendChild(tdElement2)

            tfootElement.appendChild(trElement2)
            tfootElement.appendChild(trElement3)

            tableElement.setAttribute("class", "col-12")
            tableElement.setAttribute("contenteditable", "true")
            tableElement.appendChild(theadElement)
            tableElement.appendChild(tbodyElement)
            tableElement.appendChild(tfootElement)

            inputElement1.setAttribute("class", "header")
            inputElement1.setAttribute("type", "text")
            inputElement1.setAttribute("placeholder", "This is data")
            inputElement2.setAttribute("class", "deleteModule")
            inputElement2.setAttribute("type", "button")

            divElement.setAttribute("class", "rData")
            divElement.setAttribute("draggable", "true")

            divElement.appendChild(inputElement1)
            divElement.appendChild(inputElement2)
            divElement.appendChild(tableElement)
            dataFragment.appendChild(divElement)
            return dataFragment
        } else if (moduleType === 'reference') {

            let referenceFragment = document.createDocumentFragment();
            let divElement = document.createElement("div");
            let tableElement = document.createElement("table")
            let theadElement = document.createElement("thead")
            let tbodyElement = document.createElement("tbody")
            let tfootElement = document.createElement("tfoot")
            let inputElement1 = document.createElement("input")
            let inputElement2 = document.createElement("input")
            let trElement1 = document.createElement("tr")
            let trElement2 = document.createElement("tr")
            let trElement3 = document.createElement("tr")
            let tdElement1 = document.createElement("td")
            let tdElement2 = document.createElement("td")
            let thElement1 = document.createElement("th")
            let thElement2 = document.createElement("th")
            let thElement3 = document.createElement("th")
            let thElement4 = document.createElement("th")
            let thElement5 = document.createElement("th")
            let thElement6 = document.createElement("th")
            let thElement7 = document.createElement("th")
            let thElement8 = document.createElement("th")


            thElement1.innerText = 'Year';
            thElement2.setAttribute("contenteditable", false)
            thElement3.innerText = 'Journal';
            thElement4.setAttribute("contenteditable", false)
            thElement5.innerText = 'Title';
            thElement6.setAttribute("contenteditable", false)
            thElement7.setAttribute("contenteditable", false)
            thElement7.innerText = 'Hyperlink'
            thElement8.setAttribute("contenteditable", false)
            thElement8.classList.add("noAddColumn");

            trElement1.appendChild(thElement1)
            trElement1.appendChild(thElement2)
            trElement1.appendChild(thElement3)
            trElement1.appendChild(thElement4)
            trElement1.appendChild(thElement5)
            trElement1.appendChild(thElement6)
            trElement1.appendChild(thElement7)
            trElement1.appendChild(thElement8)

            theadElement.appendChild(trElement1);

            tdElement1.setAttribute("contenteditable", false)
            tdElement1.setAttribute("colspan", "10000")
            tdElement1.setAttribute("class", "addPadding")
            trElement2.appendChild(tdElement1)

            tdElement2.setAttribute("contenteditable", false)
            tdElement2.setAttribute("colspan", "10000")
            tdElement2.setAttribute("class", "addReferenceRow")
            tdElement2.innerHTML = '+&nbsp;NEW'
            trElement3.appendChild(tdElement2)

            tfootElement.appendChild(trElement2)
            tfootElement.appendChild(trElement3)

            tableElement.setAttribute("class", "col-12")
            tableElement.setAttribute("contenteditable", "true")
            tableElement.appendChild(theadElement)
            tableElement.appendChild(tbodyElement)
            tableElement.appendChild(tfootElement)

            inputElement1.setAttribute("class", "header")
            inputElement1.setAttribute("type", "text")
            inputElement1.setAttribute("placeholder", "This is reference")
            inputElement2.setAttribute("class", "deleteModule")
            inputElement2.setAttribute("type", "button")

            divElement.setAttribute("class", "rReference")
            divElement.setAttribute("draggable", "true")

            divElement.appendChild(inputElement1)
            divElement.appendChild(inputElement2)
            divElement.appendChild(tableElement)
            referenceFragment.appendChild(divElement)
            return referenceFragment;
        } else {
            alert("未知的模块")
        }
    }

    tempArea.addEventListener("dragover", (event) => {
            event.preventDefault();
        }
    )
    tempArea.addEventListener("drop", (event) => {
            event.preventDefault();
            tempArea.className = ''
            //从侧边栏拖拽的
            if (dragFromSide) {
                event.target.removeChild(tempDiv);
                if (event.target === event.currentTarget) {
                    event.currentTarget.appendChild(createModule(event.dataTransfer.getData("text/plain")))
                } else {
                    event.target.parentNode.insertBefore(createModule(event.dataTransfer.getData("text/plain")), event.target);
                }

                //不是从侧边栏拖拽也不是表头单元格拖拽
            } else if (event.target.getAttribute("who") !== null) {
                event.target.style.backgroundImage = "url('/chemlab/img/reaction/delete.svg')";
                let index = event.dataTransfer.getData("text/plain");

                //删除 theader 里的那一个单元格及其前面一个滑块
                let theaderEle = event.target.nextElementSibling.firstElementChild;
                theaderEle.setAttribute("contenteditable", "false");

                //如果只有一列了，不能删除
                if (theaderEle.firstElementChild.childElementCount < 3) {
                    return;
                }

                //如果删除的是第一列，后一个元素补长
                if (index === '0') {
                    let morePercentWidth = theaderEle.firstElementChild.children[0].style.width === "" ? 32.14 : parseFloat(theaderEle.firstElementChild.children[0].style.width.split("%")[0]);
                    let nowPercentWidth = theaderEle.firstElementChild.children[2].style.width === "" ? 32.14 : parseFloat(theaderEle.firstElementChild.children[2].style.width.split("%")[0]);

                    theaderEle.firstElementChild.removeChild(theaderEle.firstElementChild.children[0]);
                    theaderEle.firstElementChild.removeChild(theaderEle.firstElementChild.children[0]);
                    theaderEle.firstElementChild.children[0].style.width = `${nowPercentWidth + morePercentWidth + 1.78}%`;

                    //如果删除的不是第一列，前一个元素补长
                } else {
                    let morePercentWidth = theaderEle.firstElementChild.children[index].style.width === "" ? 32.14 : parseFloat(theaderEle.firstElementChild.children[index].style.width.split("%")[0]);
                    let nowPercentWidth = theaderEle.firstElementChild.children[index - 2].style.width === "" ? 32.14 : parseFloat(theaderEle.firstElementChild.children[index - 2].style.width.split("%")[0]);
                    theaderEle.firstElementChild.removeChild(theaderEle.firstElementChild.children[index - 1]);
                    theaderEle.firstElementChild.removeChild(theaderEle.firstElementChild.children[index - 1]);
                    theaderEle.firstElementChild.children[index - 2].style.width = `${nowPercentWidth + morePercentWidth + 1.78}%`;
                }

                //遍历 tbody 下的所有 tr，为偶数的 tr 删除一列，奇数的 tr 为装饰行
                let tBodyEle = theaderEle.nextElementSibling;
                let number = tBodyEle.childElementCount;

                if (index === '0') {
                    for (let i = 1; i < number; i += 2) {
                        tBodyEle.children[i].removeChild(tBodyEle.children[i].children[0])
                        tBodyEle.children[i].removeChild(tBodyEle.children[i].children[0])
                    }
                } else {
                    for (let i = 1; i < number; i += 2) {
                        tBodyEle.children[i].removeChild(tBodyEle.children[i].children[index - 1])
                        tBodyEle.children[i].removeChild(tBodyEle.children[i].children[index - 1])
                    }
                }


                theaderEle.setAttribute("contenteditable", "true");
                return;

            } else if (!deleteColumn) {
                if (event.target.querySelector("#dragDiv") !== null) {
                    event.target.removeChild(dragDiv);
                }
                //如果放在 tempArea 里，直接加到最后
                if (event.target === event.currentTarget) {
                    event.currentTarget.appendChild(event.currentTarget.children[indexOfDragEle]);
                } else {
                    //判断已有被拖拽元素
                    let dropIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
                    if (dropIndex === indexOfDragEle) {
                        return
                    } else if (dropIndex > indexOfDragEle) {
                        event.target.parentNode.insertBefore(event.target.parentNode.children[indexOfDragEle], event.target.nextElementSibling)
                    } else if (dropIndex < indexOfDragEle) {
                        event.target.parentNode.insertBefore(event.target.parentNode.children[indexOfDragEle], event.target)
                    }
                }
            }
        }
    )

    tempArea.addEventListener("dragenter", (event) => {
            if (imgAndLinkDragged) {
                return;
            }
            event.dataTransfer.effectAllowed = 'copyMove';
            event.preventDefault();

            if (event.target.getAttribute("who") !== null) {
                if (event.target.nextElementSibling.firstElementChild.firstElementChild.childElementCount < 3) {
                    return;
                }
                event.target.style.backgroundImage = "url('/chemlab/img/reaction/delete-red.svg')";
                return;
            }
            //判断是哪里触发拖拽事件
            if (dragFromSide) {
                tempArea.className = 'dragging-over';
                //侧边栏触发的事件，显示红色边框
                if (event.target === event.currentTarget) {
                    event.target.appendChild(tempDiv);
                } else {
                    event.target.insertBefore(tempDiv, event.target.firstChild);
                }
                //不是侧边栏触发的事件
            } else if (deleteColumn) {
                return;
            } else {
                // //如果放在 tempArea 里，直接加到最后
                if (event.target === event.currentTarget) {
                    event.currentTarget.appendChild(dragDiv);
                } else {
                    tempArea.className = 'dragging-over';
                    //判断已有被拖拽元素
                    let enterIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
                    if (enterIndex === indexOfDragEle) {
                        return
                    } else if (enterIndex > indexOfDragEle) {
                        event.target.appendChild(dragDiv);
                    } else if (enterIndex < indexOfDragEle) {
                        event.target.insertBefore(dragDiv, event.target.firstChild)
                    }
                }
            }

        }
    )

    tempArea.addEventListener("dragleave", (event) => {
            event.stopPropagation();
            event.preventDefault();

            if (event.target.className === 'deleteModule') {
                event.target.style.backgroundImage = "url('/chemlab/img/reaction/delete.svg')";
                return
            }

            let temp = event.target.querySelector("#tempDiv");
            if (temp !== null && event.target !== event.currentTarget) {
                temp.parentNode.removeChild(temp);
            }
            let dragDiv = event.target.querySelector("#dragDiv");
            if (dragDiv !== null && event.target !== event.currentTarget) {
                dragDiv.parentNode.removeChild(dragDiv);
            }
        }
    )

    //给右边栏绑定总的拖拽事件
    let DragParent = document.querySelector("#pictureDrag").parentNode;
    DragParent.addEventListener("dragstart", (event) => {
            event.dataTransfer.effectAllowed = 'copy';
            dragFromSide = true;
            imgAndLinkDragged = false;
            if (event.target.getAttribute("id") === 'pictureDrag') {
                event.dataTransfer.setData("text/plain", "picture");
            } else if (event.target.getAttribute("id") === 'textDrag') {
                event.dataTransfer.setData("text/plain", "text");
            } else if (event.target.getAttribute("id") === 'tableDrag') {
                event.dataTransfer.setData("text/plain", "table");
            } else if (event.target.getAttribute("id") === 'dataDrag') {
                event.dataTransfer.setData("text/plain", "data");
            } else if (event.target.getAttribute("id") === 'referenceDrag') {
                event.dataTransfer.setData("text/plain", "reference");
            } else {
                return
            }
        }
    )

    DragParent.addEventListener("dragend", (event) => {
            event.preventDefault();
            //清除数据
            let temp = document.querySelector("#tempDiv");
            if (temp !== null) {
                temp.parentNode.removeChild(temp);
            }
            tempArea.className = ''
        }
    )

    //给 putTemplate 添加总的拖拽事件
    tempArea.addEventListener("dragstart", (event) => {
        event.dataTransfer.effectAllowed = 'move';
        dragFromSide = false;
        imgAndLinkDragged = false;

        //表头单元格的拖拽
        if (event.target instanceof HTMLTableCellElement) {
            deleteColumn = true;

            //只有一列时禁止显色
            if (event.target.parentNode.childElementCount < 3) {
                return;
            }

            event.target.style.backgroundColor = "rgba(235, 87, 87, 0.3)"
            event.target.parentNode.parentNode.parentNode.previousElementSibling.setAttribute("who", "isMe");
            //传输要删除的列的位置
            event.dataTransfer.setData("text/plain", Array.from(event.target.parentNode.children).indexOf(event.target));
            return;
        }

        preClassName = event.target.className;
        event.target.classList.add('dragging-over');
        //获取触发拖拽事件的元素在父元素的位置
        indexOfDragEle = Array.from(event.target.parentNode.children).indexOf(event.target);
    })
    tempArea.addEventListener("dragend", (event) => {
        event.preventDefault();
        if (event.target instanceof HTMLTableCellElement) {
            event.target.parentNode.parentNode.parentNode.previousElementSibling.removeAttribute("who");
            event.target.style.background = null
            deleteColumn = false
            return
        }
        tempArea.className = ''
        event.target.className = preClassName;
        event.target.style.background = null
        let temp = document.querySelector("#dragDiv");
        if (temp !== null) {
            temp.parentNode.removeChild(temp);
        }
        // event.target.style.border = null;
    })

    //禁止网页中的 img 和 a 标签拖拽
    document.body.addEventListener("dragstart", (event) => {
        if (event.target instanceof HTMLImageElement || event.target instanceof HTMLAnchorElement) {
            event.target.setAttribute("draggable", "false");
            event.dataTransfer.effectAllowed = 'none';
            event.dataTransfer.dropEffect = "none";
            imgAndLinkDragged = true;
        }
    })

    let start;
    let end;
    let minLeft;
    let maxRight;
    //当下拉 textarea 时改变其高度
    tempArea.addEventListener("mousedown", (event) => {

        //文本框下拉条
        if (event.target instanceof HTMLParagraphElement) {
            event.target.setAttribute("id", "textBarisClick");
            event.target.parentNode.setAttribute("draggable", "false");
            event.target.style.backgroundColor = "rgba(135, 135, 135, 0.2)";
            event.target.style.color = "black";
            //获取 textArea 的头部线
            start = event.target.previousElementSibling.offsetTop;
        }

        //表格拖拽改变单元格宽度
        if (event.target.className === 'resizeBar') {
            event.target.setAttribute("id", "resizeBarisClick");
            event.target.parentNode.parentNode.parentNode.parentNode.setAttribute("draggable", "false");
            event.target.style.backgroundColor = "rgba(135, 135, 135, 0.2)";
            event.target.style.color = "black";

            //获取拖拽线的相邻的左单元格的最左端和右单元格的最右端
            let temp = event.target.previousElementSibling.getBoundingClientRect();
            minLeft = temp.left;
            temp = event.target.nextElementSibling.getBoundingClientRect();
            maxRight = temp.left + temp.width;
        }
    })
    tempArea.addEventListener("mousemove", (event) => {
            let textBarisClick = document.querySelector("#textBarisClick");
            let resizeBarisClick = document.querySelector("#resizeBarisClick");
            if (textBarisClick !== null) {
                end = event.pageY;
                if (end < start) {
                    return;
                } else {
                    let remHeight = textBarisClick.previousElementSibling.style.height.split("rem")[0] === '0' ? "0.5" : textBarisClick.previousElementSibling.style.height.split("rem")[0];
                    let pxHeight = textBarisClick.previousElementSibling.offsetHeight;
                    let remUnit = pxHeight / remHeight;
                    textBarisClick.previousElementSibling.style.height = `${(end - start) / remUnit}rem`;
                }
            }

            if (resizeBarisClick !== null) {
                position = event.pageX;
                if (position < minLeft + 20 || position > maxRight - 20) {
                    return;
                } else {
                    let parentWidth = resizeBarisClick.parentNode.offsetWidth;

                    //若无法读取到单元格宽度，说明为为默认的 32.14%，这是准确值
                    let letfPercentWidth = resizeBarisClick.previousElementSibling.style.width === "" ? 32.14 : parseFloat(resizeBarisClick.previousElementSibling.style.width.split("%")[0]);
                    let rightPercentWidth = resizeBarisClick.nextElementSibling.style.width === "" ? 32.14 : parseFloat(resizeBarisClick.nextElementSibling.style.width.split("%")[0]);

                    //滑块固定占比 1.78%
                    resizeBarisClick.previousElementSibling.style.width = `${(position - minLeft) / parentWidth * 100 - 0.89}%`;
                    resizeBarisClick.nextElementSibling.style.width = `${(maxRight - position) / parentWidth * 100 - 0.89}%`;
                }
            }

        }
    )
    tempArea.addEventListener("mouseup", (event) => {
        //删除一个模块或者删除一个 table 里面的一行
        if (event.target.className === 'deleteModule') {
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        } else if (event.target.className === 'deleteRow') {
            event.target.parentNode.parentNode.removeChild(event.target.parentNode.previousElementSibling);
            event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        }

        //增加表格的一行
        else if (event.target.className === 'addRow') {
            //获取表头列数
            let tdNum = event.target.parentNode.parentNode.parentNode.firstElementChild.firstElementChild.childElementCount;
            //获取 tbody
            let tBodyEle = event.target.parentNode.parentNode.previousElementSibling;

            let tableFragment = document.createDocumentFragment();
            let trElement1 = document.createElement("tr");
            let tdElement1 = document.createElement("td");
            let trElement2 = document.createElement("tr");
            let tdElement2 = document.createElement("td");
            let tdElement3 = document.createElement("td");

            //作为装饰内边距的
            tdElement1.setAttribute("contentEditable", "false");
            tdElement1.classList.add("addPadding");
            tdElement1.setAttribute("colspan", "10000");

            tdElement3.setAttribute("contentEditable", "false");

            trElement1.appendChild(tdElement1);

            for (let i = 0; i < (tdNum / 2 - 1); i++) {
                trElement2.appendChild(tdElement2.cloneNode(false));
                trElement2.appendChild(tdElement3.cloneNode(false));
            }

            trElement2.appendChild(tdElement2);
            tdElement3.classList.add("deleteRow");
            trElement2.appendChild(tdElement3);

            tableFragment.appendChild(trElement1);
            tableFragment.appendChild(trElement2);
            tBodyEle.appendChild(tableFragment);
            //增加 data 的一行
        } else if (event.target.className === 'addDataRow') {
            let ranNum = Math.random() * 100
            //获取 tbody
            let tBodyEle = event.target.parentNode.parentNode.previousElementSibling;
            let dataFragment = document.createDocumentFragment();

            let trElement1 = document.createElement("tr");
            let tdElement1 = document.createElement("td");
            let trElement2 = document.createElement("tr");
            let tdElement2 = document.createElement("td");
            let tdElement3 = document.createElement("td");
            let labelElement = document.createElement("label");
            let aElement = document.createElement("a");

            let inputElement = document.createElement("input");

            //作为装饰内边距的
            tdElement1.setAttribute("contentEditable", "false");
            tdElement1.classList.add("addPadding");
            tdElement1.setAttribute("colspan", "10000");

            trElement1.appendChild(tdElement1);
            tdElement3.setAttribute("contentEditable", "false");

            for (let i = 0; i < 3; i++) {
                trElement2.appendChild(tdElement2.cloneNode(false))
                trElement2.appendChild(tdElement3.cloneNode(false))
            }
            let cloneNode = tdElement3.cloneNode(false);

            labelElement.setAttribute("for", `rDataFile${ranNum}`)
            aElement.style.color = '#3B3737';
            aElement.innerText = 'Upload'
            labelElement.appendChild(aElement)
            inputElement.setAttribute("id", `rDataFile${ranNum}`)
            inputElement.setAttribute("type", "file")
            inputElement.style.display = 'none'
            cloneNode.appendChild(labelElement)
            cloneNode.appendChild(inputElement)

            trElement2.appendChild(cloneNode)
            tdElement3.classList.add("deleteRow");
            trElement2.appendChild(tdElement3)

            dataFragment.appendChild(trElement1);
            dataFragment.appendChild(trElement2);
            tBodyEle.appendChild(dataFragment);
            //增加 reference 的一行
        } else if (event.target.className === "addReferenceRow") {

            let ranNum = Math.random() * 100
            //获取 tbody
            let tBodyEle = event.target.parentNode.parentNode.previousElementSibling;
            let dataFragment = document.createDocumentFragment();

            let trElement1 = document.createElement("tr");
            let tdElement1 = document.createElement("td");
            let trElement2 = document.createElement("tr");
            let tdElement2 = document.createElement("td");
            let tdElement3 = document.createElement("td");
            let labelElement = document.createElement("label");
            let aElement = document.createElement("a");

            let inputElement = document.createElement("input");

            //作为装饰内边距的
            tdElement1.setAttribute("contentEditable", "false");
            tdElement1.classList.add("addPadding");
            tdElement1.setAttribute("colspan", "10000");

            trElement1.appendChild(tdElement1);
            tdElement3.setAttribute("contentEditable", "false");

            for (let i = 0; i < 3; i++) {
                trElement2.appendChild(tdElement2.cloneNode(false))
                trElement2.appendChild(tdElement3.cloneNode(false))
            }
            let cloneNode = tdElement3.cloneNode(false);

            labelElement.setAttribute("for", `rReferenceFile${ranNum}`)
            aElement.setAttribute("target", "_blank")
            aElement.style.color = '#3B3737';
            aElement.innerText = 'Upload'
            labelElement.appendChild(aElement)
            inputElement.setAttribute("id", `rReferenceFile${ranNum}`)
            inputElement.setAttribute("type", "file")
            inputElement.style.display = 'none'
            cloneNode.appendChild(labelElement)
            cloneNode.appendChild(inputElement)

            trElement2.appendChild(cloneNode)
            tdElement3.classList.add("deleteRow");
            trElement2.appendChild(tdElement3)

            dataFragment.appendChild(trElement1);
            dataFragment.appendChild(trElement2);
            tBodyEle.appendChild(dataFragment);

        }//增加一列
        else if (event.target.className === 'addColumn') {

            let nowEle = event.target;
            while (nowEle.previousElementSibling !== null) {
                nowEle = nowEle.previousElementSibling;
                if (nowEle.className === 'resizeBar') {
                    continue;
                }
                let length = nowEle.style.width === "" ? 32.14 : parseFloat(nowEle.style.width.split("%")[0]);
                //默认创建宽度为 5.6%，遍历前奇数个同胞元素的宽度，直到长度大于 (5.6+1.78) % 时，拆分被选中同胞元素
                if (length < 14.76) {
                    continue;
                }
                nowEle.style.width = `${length - 7.38}%`;

                let fragment = document.createDocumentFragment();
                //创建表头的一行，包括一个表头单元格和一个滑块
                let resizeBarEle = document.createElement("th");
                let newhead = document.createElement("th");

                resizeBarEle.classList.add("resizeBar");
                resizeBarEle.setAttribute("contenteditable", "false");
                newhead.style.width = '5.6%';
                newhead.draggable = true;
                fragment.appendChild(resizeBarEle);
                fragment.appendChild(newhead);
                nowEle.parentNode.insertBefore(fragment, event.target);

                //遍历 tbody 下的所有 tr，为偶数的 tr 增添一列，奇数的 tr 为装饰行
                let tBodyEle = nowEle.parentNode.parentNode.nextElementSibling;
                let number = tBodyEle.childElementCount;

                //获取元素位置，tbody 内在这个位置之后插入一对元素
                let index = Array.from(nowEle.parentNode.children).indexOf(nowEle);

                let tdEle1 = document.createElement("td");
                let tdEle2 = document.createElement("td");

                tdEle1.setAttribute("contentEditable", "false");

                for (let i = 1; i < number; i += 2) {
                    tBodyEle.children[i].insertBefore(tdEle1.cloneNode(false), tBodyEle.children[i].lastElementChild);
                    tBodyEle.children[i].insertBefore(tdEle2.cloneNode(false), tBodyEle.children[i].lastElementChild);
                }
                return;
            }

        }

        let element = document.querySelector("#textBarisClick");
        let element1 = document.querySelector("#resizeBarisClick")
        if (element !== null) {
            element.removeAttribute("id");
            element.parentNode.setAttribute("draggable", "true");
            element.style.backgroundColor = null;
            element.style.color = null;
        }
        if (element1 !== null) {
            element1.removeAttribute("id");
            element1.parentNode.parentNode.parentNode.parentNode.setAttribute("draggable", "true");
            element1.style.backgroundColor = null;
            element1.style.color = null;
        }
    })
    tempArea.addEventListener("mouseleave", (event) => {
        let textBarisClick = document.querySelector("#textBarisClick");
        if (textBarisClick !== null) {
            textBarisClick.removeAttribute("id");
            textBarisClick.parentNode.setAttribute("draggable", "true");
            textBarisClick.style.backgroundColor = null;
            textBarisClick.style.color = null;
        }
        let resizeBarisClick = document.querySelector("#resizeBarisClick")
        if (resizeBarisClick !== null) {
            resizeBarisClick.removeAttribute("id");
            resizeBarisClick.parentNode.parentNode.parentNode.parentNode.setAttribute("draggable", "true");
            resizeBarisClick.style.backgroundColor = null;
            resizeBarisClick.style.color = null;
        }
    })

    tempArea.addEventListener("change", (event) => {
        if (event.target.getAttribute("id") !== null) {
            if (event.target.getAttribute("id").match("rDataFile")) {
                handleFiles(event)
            } else if (event.target.getAttribute("id").match("pictureUpload")) {
                handleImgs(event)
            } else if (event.target.getAttribute("id").match("rReferenceFile")) {
                getInfo(event)
            }
        }
    })

    //显示图片
    function handleImgs(event) {
        let file = event.target.files.item(0);
        if (file === null) {
            return;
        }
        //必须是 img 类型
        let imageType = /^image\//;

        if (!imageType.test(file.type)) {
            return;
        }

        let labelEle = event.target.previousElementSibling;
        let imgEle = document.createElement("img");

        imgEle.file = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (function (aImg) {
            return function (e) {
                aImg.src = e.target.result;
                console.log("原大小为：" + e.target.result.length / 1024 + "KB")
            };
        })(imgEle);

        let canvas = document.createElement('canvas');
        imgEle.onload = function () {
            let context = canvas.getContext('2d');
            //如果大于 854，等比例缩放
            let ratio = imgEle.width / imgEle.height
            if (imgEle.width < 854) {
                canvas.width = imgEle.width
                canvas.height = imgEle.height
            } else {
                canvas.width = 854
                canvas.height = 854 / ratio
            }
            // 核心JS就这个
            context.drawImage(imgEle, 0, 0, canvas.width, canvas.height);
            //文件必须小于 1M
            if (canvas.toDataURL(file.type, null).length > 1024 * 1024) {
                alert("文件过大")
                return
            }
            console.log("canvas压缩后为：" + canvas.toDataURL(file.type, null).length / 1024 + "KB")
            canvas.setAttribute("type", file.type);
            labelEle.innerText = null;
            labelEle.style.height = "unset";
            labelEle.style.padding = "unset";
            labelEle.style.textAlign = "unset";
            labelEle.style.border = "unset";
            labelEle.appendChild(canvas);
        }
    }

    //处理上传文件
    function handleFiles(event) {

        let file = event.target.files.item(0);
        if (file === null) {
            return;
        }
        let aEle = event.target.previousElementSibling.firstElementChild;
        aEle.style = null
        aEle.innerText = file.name;
    }

    //解析常用的文献格式，获取里面的信息
    function getInfo(event) {
        let file = event.target.files.item(0);
        if (file === null) {
            return;
        }
        //获取文件后缀
        let formatArr = file.name.split(".");
        let format = formatArr.pop();

        let fileReader = new FileReader();
        fileReader.readAsText(file);

        let paperYear;
        let paperJournal;
        let paperTitle;
        let paperDOI;

        fileReader.onload = (function () {
            return function (e) {
                if (format.match(/bib/)) {
                    console.log(JSON.stringify(e.target.result))
                    let temp = e.target.result.match(/,[\r\n\t]+[ ]*journal[ ]*=.*[\r\n\t]+/i)[0].match(/[{"].*[}"]/)[0].trim();
                    paperJournal = temp.slice(1, temp.length - 1)
                    temp = e.target.result.match(/,[\r\n\t]+[ ]*title[ ]*=.*[\r\n\t]+/i)[0].match(/[{"}.*[}"]/)[0].trim();
                    paperTitle = temp.slice(1, temp.length - 1)
                    if (e.target.result.match(/,[\r\n\t]+[ ]*year[ ]*=.*[\r\n\t]+/i) !== null) {
                        temp = e.target.result.match(/,[\r\n\t]+[ ]*year[ ]*=.*[\r\n\t]+/i)[0].match(/[{"].*[}"]/)[0].trim()
                        paperYear = temp.slice(1, temp.length - 1)
                    } else {
                        paperYear = 'xxxx'
                    }
                    //匹配 DOI url 路径
                    if (e.target.result.match(/http[s]*:\/\/.+/i) !== null) {
                        //除掉 doi URL 路径的残留末尾：} || , || }, || ",
                        if (e.target.result.match(/http[s]*:\/\/.+/i)[0].trim().endsWith('},') || e.target.result.match(/http[s]*:\/\/.+/i)[0].trim().endsWith('",')) {
                            paperDOI = e.target.result.match(/http[s]*:\/\/.+/i)[0].trim().slice(0, e.target.result.match(/http[s]*:\/\/.+/i)[0].trim().length - 2)
                        } else if (e.target.result.match(/http[s]*:\/\/.+/i)[0].trim().endsWith('}') || e.target.result.match(/http[s]*:\/\/.+/i)[0].trim().endsWith(',')) {
                            paperDOI = e.target.result.match(/http[s]*:\/\/.+/i)[0].trim().slice(0, e.target.result.match(/http[s]*:\/\/.+/i)[0].trim().length - 1)
                        } else {
                            paperDOI = e.target.result.match(/http[s]*:\/\/.+/i)[0].trim()
                        }
                    }
                } else if ("ris" === format) {
                    console.log(JSON.stringify(e.target.result))
                    //ris 格式中可能用 PY 表示年份
                    if (e.target.result.match(/[\r\n]+PY[ ]*-[ ]*.*[\r\n]+/) !== null) {
                        paperYear = e.target.result.match(/[\r\n]+PY[ ]*-[ ]*.*[\r\n]+/)[0].split('-')[1].trim().slice(0, 4);
                    }//也可能用 Y1 表示年份
                    else if (e.target.result.match(/[\r\n]+Y1[ ]*-[ ]*.*[\r\n]+/) !== null) {
                        paperYear = e.target.result.match(/[\r\n]+Y1[ ]*-[ ]*.*[\r\n]+/)[0].split('-')[1].trim().slice(0, 4);
                    }//也可能用 Y2 表示年份
                    else if (e.target.result.match(/[\r\n]+Y2[ ]*-[ ]*.*[\r\n]+/) !== null) {
                        paperYear = e.target.result.match(/[\r\n]+Y2[ ]*-[ ]*.*[\r\n]+/)[0].split('-')[1].trim().slice(0, 4);
                    }
                    //ris 格式中可能用 T1 表示标题
                    if (e.target.result.match(/[\r\n]+T1[ ]*-[ ]*.*[\r\n]+/) !== null) {
                        paperTitle = e.target.result.match(/[\r\n]+T1[ ]*-[ ]*.*[\r\n]+/)[0].split(/[\r\n]+T1[ ]*-/)[1].trim();
                    }//ris 格式中也可能用 TI 表示标题
                    else if (e.target.result.match(/[\r\n]+TI[ ]*-[ ]*.*[\r\n]+/) !== null) {
                        paperTitle = e.target.result.match(/[\r\n]+TI[ ]*-[ ]*.*[\r\n]+/)[0].split(/[\r\n]+TI[ ]*-/)[1].trim();
                    }
                    //ris 格式中可能用 JO 表示期刊名
                    if (e.target.result.match(/[\r\n]+JO[ ]*-[ ]*.*[\r\n]+/) !== null) {
                        paperJournal = e.target.result.match(/[\r\n]+JO[ ]*-[ ]*.*[\r\n]+/)[0].split('-')[1].trim()
                    }//也可能用 JS 表示期刊名
                    else if (e.target.result.match(/[\r\n]+JF[ ]*-[ ]*.*[\r\n]+/) !== null) {
                        paperJournal = e.target.result.match(/[\r\n]+JF[ ]*-[ ]*.*[\r\n]+/)[0].split('-')[1].trim()
                    }
                    paperDOI = e.target.result.match(/http[s]*:\/\/.+/i)[0]
                } else if ("enw" === format) {
                    console.log(JSON.stringify(e.target.result))
                    //匹配 DOI url 路径
                    if (e.target.result.match(/http[s]*:\/\/.+/i) !== null) {
                        paperDOI = e.target.result.match(/http[s]*:\/\/.+/i)[0]
                    } else {
                        paperDOI = "doi not found!"
                    }
                    paperTitle = e.target.result.match(/[\r\n\t]+%T[ ]*.*/)[0].split("%T")[1].trim();
                    paperYear = e.target.result.match(/[\r\n\t]+%D[ ]*.*/)[0].split("%D")[1].trim().slice(0, 4);
                    paperJournal = e.target.result.match(/[\r\n\t]+%J[ ]*.*/)[0].split("%J")[1].trim();
                } else {
                    alert("暂不支持此文件格式")
                    return
                }
                event.target.parentNode.parentNode.children[0].innerText = `${paperYear}`;
                event.target.parentNode.parentNode.children[2].innerText = `${paperJournal}`;
                event.target.parentNode.parentNode.children[4].innerText = `${paperTitle}`;
                event.target.parentNode.parentNode.children[4].setAttribute("title", `${paperTitle}`);
                event.target.parentNode.parentNode.children[6].querySelector("a").setAttribute("href", `${paperDOI}`);
                event.target.parentNode.parentNode.children[6].querySelector("a").innerText = `${paperDOI}`;
                event.target.parentNode.parentNode.children[6].querySelector("a").style = null;
                event.target.parentNode.removeChild(event.target)
            }
        })();
    }

    //序列化图片模块
    function serializePicture(child) {
        const canvas = child.querySelector("canvas");
        if (canvas === null) {
            return null;
        } else {
            return `width_${canvas.width}height_${canvas.height}` + canvas.toDataURL(canvas.getAttribute("type"), null)
        }

    }

    //反序列化图片模块
    function deserializePicture(child) {
        let fragment = createModule("picture");
        if (child.title !== "") {
            let pictureTitle = fragment.querySelector("input");
            pictureTitle.value = child.title;
        }
        if (child.content !== null) {
            let pictureLabel = fragment.querySelector("label");
            pictureLabel.innerText = null;
            pictureLabel.style.height = "unset";
            pictureLabel.style.padding = "unset";
            pictureLabel.style.textAlign = "unset";
            pictureLabel.style.border = "unset";
            let canvasEle = document.createElement("canvas")
            //设置 canvas 宽度和高度
            canvasEle.width = (child.content.match(/width_\d+height_\d+/)[0].match(/width_\d+/)[0].split("_")[1]);
            canvasEle.height = (child.content.match(/width_\d+height_\d+/)[0].match(/height_\d+/)[0].split("_")[1]);
            //获取 dataURL 并转为 blob
            let blob = dataURItoBlob((child.content.replace(/width_\d+height_\d+/, "")))
            let imgEle = document.createElement("img");
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = (function (aImg) {
                return function (e) {
                    aImg.src = e.target.result;
                    console.log("还原后的大小为：" + e.target.result.length / 1024 + "KB")
                };
            })(imgEle);
            imgEle.onload = function () {
                let context = canvasEle.getContext('2d');
                // 核心JS就这个
                context.drawImage(imgEle, 0, 0, canvasEle.width, canvasEle.height);
            }
            canvasEle.setAttribute("type", blob.type);
            pictureLabel.appendChild(canvasEle);
        }
        return fragment;
    }

    //反序列化文字模块
    function deserializeText(child) {
        let fragment = createModule("text");
        if (child.title !== "") {
            let textTitle = fragment.querySelector("input");
            textTitle.value = child.title;
        }
        if (child.content !== "") {
            let textTextarea = fragment.querySelector("textarea");
            textTextarea.innerText = child.content;
        }
        return fragment;
    }

    //反序列化表格模块
    function deserializeTable(child) {
        let fragment = createModule("table");
        if (child.title !== "") {
            let tableTitle = fragment.querySelector("input");
            tableTitle.value = child.title;
        }
        if (child.content !== "") {
            let table = JSON.parse(child.content);
            let thContainer
            let thResizeBar
            let trParent = document.createElement("tr");
            //渲染 thead
            table.thead.forEach((element, index, arr) => {
                thContainer = document.createElement("th");
                thResizeBar = document.createElement("th");

                thContainer.setAttribute("draggable", "true");
                thResizeBar.setAttribute("contenteditable", "false");
                thResizeBar.classList.add("resizeBar");
                thContainer.innerText = element.content;
                thContainer.style.width = element.width;
                trParent.appendChild(thContainer)
                trParent.appendChild(thResizeBar)
            })
            //把最后一个th的 class 名字改成 addColumn
            trParent.lastElementChild.setAttribute("class", "addColumn");
            //填充好数据的 tr 替换原始的 tr
            fragment.querySelector("thead").replaceChild(trParent, fragment.querySelector("thead").firstElementChild);


            //渲染 tbody
            let rowNum = table.tbody.length //行数
            let colNum = table.thead.length //列数
            //当表体不为空时
            if (rowNum > 0) {
                let tbody = document.createElement("tbody");
                tbody.setAttribute("contenteditable", "true");

                //遍历行数
                for (let i = 0; i < rowNum; i++) {
                    //每一行都由两个 tr 组成，一个是装饰用的 tr，一个是填充内容的 tr
                    let trPadding = document.createElement("tr");
                    let trContainer = document.createElement("tr");
                    let tdPadding = document.createElement("td");
                    tdPadding.setAttribute("contenteditable", "false");
                    tdPadding.setAttribute("colspan", "10000");
                    tdPadding.setAttribute("class", "addPadding");
                    trPadding.appendChild(tdPadding);
                    //遍历列数
                    for (let j = 0; j < colNum; j++) {
                        //每一列都是由两个 td 组成，一个是滑块，一个是填充内容
                        let tdContainer = document.createElement("td");
                        let tdResizeBar = document.createElement("td");
                        tdResizeBar.setAttribute("contenteditable", "false")
                        tdContainer.innerText = table.tbody[i][j];
                        trContainer.appendChild(tdContainer)
                        trContainer.appendChild(tdResizeBar)
                    }
                    //每一个内容行的最后一个 td 需要添加类名 deleteRow
                    trContainer.lastElementChild.setAttribute("class", "deleteRow");
                    tbody.appendChild(trPadding)
                    tbody.appendChild(trContainer)
                }
                fragment.querySelector("tbody").parentNode.replaceChild(tbody, fragment.querySelector("tbody"));
            }
        }
        return fragment;
    }

    //序列化表格模块
    function serializeTable(child) {
        let table = {thead: [], tbody: []}
        //序列化表头
        table = serializeTableHead(table, child)
        //序列化表体
        table = serializeTableBody(table, child)
        return table;
    }

    /**
     * 序列化表格模块表头
     * @param table
     * @param child
     * @return {DocumentFragment}
     */
    function serializeTableHead(table, child) {
        //收集表头信息
        const tHeadEle = child.querySelector("thead");
        for (let index = 0; index < tHeadEle.firstElementChild.children.length; index++) {
            let element = tHeadEle.firstElementChild.children[index];
            //收集表头信息，排除分隔符的影响
            if (index % 2 === 0) {
                table.thead.push({
                    //表头内容
                    content: element.innerText,
                    //表头宽度
                    width: element.style.width === "" ? "32.14%" : element.style.width
                })
            }
        }
        return table;
    }

    /**
     * 序列化表格模块表体
     * @param table
     * @param child
     * @return {DocumentFragment}
     */
    function serializeTableBody(table, child) {
        //收集表体信息
        const tbodyEle = child.querySelector("tbody")
        for (let i = 0; i < tbodyEle.childElementCount; i++) {
            //收集表体信息，排除分隔符影响
            if ((i + 1) % 2 === 0) {
                let arr = []
                //tbody 下的 tr 个数
                let length = tbodyEle.children[i].childElementCount;
                //跳过奇数个 tr
                for (let j = 0; j < length; j++) {
                    //奇数个 tr 里排除分隔符
                    if (j % 2 === 0) {
                        //同一行的内容存储在一个数组中
                        arr.push(tbodyEle.children[i].children[j].innerText)
                    }
                }
                //遍历完一行，将数组放入 tbody 中
                table.tbody.push(arr)
            }
        }
        return table
    }

    //序列化参考模块
    function serializeReference(child) {
        let table = {thead: [], tbody: []}
        //序列化表头
        table = serializeReferenceHead(table, child)
        //序列化表体
        table = serializeReferenceBody(table, child);
        return table;
    }

    /**
     * 序列化参考模块表头
     * @param table
     * @param child
     * @return {DocumentFragment}
     */
    function serializeReferenceHead(table, child) {
        //收集表头信息
        const tHeadEle = child.querySelector("thead");
        for (let index = 0; index < tHeadEle.firstElementChild.children.length; index++) {
            let element = tHeadEle.firstElementChild.children[index];
            //收集表头信息，排除分隔符的影响
            if (index % 2 === 0) {
                table.thead.push(element.innerText)
            }
        }
        return table;
    }

    /**
     * 序列化参考模块表体
     * @param table
     * @param child
     * @return {DocumentFragment}
     */
    function serializeReferenceBody(table, child) {
        //收集表体信息
        const tbodyEle = child.querySelector("tbody")
        for (let i = 0; i < tbodyEle.childElementCount; i++) {
            //收集表体信息，排除分隔符影响
            if ((i + 1) % 2 === 0) {
                let arr = []
                let length = tbodyEle.children[i].childElementCount;
                //跳过奇数个 tr
                for (let j = 0; j < length; j++) {
                    //奇数个 tr 里排除分隔符
                    if (j % 2 === 0) {
                        //同一行的内容存储在一个数组中
                        arr.push(tbodyEle.children[i].children[j].innerText)
                    }
                }
                //遍历完一行，将数组放入 tbody 中
                table.tbody.push(arr)
            }
        }
        return table;
    }

    //反序列化参考模块
    function deserializeReference(child) {
        let fragment = createModule("reference");
        if (child.title !== "") {
            let referenceTitle = fragment.querySelector("input");
            referenceTitle.value = child.title;
        }
        if (child.content !== "") {
            let reference = JSON.parse(child.content);
            let thContainer
            let thResizeBar
            let trParent = document.createElement("tr");
            //渲染 thead
            reference.thead.forEach((element, index, arr) => {
                thContainer = document.createElement("th");
                thResizeBar = document.createElement("th");

                thResizeBar.setAttribute("contenteditable", "false");
                thContainer.innerText = element;
                trParent.appendChild(thContainer)
                trParent.appendChild(thResizeBar)
            })
            //把最后一个th的 class 名字改成 noAddColumn
            trParent.lastElementChild.setAttribute("class", "noAddColumn");
            //把倒数第二个 th 改成不可更改
            trParent.lastElementChild.previousElementSibling.setAttribute("contenteditable", "false");
            //填充好数据的 tr 替换原始的 tr
            fragment.querySelector("thead").replaceChild(trParent, fragment.querySelector("thead").firstElementChild);

            //渲染 tbody
            let rowNum = reference.tbody.length //行数
            let colNum = reference.thead.length //列数
            //当表体不为空时
            if (rowNum > 0) {
                let tbody = document.createElement("tbody");

                //遍历行数
                for (let i = 0; i < rowNum; i++) {
                    //每一行都由两个 tr 组成，一个是装饰用的 tr，一个是填充内容的 tr
                    let trPadding = document.createElement("tr");
                    let trContainer = document.createElement("tr");
                    let tdPadding = document.createElement("td");
                    tdPadding.setAttribute("contenteditable", "false");
                    tdPadding.setAttribute("colspan", "10000");
                    tdPadding.setAttribute("class", "addPadding");
                    trPadding.appendChild(tdPadding);
                    //一共有 4 列
                    for (let j = 0; j < 4; j++) {
                        //每一列都是由两个 td 组成，一个是滑块，一个是填充内容
                        let tdContainer = document.createElement("td");
                        let tdResizeBar = document.createElement("td");
                        tdResizeBar.setAttribute("contenteditable", "false")
                        switch (j) {
                            case 0:
                                tdContainer.innerText = reference.tbody[i][j];
                                break
                            case 1:
                                tdContainer.innerText = reference.tbody[i][j];
                                break
                            case 2:
                                tdContainer.innerText = reference.tbody[i][j];
                                tdContainer.setAttribute("title", reference.tbody[i][j])
                                break
                            case 3:
                                tdContainer.setAttribute("contenteditable", "false");
                                let labelEle = document.createElement("label");
                                let aEle = document.createElement("a");
                                aEle.setAttribute("target", "_blank");
                                if (reference.tbody[i][j] === 'Upload') {
                                    let inputEle = document.createElement("input");
                                    let randomNum = Math.random();
                                    labelEle.setAttribute("for", `rReferenceFile${randomNum}`)
                                    inputEle.setAttribute("type", "file");
                                    inputEle.setAttribute("id", `rReferenceFile${randomNum}`);
                                    inputEle.style.display = "none";
                                    tdContainer.appendChild(inputEle)
                                    aEle.style.color = "rgb(59, 55, 55)";
                                    aEle.innerText = "Upload"
                                } else {
                                    aEle.innerText = reference.tbody[i][j]
                                    aEle.href = reference.tbody[i][j];
                                }
                                labelEle.appendChild(aEle);
                                tdContainer.appendChild(labelEle)
                                break
                        }
                        trContainer.appendChild(tdContainer)
                        trContainer.appendChild(tdResizeBar)
                    }
                    //每一个内容行的最后一个 td 需要添加类名 deleteRow
                    trContainer.lastElementChild.setAttribute("class", "deleteRow");
                    tbody.appendChild(trPadding)
                    tbody.appendChild(trContainer)
                }
                fragment.querySelector("tbody").parentNode.replaceChild(tbody, fragment.querySelector("tbody"));
            }
        }
        return fragment;
    }

    //反序列化数据模块
    function deserializeData(child) {
        let fragment = createModule("data");
        if (child.title !== "") {
            let dataTitle = fragment.querySelector("input");
            dataTitle.value = child.title;
        }
        if (child.content !== "") {
            let data = JSON.parse(child.content);
            let thContainer
            let thResizeBar
            let trParent = document.createElement("tr");
            //渲染 thead
            data.thead.forEach((element, index, arr) => {
                thContainer = document.createElement("th");
                thResizeBar = document.createElement("th");

                thResizeBar.setAttribute("contenteditable", "false");
                thContainer.innerText = element;
                trParent.appendChild(thContainer)
                trParent.appendChild(thResizeBar)
            })
            //把最后一个th的 class 名字改成 noAddColumn
            trParent.lastElementChild.setAttribute("class", "noAddColumn");
            //把倒数第二个 th 改成不可更改
            trParent.lastElementChild.previousElementSibling.setAttribute("contenteditable", "false");
            //填充好数据的 tr 替换原始的 tr
            fragment.querySelector("thead").replaceChild(trParent, fragment.querySelector("thead").firstElementChild);

            //渲染 tbody
            let rowNum = data.tbody.length //行数
            let colNum = data.thead.length //列数
            //当表体不为空时
            if (rowNum > 0) {
                let tbody = document.createElement("tbody");
                //遍历行数
                for (let i = 0; i < rowNum; i++) {
                    //每一行都由两个 tr 组成，一个是装饰用的 tr，一个是填充内容的 tr
                    let trPadding = document.createElement("tr");
                    let trContainer = document.createElement("tr");
                    let tdPadding = document.createElement("td");
                    tdPadding.setAttribute("contenteditable", "false");
                    tdPadding.setAttribute("colspan", "10000");
                    tdPadding.setAttribute("class", "addPadding");
                    trPadding.appendChild(tdPadding);
                    //一共有 4 列
                    for (let j = 0; j < 4; j++) {
                        //每一列都是由两个 td 组成，一个是滑块，一个是填充内容
                        let tdContainer = document.createElement("td");
                        let tdResizeBar = document.createElement("td");
                        tdResizeBar.setAttribute("contenteditable", "false")
                        switch (j) {
                            case 0:
                                tdContainer.innerText = data.tbody[i][j];
                                break
                            case 1:
                                tdContainer.innerText = data.tbody[i][j];
                                break
                            case 2:
                                tdContainer.innerText = data.tbody[i][j];
                                break
                            case 3:
                                tdContainer.setAttribute("contenteditable", "false");
                                let labelEle = document.createElement("label");
                                let aEle = document.createElement("a");
                                let inputEle = document.createElement("input");
                                aEle.setAttribute("target", "_blank");
                                let randomNum = Math.random();
                                labelEle.setAttribute("for", `rDataFile${randomNum}`)
                                inputEle.setAttribute("type", "file");
                                inputEle.setAttribute("id", `rDataFile${randomNum}`);
                                inputEle.style.display = "none";
                                if (data.tbody[i][j] === 'Upload') {
                                    aEle.style.color = "rgb(59, 55, 55)";
                                    aEle.innerText = "Upload"
                                } else {
                                    aEle.innerText = data.tbody[i][j]
                                }
                                labelEle.appendChild(aEle);
                                tdContainer.appendChild(labelEle)
                                tdContainer.appendChild(inputEle)
                                break
                        }
                        trContainer.appendChild(tdContainer)
                        trContainer.appendChild(tdResizeBar)
                    }
                    //每一个内容行的最后一个 td 需要添加类名 deleteRow
                    trContainer.lastElementChild.setAttribute("class", "deleteRow");
                    tbody.appendChild(trPadding)
                    tbody.appendChild(trContainer)
                }
                fragment.querySelector("tbody").parentNode.replaceChild(tbody, fragment.querySelector("tbody"));
            }
        }
        return fragment;
    }

    //用户保存反应
    const saveReactionImg = document.querySelector("#saveReaction");
    saveReactionImg.addEventListener("click", (event) => {
            //获取反应名字
            let reactionTitle = document.querySelector("#reactionName").value;

            if (!/.{1,40}/.test(reactionTitle.trim())) {
                popAutoCloseModal("请输入标题", 2000)
                return
            }

            let reactionDate = document.querySelector("#reactionDate").value;
            //正确的日期格式，闰年的 2 月份有 29 天
            if (!/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(reactionDate.replaceAll("/", "-"))) {
                popAutoCloseModal("请输入正确的日期格式", 2000)
                return;
            }

            let tags = [];
            const elementsByClassName = document.getElementsByClassName("tag");
            for (let i = 0; i < elementsByClassName.length; i++) {
                if (elementsByClassName[i].innerText.trim() !== "") {
                    //每个 tag 只保存 10 个字符长度
                    tags.push(elementsByClassName[i].innerText.substring(0, 10))
                } else if (elementsByClassName[i].innerText.trim() === "") {
                    //删除空标签
                    elementsByClassName[i].parentNode.removeChild(elementsByClassName[i]);
                    tagCount--;
                    i--;
                }
            }
            let reactionForm = {
                tags: tags,
                modules: [],
                title: reactionTitle,
                date: reactionDate
            };
            for (let i = 0; i < tempArea.childElementCount; i++) {
                const child = tempArea.children.item(i);
                if (child.className === "picture") {
                    reactionForm.modules.push({
                        index: i + 1,
                        moduleName: "picture",
                        title: child.firstElementChild.value,
                        content: serializePicture(child)
                    })
                } else if (child.className === 'rText') {
                    reactionForm.modules.push({
                        index: i + 1,
                        moduleName: "text",
                        title: child.firstElementChild.value,
                        content: child.querySelector("textarea").value
                    })
                } else if (child.className === "rTable") {
                    reactionForm.modules.push({
                        index: i + 1,
                        moduleName: "table",
                        title: child.firstElementChild.value,
                        content: JSON.stringify(serializeTable(child))
                    })
                } else if (child.className === "rData") {
                    reactionForm.modules.push({
                        index: i + 1,
                        moduleName: "data",
                        title: child.firstElementChild.value,
                        content: JSON.stringify(serializeReference(child))
                    })
                } else if (child.className === 'rReference') {
                    reactionForm.modules.push({
                        index: i + 1,
                        moduleName: "reference",
                        title: child.firstElementChild.value,
                        content: JSON.stringify(serializeReference(child))
                    })
                }
            }

            if (JSON.stringify(reactionForm).length > 1024 * 1024) {
                alert("总大小不能超过 1 M")
            } else {
                axios.put(`/reaction/`, reactionForm).then(function (response) {
                    if (response.data.code === 200) {
                        if (response.data.object !== null) {
                            //保存成功则保存一份到 sessionStorage 中
                            sessionStorage.setItem("reactionForm", JSON.stringify(response.data.object))
                            popAutoCloseModal(response.data.message, 1000, "false")
                            //更改导航栏标题
                            document.querySelector(".reactionName").innerText = reactionTitle;
                            //更新 session
                            let versionReaction = sessionStorage.getItem("versionControl");
                            if (versionReaction !== null) {
                                let arr = JSON.parse(versionReaction);
                                if (arr.length > 9) {
                                    arr.shift();
                                }
                                arr.push({
                                    dateTime: response.data.object.createDateTime,
                                    id: response.data.object.id
                                })
                                sessionStorage.setItem("versionControl", versionReaction = JSON.stringify(arr))
                            } else {
                                sessionStorage.setItem("versionControl", versionReaction = JSON.stringify([{
                                    dateTime: response.data.object.createDateTime,
                                    id: response.data.object.id
                                }]))
                            }
                            let ulEle = document.querySelector("#rightAside").querySelector("ul");
                            ulEle.innerText = "";
                            drawRightAside(JSON.parse(versionReaction), ulEle);
                        } else {
                            popAutoCloseModal("保存失败", 1000)
                        }
                    } else {
                        popAutoCloseModal(response.data.message, 1000)
                    }
                })
            }
        }
    )

    //用户保存模板
    document.querySelector("#saveAsTemplate").addEventListener("click", (event) => {
        //获取弹出框的内容作为 template 标题，标题不能为空
        let inputEle = document.querySelector("#addTemplateModal").querySelector("input");
        if (/.{1,10}/.test(inputEle.value)) {
            //序列化模板
            let reactionForm = {
                tags: null,
                modules: [],
                //借用 title 属性暂时保存模块名字
                title: inputEle.value,
                date: null
            };
            for (let i = 0; i < tempArea.childElementCount; i++) {
                const child = tempArea.children.item(i);
                if (child.className === "picture") {
                    reactionForm.modules.push({
                        index: i + 1,
                        moduleName: "picture",
                        title: child.firstElementChild.value,
                        content: null
                    })
                } else if (child.className === 'rText') {
                    reactionForm.modules.push({
                        index: i + 1,
                        moduleName: "text",
                        title: child.firstElementChild.value,
                        content: null
                    })
                } else if (child.className === "rTable") {
                    reactionForm.modules.push({
                        index: i + 1,
                        moduleName: "table",
                        title: child.firstElementChild.value,
                        content: JSON.stringify(serializeTableHead({thead: [], tbody: []}, child))
                    })
                } else if (child.className === "rData") {
                    reactionForm.modules.push({
                        index: i + 1,
                        moduleName: "data",
                        title: child.firstElementChild.value,
                        content: JSON.stringify(serializeReferenceHead({thead: [], tbody: []}, child))
                    })
                } else if (child.className === 'rReference') {
                    reactionForm.modules.push({
                        index: i + 1,
                        moduleName: "reference",
                        title: child.firstElementChild.value,
                        content: JSON.stringify(serializeReferenceHead({thead: [], tbody: []}, child))
                    })
                }
            }

            if (JSON.stringify(reactionForm).length > 100 * 1024) {
                alert("总大小不能超过 100 KB")
            } else {
                axios.put(`/template/`, reactionForm).then(function (response) {
                    if (response.data.code === 200) {
                        //清空 title 属性，因为这是之前用来暂时存放模块名字
                        response.data.object.title = null;
                        //保存成功则更新 sessionStorage
                        sessionStorage.setItem("reactionForm", JSON.stringify(response.data.object))
                        popAutoCloseModal(response.data.message, 1000, "false")
                        //更改导航栏标题
                        document.querySelector(".reactionName").innerText = inputEle.value;
                        // location.reload()
                        //保存一份模板到 sessionStorage 中
                        if (sessionStorage.getItem("templates") !== null) {
                            let arr = JSON.parse(sessionStorage.getItem("templates"));
                            if (arr.length > 9) {
                                arr.shift();
                            }
                            arr.push({
                                title: inputEle.value,
                                id: response.data.object.id,
                                modules: response.data.object.modules
                            })
                            sessionStorage.setItem("versionControl", JSON.stringify(arr))
                        } else {
                            sessionStorage.setItem("templates", JSON.stringify([{
                                title: inputEle.value,
                                id: response.data.object.id,
                                modules: response.data.object.modules
                            }]));
                        }
                    } else {
                        popAutoCloseModal(response.data.message, 1000)
                    }
                })
            }
        } else {
            popAutoCloseModal("请输入有效的名称", 2000)
        }
    })

    //用户更新模板
    document.querySelector("#saveTemplate").addEventListener("click", (event) => {
        //获取弹出框的内容作为 template 标题，标题不能为空
        let inputEle = document.querySelector("#addTemplateModal").querySelector("input");
        if (/.{1,10}/.test(inputEle.value)) {
            //序列化模板
        } else {
            popAutoCloseModal("请输入有效的名称", 2000)
        }
    })

    //渲染模板模态框
    document.querySelector("#getTemplate").addEventListener("click", (event) => {
        if (sessionStorage.getItem("templates") !== null) {
            let templates = JSON.parse(sessionStorage.getItem("templates"));
            drawTemplate(templates)
        } else {
            //向后端发送请求，请求用户的所有模板
            axios.get("/template/list").then(function (response) {
                if (response.data.code === 200) {
                    if (response.data.object !== null) {
                        drawTemplate(response.data.object);
                        //保存一份到 sessionStorage 中
                        sessionStorage.setItem("templates", JSON.stringify(response.data.object));
                    }
                }
            })
        }
    })

    //用户新建模板时
    document.querySelector("#newTemplate").addEventListener("click", (event) => {
        let tempArea = document.querySelector("#putTemplate");
        tempArea.innerText = "";
        let reactionForm = {
            id: null,
            modules: [],
            date: null,
            title: null,
            tags: [],
            projectId: null,
            createDateTime: null,
            reactionId: null,
            collectionKey: null
        }
        drawTemplateArea(reactionForm, tempArea);
    })

    //用户删除和查看模板
    const templateModal = document.querySelector("#reactionTemplateModal");
    templateModal.querySelector(".modal-body").addEventListener("click", (event) => {
        let objectId
        //用户删除模板
        if (event.target instanceof HTMLImageElement) {
            objectId = event.target.parentNode.getAttribute("id")
            popCloseModal(`确认删除模块${event.target.nextElementSibling.innerText}吗？`, "deleteTemplate", `${objectId}`)
            //用户查看模板
        } else if (event.target instanceof HTMLButtonElement) {
            objectId = event.target.getAttribute("id");
        } else if (event.target instanceof HTMLSpanElement) {
            objectId = event.target.parentNode.getAttribute("id");
        }
        if (sessionStorage.getItem("templates") !== null) {
            let arr = JSON.parse(sessionStorage.getItem("templates"));
            arr.forEach((element) => {
                if (element.id === objectId) {
                    sessionStorage.setItem("reactionForm", JSON.stringify(element));
                    location.reload()
                }
            })
        } else {
            axios.post(`/template/${objectId}`).then(function (response) {
                if (response.data.code === 200) {
                    sessionStorage.setItem("reactionForm", JSON.stringify(response.data.object));
                    location.reload()
                    location.reload()
                } else {
                    popAutoCloseModal("失败", 2000)
                }
            })
        }
    })

    //用户点击模态框确认按钮时
    const dialogCloseBtn = document.querySelector("#dialogClose button[type='submit']");
    dialogCloseBtn.addEventListener("click", (event) => {
        const name = event.target.getAttribute("name");
        const value = event.target.getAttribute("value");
        //用户确认删除反应
        if (name === 'deleteTemplate') {
            axios.delete(`/template/${value}`).then(function (response) {
                if (response.data.code === 200) {
                    //从页面中移除该模板
                    let templateArea = document.querySelector("#templateArea");
                    for (let i = 0; i < templateArea.childElementCount; i++) {
                        if (templateArea.children[i].getAttribute("id") === value) {
                            templateArea.removeChild(templateArea.children[i])
                            break;
                        }
                    }
                    //更新 session 中的 templates
                    if (sessionStorage.getItem("templates") !== null) {
                        let arr = JSON.parse(sessionStorage.getItem("templates"));
                        arr = arr.filter((element) => {
                            return element.id !== value;
                        })
                        sessionStorage.setItem("templates", JSON.stringify(arr));
                    }
                    if (sessionStorage.getItem("reactionForm") !== null) {
                        if (JSON.parse(sessionStorage.getItem("reactionForm")).id === value) {
                            sessionStorage.removeItem("reactionForm");
                            // location.reload();
                        }
                    }
                } else {
                    //修改失败则弹窗提示
                    popAutoCloseModal("删除失败", 1000);
                }
            })
        }
    })

    //用户输入日期时，自动添加 /
    document.querySelector("#reactionDate").addEventListener("keyup", (event) => {
        if (event.target.value.length === 4) {
            event.target.value = event.target.value + '/';
        } else if (event.target.value.length === 7) {
            event.target.value = event.target.value + "/"
        }
    });

    //用户跳转到指定版本
    const ulEle = document.querySelector("#rightAside").querySelector("ul");
    let timer;
    ulEle.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            let id = event.target.getAttribute("id");
            let ulEle = document.querySelector("#rightAside").querySelector("ul");
            //删除当前 li 样式
            for (let i = 0; i < ulEle.childElementCount; i++) {
                ulEle.children[i].firstElementChild.removeAttribute("class");
            }
            //激活点击 li 样式
            event.target.classList.add("active");
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                axios.post(`/reaction/${id}`).then(function (response) {
                    if (response.data.code === 200) {
                        if (response.data.object !== null) {
                            document.querySelector(".reactionName").innerText = response.data.object.title
                            let tempArea = document.querySelector("#putTemplate");
                            tempArea.innerText = "";
                            //画主页面
                            drawTemplateArea(response.data.object, tempArea);
                            sessionStorage.setItem("reactionForm", JSON.stringify(response.data.object));
                        }
                    }
                })
            }, 500)
        }
    })

    /**
     * dataurl 转为 blob
     * @param dataURI
     * @return {Blob}
     */
    function dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        let byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0) {
            byteString = atob(dataURI.split(',')[1]);
        } else byteString = unescape(dataURI.split(',')[1]);

        // separate out the mime component
        const mimeString = dataURI
            .split(',')[0]
            .split(':')[1]
            .split(';')[0];

        // write the bytes of the string to a typed array
        const ia = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], {type: mimeString});
    }

    /**
     * 绘制右边的历史记录
     */
    function drawRightAside(data, ulEle) {
        let frag = document.createDocumentFragment();
        data.forEach((element) => {
            let liEle = document.createElement("li");
            let aEle = document.createElement("a");
            liEle.classList.add("list-group-item");
            aEle.setAttribute("href", "javascript:;");
            aEle.style.width = "100%";
            aEle.innerText = element.dateTime;
            aEle.setAttribute("id", element.id);
            liEle.appendChild(aEle);
            frag.appendChild(liEle)
        })
        //激活最新一个 li 的样式
        frag.lastElementChild.firstElementChild.classList.add("active");
        ulEle.appendChild(frag);
    }

    /**
     * 绘制主界面
     */
    function drawTemplateArea(reactionForm, tempArea) {
        //填充 title
        document.querySelector("#reactionName").value = reactionForm.title;
        //填充日期
        document.querySelector("#reactionDate").value = reactionForm.date;
        //填充标签
        let addTagBtn = document.querySelector("#addTag");
        let addTagBtnParent = addTagBtn.parentNode
        switch (addTagBtnParent.childElementCount) {
            case 5:
                addTagBtnParent.removeChild(addTagBtnParent.children[3])
            case 4:
                addTagBtnParent.removeChild(addTagBtnParent.children[2])
            case 3:
                addTagBtnParent.removeChild(addTagBtnParent.children[1])
        }
        tagCount = reactionForm.tags.length;
        if (tagCount === 3) {
            addTagBtn.style.display = "none"
        } else {
            addTagBtn.style = null;
        }
        for (let i = 0; i < tagCount; i++) {
            let spanEle = document.createElement("span");
            spanEle.classList.add("tag")
            spanEle.setAttribute('contenteditable', 'true');
            spanEle.innerText = reactionForm.tags[i]
            addTagBtn.parentNode.insertBefore(spanEle, addTagBtn);
        }
        //填充 module
        for (let i = 0; i < reactionForm.modules.length; i++) {
            switch (reactionForm.modules[i].moduleName) {
                case "picture":
                    tempArea.appendChild(deserializePicture(reactionForm.modules[i]));
                    break;
                case "text":
                    tempArea.appendChild(deserializeText(reactionForm.modules[i]))
                    break;
                case "table":
                    tempArea.appendChild(deserializeTable(reactionForm.modules[i]))
                    break;
                case "data":
                    tempArea.appendChild(deserializeData(reactionForm.modules[i]))
                    break;
                case "reference":
                    tempArea.appendChild(deserializeReference(reactionForm.modules[i]))
                    break;
            }
        }
    }

    /**
     * 绘制模板页面
     */
    function drawTemplate(templates) {
        let templateArea = document.querySelector("#templateArea");
        //删除除了最后一个 button 的所有 button
        for (let i = 0; i < templateArea.childElementCount - 1; i++) {
            templateArea.removeChild(templateArea.children[i])
        }
        let fragment = document.createDocumentFragment();
        templates.forEach((element) => {
            let buttonEle = document.createElement("button");
            let spanEle = document.createElement("span");
            let imageEle = document.createElement("img");
            imageEle.setAttribute("src", "/chemlab/img/reaction/close.svg");
            buttonEle.classList.add("userDefined");
            buttonEle.setAttribute("type", "button")
            buttonEle.setAttribute("id", element.id)
            spanEle.innerText = element.title;
            buttonEle.appendChild(imageEle)
            buttonEle.appendChild(spanEle);
            fragment.appendChild(buttonEle)
        })
        templateArea.insertBefore(fragment, templateArea.lastElementChild);
    }
}


