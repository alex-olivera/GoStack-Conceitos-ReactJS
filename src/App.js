import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

//Components
import RepositoriesList from './components/RepositoriesList';
import FormAddRepository from './components/FormAddRepository';

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then( response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository(repository) {
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
      <RepositoriesList repositories={repositories} handleRemoveRepository={handleRemoveRepository} />
      <FormAddRepository handleAddRepository={handleAddRepository} />
    </div>
  );
}

export default App;
