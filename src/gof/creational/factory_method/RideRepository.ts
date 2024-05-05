import { Ride } from "./Ride";

export interface RideRepository {
  save(ride: Ride): Promise<void>;
  update(ride: Ride): Promise<void>;
  getById(rideId: string): Promise<Ride>;
}

export class RideRepositoryMemory implements RideRepository {
  rides: Ride[] = [];
  async save(ride: Ride): Promise<void> {
    this.rides.push(ride);
  }

  async update(ride: Ride): Promise<void> {
    const rideIndex = this.rides.findIndex((r) => r.rideId === ride.rideId);
    if (rideIndex === -1) throw new Error("ride not found");
    this.rides[rideIndex] = ride;
  }

  async getById(rideId: string) {
    const ride = this.rides.find((r) => r.rideId === rideId);
    if (!ride) throw new Error("ride not found");
    return ride;
  }
}
