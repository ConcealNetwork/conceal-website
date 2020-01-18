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

    runCalc();

    function populateTable() {
        let nCurrentMonth=1;

        while(nCurrentMonth<13) {
            let newRow=document.createElement('tr');
            let newColumn=document.createElement('td');
            newColumn.textContent=nCurrentMonth;
            newRow.append(newColumn);
            newColumn=document.createElement('td');
            newColumn.textContent=(getEIR('5000',nCurrentMonth)*100).toLocaleString(window.navigator.language,{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })+'%';
            newColumn.setAttribute('style','background:rgba(0, 255, 0,'+(nCurrentMonth-1)/30+')');
            newRow.append(newColumn);
            newColumn=document.createElement('td');
            newColumn.textContent=getTEA('5000',nCurrentMonth).toLocaleString(window.navigator.language,{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            newColumn.setAttribute('style','background:rgba(0, 255, 0,'+(nCurrentMonth-1)/30+')');
            newRow.append(newColumn);
            newColumn=document.createElement('td');
            newColumn.textContent=(getEIR('10000',nCurrentMonth)*100).toLocaleString(window.navigator.language,{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })+'%';
            newColumn.setAttribute('style','background:rgba(0, 255, 0,'+(nCurrentMonth)/25+')');
            newRow.append(newColumn);
            newColumn=document.createElement('td');
            newColumn.textContent=getTEA('10000',nCurrentMonth).toLocaleString(window.navigator.language,{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            newColumn.setAttribute('style','background:rgba(0, 255, 0,'+(nCurrentMonth)/25+')');
            newRow.append(newColumn);
            newColumn=document.createElement('td');
            newColumn.textContent=(getEIR('20000',nCurrentMonth)*100).toLocaleString(window.navigator.language,{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })+'%';
            newColumn.setAttribute('style','background:rgba(0, 255, 0,'+(nCurrentMonth+1)/20+')');
            newRow.append(newColumn);
            newColumn=document.createElement('td');
            newColumn.textContent=getTEA('2000',nCurrentMonth).toLocaleString(window.navigator.language,{
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            newColumn.setAttribute('style','background:rgba(0, 255, 0,'+(nCurrentMonth+1)/20+')');
            newRow.append(newColumn);
            $("#calcTable tbody").append(newRow);
            nCurrentMonth++;
        }
        
    }

    if($("#calcTable").length!==-1) {
        populateTable();
    }

});