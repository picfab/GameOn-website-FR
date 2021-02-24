// import {formData} from './eltDom.js'
/**
 * Netoie le formulaire
 */
export const clean = (formData) => {
    // Nettoie le formulaire
    formData.forEach(
        (item) => {
            const inputs = item.getElementsByTagName('input')
            Array.from(inputs).forEach(input => {
                if (['checkbox', 'radio'].includes(input.type)) {
                    if ("accept" !== input.name) {
                        input.checked = false
                    }
                } else {
                    input.value = null
                }
            });
        })
}
