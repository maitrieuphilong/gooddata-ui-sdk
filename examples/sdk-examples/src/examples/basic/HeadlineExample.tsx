// (C) 2007-2022 GoodData Corporation
import React from "react";
import { OnLoadingChanged, OnError } from "@gooddata/sdk-ui";
import { Headline } from "@gooddata/sdk-ui-charts";
import { modifyMeasure } from "@gooddata/sdk-model";
import * as Md from "../../md/full";

const FranchiseFees = modifyMeasure(Md.$FranchiseFees, (m) => m.format("#,##0").title("Franchise Fees"));
const FranchiseFeesAdRoyalty = modifyMeasure(Md.$FranchiseFeesAdRoyalty, (m) => m.format("#,##0"));

export const HeadlineExample: React.FC = () => {
    const onLoadingChanged: OnLoadingChanged = () => {
        // handle the callback here
    };

    const onError: OnError = () => {
        // handle the callback here
    };

    return (
        <div className="s-headline" style={{ display: "flex" }}>
            <style jsx>
                {`
                    .column {
                        flex: "1 1 50%";
                    }
                `}
            </style>
            <div className="column">
                <Headline
                    primaryMeasure={FranchiseFees}
                    onLoadingChanged={onLoadingChanged}
                    onError={onError}
                />
            </div>
            <div className="column">
                <Headline
                    primaryMeasure={FranchiseFees}
                    secondaryMeasure={FranchiseFeesAdRoyalty}
                    onLoadingChanged={onLoadingChanged}
                    onError={onError}
                />
            </div>
        </div>
    );
};

export default HeadlineExample;
