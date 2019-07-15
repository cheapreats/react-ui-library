export const styledCondition = (...args: (boolean | string)[]): string => {
    const len = args.length;
    for (let i = 1; i < len; i += 2) {
        if (args[i - 1]) return args[i] as string;
    }

    // If even, no default so return nothing, else return the default
    if (len % 2) return args[len - 1] as string;
    return '';
};
