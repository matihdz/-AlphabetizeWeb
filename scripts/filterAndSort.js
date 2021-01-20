export function sortAlphabetical(text, typeSort) {
    const wordsArray = filterTextContent(text);
    const wordsArraySorted = wordsArray.sort(function(a, b){
        return a.localeCompare(b);
    });

    if(typeSort === 'alphabetical'){
        return wordsArraySorted.toString().replace(/,/g, ", ");
    } else if(typeSort === 'reverse-alphabetical'){
        return wordsArraySorted.reverse().toString().replace(/,/g, ", ");
    }
}

function filterTextContent(text) {
    text = text.replace(/\s/g, "-").replace(/,/g, "-");
    let letters = '';
    let words = [];
    for(let i = 0; i <= text.length; i++){
        if(text[i] === '-'){
            words.push(letters);
            letters = '';
            continue;
        }
        if(text[i] === undefined){
            words.push(letters);
        }
        letters += text[i];
    }
    words = words.filter( word => word !== '');

    return words;
}