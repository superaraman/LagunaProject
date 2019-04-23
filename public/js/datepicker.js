/*
 * Gijgo JavaScript Library v1.9.13
 * http://gijgo.com/
 *
 * Copyright 2014, 2019 gijgo.com
 * Released under the MIT license
 */
var gj = {};

gj.widget = function () {
    var self = this;

    self.xhr = null;

    self.generateGUID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    };

    self.mouseX = function (e) {
        if (e) {
            if (e.pageX) {
                return e.pageX;
            } else if (e.clientX) {
                return e.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
            } else if (e.touches && e.touches.length) {
                return e.touches[0].pageX;
            } else if (e.changedTouches && e.changedTouches.length) {
                return e.changedTouches[0].pageX;
            } else if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
                return e.originalEvent.touches[0].pageX;
            } else if (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                return e.originalEvent.touches[0].pageX;
            }
        }
        return null;
    };

    self.mouseY = function (e) {
        if (e) {
            if (e.pageY) {
                return e.pageY;
            } else if (e.clientY) {
                return e.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
            } else if (e.touches && e.touches.length) {
                return e.touches[0].pageY;
            } else if (e.changedTouches && e.changedTouches.length) {
                return e.changedTouches[0].pageY;
            } else if (e.originalEvent && e.originalEvent.touches && e.originalEvent.touches.length) {
                return e.originalEvent.touches[0].pageY;
            } else if (e.originalEvent && e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
                return e.originalEvent.touches[0].pageY;
            }
        }
        return null;
    };
};

gj.widget.prototype.init = function (jsConfig, type) {
    var option, clientConfig, fullConfig;

    this.attr('data-type', type);
    clientConfig = $.extend(true, {}, this.getHTMLConfig() || {});
    $.extend(true, clientConfig, jsConfig || {});
    fullConfig = this.getConfig(clientConfig, type);
    this.attr('data-guid', fullConfig.guid);
    this.data(fullConfig);

    // Initialize events configured as options
    for (option in fullConfig) {
        if (gj[type].events.hasOwnProperty(option)) {
            this.on(option, fullConfig[option]);
            delete fullConfig[option];
        }
    }

    // Initialize all plugins
    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            gj[type].plugins[plugin].configure(this, fullConfig, clientConfig);
        }
    }

    return this;
};

gj.widget.prototype.getConfig = function (clientConfig, type) {
    var config, uiLibrary, iconsLibrary, plugin;

    config = $.extend(true, {}, gj[type].config.base);

    uiLibrary = clientConfig.hasOwnProperty('uiLibrary') ? clientConfig.uiLibrary : config.uiLibrary;
    if (gj[type].config[uiLibrary]) {
        $.extend(true, config, gj[type].config[uiLibrary]);
    }

    iconsLibrary = clientConfig.hasOwnProperty('iconsLibrary') ? clientConfig.iconsLibrary : config.iconsLibrary;
    if (gj[type].config[iconsLibrary]) {
        $.extend(true, config, gj[type].config[iconsLibrary]);
    }

    for (plugin in gj[type].plugins) {
        if (gj[type].plugins.hasOwnProperty(plugin)) {
            $.extend(true, config, gj[type].plugins[plugin].config.base);
            if (gj[type].plugins[plugin].config[uiLibrary]) {
                $.extend(true, config, gj[type].plugins[plugin].config[uiLibrary]);
            }
            if (gj[type].plugins[plugin].config[iconsLibrary]) {
                $.extend(true, config, gj[type].plugins[plugin].config[iconsLibrary]);
            }
        }
    }

    $.extend(true, config, clientConfig);

    if (!config.guid) {
        config.guid = this.generateGUID();
    }

    return config;
}

gj.widget.prototype.getHTMLConfig = function () {
    var result = this.data(),
        attrs = this[0].attributes;
    if (attrs['width']) {
        result.width = attrs['width'].value;
    }
    if (attrs['height']) {
        result.height = attrs['height'].value;
    }
    if (attrs['value']) {
        result.value = attrs['value'].value;
    }
    if (attrs['align']) {
        result.align = attrs['align'].value;
    }
    if (result && result.source) {
        result.dataSource = result.source;
        delete result.source;
    }
    return result;
};

gj.widget.prototype.createDoneHandler = function () {
    var $widget = this;
    return function (response) {
        if (typeof (response) === 'string' && JSON) {
            response = JSON.parse(response);
        }
        gj[$widget.data('type')].methods.render($widget, response);
    };
};

gj.widget.prototype.createErrorHandler = function () {
    var $widget = this;
    return function (response) {
        if (response && response.statusText && response.statusText !== 'abort') {
            alert(response.statusText);
        }
    };
};

gj.widget.prototype.reload = function (params) {
    var ajaxOptions, result, data = this.data(), type = this.data('type');
    if (data.dataSource === undefined) {
        gj[type].methods.useHtmlDataSource(this, data);
    }
    $.extend(data.params, params);
    if ($.isArray(data.dataSource)) {
        result = gj[type].methods.filter(this);
        gj[type].methods.render(this, result);
    } else if (typeof(data.dataSource) === 'string') {
        ajaxOptions = { url: data.dataSource, data: data.params };
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions).done(this.createDoneHandler()).fail(this.createErrorHandler());
    } else if (typeof (data.dataSource) === 'object') {
        if (!data.dataSource.data) {
            data.dataSource.data = {};
        }
        $.extend(data.dataSource.data, data.params);
        ajaxOptions = $.extend(true, {}, data.dataSource); //clone dataSource object
        if (ajaxOptions.dataType === 'json' && typeof(ajaxOptions.data) === 'object') {
            ajaxOptions.data = JSON.stringify(ajaxOptions.data);
        }
        if (!ajaxOptions.success) {
            ajaxOptions.success = this.createDoneHandler();
        }
        if (!ajaxOptions.error) {
            ajaxOptions.error = this.createErrorHandler();
        }
        if (this.xhr) {
            this.xhr.abort();
        }
        this.xhr = $.ajax(ajaxOptions);
    }
    return this;
}

gj.documentManager = {
    events: {},

    subscribeForEvent: function (eventName, widgetId, callback) {
        if (!gj.documentManager.events[eventName] || gj.documentManager.events[eventName].length === 0) {
            gj.documentManager.events[eventName] = [{ widgetId: widgetId, callback: callback }];
            $(document).on(eventName, gj.documentManager.executeCallbacks);
        } else if (!gj.documentManager.events[eventName][widgetId]) {
            gj.documentManager.events[eventName].push({ widgetId: widgetId, callback: callback });
        } else {
            throw 'Event ' + eventName + ' for widget with guid="' + widgetId + '" is already attached.';
        }
    },

    executeCallbacks: function (e) {
        var callbacks = gj.documentManager.events[e.type];
        if (callbacks) {
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].callback(e);
            }
        }
    },

    unsubscribeForEvent: function (eventName, widgetId) {
        var success = false,
            events = gj.documentManager.events[eventName];
        if (events) {
            for (var i = 0; i < events.length; i++) {
                if (events[i].widgetId === widgetId) {
                    events.splice(i, 1);
                    success = true;
                    if (events.length === 0) {
                        $(document).off(eventName);
                        delete gj.documentManager.events[eventName];
                    }
                }
            }
        }
        if (!success) {
            throw 'The "' + eventName + '" for widget with guid="' + widgetId + '" can\'t be removed.';
        }
    }
};

/**
 */
gj.core = {
    messages: {
        'en-us': {
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthShortNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            weekDaysMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            weekDaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            weekDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            am: 'AM',
            pm: 'PM',
            ok: 'Ok',
            cancel: 'Cancel',
            titleFormat: 'mmmm yyyy'
        }
    },

    /**
     */
    parseDate: function (value, format, locale) {
        var i, year = 0, month = 0, date = 1, hour = 0, minute = 0, dateParts, formatParts, result;

        if (value && typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                result = new Date(value);
            } else if (value.indexOf('/Date(') > -1) {
                result = new Date(parseInt(value.substr(6), 10));
            } else if (value) {
                formatParts = format.split(/[\s,-\.//\:]+/);
                // Split only by spaces
                dateParts = value.split(/[\s]+/);
                // Split by other chars if the split by spaces doesn't work
                if (dateParts.length != formatParts.length) {
                    dateParts = value.split(/[\s,-\.//\:]+/);
                }
                for (i = 0; i < formatParts.length; i++) {
                    if (['d', 'dd'].indexOf(formatParts[i]) > -1) {
                        date = parseInt(dateParts[i], 10);
                    } else if (['m', 'mm'].indexOf(formatParts[i]) > -1) {
                        month = parseInt(dateParts[i], 10) - 1;
                    } else if ('mmm' === formatParts[i]) {
                        month = gj.core.messages[locale || 'en-us'].monthShortNames.indexOf(dateParts[i]);
                    } else if ('mmmm' === formatParts[i]) {
                        month = gj.core.messages[locale || 'en-us'].monthNames.indexOf(dateParts[i]);
                    } else if (['yy', 'yyyy'].indexOf(formatParts[i]) > -1) {
                        year = parseInt(dateParts[i], 10);
                        if (formatParts[i] === 'yy') {
                            year += 2000;
                        }
                    } else if (['h', 'hh', 'H', 'HH'].indexOf(formatParts[i]) > -1) {
                        hour = parseInt(dateParts[i], 10);
                    } else if (['M', 'MM'].indexOf(formatParts[i]) > -1) {
                        minute = parseInt(dateParts[i], 10);
                    }
                }
                result = new Date(year, month, date, hour, minute);
            }
        } else if (typeof value === 'number') {
            result = new Date(value);
        } else if (value instanceof Date) {
            result = value;
        }

        return result;
    },

    /**
     */
    formatDate: function (date, format, locale) {
        var result = '', separator, tmp,
            formatParts = format.split(/[\s,-\.//\:]+/),
            separators = format.split(/s+|M+|H+|h+|t+|T+|d+|m+|y+/);

        separators = separators.splice(1, separators.length - 2);

        for (i = 0; i < formatParts.length; i++) {
            separator = (separators[i] || '');
            switch (formatParts[i]) {
                case 's':
                    result += date.getSeconds() + separator;
                    break;
                case 'ss':
                    result += gj.core.pad(date.getSeconds()) + separator;
                    break;
                case 'M':
                    result += date.getMinutes() + separator;
                    break;
                case 'MM':
                    result += gj.core.pad(date.getMinutes()) + separator;
                    break;
                case 'H':
                    result += date.getHours() + separator;
                    break;
                case 'HH':
                    result += gj.core.pad(date.getHours()) + separator;
                    break;
                case 'h':
                    tmp = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
                    result += tmp + separator;
                    break;
                case 'hh':
                    tmp = date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
                    result += gj.core.pad(tmp) + separator;
                    break;
                case 'tt':
                    result += (date.getHours() >= 12 ? 'pm' : 'am') + separator;
                    break;
                case 'TT':
                    result += (date.getHours() >= 12 ? 'PM' : 'AM') + separator;
                    break;
                case 'd':
                    result += date.getDate() + separator;
                    break;
                case 'dd':
                    result += gj.core.pad(date.getDate()) + separator;
                    break;
                case 'ddd':
                    result += gj.core.messages[locale || 'en-us'].weekDaysShort[date.getDay()] + separator;
                    break;
                case 'dddd':
                    result += gj.core.messages[locale || 'en-us'].weekDays[date.getDay()] + separator;
                    break;
                case 'm' :
                    result += (date.getMonth() + 1) + separator;
                    break;
                case 'mm':
                    result += gj.core.pad(date.getMonth() + 1) + separator;
                    break;
                case 'mmm':
                    result += gj.core.messages[locale || 'en-us'].monthShortNames[date.getMonth()] + separator;
                    break;
                case 'mmmm':
                    result += gj.core.messages[locale || 'en-us'].monthNames[date.getMonth()] + separator;
                    break;
                case 'yy' :
                    result += date.getFullYear().toString().substr(2) + separator;
                    break;
                case 'yyyy':
                    result += date.getFullYear() + separator;
                    break;
            }
        }

        return result;
    },

    pad: function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) {
            val = '0' + val;
        }
        return val;
    },

    center: function ($dialog) {
        var left = ($(window).width() / 2) - ($dialog.width() / 2),
            top = ($(window).height() / 2) - ($dialog.height() / 2);
        $dialog.css('position', 'absolute');
        $dialog.css('left', left > 0 ? left : 0);
        $dialog.css('top', top > 0 ? top : 0);
    },

    isIE: function () {
        return !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g);
    },

    setChildPosition: function (mainEl, childEl) {
        var mainElRect = mainEl.getBoundingClientRect(),
            mainElHeight = gj.core.height(mainEl, true),
            childElHeight = gj.core.height(childEl, true),
            mainElWidth = gj.core.width(mainEl, true),
            childElWidth = gj.core.width(childEl, true),
            scrollY = window.scrollY || window.pageYOffset || 0,
            scrollX = window.scrollX || window.pageXOffset || 0;

        if ((mainElRect.top + mainElHeight + childElHeight) > window.innerHeight && mainElRect.top > childElHeight) {
            childEl.style.top = Math.round(mainElRect.top + scrollY - childElHeight - 3) + 'px';
        } else {
            childEl.style.top = Math.round(mainElRect.top + scrollY + mainElHeight + 3) + 'px';
        }

        if (mainElRect.left + childElWidth > document.body.clientWidth) {
            childEl.style.left = Math.round(mainElRect.left + scrollX + mainElWidth - childElWidth) + 'px';
        } else {
            childEl.style.left = Math.round(mainElRect.left + scrollX) + 'px';
        }
    },

    height: function (el, margin) {
        var result, style = window.getComputedStyle(el);

        if (style.boxSizing === 'border-box') { // border-box include padding and border within the height
            result = parseInt(style.height, 10);
            if (gj.core.isIE()) {
                result += parseInt(style.paddingTop || 0, 10) + parseInt(style.paddingBottom || 0, 10);
                result += parseInt(style.borderTopWidth || 0, 10) + parseInt(style.borderBottomWidth || 0, 10);
            }
        } else {
            result = parseInt(style.height, 10);
            result += parseInt(style.paddingTop || 0, 10) + parseInt(style.paddingBottom || 0, 10);
            result += parseInt(style.borderTopWidth || 0, 10) + parseInt(style.borderBottomWidth || 0, 10);
        }

        if (margin) {
            result += parseInt(style.marginTop || 0, 10) + parseInt(style.marginBottom || 0, 10);
        }

        return result;
    },

    width: function (el, margin) {
        var result, style = window.getComputedStyle(el);

        if (style.boxSizing === 'border-box') { // border-box include padding and border within the width
            result = parseInt(style.width, 10);
        } else {
            result = parseInt(style.width, 10);
            result += parseInt(style.paddingLeft || 0, 10) + parseInt(style.paddingRight || 0, 10);
            result += parseInt(style.borderLeftWidth || 0, 10) + parseInt(style.borderRightWidth || 0, 10);
        }

        if (margin) {
            result += parseInt(style.marginLeft || 0, 10) + parseInt(style.marginRight || 0, 10);
        }

        return result;
    },

    addClasses: function (el, classes) {
        var i, arr;
        if (classes) {
            arr = classes.split(' ');
            for (i = 0; i < arr.length; i++) {
                el.classList.add(arr[i]);
            }
        }
    },

    position: function (el) {
        var xScroll, yScroll, left = 0, top = 0,
            height = gj.core.height(el),
            width = gj.core.width(el);

        while (el) {
            if (el.tagName == "BODY") {
                xScroll = el.scrollLeft || document.documentElement.scrollLeft;
                yScroll = el.scrollTop || document.documentElement.scrollTop;
                left += el.offsetLeft - xScroll; // + el.clientLeft);
                top += el.offsetTop - yScroll; // + el.clientTop);
            } else {
                left += el.offsetLeft - el.scrollLeft; // + el.clientLeft;
                top += el.offsetTop - el.scrollTop; // + el.clientTop;
            }

            el = el.offsetParent;
        }

        return { top: top, left: left, bottom: top + height, right: left + width };
    },

    setCaretAtEnd: function (elem) {
        var elemLen;
        if (elem) {
            elemLen = elem.value.length;
            if (document.selection) { // For IE Only
                elem.focus();
                var oSel = document.selection.createRange();
                oSel.moveStart('character', -elemLen);
                oSel.moveStart('character', elemLen);
                oSel.moveEnd('character', 0);
                oSel.select();
            } else if (elem.selectionStart || elem.selectionStart == '0') { // Firefox/Chrome
                elem.selectionStart = elemLen;
                elem.selectionEnd = elemLen;
                elem.focus();
            }
        }
    },
    getScrollParent: function (node) {
        if (node == null) {
            return null;
        } else if (node.scrollHeight > node.clientHeight) {
            return node;
        } else {
            return gj.core.getScrollParent(node.parentNode);
        }
    }
};
gj.picker = {
    messages: {
        'en-us': {
        }
    }
};

gj.picker.methods = {

    initialize: function ($input, data, methods) {
        var $calendar, $rightIcon,
            $picker = methods.createPicker($input, data),
            $wrapper = $input.parent('div[role="wrapper"]');

        if (data.uiLibrary === 'bootstrap') {
            $rightIcon = $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>');
        } else if (data.uiLibrary === 'bootstrap4') {
            $rightIcon = $('<span class="input-group-append"><button class="btn btn-outline-secondary border-left-0" type="button">' + data.icons.rightIcon + '</button></span>');
        } else {
            $rightIcon = $(data.icons.rightIcon);
        }
        $rightIcon.attr('role', 'right-icon');

        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $input.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $input.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $input.val(data.value).addClass(data.style.input).attr('role', 'input');

        data.fontSize && $input.css('font-size', data.fontSize);

        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4') {
            if (data.size === 'small') {
                $wrapper.addClass('input-group-sm');
                $input.addClass('form-control-sm');
            } else if (data.size === 'large') {
                $wrapper.addClass('input-group-lg');
                $input.addClass('form-control-lg');
            }
        } else {
            if (data.size === 'small') {
                $wrapper.addClass('small');
            } else if (data.size === 'large') {
                $wrapper.addClass('large');
            }
        }

        $rightIcon.on('click', function (e) {
            if ($picker.is(':visible')) {
                $input.close();
            } else {
                $input.open();
            }
        });
        $wrapper.append($rightIcon);

        if (data.footer !== true) {
            $input.on('blur', function () {
                $input.timeout = setTimeout(function () {
                    $input.close();
                }, 500);
            });
            $picker.mousedown(function () {
                clearTimeout($input.timeout);
                $input.focus();
                return false;
            });
            $picker.on('click', function () {
                clearTimeout($input.timeout);
                $input.focus();
            });
        }
    }
};


gj.picker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.picker.methods;

    self.destroy = function () {
        return methods.destroy(this);
    };

    return $element;
};

gj.picker.widget.prototype = new gj.widget();
gj.picker.widget.constructor = gj.picker.widget;

gj.picker.widget.prototype.init = function (jsConfig, type, methods) {
    gj.widget.prototype.init.call(this, jsConfig, type);
    this.attr('data-' + type, 'true');
    gj.picker.methods.initialize(this, this.data(), gj[type].methods);
    return this;
};

gj.picker.widget.prototype.open = function (type) {
    var data = this.data(),
        $picker = $('body').find('[role="picker"][guid="' + this.attr('data-guid') + '"]');

    $picker.show();
    $picker.closest('div[role="modal"]').show();
    if (data.modal) {
        gj.core.center($picker);
    } else {
        gj.core.setChildPosition(this[0], $picker[0]);
        this.focus();
    }
    clearTimeout(this.timeout);

    gj[type].events.open(this);

    return this;
};

gj.picker.widget.prototype.close = function (type) {
    var $picker = $('body').find('[role="picker"][guid="' + this.attr('data-guid') + '"]');
    $picker.hide();
    $picker.closest('div[role="modal"]').hide();
    gj[type].events.close(this);
    return this;
};

gj.picker.widget.prototype.destroy = function (type) {
    var data = this.data(),
        $parent = this.parent(),
        $picker = $('body').find('[role="picker"][guid="' + this.attr('data-guid') + '"]');
    if (data) {
        this.off();
        if ($picker.parent('[role="modal"]').length > 0) {
            $picker.unwrap();
        }
        $picker.remove();
        this.removeData();
        this.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-' + type);
        this.removeClass();
        $parent.children('[role="right-icon"]').remove();
        this.unwrap();
    }
    return this;
};
gj.core.messages['bg-bg'] = {
    monthNames: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
    monthShortNames: ['Яну', 'Фев', 'Мар', 'Апр', 'Май', 'Юни', 'Юли', 'Авг', 'Сеп', 'ОКт', 'Ное', 'Дек'],
    weekDaysMin: ['Н', 'П', 'В', 'С', 'Ч', 'П', 'С'],
    weekDaysShort: ['Нед', 'Пон', 'Вто', 'Сря', 'Чет', 'Пет', 'Съб'],
    weekDays: ['Неделя', 'Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота'],
    am: 'AM',
    pm: 'PM',
    ok: 'ОК',
    cancel: 'Отказ',
    titleFormat: 'mmmm yyyy'
};
gj.core.messages['fr-fr'] = {
    monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    monthShortNames: ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
    weekDaysMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    weekDaysShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
    weekDays: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    am: 'AM',
    pm: 'PM',
    ok: 'OK',
    cancel: 'Annuler',
    titleFormat: 'mmmm yyyy'
};
gj.core.messages['de-de'] = {
    monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    monthShortNames: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
    weekDaysMin: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    weekDaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    weekDays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    am: 'AM',
    pm: 'PM',
    ok: 'OK',
    cancel: 'Abbrechen',
    titleFormat: 'mmmm yyyy'
};
gj.core.messages['pt-br'] = {
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    weekDaysMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
    weekDaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    weekDays: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
    am: 'AM',
    pm: 'PM',
    ok: 'OK',
    cancel: 'Cancelar',
    titleFormat: 'mmmm yyyy'
};
gj.core.messages['ru-ru'] = {
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthShortNames: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    weekDaysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekDaysShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
    weekDays: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    am: 'AM',
    pm: 'PM',
    ok: 'ОК',
    cancel: 'Отмена',
    titleFormat: 'mmmm yyyy'
};
gj.core.messages['es-es'] = {
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthShortNames: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekDaysMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    weekDaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    weekDays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    am: 'AM',
    pm: 'PM',
    ok: 'OK',
    cancel: 'Cancelar',
    titleFormat: 'mmmm yyyy'
};

gj.core.messages['it-it'] = {
    monthNames: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
    monthShortNames: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
    weekDaysMin: ['Do', 'Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa'],
    weekDaysShort: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven','Sab'],
    weekDays: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
    am: 'AM',
    pm: 'PM',
    ok: 'OK',
    cancel: 'Annulla',
    titleFormat: 'mmmm yyyy'
};
gj.core.messages['tr-tr'] = {
    monthNames: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
    monthShortNames: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    weekDaysMin: ['P', 'P', 'S', 'Ç', 'P', 'C', 'C'],
    weekDaysShort: ['Pz', 'Pzt', 'Sal', 'Çrş', 'Prş', 'Cu', 'Cts'],
    weekDays: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
    am: 'AM',
    pm: 'PM',
    ok: 'Tamam',
    cancel: 'İptal',
    titleFormat: 'mmmm yyyy'
};
gj.core.messages['ja-jp'] = {
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthShortNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    weekDaysMin: ['日', '月', '火', '水', '木', '金', '土'],
    weekDaysShort: ['日', '月', '火', '水', '木', '金', '土'],
    weekDays: ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜'],
    am: '午前',
    pm: '午後',
    ok: 'OK',
    cancel: 'キャンセル',
    titleFormat: 'yyyy年mmmm'
};

gj.core.messages['zh-cn'] = {
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthShortNames: ['01.', '02.', '03.', '04.', '05.', '06.', '07.', '08.', '09.', '10.', '11.', '12.'],
    weekDaysMin: ['日', '一', '二', '三', '四', '五', '六'],
    weekDaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    weekDays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    am: '上午',
    pm: '下午',
    ok: '确认',
    cancel: '取消',
    titleFormat: 'yyyy年mmmm'
};

gj.core.messages['zh-tw'] = {
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    monthShortNames: ['01.', '02.', '03.', '04.', '05.', '06.', '07.', '08.', '09.', '10.', '11.', '12.'],
    weekDaysMin: ['日', '一', '二', '三', '四', '五', '六'],
    weekDaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    weekDays: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    am: '上午',
    pm: '下午',
    ok: '確認',
    cancel: '取消',
    titleFormat: 'yyyy年mmmm'
};

/*
 * Gijgo DatePicker v1.9.13
 * http://gijgo.com/datepicker
 *
 * Copyright 2014, 2019 gijgo.com
 * Released under the MIT license
 */
/* global window alert jQuery gj */
/**
 */
gj.datepicker = {
    plugins: {}
};

gj.datepicker.config = {
    base: {
        /** Whether to display dates in other months at the start or end of the current month.
         */
        showOtherMonths: false,

        /** Whether days in other months shown before or after the current month are selectable.
         * This only applies if the showOtherMonths option is set to true.
         */
        selectOtherMonths: true,

        /** The width of the datepicker.
         */
        width: undefined,

        /** The minimum selectable date. When not set, there is no minimum.
         */
        minDate: undefined,

        /** The maximum selectable date. When not set, there is no maximum
         */
        maxDate: undefined,

        /** Specifies the format, which is used to format the value of the DatePicker displayed in the input.
         */
        format: 'mm/dd/yyyy',

        /** The name of the UI library that is going to be in use.
         */
        uiLibrary: 'materialdesign',

        /** The name of the icons library that is going to be in use. Currently we support Material Icons, Font Awesome and Glyphicons.
         */
        iconsLibrary: 'materialicons',

        /** The initial datepicker value.
         */
        value: undefined,

        /** Day of the week start. 0 (Sunday) to 6 (Saturday)
         */
        weekStartDay: 0,

        /** An array or function that will be used to determine which dates to be disabled for selection by the widget.
         */
        disableDates: undefined,

        /** An array that will be used to determine which days of week to be disabled for selection by the widget.
         * The array needs to contains only numbers where 0 is Sunday, 1 is Monday and etc.
         */
        disableDaysOfWeek: undefined,

        /** Whether to display week number in year on the left side of the calendar.
         */
        calendarWeeks: false,

        /** Whether to enable keyboard navigation.
         */
        keyboardNavigation: true,

        /** The language that needs to be in use.
         */
        locale: 'en-us',

        icons: {
            /** datepicker icon definition.
             */
            rightIcon: '<i class="gj-icon">event</i>',

            previousMonth: '<i class="gj-icon chevron-left"></i>',
            nextMonth: '<i class="gj-icon chevron-right"></i>'
        },

        fontSize: undefined,

        /** The size of the datepicker input.
         */
        size: 'default',

        /** If set to true, the datepicker will have modal behavior.
         */
        modal: false,

        /** If set to true, add header to the datepicker.
         */
        header: false,

        /** If set to true, add footer with ok and cancel buttons to the datepicker.
         */
        footer: false,

        /** If set to true, show datepicker on input focus.
         */
        showOnFocus: true,

        /** If set to true, show datepicker icon on the right side of the input.
         */
        showRightIcon: true,

        style: {
            modal: 'gj-modal',
            wrapper: 'gj-datepicker gj-datepicker-md gj-unselectable',
            input: 'gj-textbox-md',
            calendar: 'gj-picker gj-picker-md datepicker gj-unselectable',
            footer: '',
            button: 'gj-button-md'
        }
    },

    bootstrap: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        iconsLibrary: 'glyphicons',
        showOtherMonths: true
    },

    bootstrap4: {
        style: {
            wrapper: 'gj-datepicker gj-datepicker-bootstrap gj-unselectable input-group',
            input: 'form-control',
            calendar: 'gj-picker gj-picker-bootstrap datepicker gj-unselectable',
            footer: 'modal-footer',
            button: 'btn btn-default'
        },
        showOtherMonths: true
    },

    fontawesome: {
        icons: {
            rightIcon: '<i class="fa fa-calendar" aria-hidden="true"></i>',
            previousMonth: '<i class="fa fa-chevron-left" aria-hidden="true"></i>',
            nextMonth: '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
        }
    },

    glyphicons: {
        icons: {
            rightIcon: '<span class="glyphicon glyphicon-calendar"></span>',
            previousMonth: '<span class="glyphicon glyphicon-chevron-left"></span>',
            nextMonth: '<span class="glyphicon glyphicon-chevron-right"></span>'
        }
    }
};

gj.datepicker.methods = {
    init: function (jsConfig) {
        gj.widget.prototype.init.call(this, jsConfig, 'datepicker');
        this.attr('data-datepicker', 'true');
        gj.datepicker.methods.initialize(this, this.data());
        return this;
    },

    initialize: function ($datepicker, data) {
        var $calendar, $rightIcon,
            $wrapper = $datepicker.parent('div[role="wrapper"]');

        if ($wrapper.length === 0) {
            $wrapper = $('<div role="wrapper" />').addClass(data.style.wrapper); // The css class needs to be added before the wrapping, otherwise doesn't work.
            $datepicker.wrap($wrapper);
        } else {
            $wrapper.addClass(data.style.wrapper);
        }
        $wrapper = $datepicker.parent('div[role="wrapper"]');

        data.width && $wrapper.css('width', data.width);

        $datepicker.val(data.value).addClass(data.style.input).attr('role', 'input');

        data.fontSize && $datepicker.css('font-size', data.fontSize);

        if (data.uiLibrary === 'bootstrap' || data.uiLibrary === 'bootstrap4') {
            if (data.size === 'small') {
                $wrapper.addClass('input-group-sm');
                $datepicker.addClass('form-control-sm');
            } else if (data.size === 'large') {
                $wrapper.addClass('input-group-lg');
                $datepicker.addClass('form-control-lg');
            }
        } else {
            if (data.size === 'small') {
                $wrapper.addClass('small');
            } else if (data.size === 'large') {
                $wrapper.addClass('large');
            }
        }

        if (data.showRightIcon) {
            if (data.uiLibrary === 'bootstrap') {
                $rightIcon = $('<span class="input-group-addon">' + data.icons.rightIcon + '</span>');
            } else if (data.uiLibrary === 'bootstrap4') {
                $rightIcon = $('<span class="input-group-append"><button class="btn btn-outline-secondary border-left-0" type="button">' + data.icons.rightIcon + '</button></span>');
            } else {
                $rightIcon = $(data.icons.rightIcon);
            }
            $rightIcon.attr('role', 'right-icon');
            $rightIcon.on('click', function (e) {
                var $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
                if ($calendar.is(':visible')) {
                    gj.datepicker.methods.close($datepicker);
                } else {
                    gj.datepicker.methods.open($datepicker, data);
                }
            });
            $wrapper.append($rightIcon);
        }

        if (data.showOnFocus) {
            $datepicker.on('focus', function () {
                gj.datepicker.methods.open($datepicker, data);
            });
        }

        $calendar = gj.datepicker.methods.createCalendar($datepicker, data);

        if (data.footer !== true) {
            $datepicker.on('blur', function () {
                $datepicker.timeout = setTimeout(function () {
                    gj.datepicker.methods.close($datepicker);
                }, 500);
            });
            $calendar.mousedown(function () {
                clearTimeout($datepicker.timeout);
                document.activeElement !== $datepicker[0] && $datepicker.focus();
                return false;
            });
            $calendar.on('click', function () {
                clearTimeout($datepicker.timeout);
                document.activeElement !== $datepicker[0] && $datepicker.focus();
            });
        }

        if (data.keyboardNavigation) {
            $(document).on('keydown', gj.datepicker.methods.createKeyDownHandler($datepicker, $calendar, data));
        }
    },

    createCalendar: function ($datepicker, data) {
        var date, $body, $footer, $btnCancel, $btnOk,
            $calendar = $('<div role="calendar" type="month"/>').addClass(data.style.calendar).attr('guid', $datepicker.attr('data-guid'));

        data.fontSize && $calendar.css('font-size', data.fontSize);

        date = gj.core.parseDate(data.value, data.format, data.locale);
        if (!date || isNaN(date.getTime())) {
            date = new Date();
        } else {
            $datepicker.attr('day', date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate());
        }

        $calendar.attr('month', date.getMonth());
        $calendar.attr('year', date.getFullYear());

        gj.datepicker.methods.renderHeader($datepicker, $calendar, data, date);

        $body = $('<div role="body" />');
        $calendar.append($body);

        if (data.footer) {
            $footer = $('<div role="footer" class="' + data.style.footer + '" />');

            $btnCancel = $('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].cancel + '</button>');
            $btnCancel.on('click', function () { $datepicker.close(); });
            $footer.append($btnCancel);

            $btnOk = $('<button class="' + data.style.button + '">' + gj.core.messages[data.locale].ok + '</button>');
            $btnOk.on('click', function () {
                var date, dayArr, dayStr = $calendar.attr('selectedDay');
                if (dayStr) {
                    dayArr = dayStr.split('-');
                    date = new Date(dayArr[0], dayArr[1], dayArr[2], $calendar.attr('hour') || 0, $calendar.attr('minute') || 0);
                    gj.datepicker.methods.change($datepicker, $calendar, data, date);
                } else {
                    $datepicker.close();
                }
            });
            $footer.append($btnOk);

            $calendar.append($footer);
        }

        $calendar.hide();
        $('body').append($calendar);

        if (data.modal) {
            $calendar.wrapAll('<div role="modal" class="' + data.style.modal + '"/>');
            gj.core.center($calendar);
        }

        return $calendar;
    },

    renderHeader: function ($datepicker, $calendar, data, date) {
        var $header, $date, $year;

        if (data.header) {
            $header = $('<div role="header" />');
            $year = $('<div role="year" />').on('click', function () {
                gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                $year.addClass('selected');
                $date.removeClass('selected');
            });
            $year.html(gj.core.formatDate(date, 'yyyy', data.locale));
            $header.append($year);
            $date = $('<div role="date" class="selected" />').on('click', function () {
                gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                $date.addClass('selected');
                $year.removeClass('selected');
            });
            $date.html(gj.core.formatDate(date, 'ddd, mmm dd', data.locale));
            $header.append($date);
            $calendar.append($header);
        }
    },

    updateHeader: function ($calendar, data, date) {
        $calendar.find('[role="header"] [role="year"]').removeClass('selected').html(gj.core.formatDate(date, 'yyyy', data.locale));
        $calendar.find('[role="header"] [role="date"]').addClass('selected').html(gj.core.formatDate(date, 'ddd, mmm dd', data.locale));
        $calendar.find('[role="header"] [role="hour"]').removeClass('selected').html(gj.core.formatDate(date, 'HH', data.locale));
        $calendar.find('[role="header"] [role="minute"]').removeClass('selected').html(gj.core.formatDate(date, 'MM', data.locale));
    },

    createNavigation: function ($datepicker, $body, $table, data) {
        var $row, $navigator, $thead = $('<thead/>');

        $navigator = $('<div role="navigator" />');
        $navigator.append($('<div>' + data.icons.previousMonth + '</div>').on('click', gj.datepicker.methods.prev($datepicker, data)));
        $navigator.append($('<div role="period"></div>').on('click', gj.datepicker.methods.changePeriod($datepicker, data)));
        $navigator.append($('<div>' + data.icons.nextMonth + '</div>').on('click', gj.datepicker.methods.next($datepicker, data)));
        $body.append($navigator);

        $row = $('<tr role="week-days" />');
        if (data.calendarWeeks) {
            $row.append('<th><div>&nbsp;</div></th>');
        }
        for (i = data.weekStartDay; i < gj.core.messages[data.locale].weekDaysMin.length; i++) {
            $row.append('<th><div>' + gj.core.messages[data.locale].weekDaysMin[i] + '</div></th>');
        }
        for (i = 0; i < data.weekStartDay; i++) {
            $row.append('<th><div>' + gj.core.messages[data.locale].weekDaysMin[i] + '</div></th>');
        }
        $thead.append($row);

        $table.append($thead);
    },

    renderMonth: function ($datepicker, $calendar, data) {
        var weekDay, selectedDay, day, month, year, daysInMonth, total, firstDayPosition, i, now, prevMonth, nextMonth, $cell, $day, date,
            $body = $calendar.children('[role="body"]'),
            $table = $('<table/>'),
            $tbody = $('<tbody/>'),
            period = gj.core.messages[data.locale].titleFormat;

        $body.off().empty();
        gj.datepicker.methods.createNavigation($datepicker, $body, $table, data);

        month = parseInt($calendar.attr('month'), 10);
        year = parseInt($calendar.attr('year'), 10);

        $calendar.attr('type', 'month');
        period = period.replace('mmmm', gj.core.messages[data.locale].monthNames[month]).replace('yyyy', year);
        $calendar.find('div[role="period"]').text(period);
        daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
        if (year % 4 == 0 && year != 1900) {
            daysInMonth[1] = 29;
        }
        total = daysInMonth[month];

        firstDayPosition = (new Date(year, month, 1).getDay() + 7 - data.weekStartDay) % 7;

        weekDay = 0;
        $row = $('<tr />');
        prevMonth = gj.datepicker.methods.getPrevMonth(month, year);
        for (i = 1; i <= firstDayPosition; i++) {
            day = (daysInMonth[prevMonth.month] - firstDayPosition + i);
            date = new Date(prevMonth.year, prevMonth.month, day);
            if (data.calendarWeeks && i === 1) {
                $row.append('<td class="calendar-week"><div>' + gj.datepicker.methods.getWeekNumber(date) + '</div></td>');
            }
            $cell = $('<td class="other-month" />');
            if (data.showOtherMonths) {
                $day = $('<div>' + day + '</div>');
                $cell.append($day);
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    $cell.addClass('gj-cursor-pointer').attr('day', day).attr('month', prevMonth.month).attr('year', prevMonth.year);
                    $day.on('click', gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date));
                    $day.on('mousedown', function (e) { e.stopPropagation() });
                } else {
                    $cell.addClass('disabled');
                }
            }
            $row.append($cell);
            weekDay++;
        }
        if (i > 1) {
            $tbody.append($row);
        }

        now = new Date();
        for (i = 1; i <= total; i++) {
            date = new Date(year, month, i);
            if (weekDay == 0) {
                $row = $('<tr>');
                if (data.calendarWeeks) {
                    $row.append('<td class="calendar-week"><div>' + gj.datepicker.methods.getWeekNumber(date) + '</div></td>');
                }
            }
            $cell = $('<td day="' + i + '" month="' + month + '" year="' + year + '" />');
            if (year === now.getFullYear() && month === now.getMonth() && i === now.getDate()) {
                $cell.addClass('today');
            } else {
                $cell.addClass('current-month');
            }
            $day = $('<div>' + i + '</div>');
            if (gj.datepicker.methods.isSelectable(data, date)) {
                $cell.addClass('gj-cursor-pointer');
                $day.on('click', gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date));
                $day.on('mousedown', function (e) { e.stopPropagation() });
            } else {
                $cell.addClass('disabled');
            }
            $cell.append($day);
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }

        nextMonth = gj.datepicker.methods.getNextMonth(month, year);
        for (i = 1; weekDay != 0; i++) {
            date = new Date(nextMonth.year, nextMonth.month, i);
            $cell = $('<td class="other-month" />');
            if (data.showOtherMonths) {
                $day = $('<div>' + i + '</div>');
                if (data.selectOtherMonths && gj.datepicker.methods.isSelectable(data, date)) {
                    $cell.addClass('gj-cursor-pointer').attr('day', i).attr('month', nextMonth.month).attr('year', nextMonth.year);
                    $day.on('click', gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date));
                    $day.on('mousedown', function (e) { e.stopPropagation() });
                } else {
                    $cell.addClass('disabled');
                }
                $cell.append($day);
            }
            $row.append($cell);
            weekDay++;
            if (weekDay == 7) {
                $tbody.append($row);
                weekDay = 0;
            }
        }

        $table.append($tbody);
        $body.append($table);

        if ($calendar.attr('selectedDay')) {
            selectedDay = $calendar.attr('selectedDay').split('-');
            date = new Date(selectedDay[0], selectedDay[1], selectedDay[2], $calendar.attr('hour') || 0, $calendar.attr('minute') || 0);
            $calendar.find('tbody td[day="' + selectedDay[2] + '"][month="' + selectedDay[1] + '"]').addClass('selected');
            gj.datepicker.methods.updateHeader($calendar, data, date);
        }
    },

    renderYear: function ($datepicker, $calendar, data) {
        var year, i, m, $month,
            $table = $calendar.find('>[role="body"]>table'),
            $tbody = $table.children('tbody');

        $table.children('thead').hide();

        year = parseInt($calendar.attr('year'), 10);

        $calendar.attr('type', 'year');
        $calendar.find('div[role="period"]').text(year);

        $tbody.empty();

        for (i = 0; i < 3; i++) {
            $row = $('<tr />');
            for (m = (i * 4); m <= (i * 4) + 3; m++) {
                $month = $('<div>' + gj.core.messages[data.locale].monthShortNames[m] + '</div>');
                $month.on('click', gj.datepicker.methods.selectMonth($datepicker, $calendar, data, m));
                $cell = $('<td></td>').append($month);
                $row.append($cell);
            }
            $tbody.append($row);
        }
    },

    renderDecade: function ($datepicker, $calendar, data) {
        var year, decade, i, y, $year,
            $table = $calendar.find('>[role="body"]>table'),
            $tbody = $table.children('tbody');

        $table.children('thead').hide();

        year = parseInt($calendar.attr('year'), 10);
        decade = year - (year % 10);

        $calendar.attr('type', 'decade');
        $calendar.find('div[role="period"]').text(decade + ' - ' + (decade + 9));

        $tbody.empty();

        for (i = decade - 1; i <= decade + 10 ; i += 4) {
            $row = $('<tr />');
            for (y = i; y <= i + 3; y++) {
                $year = $('<div>' + y + '</div>');
                $year.on('click', gj.datepicker.methods.selectYear($datepicker, $calendar, data, y));
                $cell = $('<td></td>').append($year);
                $row.append($cell);
            }
            $tbody.append($row);
        }
    },

    renderCentury: function ($datepicker, $calendar, data) {
        var year, century, i, d, $decade,
            $table = $calendar.find('>[role="body"]>table'),
            $tbody = $table.children('tbody');

        $table.children('thead').hide();

        year = parseInt($calendar.attr('year'), 10);
        century = year - (year % 100);

        $calendar.attr('type', 'century');
        $calendar.find('div[role="period"]').text(century + ' - ' + (century + 99));

        $tbody.empty();

        for (i = (century - 10); i < century + 100; i += 40) {
            $row = $('<tr />');
            for (d = i; d <= i + 30; d += 10) {
                $decade = $('<div>' + d + '</div>');
                $decade.on('click', gj.datepicker.methods.selectDecade($datepicker, $calendar, data, d));
                $cell = $('<td></td>').append($decade);
                $row.append($cell);
            }
            $tbody.append($row);
        }
    },

    getWeekNumber: function (date) {
        var d = new Date(date.valueOf());
        d.setDate(d.getDate() + 6);
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    },

    getMinDate: function (data) {
        var minDate;
        if (data.minDate) {
            if (typeof (data.minDate) === 'string') {
                minDate = gj.core.parseDate(data.minDate, data.format, data.locale);
            } else if (typeof (data.minDate) === 'function') {
                minDate = data.minDate();
                if (typeof minDate === 'string') {
                    minDate = gj.core.parseDate(minDate, data.format, data.locale);
                }
            } else if (typeof data.minDate.getMonth === 'function') {
                minDate = data.minDate;
            }
        }
        return minDate;
    },

    getMaxDate: function (data) {
        var maxDate;
        if (data.maxDate) {
            if (typeof data.maxDate === 'string') {
                maxDate = gj.core.parseDate(data.maxDate, data.format, data.locale);
            } else if (typeof data.maxDate === 'function') {
                maxDate = data.maxDate();
                if (typeof maxDate === 'string') {
                    maxDate = gj.core.parseDate(maxDate, data.format, data.locale);
                }
            } else if (typeof data.maxDate.getMonth === 'function') {
                maxDate = data.maxDate;
            }
        }
        return maxDate;
    },

    isSelectable: function (data, date) {
        var result = true,
            minDate = gj.datepicker.methods.getMinDate(data),
            maxDate = gj.datepicker.methods.getMaxDate(data),
            i;

        if (minDate && date < minDate) {
            result = false;
        } else if (maxDate && date > maxDate) {
            result = false;
        }

        if (result) {
            if (data.disableDates) {
                if ($.isArray(data.disableDates)) {
                    for (i = 0; i < data.disableDates.length; i++) {
                        if (data.disableDates[i] instanceof Date && data.disableDates[i].getTime() === date.getTime()) {
                            result = false;
                        } else if (typeof data.disableDates[i] === 'string' && gj.core.parseDate(data.disableDates[i], data.format, data.locale).getTime() === date.getTime()) {
                            result = false;
                        }
                    }
                } else if (data.disableDates instanceof Function) {
                    result = data.disableDates(date);
                }
            }
            if ($.isArray(data.disableDaysOfWeek) && data.disableDaysOfWeek.indexOf(date.getDay()) > -1) {
                result = false;
            }
        }
        return result;
    },

    getPrevMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() - 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    getNextMonth: function (month, year) {
        date = new Date(year, month, 1);
        date.setMonth(date.getMonth() + 1);
        return { month: date.getMonth(), year: date.getFullYear() };
    },

    prev: function ($datepicker, data) {
        return function () {
            var date, month, year, decade, century,
                $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            year = parseInt($calendar.attr('year'), 10);
            switch ($calendar.attr('type')) {
                case 'month':
                    month = parseInt($calendar.attr('month'), 10);
                    date = gj.datepicker.methods.getPrevMonth(month, year);
                    $calendar.attr('month', date.month);
                    $calendar.attr('year', date.year);
                    gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                    break;
                case 'year':
                    $calendar.attr('year', year - 1);
                    gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                    break;
                case 'decade':
                    decade = year - (year % 10);
                    $calendar.attr('year', decade - 10);
                    gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                    break;
                case 'century':
                    century = year - (year % 100);
                    $calendar.attr('year', century - 100);
                    gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                    break;
            }
        }
    },

    next: function ($datepicker, data) {
        return function () {
            var date, month, year, decade, century,
                $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            year = parseInt($calendar.attr('year'), 10);
            switch ($calendar.attr('type')) {
                case 'month':
                    month = parseInt($calendar.attr('month'), 10);
                    date = gj.datepicker.methods.getNextMonth(month, year);
                    $calendar.attr('month', date.month);
                    $calendar.attr('year', date.year);
                    gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                    break;
                case 'year':
                    $calendar.attr('year', year + 1);
                    gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                    break;
                case 'decade':
                    decade = year - (year % 10);
                    $calendar.attr('year', decade + 10);
                    gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                    break;
                case 'century':
                    century = year - (year % 100);
                    $calendar.attr('year', century + 100);
                    gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                    break;
            }
        }
    },

    changePeriod: function ($datepicker, data) {
        return function (e) {
            var $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

            switch ($calendar.attr('type')) {
                case 'month':
                    gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                    break;
                case 'year':
                    gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                    break;
                case 'decade':
                    gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                    break;
            }
        }
    },

    dayClickHandler: function ($datepicker, $calendar, data, date) {
        return function (e) {
            e && e.stopPropagation();
            gj.datepicker.methods.selectDay($datepicker, $calendar, data, date);
            if (data.footer !== true && data.autoClose !== false) {
                gj.datepicker.methods.change($datepicker, $calendar, data, date);
            }
            return $datepicker;
        };
    },

    change: function ($datepicker, $calendar, data, date) {
        var day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear(),
            value = gj.core.formatDate(date, data.format, data.locale);
        $calendar.attr('month', month);
        $calendar.attr('year', year);
        $datepicker.val(value);
        gj.datepicker.events.change($datepicker);
        if (window.getComputedStyle($calendar[0]).display !== 'none') {
            gj.datepicker.methods.close($datepicker);
        }
    },

    selectDay: function ($datepicker, $calendar, data, date) {
        var day = date.getDate(),
            month = date.getMonth(),
            year = date.getFullYear();
        $calendar.attr('selectedDay', year + '-' + month + '-' + day);
        $calendar.find('tbody td').removeClass('selected');
        $calendar.find('tbody td[day="' + day + '"][month="' + month + '"]').addClass('selected');
        gj.datepicker.methods.updateHeader($calendar, data, date);
        gj.datepicker.events.select($datepicker, 'day');
    },

    selectMonth: function ($datepicker, $calendar, data, month) {
        return function (e) {
            $calendar.attr('month', month);
            gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
            gj.datepicker.events.select($datepicker, 'month');
        };
    },

    selectYear: function ($datepicker, $calendar, data, year) {
        return function (e) {
            $calendar.attr('year', year);
            gj.datepicker.methods.renderYear($datepicker, $calendar, data);
            gj.datepicker.events.select($datepicker, 'year');
        };
    },

    selectDecade: function ($datepicker, $calendar, data, year) {
        return function (e) {
            $calendar.attr('year', year);
            gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
            gj.datepicker.events.select($datepicker, 'decade');
        };
    },

    open: function ($datepicker, data) {
        var date, $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');

        if ($datepicker.val()) {
            $datepicker.value($datepicker.val());
        } else {
            date = new Date();
            $calendar.attr("month", date.getMonth());
            $calendar.attr("year", date.getFullYear());
        }

        switch ($calendar.attr('type')) {
            case 'month':
                gj.datepicker.methods.renderMonth($datepicker, $calendar, data);
                break;
            case 'year':
                gj.datepicker.methods.renderYear($datepicker, $calendar, data);
                break;
            case 'decade':
                gj.datepicker.methods.renderDecade($datepicker, $calendar, data);
                break;
            case 'century':
                gj.datepicker.methods.renderCentury($datepicker, $calendar, data);
                break;
        }

        $calendar.show();
        $calendar.closest('div[role="modal"]').show();
        if (data.modal) {
            gj.core.center($calendar);
        } else {
            gj.core.setChildPosition($datepicker[0], $calendar[0]);
            document.activeElement !== $datepicker[0] && $datepicker.focus();
        }
        clearTimeout($datepicker.timeout);
        gj.datepicker.events.open($datepicker);
    },

    close: function ($datepicker) {
        var $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
        $calendar.hide();
        $calendar.closest('div[role="modal"]').hide();
        gj.datepicker.events.close($datepicker);
    },

    createKeyDownHandler: function ($datepicker, $calendar, data) {
        return function (e) {
            var month, year, day, index, $new, $active, e = e || window.event;

            if (window.getComputedStyle($calendar[0]).display !== 'none')
            {
                $active = gj.datepicker.methods.getActiveCell($calendar);
                if (e.keyCode == '38') { // up
                    index = $active.index();
                    $new = $active.closest('tr').prev('tr').find('td:eq(' + index + ')');
                    if (!$new.is('[day]')) {
                        gj.datepicker.methods.prev($datepicker, data)();
                        $new = $calendar.find('tbody tr').last().find('td:eq(' + index + ')');
                        if ($new.is(':empty')) {
                            $new = $calendar.find('tbody tr').last().prev().find('td:eq(' + index + ')');
                        }
                    }
                    if ($new.is('[day]')) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '40') { // down
                    index = $active.index();
                    $new = $active.closest('tr').next('tr').find('td:eq(' + index + ')');
                    if (!$new.is('[day]')) {
                        gj.datepicker.methods.next($datepicker, data)();
                        $new = $calendar.find('tbody tr').first().find('td:eq(' + index + ')');
                        if (!$new.is('[day]')) {
                            $new = $calendar.find('tbody tr:eq(1)').find('td:eq(' + index + ')');
                        }
                    }
                    if ($new.is('[day]')) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '37') { // left
                    $new = $active.prev('td[day]:not(.disabled)');
                    if ($new.length === 0) {
                        $new = $active.closest('tr').prev('tr').find('td[day]').last();
                    }
                    if ($new.length === 0) {
                        gj.datepicker.methods.prev($datepicker, data)();
                        $new = $calendar.find('tbody tr').last().find('td[day]').last();
                    }
                    if ($new.length > 0) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '39') { // right
                    $new = $active.next('[day]:not(.disabled)');
                    if ($new.length === 0) {
                        $new = $active.closest('tr').next('tr').find('td[day]').first();
                    }
                    if ($new.length === 0) {
                        gj.datepicker.methods.next($datepicker, data)();
                        $new = $calendar.find('tbody tr').first().find('td[day]').first();
                    }
                    if ($new.length > 0) {
                        $new.addClass('focused');
                        $active.removeClass('focused');
                    }
                } else if (e.keyCode == '13') { // enter
                    day = parseInt($active.attr('day'), 10);
                    month = parseInt($active.attr('month'), 10);
                    year = parseInt($active.attr('year'), 10);
                    gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, new Date(year, month, day))();
                } else if (e.keyCode == '27') { // esc
                    $datepicker.close();
                }
            }
        }
    },

    getActiveCell: function ($calendar) {
        var $cell = $calendar.find('td[day].focused');
        if ($cell.length === 0) {
            $cell = $calendar.find('td[day].selected');
            if ($cell.length === 0) {
                $cell = $calendar.find('td[day].today');
                if ($cell.length === 0) {
                    $cell = $calendar.find('td[day]:not(.disabled)').first();
                }
            }
        }
        return $cell;
    },

    value: function ($datepicker, value) {
        var $calendar, date, data = $datepicker.data();
        if (typeof (value) === "undefined") {
            return $datepicker.val();
        } else {
            date = gj.core.parseDate(value, data.format, data.locale);
            if (date && date.getTime()) {
                $calendar = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
                gj.datepicker.methods.dayClickHandler($datepicker, $calendar, data, date)();
            } else {
                $datepicker.val('');
            }
            return $datepicker;
        }
    },

    destroy: function ($datepicker) {
        var data = $datepicker.data(),
            $parent = $datepicker.parent(),
            $picker = $('body').find('[role="calendar"][guid="' + $datepicker.attr('data-guid') + '"]');
        if (data) {
            $datepicker.off();
            if ($picker.parent('[role="modal"]').length > 0) {
                $picker.unwrap();
            }
            $picker.remove();
            $datepicker.removeData();
            $datepicker.removeAttr('data-type').removeAttr('data-guid').removeAttr('data-datepicker');
            $datepicker.removeClass();
            $parent.children('[role="right-icon"]').remove();
            $datepicker.unwrap();
        }
        return $datepicker;
    }
};

gj.datepicker.events = {
    /**
     * Triggered when the datepicker value is changed.
     *
     */
    change: function ($datepicker) {
        return $datepicker.triggerHandler('change');
    },

    /**
     * Triggered when new value is selected inside the picker.
     *
     */
    select: function ($datepicker, type) {
        return $datepicker.triggerHandler('select', [type]);
    },

    /**
     * Event fires when the calendar is opened.
     */
    open: function ($datepicker) {
        return $datepicker.triggerHandler('open');
    },

    /**
     * Event fires when the calendar is closed.
     */
    close: function ($datepicker) {
        return $datepicker.triggerHandler('close');
    }
};

gj.datepicker.widget = function ($element, jsConfig) {
    var self = this,
        methods = gj.datepicker.methods;

    /** Gets or sets the value of the datepicker.
     */
    self.value = function (value) {
        return methods.value(this, value);
    };

    /** Remove datepicker functionality from the element.
     */
    self.destroy = function () {
        return methods.destroy(this);
    };

    /** Open the calendar.
     */
    self.open = function () {
        return methods.open(this, this.data());
    };

    /** Close the calendar.
     */
    self.close = function () {
        return methods.close(this);
    };

    $.extend($element, self);
    if ('true' !== $element.attr('data-datepicker')) {
        methods.init.call($element, jsConfig);
    }

    return $element;
};

gj.datepicker.widget.prototype = new gj.widget();
gj.datepicker.widget.constructor = gj.datepicker.widget;

(function ($) {
    $.fn.datepicker = function (method) {
        var $widget;
        if (this && this.length) {
            if (typeof method === 'object' || !method) {
                return new gj.datepicker.widget(this, method);
            } else {
                $widget = new gj.datepicker.widget(this, null);
                if ($widget[method]) {
                    return $widget[method].apply(this, Array.prototype.slice.call(arguments, 1));
                } else {
                    throw 'Method ' + method + ' does not exist.';
                }
            }
        }
    };
})(jQuery);
