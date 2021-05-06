const ms = 10;
const ticsInSecond = 1000/ms;
const ticsInMinute = ticsInSecond*60;

const timer = {
    ms,
    ticsInSecond,
    ticsInMinute
}

module.exports = {
    timer
}