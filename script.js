let wordArray = [];

function updateArray() {
    let inputDiv = document.getElementById('inputDiv');
    let text = inputDiv.innerText;
    let words = text.split(',');
    wordArray = words.map(word => [word.trim(), 1]);
    displayWords();
}

function displayWords() {
    let outputDiv = document.getElementById('options');
    outputDiv.innerHTML = '';
    wordArray.forEach((word, index) => {
        // Skip if the word after the comma is empty or contains only spaces
        if (!word[0].trim()) {
            return;
        }

        let optionDiv = document.createElement('div');
        optionDiv.id = 'option';

        let p = document.createElement('p');
        p.innerText = word[0];
        let input = document.createElement('input');

        input.type = 'range';
        input.value = word[1];
        input.id = 'numberInput';
        input.setAttribute('step', 0.1);
        input.setAttribute('min', 0);
        input.setAttribute('max', 2);
        input.onchange = function() {
            wordArray[index][1] = this.value;
            updateOutputDiv();
        };
        optionDiv.appendChild(p);
        optionDiv.appendChild(input);
        outputDiv.appendChild(optionDiv);
    });

    if(window.innerWidth < 768){
        if (outputDiv.innerText.trim() != '') {        
            outputDiv.style.animation = 'fadeIn 0.5s ease-in-out forwards';
        }else{        
            outputDiv.style.animation = 'fadeOut 0.5s ease-in-out forwards';
        }
    }
}


function updateOutputDiv() {
    let outputDiv = document.getElementById('outputDiv');

    let newText = wordArray.map(word => word[1] == 1 ? word[0] : `(${word[0]}:${word[1]})`).join(', ');
    outputDiv.innerText = newText;

    if(window.innerWidth < 768){
        if (outputDiv.innerText.trim() != '') {        
            outputDiv.style.animation = 'fadeIn 0.5s ease-in-out forwards';
        }else{        
            outputDiv.style.animation = 'fadeOut 0.5s ease-in-out forwards';
        }
    }
}

$("#inputDiv").on('keyup', updateOutputDiv);




$("#outputDiv").on('click', function(){
    if(this.textContent.trim() != ''){

        // Copy the text inside the text field
        navigator.clipboard.writeText(this.textContent);
        
        // Alert the copied text
        alert("Copied the text: " + this.textContent);
    }
});
