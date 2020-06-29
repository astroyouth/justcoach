import React, { Component, useEffect, useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_config from "./aws-exports";
import { API, graphqlOperation } from 'aws-amplify';
import { listCoachs } from './graphql/queries'

Amplify.configure(aws_config);
let search = window.location.search;
let params = new URLSearchParams(search);
let foo = params.get('coachid');
// console.log(foo)

const initialState = { firstName: '', secondName: '', sport: '', introduction: '', coachingCerts: '', postcode: '' }
const GetOneCoach = () => {
    const [formState, setFormState] = useState(initialState)
    // const [coachs, setCoachs] = useState([])
    const [coach, setCoach] = useState({})

    useEffect(() => {
        fetchCoach()
    }, [])

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }

    async function fetchCoach() {
        try {
            const coachData = await API.graphql(graphqlOperation(listCoachs))
            const coachs = coachData.data.listCoachs.items
            // setCoach(coachs)
            // console.log(coachs.find(x => x.id === foo).firstName)
            var firstName = coachs.find(x => x.id === foo).firstName
            var secondName = coachs.find(x => x.id === foo).secondName
            var introduction = coachs.find(x => x.id === foo).introduction
            var sport = coachs.find(x => x.id === foo).sport
            var postcode = coachs.find(x => x.id === foo).postcode
            var coachingCerts = coachs.find(x => x.id === foo).coachingCerts
            var imgURL = coachs.find(x => x.id === foo).imgURL
            var coach = {firstName: firstName, secondName: secondName, introduction: introduction, sport: sport, postcode: postcode, coachingCerts: coachingCerts, imgURL: imgURL}
            console.log(coach.firstName)
            setCoach(coach)
        } catch (err) { console.log(err) }
    }
    
    console.log(coach)


        return (
            <div className="row text-center justify-content-around p-0 float">
            {
                
                    <div className="col-md-3 col-sm-12 p-2 m-0 card " >
                        <h2 >{coach.firstName} {coach.secondName}</h2>
                        <img src={coach.imgURL} className="card-img-top"  alt="Card image cap" />
                        <h1 >{coach.sport}</h1>
                        <p>{coach.introduction}</p>
                        <h3>Coaching Certification: {coach.coachingCerts}</h3>
                        <h4>Postcode: {coach.postcode}</h4>
                        <a href={'/Gallery'} ><strong>Back</strong></a>
                        <img src="https://img.favpng.com/7/24/4/business-5-star-probot-artistry-hotel-png-favpng-LyxTdVtQe0dWZqpXaeq4b40dS.jpg" className="w-100" />
                    </div>
                
            }
            </div>
            );
    }


export default withAuthenticator(GetOneCoach);