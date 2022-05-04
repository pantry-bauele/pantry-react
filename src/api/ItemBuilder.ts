class ItemBuilder {
    buildItem(name: string, brand: string, calories: number,
        vendorPrices: {}, totalQuantity: {}, servingSize: {}) {

        let item = {
            name: name,
            brand: brand,
            calories: calories,
            vendorPrices: vendorPrices,
            totalQuantity: totalQuantity,
            servingSize: servingSize
        }

        return item;
    }
}

export default ItemBuilder;