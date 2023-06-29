const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    // Other user fields...
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 8) {
          throw new Error('password should be at least 8 characters long');
        }
      },
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'creator'], // Define the possible roles
      default: 'user', // Set a default role if not provided
    },
    /*
                                balance
-->add a new field called balance. Use the type property to specify that it is a number field.
-->Set Default Value: To assign a default value to the balance field, use the default property.
In this case, set the default value to 0 to indicate a starting balance of zero.
*/
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
  },
  { timestamps: true }
);

// pre-save hook to hash password before saving to the database
userSchema.pre('save', async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);
  user.password = hashedPassword;
  next();
});

module.exports = mongoose.model('User', userSchema);
