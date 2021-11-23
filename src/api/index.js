// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.

async function getDataNew() {
  const vehicleIdsRes = await request('/api/vehicles.json')
  const vehicleIds = await vehicleIdsRes.toJson()
  
  const vehicleMoreInfoApiUrls = vehicleIds.map(v => v.apiUrl)
  const vehicleInfo = await Promise.all(vehicleMoreInfoApiUrls.map(async url => await (await request(url)).toJson()))

  const [vechicleInfo, successfulResponseCount] = vehicleMoreInfoApiUrls.reduce(async (url, [arr, total]) => {
    const fullInfoRes = await request(url)
    const fullInfo = await fullInfoRes.toJson()
    return [[...arr, fullInfo], total + 1]
  }, [[], 0])

  return array
}


const fruit = [{name: "apple", price: 1000, quantity: 15}, {name: "banana", price: 23123, quantity: 10  }]

const basketTotal = fruit.reduce((total, item) => {
  return total + item.price * item.quantity
}, 0)


const basketTotal = fruit.reduce(async (promise, fruitUrl) => {
  promise.then(res => {
    //
  })

  const fruitPromise = request(fruitUrl).then(res => /* do something */ )
  return [fruitPromise]
  
}, Promise.resolve())

console.log(basketTotal)


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
