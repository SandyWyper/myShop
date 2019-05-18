// if the price of an item is less than 1 display in pence
// else if -  the item is not a whole number return the whole price
// else retrun the price rounded to the nearest pound

function formatPrice(price) {
    if (price < 1) {
        return `${price * 100}p`;
    } else if (price % 1 !== 0) {
        return `&pound;${price}`;
    } else {
        return `&pound;${Math.round(price)}`;
    }
}

export default formatPrice;