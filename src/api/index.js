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
    let apiUrlsObject = [];
    let successfulResponseCount = 0;

    request('/api/vehicles.json')
      .then((response) => response.json())
      .then((parentJson) => {
        parentJson.forEach(({ apiUrl }) => {
          return request(apiUrl).then((response) => {
            if (response.status !== 404) {
              successfulResponseCount += 1;
            }
          });
        });
      });

    request('/api/vehicles.json')
      .then((response) => response.json())
      .then((parentJson) => {
        parentJson.forEach(({ apiUrl }) => {
          return request(apiUrl)
            .then((response) => {
              return response.status === 404 ? {} : response.json();
            })
            .then((childJson) => {
              if (Object.keys(childJson).length !== 0) {
                apiUrlsObject = [...apiUrlsObject, childJson];
              }
            })
            .then(() => {
              let vehicleJsonCombined = [];
              parentJson.forEach((parentElement, parentJsonIndex) => {
                apiUrlsObject.forEach((apiUrlsObjectElement) => {
                  if (parentElement.id === apiUrlsObjectElement.id) {
                    vehicleJsonCombined = [
                      {
                        ...parentJson[parentJsonIndex],
                        details: apiUrlsObjectElement,
                      },
                      ...vehicleJsonCombined,
                    ];
                  }
                });
              });
              if (vehicleJsonCombined.length === successfulResponseCount) {
                resolve(vehicleJsonCombined);
              }
            })
            .catch((err) => reject(err));
        });
      });
  });
};

export default getData;
