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
            // Show loader while this condiiton is true
            const whileCondition = options['while'] ?? 'true';

            // Show a loading message next to the spinner
            const message = options['message'] ?? '';
            const messageMarkup = message !== '' 
                ? `<span class='ml-2 text-base text-slate-500'>${message}</span>` 
                : '';
            
            // Delay showing the spinner for a certain number of milliseconds
            // Eg. showing a spinner on quick page loads can make the user percieve a slower load
            const delayShow = options['delayShow'] ?? 0;

            return `
                <div
                    x-data="{
                        delayedEnough: false
                    }"
                    x-show="${whileCondition} && delayedEnough" 
                    x-init="setTimeout(() => { delayedEnough = true }, ${delayShow})"
                    class="w-full h-full flex flex justify-center items-center">
                    <span class="
                        animate-spin ease-linear 
                        rounded-full border-[3px] border-slate-400 border-r-transparent 
                        h-6 w-6">
                    </span>
                    ${messageMarkup}
                </div>
            `;
        },
        breadcrumbs: (crumbs) => {
            const crumbMarkups = crumbs.map(crumb => {
                const xTextMarkup = crumb['text'] != null ? `x-text="${crumb.text}"` : '';
                const routeMarkup = crumb['route']  != null ? `x-bind:href="${crumb.route}"` : '';
                const classMarkup = routeMarkup === ''
                    ? `class="flex items-end px-2 text-sm text-slate-500 cursor-default"`
                    : `class="flex items-end px-2 text-sm text-slate-500 hover:text-blue-700 cursor-pointer"`;

                return `<a ${classMarkup} ${xTextMarkup} ${routeMarkup}></a>`;
            });
            const delimiter = `\n<span class="flex items-end text-sm text-slate-500 cursor-default">/</span>\n`;
            return crumbMarkups.join(delimiter);
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