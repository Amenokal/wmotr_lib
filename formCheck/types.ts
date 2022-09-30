// HTML INPUTS
// should have "name" attributes
interface NamedInput extends HTMLInputElement{
    name: string
}

// RULE CONTAINER
interface ConfigRule {
    name: string
    rules: Array<MandatoryRule | SizeRule | RegexRule>        
}
// RULES
interface SizeRule {
    type: "size"
    value: [number, number]
    error: string
}
interface RegexRule {
    type: "regex"
    value: RegExp
    error: string
}
interface MandatoryRule {
    type: "mandatory"
    value: boolean
    error: string
}

// MERGED DATA : INPUTS <---> RULES
interface MergedFormData {
    name: string
    value: string
    rules?: Array<MandatoryRule | SizeRule | RegexRule>
}

// OUTPUT
interface FormOutput {
    config: Array<ConfigRule>,
    inputs: Array<NamedInput>,
    error: FormError,
}
// OUTPUT ERROR
interface FormError {
    message: string,
    input: NamedInput | undefined,
}