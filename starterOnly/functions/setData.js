/**
 * Paramétrer la valeur d'un input
 * @param {object} fields
 * @param {string} name
 * @param {*} value
 * @param {string} type
 * @param {boolean} error
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
 * @param {object} fields
 * @param {number} key
 * @param {boolean} val
 */
export const setError = (fields, key, val) => {
    fields = {
        ...fields,
        [key]: {
            ...fields[key],
            error: val
        }
    }
    return fields
}
