const form = document.getElementById('form')

const task = document.getElementById('task')

const date = document.getElementById('date')

const message = document.getElementById('message')

const radioRed = document.getElementById('red')
const radioOrange = document.getElementById('orange')
const radioGreen = document.getElementById('green')

const taskList = document.getElementById('task-list')

function addZero(i) {
    if(i < 10) i = '0' + i
    return i
}

function todayDate() {
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth()+1
    let yyyy = today.getFullYear()

    dd = addZero(dd)
    mm = addZero(mm)

    return yyyy+'-'+mm+'-'+dd
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if(task.value === '' || task.value === null || task.value === undefined) {
        e.preventDefault()
        message.innerText = 'Tienes que rellenar el campo de la tarea'
    } else {
        message.innerText = ''

        if(radioRed.checked === false && radioOrange.checked === false && radioGreen.checked === false) {
            e.preventDefault()
            message.innerText = 'Tienes que seleccionar un color de prioridad'
        } else {
            message.innerText = ''

            if (date.value === '' || date.value === null || date.value === undefined) {
                e.preventDefault()
                message.innerText = 'Tienes que seleccionar una fecha'
            } else {
                message.innerText = ''

                if (date.value <= todayDate()) {
                    e.preventDefault()
                    message.innerText = 'La fecha tiene que ser posterior a hoy'
                } else {
                    message.innerText = ''

                    let key = Date.now()
                    const tasks = {
                        task: task.value,
                        priority: form.priority.value,
                        date: date.value
                    }
                    localStorage.setItem(key, JSON.stringify(tasks))
                    form.reset()
                }
            }
        }
    }
})

console.log(JSON.parse(localStorage.getItem(localStorage.key(0))))
taskList.innerHTML += `<li><span>${JSON.parse(localStorage.getItem(localStorage.key(0))).task}</span></li>`
