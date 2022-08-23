import React from "react";
import axios from 'axios'

// componente para listar los usuarios
const UsersList = ({ users, setUpdateData, getAllUsers,isOpenForm }) => {

  const deleteUser=()=>{
    const URL=`https://users-crud1.herokuapp.com/users/${users.id}/`
    axios.delete(URL)
    .then(res=>{
      console.log(res.data)
      getAllUsers()
    })
    .catch(err=> console.log(err))
  }


  const handleUpdate=()=>{
    isOpenForm()
    setUpdateData(users)
  }


  return (
    <article className="card">
      <div className="card__content">
        <h2 className="card__names">{`${users.first_name} ${users.last_name}`}</h2>
        <hr className="card__hr" />
        <ul className="card__list">
          <li className="card__item">
            <span>Email</span>
            <br /> ✉️{users.email}
          </li>
          <li className="card__item">
            <span>Birthday</span>
            <br /> 🎁{users.birthday}
          </li>
        </ul>
      </div>
      <hr className="card__hr" />
      <footer className="card__footer">
        <button onClick={deleteUser} className="card-btn__delete">
          <i className="fa-solid fa-trash-can"></i>
        </button>
        <button onClick={handleUpdate} className="card-btn__update">
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
      </footer>
    </article>
  );
};

export default UsersList;
