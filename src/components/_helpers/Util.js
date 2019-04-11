const IGNORE = ['children'];

/**
 * Extracts props for provided layout
 * @param {Object} layout - The Layout Proptypes that you are extracting for
 * @param {Object} props - The props of the component
 * @param {Object} def - Default values for attributes
 * @param {Boolean|String[]} retain - Fields to keep in props, bool for all and array for selective
 * @returns {Object[]} [Props for layout, Props with layout props removed (or kept depending on params)]
 */
export const ExtractProps = (layout, props, def = {}, retain = false) => {
    const filter = Object.keys(layout);
    const type = typeof(retain);
    const res = [{}, {}];

    Object.entries(props).forEach(([key, value]) => {
        
        // If a layout prop
        if (filter.indexOf(key) > -1 && IGNORE.indexOf(key) === -1) {
            const val = value || def;
            res[0][key] = val;

            // If config tells us to keep it in original
            if (retain || (type === 'object' && retain.indexOf(key) > -1)) {
                res[1][key] = val;
            }
        
        // If not layout param
        } else {
            res[1][key] = value;
        }
    });

    return res;
}