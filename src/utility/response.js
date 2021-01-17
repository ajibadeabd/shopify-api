

const response = (success,message,data)=>{
    return {
        success: success == null ? true : success,
        message: message || null,
        data: data || null,
      };

}

export default response