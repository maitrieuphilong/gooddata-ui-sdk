// (C) 2021-2022 GoodData Corporation
import {
    bucketAttribute,
    bucketAttributes,
    bucketMeasures,
    IInsight,
    insightFilters,
    insightSorts,
} from "@gooddata/sdk-model";
import { BucketNames, IDrillEvent } from "@gooddata/sdk-ui";
import { IAreaChartProps } from "@gooddata/sdk-ui-charts";

import {
    IVisualizationDescriptor,
    PluggableVisualizationFactory,
} from "../../../interfaces/VisualizationDescriptor";
import { PluggableAreaChart } from "./PluggableAreaChart";
import { BigChartDescriptor } from "../BigChartDescriptor";
import {
    modifyBucketsAttributesForDrillDown,
    reverseAndTrimIntersection,
    addIntersectionFiltersToInsight,
} from "../drillDownUtil";
import { IDrillDownContext, IDrillDownDefinition } from "../../../interfaces/Visualization";
import {
    bucketConversion,
    chartAdditionalFactories,
    getInsightToPropsConverter,
    getReactEmbeddingCodeGenerator,
    insightConversion,
} from "../../../utils/embeddingCodeGenerator";
import { chartConfigFromInsight } from "../chartConfigFromInsight";

export class AreaChartDescriptor extends BigChartDescriptor implements IVisualizationDescriptor {
    public getFactory(): PluggableVisualizationFactory {
        return (params) => new PluggableAreaChart(params);
    }

    public applyDrillDown(insight: IInsight, drillDownContext: IDrillDownContext): IInsight {
        const withFilters = this.addFilters(
            insight,
            drillDownContext.drillDefinition,
            drillDownContext.event,
        );
        return modifyBucketsAttributesForDrillDown(withFilters, drillDownContext.drillDefinition);
    }

    public getEmbeddingCode = getReactEmbeddingCodeGenerator({
        component: {
            importType: "named",
            name: "AreaChart",
            package: "@gooddata/sdk-ui-charts",
        },
        insightToProps: getInsightToPropsConverter<IAreaChartProps>({
            measures: bucketConversion("measures", BucketNames.MEASURES, bucketMeasures),
            viewBy: bucketConversion("viewBy", BucketNames.VIEW, bucketAttributes),
            stackBy: bucketConversion("stackBy", BucketNames.STACK, bucketAttribute),
            filters: insightConversion("filters", insightFilters),
            sortBy: insightConversion("sortBy", insightSorts),
            config: insightConversion("config", chartConfigFromInsight),
        }),
        additionalFactories: chartAdditionalFactories,
    });

    private addFilters(source: IInsight, drillConfig: IDrillDownDefinition, event: IDrillEvent) {
        const cutIntersection = reverseAndTrimIntersection(drillConfig, event.drillContext.intersection);
        return addIntersectionFiltersToInsight(source, cutIntersection);
    }
}
