function getTotalPrice (dict, prices) {
    let totalPrice = 0;
    if(Object.keys(prices).length > 0)
    {
    for (let key in dict) {
        totalPrice += (dict[key]* prices[key-1].price);
      }
    return totalPrice.toFixed(2);
}
}
export default getTotalPrice