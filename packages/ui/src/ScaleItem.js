import ScaleManager from './ScaleManager';

/**
 * A single UI item that needs to be resized,
 * this is an internal class that you would not need to interact with.
 *
 * @class
 * @memberof springroll
 * @private
 */
export default class ScaleItem {
    /**
     * @param {PIXI.DisplayObject} display The item to affect
     * @param {String} align The vertical-horizontal alignment shorthand
     * @param {Object} size The original screen the item was designed for
     * @param {DisplayAdapter} adapter The display adapter
     */
    constructor(display, align, size, adapter) {
        // Break align into parts
        align = align.split('-');

        /**
         * What vertical screen location the item should be aligned to: "top", "center", "bottom"
         * @member {String}
         */
        this.vertAlign = align[0];

        /**
         * What horizontal screen location the item should be aligned to: "left", "center", "right"
         * @member {String}
         */
        this.horiAlign = align[1];

        /**
         * If this element should be aligned to the title safe area, not the actual screen.
         * Values of "horizontal" and "vertical" make the title safe calculations take place only
         * for one direction.
         * @member {Boolean|String}
         * @default false
         */
        this.titleSafe = false;

        /**
         * Maximum scale allowed in physical size
         * @member {Number}
         * @default 1
         */
        this.maxScale = 1;

        /**
         * Minimum scale allowed in physical size
         * @member {Number}
         * @default 1
         */
        this.minScale = 1;

        /**
         * If the UI element is centered horizontally
         * @member {Boolean}
         * @default false
         */
        this.centeredHorizontally = false;

        /**
         * The reference to the interface item we're scaling
         * @private
         * @member {PIXI.DisplayObject}
         */
        this._display = display;

        /**
         * The original screen the item was designed for
         * @private
         * @member {Object}
         */
        this._size = size;

        /**
         * The adapter for universal scale, rotation size access
         * @member {Object}
         * @private
         */
        this._adapter = adapter;

        let scale = adapter.getScale(display);
        let position = adapter.getPosition(display);

        /**
         * Original X scale of the item
         * @member {Number}
         * @default 0
         */
        let origScaleX = this.origScaleX = scale.x || 1;

        /**
         * The original Y scale of the item
         * @member {Number}
         * @default 0
         */
        let origScaleY = this.origScaleY = scale.y || 1;

        /**
         * The original bounds of the item with x, y, right, bottom, width,
         * height properties. This is converted from local bounds to scaled bounds.
         * @member {Object}
         */
        this.origBounds = adapter.getLocalBounds(display);
        //convert bounds to something more usable
        let temp, bounds = this.origBounds;
        if (this.origScaleX < 0) {
            temp = bounds.x;
            bounds.x = bounds.right * origScaleX;
            bounds.right = temp * origScaleX;
            bounds.width *= Math.abs(origScaleX);
        }
        else {
            bounds.x *= origScaleX;
            bounds.right *= origScaleX;
            bounds.width *= origScaleX;
        }
        if (this.origScaleY < 0) {
            temp = bounds.y;
            bounds.y = bounds.bottom * origScaleY;
            bounds.bottom = temp * origScaleY;
            bounds.height *= Math.abs(origScaleY);
        }
        else {
            bounds.y *= origScaleY;
            bounds.bottom *= origScaleY;
            bounds.height *= origScaleY;
        }

        /**
         * Original horizontal margin in pixels
         * @member {Number}
         * @default 0
         */
        this.origMarginHori = 0;

        /**
         * Original vertical margin in pixels
         * @member {Number}
         * @default 0
         */
        this.origMarginVert = 0;

        switch (this.vertAlign) {
            case ScaleManager.ALIGN_TOP:
                this.origMarginVert = position.y + this.origBounds.y;
                break;
            case ScaleManager.ALIGN_CENTER:
                this.origMarginVert = size.height * 0.5 - position.y;
                break;
            case ScaleManager.ALIGN_BOTTOM:
                this.origMarginVert = size.height - (position.y + this.origBounds.bottom);
                break;
        }

        switch (this.horiAlign) {
            case ScaleManager.ALIGN_LEFT:
                this.origMarginHori = position.x + this.origBounds.x;
                break;
            case ScaleManager.ALIGN_CENTER:
                this.origMarginHori = size.width * 0.5 - position.x;
                break;
            case ScaleManager.ALIGN_RIGHT:
                this.origMarginHori = size.width - (position.x + this.origBounds.right);
                break;
        }
    }

    // @if DEBUG
    toString() {
        return '[ScaleItem (vertAlign=\'' + this.vertAlign + '\', horiAlign=\'' + this.horiAlign + '\')]';
    }
    // @endif

    /**
     * Get the current display item
     * @member {PIXI.DisplayObject}
     * @readOnly
     */
    get display() {
        return this._display;
    }

    /**
     * Adjust the item scale and position, to reflect new screen
     * @param {Number} displayWidth The current screen width
     * @param {Number} displayHeight The current screen height
     */
    resize(displayWidth, displayHeight) {
        let adapter = this._adapter;
        let _display = this._display;
        let _size = this._size;
        let origBounds = this.origBounds;
        let origScaleX = this.origScaleX;
        let origScaleY = this.origScaleY;
        let defaultRatio = _size.width / _size.height;
        let currentRatio = displayWidth / displayHeight;
        let overallScale = currentRatio >= defaultRatio ?
            displayHeight / _size.height :
            displayWidth / _size.width;
        let scaleToHeight = currentRatio >= defaultRatio;
        let letterBoxWidth = 0;
        let letterBoxHeight = 0;

        if (scaleToHeight) {
            letterBoxWidth = (displayWidth - _size.width * overallScale) / 2;
        }
        else {
            letterBoxHeight = (displayHeight - _size.height * overallScale) / 2;
        }

        // Optional clamps on the min and max scale of the item
        let itemScale = overallScale;
        if (this.minScale && itemScale < this.minScale) {
            itemScale = this.minScale;
        }
        else if (this.maxScale && itemScale > this.maxScale) {
            itemScale = this.maxScale;
        }

        adapter.setScale(_display, origScaleX * itemScale, 'x');
        adapter.setScale(_display, origScaleY * itemScale, 'y');

        // Positioning
        let m;
        let x;
        let y;

        // Vertical margin
        m = this.origMarginVert * overallScale;

        // Determine if vertical alignment should be title safe
        let titleSafe = this.titleSafe === true || this.titleSafe === 'vertical';

        switch (this.vertAlign) {
            case ScaleManager.ALIGN_TOP:
                if (titleSafe) {
                    y = letterBoxHeight + m - origBounds.y * itemScale;
                }
                else {
                    y = m - origBounds.y * itemScale;
                }
                break;
            case ScaleManager.ALIGN_CENTER:
                y = displayHeight * 0.5 - m;
                break;
            case ScaleManager.ALIGN_BOTTOM:
                if (titleSafe) {
                    y = displayHeight - letterBoxHeight - m - origBounds.bottom * itemScale;
                }
                else {
                    y = displayHeight - m - origBounds.bottom * itemScale;
                }
                break;
        }

        // Set the position
        if (y !== null) {
            adapter.setPosition(_display, y, 'y');
        }

        // Horizontal margin
        m = this.origMarginHori * overallScale;

        // Determine if horizontal alignment should be title safe
        titleSafe = this.titleSafe === true || this.titleSafe === 'horizontal';

        switch (this.horiAlign) {
            case ScaleManager.ALIGN_LEFT:
                if (titleSafe) {
                    x = letterBoxWidth + m - origBounds.x * itemScale;
                }
                else {
                    x = m - origBounds.x * itemScale;
                }
                break;
            case ScaleManager.ALIGN_CENTER:
                if (this.centeredHorizontally) {
                    x = (displayWidth - _display.width) * 0.5;
                }
                else {
                    x = displayWidth * 0.5 - m;
                }
                break;
            case ScaleManager.ALIGN_RIGHT:
                if (titleSafe) {
                    x = displayWidth - letterBoxWidth - m - origBounds.right * itemScale;
                }
                else {
                    x = displayWidth - m - origBounds.right * itemScale;
                }
                break;
        }

        // Set the position
        if (x !== null) {
            adapter.setPosition(_display, x, 'x');
        }
    }

    /**
     * Destroy this item, don't use after this
     */
    destroy() {
        this._adapter = null;
        this.origBounds = null;
        this._display = null;
        this._size = null;
    }
}
