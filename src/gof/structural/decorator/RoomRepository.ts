import Database from "bun:sqlite";
import { Room } from "./Room";

export interface RoomRepository {
  getAvailableRoomsByPeriod(
    checkin: Date,
    checkout: Date,
    category?: string
  ): Promise<Room[]>;
  getById(id: number): Promise<Room>;
}

export class RoomRepositoryDB implements RoomRepository {
  connection: Database;

  constructor() {
    this.connection = new Database("db/main.db");
  }

  async getById(id: number): Promise<Room> {
    const stm = this.connection.prepare("SELECT * FROM rooms WHERE id = ?");
    const room = stm.get(id);
    stm.finalize();
    if (!room) throw new Error("Room not found");
    return this.restore(room);
  }

  async getAvailableRoomsByPeriod(
    checkin: Date,
    checkout: Date,
    category?: "standard" | "suite"
  ): Promise<Room[]> {
    const params: Record<string, string | number> = {
      $checkin: checkin.getTime(),
      $checkout: checkout.getTime(),
    };
    let query = "SELECT * FROM rooms WHERE status = 'available'";
    if (category) {
      query = query.concat(" and category = $category");
      params["$category"] = category;
    }
    query = query.concat(
      " and id not in (SELECT bookings.room_id as id FROM bookings WHERE (checkin < $checkout and checkout > $checkin) and status = 'confirmed')"
    );
    const stm = this.connection.prepare(query);
    const roomsRaw = stm.all(params) as any[];
    stm.finalize();
    const rooms = roomsRaw.map(this.restore);
    return rooms;
  }

  private restore(room: any): Room {
    return new Room(room.id, room.category, room.price, room.status);
  }
}
