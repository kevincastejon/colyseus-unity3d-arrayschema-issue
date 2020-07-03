import { Room, Client, generateId } from "colyseus";
import { Schema, type, ArraySchema } from "@colyseus/schema";
import { verifyToken, User, IUser } from "@colyseus/social";
let removerTimer = 0;
const removerInterval = 2000;

class Item extends Schema {
  @type("string")
  name: string = "no_name";
}

class State extends Schema {
  @type([Item])
  items = new ArraySchema<Item>();
}

export class DemoRoom extends Room {

  onCreate (options: any) {
    console.log("DemoRoom created!", options);
    this.setPatchRate(1000 / 20);
    this.setSimulationInterval((dt) => this.update(dt));
    const state:State = new State();
    const itemA = new Item(); itemA.name='A';
    const itemB = new Item(); itemB.name='B';
    const itemC = new Item(); itemC.name='C';
    const itemD = new Item(); itemD.name='D';
    const itemE = new Item(); itemE.name='E';
    state.items.push(itemA);
    state.items.push(itemB);
    state.items.push(itemC);
    state.items.push(itemD);
    state.items.push(itemE);
    this.setState(state);
  }

  async onAuth (client, options) {
    console.log("onAuth(), options!", options);
    return await User.findById(verifyToken(options.token)._id);
  }

  onJoin (client: Client, options: any, user: IUser) {
    console.log("client joined!", client.sessionId);
  }

  async onLeave (client: Client, consented: boolean) {

  }


  update (dt?: number) {
    removerTimer += dt;
    if (removerTimer >= removerInterval) {
      removerTimer = 0;
      this.state.items.shift();
      console.log("Remaining items :");
      for (let index = 0; index < this.state.items.length; index++) {
        console.log(this.state.items[index].name);
      }
    }
  }

  onDispose () {
    console.log("disposing DemoRoom...");
  }

}
