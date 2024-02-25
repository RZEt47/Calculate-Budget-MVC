
const budget = []

function createRecord(formData) {
    let id = 1
    if (budget.length > 0) {
        id = budget[budget.length - 1].id + 1
    }

    const record = {
        id: id,
        type: formData.type,
        title: formData.title.trim(),
        value: +formData.value
    }

    budget.push(record)
    return record
}

function deleteRecord(id) {
    const index = budget.findIndex(function (item) {
        if (+item.id === +id) {
            return true
        }
    })

    budget.splice(index, 1)
}

function calcBudget() {

    const totalIncome = budget.reduce(function (total, element) {

        if (element.type === 'inc') {
            return total + element.value
        } else {
            return total
        }
    }, 0)

    const totalExpense = budget.reduce(function (total, element) {

        if (element.type === 'exp') {
            return total + element.value
        } else {
            return total
        }
    }, 0)

    const totalBudget = totalIncome - totalExpense

    let expensePercents = 0

    if (totalIncome) {
        expensePercents = Math.round((totalExpense * 100) / totalIncome)
    }

    return {
        totalIncome: totalIncome,
        totalExpense: totalExpense,
        totalBudget: totalBudget,
        expensePercents: expensePercents
    }
}

function getTestData() {
    const testData = [
        { type: 'exp', title: 'Интернет', value: 300 },
        { type: 'exp', title: 'Квартира', value: 1000 },
        { type: 'exp', title: 'Коммуналка', value: 500 },

        { type: 'inc', title: 'Зарплата', value: 500 },
        { type: 'inc', title: 'Jet Land', value: 5000 },
        { type: 'inc', title: 'Фриланс', value: 500 },
    ]

    function getRandomIt(max) {
        return Math.floor(Math.random() * max)
    }

    const randomIndex = getRandomIt(testData.length)
    const randomData = testData[randomIndex]

    return randomData
}

function getMonthYear() {
    const now = new Date()
    const year = now.getFullYear()

    const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
        month: 'long'
    })

    const month = timeFormatter.format(now)

    return {month, year}
}

export {createRecord, deleteRecord, calcBudget, getTestData, getMonthYear}
