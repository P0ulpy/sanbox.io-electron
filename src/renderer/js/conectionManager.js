import { requestManager } from "./requestManager.js";

export default { login, register };

// par ce que
let notyf = undefined;

export function login(mail, password, notyf)
{
    return new Promise((resolve, reject) => 
    {
        requestManager.post('/login', {'email': mail, 'password': password})
        .then(async(response) => 
        {
            const responseData = await JSON.parse(await response.text());
            
            console.log("login response data", responseData);
            
            if(responseData.status === "OK")
            {
                if(notyf) notyf.success(responseData?.data?.message);
                console.log('successfully login !');
                return true;
            }
            else
            {
                if(notyf) notyf.error(responseData?.data?.message);
                throw new Error(responseData?.data?.message);
            }
        })
        .catch((err) => 
        {
            throw err;
        });
    });
}

export function register(username, mail, password, notyf)
{
    requestManager.post('/register', {'username': username, 'email': mail, 'password': password})
    .then(async(response) => 
    {
        const responseData = await JSON.parse(await response.text());
        
        console.log("register response data", responseData);
        
        if(responseData.status === "OK")
        {
            if(notyf) notyf.success(responseData?.data?.message);
            console.log('successfully registered !');
            return true;
        }
        else
        {
            if(notyf) notyf.error(responseData?.data?.message);
            throw new Error(responseData?.data?.message);
        }
    })
    .catch((err) => 
    {
        throw err;
    });
}