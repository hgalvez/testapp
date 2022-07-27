import { Injectable } from '@angular/core';
import { Results } from './home/results.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private results: Results[] = [
    {
      id: "1",
      IL1310: "0.1",
      IL1550: "0.2",
      RLIN1310: "55",
      RLOUT1310: "55",
      RLIN1550: "60",
      RLOUT1550: "60"
    },
    {
      id: "2",
      IL1310: "0.1",
      IL1550: "0.2",
      RLIN1310: "55",
      RLOUT1310: "55",
      RLIN1550: "60",
      RLOUT1550: "60"
    },
    {
      id: "3",
      IL1310: "0.1",
      IL1550: "0.2",
      RLIN1310: "55",
      RLOUT1310: "55",
      RLIN1550: "60",
      RLOUT1550: "60"
    },
    {
      id: "4",
      IL1310: "0.1",
      IL1550: "0.2",
      RLIN1310: "55",
      RLOUT1310: "55",
      RLIN1550: "60",
      RLOUT1550: "60"
    },

  ];

  constructor() { }
}
