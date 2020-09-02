import React, {useState} from "react";
import "./crud.css";

const Crud = () => {
    const [title, setTitle] = useState();

    return (
    <form>
        <div>
            <label>Titulo:</label>
            <input type = "text" name = "title"  />
        </div>
        <div>
            <label>Descripción:</label>
            <input type = "text" name = "description"  />
        </div>
        <div>
            <label>Precio:</label>
            <input type = "number" name = "description"  />
        </div>
    </form>
    )
}