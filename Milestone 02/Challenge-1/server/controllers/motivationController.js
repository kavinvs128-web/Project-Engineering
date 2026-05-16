const quotes = [
  "Success usually comes to those who are too busy to be looking for it.",
  "Don’t watch the clock; do what it does. Keep going.",
  "The future depends on what you do today.",
  "Believe you can and you're halfway there.",
  "The only way to do great work is to love what you do.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Everything you've ever wanted is on the other side of fear.",
  "Don't let yesterday take up too much of today."
];

exports.getMotivation = (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({
    quote: randomQuote
  });
};
