import React, { Component } from 'react'
import { render } from '@testing-library/react';
const queryString = require('query-string');

let search = window.location.search;
let params = new URLSearchParams(search);
let foo = params.get('coachid');
console.log(foo)
const initialState = { firstName: '', secondName: '', sport: '', introduction: '', coachingCerts: '', postcode: '' }
const GetOneCoach = () => {

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
  render(); {
    return (
        <h1>HEY THERE!!</h1>
        );
    }
  }

export default GetOneCoach;
