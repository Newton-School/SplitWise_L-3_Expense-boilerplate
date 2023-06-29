// models/Transaction.js
const mongoose = require('mongoose');
/*
                                  description 
Add the description Field: Inside the schema definition, add a field called description.
Use the type property to specify that it is a string field.
Set the required property to true to ensure that a description is provided for each transaction.
*/
/*
                                    amount
Add another field called amount. Use the type property to specify that it is a number field.
Set the required property to true to ensure that an amount is provided for each transaction.
*/
/*
                                    payer
Include a field called payer to indicate the user who made the payment.
Use the type property with mongoose.Schema.Types.ObjectId to reference the User model.
Set the required property to true to ensure that a payer is specified for each transaction.
*/
/*
                                    recipient
Include a field called recipient to indicate the user who received the payment.
Use the type property with mongoose.Schema.Types.ObjectId to reference the User model.
Set the required property to true to ensure that a recipient is specified for each transaction.
*/
/*
                                    group
Include a field called group to associate the transaction with a specific group.
Use the type property with mongoose.Schema.Types.ObjectId to reference the Group model.
Set the required property to true to ensure that a group is specified for each transaction.
*/
/*
                                    createdAt
Include a field called createdAt to store the creation date of the transaction.
Use the type property with Date to specify the field as a date type.
Set the default property to Date.now to automatically assign the current date and time as the default value.
*/

const TransactionSchema = new mongoose.Schema({
  //Write a transaction schema here
});

module.exports = mongoose.model('Transaction', TransactionSchema);
