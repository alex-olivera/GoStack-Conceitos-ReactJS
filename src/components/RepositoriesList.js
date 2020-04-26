import React from "react";

import "../styles.css";

function RepositoriesList({ repositories, handleRemoveRepository }) {

  return (
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
  )

}

export default RepositoriesList;