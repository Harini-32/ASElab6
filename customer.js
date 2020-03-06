const fs =  require('fs');


// ------------------Begin of Reusable functions ---------------------

var fetchCustomers = () => {
  try {                          //if file won't exist
    var customersString = fs.readFileSync('customer-data.json')
    return JSON.parse(customersString);
  } catch(e){
    return [];
  }
};

var saveCustomers = (customers) => {
  fs.writeFileSync('customer-data.json',JSON.stringify(customers));
};


// ------------------End of Reusable functions ---------------------


//  to add a new customer

var addCustomer = (customer_id,customer_Name,customer_Email) => {   
    var customers = fetchCustomers();
    var customer = {customer_id,customer_Name,customer_Email}

    var duplicateCustomers =  customers.filter((customer) => { // to check if customer already exists
      return customer.customer_id === customer_id;
    });

    if (duplicateCustomers.length === 0){
      customers.push(customer);
      saveCustomers(customers);
      return customer
    }

  };


//to list all the Customers

var getAll = () => {
    return fetchCustomers();
};


// to read a customers

var getCustomers = (customer_id) => {
    
    var customers = fetchCustomers();

    var getCustomers =  customers.filter((customer) => {  // to check if customer exists and return customer
      return customer.customer_id === customer_id;
    });

    return getCustomers[0]

};


// to delete a customer

var remove = (customer_id) => {

    var customers = fetchCustomers(); // reusable func

    var filteredCustomers =  customers.filter((customer) => { // will return all other Customers other than "note to be removed"
      return customer.customer_id !== customer_id;
    });

    saveCustomers(filteredCustomers); //save new Customers array

    return customers.length !== filteredCustomers.length
    
};

var update = (customer_id, customer_Name, customer_Email) => {
  var totalCustomers = fetchCustomers();
  customer={customer_id,customer_Name,customer_Email};
   for (var i = 0; i < totalCustomers.length; i++) {
     if (totalCustomers[i].customer_id === customer_id) {
       totalCustomers[i].customer_Name = customer_Name;
       totalCustomers[i].customer_Email = customer_Email;
     }
   }
   saveCustomers(totalCustomers);
   return customer ;
};

// function just to print out customer to screen

var logCustomer = (customer) => { 
  console.log('--');
  console.log(`Id: ${customer.customer_id}`);
  console.log(`Name: ${customer.customer_Name}`);
  console.log(`EmailId: ${customer.customer_Email}`);

};

// add new function names here to be accessible from other modules

module.exports = {
  addCustomer, getAll, remove, getCustomers,logCustomer,update
};
