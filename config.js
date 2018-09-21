/* 
 *Create and export configuration variables 
 *
 */
   //Conainer for all the evironments.
   var environments = {}
   environments.staging = {
    "httpPort": 3000,
    "httpsPort": 3001,
    "envNmae": "staging"
   }
   environments.producation = {
    "httpPort": 5000,
    "httpsPort": 5001,      
    "envNmae": "producation"
   }
   //Determine which environments was passed as a command line argument 
   var currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';
   //Check that current evironment is one of the above, if not, default to staging
   var environmentsToExport = typeof(environments[currentEnviroment]) == 'object' ? environments[currentEnviroment] : environments.staging 
   //export the modules 
   module.exports = environmentsToExport;