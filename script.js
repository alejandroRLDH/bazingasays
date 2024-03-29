let round = 0;
//colorsDisponibles -> tots els colors que hi ha al joc, mai canvia.
let colorsDisponibles = ["#ff1650", "#f299ff", "#a182ff", "#2672ff", "#6cc2ff", "#35e500", "#ffe547", "#ff9d37", "#c7c7c7"];
//colorsGenerats -> lista de tots els colors generats dins el joc, mai mostrada.
let colorsGenerats = [];
//colorsJoc -> lista que s'usa al joc, copia de l'anterior i fa shift.
let colorsJoc = [];
let input = 0;
let range = 0;
let checkcheck = 0;
let check = true;

function start(){
    //No deixa fer click a començar una altra vegada i fa reset a tot.
    document.getElementById("startbutton").hidden = true;
    document.getElementById("check").hidden = true;
    document.getElementById("checktext").hidden = true;
    document.getElementById("message").innerHTML = "";
    round = 0;
    colorsDisponibles = ["#ff1650", "#f299ff", "#a182ff", "#2672ff", "#6cc2ff", "#35e500", "#ffe547", "#ff9d37", "#c7c7c7"];
    colorsGenerats = [];
    colorsJoc = [];
    //Mecanisme per tornar color ja que quan perds es torna blanc la casella que has clickat.
    for(let i = 0 ; i < colorsDisponibles.length ; i++){
        document.getElementById("bColor" + i).style.backgroundColor = colorsDisponibles[i];
    }
    startRound();
}

async function startRound(){
    //No deixa fer click a cap botó i suma ronda.
    input = 0;
    round++
    //Modifica la rapidesa dels colors cada ronda.
    range = document.getElementById("range").value;
    document.getElementById("message").innerHTML = "Ronda " + round + "." + "<br>" + "No pots fer click.";
    //Calcul de color, mostrador i push.
    colorsGenerats.push(colorsDisponibles[Math.trunc(Math.random()*colorsDisponibles.length)]);
    if(check==true){
        for(let i = 0; i < colorsGenerats.length; i++){
            //Espera un poc entre cada color per mostrar blanc.
            await esperar(range*10-range*6);
            showNotification(colorsGenerats[i]);
            await esperar( range*10+1);
            document.getElementById("notification").style.backgroundColor = "#fff";
        }
    }else{
        showNotification(colorsGenerats[colorsGenerats.length-1]);
        await esperar( range*10+1);
        document.getElementById("notification").style.backgroundColor = "#fff";
    }
    //Mecanisme per copiar tots els colors d'una variable a l'altra.
    for(let i = 0; i < colorsGenerats.length; i++){
        colorsJoc.push(colorsGenerats[i]);
    }
    input = 1;
    document.getElementById("message").innerHTML = "Ronda " + round + "." + "<br>" + "Pots fer click."
}

function esperar(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

//Mostra la notificació al panell notification.
//Mostra el color hexadecimal passat per paràmetre.
function showNotification(message) {
    var notification = document.getElementById('notification');
    notification.style.backgroundColor=message
    notification.style.display = 'block';
    setTimeout(function() {
    }, range*10);
}

async function colorInput(color){
    //Comprova si pot clickar i si ha clickat el color correcte.
    //If per el mode seqüència i sense seqüència.
    if(check==true){
        if(input==1){
            if(colorsDisponibles[color] == colorsJoc[0]){
                //Mecanisme per fer un petit flash per feedback.
                document.getElementById("bColor" + color).style.backgroundColor = "#fff";
                await esperar(100);
                document.getElementById("bColor" + color).style.backgroundColor = colorsJoc[0];
                colorsJoc.shift();
            }else{
                lose(color);
            }
            //Al fer shift suficients vegades fins que colorsJoc estigui buit, s'acaba la ronda.
            if(colorsJoc.length == 0){
                startRound();
            }
        }
    }else{
        if(input==1){
            if(colorsDisponibles[color] == colorsJoc[colorsJoc.length-1]){
                document.getElementById("bColor" + color).style.backgroundColor = "#fff";
                await esperar(100);
                document.getElementById("bColor" + color).style.backgroundColor = colorsJoc[colorsJoc.length-1];
                colorsJoc = [];
            }else{
                lose(color);
            }
            if(colorsJoc.length == 0){
                startRound();
            }
        }
    }
}

function lose(color){
    //Al perdre et deixa jugar una altra vegada, pero no clickar. Et diu els punts.
    input = 0;
    document.getElementById("startbutton").hidden = false;
    document.getElementById("check").hidden = false;
    document.getElementById("checktext").hidden = false;
    document.getElementById("message").innerHTML = "Has perdut!" + "<br>" + "Has conseguit " + round + " punts. Torna a intentar-ho!" + "<br>" + "Inserint virus dins el teu sistema..." + "<br>" + "Has jugat en mode ";
    //Comprova en quin mode has jugat per dir-t'ho.
    if(check==true){
        document.getElementById("message").innerHTML += "seqüència.";
    }else{
        document.getElementById("message").innerHTML += "sense seqüència.";
    }
    for(let i= 0 ; i < colorsDisponibles.length; i++){
        document.getElementById("bColor" + i).style.backgroundColor = "#cb0000";
    }
    //Fer el color equivocat blanc per que el jugador pugui veure que ha fet.
    document.getElementById("bColor" + color).style.backgroundColor = "#fff";
}

function docheck(){
    //Revisa si el quadrat de mostrar seqüència està marcat i a què canviar-ho.
    if(check==true){
        check = false;
    }else{
        check = true;
    }
}