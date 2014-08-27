(function() {
    'use strict';
    var app = angular.module('platypus.jsonviewer', []);

    app.directive('jsonViewer', function(){
        return {
            scope: {
                "data": '=jsonViewer'
            },
            link: function(scope, element, attrs){
                // IE8 doesn't have an HTMLElement class
                var htmlElementClass = typeof HTMLElement !== "undefined" ? HTMLElement : Element;

                scope.$watch('data', function(nv, ov){
                    element.html('');
                    if (nv !== null && nv !== undefined) {
                        var json = nv;
                        var jsonString = JSON.stringify(json, function(key, value){
                            var type = typeof(value);

                            if (value === null){
                                return "<NULL>null</NULL>";
                            } else if (value === undefined){
                                return "<UNDEFINED>undefined</UNDEFINED>";
                            }

                            if($.isArray(value) || type === 'object'){
                                return value;
                            }

                            return '<' + type.toUpperCase() + '>' + value +'</'+type.toUpperCase() +'>';
                        }, ' ');
                
                        jsonString = jsonString.replace(/{/g, '<div class="json-viewer--group"><div class="json-viewer--bracket json-viewer--start">{</div><ul class="json-viewer--object"><li>');
                        jsonString = jsonString.replace(/}/g, '</li></ul><div class="json-viewer--bracket json-viewer--end">}</div></div>');

                        jsonString = jsonString.replace(/\[/g, '<div class="json-viewer--group"><div class="json-viewer--bracket json-viewer--start">[</div><ul class="json-viewer--object"><li>');
                        jsonString = jsonString.replace(/\]/g, '</li></ul><div class="json-viewer--bracket json-viewer--end">]</div></div>');

                        jsonString = jsonString.replace(/,$/gm, '<span class="json-viewer--comma">,</span></li><li>');
                
                        jsonString = jsonString.replace(/("[^"]+"):/g, '<span class="json-viewer--key">$1:</span>');

                        jsonString = jsonString.replace(/"<NULL>null<\/NULL>"/g, '<span class="json-viewer--value json-viewer--null">null</span>');
                        jsonString = jsonString.replace(/"<UNDEFINED>undefined<\/UNDEFINED>"/g, '<span class="json-viewer--value json-viewer--undefined">undefined</span>');
                        jsonString = jsonString.replace(/"<STRING>([^<]+)<\/STRING>"/g, '<span class="json-viewer--value json-viewer--string">"$1"</span>');
                        jsonString = jsonString.replace(/"<NUMBER>([^<]+)<\/NUMBER>"/g, '<span class="json-viewer--value json-viewer--number">$1</span>');
                        jsonString = jsonString.replace(/"<BOOLEAN>([^<]+)<\/BOOLEAN>"/g, '<span class="json-viewer--value json-viewer--boolean">$1</span>');
                
                        $(element).html(jsonString);
                    }
                });

                element.on('click', '.json-viewer--group', function(e){
                    e.stopPropagation();
                    $(this).removeClass('folded');
                });
                element.on('click', '.json-viewer--bracket', function(e){
                    e.stopPropagation();
                    $(this).closest('.group').toggleClass('folded');
                });
                element.on('click', '.json-viewer--key', function(e){
                    e.stopPropagation();
                    $(this).next('.group').toggleClass('folded');
                });
                element.on('mouseenter', '.json-viewer--key', function(e){
                    element.find('.hovered').removeClass('hovered');
                    $(this).next('.group').addClass('hovered');
                });
                element.on('mouseleave', function(e){
                    element.find('.hovered').removeClass('hovered');
                });
            }
        };
    });
})();