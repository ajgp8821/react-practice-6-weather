import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Form = ({ search, setSearch, setConsult }) => {

    const [ error, setError ] = useState(false);

    // Extraer ciudad y país
    const { city, country } = search;

    // Función que coloca los elementos en el state
    const handleChange = e => {
        // Actualizar el state
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        });
    }

    // Cuando el usuario da submit al Form
    const handleSubmit = e => {
        e.preventDefault();

        // Validar
        if (city.trim() === '' || country.trim() === '') {
            setError(true);
            return;
        }
        setError(false);

        // Pasar al componente principal
        setConsult(true);

    }

    return (
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error message="Todos los campos son obligatorios" /> : null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={city}
                    onChange={handleChange}
                    />
                <label htmlFor="city">Ciudad:</label>
            </div>
            <div className="input-field col s12">
                <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={handleChange}
                >
                    <option value="">-- Seleccione un País</option>
                    <option value="AR">Argentina</option>
                    <option value="CL">Chile</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="PE">Perú</option>
                    <option value="VE">Venezuela</option>
                </select>
                <label htmlFor="id">País:</label>
            </div>

            <div className="input-field col s12">
                <input
                    type="submit"
                    value="Buscar Clima"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
    );
}

Form.propTypes = {
    search: PropTypes.object.isRequired,
    setSearch: PropTypes.func.isRequired,
    setConsult: PropTypes.func.isRequired,
}
 
export default Form;
