export interface MeshMessage {
  nodeId: string;
  department: string;
  type: string;
  payload: any;
  timestamp: number;
}

class P2PMeshSyncClass {
  private channel = new BroadcastChannel('elitejobs_mesh_bus');
  private listeners: ((msg: MeshMessage) => void)[] = [];
  private nodeId = 'node_' + Math.random().toString(36).substring(2, 7);

  constructor() {
    this.channel.onmessage = (event) => {
      this.listeners.forEach((l) => l(event.data));
    };
  }

  public getNodeIdentifier() {
    return this.nodeId;
  }

  public broadcastMeshPacket(department: string, type: string, payload: any) {
    const packet: MeshMessage = {
      nodeId: this.nodeId,
      department,
      type,
      payload,
      timestamp: Date.now()
    };
    try {
      this.channel.postMessage(packet);
      this.listeners.forEach((l) => l(packet));
    } catch (e) {
      console.error('Mesh broadcast error:', e);
    }
  }

  public subscribe(listener: (msg: MeshMessage) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
}

export const MeshSync = new P2PMeshSyncClass();