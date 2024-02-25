import * as model from "./model.js"
import * as view from "./view.js"

//Start
init()

//Actions Add record
view.elements.form.addEventListener('submit', function (event) {

    event.preventDefault()

    if (view.checkEmptyFields() === false) {
        return
    }

    const formData = view.getFormData()
    const record = model.createRecord(formData)
    view.renderRecords(record)

    view.renderBudget( model.calcBudget())
    view.clearForm()
    insertTestData()
})

//Actions Remove record
document.body.addEventListener('click', function (event) {

    if (event.target.closest('button.item__remove')) {

        const id = view.removeRecord(event)
        model.deleteRecord(id)
        view.renderBudget( model.calcBudget())
    }
})

// Functions
function insertTestData() {
    const randomData =  model.getTestData()
    view.renderTestData(randomData)
}

function displayMonth() {
    const monthYear = model.getMonthYear()
    view.renderMonth(monthYear.month, monthYear.year)
}

function init() {
    displayMonth()
    insertTestData()
    view.renderBudget( model.calcBudget())
}