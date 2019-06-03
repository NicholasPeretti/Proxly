/**
 * Function used to send an error response to the client ONLY WHEN
 * THE PROXY ENCOUTER AN UNCATCHED EXCEPTION.
 */

import { Reply } from '../handleRequest'
import ProxyRequest from '../../entities/ProxyRequest'

export default function replyWithError(reply: Reply, error: Error): void {
  const response = new ProxyRequest({
    body: error,
    headers: {
      status: 500
    }
  })

  return reply(response)
}
