import React from 'react'
import axios from 'axios'

export const ApiUpdateJob = async (discription: number, id: number) => {
    const response = await axios.put(`http://localhost:8080/internbridge/manager/jobApplication/id=${id}&status=${status}`)
}
