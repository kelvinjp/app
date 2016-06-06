'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:AltaCtrl
 * @description
 * # AltaCtrl
 * Controller of the appApp <a></a>
 */
angular.module('appApp')
  .controller('xmlCtrl', function ($scope,$q,  $filter, $http, $cookieStore, $location, TareasResourse) {


    $scope.xml = '';

    var cliente = {idcliente:'',nombre: "Kelvin",identificacion: "13600184371",direccion: "Santo Domingo",telefono: "8098411883",idusuario:47} ;
    var encabezado= {fecha: "2015-08-06",nota: "13600184371",asunto: "Santo Domingo",estado: 1,moneda: 1, vence:"2015-08-10", idusuario:47,tipo:"factura"};

    var detalle = [{idproducto: 1,cantidad: 80,precio: 100.0,detalle: "8098411883"},{idproducto: 2,cantidad: 830,precio: 1030.0,detalle: "ddd"}];

    //Datos de conexion a broker

    $scope.host = "10.246.246.31";
    $scope.port = 1414;
    $scope.channel = "SYSTEM.DEF.SVRCONN";
    $scope.queueManagerName = "QMDESA";
    $scope.destinationName = "com.ibm.mq.jms.outSiebel";



    //cada vez que cambia se actualiza
    $scope.cambio =  function(){
      $scope.xml = $scope.f($scope.xml, '    ');
    }


    $scope.callBroker = function(){

      $scope.pbar = true;
      var usr =   TareasResourse.factura.agregar({
        cliente: cliente
        ,encabezado:encabezado
        ,detalle:detalle

      });

      usr.$promise.then(function(result){
        $scope.pbar = false;
        console.log(result);
        console.log(result.response);
        console.log(result.tiempo);

        if(result){
          console.log("Broker Respondio");
          $scope.response = JSON.parse(JSON.stringify(result));
        }else{
          $scope.response = result.response;
        }
      });
    }
























    function createShiftArr(step) {

      var space = '    ';

      if ( isNaN(parseInt(step)) ) {  // argument is string
        space = step;
      } else { // argument is integer
        switch(step) {
          case 1: space = ' '; break;
          case 2: space = '  '; break;
          case 3: space = '   '; break;
          case 4: space = '    '; break;
          case 5: space = '     '; break;
          case 6: space = '      '; break;
          case 7: space = '       '; break;
          case 8: space = '        '; break;
          case 9: space = '         '; break;
          case 10: space = '          '; break;
          case 11: space = '           '; break;
          case 12: space = '            '; break;
        }
      }

      var shift = ['\n']; // array of shifts
      var ix;
      for(ix=0;ix<100;ix++){
        shift.push(shift[ix]+space);
      }
      return shift;
    }

    function vkbeautify(){
      this.step = '    '; // 4 spaces
      this.shift = createShiftArr(this.step);
    };

    $scope.f =   vkbeautify.prototype.xml = function(text,step) {

      var ar = text.replace(/>\s{0,}</g,"><")
          .replace(/</g,"~::~<")
          .replace(/\s*xmlns\:/g,"~::~xmlns:")
          .replace(/\s*xmlns\=/g,"~::~xmlns=")
          .split('~::~'),
        len = ar.length,
        inComment = false,
        deep = 0,
        str = '',
        ix = 0,
        shift = step ? createShiftArr(step) : this.shift;

      for(ix=0;ix<len;ix++) {
        // start comment or <![CDATA[...]]> or <!DOCTYPE //
        if(ar[ix].search(/<!/) > -1) {
          str += shift[deep]+ar[ix];
          inComment = true;
          // end comment  or <![CDATA[...]]> //
          if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1 || ar[ix].search(/!DOCTYPE/) > -1 ) {
            inComment = false;
          }
        } else
        // end comment  or <![CDATA[...]]> //
        if(ar[ix].search(/-->/) > -1 || ar[ix].search(/\]>/) > -1) {
          str += ar[ix];
          inComment = false;
        } else
        // <elm></elm> //
        if( /^<\w/.exec(ar[ix-1]) && /^<\/\w/.exec(ar[ix]) &&
          /^<[\w:\-\.\,]+/.exec(ar[ix-1]) == /^<\/[\w:\-\.\,]+/.exec(ar[ix])[0].replace('/','')) {
          str += ar[ix];
          if(!inComment) deep--;
        } else
        // <elm> //
        if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) == -1 && ar[ix].search(/\/>/) == -1 ) {
          str = !inComment ? str += shift[deep++]+ar[ix] : str += ar[ix];
        } else
        // <elm>...</elm> //
        if(ar[ix].search(/<\w/) > -1 && ar[ix].search(/<\//) > -1) {
          str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
        } else
        // </elm> //
        if(ar[ix].search(/<\//) > -1) {
          str = !inComment ? str += shift[--deep]+ar[ix] : str += ar[ix];
        } else
        // <elm/> //
        if(ar[ix].search(/\/>/) > -1 ) {
          str = !inComment ? str += shift[deep]+ar[ix] : str += ar[ix];
        } else
        // <? xml ... ?> //
        if(ar[ix].search(/<\?/) > -1) {
          str += shift[deep]+ar[ix];
        } else
        // xmlns //
        if( ar[ix].search(/xmlns\:/) > -1  || ar[ix].search(/xmlns\=/) > -1) {
          str += shift[deep]+ar[ix];
        }

        else {
          str += ar[ix];
        }
      }

      return  (str[0] == '\n') ? str.slice(1) : str;
    }




//----------------------------------------------------------------------------

    function isSubquery(str, parenthesisLevel) {
      return  parenthesisLevel - (str.replace(/\(/g,'').length - str.replace(/\)/g,'').length )
    }

    function split_sql(str, tab) {

      return str.replace(/\s{1,}/g," ")

        .replace(/ AND /ig,"~::~"+tab+tab+"AND ")
        .replace(/ BETWEEN /ig,"~::~"+tab+"BETWEEN ")
        .replace(/ CASE /ig,"~::~"+tab+"CASE ")
        .replace(/ ELSE /ig,"~::~"+tab+"ELSE ")
        .replace(/ END /ig,"~::~"+tab+"END ")
        .replace(/ FROM /ig,"~::~FROM ")
        .replace(/ GROUP\s{1,}BY/ig,"~::~GROUP BY ")
        .replace(/ HAVING /ig,"~::~HAVING ")
        //.replace(/ SET /ig," SET~::~")
        .replace(/ IN /ig," IN ")

        .replace(/ JOIN /ig,"~::~JOIN ")
        .replace(/ CROSS~::~{1,}JOIN /ig,"~::~CROSS JOIN ")
        .replace(/ INNER~::~{1,}JOIN /ig,"~::~INNER JOIN ")
        .replace(/ LEFT~::~{1,}JOIN /ig,"~::~LEFT JOIN ")
        .replace(/ RIGHT~::~{1,}JOIN /ig,"~::~RIGHT JOIN ")

        .replace(/ ON /ig,"~::~"+tab+"ON ")
        .replace(/ OR /ig,"~::~"+tab+tab+"OR ")
        .replace(/ ORDER\s{1,}BY/ig,"~::~ORDER BY ")
        .replace(/ OVER /ig,"~::~"+tab+"OVER ")

        .replace(/\(\s{0,}SELECT /ig,"~::~(SELECT ")
        .replace(/\)\s{0,}SELECT /ig,")~::~SELECT ")

        .replace(/ THEN /ig," THEN~::~"+tab+"")
        .replace(/ UNION /ig,"~::~UNION~::~")
        .replace(/ USING /ig,"~::~USING ")
        .replace(/ WHEN /ig,"~::~"+tab+"WHEN ")
        .replace(/ WHERE /ig,"~::~WHERE ")
        .replace(/ WITH /ig,"~::~WITH ")

        //.replace(/\,\s{0,}\(/ig,",~::~( ")
        //.replace(/\,/ig,",~::~"+tab+tab+"")

        .replace(/ ALL /ig," ALL ")
        .replace(/ AS /ig," AS ")
        .replace(/ ASC /ig," ASC ")
        .replace(/ DESC /ig," DESC ")
        .replace(/ DISTINCT /ig," DISTINCT ")
        .replace(/ EXISTS /ig," EXISTS ")
        .replace(/ NOT /ig," NOT ")
        .replace(/ NULL /ig," NULL ")
        .replace(/ LIKE /ig," LIKE ")
        .replace(/\s{0,}SELECT /ig,"SELECT ")
        .replace(/\s{0,}UPDATE /ig,"UPDATE ")
        .replace(/ SET /ig," SET ")

        .replace(/~::~{1,}/g,"~::~")
        .split('~::~');
    }

    vkbeautify.prototype.sql = function(text,step) {

      var ar_by_quote = text.replace(/\s{1,}/g," ")
          .replace(/\'/ig,"~::~\'")
          .split('~::~'),
        len = ar_by_quote.length,
        ar = [],
        deep = 0,
        tab = this.step,//+this.step,
        inComment = true,
        inQuote = false,
        parenthesisLevel = 0,
        str = '',
        ix = 0,
        shift = step ? createShiftArr(step) : this.shift;;

      for(ix=0;ix<len;ix++) {
        if(ix%2) {
          ar = ar.concat(ar_by_quote[ix]);
        } else {
          ar = ar.concat(split_sql(ar_by_quote[ix], tab) );
        }
      }

      len = ar.length;
      for(ix=0;ix<len;ix++) {

        parenthesisLevel = isSubquery(ar[ix], parenthesisLevel);

        if( /\s{0,}\s{0,}SELECT\s{0,}/.exec(ar[ix]))  {
          ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
        }

        if( /\s{0,}\s{0,}SET\s{0,}/.exec(ar[ix]))  {
          ar[ix] = ar[ix].replace(/\,/g,",\n"+tab+tab+"")
        }

        if( /\s{0,}\(\s{0,}SELECT\s{0,}/.exec(ar[ix]))  {
          deep++;
          str += shift[deep]+ar[ix];
        } else
        if( /\'/.exec(ar[ix]) )  {
          if(parenthesisLevel<1 && deep) {
            deep--;
          }
          str += ar[ix];
        }
        else  {
          str += shift[deep]+ar[ix];
          if(parenthesisLevel<1 && deep) {
            deep--;
          }
        }
        var junk = 0;
      }

      str = str.replace(/^\n{1,}/,'').replace(/\n{1,}/g,"\n");
      return str;
    }


    vkbeautify.prototype.xmlmin = function(text, preserveComments) {

      var str = preserveComments ? text
        : text.replace(/\<![ \r\n\t]*(--([^\-]|[\r\n]|-[^\-])*--[ \r\n\t]*)\>/g,"")
        .replace(/[ \r\n\t]{1,}xmlns/g, ' xmlns');
      return  str.replace(/>\s{0,}</g,"><");
    }

    vkbeautify.prototype.jsonmin = function(text) {

      if (typeof JSON === 'undefined' ) return text;

      return JSON.stringify(JSON.parse(text), null, 0);

    }

    vkbeautify.prototype.cssmin = function(text, preserveComments) {

      var str = preserveComments ? text
        : text.replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\//g,"") ;

      return str.replace(/\s{1,}/g,' ')
        .replace(/\{\s{1,}/g,"{")
        .replace(/\}\s{1,}/g,"}")
        .replace(/\;\s{1,}/g,";")
        .replace(/\/\*\s{1,}/g,"/*")
        .replace(/\*\/\s{1,}/g,"*/");
    }

    vkbeautify.prototype.sqlmin = function(text) {
      return text.replace(/\s{1,}/g," ").replace(/\s{1,}\(/,"(").replace(/\s{1,}\)/,")");
    }

    window.vkbeautify = new vkbeautify();








  });