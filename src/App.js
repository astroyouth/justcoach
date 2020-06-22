import { withAuthenticator } from '@aws-amplify/ui-react'

import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createCoach } from './graphql/mutations'
import { listCoachs } from './graphql/queries'
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);


const initialState = { firstName: '', secondName: '', sport: '' , introduction: '' , coachingCerts: '', postcode: ''  }

const App = () => {
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
      const coachData = await API.graphql(graphqlOperation(listCoachs))
      const coachs = coachData.data.listCoachs.items
      setCoachs(coachs)
    } catch (err) { console.log('error fetching coaches') }
  }

  async function addCoach() {
    try {
      if (!formState.firstName || !formState.secondName) return
      const coach = { ...formState }
      console.log(coach)
      setCoachs([...coachs, coach])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createCoach, {input: coach}))
    } catch (err) {
      console.log('error creating coach:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Amplify Coaches</h2>
      <input
        onChange={event => setInput('firstName', event.target.value)}
        style={styles.input}
        value={formState.firstName} 
        placeholder="First Name"
      />
      <input
        onChange={event => setInput('secondName', event.target.value)}
        style={styles.input}
        value={formState.secondName}
        placeholder="Last Name"
      />
        <input
        onChange={event => setInput('sport', event.target.value)}
        style={styles.input}
        value={formState.sport} 
        placeholder="Sport"
      />
      <input
        onChange={event => setInput('introduction', event.target.value)}
        style={styles.input}
        value={formState.introduction}
        placeholder="Introduction"
      />
        <input
        onChange={event => setInput('coachingCerts', event.target.value)}
        style={styles.input}
        value={formState.coachingCerts} 
        placeholder="Coaching Certificates"
      />
      <input
        onChange={event => setInput('postcode', event.target.value)}
        style={styles.input}
        value={formState.postcode}
        placeholder="Postcode"
      />
      <button style={styles.button} onClick={addCoach}>Create Coach</button>
      {
        coachs.map((coach, index) => (
          <div key={coach.id ? coach.id : index} style={styles.coach}>
            <p style={styles.coachFirstName}>{coach.firstName}</p>
            <p style={styles.coachSecondName}>{coach.secondName}</p>
            <p style={styles.coachSport}>{coach.sport}</p>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  coach: {  marginBottom: 5 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 0, padding: 8, fontSize: 18 },
  coachFirstName: { fontSize: 20, fontWeight: 'bold' },
  coachIntroduction: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default withAuthenticator (App);

