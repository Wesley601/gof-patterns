import { expect, test } from "bun:test";
import { UpdateLocation } from "./UpdateLocation";
import { DistanceRide, TimeRide } from "./Ride";
import { RideRepositoryMemory } from "./RideRepository";
import { CalculateFare } from "./CalculateFare";
import { SegmentRepositoryMemory } from "./SegmentRepository";

test("deve atualizar a localização da corrida por distância", async () => {
  const rideRepository = new RideRepositoryMemory();
  const segmentRepository = new SegmentRepositoryMemory();
  const ride = DistanceRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-10-10T10:00:00"),
  );
  rideRepository.save(ride);
  const updateLocation = new UpdateLocation(rideRepository, segmentRepository);
  await updateLocation.execute({
    rideId: ride.rideId,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date("2021-10-10T10:00:00"),
  });
  const calculateFare = new CalculateFare(rideRepository, segmentRepository);
  const out = await calculateFare.execute(ride.rideId);
  expect(out.fare).toBe(40);
});

test("deve atualizar a localização da corrida por tempo", async () => {
  const rideRepository = new RideRepositoryMemory();
  const segmentRepository = new SegmentRepositoryMemory();
  const ride = TimeRide.create(
    -27.584905257808835,
    -48.545022195325124,
    new Date("2021-10-10T10:00:00"),
  );
  rideRepository.save(ride);
  const updateLocation = new UpdateLocation(rideRepository, segmentRepository);
  await updateLocation.execute({
    rideId: ride.rideId,
    lat: -27.496887588317275,
    long: -48.522234807851476,
    date: new Date("2021-10-10T12:00:00"),
  });
  const calculateFare = new CalculateFare(rideRepository, segmentRepository);
  const out = await calculateFare.execute(ride.rideId);
  expect(out.fare).toBe(120);
});
