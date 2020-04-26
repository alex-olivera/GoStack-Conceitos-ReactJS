import React, { useState } from "react";

import "../styles.css";

function FormAddRepository({ handleAddRepository }) {

  const [repository, setRepository] = useState({title: '', url: '', techs: []});
  const [techInput, setTechInput] = useState('');

  const onChangeInputValue = e => {
    const { name, value } = e.target;

    setRepository({ ...repository, [name]: value });
  }

  const onChangeInputTechValue = e => {
    const { value } = e.target;

    setTechInput(value);
  }

  function handleRemoveTechItem(value) {
    const techs = repository.techs.filter( tech => tech !== value );

    setRepository({ ...repository, techs });
  }

  function handleAddTech() {
    if (techInput.length) {
    const techs = [...repository.techs, techInput];
      setRepository({ ...repository, techs });
      setTechInput('');
    }
  }

  return (
    <div className="form-flex-column">
        <input
          className="input-default"
          name="title"
          placeholder="Enter Title"
          value={repository.title}
          onChange={onChangeInputValue} />

        <input
          className="input-default"
          name="url"
          placeholder="Enter Url"
          value={repository.url}
          onChange={onChangeInputValue} />

        <div className="row-input">
          <input
            name="url"
            placeholder="Enter Tech"
            value={techInput}
            onChange={onChangeInputTechValue} />
          <button onClick={() => handleAddTech() }>
            Adicionar Tech
          </button>
        </div>

        <div className="row">
          { repository.techs.map( (tech, index) => {
              return (
                <div className="badge" key={index}>
                  <span>{tech}</span>
                  <button className="btn-icon"
                    onClick={() => handleRemoveTechItem(tech) }>X</button>
                </div>
              )
          }) }
        </div>

        <button onClick={() => handleAddRepository(repository)}>
          Adicionar
        </button>
      </div>
  )
}

export default FormAddRepository;