function addAllMerch (dict) {
    let totalItems = 0
    for (let key in dict) {
        totalItems += dict[key];
      }
    return totalItems
}
export default addAllMerch