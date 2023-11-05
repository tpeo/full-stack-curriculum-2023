import {jwtDecode} from 'jwt-decode'

const verifyCredentials = async (navigate) => {
    if(localStorage.getItem("@userToken")){
        console.log(localStorage.getItem("@userToken"))

        const decode = jwtDecode(localStorage.getItem("@userToken"));

        const user = await fetch(`http://${process.env.REACT_APP_HOSTNAME}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("@userToken"),
            },
            body: JSON.stringify({ user: decode }),
        });

        const result = (await user.json());
        console.log(result)
        return result.newUser;
    }else{
        navigate("/login");
        return -1;
    }
}

export {verifyCredentials}