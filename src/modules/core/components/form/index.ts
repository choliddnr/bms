import { type SelectProps } from './Select.vue'
import { type InputProps } from './Input.vue'
import { type TextareaProps } from './Textarea.vue'

export type { SelectProps, InputProps, TextareaProps }

export const Form = () => import('./Form.vue')
export const InputGroup = () => import('./InputGroup.vue')
export const Input = () => import('./Input.vue')
export const Textarea = () => import('./Textarea.vue')
export const Select = () => import('./Select.vue')

console.log('this is Index form')
