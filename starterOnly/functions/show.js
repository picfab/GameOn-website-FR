import { modalContent, closeBtn } from './eltDom.js'
import { messages } from './messages.js'
import { removeSuccess } from './remove.js'
import { clean } from './clean.js'

/**
 * Affiche une erreur
 * @param {string} name nom de l'erreur
 * @param {function} removeError nom de l'erreur
 */
export const showError = (name, removeError) => {
    removeError()
    const formBox = formInscription.querySelector(`[name=${name}]`)
    const elt = formBox.closest('.formData')
    elt.classList.add('error')
    const content = document.createElement('span')
    content.classList.add('error')
    content.classList.add(name)
    content.innerHTML = messages[name]
    if (name === 'accept') {
        const acceptFormbox = elt.querySelector(`[for=${formBox.id}]`)
        acceptFormbox.after(content)
    } else {
        elt.append(content)
    }
}

/**
 * Affiche le message de succés
 */
export const showSuccess = () => {
    const modalContentHeight = modalContent.offsetHeight
    modalContent.style.minHeight = modalContentHeight + 'px';
    modalContent.classList.add('success')
    modalContent.innerHTML = `<div class="successBox"><span>${messages.success}</span></div>`

    const buttonClose = document.createElement('button')
    buttonClose.classList.add('btn-submit', 'button')
    buttonClose.classList.add('button')
    buttonClose.textContent = 'Fermer'

    modalContent.append(buttonClose)
    buttonClose.onclick = () => {
        removeSuccess()
    }
    closeBtn.addEventListener("click", removeSuccess);
    clean()
}
