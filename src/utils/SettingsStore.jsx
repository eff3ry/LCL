import { useState, useEffect } from "preact/hooks";
import Neutralino from "@neutralinojs/lib";

import { defaultSettings } from "../data/defaultSettings.js";

export function useSettings() {
    const [settings, setSettings] = useState({});

    async function updateSetting(name, value) {
        const key = `settings-${name}`;

        await Neutralino.storage.setData(key, String(value));

        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(async () => {
        // load existing setting from neutralino store
        let keys = [];

        // why does neutralino not just return empty array bruh
        try { keys = await Neutralino.storage.getKeys() } // gotta have this at end or imma tweak. jk but i want it ;
        catch { keys = [] };

        const loaded = { ...defaultSettings };

        for (const name in defaultSettings) {
            const key = `settings-${name}`;

            if (keys.includes(key)) {
                const value = await Neutralino.storage.getData(key);
                loaded[name] = value;
            } else {
                // use function resolve check
                let defaultSetting = defaultSettings[name];
                if (typeof defaultSetting == "function") {
                    defaultSetting = defaultSetting();
                    loaded[name] = defaultSetting;
                };
                // write default to storage
                await Neutralino.storage.setData(
                    key,
                    String(defaultSetting)
                );
            };
        };

        setSettings(loaded);
    }, []);

    return { settings, updateSetting };
};