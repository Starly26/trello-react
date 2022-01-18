import React, { useState } from 'react'
import styled from 'styled-components'
import { CardType, ColumnType, CommentType } from '../../types'
import Card from '../Card/Card'
import ChangeNameField from '../ChangeNameField/ChangeNameField'
import TextAreaField from '../TextAreaField/TextAreaField'

type ColumnProps ={
  column:ColumnType
  cards:CardType[]
  userName:string
  addCard:(name:string, id:number) => void
  changeDescription: (text:string, cardId: number) => void
  addComment:(text: string, cardId: number) => void
  comments:CommentType[]
  changeComment:(text:string, id:number) => void
  changeNameCard:(name:string, cardId:number) => void
  removeCard:(id:number) => void
  removeComment:(id:number) => void
}


const Column:React.FC <ColumnProps> = ({column, cards, userName, addCard, changeDescription, addComment, comments, changeComment, changeNameCard, removeCard, removeComment}) => {

  const [columnName, setColumnName] = useState(column.name)
  const [isVisibleTextArea, setIsVisibleTextArea] = useState(false)

  return (
    <ColumnContainer>
      <ColumnWrapper>
        <ChangeNameField name={columnName} setName={setColumnName} id={column.id}/>
      </ColumnWrapper>
      <ColumnWrapper>
      {
        cards.map((item) => {
          if (item.columnId === column.id) {
            return <Card removeComment={removeComment} removeCard={removeCard} changeNameCard={changeNameCard} card ={item} userName = {userName} key ={item.id} columnName = {columnName} changeDescription = {changeDescription} comments = {comments} addComment = {addComment} changeComment={changeComment}/>
          }
        })
      }
        { isVisibleTextArea ?     
        <TextAreaContainer>
          <TextAreaField id={column.id} change={addCard} close={() => setIsVisibleTextArea(false)} placeName='Ввести заголовок этой карточки' btnName='Add card'/>
        </TextAreaContainer>
        :
        <Button onClick={() => setIsVisibleTextArea (true)}>Add card</Button>
      }
      </ColumnWrapper>
    </ColumnContainer>
  )
  
}

const ColumnContainer = styled.div `
  background-color: #ebecf0;
  border-radius: 3px;
  width: 200px;
  margin: 30px;
`
const ColumnWrapper = styled.div `
  display:flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  padding-bottom: 10px;
`
const Button = styled.button `
  padding: 5px;
  cursor: pointer;
`

const TextAreaContainer = styled.div`
width:80%;
margin:auto;
`

export default Column
