import userRoutes from '../routes/userRouters.js';
import tdlRoutes from '../routes/todolistRouters.js';

export const initiateApp = (expressApp) => {

    expressApp.use(userRoutes);

    expressApp.use(tdlRoutes);

};