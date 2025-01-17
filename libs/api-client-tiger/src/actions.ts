// (C) 2022 GoodData Corporation

import { AxiosInstance } from "axios";
import { ActionsApiInterface, ActionsApiFactory } from "./generated/metadata-json-api";

export const tigerActionsClientFactory = (axios: AxiosInstance): ActionsApiInterface =>
    ActionsApiFactory(undefined, "", axios);
