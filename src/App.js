import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Form from './components/Form';
import Weather from './components/Weather';
import Error from './components/Error';

function App() {

  // State del formulario
  const [ search, setSearch ] = useState({
    city: '',
    country: ''
  });
  const [ consult, setConsult ] = useState(false);
  const [ result, setResult ] =  useState({});
  const [ error, setError ] = useState(false);

  const { city, country } = search;

  useEffect(() => {
    const getApi = async () => {
      if (consult) {
        const appId = '9d17cffd9930023bd525cb94adb0cb4b';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}&units=metric`;
        const res = await fetch(url);
        const result = await res.json();
        setResult(result);
        setConsult(false);

        // Setecta si hay resultados correctos en la consulta
        if (result.cod === '404') {
          setError(true);
        }
        else {
          setError(false)
        }
      }
    };
    getApi();
    // eslint-disable-next-line
  }, [consult, city, country]);

  let component;
  if(error) {
    component = <Error message="No hay resultados" />
  }
  else {
    component = <Weather
                  result={result}
                />
  }

  return (
    <Fragment>
      <Header
        title='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Form
                search={search}
                setSearch={setSearch}
                setConsult={setConsult}
              />
            </div>
            <div className="col m6 s12">
              {component}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
