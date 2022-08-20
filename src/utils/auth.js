import { TIME_STAMP, TOEKN_TIMEOUT_VALUE } from '@/constant/index'
import { setItem, getItem } from '@/utils/storage'

/**
 * 设置时间戳
 */
export function setTimeStamp () {
  setItem(TIME_STAMP, Date.now())
}
/**
 * 获取时间戳
 */
export function getTimeStamp () {
  return getItem(TIME_STAMP)
}
/**
 * 是否超时
 */
export function isCheckTimeout () {
  // 当前时间戳
  const currentTime = Date.now()
  // 缓存时间戳
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOEKN_TIMEOUT_VALUE
}
