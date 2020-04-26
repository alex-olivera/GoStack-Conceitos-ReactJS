import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then( response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = {
      "title": "Desafio Node",
      "url": "http://github.com/alex",
      "techs": ["Node.js"]
    }
    const response = await api.post('/repositories', repository);

    const newRepository = response.data;

    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      const newRepositoriesList = repositories.filter( repository => repository.id !== id );
      setRepositories(newRepositoriesList);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map( repository => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        }) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
