import React, {Component} from 'react';
import {} from 'react-native';
import axios from 'axios';


const ParentUri = 'http://192.168.1.19:7000/api/register';

export function postCustomer(data) {
    const url = ParentUri ;
    return axios.post(url, data)
}
