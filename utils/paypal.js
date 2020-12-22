'use strict'
/**
 * PayPal Node JS SDK dependency
 */
const { core: { PayPalHttpClient, SandboxEnvironment, LiveEnvironment } } = require('@paypal/checkout-server-sdk')

/**
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
const client = () => new PayPalHttpClient(environment())

/**
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 */
const environment = () => {
  let clientId = process.env.PAYPAL_CLIENT_ID || 'PAYPAL-SANDBOX-CLIENT-ID'
  let clientSecret = process.env.PAYPAL_CLIENT_SECRET || 'PAYPAL-SANDBOX-CLIENT-SECRET'
  return new LiveEnvironment(clientId, clientSecret) // Live
  // return new SandboxEnvironment(clientId, clientSecret) // sanbox
}

const prettyPrint = async (jsonData, pre = '') => {
  let pretty = ''
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }
  for (let key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      if (isNaN(key)) pretty += pre + capitalize(key) + ': '
      else pretty += pre + (parseInt(key) + 1) + ': '
      if (typeof jsonData[key] === 'object') {
        pretty += '\n'
        pretty += await prettyPrint(jsonData[key], pre + '    ')
      } else {
        pretty += jsonData[key] + '\n'
      }
    }
  }
  return pretty
}

module.exports = { client, prettyPrint }
