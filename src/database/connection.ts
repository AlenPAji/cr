import mongoose from 'mongoose';

export const connect = (): void => {
    // Local MongoDB connection URL
    const localUrl: string = "mongodb://localhost:27017/crm_qmark";
   
    mongoose.connect(localUrl,).then(() => {
        console.log('Database connected');
    }).catch(err => {
        console.error('Database connection error:', err);
    });
};

    

    
