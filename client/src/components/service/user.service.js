import axios from 'axios';

export class UserService {
       getUsers() {
        return axios.get('/src/components/constants/user.json')
                 .then(res => res.data.data);
     }

}


