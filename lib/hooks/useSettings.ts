"use client";
import { getSettings } from "@/lib/sanity/client";
import { useEffect, useState } from "react";

export const useSettings = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const settingsData = await getSettings();
      setSettings(settingsData);
    };

    fetchSettings();
  }, []);

  return settings;
};
