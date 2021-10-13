// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
const getData = async () => {
  return new Promise((resolve, reject) => {
    let objectOfApiUrl = [];
    let successfulResponses = 0;

    request('/api/vehicles.json')
      .then((response) => response.json())
      .then((data) => {
        data.forEach(({ apiUrl }) => {
          return request(apiUrl).then((response) => {
            if (response.status !== 404) {
              successfulResponses += 1;
            }
          });
        });
      });

    request('/api/vehicles.json')
      .then((response) => response.json())
      .then((data) => {
        data.forEach(({ apiUrl }) => {
          return request(apiUrl)
            .then((response) => {
              return response.status === 404 ? {} : response.json();
            })
            .then((successfulResponse) => {
              if (Object.keys(successfulResponse).length !== 0) {
                objectOfApiUrl = [...objectOfApiUrl, successfulResponse];
              }
            })
            .then(() => {
              let vehicleJsonCombined = [];
              data.forEach((el, dataIndex) => {
                objectOfApiUrl.forEach((objectOfApiUrlEl) => {
                  if (el.id === objectOfApiUrlEl.id) {
                    vehicleJsonCombined = [
                      { ...data[dataIndex], details: objectOfApiUrlEl },
                      ...vehicleJsonCombined,
                    ];
                  }
                });
              });
              if (vehicleJsonCombined.length === successfulResponses) {
                resolve(vehicleJsonCombined);
              }
            })
            .catch((err) => reject(err));
        });
      });
  });
};

export default getData;
