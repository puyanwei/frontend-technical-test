// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
  return new Promise((resolve, reject) => {
    let objectOfApiUrl = [];
    let OG = [];
    let successfulResponses = 0;

    request('/api/vehicles.json')
      .then((response) => response.json())
      .then((data) => {
        data.forEach(({ apiUrl }) => {
          return request(apiUrl).then((response) => {
            // eslint-disable-next-line no-plusplus
            if (response.status !== 404) successfulResponses++;
          });
        });
      });

    request('/api/vehicles.json')
      .then((response) => response.json())
      .then((data) => {
        data.forEach(({ apiUrl }) => {
          return request(apiUrl)
            .then((response) => {
              if (response.status === 404) {
                return {};
              }
              return response.json();
            })
            .then((successfulResponse) => {
              if (Object.keys(successfulResponse).length !== 0) {
                objectOfApiUrl = [...objectOfApiUrl, successfulResponse];
              }
            })
            .then(() => {
              let newTing = [];
              OG = data;
              let newData = [];
              OG.forEach((el, OGIndex) => {
                objectOfApiUrl.forEach((objectOfApiUrlEl) => {
                  if (el.id === objectOfApiUrlEl.id) {
                    newData = { ...OG[OGIndex], details: objectOfApiUrlEl };
                    newTing = [...newTing, newData];
                  }
                });
              });
              if (newTing.length === successfulResponses) resolve(newTing);
            })
            .catch((err) => reject(err));
        });
      });
  });
}
