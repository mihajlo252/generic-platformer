package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

// Character represents all character metadata
type Character struct {
	CharacterID string `json:"character_id"`
	X           int    `json:"x"`
	Y           int    `json:"y"`
}

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			// Allow all connections by returning true here.
			return true
		},
	}
	clients   = make(map[*websocket.Conn]bool) // connected clients
	broadcast = make(chan Character)           // broadcast channel
	mutex     = &sync.Mutex{}                  // mutex to synchronize access to clients map
)

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	// Upgrade HTTP connection to a WebSocket connection
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading to WebSocket:", err)
		return
	}
	defer conn.Close()

	// Register new client
	mutex.Lock()
	clients[conn] = true
	mutex.Unlock()

	// Infinite loop to handle incoming messages
	for {
		// Read message from the WebSocket connection
		var pos Character
		err := conn.ReadJSON(&pos)
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}
		fmt.Println(pos)

		// Broadcast position update to all clients
		broadcast <- pos
	}

	// Remove client when connection is closed
	mutex.Lock()
	delete(clients, conn)
	mutex.Unlock()
}

func broadcastPositions() {
	for {
		// Wait for position updates
		pos := <-broadcast

		// Convert position to JSON
		data, err := json.Marshal(pos)
		if err != nil {
			log.Println("Error marshalling position:", err)
			continue
		}

		// Send position update to all connected clients
		for client := range clients {
			err := client.WriteMessage(websocket.TextMessage, data)
			if err != nil {
				log.Println("Error broadcasting message:", err)
				continue
			}
		}
	}
}

func main() {
	// Start broadcasting positions to clients
	go broadcastPositions()

	// Register handler for WebSocket connections
	http.HandleFunc("/ws", handleWebSocket)

	// Start the server on port 8080
	log.Println("Starting server on port 8080...")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("Error starting server:", err)
	}
}
