// HTML INPUTS
// should have "name" attributes
export interface NamedInput extends HTMLInputElement{
    name: string
}

// RULE CONTAINER
export interface ConfigRule {
    name: string
    rules: Array<MandatoryRule | SizeRule | RegexRule>        
}
// RULES
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
export interface MandatoryRule {
    type: "mandatory"
    value: boolean
    error: string
}

// MERGED DATA : INPUTS <---> RULES
export interface MergedFormData {
    name: string
    value: string
    rules?: Array<MandatoryRule | SizeRule | RegexRule>
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