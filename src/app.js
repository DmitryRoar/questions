import {createModal, isValid} from './utils'
import {Question} from './question'
import {authWithEmailAndPassword, getAuthForm} from './auth'
import './styles.scss'

const form = document.querySelector('#form')
const input = form.querySelector('#question-inp')
const submitBtn = form.querySelector('#submit')
const modalBtn = document.querySelector('#modalBtn')

form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})
window.addEventListener('load', Question.renderList)
modalBtn.addEventListener('click', openModal)

function submitFormHandler(event) {
    event.preventDefault()

    if (isValid(input.value)) {
        const question = {
            text: input.value.trim(),
            date: new Date().toJSON()
        }
        submitBtn.disabled = true
        // async request to server to save question
        Question.create(question)
            .then(() => {
                input.value = ''
                input.className = ''
                submitBtn.disabled = false
            })
    }
}

function openModal() {
    createModal('Authorize', getAuthForm())
    document.querySelector('#auth-form')
        .addEventListener('submit', authFormHandler, {once: true})
}

function authFormHandler(event) {
    event.preventDefault()

    const btn = event.target.querySelector('button')
    btn.disabled = true

    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value

    authWithEmailAndPassword(email, password)
    .then(Question.fetch)
    .then(renderModalAfterAuth)
    .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        //error
        createModal('Error!', content)
    } else {
        createModal('List questions', Question.listToHTML(content))
    }
}
