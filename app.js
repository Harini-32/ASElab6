
const fs =  require('fs');
const yargs = require('yargs');

const customers = require('./customer.js');

// ------------ Begin - command configuration -----------------


const customerIdOptions = {
    describe: 'Id of the customer',
    demand : true,
    alias : 'i'
}

const customerNameOptions = {
    describe: 'Name of the customer',
    demand : true,
    alias : 'n'
}

const customerEmailOptions = {
  describe: 'Email of the customer',
  demand : true,
  alias : 'e'
}



const argv =  yargs

    .command('add','Add a new customer',{
      customer_id: customerIdOptions,
      customer_Name: customerNameOptions,
      customer_Email: customerEmailOptions,
      
    })
    .command('list','List all customers')
    .command('read','Read the customer deails',{
      customer_id:customerIdOptions
    })
    .command('remove','Remove a customer',{
      customer_id:customerIdOptions
    })
    .command('update', 'update the customer details',{
      customer_id:customerIdOptions,
      customer_Name:customerNameOptions,
      customer_Email:customerEmailOptions
    })
    .help()
    .argv;


// ------------ End - command configuration -----------------


var command = yargs.argv._[0];


if (command === 'add'){
    var customer = customers.addCustomer(argv.customer_id,argv.customer_Name,argv.customer_Email);
    if (customer){
      customers.logCustomer(customer);                                //add a new customer
    } else{
      console.log("customers already exists");
    }
}

else if (command === 'list') {
  var Allcustomers = customers.getAll();
  console.log(`Printing ${Allcustomers.length} customer(s).`);
  Allcustomers.forEach((customer)=>{                                //list all customer(s)
    customers.logCustomer(customer);
  });
}

else if (command === 'read') {
   var customer = customers.getCustomers(argv.customer_id);
   if(customer){
    customers.logCustomer(customer);                                //read a cusomer
          }
   else{
    console.log("Customer not found");
   }
}

else if (command === 'update'){
  var customer = customers.update(argv.customer_id,argv.customer_Name,argv.customer_Email);
  
  if(customer){
    customers.logCustomer(customer); 
    console.log("customer is updated");
                                    //add a new note
  } else{
    
    console.log("customer doesn't  exist to update");
  }
}


else if (command === 'remove') {
    var customerRemoved = customers.remove(argv.customer_id);
    var message = customerRemoved ? 'Customer was removed' : 'Customer not found';
    console.log(message);
}

else{
  console.log('command customer recognized'); 
}
