export const styledSwitch = (value: string, ...args: string[]): string => {
    const len = args.length;
    for (let i = 0; i < len; i += 2) {
        if (value === args[i]) return args[i + 1];
    }

    // If even, no default so return nothing, else return the default
    if (len % 2) return args[len - 1];
    return '';
};
