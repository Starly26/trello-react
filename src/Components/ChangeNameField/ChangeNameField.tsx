import React, { useState } from 'react'

type ChangeNameProps = {
  name:string
  setName:(value:string, id: number)=> void
  id:number
}

const ChangeNameField:React.FC <ChangeNameProps> = ({name, setName, id}) => {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div>
    { 
    isVisible ?
    <input value={name} onChange={event => setName(event.target.value, id)} autoFocus={true} onBlur={() => setIsVisible(false)}/>
    :<h3 onClick={ () => setIsVisible(true)}>{name}</h3>
    }
    </div>
  )
}

export default ChangeNameField

