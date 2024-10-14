"use client";

import Button from "./button";
import { useState } from "react";

export default function ExpenseTracker() {
  const [hide, setHide] = useState(false);
  const [opacity, setOpacity] = useState<number>(1);
  const [formDta, setFormdata] = useState({
    expenseName: "",
    expenseAmount: "",
    expenseDate: "",
  });
  
  const [expenses, setExpense] = useState<{ name: string; amount: string; date: string }[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track which expense is being edited

  const formHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormdata({ ...formDta, [name]: value });
  };

  function addExpense() {
    if (editIndex !== null) {
      // If editing, update the existing expense
      const updatedExpenses = [...expenses];
      updatedExpenses[editIndex] = {
        name: formDta.expenseName,
        amount: formDta.expenseAmount,
        date: formDta.expenseDate,
      };
      setExpense(updatedExpenses);
      setEditIndex(null); // Reset edit state
    } else {
      // If not editing, add a new expense
      setExpense([
        ...expenses,
        {
          name: formDta.expenseName,
          amount: formDta.expenseAmount,
          date: formDta.expenseDate,
        },
      ]);
    }

  
    // Reset form data after adding or editing
    setFormdata({
      expenseName: "",
      expenseAmount: "",
      expenseDate: "",
    });
    setHide(false);
    setOpacity(1);
  }

  function HideShowHandler() {
    setHide(true);
    setOpacity(0.1);
  }

  function ShowHideHandler() {
    setHide(false);
    setOpacity(1);
  }

  // Delete function to remove an expense based on index
  const deleteExpense = (index: number) => {
    setExpense(expenses.filter((_, expenseIndex) => expenseIndex !== index));
  };

  // Edit function to populate the form with existing expense details
  const editExpense = (index: number) => {
    const expenseToEdit = expenses[index];
    setFormdata({
      expenseName: expenseToEdit.name,
      expenseAmount: expenseToEdit.amount,
      expenseDate: expenseToEdit.date,
    });
    setEditIndex(index); // Set index of the expense being edited
    setHide(true); // Show form to edit
  };

  const calculateTotalAmount = () => {
    return expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

         return (
         <main className="min-h-screen bg-gray-100">
                
          <nav className="bg-black h-[50px] lg:w-full  md:w-[800px] w-[450px] fixed top-0 left-0 z-10">
           <div className="flex lg:justify-between  md:justify-evenly  gap-x-10 items-center text-white px-6">
          <h2 className="lg:text-2xl text-xl">ExpenseTracker</h2>
          <h2 className="lg:text-2xl text-xl">Total: ${calculateTotalAmount().toFixed(2)}</h2>
          </div>
         </nav>

          {/* data display*/}
           <div className="pt-16" style={{ opacity: opacity }}>
           {/* Expense List */}
           <div className="flex justify-center mt-8">
           <div className="lg:w-[500px] md:w-[500px] w-[300px]">
            <h2 className="text-xl font-semibold text-center">Expenses</h2>

            {expenses.length === 0 ? (
              <p className="text-center text-red-500 mt-4">No expenses added yet</p>
            ) : (
               <div className="mt-4  flex flex-col gap-6 ">
              {expenses.map((expense, index) => (
               <div className="flex flex-row justify-between gap-6 bg-white p-4 shadow-lg rounded-lg">
                  <ul key={index} className="flex flex-col justify-between">
                     <li><strong>Name:</strong> {expense.name}</li>
                     <li><strong>Amount:</strong> {expense.amount}$</li>
                     <li> <strong>Date: </strong>{expense.date}</li>
                 </ul>

                   <div className="flex gap-x-4 flex-col gap-3">
                      <button className="bg-gray-300  rounded-xl  px-6 py-2" onClick={() => editExpense(index)}>Edit</button>
                      <button className="bg-gray-300  rounded-xl  px-6 py-2" onClick={() => deleteExpense(index)}>Delete</button>
                     </div>
                </div>

                ))}
              </div>
            )}
          </div>
        </div>

        {/* Show/Hide Form Button */}
        <div className="fixed bottom-10 right-10">
          <button onClick={HideShowHandler} className="text-6xl">+</button>
        </div>
      </div>

      {/* Expense Form */}
      {hide && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-lg rounded-xl lg:w-[400px] md:w-[400px] w-[300px]">
          <h2 className="text-2xl font-semibold text-center mb-6">{editIndex !== null ? "Edit Expense" : "Add Expense"}</h2>
          <div className="space-y-4">
            <div>
              <label>Expense Name</label>
              <input
                type="text"
                name="expenseName"
                value={formDta.expenseName}
                onChange={formHandleChange}
                className="p-2 w-full rounded-lg border"
                placeholder="Enter expense"
              />
            </div>
            <div>
              <label>Amount</label>
              <input
                type="number"
                name="expenseAmount"
                value={formDta.expenseAmount}
                onChange={formHandleChange}
                className="p-2 w-full rounded-lg border"
                placeholder="Enter amount"
              />
            </div>
            <div>
              <label>Date</label>
              <input
                type="date"
                name="expenseDate"
                value={formDta.expenseDate}
                onChange={formHandleChange}
                className="p-2 w-full rounded-lg border"
              />
            </div>

            {/* Form Buttons */}
            <div className="flex justify-between mt-10">
              <Button text={editIndex !== null ? "Update" : "Add"} onHandler={addExpense} />
              <Button text="Cancel" bgColor="#bab8b8" onHandler={ShowHideHandler} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
