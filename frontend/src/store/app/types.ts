import { ActionType } from "typesafe-actions";
import * as appActions from "./actions";

export type AppAction = ActionType<typeof appActions>;
