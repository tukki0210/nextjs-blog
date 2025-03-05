import { parseISO, format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { PostDate } from '../../types/blog';

const DateBox = ({ dateString }: { dateString: PostDate }) => {
    const date = parseISO(dateString)

    return <time dateTime={dateString} className="text-gray-600 ">{format(date, 'yyyy年 MM月 dd日', { locale: ja })}</time>
}
export default DateBox;
