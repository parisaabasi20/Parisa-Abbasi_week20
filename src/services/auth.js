import api from "../configs/api"

export const registerUser = async (data) => {
  const reponse = await api.post("/auth/register", data);
  return reponse.data;
};


export const loginUser=async(data)=>{
    const reponse=await api.post("/auth/login",data);
    return reponse.data;
}
