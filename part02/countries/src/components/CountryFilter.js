import React from 'react';

const CountryFilter = ({onChange, value}) => {
    return (
        <form >
            <div>
                find countries: <input value={value} onChange={onChange}/>
            </div>
        </form>
    )
}

export default CountryFilter