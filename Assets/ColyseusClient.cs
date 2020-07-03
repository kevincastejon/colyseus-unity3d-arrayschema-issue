using UnityEngine;
using UnityEngine.UI;

using System;
using System.Collections.Generic;

using System.Threading;
using System.Threading.Tasks;

using Colyseus;
using Colyseus.Schema;
using GameDevWare.Serialization;

public class ColyseusClient : MonoBehaviour
{

	public string roomName = "demo";

	protected Client client;
	protected Room<State> room;

	// Use this for initialization
	void Start()
	{
		ConnectToServer();
	}

	async void ConnectToServer()
	{
		/*
		 * Get Colyseus endpoint from InputField
		 */
		string endpoint = "ws://localhost:2567";

		Debug.Log("Connecting to " + endpoint);

		/*
		 * Connect into Colyeus Server
		 */
		client = ColyseusManager.Instance.CreateClient(endpoint);
		await client.Auth.Login();

		room = await client.Create<State>(roomName, new Dictionary<string, object>() { });

		room.State.items.OnAdd += (Item item, int index) => { Debug.Log("added item " + item.name + " at index : " + index); };
		room.State.items.OnRemove += (Item item, int index) => { Debug.Log("removed item " + item.name + " at index : " + index); };

		room.OnError += (code, message) => Debug.LogError("ERROR, code =>" + code + ", message => " + message);
	}

	void OnApplicationQuit()
	{
	}
}
