/*
=====================================================================
			TODO:
	1. Utworzenie Tabeli  -----------------------------------  Done
	2. Dodawanie nowych elementów   -------------------------
	3. Usuwanie istniejących elementów ----------------------
	4. Edycja istniejących elementów    ---------------------
	5. Przesuwanie elementów    -----------------------------
	6. Dodanie formularza   ---------------------------------
	7. Dodanie komunikatów po każdej z czynności    ---------
    8. Utworzenie LocalStorage  -----------------------------
    9. Pobieranie danych z LocalStorage i ich wyświetlenie --
	
=====================================================================
*/
var table = document.createElement("table");
initializeTable();
test();
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