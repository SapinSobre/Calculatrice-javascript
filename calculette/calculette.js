var ecran = document.getElementById('ecran');

var nums = document.querySelectorAll('.boutonNum');
nums.forEach(function (num) {    
    num.addEventListener("click", function (e) {            
        if (e.target.innerText !== ",")
            if (ecran.innerHTML === "0") ecran.innerHTML = e.target.innerText;
            else ecran.innerHTML += e.target.innerHTML;
        else {            
            if (!isNaN(ecran.innerHTML.charAt(ecran.innerHTML.length - 1))){
                if (ecran.innerHTML.indexOf(".") === -1) ecran.innerHTML += ".";
                else {
                    var ecranSansMoins = ecran.innerText;
                    if (ecranSansMoins.charAt(0) === "-") ecranSansMoins = ecranSansMoins.substring(1, ecran.innerText.length);
                    if (ecranSansMoins.indexOf("+") > -1 || ecranSansMoins.indexOf("x") > -1 || ecranSansMoins.indexOf(":") > -1 || ecranSansMoins.indexOf("-") > -1)
                        ecran.innerHTML += ".";                   
                }
            }                 
        }             
    });
})

var ops = document.querySelectorAll('.boutonOp');
ops.forEach(function (op) {
    op.addEventListener("click", function (e) {
        var nbSansMoins = ecran.innerHTML;
        if (ecran.innerHTML.charAt(0) === "-") nbSansMoins = ecran.innerHTML.substring(1, ecran.innerHTML.length);

        if (e.target.innerHTML === "-" && ecran.innerHTML === "0") ecran.innerHTML = "";

        if (nbSansMoins.length > 0) {
            if (!isNaN(nbSansMoins.charAt(nbSansMoins.length - 1))
                && nbSansMoins.charAt(nbSansMoins.length - 1) !== ".") {
                if (nbSansMoins.indexOf("+") === -1 &&
                    (nbSansMoins.indexOf("-") === -1 || (nbSansMoins.indexOf("-") > -1 && nbSansMoins.charAt(nbSansMoins.indexOf("-") + 1) !== "-"))
                    && nbSansMoins.indexOf("x") === -1 && nbSansMoins.indexOf(":") === -1)
                    ecran.innerHTML += e.target.innerHTML;
            }
            if (e.target.innerHTML === "-") {
                if (nbSansMoins.indexOf("+") === -1 && nbSansMoins.indexOf("x") === -1
                    && nbSansMoins.indexOf(":") === -1 && nbSansMoins.indexOf("-") === -1) {
                    if (nbSansMoins.length === 0) ecran.innerHTML += e.target.innerHTML;
                }
                else if (!isNaN(nbSansMoins.charAt(nbSansMoins.length - 2))
                    && isNaN(nbSansMoins.charAt(nbSansMoins.length - 1)) && nbSansMoins.charAt(nbSansMoins.length -1) !== ".")
                    ecran.innerHTML += e.target.innerHTML;
            }
        }
    });
})

var egal = document.getElementById('egal');
egal.addEventListener("click", function () {
    var nbSansMoins = ecran.innerHTML, nombre1, nombre2, op;
    if (ecran.innerHTML.charAt(0) === "-") nbSansMoins = ecran.innerHTML.substring(1, ecran.innerHTML.length);
  
    for (var i = 0; i < nbSansMoins.length; i++) {
        if (isNaN(nbSansMoins.charAt(i)) && nbSansMoins.charAt(i) !== ".") op = nbSansMoins.charAt(i);
    }
    console.log("operateur = " + op);
    if (op) {       
        var positionOperateur = nbSansMoins.indexOf(op);        
        nombre1 = parseFloat(ecran.innerHTML.substring(0, parseInt(positionOperateur + 1)));
        if (nbSansMoins.indexOf("x") === -1 && nbSansMoins.indexOf(":") === -1)
            nombre2 = parseFloat(nbSansMoins.substring(parseInt(positionOperateur) + 1), nbSansMoins.indexOf(nbSansMoins.length - 1));
        else if (nbSansMoins.indexOf("x") > -1 || nbSansMoins.indexOf(":") > -1) {
            if (op === "-") {
                nombre2 = parseFloat(nbSansMoins.substring(parseInt(positionOperateur)), nbSansMoins.indexOf(nbSansMoins.length - 1));
                op = nbSansMoins.charAt(positionOperateur -1);
            }
            else {
                nombre2 = parseFloat(nbSansMoins.substring(parseInt(positionOperateur + 1)), nbSansMoins.indexOf(nbSansMoins.length - 1));
                op = nbSansMoins.charAt(positionOperateur);
            }
        }        
        switch (op) {
            case "+": ecran.innerHTML = nombre1 + nombre2;
                break;
            case "x": ecran.innerHTML = nombre1 * nombre2;
                break;
            case ":": ecran.innerHTML = nombre1 / nombre2;
                break;
            case "-": ecran.innerHTML = nombre1 - nombre2;
                break;
            default:
                ecran.innerHTML = "Erreur";
        }
    }    
});

var reset = document.getElementById("reset");
reset.addEventListener("click", function () {
    ecran.innerHTML = "0";
});