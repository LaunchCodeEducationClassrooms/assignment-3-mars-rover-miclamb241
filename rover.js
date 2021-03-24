class Rover {
   // Write code here!
   constructor(position){
      this.position = position,
      this.mode = 'NORMAL',
      this.generatorWatts = 110
   }
    

   receiveMessage(message)
   {  
      let results = [];

      message.commands.forEach(command => {

        switch(command.commandType){
          case "MOVE":
            results.push(this.MOVE(command.value))
            break;
          case "STATUS_CHECK":
            results.push(this.STATUS_CHECK())
            break;
          case "MODE_CHANGE":
            results.push(this.MODE_CHANGE(command.value))
        }});

      return{
        message: message.name,
        results: results
      }
   }

   MOVE(position)
   {

     if(this.mode === "LOW_POWER")
     {
       return {completed: false};
     }
      else
      {
        this.position = position;
        return {completed: true};
      }
   }

   STATUS_CHECK()
   {
     return {
       completed: true,
       roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}
      }
   }

   MODE_CHANGE(mode)
   {
     this.mode = mode;

     return {completed: true};
   }
}
module.exports = Rover;
