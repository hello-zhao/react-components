import { Sizes } from 'src/type';

import DatePickerV2 from './DatePickerV2';
import MonthV2 from './MonthV2';
import RangeV2 from './RangeV2';

type TExportDatePickerV2 = typeof DatePickerV2 & {
    Month: typeof MonthV2;
    Range: typeof RangeV2;
    Sizes: typeof Sizes;
};

const ExportDatePickerV2: TExportDatePickerV2 = DatePickerV2 as TExportDatePickerV2;
ExportDatePickerV2.Month = MonthV2;
ExportDatePickerV2.Range = RangeV2;
ExportDatePickerV2.Sizes = Sizes;
console.log('Sizes--->',Sizes);

export default ExportDatePickerV2;
