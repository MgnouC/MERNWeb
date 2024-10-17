export const isJSONString = (data) =>  {
    try {
        JSON.parse(data);
    }  catch (e) {
        return false; 
    }
    return true
}
