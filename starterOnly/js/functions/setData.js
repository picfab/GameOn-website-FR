/**
 * Paramétrer la valeur d'un input
 * @param {object} fields tous les champs
 * @param {string} name le name du champs
 * @param {*} value la valeur du champs
 * @param {string} type le type du champs
 * @param {boolean} error y a t'il une erreur
 */
export const setValue = (fields,name, value, type = null, error = false) => {
    fields = {
        ...fields,
        [name]: {
            name,
            type,
            value,
            error
        }
    }
    return fields
}

/**
 * set one error
 * @param {object} fields tous les champs
 * @param {number} key la key du champ à modifier
 * @param {boolean} error y a t'il une erreur ?
 * @param {string} message optionnel, le message à afficher en cas d'erreur
 */
export const setError = (fields, key, error, message=null) => {
    fields = {
        ...fields,
        [key]: {
            ...fields[key],
            error,
            message:message?message:key
        }
    }
    return fields
}
