const BodycheckboxClickedAction =(payload)=>{
    console.log("payload:::",payload);
    return{
      type:"BODYCHECKBOX",
      payload:payload,
   };
};
export default BodycheckboxClickedAction;