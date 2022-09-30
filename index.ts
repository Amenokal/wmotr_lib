import { FormCheck } from './form'
import { ConfigRule } from './form/types'

/**
 * Fonction pour valider les inputs d'un formulaire selon des règles à établir.
 *
 * Doit être déclanchée sur l'évènement "submit"
 * 
 * ---
 * 
 * @param {event} e - submit event
 * @param {function} handleSuccess - fonction déclanchée si le formulaire est valide
 * @param {function}handleFail - fonction déclanchée si le formulaire n'est **pas** valide
 * @param {array} config - array de règles à appliquer aux inputs
 * 
 */

export function validate(e: Event, handleSuccess: Function, handleFail: Function, config: Array<ConfigRule>){
    e.preventDefault()

    const inputs = Array.from(document.querySelectorAll(`input`))
    const form = new FormCheck(inputs, config)

    if(!form.error){
        handleSuccess(form)
    }
    else {
        handleFail(form)
    }
}