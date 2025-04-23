import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

interface CreateVehicleAnswers {
  vehicleType: "Car" | "Truck" | "Motorbike";
}

interface CarAnswers {
  color: string;
  make: string;
  model: string;
  year: string;
  weight: string;
  topSpeed: string;
}

interface TruckAnswers {
  color: string;
  make: string;
  model: string;
  year: string;
  weight: string;
  topSpeed: string;
  towingCapacity: string;
}

interface MotorbikeAnswers {
  color: string;
  make: string;
  model: string;
  year: string;
  weight: string;
  topSpeed: string;
  frontWheelDiameter: string;
  frontWheelBrand: string;
  rearWheelDiameter: string;
  rearWheelBrand: string;
}

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
        // check if the user wants to create a new vehicle or select an existing vehicle
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }

  // method to find a vehicle to tow
  // TODO: add a parameter to accept a truck object
  findVehicleToTow(towTruck:Truck): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleToTow',
          message: 'Select a vehicle to tow',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            };
          }),
        },
      ])
      .then(({vehicleToTow}) => {
        // TODO: check if the selected vehicle is the truck
        if (towTruck.vin === vehicleToTow.vin ) {
          console.log('Cannot tow self')
        } else {
          towTruck.tow(vehicleToTow)
        }
        // TODO: if it is, log that the truck cannot tow itself then perform actions on the truck to allow the user to select another action
        // TODO: if it is not, tow the selected vehicle then perform actions on the truck to allow the user to select another action
      });
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selectedVehicleVin',
          message: 'Select a vehicle to perform an action on',
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers: { selectedVehicleVin: string }) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'vehicleType',
          message: 'Select a vehicle type',
          choices: ['Car', 'Truck', 'Motorbike'],
        },
      ])
      .then((answers: CreateVehicleAnswers) => {
        if (answers.vehicleType === 'Car') {
          this.createCar();
        } else if (answers.vehicleType === 'Truck') {
          this.createTruck();
        } else if (answers.vehicleType === 'Motorbike') {
          this.createMotorbike();
        }
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
      ])
      .then((answers: CarAnswers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'towingCapacity',
          message: 'Enter Towing Capacity',
        },
      ])
      .then((answers: TruckAnswers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity),
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'color',
          message: 'Enter Color',
        },
        {
          type: 'input',
          name: 'make',
          message: 'Enter Make',
        },
        {
          type: 'input',
          name: 'model',
          message: 'Enter Model',
        },
        {
          type: 'input',
          name: 'year',
          message: 'Enter Year',
        },
        {
          type: 'input',
          name: 'weight',
          message: 'Enter Weight',
        },
        {
          type: 'input',
          name: 'topSpeed',
          message: 'Enter Top Speed',
        },
        {
          type: 'input',
          name: 'frontWheelDiameter',
          message: 'Enter Front Wheel Diameter',
        },
        {
          type: 'input',
          name: 'frontWheelBrand',
          message: 'Enter Front Wheel Brand',
        },
        {
          type: 'input',
          name: 'rearWheelDiameter',
          message: 'Enter Rear Wheel Diameter',
        },
        {
          type: 'input',
          name: 'rearWheelBrand',
          message: 'Enter Rear Wheel Brand',
        },
      ])
      .then((answers: MotorbikeAnswers) => {
        const frontWheel = new Wheel(
          parseInt(answers.frontWheelDiameter),
          answers.frontWheelBrand
        );
        const rearWheel = new Wheel(
          parseInt(answers.rearWheelDiameter),
          answers.rearWheelBrand
        );
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [frontWheel, rearWheel]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  performActions(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Select an action',
          choices: [
            'Print details',
            'Start vehicle',
            'Accelerate 5 MPH',
            'Decelerate 5 MPH',
            'Stop vehicle',
            'Turn right',
            'Turn left',
            'Reverse',
            'Select or create another vehicle',
            'Exit',
            'Tow vehicle', // Added for truck
            'Do a wheelie', // Added for motorbike
          ],
        },
      ])
      .then((answers: { action: string }) => {
        const selectedVehicle = this.vehicles.find(
          (vehicle) => vehicle.vin === this.selectedVehicleVin
        );
        if (selectedVehicle) {
          if (answers.action === 'Print details') {
            selectedVehicle.printDetails();
            this.performActions()
          } else if (answers.action === 'Start vehicle') {
            selectedVehicle.start();
            this.performActions()
          } else if (answers.action === 'Accelerate 5 MPH') {
            selectedVehicle.accelerate(5);
            this.performActions()
          } else if (answers.action === 'Decelerate 5 MPH') {
            selectedVehicle.decelerate(5);
            this.performActions()
          } else if (answers.action === 'Stop vehicle') {
            selectedVehicle.stop();
            this.performActions()
          } else if (answers.action === 'Turn right') {
            selectedVehicle.turn('right');
            this.performActions()
          } else if (answers.action === 'Turn left') {
            selectedVehicle.turn('left');
            this.performActions()
          } else if (answers.action === 'Reverse') {
            selectedVehicle.reverse();
            this.performActions()
          } else if (answers.action === 'Tow vehicle' && selectedVehicle instanceof Truck) {
            this.findVehicleToTow(selectedVehicle);
            this.performActions()
          } else if (answers.action === 'Do a wheelie' && selectedVehicle instanceof Motorbike) {
            console.log('Doing a wheelie!');
            this.performActions()
          } else if (answers.action === 'Select or create another vehicle') {
            this.chooseVehicle();
            this.performActions()
          } else if (answers.action === 'Exit') {
            this.exit = true;
          }

          if (this.exit) {
            console.log('Exiting...');
          }
        }
      });
  }
}

export default Cli;