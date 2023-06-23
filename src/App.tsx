import React from 'react';
import { TextField } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});



function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='max-w-3xl mx-auto text-center'>
        <h1 className='mt-2 font-ysabeau text-4xl mb-8 text-white'>Weather App</h1>
        <form className='w-full mt-2 mb-2'>
          <TextField id="standard-basic" variant="standard" className='w-full' onChange={(e)=>{console.log(e.target.value)}}/>
        </form> 
      </div>
    </ThemeProvider>

  );
}

export default App;
