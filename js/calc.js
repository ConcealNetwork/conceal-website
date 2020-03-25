document.addEventListener("DOMContentLoaded", function(event) { 

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

    nPrincipalElement=document.getElementById('nPrincipal');
    nMonthsElement=document.getElementById('nMonths');

    function runCalc() {

        let nPrincipal;
        let nMonths;
        let nTEA;
        let nProfit;

        nPrincipal=nPrincipalElement.value;
        nMonths=nMonthsElement.value;

        if(nPrincipal>9999999) {
            nPrincipal=9999999;
            nPrincipalElement.value = nPrincipal;
        } else if(nPrincipal<1||isNaN(nPrincipal)||typeof nPrincipal=='undefined'||nPrincipal=='') {
            nPrincipal='';
            nPrincipalElement.value = nPrincipal;
        }

        if(nMonths>12) {
            nMonths=12;
            nMonthsElement.value = nMonths;
        } else if(nMonths<1||isNaN(nMonths)||typeof nMonths=='undefined'||nMonths=='') {
            nMonths='';
            nMonthsElement.value = nMonths;
        }
    
        nTEA=getTEA(nPrincipal,nMonths);
        nProfit=nTEA-nPrincipal;

        document.getElementById('nTEA').textContent = nTEA.toLocaleString(window.navigator.language,{
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
        document.getElementById('nProfit').textContent = nProfit.toLocaleString(window.navigator.language,{
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
        
    }


    ['change','keyup','blur'].forEach( evt => 
        nPrincipalElement.addEventListener(evt, runCalc)
    );

    ['change','keyup','blur'].forEach( evt => 
        nMonthsElement.addEventListener(evt, runCalc)
    );

    
    runCalc();


    /*
        Deposit Compound Interest Table
    */

    function populateCalcTableInterestCol(nCurrentMonth,nPrincipal,nMuliplier) {

        newColumn=document.createElement('td');
        newColumn.textContent=(getEIR(nPrincipal,nCurrentMonth)*100).toLocaleString(window.navigator.language,{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })+'%';
        newColumn.style.background='rgba(0, 255, 0,'+(nCurrentMonth*nMuliplier/87)+')';
        return newColumn;

    }

    function populateCalcTableTotalCol(nCurrentMonth,nPrincipal,nMuliplier) {

        newColumn=document.createElement('td');
        newColumn.textContent=getTEA(nPrincipal,nCurrentMonth).toLocaleString(window.navigator.language,{
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        newColumn.style.background='rgba(0, 255, 0,'+(nCurrentMonth*nMuliplier/87)+')';
        return newColumn;

    }

    function populateTable() {
        
        let nCurrentMonth=1;

        let nTier1Mid=5000;
        let nTier2=10000;
        let nTier2Max=19999;
        let nTier3=20000;

        let nTier1Base=2.9;
        let nTier2Base=3.9;
        let nTier3Base=4.9;

        let nTier1MaxInterest=4;
        let nTier2MaxInterest=5;
        let nTier3MaxInterest=6;

        let sLocale=window.navigator.language;
        let sLocaleOptions={minimumFractionDigits:0,maximumFractionDigits:0};
        let sLocaleOptions2={minimumFractionDigits:2,maximumFractionDigits:2};

        var calcElement = document.getElementById('calcTable');
        if (typeof(calcElement) != 'undefined' && calcElement != null) {

            // Principal
            document.querySelector('#calcTable thead tr:nth-of-type(2) th:nth-of-type(2)').textContent
                = 'Under '+nTier2.toLocaleString(sLocale,sLocaleOptions)+' CCX';

            document.querySelector('#calcTable thead tr:nth-of-type(2) th:nth-of-type(3)').textContent
                =   nTier2.toLocaleString(sLocale,sLocaleOptions)+
                    ' - '+nTier2Max.toLocaleString(sLocale,sLocaleOptions)+' CCX';
            
            document.querySelector('#calcTable thead tr:nth-of-type(2) th:nth-of-type(4)').textContent
                = 'Over '+nTier3.toLocaleString(sLocale,sLocaleOptions)+' CCX';

            // Base/APR
            document.querySelector('#calcTable thead tr:nth-of-type(3) th:nth-of-type(2)').textContent
                = nTier1Base.toLocaleString(sLocale,sLocaleOptions2)+'%';
            
            document.querySelector('#calcTable thead tr:nth-of-type(3) th:nth-of-type(3)').textContent
                = nTier2Base.toLocaleString(sLocale,sLocaleOptions2)+'%';

            document.querySelector('#calcTable thead tr:nth-of-type(3) th:nth-of-type(4)').textContent
                = nTier3Base.toLocaleString(sLocale,sLocaleOptions2)+'%';

            // Example
            document.querySelector('#calcTable thead tr:nth-of-type(4) th:nth-of-type(2)').textContent
                = nTier1Mid.toLocaleString(sLocale,sLocaleOptions)+' CCX';

            document.querySelector('#calcTable thead tr:nth-of-type(4) th:nth-of-type(3)').textContent
                = nTier2.toLocaleString(sLocale,sLocaleOptions)+' CCX';

            document.querySelector('#calcTable thead tr:nth-of-type(4) th:nth-of-type(4)').textContent
                = nTier3.toLocaleString(sLocale,sLocaleOptions)+' CCX';

            // Max Interest
            document.querySelector('#calcTable thead tr:nth-of-type(5) th:nth-of-type(2)').textContent
                = nTier1MaxInterest.toLocaleString(sLocale,sLocaleOptions2)+'%';

            document.querySelector('#calcTable thead tr:nth-of-type(5) th:nth-of-type(3)').textContent
                = nTier2MaxInterest.toLocaleString(sLocale,sLocaleOptions2)+'%';

            document.querySelector('#calcTable thead tr:nth-of-type(5) th:nth-of-type(4)').textContent
                = nTier3MaxInterest.toLocaleString(sLocale,sLocaleOptions2)+'%';
        }

        while(nCurrentMonth<13) {

            let newRow=document.createElement('tr');
            let newColumn=document.createElement('td');

            newColumn.textContent=nCurrentMonth;
            newRow.append(newColumn);

            newRow.append(populateCalcTableInterestCol(nCurrentMonth,nTier1Mid,nTier1Base));
            newRow.append(populateCalcTableTotalCol(nCurrentMonth,nTier1Mid,nTier1Base));

            newRow.append(populateCalcTableInterestCol(nCurrentMonth,nTier2,nTier2Base));
            newRow.append(populateCalcTableTotalCol(nCurrentMonth,nTier2,nTier2Base));

            newRow.append(populateCalcTableInterestCol(nCurrentMonth,nTier3,nTier3Base));
            newRow.append(populateCalcTableTotalCol(nCurrentMonth,nTier3,nTier3Base));

            if (typeof(calcElement) != 'undefined' && calcElement != null) {
                document.querySelector("#calcTable tbody").append(newRow);
            } else {
                document.querySelector("#compoundInterestCalcTable tbody").append(newRow);
            }

            nCurrentMonth++;

        }
        
    }

    populateTable();

});