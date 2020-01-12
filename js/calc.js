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
        } else if(nPrincipal<1||isNaN(nPrincipal)||typeof nPrincipal=='undefined'||nPrincipal=='') {
            nPrincipal='';
            $('#nPrincipal').val(nPrincipal);
        }

        if(nMonths>12) {
            nMonths=12;
            $('#nMonths').val(nMonths);
        } else if(nMonths<1||isNaN(nMonths)||typeof nMonths=='undefined'||nMonths=='') {
            nMonths='';
            $('#nMonths').val(nMonths);
        }
    
        nTEA=getTEA(nPrincipal,nMonths);
        nProfit=nTEA-nPrincipal;

        $("#calc #nTEA").text(nTEA.toLocaleString(window.navigator.language,{
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }));
        $("#calc #nProfit").text(nProfit.toLocaleString(window.navigator.language,{
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }));
        
    }

    $("#calc #nPrincipal")
        .keyup(runCalc)
        .blur(runCalc)
        .change(runCalc);

    $("#calc #nMonths")
        .keyup(runCalc)
        .blur(runCalc)
        .change(runCalc);

    runCalc();

});