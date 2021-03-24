const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function()
    {
      let standard = new Rover(4000);
      expect(standard.position).toEqual(4000);
      let mode = new Rover();
      expect(mode.mode).toEqual('NORMAL');
      let genWatts = new Rover();
      expect(genWatts.generatorWatts).toEqual(110);
    });

  it("response returned by receiveMessage contains name of message", function()
    {
      let rover = new Rover;
      let commands = [new Command("STATUS_CHECK")];
      let response = rover.receiveMessage(new Message("Hello", commands));
      expect(response.message).toEqual("Hello");
    });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function()
    {
      let rover = new Rover;
      let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]
      let response = rover.receiveMessage(new Message("Two results", commands));
      expect(response.results.length).toEqual(commands.length);
    });

  it("responds correctly to status check command", function()
    {
      let rover = new Rover; 
      let commands = [new Command("STATUS_CHECK")];
      let response = rover.receiveMessage(new Message("STATUS_CHECK", commands));
      expect(response.results[0].roverStatus.mode).toEqual("NORMAL");
      expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
      expect(response.results[0].roverStatus.position).toEqual(rover.position);
    });

    it("responds correctly to mode change command", function()
      {
        let rover = new Rover;
        let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("STATUS_CHECK")];
        let response = rover.receiveMessage(new Message("MODE_CHANGE", commands));
        expect(response.results[1].roverStatus.mode).toEqual("LOW_POWER");
      });

    it("responds with false completed value when attempting to move in LOW_POWER mode", function ()
      {
        let rover = new Rover;
        let commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 20)];
        let response = rover.receiveMessage(new Message("MOVE", commands));
        expect(response.results[1].completed).toEqual(false);
      });

    it("responds with position for move command", function()
      {
        let rover = new Rover(100);
        let commands = [ new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')];
        let response = rover.receiveMessage(new Message("MOVE", commands));
        expect(response.results[1].roverStatus.position).toEqual(commands[0].value);
      });

});
