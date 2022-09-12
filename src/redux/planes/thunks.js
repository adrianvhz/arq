import { getShowPlanUserById, updatePersonalData } from "../../providers";
import { updatePerfil } from "../auth";
import { getPlanes } from "./planSlice";

export const getPlanUserById = () => {

    return async(dispatch, getState) => {
        
       const {uid} = getState().auth;
       //const id = 1;

      const resp = await getShowPlanUserById(uid)
      dispatch(getPlanes(resp.data))
    
 }



}


export const startSavePerfil = () => {

    return async(dispatch, getState) => {
        const {uid,name,lastname} = getState().auth;
       const {data} = await updatePersonalData({uid,name,lastname})
       const user =  data.data

       dispatch(updatePerfil({ 
        uid:user.id, 
        name:user.name,
        lastname:user.lastname, 
        email:user.email,
        successMessage:data.msg
    }))
     
  }

    
}