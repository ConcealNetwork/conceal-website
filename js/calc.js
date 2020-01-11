$(document).ready(function () {

    function getTEA(nPrincipal,nMonths) {

        let nBase;
        let nEAR;
        let nEIR;

        if(nPrincipal<10000) {
            nBase=0.029;
        } else if(nPrincipal>=10000&&nPrincipal<20000) {
            nBase=0.039;
        } else if(nPrincipal>=20000) {
            nBase=0.049;
        }

        nEAR=nBase+(nMonths-1)*0.001;

        nEIR=nEAR/12*nMonths;

        return nPrincipal*(1+nEIR);

    }

    function runCalc() {

        let nPrincipal;
        let nMonths;
        let nTEA;
        let nProfit;

        nPrincipal=$('#nPrincipal').val();
        nMonths=$('#nMonths').val();

        if(nPrincipal>9999999) {
            nPrincipal=9999999;
            $('#nPrincipal').val(nPrincipal);
        }

        if(nMonths>12) {
            nMonths=12;
            $('#nMonths').val(nMonths);
        }
    
        nTEA=getTEA(nPrincipal,nMonths);
        nProfit=nTEA-nPrincipal;

        $("#calc #nTEA").text(parseFloat(nTEA).toFixed(0));
        $("#calc #nProfit").text(parseFloat(nProfit).toFixed(0));

    }

    $("#calc #nPrincipal")
        .keyup(runCalc)
        .keypress(runCalc)
        .blur(runCalc)
        .change(runCalc);

    $("#calc #nMonths")
        .keyup(runCalc)
        .keypress(runCalc)
        .blur(runCalc)
        .change(runCalc);

    runCalc();

});