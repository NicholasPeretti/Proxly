import axios, { AxiosResponse } from 'axios'
import ProxyRequest from '../../entities/ProxyRequest'

function axiosResToProxyRequest(res: AxiosResponse): ProxyRequest {
  return new ProxyRequest({
    body: res.data,
    headers: {
      ...res.headers,
      status: res.status
    }
  })
}

export default function axiosForward(req: ProxyRequest) {
  return axios
    .request({
      url: req.getTargetUrl(),
      method: req.getMethod(),
      headers: req.getTargetHeaders(),
      data: req.getTargetBody()
    })
    .then(response => axiosResToProxyRequest(response))
    .catch(error => {
      if (error.response) {
        return axiosResToProxyRequest(error.response)
      }

      throw error
    })
}
