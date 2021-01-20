import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {

  const [search, setSearch] = useState('');
  const [country, setCountry] = useState([]);
  const [show, setShow] = useState(true);
  const [meteos, setMeteos] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled', response.data)
        setCountry(response.data)
      })
  }, [])

  useEffect(() => {
    const rech="France"
    const api_key = 'http://api.weatherstack.com/current?access_key=515636f6ceaff59b09b6cca3e3d0ba49&query='+rech;
    axios
      .get(api_key)
      .then(response => {
        console.log('promiseA', response.data.current)
        setMeteos(response.data.current)
      })
  }, [])

  const filterCountry = country.filter(filtercountrie => {
    return filtercountrie.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  const handleChange = (event) => {
    event.preventDefault();
    // console.log(event.target.value)
    setSearch(event.target.value)
  }

  if (search === '') {
    return (
      <div>
        find countries  <input value={search} onChange={handleChange} />
      </div>
    )
  } else if (filterCountry.length > 10) {
    return (
      <div>
        find countries  <input value={search} onChange={handleChange} />
        <div>
          <p>To many matches, specify another filter</p>
        </div>
      </div>

    )
  } else if (filterCountry.length < 10 && filterCountry.length > 1) {
    const filterBtn = filterCountry.map(filterbtn =>{
      return filterbtn.name
    } )
    console.log('filter',filterBtn)

    const showbtn = () => {
      setShow({
        show : false 
      })
    }
    if(show === true){
      return (
        <div>
          find countries <input value={search} onChange={handleChange} />
          <div>
            {filterCountry.map((countrie, i) => <p key={i} >{countrie.name}<button onClick={() => showbtn()} >show</button></p>)}
          </div>
        </div>
      )
    }else{
      return (
        <div>
          find countries <input value={search} onChange={handleChange} />
          <div>
          <p>{filterBtn} </p>
          </div>
        </div>
      )
    }
    
  } else if (filterCountry.length === 1) {

    return (
      <div>
        find countries  <input value={search} onChange={handleChange} />
        <div>
          {filterCountry.map((countrie, i) => {
            return (
              <div key={i}>
                  <h1>{countrie.name}</h1>
                  <p>capital {countrie.capital}</p>
                  <p>population {countrie.population}</p>
                <div>
                  <h3>languages</h3>
                  {
                    filterCountry.map((countrie) => {
                      return countrie.languages.map((language, i) => {
                        return (
                          <div key={i} >
                            <div>
                              <li>{language.name}</li>
                            </div>
                          </div>
                        )
                      })
                    })
                  }
                  <img style={{ width: 100, height: 100, marginTop: 20 }} src={countrie.flag} alt="drapeau" />
                  {/* <p>{temperature} </p> */}
                </div>
              </div>

            )
          })}

        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p>Aucun pays trouvé</p>
      </div>
    )
  }

}


export default App;