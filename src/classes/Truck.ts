// import the Driveable and AbleToTow interfaces
import Driveable from "../interfaces/Driveable.js";
import AbleToTow from "../interfaces/AbleToTow.js";
import Vehicle from "./Vehicle.js";
import Wheel from "./Wheel.js";
import Motorbike from "./Motorbike.js";
import Car from "./Car.js"

// Truck class that extends Vehicle and implements Driveable and AbleToTow interfaces
class Truck extends Vehicle implements Driveable, AbleToTow {
  // Declare properties specific to the Truck class
  towingCapacity: number;
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  maxSpeed: number;
  wheels: Wheel[];

  // Constructor for the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    maxSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    super();  // Call the Vehicle class constructor
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.maxSpeed = maxSpeed;
    this.wheels = wheels.length === 4 ? wheels : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];  // Ensure 4 wheels
    this.towingCapacity = towingCapacity;
  }

  // Method to tow another vehicle
  tow(vehicle: Truck | Motorbike | Car): void {
    const vehicleMakeModel = `${vehicle.make} ${vehicle.model}`;
    if (vehicle.weight <= this.towingCapacity) {
      console.log(`Towing ${vehicleMakeModel}`);
    } else {
      console.log(`${vehicleMakeModel} is too heavy to be towed.`);
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    super.printDetails();  // Call the parent class's printDetails
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
    console.log(`Wheels: ${this.wheels.map((wheel) => `${wheel.getDiameter} inch - ${wheel.getTireBrand}`).join(", ")}`);
  }
}

// Export the Truck class
export default Truck;