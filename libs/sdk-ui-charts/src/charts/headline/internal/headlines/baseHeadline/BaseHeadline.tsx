// (C) 2023 GoodData Corporation
import React, { useCallback, useEffect } from "react";
import { defaultImport } from "default-import";
import ReactMeasure, { MeasuredComponentProps } from "react-measure";

import { HeadlineElementType } from "@gooddata/sdk-ui";

import { IChartConfig } from "../../../../../interfaces/index.js";
import PrimarySection from "./PrimarySection.js";
import CompareSection from "./CompareSection.js";
import { HeadlineFiredDrillEvent } from "../../interfaces/DrillEvents.js";
import { BaseHeadlineContext } from "./BaseHeadlineContext.js";
import { IBaseHeadlineData } from "../../interfaces/BaseHeadlines.js";
import { IHeadlineDataItem } from "../../interfaces/Headlines.js";

const Measure = defaultImport(ReactMeasure);

interface IHeadlineProps {
    data: IBaseHeadlineData;
    config?: IChartConfig;
    onDrill?: HeadlineFiredDrillEvent;
    onAfterRender?: () => void;
}

const BaseHeadline: React.FC<IHeadlineProps> = ({ data, config, onDrill, onAfterRender }) => {
    const { primaryItem, secondaryItem, tertiaryItem } = data;

    const fireDrillEvent = useCallback(
        (item: IHeadlineDataItem, elementType: HeadlineElementType, elementTarget: EventTarget) => {
            if (onDrill) {
                const itemContext = {
                    localIdentifier: item.localIdentifier,
                    value: item.value,
                    element: elementType,
                };

                onDrill(itemContext, elementTarget);
            }
        },
        [onDrill],
    );

    useEffect(() => {
        onAfterRender();
    });

    return (
        <Measure client={true}>
            {({ measureRef, contentRect }: MeasuredComponentProps) => {
                return (
                    <BaseHeadlineContext.Provider
                        value={{
                            clientWidth: contentRect.client?.width,
                            clientHeight: contentRect.client?.height,
                            config,
                            fireDrillEvent,
                        }}
                    >
                        <div className="headline" ref={measureRef}>
                            <PrimarySection primaryItem={primaryItem} isOnlyPrimaryItem={!secondaryItem} />
                            {secondaryItem ? (
                                <CompareSection secondaryItem={secondaryItem} tertiaryItem={tertiaryItem} />
                            ) : null}
                        </div>
                    </BaseHeadlineContext.Provider>
                );
            }}
        </Measure>
    );
};

export default BaseHeadline;
