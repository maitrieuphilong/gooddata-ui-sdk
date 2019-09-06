// (C) 2007-2018 GoodData Corporation
import * as React from "react";
import { BaseChart } from "../../components/core/base/NewBaseChart";
import { IChartProps } from "../chartProps";

export class CoreLineChart extends React.PureComponent<IChartProps, null> {
    public render() {
        return <BaseChart type="line" {...this.props} />;
    }
}
