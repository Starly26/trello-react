export type ColumnType = {
  id:number
  name:string
}

export type CardType = {
  columnId:number
  id: number
  name: string
  description: string
  comments:string[]
}

export type CommentType = {
  text:string
  id:number
  cardId: number
}

