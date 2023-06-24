import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Result from './components/result';
import { nanoid } from 'nanoid';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

interface RequestOptions {
  method: string;
  headers: { [key: string]: string };
  body?: string | FormData;
}

export interface City {
  id:          number;
  wikiDataId:  string;
  type:        string;
  city:        string;
  name:        string;
  country:     string;
  countryCode: string;
  region:      string;
  regionCode:  string;
  regionWdId:  string;
  latitude:    number;
  longitude:   number;
  population:  number;
}






function App() {
  const [input, setInput] = useState('');
  const [debouncedInput, setDebouncedInput] = useState(input);
  const [cities, setCities] = useState([] as any[]);

  function fetchData(value: string) {
    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=${value}`;

    const options: RequestOptions = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8765b7bbb3mshe57433b2f99a16ap171924jsn3052a70363b5',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((res) => {
        setCities(res.data)
      });
  }


  useEffect(() => {
    const timer = setTimeout(() => setInput(debouncedInput), 1000)
    return () => clearTimeout(timer);
  }, [debouncedInput])

  useEffect(() => {
    if (input !== '') {
      fetchData(input);
    }
    else {
      setInput('');
      setCities([]);
    }
  }, [input])



  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='max-w-3xl mx-auto'>
        <h1 className='mt-2 font-ysabeau text-4xl mb-8 text-white text-center'>Weather App</h1>
        <form className='w-full mt-2 mb-2'>
          <TextField id="standard-basic" variant="standard" className='w-full' onChange={(e) => { setDebouncedInput(e.target.value) }} value={debouncedInput} />
        </form>
   

        {
          
          cities.map((city: City) => {

            return <Result
              key={nanoid()}
              name={city.city}
              region={city.region}
              lat={city.latitude}
              lon={city.longitude} 
            />
          })
          

        }
      </div>
    </ThemeProvider>

  );
}

export default App;

