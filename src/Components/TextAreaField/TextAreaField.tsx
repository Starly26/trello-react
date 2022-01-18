import { type } from 'os'
import React, { useState } from 'react'
import styled from 'styled-components'
import { CardType } from '../../types'

type TextAreaProps = {
  placeName:string
  btnName:string
  close?:() => void
  change: (val:string, id:number) => void
  id:number
}

const TextAreaField:React.FC <TextAreaProps>= ({placeName, btnName, close, change, id}) => {
  const [name, setName] = useState('')
  return (
    <div>
      <Textarea value={name} onChange={(evt) => setName(evt.target.value)} placeholder={placeName}/>
      <Div>
        <Button onClick={() => change(name, id)} disabled={!name.length} >{btnName}</Button>
        { close ?
          <ImgContainer onClick={close}><img src="/assets/close.svg" alt="close"/></ImgContainer>
          : <></>
        }
      </Div>
    </div>
  )
}

export default TextAreaField

const ImgContainer = styled.div `
  width:15px;
`
const Div = styled.div `
  display:flex;
  align-items: center;
  justify-content: space-between;
`
const Button = styled.button `
padding:5px;
`
const Textarea = styled.textarea`
width:100%;
`