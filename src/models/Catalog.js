import mongoose from 'mongoose';

const catalogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    label: { type: String, required: true }, 
    imageUrl: { type: String, required: true },
    contentUrl: { type: String, required: true },
    type: { 
        type: String, 
        required: true, 
        enum: ['pelicula', 'serie'], 
    }
}, { timestamps: true });

const Catalog = mongoose.model('Catalog', catalogSchema);
export default Catalog;