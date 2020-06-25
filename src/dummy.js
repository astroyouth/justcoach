import { withAuthenticator } from '@aws-amplify/ui-react'

import React, { useEffect, useState } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createCoach } from './graphql/mutations'
import { listCoachs } from './graphql/queries'
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);


const initialState = { name: '', description: '' }

const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [coachs, setCoachs] = useState([])

  useEffect(() => {
    fetchCoachs()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }



  async function addCoach() {
    try {
      if (!formState.name || !formState.description) return
      const coach = { ...formState }
      setCoachs([...coachs, coach])
      setFormState(initialState)
      await API.graphql(graphqlOperation(createCoach, {input: coach}))
      console.log(coach)
    } catch (err) {
      console.log('error creating coach:', err)
    }
  }
