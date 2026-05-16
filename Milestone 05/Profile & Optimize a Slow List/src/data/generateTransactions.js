const MERCHANTS = [
  "Amazon", "Spotify", "Whole Foods", "Netflix", "Apple Store",
  "Starbucks", "Uber", "Lyft", "Airbnb", "Walmart",
  "Target", "Best Buy", "Nike", "Adidas", "H&M",
  "Zara", "IKEA", "Steam", "PlayStation Store", "Google Play",
  "DoorDash", "Uber Eats", "Grubhub", "Postmates", "Instacart",
  "Shell", "Chevron", "ExxonMobil", "Costco", "Trader Joe's",
  "Safeway", "Kroger", "Walgreens", "CVS Pharmacy", "Home Depot",
  "Lowe's", "Adobe", "Microsoft", "Salesforce", "Slack",
  "Zoom", "Dropbox", "GitHub", "DigitalOcean", "AWS",
  "Verison", "AT&T", "T-Mobile", "Discord", "Twitch"
];

const CATEGORIES = ["Shopping", "Entertainment", "Food", "Transport", "Utilities"];
const STATUSES = ["completed", "pending", "failed"];

export const generateTransactions = (count = 2000) => {
  const transactions = [];
  const now = new Date();

  for (let i = 1; i <= count; i++) {
    const merchant = MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)];
    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    
    // Status distribution: 85% completed, 10% pending, 5% failed
    const statusRand = Math.random();
    const status = statusRand < 0.85 ? "completed" : statusRand < 0.95 ? "pending" : "failed";
    
    const amount = parseFloat((Math.random() * (499.99 - 1.99) + 1.99).toFixed(2));
    
    // Random date within the last 12 months
    const date = new Date(now.getTime() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString();

    transactions.push({
      id: i,
      name: merchant,
      amount,
      category,
      date,
      status
    });
  }

  // Sort by date descending
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
