import { ServerWebSocket } from "bun"
import { init as initRecast } from "recast-navigation"
import { generateNavMesh } from "./generate-navmesh"

interface WebSocket {
  sid: string
}

const users: ServerWebSocket<WebSocket>[] = []

// https://github.com/lucasamonrc/ws-chat/blob/main/src/index.ts

await initRecast()

generateNavMesh()
