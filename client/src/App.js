import React from 'react';
// import logo from './logo.svg';
import Product from './components/product';
import Catalogo from './components/Catalogo'




function App() {

  const productos = [{id:1,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  {id:2,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  {id:3,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  {id:4,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  {id:5,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  {id:6,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  {id:7,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  {id:8,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  {id:9,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'}];

  return (
    <div className="App">
        <Catalogo productos={productos} />
        <div className='container mt-5'>
        <Product name={'Rollex'} price={200} description={'Reloj muy caro'} stock={207} />
        </div>
    </div>
  );
}

export default App;
