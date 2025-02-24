function Check() {
    // Alle Input-Elemente mit type "text" selektieren
    const inputs = document.querySelectorAll('input[type="text"]');

    let maxValue = -Infinity;

    // Finde den höchsten Wert unter allen Inputs
    inputs.forEach(input => {
        const value = parseFloat(input.value);
        if (!isNaN(value) && value > maxValue) {
            maxValue = value;
        }
    });

    // Falls kein gültiger Maximalwert gefunden wurde, abbrechen
    if (maxValue <= 0) {
        console.log('Kein gültiger Maximalwert gefunden.');
        return;
    }

    // Berechne für alle Inputs die Höhe relativ zum höchsten Wert
    inputs.forEach(input => {
        const match = input.id.match(/\d+/);
        if (match) {
            const idNum = match[0]; // Die Nummer aus der ID extrahieren
            const inputValue = parseFloat(input.value);

            const balkenElement = document.getElementById(`balken${idNum}`);
            if (balkenElement) {
                if (!isNaN(inputValue)) {
                    // Berechne die Höhe als Prozentsatz des Maximalwerts
                    balkenElement.style.height = (inputValue / maxValue) * 100 + '%';
                } else {
                    console.log(`Ungültiger Wert im Input: In${idNum}`);
                }
            }
        }
    });
}

// Funktion alle 1000ms (1 Sekunde) ausführen
setInterval(Check, 1000);


//ADD
function add() {

    // Finde die höchste vorhandene ID
    const inputs = document.querySelectorAll('input[id^="In"]');
    let maxId = 0;

    inputs.forEach(input => {
        const match = input.id.match(/\d+/);
        if (match) {
            const num = parseInt(match[0], 10);
            if (num > maxId) {
                maxId = num;
            }
        }
    });

    const newId = maxId + 1; // Die neue ID wird um 1 erhöht

    // Neuen Balken erstellen
    const newBalken = document.createElement('div');
    newBalken.classList.add('balken');
    newBalken.id = `balken${newId}`;
    newBalken.onclick = function() {
        changeColor(this);
    };

    newBalken.style.height = '0px'; // Startwert für die Höhe

    // Neuen Input erstellen
    const newInput = document.createElement('input');
    newInput.type = 'text';
    newInput.id = `In${newId}`;
    newInput.addEventListener('input', Check); // Optional: Sofortiges Update

    //Liste
    const newListItem = document.createElement('div');
    const newListInputName = document.createElement('input');
    const newListInputValue = document.createElement('input');

    newListItem.classList.add('ListItem');
    newListInputName.classList.add('ListInput');
    newListInputValue.classList.add('ListInput');

    newListInputName.type = 'text';
    newListInputValue.type = 'text';

    newListItem.id = `InputItem${newId}`;
    newListInputName.id = `InputName${newId}`;
    newListInputValue.id = `InputValue${newId}`;

    newListInputName.onchange = function() {
        changeSmt(this, 'Name');
    };
    newListInputValue.onchange = function() {
        changeSmt(this, 'Value');
    };


    // BalkenContainer und InputContainer holen
    const balkenContainer = document.getElementById('BalkenContainer');
    const inputContainer = document.getElementById('InputContainer');
    const ListContainer = document.getElementById('ListContainer');

    // Elemente in ihre Container einfügen
    balkenContainer.appendChild(newBalken);
    inputContainer.appendChild(newInput);
    ListContainer.appendChild(newListItem);

    const ListItem = document.getElementById(`InputItem${newId}`);
    ListItem.appendChild(newListInputName);
    ListItem.appendChild(newListInputValue);

}
function changeColor(elem) {
    elem.style.backgroundColor = document.getElementById('clr').value;
    if (document.getElementById('txt').value != '') {
    elem.innerHTML = document.getElementById('txt').value;
    }
}
function changeSmt(elem, type) {
    let id = parseInt(elem.id.replace(/\D/g, ''));
    if (type == 'Name') {
        document.getElementById(`balken${id}`).innerHTML = elem.value;
    }
    if (type == 'Value') {
        document.getElementById(`In${id}`).value = elem.value;
    }
}
function klein() {
    alert('');
}
