// checkSubstring('Hi!', 'Hi') -> 2
// checkSubstring('Hi!', 'Bye') -> 0
export function indexSubstring(currStr, targetStr){
    if(currStr === undefined || targetStr === undefined)
        return;
    let i = 0;
    let it1 = currStr[Symbol.iterator]();
    let it2 = targetStr[Symbol.iterator]();
    let char1 = it1.next();
    let char2 = it2.next();
    while(!char1.done && !char2.done && char1.value === char2.value){
        char1 = it1.next();
        char2 = it2.next();
        i++;
    }
    return i;
}