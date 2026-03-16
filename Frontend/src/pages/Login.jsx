import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login(){

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {

    e.preventDefault()

    try{

      const res = await axios.post(
        "http://localhost:5000/api/login",
        {
          email: email,
          password: password
        }
      )

      // backend response check
      const token = res.data.token || res.data.accessToken

      if(!token){
        alert("Token not received from server")
        return
      }

      localStorage.setItem("token", token)

      navigate("/profile")

    }catch(err){

      alert("Login failed")

    }

  }

  return(

    <div>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

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
          Login
        </button>

      </form>

    </div>

  )

}

export default Login