let round = 0;
let colorsDisponibles = ["#ff1650", "#f299ff", "#a182ff", "#2672ff", "#6cc2ff", "#35e500", "#ffe547", "#ff9d37", "#c7c7c7"];
let colorsGenerats = [];
let colorsJoc = [];
let input = 0;

function start(){
    document.getElementById("startbutton").hidden = true;
    round = 0;
    colorsDisponibles = ["#ff1650", "#f299ff", "#a182ff", "#2672ff", "#6cc2ff", "#35e500", "#ffe547", "#ff9d37", "#c7c7c7"];
    colorsGenerats = [];
    colorsJoc = [];
    startRound()
}

async function startRound(){
    input = 0;
    round++
    colorsGenerats.push(colorsDisponibles[Math.trunc(Math.random()*colorsDisponibles.length)]);
    for(let i = 0; i < colorsGenerats.length; i++){
        await esperar(400);
        showNotification(colorsGenerats[i]);
        await esperar( 1001);
        document.getElementById("notification").style.backgroundColor = "#fff";
    }
    console.log(colorsGenerats);
    for(let i = 0; i < colorsGenerats.length; i++){
        colorsJoc.push(colorsGenerats[i]);
    }
    input = 1;
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
    }, 1000);
}

function colorInput(color){
    if(input==1){
        console.log(color +": "+colorsJoc.at(0) + "-" + colorsDisponibles[color])
        if (colorsDisponibles[color] == colorsJoc[0]){
            colorsJoc.shift();
        }else{
            document.getElementById("message").innerHTML = "IDIOTA"
        }
        if (colorsJoc.length == 0) {
            startRound();
        }
    }
}
