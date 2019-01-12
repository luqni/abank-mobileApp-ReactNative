import axios from 'axios';

const Url = "http://192.168.1.9:3000/transaction/historyLatest/";

export function getAllTransaction(data){
    return axios.get(Url,data);
}