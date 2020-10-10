export function displayTimeBeforeNow(date: string) {
  return timeDifference(new Date().getTime(), new Date(date).getTime())
}

export function timeDifference(current: number, previous: number) {
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerMonth = msPerDay * 30
  const msPerYear = msPerDay * 365

  const elapsed = current - previous

  let timeLength: number
  let timeScale: string

  if (elapsed < msPerMinute) {
    timeLength = Math.round(elapsed / 1000)
    timeScale = 'second'
  } else if (elapsed < msPerHour) {
    timeLength = Math.round(elapsed / msPerMinute)
    timeScale = 'minute'
  } else if (elapsed < msPerDay) {
    timeLength = Math.round(elapsed / msPerHour)
    timeScale = 'hour'
  } else if (elapsed < msPerMonth) {
    timeLength = Math.round(elapsed / msPerDay)
    timeScale = 'day'
  } else if (elapsed < msPerYear) {
    timeLength = Math.round(elapsed / msPerMonth)
    timeScale = 'month'
  } else {
    timeLength = Math.round(elapsed / msPerYear)
    timeScale = 'year'
  }

  return `${timeLength} ${timeScale}${timeLength > 1 ? 's' : ''} ago`
}
