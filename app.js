const noResource = document.querySelector('#N-R');
const noProcess = document.querySelector('#N-P');
const processButton = document.querySelector('.process-btn');
const processList = document.querySelector('.process-list');
const resourceTable = document.querySelector('.resource-table');
const maxTable = document.querySelector('.max-table');
const needTable = document.querySelector('.need-table');
const safeTable = document.querySelector('.safe-table');
const availableTable = document.querySelector('.available-table');
const calculateButton = document.querySelector('.calculate-btn');

processButton.addEventListener('click',addProcess);

calculateButton.addEventListener('click',calculate);

function addProcess(event){
    event.preventDefault();
    
    const processDiv = document.createElement('div');
    processDiv.classList.add('process');

    
 
    for(let i = 0; i < noProcess.value; i++){
        const tableRow = document.createElement('tr');
        for(let j = 0; j < noResource.value; j++){
            const tableData = document.createElement('td');
            
            let inputDataLabel = document.createElement('label');
            let inputData = document.createElement('input');
            
            
            inputDataLabel.setAttribute('for',`${i}${j}`);
            inputDataLabel.innerText = `P${i+1} R${j+1}`;

            inputData.setAttribute('type','number');
            inputData.setAttribute('id',`ALL${i}${j}`);
            inputData.setAttribute('name',`${i}-${j}`);
            
            tableData.appendChild(inputDataLabel);
            tableData.appendChild(inputData);
            
            tableRow.appendChild(tableData);
        }
        resourceTable.appendChild(tableRow);
    }

    for(let i = 0; i < noProcess.value; i++){
        const tableRow = document.createElement('tr');
        for(let j = 0; j < noResource.value; j++){
            const tableData = document.createElement('td');
            
            let inputDataLabel = document.createElement('label');
            let inputData = document.createElement('input');
            
            
            inputDataLabel.setAttribute('for',`${i}${j}`);
            inputDataLabel.innerText = `P${i+1} R${j+1}`;

            inputData.setAttribute('type','number');
            inputData.setAttribute('id',`MAX${i}${j}`);
            inputData.setAttribute('name',`${i}-${j}`);
            
            tableData.appendChild(inputDataLabel);
            tableData.appendChild(inputData);
            
            tableRow.appendChild(tableData);
        }
        maxTable.appendChild(tableRow);
    }

        const tableRow = document.createElement('tr');
        let i = 0;
        for(let j = 0; j < noResource.value; j++){
            const tableData = document.createElement('td');
            
            let inputDataLabel = document.createElement('label');
            let inputData = document.createElement('input');
            
            
            inputDataLabel.setAttribute('for',`${i}${j}`);
            inputDataLabel.innerText = `R${j+1}`;

            inputData.setAttribute('type','number');
            inputData.setAttribute('id',`AVAL${i}${j}`);
            inputData.setAttribute('name',`${i}-${j}`);
            
            tableData.appendChild(inputDataLabel);
            tableData.appendChild(inputData);
            
            tableRow.appendChild(tableData);
        }
        availableTable.appendChild(tableRow);



}

function calculate(e) {
    e.preventDefault();
    console.log('hello');
    let Allocation = new Array();
    let allo = new Array();
    let Max = new Array();
    let max = new Array();
    let Available = new Array();
    let Need = new Array();
    let need = new Array();
    const availableCopy = Available;
    let newnewAvailable = new Array();
    let safe = new Array();

        for(let j = 0; j < noResource.value; j++){
            i = 0;
            Available.push(parseInt(document.getElementById(`AVAL${i}${j}`).value));
        }

        console.log(Available);
        newnewAvailable.push(availableCopy);

    
    
    for (let i = 0; i < noProcess.value; i++) {
        for (let j = 0; j < noResource.value; j++) {
            allo.push(parseInt( document.getElementById(`ALL${i}${j}`).value) );
            max.push(parseInt(document.getElementById(`MAX${i}${j}`).value));
            
            need.push(parseInt(document.getElementById(`MAX${i}${j}`).value - document.getElementById(`ALL${i}${j}`).value));
            
        }

        Allocation.push(allo);
        allo = new Array();
        Max.push(max);
        max = new Array();
        Need.push(need);
        need = new Array();
        
    }

    for(let i = 0; i < noProcess.value; i++){
        const tableRow = document.createElement('tr');
        for(let j = 0; j < noResource.value; j++){
            const tableData = document.createElement('td');
            tableData.innerText = `P${i+1} R${j+1}      ${Need[i][j]}`;
                        
            tableRow.appendChild(tableData);
        }
        needTable.appendChild(tableRow);
    }
    console.log(Allocation);
    console.log(Max);
    console.log(Need);

    let complete = new Array();
    for (let i = 0; i < noProcess.value; i++) {
        complete.push(0);
        
    }
    console.log(complete);

    let newAvailable = Array.from(Available);
    let fAvailable = new Array();
    console.log(newAvailable);
    
    for (let k = 0; k < noProcess.value; k++) {
        for (let i = 0; i < noProcess.value; i++) {
            if(complete[i]===0)
            {
                for (let j = 0; j < noResource.value; j++) {
                    if (IsTrue(Need, newAvailable, i)) {
    
                        console.log(`pass${i}`);
                        
                        newAvailable[j] = newAvailable[j] - Need[i][j];
                        newAvailable[j] = Max[i][j]  + newAvailable[j];

                        // console.log(newAvailable);
                        fAvailable.push (newAvailable[j]);
    
                        complete[i] = 1;
                    }
                    else
                    {
                        console.log('fail');
                    }
                }
                if (IsTrue(Need, newAvailable, i)) {
                    newnewAvailable.push(fAvailable);
                    fAvailable = new Array();
                    safe.push(i);    
                }
                else
                {
                    fAvailable = new Array();
                }
                    
            }
                

            
        }
    }
    function IsTrue(Need,newAvailable, i) {
        console.log(Need);
        console.log(newAvailable);
        for (let j = 0; j < noResource.value; j++) {
            if(Need[i][j] > newAvailable[j])
            {
                return false;
            }
            
        }
        return true;
        
    }

    function safeState(complete){
        for(let i = 0; i < complete.length; i++){
            if(complete[i] === 0){
                return false;
            }
        }
        return true;
    }

    if (safeState(complete)) {
        console.log('safe');
        const ss = document.getElementById('Safe-State');
        ss.innerText = 'The system is in Safe State';
        for (let i = 0; i < safe.length; i++) {
            ss.innerText += `P${safe[i]}, `;
            
        }
    
        for(let i = 0; i < newnewAvailable.length; i++){
            const tableRow = document.createElement('tr');
            
            for(let j = 0; j < noResource.value; j++){
                const tableData = document.createElement('td');
                tableData.innerText = `P${i+1} R${j+1}      ${newnewAvailable[i][j]}`;
                            
                tableRow.appendChild(tableData);
            }
            safeTable.appendChild(tableRow);
            
        }
        console.log(safe);
    
        console.log(newnewAvailable);
        
    }
    else{
        const ss = document.getElementById('Safe-State');
        ss.innerText = 'The system is  not in safe State';

        console.log('not safe');
    }
        
    
}


