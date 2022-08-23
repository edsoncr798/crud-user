import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import UsersList from './components/UsersList'
import UserForm from './components/UserForm'
import clear from './hook/clear'
import { useForm } from 'react-hook-form'





function App() {
  const [users, setUsers] = useState()
  // un useState: para renderizar informacion entre los componentes creados(componentes hijos)
  const [updateData, setUpdateData] = useState()

  const [openForm, setOpenForm] = useState(true)

  const isOpenForm=()=>setOpenForm(true)


// llamando a la API
  const getAllUsers=()=>{
    const URL =`https://users-crud1.herokuapp.com/users/`
    axios.get(URL)
    .then(res=>setUsers(res.data))
    .catch(err=> console.log(err))
  }

  // usando el useEffect para evitar bucle de renderizacion de la APi
  useEffect(()=>{
    getAllUsers()
  },[])

console.log(users)

  return (
    <div className="card__app">
      <h1 className='card-app__title'>Users</h1>
      <button onClick={isOpenForm} className='card-app__btn'>
        <i className="fa fa-circle-plus"></i>
        <h3>Create new user</h3>
      </button>
      <div className={openForm?'form__overlay' :'form__none'}>
        <div className='form__container'>
          <UserForm 
            updateData={updateData}
            getAllUsers={getAllUsers}
            setUpdateData={setUpdateData}
            setOpenForm={setOpenForm}
          />
        </div>
      </div>
      <div className='card__container'>
      {
        users?.map(user=>(
          <UsersList
            key={user.id}
            users={user}
            setUpdateData={setUpdateData}
            getAllUsers={getAllUsers}
            isOpenForm={isOpenForm}
          />
        ))
      }
      </div>
    </div>
  )
}

export default App
