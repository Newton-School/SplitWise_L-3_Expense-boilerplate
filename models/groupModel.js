const mongoose = require('mongoose');
const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  /*
                              expenses 
Include a field called expenses to store the expenses associated with the group.
Use the type property with mongoose.Schema.Types.ObjectId to reference the Expense model.
This allows you to associate expenses with the group.
The ref property should be set to 'Expense' to indicate the referenced model.
The expenses field should also be an array, so wrap the type definition in square brackets ([]).
*/
  //write a expense fiels here
});

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;
