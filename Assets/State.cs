// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 0.5.40
// 

using Colyseus.Schema;

public class State : Schema {
	[Type(0, "array", typeof(ArraySchema<Item>))]
	public ArraySchema<Item> items = new ArraySchema<Item>();
}

