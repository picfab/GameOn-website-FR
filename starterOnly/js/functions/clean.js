/**
 * Netoie le formulaire
 * @param {object} formData Nodelist avec tous les éléments comprenant la classe CSS .formData
 */
export const clean = (formData) => {
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
