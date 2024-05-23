import { useState } from 'react'
import { nanoid } from 'nanoid'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({})
  const [search, setSearch] = useState("")
  const handleChange =(event) =>{
    const {name,value} = event.target
    setForm({...form,  [name]:value})
  }
  const handleSubmit =(event) =>{
    event.preventDefault();
    let id = nanoid()
    const payload = {...form, id}
    users.push(payload)
    setUsers([...users])
    event.target.reset()
  }
  const deleteUser =(id) => {
    let new_users = users.filter(item => item.id != id)
    setUsers([...new_users])
  }
  return (
    <>
    <div className="container">
      <div className="table-wrapper">
        <div className="search-wrapper">
          <input type="text" placeholder='Search...' onChange={(e)=>setSearch(e.target.value)} className="search-btn"/>
        </div>
        <table className="table-user">
          <thead>
            <tr>
              <td>T/R</td>
              <td>FirstName</td>
              <td>LastName</td>
              <td>Age</td>
              <td>Mail</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
           {
            users?.filter((item) => {
              let firstname = item?.firstname?.toLowerCase()
              let lastname = item?.lastname?.toLowerCase()
              let find = search.toLowerCase()
              if(firstname.includes(find) || lastname.includes(find)){
                return item
              }
            }).map((item, index)=>(
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.age}</td>
                <td>{item.email}</td>
                <td>
                  <button className='btn-i' onClick={() => deleteUser(item.id)}><i className="fa-sharp fa-solid fa-trash-can"></i></button>
                </td>
              </tr>
            ))
           }
          </tbody>
        </table>
      </div>
      <div className="card-wrapper">
        <div className="card">
          <div className="card-header">
            <h3 className='card-title'>Add User</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit} id='to'>
              <input type="text" name="firstname" onChange={handleChange}  placeholder='FirstName' className='card-input' required/>
              <input type="text" name="lastname" onChange={handleChange}  placeholder='LastName' className='card-input' required/>
              <input type="number" name="age" onChange={handleChange}  placeholder='Age' className='card-input' required/>
              <input type="text" name="email" onChange={handleChange}  placeholder='Email' className='card-input' required/>
            </form>
          </div>
          <div className="card-footer">
            <button type='submit' className='btn' form='to'>add user</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default App
