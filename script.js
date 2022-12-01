/*
=====================================================================
			TODO:
	1. Utworzenie Tabeli  -----------------------------------  Done
	2. Dodawanie nowych elementów   -------------------------  Done
	3. Usuwanie istniejących elementów ----------------------  Done
	4. Edycja istniejących elementów    ---------------------  Done
	5. Przesuwanie elementów    -----------------------------
	6. Dodanie formularza   ---------------------------------
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
initializeTable();
//addNewElementToTable("Gruszka",1.5,3);    //Test dla dodawania elementu
//addNewElementToTable("Banan",2,8);        //Test dla dodawania elementu
//addNewElementToTable("Jabłko",0.5,10);    //Test dla dodawania elementu
//deleteElementFromTable(1);                //Test dla usuwania elementu
function initializeTable() {
    let row = document.createElement("tr");
    addElementToRow(row,"LP");
    addElementToRow(row,"Nazwa");
    addElementToRow(row,"Cena");
    addElementToRow(row,"Ilość");
    addElementToRow(row,"Suma");
    addElementToRow(row,'\xa0');
    addElementToRow(row,'\xa0');
    table.appendChild(row);
    document.body.appendChild(table);
}
function addElementToRow(row,text) {
    let element = document.createElement("td");
    element.textContent = text;
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