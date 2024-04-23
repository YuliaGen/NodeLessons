function createPassword() {
    let length = 8,
        arrSymbol = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\|[]{}=+!@#$%^&*",
        resulPass = "";
    for (let i = 0, n = arrSymbol.length; i < length; ++i) {
        resulPass += arrSymbol.charAt(Math.floor(Math.random() * n));
    }
    console.log(resulPass);
}
createPassword();

 module.exports = { createPassword };