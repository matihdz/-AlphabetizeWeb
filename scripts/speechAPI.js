import { microphone, wordsInput, btnSubmitForm, form } from './selectors.js';

microphone.addEventListener('click', runSpeechAPI);
wordsInput.addEventListener('keyup', deleteRecordConfidenceIfExist);

const msgConfidence = document.createElement('p');

function runSpeechAPI() {
    const SpeechRecognition = webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.start();

    recognition.onstart = function() {
        microphone.classList.add('listening-voice');
        btnSubmitForm.classList.add('btnDisabled');
        btnSubmitForm.disabled = true;
    }

    recognition.onspeechend = function() {
        microphone.classList.remove('listening-voice');
        btnSubmitForm.classList.remove('btnDisabled');
        btnSubmitForm.disabled = false;
    }

    recognition.onresult = function(e) {
        wordsInput.value = e.results[0][0].transcript;
        

        msgConfidence.innerHTML = `Recording confidence: ${parseInt(e.results[0][0].confidence * 100)}%`;
        msgConfidence.classList.add('msgConfidenceExist');

        form.insertBefore(msgConfidence, document.querySelector('.form-btns'));
    }
}

export function deleteRecordConfidenceIfExist() {
    const isMsgConfidenceRecordExist = document.querySelector('.msgConfidenceExist');

    if(isMsgConfidenceRecordExist){
        isMsgConfidenceRecordExist.remove();
    }
}