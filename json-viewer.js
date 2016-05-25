(function() {
    'use strict';
    var app = angular.module('platypus.jsonviewer', []);

    app.directive('jsonViewer', function(){
        return {
            scope: {
                "data": '=jsonViewer'
            },
            link: function(scope, element, attrs){
                scope.$watch('data', function(nv, ov){
                    element[0].innerHTML = '';
                    if (nv !== null && nv !== undefined) {
                        var json = nv;
                        var jsonString = JSON.stringify(json, function(key, value){
                            var type = typeof(value);

                            if (value === null){
                                return "<NULL>null</NULL>";
                            } else if (value === undefined){
                                return "<UNDEFINED>undefined</UNDEFINED>";
                            }

                            if(angular.isArray(value) || type === 'object'){
                                return value;
                            }

                            if (angular.isString(value)) {
                                value = value.replace(/[<>"'&]/g,
                                    function(char) {
                                        switch (char) {
                                            case '<': return '&lt;';
                                            case '>': return '&gt;';
                                            case '"': return '&quot;';
                                            case "'": return '&apos;';
                                            case '&': return '&amp;';
                                        }
                                        return char;
                                    });
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

                        element[0].innerHTML = jsonString;
                    }
                });

                element.on('click', function(e){
                    e.stopPropagation();
                    var target = angular.element(e.target);
                    if(target.hasClass('json-viewer--group')) {
                        target.removeClass('json-viewer--folded');
                        return;
                    }
                    if(target.hasClass('json-viewer--bracket')) {
                        target.parent().toggleClass('json-viewer--folded');
                        return;
                    }
                    if(target.hasClass('json-viewer--key')) {
                        target.next().toggleClass('json-viewer--folded');
                        return;
                    }
                });
            }
        };
    });
})();
