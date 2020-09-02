import React from 'react';
import Nav from "./components/Nav/Nav.js";
import Crud from "./components/crud/crud.js";
import Catalogo from "./components/Catalogo/Catalogo.js";
// import logo from './logo.svg';
import Catalogo from './components/Catalogo/Catalogo'
import {Route, BrowserRouter as Router} from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Crud from './components/crud/crud'


function App() {

  const productos = [ { categoria:1, id:1,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  { categoria:1,id:2,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  { categoria:2,id:3,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  { categoria:2,id:4,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  { categoria:6,id:5,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  { categoria:3,id:6,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  { categoria:4,id:7,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  { categoria:4,id:8,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
  { categoria:5,id:9,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'}];

  return (
    <Router>
      <div> 
  
  
        <Route
         path='/'
         component={Nav}
        />
        
        <Route
         path='/crud'
        component={Crud}
        />

        <Route 
         exact path='/catalogo'
         render={()=> <Catalogo productos={productos} />}
        />

        <Route
         exact path='/catalogo/mujer'
        render={()=> <Catalogo productos={productos.filter((e)=> e.categoria === 1)} />}
        />
        
        <Route
         exact path='/catalogo/hombre'
        render={()=> <Catalogo productos={productos.filter((e)=> e.categoria === 2)} />}
        />

        <Route
         exact path='/catalogo/acero'
        render={()=> <Catalogo productos={productos.filter((e)=> e.categoria === 3)} />}
        />

        <Route
         exact path='/catalogo/acero-oro'
        render={()=> <Catalogo productos={productos.filter((e)=> e.categoria === 4)} />}
        />

        <Route
         exact path='/catalogo/oro'
        render={()=> <Catalogo productos={productos.filter((e)=> e.categoria === 5)} />}
        />
        <Route
         exact path='/catalogo/engastados'
        render={()=> <Catalogo productos={productos.filter((e)=> e.categoria === 6)} />}
        />
      </div> 
    </Router>
  );
}

export default App;
