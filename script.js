// Retrieve expenses from local storage or initialize an empty array
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to render expenses
function renderExpenses() {
  const expenseList = document.getElementById('expense-list');
  expenseList.innerHTML = '';

  expenses.forEach((expense, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${expense.name}: Rs${expense.amount}</span>
      <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
      <button class="rename-btn" onclick="renameExpense(${index})">Rename</button>
    `;
    expenseList.appendChild(li);
  });
}

// Function to add an expense
function addExpense(event) {
  event.preventDefault();

  const expenseInput = document.getElementById('expense-input');
  const amountInput = document.getElementById('amount-input');

  const name = expenseInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (name === '' || isNaN(amount)) {
    alert('Please enter valid expense details.');
    return;
  }

  const newExpense = {
    name,
    amount
  };

  expenses.push(newExpense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  expenseInput.value = '';
  amountInput.value = '';

  renderExpenses();
}

// Function to delete an expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

// Function to rename an expense
function renameExpense(index) {
  const newName = prompt('Enter new name for the expense:');
  if (newName === null || newName.trim() === '') {
    return;
  }

  expenses[index].name = newName.trim();
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderExpenses();
}

// Add event listener to the expense form
const expenseForm = document.getElementById('expense-form');
expenseForm.addEventListener('submit', addExpense);

// Render initial expenses
renderExpenses();