const server = 'http://localhost';

export const requestManager = 
{
    get(path, querryData)
    {
        const fullpath = new URL(server + path);
        
        if(querryData)
        {
            fullpath.search = new URLSearchParams(querryData).toString();
        }

        return fetch(fullpath, 
        {
            method: 'GET'
        });
    },
    post(path, body)
    {
        return fetch(server + path, 
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(body)
        });
    }
}