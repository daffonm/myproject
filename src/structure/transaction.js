class Transaction {
    constructor(id, date, cart, totalCount, totalPrice) {
        this.id = id
        this.date = date
        this.productList = cart
        this.totalCount = totalCount
        this.totalPrice = totalPrice
    }
}

// simulation
const savedTransactionLogs = [
    // { id: '1', date: { day: 18, month: 6, year: 2025 }, message: 'Transaction 1' },
    // { id: '2', date: { day: 19, month: 6, year: 2025 }, message: 'Transaction 2' },
    // { id: '3', date: { day: 18, month: 6, year: 2025 }, message: 'Transaction 3' },
    // { id: '4', date: { day: 17, month: 6, year: 2025 }, message: 'Transaction 4' },
    // { id: '5', date: { day: 19, month: 6, year: 2025 }, message: 'Transaction 5' }
];

export default function initializeTransaction(savedLog = []) {

    return {
        transactionList : [],
        
        createTransaction : function(cart) {

            const currentDate = new Date()

            // Codefication
            const transactionId = this.transactionList.length + "77" + `${currentDate.getDate()}${currentDate.getMonth()}${currentDate.getFullYear()}`

            const newTransaction = new Transaction(
                transactionId,
                { day: currentDate.getDate(), month: currentDate.getMonth(), year: currentDate.getFullYear() },
                cart.productList,
                cart.totalCount,
                cart.totalPrice
             )
            this.transactionList.push(newTransaction)
             console.log("transaction succesfully created")
             return newTransaction
        },

        deleteTransaction : function(transId) {
            targetIndex = findFirstAttributeMatch("id", transId, this.transactionList)
            this.transactionList.splice(targetIndex, 1)
            console.log("Transaction Deleted")
        },

        groupByDateIndex: function () {
        // Sort transactions by date in descending order (newest first)
        const sortedTransactions = this.transactionList.sort((a, b) => {
            const dateA = new Date(a.date.year, a.date.month, a.date.day);  // Zero-indexed months
            const dateB = new Date(b.date.year, b.date.month, b.date.day);
            return dateB - dateA;  // Compare dates (newest first)
        });

        // Group transactions by date
        const groupedTransactions = sortedTransactions.reduce((acc, transaction) => {
            const dateKey = `${transaction.date.day}/${transaction.date.month + 1}/${transaction.date.year}`;  // Format date as dd/mm/yyyy
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(transaction);
            return acc;
        }, {});

        return groupedTransactions;
    }


    }
}
// handler
function findFirstAttributeMatch(key, value, arr) {
    for (let i = 0; i < arr.length; i++) {
        const target = arr[i]
        if (target[key] === value) {
            return i
        }   
    }
    return null
}