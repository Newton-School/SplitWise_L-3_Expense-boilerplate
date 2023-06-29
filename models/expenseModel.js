// models/Expense.js
const mongoose = require('mongoose');
/*
                                    description
Inside the schema definition, add a field called description to represent the description of the expense.
Use the type property to specify that it is a string field.
Set the required property to true to ensure that a description is provided for each expense.
*/
/*
                                    amount
Include a field called amount to represent the amount of the expense.
Use the type property to specify that it is a number field.
Set the required property to true to ensure that an amount is provided for each expense.
*/
/*
                                    payer
Include a field called payer to store the user who paid for the expense.
Use the type property with mongoose.Schema.Types.ObjectId to reference the User model.
This allows you to associate the payer with the expense. The ref property should be set to 'User' to indicate the referenced model.
*/
/*
                                    participants
Include a field called participants to store the users who participated in the expense.
Use the type property with mongoose.Schema.Types.ObjectId to reference the User model.
This allows you to associate the participants with the expense.
The participants field should be an array, so wrap the type definition in square brackets ([]).
*/
/*
                                    createdAt
Include a field called createdAt to store the creation date of the expense.
Use the type property with Date to represent a date field.
Set the default property to Date.now to automatically set the current date and time when the expense is created.
*/
/*
                                    settled
Include a field called settled to indicate whether the expense has been settled or not.
Use the type property with Boolean to represent a boolean field.
Set the default property to false to indicate that the expense is initially not settled.
*/

const ExpenseSchema = new mongoose.Schema({
  //write a expense schema here
});

module.exports = mongoose.model('Expense', ExpenseSchema);
