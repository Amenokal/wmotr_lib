// HTML INPUTS
// should have "name" attributes
export interface NamedInput extends HTMLInputElement{
    name: string
}

// RULE CONTAINER
export type Rule = MandatoryRule | SizeRule | RegexRule | ConfirmRule

export interface ConfigRule {
    name: string
    rules: Array<Rule>        
}

// RULES
export interface MandatoryRule {
    type: "mandatory"
    error: string
}
export interface SizeRule {
    type: "size"
    value: [number, number]
    error: string
}
export interface RegexRule {
    type: "regex"
    value: RegExp
    error: string
}
export interface ConfirmRule {
    type: "confirm"
    value: string
    error: string
}


// MERGED DATA : INPUTS <---> RULES
export interface MergedFormData {
    name: string
    value: string
    rules?: Array<Rule>
}

// OUTPUT
export interface FormOutput {
    config: Array<ConfigRule>,
    inputs: Array<NamedInput>,
    error: FormError,
}
// OUTPUT ERROR
export interface FormError {
    message: string,
    input: NamedInput | undefined,
}