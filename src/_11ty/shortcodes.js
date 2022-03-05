const feather = require('feather-icons');

const getIcon = (icon, options = {}) => {
    const {
        colour         = null, // TODO remove
        height         = null,
        hasMarginRight = false,
    } = options;

    return icon === null  ? '' : feather.icons[icon].toSvg({ 
        class: '',
        style: hasMarginRight ? 'margin-right: 5px;' : '',
        width: '14', 
        height: height === null ? '20' : height,
    });
}

module.exports = {
    // Eleventy Shortcodes
    shortcodes: {
        icon: (icon, options = {}) => {
            const {
                hasMarginRight = false,
            } = options;

            return getIcon(icon, options);
        },
        loading: (options = {}) => {
            let whileCondition = options['while'] ?? 'true';
            
            return `
            <div
                x-show="${whileCondition}" 
                class="w-full h-full flex flex justify-center items-center">
                <span class="
                    animate-spin ease-linear 
                    rounded-full border-[3px] border-slate-400 border-r-transparent 
                    h-6 w-6">
                </span>
            </div>
            `;
        },
    },

    // Eleventy PairedShortcodes
    pairedShortcodes: {
        iconlabel: (content, options = {}) => {
            const { 
                icon       = null, 
                iconColour = null,
                iconHeight = null,
                style      = null,
            } = options;
            const styleHtml = style === null ? '' : `class="${style}"`; // TODO using `style` for class is confusing
            const iconHtml  = getIcon(icon, { 
                colour: iconColour, 
                height: iconHeight, 
                hasMarginRight: true,
            });
    
            return `<span class="flex flex-row flex-nowrap"${styleHtml}>${iconHtml}${content}</span>`;
        },
    },
};