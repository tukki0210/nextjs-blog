import { parseISO, format, Locale } from 'date-fns'
import ja from 'date-fns/locale/ja'

const Date = ({ dateString }) => {
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, 'yyyy年 MM月 dd日', { locale: ja })}</time>
}
export default Date;