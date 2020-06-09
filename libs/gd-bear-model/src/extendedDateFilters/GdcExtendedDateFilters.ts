// (C) 2019-2020 GoodData Corporation
import { GdcMetadata } from "../meta/GdcMetadata";
import isEmpty from "lodash/isEmpty";

/**
 * @public
 */
export namespace GdcExtendedDateFilters {
    // Generated unique identification string that is not subject to change during project copying.
    export type GUID = string;

    // Internal platform date string - ISO-8601 calendar date string, eg.: '2018-12-30'
    export type DateString = string;

    export type RelativeGranularityOffset = number;

    export type DateFilterGranularity =
        | "GDC.time.date"
        | "GDC.time.week_us"
        | "GDC.time.month"
        | "GDC.time.quarter"
        | "GDC.time.year";

    export interface IDateFilterBase {
        localIdentifier: GUID;
        name?: string;
        visible: boolean;
    }

    export type IDateFilterAllTime = IDateFilterBase;

    export type IDateFilterAbsoluteForm = IDateFilterBase;

    export interface IDateFilterRelativeForm extends IDateFilterBase {
        granularities: DateFilterGranularity[];
    }

    export interface IDateFilterAbsolutePreset extends IDateFilterBase {
        from: DateString;
        to: DateString;
    }

    export interface IDateFilterRelativePreset extends IDateFilterBase {
        from: number;
        to: number;
        granularity: DateFilterGranularity;
    }

    export interface IDateFilterConfigContent {
        selectedOption: GUID;
        allTime?: IDateFilterAllTime;
        absoluteForm?: IDateFilterAbsoluteForm;
        relativeForm?: IDateFilterRelativeForm;
        absolutePresets?: IDateFilterAbsolutePreset[];
        relativePresets?: IDateFilterRelativePreset[];
    }

    export interface IDateFilterConfig {
        meta: GdcMetadata.IObjectMeta;
        content: IDateFilterConfigContent;
    }

    export interface IWrappedDateFilterConfig {
        dateFilterConfig: IDateFilterConfig;
    }

    export type DashboardDateFilterConfigMode = "readonly" | "hidden" | "active";

    export interface IDashboardAddedPresets {
        absolutePresets?: IDateFilterAbsolutePreset[];
        relativePresets?: IDateFilterRelativePreset[];
    }

    export interface IDashboardDateFilterConfig {
        filterName: string;
        mode: DashboardDateFilterConfigMode;
        hideOptions?: GUID[];
        hideGranularities?: DateFilterGranularity[];
        addPresets?: IDashboardAddedPresets;
    }

    export interface IDateFilterReference {
        dateFilterReference: {
            dataSet: string;
        };
    }

    export const isDateFilterReference = (obj: any): obj is IDateFilterReference =>
        !isEmpty(obj) && !!(obj as IDateFilterReference).dateFilterReference;

    export interface IAttributeFilterReference {
        attributeFilterReference: {
            displayForm: string;
        };
    }

    export const isAttributeFilterReference = (obj: any): obj is IAttributeFilterReference =>
        !isEmpty(obj) && !!(obj as IAttributeFilterReference).attributeFilterReference;
}
