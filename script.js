let round = 0;
let colorsDisponibles = ["#ff1650", "#f299ff", "#a182ff", "#2672ff", "#6cc2ff", "#35e500", "#ffe547", "#ff9d37", "#c7c7c7"];
let colorsGenerats = [];
let colorsJoc = [];
let input = 0;

function start(){
    document.getElementById("startbutton").hidden = true;
    document.getElementById("message").innerHTML = "";
    round = 0;
    colorsDisponibles = ["#ff1650", "#f299ff", "#a182ff", "#2672ff", "#6cc2ff", "#35e500", "#ffe547", "#ff9d37", "#c7c7c7"];
    colorsGenerats = [];
    colorsJoc = [];
    startRound()
}

async function startRound(){
    input = 0;
    round++
    document.getElementById("message").innerHTML = "Ronda " + round + "." + "<br>" + "No pots fer click."
    colorsGenerats.push(colorsDisponibles[Math.trunc(Math.random()*colorsDisponibles.length)]);
    for(let i = 0; i < colorsGenerats.length; i++){
        await esperar(300);
        showNotification(colorsGenerats[i]);
        await esperar( 501);
        document.getElementById("notification").style.backgroundColor = "#fff";
    }
    console.log(colorsGenerats);
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

// Mostra la notificació al panell notification
// Mostra el color hexadecimal passat per paràmetre
function showNotification(message) {
    var notification = document.getElementById('notification');
    notification.style.backgroundColor=message
    notification.style.display = 'block';
    setTimeout(function() {
    }, 500);
}

function colorInput(color){
    if(input==1){
        console.log(color +": "+colorsJoc.at(0) + "-" + colorsDisponibles[color])
        if (colorsDisponibles[color] == colorsJoc[0]){
            colorsJoc.shift();
        }else{
            lose(color);
        }
        if (colorsJoc.length == 0) {
            startRound();
        }
    }
}

function lose(color){
    input = 0;
    document.getElementById("startbutton").hidden = false;
    document.getElementById("message").innerHTML = "Has perdut!" + "<br>" + "Has conseguit " + round + " punts. Torna a intentar-ho!" + "<br>" + "Inserint virus dins el teu sistema...";
}