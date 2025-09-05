const handleUser = () => {
  try {
    console.log("User route working!");
    return "User route working!";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const handleUsers = () => {
  try {
    console.log("Users route working!");
    return "Users route working!";
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { handleUser, handleUsers };
