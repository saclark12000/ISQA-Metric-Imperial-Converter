/*
*
*
*       Complete the handler logic below
*       
*       
*/

const math = require('mathjs')

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    
    const unitIndex = input.search( /((gal)|(L)|(lbs)|(kg)|(mi)|(km))$/ );
    const numbIndex = input.search( /^.?\d/m )
    
    //units start at begining and there aren't anynumbers in input, then result is 1
    if (unitIndex == 0 && numbIndex == -1) {
      result = 1
      
    //if there aren't any nmbers in input, invalid number has been used  
    } else if (input.search( /^.?\d/m ) == -1){
      result = false;
    
    //if there is 1 or less fraction bar
    }else if (input.match(/\//g) != null && input.match(/\//g).length > 1) {
      result = false;    
      
      //everything looks normal so  try to use mathjs to solve, if it can't solve the number is invalid.
    } else {
      try{
        result = math.round( math.eval(input.slice(0, unitIndex)), 5);
      }
      catch {
        result = false;
      };
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result;
    const unitIndex = input.search( /((gal)|(L)|(lbs)|(kg)|(mi)|(km))$/ );
    
    if (unitIndex == -1){
      result = false;
    } else {
      result = input.slice(unitIndex);
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    switch( initUnit ) {
      
      case false:
        result = false;
      break;
              
      case 'gal':
        result = 'L';
      break;
      
      case 'L':
        result = 'gal';
      break;
      
      case 'lbs':
        result = 'kg';
      break;
      
      case 'kg':
        result = 'lbs';
      break;
      
      case 'mi':
        result = 'km';
      break;
      
      case 'km':
        result = 'mi';
      break;
    }      
      
    return result;
  };

  this.spellOutUnit = function(unit) {
    var result;
    
    switch( unit ) {
        
      case 'gal':
        result = 'gallons';
      break;
      
      case 'L':
        result = 'liters';
      break;
      
      case 'lbs':
        result = 'pounds';
      break;
      
      case 'kg':
        result = 'kilograms';
      break;
      
      case 'mi':
        result = 'miles';
      break;
      
      case 'km':
        result = 'kilometers';
      break;
        
    } 
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
    
    switch( initUnit ) {
        
      case false:
        result = false;
      break;
        
      case 'gal':
        result = math.round(math.eval(initNum * galToL), 5);
      break;
      
      case 'L':
        result = math.round(math.eval(initNum / galToL), 5);
      break;
      
      case 'lbs':
        result = math.round(math.eval(initNum * lbsToKg), 5);
      break;
      
      case 'kg':
        result = math.round(math.eval(initNum / lbsToKg), 5);
      break;
      
      case 'mi':
        result = math.round(math.eval(initNum * miToKm), 5);
      break;
      
      case 'km':
        result = math.round(math.eval(initNum / miToKm), 5);
      break;
        
    }
    
    //if init is false then result should be false
    !initNum ? result = false : null
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result;
    
    if (initNum && initUnit && returnNum && returnUnit){
      result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
    } else if (!initNum && !initUnit){
      result = 'invalid number and unit'
    } else if (!initNum){
      result = 'invalid number'
    } else if (!initUnit){
      result = 'invalid unit'
    }
    
    return result;
  };
  
}

module.exports = ConvertHandler;
