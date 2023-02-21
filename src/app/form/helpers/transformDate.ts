/**  accepts a date argument: Date and returns a string with date value format: '25-11-2006'
 */
export function transformDate(date: Date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
}
