import React, { Component, useEffect, useState } from 'react'
import Amplify from 'aws-amplify';
import aws_config from "./aws-exports";
import { API, graphqlOperation } from 'aws-amplify';
import { createCoach } from './graphql/mutations';
import { listCoachs } from './graphql/queries'

Amplify.configure(aws_config);

const initialState = { firstName: '', secondName: '', sport: '', introduction: '', coachingCerts: '', postcode: '' }
const GetCoaches = () => {
    const [formState, setFormState] = useState(initialState)
    const [coachs, setCoachs] = useState([])

    useEffect(() => {
        fetchCoachs()
    }, [])

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }

    async function fetchCoachs() {
        try {
            const coachData = await API.graphql(graphqlOperation(listCoachs, {
                filter: {
                    sport: {
                        eq: "Rugby"
                    }
                }
            }))
            const coachs = coachData.data.listCoachs.items
            setCoachs(coachs)
            console.log(coachs)
        } catch (err) { console.log(err) }
    }



    return (
        <div className="contiainer float">
            <h1>GALLERY</h1>
            <div className="row text-center p-0">
            {
                coachs.map((coach, index) => (
                    <div className="col-md-3 col-sm-12 p-2 m-2 card" key={coach.id ? coach.id : index} >
                        <p >{coach.firstName} {coach.secondName}</p>
                        <img src={coach.imgURL} className="card-img-top"  alt="Card image cap" />
                        <p >{coach.sport}</p>
                        <p>{coach.introduction}</p>
                        {/* <button  className="btn btn-primary">Create Coach Profile</button> */}
                        <a href={'/Gallery/' + coach.id +"/?coachid="+coach.id} >Find out more</a>
                    </div>
                ))
            }
            </div>
            
        </div>
    )
}

export default GetCoaches;