import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register(){

  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e)=>{

    e.preventDefault()

    try{

      await axios.post(
        "http://localhost:5000/api/register",
        {
          name: name,
          email: email,
          password: password
        }
      )

      alert("Registration successful. Please verify your email")

      navigate("/login")

    }catch(err){

      alert("Registration failed")

    }

  }

  return(

    <div>

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <br/><br/>

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <br/><br/>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <br/><br/>

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  )

}

export default Register