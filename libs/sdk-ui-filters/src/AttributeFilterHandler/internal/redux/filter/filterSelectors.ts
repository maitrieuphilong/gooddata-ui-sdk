// (C) 2021-2022 GoodData Corporation
import {
    IAttributeElements,
    newNegativeAttributeFilter,
    newPositiveAttributeFilter,
} from "@gooddata/sdk-model";
import { createSelector } from "@reduxjs/toolkit";
import difference from "lodash/difference";
import union from "lodash/union";

import { selectState } from "../common/selectors";
import {
    selectCommittedSelection,
    selectIsCommittedSelectionInverted,
} from "../selection/selectionSelectors";

/**
 * @internal
 */
export const selectAttributeFilterElementsForm = createSelector(selectState, (state) => state.elementsForm);

/**
 * @internal
 */
export const selectHiddenElements = createSelector(selectState, (state) => state.config.hiddenElements ?? []);

/**
 * @internal
 */
export const selectHiddenElementsAsAttributeElements = createSelector(
    selectAttributeFilterElementsForm,
    selectHiddenElements,
    (elementsForm, hiddenElements) =>
        elementsForm === "uris" ? { uris: hiddenElements } : { values: hiddenElements },
);

/**
 * @internal
 */
export const selectAttributeFilterDisplayForm = createSelector(selectState, (state) => state.displayFormRef);

/**
 * @internal
 */
export const selectAttributeFilterElements = createSelector(
    selectAttributeFilterElementsForm,
    selectCommittedSelection,
    (elementsForm, selection): IAttributeElements =>
        elementsForm === "uris" ? { uris: selection } : { values: selection },
);

/**
 * @internal
 */
export const selectAttributeFilterElementsWithHiddenElementsResolved = createSelector(
    selectAttributeFilterElementsForm,
    selectCommittedSelection,
    selectIsCommittedSelectionInverted,
    selectHiddenElements,
    (elementsForm, selection, isInverted, hiddenElements): IAttributeElements => {
        const updatedSelection = isInverted
            ? union(selection, hiddenElements)
            : difference(selection, hiddenElements);

        return elementsForm === "uris" ? { uris: updatedSelection } : { values: updatedSelection };
    },
);

/**
 * @internal
 */
export const selectAttributeFilter = createSelector(
    selectAttributeFilterDisplayForm,
    selectIsCommittedSelectionInverted,
    selectAttributeFilterElementsWithHiddenElementsResolved,
    (displayForm, isInverted, elements) =>
        isInverted
            ? newNegativeAttributeFilter(displayForm, elements)
            : newPositiveAttributeFilter(displayForm, elements),
);
