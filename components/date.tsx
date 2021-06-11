import { parseISO, format, Locale } from 'date-fns'
import ja from 'date-fns/locale/ja'

type Date = `${number}-${number}-${number}`

const Date = ({ dateString }:{dateString:Date}) => {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'yyyy年 MM月 dd日', { locale: ja })}</time>
}
export default Date;