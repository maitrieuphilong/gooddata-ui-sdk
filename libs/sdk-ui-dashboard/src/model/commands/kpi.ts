// (C) 2021-2022 GoodData Corporation

import { IDashboardCommand } from "./base";
import { isObjRef, ObjRef, IKpiComparisonDirection, IKpiComparisonTypeComparison } from "@gooddata/sdk-model";
import { FilterOpReplaceAll, WidgetFilterOperation, WidgetHeader } from "../types/widgetTypes";

/**
 * Payload of the {@link ChangeKpiWidgetHeader} command.
 * @alpha
 */
export interface ChangeKpiWidgetHeaderPayload {
    /**
     * KPI Widget reference whose measure to change.
     */
    readonly ref: ObjRef;

    /**
     * Header to use for the KPI widget. Contents of the provided header will be used as-is and will be
     * used to replace the current header values.
     */
    readonly header: WidgetHeader;
}

/**
 * @alpha
 */
export interface ChangeKpiWidgetHeader extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_HEADER";
    readonly payload: ChangeKpiWidgetHeaderPayload;
}

/**
 * Creates the ChangeKpiWidgetHeader command. Dispatching this command will result in change of the KPI widget's
 * header which (now) includes title.
 *
 * @param ref - reference of the KPI widget to modify
 * @param header - new header to use
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function changeKpiWidgetHeader(
    ref: ObjRef,
    header: WidgetHeader,
    correlationId?: string,
): ChangeKpiWidgetHeader {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_HEADER",
        correlationId,
        payload: {
            ref,
            header,
        },
    };
}

//
//
//

/**
 * Payload of the {@link ChangeKpiWidgetMeasure} command.
 * @alpha
 */
export interface ChangeKpiWidgetMeasurePayload {
    /**
     * KPI Widget reference whose measure to change.
     */
    readonly ref: ObjRef;

    /**
     * Reference to the new measure to use instead of the old measure.
     */
    readonly measureRef: ObjRef;

    /**
     * Specify the new header that should be used for the KPI widget with the
     * changed measure.
     *
     * @remarks
     * You may specify the widget header as 'from-measure'. In that case the title will be automatically
     * set to the title of measure specified in the `measureRef` property.
     */
    readonly header?: WidgetHeader | "from-measure";
}

/**
 * @alpha
 */
export interface ChangeKpiWidgetMeasure extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_MEASURE";
    readonly payload: ChangeKpiWidgetMeasurePayload;
}

/**
 * Creates the ChangeKpiWidgetMeasure command. Dispatching this command will result in change of the measure
 * used by the KPI.
 *
 * @param ref - reference of the KPI widget to modify
 * @param measureRef - reference of the measure to use
 * @param header - specify new header to use; if not provided the existing header will be reused
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function changeKpiWidgetMeasure(
    ref: ObjRef,
    measureRef: ObjRef,
    header?: WidgetHeader | "from-measure",
    correlationId?: string,
): ChangeKpiWidgetMeasure {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_MEASURE",
        correlationId,
        payload: {
            ref,
            measureRef,
            header,
        },
    };
}

//
//
//

/**
 * Payload of the {@link ChangeKpiWidgetFilterSettings} command.
 * @alpha
 */
export interface ChangeKpiWidgetFilterSettingsPayload {
    /**
     * KPI Widget reference whose filter settings to change.
     */
    readonly ref: ObjRef;

    /**
     * Filter settings to apply for the widget. The settings are used as-is and
     * replace current widget settings.
     */
    readonly operation: WidgetFilterOperation;
}

/**
 * @alpha
 */
export interface ChangeKpiWidgetFilterSettings extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS";
    readonly payload: ChangeKpiWidgetFilterSettingsPayload;
}

/**
 * Creates the ChangeKpiWidgetFilterSettings command. Dispatching this command will result in change of KPI widget's
 * filter settings; this includes change of data set used for date filter, disabling date filtering, ignoring
 * attribute filters that are defined on the dashboard for the widget.
 *
 * @param ref - reference of the KPI widget to modify
 * @param settings - new filter settings to apply
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function replaceKpiWidgetFilterSettings(
    ref: ObjRef,
    settings: Omit<FilterOpReplaceAll, "type">,
    correlationId?: string,
): ChangeKpiWidgetFilterSettings {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "replace",
                ...settings,
            },
        },
    };
}

/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpEnableDateFilter} operation.
 *
 * Dispatching this command will result in change of KPI widget's date filter setting. The date filtering will
 * be enabled and the provided date data set will be used for date-filtering widget's KPI.
 *
 * @param ref - reference of the KPI widget to modify
 * @param dateDataset - date data set to use for filtering the insight, if "default" is provided, the default date dataset will be resolved and used
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function enableKpiWidgetDateFilter(
    ref: ObjRef,
    dateDataset: ObjRef | "default",
    correlationId?: string,
): ChangeKpiWidgetFilterSettings {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "enableDateFilter",
                dateDataset,
            },
        },
    };
}

/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpDisableDateFilter} operation.
 *
 * Dispatching this command will result in change of KPI widget's date filter setting. The date filtering will
 * be disabled.
 *
 * @param ref - reference of the KPI widget to modify
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function disableKpiWidgetDateFilter(
    ref: ObjRef,
    correlationId?: string,
): ChangeKpiWidgetFilterSettings {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "disableDateFilter",
            },
        },
    };
}

/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpReplaceAttributeIgnores} operation.
 *
 * Dispatching this command will result in replacement of KPI widget's attribute filter ignore-list. Those attribute filters
 * that use the provided displayForms for filtering will be ignored by the widget.
 *
 * @param ref - reference of the KPI widget to modify
 * @param displayForms - refs of display forms used by attribute filters that should be ignored
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function replaceKpiWidgetIgnoredFilters(
    ref: ObjRef,
    displayForms?: ObjRef[],
    correlationId?: string,
): ChangeKpiWidgetFilterSettings {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "replaceAttributeIgnores",
                displayFormRefs: displayForms ?? [],
            },
        },
    };
}

/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpIgnoreAttributeFilter} operation.
 *
 * Dispatching this command will result in addition of one or more filters into KPI widget's attribute filter ignore-list.
 * Those attribute filters that use the provided displayForms for filtering will be ignored by the widget on top of any
 * other filters that are already ignored.
 *
 * Ignored attribute filters are not passed down to the KPI and will not be used to filter that KPI.
 *
 * The operation is idempotent - trying to ignore an attribute filter multiple times will have no effect.
 *
 * @param ref - reference of the KPI widget to modify
 * @param oneOrMoreDisplayForms - one or more refs of display forms used by attribute filters that should be added to the ignore-list
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function ignoreFilterOnKpiWidget(
    ref: ObjRef,
    oneOrMoreDisplayForms: ObjRef | ObjRef[],
    correlationId?: string,
): ChangeKpiWidgetFilterSettings {
    const displayFormRefs = isObjRef(oneOrMoreDisplayForms) ? [oneOrMoreDisplayForms] : oneOrMoreDisplayForms;

    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "ignoreAttributeFilter",
                displayFormRefs,
            },
        },
    };
}

/**
 * Creates the ChangeKpiWidgetFilterSettings command for {@link FilterOpUnignoreAttributeFilter} operation.
 *
 * Dispatching this command will result in removal of one or more filters from KPI widget's attribute filter ignore-list.
 * Ignored attribute filters are not passed down to the KPI and will not be used to filter that KPI.
 *
 * The operation is idempotent - trying to unignore an attribute filter multiple times will have no effect.
 *
 * @param ref - reference of the KPI widget to modify
 * @param oneOrMoreDisplayForms - one or more refs of display forms used by attribute filters that should be removed from the ignore-list
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function unignoreFilterOnKpiWidget(
    ref: ObjRef,
    oneOrMoreDisplayForms: ObjRef | ObjRef[],
    correlationId?: string,
): ChangeKpiWidgetFilterSettings {
    const displayFormRefs = isObjRef(oneOrMoreDisplayForms) ? [oneOrMoreDisplayForms] : oneOrMoreDisplayForms;

    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_FILTER_SETTINGS",
        correlationId,
        payload: {
            ref,
            operation: {
                type: "unignoreAttributeFilter",
                displayFormRefs,
            },
        },
    };
}

//
//
//

/**
 * @alpha
 */
export interface KpiWidgetComparison {
    /**
     * Type of comparison to do. May be period-over-period, previous period or no
     * comparison.
     *
     * TODO: explain PoP & previous period
     *
     * If not specified, defaults to no comparison.
     */
    comparisonType?: IKpiComparisonTypeComparison;

    /**
     * Customizes whether growth of the measure compared to previous period is considered
     * a good thing or a bad thing. This setting influences the visuals (red vs green indicators)
     */
    comparisonDirection?: IKpiComparisonDirection;
}

/**
 * Payload of the {@link ChangeKpiWidgetComparison} command.
 * @alpha
 */
export interface ChangeKpiWidgetComparisonPayload {
    /**
     * Reference to KPI Widget whose filter settings to change.
     */
    readonly ref: ObjRef;

    /**
     * Comparison settings to use for the KPI Widget.
     *
     * To disable comparison you can send empty object here.
     */
    readonly comparison: KpiWidgetComparison;
}

/**
 * @alpha
 */
export interface ChangeKpiWidgetComparison extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_COMPARISON";
    readonly payload: ChangeKpiWidgetComparisonPayload;
}

/**
 * Creates the ChangeKpiWidgetComparison command. Dispatching this command will result in change of what comparison
 * method - if any - is used for the KPI's Measure. The KPI may compare measure value from current period (as selected
 * by the date filter) to previous period and then depending on whether the current value grows can visualize that
 * as a good or bad thing.
 *
 * @param ref - reference of the KPI widget to modify
 * @param comparison - new comparison setting
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function changeKpiWidgetComparison(
    ref: ObjRef,
    comparison: KpiWidgetComparison,
    correlationId?: string,
): ChangeKpiWidgetComparison {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.CHANGE_COMPARISON",
        correlationId,
        payload: {
            ref,
            comparison,
        },
    };
}

//
//
//

/**
 * Payload of the {@link RefreshKpiWidget} command.
 * @alpha
 */
export interface RefreshKpiWidgetPayload {
    /**
     * Reference to KPI Widget to refresh.
     */
    readonly ref: ObjRef;
}

/**
 * @alpha
 */
export interface RefreshKpiWidget extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.REFRESH";
    readonly payload: RefreshKpiWidgetPayload;
}

/**
 * Creates the RefreshKpiWidget command. Dispatching this command will result in re-calculation of the KPI's value.
 *
 * @param ref - reference of the KPI widget to refresh
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function refreshKpiWidget(ref: ObjRef, correlationId?: string): RefreshKpiWidget {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.REFRESH",
        correlationId,
        payload: {
            ref,
        },
    };
}

//
//
//

/**
 * Payload of the {@link SetDrillForKpiWidget} command.
 * @alpha
 */
export interface SetDrillForKpiWidgetPayload {
    /**
     * Reference to KPI Widget to modify.
     */
    readonly ref: ObjRef;
    readonly legacyDashboardRef: ObjRef;
    readonly legacyDashboardTabIdentifier: string;
}

/**
 * @alpha
 */
export interface SetDrillForKpiWidget extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.SET_DRILL";
    readonly payload: SetDrillForKpiWidgetPayload;
}

/**
 * Creates the SetDrillForKpiWidget command. Dispatching this command will result in KPI having its drill set to the given value.
 *
 * @param ref - reference of the KPI widget to modify
 * @param legacyDashboardRef - ref of the legacy dashboard to drill to
 * @param legacyDashboardTabIdentifier - identifier of the legacy dashboard tab to drill to
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function setDrillForKpiWidget(
    ref: ObjRef,
    legacyDashboardRef: ObjRef,
    legacyDashboardTabIdentifier: string,
    correlationId?: string,
): SetDrillForKpiWidget {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.SET_DRILL",
        correlationId,
        payload: {
            ref,
            legacyDashboardTabIdentifier,
            legacyDashboardRef,
        },
    };
}

//
//
//

/**
 * Payload of the {@link RemoveDrillForKpiWidget} command.
 * @alpha
 */
export interface RemoveDrillForKpiWidgetPayload {
    /**
     * Reference to KPI Widget to modify.
     */
    readonly ref: ObjRef;
}

/**
 * @alpha
 */
export interface RemoveDrillForKpiWidget extends IDashboardCommand {
    readonly type: "GDC.DASH/CMD.KPI_WIDGET.REMOVE_DRILL";
    readonly payload: RemoveDrillForKpiWidgetPayload;
}

/**
 * Creates the RemoveDrillForKpiWidget command. Dispatching this command will result in KPI having its drill removed.
 *
 * @param ref - reference of the KPI widget to modify
 * @param correlationId - specify correlation id to use for this command. this will be included in all
 *  events that will be emitted during the command processing
 *
 * @alpha
 */
export function removeDrillForKpiWidget(ref: ObjRef, correlationId?: string): RemoveDrillForKpiWidget {
    return {
        type: "GDC.DASH/CMD.KPI_WIDGET.REMOVE_DRILL",
        correlationId,
        payload: {
            ref,
        },
    };
}
