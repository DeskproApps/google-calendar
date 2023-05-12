const getCurrentTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export { getCurrentTimeZone };
