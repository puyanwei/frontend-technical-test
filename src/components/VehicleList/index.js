import React from 'react';
import useData from './useData';
import './style.scss';

export default function VehicleList() {
  // eslint-disable-next-line no-unused-vars
  const [loading, error, vehicles] = useData();

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  // console.log('vehiclesDetailed', vehiclesDetailed);

  return (
    <div className="vehicle-list" data-testid="results">
      <h1>Premium Vehicles</h1>

      {vehicles.map((vehicle) => (
        <div>
          <img
            src="https://source.unsplash.com/random"
            alt="placeholder"
            height="100px"
            width="100px"
          />
          <h3>{vehicle.id}</h3>
          <p>From £76,350</p>
          <p>The pinncale of refined capability</p>
        </div>
      ))}
    </div>
  );
}
