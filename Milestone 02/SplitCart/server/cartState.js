const cartState = {
  items: [
    { id: "1", name: "Organic Avocados", price: 6.50, addedBy: "Alex" },
    { id: "2", name: "Artisan Sourdough", price: 4.25, addedBy: "Sam" }
  ],
  participants: ["Alex", "Sam", "Jordan"],
  payments: [] // Array of { participant: string, amount: number }
};

module.exports = cartState;
