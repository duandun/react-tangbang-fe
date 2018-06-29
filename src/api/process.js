import { fetch } from '@/util/axios'

export function loadFormBykey ({key, tenantId}) {
  return fetch(`http://api-kylin-xg02.intra.xiaojukeji.com/flow_api_dev/rest/process-definitions/${key}/start-form-bykey`, {
    tenantId
  })
}
