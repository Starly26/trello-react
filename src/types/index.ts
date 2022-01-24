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