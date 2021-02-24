import { modalContent } from './eltDom.js'

/**
 * supprime une erreur
 * @param {object} form le formulaire
 * @param {string} name nom de l'erreur
 */
export const removeError = (form,name) => {
    const oldElt = form.querySelector(`.error.${name}`)
    if (oldElt) {
        oldElt.parentNode.closest(".error").classList.remove('error')
        oldElt.remove()
    }
}

/**
 * supprime le message de succès
 * @param {object} form le formulaire
 */
export const removeSuccess = (form) => {
    modalContent.innerHTML = ''
    modalContent.removeAttribute('style')
    modalContent.classList.remove('success')
    modalContent.append(form)
    const closeBtn = document.querySelector(".close");
    closeBtn.removeEventListener("click", removeSuccess);
    closeModal()
}
