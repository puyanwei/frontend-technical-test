import React from 'react';
import useData from './useData';
import './style.scss';

export default function VehicleList() {
  const [loading, error, vehicles] = useData();

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  return (
    <div className="vehicle-list" data-testid="results">
      {vehicles.map(
        ({ id, media, details }) => details && details.price && (
        <div className="vehicle-container" key={id}>
          <img
            className="vehicle-img"
            src={(window.innerWidth < 768) ? media[1].url : media[0].url}
            alt={`${id} vehicle`}
          />
          <div className="vehicle-details">
            <h2 className="vehicle-name uppercase">{id}</h2>
            <p className="vehicle-price">
              {`From ${details.price}`}
            </p>
            <p className="vehicle-description">{details.description}</p>
          </div>
        </div>
        )
      )}
    </div>
  );
}
