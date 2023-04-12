import UserModel from "../models/user.model";
import jwtUtil from "../utils/jwt";

const authGoogleSuccess = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      const email = user.emails[0].value;
      let userDocument = await UserModel.findOne({ email });

      if (userDocument) {
        if (!userDocument?.providers?.google) {
          userDocument.providers = {
            ...userDocument.providers,
            google: {
              providerId: user.id,
            },
          };
          userDocument = await userDocument.save();
        }
      } else {
        userDocument = {
          username: user.displayName,
          email: email,
          avatar: user.photos[0].value,
          providers: {
            google: { providerId: user.id },
          },
        };

        userDocument = await UserModel.create(userDocument);
      }

      let accessToken = await jwtUtil.generateToken({
        id: userDocument._id.toString(),
      });

      let userRetrieved = {
        id: userDocument._id.toString(),
        username: userDocument.username,
        email: userDocument.email,
        avatar: userDocument.avatar,
      };

      resolve({
        data: userRetrieved,
        accessToken,
      });
    } catch (error) {
      reject({
        error: error,
        success: false,
      });
    }
  });
};

const authService = {
  authGoogleSuccess,
};

export default authService;
