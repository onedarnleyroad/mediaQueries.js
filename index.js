// NEW NODE / BROWSERIFY VERSION

module.exports = (function(w) {

    // usage:
    /*
        Defaults are in place, so:
        desktop: { min: 1367 },
        laptop: { max: 1366 },
        tablet: { max: 1024 },
        mobile: { max: 480 },

        is already set, but can be overriden or added to when initialising

        var media = new MediaQueries({
            desktop: { min: 1920 },
            sidebar: { max: 1300 },
            tablet-only: { max: 1024, min: 480 }
        });

        // true when window is max-width 1300px, false otherwise
        console.log( media.matches('sidebar') );

        // true when above mobile but below tablet
        console.log( media.matches('tablet-only') );
    */



    // can we use the matchMedia api?
    // if not use plain old jQuery window size.
    var mq = ('matchMedia' in window);

    var _maxWidth = function( size, unit ) {

        unit = unit || 'px';

        if (mq) {
            return ( window.matchMedia('(max-width: ' + size + unit + ')').matches );
        } else {
            return ( window.innerWidth <= size );
        }
    };

    var _minWidth = function( size ) {
        if (mq) {
            return ( window.matchMedia('(min-width: ' + size + unit + ')').matches );
        } else {
            return ( window.innerWidth > size );
        }
    };

    var MediaQueries = function( config ) {
        var defaults = {
            desktop: { min: 1367, unit: 'px' },
            laptop: { max: 1366, unit: 'px' },
            tablet: { max: 1024, unit: 'px' },
            mobile: { max: 480, unit: 'px' },
        };
        this.breakpoints = config || defaults;
        return this;
    };

    MediaQueries.prototype.matches = function( keyword ) {

        if (typeof keyword === 'object') {
            // rely on user to use correct notation
            var rule = keyword;
        } else {
            var rule = this.breakpoints[ keyword ];
        }



        if (!rule) { return -1; }

        var unit = 'px';
        if (rule.hasOwnProperty('unit')) {
            unit = rule.unit;
        }

        if (rule.hasOwnProperty( 'max' )) {


            if (!_maxWidth( rule.max )) {
                return false;
            }
        }

        if (rule.hasOwnProperty( 'min' )) {

            if (!_minWidth( rule.min )) {
                return false;
            }
        }

        // we got this far, must match!
        return true;

    };

    return MediaQueries;

})();
