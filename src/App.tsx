import React, { useEffect, useState } from 'react';
import './App.css';
import Dashboard from './Components/Dashboard/Dashboard';
import NamedPopup from './Components/Popup/NamedPopup';

function App() {

  const [name, setName] = useState('')
  // Поменять состояние для вызова модалки
  const [isPopupVisible, setIsPopupVisible] = useState(true)
  
  useEffect(() => {
    const savedName = localStorage.getItem('authorName') || ''
    setIsPopupVisible(false)
    setName(savedName)
  })

  return (
    <>
    { isPopupVisible ?
        <NamedPopup name={name} setName={setName} saveName={() => setIsPopupVisible(false)}/>
        :<Dashboard userName={name}/>
    }
    </>
  );
}

export default App;
