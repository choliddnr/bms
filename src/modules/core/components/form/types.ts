export type SelectOptions = {
  val: number | string
  desc: number | string
}

interface SelectType {
  options?: SelectOptions[]
  elm: 'select'
}
interface TextareaType {
  rows: number
  elm: 'textarea'
}
interface InputType {
  type: 'text' | 'number' | 'email' | 'password'
  isCurrency?: boolean
  elm: 'input'
}

interface ElementProps {
  label?: string
  inputPrefix?: string
  inputText?: string | undefined
  colClass?: string | number
  readonly?: boolean
  initialValue?: string | number
}

export type InputElement = ElementProps & InputType
export type TextareaElement = ElementProps & TextareaType
export type SelectElement = ElementProps & SelectType

export type Fields = {
  [key: string]: InputElement | TextareaElement | SelectElement
}
