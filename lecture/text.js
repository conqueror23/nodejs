var z = 9;             
console.debug(z);        
function print_z(){  
    console.debug(z);    
}                       
(function(){               
    var z = 7;         
    console.debug(z);    
    print_z();           
})();                     

