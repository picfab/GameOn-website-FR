import { modalContent, formInscription } from './eltDom.js'

/**
 * supprime une erreur
 * @param {string} name nom de l'erreur
 */
export const removeError = (name) => {
    const oldElt = formInscription.querySelector(`.error.${name}`)
    if (oldElt) {
        oldElt.parentNode.closest(".error").classList.remove('error')
        oldElt.remove()
    }
}

/**
 * supprime le message de succés
 */
export const removeSuccess = () => {
    modalContent.innerHTML = ''
    modalContent.removeAttribute('style')
    modalContent.classList.remove('success')
    modalContent.append(formInscription)
    const closeBtn = document.querySelector(".close");
    closeBtn.removeEventListener("click", removeSuccess);
    closeModal()
}
