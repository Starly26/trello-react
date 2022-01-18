import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CardType, ColumnType, CommentType} from '../../types'
import Column from '../Column/Column'

type DashboardProps = {
  userName:string
}

const Dashboard:React.FC <DashboardProps> = ({userName}) => {
  const [columns, setColumns] = useState <ColumnType[]> ([
    {id:1, name:'TODO'},
    {id:2, name:'In Progress'},
    {id:3, name:'Testing'},
    {id:4, name:'Done'}
  ])

  const [cards, setCards] = useState<CardType[]>([])
  const [comments, setComments] = useState<CommentType[]>([])

  useEffect(()=>{
    const savedCards = JSON.parse(localStorage.getItem('cards') || '[]') as CardType[]
    const savedComments = JSON.parse(localStorage.getItem('comments') || '[]') as CommentType[]
    setCards(savedCards)
    setComments(savedComments)
  }, [])

  useEffect(()=> {
    localStorage.setItem('cards', JSON.stringify(cards))
  }, [cards])

  useEffect(()=> {
    localStorage.setItem('comments', JSON.stringify(comments))
  }, [comments])


  const addCard = (name: string, columnId:number) => {
    const card: CardType = {columnId, id: Date.now(), name, description: '', comments: [] }
    setCards([...cards, card])
  }

  const changeDescription = (description:string, cardId:number) => {
    
    const arr = cards.map((item) => {
      if (item.id === cardId) {
        return {...item, description}
      }
      else return item
    })
    setCards([...arr])
  }

  const addComment = (text: string, cardId: number) => {
    const item: CommentType = {id: Date.now(), cardId, text}
    setComments([...comments, item])
  }

  const changeComment = (text:string, commentId:number) => {
    
    const arr = comments.map((item) => {
      if (item.id === commentId) {
        return {...item, text}
      }
      else return item
    })
    setComments([...arr])
  }

  const changeNameCard = (name:string, cardId:number) => {
    const arr = cards.map((item) => {
      if (item.id === cardId) {
        return {...item, name}
      } else return item
    })
    setCards([...arr])
  }

  const removeCard = (id: number) => {
    setCards(prev => prev.filter(card => card.id !==id))
  }

  const removeComment = (id: number) => {
    setComments(prev => prev.filter(comment => comment.id !==id))
  }

  return (
    <Container>
      {columns.map(column => 
        <Column removeComment={removeComment} removeCard={removeCard} changeNameCard={changeNameCard} changeComment = {changeComment} comments = {comments} addComment = {addComment} changeDescription = {changeDescription} userName={userName} cards={cards} column={column} key={column.id} addCard={addCard}/>)}
    </Container>
  )
}

const Container = styled.div`
  display:flex;
  padding:10px;
  justify-content:space-between;
`

export default Dashboard
