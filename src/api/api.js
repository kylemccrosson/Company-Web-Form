class API {

  verifyBrand(data) {
    return new Promise(
      (resolve) => {
        let brand_is_valid = true;

        if (brand_is_valid) {
          resolve({isValid: true});
        }

      }
    )

  }

  sendBrandToDB(data) {
    return new Promise(
      (resolve, reject) => {
        data ?
        resolve({
          status: 'success',
          brand_id: 20011
        }) :
          reject({
            status: 'fail',
            error: 'no data'
          });
      }
    )
  }

  verifyCampaign(data) {
    return new Promise(
      (resolve) => {
        data ?
          resolve({
            isValid: true
          }) :
          resolve({
            isValid: false,
            errors: []
          })
      }
    )
  }

  sendCampaignToDB(data) {
    return new Promise(
      (resolve, reject) => {
        data ?
          resolve({
            status: 'success',
            campaign_id: 123
          }) :
          reject({
            status: 'fail',
            error: 'no data'
          })
      }
    )
  }

  validatePayment(data) {
    return new Promise(
      (resolve, reject) => {
        data ?
          resolve({
            status: 'payment_complete',
          }) :
          reject({
            status: 'payment_denied'
          })
      }
    )
  }


}

const api = new API();

export default api;

