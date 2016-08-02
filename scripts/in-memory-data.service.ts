export class InMemoryDataService {
  createDb() {
    let patients = [
      {id: 1, name: 'Bob Joe'},
      {id: 2, name: 'Bill T'},
      {id: 3, name: 'Ice Man'},
      {id: 4, name: 'Charles'},
      {id: 5, name: 'Magic'},
      {id: 6, name: 'Chunky'},
      {id: 7, name: 'Silk Teddy'},
      {id: 8, name: 'Kid Lupus'},
      {id: 9, name: 'Mocha Rose'},
      {id: 10, name: 'Molly Popper'}
    ];

    let funds = [
      {id: 1, name: 'American Century Retirement Fund 2020', ticker: 'AMCR1'},
      {id: 2, name: 'American Century Retirement Fund 2030', ticker: 'AMCR2'},
      {id: 3, name: 'American Century Retirement Fund 2040', ticker: 'AMCR3'},
      {id: 4, name: 'Fidelity Advisory Fund I', ticker: 'FDAF1'},
      {id: 5, name: 'Fidelity Advisory Fund II', ticker: 'FDAF2'},
      {id: 6, name: 'T. Rowe Price Education Fund', ticker: 'TRPEF1'},
      {id: 7, name: 'T. Rowe Price Education Balanced Fund', ticker: 'TRPEB'},
      {id: 8, name: 'Tiaa-cref Balanced Fund', ticker: 'TAACB'},
      {id: 9, name: 'Tiaa-cref Index Fund', ticker: 'TAACI'},
      {id: 10, name: 'Vanguard Index Fund', ticker: 'VANGI'}
    ];
    
    return {patients, funds};
  }
}