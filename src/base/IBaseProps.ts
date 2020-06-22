import { IDefaultSettings } from "../settings/IDefaultSettings";
import { Settings } from "@artistry/abstract";

export interface IBaseProps {
    base?: IDefaultSettings;
}

export function getSettings() {
    return Settings.get<IDefaultSettings>();
}