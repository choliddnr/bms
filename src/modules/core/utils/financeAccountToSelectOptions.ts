import type { Account } from '@/modules/finance/types'
import type { SelectOptions } from '../components/form/types'
export default function (data: Account[]) {
  let result = <SelectOptions[]>[]
  data.forEach((item) => {
    result.push({ val: item.id!, desc: item.initialname + ' - ' + item.fullname })
  })
  return result
}
