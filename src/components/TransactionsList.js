import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions }) {
  return (
    <table className="ui celled striped padded table">
      <tbody>
        <tr>
          <th>
            <h3 className="ui center aligned header">Date</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Description</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Category</h3>
          </th>
          <th>
            <h3 className="ui center aligned header">Amount</h3>
          </th>
        </tr>
        {/* render a list of <Transaction> components here */}
        {transactions.map(({ date, description, category, amount }, idx) => (
          <Transaction
            key={`transaction-${idx}`}
            date={date}
            description={description}
            category={category}
            amount={amount}
          />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
