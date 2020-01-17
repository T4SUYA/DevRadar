module.exports = function parseStringAsArray(StringAsArray) {
    return StringAsArray.split(',').map(tech => tech.trim())
}