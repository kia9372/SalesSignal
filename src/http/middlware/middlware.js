const autoBind=require('auto-bind');

module.exports= class Middlware{

    constructor(){
        autoBind(this);
    }

}