import { requestManager } from "../requestmanager/requestManager.js";

export default { login, register, logout, getUserData };

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
                resolve(responseData);
            }
            else
            {
                if(notyf) notyf.error(responseData?.data?.message);
                reject(new Error(responseData?.data?.message));
            }
        })
        .catch((err) => 
        {
            reject(err);
        });
    });
}

export function logout(notyf)
{
    return new Promise((resolve, reject) => 
    {
        requestManager.post('/logout')
        .then(async(response) => 
        {
            const responseData = await JSON.parse(await response.text());
            
            console.log("logout response data", responseData);
            
            if(responseData.status === "OK")
            {
                if(notyf) notyf.success(responseData?.data?.message);
                console.log('successfully logout !');
                resolve(responseData);
            }
            else
            {
                if(notyf) notyf.error(responseData?.data?.message);
                reject(new Error(responseData?.data?.message));
            }
        })
        .catch((err) => 
        {
            reject(err);
        });
    });
}

export function register(username, mail, password, notyf)
{
    return new Promise((resolve, reject) => 
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
                resolve();
            }
            else
            {
                if(notyf) notyf.error(responseData?.data?.message);
                reject(new Error(responseData?.data?.message));
            }
        })
        .catch((err) => 
        {
            reject(err);
        });
    });
}

export function getUserData()
{
    return new Promise((resolve, reject) => 
    {
        requestManager.get('/getUserData')
        .then(async(response) => 
        {
            const responseData = await JSON.parse(await response.text());
            
            console.log("getUserData response data", responseData);
            
            if(responseData.status === "OK")
            {
                console.log('successfully got user data');
                resolve({status: "OK", userData: responseData.data.userData});
            }
            else
            {
                resolve({status: "KO"});
            }
        })
        .catch((err) => 
        {
            reject(err);
        });
    });
}