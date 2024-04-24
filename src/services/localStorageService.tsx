
export var authenticated = false; 

export const setToken = (jwt: string) => {
    localStorage.setItem("jwt", jwt); 
    authenticated = true; 
}

export const getToken = () => {
    if (localStorage.getItem("jwt") !== "") {
        authenticated = true; 
    } else {
        authenticated = false;
    }
}

