import { NamedInput, ConfigRule, SizeRule, MandatoryRule, RegexRule, MergedFormData, FormError, Rule, ConfirmRule } from "./types"

export class FormCheck {

    inputs: Array<NamedInput>
    data: Array<MergedFormData>
    error: FormError = {
        message: "",
        input: undefined
    }

    constructor(inputs: Array<NamedInput>, config: Array<ConfigRule>){
        this.inputs = inputs
        this.data = this.mergeData(inputs, config)
        this.validate()
    }

    mergeData(inputs: Array<NamedInput>, config: Array<ConfigRule>){
        const merged = []
        for(let input of inputs.reverse()){
            const rule = config.find((r) => r.name === input.name)
            const mergedData: MergedFormData = {
                name: input.name,
                value: input.value.toString().trim(),
                rules: rule?.rules.reverse(),
            }
            merged.push(mergedData)
        }
        return merged
    }

    validate(){
        for(const input of this.data){
            if(input.rules){
                for(const rule of input.rules){
                    switch(rule.type){
                        case "mandatory": this.checkMandatory(input, rule)
                            break;
                        case "size": this.checkSize(input, rule)
                            break;
                        case "regex": this.checkRegex(input, rule)
                            break;
                        case "confirm": this.checkConfirm(input, rule)
                            break;
                        default: console.error(`[Form verificator] - Pas de méthode pour la règle ${rule}`)
                    }
                }
            }
        }
    }

    // -------------------------------------------------------------
    // CHECKS

    checkMandatory(input: MergedFormData, rule: MandatoryRule){
        if(input.value === ""){
            this.setError(rule, input)
        }
    }
    
    checkSize(input: MergedFormData, rule: SizeRule){
        if(input.value.length < rule.value[0] || input.value.length > rule.value[1]){
            this.setError(rule, input)
        }
    }
    
    checkRegex(input: MergedFormData, rule: RegexRule){
        if(!input.value.match(rule.value)){
            this.setError(rule, input)
        }
    }

    checkConfirm(input1: MergedFormData, rule: ConfirmRule){
        const input2 = this.inputs.find((i) => i.name === rule.value)
        if(input1.value !== input2.value){
            this.setError(rule, input2)
        }
    }

    // -------------------------------------------------------------
    // HELPER

    setError(rule: Rule, input: MergedFormData){
        this.error = {
            message: rule.error,
            input: this.inputs.find((i) => i.name === input.name)
        }
    }
}