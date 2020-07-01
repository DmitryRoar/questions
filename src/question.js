import {fbDbUrl} from './environment/key'

export class Question {
    static create(question) {
        return fetch(`${fbDbUrl}/questions.json`, {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                question.id = response.name
                return question
            })
            .then(addToLocalStorage)
            .then(Question.renderList)
    }

    static renderList() {
        const question = getQuestionsFromLocalStorage()

        const html = question.length
            ? question.map(toCard).join(' ')
            : `<div class="mui--text-headline">you have not asked anything yet</div>`

        const list = document.querySelector('#list')
        list.innerHTML = html
    }

    static fetch(token) {
        if (!token) {
            return Promise.resolve(`<p class="error">You haven't token</p>`)
        }
        return fetch(`${fbDbUrl}/questions.json?auth=${token}`)
            .then(response => response.json())
            .then(response => {
                if (response && response.error) {
                    return `<p class="error">${response.error}</p>`
                }

                return response
                    ? Object.keys(response).map(key => ({
                        ...response[key],
                        id: key
                    }))
                    : []
            })
    }

    static listToHTML(questions) {
        return questions.length
            ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
            : `<p>Questions not found</p>`
    }
}

function addToLocalStorage(question) {
    const allArr = getQuestionsFromLocalStorage()
    allArr.push(question)
    localStorage.setItem('questions', JSON.stringify(allArr))
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]')
}

function toCard(question) {
    return `
<div class="mui--text-headline">
${new Date(question.date).toLocaleDateString()}
${new Date(question.date).toLocaleTimeString()}
</div>
<div>${question.text}</div>
<br>`
}
