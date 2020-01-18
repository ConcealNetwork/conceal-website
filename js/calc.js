$(document).ready(function () {

    function getEIR(nPrincipal,nMonths) {
        let nBase;
        let nEAR;

        if(nPrincipal<10000) {
            nBase=0.029;
        } else if(nPrincipal>=10000&&nPrincipal<20000) {
            nBase=0.039;
        } else if(nPrincipal>=20000) {
            nBase=0.049;
        }

        nEAR=nBase+(nMonths-1)*0.001;

        return nEAR/12*nMonths;
    }

    function getTEA(nPrincipal,nMonths) {

        let nEIR;

        nEIR=getEIR(nPrincipal,nMonths);

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

    if($("#calc").length!==-1) {
        runCalc();
    }


    /*
        Deposit Compound Interest Table
    */

    function populateCalcTableInterestCol(nCurrentMonth,nPrincipal) {

        newColumn=document.createElement('td');
        newColumn.textContent=(getEIR(nPrincipal,nCurrentMonth)*100).toLocaleString(window.navigator.language,{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })+'%';
        newColumn.setAttribute('style','background:rgba(0, 255, 0,'+(nCurrentMonth-1)/30+')');
        return newColumn;

    }

    function populateCalcTableTotalCol(nCurrentMonth,nPrincipal) {

        newColumn=document.createElement('td');
        newColumn.textContent=getTEA(nPrincipal,nCurrentMonth).toLocaleString(window.navigator.language,{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        newColumn.setAttribute('style','background:rgba(0, 255, 0,'+(nCurrentMonth-1)/30+')');
        return newColumn;

    }

    function populateTable() {
        
        let nCurrentMonth=1;

        while(nCurrentMonth<13) {

            let newRow=document.createElement('tr');
            let newColumn=document.createElement('td');
            let nTier1=5000;
            let nTier2=10000;
            let nTier2Max=19999;
            let nTier3=20000;
            let sLocale=window.navigator.language;
            let sLocaleOptions={minimumFractionDigits:0,maximumFractionDigits:0};

            // Principal
            $("#calcTable thead tr:nth-of-type(2) th:nth-of-type(2)").text(
                'Under '+nTier2.toLocaleString(sLocale,sLocaleOptions)+' CCX'
            );
            $("#calcTable thead tr:nth-of-type(2) th:nth-of-type(3)").text(
                nTier2.toLocaleString(sLocale,sLocaleOptions)+' - '+nTier2Max.toLocaleString(sLocale,sLocaleOptions)+' CCX'
            );
            $("#calcTable thead tr:nth-of-type(2) th:nth-of-type(4)").text(
                'Over '+nTier3.toLocaleString(sLocale,sLocaleOptions)+' CCX'
            );

            // Base/APR
            $("#calcTable thead tr:nth-of-type(3) th:nth-of-type(2)").text(
                $("#calcTable thead tr:nth-of-type(3) th:nth-of-type(2)").text().replace('%','').toLocaleString(sLocale,sLocaleOptions)+'%'
            );
            $("#calcTable thead tr:nth-of-type(3) th:nth-of-type(3)").text(
                $("#calcTable thead tr:nth-of-type(3) th:nth-of-type(3)").text().replace('%','').toLocaleString(sLocale,sLocaleOptions)+'%'
            );
            $("#calcTable thead tr:nth-of-type(3) th:nth-of-type(4)").text(
                $("#calcTable thead tr:nth-of-type(3) th:nth-of-type(4)").text().replace('%','').toLocaleString(sLocale,sLocaleOptions)+'%'
            );

            // Example
            $("#calcTable thead tr:nth-of-type(4) th:nth-of-type(2)").text(
                nTier1.toLocaleString(sLocale,sLocaleOptions)+' CCX'
            );
            $("#calcTable thead tr:nth-of-type(4) th:nth-of-type(3)").text(
                nTier2.toLocaleString(sLocale,sLocaleOptions)+' CCX'
            );
            $("#calcTable thead tr:nth-of-type(4) th:nth-of-type(4)").text(
                nTier3.toLocaleString(sLocale,sLocaleOptions)+' CCX'
            );

            // Max Interest
            $("#calcTable thead tr:nth-of-type(5) th:nth-of-type(2)").text(
                $("#calcTable thead tr:nth-of-type(5) th:nth-of-type(2)").text().replace('%','').toLocaleString(sLocale,sLocaleOptions)+'%'
            );
            $("#calcTable thead tr:nth-of-type(5) th:nth-of-type(3)").text(
                $("#calcTable thead tr:nth-of-type(5) th:nth-of-type(3)").text().replace('%','').toLocaleString(sLocale,sLocaleOptions)+'%'
            );
            $("#calcTable thead tr:nth-of-type(5) th:nth-of-type(4)").text(
                $("#calcTable thead tr:nth-of-type(5) th:nth-of-type(4)").text().replace('%','').toLocaleString(sLocale,sLocaleOptions)+'%'
            );

            newColumn.textContent=nCurrentMonth;
            newRow.append(newColumn);

            newRow.append(populateCalcTableInterestCol(nCurrentMonth,nTier1));
            newRow.append(populateCalcTableTotalCol(nCurrentMonth,nTier1));

            newRow.append(populateCalcTableInterestCol(nCurrentMonth,nTier2));
            newRow.append(populateCalcTableTotalCol(nCurrentMonth,nTier2));

            newRow.append(populateCalcTableInterestCol(nCurrentMonth,nTier3));
            newRow.append(populateCalcTableTotalCol(nCurrentMonth,nTier3));

            $("#calcTable tbody").append(newRow);

            nCurrentMonth++;

        }
        
    }
    
    if($("#calcTable table").length!==-1) {
        populateTable();
        $("#calcTable table").show();
    }

});