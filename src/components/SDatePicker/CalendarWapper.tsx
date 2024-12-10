import React from 'react';
import { popBoxCls } from './style';

export type CalendarWapperProps = {
    onMonthChange?: (status: 'normal' | 'diabled',str?:string) => void;
    hasTime?: boolean;
    /**
     * @ignore
     */
    children?: React.ReactNode;
};

const CalendarWapper = (props: CalendarWapperProps) => {
    const { onMonthChange,hasTime } = props;
    const DivRef = React.useRef<HTMLDivElement>(null);
    const handleMouseover = (event: MouseEvent) => {
        const target = event.target;

        const cellTarget = target instanceof HTMLElement && target.parentElement?.parentElement;

        if (cellTarget instanceof HTMLElement && cellTarget.title) {
            onMonthChange && onMonthChange(cellTarget.title ? 'diabled' : 'normal',cellTarget.title);
        }
    };
    const handleMouseout = (event: MouseEvent) => {
        const target = event.target;
        const cellTarget = target instanceof HTMLElement && target.parentElement?.parentElement;
        if (cellTarget instanceof HTMLElement && cellTarget.title) {
            onMonthChange && onMonthChange('normal');
        }
    };
    React.useEffect(() => {
        if (DivRef.current && hasTime) {
            // 事件捕获 实现DivRef下，鼠标移入鼠标移入的元素含有 title属性
            DivRef.current.addEventListener('mouseover', handleMouseover);

            DivRef.current.addEventListener('mouseout', handleMouseout);
        }
        return () => {
            if (DivRef.current) {
                DivRef.current.removeEventListener('mouseover', handleMouseover);
                DivRef.current.removeEventListener('mouseout', handleMouseout);
            }
        };
    }, [props.children, DivRef.current,hasTime]);

    return <div ref={DivRef} className={popBoxCls}>{props.children}</div>;
};

export default React.memo(CalendarWapper);
