import { FieldRenderProps } from "react-final-form";

export type ColumnType = {
  id:number
  name:string
}

export type CardType = {
  columnId:number
  id: number
  name: string
  description: string
  commentsIds:number[]
}

export type CommentType = {
  text:string
  id:number
  cardId: number
}

export type DescriptionType = {
  text: string
  cardId: number
}

export type InputFieldProps = {
  label?: string;
  disabled?: boolean;
  regexp?: RegExp;
  placeholder?: string;
  isHideValidationIcon?: boolean;
} & FieldRenderProps<string>

export type TextAreaFieldProps = {
  label?: string;
  disabled?: boolean;
  regexp?: RegExp;
  placeholder?: string;
  isHideValidationIcon?: boolean;
} & FieldRenderProps<string>