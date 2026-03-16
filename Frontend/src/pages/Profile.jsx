import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

function Profile(){

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const getProfile = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/profile",
      {
        headers:{
          Authorization: "Bearer " + token
        }
      }
    )

    return res.data
  }

  const { data, isLoading, error } = useQuery({
    queryKey:["profile"],
    queryFn:getProfile,
    enabled: !!token
  })

  if(!token){
    return <p>Please login first</p>
  }

  if(isLoading){
    return <p>Loading...</p>
  }

  if(error){
    return <p>Access denied</p>
  }

  const user = data.user || data

  return(

    <div>

      <h2>Profile Page</h2>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>

  )

}

export default Profile