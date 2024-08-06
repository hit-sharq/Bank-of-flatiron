import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8001/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
        setFilteredTransactions(data); // Initialize with all transactions
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTransactions();
  }, []);
  return (
    <div>
      <Search
        transactions={transactions}
        setFilteredTransactions={setFilteredTransactions}
      />
      <AddTransactionForm
        transactions={transactions}
        setTransactions={setTransactions}
        setFilteredTransactions={setFilteredTransactions}
      />
      <TransactionsList transactions={filteredTransactions} />
    </div>
  );
}

export default AccountContainer;
