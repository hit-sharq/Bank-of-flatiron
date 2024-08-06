import { useState } from "react";

function AddTransactionForm({ transactions, setTransactions }) {
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const resetForm = () => {
    setDescription("");
    setCategory("");
    setAmount("");
    setDate("dd/mm/yyyy");
  };

  const createTransactionData = () => {
    return {
      id: generateUniqueId(),
      date: new Date(date).toISOString().split("T")[0],
      description,
      category,
      amount,
    };
  };

  const saveTransaction = async (transactionData) => {
    const response = await fetch("http://localhost:8001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      throw new Error("Failed to save the transaction");
    }

    return transactionData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transactionData = createTransactionData();
      await saveTransaction(transactionData);
      setTransactions([...transactions, transactionData]);
      resetForm();
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  };
  return (
    <div className="ui segment">
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          <input
            type="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          <input
            type="number"
            name="amount"
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Amount"
            value={amount}
            step="0.01"
          />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
