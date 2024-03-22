const bill = document.querySelector('#bill')
const percents = document.querySelectorAll('.percents input[type=button]')
const customPercent = document.querySelector('#custom')
const people = document.querySelector('#people')
const reset = document.querySelector('#reset')
const peopleError = document.querySelector('span.error-people')

const amountResult = document.querySelector('#amount')
const totalResult = document.querySelector('#total')

percents.forEach(percent => {
    percent.addEventListener('click', () => {
        percents.forEach(percent => percent.classList.remove('selected'))
        percent.classList.add('selected')
        customPercent.value = ''
        calc()
    })
});

function calc() {
    peopleError.classList.remove('show')
    
    const inputPercentSelected = document.querySelector('.selected')
    const onlyNumberPercent = inputPercentSelected.value.replace('%', '')
    
    if (customPercent.value <= 100 && customPercent.value >= 0 && !customPercent.value == 0) {
        const tipAmountCustom = bill.value * (customPercent.value / 100) / people.value
        
        amountResult.innerHTML = tipAmountCustom.toFixed(2)
        totalResult.innerHTML = (bill.value / people.value + tipAmountCustom).toFixed(2)
        return
    }
    
    if (people.value == '') {
        peopleError.classList.add('show')
        amountResult.innerHTML = '$0.00'
        totalResult.innerHTML = '$0.00'
        people.focus()
        return
    }
    
    if (bill.value == '') {
        amountResult.innerHTML = '$0.00'
        totalResult.innerHTML = '$0.00'
        bill.focus()
        return
    }

    const tipAmount = bill.value * (onlyNumberPercent / 100) / people.value
    
    amountResult.innerHTML = tipAmount.toFixed(2)
    totalResult.innerHTML = (bill.value / people.value + tipAmount).toFixed(2)
}

customPercent.addEventListener('blur', () => {
    peopleError.classList.remove('show')
    percents.forEach(percent => percent.classList.remove('selected'))
})
customPercent.addEventListener('blur', calc)
bill.addEventListener('blur', calc)
people.addEventListener('blur', calc)
reset.addEventListener('click', () => {
    bill.value = ''
    people.value = ''
    peopleError.classList.remove('show')
    percents.forEach(percent => percent.classList.remove('selected'))
    amountResult.innerHTML = '$0.00'
    totalResult.innerHTML = '$0.00'
    customPercent.value = ''
    bill.focus()
})