import React, { createContext, useState } from 'react';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budget, setBudget] = useState({ amount: 0 });

  const updateBudget = (newBudget) => {
    setBudget(newBudget || { amount: 0 }); // Fallback to prevent undefined
  };

  return (
    <BudgetContext.Provider value={{ budget, updateBudget }}>
      {children}
    </BudgetContext.Provider>
  );
};
