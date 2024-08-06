import React from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:8001/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchTransactions();
  }, []);
  return (
    <div>
      <Search transactions={transactions} setTransactions={setTransactions} />
      <AddTransactionForm
        transactions={transactions}
        setTransactions={setTransactions}
      />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
