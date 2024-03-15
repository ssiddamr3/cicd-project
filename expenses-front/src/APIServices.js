export default class APIServices{
    

    static async loginUser(username) {
        return (await fetch(`http://127.0.0.1:8000/user-creds/${username}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })).json();
    }
    
    static async userGroups(username){
        return (await fetch(`http://127.0.0.1:8000/groups/${username}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            },
        })).json();
        
    }
} 