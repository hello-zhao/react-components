### 说明

-   这是 日期选择 组件
-   需要自行导入 moment 语言包、设置时区

### 数据结构

#### TDate

```ts {"static": true}
type TDate = number | Date | Moment | Dayjs;
```

#### TShortcut

```ts {"static": true}
interface TShortcut {
    handle: () => TDate;
    label: ReactNode;
}
```

### 演示

#### 演示

```js {"codepath": "datepicker.jsx"}
```
