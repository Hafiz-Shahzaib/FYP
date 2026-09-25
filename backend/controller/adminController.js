import User from "../model/userModel.js";
import bcrypt from "bcryptjs";


// New feild add
export const getAllUsers = async (req, res) => {

  try {

    // const users = await User.find({isActive: true}).select("-password");
    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// ADD USER (Admin)


// add new feild
export const addUserByAdmin = async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {

      if (!existingUser.isActive) {

        return res.status(400).json({
          message:
          "User exists but disabled. Enable instead."
        });

      }

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const newUser =
      await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        isActive: true
      });

    res.status(201).json(newUser);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }

};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // await User.findByIdAndDelete(id);

    // Add new feild
    await User.findByIdAndUpdate(
      id,
      { isActive: false }
    );

    res.json({ message: "User disabled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, password, role } = req.body;

    let updateData = {
      name,
      email,
      role
    };

    // If password entered → hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json(updatedUser);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};


// new feild
export const enableUser = async (req, res) => {

  try {

    const { id } = req.params;

    await User.findByIdAndUpdate(
      id,
      { isActive: true }
    );

    res.json({
      message: "User enabled"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
