import axios from 'axios';

const url = 'http://192.168.1.19:3000'

export function getAccountByidcust() {
    return axios.get(url+'/accountbycust/'+idcustomer);
}


