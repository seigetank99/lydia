import clientErrorHandler from '../api/client-error.js'
import contactHandler from '../api/contact.js'
import healthHandler from '../api/health.js'

function createRequest({ method = 'GET', body, headers = {} } = {}) {
  return {
    method,
    body,
    headers,
    socket: { remoteAddress: '127.0.0.1' },
  }
}

function createResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(name, value) {
      this.headers[name.toLowerCase()] = value
    },
    end(value = '') {
      this.body = value
    },
  }
}

async function invoke(handler, request) {
  const response = createResponse()
  await handler(request, response)
  let body

  try {
    body = JSON.parse(response.body)
  } catch {
    throw new Error(`Handler returned invalid JSON: ${response.body}`)
  }

  return { status: response.statusCode, body }
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

const health = await invoke(healthHandler, createRequest())
assert(health.status === 200, `Health handler returned ${health.status}`)
assert(health.body.ok === true, 'Health handler did not return ok=true')

const contactMethod = await invoke(contactHandler, createRequest())
assert(contactMethod.status === 405, `Contact GET returned ${contactMethod.status}`)

const contactValidation = await invoke(
  contactHandler,
  createRequest({
    method: 'POST',
    body: {},
    headers: { 'x-forwarded-for': '127.0.0.2' },
  }),
)
assert(contactValidation.status === 400, `Invalid contact POST returned ${contactValidation.status}`)

const clientErrorMethod = await invoke(clientErrorHandler, createRequest())
assert(clientErrorMethod.status === 405, `Client-error GET returned ${clientErrorMethod.status}`)

console.log('✓ API handler checks passed')
