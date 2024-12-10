import React, { ReactNode } from 'react';
import { Moment } from 'moment';
import { TDate } from '@ucloud-fe/calendar';

import Input from 'src/components/Input';
import Calendar from 'src/components/Calendar';
import Popover from 'src/components/Popover';
import Time from 'src/components/TimePicker/Time';
import SvgIcon from 'src/components/SvgIcon';
import { Size } from 'src/type';

import LOCALE from './locale/zh_CN';
import { Arrow, leftBoxCls, PickerContainer, SPopup, SPopupBox } from './style';
import Footer, { TShortcut } from './Footer';
import usePicker from './usePicker';
import { formatToShort } from './utils';
import Month from './MonthV2';
import CalendarWapper from './CalendarWapper';
import { divide } from 'lodash';

export type DatePickerProps = {
    /** 值，受控 */
    value?: TDate | null;
    /** 默认值，非受控 */
    defaultValue?: TDate | null;
    /** 修改回调 */
    onChange?: (v: Moment | null) => void;
    /** 自定义规则 */
    rules?: any;
    /** 尺寸 */
    size?: Size;
    /** 输入和展示的字符串格式，为数组时，第一个用作展示，并影响时间面板 */
    format?: string | string[];
    /** 是否可为空，为空时不传或传入空值会默认为当前时刻 */
    nullable?: boolean;
    /**
     *  @deprecated 使用 format 替换
     * 设置操作面板，时分秒
     */
    display?: {
        date?: {
            /** @deprecated 设置日期展示格式，使用 format 替换 */
            format?: string;
            /** @deprecated 是否展示日期选择，仅时间选择需求使用 TimePicker 替换 */
            show?: boolean;
        };
        /** 设置为 false，隐藏时 */
        hour?: boolean;
        /** 设置为 false，隐藏分 */
        minute?: boolean;
        /** 设置为 false，隐藏秒 */
        second?: boolean;
    };
    /** 是否禁用 */
    disabled?: boolean;
    /** 状态 */
    status?: 'default' | 'error';
    /** placeholder */
    placeholder?: string;
    /**
     * @deprecated 新版交互已移除相关展示
     * @ignore
     * 面板快捷内容
     */
    shortcuts?: TShortcut[] | null;
    /** 自定义 popover，参考 popover */
    popoverProps?: any;
    /** 类型 */
    type?: 'date' | 'month';
    /** 自定义语言 */
    locale?: typeof LOCALE;
    /**
     * @deprecated 使用 popoverProps 替换
     * 弹出层的 z-index
     */
    zIndex?: number;
    /**
     * @deprecated 使用 popoverProps 替换
     * 弹出层容器，参考 popover.getPopupContainer
     */
    getCalendarContainer?: (triggerNode: Element) => Element;
    options?:{
        label: ReactNode;
        value: TDate;
        disabled?: boolean;
    }[]
};

type Time = 'HH' | 'mm' | 'ss';

export const displayToFormatAndTimeMode = (display: DatePickerProps['display']): [string[], Time[]] => {
    let format = 'YYYY-MM-DD HH:mm:ss';
    let timeFormatA: Time[] = ['HH', 'mm', 'ss'];
    if (display) {
        let dateFormat = 'YYYY-MM-DD';
        if (display.date && display.date.format) {
            dateFormat = display.date.format;
        }
        timeFormatA = [];
        if (display.hour !== false) {
            timeFormatA.push('HH');
        }
        if (display.minute !== false) {
            timeFormatA.push('mm');
        }
        if (display.second !== false) {
            timeFormatA.push('ss');
        }
        format = timeFormatA.length ? dateFormat + ' ' + timeFormatA.join(':') : dateFormat;
    }
    return [[format, formatToShort(format)], timeFormatA];
};

const DatePickerForDate = (props: DatePickerProps) => {
    const [
        inputProps,
        containerProps,
        popoverProps,
        popupProps,
        calendarProps,
        timeProps,
        footerProps,
        { error }
    ] = usePicker<DatePickerProps['display']>(props, displayToFormatAndTimeMode, 'date');

    const hasTime = !!timeProps.mode?.length;
    const [tip , setTip] = React.useState<string | undefined>();

    return (
        <PickerContainer {...containerProps} hasTime={hasTime}>
            <Popover
                {...popoverProps}
                popup={
                    <SPopupBox container>
                        <div className={leftBoxCls}>
                            1231
                        </div>
                        <SPopup {...popupProps}>
                        
                            <CalendarWapper hasTime={hasTime} onMonthChange={(s,tip) => {
                                setTip(tip)
                            }}>
                                <Calendar  {...calendarProps} sidebar={hasTime ? <Time {...timeProps} /> : null} />
                            </CalendarWapper>
                        
                            <Footer {...footerProps} tip={tip || error} isError={!tip && !!error} />
                        </SPopup>
                    </SPopupBox>
                }
            >
                <Input {...inputProps} prefix={<SvgIcon type="calendar" />} block />
            </Popover>
        </PickerContainer>
    );
};

const DatePickerV2 = (props: DatePickerProps) => {
    const { type } = props;
    
    return type === 'month' ? <Month {...props} /> : <DatePickerForDate {...props} />;
};

export default React.memo(DatePickerV2);
