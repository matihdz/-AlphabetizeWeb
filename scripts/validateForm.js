import { form, wordsInput, resultInput, typeSortSelect } from './selectors.js';
import { deleteRecordConfidenceIfExist } from './speechAPI.js';
import { sortAlphabetical } from './filterAndSort.js';

form.addEventListener('submit', validateForm);

function validateForm(e) {
    e.preventDefault();

    const regEx = /^[A-Z\s\,\u00E0-\u00FC]+$/i;

    if(!wordsInput.value) {
        alertMsg('error', 'The field is required');
        return;
    } 
    else {
        if(!regEx.test(wordsInput.value)){
            alertMsg('error', 'Numbers and symbols are not allowed ');
            return;
        } 
        else {
            const isAlertExist = document.querySelector('.alertForm');
            if(isAlertExist){
                isAlertExist.remove();
            }

            if(typeSortSelect.value == 'A-Z'){
                resultInput.value = sortAlphabetical(wordsInput.value, 'alphabetical');
            } else if(typeSortSelect.value == 'Z-A'){
                resultInput.value = sortAlphabetical(wordsInput.value, 'reverse-alphabetical');
            }
        }
    }
}

function alertMsg(type, message){
    const isAlertExist = document.querySelector('.alertForm');
    deleteRecordConfidenceIfExist();

    if(isAlertExist){
        isAlertExist.remove();
        alertMsg(type, message);
    } else {
        const messageAlertForm = document.createElement('p');
        messageAlertForm.textContent = message;
        messageAlertForm.classList.add('alertForm')
    
        if(type === 'error'){
            messageAlertForm.classList.add('errorMsg');
        } else {
            messageAlertForm.classList.add('successMsg');
        }
    
        form.appendChild(messageAlertForm, document.querySelector('.form-btns'));
    
        setTimeout( () => {
            messageAlertForm.remove();
        }, 5000)
    }
}