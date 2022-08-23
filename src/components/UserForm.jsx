import React, { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import clear from '../hook/clear'

// url de la API
const URL=`https://users-crud1.herokuapp.com/users/`

// componente formulario para crear usuarios
const UserForm = ({updateData, getAllUsers, setUpdateData, setOpenForm}) => {

  // useEffect para recibir informacion de otro componente hijo cada que lo solicite
  // y evitar bucles
  useEffect(()=>{
    reset(updateData)
  },[updateData])


  // funcion para add/create nuevos usuarios

const CreateNewUser=data=>{
    // mandamos datos mediante post a la URL mediante data
    axios.post(URL, data)
    .then(res =>{
      console.log(res.data)
// aqui obtenemos (axios.get) toda la informacion de la URL
  //con los datos mandados anteriormente mediante el POST 
      getAllUsers()
    })
    .catch(err=>console.log(err))
}


  // funcion para actualizar datos del usuario usando PATCH

const updateDataUser=data=>{
  const URL=`https://users-crud1.herokuapp.com/users/${updateData.id}/`
  axios.patch(URL, data)
  .then(res=>{
    console.log(res.data)
    getAllUsers()
  })
  .catch(err=>console.log(err))
}

 const {register, reset, handleSubmit}=useForm()

 const isCloseForm=()=> {
  setOpenForm(false)
  reset(clear)
  setUpdateData()
 }



 const submit=(data)=>{
  if(updateData){
    // se ejecuta cuando hay datos en el formulario
    updateDataUser(data)
    setUpdateData()
    isCloseForm()
  }else{
    // se ejecuta cuando el formulario es null
    CreateNewUser(data)
  }
  reset(clear)
  
 }


  return (
    <form onSubmit={handleSubmit(submit)} className='form'>
      <div onClick={isCloseForm} className="form__equis">❌</div>
      <h2 className='form__title'>{updateData?'Update User':'New user'}</h2>
      <br />
      <ul className='form__list'>
        <li>
          <label htmlFor="first_name">Name:</label><br />
          <input placeholder='Name' {...register('first_name')} type="text" id='first_name'/>
        </li>
        <li>
          <label htmlFor="last_name">LastName</label><br />
          <input placeholder='LastName' {...register('last_name')} type="text" id='last_name'/>
        </li>
        <li>
          <label htmlFor="email">Email:</label> <br />
          <input placeholder='email' {...register('email')} type="text" id='email'/>
        </li>
        <li>
          <label htmlFor="password">Password:</label><br />
          <input placeholder='password' {...register('password')} type="password" id='password'/>
        </li>
        <li>
          <label htmlFor="birthday">Birthday:</label><br />
          <input placeholder='birthday' {...register('birthday')} type="date" id='birthday'/>
        </li>
      </ul>
      <button className='form__btn'>{updateData?'Update':'Add new user'}</button>
    </form>
  )
}

export default UserForm