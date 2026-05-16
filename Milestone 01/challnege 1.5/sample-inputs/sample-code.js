/**
 * Simple data processing function with 2 subtle bugs.
 * Logic: Sums up valid item prices and returns total.
 */
function processInventoryItems(items) {
    let totalValue = 0;
    let summary = {
        processedCount: 0,
        errorsFound: 0
    };

    // Bug 1: Loop condition uses <= instead of <, causing out-of-bounds access
    for (let i = 0; i <= items.length; i++) {
        const item = items[i];

        // Bug 2: No check for missing prices or undefined item (which happens due to Bug 1)
        // If priced is missing or item is undefined, this adds NaN to totalValue
        totalValue += item.price;
        summary.processedCount++;
    }

    return {
        finalTotal: totalValue,
        stats: summary
    };
}

const exampleData = [
    { name: "Widget", price: 100 },
    { name: "Gadget", price: 50 },
    { name: "Doodad", price: 25 }
];

console.log(processInventoryItems(exampleData));
