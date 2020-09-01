import db from './_db';
import Categories from './Categories';
import Product from './Product';

Categories.hasMany(Product);
Product.belongsTo(Categories);

export default db;
