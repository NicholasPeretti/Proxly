import ProxyRequest from './entities/ProxyRequest'

const req = new ProxyRequest(
  'urltest',
  {
    body: 'body'
  },
  {
    header: 'header'
  }
)

console.log(req.getUrl(), req.getBody(), req.getHeaders())
