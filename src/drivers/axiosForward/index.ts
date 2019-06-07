import axios, { AxiosResponse } from 'axios'
import * as https from 'https'
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
  /**
   * Ignore invalid SSL certificates
   * https://github.com/axios/axios/issues/535
   */
  const agent = new https.Agent({
    rejectUnauthorized: false
  })

  return axios
    .request({
      url: req.getTargetUrl(),
      method: req.getMethod(),
      headers: req.getTargetHeaders(),
      data: req.getTargetBody(),
      httpsAgent: agent
    })
    .then(response => axiosResToProxyRequest(response))
    .catch(error => {
      if (error.response) {
        return axiosResToProxyRequest(error.response)
      }

      throw error
    })
}
