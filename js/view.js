
const elements = {
    form: document.querySelector('#form'),
    type: document.querySelector('#type'),
    title: document.querySelector('#title'),
    value: document.querySelector('#value'),
    incomesList: document.querySelector('#incomes-list'),
    expensesList: document.querySelector('#expenses-list'),
    budgetEl: document.querySelector('#budget'),
    totalIncomeEl: document.querySelector('#total-income'),
    totalExpenseEl: document.querySelector('#total-expense'),
    percentsWrapper: document.querySelector('#expense-percents-wrapper'),
    monthEl: document.querySelector('#month'),
    yearEl: document.querySelector('#year')
}

const priceFormatter = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
})

function checkEmptyFields() {
    if (elements.title.value.trim() === '') {
        elements.title.classList.add('form__input--error')
        return false
    } else {
        elements.title.classList.remove('form__input--error')
    }

    if (elements.value.value.trim() === '' || + elements.value.value <= 0) {
        elements.value.classList.add('form__input--error')
        return false
    } else {
        elements.value.classList.remove('form__input--error')
    }

    return true
}

function renderRecords(record) {
    if (record.type === 'inc') {
        const html = `<li data-id = "${record.id}" class="budget-list__item item item--income">
                        <div class="item__title">${record.title}</div>
                            <div class="item__right">
                            <div class="item__amount">+ ${priceFormatter.format(record.value)}</div>
                            <button class="item__remove">
                                <img
                                        src="./img/circle-green.svg"
                                        alt="delete"
                                    />
                            </button>
                        </div>
                      </li>`

        elements.incomesList.insertAdjacentHTML('afterbegin', html)
    } else if (record.type === 'exp') {
        const html = `<li data-id="${record.id}" class="budget-list__item item item--income">
                        <div class="item__title">${record.title}</div>
                        <div class="item__right">
                            <div class="item__amount">- ${priceFormatter.format(record.value)}</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`

        elements.expensesList.insertAdjacentHTML('afterbegin', html)
    }
}

function renderBudget({totalIncome, totalExpense, totalBudget, expensePercents}) {
    elements.budgetEl.innerHTML = priceFormatter.format(totalBudget)
    elements.totalIncomeEl.innerHTML = '+ ' + priceFormatter.format(totalIncome)
    elements.totalExpenseEl.innerHTML = '- ' + priceFormatter.format(totalExpense)

    if (expensePercents) {
        const html = `<div class="badge">${expensePercents}%</div>`
        elements.percentsWrapper.innerHTML = html
    } else {
        elements.percentsWrapper.innerHTML = ''
    }
}

function clearForm() {
    elements.form.reset()
}
function renderMonth(month, year) {
    elements.monthEl.innerHTML = month
    elements.yearEl.innerHTML = year
}

function renderTestData(data) {
    elements.type.value = data.type
    elements.title.value = data.title
    elements.value.value = data.value
}

function getFormData() {
    const formData = {
        type: elements.type.value,
        title: elements.title.value,
        value: elements.value.value
    }
    return formData
}

function removeRecord(event) {
    const recordElement = event.target.closest('li.budget-list__item')
    const id = recordElement.dataset.id
    recordElement.remove()
    return id
}

export {priceFormatter, elements, checkEmptyFields, renderRecords, renderBudget, clearForm, renderMonth, renderTestData, getFormData, removeRecord}

