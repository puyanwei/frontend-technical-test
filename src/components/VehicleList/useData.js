import { useState, useEffect } from 'react';
import getData from '../../api';

export default function useData() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getData()
      .then((response) => response)
      .then((data) => setVehicles(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  console.log('vehicles', vehicles);

  return [loading, error, vehicles];
}
