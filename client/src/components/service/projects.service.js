import axios from 'axios';
import {API_BASE_URL} from '../../constants'


export class ProjectService {
    
    getProjects() {
        return axios.get('/src/components/constants/projects.json')
                .then(res => res.data.data);
    }
    getAllProjects() {
        return axios.get(API_BASE_URL+'/project/')
                 .then(res => {
                    console.log("res :",res.data) 
                 return res.data
          });
     }
    
     create(project) {
          return axios.post(API_BASE_URL+'/project/create',project)
                   .then(res => {
                      console.log("res :",res.data) 
               return res.data
            });
    }

    update(project) {
       console.log("projects :", project)
      return axios.put(API_BASE_URL+'/project/update/'+ project._id,project)
               .then(res => {
                  console.log("res :",res.data) 
           return res.data
        });
      }

      delete(id) {
         return axios.delete(API_BASE_URL+'/project/delete/'+id)
                  .then(res => {
                     console.log("res :",res.data) 
              return res.data
           });
         }
         get(id) {
            return axios.get(API_BASE_URL+'/project/'+id)
            .then(res => {
               console.log("res :",res.data) 
            return res.data
     });
         }

}