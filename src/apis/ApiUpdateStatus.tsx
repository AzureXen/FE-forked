import React from 'react'
import { JobApplication } from '../model/JobApplication'
import axios from 'axios'

export const ApiUpdateStatus = async (status: number, id: number) => {
    const response = await axios.put(`http://localhost:8080/internbridge/manager/jobApplication/id=${id}&status=${status}`)
}
