'use strict'

// cala dostepna pamiec
let memory = new Array(10);

for(let i=0;i<memory.length;i++)
    memory[i] = new Array(3);

// wolna pamiec
let free = new Array(10);
let pFree = 9;

for(let i=0;i<free.length;i++)
    free[i] = i;

// lista
let pList = null;

// funkcja zwracajaca wolny indeks tablicy jesli takowy istnieje
let allocateMemory = () => {
    if (pFree == -1)
        return null;
    else{
        pFree--;
        return free[pFree+1];
    }
}

// funkcja zwalnia index z tablicy memory dodajac go do tablicy free aby umozliwić ponowne użycie tego indeksu
// można by dodac obsluge bledu
let freeMemory = (index) => {
    pFree++;
    free[pFree] = index;
}

// dodanie elementu na poczatek listy
let addToList = (key) => {
    let mem = allocateMemory();
    if(mem == null){
        console.log('Brak pamieci');
        process.exit(-1);
    }
    if(pList != null){
        memory[pList][0] = mem;
        memory[mem][1] = key;
        memory[mem][0] = null;
        memory[mem][2] = pList;
        pList = mem;
    }else{
        memory[mem][1] = key;
        memory[mem][0] = memory[mem][2] = null;
        pList = mem;
    }
}

// wyswietlenie wszystkich elementow z listy
let showAllItems = (list) => {
    let tmp = list;
    while(memory[tmp][2] != null){
        console.log(memory[tmp][1]);
        tmp = memory[tmp][2];
        if(memory[tmp][2] == null)
            console.log(memory[tmp][1]);
    }
}

// usuwanie elementu z listy




// test
addToList(3);
addToList(4);
addToList(5);
addToList(6);

showAllItems(pList);


process.exit(0);