/*
=====================================================================
			TODO:
	1. Utworzenie Tabeli  -----------------------------------  Done
	2. Dodawanie nowych elementów   -------------------------  Done
	3. Usuwanie istniejących elementów ----------------------  Done
	4. Edycja istniejących elementów    ---------------------  Done
	5. Przesuwanie elementów    -----------------------------
	6. Dodanie formularza   ---------------------------------  Done
	7. Dodanie komunikatów po każdej z czynności    ---------
    8. Utworzenie LocalStorage  -----------------------------
    9. Pobieranie danych z LocalStorage i ich wyświetlenie --
    10. Dodanie przycisku do edycji -------------------------
    11. Dodanie przycisku do usuwania   ---------------------
    12. Dodanie przycisku do przesunięcia produktu w górę  --
    13. dodanie przycisku do przesunięcia produktu w dół  ---
	
=====================================================================
*/
var table = document.createElement("table");
var form;
initializeTable();
addNewElementToTable("Gruszka",1.5,3);    //Test dla dodawania elementu
addNewElementToTable("Banan",2,8);        //Test dla dodawania elementu
addNewElementToTable("Jabłko",0.5,10);    //Test dla dodawania elementu
//deleteElementFromTable(1);                //Test dla usuwania elementu
function initializeTable() {
    let row = document.createElement("tr");
    addElementToRow(row,"LP");
    addElementToRow(row,"Nazwa");
    addElementToRow(row,"Cena");
    addElementToRow(row,"Ilość");
    addElementToRow(row,"Suma");
    let cell = document.createElement("td");
    let button = document.createElement("input");
    button.setAttribute("type","button");
    button.value = "Nowy produkt";
    cell.colSpan = 2;
    button.addEventListener("click",() => {
        if(form == null) {
            createForm("Dodaj");
        }
    })
    cell.appendChild(button);
    row.appendChild(cell);
    table.appendChild(row);
    document.body.appendChild(table);
}
function addElementToRow(row,text) {
    let element = document.createElement("td");
    element.textContent = text;
    row.appendChild(element);
}
function addArrow() {
    let row, typeofarrow;
    if(arguments.length == 1) {
        row = arguments[0];
    }
    else if(arguments.length == 2) {
        row = arguments[0];
        typeofarrow = arguments[1];
    }
    if(row.children.length > 0) {
        let length = row.children.length - 1;
        while(length >= 0) {
            row.children[length].remove();
            length--;
        }
    }
    let arrow = document.createElement("i");
    arrow.setAttribute("type","button");
    if(arguments.length == 2) {
        arrow.className = typeofarrow;
        switch(typeofarrow) {
            case "arrow up":
                arrow.addEventListener("click",() => {
                    changeButtons(row.parentElement,row.parentElement.parentElement.children[row.parentElement.children[0].textContent - 1]);
                })
                break;
            case "arrow down":
                arrow.addEventListener("click",() => {
                    changeButtons(row.parentElement,row.parentElement.parentElement.children[parseInt(row.parentElement.children[0].textContent)+1]);
                })
                break;
            default:
                break;
        }
        arrow.addEventListener("mouseover",() => {
            arrow.style.borderColor = "#606060";
            arrow.style.cursor = "pointer";
        })
        arrow.addEventListener("mouseout",() => {
            arrow.style.borderColor = "black";
            arrow.style.cursor = "default";
        })
        row.appendChild(arrow);
        return;
    }
    arrow.addEventListener("click",() => {
        changeButtons(row.parentElement,row.parentElement.parentElement.children[row.parentElement.children[0].textContent - 1]);
    })
    arrow.addEventListener("mouseover",() => {
        arrow.style.borderColor = "#606060";
        arrow.style.cursor = "pointer";
    })
    arrow.addEventListener("mouseout",() => {
        arrow.style.borderColor = "black";
        arrow.style.cursor = "default";
    })
    arrow.className = "arrow up";
    let arrow2 = document.createElement("i");
    arrow2.className = "arrow down";
    arrow2.setAttribute("type","button");
    arrow2.addEventListener("click",() => {
        changeButtons(row.parentElement,row.parentElement.parentElement.children[parseInt(row.parentElement.children[0].textContent)+1]);
    })
    arrow2.addEventListener("mouseover",() => {
        arrow2.style.borderColor = "#606060";
        arrow2.style.cursor = "pointer";
    })
    arrow2.addEventListener("mouseout",() => {
        arrow2.style.borderColor = "black";
        arrow2.style.cursor = "default";
    })
    let br = document.createElement("br");
    
    row.appendChild(arrow);
    row.appendChild(br);
    row.appendChild(arrow2);
}
function addButtons(row) {
    let element = document.createElement("td");
    let button1 = document.createElement("input");
    button1.setAttribute("type","button");
    button1.value = "Edytuj";
    let button2 = document.createElement("input");
    button2.setAttribute("type","button");
    button2.value = "Usuń";
    let br = document.createElement("br");
    element.appendChild(button1);
    element.appendChild(br);
    element.appendChild(button2);
    row.appendChild(element);
    
}
function addNewElementToTable(name, price, quantity) {
    let number = table.children.length;
    let row = document.createElement("tr");
    addElementToRow(row,number);
    addElementToRow(row,name);
    addElementToRow(row,price);
    addElementToRow(row,quantity);
    addElementToRow(row,(price*quantity));
    addButtons(row);
    addElementToRow(row);
    if(number > 1) {
        addArrow(row.children[6], "arrow up");
        let prevRow = table.children[number-1];
        if(number == 2) {
            addArrow(prevRow.children[6], "arrow down");
        }
        else {
            prevRow.children[6] = document.createElement("td");
            addArrow(prevRow.children[6]);
        }
    }
    table.appendChild(row);
}
function deleteElementFromTable(id) {
    let number = table.children.length;
    if(number < (id+1)) {
        return;
    }
    table.children[id].remove();
    if(number == (id+1)) {
        return;
    }
    while((id+1) < number) {
        id++;
        table.children[id-1].children[0].textContent--;
    }
}
function editElementFromTalbe(id,name,price,quantity) {
    let number = table.children.length;
    if(number < (id+1) || id == 0) {
        return;
    }
    let activeRow = table.children[id];
    activeRow.children[1].textContent = name;
    activeRow.children[2].textContent = price;
    activeRow.children[3].textContent = quantity;
    activeRow.children[4].textContent = price*quantity;
}
function createForm(buttonText) {
    form = document.createElement("form");
    form.setAttribute("method","post");
    let br = document.createElement("br");

    let nameLabel = document.createElement("label");
    let nameInput = document.createElement("input");
    nameLabel.textContent = "Nazwa";

    let priceLabel = document.createElement("label");
    let priceInput = document.createElement("input");
    priceInput.setAttribute("type","number");
    priceLabel.textContent = "Cena";

    let quantityLabel = document.createElement("label");
    let quantityInput = document.createElement("input");
    quantityLabel.textContent = "Ilość";
    let applyButton = document.createElement("input");
    applyButton.setAttribute("type","button");
    if(typeof buttonText === 'string') {
        applyButton.value = buttonText;
    } 
    else {
        applyButton.value = "Dodaj";
    }
    applyButton.addEventListener("click",() => {
        if(nameInput.value.length === 0) {
            return;
        }
        if(priceInput.value.length === 0) {
            return;
        }
        if(quantityInput.value.length === 0) {
            return;
        }
        if(isNaN(parseFloat(priceInput.value)) || isNaN(parseInt(quantityInput.value))) {
            return;
        }
        addNewElementToTable(nameInput.value,Math.floor(parseFloat(priceInput.value)*100)/100,parseInt(quantityInput.value));
        form.remove();
        form = null;
    })
    form.appendChild(nameLabel);
    form.appendChild(br);
    br = document.createElement("br");
    form.appendChild(nameInput);
    form.appendChild(br);
    br = document.createElement("br");
    form.appendChild(priceLabel);
    form.appendChild(br);
    br = document.createElement("br");
    form.appendChild(priceInput);
    form.appendChild(br);
    br = document.createElement("br");
    form.appendChild(quantityLabel);
    form.appendChild(br);
    br = document.createElement("br");
    form.appendChild(quantityInput);
    form.appendChild(br);
    form.appendChild(applyButton);
    document.body.appendChild(form);
}
function changeButtons(element1,element2) {
    let name = element1.children[1].textContent;
    let price = element1.children[2].textContent;
    let quantity = element1.children[3].textContent;
    element1.children[1].textContent = element2.children[1].textContent;
    element1.children[2].textContent = element2.children[2].textContent;
    element1.children[3].textContent = element2.children[3].textContent;
    element1.children[4].textContent = element1.children[2].textContent * element1.children[3].textContent;
    element2.children[1].textContent = name;
    element2.children[2].textContent = price;
    element2.children[3].textContent = quantity;
    element2.children[4].textContent = element2.children[2].textContent * element2.children[3].textContent;
}