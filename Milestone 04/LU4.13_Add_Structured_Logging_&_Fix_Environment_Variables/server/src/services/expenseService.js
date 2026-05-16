const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createExpense = async (data) => {
    // Zero validation for payer existence or amount format. 
    return await prisma.expense.create({
        data: {
            description: data.description,
            amount: parseFloat(data.amount),
            payerId: parseInt(data.payerId)
        }
    });
};

exports.getAllExpenses = async () => {
    // No sorting, no relations joined.
    return await prisma.expense.findMany({ include: { payer: true } });
};

exports.calculateBalances = async () => {
    const roommates = await prisma.roommate.findMany({ include: { expenses: true } });
    const expenses = await prisma.expense.findMany();
    
    // Messy math without proper rounding or checks.
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const count = roommates.length || 1; 
    const share = total / count;
    
    const results = roommates.map(r => {
        const paid = r.expenses.reduce((acc, curr) => acc + curr.amount, 0);
        return {
            name: r.name,
            paid: paid,
            balance: paid - share
        };
    });

    return {
        total,
        averageShare: share,
        roommates: results
    };
};
