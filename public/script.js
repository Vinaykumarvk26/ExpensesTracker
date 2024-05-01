let expenses = [];
let totalAmount = 0;
const categorySelect = document.getElementById('category_select');
const amountInput = document.getElementById('amount_input');
const InfoInput = document.getElementById('info');
const dateInput = document.getElementById('date_input');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');
const ctx = document.getElementById('expense-chart').getContext('2d');
const remindersList = document.getElementById('reminders-list');

const expenseChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Expense Trends',
            data: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const info = InfoInput.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (info === '') {
        alert('Please enter a valid amount info');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    expenses.push({ category, amount, info, date });
    updateExpensesList();
    updateTotalAmount();
    if (category === 'Expense') {
        updateChart();
    } else if (category === 'Reminder') {
        addReminder(date, info);
    }
});

const toggleChartBtn = document.getElementById('toggle-chart-btn');
const chartSection = document.querySelector('.chart-section');

toggleChartBtn.addEventListener('click', function () {
    if (chartSection.style.display === 'none') {
        chartSection.style.display = 'block';
        updateChart();
    } else {
        chartSection.style.display = 'none';
    }
});

function updateExpensesList() {
    const newRow = expenseTableBody.insertRow();
    const expense = expenses[expenses.length - 1];

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    infoCell.textContent = expense.info;
    dateCell.textContent = expense.date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        const index = expenses.indexOf(expense);
        if (index !== -1) {
            expenses.splice(index, 1);
            expenseTableBody.deleteRow(index);
            updateTotalAmount();
            updateChart();
        }
    });
    deleteCell.appendChild(deleteBtn);
}

function updateTotalAmount() {
    totalAmount = expenses.reduce((acc, curr) => acc + (curr.category === 'Income' ? curr.amount : -curr.amount), 0);
    totalAmountCell.textContent = totalAmount;
}

function updateChart() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const expenseData = Array.from({ length: 12 }, () => 0);

    expenses.forEach(expense => {
        const monthIndex = new Date(expense.date).getMonth();
        expenseData[monthIndex] += expense.amount;
    });

    expenseChart.data.datasets[0].data = expenseData;
    expenseChart.update();
}

function addReminder(date, info) {
    const today = new Date();
    const reminderDate = new Date(date);
    const timeDifference = reminderDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    if (daysDifference <= 7) {
        const reminderItem = document.createElement('li');
        reminderItem.textContent = `Reminder: ${info} is due on ${date}`;
        remindersList.appendChild(reminderItem);
    }
}


function checkAlert(amount) {
    if (amount >= 1000) {
        alert('Alert: High expense detected!');
    }
}
