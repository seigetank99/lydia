function json(res, status, body) {
  res.statusCode = status
  res.setHeader('content-type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

export default async function handler(_req, res) {
  return json(res, 200, {
    ok: true,
    service: 'fidara-site',
    time: new Date().toISOString(),
  })
}
